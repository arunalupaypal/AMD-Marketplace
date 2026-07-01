// ============================== // AMD Marketplace - script.js //
==============================

// Fade in window.addEventListener(“load”, () => {
document.body.style.opacity = “1”; });

// Navbar shadow const navbar = document.querySelector(“.navbar”);
window.addEventListener(“scroll”, () => { if (navbar) {
navbar.style.boxShadow = window.scrollY > 50 ? “0 10px 25px
rgba(0,0,0,.08)” : “none”; } });

// Search const searchBtn = document.querySelector(“.search-box
button”); if (searchBtn) { searchBtn.addEventListener(“click”, () => {
const input = document.querySelector(“.search-box input”); const keyword
= input.value.trim(); if (!keyword) { alert(“Please enter a service.”);
return; } alert(“Searching:” + keyword); }); }

// Language System const languageBtn =
document.querySelector(“.language-btn”); let isSinhala =
localStorage.getItem(“language”) === “si”;

function applyLanguage() { if (isSinhala) { languageBtn.innerHTML = “🌐
English”; document.querySelector(“.hero h1”).innerHTML = “ඔබගේ ඊළඟ
ව්‍යාපෘතිය සඳහාහොඳම Freelancer සොයා ගන්න”; document.querySelector(“.hero
p”).innerHTML = “ශ්‍රී ලංකාවේ නවීන Freelancer Marketplace”;
document.querySelector(“.search-box input”).placeholder = “සේවාවක්
සොයන්න…”; document.querySelector(“.search-box button”).innerHTML =
“සොයන්න”; document.querySelector(“.explore-btn”).innerHTML = “සේවාවන්”;
document.querySelector(“.become-btn”).innerHTML = “Freelancer වන්න”; }
else { languageBtn.innerHTML = “🌐 සිංහල”; document.querySelector(“.hero
h1”).innerHTML = “Find The Perfect FreelancerFor Your Next Project”;
document.querySelector(“.hero p”).innerHTML = “Sri Lanka’s Modern
Freelancer Marketplace”; document.querySelector(“.search-box
input”).placeholder = “Search services…”;
document.querySelector(“.search-box button”).innerHTML = “Search”;
document.querySelector(“.explore-btn”).innerHTML = “Explore Services”;
document.querySelector(“.become-btn”).innerHTML = “Become a Freelancer”;
} }

applyLanguage();

languageBtn.addEventListener(“click”, () => { isSinhala = !isSinhala;
localStorage.setItem(“language”, isSinhala ? “si” : “en”);
applyLanguage(); });

// Counter Animation const counters =
document.querySelectorAll(“#statistics h3”); const animateCounter = (el)
=> { const txt = el.innerText.replace(//g, ““); if (!txt) return; const
target = parseInt(txt, 10); let value = 0; const step = Math.max(1,
Math.ceil(target / 100)); const timer = setInterval(() => { value +=
step; if (value >= target) { value = target; clearInterval(timer); }
el.innerText = value.toLocaleString() + (target === 49 ?”★” : “+”); },
20); };

const stats = document.querySelector(“#statistics”); if (stats) { const
io = new IntersectionObserver((entries) => { entries.forEach((e) => { if
(e.isIntersecting) { counters.forEach(animateCounter); io.disconnect();
} }); }); io.observe(stats); }

console.log(“AMD Marketplace Loaded”);
