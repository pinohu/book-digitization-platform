# Dilution Model — Book Digitization Platform

This model provides a comprehensive look at the lifecycle of "Book Digitization Platform." 

**Note on Methodology:** In professional venture modeling, the "Option Pool Shuffle" occurs where investors require the option pool to be created *before* the investment (pre-money), meaning the dilution from the pool falls entirely on the existing shareholders (Founders), not the new investors. This model follows that standard.

---

### 1. The Dilution Model (Cap Table Summary)

*Assumptions: All option pool expansions are done pre-money to satisfy investor terms. We assume 1,000,000 shares at Founding.*

| Round | Pre-Money Val | Raise | Post-Money Val | New Shares Issued | Founder % | Option Pool % | Investor % (Cumulative) |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Founding** | - | - | - | 0 | 100.0% | 0.0% | 0.0% |
| **Pre-Seed** | \$3.0M | \$0.5M | \$3.5M | 171,429 | 75.7% | 10.0% | 14.3% |
| **Seed** | \$10.0M | \$2.0M | \$12.0M | 200,000 | 63.1% | 10.0% | 26.9% |
| **Series A** | \$40.0M | \$8.0M | \$48.0M | 200,000 | 52.6% | 10.0% | 36.8% |
| **Series B** | \$150.0M | \$25.0M | \$175.0M | 178,571 | 44.8% | 10.0% | 45.2% |

**Key Logic Breakdown:**
1.  **Pre-Seed:** Investors take $500k / $3.5M = 14.3%. We also create a 10% pool. The remaining 75.7% goes to founders.
2.  **Dilution Effect:** Every time a new round is raised, everyone's percentage is multiplied by $(1 - \text{New Investor \%})$. 
    *   *Example (Series A to B):* Founder % at Series A (52.6%) $\times$ (1 - 14.29% dilution) = 45.1% (rounded).

---

### 2. Anti-Dilution Provisions: Worked Examples

Anti-dilution protects investors if the company issues shares in a "Down Round" (a round with a lower valuation than the previous one).

**Scenario:** 
*   **Series A Price:** \$10.00 per share.
*   **The Down Round (Series A-1):** Company raises money at \$5.00 per share.

#### A. Full Ratchet (The "Founder Killer")
The investor’s conversion price is reset entirely to the new, lower price, regardless of how much money was raised.
*   **Old Price:** \$10.00
*   **New Price:** \$5.00
*   **Result:** The investor's shares are recalculated as if they bought them at \$5.00. They effectively double their share count, causing massive dilution to founders.

#### B. Broad-Based Weighted Average (The "Industry Standard")
This formula considers both the **new price** and the **amount of money** raised, making it less punitive.

**Formula:**
$$CP_2 = CP_1 \times \frac{(A + B)}{(A + C)}$$

*   $CP_1$ = Old conversion price (\$10.00)
*   $A$ = Common shares outstanding before the down round (e.g., 1,000,000)
*   $B$ = Total shares that *would* have been issued if the new round was at the old price
*   $C$ = Actual new shares issued in the down round

**Worked Example:**
If the company issues 200,000 new shares at \$5.00:
1.  $A = 1,000,000$
2.  $B = (200,000 \times \$5.00) / \$10.00 = 100,000$
3.  $C = 200,000$
4.  $CP_2 = 10 \times \frac{(1,000,000 + 100,000)}{(1,000,000 + 200,000)} = 10 \times 0.916 = \mathbf{\$9.16}$

**Result:** The investor's price only drops from \$10.00 to \$9.16, which is much fairer to the founders than the \$5.00 Full Ratchet.

---

### 3. Pro-Rata Rights Impact

Pro-rata rights allow existing investors to participate in future rounds to maintain their ownership percentage.

*   **Without Pro-Rata:** If a Seed investor owns 10%, and Series A issues 20% new shares to a new VC, the Seed investor is diluted to 8%.
*   **With Pro-Rata:** The Seed investor has the right to buy 2% of the new round to keep their ownership at 10%.
*   **Impact on Founders:** Pro-rata rights do **not** prevent dilution; they simply shift who is providing the capital. Instead of the "New VC" providing 100% of the \$8M, the "Seed Investor" might provide \$800k of it. This means the founders' ownership still drops, but the "New VC" gets a smaller piece of the pie.

---

### 4. SAFE / Convertible Note Conversion

Before the Seed round, "Book Digitization Platform" likely raised money via a **SAFE (Simple Agreement for Future Equity)**.

**Scenario:**
*   **SAFE Amount:** \$250,000
*   **SAFE Valuation Cap:** \$5,000,000
*   **Seed Round Valuation (Pre-money):** \$10,000,000

**The "Cap" Effect:**
Because the SAFE has a \$5M cap, the SAFE holder does *not* convert at the \$10M Seed price. They convert at the \$5M price. 
*   **Result:** The SAFE holder gets **2x the shares** for the same amount of money compared to the Seed investors. This creates a "dilution spike" right at the moment the Seed round closes.

---

### 5. Cap Table Template (Conceptual Layout)

When building this in Excel, use this structure:

| Shareholder Class | Shares Held | Ownership % | Pre-Money Value | Post-Money Value |
| :--- | :--- | :--- | :--- | :--- |
| **Founders** | 1,000,000 | 75.7% | \$2,271,000 | \$2,647,950 |
| **Option Pool** | 142,857 | 10.0% | \$300,000 | \$350,000 |
| **Pre-Seed Investors**| 214,286 | 14.3% | \$429,000 | \$500,000 |
| **TOTAL** | **1,357,143** | **100.0%** | **\$3,000,000** | **\$3,500,000** |

**Excel Pro-Tips for your Model:**
1.  **Column A:** Round Name.
2.  **Column B:** New Capital Raised.
3.  **Column C:** Pre-Money Valuation.
4.  **Column D:** Post-Money Valuation `(=B+C)`.
5.  **Column E (Dilution Factor):** `=(B/D)`.
6.  **Column F (Ownership):** `(Previous Ownership) * (1 - E)`.