/**
 * eHRP Align | Enterprise Demo
 */

function autoFillEhrpParticulars(data) {
  const p = data.particulars;
  if (!p) return;

  // 1. 精準對齊 app.py 的 JSON 結構
  const map = {
    'Given Name': p.given_name,
    'Surname': p.surname,
    'Name on ID': p.name_on_id,
    'Given Name (Secondary)': p.given_name_secondary,
    'Surname (Secondary)': p.surname_secondary,
    'ID No': p.id_no,
    'Date Of Birth': p.date_of_birth,
    'Telephone (Mobile)': p.telephone_mobile, // 修正：對應 JSON 輸出的 telephone_mobile
    'Telephone (Home)': p.telephone_home,
    'Gender': p.gender,
    'Marital Status': p.marital_status
  };

  // 2. 執行 DOM 查找與自動填入
  Object.keys(map).forEach(labelText => {
    const val = map[labelText];
    
    // 空值保護：若 AI 未解析到該欄位（空字串），則跳過不覆蓋 eHRP 系統現有或預設值
    if (val === undefined || val === null || val === "") return; 

    const labels = Array.from(document.querySelectorAll('label, td, span'));
    const targetLabel = labels.find(el => el.textContent.trim() === labelText);
    
    if (targetLabel) {
      const input = targetLabel.querySelector('input') || 
                    document.getElementById(targetLabel.getAttribute('for')) ||
                    targetLabel.nextElementSibling?.querySelector('input') ||
                    targetLabel.nextElementSibling;
                    
      if (input && (input.tagName === 'INPUT' || input.tagName === 'TEXTAREA')) {
        input.value = val;
        
        // 觸發原生事件，確保 eHRP 的前端框架 (如 React/Vue) 能偵測到值改變
        input.dispatchEvent(new Event('input', { bubbles: true }));
        input.dispatchEvent(new Event('change', { bubbles: true }));
        
        // 視覺回饋：將成功填入的欄位背景標記為淺藍色
        input.style.backgroundColor = '#e0f2fe'; 
      }
    }
  });
}

// 3. 註冊 Chrome Extension 訊息監聽器，接收 Popup 傳遞的 JSON Payload
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'AUTO_FILL_EHRP' && request.data) {
      console.log("📥 [Enterprise Demo] 成功接收 JSON 數據:", request.data);
      autoFillEhrpParticulars(request.data);
      sendResponse({ status: "success" });
    }
  });
}
