
// ======================================================
// AMD Marketplace - Orders
// JavaScript PART 1 (FULL)
// Sidebar • Search • Filters • Counters
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // Sidebar Toggle
    // =========================

    const menuBtn = document.querySelector(".menu-btn");
    const sidebar = document.querySelector(".sidebar");

    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });
    }

    // =========================
    // Active Sidebar Menu
    // =========================

    document.querySelectorAll(".sidebar li").forEach(item => {

        item.addEventListener("click", () => {

            document.querySelectorAll(".sidebar li")
                .forEach(li => li.classList.remove("active"));

            item.classList.add("active");

        });

    });

    // =========================
    // Search Orders
    // =========================

    const searchInput = document.getElementById("orderSearch");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            document.querySelectorAll(".orders-table tbody tr").forEach(row => {

                const text = row.innerText.toLowerCase();

                if (text.includes(value)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }

            });

        });

    }

    // =========================
    // Status Filter
    // =========================

    const statusFilter = document.getElementById("statusFilter");

    if (statusFilter) {

        statusFilter.addEventListener("change", () => {

            const value = statusFilter.value;

            document.querySelectorAll(".orders-table tbody tr").forEach(row => {

                const badge = row.querySelector(".badge");

                if (!badge) return;

                if (value === "all") {

                    row.style.display = "";

                } else if (badge.classList.contains(value)) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        });

    }

    // =========================
    // Sort Dropdown
    // =========================

    const sortOrders = document.getElementById("sortOrders");

    if (sortOrders) {

        sortOrders.addEventListener("change", () => {

            console.log("Sort Changed:", sortOrders.value);

        });

    }

    // =========================
    // Dashboard Counter Animation
    // =========================

    document.querySelectorAll(".card h2").forEach(counter => {

        const isMoney = counter.innerText.includes("$");

        const target =
            parseInt(counter.innerText.replace(/\D/g, "")) || 0;

        let count = 0;

        function animate() {

            if (count < target) {

                count += Math.ceil((target - count) / 20);

                counter.innerText = isMoney
                    ? "$" + count
                    : count;

                requestAnimationFrame(animate);

            } else {

                counter.innerText = isMoney
                    ? "$" + target
                    : target;

            }

        }

        if (target > 0) {
            animate();
        }

    });

    // =========================
    // Notification Bell
    // =========================

    const bell = document.querySelector(".top-right .fa-bell");

    if (bell) {

        bell.title = "No new notifications";

    }

    // =========================
    // Welcome Animation
    // =========================

    const hero = document.querySelector(".hero");

    if (hero) {

        hero.style.opacity = "0";
        hero.style.transform = "translateY(20px)";

        setTimeout(() => {

            hero.style.transition = ".6s";

            hero.style.opacity = "1";

            hero.style.transform = "translateY(0)";

        }, 150);

    }

    console.log("Orders JS Part 1 Loaded");

});

// ======================================================
// PART 2 STARTS HERE
// ======================================================

// ======================================================
// AMD Marketplace - Orders
// JavaScript PART 2
// Order Actions • Modals • Local Storage
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ======================
// View Order
// ======================

const viewModal=document.getElementById("orderDetailsModal");

document.querySelectorAll(".view-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

if(viewModal){

viewModal.style.display="flex";

}

});

});

// ======================
// Deliver Modal
// ======================

const deliverModal=document.getElementById("deliverModal");

document.querySelectorAll(".deliver-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

if(deliverModal){

deliverModal.style.display="flex";

}

});

});

// ======================
// Revision Modal
// ======================

const revisionModal=document.getElementById("revisionModal");

document.querySelectorAll(".revision-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

if(revisionModal){

revisionModal.style.display="flex";

}

});

});

// ======================
// Close Modals
// ======================

document.querySelectorAll(".close-modal,.cancel-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

document.querySelectorAll(".modal").forEach(modal=>{

modal.style.display="none";

});

});

});

// Close modal outside click

window.addEventListener("click",(e)=>{

document.querySelectorAll(".modal").forEach(modal=>{

if(e.target===modal){

modal.style.display="none";

}

});

});

// ======================
// Publish / Deliver
// ======================

document.querySelectorAll(".deliver-confirm-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

alert("Order Delivered Successfully.");

if(deliverModal){

deliverModal.style.display="none";

}

});

});

// ======================
// Save Selected Order
// ======================

document.querySelectorAll(".orders-table tbody tr").forEach((row,index)=>{

row.addEventListener("click",()=>{

localStorage.setItem("amd_selected_order",index);

});

});

// ======================
// Restore Selected Order
// ======================

const selectedOrder=

localStorage.getItem("amd_selected_order");

if(selectedOrder!==null){

const rows=document.querySelectorAll(".orders-table tbody tr");

if(rows[selectedOrder]){

rows[selectedOrder].style.outline=

"2px solid #2563eb";

}

}

console.log("Orders JS Part 2 Loaded");

});

// ======================================================
// PART 3 STARTS HERE
// ======================================================

// ======================================================
// AMD Marketplace - Orders
// JavaScript PART 3
// Chat • Files • Countdown • Notifications
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ======================
// Chat
// ======================

const chatInput=document.querySelector(".chat-input input");
const sendBtn=document.querySelector(".chat-input button");
const chatBox=document.querySelector(".chat-box");

function sendMessage(){

if(!chatInput || !chatBox) return;

const text=chatInput.value.trim();

if(text==="") return;

const message=document.createElement("div");

message.className="chat-message freelancer";

message.innerHTML=`

<img src="images/default-avatar.png">

<div class="message">

<h4>You</h4>

<p>${text}</p>

<span>${new Date().toLocaleTimeString()}</span>

</div>

`;

chatBox.appendChild(message);

chatInput.value="";

chatBox.scrollTop=chatBox.scrollHeight;

}

if(sendBtn){

sendBtn.addEventListener("click",sendMessage);

}

if(chatInput){

chatInput.addEventListener("keypress",(e)=>{

if(e.key==="Enter"){

e.preventDefault();

sendMessage();

}

});

}

// ======================
// File Upload
// ======================

document.querySelectorAll("input[type=file]").forEach(input=>{

input.addEventListener("change",()=>{

if(input.files.length>0){

alert(input.files.length+" file(s) selected.");

}

});

});

// ======================
// Countdown
// ======================

document.querySelectorAll(".countdown").forEach(box=>{

let days=parseInt(box.innerText)||2;

setInterval(()=>{

if(days>0){

days--;

box.innerHTML=

'<i class="fa-solid fa-clock"></i> '+days+' Days Remaining';

}

},86400000);

});

// ======================
// Notification
// ======================

function notify(text){

const note=document.createElement("div");

note.innerHTML=text;

note.style.cssText=`

position:fixed;

top:20px;

right:20px;

background:#2563eb;

color:#fff;

padding:15px 25px;

border-radius:12px;

z-index:99999;

box-shadow:0 15px 35px rgba(0,0,0,.30);

`;

document.body.appendChild(note);

setTimeout(()=>{

note.remove();

},3000);

}

document.querySelectorAll(".deliver-confirm-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

notify("Order Delivered Successfully.");

});

});

// ======================
// Analytics Demo
// ======================

document.querySelectorAll(".analytics-card h2").forEach(card=>{

const value=parseInt(card.innerText)||0;

card.innerText=value;

});

console.log("Orders JS Part 3 Loaded");

});

// ======================================================
// PART 4 STARTS HERE
// ======================================================

// ======================================================
// AMD Marketplace - Orders
// JavaScript PART 4
// Analytics • Quick Actions • Timeline • Status
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ======================
// Quick Actions
// ======================

document.querySelectorAll(".action-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

const text=btn.innerText.trim();

switch(text){

case "Create Service":
window.location.href="create-service.html";
break;

case "My Services":
window.location.href="myservices.html";
break;

case "Withdraw Earnings":
alert("Withdraw feature coming soon.");
break;

case "Support":
alert("Support Center coming soon.");
break;

default:
console.log(text);

}

});

});

// ======================
// Order Status
// ======================

document.querySelectorAll(".badge").forEach(badge=>{

badge.addEventListener("click",()=>{

if(badge.classList.contains("pending")){

badge.className="badge active";
badge.innerText="Active";

}else if(badge.classList.contains("active")){

badge.className="badge completed";
badge.innerText="Completed";

}else{

badge.className="badge pending";
badge.innerText="Pending";

}

});

});

// ======================
// Timeline Highlight
// ======================

document.querySelectorAll(".timeline-item").forEach(item=>{

item.addEventListener("mouseenter",()=>{

item.style.transform="translateX(10px)";

});

item.addEventListener("mouseleave",()=>{

item.style.transform="translateX(0)";

});

});

// ======================
// Analytics Demo
// ======================

const analytics=document.querySelectorAll(".analytics-card h2");

analytics.forEach(card=>{

let value=parseInt(card.innerText)||0;

setInterval(()=>{

if(value<100){

value++;

card.innerText=value;

}

},4000);

});

// ======================
// Refresh Time
// ======================

setInterval(()=>{

const now=new Date();

console.log("Orders Refreshed:",now.toLocaleTimeString());

},60000);

console.log("Orders JS Part 4 Loaded");

});

// ======================================================
// PART 5 STARTS HERE
// ======================================================

// ======================================================
// AMD Marketplace - Orders
// JavaScript PART 5 (FINAL)
// Backend Ready • Local Storage • Notifications
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ======================
// Notification
// ======================

function showNotification(message,type="success"){

const note=document.createElement("div");

note.className="amd-notification";

note.innerHTML=message;

note.style.cssText=`

position:fixed;
top:20px;
right:20px;
padding:15px 25px;
border-radius:12px;
color:#fff;
font-weight:600;
z-index:99999;
background:${type==="success"?"#16a34a":"#dc2626"};
box-shadow:0 15px 35px rgba(0,0,0,.30);

`;

document.body.appendChild(note);

setTimeout(()=>{

note.remove();

},3000);

}

// ======================
// Save Filters
// ======================

const status=document.getElementById("statusFilter");

if(status){

status.value=

localStorage.getItem("amd_order_filter")||"all";

status.addEventListener("change",()=>{

localStorage.setItem(

"amd_order_filter",

status.value

);

});

}

// ======================
// Keyboard Shortcuts
// ======================

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key.toLowerCase()==="r"){

e.preventDefault();

showNotification("Orders Refreshed");

}

});

// ======================
// Backend Ready
// ======================

async function loadOrders(){

try{

/*

const response=await fetch(

"http://localhost:5000/api/orders"

);

const data=await response.json();

console.log(data);

*/

console.log(

"Backend Ready - Orders API"

);

}catch(err){

console.error(err);

}

}

loadOrders();

// ======================
// Auto Refresh
// ======================

setInterval(()=>{

loadOrders();

},60000);

// ======================
// Window Leave
// ======================

window.addEventListener("beforeunload",(e)=>{

e.preventDefault();

e.returnValue="";

});

// ======================
// Finish
// ======================

showNotification(

"Orders Dashboard Ready"

);

console.log(

"AMD Marketplace Orders Ready"

);

});
