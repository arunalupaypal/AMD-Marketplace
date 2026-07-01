// AMD Marketplace Premium JS - PART 1
// Core interactions

document.addEventListener("DOMContentLoaded", () => {

  // ===== Page Loader =====
  document.body.classList.add("loaded");

  // ===== Navbar Scroll =====
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (navbar) {
      navbar.classList.toggle("scrolled", window.scrollY > 40);
    }
    updateProgress();
    highlightNav();
  });

  // ===== Language Toggle =====
  const languageBtn = document.querySelector(".language-btn");
  let isSinhala = localStorage.getItem("language") === "si";

  function applyLanguage() {
    if (!languageBtn) return;
    languageBtn.innerHTML = isSinhala ? "🌐 English" : "🌐 සිංහල";
  }

  if (languageBtn) {
    applyLanguage();
    languageBtn.addEventListener("click", () => {
      isSinhala = !isSinhala;
      localStorage.setItem("language", isSinhala ? "si" : "en");
      applyLanguage();
    });
  }

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:"smooth"});
    });
  });

  // ===== Typing Effect =====
  const typing = document.getElementById("typing-text");
  if (typing) {
    const text = typing.textContent;
    typing.textContent = "";
    let i = 0;
    const timer = setInterval(() => {
      typing.textContent += text.charAt(i);
      i++;
      if (i >= text.length) clearInterval(timer);
    }, 55);
  }

  // ===== Counter Animation =====
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const end = parseInt(el.dataset.count || "0",10);
      let current = 0;
      const step = Math.max(1, Math.ceil(end/100));
      const t = setInterval(() => {
        current += step;
        if (current >= end) {
          current = end;
          clearInterval(t);
        }
        el.textContent = current.toLocaleString() + "+";
      },20);
      counterObserver.unobserve(el);
    });
  }, {threshold:0.4});

  counters.forEach(c=>counterObserver.observe(c));

  // ===== Scroll Progress =====
  let progress = document.createElement("div");
  progress.id = "scroll-progress";
  progress.style.cssText =
    "position:fixed;top:0;left:0;height:4px;width:0;background:#3b82f6;z-index:99999;";
  document.body.appendChild(progress);

  function updateProgress(){
    const h=document.documentElement;
    const p=(h.scrollTop/(h.scrollHeight-h.clientHeight))*100;
    progress.style.width=p+"%";
  }

  // ===== Active Nav =====
  const sections = document.querySelectorAll("main section");
  const links = document.querySelectorAll(".nav-links a");

  function highlightNav(){
    let current="";
    sections.forEach(sec=>{
      if(window.scrollY >= sec.offsetTop-120){
        current = sec.id;
      }
    });
    links.forEach(link=>{
      link.classList.remove("active");
      const href = link.getAttribute("href");
      if(href === "#" + current){
        link.classList.add("active");
      }
    });
  }

  console.log("AMD Marketplace Premium JS Part 1 Loaded");
});
// AMD Marketplace Premium JS - PART 2
// Advanced UI Animations & Effects

document.addEventListener("DOMContentLoaded", () => {

  // ===== Scroll Reveal =====
  const revealElements = document.querySelectorAll(
    ".category-card,.why-card,.freelancer-card,.logo-card,.stats-grid>div,blockquote,details"
  );

  const revealObserver = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add("active");
      }
    });
  },{threshold:0.15});

  revealElements.forEach(el=>{
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

  // ===== Hero Parallax =====
  const hero = document.querySelector(".hero");
  window.addEventListener("mousemove",(e)=>{
    if(!hero) return;
    const x=(e.clientX/window.innerWidth-0.5)*20;
    const y=(e.clientY/window.innerHeight-0.5)*20;

    hero.querySelectorAll(".floating-shape").forEach(shape=>{
      shape.style.transform=`translate(${x}px,${y}px)`;
    });
  });

  // ===== Ripple Effect =====
  document.querySelectorAll("button,.explore-btn,.become-btn,.signup-btn").forEach(btn=>{
    btn.addEventListener("click",function(e){

      const ripple=document.createElement("span");

      const rect=this.getBoundingClientRect();

      ripple.style.position="absolute";
      ripple.style.width="20px";
      ripple.style.height="20px";
      ripple.style.borderRadius="50%";
      ripple.style.background="rgba(255,255,255,.6)";
      ripple.style.pointerEvents="none";
      ripple.style.left=(e.clientX-rect.left)+"px";
      ripple.style.top=(e.clientY-rect.top)+"px";
      ripple.style.transform="translate(-50%,-50%) scale(0)";
      ripple.style.transition=".6s";

      this.appendChild(ripple);

      requestAnimationFrame(()=>{
        ripple.style.transform="translate(-50%,-50%) scale(15)";
        ripple.style.opacity="0";
      });

      setTimeout(()=>ripple.remove(),600);

    });
  });

  // ===== Search Box Focus Animation =====
  const input=document.querySelector(".search-box input");

  if(input){

    input.addEventListener("focus",()=>{
      input.parentElement.classList.add("focused");
    });

    input.addEventListener("blur",()=>{
      input.parentElement.classList.remove("focused");
    });

  }

  // ===== Mouse Glow =====
  const glow=document.createElement("div");

  glow.style.cssText=`
    position:fixed;
    width:180px;
    height:180px;
    border-radius:50%;
    pointer-events:none;
    background:radial-gradient(circle,rgba(37,99,235,.18),transparent 70%);
    transform:translate(-50%,-50%);
    z-index:-1;
  `;

  document.body.appendChild(glow);

  window.addEventListener("mousemove",(e)=>{
    glow.style.left=e.clientX+"px";
    glow.style.top=e.clientY+"px";
  });

  // ===== Card Hover Tilt =====
  document.querySelectorAll(".category-card,.why-card,.freelancer-card").forEach(card=>{

    card.addEventListener("mousemove",(e)=>{

      const rect=card.getBoundingClientRect();

      const x=e.clientX-rect.left;
      const y=e.clientY-rect.top;

      const rotateY=((x/rect.width)-0.5)*12;
      const rotateX=((y/rect.height)-0.5)*-12;

      card.style.transform=
      `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;

    });

    card.addEventListener("mouseleave",()=>{
      card.style.transform="";
    });

  });

  console.log("AMD Marketplace Premium JS Part 2 Loaded");

});
// AMD Marketplace Premium JS - PART 3
// Final Effects, Performance & Utilities

document.addEventListener("DOMContentLoaded",()=>{

// ===== Back To Top Button =====
const topBtn=document.createElement("button");
topBtn.innerHTML="↑";
topBtn.id="backToTop";
topBtn.style.cssText=`
position:fixed;
right:20px;
bottom:20px;
width:50px;
height:50px;
border:none;
border-radius:50%;
background:#2563eb;
color:#fff;
font-size:20px;
cursor:pointer;
display:none;
z-index:9999;
box-shadow:0 10px 25px rgba(37,99,235,.4);
transition:.3s;
`;
document.body.appendChild(topBtn);

window.addEventListener("scroll",()=>{
  topBtn.style.display=window.scrollY>400?"block":"none";
});

topBtn.addEventListener("click",()=>{
  window.scrollTo({top:0,behavior:"smooth"});
});

// ===== Lazy Loading Images =====
const imgs=document.querySelectorAll("img");
const imgObserver=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
   if(entry.isIntersecting){
      const img=entry.target;
      if(img.dataset.src){
        img.src=img.dataset.src;
      }
      imgObserver.unobserve(img);
   }
 });
});
imgs.forEach(i=>imgObserver.observe(i));

// ===== Floating Particles =====
const container=document.createElement("div");
container.style.cssText="position:fixed;inset:0;pointer-events:none;overflow:hidden;z-index:-2;";
document.body.appendChild(container);

for(let i=0;i<25;i++){
 const p=document.createElement("span");
 const s=Math.random()*6+3;
 p.style.cssText=`
 position:absolute;
 width:${s}px;
 height:${s}px;
 border-radius:50%;
 background:rgba(125,211,252,.35);
 left:${Math.random()*100}%;
 top:${Math.random()*100}%;
 animation:particle ${8+Math.random()*10}s linear infinite;
 `;
 container.appendChild(p);
}

const style=document.createElement("style");
style.textContent=`
@keyframes particle{
0%{transform:translateY(0) translateX(0);opacity:0;}
20%{opacity:1;}
100%{transform:translateY(-180px) translateX(40px);opacity:0;}
}`;
document.head.appendChild(style);

// ===== Reduced Motion Support =====
if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
 document.querySelectorAll("*").forEach(el=>{
   el.style.animation="none";
   el.style.transition="none";
 });
}

// ===== Resize Handler =====
window.addEventListener("resize",()=>{
 document.documentElement.style.setProperty("--vh",`${window.innerHeight*0.01}px`);
});
window.dispatchEvent(new Event("resize"));

console.log("AMD Marketplace Premium JS Complete");
});
