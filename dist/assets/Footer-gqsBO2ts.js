import{r as d,j as e}from"./radix-D4tmaoiR.js";import{m as f}from"./index-BNCrv9Cb.js";import"./react-D3F3s8fL.js";import"./motion-4O9EsY6r.js";import"./vendor-CazOkfzf.js";function j({onContactClick:p,onPrivacyClick:i,onTermsClick:t}){const[s,a]=d.useState(!1),[n,l]=d.useState(""),r=(o,h)=>{o.preventDefault();const c=document.getElementById(h);c&&c.scrollIntoView({behavior:"smooth"})},x=o=>{o.preventDefault(),n.trim()&&(a(!0),l(""),setTimeout(()=>a(!1),3e3))};return e.jsxs("section",{className:"footer-section",children:[e.jsx("style",{children:`
        .footer-section {
          background: #0B0D0F;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding: 80px 24px 40px;
          position: relative;
          overflow: hidden;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-container {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 64px;
          width: 100%;
          box-sizing: border-box;
        }

        /* Top Grid: Brand Identity & Subscribe Block */
        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 48px;
          align-items: flex-start;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-brand-info {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo-mark {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .footer-logo-name {
          font-family: 'DM Sans', sans-serif;
          font-size: 22px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.02em;
        }

        .footer-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 16px;
          color: #9ca3af;
          line-height: 1.6;
          max-width: 380px;
        }

        .footer-social-icons {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .social-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          cursor: pointer;
          color: #9ca3af;
        }

        .social-icon svg {
          width: 15px;
          height: 15px;
          fill: currentColor;
        }

        .social-icon:hover {
          background: #5B3CFF;
          border-color: #5B3CFF;
          transform: translateY(-2px);
          color: white;
        }

        .footer-subscribe-section {
          background: rgba(255, 255, 255, 0.01);
          border: 1px solid rgba(255, 255, 255, 0.03);
          border-radius: 20px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          gap: 20px;
          box-sizing: border-box;
          width: 100%;
        }

        .footer-subscribe-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 20px;
          font-weight: 700;
          color: #E6EEF3;
          letter-spacing: -0.01em;
        }

        .footer-subscribe-desc {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #9ca3af;
          line-height: 1.5;
        }

        .footer-subscribe-form {
          display: flex;
          gap: 12px;
          width: 100%;
          position: relative;
        }

        .footer-subscribe-input {
          flex: 1;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px 16px;
          color: #E6EEF3;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
        }

        .footer-subscribe-input:focus {
          border-color: #5B3CFF;
        }

        .footer-subscribe-btn {
          background: #E6EEF3;
          color: #0B0D0F;
          border: none;
          border-radius: 10px;
          padding: 12px 24px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }

        .footer-subscribe-btn:hover {
          background: white;
          transform: translateY(-1px);
        }

        /* Middle Grid: Dynamic Navigation Columns */
        .footer-nav-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 48px;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-nav-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-col-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 700;
          color: #E6EEF3;
          text-transform: uppercase;
          letter-spacing: 0.15em;
        }

        .footer-col-links {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-col-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #9ca3af;
          text-decoration: none;
          transition: color 0.2s, transform 0.2s;
          display: inline-block;
        }

        .footer-col-links a:hover {
          color: #67E8F9;
          transform: translateX(3px);
        }

        /* Bottom Row: copyright and sublinks */
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(255, 255, 255, 0.03);
          padding-top: 32px;
          flex-wrap: wrap;
          gap: 20px;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-copyright {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #7c8a96;
        }

        .footer-bottom-links {
          display: flex;
          gap: 24px;
        }

        .footer-bottom-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #7c8a96;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-bottom-links a:hover {
          color: #67E8F9;
        }

        /* Fluid Typography Wordmark */
        .footer-wordmark-container {
          width: 100%;
          text-align: center;
          margin-top: 40px;
          pointer-events: none;
          user-select: none;
        }

        .footer-wordmark {
          font-family: 'DM Sans', sans-serif;
          font-weight: 900;
          font-size: clamp(2.5rem, 12vw, 8.5rem);
          color: rgba(255, 255, 255, 0.01);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          line-height: 1;
        }

        @media (max-width: 991px) {
          .footer-top-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .footer-nav-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 560px) {
          .footer-section {
            padding: 60px 16px 32px;
          }
          .footer-subscribe-section {
            padding: 24px 20px;
          }
          .footer-subscribe-form {
            flex-direction: column;
            gap: 8px;
          }
          .footer-subscribe-btn {
            width: 100%;
            text-align: center;
          }
          .footer-nav-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .footer-bottom {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 16px;
          }
        }
      `}),e.jsxs("div",{className:"footer-container",children:[e.jsxs("div",{className:"footer-top-grid",children:[e.jsxs(f.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px"},transition:{duration:.6},className:"footer-brand-info",children:[e.jsxs("div",{className:"footer-logo",children:[e.jsx("div",{className:"footer-logo-mark",children:e.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 32 32",fill:"none",children:[e.jsx("rect",{x:"2",y:"2",width:"28",height:"28",stroke:"currentColor",strokeWidth:"2.5",rx:"6"}),e.jsx("path",{d:"M10 8 L10 24 M10 8 L17 8 C19 8 19 12 17 12 L10 12 M10 12 L18 12 C20 12 20 16 20 17.5 C20 20 18 24 16 24 L10 24",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"})]})}),e.jsx("span",{className:"footer-logo-name",children:"BoldFrame"})]}),e.jsx("p",{className:"footer-tagline",children:"Crafting premium digital platforms with pure code and modern aesthetic values."}),e.jsxs("div",{className:"footer-social-icons",children:[e.jsx("a",{href:"https://discord.gg/",target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":"Discord",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19.27 4.73a16.14 16.14 0 00-3.97-1.23.08.08 0 00-.08.04c-.17.3-.37.72-.51 1.05a14.9 14.9 0 00-5.42 0c-.14-.33-.35-.75-.52-1.05a.08.08 0 00-.08-.04 16.14 16.14 0 00-3.97 1.23.08.08 0 00-.03.03C1.04 12.52.27 20.08 1.6 27.52a.08.08 0 00.03.05 16.32 16.32 0 004.93 2.5.08.08 0 00.09-.03c.4-.55.77-1.14 1.09-1.75a.08.08 0 00-.04-.11 10.66 10.66 0 01-1.55-.74.08.08 0 01-.01-.13c.1-.08.2-.16.3-.24a.08.08 0 01.08-.01c3.27 1.5 6.8 1.5 10.04 0a.08.08 0 01.09.01c.1.08.2.16.3.24a.08.08 0 01-.01.13c-.48.28-.99.53-1.55.74a.08.08 0 00-.04.11c.32.61.69 1.2 1.09 1.75a.08.08 0 00.09.03 16.32 16.32 0 004.93-2.5.08.08 0 00.03-.05c1.47-8.52.5-16.03-3.07-22.76a.08.08 0 00-.03-.03zM8.52 19c-.99 0-1.81-.91-1.81-2.04s.8-2.04 1.81-2.04 1.81.91 1.81 2.04S9.52 19 8.52 19zm6.96 0c-.99 0-1.81-.91-1.81-2.04s.8-2.04 1.81-2.04 1.81.91 1.81 2.04S16.48 19 15.48 19z"})})}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":"Twitter",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}),e.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":"LinkedIn",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"})})}),e.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":"GitHub",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})})]})]}),e.jsxs(f.div,{initial:{opacity:0,y:30},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px"},transition:{duration:.6,delay:.15},className:"footer-subscribe-section",children:[e.jsx("h3",{className:"footer-subscribe-title",children:"Subscribe to our newsletter"}),e.jsx("p",{className:"footer-subscribe-desc",children:"Get the latest updates, workflow digests, and creative web inspirations sent straight to your inbox."}),e.jsxs("form",{onSubmit:x,className:"footer-subscribe-form",children:[e.jsx("input",{type:"email",required:!0,className:"footer-subscribe-input",placeholder:s?"Subscribed successfully!":"Enter email address",value:n,onChange:o=>l(o.target.value),disabled:s}),e.jsx("button",{type:"submit",disabled:s,className:"footer-subscribe-btn",children:s?"Thanks!":"Subscribe"})]})]})]}),e.jsxs("div",{className:"footer-nav-grid",children:[e.jsxs("div",{className:"footer-nav-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Navigation"}),e.jsxs("div",{className:"footer-col-links",children:[e.jsx("a",{href:"#services",onClick:o=>r(o,"services"),children:"Services"}),e.jsx("a",{href:"#work",onClick:o=>r(o,"work"),children:"Work"}),e.jsx("a",{href:"#playroom",onClick:o=>r(o,"playroom"),children:"Playroom"}),e.jsx("a",{href:"#testimonials",onClick:o=>r(o,"testimonials"),children:"Testimonials"}),e.jsx("a",{href:"#about",onClick:o=>r(o,"about"),children:"About Us"})]})]}),e.jsxs("div",{className:"footer-nav-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Company"}),e.jsxs("div",{className:"footer-col-links",children:[e.jsx("a",{href:"#contact",onClick:o=>{o.preventDefault(),p()},children:"Contact"}),t&&e.jsx("a",{href:"#terms",onClick:o=>{o.preventDefault(),t()},children:"Terms of Service"}),i&&e.jsx("a",{href:"#privacy",onClick:o=>{o.preventDefault(),i()},children:"Privacy Policy"})]})]}),e.jsxs("div",{className:"footer-nav-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Connect"}),e.jsxs("div",{className:"footer-col-links",children:[e.jsx("a",{href:"https://discord.gg/",target:"_blank",rel:"noopener noreferrer",children:"Discord Server"}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noopener noreferrer",children:"Twitter/X"}),e.jsx("a",{href:"https://linkedin.com",target:"_blank",rel:"noopener noreferrer",children:"LinkedIn"}),e.jsx("a",{href:"https://github.com",target:"_blank",rel:"noopener noreferrer",children:"GitHub"})]})]}),e.jsxs("div",{className:"footer-nav-col",children:[e.jsx("h4",{className:"footer-col-title",children:"Resources"}),e.jsxs("div",{className:"footer-col-links",children:[e.jsx("a",{href:"#work",onClick:o=>r(o,"work"),children:"Case Studies"}),e.jsx("a",{href:"#services",onClick:o=>r(o,"services"),children:"Our Stack"}),e.jsx("a",{href:"#about",onClick:o=>r(o,"about"),children:"Process"})]})]})]}),e.jsxs("div",{className:"footer-bottom",children:[e.jsxs("span",{className:"footer-copyright",children:["© ",new Date().getFullYear()," BoldFrame Studios. All rights reserved."]}),e.jsxs("div",{className:"footer-bottom-links",children:[i&&e.jsx("a",{href:"#privacy",onClick:o=>{o.preventDefault(),i()},children:"Privacy"}),t&&e.jsx("a",{href:"#terms",onClick:o=>{o.preventDefault(),t()},children:"Terms"}),e.jsx("a",{href:"#hero",onClick:o=>r(o,"hero"),children:"Back to top ↑"})]})]}),e.jsx("div",{className:"footer-wordmark-container",children:e.jsx("div",{className:"footer-wordmark",children:"BoldFrame"})})]})]})}export{j as Footer,j as default};
