// AMD Marketplace - script.js

window.addEventListener(“load”, () => { document.body.style.opacity =
“1”; });

const navbar = document.querySelector(“.navbar”);
window.addEventListener(“scroll”, () => { if (navbar) {
navbar.style.boxShadow = window.scrollY > 50 ? “0 10px 25px
rgba(0,0,0,.08)” : “none”; } });

const searchBtn = document.querySelector(“.search-box button”); if
(searchBtn) { searchBtn.addEventListener(“click”, () => { const input =
document.querySelector(“.search-box input”); const keyword =
input.value.trim(); if (!keyword) { alert(“Please enter a service.”);
return; } alert(“Searching for:” + keyword); }); }

const languageBtn = document.querySelector(“.language-btn”); let
isSinhala = localStorage.getItem(“language”) === “si”;

function applyLanguage() { if (!languageBtn) return;

if (isSinhala) { languageBtn.innerHTML = “🌐 English”;
document.querySelector(“.hero h1”).innerHTML = “ඔබගේ ඊළඟ ව්‍යාපෘතිය
සඳහාහොඳම Freelancer සොයා ගන්න”; document.querySelector(“.hero
p”).innerHTML = “ශ්‍රී ලංකාවේ නවීන Freelancer Marketplace”;
document.querySelector(“.search-box input”).placeholder = “සේවාවක්
සොයන්න…”; document.querySelector(“.search-box button”).textContent =
“සොයන්න”; document.querySelector(“.explore-btn”).textContent = “සේවාවන්”;
document.querySelector(“.become-btn”).textContent = “Freelancer වන්න”; }
else { languageBtn.innerHTML = “🌐 සිංහල”; document.querySelector(“.hero
h1”).innerHTML = “Find The Perfect FreelancerFor Your Next Project”;
document.querySelector(“.hero p”).innerHTML = “Sri Lanka’s Modern
Freelancer Marketplace”; document.querySelector(“.search-box
input”).placeholder = “Search services…”;
document.querySelector(“.search-box button”).textContent = “Search”;
document.querySelector(“.explore-btn”).textContent = “Explore Services”;
document.querySelector(“.become-btn”).textContent = “Become a
Freelancer”; } }

if (languageBtn) { applyLanguage();
languageBtn.addEventListener(“click”, () => { isSinhala = !isSinhala;
localStorage.setItem(“language”, isSinhala ? “si” : “en”);
applyLanguage(); }); }

console.log(“AMD Marketplace Loaded”);
