
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
// AMD Marketplace - Profile Setup Step 3 JS (Part 1)
document.addEventListener("DOMContentLoaded",()=>{

// ===== Detect User Role =====
const role = localStorage.getItem("amd_role") || "client";

const freelancerFields = document.getElementById("freelancerFields");
const freelancerAdvanced = document.getElementById("freelancerAdvanced");
const clientFields = document.getElementById("clientFields");
const clientAdvanced = document.getElementById("clientAdvanced");

function updateRoleUI(){
    if(role === "freelancer"){
        if(freelancerFields) freelancerFields.style.display="block";
        if(freelancerAdvanced) freelancerAdvanced.style.display="block";
        if(clientFields) clientFields.style.display="none";
        if(clientAdvanced) clientAdvanced.style.display="none";
    }else{
        if(clientFields) clientFields.style.display="block";
        if(clientAdvanced) clientAdvanced.style.display="block";
        if(freelancerFields) freelancerFields.style.display="none";
        if(freelancerAdvanced) freelancerAdvanced.style.display="none";
    }
}

updateRoleUI();

// ===== Step Navigation =====
const step2=document.getElementById("step2");
const step3=document.getElementById("step3");

const nextToStep3=document.getElementById("nextStepBtn");
const backToStep2=document.getElementById("backToStep2");

if(nextToStep3 && step2 && step3){
    nextToStep3.addEventListener("click",()=>{
        step2.style.display="none";
        step3.style.display="block";
    });
}

if(backToStep2 && step2 && step3){
    backToStep2.addEventListener("click",()=>{
        step3.style.display="none";
        step2.style.display="block";
    });
}

// ===== Progress Update =====
const progress=document.querySelector(".progress-fill");
const progressText=document.querySelector(".progress-text span");

if(step3 && progress && progressText){
    const observer=new MutationObserver(()=>{
        if(step3.style.display==="block"){
            progress.style.width="60%";
            progressText.textContent="Step 3 of 5";
        }
    });

    observer.observe(step3,{
        attributes:true,
        attributeFilter:["style"]
    });
}

console.log("AMD Marketplace Step 3 JS Part 1 Loaded");

});
// AMD Marketplace - Profile Setup Step 3 JS (Part 2)
document.addEventListener("DOMContentLoaded",()=>{

// ===== Auto Save =====
document.querySelectorAll("#step3 input,#step3 select,#step3 textarea").forEach((field,index)=>{
    const key="amd_step3_"+index;

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

// ===== Validation =====
const nextBtn=document.getElementById("nextToStep4");

if(nextBtn){
    nextBtn.addEventListener("click",()=>{

        let valid=true;

        document.querySelectorAll("#step3 input[required],#step3 select[required],#step3 textarea[required]").forEach(field=>{

            if(field.value.trim()===""){
                field.style.borderColor="red";
                valid=false;
            }else{
                field.style.borderColor="#22c55e";
            }

        });

        if(!valid){
            alert("Please complete all required fields.");
            return;
        }

        // Step 4 placeholder
        const step3=document.getElementById("step3");
        const step4=document.getElementById("step4");

        if(step3) step3.style.display="none";
        if(step4) step4.style.display="block";

        const progress=document.querySelector(".progress-fill");
        const progressText=document.querySelector(".progress-text span");

        if(progress) progress.style.width="80%";
        if(progressText) progressText.textContent="Step 4 of 5";

    });
}

// ===== Mobile Touch Feedback =====
document.querySelectorAll("#step3 button").forEach(btn=>{
    btn.addEventListener("touchstart",()=>btn.style.opacity=".85");
    btn.addEventListener("touchend",()=>btn.style.opacity="1");
});

console.log("AMD Marketplace Step 3 JS Complete");

});
