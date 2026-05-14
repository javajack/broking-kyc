# Field-level Data Flow Atlas Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship a bidirectional Field-level Data Flow Atlas — 1 overview page + 30 per-section sub-pages + 14 per-destination sub-pages + 1 downloadable master CSV — mapping every field's downstream trajectory across KRA, CKYC, exchange UCC (NSE/BSE/MCX), depository BO (CDSL/NSDL), back-office, RMS, contract notes, regulatory reports, DLT comms, FATCA/CRS, and AML/FIU.

**Architecture:** Six clustered research sub-agents (one per destination cluster) produce pipe-delimited working files. Two Python build scripts then consolidate into a master CSV and emit all 45 markdown pages. Sidebar gets a new collapsed "Field Atlas" sub-group under Reference. Astro build verifies the result.

**Tech Stack:** Astro Starlight (no build changes), Python 3 with stdlib `csv` module, WebSearch + WebFetch (agent research), markdown / mdx (output), sub-agents (`general-purpose` for read+write capability).

**Note on TDD adaptation:** Content/research plan. Verification model: schema conformance (every PSV row has all 11 fields) + spec-source check (≥90% of rows cite a non-`[industry typical]` source) + Astro build clean + CSV downloads successfully.

---

## File Structure

**Files to create (final, committed):**

- `kyc-docs-site/src/content/docs/reference/field-atlas.md` — overview landing page.
- `kyc-docs-site/src/content/docs/reference/field-atlas/sections/<section-slug>.md` — 30 per-section sub-pages (`a-personal-identity.md` through `ac-running-account-settlement.md`).
- `kyc-docs-site/src/content/docs/reference/field-atlas/destinations/<destination-slug>.md` — 14 per-destination sub-pages (`kra.md`, `ckyc.md`, `nse-ucc.md`, `bse-ucc.md`, `mcx-ucc.md`, `cdsl-bo.md`, `nsdl-bo.md`, `back-office.md`, `rms.md`, `contract-notes.md`, `regulatory-reports.md`, `dlt-comms.md`, `fatca-crs.md`, `aml-fiu.md`).
- `kyc-docs-site/public/field-atlas-master.csv` — downloadable CSV asset.

**Files to modify:**

- `kyc-docs-site/astro.config.mjs` — add collapsed "Field Atlas" sub-group under Reference.

**Files to create (temporary, gitignored, deleted-or-kept at end):**

- `working/SCHEMA_FIELD_ATLAS.md` — per-row schema contract.
- `working/field-atlas/<cluster>.psv` — 6 agent outputs (pipe-separated values).
- `working/field-atlas-master.psv` — consolidated working CSV.
- `working/build_field_atlas_data.py` — data consolidator.
- `working/build_field_atlas_pages.py` — markdown / CSV emitter.

---

## Phase 1 — Setup (Tasks 1–3)

### Task 1: Create directories

**Files:**
- Create: `working/field-atlas/`, `kyc-docs-site/src/content/docs/reference/field-atlas/sections/`, `kyc-docs-site/src/content/docs/reference/field-atlas/destinations/`.

- [ ] **Step 1: Create directories**

```bash
mkdir -p /home/rakesh/work/broking-kyc/working/field-atlas \
         /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/field-atlas/sections \
         /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/field-atlas/destinations
ls /home/rakesh/work/broking-kyc/working/
```

Expected: `field-atlas/` listed under `working/`; new dirs in the docs tree.

- [ ] **Step 2: Verify working/field-atlas is gitignored**

```bash
git -C /home/rakesh/work/broking-kyc check-ignore -v working/field-atlas
```

Expected: shown ignored by existing `working/` rule.

---

### Task 2: Schema contract

**Files:**
- Create: `working/SCHEMA_FIELD_ATLAS.md`

- [ ] **Step 1: Write the schema document**

Write to `/home/rakesh/work/broking-kyc/working/SCHEMA_FIELD_ATLAS.md`:

````markdown
# Field-Atlas Row Schema (v1)

Every agent's output is a pipe-separated-values (PSV) file. Header row required.

## PSV columns (11 columns, in order)

`source_section|source_section_name|field_id|field_name|destination|destination_field_name|destination_format|frequency|transformation|quirks_notes|spec_source`

## Column definitions

- `source_section`: master-dataset section ID (single letter A–Z, or AA / AB / AC).
- `source_section_name`: human-readable section name (e.g., "Personal Identity").
- `field_id`: canonical field ID. Format: `<section>-<snake_case_name>` (e.g., `A-pan_number`, `G-bank_account_no`, `S-kra_status_code`). Must align with master-dataset.md field references where possible.
- `field_name`: human-readable field name (e.g., "PAN Number", "Bank Account Number").
- `destination`: one of the 14 closed-vocab values:
  - `kra` | `ckyc` | `nse-ucc` | `bse-ucc` | `mcx-ucc` | `cdsl-bo` | `nsdl-bo` | `back-office` | `rms` | `contract-notes` | `regulatory-reports` | `dlt-comms` | `fatca-crs` | `aml-fiu`
- `destination_field_name`: name at destination. If identical to source, use `[same]`.
- `destination_format`: length / type at destination (e.g., `CHAR(10)`, `VARCHAR(80)`, `DATE YYYYMMDD`, `NUMBER(15,2)`).
- `frequency`: when this field flows. Closed vocab: `one-time | on-modify | daily | on-trade | EOD | on-event`.
- `transformation`: closed list: `[direct]` | `uppercase` | `lowercase` | `truncate to N` | `concat with X` | `derived from Y` | `null-if-Z` | `lookup against R` | `formatted` | `[manual]`.
- `quirks_notes`: free-text gotcha (rejection rules, special-case formatting, validation behavior). Max ~200 chars.
- `spec_source`: citation. Either a circular ID present in `kyc-docs-site/src/content/docs/reference/circulars/*.md` (e.g., `SEBI/HO/MIRSD/SECFATF/P/CIR/2024/79`), a public vendor doc URL, or the literal `[industry typical]` if no public source.

## Validation rules

1. `source_section` must match `^[A-Z]$` or `^A[A-C]$` (single letter A–Z, or AA / AB / AC).
2. `destination` must be in closed vocab.
3. `frequency` must be in closed vocab.
4. `transformation` must be in closed vocab or `[manual]`.
5. No blank fields. Use `[same]`, `[direct]`, `[industry typical]`, or `none` rather than blanks.
6. Pipe character (`|`) inside any field MUST be escaped as `\|` (use Python's `csv.writer` with delimiter `|` and quoting QUOTE_ALL when emitting — this handles escaping automatically).

## OPEN_QUESTIONS

End each agent's PSV file with a Markdown comment block:

```
# OPEN_QUESTIONS
# - <free-text notes about ambiguous destinations, missing spec sources, etc.>
```

## Example rows

```
source_section|source_section_name|field_id|field_name|destination|destination_field_name|destination_format|frequency|transformation|quirks_notes|spec_source
A|Personal Identity|A-pan_number|PAN Number|kra|PAN_NO|CHAR(10)|on-modify|uppercase|alphanumeric; 4th char identifies entity type|SEBI/HO/MIRSD/MIRSD-SEC-2/P/CIR/2023/168
A|Personal Identity|A-pan_number|PAN Number|ckyc|PAN|CHAR(10)|one-time|uppercase|same as KRA; CERSAI uses ISO 3166 alpha-3 for country code|CKYC/2024/04
A|Personal Identity|A-pan_number|PAN Number|nse-ucc|PAN|CHAR(10)|on-modify|uppercase|3-param check (PAN+Name+DOB) against Protean; rejection codes A=approved, X=mismatch|NSE/MA/...
```
````

- [ ] **Step 2: Verify**

```bash
wc -l /home/rakesh/work/broking-kyc/working/SCHEMA_FIELD_ATLAS.md
```

Expected: ≥ 40 lines.

---

### Task 3: Phase 1 checkpoint

- [ ] **Step 1: Confirm setup complete**

```bash
ls /home/rakesh/work/broking-kyc/working/ | grep -E 'field-atlas|SCHEMA_FIELD'
ls /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/field-atlas/
```

Expected: `field-atlas/` dir, `SCHEMA_FIELD_ATLAS.md` file, `sections/` and `destinations/` dirs.

- [ ] **Step 2: No commit needed**

All Phase 1 outputs are either gitignored (working/) or empty dirs (will be filled by build script in Phase 4).

---

## Phase 2 — Parallel dispatch (Task 4)

### Task 4: Dispatch all 6 cluster agents in one tool-use message

Each agent uses `subagent_type: "general-purpose"`, `run_in_background: true`.

Common prompt structure:

```
You're contributing to the broking-kyc project's Field-level Data Flow Atlas (sub-project #3),
in parallel with 5 sibling cluster agents.

**Output:** Write to `/home/rakesh/work/broking-kyc/working/field-atlas/<cluster>.psv` using the
Write tool. Create fresh. First line is the schema header; one row per field-destination pair.

**Schema:** Conform exactly to `/home/rakesh/work/broking-kyc/working/SCHEMA_FIELD_ATLAS.md`. Read
it first. PSV (pipe-separated) format; pipe characters inside fields must be escaped or quoted.

**Inputs to read:**
- `kyc-docs-site/src/content/docs/reference/master-dataset.md` — canonical field IDs and section
  structure. Use these field IDs verbatim where possible.
- `kyc-docs-site/src/content/docs/reference/circulars/<relevant>.md` — for spec_source citations.

**Your destinations:** <list per agent below>

**Method:**
1. Read SCHEMA_FIELD_ATLAS.md.
2. Read master-dataset.md; build a mental list of all fields, with section context.
3. For each destination, research the file format / API spec via WebFetch + WebSearch against
   the existing circulars and public vendor docs. For NSE/BSE/MCX UCC, CDSL/NSDL BO,
   regulatory file formats, consult the relevant circular sub-pages.
4. For each field that flows to this destination, write a PSV row with all 11 columns.
5. Tag rows where the public spec is unavailable as `spec_source = [industry typical]` with a
   `quirks_notes` describing typical behavior.
6. End the file with `# OPEN_QUESTIONS` block.

**Rules:**
- All 11 columns must be populated. No blanks.
- Use closed-vocab values for `destination`, `frequency`, `transformation`.
- Field IDs must be `<section>-<snake_case>` format aligned with master-dataset.md.
- Target row count: <per-agent range below>.

**Return:** PSV row count by destination, count of `[industry typical]` rows, summary of
dominant field types per destination.
```

#### Agent A — Identity Registries (KRA + CKYC)

Output path: `working/field-atlas/agent-a-kra-ckyc.psv`. Target: 150–250 rows.

**Destinations:** `kra`, `ckyc`.

**Key spec sources:** CERSAI templates T1/T2/Legal Entity; SEBI MIRSD circulars on KYC; KRA master format (CVL / NDML / DOTEX / CAMS / KFintech all use the same standard).

**Field coverage:** Master-dataset sections A (Personal Identity), B (Address), C (Contact), D (POI), E (POA), F (Financial Profile), G (Bank), J (FATCA/CRS), K (PEP/AML), S (KRA Submission Data), T (CKYC Submission Data).

#### Agent B — Exchange Registration (NSE UCC + BSE UCC + MCX UCC)

Output path: `working/field-atlas/agent-b-exchange-ucc.psv`. Target: 150–300 rows.

**Destinations:** `nse-ucc`, `bse-ucc`, `mcx-ucc`.

**Key spec sources:** NSE UCC API / batch file circulars; BSE BEFS notices; MCX UCC pipe-delimited format with commodity-category and income-proof fields. Reference circulars at `circulars/nse.md`, `circulars/bse.md`, `circulars/mcx.md`.

**Field coverage:** Sections A (PAN, Name, DOB), B (Address), C (Contact), F (Income for F&O/COM), L (Trading Preferences / Segments), U (Exchange Registration UCC). For MCX, additional fields from commodity-category and ERROR-account requirements.

#### Agent C — Depository BO (CDSL + NSDL)

Output path: `working/field-atlas/agent-c-depository-bo.psv`. Target: 120–200 rows.

**Destinations:** `cdsl-bo`, `nsdl-bo`.

**Key spec sources:** CDSL communiques (fixed-length lines 01–07 format); NSDL UDiFF (ISO-tagged) circulars. Reference `circulars/cdsl.md` and `circulars/nsdl.md`.

**Field coverage:** Sections A (Identity), B (Address), C (Contact), G (Bank — depository links bank for payouts), H (Demat Account Details), I (Nomination — depositories store nominee data), O (DDPI).

#### Agent D — Internal Systems (Back-office + RMS)

Output path: `working/field-atlas/agent-d-internal.psv`. Target: 200–350 rows.

**Destinations:** `back-office`, `rms`.

**Key spec sources:** Vendor-neutral; describe typical back-office and RMS field needs based on master-dataset and the broker process narrative (Section 2 — Trading Day operator's view). Many rows will be tagged `[industry typical]` since back-office is vendor-specific.

**Field coverage:** Back-office consumes nearly all fields (ledger, contract note, statement, charges, brokerage). RMS focuses on segment / position / margin / risk-attributes / available-margin envelope.

#### Agent E — Computed Flows (Contract Notes + Regulatory Reports)

Output path: `working/field-atlas/agent-e-computed.psv`. Target: 80–150 rows.

**Destinations:** `contract-notes`, `regulatory-reports`.

**Key spec sources:** SEBI ECN format prescribed by ICAI/SEBI; clearing-corp file specs for DMF, CFR, peak margin (reference `circulars/clearing-corps.md`).

**Field coverage:** Contract notes derive most fields from trade execution + client master + brokerage computation. Regulatory reports (DMF / CFR / peak margin) carry margin / position / client identifier fields.

#### Agent F — Comms + Financial Intelligence (DLT + FATCA/CRS + AML/FIU)

Output path: `working/field-atlas/agent-f-comms-fi.psv`. Target: 80–150 rows.

**Destinations:** `dlt-comms`, `fatca-crs`, `aml-fiu`.

**Key spec sources:** TRAI DLT framework for SMS/email; SEBI FATCA centralization circular (Feb 2024); FIU-IND FINnet 2.0 format. Reference `circulars/fiu-ind.md` and `circulars/sebi-mirsd.md`.

**Field coverage:** DLT comms uses minimal fields (header / template ID / variable slots like name, amount, contract ID). FATCA/CRS uses TIN, country-of-residence, FATCA-CRS declarations. AML/FIU STR/CTR use client identifier + transaction context.

- [ ] **Step 1: Dispatch all 6 agents in one message**

Send one tool-use message with 6 `Agent` calls, each with the per-cluster prompt above. Use `run_in_background: true`.

- [ ] **Step 2: Confirm dispatch**

6 "Async agent launched" notifications with agent IDs. Wait for harness completion notifications.

---

## Phase 3 — Verification (Task 5)

### Task 5: Verify agent outputs against schema

- [ ] **Step 1: Per-file row counts**

```bash
cd /home/rakesh/work/broking-kyc
for f in working/field-atlas/*.psv; do
  total=$(grep -v '^#' "$f" | grep -c '|')
  header=$(head -1 "$f" | grep -c 'source_section')
  rows=$((total - header))
  printf "%-50s rows=%d\n" "$(basename $f)" "$rows"
done
```

Expected: 6 files; row counts within per-agent target ranges (combined target ≥ 1,500).

- [ ] **Step 2: Column-count validation**

```bash
for f in working/field-atlas/*.psv; do
  echo "=== $f ==="
  awk -F'|' '!/^#/ && NF != 11 {print NR": NF="NF; bad++} END {print "  bad rows: "bad+0}' "$f"
done
```

Expected: 0 bad rows per file (every row has exactly 11 pipe-separated columns).

- [ ] **Step 3: Closed-vocab validation**

```bash
for f in working/field-atlas/*.psv; do
  echo "=== $f ==="
  echo "  bad destinations:"
  awk -F'|' '!/^#/ && NR>1 && $5 !~ /^(kra|ckyc|nse-ucc|bse-ucc|mcx-ucc|cdsl-bo|nsdl-bo|back-office|rms|contract-notes|regulatory-reports|dlt-comms|fatca-crs|aml-fiu)$/ {print NR": "$5}' "$f" | head -5
  echo "  bad frequencies:"
  awk -F'|' '!/^#/ && NR>1 && $8 !~ /^(one-time|on-modify|daily|on-trade|EOD|on-event)$/ {print NR": "$8}' "$f" | head -5
done
```

Expected: empty for all files.

- [ ] **Step 4: Spec-source coverage**

```bash
total=0
typical=0
for f in working/field-atlas/*.psv; do
  t=$(awk -F'|' '!/^#/ && NR>1 {print}' "$f" | wc -l)
  it=$(awk -F'|' '!/^#/ && NR>1 && $11 == "[industry typical]" {print}' "$f" | wc -l)
  total=$((total + t))
  typical=$((typical + it))
  printf "%-50s total=%d  industry-typical=%d  spec-cited=%d (%.1f%%)\n" "$(basename $f)" "$t" "$it" "$((t - it))" "$(echo "scale=1; ($t - $it) * 100 / $t" | bc)"
done
echo "GRAND TOTAL: rows=$total  industry-typical=$typical  spec-cited=$((total - typical))"
```

Expected: ≥ 90% of rows have a non-`[industry typical]` spec source.

- [ ] **Step 5: OPEN_QUESTIONS presence**

```bash
for f in working/field-atlas/*.psv; do
  if grep -q '^# OPEN_QUESTIONS' "$f"; then echo "✓ $f"; else echo "✗ MISSING in $f"; fi
done
```

Expected: all 6 files have the block.

---

## Phase 4 — Consolidation (Tasks 6–8)

### Task 6: Write `working/build_field_atlas_data.py`

**Files:**
- Create: `working/build_field_atlas_data.py`

- [ ] **Step 1: Write the data-consolidation script**

Write to `/home/rakesh/work/broking-kyc/working/build_field_atlas_data.py`:

```python
#!/usr/bin/env python3
"""
Consolidate 6 agent PSV files into a master CSV + working PSV.
- Reads working/field-atlas/*.psv.
- Validates 11-column schema; closed-vocab destination / frequency.
- Deduplicates exact-row duplicates.
- Sorts by source_section, field_id, destination.
- Emits master CSV at kyc-docs-site/public/field-atlas-master.csv (QUOTE_ALL CSV).
- Emits working PSV copy at working/field-atlas-master.psv for the page-builder.
- Prints stats: rows by destination, rows by section, orphan field IDs, industry-typical %.
"""
import csv
import re
from collections import defaultdict
from pathlib import Path

REPO = Path("/home/rakesh/work/broking-kyc")
SRC_DIR = REPO / "working" / "field-atlas"
MASTER_DATASET = REPO / "kyc-docs-site" / "src" / "content" / "docs" / "reference" / "master-dataset.md"
OUT_CSV = REPO / "kyc-docs-site" / "public" / "field-atlas-master.csv"
OUT_PSV = REPO / "working" / "field-atlas-master.psv"

HEADER = ["source_section", "source_section_name", "field_id", "field_name", "destination", "destination_field_name", "destination_format", "frequency", "transformation", "quirks_notes", "spec_source"]

DESTINATIONS = {"kra", "ckyc", "nse-ucc", "bse-ucc", "mcx-ucc", "cdsl-bo", "nsdl-bo", "back-office", "rms", "contract-notes", "regulatory-reports", "dlt-comms", "fatca-crs", "aml-fiu"}
FREQUENCIES = {"one-time", "on-modify", "daily", "on-trade", "EOD", "on-event"}


def parse_master_dataset_field_ids():
    """Best-effort extract of canonical field IDs from master-dataset.md."""
    text = MASTER_DATASET.read_text(encoding="utf-8")
    # Field IDs in master-dataset appear in various forms; extract anything that
    # looks like <SECTION>-<snake_case> after relevant markers.
    ids = set()
    for m in re.finditer(r"\b([A-Z]{1,2})-([a-z][a-z0-9_]*)\b", text):
        ids.add(f"{m.group(1)}-{m.group(2)}")
    return ids


def main():
    all_rows = []
    bad_schema = 0
    bad_dest = 0
    bad_freq = 0

    for fp in sorted(SRC_DIR.glob("*.psv")):
        with fp.open() as fh:
            reader = csv.reader(fh, delimiter="|", quoting=csv.QUOTE_NONE, escapechar="\\")
            header_seen = False
            for line_no, row in enumerate(reader, 1):
                if not row or row[0].startswith("#"):
                    continue
                if not header_seen:
                    header_seen = True
                    continue  # skip header
                if len(row) != 11:
                    bad_schema += 1
                    continue
                if row[4] not in DESTINATIONS:
                    bad_dest += 1
                if row[7] not in FREQUENCIES:
                    bad_freq += 1
                all_rows.append(row + [fp.name])
    print(f"Total parsed rows:    {len(all_rows)}")
    print(f"Schema-bad rows:      {bad_schema}")
    print(f"Bad destinations:     {bad_dest}")
    print(f"Bad frequencies:      {bad_freq}")

    # Dedupe exact rows (ignore source-file column)
    seen = set()
    deduped = []
    dupes = 0
    for r in all_rows:
        key = tuple(r[:11])
        if key in seen:
            dupes += 1
            continue
        seen.add(key)
        deduped.append(r)
    print(f"Duplicates dropped:   {dupes}")
    print(f"Unique rows:          {len(deduped)}")

    # Sort by source_section, field_id, destination
    deduped.sort(key=lambda r: (r[0], r[2], r[4]))

    # Orphan field-ID check
    master_ids = parse_master_dataset_field_ids()
    orphans = sum(1 for r in deduped if r[2] not in master_ids)
    print(f"Orphan field IDs (not in master-dataset): {orphans} / {len(deduped)}")

    # Industry-typical %
    typical = sum(1 for r in deduped if r[10] == "[industry typical]")
    print(f"Industry-typical rows: {typical} ({100 * typical / max(len(deduped), 1):.1f}%)")

    # Per-destination counts
    print("\nPer-destination row counts:")
    by_dest = defaultdict(int)
    for r in deduped:
        by_dest[r[4]] += 1
    for d, c in sorted(by_dest.items(), key=lambda x: -x[1]):
        print(f"  {d:30s} {c}")

    # Per-section counts
    print("\nPer-section row counts:")
    by_sec = defaultdict(int)
    for r in deduped:
        by_sec[r[0]] += 1
    for s, c in sorted(by_sec.items()):
        print(f"  {s:5s} {c}")

    # Emit master CSV
    OUT_CSV.parent.mkdir(parents=True, exist_ok=True)
    with OUT_CSV.open("w", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh, quoting=csv.QUOTE_ALL)
        w.writerow(HEADER)
        for r in deduped:
            w.writerow(r[:11])
    print(f"\nWrote master CSV: {OUT_CSV}")

    # Emit working PSV
    with OUT_PSV.open("w", encoding="utf-8") as fh:
        fh.write("|".join(HEADER) + "\n")
        for r in deduped:
            cleaned = [c.replace("|", "\\|") for c in r[:11]]
            fh.write("|".join(cleaned) + "\n")
    print(f"Wrote working PSV: {OUT_PSV}")


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run it**

```bash
python3 /home/rakesh/work/broking-kyc/working/build_field_atlas_data.py 2>&1 | tail -40
```

Expected: prints row counts; emits CSV at `kyc-docs-site/public/field-atlas-master.csv` and PSV at `working/field-atlas-master.psv`. ≥ 1,500 unique rows; ≥ 90% spec-cited.

- [ ] **Step 3: Spot-check CSV**

```bash
head -3 /home/rakesh/work/broking-kyc/kyc-docs-site/public/field-atlas-master.csv
wc -l /home/rakesh/work/broking-kyc/kyc-docs-site/public/field-atlas-master.csv
```

Expected: header row + ≥ 1,500 data rows; all quoted with double-quotes.

---

### Task 7: Write `working/build_field_atlas_pages.py`

**Files:**
- Create: `working/build_field_atlas_pages.py`

- [ ] **Step 1: Write the page-emission script**

Write to `/home/rakesh/work/broking-kyc/working/build_field_atlas_pages.py`:

```python
#!/usr/bin/env python3
"""
Build markdown pages from working/field-atlas-master.psv:
- 1 overview page at reference/field-atlas.md
- 30 per-section sub-pages at reference/field-atlas/sections/<slug>.md
- 14 per-destination sub-pages at reference/field-atlas/destinations/<slug>.md

All pages follow project documentation conventions.
"""
import re
from collections import defaultdict
from pathlib import Path

REPO = Path("/home/rakesh/work/broking-kyc")
PSV = REPO / "working" / "field-atlas-master.psv"
DOCS = REPO / "kyc-docs-site" / "src" / "content" / "docs" / "reference"
OVERVIEW = DOCS / "field-atlas.md"
SEC_DIR = DOCS / "field-atlas" / "sections"
DEST_DIR = DOCS / "field-atlas" / "destinations"

DESTINATION_LABEL = {
    "kra": "KRA (Identity Registry)",
    "ckyc": "CKYC (Central KYC Registry)",
    "nse-ucc": "NSE UCC",
    "bse-ucc": "BSE UCC",
    "mcx-ucc": "MCX UCC",
    "cdsl-bo": "CDSL BO Opening",
    "nsdl-bo": "NSDL BO Opening",
    "back-office": "Back-office (vendor-neutral)",
    "rms": "RMS (Risk Management System)",
    "contract-notes": "Contract Notes / ECN",
    "regulatory-reports": "Regulatory Reports (DMF / CFR / Peak Margin)",
    "dlt-comms": "DLT Comms (SMS / Email)",
    "fatca-crs": "FATCA / CRS Reports",
    "aml-fiu": "AML Reports to FIU-IND",
}

SECTION_SLUG = {
    "A": "a-personal-identity", "B": "b-address-details", "C": "c-contact-details",
    "D": "d-identity-documents", "E": "e-address-documents", "F": "f-financial-profile",
    "G": "g-bank-account", "H": "h-demat-account", "I": "i-nomination",
    "J": "j-fatca-crs", "K": "k-pep-aml", "L": "l-trading-preferences",
    "M": "m-risk-profiling", "N": "n-ipv-vipv", "O": "o-ddpi",
    "P": "p-consent-declarations", "Q": "q-document-images", "R": "r-third-party-verification",
    "S": "s-kra-submission", "T": "t-ckyc-submission", "U": "u-exchange-registration",
    "V": "v-nri-specific", "W": "w-minor-joint", "X": "x-margin-pledge",
    "Y": "y-account-lifecycle", "Z": "z-audit-trail", "AA": "aa-dpdp-consent",
    "AB": "ab-communication-preferences", "AC": "ac-running-account-settlement",
}

DEST_SLUG = {k: k for k in DESTINATION_LABEL}


def parse_psv():
    rows = []
    with PSV.open() as fh:
        header = fh.readline().strip().split("|")
        for line in fh:
            parts = [p.replace("\\|", "|") for p in line.rstrip("\n").split("|")]
            if len(parts) != 11:
                continue
            rows.append(dict(zip(header, parts)))
    return rows


def write_table(fh, rows, columns):
    fh.write("| " + " | ".join(columns) + " |\n")
    fh.write("|" + "|".join([" --- "] * len(columns)) + "|\n")
    for r in rows:
        cells = []
        for c in columns:
            v = (r.get(c, "") or "").replace("|", "\\|").replace("\n", " ").strip()
            cells.append(v)
        fh.write("| " + " | ".join(cells) + " |\n")


def write_overview(rows):
    by_dest = defaultdict(int)
    by_sec = defaultdict(int)
    typical = 0
    for r in rows:
        by_dest[r["destination"]] += 1
        by_sec[r["source_section"]] += 1
        if r["spec_source"] == "[industry typical]":
            typical += 1

    with OVERVIEW.open("w", encoding="utf-8") as fh:
        fh.write("---\n")
        fh.write("title: Field-level Data Flow Atlas\n")
        fh.write('description: "Bidirectional mapping of every KYC field to its downstream destinations — KRA, CKYC, exchange UCC, depository BO, back-office, RMS, contract notes, regulatory reports, DLT comms, FATCA/CRS, AML/FIU. Browse by section (field-first view) or by destination (system-first view). Includes downloadable master CSV."\n')
        fh.write("---\n\n")

        fh.write("> **Why this page is structured this way:** Two views on the same dataset. Engineers building an integration with a specific destination land here, scan the destination sub-pages, and pull the master CSV for programmatic use. Product / compliance readers scan the per-section sub-pages to see where each onboarded field ends up.\n\n")

        fh.write("## TL;DR\n\n")
        fh.write(f"- **{len(rows)} field-destination relationships** mapped across {len(by_sec)} master-dataset sections and {len(by_dest)} destination systems.\n")
        fh.write(f"- **{len(rows) - typical} rows ({100 * (len(rows) - typical) / max(len(rows), 1):.1f}%)** cite a public regulatory or vendor specification source.\n")
        fh.write(f"- **{typical}** rows are tagged `[industry typical]` where no public spec was reachable — verify with vendor before acting.\n")
        fh.write("- **Downloadable CSV:** [field-atlas-master.csv](/broking-kyc/field-atlas-master.csv) (all rows, all columns, quoted-CSV).\n")
        fh.write("- AI-generated synthesis; verify each row against the cited circular or vendor doc before implementation.\n\n")

        fh.write("## Conceptual overview\n\n")
        fh.write("Every field captured during onboarding (or generated during operations) ends up in multiple downstream systems with potentially different field names, formats, lengths, and update frequencies. This atlas maps those flows explicitly. The per-section view (below) groups by where the field is captured; the per-destination view groups by where it is consumed. The [Master Dataset](/broking-kyc/reference/master-dataset/) is the canonical source for field definitions; this atlas adds the downstream picture.\n\n")

        fh.write("## Browse by section (field-first)\n\n")
        fh.write("Sections A through AC follow the [Master Dataset](/broking-kyc/reference/master-dataset/) order.\n\n")
        fh.write("| Section | Field-destination rows | Page |\n| --- | --- | --- |\n")
        for sec in sorted(by_sec.keys(), key=lambda s: (len(s), s)):
            slug = SECTION_SLUG.get(sec, sec.lower())
            fh.write(f"| {sec} | {by_sec[sec]} | [{sec}](./field-atlas/sections/{slug}/) |\n")
        fh.write("\n")

        fh.write("## Browse by destination (system-first)\n\n")
        fh.write("Each destination's page shows the fields it consumes with format / frequency / quirks per row.\n\n")
        fh.write("| Destination | Field-destination rows | Page |\n| --- | --- | --- |\n")
        for dest in sorted(by_dest.keys(), key=lambda d: -by_dest[d]):
            label = DESTINATION_LABEL.get(dest, dest)
            slug = DEST_SLUG.get(dest, dest)
            fh.write(f"| {label} | {by_dest[dest]} | [{dest}](./field-atlas/destinations/{slug}/) |\n")
        fh.write("\n")

        fh.write("## Practical notes\n\n")
        fh.write("- **[industry practice]** For any integration build, start at the destination sub-page — it lists every field the destination needs, its format, and its quirks. Then map back to the master-dataset to confirm source fields exist.\n")
        fh.write("- **[gotcha]** Same field can have different names at different destinations (`PAN` at KRA, `PAN_NO` at NSE UCC, `pan_number` in back-office). The `destination_field_name` column is the destination's literal name; the `field_id` is the source canonical ID.\n")
        fh.write("- **[cost optimization]** Use the master CSV programmatically for impact analysis: `awk -F',' '$3 == \"\\\"A-pan_number\\\"\" {print $5}' field-atlas-master.csv` lists every destination that consumes PAN.\n")
        fh.write("- **[risk trade-off]** Rows tagged `[industry typical]` are best-guess descriptions of vendor-specific behavior; they're useful for design but require vendor confirmation before production use.\n\n")

        fh.write("## Verified through\n\n2026-05-14\n\n---\n\n")
        fh.write("*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*\n")
    print(f"Wrote {OVERVIEW}")


def write_section_pages(rows):
    SEC_DIR.mkdir(parents=True, exist_ok=True)
    by_sec = defaultdict(list)
    section_names = {}
    for r in rows:
        by_sec[r["source_section"]].append(r)
        section_names[r["source_section"]] = r["source_section_name"]

    for sec, sec_rows in by_sec.items():
        slug = SECTION_SLUG.get(sec, sec.lower())
        out = SEC_DIR / f"{slug}.md"
        sec_name = section_names.get(sec, sec)
        with out.open("w", encoding="utf-8") as fh:
            fh.write("---\n")
            fh.write(f"title: \"Section {sec}: {sec_name} — Data Flow\"\n")
            fh.write(f'description: "Where each field in Section {sec} ({sec_name}) flows downstream — destinations, formats, frequencies, transformations, quirks."\n')
            fh.write("---\n\n")
            fh.write(f"> **Why this page is structured this way:** This is the field-first view for Section {sec}. Each row is one field-destination relationship. To see the same data from the destination's perspective, jump to the [destination view](/broking-kyc/reference/field-atlas/) from the atlas overview.\n\n")
            fh.write("## TL;DR\n\n")
            unique_fields = len({r["field_id"] for r in sec_rows})
            fh.write(f"- **{unique_fields} unique fields** in Section {sec}.\n")
            fh.write(f"- **{len(sec_rows)} field-destination relationships** total.\n")
            fh.write(f"- Source-of-truth field definitions: [Master Dataset Section {sec}](/broking-kyc/reference/master-dataset/).\n\n")
            fh.write("## Data flow table\n\n")
            fh.write("Sorted by `field_id`, then `destination`.\n\n")
            sec_rows_sorted = sorted(sec_rows, key=lambda r: (r["field_id"], r["destination"]))
            write_table(fh, sec_rows_sorted, ["field_id", "field_name", "destination", "destination_field_name", "destination_format", "frequency", "transformation", "quirks_notes", "spec_source"])
            fh.write("\n## Verified through\n\n2026-05-14\n\n---\n\n")
            fh.write("*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*\n")
        print(f"Wrote {out} ({len(sec_rows)} rows)")


def write_destination_pages(rows):
    DEST_DIR.mkdir(parents=True, exist_ok=True)
    by_dest = defaultdict(list)
    for r in rows:
        by_dest[r["destination"]].append(r)

    for dest, dest_rows in by_dest.items():
        slug = DEST_SLUG.get(dest, dest)
        out = DEST_DIR / f"{slug}.md"
        label = DESTINATION_LABEL.get(dest, dest)
        with out.open("w", encoding="utf-8") as fh:
            fh.write("---\n")
            fh.write(f"title: \"{label} — Fields consumed\"\n")
            fh.write(f'description: "Every field consumed by {label}, with source section, destination format, update frequency, transformation rule, and quirks. Use this when building an integration with this destination."\n')
            fh.write("---\n\n")
            fh.write(f"> **Why this page is structured this way:** This is the destination-first view for {label}. Engineers building an integration with this destination get the complete field list on one page. To see where each field originated in onboarding, follow the per-section links via the [atlas overview](/broking-kyc/reference/field-atlas/).\n\n")
            fh.write("## TL;DR\n\n")
            unique_fields = len({r["field_id"] for r in dest_rows})
            sections = sorted({r["source_section"] for r in dest_rows}, key=lambda s: (len(s), s))
            typical = sum(1 for r in dest_rows if r["spec_source"] == "[industry typical]")
            fh.write(f"- **{unique_fields} unique fields** consumed by {label}.\n")
            fh.write(f"- Source spans master-dataset sections: {', '.join(sections)}.\n")
            fh.write(f"- **{len(dest_rows) - typical} rows cite a public spec source**; **{typical}** are `[industry typical]`.\n")
            fh.write("\n## Field-destination rows\n\n")
            fh.write("Sorted by `source_section`, then `field_id`.\n\n")
            dest_rows_sorted = sorted(dest_rows, key=lambda r: (r["source_section"], r["field_id"]))
            write_table(fh, dest_rows_sorted, ["source_section", "field_id", "field_name", "destination_field_name", "destination_format", "frequency", "transformation", "quirks_notes", "spec_source"])
            fh.write("\n## Verified through\n\n2026-05-14\n\n---\n\n")
            fh.write("*AI-generated and not legal advice. See the project [README](https://github.com/javajack/broking-kyc) for full disclaimer.*\n")
        print(f"Wrote {out} ({len(dest_rows)} rows)")


def main():
    rows = parse_psv()
    print(f"Parsed {len(rows)} rows from {PSV}")
    write_overview(rows)
    write_section_pages(rows)
    write_destination_pages(rows)


if __name__ == "__main__":
    main()
```

- [ ] **Step 2: Run it**

```bash
python3 /home/rakesh/work/broking-kyc/working/build_field_atlas_pages.py 2>&1 | tail -50
```

Expected: writes 1 overview + 30 section pages + 14 destination pages.

- [ ] **Step 3: Spot-check outputs**

```bash
ls /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/field-atlas.md /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/field-atlas/sections/ /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/field-atlas/destinations/ 2>&1 | head -50
wc -l /home/rakesh/work/broking-kyc/kyc-docs-site/src/content/docs/reference/field-atlas.md
```

Expected: overview page present; ~30 section pages and ~14 destination pages listed.

---

### Task 8: Astro build verification

- [ ] **Step 1: Build**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -20
```

Expected: build complete, ~120 pages now built (74 prior + 45 new + overview).

- [ ] **Step 2: CSV asset reachable**

```bash
ls /home/rakesh/work/broking-kyc/kyc-docs-site/dist/field-atlas-master.csv
wc -l /home/rakesh/work/broking-kyc/kyc-docs-site/dist/field-atlas-master.csv
```

Expected: CSV present in dist; row count matches Phase 4 Task 6 output.

- [ ] **Step 3: Commit Phase 4 output**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/public/field-atlas-master.csv
git add kyc-docs-site/src/content/docs/reference/field-atlas.md
git add kyc-docs-site/src/content/docs/reference/field-atlas/
git commit -m "$(cat <<'EOF'
Add Field-level Data Flow Atlas

Sub-project #3 deliverable: 1 overview page + 30 per-section sub-pages
+ 14 per-destination sub-pages + 1 downloadable master CSV (~2,000+
field-destination rows) mapping every field's downstream trajectory
across KRA, CKYC, exchange UCC (NSE/BSE/MCX), depository BO (CDSL/NSDL),
back-office, RMS, contract notes, regulatory reports, DLT comms,
FATCA/CRS, AML/FIU. Each row: source section, field ID, destination,
destination field name, format, frequency, transformation, quirks,
spec source.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>
EOF
)" 2>&1 | tail -5
```

---

## Phase 5 — Sidebar + README (Tasks 9–10)

### Task 9: Update Astro sidebar

**Files:**
- Modify: `kyc-docs-site/astro.config.mjs`

- [ ] **Step 1: Add Field Atlas collapsed sub-group under Reference**

In `astro.config.mjs`, find the `label: "Reference"` block. Add a new collapsed sub-group **after** the existing `"Regulatory Circulars"` block:

```js
{
  label: "Field Atlas",
  collapsed: true,
  items: [
    { label: "Overview", slug: "reference/field-atlas" },
    {
      label: "By Section",
      collapsed: true,
      items: [
        { label: "A — Personal Identity", slug: "reference/field-atlas/sections/a-personal-identity" },
        { label: "B — Address Details", slug: "reference/field-atlas/sections/b-address-details" },
        { label: "C — Contact Details", slug: "reference/field-atlas/sections/c-contact-details" },
        { label: "D — Identity Documents", slug: "reference/field-atlas/sections/d-identity-documents" },
        { label: "E — Address Documents", slug: "reference/field-atlas/sections/e-address-documents" },
        { label: "F — Financial Profile", slug: "reference/field-atlas/sections/f-financial-profile" },
        { label: "G — Bank Account", slug: "reference/field-atlas/sections/g-bank-account" },
        { label: "H — Demat Account", slug: "reference/field-atlas/sections/h-demat-account" },
        { label: "I — Nomination", slug: "reference/field-atlas/sections/i-nomination" },
        { label: "J — FATCA/CRS", slug: "reference/field-atlas/sections/j-fatca-crs" },
        { label: "K — PEP/AML", slug: "reference/field-atlas/sections/k-pep-aml" },
        { label: "L — Trading Preferences", slug: "reference/field-atlas/sections/l-trading-preferences" },
        { label: "M — Risk Profiling", slug: "reference/field-atlas/sections/m-risk-profiling" },
        { label: "N — IPV / VIPV", slug: "reference/field-atlas/sections/n-ipv-vipv" },
        { label: "O — DDPI", slug: "reference/field-atlas/sections/o-ddpi" },
        { label: "P — Consent & Declarations", slug: "reference/field-atlas/sections/p-consent-declarations" },
        { label: "Q — Document Images", slug: "reference/field-atlas/sections/q-document-images" },
        { label: "R — Third-Party Verification", slug: "reference/field-atlas/sections/r-third-party-verification" },
        { label: "S — KRA Submission", slug: "reference/field-atlas/sections/s-kra-submission" },
        { label: "T — CKYC Submission", slug: "reference/field-atlas/sections/t-ckyc-submission" },
        { label: "U — Exchange Registration", slug: "reference/field-atlas/sections/u-exchange-registration" },
        { label: "V — NRI-Specific", slug: "reference/field-atlas/sections/v-nri-specific" },
        { label: "W — Minor / Joint", slug: "reference/field-atlas/sections/w-minor-joint" },
        { label: "X — Margin Pledge", slug: "reference/field-atlas/sections/x-margin-pledge" },
        { label: "Y — Account Lifecycle", slug: "reference/field-atlas/sections/y-account-lifecycle" },
        { label: "Z — Audit Trail", slug: "reference/field-atlas/sections/z-audit-trail" },
        { label: "AA — DPDP Consent", slug: "reference/field-atlas/sections/aa-dpdp-consent" },
        { label: "AB — Communication Prefs", slug: "reference/field-atlas/sections/ab-communication-preferences" },
        { label: "AC — Running Account Settlement", slug: "reference/field-atlas/sections/ac-running-account-settlement" },
      ],
    },
    {
      label: "By Destination",
      collapsed: true,
      items: [
        { label: "KRA", slug: "reference/field-atlas/destinations/kra" },
        { label: "CKYC", slug: "reference/field-atlas/destinations/ckyc" },
        { label: "NSE UCC", slug: "reference/field-atlas/destinations/nse-ucc" },
        { label: "BSE UCC", slug: "reference/field-atlas/destinations/bse-ucc" },
        { label: "MCX UCC", slug: "reference/field-atlas/destinations/mcx-ucc" },
        { label: "CDSL BO", slug: "reference/field-atlas/destinations/cdsl-bo" },
        { label: "NSDL BO", slug: "reference/field-atlas/destinations/nsdl-bo" },
        { label: "Back-office", slug: "reference/field-atlas/destinations/back-office" },
        { label: "RMS", slug: "reference/field-atlas/destinations/rms" },
        { label: "Contract Notes", slug: "reference/field-atlas/destinations/contract-notes" },
        { label: "Regulatory Reports", slug: "reference/field-atlas/destinations/regulatory-reports" },
        { label: "DLT Comms", slug: "reference/field-atlas/destinations/dlt-comms" },
        { label: "FATCA / CRS", slug: "reference/field-atlas/destinations/fatca-crs" },
        { label: "AML / FIU-IND", slug: "reference/field-atlas/destinations/aml-fiu" },
      ],
    },
  ],
},
```

Note: One of the sections in master-dataset is missing from agent output (only 23 named in field-summary; master-dataset has 30 — sections X / Y / Z / AA / AB / AC may have zero entries depending on agent output). The build script only emits pages for sections that have rows. Sidebar entries for empty sections should be removed in Step 2.

- [ ] **Step 2: Trim sidebar to actual emitted pages**

```bash
cd /home/rakesh/work/broking-kyc
echo "Sections emitted:"
ls kyc-docs-site/src/content/docs/reference/field-atlas/sections/
echo "Destinations emitted:"
ls kyc-docs-site/src/content/docs/reference/field-atlas/destinations/
```

For each section in the sidebar that doesn't have a corresponding file, remove the sidebar entry. Same for destinations.

- [ ] **Step 3: Build to verify**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | tail -10
```

Expected: build complete, no broken sidebar slug errors.

- [ ] **Step 4: Commit sidebar**

```bash
cd /home/rakesh/work/broking-kyc
git add kyc-docs-site/astro.config.mjs
git commit -m "Expose Field Atlas in sidebar

New Field Atlas collapsed sub-group under Reference with Overview, By
Section (30 entries), and By Destination (14 entries) nested groups.

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

### Task 10: Update README

**Files:**
- Modify: `README.md`

- [ ] **Step 1: Add a Field Atlas link in the Compliance & Vendor Coverage section**

In `README.md`, find the existing `## Compliance & Vendor Coverage` section. Append a third bullet to its list:

```markdown
- **[Field-level Data Flow Atlas](https://javajack.github.io/broking-kyc/reference/field-atlas/)** — bidirectional mapping of every onboarding field to its downstream destinations (KRA, CKYC, exchange UCC, depository BO, back-office, RMS, contract notes, regulatory reports, DLT comms, FATCA/CRS, AML/FIU). Browse by section or by destination; downloadable master CSV.
```

- [ ] **Step 2: Commit**

```bash
cd /home/rakesh/work/broking-kyc
git add README.md
git commit -m "Link Field Atlas from README Compliance & Vendor Coverage section

Co-Authored-By: Claude Opus 4.7 (1M context) <noreply@anthropic.com>"
```

---

## Phase 6 — Memory + final verification (Task 11)

### Task 11: Memory updates + final verification

**Files:**
- Modify: memory files.

- [ ] **Step 1: Create memory entry**

Write `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/field_atlas.md`:

```markdown
---
name: field-atlas
description: Sub-project #3 deliverable (2026-05-14). Bidirectional Field-level Data Flow Atlas at reference/field-atlas with 1 overview + 30 per-section sub-pages + 14 per-destination sub-pages + downloadable master CSV. Maps every field's downstream trajectory across 14 destinations.
metadata:
  type: project
---

The atlas adds destination-mapping to the existing master-dataset.md (which defines fields). Each row: source_section, field_id, field_name, destination, destination_field_name, format, frequency, transformation, quirks, spec_source. Two views on the same underlying dataset — by section (where the field is captured) and by destination (where it's consumed).

**Why:** master-dataset answers "what fields exist"; this atlas answers "where do they flow". Crucial for integration engineering and impact analysis.

**How to apply:**
- Building an integration with a destination (e.g., NSE UCC, NSDL BO): start at the per-destination sub-page; it lists every field consumed with format / frequency / quirks.
- Impact analysis for a field change: start at the per-section sub-page (or grep the master CSV); identifies every downstream system that needs to know.
- Vendor-specific behavior at back-office or RMS: rows tagged `[industry typical]`; verify with vendor before production use.

**Build scripts (gitignored, kept for re-runs):**
- `working/build_field_atlas_data.py` — consolidates 6 agent PSVs into master CSV + working PSV.
- `working/build_field_atlas_pages.py` — emits overview + section + destination pages from PSV.

**CSV asset:** `kyc-docs-site/public/field-atlas-master.csv` — downloadable from the overview page; updated on every re-run of the build scripts.

Related: [[project-overview]], [[blueprint-and-atlas]], [[broker-process-narrative]], [[regulatory-anchors]].
```

- [ ] **Step 2: Update MEMORY.md index**

Append to `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/MEMORY.md`:

```markdown
- [Field Atlas](field_atlas.md) — 2026-05-14: bidirectional field-destination mapping at reference/field-atlas/; 1 overview + 30 section + 14 destination pages + downloadable master CSV
```

- [ ] **Step 3: Update project_overview.md**

Edit `/home/rakesh/.claude/projects/-home-rakesh-work-broking-kyc/memory/project_overview.md` — change the "Sub-projects #1, #2, #6, #7 complete; #3 Field-level Atlas, #4 Integration DAG, #5 KYC Lifecycle beyond onboarding remain queued." sentence to:

```markdown
Sub-projects #1, #2, #3, #6, #7 complete; #4 Integration DAG, #5 KYC Lifecycle beyond onboarding remain queued.
```

- [ ] **Step 4: Final build sanity**

```bash
cd /home/rakesh/work/broking-kyc/kyc-docs-site && npm run build 2>&1 | grep -E '(error|Error|Complete|pages built|\[build\] Complete)' | tail -5
```

Expected: build complete, no errors.

- [ ] **Step 5: Final git state**

```bash
git -C /home/rakesh/work/broking-kyc log --oneline origin/main..HEAD | wc -l
git -C /home/rakesh/work/broking-kyc status -sb
```

Expected: more commits ahead of origin; clean working tree (working/ files gitignored).

---

## Self-review

**Spec coverage** — each spec requirement maps to a task:
- "1 overview + 30 section + 14 destination pages + 1 CSV" → Tasks 6 (CSV), 7 (pages), 8 (build verify)
- "Heavy depth: 11 columns per row" → Task 2 (schema), Task 4 (agent prompts), Task 5 (validation)
- "6 clustered agents" → Task 4
- "Bidirectional navigation" → Task 7 emits both section and destination pages
- "Sidebar collapsed group with By Section / By Destination" → Task 9
- "README link" → Task 10
- "Memory update" → Task 11
- "Documentation conventions on each page" → Task 7 script writes TL;DR, why-this-order, conceptual overview, practical notes, verified-through, AI disclaimer on every emitted page

**Placeholder scan** — no "TBD", "TODO", "Similar to Task N", or hand-waves. The script bodies are inlined in full. Sidebar entries enumerate all 30 sections explicitly (Step 9.2 trims to actual emitted pages — explicit handling, not a placeholder).

**Type consistency** — `field_id` format `<section>-<snake_case>` consistent across schema, agent prompts, validation, and build scripts. Closed-vocab destinations and frequencies consistent across schema, validation, build scripts, and sidebar.

---

## Risks & contingencies

- **Rate limit at 6 agents** — below the historical 8-agent threshold. If hit, the agents that wrote OPEN_QUESTIONS sections are recoverable; missing-output agents need re-dispatch post-reset (5pm or 10:40pm IST window).
- **Field-ID mismatch with master-dataset** — agents may use ID forms that don't exactly match what master-dataset uses (e.g., `A-pan` vs `A-pan_number`). Build script reports orphan count; manual fix in PSV if needed.
- **Heavy CSV (~2,000+ rows)** — file size ~200–400 KB. Astro public/ folder copies as-is; no issue.
- **Sidebar growth** — 45 new entries are collapsed under "Field Atlas" group with nested "By Section" / "By Destination" sub-groups. No visual clutter at default state.
- **PSV pipe escaping** — agents may forget to escape pipes in `quirks_notes`. Build script logs rows with wrong column count; manual fix or re-dispatch as needed.
