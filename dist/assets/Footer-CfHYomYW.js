import{r as a,j as e}from"./radix-D4tmaoiR.js";import{m as l}from"./index-BTMvZCAa.js";import"./react-D3F3s8fL.js";import"./motion-4O9EsY6r.js";import"./vendor-CazOkfzf.js";function z({onContactClick:c,onPrivacyClick:d,onTermsClick:x}){const p=a.useRef(null),f=a.useRef(null),[s,h]=a.useState(!1),[m,g]=a.useState("");a.useLayoutEffect(()=>{function t(){const i=f.current,u=p.current;if(!(!i||!u))try{const r=u.getBBox();i.setAttribute("viewBox",`${r.x} ${r.y} ${r.width} ${r.height}`)}catch{}}document.fonts&&document.fonts.ready?document.fonts.ready.then(t):window.addEventListener("load",t),window.addEventListener("resize",t),t();const n=setTimeout(t,100);return()=>{window.removeEventListener("load",t),window.removeEventListener("resize",t),clearTimeout(n)}},[]);const o=(t,n)=>{t.preventDefault();const i=document.getElementById(n);i&&i.scrollIntoView({behavior:"smooth"})},w=t=>{t.preventDefault(),m.trim()&&(h(!0),g(""),setTimeout(()=>h(!1),3e3))};return e.jsxs("section",{className:"footer-section",children:[e.jsx("style",{children:`
        .footer-section {
          background: #0B0D0F;
          padding: 80px 24px 48px;
          position: relative;
          overflow: hidden;
          z-index: 1;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-wrapper {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 24px;
          align-items: stretch;
          position: relative;
          z-index: 2;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-left {
          position: relative;
          min-height: 380px;
          border-radius: 28px;
          padding: 32px;
          overflow: hidden;
          box-shadow: 0 12px 40px rgba(91, 60, 255, 0.12);
          background: #1e4fc0;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-left-video {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 0;
          pointer-events: none;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          position: relative;
          z-index: 1;
        }

        .footer-logo-mark {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.15);
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

        .footer-tagline-container {
          margin-top: auto;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }

        .footer-tagline {
          font-family: 'DM Sans', sans-serif;
          font-size: 19px;
          font-weight: 400;
          color: white;
          line-height: 1.45;
        }

        .footer-tagline span {
          color: rgba(255, 255, 255, 0.65);
        }

        .footer-social-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          flex-wrap: wrap; /* Allows wrapping on narrow screens */
        }

        .footer-social-label {
          font-family: 'Caveat', cursive;
          font-size: 19px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          letter-spacing: 0.3px;
        }

        .footer-social-icons {
          display: flex;
          gap: 8px;
        }

        .social-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #0e1014;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35), 0 2px 6px rgba(0, 0, 0, 0.2);
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          cursor: pointer;
        }

        .social-icon svg {
          width: 16px;
          height: 16px;
          fill: white;
        }

        .social-icon:hover {
          background: #000;
          transform: translateY(-2px);
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.45), 0 4px 10px rgba(0, 0, 0, 0.25);
        }

        .footer-right {
          background: #131619;
          border: 1px solid rgba(124, 138, 150, 0.12);
          border-radius: 28px;
          padding: 40px;
          overflow: visible;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          width: 100%;
          box-sizing: border-box;
        }

        .footer-lucky-graphic {
          position: absolute;
          top: -36px;
          right: 40px;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 6px;
          cursor: pointer;
        }

        .lucky-cube {
          width: 96px;
          height: 96px;
          border-radius: 22px;
          transform: rotate(-10deg);
          background: linear-gradient(135deg, #5b9ffb 0%, #5B3CFF 55%, #67E8F9 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: inset 3px 3px 8px rgba(255, 255, 255, 0.35),
                      inset -3px -3px 12px rgba(0, 0, 0, 0.18),
                      8px 14px 28px rgba(91, 60, 255, 0.35);
          transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .lucky-cube-mark {
          font-family: 'DM Sans', sans-serif;
          font-size: 42px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.04em;
          transform: rotate(10deg);
          text-shadow: 0 3px 6px rgba(0, 0, 0, 0.25);
          line-height: 1;
        }

        .footer-lucky-graphic:hover .lucky-cube {
          transform: scale(1.08) rotate(-5deg);
        }

        .lucky-text-row {
          display: flex;
          gap: 6px;
          align-items: center;
          transform: rotate(-4deg);
          margin-top: 4px;
        }

        .lucky-arrow {
          width: 22px;
          height: 22px;
          color: #9ca3af;
        }

        .lucky-arrow path {
          stroke: currentColor;
          fill: none;
          stroke-width: 2;
          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .lucky-text {
          font-family: 'Caveat', cursive;
          font-size: 20px;
          font-weight: 600;
          color: #9ca3af;
          white-space: nowrap;
        }

        .footer-right-top {
          display: flex;
          gap: 48px;
          flex-wrap: wrap;
          padding-top: 8px;
        }

        .footer-col {
          min-width: 140px;
        }

        .footer-col-title {
          font-family: 'Caveat', cursive;
          font-size: 26px;
          font-weight: 600;
          color: #9ca3af;
          margin-bottom: 18px;
        }

        .footer-col-links {
          display: flex;
          flex-direction: column;
        }

        .footer-col-links a {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #E6EEF3;
          margin-bottom: 14px;
          text-decoration: none;
          transition: color 0.2s, transform 0.2s;
        }

        .footer-col-links a:hover {
          color: #67E8F9;
          transform: translateX(4px);
        }

        .footer-bottom {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 24px;
          margin-top: 48px;
        }

        .footer-copyright {
          font-family: 'DM Sans', sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          color: #9ca3af;
          min-width: 220px;
        }

        .footer-cta-mini {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex: 1;
          min-width: 280px;
          align-items: flex-end;
        }

        .footer-cta-mini h4 {
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #9ca3af;
          line-height: 1.45;
          text-align: right;
          width: 100%;
        }

        .footer-cta-mini h4 strong {
          display: block;
          font-size: 19px;
          font-weight: 700;
          color: #E6EEF3;
          margin-top: 4px;
        }

        .footer-subscribe-row {
          display: flex;
          width: 100%;
          max-width: 320px;
          background: #0B0D0F;
          border: 1px solid rgba(124, 138, 150, 0.15);
          border-radius: 12px;
          padding: 5px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          transition: border-color 0.2s;
        }

        .footer-subscribe-row:focus-within {
          border-color: #5B3CFF;
        }

        .footer-subscribe-row input {
          flex: 1;
          padding: 11px 14px;
          background: transparent;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          color: #E6EEF3;
          outline: none;
          min-width: 0;
        }

        .footer-subscribe-row input::placeholder {
          color: #9ca3af;
        }

        .footer-subscribe-row button {
          padding: 11px 22px;
          background: #E6EEF3;
          color: #0B0D0F;
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          border: none;
          border-radius: 8px;
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.05), 0 2px 8px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          transition: background 0.2s, box-shadow 0.2s, transform 0.15s;
          white-space: nowrap;
        }

        .footer-subscribe-row button:hover {
          background: white;
          transform: translateY(-1px);
        }

        .footer-watermark {
          max-width: 1000px;
          margin: -60px auto 0;
          pointer-events: none;
          user-select: none;
          position: relative;
          z-index: 0;
          line-height: 0;
          width: 100%;
          overflow: hidden;
        }

        .footer-watermark svg {
          display: block;
          width: 100%;
          height: auto;
          overflow: hidden;
        }

        .footer-watermark text {
          font-family: 'DM Sans', sans-serif;
          font-weight: 700;
          letter-spacing: -0.03em;
          fill: rgba(255, 255, 255, 0.015);
        }

        @media (max-width: 991px) {
          .footer-wrapper {
            grid-template-columns: 1fr;
          }
          .footer-left {
            min-height: 340px;
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column-reverse;
            align-items: flex-start;
            gap: 28px;
          }
          .footer-copyright {
            min-width: unset;
            width: 100%;
            text-align: left;
          }
          .footer-cta-mini {
            align-items: flex-start;
            width: 100%;
            min-width: unset;
          }
          .footer-cta-mini h4 {
            text-align: left;
          }
          .footer-subscribe-row {
            max-width: 100%;
          }
        }

        @media (max-width: 560px) {
          .footer-section {
            padding: 60px 16px 32px;
          }
          .footer-left {
            padding: 32px 24px;
            align-items: flex-start;
            text-align: left;
          }
          .footer-logo {
            justify-content: flex-start;
          }
          .footer-tagline-container {
            text-align: left;
            width: 100%;
          }
          .footer-social-row {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            gap: 16px;
            width: 100%;
          }
          .footer-social-label {
            text-align: left;
          }
          .footer-right {
            padding: 56px 24px 28px;
            align-items: flex-start;
            text-align: left;
          }
          .footer-right-top {
            justify-content: flex-start;
            text-align: left;
            gap: 32px;
            width: 100%;
          }
          .footer-col {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
          }
          .footer-col-links a:hover {
            transform: translateX(4px);
          }
          .footer-bottom {
            flex-direction: column-reverse;
            align-items: flex-start;
            text-align: left;
            width: 100%;
          }
          .footer-copyright {
            text-align: left;
          }
          .footer-cta-mini {
            align-items: flex-start;
            width: 100%;
            text-align: left;
          }
          .footer-cta-mini h4 {
            text-align: left;
          }
          .footer-subscribe-row {
            margin: 0;
            max-width: 100%;
          }
          .footer-lucky-graphic {
            right: 24px;
            transform: none;
            top: -32px;
          }
          .lucky-cube {
            width: 72px;
            height: 72px;
            border-radius: 16px;
          }
          .lucky-cube-mark {
            font-size: 32px;
          }
          .lucky-text-row {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .footer-social-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
        }
      `}),e.jsxs("div",{className:"footer-wrapper",children:[e.jsxs(l.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px"},transition:{duration:.6,ease:"easeOut"},className:"footer-left",children:[e.jsx("video",{className:"footer-left-video",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:"auto",children:e.jsx("source",{src:"https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4",type:"video/mp4"})}),e.jsxs("div",{className:"footer-logo",children:[e.jsx("div",{className:"footer-logo-mark",children:e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 32 32",fill:"none",className:"w-5 h-5",children:[e.jsx("rect",{x:"2",y:"2",width:"28",height:"28",stroke:"currentColor",strokeWidth:"2",rx:"6"}),e.jsx("path",{d:"M10 8 L10 24 M10 8 L17 8 C19 8 19 12 17 12 L10 12 M10 12 L18 12 C20 12 20 16 20 17.5 C20 20 18 24 16 24 L10 24",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"})]})}),e.jsx("span",{className:"footer-logo-name",children:"BoldFrame"})]}),e.jsx("div",{className:"footer-tagline-container",children:e.jsxs("p",{className:"footer-tagline",children:["Smarter web design,",e.jsx("br",{}),e.jsx("span",{children:"powered by code."})]})}),e.jsxs("div",{className:"footer-social-row",children:[e.jsx("span",{className:"footer-social-label",children:"Stay in touch!"}),e.jsxs("div",{className:"footer-social-icons",children:[e.jsx("a",{href:"https://discord.gg/",target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":"Discord",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19.27 4.73a16.14 16.14 0 00-3.97-1.23.08.08 0 00-.08.04c-.17.3-.37.72-.51 1.05a14.9 14.9 0 00-5.42 0c-.14-.33-.35-.75-.52-1.05a.08.08 0 00-.08-.04 16.14 16.14 0 00-3.97 1.23.08.08 0 00-.03.03C1.04 12.52.27 20.08 1.6 27.52a.08.08 0 00.03.05 16.32 16.32 0 004.93 2.5.08.08 0 00.09-.03c.4-.55.77-1.14 1.09-1.75a.08.08 0 00-.04-.11 10.66 10.66 0 01-1.55-.74.08.08 0 01-.01-.13c.1-.08.2-.16.3-.24a.08.08 0 01.08-.01c3.27 1.5 6.8 1.5 10.04 0a.08.08 0 01.09.01c.1.08.2.16.3.24a.08.08 0 01-.01.13c-.48.28-.99.53-1.55.74a.08.08 0 00-.04.11c.32.61.69 1.2 1.09 1.75a.08.08 0 00.09.03 16.32 16.32 0 004.93-2.5.08.08 0 00.03-.05c1.47-8.52.5-16.03-3.07-22.76a.08.08 0 00-.03-.03zM8.52 19c-.99 0-1.81-.91-1.81-2.04s.8-2.04 1.81-2.04 1.81.91 1.81 2.04S9.52 19 8.52 19zm6.96 0c-.99 0-1.81-.91-1.81-2.04s.8-2.04 1.81-2.04 1.81.91 1.81 2.04S16.48 19 15.48 19z"})})}),e.jsx("a",{href:"https://twitter.com",target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":"Twitter/X",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"})})}),e.jsx("a",{href:"https://www.linkedin.com/in/nikhilsingh14788",target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":"LinkedIn",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"})})}),e.jsx("a",{href:"https://github.com/Nikhilsingh478",target:"_blank",rel:"noopener noreferrer",className:"social-icon","aria-label":"GitHub",children:e.jsx("svg",{viewBox:"0 0 24 24",children:e.jsx("path",{d:"M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"})})})]})]})]}),e.jsxs(l.div,{initial:{opacity:0,y:40},whileInView:{opacity:1,y:0},viewport:{once:!0,margin:"-50px"},transition:{duration:.6,ease:"easeOut",delay:.15},className:"footer-right",children:[e.jsxs("div",{className:"footer-lucky-graphic",onClick:c,children:[e.jsx("div",{className:"lucky-cube",children:e.jsx("span",{className:"lucky-cube-mark",children:"B"})}),e.jsxs("div",{className:"lucky-text-row",children:[e.jsx("div",{className:"lucky-arrow",children:e.jsxs("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M3 20 C 6 14, 10 9, 18 5"}),e.jsx("path",{d:"M18 5 L 12 5"}),e.jsx("path",{d:"M18 5 L 18 11"})]})}),e.jsx("span",{className:"lucky-text",children:"Feeling lucky?"})]})]}),e.jsxs("div",{className:"footer-right-top",children:[e.jsxs("div",{className:"footer-col",children:[e.jsx("h3",{className:"footer-col-title",children:"Navigation"}),e.jsxs("div",{className:"footer-col-links",children:[e.jsx("a",{href:"#services",onClick:t=>o(t,"services"),children:"Services"}),e.jsx("a",{href:"#work",onClick:t=>o(t,"work"),children:"Work"}),e.jsx("a",{href:"#playroom",onClick:t=>o(t,"playroom"),children:"Playroom"}),e.jsx("a",{href:"#testimonials",onClick:t=>o(t,"testimonials"),children:"Testimonials"}),e.jsx("a",{href:"#about",onClick:t=>o(t,"about"),children:"About Us"})]})]}),e.jsxs("div",{className:"footer-col",children:[e.jsx("h3",{className:"footer-col-title",children:"Company"}),e.jsxs("div",{className:"footer-col-links",children:[e.jsx("a",{href:"#contact",onClick:t=>{t.preventDefault(),c()},children:"Contact"}),x&&e.jsx("a",{href:"#terms",onClick:t=>{t.preventDefault(),x()},children:"Terms of Service"}),d&&e.jsx("a",{href:"#privacy",onClick:t=>{t.preventDefault(),d()},children:"Privacy Policy"})]})]})]}),e.jsxs("div",{className:"footer-bottom",children:[e.jsxs("span",{className:"footer-copyright",children:["© ",new Date().getFullYear()," BoldFrame Studios. All rights reserved."]}),e.jsxs("div",{className:"footer-cta-mini",children:[e.jsxs("h4",{children:["Web moves fast.",e.jsx("br",{}),e.jsx("strong",{children:"Stay ahead with BoldFrame."})]}),e.jsxs("form",{onSubmit:w,className:"footer-subscribe-row",children:[e.jsx("input",{type:"email",required:!0,placeholder:s?"Subscribed!":"Enter email address",value:m,onChange:t=>g(t.target.value),disabled:s}),e.jsx("button",{type:"submit",disabled:s,children:s?"Thanks!":"Subscribe"})]})]})]})]})]}),e.jsx(l.div,{initial:{opacity:0},whileInView:{opacity:1},viewport:{once:!0},transition:{duration:.8,delay:.3},className:"footer-watermark","aria-hidden":"true",children:e.jsx("svg",{ref:f,id:"watermarkSvg",viewBox:"0 0 1000 200",preserveAspectRatio:"xMidYMid meet",children:e.jsx("text",{ref:p,id:"watermarkText",x:"500",y:"150",textAnchor:"middle",fontSize:"240",children:"BoldFrame"})})})]})}export{z as Footer};
