
// AMD Marketplace - profile-setup.js PART 1
document.addEventListener("DOMContentLoaded",()=>{

// ===== Step Elements =====
const startBtn=document.getElementById("startSetupBtn");
const welcome=document.querySelector(".welcome-box");
const step2=document.getElementById("step2");
const progress=document.querySelector(".progress-fill");
const progressText=document.querySelector(".progress-text span");

if(step2){
  step2.style.display="none";
}

// ===== Start Wizard =====
if(startBtn){
  startBtn.addEventListener("click",()=>{
    if(welcome) welcome.style.display="none";
    if(step2) step2.style.display="block";

    if(progress){
      progress.style.width="40%";
    }
    if(progressText){
      progressText.textContent="Step 2 of 5";
    }
  });
}

// ===== Profile Photo Preview =====
const photoInput=document.getElementById("profilePhoto");
const preview=document.getElementById("profilePreview");

if(photoInput && preview){
  photoInput.addEventListener("change",(e)=>{
    const file=e.target.files[0];
    if(!file) return;

    if(!file.type.startsWith("image/")){
      alert("Please select a valid image.");
      return;
    }

    const reader=new FileReader();
    reader.onload=(ev)=>{
      preview.src=ev.target.result;
    };
    reader.readAsDataURL(file);
  });
}

// ===== Basic Validation =====
const nextBtn=document.getElementById("nextStepBtn");
const form=document.getElementById("profileSetupForm");

if(nextBtn && form){
  nextBtn.addEventListener("click",()=>{
    const required=form.querySelectorAll("input[type='text'], select");
    let ok=true;

    required.forEach(el=>{
      if(!el.value.trim()){
        ok=false;
        el.style.borderColor="red";
      }else{
        el.style.borderColor="#22c55e";
      }
    });

    if(!ok){
      alert("Please complete the required fields.");
      return;
    }

    alert("Step 2 completed. (Next steps will be added)");
  });
}

console.log("AMD Marketplace Profile Setup JS Part 1 Loaded");

});
// AMD Marketplace - profile-setup.js PART 2
document.addEventListener("DOMContentLoaded",()=>{

// ===== Auto Save =====
document.querySelectorAll("#profileSetupForm input, #profileSetupForm select").forEach((field,index)=>{
  const key="amd_profile_"+index;

  if(localStorage.getItem(key)){
    field.value=localStorage.getItem(key);
  }

  field.addEventListener("input",()=>{
    localStorage.setItem(key,field.value);
  });

  field.addEventListener("change",()=>{
    localStorage.setItem(key,field.value);
  });
});

// ===== Username Validation =====
const username=document.querySelector("input[placeholder='@username']");

if(username){
  username.addEventListener("input",()=>{
    username.value=username.value.replace(/\s+/g,"");

    if(username.value.length<4){
      username.style.borderColor="orange";
    }else{
      username.style.borderColor="#22c55e";
    }
  });
}

// ===== Drag & Drop Profile Image =====
const preview=document.getElementById("profilePreview");

if(preview){

["dragenter","dragover"].forEach(evt=>{
preview.addEventListener(evt,e=>{
e.preventDefault();
preview.style.borderColor="#2563eb";
});
});

["dragleave","drop"].forEach(evt=>{
preview.addEventListener(evt,e=>{
e.preventDefault();
preview.style.borderColor="";
});
});

preview.addEventListener("drop",e=>{

const file=e.dataTransfer.files[0];

if(file && file.type.startsWith("image/")){

const reader=new FileReader();

reader.onload=ev=>{
preview.src=ev.target.result;
};

reader.readAsDataURL(file);

}

});

}

// ===== Enter Key =====
document.querySelectorAll("#profileSetupForm input").forEach(input=>{
input.addEventListener("keydown",e=>{
if(e.key==="Enter"){
e.preventDefault();
const btn=document.getElementById("nextStepBtn");
if(btn) btn.click();
}
});
});

// ===== Smooth Step Transition =====
const step=document.getElementById("step2");

if(step){
step.style.opacity="0";

setTimeout(()=>{
step.style.transition=".6s";
step.style.opacity="1";
},150);
}

console.log("AMD Marketplace Profile Setup JS Part 2 Loaded");

});
// AMD Marketplace - profile-setup.js PART 3
document.addEventListener("DOMContentLoaded",()=>{

// ===== Complete Setup =====
const form=document.getElementById("profileSetupForm");
const continueBtn=document.getElementById("nextStepBtn");

function showSuccess(msg){
  const toast=document.createElement("div");
  toast.textContent=msg;
  toast.style.cssText=`
    position:fixed;
    top:20px;
    right:20px;
    background:#16a34a;
    color:#fff;
    padding:15px 22px;
    border-radius:12px;
    z-index:99999;
    box-shadow:0 10px 25px rgba(0,0,0,.25);
  `;
  document.body.appendChild(toast);
  setTimeout(()=>toast.remove(),2500);
}

if(continueBtn){
  continueBtn.addEventListener("click",()=>{

    localStorage.setItem("amd_profile_completed","true");

    showSuccess("Profile information saved!");

    setTimeout(()=>{
      const role=localStorage.getItem("amd_role") || "client";

      if(role==="client"){
        window.location.href="client-dashboard.html";
      }else{
        window.location.href="freelancer-dashboard.html";
      }

    },1800);

  });
}

// ===== Back Button =====
const backBtn=document.querySelector(".back-btn");
const welcome=document.querySelector(".welcome-box");
const step2=document.getElementById("step2");
const progress=document.querySelector(".progress-fill");
const progressText=document.querySelector(".progress-text span");

if(backBtn){
  backBtn.addEventListener("click",()=>{
    if(step2) step2.style.display="none";
    if(welcome) welcome.style.display="block";

    if(progress) progress.style.width="20%";
    if(progressText) progressText.textContent="Step 1 of 5";
  });
}

// ===== Mobile Touch Feedback =====
document.querySelectorAll("button,.upload-btn").forEach(el=>{
  el.addEventListener("touchstart",()=>el.style.opacity=".85");
  el.addEventListener("touchend",()=>el.style.opacity="1");
});

// ===== Auto Focus =====
const firstInput=document.querySelector("#profileSetupForm input[type='text']");
if(firstInput){
  firstInput.focus();
}

console.log("AMD Marketplace Profile Setup JS Complete");

});
