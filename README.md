# eHRP Align | 企業級入職文檔智能對齊系統
### Enterprise Onboarding Automation & Compliance Schema Alignment Engine
`EnterpriseDemo-eHRPAlign`

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Framework: Streamlit](https://img.shields.io/badge/Framework-Streamlit-FF4B4B.svg)](https://streamlit.io)
[![Governance: ISO 42001](https://img.shields.io/badge/AIMS-ISO%2FIEC%2042001-green.svg)](SYSTEM_CLASSIFICATION_AND_AIMS_REPORT.md)
[![Security: ISO 27001](https://img.shields.io/badge/ISMS-ISO%2FIEC%2027001-purple.svg)](COMPLIANCE_AND_DATA_GOVERNANCE.md)
[![Privacy: HK PDPO / GDPR](https://img.shields.io/badge/Privacy-PDPO%20%7C%20GDPR-orange.svg)](COMPLIANCE_AND_DATA_GOVERNANCE.md)

---

## 📌 項目簡介 / Project Overview

### 中文
**eHRP Align** 是一套專為企業人力資源（HR）團隊打造的入職檔案解析與格式標準化系統。針對新員工入職檔案中多源紛雜的掃描合約、身份證明文件、銀行戶口複印本、職位申請表及各類專業資格證書，本系統結合**多模態認知技術**與**指向性單一事實來源核對（Source Grounding）**，自動將雜亂非結構化數據對齊至 eHRP 入職資料規格，大幅提升建檔效率並杜絕人為錯誤。

本專案完全貫徹 **隱私設計（Privacy by Design）** 與 **零數據留存（Zero Data Retention）**，運算僅暫存於本地會話記憶體，結束即刻銷毀。

### English
**eHRP Align** is an enterprise-grade onboarding automation and schema normalization engine designed for HR operations. By combining **multimodal document cognition** with strict **Source Grounding verification**, it seamlessly extracts and standardizes complex onboarding packages—including scanned contracts, identification cards, bank statements, application forms, and professional licenses—into precise eHRP-compliant schema payloads.

Architected under **Privacy by Design** principles, the entire workflow operates strictly within volatile session memory with **Zero Data Retention (ZDR)** to eliminate data leakage risks.

---

## 💡 核心功能與亮點 / Key Highlights

- **🎯 指向性資料核對 (Source Grounding Verification):**
  - **僱傭條件與薪酬 (Employment Terms):** 嚴格以《僱傭合約》第 3 條薪酬條款為法定單一事實來源提煉薪金、級別（Grade）、職級（Rank）與支薪點（Point）。
  - **法定身份 (Identity Verification):** 嚴格以官方身份證明文件副本為基準核實全名與證號。
  - **聯絡資訊與住址 (Contact & Address):** 優先從簽署之《職位申請表 (Demo-Form-001)》提取手機號碼與通訊地址。
  - **結算戶口 (Bank Accounts):** 比對內建銀行標準字典，自動校正常見 OCR 錯字及拼音偏差。
- **🛡️ 零數據留存架構 (Zero Data Retention Architecture):** 所有文檔處理均在臨時 Session 記憶體內完成，無任何實體資料庫，網頁關閉即瞬間物理銷毀。
- **🚫 零 AI 幻覺防禦 (Zero Hallucination Control):** 模糊、損毀或文檔未記載之欄位強制留空（`""`），嚴禁模型自行推斷或捏造數據。
- **📦 雙向自動化填表生態 (Chrome Extension Ecosystem):** 支援一鍵導出標準 JSON Clean Payload，配合配套之 Chrome 擴充套件（`content.js`, `manifest.json`）實現瀏覽器端 1 秒自動帶入。

---

## 🏛️ 流程生命週期與治理閉環 / Workflow Architecture


```

[上傳文檔合集 / Upload Package]
│
▼
[PyMuPDF 記憶體串流轉碼 / In-Memory PDF Rendering]
│
▼
[多模態 Vision / 規則引擎提取 / Multimodal & Deterministic Extraction]
│
▼
[指向性來源對照與標準化 / Source Grounding & Schema Normalization]
│
▼
[HR 專員人工複核 / Human-in-the-Loop Review] ──► [匯出 JSON / Export Clean Payload]
│
▼
[關閉瀏覽器 / Tab Closed] ──► 【 記憶體物理釋放 / Zero Data Retention 】

```

---

## 📂 倉庫結構 / Repository Structure

```text
├── app.py                                  # Streamlit 核心應用程式 (Core Streamlit Engine)
├── content.js                              # Chrome Extension 頁面 DOM 自動填入腳本
├── parser.js                               # 資料標準化模組 (JavaScript Normalization Engine)
├── manifest.json                           # Chrome Extension (Manifest V3) 設定檔
├── requirements.txt                        # Python 依賴版本鎖定清單
├── index.html                              # 專案宣傳展示首頁 (GitHub Pages Landing)
├── LICENSE                                 # MIT 開源授權條款
├── COMPLIANCE_AND_DATA_GOVERNANCE.md       # 資安、私隱與資料管治白皮書 (ISO 27001/27701/PDPO)
├── SYSTEM_CLASSIFICATION_AND_AIMS_REPORT.md# 系統技術定性與 AI 管治篩查報告 (ISO 42001/EU AI Act)
└── TERMS_OF_USE_AND_DISCLAIMER.md          # 使用條款與責任隔離聲明 (Terms & Disclaimer)

```

---

## 🚀 快速上手 / Quick Start

### 1. 本地運行 (Local Installation)

確保本地已安裝 Python 3.10+ 環境：

```bash
# 複製儲存庫
git clone [https://github.com/jackylawck/EnterpriseDemo-eHRPAlign.git](https://github.com/jackylawck/EnterpriseDemo-eHRPAlign.git)
cd EnterpriseDemo-eHRPAlign

# 安裝鎖定依賴
pip install -r requirements.txt

# 啟動應用程式
streamlit run app.py

```

### 2. 金鑰配置 (API Key Configuration)

若需調用外部模型，請於 `.streamlit/secrets.toml` 中配置（系統亦支援於側邊欄即時手動輸入自備 Key）：

```toml
GROQ_API_KEY = "gsk_..."
# 或配置 GEMINI_API_KEY / OPENAI_API_KEY / GITHUB_TOKEN

```

---

## 📜 合規與管治文檔索引 / Compliance & Governance Index

為符合各項國際標準與資料保護規範，本專案提供完備的管治文件體系：

1. **[系統定性與 ISO 42001 管治篩查報告](https://www.google.com/search?q=SYSTEM_CLASSIFICATION_AND_AIMS_REPORT.md)**：界定系統確定性架構邊界，聲明歐盟 EU AI Act 免除審查與防自動化剖析依據。
2. **[資訊安全與數據管治白皮書](https://www.google.com/search?q=COMPLIANCE_AND_DATA_GOVERNANCE.md)**：落實 ISO/IEC 27001、ISO/IEC 27701、香港 PDPO 及歐盟 GDPR 之零數據留存防禦措施。
3. **[使用者條款與責任隔離聲明](https://www.google.com/search?q=TERMS_OF_USE_AND_DISCLAIMER.md)**：明確界定系統之輔助定位，規範 Human-in-the-Loop 審核義務及完全免責條款。

---

## ⚖️ 免責宣告 / Disclaimer

本系統定位為企業內部入職文檔格式轉換與欄位標準化之**輔助工具（Administrative Helper）**。其生成之 JSON 結果不構成最終聘僱或薪酬審計依據。使用者在正式匯入或採用前，負有核對實體原始文檔之最終責任。

This tool serves solely as an administrative assistant for onboarding document normalization. Users retain the sole legal obligation to verify all data outputs against original physical contracts and records prior to formal system ingestion.

```
