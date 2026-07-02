
// ======================================================
// AMD Marketplace - Create Service
// JavaScript PART 1
// Sidebar • Wizard • Counters • Preview
// ======================================================

document.addEventListener("DOMContentLoaded", () => {

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
// Wizard
// ======================

const steps=document.querySelectorAll(".step-card");
const progress=document.querySelectorAll(".wizard-progress .step");

let currentStep=0;

function showStep(index){

steps.forEach((step,i)=>{

step.style.display=(i===index)?"block":"none";

});

progress.forEach((step,i)=>{

if(i<=index){

step.classList.add("active");

}else{

step.classList.remove("active");

}

});

currentStep=index;

}

showStep(0);

// ======================
// Next Buttons
// ======================

document.querySelectorAll(".next-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

if(currentStep<steps.length-1){

showStep(currentStep+1);

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

});

// ======================
// Previous Buttons
// ======================

document.querySelectorAll(".prev-btn").forEach(btn=>{

btn.addEventListener("click",()=>{

if(currentStep>0){

showStep(currentStep-1);

window.scrollTo({

top:0,

behavior:"smooth"

});

}

});

});

// ======================
// Title Counter
// ======================

const title=document.getElementById("serviceTitle");
const titleCounter=document.getElementById("titleCounter");

if(title && titleCounter){

title.addEventListener("input",()=>{

titleCounter.innerHTML=

title.value.length+" / 100";

});

}

// ======================
// Description Counter
// ======================

const shortDesc=document.getElementById("shortDescription");
const descCounter=document.getElementById("descCounter");

if(shortDesc && descCounter){

shortDesc.addEventListener("input",()=>{

descCounter.innerHTML=

shortDesc.value.length+" / 300";

});

}

// ======================
// Full Description Counter
// ======================

const full=document.getElementById("fullDescription");
const fullCounter=document.getElementById("fullDescCounter");

if(full && fullCounter){

full.addEventListener("input",()=>{

fullCounter.innerHTML=

full.value.length+" / 5000";

});

}

// ======================
// Thumbnail Preview
// ======================

const upload=document.getElementById("thumbnail");
const preview=document.getElementById("thumbnailPreview");

if(upload && preview){

upload.addEventListener("change",(e)=>{

const file=e.target.files[0];

if(file){

preview.src=URL.createObjectURL(file);

preview.style.display="block";

}

});

}

console.log("Create Service JS Part 1 Loaded");

});

// ======================
// PART 2 STARTS HERE
// ======================

// ======================================================
// AMD Marketplace - Create Service
// JavaScript PART 2
// Validation • Auto Save • SEO Score • Draft
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ======================
// Auto Save Draft
// ======================

const fields=document.querySelectorAll(
"input, textarea, select"
);

fields.forEach(field=>{

const key="amd_"+field.id;

if(field.id){

field.value=localStorage.getItem(key)||"";

field.addEventListener("input",()=>{

localStorage.setItem(key,field.value);

});

}

});

// ======================
// Save Draft
// ======================

const saveDraft=document.querySelector(".save-draft-btn");

if(saveDraft){

saveDraft.addEventListener("click",()=>{

alert("Draft Saved Successfully.");

});

}

// ======================
// Validation
// ======================

function validateStep(){

const title=document.getElementById("serviceTitle");

const category=document.getElementById("category");

if(title && category){

if(title.value.trim()===""){

alert("Please enter Service Title.");

title.focus();

return false;

}

if(category.selectedIndex===0){

alert("Please select Category.");

category.focus();

return false;

}

}

return true;

}

document.querySelectorAll(".next-btn").forEach(btn=>{

btn.addEventListener("click",(e)=>{

if(currentStep===0){

if(!validateStep()){

e.stopImmediatePropagation();

return;

}

}

});

});

// ======================
// SEO Score
// ======================

const seoCards=document.querySelectorAll(".score-card h2");

function updateSEO(){

let score=40;

const title=document.getElementById("serviceTitle");

const desc=document.getElementById("fullDescription");

const cover=document.getElementById("coverImage");

if(title && title.value.length>20){

score+=20;

}

if(desc && desc.value.length>300){

score+=20;

}

if(cover && cover.files.length>0){

score+=20;

}

if(seoCards[0]){

seoCards[0].innerHTML=score+"%";

}

}

fields.forEach(field=>{

field.addEventListener("input",updateSEO);

});

updateSEO();

// ======================
// Drag & Drop Upload
// ======================

document.querySelectorAll(".upload-box").forEach(box=>{

box.addEventListener("dragover",(e)=>{

e.preventDefault();

box.style.borderColor="#2563eb";

});

box.addEventListener("dragleave",()=>{

box.style.borderColor="";

});

box.addEventListener("drop",(e)=>{

e.preventDefault();

box.style.borderColor="";

const input=box.querySelector("input");

if(input){

input.files=e.dataTransfer.files;

}

});

});

// ======================
// Live Service Score
// ======================

function updateServiceScore(){

let score=0;

fields.forEach(field=>{

if(field.value.trim()!==""){

score+=5;

}

});

if(score>100){

score=100;

}

if(seoCards[1]){

seoCards[1].innerHTML=score+"%";

}

}

fields.forEach(field=>{

field.addEventListener("input",updateServiceScore);

});

updateServiceScore();

console.log("Create Service JS Part 2 Loaded");

});

// ======================
// PART 3 STARTS HERE
// ======================

// ======================================================
// AMD Marketplace - Create Service
// JavaScript PART 3 (FINAL)
// Publish • Backend Ready • Notifications • Finish
// ======================================================

document.addEventListener("DOMContentLoaded",()=>{

// ======================
// Notification
// ======================

function showNotification(message,type="success"){

const note=document.createElement("div");

note.className="notification";

note.innerHTML=message;

note.style.cssText=`
position:fixed;
top:20px;
right:20px;
padding:15px 25px;
border-radius:12px;
font-weight:600;
color:#fff;
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
// Publish
// ======================

const publishBtn=document.querySelector(".publish-btn");

if(publishBtn){

publishBtn.addEventListener("click",async()=>{

const service={

title:document.getElementById("serviceTitle")?.value||"",

category:document.getElementById("category")?.value||"",

subcategory:document.getElementById("subcategory")?.value||"",

description:document.getElementById("fullDescription")?.value||"",

basicPrice:document.getElementById("basicPrice")?.value||0,

standardPrice:document.getElementById("standardPrice")?.value||0,

premiumPrice:document.getElementById("premiumPrice")?.value||0

};

try{

// Backend Ready
// Uncomment when API is ready

/*
const response=await fetch("http://localhost:5000/api/services",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(service)

});

const data=await response.json();

if(!data.success){

throw new Error(data.message);

}
*/

showNotification("Service Published Successfully!");

localStorage.removeItem("amd_serviceTitle");
localStorage.removeItem("amd_shortDescription");
localStorage.removeItem("amd_fullDescription");

setTimeout(()=>{

window.location.href="myservices.html";

},1500);

}catch(err){

showNotification(err.message,"error");

}

});

}

// ======================
// Keyboard Shortcuts
// ======================

document.addEventListener("keydown",(e)=>{

if(e.ctrlKey && e.key.toLowerCase()==="s"){

e.preventDefault();

const save=document.querySelector(".save-draft-btn");

if(save){

save.click();

}

}

});

// ======================
// Before Leave Warning
// ======================

window.addEventListener("beforeunload",(e)=>{

e.preventDefault();

e.returnValue="";

});

// ======================
// Finish
// ======================

console.log("AMD Marketplace Create Service Ready");

});
