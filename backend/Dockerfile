# =============================================================================
# OMNISCAN AI - CONTAINERIZATION STRATEGY
# =============================================================================
# We utilize a multi-stage build process to minimize the attack surface and 
# reduce the final image size, optimizing for AWS EKS cold-start times.
#
# | Stage | Purpose | Optimization | Security Level |
# | :--- | :--- | :--- | :--- |
# | Builder | Compile dependencies | No-cache pip install | Isolated |
# | Final | Runtime execution | Slim-debian base | Hardened |
# =============================================================================

# Stage 1: Build dependencies
FROM python:3.11-slim AS builder

WORKDIR /app

# Install system dependencies required for psycopg2 and other C-extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Stage 2: Production Runtime
FROM python:3.11-slim

WORKDIR /app

# Copy only the installed packages from the builder stage
COPY --from=builder /install /usr/local

# Install runtime system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Create a non-privileged user for security hardening
RUN groupadd -g 999 appuser && \
    useradd -r -u 999 -g appuser appuser
USER appuser

COPY . .

# Expose the FastAPI port
EXPOSE 8000

# Healthcheck for Kubernetes/Docker orchestration
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s \
    CMD curl -f http://localhost:8000/health || exit 1

# Execution using Uvicorn with optimized worker count for CPU-bound OCR coordination
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "4", "--proxy-headers", "--forwarded-allow-ips", "*"]