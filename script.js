const ids = new Set(['home','lunch','dinner','sweets','bakery','shop','reservation']);
function showPage() {
  const requested = location.hash.slice(1);
  const id = ids.has(requested) ? requested : 'home';
  document.querySelectorAll('.page').forEach(page => {
    const active = page.id === id;
    page.classList.toggle('active', active);
    page.setAttribute('aria-hidden', String(!active));
  });
  window.scrollTo({top:0,behavior:'instant'});
}
window.addEventListener('hashchange', showPage);
showPage();
const form = document.getElementById('reservation-form');
const dateInput = form.elements.date;
const today = new Date();
dateInput.min = [today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');
form.addEventListener('submit', event => {
  event.preventDefault();
  const d = new Date(dateInput.value + 'T12:00:00');
  if (d.getDay() === 2) {
    dateInput.setCustomValidity('火曜日は定休日です。別の日を選んでください。');
    dateInput.reportValidity();
    return;
  }
  const data = new FormData(form);
  const result = document.getElementById('reservation-result');
  result.replaceChildren();
  const heading = document.createElement('h2');
  heading.textContent = '入力内容の確認';
  result.append(heading);
  for (const [key,label] of [['name','お名前'],['email','メールアドレス'],['tel','電話番号'],['date','ご希望日'],['time','ご希望時間'],['guests','人数'],['message','ご要望など']]) {
    const p = document.createElement('p');
    p.textContent = label + '：' + (data.get(key) || 'なし');
    result.append(p);
  }
  const notice = document.createElement('strong');
  notice.textContent = '見本のため、入力内容は送信されず、予約も確定しません。';
  result.append(notice);
  result.hidden = false;
  result.scrollIntoView({behavior:'smooth',block:'start'});
});
dateInput.addEventListener('input', () => dateInput.setCustomValidity(''));
