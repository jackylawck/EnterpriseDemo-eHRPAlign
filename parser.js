/**
 * eHRP Align - Data Normalization Module | Enterprise Demo
 * Normalizes raw extracted data to ensure strict schema alignment with the eHRP system.
 */

const BANK_MAP = {
  "HSBC": ["HSBC", "HONGKONG AND SHANGHAI BANKING", "匯豐", "香港上海滙豐銀行", "004"],
  "HANG SENG": ["HANG SENG", "HANG SENG BANK", "YANG SENG", "YANG SENG BANK", "恒生", "恒生銀行", "024"],
  "BOC": ["BANK OF CHINA", "BOC", "中銀", "中國銀行", "012"],
  "SCB": ["STANDARD CHARTERED", "SCB", "渣打", "渣打銀行", "003"],
  "CITIBANK": ["CITIBANK", "CITI", "花旗", "花旗銀行", "006"],
  "BEA": ["BANK OF EAST ASIA", "BEA", "東亞", "東亞銀行", "015"],
  "DBS": ["DBS", "DBS BANK", "星展", "星展銀行", "016"]
};

const DEPT_MAP = {
  "HQ": ["HQ", "總部", "HEADQUARTERS", "HEAD OFFICE", "寫字樓"],
  "ENG": ["ENG", "工程部", "ENGINEERING"],
  "OPS": ["OPS", "營運部", "OPERATIONS", "施工組"],
  "HR": ["HR", "人力資源部", "HUMAN RESOURCES"],
  "FIN": ["FIN", "財務部", "FINANCE", "會計組", "ACCOUNTS"],
  "IT": ["IT", "資訊科技部", "INFORMATION TECHNOLOGY"],
  "LEGAL": ["LEGAL", "法務部", "LEGAL & COMPLIANCE"]
};

function formatToEhrpDate(dateStr) {
  if (!dateStr || dateStr.toUpperCase() === 'NONE') return '';
  const cleanStr = dateStr.trim().replace(/[-.]/g, '/');
  const parts = cleanStr.split('/');

  let d, m, y;
  if (parts.length === 3) {
    if (parts[0].length === 4) { // YYYY/MM/DD -> DD/MM/YY
      y = parts[0].slice(-2);
      m = parts[1].padStart(2, '0');
      d = parts[2].padStart(2, '0');
    } else if (parts[2].length === 4) { // DD/MM/YYYY -> DD/MM/YY
      d = parts[0].padStart(2, '0');
      m = parts[1].padStart(2, '0');
      y = parts[2].slice(-2);
    } else {
      return formatToUppercase(cleanStr);
    }
    return `${d}/${m}/${y}`;
  }
  return formatToUppercase(cleanStr);
}

function formatToUppercase(text) {
  if (!text || String(text).toUpperCase() === 'NONE') return '';
  return String(text).trim().toUpperCase();
}

function formatCurrency(amount) {
  if (amount === undefined || amount === null || amount === '') return '0.00';
  const num = parseFloat(String(amount).replace(/[^\d.]/g, ''));
  return isNaN(num) ? '0.00' : num.toFixed(2);
}

function normalizeBankName(bankStr) {
  const cleanBank = formatToUppercase(bankStr);
  if (!cleanBank) return '';
  for (const [stdName, keywords] of Object.entries(BANK_MAP)) {
    if (keywords.some(kw => cleanBank.includes(kw))) {
      return stdName;
    }
  }
  return cleanBank;
}

function normalizeDeptName(deptStr) {
  const cleanDept = formatToUppercase(deptStr);
  if (!cleanDept) return '';
  for (const [code, keywords] of Object.entries(DEPT_MAP)) {
    if (keywords.includes(cleanDept) || keywords.some(kw => cleanDept.includes(kw))) {
      return code;
    }
  }
  return cleanDept;
}

function normalizeOnboardingData(rawData) {
  const surname = formatToUppercase(rawData.surname);
  const given_name = formatToUppercase(rawData.given_name);
  
  let name_on_id = formatToUppercase(rawData.name_on_id);
  if (!name_on_id || /[\u4e00-\u9fff]/.test(name_on_id)) {
    name_on_id = `${surname} ${given_name}`.trim();
  }

  // 中文姓名自動拆分防禦 (若後端未處理)
  let surname_sec = String(rawData.surname_secondary || '').trim();
  let given_sec = String(rawData.given_name_secondary || '').trim();
  
  if (!surname_sec && given_sec.length >= 2 && /^[\u4e00-\u9fff]+$/.test(given_sec)) {
    surname_sec = given_sec.charAt(0);
    given_sec = given_sec.slice(1);
  }

  return {
    header: {
      employee_no: formatToUppercase(rawData.employee_no)
    },
    particulars: {
      given_name: given_name,
      surname: surname,
      name_on_id: name_on_id,
      given_name_secondary: given_sec,
      surname_secondary: surname_sec,
      id_type: formatToUppercase(rawData.id_type || 'LOCAL/PR'),
      id_no: formatToUppercase(rawData.id_no),
      alias: formatToUppercase(rawData.alias),
      gender: formatToUppercase(rawData.gender),
      date_of_birth: formatToEhrpDate(rawData.date_of_birth),
      marital_status: formatToUppercase(rawData.marital_status),
      nationality: formatToUppercase(rawData.nationality || 'HONG KONG SAR'),
      race: formatToUppercase(rawData.race),
      country_of_birth: formatToUppercase(rawData.country_of_birth || 'HONG KONG SAR'),
      religion: formatToUppercase(rawData.religion),
      telephone_home: String(rawData.telephone_home || '').replace(/\D/g, ''),
      telephone_mobile: String(rawData.mobile || rawData.telephone_mobile || '').replace(/\D/g, ''),
      secondary_contact: String(rawData.secondary_contact || '').trim(),
      employment_status: formatToUppercase(rawData.employment_status || 'ACTIVE'),
      probation_months: String(rawData.probation_months || '3')
    },
    address: {
      address_line_1: formatToUppercase(rawData.address_line_1),
      address_line_2: formatToUppercase(rawData.address_line_2),
      address_line_3: formatToUppercase(rawData.address_line_3),
      f_post_code: formatToUppercase(rawData.f_post_code)
    },
    employment: {
      designation: formatToUppercase(rawData.designation),
      effective_date_designation: formatToEhrpDate(rawData.effective_date_designation),
      department: normalizeDeptName(rawData.department),
      employee_type: formatToUppercase(rawData.employee_type || 'EMPLOYEES'),
      staff_group: formatToUppercase(rawData.staff_group),
      employee_class: formatToUppercase(rawData.employee_class),
      employment_scheme: formatToUppercase(rawData.employment_scheme || 'SALARY'),
      position: formatToUppercase(rawData.position),
      commencement_date: formatToEhrpDate(rawData.commencement_date),
      cessation_date: formatToEhrpDate(rawData.cessation_date),
      confirmation_date: formatToEhrpDate(rawData.confirmation_date),
      bank: normalizeBankName(rawData.bank),
      account_no: String(rawData.account_no || '').trim(),
      email: String(rawData.email || '').trim().toLowerCase()
    },
    salary: {
      salary: formatCurrency(rawData.salary),
      variable_salary: formatCurrency(rawData.variable_salary),
      daily_rate: formatCurrency(rawData.daily_rate),
      add_rate: formatCurrency(rawData.add_rate),
      rank: formatToUppercase(rawData.rank),
      grade: formatToUppercase(rawData.grade),
      point: String(rawData.point || '').trim(),
      effective_date: formatToEhrpDate(rawData.effective_date || rawData.commencement_date)
    },
    education: Array.isArray(rawData.education) ? rawData.education : [],
    prof_cert: Array.isArray(rawData.prof_cert) ? rawData.prof_cert : [],
    next_of_kin: Array.isArray(rawData.next_of_kin) ? rawData.next_of_kin : [],
    prev_employment: Array.isArray(rawData.prev_employment) ? rawData.prev_employment : []
  };
}

if (typeof module !== 'undefined') {
  module.exports = { 
    normalizeOnboardingData, 
    formatToEhrpDate, 
    formatToUppercase, 
    normalizeBankName, 
    normalizeDeptName 
  };
}
