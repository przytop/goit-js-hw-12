import{a as b,S as L,i as c}from"./assets/vendor-c493984e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const l of a.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function n(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function o(t){if(t.ep)return;t.ep=!0;const a=n(t);fetch(t.href,a)}})();const w="45020443-554fa7ec416e1f918b290a17c",P="https://pixabay.com/api/";async function p(e,r=1){const n={params:{key:w,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}};try{return(await b.get(P,n)).data}catch(o){throw console.error("Error fetching data from Pixabay:",o),o}}function S({webformatURL:e,largeImageURL:r,tags:n,likes:o,views:t,comments:a,downloads:l}){return`
      <li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${e}" alt="${n}">
        </a>
        <ul class="image-info">
          <li>
            <h3 class="image-title">Likes</h3>
            <p class="image-stats">${o}</p>
          </li>
          <li>
            <h3 class="image-title">Views</h3>
            <p class="image-stats">${t}</p>
          </li>
          <li>
            <h3 class="image-title">Comments</h3>
            <p class="image-stats">${a}</p>
          </li>
          <li>
            <h3 class="image-title">Downloads</h3>
            <p class="image-stats">${l}</p>
          </li>
        </ul>
      </li>`}const d=document.querySelector(".form"),f=document.querySelector(".loader"),m=document.querySelector(".gallery"),i=document.querySelector("button[name='more']"),E=new L(".gallery a",{captionsData:"alt",captionDelay:250});let g=1,u="",h=0;function s(e,r){r?e.classList.remove("disabled"):e.classList.add("disabled")}function y(e){if(e.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const r=e.hits.map(S).join("");m.insertAdjacentHTML("beforeend",r),g+=1,s(i,!0),E.refresh(),m.childElementCount>=h?(s(i,!1),c.warning({message:"No more results",position:"topRight"})):s(i,!0)}async function q(e){if(e.preventDefault(),u=e.target.search.value.trim(),u===""){c.warning({message:"Complete the field correctly",position:"topRight"});return}g=1,m.innerHTML="",s(f,!0),s(i,!1);try{const r=await p(u,g);h=r.totalHits,y(r)}catch(r){c.error({message:"An error occurred while fetching data. Please try again.",position:"topRight"}),console.error("Error fetching data:",r)}finally{s(f,!1),d.reset()}}async function $(){s(f,!0),s(i,!1);try{const e=await p(u,g);y(e)}catch(e){c.error({message:"An error occurred while fetching data. Please try again.",position:"topRight"}),console.error("Error fetching data:",e)}finally{s(f,!1)}}d.addEventListener("submit",q);i.addEventListener("click",$);
//# sourceMappingURL=commonHelpers.js.map
