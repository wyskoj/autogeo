if(!self.define){let e,a={};const i=(i,t)=>(i=new URL(i+".js",t).href,a[i]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=a,document.head.appendChild(e)}else e=i,importScripts(i),a()})).then((()=>{let e=a[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(t,n)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(a[r])return;let s={};const c=e=>i(e,r),o={module:{uri:r},exports:s,require:c};a[r]=Promise.all(t.map((e=>o[e]||c(e)))).then((e=>(n(...e),s)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/196-ef48b4cb7030f8e0.js",revision:"ef48b4cb7030f8e0"},{url:"/_next/static/chunks/1bfc9850-110e755fd25dc391.js",revision:"110e755fd25dc391"},{url:"/_next/static/chunks/256-8359f483b3b68210.js",revision:"8359f483b3b68210"},{url:"/_next/static/chunks/260-cb247e3e698c7b67.js",revision:"cb247e3e698c7b67"},{url:"/_next/static/chunks/291-22ed0d5bb60ac175.js",revision:"22ed0d5bb60ac175"},{url:"/_next/static/chunks/31664189-b16d340a1ca681b1.js",revision:"b16d340a1ca681b1"},{url:"/_next/static/chunks/376-180f3a6f2d57729d.js",revision:"180f3a6f2d57729d"},{url:"/_next/static/chunks/467-e2018611d1241625.js",revision:"e2018611d1241625"},{url:"/_next/static/chunks/482-33917481d937c4a6.js",revision:"33917481d937c4a6"},{url:"/_next/static/chunks/512-f4b11c363b468660.js",revision:"f4b11c363b468660"},{url:"/_next/static/chunks/640-fb45b0e45539be24.js",revision:"fb45b0e45539be24"},{url:"/_next/static/chunks/682-42b21eff43d3fa89.js",revision:"42b21eff43d3fa89"},{url:"/_next/static/chunks/693-24b24f12173f3472.js",revision:"24b24f12173f3472"},{url:"/_next/static/chunks/70-42faab040f307f23.js",revision:"42faab040f307f23"},{url:"/_next/static/chunks/903-e60a465103f18e75.js",revision:"e60a465103f18e75"},{url:"/_next/static/chunks/975-f0e0ed0b1260f15e.js",revision:"f0e0ed0b1260f15e"},{url:"/_next/static/chunks/b5f2ed29-de12bc6ceed534a6.js",revision:"de12bc6ceed534a6"},{url:"/_next/static/chunks/d0c16330-8ef7ef725f9c7c50.js",revision:"8ef7ef725f9c7c50"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-129e5da6b2161174.js",revision:"129e5da6b2161174"},{url:"/_next/static/chunks/pages/_app-3615c64eadb6318e.js",revision:"3615c64eadb6318e"},{url:"/_next/static/chunks/pages/_error-8353112a01355ec2.js",revision:"8353112a01355ec2"},{url:"/_next/static/chunks/pages/about-2abf0e8243342255.js",revision:"2abf0e8243342255"},{url:"/_next/static/chunks/pages/dashboard-841c82856757414c.js",revision:"841c82856757414c"},{url:"/_next/static/chunks/pages/docs/least-squares/differential-leveling-d7f8b5ecdb0da37c.js",revision:"d7f8b5ecdb0da37c"},{url:"/_next/static/chunks/pages/index-3b31926ec213ae39.js",revision:"3b31926ec213ae39"},{url:"/_next/static/chunks/pages/login-11a7971c401398db.js",revision:"11a7971c401398db"},{url:"/_next/static/chunks/pages/operations-7a7c8515d4e0668c.js",revision:"7a7c8515d4e0668c"},{url:"/_next/static/chunks/pages/operations/coordinate-computations/geocentric-forwards-156deef8c2e2470e.js",revision:"156deef8c2e2470e"},{url:"/_next/static/chunks/pages/operations/coordinate-computations/geocentric-inverse-2c4dc4c9afa0dbfa.js",revision:"2c4dc4c9afa0dbfa"},{url:"/_next/static/chunks/pages/operations/coordinate-computations/spcs-forwards-57139c4b6dbe0b37.js",revision:"57139c4b6dbe0b37"},{url:"/_next/static/chunks/pages/operations/coordinate-geometry/angle-angle-intersection-4f7e1d9073aa2493.js",revision:"4f7e1d9073aa2493"},{url:"/_next/static/chunks/pages/operations/coordinate-geometry/direction-direction-intersection-25066da487d7fae4.js",revision:"25066da487d7fae4"},{url:"/_next/static/chunks/pages/operations/coordinate-geometry/distance-distance-intersection-aab59ef9f1f5963f.js",revision:"aab59ef9f1f5963f"},{url:"/_next/static/chunks/pages/operations/geodetic-computations/radii-fafb67115497ed1e.js",revision:"fafb67115497ed1e"},{url:"/_next/static/chunks/pages/operations/least-squares/differential-leveling-dc35c092a8771d9f.js",revision:"dc35c092a8771d9f"},{url:"/_next/static/chunks/pages/operations/least-squares/differential-leveling/wizard-ee85c32a309a3568.js",revision:"ee85c32a309a3568"},{url:"/_next/static/chunks/pages/operations/plain-28c9a0423bc8545c.js",revision:"28c9a0423bc8545c"},{url:"/_next/static/chunks/pages/operations/remote-sensing/ground-sampling-distance-2fd48bf2d80494cb.js",revision:"2fd48bf2d80494cb"},{url:"/_next/static/chunks/pages/operations/upload-e765c6c608a7dc31.js",revision:"e765c6c608a7dc31"},{url:"/_next/static/chunks/pages/settings-89c90ca11ab4139b.js",revision:"89c90ca11ab4139b"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-62c02dad1a6a4cb4.js",revision:"62c02dad1a6a4cb4"},{url:"/_next/static/css/92368a8544e8917a.css",revision:"92368a8544e8917a"},{url:"/_next/static/media/KaTeX_AMS-Regular.1608a09b.woff",revision:"1608a09b"},{url:"/_next/static/media/KaTeX_AMS-Regular.4aafdb68.ttf",revision:"4aafdb68"},{url:"/_next/static/media/KaTeX_AMS-Regular.a79f1c31.woff2",revision:"a79f1c31"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.b6770918.woff",revision:"b6770918"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.cce5b8ec.ttf",revision:"cce5b8ec"},{url:"/_next/static/media/KaTeX_Caligraphic-Bold.ec17d132.woff2",revision:"ec17d132"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.07ef19e7.ttf",revision:"07ef19e7"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.55fac258.woff2",revision:"55fac258"},{url:"/_next/static/media/KaTeX_Caligraphic-Regular.dad44a7f.woff",revision:"dad44a7f"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.9f256b85.woff",revision:"9f256b85"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.b18f59e1.ttf",revision:"b18f59e1"},{url:"/_next/static/media/KaTeX_Fraktur-Bold.d42a5579.woff2",revision:"d42a5579"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.7c187121.woff",revision:"7c187121"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.d3c882a6.woff2",revision:"d3c882a6"},{url:"/_next/static/media/KaTeX_Fraktur-Regular.ed38e79f.ttf",revision:"ed38e79f"},{url:"/_next/static/media/KaTeX_Main-Bold.b74a1a8b.ttf",revision:"b74a1a8b"},{url:"/_next/static/media/KaTeX_Main-Bold.c3fb5ac2.woff2",revision:"c3fb5ac2"},{url:"/_next/static/media/KaTeX_Main-Bold.d181c465.woff",revision:"d181c465"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.6f2bb1df.woff2",revision:"6f2bb1df"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.70d8b0a5.ttf",revision:"70d8b0a5"},{url:"/_next/static/media/KaTeX_Main-BoldItalic.e3f82f9d.woff",revision:"e3f82f9d"},{url:"/_next/static/media/KaTeX_Main-Italic.47373d1e.ttf",revision:"47373d1e"},{url:"/_next/static/media/KaTeX_Main-Italic.8916142b.woff2",revision:"8916142b"},{url:"/_next/static/media/KaTeX_Main-Italic.9024d815.woff",revision:"9024d815"},{url:"/_next/static/media/KaTeX_Main-Regular.0462f03b.woff2",revision:"0462f03b"},{url:"/_next/static/media/KaTeX_Main-Regular.7f51fe03.woff",revision:"7f51fe03"},{url:"/_next/static/media/KaTeX_Main-Regular.b7f8fe9b.ttf",revision:"b7f8fe9b"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.572d331f.woff2",revision:"572d331f"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.a879cf83.ttf",revision:"a879cf83"},{url:"/_next/static/media/KaTeX_Math-BoldItalic.f1035d8d.woff",revision:"f1035d8d"},{url:"/_next/static/media/KaTeX_Math-Italic.5295ba48.woff",revision:"5295ba48"},{url:"/_next/static/media/KaTeX_Math-Italic.939bc644.ttf",revision:"939bc644"},{url:"/_next/static/media/KaTeX_Math-Italic.f28c23ac.woff2",revision:"f28c23ac"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.8c5b5494.woff2",revision:"8c5b5494"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.94e1e8dc.ttf",revision:"94e1e8dc"},{url:"/_next/static/media/KaTeX_SansSerif-Bold.bf59d231.woff",revision:"bf59d231"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.3b1e59b3.woff2",revision:"3b1e59b3"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.7c9bc82b.woff",revision:"7c9bc82b"},{url:"/_next/static/media/KaTeX_SansSerif-Italic.b4c20c84.ttf",revision:"b4c20c84"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.74048478.woff",revision:"74048478"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.ba21ed5f.woff2",revision:"ba21ed5f"},{url:"/_next/static/media/KaTeX_SansSerif-Regular.d4d7ba48.ttf",revision:"d4d7ba48"},{url:"/_next/static/media/KaTeX_Script-Regular.03e9641d.woff2",revision:"03e9641d"},{url:"/_next/static/media/KaTeX_Script-Regular.07505710.woff",revision:"07505710"},{url:"/_next/static/media/KaTeX_Script-Regular.fe9cbbe1.ttf",revision:"fe9cbbe1"},{url:"/_next/static/media/KaTeX_Size1-Regular.e1e279cb.woff",revision:"e1e279cb"},{url:"/_next/static/media/KaTeX_Size1-Regular.eae34984.woff2",revision:"eae34984"},{url:"/_next/static/media/KaTeX_Size1-Regular.fabc004a.ttf",revision:"fabc004a"},{url:"/_next/static/media/KaTeX_Size2-Regular.57727022.woff",revision:"57727022"},{url:"/_next/static/media/KaTeX_Size2-Regular.5916a24f.woff2",revision:"5916a24f"},{url:"/_next/static/media/KaTeX_Size2-Regular.d6b476ec.ttf",revision:"d6b476ec"},{url:"/_next/static/media/KaTeX_Size3-Regular.9acaf01c.woff",revision:"9acaf01c"},{url:"/_next/static/media/KaTeX_Size3-Regular.a144ef58.ttf",revision:"a144ef58"},{url:"/_next/static/media/KaTeX_Size3-Regular.b4230e7e.woff2",revision:"b4230e7e"},{url:"/_next/static/media/KaTeX_Size4-Regular.10d95fd3.woff2",revision:"10d95fd3"},{url:"/_next/static/media/KaTeX_Size4-Regular.7a996c9d.woff",revision:"7a996c9d"},{url:"/_next/static/media/KaTeX_Size4-Regular.fbccdabe.ttf",revision:"fbccdabe"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.6258592b.woff",revision:"6258592b"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.a8709e36.woff2",revision:"a8709e36"},{url:"/_next/static/media/KaTeX_Typewriter-Regular.d97aaf4a.ttf",revision:"d97aaf4a"},{url:"/_next/static/media/hero-1.a8d890f5.webp",revision:"b4ea85052b99130cc7bc2c079f54b280"},{url:"/_next/static/media/hero-4.42b40a0a.webp",revision:"63d012bb3f1f327b67ad13042a543a04"},{url:"/_next/static/media/hero-5.dcb66093.webp",revision:"e4a54d7533414d372545b3907ee6fa6a"},{url:"/_next/static/media/inter-all-200-normal.cadc2927.woff",revision:"cadc2927"},{url:"/_next/static/media/inter-all-400-normal.2ae8ed37.woff",revision:"2ae8ed37"},{url:"/_next/static/media/inter-all-600-normal.d9666969.woff",revision:"d9666969"},{url:"/_next/static/media/inter-all-800-normal.cda92370.woff",revision:"cda92370"},{url:"/_next/static/media/inter-cyrillic-200-normal.ae33dc94.woff2",revision:"ae33dc94"},{url:"/_next/static/media/inter-cyrillic-400-normal.5122dff0.woff2",revision:"5122dff0"},{url:"/_next/static/media/inter-cyrillic-600-normal.9f2082d5.woff2",revision:"9f2082d5"},{url:"/_next/static/media/inter-cyrillic-800-normal.f0070c7d.woff2",revision:"f0070c7d"},{url:"/_next/static/media/inter-cyrillic-ext-200-normal.39c0e735.woff2",revision:"39c0e735"},{url:"/_next/static/media/inter-cyrillic-ext-400-normal.06b6faa3.woff2",revision:"06b6faa3"},{url:"/_next/static/media/inter-cyrillic-ext-600-normal.4eb7a897.woff2",revision:"4eb7a897"},{url:"/_next/static/media/inter-cyrillic-ext-800-normal.f40e584a.woff2",revision:"f40e584a"},{url:"/_next/static/media/inter-greek-200-normal.9f6284c6.woff2",revision:"9f6284c6"},{url:"/_next/static/media/inter-greek-400-normal.d1deb2fe.woff2",revision:"d1deb2fe"},{url:"/_next/static/media/inter-greek-600-normal.eff3b663.woff2",revision:"eff3b663"},{url:"/_next/static/media/inter-greek-800-normal.fd6e481c.woff2",revision:"fd6e481c"},{url:"/_next/static/media/inter-greek-ext-200-normal.5975ed7d.woff2",revision:"5975ed7d"},{url:"/_next/static/media/inter-greek-ext-400-normal.2271c2a1.woff2",revision:"2271c2a1"},{url:"/_next/static/media/inter-greek-ext-600-normal.04ef07b9.woff2",revision:"04ef07b9"},{url:"/_next/static/media/inter-greek-ext-800-normal.c7813f38.woff2",revision:"c7813f38"},{url:"/_next/static/media/inter-latin-200-normal.71082441.woff2",revision:"71082441"},{url:"/_next/static/media/inter-latin-400-normal.493934f7.woff2",revision:"493934f7"},{url:"/_next/static/media/inter-latin-600-normal.a3e93aa0.woff2",revision:"a3e93aa0"},{url:"/_next/static/media/inter-latin-800-normal.1c3ff413.woff2",revision:"1c3ff413"},{url:"/_next/static/media/inter-latin-ext-200-normal.095c947d.woff2",revision:"095c947d"},{url:"/_next/static/media/inter-latin-ext-400-normal.261aa6d4.woff2",revision:"261aa6d4"},{url:"/_next/static/media/inter-latin-ext-600-normal.0a04c3cd.woff2",revision:"0a04c3cd"},{url:"/_next/static/media/inter-latin-ext-800-normal.8bb395b7.woff2",revision:"8bb395b7"},{url:"/_next/static/media/inter-vietnamese-200-normal.8af71d47.woff2",revision:"8af71d47"},{url:"/_next/static/media/inter-vietnamese-400-normal.ebde713a.woff2",revision:"ebde713a"},{url:"/_next/static/media/inter-vietnamese-600-normal.eb82de1d.woff2",revision:"eb82de1d"},{url:"/_next/static/media/inter-vietnamese-800-normal.1925759d.woff2",revision:"1925759d"},{url:"/_next/static/media/roboto-mono-all-400-normal.7009585d.woff",revision:"7009585d"},{url:"/_next/static/media/roboto-mono-cyrillic-400-normal.699efb6e.woff2",revision:"699efb6e"},{url:"/_next/static/media/roboto-mono-cyrillic-ext-400-normal.c1ecc1bb.woff2",revision:"c1ecc1bb"},{url:"/_next/static/media/roboto-mono-greek-400-normal.2114bc3f.woff2",revision:"2114bc3f"},{url:"/_next/static/media/roboto-mono-latin-400-normal.aa44fca3.woff2",revision:"aa44fca3"},{url:"/_next/static/media/roboto-mono-latin-ext-400-normal.ba13a7b8.woff2",revision:"ba13a7b8"},{url:"/_next/static/media/roboto-mono-vietnamese-400-normal.17bb1e44.woff2",revision:"17bb1e44"},{url:"/_next/static/media/sora-all-200-normal.fc7224b7.woff",revision:"fc7224b7"},{url:"/_next/static/media/sora-all-400-normal.0122863b.woff",revision:"0122863b"},{url:"/_next/static/media/sora-all-600-normal.ff2b992e.woff",revision:"ff2b992e"},{url:"/_next/static/media/sora-all-800-normal.45dc1ca0.woff",revision:"45dc1ca0"},{url:"/_next/static/media/sora-latin-200-normal.e8fb5968.woff2",revision:"e8fb5968"},{url:"/_next/static/media/sora-latin-400-normal.d873d3db.woff2",revision:"d873d3db"},{url:"/_next/static/media/sora-latin-600-normal.3b7cacbe.woff2",revision:"3b7cacbe"},{url:"/_next/static/media/sora-latin-800-normal.6e261568.woff2",revision:"6e261568"},{url:"/_next/static/media/sora-latin-ext-200-normal.6be11486.woff2",revision:"6be11486"},{url:"/_next/static/media/sora-latin-ext-400-normal.f838a5b4.woff2",revision:"f838a5b4"},{url:"/_next/static/media/sora-latin-ext-600-normal.ea80fdd2.woff2",revision:"ea80fdd2"},{url:"/_next/static/media/sora-latin-ext-800-normal.15827040.woff2",revision:"15827040"},{url:"/_next/static/zIH04bhhkp7BeRicUjnNJ/_buildManifest.js",revision:"efcfac831633e1d212d75d45aef6bac4"},{url:"/_next/static/zIH04bhhkp7BeRicUjnNJ/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"4c4a11cf959a5ca83c80f9aa083f82b4"},{url:"/android-chrome-512x512.png",revision:"59a9204d9496ac305ec92e9aeafdfc55"},{url:"/apple-touch-icon.png",revision:"5e61eaa7b42f6fa62d7403fb039e117b"},{url:"/browserconfig.xml",revision:"f11e48b46d9e2066dcbce818c1dc5be5"},{url:"/favicon-16x16.png",revision:"a13d57ba9c0e85dfbf2039dd575fc1e0"},{url:"/favicon-32x32.png",revision:"96f50bc677f704ab8055e600c03274f9"},{url:"/favicon.ico",revision:"25a60704a5d7b40a66ad4e558e48346e"},{url:"/hero-1.webp",revision:"b4ea85052b99130cc7bc2c079f54b280"},{url:"/hero-2.png",revision:"28ff1b66173d25bf654c52ecf3bb7ec2"},{url:"/hero-3.png",revision:"b21635aa1a69b5d154233c94474292d8"},{url:"/hero-4.png",revision:"e6f28c92560af669a00b56a9cf73f469"},{url:"/hero-4.webp",revision:"63d012bb3f1f327b67ad13042a543a04"},{url:"/hero-5.png",revision:"3e6282cc9e033b56eb66a6bbc44309c6"},{url:"/hero-5.webp",revision:"e4a54d7533414d372545b3907ee6fa6a"},{url:"/img_1.png",revision:"a22ce2f80bf5c3e828d8480cadbfeef9"},{url:"/logo.svg",revision:"e3596bc54b88becded72cdd64c26174d"},{url:"/logo_white.svg",revision:"2c7b7ce15f186ece4ca96c427db053a4"},{url:"/mstile-144x144.png",revision:"de58919360ccae2ad3321bcef736d070"},{url:"/mstile-150x150.png",revision:"84dba5bb768e8c89a6d21cc1c6cf0d38"},{url:"/mstile-310x150.png",revision:"4a76575ff2c1d0a1ff676dd0eb39b786"},{url:"/mstile-310x310.png",revision:"a79fe3fbac1fa2435ea0d599e4fa9103"},{url:"/mstile-70x70.png",revision:"7e21a82ff7214b7e6dfa84c9b9068716"},{url:"/preview.webp",revision:"1d4e93cd8e0d9542c789df65369f0a20"},{url:"/safari-pinned-tab.svg",revision:"9aacff520413cdefe092b48ed79f276b"},{url:"/site.webmanifest",revision:"b9b32cdf3f05d5853b3dfe3bd3e9d8e0"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:a,event:i,state:t})=>a&&"opaqueredirect"===a.type?new Response(a.body,{status:200,statusText:"OK",headers:a.headers}):a}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const a=e.pathname;return!a.startsWith("/api/auth/")&&!!a.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
