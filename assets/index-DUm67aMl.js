(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function n(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(r){if(r.ep)return;r.ep=!0;const s=n(r);fetch(r.href,s)}})();async function p(e){try{const t=new URL("http://localhost:8080/get-questions/");t.searchParams.append("name",e);const n=await fetch(t,{method:"GET",headers:{Accept:"*/*"}});if(!n.ok)throw n.status===0?new Error("Network error: Please check if the server is running and CORS is enabled"):new Error(`Server responded with status: ${n.status}`);const o=await n.json();return Array.isArray(o)?o:[]}catch(t){throw t instanceof TypeError&&t.message==="Failed to fetch"?new Error("Unable to connect to the server. Please check if it's running and CORS is enabled."):(console.error("Error fetching questions:",t),t)}}function h(e,t){if(!t.length){f(e);return}const n=document.createElement("ul");n.className="question-list",t.forEach((o,r)=>{const s=m(o,r);n.appendChild(s)}),e.innerHTML="",e.appendChild(n)}function m(e,t){const n=document.createElement("li");n.className="question-item",n.style.animationDelay=`${t*.05}s`,n.innerHTML=`
      <p class="question-text">${e}</p>
      <div class="question-meta">
        <button class="copy-button" data-question="${e}">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 12.9V17.1C16 20.6 14.6 22 11.1 22H6.9C3.4 22 2 20.6 2 17.1V12.9C2 9.4 3.4 8 6.9 8H11.1C14.6 8 16 9.4 16 12.9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 6.9V11.1C22 14.6 20.6 16 17.1 16H16V12.9C16 9.4 14.6 8 11.1 8H8V6.9C8 3.4 9.4 2 12.9 2H17.1C20.6 2 22 3.4 22 6.9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Copy
        </button>
      </div>
    `;const o=n.querySelector(".copy-button");return o.addEventListener("click",r=>{r.stopPropagation();const s=o.dataset.question;s&&(y(s),v(o))}),n}function f(e){e.innerHTML=`
      <div class="empty-state">
        <h3 class="empty-state-title">No questions yet</h3>
        <p class="empty-state-message">
          Questions asked through the Code Explainer extension will appear here.
          Start using the extension to see your question history.
        </p>
      </div>
    `}function y(e){navigator.clipboard.writeText(e).catch(t=>{console.error("Failed to copy text:",t)})}function v(e){const t=e.innerHTML;e.innerHTML=`
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 12L10 17L20 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      Copied!
    `,e.style.color="var(--color-success-500)",setTimeout(()=>{e.innerHTML=t,e.style.color=""},2e3)}const a="code_explainer_user_name";function g(e){localStorage.setItem(a,e)}function w(){return localStorage.getItem(a)}function C(){const e=document.getElementById("app");if(!e)return;e.innerHTML=`
    <header>
      <div class="container header-content">
        <div class="logo">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.75 20.25C14.58 20.25 18.5 16.33 18.5 11.5C18.5 6.67 14.58 2.75 9.75 2.75C4.92 2.75 1 6.67 1 11.5C1 16.33 4.92 20.25 9.75 20.25Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12.5 7.5C11.54 6.54 10.25 6 8.86 6C7.47 6 6.18 6.54 5.22 7.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M23 21L18 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Code Explainer
        </div>
        <div class="controls">
          <div class="search-container">
            <input type="text" class="search-input" placeholder="Search questions..." id="search-input">
          </div>
          <div class="user-name" id="user-name-display">Guest</div>
                  <button id="logout">Log Out</button>
        </div>
      </div>
    </header>
    
    <main>
      <div class="container">
        <div id="user-input-container" class="user-input-container">
          <h2 class="user-input-title">Enter your name to see your questions</h2>
          <form class="user-input-form" id="user-input-form">
            <input type="text" class="user-input" id="user-input" placeholder="Your name">
            <button type="submit" class="submit-button">Submit</button>
          </form>
        </div>
        
        <div id="questions-container" class="questions-container" style="display: none;">
          <div class="questions-header">
            <h2 class="questions-title">Your Question History</h2>
            <span class="questions-count" id="questions-count">0 questions</span>
          </div>
          
          <div id="questions-content"></div>
        </div>
      </div>
    </main>
    
    <footer>
      <div class="container footer-content">
        <div class="copyright">© ${new Date().getFullYear()} Code Explainer - All rights reserved</div>
        <div class="footer-links">
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms of Service</a>
          <a href="#" class="footer-link">Support</a>
        </div>
      </div>
    </footer>
  `,q();const t=w();t&&(c(),u(t),l(t)),E()}function q(){const e=document.getElementById("user-input-form"),t=document.getElementById("user-input");!e||!t||e.addEventListener("submit",n=>{n.preventDefault();const o=t.value.trim();o&&(g(o),c(),u(o),l(o))})}function c(){const e=document.getElementById("user-input-container");e&&(e.style.display="none")}function u(e){const t=document.getElementById("questions-container"),n=document.getElementById("questions-content");!t||!n||(t.style.display="block",n.innerHTML='<div class="loading"><div class="loading-spinner"></div></div>',p(e).then(o=>{h(n,o),d(o.length)}).catch(o=>{n.innerHTML=`
        <div class="error">
          <p>Sorry, we couldn't load your questions. Please try again later.</p>
          <p>${o.message}</p>
        </div>
      `}))}function l(e){const t=document.getElementById("user-name-display");t&&(t.textContent=e)}function d(e){const t=document.getElementById("questions-count");t&&(t.textContent=`${e} question${e!==1?"s":""}`)}function E(){const e=document.getElementById("search-input");e&&e.addEventListener("input",t=>{const n=t.target.value.toLowerCase(),o=document.querySelectorAll(".question-item");o.forEach(s=>{(s.querySelector(".question-text")?.textContent?.toLowerCase()||"").includes(n)?s.style.display="block":s.style.display="none"});const r=Array.from(o).filter(s=>s.style.display!=="none").length;d(r)})}document.addEventListener("DOMContentLoaded",()=>{C()});
//# sourceMappingURL=index-DUm67aMl.js.map
