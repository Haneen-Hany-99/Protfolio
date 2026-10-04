const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
// Theme
const colors={light:'#fffdfc',dark:'#000000',brown:'#2a1b14'};
function setTheme(t){document.documentElement.dataset.theme=t;$('#tc').content=colors[t];$$('.themes button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.t===t));try{localStorage.setItem('theme',t)}catch(e){}}
$$('.themes button').forEach(b=>b.onclick=()=>setTheme(b.dataset.t));
let saved='dark';try{saved=localStorage.getItem('theme')||'dark'}catch(e){}
setTheme(saved);
// Decrypt name
const chars='!<>-_/[]{}=+*^?#01';
function decrypt(el){const f=el.dataset.f;if(reduce){el.textContent=f;return}let i=0;clearInterval(el.t);el.t=setInterval(()=>{el.textContent=[...f].map((c,k)=>k<i?c:chars[Math.random()*chars.length|0]).join('');i+=.4;if(i>=f.length+1){clearInterval(el.t);el.textContent=f}},35)}
$$('.w').forEach((w,i)=>{w.textContent=w.dataset.f;setTimeout(()=>decrypt(w),300+i*500);w.onmouseenter=()=>decrypt(w)});
// Skills (edit names and levels here)
const skills=[['Networking fundamentals',60],['Linux basics',55],['Python',50],['Cryptography basics',45],['HTML & CSS',60],['Cyber awareness & hygiene',70],['Problem solving',70],['Teamwork & communication',80]];
$('#skillList').innerHTML=skills.map(([n,v])=>`<div class="skill" style="--v:${v}%"><div><span>${n}</span><span>${v}%</span></div><i></i></div>`).join('');
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.4});
$$('.skill').forEach(s=>io.observe(s));
// Caesar cipher
function caesar(t,k){return t.replace(/[a-z]/gi,c=>{const b=c<='Z'?65:97;return String.fromCharCode((c.charCodeAt(0)-b+k)%26+b)})}
function run(){$('#sv').textContent=$('#shift').value;$('#out').textContent=caesar($('#msg').value,+$('#shift').value)}
$('#msg').oninput=run;$('#shift').oninput=run;run();
const toast=m=>{const t=$('#toast');t.textContent=m;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3500)};
$('#copy').onclick=()=>navigator.clipboard?.writeText($('#out').textContent).then(()=>toast('Copied'),()=>toast('Copy failed'));
$('#yr').textContent=new Date().getFullYear();
// Install as app
let dp;const standalone=matchMedia('(display-mode: standalone)').matches||navigator.standalone;
if(standalone)$('#install').hidden=true;
addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e});
addEventListener('appinstalled',()=>{$('#install').hidden=true;toast('App installed')});
$('#install').onclick=async()=>{if(dp){dp.prompt();await dp.userChoice;dp=null}else if(/iphone|ipad/i.test(navigator.userAgent))toast('On iPhone: tap Share, then Add to Home Screen');else toast('Open your browser menu and tap Install app or Add to Home screen')};
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js'));
