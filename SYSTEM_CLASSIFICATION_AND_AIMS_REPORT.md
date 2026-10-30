# 系統技術定性與 AI 管治篩查判定報告
## System Technical Classification & AI Governance Determination Report
**Document ID:** SYS-GOV-001  
**Reference Frameworks:** ISO/IEC 42001:2023 (AIMS), EU AI Act (Regulation (EU) 2024/1689), HK PDPO (Cap. 486)

---

### 一、 系統技術本質宣告 / Technical Characterization

#### 中文說明
本系統（eHRP Align / Enterprise Demo Project）本質上為**確定性規則引擎（Deterministic Rule-Based Parser）與純客戶端前端 DOM 自動對齊工具**。本專案運作機制完全建基於：
1. 靜態正則表達式（Deterministic Regular Expressions）模式比對。
2. 預設字典結構（Predefined Key-Value Dictionaries）對照映射。
3. 客戶端暫存 Session 記憶體處理。

本系統**不包含任何自主決策、機器學習模型權重、自適應概率推理、統計式自然語言生成（NLG）或非確定性神經網絡算法**。

#### English Statement
This system (`eHRP Align`) is structurally engineered as a **deterministic, rule-based parsing engine and client-side DOM alignment utility**. Its functional execution relies solely upon:
1. Deterministic regular expression pattern matching.
2. Hardcoded key-value mapping matrices.
3. Volatile, in-memory client-side data normalization.

The system **does NOT utilize autonomous decision-making algorithms, machine learning model weights, probabilistic reasoning mechanisms, generative statistical modeling, or non-deterministic neural networks**.

---

### 二、 全球監管框架適用性評估 / Regulatory Applicability Matrix

| 法規 / 標準 (Regulation / Standard) | 適用狀況 (Status) | 法律依據與判定理由 (Justification & Statutory Basis) |
| :--- | :--- | :--- |
| **歐盟《人工智能法案》<br>(EU AI Act - Regulation (EU) 2024/1689)** | **排除適用<br>(Out of Scope / Carve-Out)** | 根據第 3(1) 條定義，AI 系統需具備推斷與自主學習能力。純規則驅動軟體（Rule-based software）明確不屬於 EU AI Act 監管之 AI 系統，免除高風險 AI 系統認證與登記義務。 |
| **國家互聯網信息辦公室<br>(CAC Regulations - China)** | **不適用<br>(Not Applicable)** | 《生成式人工智能服務管理暫行辦法》僅適用於面向中國境內公眾提供生成文本/圖像之服務。本工具為非生成式、內部格式對齊工具，且無境內託管服務。 |
| **ISO/IEC 42001:2023 (AIMS)** | **合規審查通過<br>(Screening Cleared)** | 依據 Annex A.6 及 A.8 控制項，經內部管治評審確認本系統不涉及演算法偏差或非確定性漂移風險，直接通過分類判定。 |
| **香港《個人資料（私隱）條例》<br>(HK PDPO, Cap. 486)** | **全面遵循<br>(Fully Compliant)** | 嚴格落實 DPP 1 至 DPP 6 規範，無外部未授權資料移轉。 |
| **ISO/IEC 27001 / ISO/IEC 27701** | **架構落實<br>(Engineered In)** | 落實資訊安全管理（ISMS）與私隱資訊管理（PIMS）之資料最小化控制措施。 |

---

### 三、 零演算法偏差與可解釋性 / Explainability & Accountability

* **100% 邏輯可審計性 (100% Algorithmic Traceability):** 每項輸出欄位皆由原始代碼中明確之字典函數（例如 `normalize_dept_name`）轉換，運算路徑具備完全數學重現性，無「黑箱模型（Black-Box）」疑慮。
* **零自動化處分 (No Automated Profiling):** 本系統僅協助格式轉換，嚴禁進行候選人適任性評價、自動篩選或人事處分，完全符合各國防範自動化個人剖析（Automated Individual Decision-Making）之法規要求。

```
