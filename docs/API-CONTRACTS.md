# API Specification — Book Digitization Platform

> Dynasty Empire API Reference | April 19, 2026

---

## 1. Authentication
| Method | Type | Location | Format |
|---|---|---|---|
| Primary | Bearer Token (NextAuth JWT) | Authorization header | `Bearer <token>` |
| API Key | Static key | X-API-Key header | `CROP-ADMIN-...` (admin only) |

**Token refresh:** NextAuth handles session rotation automatically.
**Unauthorized response:** `401 { "error": "unauthorized", "message": "Authentication required to access this resource" }`

---

## 2. Response Format
All responses follow this structure:
```json
// Success
{ 
  "data": { "id": "uuid", "title": "Summa Theologica" }, 
  "meta": { "page": 1, "total": 1, "limit": 20 } 
}
// Error
{ 
  "error": "insufficient_permissions", 
  "message": "Scholar role cannot delete books", 
  "details": { "required_role": "admin" } 
}
```

---

## 3. Core Endpoints

### 3.1 Authentication & Identity
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/v1/auth/register | None | Register a new foundation user |
| POST | /api/v1/sign-in | None | Authenticate user and return session |

**Request Body (POST /register):**
| Field | Type | Required | Validation |
|---|---|---|---|
| email | string | Yes | Valid email format |
| password | string | Yes | Min 12 chars |
| tenantId | uuid | Yes | Must exist in `tenants` table |
| role | string | Yes | One of [admin, scholar, professional, guest] |

**Response (201):**
| Field | Type | Description |
|---|---|---|
| userId | uuid | The created user ID |
| token | string | JWT for subsequent requests |

### 3.2 Book Management
| Method | Path | Auth | Description |
|---|---|---|---|
| GET | /api/v1/books | Required | List all digitized books for tenant |
| GET | /api/v1/books/:id | Required | Get metadata for a specific book |
| GET | /api/v1/books/:id/pages | Required | Get all page texts/images for a book |

**Query Parameters (GET /books):**
| Param | Type | Default | Description |
|---|---|---|---|
| search | string | — | Search by title or author |
| page | integer | 1 | Pagination page |

**Response (200 - GET /books/:id):**
| Field | Type | Description |
|---|---|---|
| id | uuid | Book ID |
| title | string | Title of the Catholic Classic |
| author | string | Author name |
| isbn | string | ISBN identifier |
| pageCount | integer | Total pages digitized |

### 3.3 AI Search & Retrieval (RAG)
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/v1/search | Required | Semantic search across digitized texts |

**Request Body (POST /search):**
| Field | Type | Required | Validation |
|---|---|---|---|
| query | string | Yes | Natural language question |
| bookId | uuid | No | Optional filter to a specific book |
| topK | integer | No | Number of page chunks to retrieve (Default 5) |

**Response (200):**
| Field | Type | Description |
|---|---|---|
| answer | string | Verbatim-backed AI answer |
| sources | array | List of `{ pageId, pageNumber, textSnippet }` |
| queryId | uuid | ID for the `query_logs` entry |

### 3.4 Subscription & Billing
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/v1/subscriptions/create | Required | Initialize $5/book payment |
| GET | /api/v1/subscriptions/status | Required | Check current access level |

**Request Body (POST /create):**
| Field | Type | Required | Validation |
|---|---|---|---|
| bookId | uuid | Yes | Book to be unlocked |
| paymentMethodId | string | Yes | Stripe payment method token |

**Response (200):**
| Field | Type | Description |
|---|---|---|
| subscriptionId | uuid | ID of the new subscription |
| status | string | 'active' or 'pending' |
| stripeSessionUrl | string | URL for Stripe Checkout |

### 3.5 Citations & Scholarship
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/v1/citations | Required | Create a scholar note on a page |
| GET | /api/v1/citations | Required | Retrieve all notes for the user |

**Request Body (POST /citations):**
| Field | Type | Required | Validation |
|---|---|---|---|
| pageId | uuid | Yes | The source page ID |
| note | string | Yes | Academic annotation |

**Response (201):**
| Field | Type | Description |
|---|---|---|
| citationId | uuid | Created citation ID |
| createdAt | timestamptz | Timestamp of note |

### 3.6 Ingestion Pipeline
| Method | Path | Auth | Description |
|---|---|---|---|
| POST | /api/v1/upload/signed-url | Admin | Get S3 presigned URL for book upload |
| POST | /api/v1/ocr/process | Admin | Trigger OpenAI OCR for uploaded files |

**Request Body (POST /signed-url):**
| Field | Type | Required | Validation |
|---|---|---|---|
| fileName | string | Yes | Name of the file to upload |
| contentType | string | Yes | MIME type (e.g., image/tiff) |

**Response (200):**
| Field | Type | Description |
|---|---|---|
| uploadUrl | string | The S3 presigned URL |
| fileKey | string | The key to be stored in `pages.s3_url` |

---

## 4. Webhook Events
| Event | Trigger | Payload |
|---|---|---|
| `stripe.checkout.session.completed` | Successful $5 payment | `{ customer_id, book_id, session_id }` |
| `ocr.process.completed` | OpenAI OCR finish | `{ book_id, page_count, success: boolean }` |

---

## 5. Rate Limiting
| Endpoint Group | Limit | Window | Exceeded Response |
|---|---|---|---|
| Public endpoints | 60 requests | 1 minute | 429 + Retry-After header |
| Authenticated | 300 requests | 1 minute | 429 |
| Admin | 1000 requests | 1 minute | 429 |

---

## 6. Versioning
- Current version: v1
- Version in URL path: `/api/v1/...`
- Breaking changes increment version number.
- Previous versions supported for 6 months after deprecation.