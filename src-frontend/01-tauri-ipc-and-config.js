const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./secureRequest-D6PUxES5.js","./vendor-V10Q8exa.js","./icons-BUH_tEl0.js","./index-BrkuIfuP.js","./webviewWindow-r6d-cT4E.js"])))=>i.map(i=>d[i]);

var OB=Object.defineProperty;
var UB=(n,e,t)=>e in n?OB(n,e, {
  enumerable:!0,configurable:!0,writable:!0,value:t
}):n[e]=t;
var Gu=(n,e,t)=>UB(n,typeof e!="symbol"?e+"":e,t);
import {
  r as g,a as zh,g as Ao,c as FB,u as oi,b as br,L as Ip,N as BB,d as $B,R as wi,e as zB,f as GB,h as l2,i as pi,B as VB
}
from"./vendor-V10Q8exa.js";
import {
  G as Pt
}
from"./icons-BUH_tEl0.js";
(function() {
  const e=document.createElement("link").relList;
  if(e&&e.supports&&e.supports("modulepreload"))return;
  for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);
  new MutationObserver(r=> {
    for(const s of r)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)
  }).observe(document, {
    childList:!0,subtree:!0
  });
  function t(r) {
    const s={};
    return r.integrity&&(s.integrity=r.integrity),r.referrerPolicy&&(s.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?s.credentials="include":r.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s
  }
  function i(r) {
    if(r.ep)return;
    r.ep=!0;
    const s=t(r);
    fetch(r.href,s)
  }
})();
var FN= {
  exports:{}
},K0={};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var WB=g,HB=Symbol.for("react.element"),KB=Symbol.for("react.fragment"),YB=Object.prototype.hasOwnProperty,qB=WB.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,JB= {
  key:!0,ref:!0,__self:!0,__source:!0
};
function BN(n,e,t) {
  var i,r={},s=null,a=null;
  t!==void 0&&(s=""+t),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(a=e.ref);
  for(i in e)YB.call(e,i)&&!JB.hasOwnProperty(i)&&(r[i]=e[i]);
  if(n&&n.defaultProps)for(i in e=n.defaultProps,e)r[i]===void 0&&(r[i]=e[i]);
  return {
    $$typeof:HB,type:n,key:s,ref:a,props:r,_owner:qB.current
  }
}
K0.Fragment=KB;
K0.jsx=BN;
K0.jsxs=BN;
FN.exports=K0;
var l=FN.exports,Nf={},c2=zh;
Nf.createRoot=c2.createRoot,Nf.hydrateRoot=c2.hydrateRoot;
const QB="modulepreload",ZB=function(n,e) {
  return new URL(n,e).href
},d2={},$n=function(e,t,i) {
  let r=Promise.resolve();
  if(t&&t.length>0) {
    const a=document.getElementsByTagName("link"),o=document.querySelector("meta[property=csp-nonce]"),c=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));
    r=Promise.allSettled(t.map(d=> {
      if(d=ZB(d,i),d in d2)return;
      d2[d]=!0;
      const u=d.endsWith(".css"),f=u?'[rel="stylesheet"]':"";
      if(!!i)for(let p=a.length-1;
      p>=0;
      p--) {
        const y=a[p];
        if(y.href===d&&(!u||y.rel==="stylesheet"))return
      }
      else if(document.querySelector(`link[href="${d}"]${f}`))return;
      const m=document.createElement("link");
      if(m.rel=u?"stylesheet":QB,u||(m.as="script"),m.crossOrigin="",m.href=d,c&&m.setAttribute("nonce",c),document.head.appendChild(m),u)return new Promise((p,y)=> {
        m.addEventListener("load",p),m.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${d}`)))
      })
    }))
  }
  function s(a) {
    const o=new Event("vite:preloadError", {
      cancelable:!0
    });
    if(o.payload=a,window.dispatchEvent(o),!o.defaultPrevented)throw a
  }
  return r.then(a=> {
    for(const o of a||[])o.status==="rejected"&&s(o.reason);
    return e().catch(s)
  })
};
function XB(n,e,t,i) {
  if(typeof e=="function"?n!==e||!i:!e.has(n))throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return t==="m"?i:t==="a"?i.call(n):i?i.value:e.get(n)
}
function e5(n,e,t,i,r) {
  if(typeof e=="function"?n!==e||!0:!e.has(n))throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return e.set(n,t),t
}
var kp;
const hs="__TAURI_TO_IPC_KEY__";
function $N(n,e=!1) {
  return window.__TAURI_INTERNALS__.transformCallback(n,e)
}
async function oe(n,e={},t) {
  return window.__TAURI_INTERNALS__.invoke(n,e,t)
}
class zN {
  get rid() {
    return XB(this,kp,"f")
  }
  constructor(e) {
    kp.set(this,void 0),e5(this,kp,e)
  }
  async close() {
    return oe("plugin:resources|close", {
      rid:this.rid
    })
  }
}
kp=new WeakMap;
function zn() {
  return!!(globalThis||window).isTauri
}
const _p=Object.freeze(Object.defineProperty( {
  __proto__:null,Resource:zN,SERIALIZE_TO_IPC_FN:hs,invoke:oe,isTauri:zn,transformCallback:$N
},Symbol.toStringTag, {
  value:"Module"
})),t5="0.13.7",n5= {
  version:t5
},Se="https://api.goslynk.online",po="https://cdn.goslynk.online",P1="https://api4001.goslynk.online";
var Fr;
(function(n) {
  n.WINDOW_RESIZED="tauri://resize",n.WINDOW_MOVED="tauri://move",n.WINDOW_CLOSE_REQUESTED="tauri://close-requested",n.WINDOW_DESTROYED="tauri://destroyed",n.WINDOW_FOCUS="tauri://focus",n.WINDOW_BLUR="tauri://blur",n.WINDOW_SCALE_FACTOR_CHANGED="tauri://scale-change",n.WINDOW_THEME_CHANGED="tauri://theme-changed",n.WINDOW_CREATED="tauri://window-created",n.WINDOW_SUSPENDED="tauri://suspended",n.WINDOW_RESUMED="tauri://resumed",n.WEBVIEW_CREATED="tauri://webview-created",n.DRAG_ENTER="tauri://drag-enter",n.DRAG_OVER="tauri://drag-over",n.DRAG_DROP="tauri://drag-drop",n.DRAG_LEAVE="tauri://drag-leave"
})(Fr||(Fr={}));
async function GN(n,e) {
  window.__TAURI_EVENT_PLUGIN_INTERNALS__.unregisterListener(n,e),await oe("plugin:event|unlisten", {
    event:n,eventId:e
  })
}
async function _i(n,e,t) {
  var i;
  const r=typeof(t==null?void 0:t.target)=="string"? {
    kind:"AnyLabel",label:t.target
  }
  :(i=t==null?void 0:t.target)!==null&&i!==void 0?i: {
    kind:"Any"
  };
  return oe("plugin:event|listen", {
    event:n,target:r,handler:$N(e)
  }).then(s=>async()=>GN(n,s))
}
async function VN(n,e,t) {
  return _i(n,i=> {
    GN(n,i.id),e(i)
  },t)
}
async function WN(n,e) {
  await oe("plugin:event|emit", {
    event:n,payload:e
  })
}
async function HN(n,e,t) {
  await oe("plugin:event|emit_to", {
    target:typeof n=="string"? {
      kind:"AnyLabel",label:n
    }
    :n,event:e,payload:t
  })
}
const mg=Object.freeze(Object.defineProperty( {
  __proto__:null,get TauriEvent() {
    return Fr
  },emit:WN,emitTo:HN,listen:_i,once:VN
},Symbol.toStringTag, {
  value:"Module"
})),KN=g.createContext(void 0);
function i5( {
  children:n
}) {
  const[e,t]=g.useState(null),[i,r]=g.useState(localStorage.getItem("sessionId")),[s,a]=g.useState(!0),[o,c]=g.useState(localStorage.getItem("hardwareBanned")==="1"),[d,u]=g.useState(localStorage.getItem("hardwareBannedReason")||"");
  g.useRef(!1);
  const f=zn(),h=g.useRef(null),m=async()=> {
    if(!f)return"";
    if(h.current)return h.current;
    try {
      const S=await oe("get_machine_hwid");
      return h.current=S,S
    }
    catch {
      return""
    }
  },p=S=> {
    localStorage.setItem("hardwareBanned","1"),localStorage.setItem("hardwareBannedReason",S),localStorage.removeItem("sessionId"),c(!0),u(S),t(null),r(null)
  },y=async()=> {
    const S=localStorage.getItem("sessionId");
    if(!S) {
      a(!1);
      return
    }
    const T=new AbortController,E=setTimeout(()=>T.abort(),1e4),x={};
    h.current&&(x["X-Hardware-ID"]=h.current);
    try {
      const k=await fetch(`${Se}/auth/me?sessionId=${S}`, {
        signal:T.signal,headers:x
      });
      if(clearTimeout(E),k.ok) {
        const C=await k.json();
        if(C.hardware_banned) {
          localStorage.removeItem("sessionId"),r(null),t(null),c(!0),u(C.reason||"Bi cam phan cung");
          return
        }
        C.success&&C.user?(t(C.user),r(S)):(k.status===401||k.status===403)&&(localStorage.removeItem("sessionId"),r(null),t(null))
      }
      else(k.status===401||k.status===403)&&(localStorage.removeItem("sessionId"),r(null),t(null))
    }
    catch(k) {
      if(clearTimeout(E),k instanceof Error&&k.name==="AbortError"||k instanceof TypeError&&(k.message.includes("Failed to fetch")||k.message.includes("NetworkError")))return
    }
    finally {
      a(!1)
    }
  },v=async(S,T)=> {
    const E=await m(), {
      postSecureRequest:x
    }
    =await $n(async()=> {
      const {
        postSecureRequest:C
      }
      =await import("./secureRequest-D6PUxES5.js");
      return {
        postSecureRequest:C
      }
    },__vite__mapDeps([0,1,2]),import.meta.url),k=await x("/login", {
      username:S,password:T,hardware_id:E
    });
    if(k.hardware_banned)throw c(!0),u(k.reason||"Phần mềm bên thứ ba sử dụng mã độc"),t(null),r(null),localStorage.removeItem("sessionId"),new Error(k.reason||"Tài khoản bị khoá phần cứng");
    if(k.success&&k.user&&k.sessionId) {
      if(localStorage.setItem("sessionId",k.sessionId),r(k.sessionId),t(k.user),c(!1),u(""),typeof window<"u"&&"__TAURI__"in window) {
        const {
          invoke:C
        }
        =await $n(async()=> {
          const {
            invoke:_
          }
          =await Promise.resolve().then(()=>_p);
          return {
            invoke:_
          }
        },void 0,import.meta.url);
        C("setup_steam_runtime").catch(_=> {
          console.warn("setup_steam_runtime:",_)
        })
      }
    }
    else throw new Error("Đăng nhập thất bại")
  },b=async()=> {
    const S=await m(), {
      invoke:T
    }
    =await $n(async()=> {
      const {
        invoke:_
      }
      =await Promise.resolve().then(()=>_p);
      return {
        invoke:_
      }
    },void 0,import.meta.url),[E,x]=await T("auth_get_google_code"),C=await(await fetch(`${Se}/auth/google`, {
      method:"POST",headers: {
        "Content-Type":"application/json"
      },body:JSON.stringify( {
        code:E,redirectUri:x,hardware_id:S
      })
    })).json();
    if(C.hardware_banned)throw p(C.reason||"Bị cấm phần cứng"),new Error(C.reason||"Tài khoản bị khoá phần cứng");
    if(C.success&&C.user&&C.sessionId)localStorage.setItem("sessionId",C.sessionId),r(C.sessionId),t(C.user),c(!1),u("");
    else throw new Error(C.message||"Đăng nhập Google thất bại")
  },w=async()=> {
    typeof window<"u"&&"__TAURI__"in window&&$n(async()=> {
      const {
        invoke:E
      }
      =await Promise.resolve().then(()=>_p);
      return {
        invoke:E
      }
    },void 0,import.meta.url).then(( {
      invoke:E
    })=> {
      E("toggle_icon_visibility", {
        show:!1
      }).catch(()=>{}),E("close_menu_window").catch(()=>{}),E("eye::close_region_window").catch(()=>{})
    }).catch(()=>{});
    const S=i||localStorage.getItem("sessionId");
    localStorage.removeItem("sessionId");
    const T=[];
    for(let E=0;
    E<localStorage.length;
    E++) {
      const x=localStorage.key(E);
      x&&x.startsWith("mx_")&&T.push(x)
    }
    T.forEach(E=>localStorage.removeItem(E)),r(null),t(null),c(!1),u(""),h.current=null,"caches"in window&&caches.keys().then(E=> {
      E.forEach(x=>caches.delete(x))
    }),S&&fetch(`${Se}/auth/logout`, {
      method:"POST",headers: {
        "Content-Type":"application/json",Authorization:`Bearer ${S}`
      },body:JSON.stringify( {
        sessionId:S
      })
    }).catch(()=>{})
  };
  return g.useEffect(()=> {
    if(!f||!e||!i)return;
    let S=!1;
    return(async()=> {
      if(!(S||!e||!i))try {
        await oe("check_anti_compete", {
          userId:e.id,sessionId:i
        })
      }
      catch(E) {
        console.error("check_anti_compete error:",E)
      }
    })(),()=> {
      S=!0
    }
  },[e==null?void 0:e.id,i,f]),g.useEffect(()=> {
    if(!f)return;
    let S=!1;
    const T=_i("hardware-banned",()=> {
      S||u("Bạn bị cấm phần cứng vì phần mềm NestG Launcher chứa mã độc vui lòng liên hệ admin để được hỗ trợ")
    });
    return()=> {
      S=!0,T.then(E=>E())
    }
  },[f]),g.useEffect(()=> {
    y()
  },[]),g.useEffect(()=> {
    if(!i)return;
    const S=8*60*1e3,T=S+1e4;
    let E=Date.now();
    const x=async()=> {
      try {
        let j=document.visibilityState==="hidden";
        if(zn()) {
          const {
            getCurrentWindow:B
          }
          =await $n(async()=> {
            const {
              getCurrentWindow:W
            }
            =await Promise.resolve().then(()=>vy);
            return {
              getCurrentWindow:W
            }
          },void 0,import.meta.url);
          j=!await B().isVisible()
        }
        await fetch(`${Se}/auth/heartbeat`, {
          method:"POST",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${i}`
          },body:JSON.stringify( {
            sessionId:i,isHidden:j
          })
        })
      }
      catch(j) {
        console.error("Heartbeat error:",j)
      }
    },k=()=> {
      Date.now()-E>T&&console.log("[Heartbeat] PC woke up from sleep, forcing heartbeat"),x(),E=Date.now()
    };
    x(),E=Date.now();
    const C=setInterval(k,S),_=()=> {
      console.log("[Heartbeat] Network reconnected, forcing heartbeat"),x(),E=Date.now()
    },M=()=> {
      if(document.visibilityState==="visible") {
        const j=Date.now();
        j-E>T&&(console.log("[Heartbeat] App became visible after sleep, forcing heartbeat"),x(),E=j)
      }
    };
    return window.addEventListener("online",_),document.addEventListener("visibilitychange",M),()=> {
      clearInterval(C),window.removeEventListener("online",_),document.removeEventListener("visibilitychange",M)
    }
  },[i]),l.jsx(KN.Provider, {
    value: {
      user:e,sessionId:i,loading:s,login:v,loginWithGoogle:b,logout:w,checkAuth:y,hardwareBanned:o,banReason:d
    },children:n
  })
}
function nn() {
  const n=g.useContext(KN);
  if(!n)throw new Error("useAuth must be used inside AuthProvider");
  return n
}
function Yf(n) {
  "@babel/helpers - typeof";
  return Yf=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(e) {
    return typeof e
  }
  :function(e) {
    return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e
  },Yf(n)
}
function r5(n,e) {
  if(Yf(n