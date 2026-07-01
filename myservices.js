
// ======================================================
// AMD Marketplace - My Services
// JavaScript PART 1
// Sidebar • Search • Counters • User • Menu
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

let services = [];
let selectedServices = [];

// ======================
// Sidebar Toggle
// ======================

const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector(".sidebar");

if(menuBtn && sidebar){

menuBtn.addEventListener("click",()=>{

sidebar.classList.toggle("active");

});

}

// ======================
// Active Sidebar
// ======================

document.querySelectorAll(".sidebar li").forEach(item=>{

item.addEventListener("click",()=>{

document
.querySelectorAll(".sidebar li")
.forEach(li=>li.classList.remove("active"));

item.classList.add("active");

});

});

// ======================
// Username
// ======================

const username=document.getElementById("username");

const user=JSON.parse(localStorage.getItem("user"));

if(username){

if(user){

username.textContent=
user.fullname || user.username;

}else{

username.textContent="Freelancer";

}

}

// ======================
// Profile Image
// ======================

const profile=document.querySelector(".profile-img");

const image=localStorage.getItem("profileImage");

if(profile && image){

profile.src=image;

}

// ======================
// Animated Cards
// ======================

document.querySelectorAll(".card h2").forEach(card=>{

const text=card.textContent;

const target=parseInt(text.replace(/\D/g,"")) || 0;

let current=0;

if(target===0) return;

function animate(){

current += Math.ceil((target-current)/15);

if(current>target){

current=target;

}

card.textContent=
text.includes("$")
? "$"+current
: current;

if(current<target){

requestAnimationFrame(animate);

}

}

animate();

});

// ======================
// Search
// ======================

const search=document.querySelector(".search-box input");

if(search){

search.addEventListener("keyup",()=>{

const value=
search.value.toLowerCase();

document
.querySelectorAll(".service-card")
.forEach(card=>{

const text=
card.innerText.toLowerCase();

card.style.display=
text.includes(value)
? ""
: "none";

});

});

}

// ======================
// Welcome
// ======================

console.log("My Services JS Part 1 Loaded");

});

// ======================
// PART 2 STARTS HERE
// ======================
// ======================================================
// AMD Marketplace - My Services
// JavaScript PART 2
// Service Actions • Bulk Actions • Modals • Pagination
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ======================
// Create Service
// ======================

document.querySelectorAll(".create-btn,.create-service-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Create Service page coming soon.");

});

});

// ======================
// Preview
// ======================

document.querySelectorAll(".preview-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Preview will be available soon.");

});

});

// ======================
// Edit
// ======================

document.querySelectorAll(".edit-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Edit Service page coming soon.");

});

});

// ======================
// Publish
// ======================

document.querySelectorAll(".publish-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Service Published Successfully.");

});

});

// ======================
// Analytics
// ======================

const analyticsModal =
document.getElementById("analyticsModal");

document.querySelectorAll(".analytics-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

if(analyticsModal){

analyticsModal.style.display="flex";

}

});

});

document.querySelectorAll(".close-modal").forEach(btn=>{

btn.addEventListener("click",()=>{

analyticsModal.style.display="none";

});

});

// ======================
// Delete
// ======================

const deleteModal =
document.getElementById("deleteModal");

document.querySelectorAll(".delete-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

if(deleteModal){

deleteModal.style.display="flex";

}

});

});

document.querySelectorAll(".cancel-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

deleteModal.style.display="none";

});

});

document.querySelectorAll(".confirm-delete-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

deleteModal.style.display="none";

alert("Service Deleted.");

});

});

// ======================
// Close Modal Outside
// ======================

window.addEventListener("click",(e)=>{

if(e.target===analyticsModal){

analyticsModal.style.display="none";

}

if(e.target===deleteModal){

deleteModal.style.display="none";

}

});

// ======================
// Bulk Buttons
// ======================

document.querySelectorAll(".bulk-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

alert(btn.innerText+" feature coming soon.");

});

});

// ======================
// Pagination
// ======================

document.querySelectorAll(".pagination button").forEach(btn=>{

btn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

});

console.log("My Services JS Part 2 Loaded");

});

// ======================
// PART 3 STARTS HERE
// ======================
// ======================================================
// AMD Marketplace - My Services
// JavaScript PART 3 (FINAL)
// Local Storage • Notifications • Shortcuts • Init
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ======================
// Save Filters
// ======================

document.querySelectorAll(".filters select").forEach((select,index)=>{

const key="amd_service_filter_"+index;

if(localStorage.getItem(key)){
select.value=localStorage.getItem(key);
}

select.addEventListener("change",()=>{

localStorage.setItem(key,select.value);

});

});

// ======================
// Notifications
// ======================

function showNotification(message){

const note=document.createElement("div");

note.className="notification";

note.innerHTML=message;

note.style.cssText=`
position:fixed;
top:20px;
right:20px;
padding:15px 22px;
background:#2563eb;
color:#fff;
border-radius:12px;
font-weight:600;
z-index:99999;
box-shadow:0 15px 35px rgba(37,99,235,.35);
`;

document.body.appendChild(note);

setTimeout(()=>{

note.remove();

},2500);

}

// ======================
// Keyboard Shortcuts
// ======================

document.addEventListener("keydown",(e)=>{

// Ctrl + N

if(e.ctrlKey && e.key.toLowerCase()=="n"){

e.preventDefault();

showNotification("Create Service Shortcut");

}

// ESC

if(e.key==="Escape"){

const analyticsModal=document.getElementById("analyticsModal");
const deleteModal=document.getElementById("deleteModal");

if(analyticsModal){
analyticsModal.style.display="none";
}

if(deleteModal){
deleteModal.style.display="none";
}

}

});

// ======================
// Empty State
// ======================

const cards=document.querySelectorAll(".service-card");

if(cards.length===0){

const grid=document.querySelector(".services-grid");

if(grid){

grid.innerHTML=`
<div class="empty-card">
<h2>No Services Found</h2>
<p>Create your first service.</p>
</div>
`;

}

}

// ======================
// Future API Ready
// ======================

async function loadServices(){

// Future Backend Connection

// fetch("/api/services")

}

window.loadServices=loadServices;

// ======================
// Auto Refresh (Future)
// ======================

function refreshDashboard(){

console.log("Dashboard Refreshed");

}

window.refreshDashboard=refreshDashboard;

// ======================
// Welcome Message
// ======================

setTimeout(()=>{

showNotification("Welcome to My Services");

},600);

// ======================
// Finish
// ======================

console.log("AMD Marketplace My Services Ready");

});
