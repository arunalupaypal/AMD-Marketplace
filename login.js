
// AMD Marketplace - login.js PART 1
document.addEventListener("DOMContentLoaded",()=>{

// ===== Show / Hide Password =====
const pwd=document.querySelector('input[type="password"]');

if(pwd){
    const toggle=document.createElement("button");
    toggle.type="button";
    toggle.innerHTML="👁";
    toggle.className="toggle-password";
    toggle.style.cssText="margin-top:8px;background:none;border:none;color:#7dd3fc;cursor:pointer;";

    pwd.parentElement.appendChild(toggle);

    toggle.addEventListener("click",()=>{
        if(pwd.type==="password"){
            pwd.type="text";
            toggle.innerHTML="🙈";
        }else{
            pwd.type="password";
            toggle.innerHTML="👁";
        }
    });
}

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

// ===== Remember Me =====
const remember=document.querySelector('input[type="checkbox"]');

if(remember && email){
email.value=localStorage.getItem("amd_login_email")||"";
remember.checked=localStorage.getItem("amd_remember")==="true";

if(remember.checked){
email.value=localStorage.getItem("amd_login_email")||"";
}

remember.addEventListener("change",()=>{
localStorage.setItem("amd_remember",remember.checked);
if(!remember.checked){
localStorage.removeItem("amd_login_email");
}
});

email.addEventListener("input",()=>{
if(remember.checked){
localStorage.setItem("amd_login_email",email.value);
}
});
}

// ===== Login Form =====
const form=document.getElementById("loginForm");

if(form){
form.addEventListener("submit",(e)=>{
e.preventDefault();

if(!email.value.trim() || !pwd.value.trim()){
alert("Please fill in all fields.");
return;
}

console.log("Login validation passed.");
});
}

console.log("AMD Marketplace Login JS Part 1 Loaded");

});
// AMD Marketplace - login.js PART 2
document.addEventListener("DOMContentLoaded",()=>{

const form=document.getElementById("loginForm");
const button=document.querySelector(".login-btn-main");

// ===== Input Feedback =====
document.querySelectorAll(".input-group input").forEach(input=>{
  input.addEventListener("input",()=>{
    if(input.value.trim()){
      input.style.borderColor="#22c55e";
    }else{
      input.style.borderColor="";
    }
  });
});

// ===== Enter Key Submit =====
document.querySelectorAll("input").forEach(input=>{
  input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
      e.preventDefault();
      if(form) form.requestSubmit();
    }
  });
});

// ===== Loading Button =====
if(form && button){
  form.addEventListener("submit",()=>{
    button.disabled=true;
    button.textContent="Signing In...";
    setTimeout(()=>{
      button.disabled=false;
      button.textContent="Login";
    },1800);
  });
}

// ===== Success Popup =====
function showMessage(text,color="#16a34a"){
  const box=document.createElement("div");
  box.textContent=text;
  box.style.cssText=`
  position:fixed;
  top:20px;
  right:20px;
  padding:15px 20px;
  border-radius:12px;
  background:${color};
  color:#fff;
  z-index:99999;
  box-shadow:0 10px 25px rgba(0,0,0,.25);`;
  document.body.appendChild(box);
  setTimeout(()=>box.remove(),2500);
}

// ===== Demo Redirect Foundation =====
if(form){
  form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const role=localStorage.getItem("amd_role") || "client";

    showMessage("Login Successful!");

    setTimeout(()=>{
      if(role==="client"){
        window.location.href="client-dashboard.html";
      }else{
        window.location.href="freelancer-dashboard.html";
      }
    },1800);
  });
}

console.log("AMD Marketplace Login JS Part 2 Loaded");

});
// AMD Marketplace - login.js PART 3
document.addEventListener("DOMContentLoaded",()=>{

// ===== Auto Focus =====
const email=document.querySelector('input[type="email"]');
if(email){
  email.focus();
}

// ===== Prevent Double Click =====
const loginBtn=document.querySelector(".login-btn-main");
if(loginBtn){
  loginBtn.addEventListener("dblclick",(e)=>{
    e.preventDefault();
  });
}

// ===== Mobile Touch Feedback =====
document.querySelectorAll("button,a").forEach(el=>{
  el.addEventListener("touchstart",()=>{
    el.style.opacity=".85";
  });
  el.addEventListener("touchend",()=>{
    el.style.opacity="1";
  });
});

// ===== Escape Key Clears Fields =====
document.addEventListener("keydown",(e)=>{
  if(e.key==="Escape"){
    document.querySelectorAll("input[type='email'],input[type='password']").forEach(i=>{
      i.value="";
      i.style.borderColor="";
    });
  }
});

// ===== Offline Detection =====
window.addEventListener("offline",()=>{
  alert("No internet connection.");
});

window.addEventListener("online",()=>{
  console.log("Connection restored.");
});

// ===== Page Visibility =====
document.addEventListener("visibilitychange",()=>{
  if(document.hidden){
    console.log("User left the login page.");
  }
});

// ===== Resize Helper =====
window.addEventListener("resize",()=>{
  document.documentElement.style.setProperty(
    "--vh",
    `${window.innerHeight * 0.01}px`
  );
});
window.dispatchEvent(new Event("resize"));

console.log("AMD Marketplace Login JS Complete");

});
