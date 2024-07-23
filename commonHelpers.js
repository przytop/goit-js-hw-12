import{a as b,S as w,i as L}from"./assets/vendor-c493984e.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerPolicy&&(a.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?a.credentials="include":r.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}})();const P="45020443-554fa7ec416e1f918b290a17c",E="https://pixabay.com/api/";async function d(e,t=1){const s={params:{key:P,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:20}};try{return(await b.get(E,s)).data}catch(i){throw console.error("Error fetching data from Pixabay:",i),new Error("Unable to fetch data from Pixabay at this time. Please try again later.")}}function S({webformatURL:e="",largeImageURL:t="",tags:s="",likes:i=0,views:r=0,comments:a=0,downloads:n=0}){return`
      <li class="gallery-item">
        <a class="gallery-link" href="${t}">
          <img class="gallery-image" src="${e}" alt="${s}">
        </a>
        <ul class="image-info">
          <li>
            <h3 class="image-title">Likes</h3>
            <p class="image-stats">${i}</p>
          </li>
          <li>
            <h3 class="image-title">Views</h3>
            <p class="image-stats">${r}</p>
          </li>
          <li>
            <h3 class="image-title">Comments</h3>
            <p class="image-stats">${a}</p>
          </li>
          <li>
            <h3 class="image-title">Downloads</h3>
            <p class="image-stats">${n}</p>
          </li>
        </ul>
      </li>`}const y=document.querySelector(".form"),h=document.querySelector(".loading"),u=document.querySelector(".gallery"),l=document.querySelector("button[name='more']"),q=new w(".gallery a",{captionsData:"alt",captionDelay:250});let g=1,f="",m=0;function c(e,t){L[e]({message:t,position:"topRight"})}function o(e,t){e.classList.toggle("disabled",!t)}function p(e){if(e.hits.length===0){c("warning","Sorry, there are no images matching your search query. Please try again!");return}const t=e.hits.map(S).join("");u.insertAdjacentHTML("beforeend",t),g+=1,o(l,u.childElementCount<m),q.refresh(),u.childElementCount>=m&&(o(l,!1),c("info","We're sorry, but you've reached the end of search results."))}async function v(e){if(e.preventDefault(),f=e.target.search.value.trim(),!f){c("error","Complete the field correctly");return}g=1,u.innerHTML="",o(h,!0),o(l,!1);try{const t=await d(f,g);m=t.totalHits,p(t)}catch(t){c("error","An error occurred while fetching data. Please try again."),console.error("Error fetching data:",t)}finally{o(h,!1),y.reset()}}async function x(){o(h,!0),o(l,!1);try{const e=await d(f,g);p(e)}catch(e){c("error","An error occurred while fetching data. Please try again."),console.error("Error fetching data:",e)}finally{let e=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e.height*3,behavior:"smooth"}),o(h,!1)}}y.addEventListener("submit",v);l.addEventListener("click",x);
//# sourceMappingURL=commonHelpers.js.map
