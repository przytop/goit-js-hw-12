import{a as b,S as w,i as c}from"./assets/vendor-c493984e.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function l(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(t){if(t.ep)return;t.ep=!0;const o=l(t);fetch(t.href,o)}})();const L="45020443-554fa7ec416e1f918b290a17c",S="https://pixabay.com/api/";async function m(e,r=1){const l={params:{key:L,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:40}};try{return(await b.get(S,l)).data}catch(s){throw console.error("Error fetching data from Pixabay:",s),s}}function P({webformatURL:e,largeImageURL:r,tags:l,likes:s,views:t,comments:o,downloads:n}){return`
      <li class="gallery-item">
        <a class="gallery-link" href="${r}">
          <img class="gallery-image" src="${e}" alt="${l}">
        </a>
        <ul class="image-info">
          <li>
            <h3 class="image-title">Likes</h3>
            <p class="image-stats">${s}</p>
          </li>
          <li>
            <h3 class="image-title">Views</h3>
            <p class="image-stats">${t}</p>
          </li>
          <li>
            <h3 class="image-title">Comments</h3>
            <p class="image-stats">${o}</p>
          </li>
          <li>
            <h3 class="image-title">Downloads</h3>
            <p class="image-stats">${n}</p>
          </li>
        </ul>
      </li>`}const d=document.querySelector(".form"),f=document.querySelector(".loader"),h=document.querySelector(".gallery"),i=document.querySelector("button[name='more']"),q=new w(".gallery a",{captionsData:"alt",captionDelay:250});let g=1,u="",p=0;function a(e,r){r?e.classList.remove("disabled"):e.classList.add("disabled")}function y(e){if(e.hits.length===0){c.warning({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}const r=e.hits.map(P).join("");h.insertAdjacentHTML("beforeend",r),g+=1,a(i,!0),q.refresh(),h.childElementCount>=p?(a(i,!1),c.info({message:"We're sorry, but you've reached the end of search results.",position:"topRight"})):a(i,!0)}async function v(e){if(e.preventDefault(),u=e.target.search.value.trim(),u===""){c.error({message:"Complete the field correctly",position:"topRight"});return}g=1,h.innerHTML="",a(f,!0),a(i,!1);try{const r=await m(u,g);p=r.totalHits,y(r)}catch(r){c.error({message:"An error occurred while fetching data. Please try again.",position:"topRight"}),console.error("Error fetching data:",r)}finally{a(f,!1),d.reset()}}async function E(){a(f,!0),a(i,!1);try{const e=await m(u,g);y(e)}catch(e){c.error({message:"An error occurred while fetching data. Please try again.",position:"topRight"}),console.error("Error fetching data:",e)}finally{let e=document.querySelector(".gallery-item").getBoundingClientRect();window.scrollBy({top:e.height*2,behavior:"smooth"}),a(f,!1)}}d.addEventListener("submit",v);i.addEventListener("click",E);
//# sourceMappingURL=commonHelpers.js.map
