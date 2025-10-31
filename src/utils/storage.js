// localStorage-backed employee list + attendance utilities
const EMP_KEY = 'crm_employees_v1';
const ATT_KEY_PREFIX = 'crm_attendance_v1_'; // + YYYY-MM-DD
const LAST_RESET = 'crm_last_reset_date_v1';

function todayStr(){ return new Date().toISOString().slice(0,10);}

export function ensureInitialData(){
  const existing = localStorage.getItem(EMP_KEY);
  if(!existing){
    const sample = [
  {id:'E001', name:'Irfan', role:'Frontend Developer'},
  {id:'E002', name:'Brad Pitt', role:'Backend Developer'},
  {id:'E003', name:'Sara Joy', role:'UI Designer'},
  {id:'E004', name:'Rahul PK', role:'QA Engineer'},
  {id:'E005', name:'Neha S', role:'Product Manager'},
  { id: 'E006', name: 'Vijay T', role: 'Full Stack Developer' },
  { id: 'E007', name: 'Meena L', role: 'QA Engineer' },
  { id: 'E008', name: 'Rohit B', role: 'DevOps Engineer' },
  { id: 'E009', name: 'Karthik P', role: 'Frontend Developer' },
  { id: 'E010', name: 'Priya C', role: 'Backend Developer' },
  { id: 'E011', name: 'Naveen J', role: 'Data Analyst' },
  { id: 'E012', name: 'Keerthi D', role: 'HR Executive' },
  { id: 'E013', name: 'Manoj F', role: 'Network Engineer' },
  { id: 'E014', name: 'Lavanya N', role: 'Product Designer' },
  { id: 'E015', name: 'Gokul R', role: 'Software Engineer' },
  { id: 'E016', name: 'Aishwarya V', role: 'Frontend Developer'},
  { id: 'E017', name: 'Suresh M', role: 'Technical Lead' },
  { id: 'E018', name: 'Harini P', role: 'Marketing Manager' },
  { id: 'E019', name: 'Aravind G', role: 'Backend Developer' },
  { id: 'E020', name: 'Swathi I', role: 'UI/UX Designer' },
  { id: 'E021', name: 'Sanjay D', role: 'Software Engineer' },
  { id: 'E022', name: 'Deepika K', role: 'HR Recruiter' },
  { id: 'E023', name: 'Lokesh T', role: 'System Administrator' },
  { id: 'E024', name: 'Nithya R', role: 'Data Scientist' },
  { id: 'E025', name: 'Ramesh C', role: 'Backend Developer' },
  { id: 'E026', name: 'Sandhya P', role: 'Product Owner' },
  { id: 'E027', name: 'Vikram A', role: 'Frontend Developer' },
  { id: 'E028', name: 'Monica S', role: 'QA Engineer' },
  { id: 'E029', name: 'Surya K', role: 'Cloud Engineer' },
  { id: 'E030', name: 'Anitha L', role: 'Business Analyst' },
  { id: 'E031', name: 'Hari H', role: 'DevOps Engineer' },
  { id: 'E032', name: 'Pooja V', role: 'Content Writer' },
  { id: 'E033', name: 'Kiran P', role: 'Full Stack Developer' },
  { id: 'E034', name: 'Shruti G', role: 'Frontend Developer' },
  { id: 'E035', name: 'Ravi N', role: 'Backend Developer' },
  { id: 'E036', name: 'Ishita D', role: 'QA Tester' },
  { id: 'E037', name: 'Balaji R', role: 'System Engineer' },
  { id: 'E038', name: 'Kavya M', role: 'UI/UX Designer' },
  { id: 'E039', name: 'Ajay S', role: 'Frontend Developer' },
  { id: 'E040', name: 'Sangeetha P', role: 'Software Engineer' },
  { id: 'E041', name: 'Yogesh K', role: 'Backend Developer' },
  { id: 'E042', name: 'Anjali N', role: 'HR Executive' },
  { id: 'E043', name: 'Vasanth R', role: 'DevOps Engineer' },
  { id: 'E044', name: 'Preethi D', role: 'Product Manager' },
  { id: 'E045', name: 'Keshav L', role: 'Frontend Developer' },
  { id: 'E046', name: 'Rekha S', role: 'Marketing Executive' },
  { id: 'E047', name: 'Dinesh P', role: 'Software Developer' },
  { id: 'E048', name: 'Gayathri V', role: 'UI Designer' },
  { id: 'E049', name: 'Varun T', role: 'Backend Developer' },
  { id: 'E050', name: 'Aparna C', role: 'Project Manager' },
  ];
    localStorage.setItem(EMP_KEY, JSON.stringify(sample));
  }
}

export function getEmployees(){
  try{ return JSON.parse(localStorage.getItem(EMP_KEY)) || []; }catch(e){return [];}
}

function attendanceKey(date){ return ATT_KEY_PREFIX + date; }

export function getAttendanceForDate(date){
  try{ return JSON.parse(localStorage.getItem(attendanceKey(date))) || {}; }catch(e){return {};}
}

export function markPresentById(id){
  const emps = getEmployees();
  const found = emps.find(e=>e.id===id);
  if(!found) return false;
  const key = attendanceKey(todayStr());
  const att = getAttendanceForDate(todayStr());
  att[id] = true;
  localStorage.setItem(key, JSON.stringify(att));
  return true;
}

export function togglePresentForId(id, date){
  const key = attendanceKey(date);
  const att = getAttendanceForDate(date);
  att[id] = !att[id];
  localStorage.setItem(key, JSON.stringify(att));
}

export function markAllAbsentForDate(date){
  const emps = getEmployees();
  const key = attendanceKey(date);
  const att = {};
  emps.forEach(e=>{ att[e.id] = false; });
  localStorage.setItem(key, JSON.stringify(att));
}

export function getMonthlyReport(month){
  // month format: YYYY-MM
  const emps = getEmployees();
  const [y,m] = month.split('-').map(Number);
  const totalDays = new Date(y, m, 0).getDate(); // days in month
  const rows = emps.map(emp => {
    let presentDays = 0;
    for(let d=1; d<=totalDays; d++){
      const dd = new Date(y, m-1, d).toISOString().slice(0,10);
      const att = getAttendanceForDate(dd);
      if(att[emp.id]) presentDays++;
    }
    return { id: emp.id, name: emp.name, presentDays, totalDays };
  });
  return rows;
}

export function dailyResetIfNeeded(){
  const last = localStorage.getItem(LAST_RESET);
  const today = todayStr();
  if(last !== today){
    // mark all absent for today initially
    markAllAbsentForDate(today);
    localStorage.setItem(LAST_RESET, today);
  }
}
