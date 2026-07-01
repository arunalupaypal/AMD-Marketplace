
// AMD Marketplace - signup.js PART 1
document.addEventListener("DOMContentLoaded",()=>{

let role="client";

const client=document.getElementById("clientCard");
const freelancer=document.getElementById("freelancerCard");

function selectRole(type){
    role=type;

    client.classList.remove("active");
    freelancer.classList.remove("active");

    if(type==="client"){
        client.classList.add("active");
    }else{
        freelancer.classList.add("active");
    }
}

if(client){
    client.addEventListener("click",()=>selectRole("client"));
}

if(freelancer){
    freelancer.addEventListener("click",()=>selectRole("freelancer"));
}

// Form
const form=document.getElementById("signupForm");

if(form){

form.addEventListener("submit",(e)=>{
e.preventDefault();

const inputs=form.querySelectorAll("input");

let valid=true;

inputs.forEach(input=>{
    if(input.type!=="checkbox" && input.value.trim()===""){
        valid=false;
        input.style.borderColor="red";
    }else{
        input.style.borderColor="";
    }
});

const password=inputs[2].value;
const confirm=inputs[3].value;

if(password!==confirm){
    alert("Passwords do not match.");
    return;
}

const agree=form.querySelector('input[type="checkbox"]');

if(!agree.checked){
    alert("Please accept the Terms & Conditions.");
    return;
}

// Save selected role for future use
localStorage.setItem("amd_role",role);

alert("Signup successful! (Demo)");

if(role==="client"){
    console.log("Redirect -> client dashboard");
}else{
    console.log("Redirect -> freelancer dashboard");
}

});

}

// Simple password strength
const pwd=form ? form.querySelectorAll("input[type='password']")[0] : null;

if(pwd){
pwd.addEventListener("input",()=>{
const v=pwd.value.length;
if(v<6){
pwd.style.borderColor="red";
}else if(v<10){
pwd.style.borderColor="orange";
}else{
pwd.style.borderColor="lime";
}
});
}

console.log("Signup JS Ready");

});
// AMD Marketplace - signup.js PART 2
document.addEventListener("DOMContentLoaded",()=>{

// ===== Show / Hide Password =====
const passwordFields=document.querySelectorAll('input[type="password"]');

passwordFields.forEach(field=>{

const btn=document.createElement("button");
btn.type="button";
btn.textContent="👁";
btn.style.cssText=`
margin-top:8px;
background:none;
border:none;
color:#7dd3fc;
cursor:pointer;
font-size:16px;
`;

field.parentElement.appendChild(btn);

btn.addEventListener("click",()=>{
if(field.type==="password"){
field.type="text";
btn.textContent="🙈";
}else{
field.type="password";
btn.textContent="👁";
}
});

});

// ===== Email Validation =====
const email=document.querySelector('input[type="email"]');

if(email){

email.addEventListener("blur",()=>{

const pattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(email.value && !pattern.test(email.value)){
email.style.borderColor="red";
alert("Please enter a valid email address.");
}else{
email.style.borderColor="";
}

});

}

// ===== Loading Button =====
const form=document.getElementById("signupForm");
const button=document.querySelector(".create-btn");

if(form && button){

form.addEventListener("submit",()=>{

button.disabled=true;
button.innerHTML="Creating Account...";

setTimeout(()=>{
button.disabled=false;
button.innerHTML="Create Account";
},1800);

});

}

// ===== Success Animation =====
document.querySelectorAll(".input-group input,.input-group select").forEach(input=>{

input.addEventListener("input",()=>{

if(input.value.trim()!==""){
input.style.borderColor="lime";
}else{
input.style.borderColor="";
}

});

});

// ===== Keyboard UX =====
document.querySelectorAll("input").forEach(input=>{

input.addEventListener("keydown",(e)=>{
if(e.key==="Enter"){
const form=document.getElementById("signupForm");
if(form){
e.preventDefault();
form.requestSubmit();
}
}
});

});

console.log("Signup JS Part 2 Loaded");

});
// AMD Marketplace - signup.js PART 3
document.addEventListener("DOMContentLoaded",()=>{

// ===== Restore Saved Data =====
["text","email"].forEach(type=>{
  document.querySelectorAll(`input[type="${type}"]`).forEach((input,i)=>{
    const key="amd_"+type+"_"+i;
    input.value=localStorage.getItem(key)||"";
    input.addEventListener("input",()=>{
      localStorage.setItem(key,input.value);
    });
  });
});

// ===== Remember Country =====
const country=document.querySelector("select");
if(country){
  country.value=localStorage.getItem("amd_country")||country.value;
  country.addEventListener("change",()=>{
    localStorage.setItem("amd_country",country.value);
  });
}

// ===== Success Popup =====
function showSuccess(message){
  const box=document.createElement("div");
  box.textContent=message;
  box.style.cssText=`
  position:fixed;
  top:20px;
  right:20px;
  background:#16a34a;
  color:#fff;
  padding:16px 22px;
  border-radius:12px;
  z-index:99999;
  box-shadow:0 10px 25px rgba(0,0,0,.25);
  `;
  document.body.appendChild(box);
  setTimeout(()=>box.remove(),2500);
}

// ===== Final Submit =====
const form=document.getElementById("signupForm");
if(form){
  form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const role=localStorage.getItem("amd_role")||"client";
    showSuccess("Account created successfully!");

    setTimeout(()=>{
      if(role==="client"){
        window.location.href="client-dashboard.html";
      }else{
        window.location.href="freelancer-dashboard.html";
      }
    },1800);
  });
}

// ===== Disable Double Click =====
const btn=document.querySelector(".create-btn");
if(btn){
  btn.addEventListener("dblclick",e=>e.preventDefault());
}

// ===== Mobile Touch Feedback =====
document.querySelectorAll("button,.type-card").forEach(el=>{
  el.addEventListener("touchstart",()=>{
    el.style.opacity=".85";
  });
  el.addEventListener("touchend",()=>{
    el.style.opacity="1";
  });
});

console.log("AMD Marketplace Signup JS Complete");

});
