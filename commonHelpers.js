import{a as w,S as L,i as v}from"./assets/vendor-c3c9fc05.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const f of s.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&r(f)}).observe(document,{childList:!0,subtree:!0});function c(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=c(o);fetch(o.href,s)}})();const $="45272920-c2160489642e002ce9de87f86",S="https://pixabay.com/api/";async function m(e,t=1){const c=`${S}?key=${$}&q=${encodeURIComponent(e)}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${t}`,r=await w.get(c);if(r.status!==200)throw new Error("Network response was not ok");return r.data}let p;function g(e){const t=document.querySelector(".gallery"),c=e.map(r=>`
        <a href="${r.largeImageURL}" class="gallery__item">
            <img src="${r.webformatURL}" alt="${r.tags}" class="gallery__image" />
            <div class="info">
                <p class="info-item"><b>Likes:</b> ${r.likes}</p>
                <p class="info-item"><b>Views:</b> ${r.views}</p>
                <p class="info-item"><b>Comments:</b> ${r.comments}</p>
                <p class="info-item"><b>Downloads:</b> ${r.downloads}</p>
            </div>
        </a>
    `).join("");t.insertAdjacentHTML("beforeend",c),p?p.refresh():p=new L(".gallery a")}function a(e,t="info"){v.show({message:e,position:"topRight",color:t})}function h(){const e=document.querySelector(".gallery");e.innerHTML=""}const b=document.querySelector("#search-form"),q=b.querySelector('input[name="searchQuery"]'),i=document.querySelector(".loader"),n=document.createElement("button");n.textContent="Load more";n.classList.add("btn","btn-secondary");n.style.display="none";document.body.appendChild(n);let y="",u=1,d=0,l=0;b.addEventListener("submit",async e=>{if(e.preventDefault(),y=q.value.trim(),u=1,l=0,y===""){a("Please enter a search query","error"),h(),n.style.display="none";return}h(),i.style.display="block",n.style.display="none";try{const t=await m(y,u);i.style.display="none",d=t.totalHits,t.hits.length===0?(a("Sorry, no images found. Please try again!","error"),n.style.display="none"):(g(t.hits),l+=t.hits.length,n.style.display=l<d?"block":"none",l>=d&&a("We're sorry, but you've reached the end of search results.","info"))}catch{i.style.display="none",a("An error occurred. Please try again later.","error")}});n.addEventListener("click",async()=>{u+=1,i.style.display="block";try{const e=await m(y,u);i.style.display="none",e.hits.length>0&&(g(e.hits),l+=e.hits.length,n.style.display=l<d?"block":"none",window.scrollBy({top:document.querySelector(".gallery").firstElementChild.getBoundingClientRect().height*2,behavior:"smooth"}),l>=d&&(a("We're sorry, but you've reached the end of search results.","info"),n.style.display="none"))}catch{i.style.display="none",a("An error occurred. Please try again later.","error")}});
//# sourceMappingURL=commonHelpers.js.map
