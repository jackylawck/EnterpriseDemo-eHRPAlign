# 資訊安全、私隱資訊與數據管治白皮書
## Information Security, Privacy & Data Governance Specification
**Document ID:** SEC-PRIV-002  
**Standards Alignment:** ISO/IEC 27001:2022 (ISMS), ISO/IEC 27701:2019 (PIMS), HK PDPO (Cap. 486), EU GDPR (Regulation 2016/679)

---

### 一、 核心架構防護原則 / Architectural Defense Principles


```

[用戶上傳文件 / User Input]
│
▼
[瀏覽器記憶體運算 / Client-Side Memory Session] ── (零外部日誌 / Zero External Logging)
│
▼
[規則清洗與欄位標準化 / Deterministic Normalization]
│
▼
[頁面關閉或重整 / Tab Closed] ───► 【 記憶體立即釋放，數據物理銷毀 (Zero Data Retention) 】

```

#### 1. 零數據留存架構 (Zero Data Retention by Architecture)
* **中文：** 系統無任何後端實體資料庫（No Persistent Database）、檔案快取層或雲端追蹤器。所有文件解析與標準化均在臨時會話（Session Memory）內執行，網頁刷新或分頁關閉即瞬間被操作系統回收銷毀。
* **English:** The architecture operates with zero persistent storage, external disk logging, or telemetry caching. All data normalization resides strictly in volatile session memory and is destroyed upon tab closure or reload.

#### 2. 數據最小化與目的限制 (Data Minimization & Purpose Limitation - PDPO DPP 1 & DPP 3 / GDPR Art. 5)
* **中文：** 僅處理人事系統（eHRP）必要之既定資料欄位。任何非目標欄位均由正則過濾器直接剔除，不予解析與暫存。
* **English:** Only data fields strictly necessary for eHRP ingestion are parsed. All peripheral or unmapped attributes are programmatically discarded by parser filters.

#### 3. 憑證與機密防護 (Credential Hygiene - ISO 27001 Control A.8.12)
* **中文：** 程式碼庫維持 100% 零真實個人資料（Zero Hardcoded PII）、零企業專屬內網連結。所有範例一律採用標準 RFC 規範之 `example.com` 與假數據標記。
* **English:** The source code maintains 100% zero hardcoded personally identifiable information (PII) and zero corporate-internal URLs, strictly utilizing synthetic test data and RFC 2606 reserved domains.

---

### 二、 合規控制項檢核清單 / Compliance Controls Checklist

| 控制項標準 (Standard Control) | 技術實施細節 (Technical Implementation Details) | 合規證明 (Evidence) |
| :--- | :--- | :--- |
| **ISO 27001:2022 A.8.12**<br>資料外洩防護 (Data Leakage Protection) | 本專案不設網路外部廣播行為，所有操作均限制於當前執行環境。 | 程式庫原始碼透明無外部傳輸端點。 |
| **ISO 27701:2019 Cl. 6.5**<br>私隱控制實施 (Privacy Engineering) | 採用 Privacy by Design 設計概念，由前端即時進行字元遮蔽與空值填補。 | `parser.js` 與 `app.py` 之防禦性過濾函數。 |
| **PDPO Cap. 486 DPP 4**<br>個人資料保安 (Security of Personal Data) | 杜絕非授權存取路徑，本機操作無中間人攔截漏洞。 | 本地執行架構檢核通過。 |

```

