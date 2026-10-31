t=JSON.parse(nt);
Array.isArray(ft)&&(Xe=ft)
}
}
catch{}const Ye=Xe.findIndex(nt=>nt.appId===Pe),ve= {
  id:Ye>=0?Xe[Ye].id:`${Pe}-${Date.now()}`,appId:Pe,title:ce.name,image:ie(ce)||"",includes:[],platform: {
    windows:!0
  },discountPercent:0,originalPrice:void 0,finalPrice:de
};
Ye>=0?Xe[Ye]=ve:Xe.push(ve),localStorage.setItem(ze,JSON.stringify(Xe)),window.dispatchEvent(new CustomEvent("cartUpdated")),i()
},Q=async()=> {
  if(!w) {
    S(!0);
    try {
      const {
        postSecureRequest:ce
      }
      =await $n(async()=> {
        const {
          postSecureRequest:Pe
        }
        =await import("./secureRequest-D6PUxES5.js");
        return {
          postSecureRequest:Pe
        }
      },__vite__mapDeps([0,1,2]),import.meta.url);
      await ce("/api/banner/fetch_rawg_manual",{},P1);
      const ke=await kS("/api/banner/upcoming");
      o(Array.isArray(ke)?ke:ke.data||[])
    }
    catch(ce) {
      console.error("[UPCOMING] Refresh RAWG failed:",ce)
    }
    finally {
      S(!1)
    }
  }
},te=wi.useRef(null),ee=wi.useRef(null),[he,me]=g.useState(!1),se=wi.useRef(!1),be=g.useRef(0),K=g.useRef(0),X=.92,$=g.useRef(!1),z=g.useRef(0),D=g.useRef(0),R=g.useRef(null),L=g.useRef(!1),A=g.useRef(1),N=g.useRef(performance.now());
g.useEffect(()=> {
  if(c||a.length===0)return;
  const ce=ke=> {
    const Pe=ke-N.current;
    N.current=ke;
    const de=te.current,ze=ee.current;
    if(!de||!ze) {
      R.current=requestAnimationFrame(ce);
      return
    }
    const Xe=Math.max(0,ze.scrollWidth-de.clientWidth);
    !$.current&&!L.current&&Math.abs(K.current)<.1&&(K.current=.7*(Pe/16.6)*A.current),be.current+=K.current,!$.current&&L.current&&(K.current*=X),be.current<=0?(be.current=0,K.current<0&&(K.current=0,A.current=1)):be.current>=Xe&&(be.current=Xe,K.current>0&&(K.current=0,A.current=-1)),Math.abs(K.current)<.05&&L.current&&!$.current&&(K.current=0),ze.style.transform=`translate3d(-${be.current}px, 0, 0)`,R.current=requestAnimationFrame(ce)
  };
  return N.current=performance.now(),R.current=requestAnimationFrame(ce),()=> {
    R.current&&cancelAnimationFrame(R.current)
  }
},[c,a.length]),g.useEffect(()=> {
  const ce=te.current;
  if(!ce)return;
  const ke=Pe=> {
    Pe.deltaY!==0&&(Pe.preventDefault(),K.current+=(Pe.deltaY>0?1:-1)*25)
  };
  return ce.addEventListener("wheel",ke, {
    passive:!1
  }),()=>ce.removeEventListener("wheel",ke)
},[c]),g.useEffect(()=> {
  let ce=!0;
  return(async()=> {
    try {
      const Pe=await kS("/api/banner/upcoming"),de=Array.isArray(Pe)?Pe:Pe.data||[];
      if(ce) {
        m(JSON.stringify(Pe).slice(0,300)),o(de);
        try {
          localStorage.setItem("upcomingGameIds",JSON.stringify(de.map(Ye=>Ye.id.toString())))
        }
        catch{}
      }
      const ze=[...new Set(de.map(Ye=>Ye.id.toString()))],Xe={};
      await Promise.allSettled(ze.map(async Ye=> {
        try {
          const ve=await fetch(`${Se}/games/${Ye}`);
          if(!ve.ok)return;
          const nt=await ve.json(),ft=Number(nt.price||0);
          ft>0&&(Xe[Ye]=ft)
        }
        catch{}
      })),ce&&Object.keys(Xe).length>0&&b(Ye=>( {
        ...Xe,...Ye
      }))
    }
    catch(Pe) {
      console.error("Error fetching upcoming carousel:",Pe),ce&&f(Pe instanceof Error?Pe.message:String(Pe))
    }
    finally {
      ce&&d(!1)
    }
  })(),()=> {
    ce=!1
  }
},[]),g.useEffect(()=> {
  if(!t||a.length===0)return;
  let ce=!0;
  return(async()=> {
    try {
      const Pe=await fetch(`${Se}/wishlist?sessionId=${t}`, {
        headers: {
          Authorization:`Bearer ${t}`
        }
      });
      if(!Pe.ok||!ce)return;
      const de=await Pe.json(),ze=Array.isArray(de)?de:de.data||de.items||[],Xe=new Set(ze.map(Ye=>String(Ye.app_id??Ye.game_id??"")));
      ce&&E(Xe)
    }
    catch{}
  })(),()=> {
    ce=!1
  }
},[t,a.length]);
const V=ce=> {
  te.current&&($.current=!0,me(!0),se.current=!1,z.current=ce.pageX,D.current=be.current,K.current=0)
},O=ce=> {
  const ke=te.current;
  ke&&ce.relatedTarget instanceof Node&&ke.contains(ce.relatedTarget)||(L.current=!1,$.current=!1,me(!1))
},F=()=> {
  $.current=!1,me(!1)
},J=ce=> {
  if(!$.current)return;
  ce.preventDefault();
  const ke=ce.pageX,Pe=z.current-ke;
  Math.abs(Pe)>5&&(se.current=!0),be.current=D.current+Pe,K.current=ce.movementX?-ce.movementX*1.5:0
},re=(ce,ke)=> {
  if(se.current) {
    ke.preventDefault(),ke.stopPropagation();
    return
  }
  n(ce)
},ie=ce=>p[ce.id.toString()]||ce.cover||"",fe=async ce=> {
  if(p[ce]!=="__failed")try {
    const ke=await yE(ce);
    y(Pe=>( {
      ...Pe,[ce]:ke.banner_url
    }))
  }
  catch {
    y(ke=>( {
      ...ke,[ce]:"__failed"
    }))
  }
};
return c?l.jsx("div", {
  className:"upcoming-carousel-container loading",children:l.jsx("div", {
    className:"upcoming-loading-text",children:"Đang tải lịch phát hành..."
  })
}):u?null:a.length===0?l.jsxs("div", {
  className:"upcoming-carousel-container loading",style: {
    padding:"20px",display:"flex",flexDirection:"column"
  },children:[l.jsx("div", {
    className:"upcoming-loading-text",children:"Chưa có danh sách game Sắp Cập Nhật (Mảng rỗng)."
  }),l.jsxs("div", {
    style: {
      color:"#fff",fontSize:"12px",marginTop:"10px",wordBreak:"break-all"
    },children:["RAW DATA DEBUG: ",h||"null"]
  })]
}):l.jsxs("section", {
  className:"upcoming-carousel-section",children:[l.jsxs("div", {
    className:"upcoming-header",children:[l.jsx("div", {
      className:"upcoming-label",children:"SẮP CẬP NHẬT"
    }),s&&l.jsx("button", {
      className:"upcoming-refresh-btn",onClick:Q,disabled:w,title:"Làm mới danh sách",children:w?"⏳":"🔄"
    })]
  }),l.jsxs("div", {
    className:"upcoming-metal-frame",children:[l.jsx("div", {
      className:"upcoming-grille-left",children:Array.from( {
        length:8
      }).map((ce,ke)=>l.jsx("span",{},ke))
    }),l.jsx("div", {
      className:"upcoming-grille-right",children:Array.from( {
        length:8
      }).map((ce,ke)=>l.jsx("span",{},ke))
    }),l.jsx("div", {
      className:"upcoming-scroll-wrapper",ref:te,onMouseEnter:()=> {
        L.current=!0
      },onMouseLeave:O,onMouseDown:V,onMouseUp:F,onMouseMove:J,style: {
        cursor:he?"grabbing":"grab"
      },children:l.jsx("div", {
        className:"upcoming-track",ref:ee,children:a.map((ce,ke)=> {
          const Pe=ie(ce);
          return l.jsxs("div", {
            className:"upcoming-card split-card",onClick:de=>re(ce.id.toString(),de),onDragStart:de=>de.preventDefault(),children:[l.jsx("button", {
              className:["upcoming-wishlist-pill",T.has(ce.id.toString())?"is-wishlisted":"",x===ce.id.toString()?"star-pop":""].join(" ").trim(),onClick:de=>U(ce.id.toString(),de),title:T.has(ce.id.toString())?"Đã thêm vào Wishlist":"Thêm vào Wishlist",children:T.has(ce.id.toString())?l.jsx(Cc, {
                size:22
              }):l.jsx(tK, {
                size:22
              })
            }),l.jsxs("div", {
              className:"split-info-layer",children:[l.jsx("h3", {
                className:"split-info-title",children:ce.name
              }),l.jsx("div", {
                className:"split-coming-soon-badge",children:"🕐 Sắp ra mắt"
              }),W(ce)>0&&(()=> {
                const de=ce.id.toString(),ze=_.has(de),Xe=j.has(de);
                return l.jsxs("div", {
                  className:"split-order-row",onClick:Ye=>Ye.stopPropagation(),children:[l.jsx("span", {
                    className:"split-order-price",children:ze?"Đã Mua":G(W(ce))
                  }),l.jsx("button", {
                    className:"split-order-btn",onClick:Ye=>q(ce,Ye),style:ze? {
                      background:"linear-gradient(135deg, #10b981 0%, #059669 100%)",borderColor:"rgba(16,185,129,0.4)"
                    }
                    :Xe? {
                      background:"linear-gradient(135deg, #10b981 0%, #059669 100%)"
                    }
                    :{},children:ze?"Trong thư viện":Xe?"Đã vào giỏ":"Order ngay"
                  })]
                })
              })()]
            }),l.jsx("div", {
              className:"split-half split-top",children:Pe&&l.jsx("img", {
                src:Pe,alt:ce.name,loading:"lazy",className:"upcoming-image",onDragStart:de=>de.preventDefault(),onError:de=> {
                  de.currentTarget.onerror=null,fe(ce.id.toString())
                }
              })
            }),l.jsxs("div", {
              className:"split-half split-bottom",children:[Pe&&l.jsx("img", {
                src:Pe,alt:ce.name,loading:"lazy",className:"upcoming-image",onDragStart:de=>de.preventDefault(),onError:de=> {
                  de.currentTarget.onerror=null,fe(ce.id.toString())
                }
              }),l.jsx("div", {
                className:"upcoming-gradient",children:l.jsx(ZZ, {
                  releaseDateStr:ce.release_date,onExpire:async()=> {
                    try {
                      await fetch(`${Se}/games/promote-from-upcoming`, {
                        method:"POST",headers: {
                          "Content-Type":"application/json"
                        },body:JSON.stringify( {
                          app_id:String(ce.id),release_date:ce.release_date
                        })
                      }),W4(),window.dispatchEvent(new CustomEvent("goslynk:games-promoted"))
                    }
                    catch(de) {
                      console.warn("[UPCOMING] Promote failed:",de)
                    }
                  }
                })
              })]
            })]
          },`${ce.id}-${ke}`)
        })
      })
    })]
  })]
})
}
function eX(n) {
  const e=n.price!=null?Number(n.price):null;
  return {
    app_id:String(n.id),game_name:n.name,banner_url:n.cover??null,price:e!=null&&!Number.isNaN(e)?e:null,tags:null,special_denuvo:null,nsfw:null
  }
}
function L_() {
  var bt,mt,Nt;
  const[n,e]=g.useState([]),[t,i]=g.useState([]),[r,s]=g.useState(!0),[a,o]=g.useState(null),[c,d]=g.useState(1),[u,f]=g.useState(!0),[h,m]=g.useState(!1),[p,y]=g.useState(1), {
    activeFilter:v,setActiveFilter:b,activeTag:w,setActiveTag:S,tagSearch:T,setTagSearch:E,allTags:x,setAllTags:k,priceSort:C,setPriceSort:_,minPrice:M,setMinPrice:j,maxPrice:B,setMaxPrice:G,minPriceDraft:W,setMinPriceDraft:U,maxPriceDraft:q,setMaxPriceDraft:Q,activeDropdown:te,setActiveDropdown:ee,showSubNav:he,setShowSubNav:me,setNewsTopImage:se,setDenuvoTopImage:be
  }
  =K4(),[K,X]=g.useState({}),$=g.useRef(null),[z,D]=g.useState(null),[R,L]=g.useState(!1),[A,N]=g.useState(!1),[V,O]=g.useState(""),[F,J]=g.useState(""),[re,ie]=g.useState(""),[fe,ce]=g.useState(""),ke=g.useCallback(async()=> {
    try {
      return zn()?await oe("get_age_verification"):localStorage.getItem("nsfw_age_verified")==="true"
    }
    catch(Ae) {
      return console.error("Failed to check age verification:",Ae),localStorage.getItem("nsfw_age_verified")==="true"
    }
  },[]),Pe=g.useCallback(async Ae=> {
    try {
      zn()?await oe("save_age_verification", {
        verified:Ae
      }):localStorage.setItem("nsfw_age_verified",Ae?"true":"false")
    }
    catch(dt) {
      console.error("Failed to save age verification:",dt),localStorage.setItem("nsfw_age_verified",Ae?"true":"false")
    }
  },[]),de=oi(),ze=br(), {
    startTutorial:Xe,isActive:Ye
  }
  =la(), {
    user:ve
  }
  =nn(), {
    t:nt
  }
  =ni(),ft=50,Rt=Ae=> {
    if(Ae==="asc")return"price_asc";
    if(Ae==="desc")return"price_desc"
  },Mt=()=> {
    const Ae=parseInt(M,10),dt=parseInt(B,10);
    return {
      min:Number.isNaN(Ae)?void 0:Ae,max:Number.isNaN(dt)?void 0:dt
    }
  },Ze=g.useCallback(async()=> {
    var Le,Qe;
    s(!0),o(null),e([]),d(1),f(!0);
    const {
      min:Ae,max:dt
    }
    =Mt(),Wt=Rt(C);
    try {
      const ot=await If( {
        page:1,limit:ft,filter:v,tag:w||void 0,sort:Wt,minPrice:Ae,maxPrice:dt
      });
      e(ot.data);
      const xt=Math.max(1,Number(((Le=ot.pagination)==null?void 0:Le.totalPages)||1));
      y(xt),f(((Qe=ot.pagination)==null?void 0:Qe.hasNextPage)??!1)
    }
    catch(ot) {
      e([]),y(1),f(!1),o(ot instanceof Error?ot.message:"Failed to load games")
    }
    finally {
      s(!1)
    }
  },[v,w,C,M,B]),Fe=g.useCallback(async()=> {
    var Qe;
    if(h||!u||r)return;
    m(!0);
    const Ae=c+1, {
      min:dt,max:Wt
    }
    =Mt(),Le=Rt(C);
    try {
      const ot=await If( {
        page:Ae,limit:ft,filter:v,tag:w||void 0,sort:Le,minPrice:dt,maxPrice:Wt
      });
      e(xt=> {
        const Ee=new Set(xt.map($e=>$e.app_id)),Ke=ot.data.filter($e=>!Ee.has($e.app_id));
        return[...xt,...Ke]
      }),d(Ae),f(((Qe=ot.pagination)==null?void 0:Qe.hasNextPage)??!1)
    }
    catch(ot) {
      o(ot instanceof Error?ot.message:"Failed to load more games"),f(!1)
    }
    finally {
      m(!1)
    }
  },[v,w,C,M,B,c,u,h,r]),le=g.useCallback(async()=> {
    try {
      const Ae=await kS("/api/banner/upcoming"),dt=Array.isArray(Ae)?Ae:Ae.data||[];
      i(dt)
    }
    catch {
      i([])
    }
  },[]),pe=g.useMemo(()=> {
    const Ae=t.filter(ot=>!__(ot.release_date)).sort((ot,xt)=>xt.release_date.localeCompare(ot.release_date)),dt=new Set(t.filter(ot=>__(ot.release_date)).map(ot=>String(ot.id))),Wt=new Set(Ae.map(ot=>String(ot.id))),Le=Ae.map(ot=>n.find(xt=>xt.app_id===String(ot.id))??eX(ot)),Qe=n.filter(ot=>!dt.has(ot.app_id)&&!Wt.has(ot.app_id));
    return[...Le,...Qe]
  },[n,t]);
  g.useEffect(()=> {
    let Ae=!1;
    return xK().then(dt=> {
      Ae||k(dt)
    }).catch(()=> {
      Ae||k([])
    }),()=> {
      Ae=!0
    }
  },[]),g.useEffect(()=> {
    let Ae=!1;
    return(async()=> {
      var Wt,Le;
      try {
        const[Qe,ot]=await Promise.all([If( {
          page:1,limit:1,filter:"news"
        }),If( {
          page:1,limit:1,filter:"denuvo"
        })]);
        if(!Ae) {
          const xt=(Wt=Qe.data[0])==null?void 0:Wt.banner_url,Ee=(Le=ot.data[0])==null?void 0:Le.banner_url;
          xt&&se(xt),Ee&&be(Ee)
        }
      }
      catch{}
    })(),()=> {
      Ae=!0
    }
  },[]),g.useEffect(()=> {
    const Ae=async()=> {
      if(!await ke()) {
        N(!0);
        return
      }
      b("nsfw")
    };
    return window.addEventListener("store-nsfw-click",Ae),()=> {
      window.removeEventListener("store-nsfw-click",Ae)
    }
  },[ke,b]),g.useEffect(()=> {
    Ze(),le()
  },[Ze,le]),g.useEffect(()=> {
    const Ae=()=> {
      W4(),Ze(),le()
    };
    return window.addEventListener("goslynk:games-promoted",Ae),()=>window.removeEventListener("goslynk:games-promoted",Ae)
  },[Ze,le]);
  const _e=g.useRef(!1);
  g.useEffect(()=> {
    const Ae=ze.pathname.match(/^\/store\/([^/]+)$/);
    Ae&&Ae[1]?z!==Ae[1]&&D(Ae[1]):z&&(ze.pathname==="/store"||ze.pathname==="/")&&D(null)
  },[ze.pathname]),g.useEffect(()=> {
    if(z) {
      const Ae=`/store/${z}`;
      ze.pathname!==Ae&&window.history.replaceState({},"",Ae)
    }
    else ze.pathname.startsWith("/store/")&&ze.pathname!=="/store"&&window.history.replaceState({},"","/store")
  },[z]),g.useEffect(()=>(z?document.body.style.overflow="hidden":document.body.style.overflow="",()=> {
    document.body.style.overflow=""
  }),[z]),g.useEffect(()=> {
    var ot,xt,Ee;
    if(!ve||r||n.length===0||(!Ye&&_e.current&&(_e.current=!1),Ye||_e.current))return;
    const Ae=ze.state&&ze.state.replayTutorial==="store";
    if(!Ae)return;
    if(!Ae) {
      if(!(((ot=ve==null?void 0:ve.tutorial_completed)==null?void 0:ot.welcome)===!0)||!(((xt=ve==null?void 0:ve.tutorial_completed)==null?void 0:xt.account_details)===!0))return;
      if(((Ee=ve==null?void 0:ve.tutorial_completed)==null?void 0:Ee.store)===!0) {
        _e.current=!1;
        return
      }
    }
    const dt=n[0];
    if(!dt||!(ze.pathname==="/store"||ze.pathname==="/"))return;
    _e.current=!0;
    const Le=[ {
      id:"store-browse",target:".game-grid",title:nt("tutorial.store.browse.title"),description:nt("tutorial.store.browse.description"),position:"bottom"
    }, {
      id:"store-game-card",target:".game-tile:first-child",title:nt("tutorial.store.gameCard.title"),description:nt("tutorial.store.gameCard.description"),position:"bottom",onAction:()=>D(dt.app_id),tutorialKey:"store"
    }
    ],Qe=setTimeout(()=> {
      Xe(Le),Ae&&de(ze.pathname, {
        replace:!0,state: {
          ...ze.state,replayTutorial:void 0
        }
      })
    },800);
    return()=>clearTimeout(Qe)
  },[ve==null?void 0:ve.id,r,n,Xe,nt,Ye,ze.pathname,(bt=ve==null?void 0:ve.tutorial_completed)==null?void 0:bt.welcome,(mt=ve==null?void 0:ve.tutorial_completed)==null?void 0:mt.account_details,(Nt=ve==null?void 0:ve.tutorial_completed)==null?void 0:Nt.store]);
  const Ge=g.useCallback(Ae=>Ae&&(K[Ae.app_id]||Ae.banner_url)||"",[K]),Ve=g.useRef({}),qe=g.useCallback(async Ae=> {
    !Ae||K[Ae]==="__failed"||(Ve.current[Ae]&&clearTimeout(Ve.current[Ae]),Ve.current[Ae]=setTimeout(async()=> {
      try {
        const dt=await yE(Ae);
        X(Wt=>( {
          ...Wt,[Ae]:dt.banner_url
        }))
      }
      catch {
        X(dt=>( {
          ...dt,[Ae]:"__failed"
        }))
      }
      delete Ve.current[Ae]
    },500))
  },[K]);
  g.useMemo(()=> {
    if(!T.trim())return x;
    const Ae=T.toLowerCase();
    return x.filter(dt=>dt.toLowerCase().includes(Ae))
  },[x,T]),g.useEffect(()=> {
    if(!u||h)return;
    const Ae=$.current;
    if(!Ae)return;
    const dt=new IntersectionObserver(Wt=> {
      Wt[0].isIntersecting&&u&&!h&&Fe()
    }, {
      rootMargin:"1000px"
    });
    return dt.observe(Ae),()=> {
      dt.disconnect()
    }
  },[u,h,Fe]);
  const rt=g.useRef(0);
  return g.useEffect(()=> {
    const Ae=document.querySelector(".content-full"),dt=Ae||window,Wt=()=>Ae?Ae.scrollTop:window.scrollY||window.pageYOffset,Le=()=> {
      if(te) {
        he||me(!0);
        return
      }
      const Qe=Wt(),ot=rt.current;
      Qe>ot&&Qe>50?me(!1):Qe<ot&&me(!0);
      const xt=Qe>1200;
      xt!==R&&L(xt),rt.current=Qe
    };
    return dt.addEventListener("scroll",Le, {
      passive:!0
    }),()=>dt.removeEventListener("scroll",Le)
  },[te,he,me,R]),l.jsxs("div", {
    className:"store-page",children:[l.jsx(FK,{}),l.jsx(XZ, {
      onSelectGame:D
    }),l.jsxs("section", {
      className:"game-grid-section",children:[l.jsx("div", {
        className:"section-header"
      }),a&&l.jsx("div", {
        className:"game-grid-error",children:a
      }),l.jsxs("div", {
        className:"game-grid",children:[pe.map(Ae=> {
          const dt=Ge(Ae),Wt= {
            app_id:Ae.app_id,game_name:Ae.game_name,price:Ae.price,banner_url:Ae.banner_url??void 0,short_desc:void 0,tags:Array.isArray(Ae.tags)?Ae.tags:typeof Ae.tags=="string"?Ae.tags.split(",").map(Le=>Le.trim()).filter(Boolean):[],special_denuvo:Ae.special_denuvo??null
          };
          return l.jsx(QZ, {
            game:Wt,bannerUrl:dt,onOpenDetail:D,onBannerError:qe,isOverlayOpen:!!z
          },Ae.app_id)
        }),r&&l.jsx("div", {
          className:"game-grid-loading",children:nt("friendsChat.loading")||"Đang tải..."
        }),u&&l.jsx("div", {
          ref:$,className:"infinite-scroll-sentinel"
        }),h&&l.jsx("div", {
          className:"game-grid-loading",children:nt("friendsChat.loading")||"Đang tải thêm..."
        })]
      })]
    }),z&&l.jsxs("div", {
      className:"game-detail-overlay",style: {
        position:"fixed",top:0,left:0,right:0,bottom:0,width:"100vw",height:"100vh",zIndex:1e3,display:"flex",alignItems:"flex-start",justifyContent:"center",overflow:"hidden",background:"transparent"
      },children:[l.jsx("div", {
        className:"game-detail-overlay-backdrop",onClick:()=>D(null),style: {
          position:"fixed",top:0,left:0,right:0,bottom:0,width:"100vw",height:"100vh",zIndex:1
        }
      }),l.jsx("div", {
        className:"game-detail-overlay-content",style: {
          position:"fixed",top:"105px",left:0,right:0,bottom:"32px",width:"100vw",overflowY:"auto",overflowX:"hidden",zIndex:2,WebkitOverflowScrolling:"touch",paddingBottom:"40px",boxSizing:"border-box",background:"#0c121a"
        },children:l.jsx(ND, {
          app_id:z,onClose:()=>D(null),isOverlay:!0
        })
      })]
    }),A&&l.jsx("div", {
      className:"age-verification-overlay",style: {
        position:"fixed",top:0,left:0,right:0,bottom:0,width:"100vw",height:"100vh",zIndex:2e3,display:"flex",alignItems:"center",justifyContent:"center",background:"rgba(0, 0, 0, 0.85)",backdropFilter:"blur(4px)"
      },onClick:Ae=> {
        Ae.target===Ae.currentTarget&&N(!1)
      },children:l.jsxs("div", {
        className:"age-verification-modal",style: {
          background:"#1b2838",borderRadius:"8px",padding:"32px",maxWidth:"500px",width:"90%",boxShadow:"0 8px 32px rgba(0, 0, 0, 0.6)"
        },onClick:Ae=>Ae.stopPropagation(),children:[l.jsxs("div", {
          style: {
            display:"flex",alignItems:"center",gap:"12px",marginBottom:"16px"
          },children:[l.jsx("div", {
            style: {
              width:"40px",height:"40px",borderRadius:"9999px",background:"rgba(248, 113, 113, 0.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",color:"#f97373"
            },children:"🔞"
          }),l.jsx("h2", {
            style: {
              margin:0,fontSize:"20px",fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#ffffff"
            },children:nt("tutorial.store.nsfw.ageVerification.title")
          })]
        }),l.jsx("p", {
          style: {
            margin:"0 0 8px 0",fontSize:"14px",lineHeight:1.6,color:"#cbd5e1"
          },children:nt("tutorial.store.nsfw.ageVerification.description")
        }),l.jsx("p", {
          style: {
            margin:"0 0 24px 0",fontSize:"14px",lineHeight:1.6,color:"#cbd5e1"
          },children:nt("tutorial.store.nsfw.ageVerification.notice")
        }),l.jsxs("div", {
          style: {
            display:"flex",justifyContent:"flex-end",gap:"12px",marginTop:"8px"
          },children:[l.jsx("button", {
            type:"button",onClick:()=> {
              N(!1)
            },style: {
              padding:"10px 20px",borderRadius:"4px",border:"none",background:"#e5f0ff",color:"#0f172a",fontSize:"14px",fontWeight:600,cursor:"pointer"
            },children:nt("tutorial.store.nsfw.ageVerification.cancel")
          }),l.jsx("button", {
            type:"button",onClick:async()=> {
              await Pe(!0),b("nsfw"),N(!1)
            },style: {
              padding:"10px 20px",borderRadius:"4px",border:"1px solid #f97373",background:"transparent",color:"#f97373",fontSize:"14px",fontWeight:500,cursor:"pointer"
            },children:nt("tutorial.store.nsfw.ageVerification.confirm")
          })]
        })]
      })
    }),R&&l.jsx("button", {
      type:"button",className:"store-scroll-top-btn",onClick:()=> {
        const Ae=document.querySelector(".content-full"),dt=Ae||window;
        Ae?Ae.scrollTo( {
          top:0,behavior:"smooth"
        }):typeof dt.scrollTo=="function"?dt.scrollTo( {
          top:0,behavior:"smooth"
        }):window.scrollTo( {
          top:0,behavior:"smooth"
        })
      },children:l.jsx("span", {
        style: {
          fontSize:"20px",transform:"translateY(-1px)"
        },children:"↑"
      })
    })]
  })
}
const t1=new Set;
function tX( {
  gameId:n,gameName:e,bannerUrl:t,onClose:i
}) {
  var s2,a2,o2;
  const {
    sessionId:r,user:s
  }
  =nn(), {
    t:a,language:o
  }
  =ni(), {
    showSuccess:c,showError:d,showWarning:u,showInfo:f
  }
  =Ka(),h=oi(), {
    startTutorial:m,isActive:p
  }
  =la(),y=g.useRef(!1),[v,b]=g.useState(null),[w,S]=g.useState(null),[T,E]=g.useState([]),[x,k]=g.useState(!1),[C,_]=g.useState(!1),[M,j]=g.useState(null),[B,G]=g.useState(""),[W,U]=g.useState(!1), {
    downloadState:q,startSecondaryDownload:Q
  }
  =D4(), {
    isDownloading:te,progress:ee,statusText:he,gameId:me
  }
  =q,se=te&&me===n,[be,K]=g.useState(0),[X,$]=g.useState(0),[z,D]=g.useState(!1),[R,L]=g.useState(null),[A,N]=g.useState(!1),[V,O]=g.useState([]),[F,J]=g.useState([]),[re,ie]=g.useState(!1),[fe,ce]=g.useState(!1),[ke,Pe]=g.useState(!1),[de,ze]=g.useState(!1),[Xe,Ye]=g.useState(!1),[ve,nt]=g.useState(!1),[ft,Rt]=g.useState(!1),[Mt,Ze]=g.useState(!1),[Fe,le]=g.useState(!1),[pe,_e]=g.useState(!1),[Ge,Ve]=g.useState(!1),[qe,rt]=g.useState(!1);
  g.useRef(null);
  const[bt,mt]=g.useState(!1),[Nt,Ae]=g.useState(!1),[dt,Wt]=g.useState(!1),[Le,Qe]=g.useState(!1),[ot,xt]=g.useState(!1),[Ee,Ke]=g.useState(!1),[$e,st]=g.useState(!1),[Ct,wt]=g.useState(0),[Z,ue]=g.useState(""),[ye,Ne]=g.useState(!1),[et,lt]=g.useState(!1),[kt,Gt]=g.useState(0),[fn,on]=g.useState(!1),[Ot,rn]=g.useState(!1),[mi,wn]=g.useState(!1),[Nr,Rr]=g.useState(!1),[hn,_n]=g.useState(null),[Pn,zi]=g.useState(null),[zo,ua]=g.useState(!1),[ae,We]=g.useState(null),[it,St]=g.useState(!1),[Bt,Si]=g.useState(null),Dn=g.useRef(!1),ws=g.useRef(!1),[Ws,Ss]=g.useState(!1),[Hr,Go]=g.useState(!1),[Ya,fa]=g.useState(!1),[Vo,ha]=g.useState(!1),[Jc,Qc]=g.useState(0),[Wo,$u]=g.useState(5e4),[jl,Pl]=g.useState(null),[Kr,xs]=g.useState(null),[qa,ge]=g.useState(0),[ct,_t]=g.useState(null),[Jt,qn]=g.useState(0),[On,ln]=g.useState(!1),[ci,Gi]=g.useState(null),Yr=g.useRef(null),pr=g.useRef(null),[ma,Ja]=g.useState(null),[Dl,Zc]=g.useState("general");
  g.useEffect(()=> {
    const Te=zn();
    ie(Te),Te&&((async()=> {
      try {
        const Ut=await oe("check_lua_file", {
          appId:n
        });
        Pe(Ut);
        const Yt=await oe("check_game_installed_basic", {
          appId:n
        });
        ce(Ut&&Yt),(Ut&&Yt||!Ut)&&(localStorage.removeItem(`installing_state_${n}`),fa(!1))
      }
      catch {
        Pe(!1),ce(!1),localStorage.removeItem(`installing_state_${n}`),fa(!1)
      }
    })(),Ye(!1),(async()=> {
      try {
        const Ut=await oe("check_game_in_active_database", {
          appId:n
        });
        Rr(Ut);
        const Yt=await oe("check_game_in_ea_database", {
          appId:n
        });
        Ss(Yt);
        const dn=await oe("check_game_in_ubi_database", {
          appId:n
        });
        Go(dn)
      }
      catch {
        Rr(!1),Ss(!1),Go(!1)
      }
    })(),(async()=> {
      try {
        const[Ut,Yt]=await oe("get_game_save_path", {
          appId:n,gameName:e
        });
        Gi(Ut)
      }
      catch {
        Gi(null)
      }
    })())
  },[n,e]),g.useEffect(()=> {
    if(!re)return;
    const Te=async()=> {
      try {
        const Oe=await oe("check_lua_file", {
          appId:n
        });
        Pe(Oe);
        const at=await oe("check_game_installed_basic", {
          appId:n
        });
        ce(Oe&&at),(Oe&&at||!Oe)&&(localStorage.removeItem(`installing_state_${n}`),fa(!1))
      }
      catch {
        Pe(!1),ce(!1),localStorage.removeItem(`installing_state_${n}`),fa(!1)
      }
    };
    Te();
    const Ue=setInterval(()=> {
      typeof document<"u"&&document.hidden||Te()
    },1e4);
    return()=>clearInterval(Ue)
  },[n,e,re]),g.useEffect(()=> {
    const Te=Dn.current;
    Dn.current=fe;
    const Ue=localStorage.getItem(`secondary_track_${n}`);
    if(!Te&&fe&&Ue)if(Ue==="auto")console.log(`[SECONDARY_TRACK] ACF state became 4. Auto-downloading secondary for ${n}`),localStorage.removeItem(`secondary_track_${n}`),ws.current=!1,fetch(`${Se}/api/bypass/secondary-link/${encodeURIComponent(n)}`).then(Oe=>Oe.json()).then(Oe=> {
      if(!(Oe!=null&&Oe.success)||!(Oe!=null&&Oe.url))return;
      const at=Oe.url,Ut=at.main||(typeof at=="string"?at:null);
      Ut&&(Q(n,e,Ut),f("Đang tự động cài đặt file đính kèm cho game..."))
    }).catch(()=>{});
    else {
      console.log(`[SECONDARY_TRACK] ACF state became 4. Pulling app to foreground and showing warning for ${n}`),localStorage.removeItem(`secondary_track_${n}`),ws.current=!1,We(Ue);
      try {
        oe("set_window_focus",{})
      }
      catch{}setTimeout(()=>ua(!0),800)
    }
    Te&&!fe&&Ue&&(console.log(`[SECONDARY_TRACK] hasLua became false (cancelled). Removing session for ${n}`),localStorage.removeItem(`secondary_track_${n}`),ws.current=!1)
  },[fe,n,e]),g.useEffect(()=> {
    !fe&&Xe&&Ye(!1)
  },[fe,Xe]),g.useEffect(()=> {
    fa(localStorage.getItem(`installing_state_${n}`)==="true")
  },[n]),g.useEffect(()=> {
    if(!Kr) {
      ge(0);
      return
    }
    const Te=()=> {
      const Oe=Date.now();
      if(Oe>=Kr)ge(0),xs(null);
      else {
        const at=Math.ceil((Kr-Oe)/1e3);
        ge(at)
      }
    };
    Te();
    const Ue=setInterval(Te,1e3);
    return()=>clearInterval(Ue)
  },[Kr]),g.useEffect(()=> {
    if(!ct) {
      qn(0);
      return
    }
    const Te=()=> {
      const Oe=Date.now();
      if(Oe>=ct)qn(0),_t(null);
      else {
        const at=Math.ceil((ct-Oe)/1e3);
        qn(at)
      }
    };
    Te();
    const Ue=setInterval(Te,1e3);
    return()=>clearInterval(Ue)
  },[ct]),g.useEffect(()=> {
    const Te=async()=> {
      if(!r||!n) {
        le(!1),mt(!1),Ae(!1),Wt(!1);
        return
      }
      try {
        const Oe=await fetch(`${Se}/library/owned/${encodeURIComponent(n)}?sessionId=${r}`, {
          headers: {
            Authorization:`Bearer ${r}`
          }
        });
        if(Oe.ok) {
          const at=await Oe.json();
          if(at.success&&at.owned) {
            if(mt(at.is_vip||!1),le(at.vip_expired||!1),Ae(!0),at.vip_expired&&at.is_vip&&re&&at.app_id)try {
              await oe("cleanup_vip_expired", {
                appIds:[at.app_id]
              })
            }
            catch{}
          }
          else le(!1),mt(!1),Ae(!1)
        }
        else le(!1),mt(!1),Ae(!1)
      }
      catch {
        le(!1),mt(!1),Ae(!1)
      }
    };
    Te();
    const Ue=setInterval(()=> {
      typeof document<"u"&&document.hidden||Te()
    },3e4);
    return()=>clearInterval(Ue)
  },[r,n]),g.useEffect(()=> {
    const Te=!!(s&&(s.role==="vip"||s.role==="vip_plus"));
    Wt(Nt||Te)
  },[s,Nt]),g.useEffect(()=> {
    if(!re||!ke||!fe)return;
    let Te=!0;
    const Ue=async()=> {
      if(Te)try {
        const[at,Ut]=await Promise.all([oe("check_online_fix", {
          appId:n,gameName:e
        }),oe("check_online_available", {
          appId:n
        })]);
        nt(at),Ze(Ut)
      }
      catch {
        nt(!1),Ze(!1)
      }
    };
    Ue();
    const Oe=setInterval(()=> {
      typeof document<"u"&&document.hidden||Ue()
    },15e3);
    return()=> {
      Te=!1,clearInterval(Oe)
    }
  },[n,e,ke,fe,re]),g.useEffect(()=> {
    if(!re||!Xe)return;
    let Te=!1;
    const Ue=async()=> {
      if(!Te)try {
        await oe("is_game_process_running", {
          appId:n,gameName:e
        })||Ye(!1)
      }
      catch{}
    };
    Ue();
    const Oe=setInterval(()=> {
      typeof document<"u"&&document.hidden||Ue()
    },1e4);
    return()=> {
      Te=!0,clearInterval(Oe)
    }
  },[re,Xe,n,e]),g.useEffect(()=> {
    re&&(async()=> {
      if(!t1.has(n))try {
        let Ue=null;
        if(re&&ke&&fe)try {
          Ue=await oe("get_current_manifests", {
            appId:n
          })
        }
        catch{}const Oe=await fetch(`${Se}/games/${encodeURIComponent(n)}/check-reseller`, {
          method:"POST",headers: {
            "Content-Type":"application/json"
          },body:JSON.stringify( {
            currentManifests:Ue
          })
        });
        if(Oe.ok) {
          const at=await Oe.json();
          if(at.success&&at.checked&&(t1.add(n),at.hasUpdate&&ke&&fe?N(!0):N(!1),at.files&&Array.isArray(at.files)&&O(at.files),at.depots&&typeof at.depots=="object")) {
            const Ut=Object.keys(at.depots);
            J(Ut)
          }
        }
      }
      catch{}
    })()
  },[n,ke,fe,re]),g.useEffect(()=> {
    (async()=> {
      try {
        const Ue=await Z4(n,Oe=>b(Oe));
        if(Ue&&(b(Ue),(!e||e.startsWith("Game "))&&Ue.name&&r))try {
          await fetch(`${Se}/games/${n}`, {
            method:"PUT",headers: {
              "Content-Type":"application/json",Authorization:`Bearer ${r}`
            },body:JSON.stringify( {
              game_name:Ue.name,banner_url:Ue.header_image||""
            })
          })
        }
        catch{}
      }
      catch{}
    })()
  },[n,e,r]),g.useEffect(()=> {
    (async()=> {
      try {
        const Ue=await WK(n);
        Ue&&S(Ue)
      }
      catch{}
    })()
  },[n]),g.useEffect(()=> {
    (async()=> {
      try {
        const Ue=await fetch(`${Se}/games/${encodeURIComponent(n)}`);
        if(Ue.ok) {
          const Oe=await Ue.json();
          Oe.special_denuvo!==void 0&&wn(!!Oe.special_denuvo)
        }
      }
      catch{}
    })()
  },[n]),g.useEffect(()=> {
    n&&(async()=> {
      var Ue;
      k(!0);
      try {
        const Oe=await ok(n,5,300);
        (Ue=Oe==null?void 0:Oe.appnews)!=null&&Ue.newsitems&&Oe.appnews.newsitems.length>0?E(Oe.appnews.newsitems):E([])
      }
      catch {
        E([])
      }
      finally {
        k(!1)
      }
    })()
  },[n]),g.useEffect(()=> {
    !s||!v||(!p&&y.current&&(y.current=!1),p||y.current)
  },[s==null?void 0:s.id,v,m,a,p,(s2=s==null?void 0:s.tutorial_completed)==null?void 0:s2.welcome,(a2=s==null?void 0:s.tutorial_completed)==null?void 0:a2.library,(o2=s==null?void 0:s.tutorial_completed)==null?void 0:o2.library_detail]);
  const Ni=(v==null?void 0:v.header_image)||t||(v==null?void 0:v.background),Ho=(v==null?void 0:v.name)||e,Y=Te=> {
    const Ue=new Date(Te*1e3);
    return`${Hp[o].libraryDetail.months[Ue.getMonth()]} ${Ue.getDate()}`
  },we=Te=> {
    const Ue=new Date(Te*1e3),Oe=Hp[o].libraryDetail.days,at=Hp[o].libraryDetail.monthsFull;
    return`${a("libraryDetail.posted")} ${Oe[Ue.getDay()]}, ${at[Ue.getMonth()]} ${Ue.getDate()}`
  },ne=Te=> {
    if(!Te)return null;
    const Ue=Te.match(/<a[^>]+href="([^"]+)"[^>]*>([^<]+)<\/a>/i);return Ue&&Ue[1]&&Ue[2]?{url:Ue[1],text:Ue[2].trim()}:null},Be=Te=>{if(!Te)return Ni||null;const Ue=[Te.match(/<img[^>]+src="([^"]+)"/i),Te.match(/<img[^>]+src='([^']+)'/i),Te.match(/src="([^"]*\.(jpg|jpeg|png|gif|webp)[^"]*)"/i)];for(const Oe of Ue)if(Oe&&Oe[1]){let at=Oe[1].replace(/['"]/g,"");if(at&&!at.includes("steamcommunity/public/images")&&!at.includes("1x1")&&!at.includes("pixel")){if(at.startsWith("//"))at="https:"+at;else if(at.startsWith("/"))at="https://steamcommunity.com"+at;else if(!at.startsWith("http"))continue;return at}}return Ni||null},xe=Te=>{const Ue=document.createElement("DIV");return Ue.innerHTML=Te,(Ue.textContent||Ue.innerText||"").replace(/\s+/g," ").trim()},je=()=>{h(`/store/${n}`)},Je=async Te=>{var Ue;j(Te),U(!0),G(""),K(Math.floor(Math.random()*5e3)+100),$(Math.floor(Math.random()*500)+10);try{const Oe=await ok(n,1,5e3);if((Ue=Oe==null?void 0:Oe.appnews)!=null&&Ue.newsitems&&Oe.appnews.newsitems.length>0){const at=Oe.appnews.newsitems.find(Ut=>Ut.gid===Te.gid);G($m(at?at.contents:Te.contents))}else G($m(Te.contents))}catch{G($m(Te.contents))}finally{U(!1)}},ht=()=>{j(null),G("")},Et=async()=>{if(!re){u(a("libraryDetail.installationNotAvailable"));return}D(!0),fa(!0),localStorage.setItem(`installing_state_${n}`,"true"),L(null);try{if(ke&&fe)try{const Ut=await fetch(`https://generator.ryuu.lol/manifestinfo/${encodeURIComponent(n)}`);let Yt=[n];if(Ut.ok)try{const dn=await Ut.json(),Vi=(Array.isArray(dn)?dn:Array.isArray(dn==null?void 0:dn.manifests)?dn.manifests:[]).map(DB=>DB.split("_")[0]).filter(Boolean);Yt=Vi.length>0?Vi:F.length>0?F:[n]}catch{}await oe("cleanup_game_manifests_and_lua",{appId:n,depotIds:Yt}),Pe(!1),ce(!1),N(!1),O([])}catch{Pe(!1),ce(!1)}try{await oe("setup_steam_runtime")}catch(Ut){console.warn("setup_steam_runtime:",Ut)}const Te=localStorage.getItem("skipKillSteam")!=="false",Ue=await oe("install_game_vps",{appId:n,skipKillSteam:Te});N(!1),t1.delete(n),O([]);const at=await(async()=>{const Ut=Date.now(),Yt=3e4;for(;Date.now()-Ut<Yt;){try{if(await oe("check_lua_file",{appId:n}))return Pe(!0),!0}catch{}await new Promise(dn=>setTimeout(dn,2e3))}return!1})();if(at)try{const Yt=await(await fetch(`${Se}/api/bypass/secondary-link/${encodeURIComponent(n)}`)).json();if((Yt==null?void 0:Yt.success)&&(Yt==null?void 0:Yt.url)&&(Yt.url.main||typeof Yt.url=="string")){const Vi=Ws||Hr?"auto":mi?"denuvo":"manual";localStorage.setItem(`secondary_track_${n}`,Vi),ws.current=!0,console.log(`[SECONDARY_TRACK] Created session for ${n} with type: ${Vi}`),Si(Vi),St(!0)}else console.log(`[SECONDARY_TRACK] No secondary link found for ${n}, skipping track.`)}catch{}try{const Ut=await oe("check_online_fix",{appId:n,gameName:e});nt(Ut)}catch{nt(!1)}if(at){Pe(!0);try{const Ut=await oe("check_game_installed_basic",{appId:n});ce(Ut)}catch{ce(!0)}c(Ue||a("libraryDetail.installationCompleted"))}else localStorage.removeItem(`secondary_track_${n}`),ws.current=!1,L("Không tìm thấy file .lua hoặc manifest trong Steam/config. Kiểm tra bottle CrossOver «Steam» và thử lại.")}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);L(Ue)}finally{D(!1)}};g.useEffect(()=>{if(!re)return;if(!de&&!$e){Ne(!1);return}let Te=null,Ue=null,Oe=null;return(async()=>{try{Te=await _i("activation-progress",dn=>{const jr=(dn==null?void 0:dn.payload)||{};if(String(jr.appid||"")!==String(n))return;const Vi=Number(jr.percent??0);Number.isNaN(Vi)||(wt(Math.max(0,Math.min(100,Vi))),Ne(!0)),typeof jr.statusText=="string"&&ue(jr.statusText),Vi>=100&&setTimeout(()=>Ne(!1),2e3)}),Ue=await _i("ea-activation-progress",dn=>{const jr=(dn==null?void 0:dn.payload)||{},Vi=Number(jr.percent??0);Number.isNaN(Vi)||(wt(Math.max(0,Math.min(100,Vi))),Ne(!0)),typeof jr.message=="string"&&ue(jr.message),Vi>=100&&setTimeout(()=>Ne(!1),2e3)}),Oe=await _i("ubi-activation-progress",dn=>{const jr=(dn==null?void 0:dn.payload)||{},Vi=Number(jr.percent??0);Number.isNaN(Vi)||(wt(Math.max(0,Math.min(100,Vi))),Ne(!0)),typeof jr.message=="string"&&ue(jr.message),Vi>=100&&setTimeout(()=>Ne(!1),2e3)})}catch{}})(),()=>{try{Te==null||Te(),Ue==null||Ue(),Oe==null||Oe()}catch{}}},[re,de,$e,n]);const Dt=async()=>{if(!re){u(a("libraryDetail.playNotAvailable"));return}ze(!0),wt(5),ue("Đang khởi tạo game..."),Ne(!0),L(null);try{const[Te,Ue]=await Promise.all([oe("check_lua_file",{appId:n}),oe("check_game_installed_basic",{appId:n})]);if(!Te||!Ue){Pe(Te),ce(Ue),u(a("libraryDetail.gameNotInstalled")),ze(!1);return}if(Pe(!0),ce(!0),Ws){const at=await oe("find_game_install_dir",{appId:n,gameName:e});if(at)if(await oe("check_ea_game_activated",{appId:n,gameDir:at})){c("Đang khởi động EA Game..."),await oe("launch_game_direct",{appId:n}),Ye(!0);return}else{const Yt=await oe("start_ea_activation",{appId:n,gameDir:at});if(console.log("[EA] start_ea_activation result:",Yt),Yt==="launched"){c("Active EA thành công! Đang chạy game."),Ye(!0);return}c("Active EA thành công! Steam đang khởi động...");return}}if(Hr){const at=await oe("find_game_install_dir",{appId:n,gameName:e});if(at)if(await oe("check_ubi_game_activated",{appId:n,gameDir:at})){c("Đang khởi động Ubisoft Game..."),await oe("launch_game_direct",{appId:n}),Ye(!0);return}else{const Yt=await oe("start_ubi_activation",{appId:n,gameDir:at,gameName:e});if(console.log("[UBI] start_ubi_activation result:",Yt),Yt==="launched"){c("Active Ubi thành công! Đang chạy game."),Ye(!0);return}return}}if(!Nr&&!Ws&&!Hr){let at=!1;if(v){const Ut=(v.drm_notice||"").toLowerCase(),Yt=v.publishers||[];(Ut.includes("denuvo")||Ut.includes("ea")||Ut.includes("ubisoft")||Yt.some(dn=>dn.toLowerCase().includes("ubisoft")||dn.toLowerCase().includes("electronic arts")))&&(at=!0)}if(at)try{const Ut=await fetch(`${Se}/api/check-ownership/${n}`);if(Ut.ok){const Yt=await Ut.json();if(Yt.owned)Yt.has_ini||u("Đang chuẩn bị dữ liệu khởi chạy, vui lòng thử lại sau ít phút.");else{d("Đang thử khởi động..."),await oe("launch_game_direct",{appId:n}),Ye(!0);return}}}catch(Ut){console.error("Lỗi khi check ownership:",Ut)}else{c("Đang khởi động game..."),await oe("launch_game_direct",{appId:n}),Ye(!0);return}}const Oe=await oe("launch_game",{appId:n,gameName:e,specialDenuvo:mi});Oe&&Oe.includes("LuaActive Gen3 successful")?c("Active thành công! Đang chạy game."):c("Đang chạy game."),Ye(!0)}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);console.error("[LAUNCH] Error:",Ue),L(Ue),ce(!1),Ye(!1),Ue.includes("quá nhiều yêu cầu")||Ue.includes("giới hạn")?_t(Date.now()+30*1e3):_t(Date.now()+10*1e3),d(Ue||a("libraryDetail.launchFailed"))}finally{ze(!1)}},mn=async()=>{if(!re){u(a("libraryDetail.onlineNotAvailable"));return}Rt(!0),L(null);try{const Te=await oe("install_online_fix",{appId:n,gameName:e});console.debug("[ONLINE_FIX] Result:",Te),nt(!0),c(Te||a("libraryDetail.onlineFixApplied"))}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);console.error("[ONLINE_FIX] Error:",Ue),L(Ue),d(a("libraryDetail.onlineFixFailed"))}finally{Rt(!1)}},sn=async(Te=!1)=>{var Ue;if(rt(!1),!!(s!=null&&s.username)){_e(!0);try{let Oe=null;try{const at=await oe("fetch_ufs_save_paths",{appId:n,sessionToken:r??null,apiBase:Se??null});at&&at.length>0&&(Oe=at[0],console.log("[CLOUDSAVE] UFS path found:",Oe))}catch(at){console.warn("[CLOUDSAVE] UFS fetch failed, trying fallback:",at)}if(!Oe){if(!ci){d("Hệ thống hiện không có dữ liệu Save Path cho game này, không thể xác định vị trí Backup.",4e3);return}Oe=ci,console.log("[CLOUDSAVE] Using fallback path:",Oe)}await oe("cloudsave_upload",{appId:n,username:s.username,gameName:e,savePath:Oe,force:Te}),c("Backup thành công! Save đã được lưu lên cloud.")}catch(Oe){if(Oe&&Oe.type==="SteamIdMismatch"){const at=((Ue=Oe.data)==null?void 0:Ue.remote_id)??"khác";if(window.confirm(`⚠️ Cảnh báo: Bản Cloud Save này được tạo bởi Steam ID (${at}), khác với tài khoản Steam hiện tại của bạn.
    
Nếu tiếp tục Backup, dữ liệu cũ sẽ bị ghi đè. Bạn có chắc muốn tiếp tục không?`)){_e(!1),await sn(!0);return}}else Oe&&Oe.type==="NotFound"?d("Bạn chưa có bản Backup nào trên Cloud cho tựa game này."):d((Oe==null?void 0:Oe.data)??String(Oe))}finally{_e(!1)}}},Tn=async(Te=!1)=>{var Ue;if(rt(!1),!!(s!=null&&s.username)){Ve(!0);try{let Oe=null;try{const at=await oe("fetch_ufs_save_paths",{appId:n,sessionToken:r??null,apiBase:Se??null});at&&at.length>0&&(Oe=at[0],console.log("[CLOUDSAVE] Restore UFS path found:",Oe))}catch(at){console.warn("[CLOUDSAVE] Restore UFS fetch failed, trying fallback:",at)}if(!Oe){if(!ci){d("Hệ thống chưa có Data Save Path cho game này, không thể tự động Restore.",4e3);return}Oe=ci,console.log("[CLOUDSAVE] Restore using fallback path:",Oe)}await oe("cloudsave_download",{appId:n,username:s.username,savePath:Oe,force:Te}),c("Restore thành công! Chúc bạn chơi game vui vẻ.")}catch(Oe){if(Oe&&Oe.type==="SteamIdMismatch"){const at=((Ue=Oe.data)==null?void 0:Ue.remote_id)??"khác";if(window.confirm(`⚠️ Cảnh báo: Bản Cloud Save này được tạo bởi Steam ID ($ {
      at
    }), khác với tài khoản Steam hiện tại.

Nếu Restore, save của bạn có thể bị lỗi hoặc bị ghi đè. Bạn vẫn muốn tiếp tục không?`)){Ve(!1),await Tn(!0);return}}else Oe&&Oe.type==="NotFound"?d("Bạn chưa có bản Backup nào trên Cloud cho tựa game này."):d((Oe==null?void 0:Oe.data)??String(Oe))}finally{Ve(!1)}}},xi=async()=>{if(re)try{const Te=await oe("apply_goslynk_online_fix",{appId:n});c(Te||"Đã áp dụng Online Fix thành công!"),Qe(!1)}catch(Te){d((Te==null?void 0:Te.data)??String(Te))}},Qa=async()=>{if(re)try{await oe("browse_game_folder",{appId:n,gameName:e})}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);console.error("[BROWSE_LOCAL_FILES] Error:",Ue),d("Không mở được thư mục game. Vui lòng thử lại sau.")}finally{Qe(!1)}},pa=async(Te,Ue)=>{if(!re){u(a("libraryDetail.desktopOnly"));return}if(!fe){u("Bạn cần cài game trước.");return}if(!se)try{let Oe=Te;if(Ue){const at=Ue==="main"?hn==null?void 0:hn.priceMain:hn==null?void 0:hn.priceVh,Ut=await oe("get_machine_hwid").catch(()=>""),dn=await(await fetch(`$ {
      Se
    }
    /api/bypass/secondary-link/purchase/$ {
      encodeURIComponent(n)
    }
    `,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer $ {
      localStorage.getItem("sessionId")||""
    }
    `,"X-Hardware-Id":Ut},body:JSON.stringify({type:Ue})})).json();if(!(dn!=null&&dn.success))throw new Error((dn==null?void 0:dn.message)||"Đổi link thất bại");Oe=dn.url}if(!Oe){const at=await oe("get_machine_hwid").catch(()=>""),Yt=await(await fetch(`$ {
      Se
    }
    /api/bypass/secondary-link/$ {
      encodeURIComponent(n)
    }
    `,{headers:{Authorization:`Bearer $ {
      localStorage.getItem("sessionId")||""
    }
    `,"X-Hardware-Id":at}})).json();if(!(Yt!=null&&Yt.success)||!(Yt!=null&&Yt.url))throw new Error("Không tìm thấy link Secondary Download cho game này.");if(typeof Yt.url=="object")if(Yt.url.main!==void 0&&Yt.url.vh!==void 0){_n(Yt.url);return}else Oe=Yt.url.main||Yt.url.vh;else Oe=(Yt.url||"").toString().trim()}if(!Oe||typeof Oe!="string")throw new Error("Vui lòng quy đổi để tải.");Qe(!1),await Q(n,e,Oe)}catch(Oe){const at=Oe instanceof Error?Oe.message:String(Oe);console.error("[SECONDARY_DOWNLOAD] Error:",at),d(at||"Secondary Download thất bại.")}},Wv=async()=>{if(re){lt(!0),Qe(!1),f("Đang tự động tải squad mới nhất...");try{await oe("download_ea_squad",{appId:n}),c("Cập nhật Squad thành công!")}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);console.error("[DOWNLOAD_SQUAD] Error:",Ue),d("Tải Squad thất bại: "+Ue)}finally{lt(!1)}}},zu=["2054970","2246340","2852190","3764200","3357650"].includes(n),LB=async()=>{if(!(!re||Ot)){rn(!0),Qe(!1);try{const Te=await oe("find_game_install_dir",{appId:n,gameName:e});if(!Te)throw new Error("Không tìm được thư mục game.");const Ue=await oe("fix_re_engine_save",{appId:n,gamePath:Te});c(Ue||"Fix Save thành công!")}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);console.error("[FIX_SAVE] Error:",Ue),d(Ue||"Fix Save thất bại.")}finally{rn(!1)}}};g.useEffect(()=>{const Te=Ue=>{Yr.current&&!Yr.current.contains(Ue.target)&&Qe(!1)};if(Le)return document.addEventListener("mousedown",Te),()=>document.removeEventListener("mousedown",Te)},[Le]);const MB=()=>{if(!Le&&pr.current){const Te=pr.current.getBoundingClientRect(),Ue=300,at=window.innerHeight-Te.bottom-8<Ue&&Te.top>Ue;Ja({top:at?Math.max(8,Te.top-Ue-8):Te.bottom+8,right:window.innerWidth-Te.right}),Zc("general")}Qe(!Le)};g.useEffect(()=>{const Te=()=>{setTimeout(()=>{pr.current&&pr.current.click()},200)};return window.addEventListener("library-open-settings",Te),()=>window.removeEventListener("library-open-settings",Te)},[]);const AB=async()=>{if(re){Ke(!0);try{if(await oe("clean_game_dlls",{appId:n})){c("Đã verify game thành công!");return}const Ue=await oe("verify_game_files",{appId:n});console.debug("[VERIFY] Result:",Ue),c("Đang verify game. Hãy kiểm tra trong cửa sổ Steam.")}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);console.error("[VERIFY] Error:",Ue),d("Không thể verify. Vui lòng thử lại sau.")}finally{Ke(!1),Qe(!1)}}},i2=async Te=>{const Ue=await oe("find_game_install_dir",{appId:n,gameName:e});if(!Ue)throw new Error("Không tìm được thư mục game Ubi.");const Oe=await oe("start_ubi_reactivation",{appId:n,gameDir:Ue,gameName:e,paidSkip:Te});console.debug("[RE_ACTIVATE][UBI] Result:",Oe),xs(Date.now()+5*60*1e3),c("Ubi Re-activate thành công! Game đang mở..."),Oe==="launched"&&Ye(!0)},NB=async()=>{if(ha(!1),!s){d("Bạn cần đăng nhập để Re-activate.");return}if((s.p_balance??0)<Wo){d(`Không đủ G-Coin! (Cần $ {
      Wo.toLocaleString("vi-VN")
    }
     G)`);return}st(!0);try{const Te=await fetch(`$ {
      Se
    }
    /user/feature/unlock`,{method:"POST",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer $ {
      r
    }
    `}:{}},body:JSON.stringify({feature_id:"ubi_reactivate",steam_appid:n,game_name:e})}),Ue=await Te.json().catch(()=>({}));if(!Te.ok)throw new Error(Ue.message||"Thanh toán Re-activate thất bại");Ue.new_balance!=null&&s&&(s.p_balance=Ue.new_balance),await i2(!0)}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);d(Ue),xs(Date.now()+10*1e3)}finally{st(!1)}},RB=async()=>{if(!re)return;Qe(!1);const Te=Date.now();if(Kr&&Te<Kr){const Ue=Math.ceil((Kr-Te)/1e3);u(`Vui lòng đợi $ {
      Ue
    }
     giây trước khi thử lại`);return}if(jl){const Ue=Te-jl,Oe=10*1e3;if(Ue<Oe){const at=Math.ceil((Oe-Ue)/1e3);u(`Vui lòng đợi $ {
      at
    }
     giây trước khi click lại`);return}}st(!0),wt(5),ue("Đang Re-activate game..."),Ne(!0),Pl(Te);try{if(Ws){const Oe=await oe("find_game_install_dir",{appId:n,gameName:e});if(!Oe)throw new Error("Không tìm được thư mục game EA.");const at=await oe("start_ea_activation",{appId:n,gameDir:Oe});console.debug("[RE_ACTIVATE][EA] Result:",at),xs(Te+5*60*1e3),c("EA Active thành công! Game đang mở..."),at==="launched"&&Ye(!0);return}if(Hr){const Oe=await oe("check_ubi_play_quota",{appId:n}).catch(()=>null);if(!((Oe==null?void 0:Oe.can_gen)??!0)){Qc((Oe==null?void 0:Oe.hours_until_reset)??24),$u((Oe==null?void 0:Oe.paid_skip_cost)??5e4),ha(!0),st(!1);return}await i2(!1);return}const Ue=await oe("re_activate_game_command",{appId:n,gameName:e});console.debug("[RE_ACTIVATE] Result:",Ue),xs(Te+5*60*1e3),c("Active thành công! Đang chạy lại game.")}catch(Ue){const Oe=Ue instanceof Error?Ue.message:String(Ue);console.error("[RE_ACTIVATE] Error:",Oe),xs(Te+10*1e3),d(`Active thất bại: $ {
      Oe
    }
    `)}finally{st(!1),Qe(!1)}},jB=()=>{Qe(!1),setTimeout(()=>{ln(!0)},100)},PB=async()=>{if(ln(!1),!!re){xt(!0);try{await oe("cleanup_game_files",{appId:n,filesToRemove:[]}),Pe(!1),ce(!1),c(`Đã xóa game $ {
      Ho||n
    }
     thành công`)}catch(Te){const Ue=Te instanceof Error?Te.message:String(Te);console.error("[REMOVE_GAME] Error:",Ue),d("Không thể xóa game. Vui lòng thử lại sau.")}finally{xt(!1)}}},r2=()=>{ln(!1)};return l.jsxs("div",{className:"library-detail",children:[l.jsxs("div",{className:`library-detail-banner$ {
      w?" has-header-bg":""
    }
    `,style:w?{"--library-header-url":`url($ {
      w
    })`}:{},children:[Ni&&l.jsx("img",{src:Ni,alt:Ho,className:"library-detail-banner-img"}),l.jsx("div",{className:"library-detail-banner-overlay",children:l.jsx("div",{className:"library-detail-banner-content",children:l.jsx("div",{className:"library-detail-banner-main",children:l.jsxs("div",{className:"library-detail-actions",children:[l.jsxs("div",{className:"library-detail-actions-left",children:[Fe&&bt?l.jsxs("button",{className:"library-detail-install-btn",disabled:!0,title:a("libraryDetail.vipExpiredTooltip"),children:[l.jsx(sf,{size:14}),a("libraryDetail.vipExpired")]}):ke&&fe?ve?l.jsxs("button",{className:"library-detail-install-btn play",onClick:Dt,disabled:de||!re||Xe||Fe||Jt>0,title:re?Fe?"Game VIP đã hết hạn":Jt>0?`Vui lòng đợi $ {
      Jt
    }
    s`:void 0:"Chỉ khả dụng trên ứng dụng desktop",children:[l.jsx(KI,{size:14}),de?"Launching...":Jt>0?`Wait $ {
      Jt
    }
    s`:Xe?"Playing":"PLAY"]}):Mt?l.jsxs("button",{className:"library-detail-install-btn",onClick:mn,disabled:ft||!re||Fe,title:re?Fe?a("libraryDetail.vipExpiredTooltipShort"):void 0:a("libraryDetail.desktopOnly"),children:[l.jsx(sf,{size:14}),a(ft?"libraryDetail.downloading":"libraryDetail.online")]}):l.jsxs("button",{className:"library-detail-install-btn play",onClick:Dt,disabled:de||!re||Xe||Fe||Jt>0,title:re?Fe?"Game VIP đã hết hạn":Jt>0?`Vui lòng đợi $ {
      Jt
    }
    s`:void 0:"Chỉ khả dụng trên ứng dụng desktop",children:[l.jsx(KI,{size:14}),de?"Launching...":Jt>0?`Wait $ {
      Jt
    }
    s`:Xe?"Playing":"PLAY"]}):ke?l.jsxs("button",{className:"library-detail-install-btn",onClick:Ya?void 0:Et,disabled:Ya||z||!re||Fe||!dt,title:Ya||z?a("libraryDetail.installing"):re?Fe?a("libraryDetail.vipExpiredTooltipShort"):dt?void 0:a("libraryDetail.needVipToInstall"):a("libraryDetail.desktopOnly"),children:[l.jsx(sf,{size:14}),a(Ya||z?"libraryDetail.installing":"libraryDetail.install")]}):l.jsxs("button",{className:"library-detail-install-btn",onClick:Et,disabled:z||!re||Fe||!dt,title:re?Fe?a("libraryDetail.vipExpiredTooltipShort"):dt?void 0:a("libraryDetail.needVipToInstall"):a("libraryDetail.desktopOnly"),children:[l.jsx(sf,{size:14}),a(z?"libraryDetail.installing":"libraryDetail.installButton")]}),l.jsxs("div",{className:"library-detail-cloudsave-wrapper",style:{display:"flex",alignItems:"center",gap:"10px"},children:[l.jsxs("button",{className:"library-detail-cloudsave-btn",disabled:!re,title:"Cloud Save (Tự động đồng bộ hóa Save Game)",style:{cursor:re?"default":"not-allowed",position:"relative"},children:[l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",style:{opacity:pe||Ge?.2:1,transition:"opacity 0.2s"},children:l.jsx("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4s1.79-4 4-4h.71C7.37 7.69 9.48 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3s-1.34 3-3 3z"})}),(pe||Ge)&&l.jsx("div",{style:{position:"absolute",top:0,left:0,right:0,bottom:0,display:"flex",alignItems:"center",justifyContent:"center"},children:l.jsx("span",{className:"library-detail-cloudsave-spinner",style:{width:14,height:14,borderWidth:2}})})]}),re&&l.jsxs("div",{className:"library-detail-cloudsave-actions",style:{display:"flex",gap:"10px"},children:[l.jsx("button",{className:"library-detail-install-btn",onClick:()=>sn(),disabled:pe||Ge,children:l.jsx("span",{children:"Sao Lưu Tiến Trình"})}),l.jsx("button",{className:"library-detail-install-btn",onClick:()=>Tn(),disabled:pe||Ge,children:l.jsx("span",{children:"Khôi Phục Tiến Trình"})})]})]})]}),l.jsx("div",{className:"library-detail-actions-right",children:l.jsxs("div",{className:"library-detail-settings-wrapper",ref:Yr,children:[l.jsx("button",{ref:pr,className:"library-detail-icon-btn",title:a("libraryDetail.settings")||"Settings",onClick:MB,disabled:$e,children:l.jsx(zH,{size:16})}),Le&&ma&&l.jsxs("div",{className:"library-detail-settings-menu",onClick:Te=>Te.stopPropagation(),style:{top:`$ {
      ma.top
    }
    px`,right:`$ {
      ma.right
    }
    px`},children:[l.jsxs("div",{className:"library-detail-settings-menu-tabs",children:[l.jsx("button",{type:"button",className:`library-detail-settings-menu-tab$ {
      Dl==="general"?" active":""
    }
    `,onClick:()=>Zc("general"),children:"General"}),l.jsx("button",{type:"button",className:`library-detail-settings-menu-tab$ {
      Dl==="more"?" active":""
    }
    `,onClick:()=>Zc("more"),children:"More"})]}),l.jsxs("div",{className:"library-detail-settings-menu-body",children:[Dl==="general"&&l.jsxs(l.Fragment,{children:[mi&&l.jsx("button",{className:"library-detail-settings-menu-item",title:"Verify game installation and check for missing files",onClick:AB,disabled:Ee||!re,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:"Verify Game Files"})}),(Nr||Hr||Ws)&&l.jsx("button",{className:"library-detail-settings-menu-item",title:"Re-activate game DRM (Denuvo)",onClick:RB,disabled:$e||!re||qa>0||!ke||!fe,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:"Re-Activate Game"})}),l.jsx("button",{className:"library-detail-settings-menu-item",title:"Insert Online Fix configuration into game files",onClick:xi,disabled:!re||!ke||!fe,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:"Goslynk Online Fix"})}),l.jsx("button",{className:"library-detail-settings-menu-item",title:"Open game installation folder on your PC",onClick:Qa,disabled:!re||!ke||!fe,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:"Browse Local Files"})}),l.jsx("button",{className:"library-detail-settings-menu-item",title:"Download + extract patch/việt hóa",onClick:()=>pa(),disabled:!re||!fe||se,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:"Secondary Download"})}),se&&l.jsxs("div",{className:"library-detail-secondary-progress in-menu",children:[l.jsx("div",{className:"library-detail-secondary-progress-bar",children:l.jsx("div",{className:"library-detail-secondary-progress-fill",style:{width:`$ {
      ee
    }
    %`}})}),l.jsxs("div",{className:"library-detail-secondary-progress-text",children:[he||"Đang xử lý..."," • ",ee,"%"]})]}),Ws&&l.jsx("button",{className:"library-detail-settings-menu-item",title:"Tự động tải cập nhật Squad mới nhất",onClick:Wv,disabled:!re||et,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:"Squad Update"})}),zu&&l.jsx("button",{className:"library-detail-settings-menu-item",title:"Resign save file cho SteamID hiện tại",onClick:LB,disabled:!re||Ot,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:Ot?"Đang Fix Save...":"Fix Save (RE Engine)"})})]}),Dl==="more"&&l.jsxs(l.Fragment,{children:[l.jsx("button",{className:"library-detail-settings-menu-item",title:"Gửi log cài đặt cho admin để kiểm tra lỗi",onClick:async()=>{if(!(fn||Date.now()<kt)){on(!0);try{const Te=await oe("get_diagnostic_log",{appId:n}),Oe=await(await fetch(`$ {
      Se
    }
    /api/diagnostics/report`,{method:"POST",headers:{"Content-Type":"application/json",...r?{Authorization:`Bearer $ {
      r
    }
    `}:{}},body:JSON.stringify({logs:JSON.parse(Te),game_id:n,game_name:e})})).json();Oe.success?(c("Đã gửi báo cáo thành công!"),Gt(Date.now()+60*1e3)):d(Oe.message||"Gửi báo cáo thất bại")}catch{d("Không thể gửi báo cáo")}finally{on(!1),Qe(!1)}}},disabled:fn||!re||Date.now()<kt,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:"Report Issue"})}),l.jsx("div",{className:"library-detail-settings-menu-separator"}),l.jsx("button",{className:"library-detail-settings-menu-item danger",title:"Remove for this game in library steam",onClick:jB,disabled:ot||!re,children:l.jsx("span",{className:"library-detail-settings-menu-title",children:"Remove Game Files"})})]})]})]})]})})]})})})})]}),ye&&l.jsxs("div",{className:"library-detail-activation-progress",children:[l.jsx("div",{className:"library-detail-secondary-progress-bar",children:l.jsx("div",{className:"library-detail-secondary-progress-fill",style:{width:`$ {
      Ct
    }
    %`}})}),l.jsxs("div",{className:"library-detail-secondary-progress-text",children:[Z||"Đang xử lý..."," • ",Ct,"%"]})]}),Ot&&l.jsxs("div",{className:"library-detail-activation-progress",children:[l.jsx("div",{className:"library-detail-secondary-progress-bar",children:l.jsx("div",{className:"library-detail-secondary-progress-fill fix-save-pulse",style:{width:"100%"}})}),l.jsx("div",{className:"library-detail-secondary-progress-text",children:"🔧 Đang Fix Save... Quét SteamID và resign file save (có thể mất 10-30 giây)"})]}),l.jsxs("div",{className:"library-detail-nav",children:[l.jsx("button",{className:"library-detail-nav-item active",onClick:je,"data-tutorial-id":"library-detail-store",children:a("libraryDetail.storePage")}),l.jsx("button",{className:"library-detail-nav-item",children:a("libraryDetail.dlc")}),l.jsx("button",{className:"library-detail-nav-item",children:a("libraryDetail.communityHub")}),l.jsx("button",{className:"library-detail-nav-item",children:a("libraryDetail.discussions")}),l.jsx("button",{className:"library-detail-nav-item",children:a("libraryDetail.guides")}),l.jsx("button",{className:"library-detail-nav-item",children:a("libraryDetail.support")})]}),l.jsx("div",{className:"library-detail-content",children:l.jsxs("div",{className:"library-detail-left",children:[l.jsxs("div",{className:"library-detail-section",children:[l.jsxs("div",{className:"library-detail-section-header",children:[l.jsx("span",{className:"library-detail-section-highlight",children:a("libraryDetail.featured")}),T.length>1&&l.jsx("button",{className:"library-detail-view-all-btn",onClick:()=>_(!C),children:a(C?"libraryDetail.showLess":"libraryDetail.viewAll")})]}),x?l.jsx("div",{className:"library-detail-empty",children:a("libraryDetail.loadingNews")}):T.length>0?l.jsx("div",{className:"library-detail-news-list",children:(C?T:[T[0]]).map(Te=>l.jsxs("div",{className:"library-detail-news-item",onClick:()=>Je(Te),children:[l.jsx("div",{className:"library-detail-news-date",children:Y(Te.date)}),l.jsxs("div",{className:"library-detail-news",children:[Be(Te.contents)&&l.jsx("div",{className:"library-detail-news-image",children:l.jsx("img",{src:Be(Te.contents)||Ni||"",alt:Te.title,loading:"lazy",onError:Ue=>{const Oe=Ue.target;Ni&&Oe.src!==Ni?Oe.src=Ni||"":Oe.style.display="none"}})}),l.jsxs("div",{className:"library-detail-news-content",children:[l.jsx("div",{className:"library-detail-news-label",children:Te.feedlabel||a("libraryDetail.news")}),l.jsx("div",{className:"library-detail-news-title",children:Te.title}),l.jsxs("div",{className:"library-detail-news-text",children:[xe(Te.contents).substring(0,150),xe(Te.contents).length>150?"...":""]})]})]})]},Te.gid))}):v!=null&&v.short_description?l.jsxs("div",{className:"library-detail-news",children:[l.jsx("div",{className:"library-detail-news-image",children:Ni&&l.jsx("img",{src:Ni,alt:Ho})}),l.jsxs("div",{className:"library-detail-news-content",children:[l.jsx("div",{className:"library-detail-news-title",children:Ho}),l.jsx("div",{className:"library-detail-news-text",children:v.short_description})]})]}):l.jsx("div",{className:"library-detail-empty",children:a("libraryDetail.noFeaturedContent")})]}),l.jsxs("div",{className:"library-detail-section",children:[l.jsx("div",{className:"library-detail-section-header",children:l.jsx("span",{children:a("libraryDetail.activity")})}),l.jsx("div",{className:"library-detail-activity",children:l.jsx("div",{className:"library-detail-activity-placeholder",children:a("libraryDetail.activityPlaceholder")})})]})]})}),M&&l.jsx("div",{className:"library-detail-news-modal",onClick:ht,children:l.jsxs("div",{className:"library-detail-news-modal-content",onClick:Te=>Te.stopPropagation(),children:[l.jsx("button",{className:"library-detail-news-modal-close",onClick:ht,children:"×"}),l.jsx("div",{className:"library-detail-news-modal-banner",children:Be(B||M.contents)?l.jsx("img",{src:Be(B||M.contents)||Ni||"",alt:M.title,onError:Te=>{const Ue=Te.target;Ni&&Ue.src!==Ni?Ue.src=Ni||"":Ue.style.display="none"}}):Ni?l.jsx("img",{src:Ni,alt:M.title}):null}),l.jsxs("div",{className:"library-detail-news-modal-header",children:[l.jsxs("div",{className:"library-detail-news-modal-meta",children:[l.jsx("div",{className:"library-detail-news-modal-label",children:M.feedlabel||a("libraryDetail.news")}),l.jsx("div",{className:"library-detail-news-modal-date-full",children:we(M.date)})]}),l.jsx("h1",{className:"library-detail-news-modal-title",children:M.title}),l.jsx("div",{className:"library-detail-news-modal-description",children:W?l.jsx("div",{className:"library-detail-news-modal-loading",children:a("libraryDetail.loadingContent")}):l.jsx("div",{className:"library-detail-news-modal-text",children:xe(B||M.contents)})}),(()=>{const Te=ne(B||M.contents);return Te?l.jsx("a",{href:Te.url,target:"_blank",rel:"noopener noreferrer",className:"library-detail-news-modal-action-link",children:Te.text}):M.url?l.jsx("a",{href:M.url,target:"_blank",rel:"noopener noreferrer",className:"library-detail-news-modal-action-link",children:a("libraryDetail.viewOnSteam")}):null})()]}),l.jsx("div",{className:"library-detail-news-modal-footer",children:l.jsxs("div",{className:"library-detail-news-modal-actions",children:[l.jsxs("button",{className:"library-detail-news-modal-action-btn rate-up",children:[l.jsx("span",{className:"library-detail-news-modal-icon",children:"👍"}),l.jsx("span",{className:"library-detail-news-modal-count",children:be.toLocaleString()}),l.jsx("span",{className:"library-detail-news-modal-action-label",children:a("libraryDetail.rateUp")})]}),l.jsxs("button",{className:"library-detail-news-modal-action-btn rate-down",children:[l.jsx("span",{className:"library-detail-news-modal-icon",children:"👎"}),l.jsx("span",{className:"library-detail-news-modal-action-label",children:a("libraryDetail.rateDown")})]}),l.jsxs("button",{className:"library-detail-news-modal-action-btn discuss",children:[l.jsx("span",{className:"library-detail-news-modal-icon",children:"💬"}),l.jsx("span",{className:"library-detail-news-modal-count",children:X.toLocaleString()}),l.jsx("span",{className:"library-detail-news-modal-action-label",children:a("libraryDetail.discuss")})]}),l.jsxs("button",{className:"library-detail-news-modal-action-btn share",children:[l.jsx("span",{className:"library-detail-news-modal-icon",children:"🔗"}),l.jsx("span",{className:"library-detail-news-modal-action-label",children:a("libraryDetail.share")})]})]})})]})}),On&&l.jsx("div",{className:"library-detail-remove-dialog-overlay",onClick:r2,children:l.jsxs("div",{className:"library-detail-remove-dialog",onClick:Te=>Te.stopPropagation(),children:[l.jsxs("div",{className:"library-detail-remove-dialog-header",children:[l.jsx("div",{className:"library-detail-remove-dialog-icon",children:"⚠️"}),l.jsx("div",{className:"library-detail-remove-dialog-title",children:"Goslynk Launcher"})]}),l.jsxs("div",{className:"library-detail-remove-dialog-content",children:[l.jsx("div",{className:"library-detail-remove-dialog-message",children:"Bạn có chắc là muốn xóa game này hay không?"}),l.jsx("div",{className:"library-detail-remove-dialog-game-name",children:Ho||n})]}),l.jsxs("div",{className:"library-detail-remove-dialog-actions",children:[l.jsx("button",{className:"library-detail-remove-dialog-btn library-detail-remove-dialog-btn-cancel",onClick:r2,disabled:ot,children:"Hủy bỏ"}),l.jsx("button",{className:"library-detail-remove-dialog-btn library-detail-remove-dialog-btn-confirm",onClick:PB,disabled:ot,children:ot?"Đang xóa...":"OK"})]})]})}),Vo&&l.jsx("div",{className:"library-detail-remove-dialog-overlay",onClick:()=>ha(!1),children:l.jsxs("div",{className:"library-detail-remove-dialog",onClick:Te=>Te.stopPropagation(),children:[l.jsxs("div",{className:"library-detail-remove-dialog-header",children:[l.jsx("div",{className:"library-detail-remove-dialog-icon",children:"✦"}),l.jsx("div",{className:"library-detail-remove-dialog-title",children:"Re-activate"})]}),l.jsx("div",{className:"library-detail-remove-dialog-content",children:l.jsxs("div",{className:"library-detail-remove-dialog-message",children:["Bạn đã hết lượt gen miễn phí (1 lần/24h).",Jc>0&&l.jsxs(l.Fragment,{children:[" Thử lại sau khoảng ",Jc.toFixed(1)," giờ, hoặc trả ",Wo.toLocaleString("vi-VN")," G để Re-activate ngay."]})]})}),l.jsxs("div",{className:"library-detail-remove-dialog-actions",children:[l.jsx("button",{className:"library-detail-remove-dialog-btn library-detail-remove-dialog-btn-cancel",onClick:()=>ha(!1),children:"Đợi"}),l.jsx("button",{className:"library-detail-remove-dialog-btn library-detail-remove-dialog-btn-confirm",onClick:NB,disabled:$e,children:$e?"Đang xử lý...":`Trả $ {
      Wo.toLocaleString("vi-VN")
    }
     G`})]})]})}),hn&&l.jsx("div",{className:"library-detail-remove-dialog-overlay",style:{backdropFilter:"blur(5px)",backgroundColor:"rgba(0, 0, 0, 0.7)"},onClick:()=>{_n(null),zi(null)},children:l.jsxs("div",{className:"secondary-dl-modal",onClick:Te=>Te.stopPropagation(),children:[l.jsxs("div",{style:{padding:"24px 24px 16px",borderBottom:"1px solid rgba(255,255,255,0.05)"},children:[l.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[l.jsxs("h3",{style:{margin:0,color:"#fff",fontSize:18,fontWeight:600,letterSpacing:.5,display:"flex",alignItems:"center",gap:10},children:[l.jsx(sf,{size:16,color:"#76a9ff"})," Download Options"]}),l.jsx("button",{onClick:()=>{_n(null),zi(null)},style:{background:"transparent",border:"none",color:"#6b7280",cursor:"pointer",fontSize:24,padding:0,lineHeight:1},children:"×"})]}),l.jsx("p",{style:{margin:"8px 0 0",color:"#9ca3af",fontSize:14},children:Pn?"Xác nhận đổi lượt tải":"Vui lòng chọn phiên bản bạn muốn tải:"})]}),l.jsx("div",{style:{padding:24,display:"flex",flexDirection:"column",gap:12},children:Pn?l.jsxs("div",{style:{textAlign:"center"},children:[l.jsxs("p",{style:{color:"#e5e7eb",fontSize:15,marginBottom:20},children:["Bạn có chắc chắn muốn dùng ",l.jsxs("strong",{style:{color:Pn.type==="main"?"#76a9ff":"#10b981",fontSize:18},children:[Pn.price," G"]})," để đổi lấy ",Pn.type==="main"?"Link Game (Bản Gốc)":"Link Việt Hóa"," không?"]}),l.jsxs("div",{style:{display:"flex",gap:10},children:[l.jsx("button",{className:"library-detail-btn",onClick:()=>zi(null),style:{flex:1,background:"rgba(255,255,255,0.1)",border:"none",borderRadius:8},children:"Hủy Bỏ"}),l.jsx("button",{className:"library-detail-btn primary",onClick:()=>{pa(void 0,Pn.type),_n(null),zi(null)},style:{flex:1,background:Pn.type==="main"?"#76a9ff":"#10b981",color:"#11151d",fontWeight:700,border:"none",borderRadius:8},children:"Xác Nhận"})]})]}):l.jsxs(l.Fragment,{children:[hn.main!==void 0&&l.jsxs("button",{className:"secondary-dl-btn secondary-dl-btn-main",onClick:()=>{!hn.ownedMain&&(hn.priceMain||0)>0?zi({type:"main",price:hn.priceMain||0}):(pa(hn.main),_n(null))},children:[l.jsx("span",{children:"Link Game (Bản Gốc)"}),!hn.ownedMain&&(hn.priceMain||0)>0?l.jsxs("span",{style:{background:"rgba(118, 169, 255, 0.2)",color:"#76a9ff",padding:"4px 10px",borderRadius:20,fontSize:13,fontWeight:600},children:[hn.priceMain," G"]}):l.jsx("span",{style:{color:"#76a9ff",fontSize:13,fontWeight:600},children:"Sẵn Sàng"})]}),hn.vh!==void 0&&l.jsxs("button",{className:"secondary-dl-btn secondary-dl-btn-vh",onClick:()=>{!hn.ownedVh&&(hn.priceVh||0)>0?zi({type:"vh",price:hn.priceVh||0}):(pa(hn.vh),_n(null))},children:[l.jsx("span",{children:"Link Việt Hóa"}),!hn.ownedVh&&(hn.priceVh||0)>0?l.jsxs("span",{style:{background:"rgba(16, 185, 129, 0.2)",color:"#10b981",padding:"4px 10px",borderRadius:20,fontSize:13,fontWeight:600},children:[hn.priceVh," G"]}):l.jsx("span",{style:{color:"#10b981",fontSize:13,fontWeight:600},children:"Sẵn Sàng"})]})]})})]})}),zo&&ae&&l.jsx("div",{className:"library-detail-remove-dialog-overlay",children:l.jsxs("div",{className:"library-detail-remove-dialog",onClick:Te=>Te.stopPropagation(),style:{maxWidth:380,padding:0},children:[l.jsxs("div",{className:"library-detail-remove-dialog-header",style:{padding:"20px 20px 10px 20px",background:ae==="denuvo"?"rgba(239,68,68,0.12)":"rgba(245,158,11,0.08)"},children:[l.jsx("div",{className:"library-detail-remove-dialog-icon",children:ae==="denuvo"?"⚠️":"📦"}),l.jsx("div",{className:"library-detail-remove-dialog-title",style:{fontSize:15},children:ae==="denuvo"?"Lưu ý trước khi chơi!":"Game đã tải xong!"})]}),l.jsx("div",{className:"library-detail-remove-dialog-content",style:{padding:"16px 20px 20px 20px"},children:l.jsx("div",{className:"library-detail-remove-dialog-message",style:{fontSize:13,lineHeight:1.7,color:"#d1d5db"},children:ae==="denuvo"?"Game này yêu cầu xác thực lần đầu. Vui lòng bấm PLAY ngay tại đây để hoàn tất cài đặt trước khi chơi.":"Game của bạn đã sẵn sàng. Nếu gặp lỗi trong quá trình chơi, hãy vào Cài đặt (⚙️) và bấm Secondary Download để cài thêm file đính kèm."})}),l.jsx("div",{className:"library-detail-remove-dialog-actions",style:{padding:"12px 20px",justifyContent:"center",borderTop:"1px solid rgba(255,255,255,0.05)",background:"rgba(0,0,0,0.2)"},children:l.jsx("button",{className:"library-detail-remove-dialog-btn library-detail-remove-dialog-btn-confirm",onClick:()=>ua(!1),style:{padding:"8px 28px",fontSize:13},children:"Đã hiểu"})})]})}),it&&Bt&&l.jsx("div",{className:"library-detail-remove-dialog-overlay",style:{zIndex:99999999},children:l.jsxs("div",{className:"library-detail-remove-dialog",onClick:Te=>Te.stopPropagation(),style:{maxWidth:380,padding:0},children:[l.jsxs("div",{className:"library-detail-remove-dialog-header",style:{padding:"20px 20px 10px 20px",background:Bt==="denuvo"?"rgba(239,68,68,0.12)":"rgba(56,189,248,0.12)"},children:[l.jsx("div",{className:"library-detail-remove-dialog-icon",children:Bt==="denuvo"?"⚠️":"ℹ️"}),l.jsx("div",{className:"library-detail-remove-dialog-title",style:{fontSize:15},children:Bt==="denuvo"?"Lưu ý quan trọng!":"Thông báo cài đặt"})]}),l.jsx("div",{className:"library-detail-remove-dialog-content",style:{padding:"16px 20px 20px 20px"},children:l.jsx("div",{className:"library-detail-remove-dialog-message",style:{fontSize:13,lineHeight:1.7,color:"#d1d5db"},children:Bt==="denuvo"?"Lưu ý: Game này yêu cầu xác thực lần đầu. Sau khi Steam tải xong, bạn bắt buộc phải quay lại App để bấm nút PLAY lần đầu!":Bt==="auto"?"Lưu ý: App sẽ tự động cài thêm file đính kèm bắt buộc cho game này ngay sau khi Steam tải xong. nếu gặp lỗi báo cho admin.":"Lưu ý: Game này có thể cần cài thêm file đính kèm để chơi ổn định!"})}),l.jsx("div",{className:"library-detail-remove-dialog-actions",style:{padding:"12px 20px",justifyContent:"center",borderTop:"1px solid rgba(255,255,255,0.05)",background:"rgba(0,0,0,0.2)"},children:l.jsx("button",{className:"library-detail-remove-dialog-btn library-detail-remove-dialog-btn-confirm",onClick:()=>St(!1),style:{padding:"8px 28px",fontSize:13},children:"Đã hiểu"})})]})})]})}function M_(n){if(!n)return"";try{const e=new URL(Se),t=new URL(po);if(n.startsWith("/"))return new URL(n,po).toString();const i=new URL(n);return i.host===e.host&&(i.protocol=t.protocol,i.host=t.host),i.toString()}catch{return n.startsWith("/")?`$ {
      po
    }
    $ {
      n
    }
    `:n}}function nX(){var Ae,dt,Wt;const{user:n,sessionId:e,checkAuth:t}=nn(),{t:i}=ni(),r=oi(),s=br(),{startTutorial:a,isActive:o}=la(),[c,d]=g.useState([]),[u,f]=g.useState(!0),[h,m]=g.useState(null),[p,y]=g.useState(null),[v,b]=g.useState(null),[w,S]=g.useState(12),[T,E]=g.useState(""),[x,k]=g.useState(""),[C,_]=g.useState(!1),[M,j]=g.useState(!1),B=g.useRef(null),[G,W]=g.useState(0),[U,q]=g.useState(0),[Q,te]=g.useState({}),[ee,he]=g.useState(!1),me=g.useRef(null),se=g.useRef(null),be=g.useRef(!1),K=g.useRef(!1),[X,$]=g.useState("default"),[z,D]=g.useState(!1),[R,L]=g.useState(!1),[A,N]=g.useState(!1),[V,O]=g.useState(!1),[F,J]=g.useState(()=>{const Le=localStorage.getItem("skipKillSteam");return Le===null?(localStorage.setItem("skipKillSteam","true"),!0):Le==="true"}),[re,ie]=g.useState(new Set),fe=g.useRef(null),[ce,ke]=g.useState(new Set),Pe=g.useRef(null),[de,ze]=g.useState(null),[Xe,Ye]=g.useState([]),ve=g.useRef(null);g.useEffect(()=>{const Le=Qe=>{ze(null),ve.current&&!ve.current.contains(Qe.target)&&L(!1)};return window.addEventListener("click",Le),window.addEventListener("scroll",Le,!0),()=>{window.removeEventListener("click",Le),window.removeEventListener("scroll",Le,!0)}},[]),g.useEffect(()=>{(async()=>{const Qe="steam_whats_new_v2",ot="steam_whats_new_time_v2",xt=Date.now(),Ee=localStorage.getItem(Qe),Ke=localStorage.getItem(ot);if(Ee&&Ke&&xt-parseInt(Ke,10)<72e5)try{const $e=JSON.parse(Ee);if($e&&$e.length>0){Ye($e);return}}catch{}try{let $e;if(zn())$e=await oe("fetch_steam_featured_categories");else{const ue=await fetch("/steam-proxy/api/featuredcategories/?l=vietnamese");if(!ue.ok)throw new Error("API res not OK");$e=await ue.json()}let st=[];const Ct=["specials","top_sellers"];for(const ue of Ct)$e[ue]&&Array.isArray($e[ue].items)&&(st=st.concat($e[ue].items));st.length===0&&Object.values($e).forEach(ue=>{ue&&Array.isArray(ue.items)&&ue.id!=="cat_spotlight"&&(st=st.concat(ue.items))});const wt=[],Z=new Set;for(const ue of st){const ye=ue.id;ye&&!Z.has(String(ye))&&(Z.add(String(ye)),wt.push({id:ye,name:ue.name,header_image:ue.header_image||ue.large_capsule_image,discount_percent:ue.discount_percent||0}))}if(wt.length>0){const ue=wt.slice(0,10);Ye(ue),localStorage.setItem(Qe,JSON.stringify(ue)),localStorage.setItem(ot,xt.toString())}}catch($e){console.error("Failed to fetch steam featured categories",$e)}})()},[]);const nt=g.useRef(null),ft=g.useRef(!1);g.useEffect(()=>{e&&fetch(`$ {
      Se
    }
    /library/hidden`,{headers:{Authorization:`Bearer $ {
      e
    }
    `}}).then(Le=>Le.json()).then(Le=>{Le.success&&(Array.isArray(Le.hidden)&&ke(new Set(Le.hidden)),Le.filter_settings&&(typeof Le.filter_settings.hide18Plus=="boolean"&&N(Le.filter_settings.hide18Plus),typeof Le.filter_settings.hideCustom=="boolean"&&O(Le.filter_settings.hideCustom)))}).catch(()=>{}).finally(()=>{ft.current=!0})},[e]);const Rt=g.useCallback(Le=>{ke(Qe=>{const ot=new Set(Qe);return ot.has(Le)?ot.delete(Le):ot.add(Le),Pe.current&&clearTimeout(Pe.current),Pe.current=setTimeout(()=>{e&&fetch(`$ {
      Se
    }
    /library/hidden`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer $ {
      e
    }
    `},body:JSON.stringify({hidden:Array.from(ot)})}).catch(()=>{})},600),ot})},[e]);g.useEffect(()=>{!e||!ft.current||(nt.current&&clearTimeout(nt.current),nt.current=setTimeout(()=>{fetch(`$ {
      Se
    }
    /library/hidden`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer $ {
      e
    }
    `},body:JSON.stringify({filter_settings:{hide18Plus:A,hideCustom:V}})}).catch(()=>{})},600))},[A,V,e]),g.useEffect(()=>{if(!e)return;let Le=!1;return(async()=>{try{const ot=await fetch(`$ {
      Se
    }
    /games?filter=nsfw&limit=1000&page=1`,{headers:{Authorization:`Bearer $ {
      e
    }
    `}});if(!ot.ok||Le)return;const xt=await ot.json(),Ee=Array.isArray(xt)?xt:xt.data??[];Le||ie(new Set(Ee.map(Ke=>String(Ke.app_id))))}catch{}})(),()=>{Le=!0}},[e]);const Mt=32,Ze=2,Fe=g.useCallback(async(Le=0,Qe=!1)=>{let ot=!1;if(!e||!n){f(!1);return}try{j(Qe);const xt=1e3,Ee=async $e=>{let st=$e.purchases||[];const Ct=[],wt=new Map;st.forEach(Z=>{wt.has(Z.game_id)||wt.set(Z.game_id,[]),wt.get(Z.game_id).push(Z)});for(const[Z,ue]of wt.entries()){if(ue.length<=1)continue;const ye=ue.filter(et=>!et.is_vip),Ne=ue.filter(et=>et.is_vip);ye.length>0?Ne.forEach(et=>Ct.push(et.id)):Ne.length>1&&Ne.slice(1).forEach(et=>Ct.push(et.id))}if(Ct.length>0&&(await Promise.all(Ct.map(Z=>fetch(`$ {
      Se
    }
    /library/$ {
      Z
    }
    `,{method:"DELETE",headers:{Authorization:`Bearer $ {
      e
    }
    `}}).catch(()=>{}))),st=st.filter(Z=>!Ct.includes(Z.id))),d(Qe?Z=>{const ue=new Set(Z.map(Ne=>Ne.id)),ye=st.filter(Ne=>!ue.has(Ne.id));return ye.length===0?Z:[...Z,...ye]}:Z=>Z.length===st.length&&Z.every((ue,ye)=>ue.id===st[ye].id)?Z:st),_($e.has_more||!1),$e.deleted_game_ids&&$e.deleted_game_ids.length>0&&zn())try{await oe("cleanup_vip_expired",{appIds:$e.deleted_game_ids||[]}),$e.vip_expired&&window.dispatchEvent(new CustomEvent("vipExpired"))}catch{}if(zn()&&Array.isArray(st))try{const Z=st.map(Ne=>String(Ne.game_id)),ue=(n==null?void 0:n.role)||"",ye=await oe("cleanup_extra_lua_files",{validIds:Z,userRole:ue});ye>0&&console.log(`[CLEANUP] Đã xóa $ {
      ye
    }
     file lua không hợp lệ`)}catch(Z){console.error("[CLEANUP] Lỗi dọn dẹp lua:",Z)}},Ke=await B4(n.id,e,Le,xt,Ee);Ke&&await Ee(Ke),K.current=!0}catch(xt){m(xt instanceof Error?xt.message:i("library.failedToLoad"))}finally{f(!1),j(!1)}},[e,n,ee,i]);g.useEffect(()=>{if(!e||!n){f(!1);return}K.current||Fe(0,!1);const Le=async()=>{await Ey(n.id),Fe(0,!1)};window.addEventListener("libraryUpdated",Le);const Qe=async()=>{if(e)try{const Ee=await(await fetch(`$ {
      Se
    }
    /vip/check-expiry?sessionId=$ {
      e
    }
    `,{headers:{Authorization:`Bearer $ {
      e
    }
    `}})).json();if(Ee.success){if(Ee.deleted_game_ids&&Ee.deleted_game_ids.length>0&&ee)try{await oe("cleanup_vip_expired",{appIds:Ee.deleted_game_ids||[]})}catch{}Ee.vip_expired&&(await t(),Fe(0,!1))}}catch{}},ot=setInterval(()=>{Qe()},3e4);return()=>{clearInterval(ot),window.removeEventListener("libraryUpdated",Le)}},[e,n,ee,t,Fe]),g.useEffect(()=>{const Le=zn();he(Le)},[]),g.useEffect(()=>{const Le=B.current;if(!Le)return;const Qe=()=>{me.current&&clearTimeout(me.current),me.current=setTimeout(()=>{const ot=Le.clientHeight;ot>0&&q(ot)},150)};if(!u){const ot=Le.clientHeight;ot>0&&q(ot)}return window.addEventListener("resize",Qe,{passive:!0}),()=>{me.current&&clearTimeout(me.current),window.removeEventListener("resize",Qe)}},[c,u]);const le=()=>{B.current&&requestAnimationFrame(()=>{B.current&&W(B.current.scrollTop)})};g.useEffect(()=>(se.current&&clearTimeout(se.current),se.current=setTimeout(()=>{k(T)},300),()=>{se.current&&clearTimeout(se.current)}),[T]);const pe=g.useMemo(()=>{let Le=c;if(x.trim()){const Qe=x.toLowerCase();Le=Le.filter(ot=>{var xt;return(xt=ot.game_name)==null?void 0:xt.toLowerCase().includes(Qe)})}return z&&ee&&(Le=Le.filter(Qe=>Q[Qe.game_id]===!0)),A&&(Le=Le.filter(Qe=>!re.has(String(Qe.game_id)))),V?Le=Le.filter(Qe=>ce.has(Qe.game_id)):ce.size>0&&(Le=Le.filter(Qe=>!ce.has(Qe.game_id))),X==="name"?Le=[...Le].sort((Qe,ot)=>(Qe.game_name||"").localeCompare(ot.game_name||"","vi")):X==="date"&&(Le=[...Le].sort((Qe,ot)=>new Date(ot.purchased_at).getTime()-new Date(Qe.purchased_at).getTime())),Le},[c,x,z,ee,Q,X,A,V,ce,re]),_e=g.useMemo(()=>{const Le=new Map;return pe.forEach(Qe=>{Le.set(Qe.game_id,Qe)}),Le},[pe]),Ge=pe.length,Ve=U>0?U:window.innerHeight*.6,qe=Math.max(0,Math.floor(G/Mt)-Ze),rt=Math.min(Ge,Math.ceil((G+Ve)/Mt)+Ze),bt=g.useMemo(()=>pe.slice(qe,rt),[pe,qe,rt]),mt=g.useMemo(()=>pe.slice(0,w),[pe,w]),Nt=g.useRef(!1);return g.useEffect(()=>{if(!ee)return;Nt.current=!1;const Le=new Set([...bt.map(Ee=>Ee.game_id),...mt.map(Ee=>Ee.game_id)]),Qe=Array.from(Le).filter(Ee=>Q[Ee]===void 0);if(Qe.length===0)return;const ot=3;return(async()=>{for(let Ee=0;Ee<Qe.length&&!Nt.current;Ee+=ot){const Ke=Qe.slice(Ee,Ee+ot);await Promise.all(Ke.map(async $e=>{if(Nt.current)return;const st=_e.get($e);if(st)try{const Ct=await oe("check_game_installed_basic",{appId:st.game_id});Nt.current||te(wt=>wt[st.game_id]!==void 0?wt:{...wt,[st.game_id]:Ct})}catch{Nt.current||te(Ct=>Ct[st.game_id]!==void 0?Ct:{...Ct,[st.game_id]:!1})}})),Ee+ot<Qe.length&&await new Promise($e=>setTimeout($e,200))}})(),()=>{Nt.current=!0}},[bt,mt,ee,_e]),g.useEffect(()=>{var xt,Ee,Ke;if(!n||u||(!o&&be.current&&(be.current=!1),o||be.current))return;const Le=s.state&&s.state.replayTutorial==="library";if(!Le)return;if(!Le){if(!(((xt=n==null?void 0:n.tutorial_completed)==null?void 0:xt.welcome)===!0)||!(((Ee=n==null?void 0:n.tutorial_completed)==null?void 0:Ee.game_detail)===!0))return;if(((Ke=n==null?void 0:n.tutorial_completed)==null?void 0:Ke.library)===!0){be.current=!1;return}}be.current=!0;let Qe;c.length>0?Qe=[{id:"library-sidebar",target:".library-sidebar-list",title:i("tutorial.libraryPage.sidebar.title"),description:i("tutorial.libraryPage.sidebar.description"),position:"right"},{id:"library-game-card",target:".library-card",title:i("tutorial.libraryPage.gameCard.title"),description:i("tutorial.libraryPage.gameCard.description"),position:"bottom",navigateTo:"/store",tutorialKey:"library"}]:Qe=[{id:"library-empty",target:".library-main",title:"📚 Thư viện Game",description:"Đây là Thư viện Game của bạn. Hiện tại bạn chưa sở hữu tựa game nào, hãy sang Cửa hàng để mua nhé!",position:"top",navigateTo:"/store",tutorialKey:"library"}];const ot=setTimeout(()=>{a(Qe),Le&&r(s.pathname,{replace:!0,state:{...s.state,replayTutorial:void 0}})},800);return()=>clearTimeout(ot)},[n==null?void 0:n.id,u,c.length,a,i,o,(Ae=n==null?void 0:n.tutorial_completed)==null?void 0:Ae.welcome,(dt=n==null?void 0:n.tutorial_completed)==null?void 0:dt.game_detail,(Wt=n==null?void 0:n.tutorial_completed)==null?void 0:Wt.library]),l.jsx("div",{className:"library-page",children:l.jsxs("div",{className:"library-layout",children:[l.jsxs("aside",{className:"library-sidebar",children:[l.jsxs("div",{className:"library-sidebar-header",children:[l.jsx("div",{className:`library-home-title $ {
      v?"clickable":""
    }
    `,onClick:()=>{v&&(b(null),y(null))},children:i(v?"library.back":"library.home")}),l.jsx("div",{className:"library-filter-label",children:i("library.gamesAndSoftware")}),l.jsxs("div",{className:"library-search-row",children:[l.jsx("input",{type:"text",className:"library-search-input",placeholder:i("library.searchPlaceholder"),value:T,onChange:Le=>E(Le.target.value)}),l.jsx("div",{className:"library-filter-icons",children:l.jsxs("div",{style:{position:"relative"},ref:ve,children:[l.jsx("button",{className:`library-filter-icon-btn$ {
      R?" active":""
    }
    `,title:"Bộ lọc nâng cao",onClick:()=>L(Le=>!Le),children:l.jsx("span",{style:{fontSize:"15px",lineHeight:1,color:"#c7d5e0",display:"block"},children:"⚙"})}),R&&l.jsxs("div",{className:"library-advanced-filter-popover",children:[l.jsx("div",{className:"library-adv-filter-title",children:"Bộ lọc nâng cao"}),l.jsxs("label",{className:"library-adv-filter-item",style:{cursor:"pointer",opacity:1},children:[l.jsx("input",{type:"checkbox",checked:A,onChange:Le=>N(Le.target.checked)}),"Ẩn game NSFW"]}),l.jsxs("label",{className:"library-adv-filter-item",style:{cursor:"pointer",opacity:1},children:[l.jsx("input",{type:"checkbox",checked:V,onChange:Le=>O(Le.target.checked)}),"Các game đã ẩn"]}),l.jsxs("label",{className:"library-adv-filter-item",style:{cursor:"pointer",opacity:1},children:[l.jsx("input",{type:"checkbox",checked:F,onChange:Le=>{J(Le.target.checked),localStorage.setItem("skipKillSteam",Le.target.checked.toString())}}),"Không tắt Steam khi cài"]})]})]})})]})]}),l.jsxs("div",{className:"library-sidebar-section",children:[l.jsxs("div",{className:"library-sidebar-section-title",children:[i("library.allGamesSection")," ",l.jsxs("span",{className:"library-count",children:["(",pe.length,")"]})]}),l.jsx("div",{className:"library-sidebar-list",ref:B,onScroll:le,children:Ge>0&&l.jsx("div",{style:{height:Ge*Mt,position:"relative"},children:l.jsx("div",{style:{position:"absolute",top:qe*Mt,left:0,right:0},children:bt.map(Le=>l.jsxs("button",{className:p===Le.id?"library-sidebar-item active":"library-sidebar-item",onClick:()=>{y(Le.id),b(Le)},onContextMenu:Qe=>{Qe.preventDefault(),Qe.stopPropagation(),ze({x:Qe.clientX,y:Qe.clientY,item:Le})},style:{height:Mt,minHeight:Mt},children:[Le.banner_url&&l.jsxs("span",{className:"library-sidebar-icon-wrap",children:[l.jsx("img",{src:M_(Le.banner_url),alt:Le.game_name,loading:"lazy",className:"library-sidebar-icon"}),ee&&Q[Le.game_id]&&l.jsx("span",{className:"library-installed-dot"})]}),l.jsx("span",{className:"library-sidebar-name",children:Le.game_name})]},Le.id))})})})]})]}),v?l.jsx(tX,{gameId:v.game_id,gameName:v.game_name,bannerUrl:v.banner_url,onClose:()=>{b(null),y(null)}}):l.jsx(l.Fragment,{children:l.jsxs("main",{className:"library-main",children:[Xe.length>0&&l.jsxs("div",{className:"library-whats-new",children:[l.jsxs("div",{className:"library-section-header",children:[l.jsx("span",{className:"library-section-title",children:"What's New"}),l.jsx("span",{className:"library-section-sub",children:"Thịnh hành trên Steam"})]}),l.jsxs("div",{className:"library-carousel-wrap",children:[l.jsx("button",{className:"library-carousel-arrow left",onClick:()=>{var Le;return(Le=fe.current)==null?void 0:Le.scrollBy({left:-280,behavior:"smooth"})},"aria-label":"Scroll left",children:"‹"}),l.jsx("div",{className:"library-carousel",ref:fe,children:Xe.map(Le=>{const Qe=String(Le.id);return l.jsxs("div",{className:"library-carousel-item",onClick:()=>{const ot=c.find(xt=>String(xt.game_id)===Qe);ot?(y(ot.id),b(ot)):r(`/store/$ {
      Qe
    }
    `)},children:[Le.header_image&&l.jsx("img",{src:Le.header_image,alt:Le.name,className:"library-carousel-img",loading:"lazy"}),l.jsxs("div",{className:"library-carousel-label",children:[l.jsx("span",{className:"library-carousel-name",children:Le.name}),Le.discount_percent>0&&l.jsxs("span",{className:"library-carousel-discount",children:["-",Le.discount_percent,"%"]}),ee&&Q[Qe]&&l.jsx("span",{className:"library-carousel-installed",children:"Đã cài"})]})]},Le.id)})}),l.jsx("button",{className:"library-carousel-arrow right",onClick:()=>{var Le;return(Le=fe.current)==null?void 0:Le.scrollBy({left:280,behavior:"smooth"})},"aria-label":"Scroll right",children:"›"})]})]}),l.jsxs("div",{className:"library-toolbar",children:[l.jsx("div",{className:"library-toolbar-left"}),l.jsxs("div",{className:"library-toolbar-right",children:[l.jsx("label",{className:"library-toolbar-label",children:"Sắp xếp:"}),l.jsxs("select",{className:"library-toolbar-select",value:X,onChange:Le=>$(Le.target.value),children:[l.jsx("option",{value:"default",children:"Mặc định"}),l.jsx("option",{value:"name",children:"Tên (A-Z)"}),l.jsx("option",{value:"date",children:"Ngày mua"})]}),ee&&l.jsx("button",{className:`library-toolbar-installed-btn$ {
      z?" active":""
    }
    `,onClick:()=>D(Le=>!Le),children:z?"✓ Đã cài":"Đã cài đặt"})]})]}),h&&l.jsx("div",{className:"library-status library-error",children:h}),!h&&pe.length===0&&!u&&l.jsx("div",{className:"library-status",children:T?"No games found":i("library.empty")}),!h&&pe.length>0&&l.jsx("div",{className:"library-grid",children:mt.map(Le=>l.jsxs("div",{className:"library-card",onClick:()=>{de||(y(Le.id),b(Le))},onContextMenu:Qe=>{Qe.preventDefault(),Qe.stopPropagation(),ze({x:Qe.clientX,y:Qe.clientY,item:Le})},children:[Le.banner_url&&l.jsxs("div",{className:"library-card-media",children:[l.jsx("img",{src:M_(Le.banner_url),alt:Le.game_name,loading:"lazy",decoding:"async",className:"library-banner"}),ee&&Q[Le.game_id]&&l.jsx("span",{className:"library-installed-tag",children:"Installed"})]}),l.jsxs("div",{className:"library-info",children:[l.jsx("div",{className:"library-name",children:Le.game_name}),l.jsxs("div",{className:"library-meta",children:[l.jsx("span",{className:"library-tag",children:i("library.buyTag")}),l.jsx("span",{className:"library-date",children:new Date(Le.purchased_at).toLocaleDateString()})]})]})]},Le.id))}),!h&&w<pe.length&&l.jsx("div",{className:"library-load-more",children:l.jsx("button",{type:"button",className:"library-load-more-button",onClick:()=>S(Le=>Math.min(Le+12,pe.length)),children:i("library.loadMore")})}),!h&&C&&pe.length===w&&l.jsx("div",{className:"library-load-more",children:l.jsx("button",{type:"button",className:"library-load-more-button",disabled:M,onClick:()=>Fe(c.length,!0),children:i(M?"library.loading":"library.loadMore")})})]})}),de&&l.jsxs("div",{className:"library-context-menu",style:{top:de.y,left:de.x},onClick:Le=>Le.stopPropagation(),children:[l.jsxs("button",{className:"library-ctx-item",onClick:()=>{y(de.item.id),b(de.item),setTimeout(()=>window.dispatchEvent(new CustomEvent("library-open-settings")),80),ze(null)},children:[l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:"14",height:"14",children:l.jsx("path",{d:"M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a7.01 7.01 0 0 0-1.62-.94l-.36-2.54A.484.484 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.36 2.54a7.37 7.37 0 0 0-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.63 8.48c-.12.22-.07.49.12.61l2.03 1.58c-.05.3-.09.63-.09.93s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.26.42.49.42h4c.25 0 .46-.18.49-.42l.36-2.54c.59-.24 1.12-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.49-.12-.61l-2.01-1.58zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z"})}),"Cài đặt (Properties)"]}),l.jsx("div",{className:"library-ctx-divider"}),ce.has(de.item.game_id)?l.jsxs("button",{className:"library-ctx-item",onClick:()=>{Rt(de.item.game_id),ze(null)},children:[l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:"14",height:"14",children:l.jsx("path",{d:"M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zm0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"})}),"Hiện game"]}):l.jsxs("button",{className:"library-ctx-item ctx-danger",onClick:()=>{Rt(de.item.game_id),ze(null)},children:[l.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor",width:"14",height:"14",children:l.jsx("path",{d:"M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.44-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46A11.804 11.804 0 0 0 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"})}),"Ẩn game"]})]})]})})}function zE(){try{return typeof oe<"u"&&zn()}catch{return!1}}async function iX(n,e){if(!zE()){try{localStorage.setItem("saved_username",n),localStorage.setItem("saved_password",e)}catch(t){throw console.error("Failed to save credentials:",t),t}return}try{await oe("save_credentials",{username:n,password:e})}catch(t){throw console.error("Failed to save credentials:",t),t}}async function rX(){if(!zE())try{const n=localStorage.getItem("saved_username"),e=localStorage.getItem("saved_password");return n&&e?{username:n,password:e}:null}catch(n){return console.error("Failed to get credentials:",n),null}try{const n=await oe("get_credentials");return n?{username:n[0],password:n[1]}:null}catch(n){return console.error("Failed to get credentials:",n),null}}async function sX(){if(!zE()){try{localStorage.removeItem("saved_username"),localStorage.removeItem("saved_password")}catch(n){console.error("Failed to delete credentials:",n)}return}try{await oe("delete_credentials")}catch(n){console.error("Failed to delete credentials:",n)}}function aX(){const[n,e]=g.useState(""),[t,i]=g.useState(""),[r,s]=g.useState(!1),[a,o]=g.useState(null),[c,d]=g.useState(!1),[u,f]=g.useState(!1),h=oi(),{login:m,loginWithGoogle:p,user:y,loading:v,hardwareBanned:b,banReason:w,logout:S}=nn(),{t:T}=ni(),E=zn()&&!Ty();g.useEffect(()=>{(async()=>{try{const _=await rX();_&&(e(_.username),i(_.password),s(!0))}catch(_){console.error("Failed to load credentials:",_)}})()},[]),g.useEffect(()=>{!v&&y&&h("/")},[y,v,h]),g.useEffect(()=>{const C=document.getElementById("login-starfield");if(!C)return;const _=C.getContext("2d");if(!_)return;let M,j,B=[],G;const W=()=>{M=C.width=window.innerWidth,j=C.height=window.innerHeight,B=[];for(let q=0;q<150;q++)B.push({x:Math.random()*M,y:Math.random()*j,radius:Math.random()*1.5+.3,vx:(Math.random()-.5)*.3,vy:Math.random()*.4+.2,opacity:Math.random()*.7+.3})},U=()=>{_.clearRect(0,0,M,j);for(let q=0;q<B.length;q++){let Q=B[q];_.fillStyle=`rgba(255, 255, 255, $ {
      Q.opacity
    })`,_.beginPath(),_.arc(Q.x,Q.y,Q.radius,0,Math.PI*2),_.fill(),Q.x+=Q.vx,Q.y+=Q.vy,Q.y>j&&(Q.y=0),Q.x>M&&(Q.x=0),Q.x<0&&(Q.x=M)}G=requestAnimationFrame(U)};return window.addEventListener("resize",W),W(),U(),()=>{window.removeEventListener("resize",W),cancelAnimationFrame(G)}},[]);const x=async C=>{if(C.preventDefault(),o(null),!n||!t){o(T("login.errorEmptyFields"));return}d(!0);try{await m(n,t),r?await iX(n,t):await sX(),h("/")}catch(_){const M=_ instanceof Error&&_.message?_.message:T("login.errorLoginFailed");o(M)}finally{d(!1)}},k=async()=>{o(null),f(!0);try{await p(),h("/")}catch(C){o(C instanceof Error?C.message:"Đăng nhập Google thất bại")}finally{f(!1)}};return v?l.jsxs("div",{className:"login-page",children:[E&&l.jsx("div",{className:"login-drag-region","data-tauri-drag-region":!0}),l.jsx("div",{className:"login-container","data-tauri-drag-region":"false",children:l.jsxs("div",{className:"login-header",children:[l.jsx("h1",{className:"login-logo",children:"Goslynk"}),l.jsx("p",{className:"login-subtitle",children:T("login.submitting")})]})})]}):y?null:b?l.jsx("div",{style:{position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-store, -apple-system, sans-serif)"},children:l.jsxs("div",{style:{background:"#1a0a0a",border:"2px solid #dc2626",borderRadius:16,padding:"40px 48px",maxWidth:480,width:"90%",textAlign:"center",boxShadow:"0 0 60px rgba(220,38,38,0.3)"},children:[l.jsx("div",{style:{width:64,height:64,margin:"0 auto 20px",background:"rgba(220,38,38,0.15)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"},children:l.jsx("span",{style:{fontSize:32},children:"🚫"})}),l.jsx("h2",{style:{color:"#dc2626",margin:"0 0 12px",fontSize:22,fontWeight:800},children:"Tài khoản bị ban phần cứng"}),l.jsx("p",{style:{color:"#aaa",margin:"0 0 28px",fontSize:14,lineHeight:1.6},children:w||"Bạn bị cấm phần cứng vì phần mềm NestG Launcher chứa mã độc vui lòng liên hệ admin để được hỗ trợ."}),l.jsx("button",{onClick:()=>S(),style:{background:"#dc2626",color:"#fff",border:"none",borderRadius:8,padding:"12px 32px",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%"},children:"Thoat"})]})}):l.jsxs("div",{className:"login-page",children:[l.jsx("canvas",{id:"login-starfield",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",zIndex:0,opacity:.9,pointerEvents:"none"}}),E&&l.jsx("div",{className:"login-drag-region","data-tauri-drag-region":!0}),l.jsxs("div",{className:"login-container","data-tauri-drag-region":"false",children:[l.jsxs("div",{className:"login-header",children:[l.jsx("h1",{className:"login-logo",children:"Goslynk"}),l.jsx("p",{className:"login-subtitle",children:T("login.subtitle")})]}),l.jsxs("form",{className:"login-form",onSubmit:x,"data-tauri-drag-region":"false",children:[a&&l.jsx("div",{className:"login-error",children:a}),l.jsxs("div",{className:"login-field",children:[l.jsx("label",{htmlFor:"username",children:T("login.usernameLabel")}),l.jsx("input",{id:"username",type:"text",value:n,onChange:C=>e(C.target.value),placeholder:T("login.usernamePlaceholder"),autoComplete:"username","data-tauri-drag-region":"false"})]}),l.jsxs("div",{className:"login-field",children:[l.jsx("label",{htmlFor:"password",children:T("login.passwordLabel")}),l.jsx("input",{id:"password",type:"password",value:t,onChange:C=>i(C.target.value),placeholder:T("login.passwordPlaceholder"),autoComplete:"current-password","data-tauri-drag-region":"false"})]}),l.jsxs("div",{className:"login-options","data-tauri-drag-region":"false",children:[l.jsxs("label",{className:"login-checkbox",children:[l.jsx("input",{type:"checkbox",checked:r,onChange:C=>s(C.target.checked),"data-tauri-drag-region":"false"}),l.jsx("span",{children:T("login.rememberMe")})]}),l.jsx("a",{href:"#",onClick:C=>{C.preventDefault(),h("/forgot-password")},className:"login-forgot",children:T("login.forgotPassword")})]}),l.jsx("button",{type:"submit",className:"login-submit",disabled:c||u,"data-tauri-drag-region":"false",children:T(c?"login.submitting":"login.submitButton")}),l.jsx("div",{className:"login-divider",children:l.jsx("span",{children:"hoặc"})}),l.jsxs("button",{type:"button",className:"login-google-btn",onClick:k,disabled:c||u,"data-tauri-drag-region":"false",children:[l.jsxs("svg",{width:"18",height:"18",viewBox:"0 0 18 18",fill:"none",children:[l.jsx("path",{d:"M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z",fill:"#4285F4"}),l.jsx("path",{d:"M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z",fill:"#34A853"}),l.jsx("path",{d:"M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z",fill:"#FBBC05"}),l.jsx("path",{d:"M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z",fill:"#EA4335"})]}),u?"Đang xử lý...":"Đăng nhập bằng Google"]})]}),l.jsx("div",{className:"login-footer",children:l.jsxs("p",{children:[T("login.noAccount")," ",l.jsx("a",{href:"#",onClick:C=>{C.preventDefault(),h("/register")},className:"login-link",children:T("login.signUp")})]})})]})]})}function Yg({onVerified:n,onReset:e,disabled:t}){const[i,r]=g.useState(null),[s,a]=g.useState(""),[o,c]=g.useState("idle"),[d,u]=g.useState(null),f=g.useRef(null),h=g.useCallback(async()=>{c("loading"),a(""),u(null),r(null),e==null||e();try{const v=await(await fetch(`$ {
      Se
    }
    /auth/register/captcha-challenge`)).json();if(!v.success)throw new Error("Lỗi tải captcha");r(v),c("idle")}catch{c("error"),u("Không thể tải captcha. Vui lòng thử lại.")}},[e]);g.useEffect(()=>(h(),()=>{var y;(y=f.current)==null||y.terminate()}),[]);const m=g.useCallback(async()=>{if(!i||!s.trim()){u("Vui lòng nhập mã trong ảnh");return}c("solving"),u(null);try{const y=await new Promise((v,b)=>{var k;(k=f.current)==null||k.terminate();const w=`
          self.onmessage = async (e) =>  {
      
            const  {
         challengeId, difficulty 
      }
       = e.data;
      
            let nonce = 0;
      
            while (true)  {
        
              const data = new TextEncoder().encode(challengeId + nonce.toString());
        
              const hashBuffer = await crypto.subtle.digest("SHA-256", data);
        
              const hashArray = Array.from(new Uint8Array(hashBuffer));
        
              const hexHash = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
        
              if (hexHash.startsWith(difficulty))  {
          
                self.postMessage( {
             nonce 
          });
          
                return;
          
              
        }
              nonce++;
        
              if (nonce % 5000 === 0) await new Promise(r => setTimeout(r, 0));
        
            
      }
          
    };
    
        `,S=new Blob([w],{type:"application/javascript"}),T=URL.createObjectURL(S),E=new Worker(T);f.current=E;const x=setTimeout(()=>{E.terminate(),URL.revokeObjectURL(T),b(new Error("Xác thực quá thời gian. Vui lòng thử lại."))},3e4);E.onmessage=C=>{clearTimeout(x),E.terminate(),URL.revokeObjectURL(T),v(C.data.nonce)},E.onerror=C=>{clearTimeout(x),E.terminate(),URL.revokeObjectURL(T),b(new Error("Lỗi xác thực bảo mật"))},E.postMessage({challengeId:i.challengeId,difficulty:i.difficulty})});c("done"),n({challengeId:i.challengeId,challengeSig:i.challengeSig,captchaAnswer:s.trim(),powNonce:y})}catch(y){c("error"),u(y.message||"Xác thực thất bại. Vui lòng thử lại.")}},[i,s,n]),p=g.useCallback(()=>{var y;(y=f.current)==null||y.terminate(),h(),c("idle"),a("")},[h]);return l.jsxs("div",{className:`otocaptcha-wrapper $ {
      t?"oto-disabled":""
    }
    `,"data-tauri-drag-region":"false",children:[l.jsxs("div",{className:"oto-image-row",children:[o==="loading"?l.jsx("div",{className:"oto-img-placeholder",children:l.jsx("div",{className:"oto-spinner"})}):i?l.jsx("div",{className:"oto-img-box",dangerouslySetInnerHTML:{__html:i.svgImage}}):null,l.jsx("button",{type:"button",className:"oto-refresh-btn",onClick:p,disabled:t||o==="loading"||o==="solving",title:"Tải lại captcha","data-tauri-drag-region":"false",children:"↺"})]}),l.jsxs("div",{className:"oto-input-row",children:[l.jsx("input",{type:"text",className:"oto-input",placeholder:"Nhập mã trong ảnh...",value:s,onChange:y=>a(y.target.value),onKeyDown:y=>{y.key==="Enter"&&o==="idle"&&s.trim()&&m()},disabled:t||o==="loading"||o==="solving"||o==="done",maxLength:8,autoComplete:"off",spellCheck:!1,"data-tauri-drag-region":"false"}),l.jsx("button",{type:"button",className:`oto-verify-btn $ {
      o
    }
    `,onClick:o==="idle"?m:void 0,disabled:t||o==="loading"||o==="solving"||o==="done"||!s.trim(),"data-tauri-drag-region":"false",children:o==="solving"?l.jsx("span",{className:"oto-mini-spinner"}):o==="done"?"✓":"OK"})]}),l.jsxs("div",{className:"oto-status-row",children:[o==="solving"&&l.jsx("span",{className:"oto-status-text verifying",children:"⚙ Đang xác thực bảo mật..."}),o==="done"&&l.jsx("span",{className:"oto-status-text verified",children:"✓ Đã sẵn sàng! Chờ máy chủ kiểm tra"}),d&&l.jsx("span",{className:"oto-status-text error",children:d}),l.jsx("span",{className:"oto-brand",children:"⬡ OtoCaptcha"})]})]})}function oX(){const{showSuccess:n}=Ka(),[e,t]=g.useState("register"),[i,r]=g.useState(""),[s,a]=g.useState(""),[o,c]=g.useState(""),[d,u]=g.useState(""),[f,h]=g.useState(""),[m,p]=g.useState(null),[y,v]=g.useState(!1),[b,w]=g.useState(0),[S,T]=g.useState(null),[E,x]=g.useState(null),k=oi(),{t:C}=ni(),_=zn()&&!Ty(),M=W=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(W),j=async W=>{if(W.preventDefault(),p(null),!i||!s||!o||!d){p(C("register.errorEmptyFields"));return}if(!/^[a-zA-Z0-9]+$/.test(i)){p("Tên tài khoản chỉ được chứa chữ cái (không dấu) và số, không chứa khoảng trắng!");return}if(i.length<4||i.length>20){p("Tên tài khoản phải dài từ 4 đến 20 ký tự!");return}if(!M(s)){p(C("register.errorInvalidEmail"));return}if(o!==d){p(C("register.errorPasswordMismatch"));return}if(o.length<6){p("Mật khẩu phải có ít nhất 6 ký tự");return}if(!S){p("Vui lòng xác thực captcha trước khi đăng ký!");return}v(!0);try{const{postSecureRequest:q}=await $n(async()=>{const{postSecureRequest:te}=await import("./secureRequest-D6PUxES5.js");return{postSecureRequest:te}},__vite__mapDeps([0,1,2]),import.meta.url);await q("/auth/register/send-otp",{username:i,email:s,password:o,...S}),n("Đã gửi mã OTP thành công!"),t("otp"),w(60);const Q=setInterval(()=>{w(te=>te<=1?(clearInterval(Q),0):te-1)},1e3)}catch(q){const Q=q instanceof Error&&q.message?q.message:C("register.errorRegisterFailed");p(Q),T(null)}finally{v(!1)}},B=async()=>{if(!(b>0)){if(!E){p("Vui lòng xác thực captcha!");return}p(null),v(!0);try{const{postSecureRequest:W}=await $n(async()=>{const{postSecureRequest:q}=await import("./secureRequest-D6PUxES5.js");return{postSecureRequest:q}},__vite__mapDeps([0,1,2]),import.meta.url);await W("/auth/register/send-otp",{username:i,email:s,password:o,...E}),n("✅ Đã gửi lại mã OTP!"),w(60);const U=setInterval(()=>{w(q=>q<=1?(clearInterval(U),0):q-1)},1e3)}catch(W){const U=W instanceof Error&&W.message?W.message:C("register.otpResendFailed");p(U),x(null)}finally{v(!1)}}},G=async W=>{if(W.preventDefault(),p(null),!f||f.length!==6){p(C("register.otpErrorEmpty"));return}v(!0);try{const{postSecureRequest:U}=await $n(async()=>{const{postSecureRequest:q}=await import("./secureRequest-D6PUxES5.js");return{postSecureRequest:q}},__vite__mapDeps([0,1,2]),import.meta.url);await U("/auth/register/verify",{username:i,email:s,password:o,otp:f}),n("🎉 Đăng ký thành công!"),k("/login")}catch(U){const q=U instanceof Error&&U.message?U.message:C("register.otpVerifyFailed");p(q)}finally{v(!1)}};return l.jsxs("div",{className:"register-page",children:[_&&l.jsx("div",{className:"register-drag-region","data-tauri-drag-region":!0}),l.jsx("div",{className:"register-container","data-tauri-drag-region":"false",children:e==="register"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"register-header",children:[l.jsx("h1",{className:"register-logo",children:"Goslynk"}),l.jsx("p",{className:"register-subtitle",children:C("register.subtitle")})]}),l.jsxs("form",{className:"register-form",onSubmit:j,"data-tauri-drag-region":"false",children:[m&&l.jsx("div",{className:"register-error",children:m}),l.jsxs("div",{className:"register-field",children:[l.jsx("label",{htmlFor:"username",children:C("register.usernameLabel")}),l.jsx("input",{id:"username",type:"text",value:i,onChange:W=>r(W.target.value),placeholder:C("register.usernamePlaceholder"),autoComplete:"username","data-tauri-drag-region":"false"})]}),l.jsxs("div",{className:"register-field",children:[l.jsx("label",{htmlFor:"email",children:C("register.emailLabel")}),l.jsx("input",{id:"email",type:"email",value:s,onChange:W=>a(W.target.value),placeholder:C("register.emailPlaceholder"),autoComplete:"email","data-tauri-drag-region":"false"})]}),l.jsxs("div",{className:"register-field",children:[l.jsx("label",{htmlFor:"password",children:C("register.passwordLabel")}),l.jsx("input",{id:"password",type:"password",value:o,onChange:W=>c(W.target.value),placeholder:C("register.passwordPlaceholder"),autoComplete:"new-password","data-tauri-drag-region":"false"})]}),l.jsxs("div",{className:"register-field",children:[l.jsx("label",{htmlFor:"confirmPassword",children:C("register.confirmPasswordLabel")}),l.jsx("input",{id:"confirmPassword",type:"password",value:d,onChange:W=>u(W.target.value),placeholder:C("register.confirmPasswordPlaceholder"),autoComplete:"new-password","data-tauri-drag-region":"false"})]}),l.jsx("div",{className:"register-field",children:l.jsx(Yg,{onVerified:W=>T(W),onReset:()=>T(null),disabled:!i||!s||!o||!d})}),l.jsx("button",{type:"submit",className:"register-submit",disabled:y,"data-tauri-drag-region":"false",children:C(y?"register.sendingOtp":"register.submitButton")})]}),l.jsx("div",{className:"register-footer",children:l.jsxs("p",{children:[C("register.hasAccount")," ",l.jsx("a",{href:"#",onClick:W=>{W.preventDefault(),k("/login")},className:"register-link",children:C("register.signIn")})]})})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"register-header",children:[l.jsx("h1",{className:"register-logo",children:"Goslynk"}),l.jsx("p",{className:"register-subtitle",children:C("register.otpTitle")})]}),l.jsxs("div",{className:"otp-description",children:[l.jsx("p",{children:C("register.otpDescription")}),l.jsx("p",{className:"otp-email",children:s})]}),l.jsxs("form",{className:"register-form",onSubmit:G,"data-tauri-drag-region":"false",children:[m&&l.jsx("div",{className:"register-error",children:m}),l.jsxs("div",{className:"register-field",children:[l.jsx("label",{htmlFor:"otp",children:C("register.otpLabel")}),l.jsx("input",{id:"otp",type:"text",value:f,onChange:W=>{const U=W.target.value.replace(/\D/g,"").slice(0,6);h(U)},placeholder:C("register.otpPlaceholder"),maxLength:6,autoComplete:"one-time-code","data-tauri-drag-region":"false",className:"otp-input"})]}),l.jsx("button",{type:"submit",className:"register-submit",disabled:y,"data-tauri-drag-region":"false",children:C(y?"register.otpVerifying":"register.otpVerify")}),l.jsxs("div",{className:"otp-resend",children:[b===0&&l.jsx("div",{className:"register-field",children:l.jsx(Yg,{onVerified:W=>x(W),onReset:()=>x(null)})}),l.jsx("button",{type:"button",onClick:B,disabled:y||b>0,className:"otp-resend-btn","data-tauri-drag-region":"false",children:b>0?`$ {
      C("register.otpResend")
    }
     ($ {
      b
    }
    s)`:C("register.otpResend")})]})]}),l.jsx("div",{className:"register-footer",children:l.jsxs("button",{type:"button",onClick:()=>t("register"),className:"register-back-btn","data-tauri-drag-region":"false",children:["← ",C("register.subtitle")]})})]})})]})}function lX(){const{showSuccess:n}=Ka(),[e,t]=g.useState("email"),[i,r]=g.useState(""),[s,a]=g.useState(""),[o,c]=g.useState(""),[d,u]=g.useState(""),[f,h]=g.useState(null),[m,p]=g.useState(!1),[y,v]=g.useState(0),[b,w]=g.useState(null),[S,T]=g.useState(null),E=oi(),{t:x}=ni(),k=zn()&&!Ty(),C=G=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(G),_=async G=>{if(G.preventDefault(),h(null),!i){h(x("forgotPassword.errorEmptyEmail"));return}if(!C(i)){h(x("forgotPassword.errorInvalidEmail"));return}if(!b){h("Vui lòng xác thực captcha!");return}p(!0);try{const{postSecureRequest:W}=await $n(async()=>{const{postSecureRequest:q}=await import("./secureRequest-D6PUxES5.js");return{postSecureRequest:q}},__vite__mapDeps([0,1,2]),import.meta.url);await W("/auth/forgot-password/send-otp",{email:i,...b}),n("Đã gửi mã OTP thành công!"),t("otp"),v(60);const U=setInterval(()=>{v(q=>q<=1?(clearInterval(U),0):q-1)},1e3)}catch(W){const U=W instanceof Error&&W.message?W.message:x("forgotPassword.errorSendOtpFailed");h(U),w(null)}finally{p(!1)}},M=async()=>{if(!(y>0)){if(!S){h("Vui lòng xác thực captcha để gửi lại!");return}h(null),p(!0);try{const{postSecureRequest:G}=await $n(async()=>{const{postSecureRequest:U}=await import("./secureRequest-D6PUxES5.js");return{postSecureRequest:U}},__vite__mapDeps([0,1,2]),import.meta.url);await G("/auth/forgot-password/send-otp",{email:i,...S}),n("Đã gửi lại mã OTP!"),v(60);const W=setInterval(()=>{v(U=>U<=1?(clearInterval(W),0):U-1)},1e3)}catch(G){const W=G instanceof Error&&G.message?G.message:x("forgotPassword.otpResendFailed");h(W),T(null)}finally{p(!1)}}},j=async G=>{if(G.preventDefault(),h(null),!s||s.length!==6){h(x("forgotPassword.otpErrorEmpty"));return}p(!0);try{const{postSecureRequest:W}=await $n(async()=>{const{postSecureRequest:U}=await import("./secureRequest-D6PUxES5.js");return{postSecureRequest:U}},__vite__mapDeps([0,1,2]),import.meta.url);await W("/auth/forgot-password/verify-otp",{email:i,otp:s}),t("reset")}catch(W){const U=W instanceof Error&&W.message?W.message:x("forgotPassword.otpVerifyFailed");h(U)}finally{p(!1)}},B=async G=>{if(G.preventDefault(),h(null),!o||!d){h("Vui lòng điền đầy đủ thông tin");return}if(o.length<6){h(x("forgotPassword.errorPasswordTooShort"));return}if(o!==d){h(x("forgotPassword.errorPasswordMismatch"));return}p(!0);try{const{postSecureRequest:W}=await $n(async()=>{const{postSecureRequest:U}=await import("./secureRequest-D6PUxES5.js");return{postSecureRequest:U}},__vite__mapDeps([0,1,2]),import.meta.url);await W("/auth/forgot-password/reset",{email:i,otp:s,newPassword:o}),n("Đổi mật khẩu thành công!"),E("/login")}catch(W){const U=W instanceof Error&&W.message?W.message:x("forgotPassword.resetFailed");h(U)}finally{p(!1)}};return l.jsxs("div",{className:"forgot-password-page",children:[k&&l.jsx("div",{className:"forgot-password-drag-region","data-tauri-drag-region":!0}),l.jsx("div",{className:"forgot-password-container","data-tauri-drag-region":"false",children:e==="email"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"forgot-password-header",children:[l.jsx("h1",{className:"forgot-password-logo",children:"Goslynk"}),l.jsx("p",{className:"forgot-password-subtitle",children:x("forgotPassword.subtitle")})]}),l.jsxs("form",{className:"forgot-password-form",onSubmit:_,"data-tauri-drag-region":"false",children:[f&&l.jsx("div",{className:"forgot-password-error",children:f}),l.jsxs("div",{className:"forgot-password-field",children:[l.jsx("label",{htmlFor:"email",children:x("forgotPassword.emailLabel")}),l.jsx("input",{id:"email",type:"email",value:i,onChange:G=>r(G.target.value),placeholder:x("forgotPassword.emailPlaceholder"),autoComplete:"email","data-tauri-drag-region":"false"})]}),l.jsx("div",{className:"forgot-password-field",children:l.jsx(Yg,{onVerified:G=>w(G),onReset:()=>w(null),disabled:!i||!C(i)})}),l.jsx("button",{type:"submit",className:"forgot-password-submit",disabled:m,"data-tauri-drag-region":"false",children:x(m?"forgotPassword.submitting":"forgotPassword.submitButton")})]}),l.jsx("div",{className:"forgot-password-footer",children:l.jsxs("button",{type:"button",onClick:()=>E("/login"),className:"forgot-password-back-btn","data-tauri-drag-region":"false",children:["← ",x("forgotPassword.backToLogin")]})})]}):e==="otp"?l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"forgot-password-header",children:[l.jsx("h1",{className:"forgot-password-logo",children:"Goslynk"}),l.jsx("p",{className:"forgot-password-subtitle",children:x("forgotPassword.otpTitle")})]}),l.jsxs("div",{className:"otp-description",children:[l.jsx("p",{children:x("forgotPassword.otpDescription")}),l.jsx("p",{className:"otp-email",children:i})]}),l.jsxs("form",{className:"forgot-password-form",onSubmit:j,"data-tauri-drag-region":"false",children:[f&&l.jsx("div",{className:"forgot-password-error",children:f}),l.jsxs("div",{className:"forgot-password-field",children:[l.jsx("label",{htmlFor:"otp",children:x("forgotPassword.otpLabel")}),l.jsx("input",{id:"otp",type:"text",value:s,onChange:G=>{const W=G.target.value.replace(/\D/g,"").slice(0,6);a(W)},placeholder:x("forgotPassword.otpPlaceholder"),maxLength:6,autoComplete:"one-time-code","data-tauri-drag-region":"false",className:"otp-input"})]}),l.jsx("button",{type:"submit",className:"forgot-password-submit",disabled:m,"data-tauri-drag-region":"false",children:x(m?"forgotPassword.otpVerifying":"forgotPassword.otpVerify")}),l.jsxs("div",{className:"otp-resend",children:[y===0&&l.jsx("div",{className:"forgot-password-field",children:l.jsx(Yg,{onVerified:G=>T(G),onReset:()=>T(null)})}),l.jsx("button",{type:"button",onClick:M,disabled:m||y>0,className:"otp-resend-btn","data-tauri-drag-region":"false",children:y>0?`$ {
      x("forgotPassword.otpResend")
    }
     ($ {
      y
    }
    s)`:x("forgotPassword.otpResend")})]})]}),l.jsx("div",{className:"forgot-password-footer",children:l.jsxs("button",{type:"button",onClick:()=>{t("email"),w(null),T(null)},className:"forgot-password-back-btn","data-tauri-drag-region":"false",children:["← ",x("forgotPassword.subtitle")]})})]}):l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"forgot-password-header",children:[l.jsx("h1",{className:"forgot-password-logo",children:"Goslynk"}),l.jsx("p",{className:"forgot-password-subtitle",children:x("forgotPassword.resetPasswordTitle")})]}),l.jsxs("form",{className:"forgot-password-form",onSubmit:B,"data-tauri-drag-region":"false",children:[f&&l.jsx("div",{className:"forgot-password-error",children:f}),l.jsxs("div",{className:"forgot-password-field",children:[l.jsx("label",{htmlFor:"newPassword",children:x("forgotPassword.newPasswordLabel")}),l.jsx("input",{id:"newPassword",type:"password",value:o,onChange:G=>c(G.target.value),placeholder:x("forgotPassword.newPasswordPlaceholder"),autoComplete:"new-password","data-tauri-drag-region":"false"})]}),l.jsxs("div",{className:"forgot-password-field",children:[l.jsx("label",{htmlFor:"confirmPassword",children:x("forgotPassword.confirmPasswordLabel")}),l.jsx("input",{id:"confirmPassword",type:"password",value:d,onChange:G=>u(G.target.value),placeholder:x("forgotPassword.confirmPasswordPlaceholder"),autoComplete:"new-password","data-tauri-drag-region":"false"})]}),l.jsx("button",{type:"submit",className:"forgot-password-submit",disabled:m,"data-tauri-drag-region":"false",children:x(m?"forgotPassword.resetting":"forgotPassword.resetButton")})]}),l.jsx("div",{className:"forgot-password-footer",children:l.jsxs("button",{type:"button",onClick:()=>t("otp"),className:"forgot-password-back-btn","data-tauri-drag-region":"false",children:["← ",x("forgotPassword.otpTitle")]})})]})})]})}const Vf=["https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg","https://api.dicebear.com/7.x/bottts/svg?seed=Goslynk1&backgroundColor=1b2838","https://api.dicebear.com/7.x/bottts/svg?seed=Goslynk2&backgroundColor=2a475e","https://api.dicebear.com/7.x/bottts/svg?seed=Goslynk3&backgroundColor=66c0f4","https://api.dicebear.com/7.x/bottts/svg?seed=Goslynk4&backgroundColor=c28f2c","https://shared.fastly.steamstatic.com/community_assets/images/items/3296260/ea50cd34208e8b6470a0ba96171c98b8d4fb7176.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2873080/b7aa246e15b0bb0033e3566b4ed7db3861efad84.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2873080/33e549955162361a7684873731207e3cce5d66ad.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2022180/e081bb44f8c79e9b5ae44d1be71aae559d7fcf88.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2873080/52a165249be20fb3755e9dfff33205506d457616.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2194530/cbb9975540917388d28f66420cc60357331b94a0.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1286990/f3be8d902648f1baa8d3dc93df849e6df1d9e400.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2593370/59a8f707049a6ba31d814eace41dbc03a192006b.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/3558920/22c4592abb8a36fc11bdecf7b88ba0c5f709a66f.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2459330/11bbadea5154c316c883df0f3f1944395b3715b8.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2873080/2cf13c9b16e68774aeaaa12f812d0f0e25a56548.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/236390/18d11f424e4c0481770ba42a034eeff3a30e7732.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/216150/5933160d2b734175fd7e7adbeb894fc1b4a02f08.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/662960/dc93cd9f1ce3ac26d99d33cf3e7b7a59927c32e1.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2507950/f60248b8dfdc8973308aac3d0f6df74e4375e412.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1390700/28a30c70a999c0673453a417a9e5df1ab76bc72d.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1442870/5c6d12fe965d46def2989e9fb74fc0b100765258.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1940340/8a6bf2dfc491be809c2fccf61f297d6f98ac049d.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2302140/43f645cf0d8009297f379da3f2294a8febf234ef.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/3339420/fde8c7b55cde823a32d47b7c862dc19b0f82d241.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2853160/f5b55f5076670e3f5803b621ee25055cd5d85e70.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2507950/17f4474b137df104d02f45c8edb8c8130dae4a4d.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/774171/ea16deb58fb1582c5ec3acfe5344fdc7b00077de.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/3489700/bebb6a24df08f483ead9c77fb363804851425f08.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1529220/a8ba0e6ab807cd1f9dbe24f3958242e2d989e8c6.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1260320/5583056d8caa52d8be8a8da6dec13797924ead67.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2139460/ceac3f2dd323201409ff386df51811edefe515bb.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2018640/20e81a85eedd2d7e619242fcd1b9c4c416486784.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/3489700/3171bc1876f9606456b976036cb98aac6f7d803a.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2861720/0f9367f89fad6b92c96b686442d61bcb86d627f5.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2593370/5a2a47d2f5a3be9ef3e769892df633dc2cb11d88.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1091500/d3ca470b90fe64e5203af68b5238e99665b05e2f.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2055500/9fa2a22c70382fcc6658728d23759d1fa36bd61f.gif"],_S=n=>{const e=parseInt(n.replace("avatar_",""),10);return Number.isFinite(e)&&e>=0&&e<Vf.length?Vf[e]:Vf[0]},bh=n=>{if(!n)return;const e=String(n).trim();if(!e)return;if(/^(https?:)?\/\//i.test(e)||e.startsWith("data:"))return e;if(e.startsWith("avatar_"))return _S(e);const t=po.replace(/\/$/,""),i=e.startsWith("/")?e:`/$ {
      e
    }
    `;return`$ {
      t
    }
    $ {
      i
    }
    `};function cX({role:n}){n||(n="user");const e={super_admin:{name:"Owner",color:"#ffd700",bgColor:"linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 215, 0, 0.1) 100%)",icon:l.jsx(xy,{})},admin:{name:"Admin",color:"#ff6b6b",bgColor:"linear-gradient(135deg, rgba(255, 107, 107, 0.2) 0%, rgba(255, 107, 107, 0.1) 100%)",icon:l.jsx(JH,{})},vip_plus:{name:"VIP Plus",color:"#ffa500",bgColor:"linear-gradient(135deg, rgba(255, 165, 0, 0.2) 0%, rgba(255, 165, 0, 0.1) 100%)",icon:l.jsx(Cc,{})},vip:{name:"VIP",color:"#90ee90",bgColor:"linear-gradient(135deg, rgba(144, 238, 144, 0.2) 0%, rgba(144, 238, 144, 0.1) 100%)",icon:l.jsx(Cc,{})},netflix:{name:"Netflix",color:"#e50914",bgColor:"linear-gradient(135deg, rgba(229, 9, 20, 0.2) 0%, rgba(229, 9, 20, 0.1) 100%)",icon:l.jsx(ZH,{})},ctv:{name:"CTV",color:"#66c0f4",bgColor:"linear-gradient(135deg, rgba(102, 192, 244, 0.2) 0%, rgba(102, 192, 244, 0.1) 100%)",icon:l.jsx(F4,{})},user:{name:"User",color:"#8b98a5",bgColor:"linear-gradient(135deg, rgba(139, 152, 165, 0.2) 0%, rgba(139, 152, 165, 0.1) 100%)",icon:l.jsx(eK,{})}},t=e[n]||e.user;return l.jsxs("span",{className:"role-badge",style:{color:t.color,background:t.bgColor,borderColor:t.color},children:[l.jsx("span",{className:"role-badge-icon",children:t.icon}),l.jsx("span",{className:"role-badge-text",children:t.name})]})}function dX(){var Pe,de,ze,Xe,Ye;const{user:n,sessionId:e,checkAuth:t}=nn(),{t:i}=ni(),r=oi(),s=br(),{startTutorial:a,isActive:o}=la(),[c,d]=g.useState(!1),[u,f]=g.useState(!1),[h,m]=g.useState((n==null?void 0:n.email)||""),[p,y]=g.useState((n==null?void 0:n.phone_number)||""),[v,b]=g.useState(!1),[w,S]=g.useState(null),[T,E]=g.useState(null),[x,k]=g.useState(!1),[C,_]=g.useState(null),[M,j]=g.useState(!1),B=g.useRef(!1),G=g.useRef(!1),[W,U]=g.useState("account"),[q,Q]=g.useState(()=>localStorage.getItem("notif_mute_sound")==="1"),[te,ee]=g.useState(()=>localStorage.getItem("notif_disable_popup")!=="0"),[he,me]=g.useState(!1),[se,be]=g.useState(null),[K,X]=g.useState(!1),[$,z]=g.useState(""),[D,R]=g.useState(!1),[L,A]=g.useState("hsl(300, 100%, 65%)"),[N,V]=g.useState("hsl(200, 100%, 65%)"),[O,F]=g.useState(90);g.useEffect(()=>{if(n!=null&&n.name_color)if(z(n.name_color),n.name_color.includes("gradient")){R(!0);const ve=n.name_color.match(/(?:#([a-fA-F0-9]{3,8})|hsl\([^)]+\)|rgb\([^)]+\))/gi);ve&&ve.length>=2&&(A(ve[0]),V(ve[1]));const nt=n.name_color.match(/(\d+)deg/);nt&&F(parseInt(nt[1]))}else R(!1)},[n==null?void 0:n.name_color]),g.useEffect(()=>{D&&z(`linear-gradient($ {
      O
    }
    deg, $ {
      L
    }, $ {
      N
    })`)},[L,N,O,D]);const J=async()=>{if(n){if(n.role==="user"){S("Chỉ tài khoản VIP trở lên mới được đổi màu tên!"),X(!1);return}if(D&&!["vip_plus","admin","super_admin"].includes(n.role)){S("Tính năng lưu màu Gradient Kép chỉ dành cho hạng VIP+! Hãy nâng cấp để sử dụng.");return}b(!0),S(null),E(null);try{const nt=await(await fetch(`$ {
      Se
    }
    /api/user/name_color`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer $ {
      e
    }
    `},body:JSON.stringify({color:$})})).json();if(!nt.success)throw new Error(nt.message||"Lỗi lưu màu");E("Cập nhật màu tên thành công!"),await t(),X(!1)}catch(ve){S(ve.message||"Không thể cập nhật màu tên")}finally{b(!1)}}},re=[{label:"Mặc định",value:""},{label:"Đỏ đậm",value:"#e74c3c"},{label:"Xanh lá",value:"#2ecc71"},{label:"Xanh dương",value:"#3498db"},{label:"Vàng Gold",value:"#f1c40f"},{label:"Tím Mộng Mơ",value:"#9b59b6"},{label:"Cam Cháy",value:"#e67e22"},{label:"Hồng Baby",value:"#ff7eb3"},{label:"Xanh Neon",value:"#00ffcc"}],ie=async()=>{if(!h.trim()){S(i("accountDetails.emailEmptyError"));return}b(!0),S(null),E(null);try{const ve=await fetch(`$ {
      Se
    }
    /auth/update-profile`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer $ {
      e
    }
    `},body:JSON.stringify({email:h,sessionId:e})}),nt=await ve.json();if(!ve.ok)throw new Error(nt.message||i("accountDetails.emailUpdateFail"));E(i("accountDetails.emailUpdateSuccess")),d(!1),await t()}catch(ve){S(ve instanceof Error?ve.message:i("accountDetails.emailUpdateFail"))}finally{b(!1)}};g.useEffect(()=>{(async()=>{if(!e||!n)return;if(!(n.role==="vip"||n.role==="vip_plus")){_(null),G.current=!0;return}if(G.current)return;G.current=!0;const ft=localStorage.getItem(`vip_sub_$ {
      e
    }
    `);if(ft)try{const Rt=JSON.parse(ft);_(Rt),j(!1);return}catch{localStorage.removeItem(`vip_sub_$ {
      e
    }
    `)}j(!0);try{const Rt=await fetch(`$ {
      Se
    }
    /vip/subscription?sessionId=$ {
      e
    }
    `,{headers:{Authorization:`Bearer $ {
      e
    }
    `}});if(Rt.ok){const Mt=await Rt.json();Mt.success&&(_(Mt.subscription),localStorage.setItem(`vip_sub_$ {
      e
    }
    `,JSON.stringify(Mt.subscription)),setTimeout(()=>{localStorage.removeItem(`vip_sub_$ {
      e
    }
    `)},3e5))}}catch{}finally{j(!1)}})()},[e,n==null?void 0:n.role]),g.useEffect(()=>{var Rt,Mt;if(!n||(!o&&B.current&&(B.current=!1),o||B.current))return;const ve=s.state&&s.state.replayTutorial==="account_details";if(!ve)return;if(!ve){if(!(((Rt=n==null?void 0:n.tutorial_completed)==null?void 0:Rt.welcome)===!0))return;if(((Mt=n==null?void 0:n.tutorial_completed)==null?void 0:Mt.account_details)===!0){B.current=!1;return}}B.current=!0;const nt=[{id:"account-view-history",target:"[data-tutorial-id='account-view-history']",title:i("tutorial.accountDetails.viewHistory.title"),description:i("tutorial.accountDetails.viewHistory.description"),position:"bottom"},{id:"account-store-settings",target:"[data-tutorial-id='account-store-settings']",title:i("tutorial.accountDetails.storeSettings.title"),description:i("tutorial.accountDetails.storeSettings.description"),position:"bottom"},{id:"account-buy-vip",target:"[data-tutorial-id='account-buy-vip']",title:i("tutorial.accountDetails.buyVip.title"),description:i("tutorial.accountDetails.buyVip.description"),position:"bottom",navigateTo:"/store",tutorialKey:"account_details"}],ft=setTimeout(()=>{a(nt),ve&&r(s.pathname,{replace:!0,state:{...s.state,replayTutorial:void 0}})},800);return()=>clearTimeout(ft)},[n==null?void 0:n.id,a,i,o,(Pe=n==null?void 0:n.tutorial_completed)==null?void 0:Pe.welcome,(de=n==null?void 0:n.tutorial_completed)==null?void 0:de.account_details]);const fe=async()=>{b(!0),S(null),E(null);try{const ve=await fetch(`$ {
      Se
    }
    /auth/update-profile`,{method:"PUT",headers:{"Content-Type":"application/json",Authorization:`Bearer $ {
      e
    }
    `},body:JSON.stringify({phone_number:p,sessionId:e})}),nt=await ve.json();if(!ve.ok)throw new Error(nt.message||i("accountDetails.phoneUpdateFail"));E(i("accountDetails.phoneUpdateSuccess")),f(!1),await t()}catch(ve){S(ve instanceof Error?ve.message:"Failed to update phone number")}finally{b(!1)}},ce=ve=>{switch(ve){case"super_admin":return"#f53131ff";case"admin":return"#f8ae0eff";case"vip_plus":return"#a855f7";case"vip":return"#22c55e";default:return"#444"}},ke=ve=>{const nt=ce(ve);return`0 0 15px $ {
      nt
    }
    80, inset 0 0 10px $ {
      nt
    }
    40`};return l.jsxs("div",{className:"account-details-page",children:[l.jsxs("div",{className:"account-details-breadcrumb",children:[l.jsx(Ip,{to:"/",children:i("accountDetails.breadcrumbHome")})," >"," ",i("accountDetails.breadcrumbAccount")]}),l.jsxs("div",{className:"account-details-header",style:{display:"flex",alignItems:"center",gap:"20px"},children:[l.jsx("div",{className:"account-details-avatar",style:{width:"80px",height:"80px",borderRadius:"50%",overflow:"hidden",border:`3px solid $ {
      ce(n==null?void 0:n.role)
    }
    `,boxShadow:ke(n==null?void 0:n.role),flexShrink:0,transition:"all 0.3s ease"},children:l.jsx("img",{src:bh(n==null?void 0:n.avatar_url)||"https://i.imgur.com/6VBx3io.png",alt:"Avatar",style:{width:"100%",height:"100%",objectFit:"cover"},onError:ve=>{ve.target.src=bh("avatar_0")||"https://i.imgur.com/6VBx3io.png"}})}),l.jsxs("div",{className:"account-details-header-info",children:[l.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px",paddingBottom:"5px"},children:[l.jsxs("h1",{className:"account-details-name",style:{margin:0,color:n!=null&&n.name_color&&!n.name_color.includes("gradient")?n.name_color:"#fff",backgroundImage:(ze=n==null?void 0:n.name_color)!=null&&ze.includes("gradient")?n.name_color:void 0,WebkitBackgroundClip:(Xe=n==null?void 0:n.name_color)!=null&&Xe.includes("gradient")?"text":"initial",WebkitTextFillColor:(Ye=n==null?void 0:n.name_color)!=null&&Ye.includes("gradient")?"transparent":"initial",textShadow:n!=null&&n.name_color&&!n.name_color.includes("gradient")?`0 0 10px $ {
      n.name_color
    }
    80`:void 0,transition:"color 0.3s ease"},children:[(n==null?void 0:n.username)||"User",l.jsxs("span",{style:{color:"#fff",textShadow:"none",WebkitTextFillColor:"initial",WebkitBackgroundClip:"initial",backgroundImage:"none"},children:[" ",i("accountDetails.headerSuffix")]})]}),l.jsx("button",{className:"name-color-edit-btn",title:"Đổi màu tên",onClick:()=>{(n==null?void 0:n.role)==="user"?(S("Tính năng đổi màu tên chỉ dành cho thành viên VIP trở lên!"),E(null)):X(!K)},style:{background:"transparent",border:"none",color:"#66c0f4",cursor:"pointer",padding:"4px",display:"flex",alignItems:"center",justifyContent:"center",opacity:.7,transition:"opacity 0.2s"},onMouseEnter:ve=>ve.currentTarget.style.opacity="1",onMouseLeave:ve=>ve.currentTarget.style.opacity="0.7",children:l.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path",{d:"M12 20h9"}),l.jsx("path",{d:"M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"})]})}),K&&l.jsxs("div",{className:"name-color-picker-popover",style:{position:"absolute",marginTop:"80px",marginLeft:"180px",background:"#1b2838",border:"1px solid #2a475e",padding:"16px",borderRadius:"8px",boxShadow:"0 8px 24px rgba(0,0,0,0.5)",zIndex:100,display:"flex",flexDirection:"column",gap:"12px",minWidth:"250px"},children:[l.jsx("div",{style:{color:"#fff",fontSize:"14px",fontWeight:"bold",borderBottom:"1px solid #2a475e",paddingBottom:"8px"},children:"Chọn màu tên hiển thị"}),l.jsx("div",{style:{display:"flex",flexWrap:"wrap",gap:"8px"},children:re.map(ve=>l.jsx("div",{title:ve.label,onClick:()=>{R(!1),z(ve.value)},style:{width:"30px",height:"30px",borderRadius:"50%",background:ve.value||"#fff",border:$===ve.value&&!D?"3px solid #66c0f4":"1px solid #2a475e",cursor:"pointer",boxShadow:ve.value?`0 0 8px $ {
      ve.value
    }
    80`:"none",color:ve.value?"transparent":"#333",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",fontWeight:"bold"},children:!ve.value&&"X"},ve.value))}),["vip","vip_plus","admin","super_admin"].includes((n==null?void 0:n.role)||"")&&l.jsx("div",{style:{marginTop:"4px",display:"flex",gap:"10px",alignItems:"center"},children:l.jsxs("label",{style:{color:"#fff",fontSize:"12px",cursor:"pointer",display:"flex",alignItems:"center",gap:"4px"},children:[l.jsx("input",{type:"checkbox",checked:D,onChange:ve=>R(ve.target.checked),style:{margin:0}}),l.jsx("span",{children:"Bật Gradient Kép (VIP+)"})]})}),D?l.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"10px",marginTop:"4px"},children:[l.jsx("div",{style:{flex:1,borderRadius:"6px",background:"#0b141f",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"16px",fontWeight:"bold",padding:"16px 12px",letterSpacing:"1px",border:"1px solid #2a475e",overflow:"hidden"},children:l.jsx("span",{style:{backgroundImage:`linear-gradient($ {
      O
    }
    deg, $ {
      L
    }, $ {
      N
    })`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textShadow:`0 0 15px $ {
      L
    }
    40`},children:(n==null?void 0:n.username)||"GOSLYNK"})}),l.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"6px"},children:[l.jsx("div",{style:{fontSize:"11px",color:"#8b98a5"},children:"Màu 1 (Trái)"}),l.jsx("input",{type:"range",min:"0",max:"360",defaultValue:"300",onChange:ve=>A(`hsl($ {
      ve.target.value
    }, 100%, 65%)`),style:{width:"100%",height:"8px",WebkitAppearance:"none",borderRadius:"5px",background:"linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",outline:"none",cursor:"grab"}}),l.jsx("div",{style:{fontSize:"11px",color:"#8b98a5",marginTop:"2px"},children:"Màu 2 (Phải)"}),l.jsx("input",{type:"range",min:"0",max:"360",defaultValue:"200",onChange:ve=>V(`hsl($ {
      ve.target.value
    }, 100%, 65%)`),style:{width:"100%",height:"8px",WebkitAppearance:"none",borderRadius:"5px",background:"linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)",outline:"none",cursor:"grab"}}),l.jsxs("div",{style:{fontSize:"11px",color:"#8b98a5",marginTop:"2px",display:"flex",justifyContent:"space-between"},children:[l.jsx("span",{children:"Góc pha màu (Độ)"}),l.jsxs("span",{children:[O,"°"]})]}),l.jsx("input",{type:"range",min:"0",max:"360",value:O,onChange:ve=>F(parseInt(ve.target.value)),style:{width:"100%",height:"8px",WebkitAppearance:"none",borderRadius:"5px",background:"#2a475e",outline:"none",cursor:"grab"}})]})]}):["vip_plus","admin","super_admin"].includes((n==null?void 0:n.role)||"")?l.jsxs("div",{style:{display:"flex",gap:"8px",marginTop:"4px"},children:[l.jsx("input",{type:"color",value:$||"#ffffff",onChange:ve=>z(ve.target.value),style:{width:"40px",height:"30px",padding:0,border:"none",background:"none",cursor:"pointer"}}),l.jsx("input",{type:"text",value:$,onChange:ve=>z(ve.target.value),placeholder:"#Mã HEX",style:{flex:1,background:"#171a21",border:"1px solid #323f53",color:"#fff",padding:"4px 8px",borderRadius:"4px"}})]}):null,l.jsxs("div",{style:{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"4px"},children:[l.jsx("button",{onClick:()=>X(!1),style:{background:"transparent",border:"none",color:"#8b98a5",cursor:"pointer",padding:"4px 12px"},children:"Huỷ"}),l.jsx("button",{onClick:J,disabled:v,style:{background:"#4caf50",border:"none",color:"#fff",cursor:"pointer",padding:"4px 12px",borderRadius:"4px"},children:"Lưu màu"})]})]})]}),l.jsxs("div",{className:"account-details-id",children:[i("accountDetails.accountIdLabel")," ",(n==null?void 0:n.id)||"N/A"]})]})]}),l.jsxs("div",{className:"account-details-content",children:[l.jsxs("div",{className:"account-tabs-sidebar",children:[l.jsx("button",{className:`account-tab-btn $ {
      W==="account"?"active":""
    }
    `,onClick:()=>U("account"),children:"Tài khoản"}),l.jsx("button",{className:`account-tab-btn $ {
      W==="contact"?"active":""
    }
    `,onClick:()=>U("contact"),children:"Liên lạc"}),l.jsx("button",{className:`account-tab-btn $ {
      W==="notification"?"active":""
    }
    `,onClick:()=>U("notification"),children:"Thông báo"}),l.jsx("button",{className:`account-tab-btn $ {
      W==="system_setup"?"active":""
    }
    `,onClick:()=>{U("system_setup"),be(null)},children:"Thiết lập hệ thống"})]}),l.jsxs("div",{className:"account-details-main",children:[w&&l.jsx("div",{className:"account-message error",children:w}),T&&l.jsx("div",{className:"account-message success",children:T}),W==="account"&&l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"account-section",children:[l.jsx("div",{className:"account-section-header",children:l.jsx("h2",{className:"account-section-title",children:i("accountDetails.storeHistoryTitle")})}),l.jsx("div",{className:"account-section-content",children:l.jsxs("div",{className:"account-wallet-info",children:[l.jsxs("div",{className:"account-wallet-top",children:[l.jsx("div",{className:"account-wallet-label",children:i("accountDetails.walletBalanceLabel")}),l.jsxs("div",{className:"account-wallet-value",children:[n!=null&&n.p_balance?Math.round(Number(n.p_balance)).toLocaleString("vi-VN"):"0"," G"]})]}),l.jsxs("div",{className:"account-wallet-actions",children:[l.jsx("button",{className:"account-change-btn",onClick:()=>r("/account/history"),"data-tutorial-id":"account-view-history",children:i("accountDetails.viewPurchaseHistory")}),l.jsx("button",{className:"account-change-btn",onClick:()=>r("/store-settings"),"data-tutorial-id":"account-store-settings",children:i("accountDetails.storeLanguageButton")})]})]})})]}),l.jsxs("div",{className:"account-section",children:[l.jsx("div",{className:"account-section-header",children:l.jsx("h2",{className:"account-section-title",children:i("accountDetails.accountInfoTitle")})}),l.jsxs("div",{className:"account-section-content",children:[l.jsxs("div",{className:"account-info-row role-row",children:[l.jsx("div",{className:"account-info-label",children:i("accountDetails.roleLabel")}),l.jsxs("div",{className:"account-info-value",children:[l.jsx(cX,{role:n==null?void 0:n.role}),(n==null?void 0:n.has_vip_voice)&&l.jsxs("div",{className:"role-badge",style:{color:"#2ecc71",background:"rgba(46, 204, 113, 0.1)",marginLeft:"8px"},children:[l.jsx(U4,{className:"role-icon"}),l.jsx("span",{children:"VIP Voice"})]}),((n==null?void 0:n.role)==="user"||(n==null?void 0:n.role)==="vip"||(n==null?void 0:n.role)==="netflix")&&l.jsxs("button",{className:"account-vip-btn",onClick:()=>k(!0),"data-tutorial-id":"account-buy-vip",children:[l.jsx(Cc,{className:"vip-btn-icon"}),(n==null?void 0:n.role)==="vip"?i("accountDetails.upgradeVip"):(n==null?void 0:n.role)==="netflix"?"Upgrade":i("accountDetails.buyVip")]})]})]}),((n==null?void 0:n.vip_expires_at)||(n==null?void 0:n.role)==="admin"||(n==null?void 0:n.role)==="super_admin")&&l.jsxs("div",{className:"account-info-row",children:[l.jsx("div",{className:"account-info-label",children:i("accountDetails.vipExpiresAt")}),l.jsx("div",{className:"account-info-value",children:(n==null?void 0:n.role)==="admin"||(n==null?void 0:n.role)==="super_admin"?l.jsx("span",{className:"vip-permanent-badge",children:i("accountDetails.vipPermanent")}):n!=null&&n.vip_expires_at?l.jsxs(l.Fragment,{children:[l.jsx("span",{className:"vip-expiry-date",children:new Date(n.vip_expires_at).toLocaleDateString("vi-VN",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}),new Date(n.vip_expires_at)<new Date&&l.jsx("span",{className:"vip-expired-badge",children:"Đã hết hạn"})]}):null})]}),C&&C.status==="active"&&l.jsxs("div",{className:"account-info-row",children:[l.jsx("div",{className:"account-info-label",children:i("accountDetails.subscriptionExpiresAt")}),l.jsxs("div",{className:"account-info-value",children:[l.jsx("span",{className:"subscription-expiry-date",children:new Date(C.expires_at).toLocaleDateString("vi-VN",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"})}),l.jsx("span",{className:`subscription-status subscription-status-$ {
      C.status
    }
    `,children:C.status==="active"?"Đang hoạt động":C.status==="expired"?"Đã hết hạn":"Đã hủy"})]})]})]})]})]}),W==="contact"&&l.jsxs("div",{className:"account-section",children:[l.jsx("div",{className:"account-section-header",children:l.jsx("h2",{className:"account-section-title",children:i("accountDetails.contactInfoTitle")})}),l.jsxs("div",{className:"account-section-content",children:[l.jsxs("div",{className:"account-contact-item",children:[l.jsx("div",{className:"account-contact-label",children:i("accountDetails.emailLabel")}),c?l.jsxs("div",{className:"account-contact-edit",children:[l.jsx("input",{type:"email",value:h,onChange:ve=>m(ve.target.value),className:"account-edit-input",disabled:v}),l.jsxs("div",{className:"account-edit-actions",children:[l.jsx("button",{className:"account-edit-btn save",onClick:ie,disabled:v,children:i("accountDetails.save")}),l.jsx("button",{className:"account-edit-btn cancel",onClick:()=>{d(!1),m((n==null?void 0:n.email)||""),S(null)},disabled:v,children:i("accountDetails.cancel")})]})]}):l.jsxs("div",{className:"account-contact-value",children:[l.jsx("span",{children:(n==null?void 0:n.email)||"N/A"}),l.jsx("button",{className:"account-change-btn",onClick:()=>d(!0),children:i("accountDetails.changeEmail")})]})]}),l.jsxs("div",{className:"account-contact-item",children:[l.jsx("div",{className:"account-contact-label",children:i("accountDetails.phoneLabel")}),u?l.jsxs("div",{className:"account-contact-edit",children:[l.jsx("input",{type:"tel",value:p,onChange:ve=>y(ve.target.value),className:"account-edit-input",placeholder:i("accountDetails.phonePlaceholder"),disabled:v}),l.jsxs("div",{className:"account-edit-actions",children:[l.jsx("button",{className:"account-edit-btn save",onClick:fe,disabled:v,children:i("accountDetails.save")}),l.jsx("button",{className:"account-edit-btn cancel",onClick:()=>{f(!1),y((n==null?void 0:n.phone_number)||""),S(null)},disabled:v,children:i("accountDetails.cancel")})]})]}):l.jsxs("div",{className:"account-contact-value",children:[l.jsx("span",{children:(n==null?void 0:n.phone_number)||i("accountDetails.phoneNotSet")}),l.jsx("button",{className:"account-change-btn",onClick:()=>f(!0),children:i("accountDetails.managePhone")})]})]})]})]}),W==="notification"&&l.jsxs("div",{className:"account-section",children:[l.jsx("div",{className:"account-section-header",children:l.jsx("h2",{className:"account-section-title",children:"Cài đặt thông báo"})}),l.jsxs("div",{className:"account-section-content",children:[l.jsxs("div",{className:"notif-toggle-row",children:[l.jsxs("div",{children:[l.jsx("div",{className:"notif-toggle-label",children:"Tắt tiếng"}),l.jsx("div",{className:"notif-toggle-desc",children:"Không phát âm thanh khi có tin nhắn mới"})]}),l.jsxs("label",{className:"notif-toggle-switch",children:[l.jsx("input",{type:"checkbox",checked:q,onChange:ve=>{Q(ve.target.checked),localStorage.setItem("notif_mute_sound",ve.target.checked?"1":"0")}}),l.jsx("span",{className:"notif-toggle-slider"})]})]}),l.jsxs("div",{className:"notif-toggle-row",children:[l.jsxs("div",{children:[l.jsx("div",{className:"notif-toggle-label",children:"Tắt popup thông báo"}),l.jsxs("div",{className:"notif-toggle-desc",children:["Không hiện cửa sổ popup khi có tin nhắn (tiết kiệm RAM khi chơi game).",l.jsx("br",{}),l.jsx("span",{style:{color:"#facc15",fontSize:"11px"},children:"Mặc định: TẮT — gạt sang phải để bật"})]})]}),l.jsxs("label",{className:"notif-toggle-switch",children:[l.jsx("input",{type:"checkbox",checked:te,onChange:ve=>{ee(ve.target.checked),localStorage.setItem("notif_disable_popup",ve.target.checked?"1":"0")}}),l.jsx("span",{className:"notif-toggle-slider"})]})]})]})]}),W==="system_setup"&&l.jsxs("div",{className:"account-section",children:[l.jsx("div",{className:"account-section-header",children:l.jsx("h2",{className:"account-section-title",children:"Thiết lập hệ thống"})}),l.jsxs("div",{className:"account-section-content",children:[l.jsxs("div",{style:{color:"#fbbf24",fontSize:"13px",marginBottom:"20px",padding:"12px 16px",background:"rgba(251, 191, 36, 0.1)",borderRadius:"8px",border:"1px solid rgba(251, 191, 36, 0.2)",display:"flex",alignItems:"center",gap:"8px"},children:[l.jsx("span",{children:"⚠"}),l.jsxs("span",{children:[l.jsx("strong",{children:"Yêu cầu quyền Administrator"}),' — vui lòng bấm "Yes" ở hộp thoại hệ thống khi sử dụng các tính năng bên dưới.']})]}),se&&l.jsxs("div",{style:{padding:"12px 16px",borderRadius:"8px",marginBottom:"20px",fontSize:"13px",display:"flex",alignItems:"center",gap:"8px",background:se.ok?"rgba(34,197,94,0.12)":"rgba(239,68,68,0.12)",color:se.ok?"#4ade80":"#fca5a5",border:`1px solid $ {
      se.ok?"rgba(34,197,94,0.3)":"rgba(239,68,68,0.3)"
    }
    `},children:[l.jsx("span",{children:se.ok?"✅":"⚠️"}),l.jsx("span",{children:se.msg})]}),l.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.4)",border:"1px solid rgba(255, 255, 255, 0.05)",borderRadius:"12px",padding:"18px",marginBottom:"16px"},children:[l.jsxs("div",{style:{marginBottom:"16px"},children:[l.jsx("h3",{style:{margin:"0 0 6px",color:"#f8fafc",fontSize:"15px",fontWeight:"600",display:"flex",alignItems:"center",gap:"6px"},children:"Bảo vệ hệ thống (Antivirus)"}),l.jsx("p",{style:{margin:0,color:"#94a3b8",fontSize:"13px",lineHeight:"1.5"},children:"Tắt phần mềm diệt virus và chặn cập nhật Windows để tránh mất token."})]}),l.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:[l.jsx("button",{disabled:he,onClick:async()=>{me(!0),be(null);try{const ve=await oe("toggle_system_protection",{enable:!1});be({ok:!0,msg:ve})}catch(ve){be({ok:!1,msg:typeof ve=="string"?ve:(ve==null?void 0:ve.message)||"Có lỗi xảy ra"})}finally{me(!1)}},style:{padding:"10px 20px",borderRadius:"8px",border:"none",background:he?"#555":"linear-gradient(135deg, #dc2626, #b91c1c)",color:"#fff",fontSize:"13px",fontWeight:"bold",cursor:he?"not-allowed":"pointer",opacity:he?.6:1,transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"8px",minWidth:"180px",justifyContent:"center"},children:he?"Đang xử lý...":"🔴 TẮT AV (KHUYÊN DÙNG)"}),l.jsx("button",{disabled:he,onClick:async()=>{me(!0),be(null);try{const ve=await oe("toggle_system_protection",{enable:!0});be({ok:!0,msg:ve})}catch(ve){be({ok:!1,msg:typeof ve=="string"?ve:(ve==null?void 0:ve.message)||"Có lỗi xảy ra"})}finally{me(!1)}},style:{padding:"10px 20px",borderRadius:"8px",border:"1px solid rgba(16, 185, 129, 0.3)",background:he?"#555":"rgba(16, 185, 129, 0.1)",color:"#10b981",fontSize:"13px",fontWeight:"bold",cursor:he?"not-allowed":"pointer",opacity:he?.6:1,transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"8px",minWidth:"180px",justifyContent:"center"},children:he?"Đang xử lý...":"🟢 KHÔI PHỤC"})]})]}),l.jsxs("div",{style:{background:"rgba(15, 23, 42, 0.4)",border:"1px solid rgba(255, 255, 255, 0.05)",borderRadius:"12px",padding:"18px"},children:[l.jsxs("div",{style:{marginBottom:"16px"},children:[l.jsx("h3",{style:{margin:"0 0 6px",color:"#f8fafc",fontSize:"15px",fontWeight:"600",display:"flex",alignItems:"center",gap:"6px"},children:"📁 Ngoại lệ thư mục (Exclusions)"}),l.jsx("p",{style:{margin:0,color:"#94a3b8",fontSize:"13px",lineHeight:"1.5"},children:"Thêm Goslynk vào danh sách loại trừ của Windows Defender để tải game không bị lỗi và tối ưu hóa hệ thống."})]}),l.jsx("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap"},children:l.jsx("button",{disabled:he,onClick:async()=>{me(!0),be(null);try{const ve=await oe("add_defender_exclusion");be(ve?{ok:!0,msg:"Đã thêm Goslynk vào danh sách ngoại lệ thành công."}:{ok:!1,msg:"Bạn đã hủy hoặc UAC bị từ chối."})}catch(ve){be({ok:!1,msg:typeof ve=="string"?ve:(ve==null?void 0:ve.message)||"Lỗi khi thêm ngoại lệ"})}finally{me(!1)}},style:{padding:"10px 20px",borderRadius:"8px",border:"1px solid rgba(59, 130, 246, 0.3)",background:he?"#555":"rgba(59, 130, 246, 0.1)",color:"#60a5fa",fontSize:"13px",fontWeight:"bold",cursor:he?"not-allowed":"pointer",opacity:he?.6:1,transition:"all 0.2s ease",display:"flex",alignItems:"center",gap:"8px",minWidth:"180px",justifyContent:"center"},children:he?"Đang xử lý...":"🛡️ THÊM NGOẠI LỆ"})})]})]})]})]})]}),l.jsx(Y4,{isOpen:x,onClose:()=>k(!1),onPurchaseSuccess:()=>{k(!1),t()},isUpgrade:(n==null?void 0:n.role)==="vip"})]})}function uX(){var y,v,b;const{user:n,sessionId:e}=nn(),t=oi(),i=br(),{t:r}=ni(),{startTutorial:s,isActive:a}=la(),[o,c]=g.useState([]),[d,u]=g.useState(!0),[f,h]=g.useState(null),m=g.useRef(!1);g.useEffect(()=>{if(!e||!n){u(!1);return}(async()=>{try{const S=await fetch(`$ {
      Se
    }
    /wishlist?sessionId=$ {
      e
    }
    `,{headers:{Authorization:`Bearer $ {
      e
    }
    `}});if(!S.ok)throw new Error("Failed to fetch wishlist");const T=await S.json();T.success&&c(T.games||[])}catch(S){h(S instanceof Error?S.message:`$ {
      r("wishlist.errorPrefix")
    }
    : Lỗi tải wishlist`)}finally{u(!1)}})()},[e,n]),g.useEffect(()=>{if(!n||d||(!a&&m.current&&(m.current=!1),a||m.current))return;const w=i.state&&i.state.replayTutorial==="wishlist";if(!w)return;m.current=!0;const S=[{id:"wishlist-browse",target:".wishlist-title",title:r("tutorial.wishlistPage.browse.title"),description:r("tutorial.wishlistPage.browse.description"),position:"bottom",navigateTo:"/store",tutorialKey:"wishlist"}],T=setTimeout(()=>{s(S),w&&t(i.pathname,{replace:!0,state:{...i.state,replayTutorial:void 0}})},800);return()=>clearTimeout(T)},[n==null?void 0:n.id,d,s,r,a,(y=n==null?void 0:n.tutorial_completed)==null?void 0:y.welcome,(v=n==null?void 0:n.tutorial_completed)==null?void 0:v.cart,(b=n==null?void 0:n.tutorial_completed)==null?void 0:b.wishlist]);const p=async w=>{if(e)try{(await fetch(`$ {
      Se
    }
    /wishlist/remove`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer $ {
      e
    }
    `},body:JSON.stringify({game_id:w,sessionId:e})})).ok&&(c(T=>T.filter(E=>E.game_id!==w)),window.dispatchEvent(new CustomEvent("wishlistUpdated")))}catch(S){console.error("Failed to remove from wishlist:",S)}};return f?l.jsx("div",{className:"wishlist-page",children:l.jsx("div",{className:"wishlist-container",children:l.jsx("div",{className:"wishlist-error",children:f})})}):l.jsx("div",{className:"wishlist-page",children:l.jsxs("div",{className:"wishlist-container",children:[l.jsxs("div",{className:"wishlist-header",children:[l.jsx("h1",{className:"wishlist-title",children:r("wishlist.title")}),l.jsxs("div",{className:"wishlist-count",children:[o.length," ",o.length===1?r("wishlist.countSingle"):r("wishlist.countMultiple")]})]}),o.length===0&&!d?l.jsxs("div",{className:"wishlist-empty",children:[l.jsx("p",{children:r("wishlist.emptyText")}),l.jsx("button",{className:"wishlist-browse-btn",onClick:()=>t("/store"),"data-tutorial-id":"wishlist-browse",children:r("wishlist.browseStore")})]}):l.jsx("div",{className:"wishlist-grid",children:o.map(w=>{const S=Math.round(Number(w.price??0)),T=S===0;return l.jsxs("div",{className:"wishlist-item",onClick:()=>t(`/store/$ {
      w.game_id
    }
    `),children:[w.banner_url&&l.jsx("img",{src:w.banner_url,alt:w.game_name,className:"wishlist-item-image"}),l.jsxs("div",{className:"wishlist-item-info",children:[l.jsx("h3",{className:"wishlist-item-title",children:w.game_name}),l.jsxs("div",{className:"wishlist-item-bottom",children:[T?l.jsx("div",{className:"free-chip",children:r("wishlist.free")}):l.jsxs("div",{className:"wishlist-item-price",children:[S.toLocaleString("vi-VN")," G"]}),l.jsx("button",{className:"wishlist-remove-btn",onClick:E=>{E.stopPropagation(),p(w.game_id)},children:r("wishlist.remove")})]})]})]},w.id)})})]})})}const A_=[1e5,2e5,3e5,5e5,1e6,2e6],N_=!1;function fX(){var R,L,A;const{t:n}=ni(),{user:e,sessionId:t}=nn(),i=oi(),r=br(),{startTutorial:s,isActive:a}=la(),[o,c]=g.useState(A_[0]),[d,u]=g.useState(""),[f,h]=g.useState("mbbank"),[m,p]=g.useState([]),y=g.useRef(!1),v={1e5:2e4,2e5:5e4,3e5:1e5,5e5:3e5,1e6:5e5,2e6:8e5},b="goslynk_bonus_config",[w,S]=g.useState({enabled:!1,presets:v}),[T,E]=g.useState(!1),[x,k]=g.useState(!1),[C,_]=g.useState(v),[M,j]=g.useState(!1),[B,G]=g.useState(!1),[W,U]=g.useState(null),q=(e==null?void 0:e.role)==="super_admin",[Q,te]=g.useState({isOpen:!1,message:"",type:"success"}),ee=(N,V="error")=>{te({isOpen:!0,message:N,type:V}),setTimeout(()=>te(O=>({...O,isOpen:!1})),3e3)},he=N=>{try{localStorage.setItem(b,JSON.stringify(N))}catch{}};g.useEffect(()=>{const N=new AbortController;return fetch(`$ {
      Se
    }
    /api/wallet/deposit/config`,{signal:N.signal}).then(V=>V.json()).then(V=>{if(V.success&&V.config){const O={enabled:V.config.enabled,presets:V.config.presets||v};S(O),_(O.presets),he(O)}E(!0)}).catch(V=>{(V==null?void 0:V.name)!=="AbortError"&&E(!0)}),fetch(`$ {
      Se
    }
    /api/banking/config`,{signal:N.signal}).then(V=>V.json()).then(V=>{V.status==="success"&&V.banks&&(p(V.banks),V.banks.length>0&&!V.banks.some(O=>O.id==="mbbank")&&h(V.banks[0].id))}).catch(console.error),()=>N.abort()},[]);const me=async()=>{const N={...w,enabled:!w.enabled};try{const O=await(await fetch(`$ {
      Se
    }
    /api/wallet/deposit/config`,{method:"POST",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer $ {
      t
    }
    `}:{}},body:JSON.stringify(N)})).json();O.success?(S(O.config),he(O.config)):ee("Lỗi toggle bonus: "+O.message)}catch{ee("Lỗi mạng khi toggle bonus")}},se=async()=>{if(!x){k(!0);return}try{const V=await(await fetch(`$ {
      Se
    }
    /api/wallet/deposit/config`,{method:"POST",headers:{"Content-Type":"application/json",...t?{Authorization:`Bearer $ {
      t
    }
    `}:{}},body:JSON.stringify({enabled:(w==null?void 0:w.enabled)??!1,presets:C})})).json();V.success?(S(V.config),he(V.config),k(!1)):ee("Lỗi lưu config: "+V.message)}catch{ee("Lỗi mạng khi lưu config")}},be=N=>w!=null&&w.enabled&&w.presets[String(N)]||0,K=N=>`$ {
      Math.round(N).toLocaleString("vi-VN")
    }
     G`,X=N=>{const O=N.target.value.replace(/\D/g,"").slice(0,9);u(O);const F=Number(O);!Number.isNaN(F)&&F>0?c(F):c(null)},$=o??(d&&Number(d)||null)??null,z=async()=>{if(!$)return;if($<5e3){ee("Số tiền nạp tối thiểu là 5.000 VND!","warning");return}const N=m.find(O=>O.id===f),V=N?encodeURIComponent(JSON.stringify(N)):"";i(`/deposit/scan?amount=$ {
      $
    }
    &bank=$ {
      V
    }
    `)};g.useEffect(()=>{var F,J,re;if(!e||(!a&&y.current&&(y.current=!1),a||y.current))return;const N=r.state&&r.state.replayTutorial==="deposit";if(!N)return;if(!N){if(!(((F=e==null?void 0:e.tutorial_completed)==null?void 0:F.welcome)===!0)||!(((J=e==null?void 0:e.tutorial_completed)==null?void 0:J.account_details)===!0))return;if(((re=e==null?void 0:e.tutorial_completed)==null?void 0:re.deposit)===!0){y.current=!1;return}}y.current=!0;const V=[{id:"deposit-amount-selection",target:"[data-tutorial-id='deposit-amount-options']",title:"Chọn số tiền",description:"Vui lòng chọn mệnh giá có sẵn hoặc nhập số tiền tùy ý bạn muốn nạp vào ví.",position:"right"},{id:"deposit-continue-button",target:"[data-tutorial-id='deposit-continue-button']",title:n("tutorial.depositPage.continue.title"),description:n("tutorial.depositPage.continue.description"),position:"top",navigateTo:"/cart",tutorialKey:"deposit"}],O=setTimeout(()=>{s(V),N&&i(r.pathname,{replace:!0,state:{...r.state,replayTutorial:void 0}})},800);return()=>clearTimeout(O)},[e==null?void 0:e.id,s,n,a,(R=e==null?void 0:e.tutorial_completed)==null?void 0:R.welcome,(L=e==null?void 0:e.tutorial_completed)==null?void 0:L.account_details,(A=e==null?void 0:e.tutorial_completed)==null?void 0:A.deposit]);const D=$?be($):0;return l.jsxs(l.Fragment,{children:[l.jsxs("div",{className:"deposit-page",children:[q&&T&&l.jsxs("div",{className:"deposit-admin-bar",children:[l.jsx("span",{className:"deposit-admin-label",children:"⚡ Bonus Event"}),l.jsxs("label",{className:"deposit-toggle",children:[l.jsx("input",{type:"checkbox",checked:w.enabled,onChange:me}),l.jsx("span",{className:"deposit-toggle-slider"})]}),l.jsx("span",{className:`deposit-admin-status $ {
      w.enabled?"on":"off"
    }
    `,children:w.enabled?"BẬT":"TẮT"}),l.jsx("button",{className:"deposit-admin-edit-btn",onClick:se,children:x?"Lưu":"Chỉnh sửa bonus"}),N_,x&&l.jsx("button",{className:"deposit-admin-cancel-btn",onClick:()=>{_(w.presets),k(!1)},children:"✕ Huỷ"}),!T&&l.jsx("span",{style:{fontSize:11,color:"#8ca0b5",marginLeft:4},children:"(đang load...)"})]}),l.jsxs("div",{className:"deposit-breadcrumb",children:[l.jsx("span",{children:n("deposit.breadcrumbAccount")}),l.jsx("span",{className:"deposit-breadcrumb-separator",children:" > "}),l.jsx("span",{children:n("deposit.breadcrumbWallet")})]}),l.jsx("h1",{className:"deposit-title",children:n("deposit.title")}),l.jsxs("div",{className:"deposit-layout",children:[l.jsxs("section",{className:"deposit-options","data-tutorial-id":"deposit-amount-options",children:[l.jsx("h2",{className:"deposit-section-title",children:n("deposit.selectAmount")}),l.jsx("div",{className:"deposit-presets",children:A_.map(N=>{const V=w.presets[String(N)]||0,O=C[String(N)]??V,F=x?O:q?V:be(N),J=$===N,re=N<=2e5?"blue":N<=5e5?"gold":"purple";return l.jsxs("button",{className:`deposit-amount-btn $ {
      J?"active":""
    }
     $ {
      F>0?`has-bonus tier-${re}`:""
    }
    `,onClick:()=>{c(N),u("")},children:[l.jsx("span",{className:"deposit-amount-main",children:K(N)}),x&&q?l.jsxs("span",{className:`deposit-bonus-badge tier-$ {
      re
    }
    `,children:["+",l.jsx("input",{className:"deposit-bonus-input",value:O,onChange:ie=>_(fe=>({...fe,[String(N)]:Number(ie.target.value.replace(/\D/g,""))||0})),onClick:ie=>ie.stopPropagation()})," G"]}):F>0?l.jsxs("span",{className:`deposit-bonus-badge tier-$ {
      re
    }
    `,children:["+",K(F)]}):null]},N)})}),l.jsxs("div",{className:"deposit-custom",children:[l.jsx("label",{className:"deposit-label",children:n("deposit.customLabel")}),l.jsxs("div",{className:"deposit-custom-input-row",children:[l.jsx("input",{type:"text",value:d,onChange:X,placeholder:n("deposit.customPlaceholder"),maxLength:12}),l.jsx("span",{className:"deposit-suffix",children:"G"})]}),l.jsxs("div",{style:{marginTop:"30px",fontSize:"13px",color:"#66c0f4",display:"flex",alignItems:"center",justifyContent:"center",gap:"6px"},children:[l.jsxs("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("circle",{cx:"12",cy:"12",r:"10"}),l.jsx("line",{x1:"12",y1:"16",x2:"12",y2:"12"}),l.jsx("line",{x1:"12",y1:"8",x2:"12.01",y2:"8"})]}),n("deposit.customNote")]})]})]}),l.jsxs("aside",{className:"deposit-summary",children:[l.jsxs("div",{className:"deposit-payment-card",children:[l.jsx("div",{className:"deposit-section-title",children:n("deposit.paymentMethodTitle")}),m.length>0?m.map(N=>l.jsxs("label",{className:"deposit-payment-option",style:{marginBottom:"10px",cursor:"pointer"},children:[l.jsx("input",{type:"radio",name:"paymentMethod",checked:f===N.id,onChange:()=>h(N.id),value:N.id}),l.jsx("div",{className:"deposit-payment-icon",style:{fontSize:"14px",fontWeight:"bold",width:"40px",display:"flex",alignItems:"center",justifyContent:"center"},children:N.name.split(" ")[0]}),l.jsxs("div",{children:[l.jsx("div",{className:"deposit-payment-title",children:N.name}),l.jsx("div",{className:"deposit-payment-desc",children:N.desc})]})]},N.id)):l.jsxs("label",{className:"deposit-payment-option",children:[l.jsx("input",{type:"radio",checked:!0,readOnly:!0,value:f}),l.jsx("div",{className:"deposit-payment-icon",children:"MB"}),l.jsxs("div",{children:[l.jsx("div",{className:"deposit-payment-title",children:n("deposit.paymentMbName")}),l.jsx("div",{className:"deposit-payment-desc",children:n("deposit.paymentMbDesc")})]})]})]}),l.jsxs("div",{className:"deposit-summary-card",children:[l.jsx("div",{className:"deposit-summary-title",children:n("deposit.selectedAmountTitle")}),l.jsx("div",{className:"deposit-summary-value",children:$?K($):n("deposit.noAmountSelected")}),D>0&&l.jsxs("div",{className:"deposit-bonus-summary",children:[l.jsxs("span",{className:"deposit-bonus-line",children:["🎁 Nhận thêm: ",l.jsxs("strong",{children:["+",K(D)]})]}),l.jsxs("span",{className:"deposit-bonus-total",children:["Tổng nhận: ",l.jsx("strong",{children:K($+D)})]})]}),l.jsx("div",{className:"deposit-summary-note",children:n("deposit.note")}),l.jsx("button",{className:"deposit-primary-btn",disabled:!$,onClick:z,"data-tutorial-id":"deposit-continue-button",children:n("deposit.continue")})]})]})]})]}),N_,Q.isOpen&&l.jsxs("div",{className:`m-toast m-toast-$ {
      Q.type
    }
    `,onClick:()=>te(N=>({...N,isOpen:!1})),children:[l.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",children:Q.type==="success"?l.jsxs(l.Fragment,{children:[l.jsx("path",{d:"M22 11.08V12a10 10 0 11-5.93-9.14"}),l.jsx("polyline",{points:"22 4 12 14.01 9 11.01"})]}):Q.type==="error"?l.jsxs(l.Fragment,{children:[l.jsx("circle",{cx:"12",cy:"12",r:"10"}),l.jsx("line",{x1:"15",y1:"9",x2:"9",y2:"15"}),l.jsx("line",{x1:"9",y1:"9",x2:"15",y2:"15"})]}):l.jsxs(l.Fragment,{children:[l.jsx("circle",{cx:"12",cy:"12",r:"10"}),l.jsx("line",{x1:"12",y1:"8",x2:"12",y2:"12"}),l.jsx("line",{x1:"12",y1:"16",x2:"12.01",y2:"16"})]})}),l.jsx("span",{children:Q.message})]})]})}const hX="mbbank",mX="0777820278",pX="LE HONG PHUC",gX="qr_only",n1=15;function yX(){const{t:n}=ni(),{user:e,checkAuth:t,sessionId:i}=nn(),{showSuccess:r,showError:s}=Ka(),a=oi(),[o]=zB(),[c,d]=g.useState(!1),[u,f]=g.useState(!1),[h,m]=g.useState(!1),[p,y]=g.useState(!1),[v,b]=g.useState("idle"),[w,S]=g.useState(!1),[T,E]=g.useState(n1),[x,k]=g.useState(null),[C,_]=g.useState(null),[M,j]=g.useState(null),B=g.useRef("idle"),G=g.useRef(null),W=g.useRef(0),U=g.useRef(void 0),q=o.get("amount"),Q=q?Number(q):null,te=Q&&Q>0?Math.round(Q):null,ee=o.get("bank"),he=g.useMemo(()=>{if(!ee)return null;try{return JSON.parse(decodeURIComponent(ee))}catch{return null}},[ee]),me=g.useMemo(()=>{if(C)return C;const F=(e==null?void 0:e.username)||(e==null?void 0:e.id)||"GUEST";return`$ {
      n("deposit.qrDescriptionPrefix")
    }
     $ {
      F
    }
    `},[C,e,n]),se=F=>`$ {
      Math.round(F).toLocaleString("vi-VN")
    }
     G`,be=g.useMemo(()=>{if(!te||!C)return null;const F=me.toUpperCase().startsWith("NAP")?me:`$ {
      n("deposit.qrDescriptionPrefix")
    }
     $ {
      me
    }
    `,J=(he==null?void 0:he.bank_id)||hX,re=(he==null?void 0:he.account)||mX,ie=(he==null?void 0:he.accountName)||pX;return{url:`https://img.vietqr.io/image/${J}-${re}-${gX}.png?amount=${te}&addInfo=${encodeURIComponent(F)}&accountName=${encodeURIComponent(ie)}`,description:F}},[te,n,me,C,he]),K=g.useCallback(()=>{const F=G.current;!F||!te||localStorage.setItem("pendingDeposit",JSON.stringify({tx:F,amount:te,bonusAmount:W.current,code:C,polling:!0,ts:Date.now()}))},[te,C]),X=g.useCallback(async()=>{const F=G.current;if(!F||!i){G.current=null,k(null),_(null),S(!1),b("idle"),B.current="idle";return}try{await fetch(`${Se}/wallet/deposit/cancel`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({sessionId:i,transactionId:F})})}catch(J){console.error("Cancel deposit failed:",J)}finally{G.current=null,k(null),_(null),S(!1),b("idle"),B.current="idle",E(n1)}},[i]),$=g.useCallback(async()=>{const F=G.current;if(!F)return!1;m(!0);try{const J=await fetch(`${Se}/wallet/deposit/refresh`,{method:"POST",headers:{"Content-Type":"application/json",...i?{Authorization:`Bearer ${i}`}:{}},body:JSON.stringify({sessionId:i,transactionId:F})}),re=await J.json();return J.ok&&re.success&&re.status==="completed"?(await t(),localStorage.removeItem("pendingDeposit"),G.current=null,a(`/complete?type=deposit&amount=${re.amount||te||""}&tx=${re.transactionId||F}`),!0):!1}catch(J){return console.error("Refresh deposit failed:",J),!1}finally{m(!1)}},[i,t,a,te]),z=async()=>{if(!(!te||p||x)){if(!i){j(n("deposit.demoAlert"));return}j(null),y(!0);try{const F=await fetch(`${Se}/wallet/deposit`,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${i}`},body:JSON.stringify({sessionId:i,amount:te})}),J=await F.json();if(!F.ok||!J.success||!J.transactionId){j(J.message||n("deposit.demoAlert"));return}const re=J.bonusAmount||0;G.current=J.transactionId,W.current=re,k(J.transactionId),_(J.code||null),S(!0),b("grace"),B.current="grace",E(n1)}catch(F){console.error("Create deposit failed:",F),j(n("deposit.demoAlert"))}finally{y(!1)}}},D=async()=>{try{await navigator.clipboard.writeText(me),r(n("deposit.copyCodeSuccess"))}catch{s(n("deposit.copyCodeFail"))}},R=g.useCallback(async()=>{B.current==="grace"&&await X(),a("/deposit")},[X,a]);g.useEffect(()=>{B.current=v},[v]),g.useEffect(()=>{if(v!=="grace")return;const F=window.setInterval(()=>{E(J=>J<=1?(clearInterval(F),b("polling"),B.current="polling",0):J-1)},1e3);return()=>clearInterval(F)},[v]),g.useEffect(()=>{v==="polling"&&K()},[v,K]),g.useEffect(()=>{if(v!=="polling"||!x)return;let F=!1;const J=async()=>{F||await $()};return J(),U.current=window.setInterval(J,5e3),()=>{F=!0,U.current&&clearInterval(U.current)}},[v,x,$]),g.useEffect(()=>()=>{B.current==="grace"&&G.current&&X()},[X]),g.useEffect(()=>{const F=document.body.style.overflow,J=document.documentElement.style.overflow;return document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",()=>{document.body.style.overflow=F,document.documentElement.style.overflow=J}},[]),g.useEffect(()=>{const F=zn();if(d(F),!F)return;(async()=>{try{const ie=await si().isMaximized();f(ie)}catch(re){console.error(re)}})()},[]);const L=async()=>{if(c)try{await si().minimize()}catch(F){console.error(F)}},A=async()=>{if(c)try{const F=si();await F.isMaximized()?(await F.unmaximize(),f(!1)):(await F.maximize(),f(!0))}catch(F){console.error(F)}},N=async()=>{if(B.current==="grace"&&await X(),!c){a("/deposit");return}try{await si().close()}catch(F){console.error(F)}};if(!te)return l.jsx("div",{className:"deposit-scan-page",children:l.jsx("div",{className:"deposit-scan-card",children:l.jsxs("div",{className:"deposit-qr-empty",children:[l.jsx("div",{className:"deposit-qr-note",children:n("deposit.noAmountSelected")}),l.jsx("button",{className:"deposit-qr-btn",onClick:R,children:n("deposit.breadcrumbWallet")})]})})});const V=v==="polling",O=v!=="idle";return l.jsxs("div",{className:"deposit-scan-page",children:[M&&l.jsx("div",{className:"deposit-pending-overlay",children:l.jsxs("div",{className:"deposit-pending-modal",children:[l.jsx("div",{className:"deposit-pending-icon",children:"!"}),l.jsxs("div",{className:"deposit-pending-body",children:[l.jsx("h2",{className:"deposit-pending-title",children:n("deposit.scanErrorTitle")}),l.jsx("p",{className:"deposit-pending-text",children:M}),l.jsx("button",{className:"deposit-pending-btn",onClick:()=>j(null),children:n("deposit.scanErrorOk")})]})]})}),l.jsxs("div",{className:"deposit-scan-drag","data-tauri-drag-region":!0,children:[l.jsx("span",{className:"deposit-scan-drag-title",children:"Goslynk · VietQR"}),c&&l.jsxs("div",{className:"deposit-scan-win-controls","data-tauri-drag-region":"false",children:[l.jsx("button",{className:"deposit-scan-win-btn",onClick:L,"aria-label":"Minimize",children:"–"}),l.jsx("button",{className:"deposit-scan-win-btn",onClick:A,"aria-label":"Maximize",children:u?"❒":"◻"}),l.jsx("button",{className:"deposit-scan-win-btn close",onClick:N,"aria-label":"Close",children:"✕"})]})]}),l.jsxs("div",{className:"deposit-scan-card",children:[l.jsx("div",{className:"deposit-qr-top",children:l.jsxs("div",{className:"deposit-qr-inline-actions",children:[O&&be&&l.jsx("button",{className:"deposit-qr-btn secondary",onClick:()=>window.open(be.url,"_blank"),children:n("deposit.qrOpenImage")}),V&&l.jsx("button",{className:"deposit-qr-btn",onClick:$,disabled:h,children:n(h?"deposit.checking":"deposit.checkTransferred")}),l.jsx("button",{className:"deposit-qr-btn ghost",onClick:R,children:n("deposit.qrClose")})]})}),v==="idle"&&l.jsxs("div",{className:"deposit-scan-idle",children:[l.jsx("div",{className:"deposit-scan-idle-amount",children:se(te)}),l.jsx("p",{className:"deposit-scan-idle-hint",children:n("deposit.scanIdleHint")}),l.jsx("button",{type:"button",className:"deposit-qr-btn primary deposit-scan-idle-cta",onClick:z,disabled:p,children:n(p?"deposit.creating":"deposit.showDepositCode")})]}),w&&l.jsxs("div",{className:"deposit-code-panel",children:[l.jsx("div",{className:"deposit-code-label",children:n("deposit.depositCodeLabel")}),l.jsx("div",{className:"deposit-code-value",children:me}),l.jsx("button",{type:"button",className:"deposit-qr-btn secondary deposit-code-copy",onClick:D,children:n(