import{a as p,S as y,i as _}from"./assets/vendor-Cgc9PhsO.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function o(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=o(e);fetch(e.href,s)}})();const b="45020443-554fa7ec416e1f918b290a17c",w="https://pixabay.com/api/";async function u(r,t=1){const o={params:{key:b,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:20}};try{return(await p.get(w,o)).data}catch(a){throw console.error("Error fetching data from Pixabay:",a),new Error("Unable to fetch data from Pixabay at this time. Please try again later.")}}function L({webformatURL:r="",largeImageURL:t="",tags:o="",likes:a=0,views:e=0,comments:s=0,downloads:i=0}){const g=o.split(",").slice(0,5).join(", ");return`
      <li class="gallery__item">
        <a class="gallery__link" href="${t}">
          <img class="gallery__image" src="${r}" alt="${g}">
        </a>
        <ul class="image__info">
          <li>
            <h3 class="image__title">Likes</h3>
            <p class="image__stats">${a}</p>
          </li>
          <li>
            <h3 class="image__title">Views</h3>
            <p class="image__stats">${e}</p>
          </li>
          <li>
            <h3 class="image__title">Comments</h3>
            <p class="image__stats">${s}</p>
          </li>
          <li>
            <h3 class="image__title">Downloads</h3>
            <p class="image__stats">${i}</p>
          </li>
        </ul>
      </li>`}let l=1,d="",h=0;const c=(r,t)=>{_[r]({message:t,position:"bottomCenter"})},n=(r,t,o)=>{o?r.classList.remove(t):r.classList.add(t)},m=(r,t,o)=>{n(o,"loader--hidden",!1),r.childElementCount>=h?(n(t,"load-more--hidden",!1),l>1&&c("info","We're sorry, but you've reached the end of search results.")):n(t,"load-more--hidden",!0)},f=(r,t,o)=>{if(r.hits.length===0){c("warning","Sorry, there are no images matching your search query. Please try again!");return}const a=r.hits.map(L).join("");t.insertAdjacentHTML("beforeend",a),l+=1,o.refresh()},v=async(r,t,o,a,e,s)=>{if(r.preventDefault(),d=r.target.search.value.trim(),!d){c("error","Complete the field correctly");return}l=1,t.innerHTML="",n(o,"load-more--hidden",!1),n(a,"loader--hidden",!0);try{const i=await u(d,l);h=i.totalHits,f(i,t,s)}catch(i){c("error","An error occurred while fetching data. Please try again."),console.error("Error fetching data:",i)}finally{m(t,o,a),e.reset()}},P=async(r,t,o,a)=>{n(t,"load-more--hidden",!1),n(o,"loader--hidden",!0);try{const e=await u(d,l);f(e,r,a)}catch(e){c("error","An error occurred while fetching data. Please try again."),console.error("Error fetching data:",e)}finally{m(r,t,o);const e=document.querySelector(".gallery__item");e&&window.scrollBy({top:e.getBoundingClientRect().height*2,behavior:"smooth"})}},S=()=>{document.addEventListener("DOMContentLoaded",()=>{const r=document.querySelector(".search__form"),t=document.querySelector(".gallery__list"),o=document.querySelector(".loader"),a=document.querySelector(".load-more"),e=document.querySelector(".load-more__button"),s=new y(".gallery a",{captionsData:"alt",captionDelay:500,overlayOpacity:.8,spinner:!0});r.addEventListener("submit",i=>v(i,t,a,o,r,s)),e.addEventListener("click",()=>P(t,a,o,s))})};S();
//# sourceMappingURL=commonHelpers.js.map
