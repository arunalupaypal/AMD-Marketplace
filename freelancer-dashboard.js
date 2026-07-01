
// AMD Marketplace - Freelancer Dashboard JS PART 1
document.addEventListener("DOMContentLoaded",()=>{

// ===== Sidebar Toggle =====
const menuBtn=document.querySelector(".menu-btn");
const sidebar=document.querySelector(".sidebar");

if(menuBtn && sidebar){
    menuBtn.addEventListener("click",()=>{
        sidebar.classList.toggle("active");
    });
}

// ===== Active Menu =====
document.querySelectorAll(".sidebar li").forEach(item=>{
    item.addEventListener("click",()=>{
        document.querySelectorAll(".sidebar li")
            .forEach(li=>li.classList.remove("active"));
        item.classList.add("active");
    });
});

// ===== Load Username =====
const username=document.getElementById("username");
const savedName=localStorage.getItem("amd_profile_0");

if(username && savedName){
    username.textContent=savedName;
}

// ===== Profile Image =====
const profileImg=document.querySelector(".profile-img");
const previewAvatar=document.getElementById("profilePreview");

if(profileImg && previewAvatar){
    profileImg.src=previewAvatar.src;
}

// ===== Notification Badge =====
const bell=document.querySelector(".top-right .fa-bell");

if(bell){
    bell.title="No new notifications";
}

// ===== Welcome Animation =====
const hero=document.querySelector(".hero");
if(hero){
    hero.style.opacity="0";
    hero.style.transform="translateY(20px)";

    setTimeout(()=>{
        hero.style.transition=".6s";
        hero.style.opacity="1";
        hero.style.transform="translateY(0)";
    },150);
}

console.log("Freelancer Dashboard JS Part 1 Loaded");

});
// AMD Marketplace - Freelancer Dashboard JS PART 2
document.addEventListener("DOMContentLoaded",()=>{

// ===== Animated Statistics =====
document.querySelectorAll(".card h2").forEach(counter=>{

    const target=parseInt(counter.textContent.replace(/\D/g,"")) || 0;
    let count=0;

    function update(){

        if(count<target){
            count += Math.ceil((target-count)/20);
            counter.textContent = counter.textContent.includes("$")
                ? "$"+count
                : count;
            requestAnimationFrame(update);
        }else{
            counter.textContent = counter.textContent.includes("$")
                ? "$"+target
                : target;
        }

    }

    if(target>0){
        update();
    }

});

// ===== Search =====
const search=document.querySelector(".search-box input");

if(search){

search.addEventListener("keyup",()=>{

const value=search.value.toLowerCase();

document.querySelectorAll(".sidebar li").forEach(item=>{

const text=item.textContent.toLowerCase();

item.style.display=text.includes(value)?"block":"none";

});

});

}

// ===== Logout =====
document.querySelectorAll("a").forEach(link=>{

if(link.textContent.trim().toLowerCase().includes("logout")){

link.addEventListener("click",(e)=>{

const ok=confirm("Are you sure you want to logout?");

if(!ok){
e.preventDefault();
return;
}

localStorage.removeItem("amd_session");

});

}

});

// ===== Mobile Auto Close Sidebar =====
document.querySelectorAll(".sidebar a").forEach(link=>{

link.addEventListener("click",()=>{

if(window.innerWidth<=768){

const sidebar=document.querySelector(".sidebar");

if(sidebar){
sidebar.classList.remove("active");
}

}

});

});

// ===== Footer Year =====
const footer=document.querySelector(".dashboard-footer p");

if(footer){

const year=new Date().getFullYear();

footer.innerHTML="© "+year+" AMD Marketplace. All Rights Reserved.";

}

console.log("Freelancer Dashboard JS Complete");

});
