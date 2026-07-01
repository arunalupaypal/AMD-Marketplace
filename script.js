// ==============================
// AMD Marketplace
// Main JavaScript
// ==============================

// Page Loaded Animation
window.addEventListener("load", () => {
    document.body.style.opacity = "1";
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// Navbar Shadow on Scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.08)";

    } else {

        navbar.style.boxShadow = "none";

    }

});

// Search Button
const searchBtn = document.querySelector(".search-box button");

searchBtn.addEventListener("click", () => {

    const keyword = document.querySelector(".search-box input").value;

    if (keyword.trim() === "") {

        alert("Please enter a service to search.");

        return;

    }

    alert("Searching for: " + keyword);

});

// Language Button
const languageBtn = document.querySelector(".language-btn");

let isSinhala = false;

languageBtn.addEventListener("click", () => {

    isSinhala = !isSinhala;

    if(isSinhala){

        languageBtn.innerHTML = "🌐 English";

        document.querySelector(".hero h1").innerHTML =
        "ඔබගේ ඊළඟ ව්‍යාපෘතිය සඳහා<br>හොඳම Freelancer සොයා ගන්න";

        document.querySelector(".hero p").innerHTML =
        "ශ්‍රී ලංකාවේ නවීන Freelancer Marketplace";

        document.querySelector(".search-box input").placeholder =
        "සේවාවක් සොයන්න...";

        document.querySelector(".search-box button").innerHTML =
        "සොයන්න";

        document.querySelector(".explore-btn").innerHTML =
        "සේවාවන් බලන්න";

        document.querySelector(".become-btn").innerHTML =
        "Freelancer කෙනෙක් වන්න";

    }else{

        languageBtn.innerHTML = "🌐 සිංහල";

        document.querySelector(".hero h1").innerHTML =
        "Find The Perfect Freelancer<br>For Your Next Project";

        document.querySelector(".hero p").innerHTML =
        "Sri Lanka's Modern Freelancer Marketplace";

        document.querySelector(".search-box input").placeholder =
        "Search services...";

        document.querySelector(".search-box button").innerHTML =
        "Search";

        document.querySelector(".explore-btn").innerHTML =
        "Explore Services";

        document.querySelector(".become-btn").innerHTML =
        "Become a Freelancer";

    }

});

// Hero Buttons
document.querySelector(".explore-btn").addEventListener("click", function(e){

    e.preventDefault();

    alert("Explore Services page coming soon.");

});

document.querySelector(".become-btn").addEventListener("click", function(e){

    e.preventDefault();

    alert("Freelancer Registration page coming soon.");

});

console.log("AMD Marketplace Loaded Successfully.");
