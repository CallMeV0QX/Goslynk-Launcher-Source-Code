null))))
}
function Rne() {
  var n=Bc(),e=n[0],t=d3(),i=g.useState(!e),r=i[0],s=i[1],a=Iee();
  return g.useEffect(function() {
    e&&!t||r||s(!0)
  },[r,t,e]),a?g.createElement(wte,null,g.createElement($te,null),g.createElement(jne, {
    renderAll:r
  })):null
}
function jne(n) {
  var e=n.renderAll;
  return e?g.createElement(g.Fragment,null,g.createElement(Ane,null),g.createElement(rne,null),g.createElement(hne,null)):null
}
var Pne=g.memo(Nne,WD),Dne=function(n) {
  AX(e,n);
  function e(i) {
    var r;
    return r=n.call(this,i)||this,r.state= {
      hasError:!1
    },r
  }
  e.getDerivedStateFromError=function() {
    return {
      hasError:!0
    }
  };
  var t=e.prototype;
  return t.componentDidCatch=function(r,s) {
    console.error("Emoji Picker React failed to render:",r,s)
  },t.render=function() {
    return this.state.hasError?null:this.props.children
  },e
}
(g.Component);
function One(n) {
  var e=bee( {
    onEmojiClick:n.onEmojiClick,onReactionClick:n.onReactionClick,onSkinToneChange:n.onSkinToneChange
  });
  return g.createElement(Dne,null,g.createElement(l3.Provider, {
    value:e
  },g.createElement(Pne,Object.assign({},n))))
}
function tL(n) {
  const e=Date.now()-new Date(n).getTime(),t=Math.floor(e/6e4);
  if(t<1)return"Vừa xong";
  if(t<60)return`${t}p`;
  const i=Math.floor(t/60);
  if(i<24)return`${i}h`;
  const r=Math.floor(i/24);
  return r<30?`${r} ngày`:`${Math.floor(r/30)} tháng`
}
const nL=( {
  content:n,renderText:e
})=> {
  const[t,i]=g.useState(!1);
  return n.length>350?l.jsxs(l.Fragment, {
    children:[e(t?n:n.slice(0,350)+"..."),l.jsx("button", {
      onClick:s=> {
        s.stopPropagation(),i(!t)
      },style: {
        background:"transparent",border:"none",color:"#4da8da",cursor:"pointer",padding:"4px 0",fontSize:"12px",fontWeight:"bold",display:"block",marginTop:"4px"
      },children:t?"Thu gọn":"Xem thêm"
    })]
  }):l.jsx(l.Fragment, {
    children:e(n)
  })
},lp=new Map,Ih=new Map,Une=3;
let PS=0;
const DS=[],Fne=async()=> {
  PS>=Une&&await new Promise(n=>DS.push(n)),PS++
},a1=()=> {
  if(PS--,DS.length>0) {
    const n=DS.shift();
    n&&n()
  }
},hT=(n,e,t=3,i=1e3)=> {
  const r=lp.get(n);
  if(r)return r;
  const s={};
  e&&!n.startsWith("blob:")&&!n.startsWith("data:")&&(n.includes("_matrix")||n.includes(po))&&(s.Authorization=`Bearer ${e}`);
  const a=(async()=> {
    await Fne();
    try {
      const o=await fetch(n, {
        headers:s
      });
      if(o.status===429&&t>0)return lp.delete(n),a1(),await new Promise(u=>setTimeout(u,i)),hT(n,e,t-1,i*2);
      if(!o.ok)throw new Error("HTTP "+o.status+" "+o.statusText);
      const c=await o.blob(),d=URL.createObjectURL(c);
      return Ih.set(n,d),a1(),d
    }
    catch(o) {
      throw lp.delete(n),a1(),o
    }
  })();
  return lp.set(n,a),a
},Bne=wi.memo(( {
  src:n,token:e
})=> {
  const[t,i]=g.useState(()=>n.startsWith("data:")||n.startsWith("blob:")?n:Ih.get(n)??null);
  return g.useEffect(()=> {
    if(!n||n.startsWith("data:")||n.startsWith("blob:"))return;
    const r=Ih.get(n);
    if(r) {
      i(r);
      return
    }
    hT(n,e).then(i).catch(()=>i(n))
  },[n,e]),l.jsx("video", {
    src:t||"",controls:!0,playsInline:!0,preload:"metadata",onClick:r=>r.stopPropagation(),style: {
      width:"100%",maxHeight:"300px",borderRadius:"8px",background:"#000"
    }
  })
}),$ne=wi.memo(( {
  src:n,token:e,alt:t,onClick:i,style:r
})=> {
  const[s,a]=g.useState(()=>n.startsWith("data:")||n.startsWith("blob:")?n:Ih.get(n)??null),[o,c]=g.useState(null);
  return g.useEffect(()=> {
    if(s&&!s.startsWith("[object"))return;
    let d=!0;
    return hT(n,e).then(u=> {
      d&&a(u)
    }).catch(u=> {
      console.error("Image fetch error:",u),d&&c(u.message||String(u))
    }),()=> {
      d=!1
    }
  },[n,e]),o?l.jsxs("div", {
    style: {
      color:"#ff4d4f",fontSize:"12px",padding:"8px",background:"rgba(255,0,0,0.1)",borderRadius:"8px"
    },children:["Lỗi tải ảnh: ",o]
  }):s?l.jsx("img", {
    src:s,alt:t,onClick:i?()=>i(s):void 0,style: {
      maxWidth:"100%",borderRadius:"8px",cursor:i?"pointer":"default",display:"block"
    }
  }):l.jsx("div", {
    style: {
      color:"#888",padding:"20px",display:"flex",justifyContent:"center",alignItems:"center",background:"rgba(255,255,255,0.05)",borderRadius:"8px",minHeight:"100px"
    },children:"Đang tải ảnh..."
  })
}),zne=["https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f431.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f638.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f639.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f63a.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f63b.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f63c.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f63d.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f63e.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f63f.png","https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/72x72/1f640.png"];
function Gne() {
  var On,ln,ci,Gi,Yr,pr,ma,Ja,Dl,Zc,Ni,Ho;
  const[n,e]=g.useState(!1),[t,i]=g.useState(!1), {
    user:r,sessionId:s
  }
  =nn(), {
    t:a
  }
  =ni(), {
    showSuccess:o,showError:c,showWarning:d
  }
  =Ka(),u=oi(),f=br(),h=SW(),[m,p]=g.useState([]),[y,v]=g.useState([]),[b,w]=g.useState(""),[S,T]=g.useState(!1),[E,x]=g.useState("emoji"),[k,C]=g.useState(!1),[_,M]=g.useState(null),[j,B]=g.useState(null),[G,W]=g.useState([]),[U,q]=g.useState({}),[Q,te]=g.useState( {
    id:null,role:null,balance:null,gameCount:null,isOnline:!1,lastActive:null,createdAt:null
  }),[ee,he]=g.useState([]),[me,se]=g.useState(!1),[be,K]=g.useState(""),[X,$]=g.useState(!1),[z,D]=g.useState(!1),[R,L]=g.useState([]),[A,N]=g.useState(!1),V=async()=> {
    if(h.client) {
      N(!0),D(!0);
      try {
        const Y=await h.client.publicRooms( {
          limit:1e3
        });
        L(Y.chunk||[])
      }
      catch(Y) {
        c("Lỗi tải phòng: "+Y.message)
      }
      finally {
        N(!1)
      }
    }
  },O=async Y=> {
    var we;
    if(h.client)try {
      await h.client.setRoomDirectoryVisibility(Y,"private"),o(`Đã ẩn phòng ${Y} khỏi danh sách public.`),L(ne=>ne.filter(Be=>Be.room_id!==Y))
    }
    catch(ne) {
      c("Lỗi xóa phòng: "+(((we=ne.data)==null?void 0:we.error)||ne.message))
    }
  },[F,J]=g.useState(!0);
  g.useRef(null);
  const re=g.useRef(null),ie=g.useRef(null),fe=g.useRef(-1),ce=Y=> {
    switch(Y) {
      case"super_admin":return"#f53131ff";
      case"admin":return"#f8ae0eff";
      case"vip_plus":return"#a855f7";
      case"vip":return"#22c55e";
      default:return"#444"
    }
  },ke=Y=> {
    if(!Y||Y==="user")return"none";
    const we=ce(Y);
    return`0 0 10px ${we}80, inset 0 0 6px ${we}40`
  },Pe=g.useRef(!1),[de,ze]=g.useState([]),Xe=500,Ye=g.useRef(0),ve=g.useRef(0),nt=g.useRef([]),[ft,Rt]=g.useState(null),[Mt,Ze]=g.useState(1),[Fe,le]=g.useState(""),[pe,_e]=g.useState("all"),[Ge,Ve]=g.useState(!1),qe=Y=>bh(Y),[rt,bt]=g.useState(null),[mt,Nt]=g.useState(""),[Ae,dt]=g.useState(null),[Wt,Le]=g.useState(null),[Qe,ot]=g.useState(!1),[xt,Ee]=g.useState(260),[Ke,$e]=g.useState(300),[st,Ct]=g.useState(null),[wt,Z]=g.useState(null),[ue,ye]=g.useState(null),Ne=g.useRef({}),et=g.useRef(null),[lt,kt]=g.useState( {
    active:!1,query:"",index:0,startIdx:-1
  }),Gt=g.useRef(null),fn=()=> {
    if(!j)return[];
    const Y=h.getRoomMembers(j).filter(Be=> {
      var xe;
      return Be.userId!==((xe=h.client)==null?void 0:xe.getUserId())
    }),we=lt.query.toLowerCase(),ne=Y.filter(Be=>Be.name.toLowerCase().includes(we)||Be.userId.toLowerCase().includes(we));
    return("all".includes(we)||"allmembers".includes(we))&&wn&&ne.unshift( {
      userId:"@all",name:"All members"
    }),"admin".includes(we)&&ne.unshift( {
      userId:"@admin",name:"Admin team"
    }),ne
  },on=Y=> {
    Y.preventDefault();
    const we=Y.clientX,ne=xt,Be=je=> {
      const Je=Math.min(Math.max(ne+(je.clientX-we),200),500);
      Ee(Je)
    },xe=()=> {
      document.removeEventListener("mousemove",Be),document.removeEventListener("mouseup",xe)
    };
    document.addEventListener("mousemove",Be),document.addEventListener("mouseup",xe)
  },Ot=Y=> {
    Y.preventDefault();
    const we=Y.clientX,ne=Ke,Be=je=> {
      const Je=Math.min(Math.max(ne-(je.clientX-we),250),600);
      $e(Je)
    },xe=()=> {
      document.removeEventListener("mousemove",Be),document.removeEventListener("mouseup",xe)
    };
    document.addEventListener("mousemove",Be),document.addEventListener("mouseup",xe)
  },rn=async(Y,we)=> {
    try {
      console.log(`[BAN DEBUG] Banning "${Y}" for ${we} days...`);
      const Be=await(await fetch(`${Se}/api/chat-admin/ban`, {
        method:"POST",headers: {
          "Content-Type":"application/json",Authorization:`Bearer ${s}`
        },body:JSON.stringify( {
          targetUsername:Y,durationDays:we
        })
      })).json();
      if(console.log("[BAN DEBUG] API response:",Be),Be.success) {
        o(Be.message),console.log("[BAN DEBUG] Getting global_chat room ID...");
        const xe=await h.joinOrCreateRoom("global_chat");
        if(console.log("[BAN DEBUG] global_chat roomId =",xe),xe) {
          const je=`@${Y}:chat.goslynk.online`;
          if(console.log(`[BAN DEBUG] Calling Matrix ban: roomId=${xe}, userId=${je}`),we>0||we===-1)try {
            await h.banUserFromMatrix(xe,Y,"Banned by Admin"),console.log("[BAN DEBUG] Matrix ban SUCCESS")
          }
          catch(Je) {
            console.error("[BAN DEBUG] Matrix ban FAILED:",(Je==null?void 0:Je.data)||(Je==null?void 0:Je.message)||Je)
          }
          else try {
            await h.unbanUserFromMatrix(xe,Y),console.log("[BAN DEBUG] Matrix unban SUCCESS")
          }
          catch(Je) {
            console.error("[BAN DEBUG] Matrix unban FAILED:",(Je==null?void 0:Je.data)||(Je==null?void 0:Je.message)||Je)
          }
        }
        else console.error("[BAN DEBUG] globalRoomId is null/undefined! Ban to Matrix skipped.")
      }
      else c(Be.message)
    }
    catch(ne) {
      c("Lỗi cấm chat: "+ne.message)
    }
    Z(null)
  },mi=(Y,we)=> {
    wn&&(Y.preventDefault(),Z( {
      x:Y.clientX,y:Y.clientY,targetUsername:we
    }))
  };
  g.useEffect(()=> {
    const Y=()=> {
      Ct(null),Z(null)
    };
    return window.addEventListener("click",Y),window.addEventListener("scroll",Y,!0),()=> {
      window.removeEventListener("click",Y),window.removeEventListener("scroll",Y,!0)
    }
  },[]),g.useEffect(()=> {
    const we=new URLSearchParams(f.search).get("peerId");
    we&&M(we)
  },[f.search]),g.useEffect(()=> {
    if(!Pe.current)return Pe.current=!0,pE(),()=>{}
  },[]);
  const wn=g.useMemo(()=>(r==null?void 0:r.role)==="admin"||(r==null?void 0:r.role)==="super_admin",[r]),Nr=!!r&&!wn;
  g.useEffect(()=> {
    const Y=zn();
    if(e(Y),!Y)return;
    (async()=> {
      try {
        const Be=await si().isMaximized();
        i(Be)
      }
      catch{}
    })()
  },[]);
  const Rr=async()=> {
    if(n)try {
      await si().minimize()
    }
    catch{}
  },hn=async()=> {
    if(n)try {
      const Y=si();
      await Y.isMaximized()?(await Y.unmaximize(),i(!1)):(await Y.maximize(),i(!0))
    }
    catch{}
  },_n=async()=> {
    if(n)try {
      await si().close()
    }
    catch{}
  },Pn=Y=> {
    const we=Date.now();
    if(we-Ye.current<Xe) {
      c("Vui lòng đợi 1–2 giây trước khi gửi file mới.");
      return
    }
    const ne=Array.from(Y),Be=[];
    for(const xe of ne) {
      const je=xe.type.startsWith("video/"),Je=xe.type.startsWith("image/"),ht=Je?5*1024*1024:10*1024*1024,Et=Je?5:10;
      if(xe.size>ht) {
        c(`File "${xe.name}" vượt quá ${Et}MB, không tải lên được.`);
        continue
      }
      Be.push( {
        file:xe,preview:URL.createObjectURL(xe),isImage:Je,isVideo:je
      })
    }
    Be.length>0&&(Ye.current=we,ze(xe=>[...xe,...Be]))
  },zi=async Y=> {
    if(!("clipboardData"in Y)||!Y.clipboardData)return;
    const we=Y.clipboardData;
    let ne=!1;
    if(we.files&&we.files.length>0) {
      ne=!0,Y.preventDefault(),Pn(we.files);
      return
    }
    if(we.items)for(let Be=0;
    Be<we.items.length;
    Be++) {
      const xe=we.items[Be];
      if(xe.kind==="file") {
        ne=!0,Y.preventDefault();
        const je=xe.getAsFile();
        je&&Pn([je]);
        return
      }
    }
    if(!ne&&"clipboard"in navigator&&navigator.clipboard&&"read"in navigator.clipboard)try {
      const Be=await navigator.clipboard.read(),xe=[];
      for(const je of Be)for(const Je of je.types)if(Je.startsWith("image/")||Je.startsWith("video/")||Je.startsWith("application/"))try {
        const ht=await je.getType(Je);
        if(ht) {
          ne=!0,Y.preventDefault();
          let Et="file",Dt=Je;
          Je.startsWith("image/")?Et=Je.split("/")[1]||"png":Je.startsWith("video/")?Et=Je.split("/")[1]||"mp4":Je.startsWith("application/")&&(Et=Je.split("/")[1]||"bin");
          const mn=`pasted-${Je.split("/")[0]}-${Date.now()}.${Et}`,sn=new File([ht],mn, {
            type:Dt
          });
          xe.push(sn)
        }
      }
      catch{}xe.length>0&&Pn(xe)
    }
    catch{}
  },zo=g.useRef(null),ua=(Y,we=1920,ne=.8)=>new Promise(Be=> {
    if(!Y.type.startsWith("image/")||Y.size<200*1024)return Be(Y);
    const xe=new Image,je=URL.createObjectURL(Y);
    xe.onload=()=> {
      URL.revokeObjectURL(je);
      let {
        width:Je,height:ht
      }
      =xe;
      Je>we&&(ht=Math.round(ht*we/Je),Je=we);
      const Et=document.createElement("canvas");
      Et.width=Je,Et.height=ht;
      const Dt=Et.getContext("2d");
      if(!Dt)return Be(Y);
      Dt.drawImage(xe,0,0,Je,ht),Et.toBlob(mn=> {
        if(!mn||mn.size>=Y.size)return Be(Y);
        const sn=new File([mn],Y.name.replace(/\.[^.]+$/,".jpg"), {
          type:"image/jpeg"
        });
        Be(sn)
      },"image/jpeg",ne)
    },xe.onerror=()=> {
      URL.revokeObjectURL(je),Be(Y)
    },xe.src=je
  });
  br().pathname,g.useEffect(()=> {
    if(!(!h.isReady||!r))if(wn) {
      const Y=h.peers.map(we=> {
        const ne=we.id.split("").reduce((Be,xe)=>Be+xe.charCodeAt(0),0);
        return {
          id:we.id,name:we.name,roomAlias:we.roomAlias,avatar:U[we.id.toLowerCase()]||`avatar_${ne%40}`,role:"user"
        }
      });
      W(Y),C(!1),_&&_!=="admin"&&_!=="global"&&!j&&(re.current=_,h.joinOrCreateRoom(_).then(we=> {
        re.current===_&&we&&(B(we),h.selectRoom(we))
      }))
    }
    else(!re.current||re.current==="admin")&&(C(!0),re.current="admin",M("admin"),h.joinOrCreateRoom(r.username).then(Y=> {
      re.current==="admin"&&Y&&(B(Y),h.selectRoom(Y)),C(!1)
    }))
  },[h.isReady,r,wn,h.peers,U]),g.useEffect(()=> {
    if(!wn||!_||_==="admin") {
      te( {
        id:null,role:null,balance:null,gameCount:null,isOnline:!1,lastActive:null,createdAt:null
      }),he([]);
      return
    }
    let Y=!0;
    return(async()=> {
      try {
        const je=((await(await fetch(`${Se}/admin/users`, {
          headers:s? {
            Authorization:`Bearer ${s}`
          }
          :{}
        })).json()).data||[]).find(sn=>sn.username===_);
        if(!je) {
          Y&&te( {
            id:null,role:null,balance:null,gameCount:0,isOnline:!1,lastActive:null,createdAt:null
          });
          return
        }
        const ht=await(await fetch(`${Se}/admin/users/${je.id}/games`, {
          headers:s? {
            Authorization:`Bearer ${s}`
          }
          :{}
        })).json(),Et=Array.isArray(ht.data)?ht.data.length:0,mn=await(await fetch(`${Se}/admin/transactions?search=${je.id}&limit=30`, {
          headers:s? {
            Authorization:`Bearer ${s}`
          }
          :{}
        })).json();
        Y&&(te( {
          id:String(je.id),role:String(je.role||""),balance:Number(je.p_balance||0),gameCount:Et,isOnline:je.is_online===1,lastActive:je.last_login||je.created_at||null,createdAt:je.created_at||null
        }),he(Array.isArray(mn.data)?mn.data:[]))
      }
      catch(ne) {
        console.error("Failed to fetch user stats",ne)
      }
    })(),()=> {
      Y=!1
    }
  },[wn,_,s]),g.useEffect(()=> {
    if(!s)return;
    const Y=new Set;
    r!=null&&r.username&&Y.add(r.username.toLowerCase()),h.messages.forEach(ne=> {
      const Be=ne.senderId.replace("@","").split(":")[0].toLowerCase();
      Be&&!Be.startsWith("otosensei")&&Y.add(Be)
    }),h.peers.forEach(ne=> {
      const Be=ne.id.toLowerCase();
      Be&&Y.add(Be)
    });
    const we=Array.from(Y).filter(ne=>U[ne]===void 0);
    we.length!==0&&fetch(`${Se}/api/users/avatars`, {
      method:"POST",headers: {
        "Content-Type":"application/json",Authorization:`Bearer ${s}`
      },body:JSON.stringify( {
        usernames:we
      })
    }).then(ne=>ne.json()).then(ne=> {
      ne.success&&ne.avatars&&q(Be=> {
        const xe= {
          ...Be,...ne.avatars
        };
        return we.forEach(je=> {
          xe[je]===void 0&&(xe[je]=null)
        }),xe
      })
    }).catch(console.error)
  },[h.messages,h.peers,r,s]),g.useEffect(()=> {
    h.matrixError&&c(`Matrix: ${h.matrixError}`)
  },[h.matrixError]),(On=h.client)==null||On.getUserId(),(ln=r==null?void 0:r.username)==null||ln.toLowerCase(),g.useEffect(()=> {
    const we=h.messages.filter(ne=>!((_==="global"||!j)&&ne.senderId.startsWith("@otosensei:"))).map(ne=> {
      const Be=ne.senderId.replace("@","").split(":")[0];
      let xe="user",je=0;
      return wn?r&&Be.toLowerCase()===r.username.toLowerCase()?(xe=r.role||"admin",je=1):(xe="user",je=0):r&&Be.toLowerCase()===r.username.toLowerCase()?(xe=r.role||"user",je=0):(xe="admin",je=1), {
        id:ne.eventId,sender_id:ne.senderId,receiver_id:"",content:ne.isRedacted?"[[message_recalled]]":ne.editedContent??ne.content,message_type:ne.msgtype==="m.image"?"image":ne.msgtype==="m.video"?"video":ne.msgtype==="m.file"?"file":"text",is_admin_message:je,created_at:new Date(ne.timestamp).toISOString(),sender_name:ne.senderName,sender_avatar_url:U[Be.toLowerCase()]||ne.senderAvatarUrl||null,sender_role:xe,matrixUrl:ne.url,matrixMime:ne.mimeType,matrixFilename:ne.filename,replyPreview:ne.replyPreview,replyToEventId:ne.replyToEventId,mentions:ne.mentions,eventId:ne.eventId,isRedacted:ne.isRedacted
      }
    });
    p(we)
  },[h.messages,U]);
  const We=!h.isReady&&!!j||!j&&!!_,it=g.useRef(0),St=g.useRef(!1),Bt=g.useRef(0);
  g.useEffect(()=> {
    if(!ie.current)return;
    const Y=ie.current,we=it.current;
    if(it.current=m.length,St.current) {
      St.current=!1;
      return
    }
    (we===0||F)&&requestAnimationFrame(()=> {
      try {
        Y.scrollTop=Y.scrollHeight
      }
      catch{}
    })
  },[m.length,_,F]),g.useLayoutEffect(()=> {
    ie.current&&fe.current>=0&&(ie.current.scrollTop=fe.current,fe.current=-1)
  });
  const Si=async Y=> {
    if(T(!1),!j) {
      c("Bạn đã bị khóa khỏi phòng này");
      return
    }
    const we=JSON.stringify( {
      type:"sticker",isSticker:!0,url:Y,mime:"image/gif",name:"sticker.gif"
    });
    await h.sendTextMessage(j,we)
  },Dn=Y=> {
    if(!Y)return"";
    let we=Y.replace(/^>.*\n/gm,"").trim();
    if(we.startsWith("{"))try {
      const ne=JSON.parse(we);
      if(ne.isSticker||ne.type==="sticker")return"[Sticker]";
      if(ne.name)return`[Tệp: ${ne.name}]`;
      if(ne.url||ne.dataUrl)return"[Media]"
    }
    catch{}return we
  },ws=()=> {
    Ws()
  },Ws=async()=> {
    var Je,ht;
    const Y=Date.now();
    if(Y-ve.current<1e3) {
      d(a("friendsChat.spamWarning")||"Vui lòng đợi 1 giây trước khi nhắn tiếp.");
      return
    }
    ve.current=Y,T(!1);
    const we=b.trim(),ne=[...de];
    if(ne.length>0) {
      const Et=Y-6e4;
      if(nt.current=nt.current.filter(Dt=>Dt>Et),nt.current.length+ne.length>5) {
        c("Mỗi phút chỉ được gửi tối đa 5 file. Vui lòng đợi một lát!");
        return
      }
      for(let Dt=0;
      Dt<ne.length;
      Dt++)nt.current.push(Y)
    }
    const Be=ue,xe=!!we,je=ne.length>0;
    if(!(!xe&&!je)) {
      if(!j) {
        c("Bạn đã bị khóa khỏi phòng này");
        return
      }
      if(w(""),ze([]),ye(null),j&&(et.current&&clearTimeout(et.current),h.sendTyping(j,!1)),xe)if(Be) {
        const Et=Dn(Be.content).slice(0,200),Dt=Be.sender_name||Be.sender_id;
        await h.sendReplyMessage(j,we,Be.id,Et,Dt)
      }
      else await h.sendTextMessage(j,we);
      if(je) {
        const Et=((Je=h.client)==null?void 0:Je.getUserId())??"",Dt=((ht=r==null?void 0:r.username)==null?void 0:ht.toLowerCase())??"",mn=ne.map(sn=> {
          const Tn="pending_"+Math.random().toString(36).substring(7);
          let xi="file";
          return sn.isImage?xi="image":sn.isVideo&&(xi="video"), {
            id:Tn,sender_id:Et,receiver_id:"",content:JSON.stringify( {
              url:URL.createObjectURL(sn.file),name:sn.file.name,mime:sn.file.type
            }),message_type:xi,is_admin_message:wn?1:0,created_at:new Date().toISOString(),sender_name:Dt,isSending:!0
          }
        });
        v(sn=>[...sn,...mn]);
        for(let sn=0;
        sn<ne.length;
        sn++) {
          const Tn=ne[sn],xi=mn[sn];
          try {
            const Qa=Tn.isImage?await ua(Tn.file):Tn.file;
            let pa="m.file";
            Tn.isImage?pa="m.image":Tn.isVideo&&(pa="m.video"),await h.sendFileMessage(j,Qa,pa,xi.id,Wv=> {
              v(n2=>n2.map(zu=>zu.id===xi.id? {
                ...zu,sendProgress:Wv
              }
              :zu))
            })
          }
          catch {
            c(a("friendsChat.uploadFailed"))
          }
          finally {
            v(Qa=>Qa.filter(pa=>pa.id!==xi.id))
          }
        }
      }
    }
  },Ss=Y=> {
    _!==Y&&(re.current=Y,M(Y),B(null),p([]),h.selectRoom(""),ze([]),Y==="global"?(h.markRoomRead("global_chat"),h.joinOrCreateRoom("global_chat").then(we=> {
      re.current==="global"&&we&&(B(we),h.selectRoom(we))
    })):Y==="system"&&h.systemRoomId?(h.markRoomRead(h.systemRoomId),B(h.systemRoomId),h.selectRoom(h.systemRoomId)):wn?(h.markRoomRead(Y),h.joinOrCreateRoom(Y).then(we=> {
      re.current===Y&&we&&(B(we),h.selectRoom(we))
    })):!wn&&Y==="admin"&&r&&(h.markRoomRead(r.username),h.joinOrCreateRoom(r.username).then(we=> {
      re.current==="admin"&&we&&(B(we),h.selectRoom(we))
    })))
  },Hr=async(Y,we,ne=!1)=> {
    try {
      const Be=async()=> {
        if(Y.startsWith("blob:")||ne) {
          if(ne) {
            const Dt=Y.indexOf(",");
            return Dt>=0?Y.slice(Dt+1):""
          }
          const Et=await(await fetch(Y)).blob();
          return new Promise((Dt,mn)=> {
            const sn=new FileReader;
            sn.onload=()=> {
              const Tn=sn.result;
              Dt(Tn!=null&&Tn.includes(",")?Tn.split(",")[1]??"":"")
            },sn.onerror=mn,sn.readAsDataURL(Et)
          })
        }
        const je=await fetch(Y);
        if(!je.ok)throw new Error(`HTTP ${je.status} ${je.statusText}`);
        const Je=await je.blob();
        return new Promise((ht,Et)=> {
          const Dt=new FileReader;
          Dt.onload=()=> {
            const mn=Dt.result;
            ht(mn!=null&&mn.includes(",")?mn.split(",")[1]??"":"")
          },Dt.onerror=Et,Dt.readAsDataURL(Je)
        })
      };
      if(n) {
        const je=await Be(),Je=await bX( {
          defaultPath:we,title:"Lưu file"
        });
        Je&&(await oe("save_downloaded_file", {
          path:Je,base64Data:je
        }),o(a("friendsChat.downloadSuccess")));
        return
      }
      if(Y.startsWith("blob:")||ne) {
        const je=document.createElement("a");
        je.href=Y,je.download=we,document.body.appendChild(je),je.click(),document.body.removeChild(je),o(a("friendsChat.downloadSuccess"));
        return
      }
      let xe=!1;
      try {
        const je=await fetch(Y);
        if(!je.ok)throw new Error("Failed to download");
        const Je=await je.blob(),ht=URL.createObjectURL(Je),Et=document.createElement("a");
        Et.href=ht,Et.download=we,document.body.appendChild(Et),Et.click(),document.body.removeChild(Et),URL.revokeObjectURL(ht),o(a("friendsChat.downloadSuccess"))
      }
      catch {
        xe=!0
      }
      xe&&(console.warn("Download fetch failed (CORS?), falling back to browser..."),window.open(Y,"_blank"))
    }
    catch(Be) {
      console.error("Download failed:",Be),c(a("friendsChat.downloadFailed"))
    }
  },Go=Y=> {
    p(we=>we.map(ne=>ne.id===Y.id?Y:ne))
  },Ya=async Y=> {
    const we=Y.currentTarget,ne=we.scrollTop<Bt.current;
    Bt.current=we.scrollTop;
    const Be=we.scrollHeight-we.scrollTop-we.clientHeight<100;
    if(J(Be),ne&&we.scrollTop<=15&&!X&&j) {
      $(!0),St.current=!0;
      const xe=we.scrollHeight;
      await h.loadOlderMessages(j,15)?requestAnimationFrame(()=> {
        we.scrollHeight>xe&&(we.scrollTop=we.scrollHeight-xe)
      }):St.current=!1,$(!1)
    }
  },fa=Y=> {
    const we=Y.sender_id.replace("@","").split(":")[0].toLowerCase();
    !r||we!==r.username.toLowerCase()||Y.message_type!=="text"||(ie.current&&(fe.current=ie.current.scrollTop),bt(Y),Nt(Y.content),Le(null))
  },Vo=()=> {
    bt(null),Nt("")
  },ha=async()=> {
    if(!(!rt||!mt.trim()||!j))try {
      await h.editMessage(j,rt.id,mt.trim()),Vo()
    }
    catch(Y) {
      console.error("Edit failed",Y)
    }
  },Jc=Y=> {
    const we=Y.sender_id.replace("@","").split(":")[0].toLowerCase();
    !r||we!==r.username.toLowerCase()||(ie.current&&(fe.current=ie.current.scrollTop),dt(Y),Le(null))
  },Qc=()=> {
    dt(null)
  },Wo=async Y=> {
    const we=Ae;
    if(!(!we||!j))try {
      Go( {
        ...we,content:"[[message_recalled]]"
      }),await h.redactMessage(j,we.id)
    }
    catch(ne) {
      console.error("Recall failed",ne),Go(we)
    }
    finally {
      dt(null)
    }
  },$u=Y=>Y.content==="[[message_recalled]]",jl=Y=> {
    var ne,Be;
    if($u(Y))return l.jsx("div", {
      className:"friends-chat-message-text recalled",children:"Tin nhắn đã bị thu hồi"
    });
    const we=Y.sender_role==="admin"||Y.sender_role==="super_admin"||Y.is_admin_message===1;
    if(r&&(Y.sender_id===r.id||we&&(r.role==="admin"||r.role)),Y.message_type==="image"||Y.message_type==="video"||Y.content.trim().startsWith("{")) {
      try {
        const xe=JSON.parse(Y.content),je=xe&&(typeof xe.dataUrl=="string"||typeof xe.url=="string"),Je=!(xe!=null&&xe.mime)||typeof xe.mime=="string"&&xe.mime.startsWith("image/"),ht=(xe==null?void 0:xe.mime)&&typeof xe.mime=="string"&&xe.mime.startsWith("video/");
        if(je&&(Je||ht)) {
          let Et=xe.url||xe.dataUrl;
          const Dt=!!xe.isSticker,mn=Et.startsWith("data:");
          Et&&!Et.startsWith("http")&&!Et.startsWith("data:")&&!Et.startsWith("blob:")&&(Et=`${po.replace(/\/$/,"")}${Et}`);
          const sn=(xe==null?void 0:xe.name)||(ht?"video":"image"),Tn=(xe==null?void 0:xe.name)||(ht?"video.mp4":"image.jpg");
          return ht?l.jsxs("div", {
            className:"friends-chat-message-media",children:[l.jsx("div", {
              className:"friends-chat-image-container",children:l.jsx(Bne, {
                src:Et,token:(ne=h.client)==null?void 0:ne.getAccessToken()
              })
            }),(xe==null?void 0:xe.name)&&l.jsx("div", {
              className:"friends-chat-file-name",children:xe.name
            })]
          }):l.jsxs("div", {
            className:"friends-chat-message-media",style:Dt? {
              background:"transparent",padding:0
            }
            :{},children:[l.jsx("div", {
              className:"friends-chat-image-container",children:l.jsx($ne, {
                src:Et,token:(Be=h.client)==null?void 0:Be.getAccessToken(),alt:sn,onClick:xi=>Rt(xi),style:Dt? {
                  border:"none",background:"transparent",boxShadow:"none"
                }
                :{}
              })
            }),(xe==null?void 0:xe.name)&&!Dt&&l.jsx("div", {
              className:"friends-chat-file-name",children:xe.name
            })]
          })
        }
      }
      catch{}if(Y.message_type==="image"&&Y.content.trim().startsWith("data:image")) {
        const xe=Y.content.trim(),je="image",Je="image.jpg",ht=!0;
        return l.jsx("div", {
          className:"friends-chat-message-media",children:l.jsxs("div", {
            className:"friends-chat-image-container",children:[l.jsx("img", {
              src:xe,alt:je,onClick:()=>Rt(xe),style: {
                cursor:"pointer"
              }
            }),l.jsx("div", {
              className:"friends-chat-image-overlay",children:l.jsx("button", {
                className:"friends-chat-download-btn",onClick:Et=> {
                  Et.stopPropagation(),Hr(xe,Je,ht)
                },title:"Download image",children:"⬇"
              })
            })]
          })
        })
      }
    }
    if(Y.message_type==="file")try {
      const xe=JSON.parse(Y.content);
      let je=(xe==null?void 0:xe.url)||(xe==null?void 0:xe.dataUrl)||"#";
      const Je=je.startsWith("data:");
      je&&!je.startsWith("http")&&!je.startsWith("data:")&&je!=="#"&&(je=`${po.replace(/\/$/,"")}${je}`);
      const ht=(xe==null?void 0:xe.name)||"file";
      return l.jsx("div", {
        className:"friends-chat-message-file",children:l.jsx("div", {
          className:"friends-chat-file-header",children:l.jsxs("div", {
            className:"friends-chat-file-info",children:[l.jsx("div", {
              className:"friends-chat-file-name",children:ht
            }),l.jsxs("div", {
              className:"friends-chat-file-meta",children:[xe!=null&&xe.mime?`${xe.mime} • `:"",xe!=null&&xe.size?`${Math.round(xe.size/1024)} KB`:""]
            })]
          })
        })
      })
    }
    catch {
      return l.jsx("div", {
        className:"friends-chat-message-text",style: {
          position:"relative",whiteSpace:"pre-wrap",wordBreak:"break-word"
        },children:l.jsx(nL, {
          content:Y.content,renderText:Kr
        })
      })
    }
    return l.jsxs(l.Fragment, {
      children:[Y.replyPreview&&l.jsxs("div", {
        style: {
          borderLeft:"3px solid #4da8da",paddingLeft:"8px",marginBottom:"6px",cursor:"pointer",opacity:.75
        },onClick:()=> {
          const xe=Y.replyToEventId;
          if(!xe)return;
          const je=Ne.current[xe];
          je&&(je.scrollIntoView( {
            behavior:"smooth",block:"center"
          }),je.style.background="rgba(77,168,218,0.15)",setTimeout(()=> {
            je.style.background=""
          },1500))
        },children:[l.jsx("div", {
          style: {
            fontSize:"11px",color:"#4da8da",fontWeight:600,marginBottom:"2px"
          },children:Y.replyPreview.senderName
        }),(()=> {
          let xe=!1,je="";
          try {
            if(Y.replyPreview.content.trim().startsWith("{")) {
              const Je=JSON.parse(Y.replyPreview.content);
              (Je.isSticker||Je.type==="sticker")&&(xe=!0,je=Je.url)
            }
          }
          catch{}return xe&&je?l.jsxs("div", {
            style: {
              display:"flex",alignItems:"center",gap:"6px"
            },children:[l.jsx("img", {
              src:je,alt:"sticker",style: {
                width:24,height:24,objectFit:"contain",borderRadius:"4px"
              }
            }),l.jsx("div", {
              style: {
                fontSize:"12px",color:"#aaa"
              },children:"[Sticker]"
            })]
          }):l.jsx("div", {
            style: {
              fontSize:"12px",color:"#aaa",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",maxWidth:"300px"
            },children:Dn(Y.replyPreview.content).slice(0,100)
          })
        })()]
      }),l.jsx("div", {
        className:"friends-chat-message-text",style: {
          position:"relative",whiteSpace:"pre-wrap",wordBreak:"break-word"
        },children:l.jsx(nL, {
          content:Y.content.replace(/^>.*\n/gm,"").trim(),renderText:Kr
        })
      })]
    })
  },Pl=Y=> {
    const we=lt.active?fn():[];
    return l.jsxs("div", {
      style: {
        position:"relative"
      },children:[lt.active&&we.length>0&&l.jsxs("div", {
        style: {
          position:"absolute",bottom:"100%",left:"12px",background:"#222",border:"1px solid #333",borderRadius:"8px",padding:"4px",zIndex:1e3,maxHeight:"200px",overflowY:"auto",minWidth:"200px",boxShadow:"0 -4px 12px rgba(0,0,0,0.5)"
        },children:[l.jsx("div", {
          style: {
            fontSize:"11px",color:"#888",padding:"4px 8px",fontWeight:"bold",textTransform:"uppercase"
          },children:"Thành viên"
        }),we.map((ne,Be)=>l.jsxs("div", {
          style: {
            padding:"8px 12px",borderRadius:"4px",background:Be===lt.index?"#333":"transparent",cursor:"pointer",display:"flex",alignItems:"center",gap:"8px"
          },onMouseEnter:()=>kt(xe=>( {
            ...xe,index:Be
          })),onClick:()=> {
            var Je;
            const xe=ne.userId==="@all"?"@all ":ne.userId==="@admin"?"@admin ":`@${ne.name.replace(/ /g,"")} `,je=b.slice(0,lt.startIdx)+xe+b.slice(((Je=Gt.current)==null?void 0:Je.selectionEnd)||0);
            w(je),kt(ht=>( {
              ...ht,active:!1
            })),setTimeout(()=> {
              var ht;
              return(ht=Gt.current)==null?void 0:ht.focus()
            },0)
          },children:[l.jsx("div", {
            style: {
              width:"24px",height:"24px",borderRadius:"50%",background:"#444",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",color:"#fff"
            },children:ne.name.charAt(0).toUpperCase()
          }),l.jsx("div", {
            style: {
              color:"#fff",fontSize:"14px",flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"
            },children:ne.name
          })]
        },ne.userId))]
      }),ue&&l.jsxs("div", {
        style: {
          display:"flex",alignItems:"center",gap:"8px",background:"rgba(77,168,218,0.1)",borderLeft:"3px solid #4da8da",padding:"6px 12px",borderRadius:"4px",margin:"0 50px 4px 12px"
        },children:[l.jsxs("div", {
          style: {
            flex:1,minWidth:0
          },children:[l.jsxs("div", {
            style: {
              fontSize:"11px",color:"#4da8da",fontWeight:600
            },children:["Trả lời ",ue.sender_name||ue.sender_id]
          }),l.jsx("div", {
            style: {
              fontSize:"12px",color:"#aaa",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"
            },children:Dn(ue.content).slice(0,80)
          })]
        }),l.jsx("button", {
          onClick:()=>ye(null),style: {
            background:"none",border:"none",color:"#888",cursor:"pointer",fontSize:"18px",lineHeight:1,padding:"0 4px",flexShrink:0
          },children:"×"
        })]
      }),de.length>0&&l.jsx("div", {
        className:"friends-chat-attachments",children:l.jsx("div", {
          className:"friends-chat-attachments-grid",children:de.map((ne,Be)=>l.jsxs("div", {
            className:"friends-chat-attachment",title:ne.file.name,children:[ne.isImage?l.jsx("img", {
              src:ne.preview,alt:ne.file.name
            }):ne.isVideo?l.jsx("video", {
              src:ne.preview
            }):l.jsxs("div", {
              className:"friends-chat-file-icon",children:[l.jsx("span", {
                children:"📄"
              }),l.jsx("span", {
                className:"file-icon-text",children:ne.file.name.substring(0,10)
              })]
            }),l.jsx("button", {
              className:"friends-chat-attachment-remove",onClick:xe=> {
                xe.stopPropagation(),ze(je=>je.filter((Je,ht)=>ht!==Be))
              },"aria-label":"Remove attachment",children:"✕"
            })]
          },Be))
        })
      }),(()=> {
        const ne=j?h.typingUsers[j]||[]:[];
        return ne.length>0?l.jsxs("div", {
          className:"friends-chat-typing-indicator",style: {
            marginLeft:"12px",marginBottom:"4px",fontSize:"13px",fontWeight:"bold",display:"flex",alignItems:"center",textShadow:"0 0 10px rgba(0,0,0,0.5)"
          },children:[l.jsx("span", {
            style: {
              backgroundImage:"linear-gradient(45deg, #ff6b6b, #ff8e53)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textShadow:"0 0 15px rgba(255, 107, 107, 0.4)"
            },children:ne.join(", ")
          }),l.jsx("span", {
            style: {
              color:"#aaa",marginLeft:"4px",fontWeight:"normal"
            },children:"đang nhập"
          }),l.jsxs("span", {
            className:"fc-typing-dots",style: {
              color:"#aaa",display:"inline-flex",marginLeft:"2px"
            },children:[l.jsx("span", {
              className:"dot",style: {
                animation:"fc-bounce 1.4s infinite ease-in-out both",animationDelay:"-0.32s"
              },children:"."
            }),l.jsx("span", {
              className:"dot",style: {
                animation:"fc-bounce 1.4s infinite ease-in-out both",animationDelay:"-0.16s"
              },children:"."
            }),l.jsx("span", {
              className:"dot",style: {
                animation:"fc-bounce 1.4s infinite ease-in-out both"
              },children:"."
            })]
          })]
        }):null
      })(),l.jsxs("div", {
        className:"friends-chat-input-row",children:[l.jsx("button", {
          className:"friends-chat-attach-btn",onClick:()=> {
            var ne;
            return(ne=zo.current)==null?void 0:ne.click()
          },disabled:k,children:l.jsx(YI, {
            size:16
          })
        }),l.jsx("input", {
          ref:zo,type:"file",multiple:!0,style: {
            display:"none"
          },onChange:ne=> {
            ne.target.files&&(Pn(ne.target.files),ne.target.value="")
          }
        }),l.jsx("textarea", {
          ref:Gt,className:"friends-chat-input",placeholder:Y,value:b,onChange:ne=> {
            const Be=ne.target.value;
            w(Be),j&&(h.sendTyping(j,!0,3e3),et.current&&clearTimeout(et.current),et.current=setTimeout(()=> {
              h.sendTyping(j,!1)
            },3e3));
            const xe=ne.currentTarget;
            xe.style.height="auto",xe.style.height=`${Math.min(xe.scrollHeight,120)}px`;
            const je=xe.selectionStart,ht=Be.slice(0,je).match(/@(\w*)$/);
            kt(ht? {
              active:!0,query:ht[1],index:0,startIdx:ht.index
            }
            :Et=>( {
              ...Et,active:!1
            }))
          },onKeyDown:ne=> {
            var Be;
            if(lt.active) {
              const xe=fn();
              if(ne.key==="ArrowDown") {
                ne.preventDefault(),kt(je=>( {
                  ...je,index:(je.index+1)%xe.length
                }));
                return
              }
              else if(ne.key==="ArrowUp") {
                ne.preventDefault(),kt(je=>( {
                  ...je,index:(je.index-1+xe.length)%xe.length
                }));
                return
              }
              else if(ne.key==="Enter"||ne.key==="Tab") {
                if(ne.preventDefault(),xe.length>0) {
                  const je=xe[lt.index],Je=je.userId==="@all"?"@all ":je.userId==="@admin"?"@admin ":`@${je.name.replace(/ /g,"")} `,ht=b.slice(0,lt.startIdx)+Je+b.slice(((Be=Gt.current)==null?void 0:Be.selectionEnd)||0);
                  w(ht),kt(Et=>( {
                    ...Et,active:!1
                  })),setTimeout(()=> {
                    Gt.current&&(Gt.current.selectionStart=lt.startIdx+Je.length,Gt.current.selectionEnd=lt.startIdx+Je.length)
                  },0)
                }
                return
              }
              else if(ne.key==="Escape") {
                kt(je=>( {
                  ...je,active:!1
                }));
                return
              }
            }
            ne.key==="Enter"&&!ne.shiftKey&&(ne.preventDefault(),ws()),(ne.ctrlKey||ne.metaKey)&&ne.key==="a"&&(ne.preventDefault(),ne.currentTarget.select())
          },onPaste:zi,onDragOver:ne=> {
            ne.preventDefault(),ne.stopPropagation(),ne.currentTarget.classList.add("friends-chat-input-drag-over")
          },onDragLeave:ne=> {
            ne.preventDefault(),ne.stopPropagation(),ne.currentTarget.classList.remove("friends-chat-input-drag-over")
          },onDrop:ne=> {
            ne.preventDefault(),ne.stopPropagation(),ne.currentTarget.classList.remove("friends-chat-input-drag-over"),ne.dataTransfer.files&&ne.dataTransfer.files.length>0&&Pn(ne.dataTransfer.files)
          },disabled:k,rows:1
        }),l.jsx("button", {
          className:"friends-chat-emoji-btn",title:"Biểu tượng cảm xúc",disabled:k,onClick:()=>T(ne=>!ne),children:l.jsx(QH, {
            size:20
          })
        }),S&&l.jsxs("div", {
          style: {
            position:"absolute",bottom:"70px",right:"20px",zIndex:1e3,background:"#222222",borderRadius:"8px",overflow:"hidden",boxShadow:"0 4px 12px rgba(0,0,0,0.5)",display:"flex",flexDirection:"column",border:"1px solid #333"
          },children:[l.jsxs("div", {
            style: {
              display:"flex",borderBottom:"1px solid #333"
            },children:[l.jsx("div", {
              onClick:()=>x("emoji"),style: {
                flex:1,padding:"12px",textAlign:"center",cursor:"pointer",background:E==="emoji"?"#333":"transparent",fontWeight:E==="emoji"?"bold":"normal",color:"#fff"
              },children:"Emoji"
            }),l.jsx("div", {
              onClick:()=>x("sticker"),style: {
                flex:1,padding:"12px",textAlign:"center",cursor:"pointer",background:E==="sticker"?"#333":"transparent",fontWeight:E==="sticker"?"bold":"normal",color:"#fff"
              },children:"Sticker"
            })]
          }),E==="emoji"&&l.jsx(One, {
            theme:tu.DARK,searchPlaceHolder:"Tìm kiếm...",categories:[ {
              category:Vt.SUGGESTED,name:"Gần đây"
            }, {
              category:Vt.SMILEYS_PEOPLE,name:"Mặt cười & Người"
            }, {
              category:Vt.ANIMALS_NATURE,name:"Động vật & Tự nhiên"
            }, {
              category:Vt.FOOD_DRINK,name:"Đồ ăn & Thức uống"
            }, {
              category:Vt.TRAVEL_PLACES,name:"Du lịch & Địa điểm"
            }, {
              category:Vt.ACTIVITIES,name:"Hoạt động"
            }, {
              category:Vt.OBJECTS,name:"Đồ vật"
            }, {
              category:Vt.SYMBOLS,name:"Ký hiệu"
            }, {
              category:Vt.FLAGS,name:"Cờ"
            }
            ],onEmojiClick:ne=> {
              w(Be=>Be+ne.emoji)
            }
          }),E==="sticker"&&l.jsx("div", {
            style: {
              width:"350px",height:"400px",overflowY:"auto",padding:"10px",display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"10px",backgroundColor:"#222"
            },children:(()=> {
              const ne=r&&(r.role==="admin"||r.role==="super_admin"),Be=[],xe=[];
              if(ne)Vf.forEach((je,Je)=>Be.push(`avatar_${Je}`));
              else if(r) {
                for(let je=0;
                je<=4;
                je++)Be.push(`avatar_${je}`);
                if(r.unlocked_avatars) {
                  const je=Array.isArray(r.unlocked_avatars)?r.unlocked_avatars:typeof r.unlocked_avatars=="string"?r.unlocked_avatars.split(",").map(Je=>Je.trim()):[];
                  for(const Je of je)Je&&!Be.includes(Je)&&Be.push(Je)
                }
              }
              return Vf.forEach((je,Je)=> {
                const ht=`avatar_${Je}`;
                Be.includes(ht)||xe.push(ht)
              }),l.jsxs(l.Fragment, {
                children:[Be.map(je=> {
                  const Je=_S(je);
                  return l.jsx("img", {
                    src:Je,alt:je,style: {
                      width:"100%",cursor:"pointer",borderRadius:"8px",objectFit:"contain",background:"transparent",border:"1px solid rgba(255,255,255,0.1)"
                    },onClick:()=>Si(Je),title:"Sử dụng avatar làm sticker"
                  },`ava_${je}`)
                }),zne.map((je,Je)=>l.jsx("img", {
                  src:je,alt:`sticker-${Je}`,style: {
                    width:"100%",cursor:"pointer",borderRadius:"8px",objectFit:"contain",background:"transparent"
                  },onClick:()=>Si(je)
                },`cat_${Je}`)),xe.map(je=> {
                  const Je=_S(je);
                  return l.jsx("img", {
                    src:Je,alt:je,style: {
                      width:"100%",cursor:"pointer",borderRadius:"8px",objectFit:"contain",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.05)",opacity:.5,filter:"grayscale(100%)"
                    },onClick:()=> {
                      u("/store", {
                        state: {
                          openAvatarModal:!0
                        }
                      })
                    },title:"Chưa sở hữu. Bấm để mua."
                  },`unowned_${je}`)
                })]
              })
            })()
          })]
        }),l.jsx("button", {
          className:"friends-chat-send-btn",onClick:ws,disabled:k||!b.trim()&&de.length===0,children:a("friendsChat.send")
        })]
      })]
    })
  },Kr=Y=> {
    const we=/(https?:\/\/[^\s]+|@[^\s:]+)/g;
    return Y.split(we).map((Be,xe)=> {
      if(Be.match(/^https?:\/\/[^\s]+/))return l.jsx("a", {
        href:Be,target:"_blank",rel:"noopener noreferrer",onClick:je=> {
          je.preventDefault(),je.stopPropagation(),n?oe("plugin:shell|open", {
            path:Be
          }).catch(console.error):window.open(Be,"_blank")
        },style: {
          color:"#4da8da",textDecoration:"underline",wordBreak:"break-all"
        },children:Be
      },xe);
      if(Be.startsWith("@")) {
        const je=Be.substring(1).toLowerCase();
        let Je="user";
        if(je==="admin"||je==="all")Je="admin";
        else {
          const Et=G.find(Dt=>Dt.id.toLowerCase()===je||Dt.name.replace(/ /g,"").toLowerCase()===je);
          Et&&(Je=Et.role||"user")
        }
        let ht="#3b82f6";
        return Je==="admin"?ht="#f8ae0eff":Je==="super_admin"?ht="#f53131ff":Je==="vip"?ht="#22c55e":Je==="vip_plus"&&(ht="#a855f7"),l.jsxs("span", {
          className:`friends-chat-mention role-${Je}`,style: {
            color:ht,background:`${ht}20`,padding:"2px 6px",borderRadius:"12px",fontWeight:"bold",display:"inline-flex",alignItems:"center",gap:"4px",margin:"0 2px"
          },children:[Be," ",Je==="admin"||Je==="super_admin"?"⚡":""]
        },xe)
      }
      return l.jsx("span", {
        children:Be
      },xe)
    })
  },xs=Y=> {
    var Je,ht,Et;
    const we=Array.isArray(Y),ne=we?Y[0]:Y,Be=ne.sender_id.replace("@","").split(":")[0],xe=r&&Be.toLowerCase()===r.username.toLowerCase(),je=ne.is_admin_message===1;
    return l.jsxs("div", {
      className:`friends-chat-message ${je?"is-admin-message":"is-user-message"} ${xe?"is-mine":"is-other"}`,ref:Dt=> {
        we?Y.forEach(mn=> {
          Ne.current[mn.id]=Dt
        }):Ne.current[ne.id]=Dt
      },style:ne.isSending? {
        opacity:.6
      }
      :void 0,children:[l.jsx("div", {
        className:"friends-chat-message-avatar",onContextMenu:Dt=>mi(Dt,ne.sender_id.replace("@","").split(":")[0]),style: {
          border:`2px solid ${ce(ne.sender_role||(je?xe?r==null?void 0:r.role:"admin":"user"))}`,boxShadow:ke(ne.sender_role||(je?xe?r==null?void 0:r.role:"admin":"user")),display:xe?"none":"flex"
        },children:je?xe?r!=null&&r.avatar_url?l.jsx("img", {
          src:qe(r.avatar_url),alt:r.username||"Admin"
        }):l.jsx("span", {
          children:((Je=r==null?void 0:r.username)==null?void 0:Je.charAt(0).toUpperCase())||"A"
        }):ne.sender_avatar_url?l.jsx("img", {
          src:qe(ne.sender_avatar_url),alt:ne.sender_name||"Admin"
        }):l.jsx("span", {
          children:((ht=ne.sender_name)==null?void 0:ht.charAt(0).toUpperCase())||"A"
        }):ne.sender_avatar_url?l.jsx("img", {
          src:qe(ne.sender_avatar_url),alt:ne.sender_name||"User"
        }):l.jsx("span", {
          children:((Et=ne.sender_name)==null?void 0:Et.charAt(0).toUpperCase())||"U"
        })
      }),l.jsxs("div", {
        className:"friends-chat-message-content-wrapper",children:[!xe&&l.jsx("div", {
          className:"friends-chat-message-head",children:l.jsx("span", {
            className:`friends-chat-message-author ${je?"is-admin":"is-user"}`,style:ne.sender_name_color?ne.sender_name_color.includes("gradient")? {
              backgroundImage:ne.sender_name_color,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textShadow:"0 0 10px rgba(255,255,255,0.2)"
            }
            : {
              color:ne.sender_name_color,textShadow:`0 0 10px ${ne.sender_name_color}40`
            }
            :{},children:je?ne.sender_name||a("friendsChat.admin"):ne.sender_name||a("friendsChat.user")
          })
        }),we?l.jsxs("div", {
          className:"friends-chat-message-body-wrapper",style: {
            background:"transparent",padding:0,boxShadow:"none"
          },children:[l.jsx("div", {
            style: {
              display:"flex",flexDirection:"row",flexWrap:"wrap",gap:"8px",alignItems:"flex-end",justifyContent:xe?"flex-end":"flex-start"
            },children:Y.map(Dt=>l.jsx("div", {
              onContextMenu:mn=> {
                mn.preventDefault();
                const sn=150,Tn=220;
                let xi=mn.clientX,Qa=mn.clientY;
                xi+sn>window.innerWidth&&(xi=window.innerWidth-sn-10),Qa+Tn>window.innerHeight&&(Qa=window.innerHeight-Tn-10),Ct( {
                  x:xi,y:Qa,msg:Dt
                })
              },style: {
                position:"relative"
              },children:l.jsx("div", {
                className:"friends-chat-message-body",style: {
                  ...Dt.isSending? {
                    opacity:.6
                  }
                  :void 0,background:"transparent",padding:0,boxShadow:"none"
                },children:jl(Dt)
              })
            },Dt.id))
          }),l.jsxs("div", {
            className:"friends-chat-message-time-hover",children:[ne.sender_role?`${ne.sender_role} • `:"",tL(ne.created_at)]
          })]
        }):l.jsxs("div", {
          className:"friends-chat-message-body-wrapper",onContextMenu:Dt=> {
            Dt.preventDefault();
            const mn=150,sn=220;
            let Tn=Dt.clientX,xi=Dt.clientY;
            Tn+mn>window.innerWidth&&(Tn=window.innerWidth-mn-10),xi+sn>window.innerHeight&&(xi=window.innerHeight-sn-10),Ct( {
              x:Tn,y:xi,msg:ne
            })
          },children:[l.jsx("div", {
            className:"friends-chat-message-body",style:ne.isSending? {
              opacity:.6
            }
            :void 0,children:jl(ne)
          }),ne.isSending&&ne.sendProgress!==void 0&&l.jsx("div", {
            style: {
              width:"100%",height:"4px",background:"rgba(255,255,255,0.1)",marginTop:"4px",borderRadius:"2px",overflow:"hidden"
            },children:l.jsx("div", {
              style: {
                width:`${ne.sendProgress}%`,height:"100%",background:"#4da8da",transition:"width 0.2s ease"
              }
            })
          }),l.jsxs("div", {
            className:"friends-chat-message-time-hover",children:[ne.sender_role?`${ne.sender_role} • `:"",tL(ne.created_at)]
          })]
        })]
      })]
    })
  },qa= {
    onDragOver:Y=> {
      Y.preventDefault(),Y.stopPropagation(),Y.dataTransfer.dropEffect="copy",Ve(!0)
    },onDragLeave:Y=> {
      Y.preventDefault(),Y.stopPropagation(),Y.currentTarget.contains(Y.relatedTarget)||Ve(!1)
    },onDrop:Y=> {
      Y.preventDefault(),Y.stopPropagation(),Ve(!1),Y.dataTransfer.files&&Y.dataTransfer.files.length>0&&(Pn(Y.dataTransfer.files),Y.dataTransfer.clearData())
    }
  },ge=async()=> {
    if(!(!j||!h.client)&&window.confirm("Bạn có chắc chắn muốn DỌN SẠCH TOÀN BỘ LỊCH SỬ tin nhắn trong kênh này? Quá trình này sẽ xóa cả những tin nhắn cũ nhất và KHÔNG THỂ hoàn tác."))try {
      o("Đang quét toàn bộ lịch sử kênh... Vui lòng đợi.");
      const Y=h.client.getRoom(j);
      if(!Y)return;
      let we=!0;
      for(;
      we;
      ) {
        const xe=Y.getLiveTimeline().getEvents().length;
        try {
          await h.client.scrollback(Y,50),Y.getLiveTimeline().getEvents().length<=xe&&(we=!1)
        }
        catch {
          we=!1
        }
      }
      let ne=0;
      const Be=Y.getLiveTimeline().getEvents();
      for(const xe of Be)if(xe.getType()==="m.room.message"&&!xe.isRedacted()) {
        const je=xe.getId();
        if(je)try {
          await h.redactMessage(j,je),ne++
        }
        catch(Je) {
          console.error("Lỗi khi xóa tin:",je,Je)
        }
      }
      o(`Đã dọn sạch gốc rễ ${ne} tin nhắn/tệp tin!`)
    }
    catch(Y) {
      console.error(Y),c("Lỗi trong quá trình dọn dẹp.")
    }
  },ct=()=> {
    const Y=y.filter(we=>!m.some(ne=> {
      try {
        return JSON.parse(ne.content).pending_id===we.id
      }
      catch {
        return!1
      }
    }));
    return[...m,...Y]
  },_t=Y=> {
    const we=[];
    let ne=[];
    for(const Be of Y) {
      let xe=!1;
      try {
        (Be.message_type==="image"||Be.content.trim().startsWith("{"))&&JSON.parse(Be.content).isSticker&&(xe=!0)
      }
      catch{}xe?ne.length>0?ne[0].sender_id===Be.sender_id&&ne.length<3?ne.push(Be):(we.push(ne.length===1?ne[0]:ne),ne=[Be]):ne.push(Be):(ne.length>0&&(we.push(ne.length===1?ne[0]:ne),ne=[]),we.push(Be))
    }
    return ne.length>0&&we.push(ne.length===1?ne[0]:ne),we
  },Jt=g.useMemo(()=>_t(ct().filter(Y=>Y.content!=="✓ Đã xem"&&!Y.isRedacted&&!(Date.now()-new Date(Y.created_at).getTime()>10*24*60*60*1e3&&["m.image","m.video","m.file"].includes(Y.message_type||"")))),[m,y]),qn=g.useMemo(()=> {
    var xe,je,Je;
    const we=Array.from(new Map(G.map(ht=>[ht.id,ht])).values()).filter(ht=> {
      var mn;
      const Et=(ht.role||"user").toLowerCase();
      if(Et==="admin"||Et==="super_admin"||ht.id==="global_chat"||pe!=="all"&&Et!==pe.toLowerCase())return!1;
      if(Fe.trim()) {
        const sn=Fe.toLowerCase(),Tn=(ht.name||"").toLowerCase(),xi=(ht.id||"").toLowerCase();
        if(!Tn.includes(sn)&&!xi.includes(sn))return!1
      }
      const Dt=((mn=h.roomMeta[ht.id])==null?void 0:mn.lastEventTs)??0;
      return!(_!==ht.id&&Dt>0&&Date.now()-Dt>10*24*60*60*1e3)
    }),ne=new Map,Be=((xe=h.client)==null?void 0:xe.getRooms())||[];
    for(const ht of we) {
      const Et=Be.find(Tn=>ht.roomAlias&&(Tn.getCanonicalAlias()===ht.roomAlias||Tn.getAltAliases()&&Tn.getAltAliases().includes(ht.roomAlias))?!0:Tn.name===`chat_${ht.id}`),Dt=Et&&Et.timeline.length>0?Et.timeline[Et.timeline.length-1].getTs():0,mn=((je=h.roomMeta[ht.id])==null?void 0:je.lastEventTs)??0,sn=((Je=h.roomMeta[(Et==null?void 0:Et.roomId)??""])==null?void 0:Je.lastEventTs)??0;
      ne.set(ht.id,Math.max(Dt,mn,sn))
    }
    return we.sort((ht,Et)=>(ne.get(Et.id)||0)-(ne.get(ht.id)||0))
  },[G,pe,Fe,_,h.roomMeta,h.client]);
  return l.jsxs("div", {
    className:"friends-chat-page",style: {
      paddingLeft:5,paddingRight:5
    },children:[z&&l.jsx("div", {
      className:"update-modal-backdrop",style: {
        zIndex:99999,alignItems:"center",justifyContent:"center"
      },onClick:()=>D(!1),children:l.jsxs("div", {
        className:"update-modal",style: {
          maxWidth:700,width:"90%",padding:24,maxHeight:"80vh",display:"flex",flexDirection:"column"
        },onClick:Y=>Y.stopPropagation(),children:[l.jsxs("div", {
          className:"update-title",style: {
            fontSize:20,marginBottom:12,color:"#f87171"
          },children:["Quản lý phòng Public (",R.length,")"]
        }),l.jsx("div", {
          style: {
            flex:1,overflowY:"auto",background:"rgba(0,0,0,0.2)",borderRadius:8,padding:8
          },children:A?l.jsx("div", {
            style: {
              padding:20,textAlign:"center",color:"#888"
            },children:"Đang tải danh sách phòng..."
          }):R.length===0?l.jsx("div", {
            style: {
              padding:20,textAlign:"center",color:"#888"
            },children:"Không có phòng nào."
          }):R.map(Y=> {
            const we=Y.canonical_alias||(Y.aliases?Y.aliases[0]:null)||Y.name||Y.room_id;
            return l.jsxs("div", {
              style: {
                display:"flex",justifyContent:"space-between",alignItems:"center",padding:"8px",borderBottom:"1px solid rgba(255,255,255,0.05)"
              },children:[l.jsxs("div", {
                style: {
                  flex:1,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",paddingRight:10
                },children:[l.jsx("div", {
                  style: {
                    fontWeight:"bold",fontSize:13,color:"#e2e8f0"
                  },children:we
                }),l.jsxs("div", {
                  style: {
                    fontSize:11,color:"#888",marginTop:2
                  },children:[Y.room_id," • ",Y.num_joined_members||0," members"]
                })]
              }),l.jsx("button", {
                onClick:()=>O(Y.room_id),style: {
                  padding:"6px 12px",background:"rgba(239, 68, 68, 0.2)",color:"#ef4444",border:"1px solid #ef4444",borderRadius:4,cursor:"pointer",fontSize:12,fontWeight:"bold"
                },children:"Xóa (Ẩn)"
              })]
            },Y.room_id)
          })
        }),l.jsx("div", {
          style: {
            display:"flex",justifyContent:"flex-end",marginTop:16
          },children:l.jsx("button", {
            className:"update-button primary",onClick:()=>D(!1),style: {
              padding:"8px 16px"
            },children:"Đóng"
          })
        })]
      })
    }),wt&&l.jsxs("div", {
      className:"friends-chat-context-menu-popup",style: {
        top:wt.y,left:wt.x,zIndex:1e3
      },onClick:Y=>Y.stopPropagation(),children:[l.jsx("div", {
        className:"fc-cm-item",onClick:()=>rn(wt.targetUsername,1),children:"Cấm chat 1 ngày"
      }),l.jsx("div", {
        className:"fc-cm-item",onClick:()=>rn(wt.targetUsername,7),children:"Cấm chat 7 ngày"
      }),l.jsx("div", {
        className:"fc-cm-item",onClick:()=>rn(wt.targetUsername,-1),style: {
          color:"#ff4d4f"
        },children:"Cấm chat vĩnh viễn"
      }),l.jsx("div", {
        className:"fc-cm-item",onClick:()=>rn(wt.targetUsername,0),style: {
          color:"#22c55e"
        },children:"Bỏ cấm chat"
      })]
    }),st&&l.jsxs("div", {
      className:"friends-chat-context-menu-popup",style: {
        top:st.y,left:st.x
      },onClick:Y=>Y.stopPropagation(),children:[l.jsx("div", {
        className:"fc-cm-item",onClick:()=> {
          ye(st.msg);
          const we=`@${(st.msg.sender_name||st.msg.sender_id.replace("@","").split(":")[0]).replace(/ /g,"")} `;
          b.endsWith(we)||w(ne=>ne+we),Ct(null),setTimeout(()=> {
            var ne;
            return(ne=Gt.current)==null?void 0:ne.focus()
          },0)
        },children:"Trả lời"
      }),(()=> {
        let Y=!0;
        const we=st.msg;
        if((we.message_type==="image"||we.message_type==="video")&&(Y=!1),we.content.trim().startsWith("{"))try {
          const ne=JSON.parse(we.content);
          (ne.isSticker||ne.type==="sticker"||ne.url||ne.dataUrl)&&(Y=!1)
        }
        catch{}return Y?l.jsx("div", {
          className:"fc-cm-item",onClick:()=> {
            navigator.clipboard.writeText(we.content),o("Đã copy tin nhắn"),Ct(null)
          },children:"Copy tin nhắn"
        }):null
      })(),(()=> {
        const Y=st.msg;
        return Y.message_type==="image"||Y.message_type==="video"?l.jsx("div", {
          className:"fc-cm-item",onClick:()=> {
            try {
              const we=JSON.parse(Y.content);
              let ne=we.url||we.dataUrl;
              const Be=ne.startsWith("data:");
              ne&&!ne.startsWith("http")&&!ne.startsWith("data:")&&!ne.startsWith("blob:")&&(ne=`${po.replace(/\/$/,"")}${ne}`);
              const xe=(we==null?void 0:we.name)||(Y.message_type==="video"?"video.mp4":"image.jpg"),je=Ih.get(ne);
              je?Hr(je,xe,!1):Hr(ne,xe,Be)
            }
            catch{}Ct(null)
          },children:"Tải xuống"
        }):Y.message_type==="file"?l.jsx("div", {
          className:"fc-cm-item",onClick:()=> {
            try {
              const we=JSON.parse(Y.content);
              let ne=we.url||we.dataUrl||"#";
              const Be=ne.startsWith("data:");
              ne&&!ne.startsWith("http")&&!ne.startsWith("data:")&&ne!=="#"&&(ne=`${po.replace(/\/$/,"")}${ne}`);
              const xe=(we==null?void 0:we.name)||"file";
              Be||ne.startsWith("http")?Hr(ne,xe,Be):ne!=="#"&&window.open(ne,"_blank")
            }
            catch{}Ct(null)
          },children:"Tải xuống"
        }):null
      })(),(()=> {
        const Y=st.msg;
        let we=!0;
        if((Y.message_type==="image"||Y.message_type==="video")&&(we=!1),Y.content.trim().startsWith("{"))try {
          const Be=JSON.parse(Y.content);
          (Be.isSticker||Be.type==="sticker"||Be.url||Be.dataUrl)&&(we=!1)
        }
        catch{}return r&&Y.sender_id.replace("@","").split(":")[0].toLowerCase()===r.username.toLowerCase()?l.jsxs(l.Fragment, {
          children:[l.jsx("div", {
            className:"fc-cm-separator"
          }),we&&l.jsx("div", {
            className:"fc-cm-item",onClick:()=> {
              fa(Y),Ct(null)
            },children:"Sửa tin nhắn"
          }),l.jsx("div", {
            className:"fc-cm-item fc-cm-danger",onClick:()=> {
              Jc(Y),Ct(null)
            },children:"Thu hồi"
          })]
        }):null
      })()]
    }),l.jsxs("div", {
      className:"friends-chat-titlebar","data-tauri-drag-region":!0,children:[l.jsx("div", {
        className:"friends-chat-titlebar-text",children:"Chat Support"
      }),l.jsxs("div", {
        className:"friends-chat-titlebar-right","data-tauri-drag-region":"false",children:[r&&l.jsxs("div", {
          className:"friends-chat-profile-pill",children:[l.jsx("div", {
            className:"friends-chat-avatar",style: {
              border:`2px solid ${ce(r==null?void 0:r.role)}`,boxShadow:ke(r==null?void 0:r.role)
            },children:r!=null&&r.avatar_url?l.jsx("img", {
              src:qe(r.avatar_url),alt:r.username||"User"
            }):l.jsx("span", {
              children:((ci=r==null?void 0:r.username)==null?void 0:ci.charAt(0).toUpperCase())||"U"
            })
          }),l.jsxs("div", {
            className:"friends-chat-profile-info",children:[l.jsx("div", {
              className:"friends-chat-username",children:(r==null?void 0:r.username)||"-"
            }),l.jsxs("div", {
              className:"friends-chat-balance",children:[r!=null&&r.p_balance?Math.round(Number(r.p_balance)).toLocaleString("vi-VN"):"0"," G"]
            })]
          })]
        }),n&&l.jsxs("div", {
          className:"friends-chat-win-controls",children:[l.jsx("button", {
            className:"friends-chat-win-btn",onClick:Rr,"aria-label":"Minimize",children:"–"
          }),l.jsx("button", {
            className:"friends-chat-win-btn",onClick:hn,"aria-label":"Maximize",children:t?"❒":"◻"
          }),l.jsx("button", {
            className:"friends-chat-win-btn close",onClick:_n,"aria-label":"Close",children:"✕"
          })]
        })]
      })]
    }),l.jsxs("div", {
      className:"friends-chat-topbar",children:[l.jsxs("button", {
        className:"friends-chat-back-btn",onClick:()=>u("/store"),children:[l.jsx(FH, {
          size:12
        }),l.jsx("span", {
          children:a("friendsChat.back")
        })]
      }),wn&&_&&l.jsxs("div", {
        className:"friends-chat-topbar-right",style: {
          display:"flex",gap:"8px"
        },children:[(r==null?void 0:r.role)==="super_admin"&&l.jsx("button", {
          className:"friends-chat-clear-btn",onClick:ge,title:"Xóa sạch toàn bộ tin nhắn trong kênh này",style: {
            background:"rgba(239, 68, 68, 0.2)",color:"#ef4444",border:"1px solid #ef4444",padding:"6px 12px",borderRadius:"12px",cursor:"pointer",fontSize:"12px",fontWeight:"bold",display:"flex",alignItems:"center",gap:"6px"
          },children:l.jsx("span", {
            children:"Xóa Chat"
          })
        }),_!=="global"&&l.jsx("button", {
          className:"friends-chat-info-btn",onClick:()=>ot(!Qe),children:l.jsx("span", {
            children:Qe?"Đóng thông tin":"Xem thông tin"
          })
        })]
      })]
    }),l.jsxs("div", {
      className:"friends-chat-layout",style: {
        gap:5,position:"relative"
      },children:[l.jsx("div", {
        className:"resize-handle left-handle",onMouseDown:on,style: {
          position:"absolute",top:0,bottom:0,left:`${xt+2.5}px`,transform:"translateX(-50%)",width:"15px",cursor:"col-resize",background:"transparent",zIndex:10
        }
      }),l.jsxs("aside", {
        className:"friends-chat-sidebar open",style: {
          width:xt,flexShrink:0,flexBasis:xt,position:"relative"
        },children:[wn&&l.jsxs("div", {
          className:"friends-chat-sidebar-search",children:[l.jsxs("div", {
            className:"friends-chat-search-input-wrapper",children:[l.jsx(gE, {
              className:"search-icon"
            }),l.jsx("input", {
              type:"text",placeholder:a("friendsChat.searchPlaceholder"),value:Fe,onChange:Y=>le(Y.target.value)
            })]
          }),l.jsxs("div", {
            className:"friends-chat-filter-wrapper-icon",children:[l.jsx(VH, {
              className:"filter-icon"
            }),l.jsxs("select", {
              value:pe,onChange:Y=>_e(Y.target.value),title:a("friendsChat.filterAllRoles"),children:[l.jsx("option", {
                value:"all",children:"Tất cả"
              }),l.jsx("option", {
                value:"user",children:"User"
              }),l.jsx("option", {
                value:"vip",children:"VIP"
              }),l.jsx("option", {
                value:"vip_plus",children:"VIP+"
              }),l.jsx("option", {
                value:"netflix",children:"Netflix"
              })]
            })]
          })]
        }),l.jsxs("div", {
          className:"friends-chat-sidebar-title",style: {
            display:"flex",justifyContent:"space-between",alignItems:"center"
          },children:[a("friendsChat.directMessages"),wn&&h.client&&l.jsx("button", {
            onClick:V,style: {
              fontSize:"10px",padding:"2px 6px",background:"#333",color:"#ccc",borderRadius:"4px",border:"none",cursor:"pointer"
            },title:"Quản lý phòng Public",children:"Debug Rooms"
          })]
        }),l.jsxs("div", {
          className:"friends-chat-contacts",children:[l.jsx("div", {
            className:`friends-chat-contact global-channel-btn ${_==="global"?"active":""}`,onClick:()=>Ss("global"),children:l.jsxs("div", {
              className:"friends-chat-contact-info",children:[l.jsxs("div", {
                className:"friends-chat-contact-name-wrapper",children:[l.jsx("div", {
                  className:"friends-chat-contact-name",style: {
                    fontSize:"15px"
                  },children:"Kênh Chat Tổng"
                }),(((Gi=h.roomMeta.global_chat)==null?void 0:Gi.unreadCount)??0)>0&&l.jsx("span", {
                  style: {
                    background:"#ef4444",color:"#fff",borderRadius:"10px",fontSize:"11px",fontWeight:700,padding:"1px 6px",minWidth:"18px",textAlign:"center",lineHeight:"18px"
                  },children:h.roomMeta.global_chat.unreadCount
                })]
              }),l.jsx("div", {
                className:"friends-chat-contact-status",style: {
                  color:"#10b981"
                },children:((Yr=h.roomMeta.global_chat)==null?void 0:Yr.lastEventBody)||"Tán dóc xuyên cơn lốc"
              })]
            })
          }),wn&&h.systemRoomId&&l.jsx("div", {
            className:`friends-chat-contact global-channel-btn ${_==="system"?"active":""}`,onClick:()=>Ss("system"),children:l.jsxs("div", {
              className:"friends-chat-contact-info",children:[l.jsxs("div", {
                className:"friends-chat-contact-name-wrapper",children:[l.jsx("div", {
                  className:"friends-chat-contact-name",style: {
                    fontSize:"15px",color:"#ff4d4f"
                  },children:"Hệ Thống"
                }),(((pr=h.roomMeta[h.systemRoomId])==null?void 0:pr.unreadCount)??0)>0&&l.jsx("span", {
                  style: {
                    background:"#ef4444",color:"#fff",borderRadius:"10px",fontSize:"11px",fontWeight:700,padding:"1px 6px",minWidth:"18px",textAlign:"center",lineHeight:"18px"
                  },children:h.roomMeta[h.systemRoomId].unreadCount
                })]
              }),l.jsx("div", {
                className:"friends-chat-contact-status",style: {
                  color:"#ff4d4f"
                },children:((ma=h.roomMeta[h.systemRoomId])==null?void 0:ma.lastEventBody)||"Thông báo từ Server"
              })]
            })
          }),Nr&&r&&l.jsxs("div", {
            className:`friends-chat-contact ${!_||_==="admin"?"active":""}`,onClick:()=>Ss("admin"),children:[l.jsx("div", {
              className:"friends-chat-contact-avatar",children:"A"
            }),l.jsxs("div", {
              className:"friends-chat-contact-info",children:[l.jsxs("div", {
                className:"friends-chat-contact-name-wrapper",children:[l.jsx("div", {
                  className:"friends-chat-contact-name",children:a("friendsChat.admin")
                }),(((Ja=h.roomMeta[r.username])==null?void 0:Ja.unreadCount)??0)>0&&l.jsx("span", {
                  style: {
                    background:"#ef4444",color:"#fff",borderRadius:"10px",fontSize:"11px",fontWeight:700,padding:"1px 6px",minWidth:"18px",textAlign:"center",lineHeight:"18px"
                  },children:h.roomMeta[r.username].unreadCount
                })]
              }),l.jsx("div", {
                className:"friends-chat-contact-status",children:((Dl=h.roomMeta[r.username])==null?void 0:Dl.lastEventBody)||a("friendsChat.online")
              })]
            })]
          }),wn&&qn.map(Y=> {
            var ne,Be,xe;
            const we=["friends-chat-contact",_===Y.id?"active":"","",""].filter(Boolean).join(" ");
            return l.jsxs("div", {
              className:we,onClick:()=>Ss(Y.id),onKeyDown:je=> {
                (je.key==="Enter"||je.key===" ")&&(je.preventDefault(),Ss(Y.id))
              },tabIndex:0,children:[l.jsx("div", {
                className:"friends-chat-contact-avatar",style: {
                  border:`2px solid ${ce(Y.role)}`,boxShadow:ke(Y.role)
                },children:Y.avatar?l.jsx("img", {
                  src:qe(Y.avatar),alt:Y.name||Y.id
                }):l.jsx("span", {
                  children:((ne=Y.name)==null?void 0:ne.charAt(0).toUpperCase())||"U"
                })
              }),l.jsxs("div", {
                className:"friends-chat-contact-info",children:[l.jsxs("div", {
                  className:"friends-chat-contact-name-wrapper",children:[l.jsx("div", {
                    className:"friends-chat-contact-name",children:Y.name||Y.id
                  }),(((Be=h.roomMeta[Y.id])==null?void 0:Be.unreadCount)??0)>0&&l.jsx("span", {
                    style: {
                      background:"#ef4444",color:"#fff",borderRadius:"10px",fontSize:"11px",fontWeight:700,padding:"1px 6px",minWidth:"18px",textAlign:"center",lineHeight:"18px",flexShrink:0
                    },children:h.roomMeta[Y.id].unreadCount>99?"99+":h.roomMeta[Y.id].unreadCount
                  })]
                }),l.jsx("div", {
                  className:"friends-chat-contact-status",children:(xe=h.roomMeta[Y.id])!=null&&xe.lastEventBody?h.roomMeta[Y.id].lastEventBody.slice(0,30)+(h.roomMeta[Y.id].lastEventBody.length>30?"…":""):Y.role||"User"
                })]
              })]
            },Y.id)
          }),r&&["admin","super_admin"].includes(r.role||"")&&Fe.trim()&&!G.find(Y=>Y.id.toLowerCase()===Fe.trim().toLowerCase())&&l.jsxs("div", {
            className:"friends-chat-contact",style: {
              background:"rgba(255, 193, 7, 0.1)",border:"1px dashed #ffc107",marginTop:"10px"
            },onClick:()=> {
              const Y=Fe.trim().toLowerCase();
              Ss(Y),le(""),fetch(`${Se}/admin/chat/notify`, {
                method:"POST",headers: {
                  "Content-Type":"application/json",...s? {
                    Authorization:`Bearer ${s}`
                  }
                  :{}
                },body:JSON.stringify( {
                  username:Y
                })
              }).catch(we=>console.error("Notify err:",we))
            },children:[l.jsx("div", {
              className:"friends-chat-contact-avatar",style: {
                border:"2px solid #ffc107",display:"flex",alignItems:"center",justifyContent:"center"
              },children:l.jsx(YI, {
                color:"#ffc107",size:12
              })
            }),l.jsxs("div", {
              className:"friends-chat-contact-info",children:[l.jsx("div", {
                className:"friends-chat-contact-name",style: {
                  color:"#ffc107"
                },children:"Bắt đầu chat với user mới"
              }),l.jsxs("div", {
                className:"friends-chat-contact-status",style: {
                  color:"#ccc"
                },children:["@",Fe.trim().toLowerCase()]
              })]
            })]
          })]
        })]
      }),l.jsxs("div", {
        className:"friends-chat-main",children:[Nr&&l.jsx("div", {
          className:`friends-chat-window ${Ge?"friends-chat-drag-over":""}`,...qa,children:l.jsxs("div", {
            className:"friends-chat-window-scroll",...qa,children:[l.jsxs("div", {
              className:"friends-chat-thread",ref:ie,onScroll:Ya,children:[X&&l.jsx("div", {
                className:"friends-chat-loading-older",children:a("friendsChat.loadingOlder")||"Đang tải tin cũ..."
              }),m.length>0||y.length>0?Jt.map(Y=> {
                const we=Array.isArray(Y)?Y[0].id:Y.id;
                return l.jsx(wi.Fragment, {
                  children:xs(Y)
                },we)
              }):l.jsx("div", {
                className:"friends-chat-empty",children:l.jsxs("div", {
                  className:"friends-chat-empty-top",children:[l.jsx("div", {
                    className:"friends-chat-icon",children:"💬"
                  }),l.jsx("div", {
                    className:"friends-chat-text",children:a("friendsChat.noMessages")||"No messages yet"
                  }),l.jsx("div", {
                    className:"friends-chat-hint",children:a("friendsChat.startConversation")||"Start a conversation with admin"
                  })]
                })
              })]
            }),!F&&l.jsx("button", {
              className:"friends-chat-scroll-to-bottom",onClick:()=> {
                ie.current&&ie.current.scrollTo( {
                  top:ie.current.scrollHeight,behavior:"smooth"
                })
              },title:"Nhảy về tin nhắn mới nhất",children:"↓"
            }),Pl(a("friendsChat.typeMessageToAdmin"))]
          })
        }),wn&&l.jsx("div", {
          className:`friends-chat-window ${Ge?"friends-chat-drag-over":""}`,...qa,children:l.jsxs("div", {
            className:"friends-chat-window-scroll",...qa,children:[_?We?l.jsx("div", {
              className:"friends-chat-empty",children:l.jsxs("div", {
                className:"friends-chat-empty-top",children:[l.jsx("div", {
                  className:"friends-chat-icon",children:"⏳"
                }),l.jsx("div", {
                  className:"friends-chat-text",children:a("friendsChat.loading")||"Loading messages..."
                })]
              })
            }):l.jsxs("div", {
              className:"friends-chat-thread",ref:ie,onScroll:Ya,children:[X&&l.jsx("div", {
                className:"friends-chat-loading-older",children:a("friendsChat.loadingOlder")||"Đang tải tin cũ..."
              }),m.length>0||y.length>0?Jt.map(Y=> {
                const we=Array.isArray(Y)?Y[0].id:Y.id;
                return l.jsx(wi.Fragment, {
                  children:xs(Y)
                },we)
              }):l.jsx("div", {
                className:"friends-chat-empty",children:l.jsxs("div", {
                  className:"friends-chat-empty-top",children:[l.jsx("div", {
                    className:"friends-chat-icon",children:"💬"
                  }),l.jsx("div", {
                    className:"friends-chat-text",children:"Chưa có tin nhắn"
                  }),l.jsx("div", {
                    className:"friends-chat-hint",children:"Hãy là người đầu tiên gửi tin nhắn"
                  })]
                })
              })]
            }):l.jsx("div", {
              className:"friends-chat-empty",children:l.jsxs("div", {
                className:"friends-chat-empty-top",children:[l.jsx("div", {
                  className:"friends-chat-icon",children:"💬"
                }),l.jsx("div", {
                  className:"friends-chat-text",children:a("friendsChat.selectUserToView")
                }),l.jsx("div", {
                  className:"friends-chat-hint",children:a("friendsChat.noConversation")
                })]
              })
            }),_&&!F&&l.jsx("button", {
              className:"friends-chat-scroll-to-bottom",onClick:()=> {
                ie.current&&ie.current.scrollTo( {
                  top:ie.current.scrollHeight,behavior:"smooth"
                })
              },title:"Nhảy về hiện tại",children:"↓"
            }),_&&Pl(a("friendsChat.typeMessage"))]
          })
        })]
      }),wn&&Qe&&_&&_!=="global"&&l.jsxs(l.Fragment, {
        children:[l.jsx("div", {
          className:"resize-handle right-handle",onMouseDown:Ot,style: {
            position:"absolute",top:0,bottom:0,right:`${Ke+2.5}px`,transform:"translateX(50%)",width:"15px",cursor:"col-resize",background:"transparent",zIndex:10
          }
        }),l.jsxs("aside", {
          className:"friends-chat-right-sidebar",style: {
            width:Ke,flexShrink:0,flexBasis:Ke,position:"relative"
          },children:[l.jsxs("div", {
            className:"friends-chat-right-sidebar-section",children:[l.jsx("h3", {
              className:"section-title",children:"THÔNG TIN USER"
            }),l.jsxs("div", {
              className:"user-profile-summary",children:[l.jsxs("div", {
                className:"user-avatar-large",style: {
                  position:"relative",display:"flex",alignItems:"center",justifyContent:"center"
                },children:[(()=> {
                  var we;
                  const Y=G.find(ne=>ne.id===_);
                  return Y!=null&&Y.avatar?l.jsx("img", {
                    src:qe(Y.avatar),alt:Y.name||_,style: {
                      width:"100%",height:"100%",objectFit:"cover",borderRadius:"50%"
                    }
                  }):((we=Y==null?void 0:Y.name)==null?void 0:we.charAt(0).toUpperCase())||"U"
                })(),Q.isOnline?l.jsx("div", {
                  className:"status-indicator online",style: {
                    position:"absolute",bottom:"2px",right:"2px",width:"16px",height:"16px",minWidth:"16px",minHeight:"16px",padding:0,margin:0,flexShrink:0,borderRadius:"50%",backgroundColor:"#10b981",border:"3px solid #0f172a"
                  }
                }):l.jsx("div", {
                  className:"status-indicator offline",style: {
                    position:"absolute",bottom:"2px",right:"2px",width:"16px",height:"16px",minWidth:"16px",minHeight:"16px",padding:0,margin:0,flexShrink:0,borderRadius:"50%",backgroundColor:"#6b7280",border:"3px solid #0f172a"
                  }
                })]
              }),l.jsx("div", {
                className:"user-name-large",children:((Zc=G.find(Y=>Y.id===_))==null?void 0:Zc.name)||_
              }),l.jsx("div", {
                className:"user-role-small",children:Q.role||((Ni=G.find(Y=>Y.id===_))==null?void 0:Ni.role)||"user"
              })]
            }),l.jsxs("div", {
              className:"user-details-list",children:[l.jsxs("div", {
                className:"detail-item",style: {
                  justifyContent:"flex-start",gap:"8px",padding:"6px 0",alignItems:"center"
                },children:[l.jsx("span", {
                  className:"detail-label",style: {
                    minWidth:"40px"
                  },children:"ID"
                }),l.jsx("span", {
                  className:"detail-value",style: {
                    flex:1,maxWidth:"none",wordBreak:"break-all",fontSize:"10.5px",textAlign:"left",lineHeight:"1.2"
                  },children:Q.id||_
                })]
              }),l.jsxs("div", {
                className:"detail-item",children:[l.jsx("span", {
                  className:"detail-label",children:"Role"
                }),l.jsx("span", {
                  className:"detail-value",children:Q.role||((Ho=G.find(Y=>Y.id===_))==null?void 0:Ho.role)||"user"
                })]
              }),l.jsxs("div", {
                className:"detail-item",children:[l.jsx("span", {
                  className:"detail-label",children:"Tham gia"
                }),l.jsx("span", {
                  className:"detail-value",children:Q.createdAt?new Date(Q.createdAt).toLocaleDateString("vi-VN"):"N/A"
                })]
              }),l.jsxs("div", {
                className:"detail-item",children:[l.jsx("span", {
                  className:"detail-label",children:"Hoạt động"
                }),l.jsx("span", {
                  className:"detail-value",children:Q.isOnline?l.jsx("span", {
                    style: {
                      color:"#4caf50",fontWeight:"bold"
                    },children:"Đang Online"
                  }):Q.lastActive?new Date(Q.lastActive).toLocaleString("vi-VN"):"Offline"
                })]
              }),l.jsxs("div", {
                className:"detail-item mt-2",style: {
                  alignItems:"center"
                },children:[l.jsx("span", {
                  className:"detail-label",children:"Số dư"
                }),me?l.jsxs("div", {
                  style: {
                    display:"flex",alignItems:"center",gap:"6px",marginLeft:"auto"
                  },children:[l.jsxs("span", {
                    style: {
                      fontSize:"11px",color:"#888"
                    },children:[Q.balance!==null?Q.balance.toLocaleString("vi-VN"):"0"," +"]
                  }),l.jsx("input", {
                    type:"number",autoFocus:!0,className:"edit-balance-input",placeholder:"G...",style: {
                      width:"90px",background:"rgba(255, 255, 255, 0.1)",border:"1px solid #4caf50",color:"#ffb300",borderRadius:"4px",padding:"4px 6px",outline:"none",textAlign:"right",fontSize:"13px",fontWeight:"bold"
                    },value:be,onChange:Y=>K(Y.target.value),onKeyDown:Y=> {
                      var we;
                      Y.key==="Escape"&&se(!1),Y.key==="Enter"&&((we=document.getElementById("save-balance-btn"))==null||we.click())
                    }
                  }),l.jsx("button", {
                    id:"save-balance-btn",onClick:async()=> {
                      if(!Q.id)return;
                      const Y=Number(be);
                      if(isNaN(Y)) {
                        c("Số tiền không hợp lệ!");
                        return
                      }
                      const we=(Q.balance||0)+Y;
                      if(we<0) {
                        c("Số dư không thể âm!");
                        return
                      }
                      try {
                        const Be=await(await fetch(`${Se}/admin/users/${Q.id}/balance`, {
                          method:"PUT",headers: {
                            "Content-Type":"application/json",Authorization:`Bearer ${s}`
                          },body:JSON.stringify( {
                            p_balance:we
                          })
                        })).json();
                        if(Be.success) {
                          te(Je=>( {
                            ...Je,balance:we
                          })),o(`Đã ${Y>=0?"cộng":"trừ"} ${Math.abs(Y).toLocaleString("vi-VN")} G thành công!`);
                          const je=await(await fetch(`${Se}/admin/transactions?search=${Q.id}&limit=30`, {
                            headers: {
                              Authorization:`Bearer ${s}`
                            }
                          })).json();
                          je.data&&he(je.data)
                        }
                        else c("Lỗi: "+Be.message)
                      }
                      catch {
                        c("Lỗi kết nối!")
                      }
                      se(!1)
                    },style: {
                      background:"#4caf50",border:"none",color:"white",borderRadius:"4px",padding:"4px 8px",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"
                    },title:"Lưu số dư",children:l.jsx(O4, {
                      size:12
                    })
                  })]
                }):l.jsx("span", {
                  className:"detail-value italic-value",title:"Nhấn đúp để thay đổi số dư",style: {
                    cursor:"pointer",color:"#ffb300"
                  },onDoubleClick:()=> {
                    K(""),se(!0)
                  },children:Q.balance!==null?`${Q.balance.toLocaleString("vi-VN")} G`:"None"
                })]
              }),l.jsxs("div", {
                className:"detail-item",children:[l.jsx("span", {
                  className:"detail-label",children:"Game sở hữu"
                }),l.jsx("span", {
                  className:"detail-value italic-value",style: {
                    paddingRight:"12px",cursor:"pointer",textDecoration:"underline"
                  },onClick:()=> {
                    Q.id&&u("/admin", {
                      state: {
                        targetTab:"users",openUserGames:Q.id,targetUsername:_
                      }
                    })
                  },children:Q.gameCount!==null?Q.gameCount:"None"
                })]
              })]
            })]
          }),l.jsxs("div", {
            className:"friends-chat-right-sidebar-section",style: {
              flex:1,overflowY:"auto",display:"flex",flexDirection:"column"
            },children:[l.jsx("h3", {
              className:"section-title",children:"GIAO DỊCH GẦN ĐÂY"
            }),l.jsx("div", {
              className:"recent-tx-list",style: {
                flex:1
              },children:ee.length>0?ee.map(Y=>l.jsxs("div", {
                style: {
                  display:"flex",justifyContent:"space-between",fontSize:"12px",borderBottom:"1px solid rgba(255,255,255,0.1)",padding:"6px 0",opacity:Y.status==="cancelled"?.5:1
                },children:[l.jsxs("div", {
                  children:[l.jsxs("span", {
                    style: {
                      color:Y.type==="deposit"?Y.status==="cancelled"?"#888":"#4caf50":Y.type==="purchase"||Y.type==="withdrawal"?"#f44336":"#2196f3",fontWeight:"bold",textDecoration:Y.status==="cancelled"?"line-through":"none"
                    },children:[Y.type==="deposit"?"+":Y.type==="purchase"||Y.type==="withdrawal"?"-":"",Number(Y.amount||0).toLocaleString("vi-VN")," G"]
                  }),l.jsxs("span", {
                    style: {
                      fontSize:"9px",marginLeft:"6px",color:Y.status==="completed"?"#4caf50":Y.status==="pending"?"#ff9800":"#f44336",textTransform:"uppercase"
                    },children:["[",Y.status,"]"]
                  }),l.jsxs("div", {
                    style: {
                      color:"#aaa",fontSize:"10px",marginTop:"2px"
                    },children:[new Date(Y.created_at).toLocaleDateString("vi-VN")," ",new Date(Y.created_at).toLocaleTimeString("vi-VN")]
                  })]
                }),l.jsx("div", {
                  style: {
                    flex:1,marginLeft:"12px",textAlign:"right",color:"#ccc",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis"
                  },title:Y.description,children:Y.description||Y.type
                })]
              },Y.id)):l.jsx("div", {
                style: {
                  fontSize:"12px",color:"#888",fontStyle:"italic",padding:"10px 0",textAlign:"center"
                },children:"Không có giao dịch"
              })
            })]
          })]
        })]
      })]
    }),ft&&l.jsx("div", {
      className:"image-lightbox-overlay",onClick:()=> {
        Rt(null),Ze(1)
      },onWheel:Y=> {
        Y.preventDefault(),Y.stopPropagation();
        const we=Y.deltaY,ne=.1;
        Ze(Be=> {
          const xe=we>0?Be-ne:Be+ne;
          return Math.min(3,Math.max(.5,Number(xe.toFixed(2))))
        })
      },children:l.jsxs("div", {
        className:"lightbox-content",children:[l.jsx("img", {
          src:ft,alt:"Full Size",onClick:Y=> {
            Y.stopPropagation(),Rt(null),Ze(1)
          },style: {
            cursor:"pointer",transform:`scale(${Mt})`
          }
        }),l.jsx("button", {
          type:"button",className:"close-lightbox",onClick:Y=> {
            Y.stopPropagation(),Rt(null),Ze(1)
          },children:"✕"
        })]
      })
    }),rt&&l.jsx("div", {
      className:"fc-modal-overlay",onClick:Vo,children:l.jsxs("div", {
        className:"fc-modal",onClick:Y=>Y.stopPropagation(),children:[l.jsx("div", {
          className:"fc-modal-header",children:"Sửa tin nhắn"
        }),l.jsx("textarea", {
          className:"fc-modal-textarea",value:mt,onChange:Y=>Nt(Y.target.value),onKeyDown:Y=> {
            Y.key==="Enter"&&!Y.shiftKey&&(Y.preventDefault(),ha()),Y.key==="Escape"&&Vo()
          },autoFocus:!0,rows:4
        }),l.jsxs("div", {
          className:"fc-modal-actions",children:[l.jsx("button", {
            className:"fc-modal-btn cancel",onClick:Vo,children:"Hủy"
          }),l.jsx("button", {
            className:"fc-modal-btn primary",onClick:()=>void ha(),children:"Lưu"
          })]
        })]
      })
    }),Ae&&l.jsx("div", {
      className:"fc-modal-overlay",onClick:Qc,children:l.jsxs("div", {
        className:"fc-modal small",onClick:Y=>Y.stopPropagation(),children:[l.jsx("div", {
          className:"fc-modal-header",children:"Thu hồi tin nhắn"
        }),l.jsx("p", {
          className:"fc-modal-body",children:"Bạn có chắc muốn thu hồi tin nhắn này không?"
        }),l.jsxs("div", {
          className:"fc-modal-actions",children:[l.jsx("button", {
            className:"fc-modal-btn cancel",onClick:Qc,children:"Hủy"
          }),l.jsx("button", {
            className:"fc-modal-btn danger",onClick:()=>void Wo(),children:"Thu hồi"
          })]
        })]
      })
    })]
  })
}
function Vne() {
  const {
    user:n,sessionId:e
  }
  =nn(), {
    t
  }
  =ni(),i=oi(),[r,s]=g.useState([]),[a,o]=g.useState(!0),[c,d]=g.useState(null);
  return g.useEffect(()=> {
    if(!e||!n) {
      o(!1);
      return
    }
    (async()=> {
      try {
        const f=await fetch(`${Se}/purchases/history?sessionId=${e}`, {
          headers: {
            Authorization:`Bearer ${e}`
          }
        }),h=await f.json();
        if(!f.ok||!h.success)throw new Error(h.message||"Failed to load purchase history");
        s(h.purchases||[])
      }
      catch(f) {
        d(f instanceof Error?f.message:"Failed to load purchase history")
      }
      finally {
        o(!1)
      }
    })()
  },[e,n]),l.jsxs("div", {
    className:"history-page",children:[l.jsxs("div", {
      className:"history-breadcrumb",children:[l.jsx("button", {
        className:"history-link",onClick:()=>i("/account"),children:t("accountDetails.breadcrumbAccount")
      }),l.jsx("span", {
        className:"history-breadcrumb-separator",children:" > "
      }),l.jsx("span", {
        children:"Purchase history"
      })]
    }),l.jsx("h1", {
      className:"history-title",children:"Purchase history"
    }),l.jsxs("div", {
      className:"history-content",children:[c&&l.jsx("div", {
        className:"history-status history-error",children:c
      }),!c&&r.length===0&&!a&&l.jsx("div", {
        className:"history-status",children:"You have no purchase history yet."
      }),!c&&r.length>0&&l.jsx("div", {
        className:"history-list",children:r.map(u=>l.jsxs("div", {
          className:"history-row",onClick:()=>i(`/store/${u.game_id}`),children:[u.banner_url&&l.jsx("img", {
            src:u.banner_url,alt:u.game_name,className:"history-image"
          }),l.jsxs("div", {
            className:"history-info",children:[l.jsx("div", {
              className:"history-game-name",children:u.game_name
            }),l.jsxs("div", {
              className:"history-meta",children:[l.jsx("span", {
                className:"history-date",children:new Date(u.purchased_at).toLocaleString()
              }),l.jsxs("span", {
                className:"history-price",children:[Math.round(u.price_paid).toLocaleString("vi-VN")," G"]
              })]
            })]
          })]
        },u.id))
      })]
    })]
  })
}
function Wne() {
  const {
    sessionId:n
  }
  =nn(),[e,t]=g.useState([]),[i,r]=g.useState(!1),[s,a]=g.useState({}),[o,c]=g.useState(!1),[d,u]=g.useState(null),[f,h]=g.useState(""),[m,p]=g.useState(""),[y,v]=g.useState(!1),[b,w]=g.useState(()=>localStorage.getItem("adminLoadAllGames")==="true"),[S,T]=g.useState("none"),[E,x]=g.useState(null),[k,C]=g.useState(null),[_,M]=g.useState(""),[j,B]=g.useState(""),[G,W]=g.useState(!1),[U,q]=g.useState( {
    app_id:"",game_name:"",price:"",special_denuvo:0,banner_url:"",release_date:""
  }),[Q,te]=g.useState(!1),[ee,he]=g.useState(!1),[me,se]=g.useState(!1),[be,K]=g.useState(null),[X,$]=g.useState(!1);
  g.useRef(null),g.useRef(null);
  const[z,D]=g.useState(""),[R,L]=g.useState(!1),[A,N]=g.useState(!1),[V,O]=g.useState(0),[F,J]=g.useState(1),re=15,[ie,fe]=g.useState( {
    isOpen:!1,title:"",message:"",type:"info"
  }),[ce,ke]=g.useState( {
    isOpen:!1,appId:null,gameName:""
  }),[Pe,de]=g.useState(null),[ze,Xe]=g.useState([]),[Ye,ve]=g.useState(!1),[nt,ft]=g.useState(null),[Rt,Mt]=g.useState(!1);
  g.useEffect(()=> {
    const Z=setTimeout(()=> {
      p(f),J(1)
    },400);
    return()=>clearTimeout(Z)
  },[f]),g.useEffect(()=> {
    J(1)
  },[y,S,b]);
  const Ze=g.useMemo(()=> {
    const Z=e.length,ue=e.filter(et=>Number(et.price)>0).length,ye=Z-ue,Ne=[ {
      label:"Tổng game trong hệ thống",value:Z.toLocaleString("vi-VN")
    }, {
      label:"Game có giá",value:ue.toLocaleString("vi-VN")
    }, {
      label:"Game free",value:ye.toLocaleString("vi-VN")
    }
    ];
    return be!==null&&Ne.push( {
      label:"Tổng pending",value:be.toLocaleString("vi-VN")
    }),Ne
  },[e,be]),Fe=Z=> {
    const ue=Number(Z);
    return ue?`${ue.toLocaleString("vi-VN")} G (${Math.round(ue/1e3).toLocaleString("vi-VN")} P)`:"Free"
  },le=Z=>Z.length<=25?Z:`${Z.slice(0,25)}...`,pe=async(Z,ue)=> {
    await fetch(`${Se}/admin/games/${Z}`, {
      method:"PUT",headers: {
        "Content-Type":"application/json",...n? {
          Authorization:`Bearer ${n}`
        }
        :{}
      },body:JSON.stringify(ue)
    })
  },_e=(Z,ue)=> {
    t(ye=>ye.map(Ne=>Ne.app_id===Z? {
      ...Ne,...ue
    }
    :Ne))
  },Ge=async(Z,ue=!1)=> {
    await fetch(`${Se}/admin/games/${Z}`, {
      method:"DELETE",headers:n? {
        Authorization:`Bearer ${n}`
      }
      :{}
    }),ue&&await fetch(`${Se}/admin/games/${Z}/skiplog`, {
      method:"POST",headers: {
        "Content-Type":"application/json",...n? {
          Authorization:`Bearer ${n}`
        }
        :{}
      },body:JSON.stringify( {
        reason:"Deleted from admin panel"
      })
    })
  };
  g.useEffect(()=> {
    localStorage.setItem("adminLoadAllGames",String(b))
  },[b]);
  const Ve=async()=> {
    var Z;
    r(!0),u(null);
    try {
      if(!b) {
        const kt=await fetch(`${Se}/admin/games/list?limit=50&page=1`, {
          headers:n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        });
        if(!kt.ok)throw new Error("Failed to fetch games");
        const fn=((await kt.json()).data||[]).map(on=>( {
          app_id:on.app_id,game_name:on.game_name,banner_url:on.banner_url,tags:on.tags,price:Number(on.price||0),special_denuvo:Number(on.special_denuvo||0)
        }));
        t(fn),r(!1);
        return
      }
      let ue=1;
      const ye=1e4;
      let Ne=[],et=0,lt=!0;
      for(;
      lt;
      ) {
        const kt=await fetch(`${Se}/admin/games/list?limit=${ye}&page=${ue}`, {
          headers:n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        });
        if(!kt.ok) {
          console.error("Failed to fetch chunk",ue);
          break
        }
        const Gt=await kt.json(),fn=(Gt.data||[]).map(on=>( {
          app_id:on.app_id,game_name:on.game_name,banner_url:on.banner_url,tags:on.tags,price:Number(on.price||0),special_denuvo:Number(on.special_denuvo||0)
        }));
        Ne=[...Ne,...fn],et=Gt.total||0,lt=(Z=Gt.pagination)==null?void 0:Z.hasNextPage,t(Ne),u( {
          current:Ne.length,total:et
        }),ue===1&&r(!1),lt&&(ue++,await new Promise(on=>setTimeout(on,100)))
      }
      u(null)
    }
    catch(ue) {
      console.error("Error loading games:",ue),e.length===0&&t([]),r(!1)
    }
  },qe=async()=> {
    try {
      const Z=await fetch(`${Se}/admin/games/pending-ryu`, {
        headers:n? {
          Authorization:`Bearer ${n}`
        }
        :{}
      });
      if(Z.ok) {
        const ue=await Z.json();
        ue.success&&ue.pending!==void 0&&K(ue.pending)
      }
    }
    catch{}
  },rt=async Z=> {
    if(Z.length) {
      c(!0);
      try {
        const ue=Z.join(","),ye=await fetch(`${Se}/admin/games/ownership-stats?app_ids=${ue}`, {
          headers:n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        });
        if(ye.ok) {
          const Ne=await ye.json();
          Ne.success&&Ne.stats&&a(et=>( {
            ...et,...Ne.stats
          }))
        }
      }
      catch{}finally {
        c(!1)
      }
    }
  },bt=async Z=> {
    ve(!0),Xe([]);
    try {
      const ue=await fetch(`${Se}/admin/games/${Z}/owners`, {
        headers:n? {
          Authorization:`Bearer ${n}`
        }
        :{}
      });
      if(ue.ok) {
        const ye=await ue.json();
        ye.success&&Xe(ye.data||[])
      }
    }
    catch{}finally {
      ve(!1)
    }
  },mt=async(Z,ue)=> {
    ft(Z);
    try {
      (await fetch(`${Se}/admin/users/${Z}/games/${ue}`, {
        method:"DELETE",headers:n? {
          Authorization:`Bearer ${n}`
        }
        :{}
      })).ok&&(Xe(Ne=>Ne.filter(et=>et.user_id!==Z)),a(Ne=>( {
        ...Ne,[ue]:Math.max(0,(Ne[ue]??1)-1)
      })))
    }
    catch{}finally {
      ft(null)
    }
  },Nt=async Z=> {
    Mt(!0);
    const ue=[...ze];
    for(const ye of ue)try {
      await fetch(`${Se}/admin/users/${ye.user_id}/games/${Z}`, {
        method:"DELETE",headers:n? {
          Authorization:`Bearer ${n}`
        }
        :{}
      }),Xe(Ne=>Ne.filter(et=>et.user_id!==ye.user_id)),a(Ne=>( {
        ...Ne,[Z]:Math.max(0,(Ne[Z]??1)-1)
      })),await new Promise(Ne=>setTimeout(Ne,150))
    }
    catch{}Mt(!1)
  };
  g.useEffect(()=> {
    Ve(),qe()
  },[n,b]);
  const Ae=g.useMemo(()=> {
    let Z=e;
    y&&(Z=Z.filter(ye=>ye.special_denuvo===1));
    const ue=m.trim().toLowerCase();
    if(ue) {
      const ye=Z.filter(Ne=>Ne.game_name.toLowerCase()===ue||Ne.app_id.toLowerCase()===ue);
      Z=ye.length?ye:Z.filter(Ne=>Ne.game_name.toLowerCase().includes(ue)||Ne.app_id.toLowerCase().includes(ue))
    }
    return S==="asc"?Z=Z.slice().sort((ye,Ne)=>ye.price-Ne.price):S==="desc"&&(Z=Z.slice().sort((ye,Ne)=>Ne.price-ye.price)),Z
  },[e,m,y,S]),dt=Math.ceil(Ae.length/re),Wt=g.useMemo(()=> {
    const Z=(F-1)*re,ue=Z+re;
    return Ae.slice(Z,ue)
  },[Ae,F]);
  g.useEffect(()=> {
    const Z=Wt.map(ue=>ue.app_id).filter(ue=>!(ue in s));
    Z.length>0&&rt(Z)
  },[Wt]);
  const Le=()=> {
    F<dt&&J(F+1)
  },Qe=()=> {
    F>1&&J(F-1)
  },ot=async()=> {
    se(!0);
    try {
      const Z=await fetch(`${Se}/admin/games/upgame-ryu`, {
        method:"POST",headers: {
          "Content-Type":"application/json",...n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        }
      }),ue=await Z.json();
      if(!Z.ok)throw new Error(ue.message||"Failed to upgame ryu");
      fe( {
        isOpen:!0,title:"Thành công",message:`Upgame ryu thành công! Thêm: ${ue.results.success}, Lỗi: ${ue.results.failed}, Bỏ qua: ${ue.results.skipped}`,type:"success"
      }),await qe(),await Ve()
    }
    catch(Z) {
      fe( {
        isOpen:!0,title:"Lỗi",message:Z.message||"Upgame ryu thất bại",type:"error"
      })
    }
    finally {
      se(!1)
    }
  },xt=async Z=> {
    if(!Z.trim()) {
      fe( {
        isOpen:!0,title:"Lỗi",message:"Vui lòng nhập App ID",type:"warning"
      });
      return
    }
    if(!zn()) {
      fe( {
        isOpen:!0,title:"Lỗi",message:"Chức năng chỉ khả dụng trên Tauri",type:"warning"
      });
      return
    }
    L(!0);
    try {
      const ue=await oe("fetch_steam_app_details", {
        appId:Z
      });
      if(!ue||!ue[Z])throw new Error("No data");
      const ye=ue[Z];
      if(!ye.success||!ye.data)throw new Error("No data");
      const Ne=ye.data;
      let et=Ne.header_image||"";
      et&&et.includes("?t=")&&(et=et.split("?")[0]);
      let lt="";
      if(Ne.price_overview&&Ne.price_overview.final) {
        const Gt=Ne.price_overview.final/100*26e3;
        lt=Math.round(Gt*.15).toString()
      }
      q(kt=>( {
        ...kt,game_name:Ne.name||kt.game_name,banner_url:et,price:lt||kt.price,special_denuvo:Ne.has_denuvo?1:0
      }))
    }
    catch {
      fe( {
        isOpen:!0,title:"Lỗi",message:"Không thể tải thông tin Steam",type:"error"
      })
    }
    finally {
      L(!1)
    }
  },Ee=()=> {
    U.app_id.trim()&&!R&&xt(U.app_id)
  },Ke=Z=> {
    Z.key==="Enter"&&U.app_id.trim()&&!R&&xt(U.app_id)
  },$e=async()=> {
    var Z;
    if(!zn()) {
      fe( {
        isOpen:!0,title:"Lỗi",message:"Chức năng chỉ khả dụng trên Tauri",type:"warning"
      });
      return
    }
    try {
      const ue=await oe("select_folder");
      if(!ue)return;
      D(ue);
      const ye=ue.split(/[\\/]/),Ne=ye[ye.length-1];
      if(/^\d+$/.test(Ne)) {
        q(et=>( {
          ...et,app_id:Ne
        })),L(!0);
        try {
          const et=await oe("fetch_steam_app_details", {
            appId:Ne
          });
          if(!et||!et[Ne])throw new Error("No data");
          const lt=et[Ne];
          if(!lt.success||!lt.data)throw new Error("No data");
          const kt=lt.data;
          let Gt=kt.header_image||"";
          Gt&&Gt.includes("?t=")&&(Gt=Gt.split("?")[0]);
          let fn="";
          if(kt.price_overview&&kt.price_overview.final) {
            const rn=kt.price_overview.final/100*26e3;
            fn=Math.round(rn*.15).toString()
          }
          let on=((Z=kt.release_date)==null?void 0:Z.date)||"";
          q(Ot=>( {
            ...Ot,game_name:kt.name||Ot.game_name,banner_url:Gt,price:fn||Ot.price,special_denuvo:kt.has_denuvo?1:0,release_date:on||Ot.release_date
          }))
        }
        catch {
          fe( {
            isOpen:!0,title:"Lỗi",message:"Không thể tải thông tin Steam",type:"error"
          })
        }
        finally {
          L(!1)
        }
      }
    }
    catch(ue) {
      console.error("Failed to select folder:",ue),fe( {
        isOpen:!0,title:"Lỗi",message:"Không thể chọn folder",type:"error"
      })
    }
  },st=async()=> {
    if(!z||!U.app_id) {
      fe( {
        isOpen:!0,title:"Lỗi",message:"Vui lòng chọn folder và nhập App ID",type:"warning"
      });
      return
    }
    N(!0),O(0);
    try {
      const Z=await oe("read_folder_recursive", {
        folderPath:z
      });
      if(!Z||Z.length===0)throw new Error("No files found in folder");
      const ue=new FormData;
      ue.append("app_id",U.app_id);
      for(let et=0;
      et<Z.length;
      et++) {
        const lt=Z[et];
        if(lt.isDir)continue;
        const kt=await oe("read_file_bytes", {
          filePath:lt.path
        }),Gt=new Blob([new Uint8Array(kt)]),fn=lt.name;
        ue.append("files",Gt,fn),O(Math.round(et/Z.length*50))
      }
      const ye=await fetch(`${Se}/admin/games/upload-folder`, {
        method:"POST",headers:n? {
          Authorization:`Bearer ${n}`
        }
        :{},body:ue
      });
      if(O(100),!ye.ok)throw new Error("Upload failed");
      if(!(await ye.json()).success)throw new Error("Upload failed");
      fe( {
        isOpen:!0,title:"Thành công",message:"Đã upload folder lên VPS",type:"success"
      }),D("")
    }
    catch(Z) {
      console.error("Upload error:",Z),fe( {
        isOpen:!0,title:"Lỗi",message:"Upload folder thất bại: "+Z,type:"error"
      })
    }
    finally {
      N(!1),O(0)
    }
  },Ct=async()=> {
    te(!0);
    try {
      const Z= {
        app_id:U.app_id.trim(),game_name:U.game_name.trim(),price:Number(U.price||0),special_denuvo:Number(U.special_denuvo||0),banner_url:U.banner_url.trim()||null
      },ue=await fetch(`${Se}/admin/games`, {
        method:"POST",headers: {
          "Content-Type":"application/json",...n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        },body:JSON.stringify(Z)
      });
      if(!ue.ok)throw new Error("failed");
      if(!(await ue.json()).success)throw new Error("failed");
      W(!1),q( {
        app_id:"",game_name:"",price:"",special_denuvo:0,banner_url:"",release_date:""
      }),fe( {
        isOpen:!0,title:"Thành công",message:"Đã thêm game",type:"success"
      }),await Ve()
    }
    catch {
      fe( {
        isOpen:!0,title:"Lỗi",message:"Thêm game thất bại",type:"error"
      })
    }
    finally {
      te(!1)
    }
  },wt=async()=> {
    if(!U.app_id||!U.game_name||!U.banner_url||!U.release_date) {
      fe( {
        isOpen:!0,title:"Lỗi",message:"Vui lòng gõ AppID, sau đó click ra ngoài để fetch tự động toàn bộ thông tin Steam (cần Tên, Banner, và Ngày ra mắt) trước khi tải lên Banner.",type:"warning"
      });
      return
    }
    te(!0);
    try {
      let Z=U.release_date.trim();
      const ue=Z.match(/^(\d {
        1,2
      })[\/\-](\d {
        1,2
      })[\/\-](\d {
        4
      })$/);
      if(ue) {
        const kt=ue[1].padStart(2,"0"),Gt=ue[2].padStart(2,"0");
        Z=`${ue[3]}-${Gt}-${kt}`
      }
      const ye= {
        id:parseInt(U.app_id),name:U.game_name.trim(),cover:U.banner_url.trim(),release_date:Z,price:U.price||null
      }, {
        postSecureRequest:Ne
      }
      =await $n(async()=> {
        const {
          postSecureRequest:kt
        }
        =await import("./secureRequest-D6PUxES5.js");
        return {
          postSecureRequest:kt
        }
      },__vite__mapDeps([0,1,2]),import.meta.url),lt=await Ne("/api/banner/custom_add",ye,"https://api4001.goslynk.online");
      if(lt&&lt.success)fe( {
        isOpen:!0,title:"Thành công",message:lt.message||"Đã đưa lên Banner Sắp Cập Nhật!",type:"success"
      });
      else throw new Error((lt==null?void 0:lt.message)||"Lỗi không xác định")
    }
    catch(Z) {
      fe( {
        isOpen:!0,title:"Lỗi",message:Z.message||"Không thể upload lên Banner",type:"error"
      })
    }
    finally {
      te(!1)
    }
  };
  return l.jsxs("div", {
    className:"game-panel",children:[l.jsxs("div", {
      className:"game-panel-header",children:[l.jsxs("div", {
        children:[l.jsx("div", {
          className:"game-panel-title",children:"Game Panel"
        }),l.jsx("div", {
          className:"game-panel-sub",children:"Quản lý và thống kê game"
        })]
      }),l.jsxs("div", {
        className:"game-panel-actions",children:[l.jsx("input", {
          className:"game-search",placeholder:"Tìm kiếm tên hoặc App ID...",value:f,onChange:Z=>h(Z.target.value)
        }),l.jsx("button", {
          type:"button",className:S==="asc"?"game-btn primary":"game-btn",onClick:()=>T("asc"),children:"↑ Giá"
        }),l.jsx("button", {
          type:"button",className:S==="desc"?"game-btn primary":"game-btn",onClick:()=>T("desc"),children:"↓ Giá"
        }),l.jsxs("button", {
          type:"button",className:`game-btn ${y?"primary":""}`,onClick:()=>v(!y),title:"Chỉ hiện các game có Denuvo",children:["🎮 Denuvo ",y?"✓":""]
        }),l.jsx("button", {
          type:"button",className:"game-btn primary",onClick:ot,disabled:me,children:me?"Đang upgame...":"Upgame ryu"
        }),l.jsx("button", {
          type:"button",className:"game-btn primary",onClick:()=>W(!0),children:"Thêm game"
        })]
      })]
    }),l.jsx("div", {
      className:"game-stats",children:Ze.map(Z=>l.jsxs("div", {
        className:"game-stat-card",children:[l.jsx("div", {
          className:"game-stat-label",children:Z.label
        }),l.jsxs("div", {
          className:"game-stat-value",style: {
            display:"flex",alignItems:"center",gap:"12px",justifyContent:"space-between"
          },children:[l.jsxs("span", {
            children:[Z.value,Z.label==="Tổng game trong hệ thống"&&d&&l.jsxs("span", {
              style: {
                fontSize:"12px",color:"#4caf50",marginLeft:"8px"
              },children:["(Đang tải ",d.current.toLocaleString(),"/",d.total.toLocaleString(),"...)"]
            })]
          }),Z.label==="Tổng game trong hệ thống"&&l.jsx("div", {
            className:"game-data-toggle-wrapper",style: {
              display:"flex",alignItems:"center",gap:"8px",fontSize:"12px"
            },title:"Gạt sang phải để tải toàn bộ 61k game (Có thể lag), gạt trái để đóng (load 50 game)",children:l.jsxs("label", {
              style: {
                position:"relative",display:"inline-block",width:"40px",height:"20px"
              },children:[l.jsx("input", {
                type:"checkbox",checked:b,onChange:()=>w(!b),style: {
                  opacity:0,width:0,height:0
                }
              }),l.jsx("span", {
                style: {
                  position:"absolute",cursor:"pointer",top:0,left:0,right:0,bottom:0,backgroundColor:b?"#4caf50":"#f44336",transition:".4s",borderRadius:"20px"
                },children:l.jsx("span", {
                  style: {
                    position:"absolute",content:'""',height:"16px",width:"16px",left:b?"22px":"2px",bottom:"2px",backgroundColor:"white",transition:".4s",borderRadius:"50%"
                  }
                })
              })]
            })
          })]
        })]
      },Z.label))
    }),l.jsx("div", {
      className:"game-grid",children:Ae.length===0?l.jsx("div", {
        className:"game-table-empty",children:i?"Đang tải...":"Không tìm thấy game."
      }):Wt.map(Z=>l.jsxs("div", {
        className:"game-card",children:[l.jsx("div", {
          className:"game-card-banner",children:!b&&Z.banner_url?l.jsx("img", {
            src:Z.banner_url,alt:Z.game_name
          }):null
        }),l.jsxs("div", {
          className:"game-card-top",children:[l.jsx("div", {
            className:`game-card-title ${E===Z.app_id?"editing":""}`,onClick:()=> {
              E!==Z.app_id&&(x(Z.app_id),M(Z.game_name))
            },title:E===Z.app_id?"Nhấn Enter để lưu":"Click để chỉnh sửa",children:E===Z.app_id?l.jsx("input", {
              autoFocus:!0,value:_,onChange:ue=>M(ue.target.value),onKeyDown:async ue=> {
                ue.key==="Enter"?(await pe(Z.app_id, {
                  game_name:_
                }),_e(Z.app_id, {
                  game_name:_
                }),x(null)):ue.key==="Escape"&&x(null)
              },onBlur:async()=> {
                _.trim()&&_!==Z.game_name&&(await pe(Z.app_id, {
                  game_name:_
                }),_e(Z.app_id, {
                  game_name:_
                })),x(null)
              },onClick:ue=>ue.stopPropagation()
            }):le(Z.game_name)
          }),l.jsx("span", {
            className:"game-card-id",children:Z.app_id
          })]
        }),l.jsx("div", {
          className:`game-card-price ${k===Z.app_id?"editing":""}`,onClick:()=> {
            k!==Z.app_id&&(C(Z.app_id),B(Z.price.toString()))
          },title:k===Z.app_id?"Nhấn Enter để lưu":"Click để chỉnh sửa",children:k===Z.app_id?l.jsx("input", {
            autoFocus:!0,type:"number",value:j,onChange:ue=>B(ue.target.value),onKeyDown:async ue=> {
              ue.key==="Enter"?(await pe(Z.app_id, {
                price:Number(j)
              }),_e(Z.app_id, {
                price:Number(j)
              }),C(null)):ue.key==="Escape"&&C(null)
            },onBlur:async()=> {
              Number(j)!==Z.price&&(await pe(Z.app_id, {
                price:Number(j)
              }),_e(Z.app_id, {
                price:Number(j)
              })),C(null)
            },onClick:ue=>ue.stopPropagation()
          }):Fe(Z.price)
        }),l.jsxs("div", {
          className:"game-card-ownership",style: {
            cursor:"pointer"
          },onClick:()=> {
            de( {
              isOpen:!0,appId:Z.app_id,gameName:Z.game_name
            }),bt(Z.app_id)
          },children:[l.jsx("span", {
            className:"game-card-ownership-icon",children:"👥"
          }),l.jsx("span", {
            className:"game-card-ownership-count",children:o&&!(Z.app_id in s)?"...":(s[Z.app_id]??0).toLocaleString("vi-VN")
          }),l.jsx("span", {
            className:"game-card-ownership-label",children:"người sở hữu"
          })]
        }),l.jsx("button", {
          type:"button",className:"game-card-delete",onClick:()=>ke( {
            isOpen:!0,appId:Z.app_id,gameName:Z.game_name
          }),title:"Xoá game",children:"🗑️ Xoá"
        })]
      },Z.app_id))
    }),Ae.length>0&&l.jsxs("div", {
      className:"game-pagination",children:[l.jsx("button", {
        type:"button",className:"game-btn",onClick:Qe,disabled:F===1,children:"← Lùi"
      }),l.jsxs("span", {
        className:"game-pagination-info",children:["Trang ",F," / ",dt]
      }),l.jsx("button", {
        type:"button",className:"game-btn",onClick:Le,disabled:F===dt,children:"Tiến →"
      })]
    }),G&&l.jsx(ho, {
      isOpen:G,onClose:()=>W(!1),title:"Thêm game",children:l.jsxs("div", {
        className:"game-modal-content",children:[l.jsxs("div", {
          className:"game-modal-section",children:[l.jsx("label", {
            children:"Chọn folder game (tự động lấy thông tin Steam)"
          }),l.jsxs("div", {
            className:"game-modal-folder-select",children:[l.jsx("button", {
              type:"button",className:"game-btn",onClick:$e,disabled:R,children:R?"⏳ Đang tải...":"📁 Chọn Folder"
            }),z&&l.jsx("span", {
              className:"folder-path",children:z
            })]
          })]
        }),l.jsxs("div", {
          className:"game-modal-section",children:[l.jsx("label", {
            children:"App ID"
          }),l.jsx("input", {
            placeholder:"App ID",value:U.app_id,onChange:Z=>q(ue=>( {
              ...ue,app_id:Z.target.value
            })),onBlur:Ee,onKeyDown:Ke,disabled:R,style: {
              flex:1
            }
          })]
        }),l.jsxs("div", {
          className:"game-modal-section",children:[l.jsx("label", {
            children:"Tên game"
          }),l.jsx("input", {
            placeholder:"Tên game",value:U.game_name,onChange:Z=>q(ue=>( {
              ...ue,game_name:Z.target.value
            }))
          })]
        }),l.jsxs("div", {
          className:"game-modal-section",children:[l.jsx("label", {
            children:"Giá (VND) - Giá gốc từ Steam"
          }),l.jsx("input", {
            placeholder:"Giá",value:U.price,onChange:Z=>q(ue=>( {
              ...ue,price:Z.target.value
            }))
          })]
        }),l.jsxs("div", {
          className:"game-modal-section",children:[l.jsx("label", {
            children:"Banner URL"
          }),l.jsx("input", {
            placeholder:"Banner URL",value:U.banner_url,onChange:Z=>q(ue=>( {
              ...ue,banner_url:Z.target.value
            }))
          }),U.banner_url&&l.jsx("img", {
            src:U.banner_url,alt:"Preview",style: {
              maxWidth:"100%",marginTop:"8px",borderRadius:"4px"
            }
          })]
        }),l.jsxs("div", {
          className:"game-modal-section",children:[l.jsx("label", {
            children:"Ngày ra mắt (tự động lấy từ Steam)"
          }),l.jsx("input", {
            placeholder:"VD: 20/02/2026",value:U.release_date||"",onChange:Z=>q(ue=>( {
              ...ue,release_date:Z.target.value
            }))
          })]
        }),l.jsx("div", {
          className:"game-modal-section",children:l.jsxs("label", {
            children:[l.jsx("input", {
              type:"checkbox",checked:U.special_denuvo===1,onChange:Z=>q(ue=>( {
                ...ue,special_denuvo:Z.target.checked?1:0
              })),style: {
                marginRight:"8px"
              }
            }),"Game có Denuvo DRM"]
          })
        }),z&&l.jsx("div", {
          className:"game-modal-section",children:l.jsx("button", {
            type:"button",className:"game-btn primary",onClick:st,disabled:A||!U.app_id,style: {
              width:"100%"
            },children:A?`⏳ Đang upload... ${V}%`:"📤 Upload Folder lên VPS"
          })
        }),l.jsxs("div", {
          className:"game-modal-actions",children:[l.jsx("button", {
            type:"button",className:"game-btn",onClick:()=>W(!1),children:"✕ Huỷ"
          }),l.jsxs("div", {
            style: {
              display:"flex",gap:"8px"
            },children:[l.jsx("button", {
              type:"button",className:"game-btn",onClick:wt,disabled:Q,style: {
                background:"linear-gradient(135deg, #f7b733, #fc4a1a)",color:"#fff",border:"none"
              },title:"Tải game này lên màn hình Carousel Banner thay vì thêm vào hệ thống",children:Q?"⏳...":"🌟 Upload lên Banner"
            }),l.jsx("button", {
              type:"button",className:"game-btn primary",onClick:Ct,disabled:Q,children:Q?"⏳ Đang thêm...":"✓ Thêm game vào hệ thống"
            })]
          })]
        })]
      })
    }),l.jsx(uh, {
      isOpen:ie.isOpen,onClose:()=>fe(Z=>( {
        ...Z,isOpen:!1
      })),title:ie.title,message:ie.message,type:ie.type
    }),l.jsx(uh, {
      isOpen:ce.isOpen,onClose:()=>ke( {
        isOpen:!1,appId:null,gameName:""
      }),title:"Xoá game",message:`Bạn có chắc muốn xoá ${ce.gameName}?`,type:"warning",onConfirm:async()=> {
        if(ce.appId)try {
          await Ge(ce.appId,!0),ke( {
            isOpen:!1,appId:null,gameName:""
          }),fe( {
            isOpen:!0,title:"Thành công",message:"Đã xoá game",type:"success"
          }),await Ve()
        }
        catch {
          fe( {
            isOpen:!0,title:"Lỗi",message:"Xoá game thất bại",type:"error"
          })
        }
      }
    }),(Pe==null?void 0:Pe.isOpen)&&l.jsx(ho, {
      isOpen:Pe.isOpen,onClose:()=> {
        de(null),Xe([])
      },title:`Người sở hữu: ${Pe.gameName}`,width:"600px",children:l.jsx("div", {
        children:Ye?l.jsx("div", {
          style: {
            textAlign:"center",padding:"32px",color:"rgba(255,255,255,0.5)"
          },children:"Đang tải danh sách..."
        }):ze.length===0?l.jsx("div", {
          style: {
            textAlign:"center",padding:"32px",color:"rgba(255,255,255,0.4)"
          },children:"Chưa có ai sở hữu game này."
        }):l.jsxs(l.Fragment, {
          children:[l.jsxs("div", {
            style: {
              display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"
            },children:[l.jsxs("span", {
              style: {
                fontSize:"13px",color:"rgba(255,255,255,0.55)"
              },children:[ze.length," người sở hữu"]
            }),l.jsx("button", {
              type:"button",className:"game-btn",style: {
                background:"#c0392b",color:"#fff",border:"none",fontSize:"12px",padding:"6px 14px"
              },onClick:()=>Nt(Pe.appId),disabled:Rt,children:Rt?"⏳ Đang xử lý...":"🗑️ Hoàn G & Xóa TOÀN BỘ"
            })]
          }),l.jsx("div", {
            style: {
              display:"flex",flexDirection:"column",gap:"6px",maxHeight:"420px",overflowY:"auto"
            },children:ze.map(Z=>l.jsxs("div", {
              style: {
                display:"flex",alignItems:"center",justifyContent:"space-between",padding:"8px 12px",borderRadius:"8px",background:"rgba(255,255,255,0.05)",gap:"12px"
              },children:[l.jsxs("div", {
                style: {
                  flex:1,minWidth:0
                },children:[l.jsx("div", {
                  style: {
                    fontWeight:600,fontSize:"13px",color:"#fff",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"
                  },children:Z.username
                }),l.jsx("div", {
                  style: {
                    fontSize:"11px",color:"rgba(255,255,255,0.45)",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"
                  },children:Z.email
                }),l.jsxs("div", {
                  style: {
                    fontSize:"11px",color:"rgba(255,255,255,0.4)",marginTop:"2px"
                  },children:["Mua: ",new Date(Z.purchased_at).toLocaleString("vi-VN")]
                })]
              }),l.jsxs("div", {
                style: {
                  fontSize:"12px",textAlign:"right",whiteSpace:"nowrap"
                },children:[l.jsx("div", {
                  style: {
                    color:Z.source==="vip"?"#eab308":"#38bdf8",marginBottom:"4px"
                  },children:Z.source==="vip"?"VIP":Z.source==="key"?"Giftcode/Key":"Mua/Free"
                }),l.jsx("div", {
                  style: {
                    color:Z.price_paid>0?"#ffb300":"rgba(255,255,255,0.4)"
                  },children:Z.price_paid>0?`${Z.price_paid.toLocaleString("vi-VN")} G`:"Free"
                })]
              }),l.jsx("button", {
                type:"button",className:"game-btn",style: {
                  background:"#8b0000",color:"#fff",border:"none",fontSize:"11px",padding:"4px 10px",whiteSpace:"nowrap"
                },onClick:()=>mt(Z.user_id,Pe.appId),disabled:nt===Z.user_id||Rt,children:nt===Z.user_id?"⏳":"↩ Hoàn G & Xóa"
              })]
            },Z.user_id))
          })]
        })
      })
    })]
  })
}
function Hne() {
  const {
    sessionId:n
  }
  =nn(),[e,t]=g.useState(""),[i,r]=g.useState(""),[s,a]=g.useState(!1),[o,c]=g.useState(!1),[d,u]=g.useState(null),[f,h]=g.useState(null),[m,p]=g.useState([]),[y,v]=g.useState(!1),[b,w]=g.useState(null),[S,T]=g.useState( {
    discount_denuvo_enabled:!0,discount_normal_enabled:!0,discount_vipyear:0,discount_vip_plus_year:0
  }),[E,x]=g.useState(!1),[k,C]=g.useState(!1),[_,M]=g.useState(null),[j,B]=g.useState(!1),[G,W]=g.useState(!1),[U,q]=g.useState(!1),Q=async()=> {
    if(!n) {
      a(!1);
      return
    }
    a(!0),u(null);
    try {
      const R=await fetch(`${Se}/admin/settings/banner`, {
        headers: {
          Authorization:`Bearer ${n}`
        }
      });
      if(!R.ok)throw new Error("failed");
      const L=await R.json(),A=(L==null?void 0:L.url)||"";
      t(A),r(A)
    }
    catch {
      u("Không tải được banner")
    }
    finally {
      a(!1)
    }
  },te=async()=> {
    if(!n) {
      v(!1);
      return
    }
    v(!0);
    try {
      const R=await fetch(`${Se}/admin/settings/vip-packages`, {
        headers: {
          Authorization:`Bearer ${n}`
        }
      });
      if(!R.ok)throw new Error("failed");
      const L=await R.json();
      p(Array.isArray(L.data)?L.data:[])
    }
    catch {
      p([])
    }
    finally {
      v(!1)
    }
  },ee=async()=> {
    if(!n) {
      x(!1);
      return
    }
    x(!0);
    try {
      const R=await fetch(`${Se}/admin/settings/discount`, {
        headers: {
          Authorization:`Bearer ${n}`
        }
      });
      if(!R.ok)throw new Error("failed");
      const L=await R.json();
      L.success&&T( {
        discount_denuvo_enabled:L.discount_denuvo_enabled??!0,discount_normal_enabled:L.discount_normal_enabled??!0,discount_vipyear:L.discount_vipyear??0,discount_vip_plus_year:L.discount_vip_plus_year??0
      })
    }
    catch{}finally {
      x(!1)
    }
  },he=async(R,L)=> {
    if(n) {
      C(!0);
      try {
        const A= {
          ...S,[R]:L
        };
        if(!(await fetch(`${Se}/admin/settings/discount`, {
          method:"PUT",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${n}`
          },body:JSON.stringify(A)
        })).ok)throw new Error("failed");
        T(A),window.dispatchEvent(new CustomEvent("discountSettingsChanged", {
          detail:A
        }))
      }
      catch {
        ee()
      }
      finally {
        C(!1)
      }
    }
  },me=async()=> {
    if(n) {
      c(!0),u(null),h(null);
      try {
        const R=i.trim();
        if(!R) {
          u("URL không được trống"),c(!1);
          return
        }
        if(!/\.(mp4|webm|gif|png|jpe?g|webp)$/i.test(R)) {
          u("Chỉ hỗ trợ mp4, webm, gif, png, jpg, webp"),c(!1);
          return
        }
        if(!(await fetch(`${Se}/admin/settings/banner`, {
          method:"PUT",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${n}`
          },body:JSON.stringify( {
            url:R
          })
        })).ok)throw new Error("failed");
        t(R),h("Đã lưu banner")
      }
      catch {
        u("Lưu thất bại")
      }
      finally {
        c(!1)
      }
    }
  },se=R=>/\.(mp4|webm)$/i.test(R),be=async()=> {
    if(!n) {
      B(!1);
      return
    }
    B(!0);
    try {
      const L=await(await fetch(`${Se}/admin/nightmarket/current`, {
        headers: {
          Authorization:`Bearer ${n}`
        }
      })).json();
      L.success&&L.data?M(L.data):M(null)
    }
    catch {
      M(null)
    }
    finally {
      B(!1)
    }
  },K=async()=> {
    if(n) {
      W(!0);
      try {
        (await(await fetch(`${Se}/admin/nightmarket/events`, {
          method:"POST",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${n}`
          },body:JSON.stringify( {
            days:5,game_count:10
          })
        })).json()).success&&be()
      }
      catch{}finally {
        W(!1)
      }
    }
  },X=async R=> {
    if(!(!_||!n))try {
      await fetch(`${Se}/admin/nightmarket/events/${_.id}`, {
        method:"PUT",headers: {
          "Content-Type":"application/json",Authorization:`Bearer ${n}`
        },body:JSON.stringify( {
          is_active:R
        })
      }),be()
    }
    catch{}
  };
  g.useEffect(()=> {
    Q(),te(),ee(),be()
  },[n]);
  const $=(i||e).trim(),z=$&&se($);
  g.useEffect(()=> {
    Q(),te(),ee()
  },[n]);
  const D=async(R,L)=> {
    if(n) {
      w(R);
      try {
        if(!(await fetch(`${Se}/admin/settings/vip-packages/${R}`, {
          method:"PUT",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${n}`
          },body:JSON.stringify(L)
        })).ok)throw new Error("failed");
        p(N=>N.map(V=>V.id===R? {
          ...V,...L
        }
        :V))
      }
      finally {
        w(null)
      }
    }
  };
  return l.jsxs("div", {
    className:"settings-panel",children:[l.jsxs("div", {
      className:"settings-card",children:[l.jsxs("div", {
        className:"settings-header",children:[l.jsxs("div", {
          children:[l.jsx("div", {
            className:"settings-title",children:"Store Banner"
          }),l.jsx("div", {
            className:"settings-sub",children:"Cập nhật video banner trang store"
          })]
        }),l.jsxs("div", {
          className:"settings-actions",children:[l.jsx("button", {
            className:"settings-btn ghost",type:"button",onClick:Q,disabled:s,children:s?"Đang tải...":"Tải lại"
          }),l.jsx("button", {
            className:"settings-btn primary",type:"button",onClick:me,disabled:o,children:o?"Đang lưu...":"Lưu"
          })]
        })]
      }),l.jsxs("div", {
        className:"settings-field",children:[l.jsx("label", {
          children:"Banner video URL"
        }),l.jsx("input", {
          className:"settings-input",value:i,onChange:R=>r(R.target.value),placeholder:"https://..."
        }),d&&l.jsx("div", {
          className:"settings-error",children:d
        }),f&&l.jsx("div", {
          className:"settings-success",children:f
        })]
      }),l.jsxs("div", {
        className:"settings-preview",children:[l.jsx("div", {
          className:"settings-preview-title",children:"Preview"
        }),$?l.jsx("div", {
          className:"settings-preview-frame",children:z?l.jsx("video", {
            className:"settings-preview-media",src:$,autoPlay:!0,loop:!0,muted:!0,playsInline:!0,controls:!0
          },$):l.jsx("img", {
            className:"settings-preview-media",src:$,alt:"banner preview"
          },$)
        }):l.jsx("div", {
          className:"settings-empty",children:"Chưa có URL banner"
        })]
      })]
    }),l.jsxs("div", {
      className:"settings-card",children:[l.jsxs("div", {
        className:"settings-header",children:[l.jsxs("div", {
          children:[l.jsx("div", {
            className:"settings-title",children:"VIP Packages"
          }),l.jsx("div", {
            className:"settings-sub",children:"Chỉnh sửa gói VIP/VIP+"
          })]
        }),l.jsx("div", {
          className:"settings-actions",children:l.jsx("button", {
            className:"settings-btn ghost",type:"button",onClick:te,disabled:y,children:y?"Đang tải...":"Tải lại"
          })
        })]
      }),l.jsx("div", {
        className:"settings-vip-list",children:m.length===0?l.jsx("div", {
          className:"settings-empty",children:"Chưa có gói VIP"
        }):m.map(R=>l.jsxs("div", {
          className:"settings-vip-card",children:[l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"ID"
            }),l.jsx("div", {
              className:"settings-readonly",children:R.id
            })]
          }),l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Name"
            }),l.jsx("input", {
              className:"settings-input",defaultValue:R.name,onBlur:L=> {
                const A=L.target.value.trim();
                A&&A!==R.name&&D(R.id, {
                  name:A
                })
              }
            })]
          }),l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Code"
            }),l.jsx("input", {
              className:"settings-input",defaultValue:R.code,onBlur:L=> {
                const A=L.target.value.trim();
                A&&A!==R.code&&D(R.id, {
                  code:A
                })
              }
            })]
          }),l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Type"
            }),l.jsxs("select", {
              className:"settings-input",defaultValue:R.type,onChange:L=>D(R.id, {
                type:L.target.value
              }),children:[l.jsx("option", {
                value:"vip",children:"VIP"
              }),l.jsx("option", {
                value:"vip_plus",children:"VIP+"
              })]
            })]
          }),l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Duration (days)"
            }),l.jsx("input", {
              className:"settings-input",type:"number",defaultValue:R.duration,onBlur:L=> {
                const A=Number(L.target.value);
                !Number.isNaN(A)&&A>0&&A!==R.duration&&D(R.id, {
                  duration:A
                })
              }
            })]
          }),l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Price"
            }),l.jsx("input", {
              className:"settings-input",type:"number",defaultValue:R.price,onBlur:L=> {
                const A=Number(L.target.value);
                !Number.isNaN(A)&&A>=0&&A!==R.price&&D(R.id, {
                  price:A
                })
              }
            })]
          }),l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Description"
            }),l.jsx("textarea", {
              className:"settings-textarea",defaultValue:R.description||"",onBlur:L=> {
                const A=L.target.value;
                A!==R.description&&D(R.id, {
                  description:A
                })
              }
            })]
          }),l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Features (mỗi dòng một mục)"
            }),l.jsx("textarea", {
              className:"settings-textarea",defaultValue:(()=> {
                try {
                  const L=JSON.parse(R.features||"[]");
                  if(Array.isArray(L))return L.join(`
`)
                }
                catch{}return R.features||""
              })(),placeholder:`Nhập mỗi dòng một feature
VD:
Tăng 50% exp
Không quảng cáo`,onBlur:L=> {
                const N=L.target.value.split(`
`).map(O=>O.trim()).filter(O=>O),V=N.length?JSON.stringify(N):"[]";
                V!==R.features&&D(R.id, {
                  features:V
                })
              }
            })]
          }),l.jsxs("div", {
            className:"settings-vip-row inline",children:[l.jsx("label", {
              children:"Active"
            }),l.jsx("input", {
              type:"checkbox",checked:R.is_active===1,onChange:L=>D(R.id, {
                is_active:L.target.checked?1:0
              })
            }),b===R.id&&l.jsx("span", {
              className:"settings-saving",children:"Đang lưu..."
            })]
          })]
        },R.id))
      })]
    }),l.jsxs("div", {
      className:"settings-card",children:[l.jsxs("div", {
        className:"settings-header",children:[l.jsxs("div", {
          children:[l.jsx("div", {
            className:"settings-title",children:"Discount Settings"
          }),l.jsx("div", {
            className:"settings-sub",children:"Bật/tắt giảm giá cho các loại game"
          })]
        }),l.jsx("div", {
          className:"settings-actions",children:l.jsx("button", {
            className:"settings-btn ghost",type:"button",onClick:ee,disabled:E,children:E?"Đang tải...":"Tải lại"
          })
        })]
      }),l.jsxs("div", {
        className:"settings-vip-list",children:[l.jsxs("div", {
          className:"settings-vip-card",children:[l.jsxs("div", {
            className:"settings-vip-row inline",children:[l.jsx("label", {
              children:"Discount cho game Denuvo (special_denuvo = 1)"
            }),l.jsxs("div", {
              style: {
                display:"flex",alignItems:"center",gap:"8px"
              },children:[l.jsx("input", {
                type:"checkbox",checked:S.discount_denuvo_enabled,onChange:R=>he("discount_denuvo_enabled",R.target.checked),disabled:k
              }),k&&l.jsx("span", {
                className:"settings-saving",children:"Đang lưu..."
              })]
            })]
          }),l.jsx("div", {
            className:"settings-vip-row",style: {
              marginTop:"8px",fontSize:"14px",color:"#888"
            },children:"Khi tắt, tất cả game có special_denuvo = 1 sẽ không hiển thị discount, chỉ còn giá gốc"
          })]
        }),l.jsxs("div", {
          className:"settings-vip-card",children:[l.jsxs("div", {
            className:"settings-vip-row inline",children:[l.jsx("label", {
              children:"Discount cho game bình thường (special_denuvo = 0)"
            }),l.jsxs("div", {
              style: {
                display:"flex",alignItems:"center",gap:"8px"
              },children:[l.jsx("input", {
                type:"checkbox",checked:S.discount_normal_enabled,onChange:R=>he("discount_normal_enabled",R.target.checked),disabled:k
              }),k&&l.jsx("span", {
                className:"settings-saving",children:"Đang lưu..."
              })]
            })]
          }),l.jsx("div", {
            className:"settings-vip-row",style: {
              marginTop:"8px",fontSize:"14px",color:"#888"
            },children:"Khi tắt, tất cả game bình thường sẽ không hiển thị discount, chỉ còn giá gốc"
          })]
        }),l.jsxs("div", {
          className:"settings-vip-card",children:[l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Discount cho gói VIP 1 Năm (%)"
            }),l.jsxs("div", {
              style: {
                display:"flex",alignItems:"center",gap:"8px"
              },children:[l.jsx("input", {
                className:"settings-input",type:"number",min:"0",max:"100",value:S.discount_vipyear,onChange:R=> {
                  const L=Number(R.target.value);
                  !Number.isNaN(L)&&L>=0&&L<=100&&he("discount_vipyear",L)
                },disabled:k,style: {
                  width:"100px"
                }
              }),l.jsx("span", {
                children:"%"
              }),k&&l.jsx("span", {
                className:"settings-saving",children:"Đang lưu..."
              })]
            })]
          }),l.jsx("div", {
            className:"settings-vip-row",style: {
              marginTop:"8px",fontSize:"14px",color:"#888"
            },children:"Phần trăm giảm giá khi mua gói VIP 1 Năm (0-100%)"
          })]
        }),l.jsxs("div", {
          className:"settings-vip-card",children:[l.jsxs("div", {
            className:"settings-vip-row",children:[l.jsx("label", {
              children:"Discount cho gói VIP+ 1 Năm (%)"
            }),l.jsxs("div", {
              style: {
                display:"flex",alignItems:"center",gap:"8px"
              },children:[l.jsx("input", {
                className:"settings-input",type:"number",min:"0",max:"100",value:S.discount_vip_plus_year,onChange:R=> {
                  const L=Number(R.target.value);
                  !Number.isNaN(L)&&L>=0&&L<=100&&he("discount_vip_plus_year",L)
                },disabled:k,style: {
                  width:"100px"
                }
              }),l.jsx("span", {
                children:"%"
              }),k&&l.jsx("span", {
                className:"settings-saving",children:"Đang lưu..."
              })]
            })]
          }),l.jsx("div", {
            className:"settings-vip-row",style: {
              marginTop:"8px",fontSize:"14px",color:"#888"
            },children:"Phần trăm giảm giá khi mua gói VIP+ 1 Năm (0-100%)"
          })]
        })]
      })]
    }),l.jsxs("div", {
      className:"settings-card",children:[l.jsxs("div", {
        className:"settings-header",children:[l.jsxs("div", {
          children:[l.jsx("div", {
            className:"settings-title",children:"Nightmarket"
          }),l.jsx("div", {
            className:"settings-sub",children:"Quản lý sự kiện Nightmarket - giảm giá game ngẫu nhiên"
          })]
        }),l.jsxs("div", {
          className:"settings-actions",children:[l.jsx("button", {
            className:"settings-btn ghost",type:"button",onClick:be,disabled:j,children:j?"Đang tải...":"Tải lại"
          }),l.jsx("button", {
            className:"settings-btn primary",type:"button",onClick:()=>q(!0),disabled:G,children:G?"Đang tạo...":"+ Tạo sự kiện mới (5 ngày)"
          })]
        })]
      }),_?l.jsx(l.Fragment, {
        children:l.jsxs("div", {
          className:"nm-admin-status",children:[l.jsxs("div", {
            className:"nm-admin-event-info",children:[l.jsx("span", {
              className:`nm-admin-badge ${_.is_active?"active":"inactive"}`,children:_.is_active?"Đang hoạt động":"Tắt"
            }),l.jsxs("span", {
              className:"nm-admin-dates",children:[new Date(_.started_at).toLocaleDateString("vi-VN")," → ",new Date(_.ended_at).toLocaleDateString("vi-VN")]
            }),l.jsxs("span", {
              className:"nm-admin-count",children:[_.items.length," game"]
            })]
          }),l.jsx("div", {
            className:"nm-admin-toggle",children:l.jsx("button", {
              className:`settings-btn ${_.is_active?"ghost":"primary"}`,type:"button",onClick:()=>X(_.is_active?0:1),disabled:G,children:_.is_active?"Tắt":"Bật"
            })
          })]
        })
      }):!j&&l.jsx("div", {
        className:"settings-empty",children:'Chưa có sự kiện Nightmarket nào. Nhấn "Tạo sự kiện mới" để bắt đầu.'
      })]
    }),l.jsx(uh, {
      isOpen:U,onClose:()=>q(!1),title:"Tạo sự kiện Nightmarket mới",message:"Tạo sự kiện mới kéo dài 5 ngày? Sự kiện cũ sẽ không bị xóa.",type:"info",confirmText:"Tạo",showCancel:!0,onConfirm:K
    })]
  })
}
function Kne( {
  openUserGames:n,targetUsername:e
}
={}) {
  var ua;
  const {
    sessionId:t,user:i
  }
  =nn(),[r,s]=g.useState(""),[a,o]=g.useState([]),[c,d]=g.useState(!1),[u,f]=g.useState(1),h=10,[m,p]=g.useState(null),[y,v]=g.useState(null),[b,w]=g.useState(null),[S,T]=g.useState(null),[E,x]=g.useState(null),[k,C]=g.useState(null),[_,M]=g.useState(null),[j,B]=g.useState(null),[G,W]=g.useState(!1),[U,q]=g.useState(null),[Q,te]=g.useState(""),[ee,he]=g.useState(""),[me,se]=g.useState([]),[be,K]=g.useState(!1),[X,$]=g.useState(""),[z,D]=g.useState(null),[R,L]=g.useState("user"),[A,N]=g.useState( {
    key:null,direction:"asc"
  }),[V,O]=g.useState(null),[F,J]=g.useState(null),[re,ie]=g.useState(null),[fe,ce]=g.useState(!1),[ke,Pe]=g.useState(null),[de,ze]=g.useState(!1),[Xe,Ye]=g.useState(null),[ve,nt]=g.useState(!1),ft=[ {
    days:90,label:"≥ 3 tháng"
  }, {
    days:180,label:"≥ 6 tháng"
  }, {
    days:365,label:"≥ 12 tháng"
  }
  ],[Rt,Mt]=g.useState(!1),[Ze,Fe]=g.useState([]),[le,pe]=g.useState(null),[_e,Ge]=g.useState(!1),[Ve,qe]=g.useState(!1),[rt,bt]=g.useState(!1),[mt,Nt]=g.useState(20),Ae=g.useRef(null),dt=async()=> {
    d(!0);
    try {
      const ae=await fetch(`${Se}/admin/users`, {
        headers:t? {
          Authorization:`Bearer ${t}`
        }
        :{}
      });
      if(!ae.ok)throw new Error("failed");
      const We=await ae.json(),it=Array.isArray(We.data)?We.data:[];
      o(it.map(St=>( {
        id:String(St.id),username:St.username,email:St.email,role:St.role,p_balance:Number(St.p_balance||0),is_online:Number(St.is_online||0),vip_expires_at:St.vip_expires_at
      })))
    }
    catch {
      o([])
    }
    finally {
      d(!1)
    }
  };
  g.useEffect(()=> {
    dt();
    const ae=setInterval(dt,15e3);
    return()=>clearInterval(ae)
  },[t]),g.useEffect(()=> {
    n&&(W(!0),L("user"),he(e||""),q(n),te(e||""),ye(n))
  },[n,e]);
  const Wt=g.useMemo(()=> {
    let ae=[...a];
    return A.key!==null&&ae.sort((We,it)=> {
      let St=We[A.key],Bt=it[A.key];
      if(A.key==="role") {
        const Si=Dn=> {
          switch(Dn) {
            case"owner":return 100;
            case"super_admin":return 90;
            case"admin":return 80;
            case"ctv":return 70;
            case"vip_plus":return 60;
            case"vip":return 50;
            case"netflix":return 40;
            case"user":return 10;
            default:return 0
          }
        };
        St=Si(We.role),Bt=Si(it.role)
      }
      if(A.key==="vip_expires_at") {
        const Si=Dn=>Dn.role==="admin"||Dn.role==="super_admin"||Dn.role==="owner"?1/0:Dn.vip_expires_at?new Date(Dn.vip_expires_at).getTime():0;
        St=Si(We),Bt=Si(it)
      }
      return St===Bt?0:St==null?A.direction==="asc"?1:-1:Bt==null||St<Bt?A.direction==="asc"?-1:1:St>Bt?A.direction==="asc"?1:-1:0
    }),ae
  },[a,A]),Le=g.useMemo(()=> {
    const ae=r.trim().toLowerCase();
    if(!ae)return Wt;
    const We=it=>it.toLowerCase().replace(/_/g," ");
    return Wt.filter(it=>We(it.username).includes(ae)||We(it.email).includes(ae)||We(it.role).includes(ae)||We(String(it.id)).includes(ae))
  },[r,Wt]),Qe=Math.max(1,Math.ceil(Le.length/h)),ot=g.useMemo(()=> {
    const ae=(u-1)*h;
    return Le.slice(ae,ae+h)
  },[Le,u]);
  g.useEffect(()=> {
    f(1)
  },[r]);
  const xt=ae=> {
    let We="asc";
    A.key===ae&&A.direction==="asc"&&(We="desc"),N( {
      key:ae,direction:We
    })
  },Ee=ae=>A.key!==ae?"↕":A.direction==="asc"?"↑":"↓",Ke=g.useMemo(()=>a.filter(ae=>ae.is_online===1).length,[a]),$e=g.useMemo(()=>a.filter(ae=>ae.is_online===2).length,[a]),st=async(ae,We)=> {
    if(!(i&&i.id===ae)&&!(i&&i.role==="admin"&&We==="super_admin")) {
      p(ae);
      try {
        await fetch(`${Se}/admin/users/${ae}/role`, {
          method:"PUT",headers: {
            "Content-Type":"application/json",...t? {
              Authorization:`Bearer ${t}`
            }
            :{}
          },body:JSON.stringify( {
            role:We
          })
        }),o(it=>it.map(St=>St.id===ae? {
          ...St,role:We,...We==="user"||We==="netflix"? {
            vip_expires_at:void 0
          }
          :{}
        }
        :St))
      }
      finally {
        p(null)
      }
    }
  },Ct=async(ae,We)=> {
    if(!(i&&i.role!=="admin"&&i.role!=="super_admin")) {
      v(ae);
      try {
        if(!(await fetch(`${Se}/admin/users/${ae}/balance`, {
          method:"PUT",headers: {
            "Content-Type":"application/json",...t? {
              Authorization:`Bearer ${t}`
            }
            :{}
          },body:JSON.stringify( {
            p_balance:We
          })
        })).ok)throw new Error("save_failed");
        o(St=>St.map(Bt=>Bt.id===ae? {
          ...Bt,p_balance:We
        }
        :Bt)),dt()
      }
      catch(it) {
        console.error(it)
      }
      finally {
        v(null)
      }
    }
  },wt=async(ae,We)=> {
    if(!(i&&i.role!=="admin"&&i.role!=="super_admin")) {
      M(ae);
      try {
        if(!(await fetch(`${Se}/admin/users/${ae}/vip-expire`, {
          method:"PUT",headers: {
            "Content-Type":"application/json",...t? {
              Authorization:`Bearer ${t}`
            }
            :{}
          },body:JSON.stringify( {
            vip_expires_at:We
          })
        })).ok)throw new Error("save_failed");
        o(St=>St.map(Bt=>Bt.id===ae? {
          ...Bt,vip_expires_at:We||void 0
        }
        :Bt)),dt()
      }
      catch(it) {
        console.error(it)
      }
      finally {
        M(null),C(null)
      }
    }
  },Z=async(ae,We)=> {
    if(!(i&&i.role!=="admin"&&i.role!=="super_admin")) {
      if(!We.trim()||!We.includes("@")) {
        alert("Email không hợp lệ");
        return
      }
      x(ae);
      try {
        const it=await fetch(`${Se}/admin/users/${ae}/email`, {
          method:"PUT",headers: {
            "Content-Type":"application/json",...t? {
              Authorization:`Bearer ${t}`
            }
            :{}
          },body:JSON.stringify( {
            email:We
          })
        });
        if(!it.ok) {
          const St=await it.json();
          throw new Error(St.message||"save_failed")
        }
        o(St=>St.map(Bt=>Bt.id===ae? {
          ...Bt,email:We
        }
        :Bt)),alert("Đổi email thành công!")
      }
      catch(it) {
        console.error(it),alert(it.message||"Không thể đổi email")
      }
      finally {
        x(null)
      }
    }
  },ue=async ae=> {
    if(i&&i.role!=="admin"&&i.role!=="super_admin")return;
    const We=prompt("Nhập mật khẩu mới (tối thiểu 6 ký tự):");
    if(!We)return;
    if(We.length<6) {
      alert("Mật khẩu phải có ít nhất 6 ký tự");
      return
    }
    const it=prompt("Xác nhận mật khẩu mới:");
    if(We!==it) {
      alert("Mật khẩu xác nhận không khớp!");
      return
    }
    B(ae);
    try {
      const St=await fetch(`${Se}/admin/users/${ae}/password`, {
        method:"PUT",headers: {
          "Content-Type":"application/json",...t? {
            Authorization:`Bearer ${t}`
          }
          :{}
        },body:JSON.stringify( {
          password:We
        })
      });
      if(!St.ok) {
        const Bt=await St.json();
        throw new Error(Bt.message||"save_failed")
      }
      alert("Đổi mật khẩu thành công!")
    }
    catch(St) {
      console.error(St),alert(St.message||"Không thể đổi mật khẩu")
    }
    finally {
      B(null)
    }
  },ye=async ae=> {
    K(!0),se([]);
    try {
      const We=await fetch(`${Se}/admin/users/${ae}/games`, {
        headers:t? {
          Authorization:`Bearer ${t}`
        }
        :{}
      });
      if(!We.ok)throw new Error("failed");
      const it=await We.json();
      it.success&&Array.isArray(it.data)&&se(it.data)
    }
    catch(We) {
      console.error(We),se([])
    }
    finally {
      K(!1)
    }
  },Ne=ae=> {
    if(!U)return;
    const We=me.find(it=>it.game_id===ae);
    We&&O( {
      gameId:ae,gameName:We.game_name||ae,refundAmount:We.price_paid
    })
  },et=async()=> {
    var it;
    if(!V||!U)return;
    const {
      gameId:ae,refundAmount:We
    }
    =V;
    D(ae),O(null);
    try {
      const St=await fetch(`${Se}/admin/users/${U}/games/${ae}`, {
        method:"DELETE",headers:t? {
          Authorization:`Bearer ${t}`
        }
        :{}
      });
      if(!St.ok)throw new Error("failed");
      const Bt=await St.json();
      se(Si=>Si.filter(Dn=>Dn.game_id!==ae)),Bt.newBalance!==void 0&&U&&o(Si=>Si.map(Dn=>Dn.id===U? {
        ...Dn,p_balance:Bt.newBalance
      }
      :Dn)),We>0?alert(`Xóa game thành công!

Đã hoàn lại: ${We.toLocaleString("vi-VN")} G
Số dư mới: ${((it=Bt.newBalance)==null?void 0:it.toLocaleString("vi-VN"))||0} G`):alert("Xóa game thành công!")
    }
    catch(St) {
      console.error(St),alert("Không thể xóa game")
    }
    finally {
      D(null)
    }
  },lt=ae=> {
    const We=a.find(it=>it.id===ae);
    if(We) {
      if(i&&i.id===ae) {
        alert("Bạn không thể xóa tài khoản của chính mình!");
        return
      }
      if(i&&i.role!=="super_admin"&&We.role==="super_admin") {
        alert("Bạn không có quyền xóa tài khoản super_admin!");
        return
      }
      J( {
        userId:ae,username:We.username
      })
    }
  },kt=async()=> {
    if(!F)return;
    const {
      userId:ae
    }
    =F;
    ie(ae),J(null);
    try {
      const We=await fetch(`${Se}/admin/users/${ae}`, {
        method:"DELETE",headers:t? {
          Authorization:`Bearer ${t}`
        }
        :{}
      });
      if(!We.ok) {
        const it=await We.json();
        throw new Error(it.message||"delete_failed")
      }
      o(it=>it.filter(St=>St.id!==ae)),alert("Xóa tài khoản thành công!")
    }
    catch(We) {
      console.error(We),alert(We.message||"Không thể xóa tài khoản")
    }
    finally {
      ie(null)
    }
  },Gt=async()=> {
    Ge(!0),Mt(!0),pe(null),bt(!1);
    try {
      const ae=await Promise.all(ft.map(async We=> {
        const it=await fetch(`${Se}/admin/users/purge-inactive`, {
          method:"POST",headers: {
            "Content-Type":"application/json",...t? {
              Authorization:`Bearer ${t}`
            }
            :{}
          },body:JSON.stringify( {
            days:We.days,stats_only:!0
          })
        }),St=await it.json();
        if(!it.ok||!St.success)throw new Error(St.message||`preview_${We.days}_failed`);
        return {
          days:We.days,label:We.label,count:Number(St.count||0),kept_count:Number(St.kept_count||0)
        }
      }));
      Fe(ae)
    }
    catch(ae) {
      Mt(!1),alert(ae.message||"Không quét được mốc offline")
    }
    finally {
      Ge(!1)
    }
  },fn=async ae=> {
    Ge(!0);
    try {
      const We=await fetch(`${Se}/admin/users/purge-inactive`, {
        method:"POST",headers: {
          "Content-Type":"application/json",...t? {
            Authorization:`Bearer ${t}`
          }
          :{}
        },body:JSON.stringify( {
          days:ae
        })
      }),it=await We.json();
      if(!We.ok||!it.success)throw new Error(it.message||"preview_failed");
      const St=Array.isArray(it.list)?it.list:Array.isArray(it.sample)?it.sample:[];
      Mt(!1),pe( {
        days:it.days,count:it.count,kept_count:Number(it.kept_count||0),list:St
      })
    }
    catch(We) {
      alert(We.message||"Không xem được danh sách dọn offline")
    }
    finally {
      Ge(!1)
    }
  },on=async()=> {
    var We;
    if(!((We=le==null?void 0:le.list)!=null&&We.length))return;
    const ae=["username	email	p_balance	free_games	last_active",...le.list.map(it=>`${it.username}	${it.email||""}	${it.p_balance}	${it.free_games}	${it.last_active?String(it.last_active).slice(0,19):""}`)];
    try {
      await navigator.clipboard.writeText(ae.join(`
`)),alert(`Đã copy ${le.list.length} dòng vào clipboard`)
    }
    catch {
      alert("Không copy được clipboard")
    }
  },Ot=()=> {
    !le||le.count<=0||bt(!0)
  },rn=((ua=le==null?void 0:le.list)==null?void 0:ua.slice(0,80))??[],mi=le&&le.list.length>rn.length?le.list.length-rn.length:0,wn=async()=> {
    if(!le||!rt)return;
    const ae=le.count,We=le.days,it=le.kept_count;
    qe(!0);
    try {
      const St=await fetch(`${Se}/admin/users/purge-inactive`, {
        method:"POST",headers: {
          "Content-Type":"application/json",...t? {
            Authorization:`Bearer ${t}`
          }
          :{}
        },body:JSON.stringify( {
          days:We,confirm:!0
        })
      }),Bt=await St.json();
      if(!St.ok||!Bt.success)throw new Error(Bt.message||"purge_failed");
      const Si=Number(Bt.deleted??0),Dn=Number(Bt.count??ae),ws=Number(Bt.kept_count??it);
      bt(!1),pe(null),Mt(!1),alert([`ĐÃ XÓA: ${Si} / ${Dn} user`,`Offline ≥ ${We} ngày · acc rác (0 G, không game trả phí)`,`Giữ lại (có số dư / game phí / VIP): ${ws}`,Si!==ae?`(Preview lúc nãy: ${ae} số thực tế sau khi quét lại: ${Dn})`:"",Array.isArray(Bt.errors)&&Bt.errors.length?`Lỗi: ${Bt.errors.slice(0,3).join("; ")}`:""].filter(Boolean).join(`
`)),await dt()
    }
    catch(St) {
      alert(St.message||"Không xóa được user offline")
    }
    finally {
      qe(!1)
    }
  },Nr=async()=> {
    if(U) {
      ce(!0),Pe(null);
      try {
        const We=await(await fetch(`${Se}/admin/users/${U}/fix-library`, {
          method:"POST",headers:t? {
            Authorization:`Bearer ${t}`
          }
          :{}
        })).json();
        We.success?Pe(`✅ ${We.message}`):Pe(`❌ ${We.message||"Lỗi fix Game"}`)
      }
      catch {
        Pe("❌ Lỗi kết nối server")
      }
      finally {
        ce(!1)
      }
    }
  },Rr=async()=> {
    nt(!1),ze(!0),Ye(null);
    try {
      const We=await(await fetch(`${Se}/admin/fix-all-libraries`, {
        method:"POST",headers:t? {
          Authorization:`Bearer ${t}`
        }
        :{}
      })).json();
      We.success?Ye(`✅ ${We.message}`):Ye(`❌ ${We.message||"Lỗi"}`)
    }
    catch {
      Ye("❌ Lỗi kết nối server")
    }
    finally {
      ze(!1)
    }
  },hn=g.useMemo(()=> {
    const ae=X.trim().toLowerCase();
    return ae?me.filter(We=>(We.game_name||"").toLowerCase().includes(ae)||We.game_id.toLowerCase().includes(ae)):me
  },[X,me]),_n=g.useMemo(()=> {
    const ae=ee.trim().toLowerCase();
    if(!ae)return a;
    const We=it=>it.toLowerCase().replace(/_/g," ");
    return a.filter(it=>We(it.username).includes(ae)||We(it.email).includes(ae)||We(it.role).includes(ae)||We(String(it.id)).includes(ae))
  },[ee,a]);
  g.useEffect(()=> {
    Nt(20),Ae.current&&(Ae.current.scrollTop=0)
  },[ee]);
  const Pn=ae=> {
    const {
      scrollTop:We,scrollHeight:it,clientHeight:St
    }
    =ae.currentTarget;
    it-We<=St+100&&Nt(Bt=>Math.min(Bt+20,_n.length))
  },zi=g.useMemo(()=>_n.slice(0,mt),[_n,mt]),zo=l.jsx("div", {
    className:"user-games-modal-overlay",onClick:()=>W(!1),children:l.jsxs("div", {
      className:"user-games-modal",onClick:ae=>ae.stopPropagation(),children:[l.jsxs("div", {
        className:"user-games-modal-header",children:[l.jsx("h2", {
          children:"User Games"
        }),l.jsx("button", {
          type:"button",className:"user-games-modal-close",onClick:()=> {
            W(!1),L("user"),q(null),te(""),he(""),se([])
          },children:"×"
        })]
      }),l.jsxs("div", {
        className:"user-games-modal-tabs",children:[l.jsx("button", {
          type:"button",className:`user-games-tab ${R==="user"?"active":""}`,onClick:()=> {
            L("user")
          },children:"Tìm User"
        }),l.jsx("button", {
          type:"button",className:`user-games-tab ${R==="fix"?"active":""}`,onClick:()=> {
            L("fix"),Pe(null)
          },children:"🔧 Fix game"
        })]
      }),R==="fix"&&Xe&&l.jsxs("div", {
        style: {
          margin:"0 0 8px 0",padding:"8px 14px",background:Xe.startsWith("✅")?"#052e16":"#2d1515",border:`1px solid ${Xe.startsWith("✅")?"#16a34a":"#dc2626"}`,borderRadius:6,color:Xe.startsWith("✅")?"#86efac":"#fca5a5",fontSize:13,display:"flex",alignItems:"center",justifyContent:"space-between"
        },children:[l.jsx("span", {
          children:Xe
        }),l.jsx("button", {
          type:"button",onClick:()=>Ye(null),style: {
            background:"none",border:"none",color:"#94a3b8",cursor:"pointer",fontSize:16
          },children:"×"
        })]
      }),R==="user"&&l.jsxs("div", {
        className:"user-games-modal-body",children:[l.jsxs("div", {
          className:"user-games-user-section",children:[l.jsx("div", {
            className:"user-games-user-search",children:l.jsx("input", {
              type:"text",placeholder:"Tìm kiếm user...",value:ee,onChange:ae=>he(ae.target.value),className:"user-games-search-input",autoFocus:!0
            })
          }),l.jsxs("div", {
            className:"user-games-user-list",onScroll:Pn,ref:Ae,children:[zi.length===0?l.jsx("div", {
              className:"user-games-empty",children:"Không tìm thấy user"
            }):zi.map(ae=>l.jsx("div", {
              className:`user-games-user-item ${U===ae.id?"selected":""}`,onClick:()=> {
                q(ae.id),te(ae.username),ye(ae.id)
              },children:l.jsxs("div", {
                className:"user-games-user-info",children:[l.jsx("div", {
                  className:"user-games-user-name",children:ae.username
                }),l.jsx("div", {
                  className:"user-games-user-email",children:ae.email
                }),l.jsx("div", {
                  className:"user-games-user-role",children:ae.role
                })]
              })
            },ae.id)),mt<_n.length&&l.jsx("div", {
              className:"user-games-loading-more",children:"Đang tải thêm..."
            })]
          })]
        }),U?l.jsxs("div", {
          className:"user-games-games-section",children:[l.jsx("div", {
            className:"user-games-modal-search",children:l.jsx("input", {
              type:"text",placeholder:"Tìm kiếm game...",value:X,onChange:ae=>$(ae.target.value),className:"user-games-search-input"
            })
          }),l.jsx("div", {
            className:"user-games-modal-content",children:be?l.jsx("div", {
              className:"user-games-loading",children:"Đang tải..."
            }):hn.length===0?l.jsx("div", {
              className:"user-games-empty",children:"Không có game nào"
            }):l.jsx("div", {
              className:"user-games-list",children:hn.map(ae=>l.jsxs("div", {
                className:"user-game-item",children:[l.jsx("div", {
                  className:"user-game-image",children:ae.banner_url?l.jsx("img", {
                    src:ae.banner_url,alt:ae.game_name||ae.game_id,className:"user-game-img"
                  }):l.jsx("div", {
                    className:"user-game-placeholder",children:"No Image"
                  })
                }),l.jsxs("div", {
                  className:"user-game-info",children:[l.jsx("div", {
                    className:"user-game-name",children:ae.game_name||ae.game_id
                  }),l.jsxs("div", {
                    className:"user-game-details",children:[l.jsxs("span", {
                      children:["App ID: ",ae.game_id]
                    }),l.jsxs("span", {
                      children:["Mua: ",new Date(ae.purchased_at).toLocaleString("vi-VN")]
                    }),l.jsxs("span", {
                      style: {
                        color:ae.source==="vip"?"#eab308":"#38bdf8"
                      },children:["Nguồn: ",ae.source==="vip"?"VIP":ae.source==="key"?"Giftcode/Key":"Mua/Free"]
                    }),l.jsxs("span", {
                      children:["Giá: ",ae.price_paid>0?`${ae.price_paid.toLocaleString("vi-VN")} G`:"0 G (Free)"]
                    })]
                  })]
                }),l.jsx("div", {
                  className:"user-game-actions",children:l.jsx("button", {
                    type:"button",className:"user-game-delete-btn",onClick:()=>Ne(ae.game_id),disabled:z===ae.game_id,children:z===ae.game_id?"...":"Xóa"
                  })
                })]
              },ae.id))
            })
          })]
        }):l.jsx("div", {
          className:"user-games-no-selection",children:l.jsx("p", {
            children:"Chọn một người dùng để xem danh sách game"
          })
        })]
      }),R==="fix"&&l.jsx("div", {
        className:"user-games-modal-body",style: {
          gridTemplateColumns:"1fr"
        },children:l.jsxs("div", {
          style: {
            display:"flex",gap:16
          },children:[l.jsxs("div", {
            className:"user-games-user-section",style: {
              flex:"0 0 280px"
            },children:[l.jsx("div", {
              className:"user-games-user-search",children:l.jsx("input", {
                type:"text",placeholder:"Tìm user...",value:ee,onChange:ae=>he(ae.target.value),className:"user-games-search-input",autoFocus:!0
              })
            }),l.jsx("div", {
              className:"user-games-user-list",onScroll:Pn,ref:Ae,children:zi.map(ae=>l.jsx("div", {
                className:`user-games-user-item ${U===ae.id?"selected":""}`,onClick:()=> {
                  q(ae.id),te(ae.username),Pe(null)
                },children:l.jsxs("div", {
                  className:"user-games-user-info",children:[l.jsx("div", {
                    className:"user-games-user-name",children:ae.username
                  }),l.jsx("div", {
                    className:"user-games-user-email",children:ae.email
                  }),l.jsx("div", {
                    className:"user-games-user-role",children:ae.role
                  })]
                })
              },ae.id))
            })]
          }),l.jsxs("div", {
            style: {
              flex:1,display:"flex",flexDirection:"column",gap:12,padding:"12px 0"
            },children:[l.jsxs("div", {
              style: {
                display:"flex",alignItems:"center",gap:12,paddingBottom:12,borderBottom:"1px solid #1e293b",flexWrap:"wrap"
              },children:[ve?l.jsxs(l.Fragment, {
                children:[l.jsx("span", {
                  style: {
                    fontSize:13,color:"#fbbf24"
                  },children:"Chắc chưa đó?"
                }),l.jsx("button", {
                  type:"button",onClick:Rr,style: {
                    padding:"6px 14px",background:"#16a34a",color:"#fff",border:"none",borderRadius:6,cursor:"pointer",fontWeight:600,fontSize:13
                  },children:"Xác nhận"
                }),l.jsx("button", {
                  type:"button",onClick:()=>nt(!1),style: {
                    padding:"6px 14px",background:"#374151",color:"#fff",border:"none",borderRadius:6,cursor:"pointer",fontSize:13
                  },children:"Hủy"
                })]
              }):l.jsx("button", {
                type:"button",onClick:()=>nt(!0),disabled:de,style: {
                  padding:"8px 18px",background:de?"#374151":"#7c3aed",color:"#fff",border:"none",borderRadius:7,cursor:de?"not-allowed":"pointer",fontWeight:600,fontSize:13
                },children:de?"⏳ Đang quét...":"⚡ Quét tất cả user"
              }),Xe&&l.jsx("span", {
                style: {
                  fontSize:13,color:Xe.startsWith("✅")?"#86efac":"#fca5a5"
                },children:Xe
              })]
            }),U?l.jsxs(l.Fragment, {
              children:[l.jsxs("div", {
                style: {
                  fontWeight:600,fontSize:15
                },children:["Fix game sót cho: ",l.jsx("span", {
                  style: {
                    color:"#60a5fa"
                  },children:Q
                })]
              }),l.jsx("div", {
                style: {
                  color:"#94a3b8",fontSize:13
                },children:"Chức năng này sẽ kiểm tra tất cả game trong thư viện của user và tự động thêm log entry còn thiếu, đảm bảo game hiện đúng trong library mà không cần user mua lại."
              }),l.jsx("button", {
                type:"button",onClick:Nr,disabled:fe,style: {
                  padding:"10px 24px",background:fe?"#374151":"#2563eb",color:"#fff",border:"none",borderRadius:8,cursor:fe?"not-allowed":"pointer",fontWeight:600,fontSize:14,alignSelf:"flex-start"
                },children:fe?"Đang fix...":"🔧 Fix Game"
              }),ke&&l.jsx("div", {
                style: {
                  padding:"10px 16px",background:ke.startsWith("✅")?"#052e16":"#2d1515",border:`1px solid ${ke.startsWith("✅")?"#16a34a":"#dc2626"}`,borderRadius:8,color:ke.startsWith("✅")?"#86efac":"#fca5a5",fontSize:14
                },children:ke
              })]
            }):l.jsx("div", {
              className:"user-games-no-selection",children:"Chọn một user để fix"
            })]
          })]
        })
      })]
    })
  });
  return l.jsxs("div", {
    className:"user-manager",children:[l.jsxs("div", {
      className:"user-header",children:[l.jsxs("div", {
        children:[l.jsx("div", {
          className:"user-title",children:"User Manager"
        }),l.jsxs("div", {
          className:"user-stat-row",children:[l.jsxs("span", {
            className:"user-sub",children:["Tổng: ",a.length]
          }),l.jsx("span", {
            className:"user-stat-divider",children:"•"
          }),l.jsxs("span", {
            className:"user-sub user-online-stat",children:["Online: ",Ke]
          }),l.jsx("span", {
            className:"user-stat-divider",children:"•"
          }),l.jsxs("span", {
            className:"user-sub",style: {
              color:"#9ca3af"
            },children:["Ẩn/Khay: ",$e]
          })]
        })]
      }),l.jsxs("div", {
        className:"user-actions",children:[l.jsx("input", {
          className:"user-search",placeholder:"Tìm username, email, role...",value:r,onChange:ae=>s(ae.target.value)
        }),l.jsx("button", {
          type:"button",className:"user-purge-header-btn",disabled:_e,onClick:()=>Gt(),title:"Chọn mốc 3 / 6 / 12 tháng rồi xem list trước khi xóa",children:_e?"Đang quét...":"Dọn offline…"
        }),l.jsx("button", {
          type:"button",className:"user-games-header-btn",onClick:()=> {
            W(!0),L("user"),he(""),q(null),te(""),se([])
          },children:"User Games"
        })]
      })]
    }),l.jsxs("div", {
      className:"user-table",children:[l.jsxs("div", {
        className:"user-table-head",children:[l.jsxs("div", {
          onClick:()=>xt("username"),className:"clickable-head",children:["Username ",Ee("username")]
        }),l.jsxs("div", {
          onClick:()=>xt("email"),className:"clickable-head",children:["Email ",Ee("email")]
        }),l.jsxs("div", {
          onClick:()=>xt("role"),className:"clickable-head",children:["Role ",Ee("role")]
        }),l.jsxs("div", {
          onClick:()=>xt("p_balance"),className:"clickable-head",children:["Số dư (G) ",Ee("p_balance")]
        }),l.jsxs("div", {
          onClick:()=>xt("vip_expires_at"),className:"clickable-head",children:["VIP Hết hạn ",Ee("vip_expires_at")]
        }),l.jsxs("div", {
          onClick:()=>xt("is_online"),className:"clickable-head",children:["Online ",Ee("is_online")]
        }),l.jsx("div", {
          children:"Actions"
        })]
      }),Le.length===0?l.jsx("div", {
        className:"user-table-empty",children:c?"Đang tải...":"Không có người dùng"
      }):ot.map(ae=>l.jsxs("div", {
        className:"user-table-row",children:[l.jsx("div", {
          className:"user-name-cell",children:ae.username
        }),l.jsx("div", {
          className:"user-email-cell",children:S===ae.id?l.jsx("input", {
            className:"user-email-input",type:"email",defaultValue:ae.email,disabled:E===ae.id,autoFocus:!0,onBlur:We=> {
              const it=We.target.value.trim();
              if(!it||!it.includes("@")) {
                T(null);
                return
              }
              it!==ae.email&&Z(ae.id,it),T(null)
            },onKeyDown:We=> {
              We.key==="Enter"&&We.target.blur(),We.key==="Escape"&&T(null)
            }
          }):l.jsx("button", {
            type:"button",className:"user-email-display",onClick:()=>T(ae.id),disabled:E===ae.id,title:"Click để đổi email",children:ae.email
          })
        }),l.jsx("div", {
          children:l.jsxs("select", {
            className:"user-role-select",value:ae.role,disabled:!!(m===ae.id||i&&i.id===ae.id||i&&i.role==="admin"&&ae.role==="super_admin"),onChange:We=>st(ae.id,We.target.value),children:[l.jsx("option", {
              value:"user",children:"user"
            }),l.jsx("option", {
              value:"vip",children:"vip"
            }),l.jsx("option", {
              value:"vip_plus",children:"vip_plus"
            }),l.jsx("option", {
              value:"admin",children:"admin"
            }),l.jsx("option", {
              value:"ctv",children:"ctv"
            }),l.jsx("option", {
              value:"super_admin",children:"super_admin"
            })]
          })
        }),l.jsx("div", {
          children:l.jsx("div", {
            className:"user-balance",children:b===ae.id?l.jsxs(l.Fragment, {
              children:[l.jsx("input", {
                className:"user-balance-input",type:"number",defaultValue:ae.p_balance,disabled:y===ae.id,autoFocus:!0,onBlur:We=> {
                  const it=Number(We.target.value);
                  if(Number.isNaN(it)||it<0) {
                    w(null);
                    return
                  }
                  it!==ae.p_balance&&Ct(ae.id,it),w(null)
                },onKeyDown:We=> {
                  We.key==="Enter"&&We.target.blur(),We.key==="Escape"&&w(null)
                }
              }),l.jsx("span", {
                className:"user-balance-suffix",children:"G"
              })]
            }):l.jsxs("button", {
              type:"button",className:"user-balance-display",onClick:()=>w(ae.id),disabled:y===ae.id,children:[ae.p_balance.toLocaleString("vi-VN")," G"]
            })
          })
        }),l.jsx("div", {
          className:"user-vip-cell",children:k===ae.id?l.jsxs("div", {
            style: {
              display:"flex",flexDirection:"column",gap:"6px"
            },children:[l.jsx("button", {
              type:"button",onMouseDown:We=> {
                We.preventDefault(),wt(ae.id,null)
              },disabled:_===ae.id,style: {
                fontSize:"11px",padding:"4px",background:"rgba(251, 191, 36, 0.2)",color:"#fbbf24",border:"1px solid #fbbf24",borderRadius:"4px",cursor:"pointer",fontWeight:600,width:"100%"
              },children:"Set Vĩnh Viễn"
            }),l.jsx("input", {
              type:"date",className:"user-balance-input",style: {
                fontSize:"12px",padding:"4px",width:"100%",boxSizing:"border-box"
              },defaultValue:ae.vip_expires_at?new Date(ae.vip_expires_at).toISOString().split("T")[0]:"",disabled:_===ae.id,autoFocus:!0,onBlur:We=> {
                const it=We.target.value;
                if(it) {
                  const St=new Date(it);
                  St.setHours(23,59,59,999),ae.vip_expires_at&&new Date(ae.vip_expires_at).getTime()===St.getTime()?C(null):wt(ae.id,St.toISOString())
                }
                else C(null)
              },onKeyDown:We=> {
                We.key==="Enter"&&We.target.blur(),We.key==="Escape"&&C(null)
              }
            })]
          }):l.jsx("button", {
            type:"button",className:"user-balance-display",style: {
              padding:0,background:"none",width:"100%",textAlign:"left"
            },onClick:()=> {
              i&&(i.role==="admin"||i.role==="super_admin")&&C(ae.id)
            },disabled:_===ae.id||ae.role==="owner",title:"Click để đổi hạn VIP",children:ae.role==="admin"||ae.role==="super_admin"||ae.role==="owner"||!ae.vip_expires_at&&(ae.role==="vip"||ae.role==="vip_plus")?l.jsx("span", {
              style: {
                color:"#fbbf24",border:"1px solid #fbbf24",padding:"2px 6px",borderRadius:"4px",fontSize:"12px",fontWeight:600
              },children:"Vĩnh viễn"
            }):ae.vip_expires_at?new Date(ae.vip_expires_at)<new Date?l.jsx("span", {
              style: {
                color:"#ef4444",border:"1px solid #ef4444",padding:"2px 6px",borderRadius:"4px",fontSize:"12px",fontWeight:600
              },children:"Đã hết hạn"
            }):l.jsx("span", {
              style: {
                color:"#fcd34d",fontSize:"13px"
              },children:new Date(ae.vip_expires_at).toLocaleDateString("vi-VN", {
                year:"numeric",month:"2-digit",day:"2-digit"
              })
            }):l.jsx("span", {
              style: {
                color:"#64748b"
              },children:"-"
            })
          })
        }),l.jsx("div", {
          className:ae.is_online===1?"online":ae.is_online===2?"online-hidden":"offline",children:ae.is_online===1?"● Online":ae.is_online===2?"◐ Ẩn/Khay":"○ Offline"
        }),l.jsxs("div", {
          className:"user-actions-cell",children:[l.jsx("button", {
            type:"button",className:"user-change-password-btn",onClick:()=>ue(ae.id),disabled:j===ae.id,title:"Đổi mật khẩu",children:j===ae.id?"...":"🔑 Đổi MK"
          }),l.jsx("button", {
            type:"button",className:"user-delete-account-btn",onClick:()=>lt(ae.id),disabled:re===ae.id||!!(i&&i.id===ae.id),title:i&&i.id===ae.id?"tự bắn vào chân mình à???":"xóa thì kêu oto xóa cho",children:re===ae.id?"...":"🗑️ Xóa"
          })]
        })]
      },ae.id))]
    }),Le.length>h&&l.jsxs("div", {
      className:"user-pagination",children:[l.jsx("button", {
        type:"button",className:"user-page-btn",onClick:()=>f(ae=>Math.max(1,ae-1)),disabled:u===1,children:"Trước"
      }),l.jsxs("div", {
        className:"user-page-info",children:["Trang ",u," / ",Qe]
      }),l.jsx("button", {
        type:"button",className:"user-page-btn",onClick:()=>f(ae=>Math.min(Qe,ae+1)),disabled:u===Qe,children:"Sau"
      })]
    }),G&&zh.createPortal(zo,document.body),V&&l.jsx("div", {
      className:"delete-confirm-overlay",onClick:()=>O(null),children:l.jsxs("div", {
        className:"delete-confirm-modal",onClick:ae=>ae.stopPropagation(),children:[l.jsx("div", {
          className:"delete-confirm-header",children:l.jsx("h3", {
            children:"Xác nhận xóa game"
          })
        }),l.jsxs("div", {
          className:"delete-confirm-body",children:[l.jsxs("p", {
            className:"delete-confirm-message",children:["Bạn có chắc chắn muốn xóa game ",l.jsx("strong", {
              children:V.gameName
            }),"?"]
          }),V.refundAmount>0&&l.jsxs("div", {
            className:"delete-confirm-refund",children:[l.jsx("span", {
              className:"delete-confirm-refund-label",children:"Sẽ hoàn lại:"
            }),l.jsxs("span", {
              className:"delete-confirm-refund-amount",children:[V.refundAmount.toLocaleString("vi-VN")," G"]
            })]
          })]
        }),l.jsxs("div", {
          className:"delete-confirm-actions",children:[l.jsx("button", {
            type:"button",className:"delete-confirm-btn cancel",onClick:()=>O(null),children:"Hủy"
          }),l.jsx("button", {
            type:"button",className:"delete-confirm-btn confirm",onClick:et,disabled:z===V.gameId,children:z===V.gameId?"Đang xóa...":"Xóa"
          })]
        })]
      })
    }),F&&l.jsx("div", {
      className:"delete-confirm-overlay",onClick:()=>J(null),children:l.jsxs("div", {
        className:"delete-confirm-modal",onClick:ae=>ae.stopPropagation(),children:[l.jsx("div", {
          className:"delete-confirm-header",children:l.jsx("h3", {
            children:"Xác nhận xóa tài khoản"
          })
        }),l.jsxs("div", {
          className:"delete-confirm-body",children:[l.jsxs("p", {
            className:"delete-confirm-message",children:["Bạn có chắc chắn muốn xóa tài khoản ",l.jsx("strong", {
              children:F.username
            }),"?"]
          }),l.jsx("p", {
            className:"delete-confirm-warning",children:"⚠️ Hành động này sẽ xóa vĩnh viễn tài khoản và tất cả dữ liệu liên quan. Hãy chắc chắn trước khi tiếp tục!"
          })]
        }),l.jsxs("div", {
          className:"delete-confirm-actions",children:[l.jsx("button", {
            type:"button",className:"delete-confirm-btn cancel",onClick:()=>J(null),children:"Hủy"
          }),l.jsx("button", {
            type:"button",className:"delete-confirm-btn confirm",onClick:kt,disabled:re===F.userId,children:re===F.userId?"Đang xóa...":"Xóa tài khoản"
          })]
        })]
      })
    }),Rt&&l.jsx("div", {
      className:"delete-confirm-overlay",onClick:()=> {
        _e||Mt(!1)
      },children:l.jsxs("div", {
        className:"delete-confirm-modal purge-inactive-modal",onClick:ae=>ae.stopPropagation(),children:[l.jsx("div", {
          className:"delete-confirm-header",children:l.jsx("h3", {
            children:"Chọn mốc offline để dọn"
          })
        }),l.jsxs("div", {
          className:"delete-confirm-body",children:[l.jsx("p", {
            className:"delete-confirm-message",children:"Trình dọn acc rác cho user ver cụ"
          }),l.jsx("p", {
            className:"delete-confirm-warning",children:"Chỉ tính acc rác (0 G, không game trả phí)."
          }),_e&&Ze.length===0?l.jsx("div", {
            className:"purge-sample-more",children:"Đang quét 3 / 6 / 12 tháng…"
          }):l.jsx("div", {
            className:"purge-milestone-list",children:Ze.map(ae=>l.jsxs("button", {
              type:"button",className:"purge-milestone-btn",disabled:_e,onClick:()=>fn(ae.days),children:[l.jsx("span", {
                className:"purge-milestone-label",children:ae.label
              }),l.jsxs("span", {
                className:"purge-milestone-meta",children:["Xóa được: ",l.jsx("strong", {
                  children:ae.count.toLocaleString("vi-VN")
                })," · ","Giữ lại: ",ae.kept_count.toLocaleString("vi-VN")]
              }),l.jsxs("span", {
                className:"purge-milestone-days",children:[ae.days," ngày"]
              })]
            },ae.days))
          })]
        }),l.jsx("div", {
          className:"delete-confirm-actions",children:l.jsx("button", {
            type:"button",className:"delete-confirm-btn cancel",disabled:_e,onClick:()=>Mt(!1),children:"Đóng"
          })
        })]
      })
    }),le&&!rt&&l.jsx("div", {
      className:"delete-confirm-overlay",onClick:()=> {
        Ve||pe(null)
      },children:l.jsxs("div", {
        className:"delete-confirm-modal purge-inactive-modal",onClick:ae=>ae.stopPropagation(),children:[l.jsx("div", {
          className:"delete-confirm-header",children:l.jsxs("h3", {
            children:["Xem trước offline ≥ ",le.days," ngày",le.days===90?" (3 tháng)":le.days===180?" (6 tháng)":le.days===365?" (12 tháng)":""]
          })
        }),l.jsxs("div", {
          className:"delete-confirm-body",children:[l.jsxs("p", {
            className:"delete-confirm-message",children:["Sẽ xóa: ",l.jsx("strong", {
              children:le.count.toLocaleString("vi-VN")
            })," user"]
          }),l.jsxs("p", {
            className:"delete-confirm-message",children:["Giữ lại: ",l.jsx("strong", {
              children:le.kept_count.toLocaleString("vi-VN")
            })," user"," ","(có số dư / game trả phí / VIP)"]
          }),l.jsx("p", {
            className:"delete-confirm-warning",children:"Check xong rồi thì xác nhận để xóa, no way đầu."
          }),le.list.length>0&&l.jsxs(l.Fragment, {
            children:[l.jsxs("div", {
              className:"purge-list-toolbar",children:[l.jsxs("span", {
                children:["List: ",le.list.length.toLocaleString("vi-VN")," dòng",mi>0?` (hiện ${rn.length}, còn ${mi.toLocaleString("vi-VN")} Copy TSV)`:""]
              }),l.jsx("button", {
                type:"button",className:"purge-copy-btn",onClick:on,children:"Copy list (TSV)"
              })]
            }),l.jsxs("div", {
              className:"purge-sample-list",children:[l.jsxs("div", {
                className:"purge-sample-row purge-sample-head",children:[l.jsx("span", {
                  children:"Username"
                }),l.jsx("span", {
                  children:"Số dư"
                }),l.jsx("span", {
                  children:"Free"
                }),l.jsx("span", {
                  children:"Last active"
                })]
              }),rn.map(ae=>l.jsxs("div", {
                className:"purge-sample-row",children:[l.jsx("span", {
                  title:ae.email||"",children:ae.username
                }),l.jsxs("span", {
                  children:[Number(ae.p_balance||0).toLocaleString("vi-VN")," G"]
                }),l.jsx("span", {
                  children:ae.free_games||0
                }),l.jsx("span", {
                  children:ae.last_active?String(ae.last_active).slice(0,10):"-"
                })]
              },ae.id)),mi>0&&l.jsxs("div", {
                className:"purge-sample-more",children:["… và ",mi.toLocaleString("vi-VN")," user khác (bấm Copy TSV để lấy full)"]
              })]
            })]
          })]
        }),l.jsxs("div", {
          className:"delete-confirm-actions",children:[l.jsx("button", {
            type:"button",className:"delete-confirm-btn cancel",disabled:Ve,onClick:()=> {
              bt(!1),pe(null),Mt(!0)
            },children:"← Chọn mốc khác"
          }),l.jsxs("button", {
            type:"button",className:"delete-confirm-btn confirm",disabled:Ve||le.count===0,onClick:Ot,children:["Tiếp tục xóa ",le.count.toLocaleString("vi-VN")," user…"]
          })]
        })]
      })
    }),rt&&le&&l.jsx("div", {
      className:"delete-confirm-overlay purge-yes-overlay",children:l.jsxs("div", {
        className:"delete-confirm-modal",onClick:ae=>ae.stopPropagation(),children:[l.jsx("div", {
          className:"delete-confirm-header",children:l.jsx("h3", {
            children:"Xác nhận xóa"
          })
        }),l.jsxs("div", {
          className:"delete-confirm-body",children:[l.jsxs("p", {
            className:"delete-confirm-message",children:["Xóa vĩnh viễn"," ",l.jsx("strong", {
              children:le.count.toLocaleString("vi-VN")
            })," user"," ","(offline ≥ ",le.days," ngày, 0 G, không game trả phí)?"]
          }),l.jsxs("p", {
            className:"delete-confirm-message",children:["Giữ lại"," ",l.jsx("strong", {
              children:le.kept_count.toLocaleString("vi-VN")
            })," user"," ","với (số dư / game phí / VIP)."]
          }),l.jsx("p", {
            className:"delete-confirm-warning",children:"Không hoàn tác (trừ khi restore backup MySQL)"
          })]
        }),l.jsxs("div", {
          className:"delete-confirm-actions",children:[l.jsx("button", {
            type:"button",className:"delete-confirm-btn cancel",disabled:Ve,onClick:()=>bt(!1),children:"Hủy"
          }),l.jsx("button", {
            type:"button",className:"delete-confirm-btn confirm",disabled:Ve,onClick:wn,children:Ve?"Đang xóa...":`Xóa ${le.count.toLocaleString("vi-VN")} user`
          })]
        })]
      })
    })]
  })
}
function Yne() {
  const {
    user:n,sessionId:e
  }
  =nn(),[t,i]=g.useState([]),[r,s]=g.useState([]),[a,o]=g.useState([]),[c,d]=g.useState(""),[u,f]=g.useState(!1),[h,m]=g.useState(!1),[p,y]=g.useState(!1),[v,b]=g.useState(null),[w,S]=g.useState( {
    key_code:"",key_type:"balance",value:"",max_uses:"",expires_at:"",random_type:"balance",vip_days:""
  });
  g.useEffect(()=> {
    const M=async()=> {
      try {
        const G=await fetch(`${Se}/admin/keys`, {
          headers:e? {
            Authorization:`Bearer ${e}`
          }
          :{}
        });
        if(!G.ok)return;
        const W=await G.json();
        o(Array.isArray(W.data)?W.data:[])
      }
      catch{}
    },j=async()=> {
      try {
        const G=await If( {
          page:1,limit:30
        });
        i((G.data||[]).map(W=>( {
          app_id:W.app_id,game_name:W.game_name
        })))
      }
      catch{}
    },B=async()=> {
      try {
        const G=await fetch(`${Se}/admin/settings/vip-packages`);
        if(!G.ok)return;
        const W=await G.json();
        s(Array.isArray(W.data)?W.data:[])
      }
      catch{}
    };
    n&&n.role==="super_admin"&&(M(),j(),B())
  },[n]),g.useEffect(()=> {
    const M=c.trim();
    if(!M)return;
    const j=/^\d+$/.test(M);
    if(j&&M.length<5||!j&&M.length<4)return;
    let B=!1;
    const G=setTimeout(async()=> {
      try {
        const W=await fetch(`${Se}/admin/games/search?q=${encodeURIComponent(M)}`, {
          headers:e? {
            Authorization:`Bearer ${e}`
          }
          :{}
        });
        if(!W.ok)throw new Error("failed");
        const U=await W.json();
        if(B)return;
        const q=Array.isArray(U.data)?U.data:[];
        i(q.map(Q=>( {
          app_id:String(Q.app_id??""),game_name:String(Q.game_name??"")
        })))
      }
      catch {
        B||i([])
      }
    },300);
    return()=> {
      B=!0,clearTimeout(G)
    }
  },[c,e]);
  const T=g.useMemo(()=> {
    const M=c.trim().toLowerCase();
    if(!M)return[];
    const j=/^\d+$/.test(M);
    return j&&M.length<5?[]:!j&&M.length<4?[]:t.filter(G=> {
      const W=(G.game_name||"").toLowerCase(),U=(G.app_id||"").toLowerCase();
      return W.includes(M)||U.includes(M)
    }).slice(0,6)
  },[t,c]),E=g.useMemo(()=>r.filter(M=>M.type==="vip"||M.type==="vip_plus"),[r]),x=async()=> {
    try {
      const M=await fetch(`${Se}/admin/keys`, {
        headers:e? {
          Authorization:`Bearer ${e}`
        }
        :{}
      });
      if(!M.ok)return;
      const j=await M.json();
      o(Array.isArray(j.data)?j.data:[])
    }
    catch{}
  },k=M=> {
    const j=M.trim();
    if(!j)return"";
    const B=j.match(/^(\d+)\s*(D|M|Y)$/i);
    if(B) {
      const G=Number(B[1]),W=B[2].toUpperCase();
      if(G>0) {
        const U=new Date;
        return W==="D"&&U.setDate(U.getDate()+G),W==="M"&&U.setMonth(U.getMonth()+G),W==="Y"&&U.setFullYear(U.getFullYear()+G),U.toISOString().slice(0,10)
      }
    }
    return j
  };
  if(!n||n.role!=="super_admin")return l.jsx("div", {
    className:"keys-manager",children:l.jsx("div", {
      className:"keys-table",children:l.jsx("div", {
        className:"keys-table-empty",children:"Chỉ super_admin mới truy cập được"
      })
    })
  });
  const C=T[0],_=C?`${C.game_name} (appid: ${C.app_id})`:"";
  return l.jsxs("div", {
    className:"keys-manager",children:[l.jsxs("div", {
      className:"keys-header",children:[l.jsx("div",{}),l.jsx("div", {
        className:"keys-actions",children:l.jsx("button", {
          type:"button",className:"keys-btn primary",onClick:()=>m(!0),children:"Tạo key"
        })
      })]
    }),l.jsxs("div", {
      className:"keys-table",children:[l.jsxs("div", {
        className:"keys-table-head",children:[l.jsx("div", {
          children:"Key"
        }),l.jsx("div", {
          children:"Loại"
        }),l.jsx("div", {
          children:"Giá trị"
        }),l.jsx("div", {
          children:"Game"
        }),l.jsx("div", {
          children:"Đã dùng"
        }),l.jsx("div", {
          children:"Tối đa"
        }),l.jsx("div", {
          children:"Hết hạn"
        })]
      }),a.length===0?l.jsx("div", {
        className:"keys-table-empty",children:"Chưa có dữ liệu key"
      }):a.map(M=>l.jsxs("div", {
        className:"keys-table-row",children:[l.jsx("div", {
          children:M.key_code
        }),l.jsx("div", {
          children:M.key_type
        }),l.jsx("div", {
          children:M.value||"-"
        }),l.jsx("div", {
          children:M.game_app_id||"-"
        }),l.jsx("div", {
          children:M.use_count??0
        }),l.jsx("div", {
          children:M.max_uses??"-"
        }),l.jsxs("div", {
          className:"keys-row-actions",children:[l.jsx("span", {
            children:M.expires_at||"-"
          }),l.jsx("button", {
            className:"keys-delete-btn",type:"button",disabled:v===M.key_code,onClick:async()=> {
              b(M.key_code);
              try {
                await fetch(`${Se}/admin/keys/${encodeURIComponent(M.key_code)}`, {
                  method:"DELETE",headers:e? {
                    Authorization:`Bearer ${e}`
                  }
                  :{}
                }),await x()
              }
              finally {
                b(null)
              }
            },children:"Xóa"
          })]
        })]
      },M.key_code))]
    }),h&&l.jsx("div", {
      className:"keys-modal",children:l.jsxs("div", {
        className:"keys-modal-box",children:[l.jsxs("div", {
          className:"keys-modal-header",children:[l.jsx("div", {
            children:"Tạo key mới"
          }),l.jsx("button", {
            className:"keys-close",type:"button",onClick:()=>m(!1),children:"×"
          })]
        }),l.jsxs("div", {
          className:"keys-modal-body",children:[l.jsxs("label", {
            children:["Key code",l.jsx("input", {
              className:"keys-input",value:w.key_code,onChange:M=>S( {
                ...w,key_code:M.target.value
              }),placeholder:"Nhập mã key (để trống sẽ tự random)"
            })]
          }),l.jsxs("label", {
            children:["Loại",l.jsxs("select", {
              className:"keys-input keys-select",value:w.key_type,onChange:M=> {
                const j=M.target.value;
                S( {
                  ...w,key_type:j,value:j==="random"||j==="game"||j==="vip"||j==="vip_plus"?"":w.value
                }),j!=="game"&&(d(""),f(!1))
              },children:[l.jsx("option", {
                value:"balance",children:"balance"
              }),l.jsx("option", {
                value:"vip",children:"vip"
              }),l.jsx("option", {
                value:"vip_plus",children:"vip_plus"
              }),l.jsx("option", {
                value:"game",children:"game"
              }),l.jsx("option", {
                value:"random",children:"random"
              })]
            })]
          }),l.jsxs("label", {
            children:[l.jsx("input", {
              className:"keys-input",value:w.value,onChange:M=> {
                w.key_type==="random"&&(w.random_type==="game"||w.random_type==="vip"||w.random_type==="vip_plus")||w.key_type==="game"||w.key_type==="vip"||w.key_type==="vip_plus"||S( {
                  ...w,value:M.target.value
                })
              },placeholder:w.key_type==="game"?"":w.key_type==="vip"||w.key_type==="vip_plus"?"Sẽ random ngày từ gói VIP":w.key_type==="random"&&w.random_type==="game"?"Sẽ random game từ database":w.key_type==="random"&&(w.random_type==="vip"||w.random_type==="vip_plus")?"Sẽ random VIP từ danh sách gói":"Nhập số G (ví dụ 100000)",disabled:w.key_type==="random"&&(w.random_type==="game"||w.random_type==="vip"||w.random_type==="vip_plus")||w.key_type==="game"||w.key_type==="vip"||w.key_type==="vip_plus"
            }),(w.key_type==="vip"||w.key_type==="vip_plus")&&l.jsxs("div", {
              className:"keys-vip-random",children:[l.jsx("div", {
                className:"keys-vip-note",children:"Sẽ random ngày và giá trị từ gói VIP"
              }),l.jsxs("select", {
                className:"keys-input keys-select",value:w.value,onChange:M=>S( {
                  ...w,value:M.target.value
                }),children:[l.jsx("option", {
                  value:"",children:"Chọn gói"
                }),E.filter(M=>w.key_type==="vip"?M.type==="vip":M.type==="vip_plus").map(M=>l.jsx("option", {
                  value:M.id,children:M.name
                },M.id))]
              })]
            })]
          }),w.key_type==="game"&&l.jsxs("label", {
            children:[l.jsx("div", {
              children:"Tìm game theo tên hoặc appid"
            }),l.jsxs("div", {
              className:"keys-game-search-wrapper",children:[l.jsx("input", {
                className:"keys-input",value:c,onChange:M=> {
                  d(M.target.value),f(!1)
                },onKeyDown:M=> {
                  if(M.key==="Tab") {
                    const j=T[0];
                    j&&(M.preventDefault(),d(`${j.game_name} (appid: ${j.app_id})`),S( {
                      ...w,value:j.app_id
                    }),f(!0))
                  }
                },placeholder:"Nhập appid/tên game, để trống = random."
              }),_&&c.trim().length>0&&l.jsx("button", {
                type:"button",className:"keys-game-inline-suggest",onMouseDown:M=> {
                  M.preventDefault();
                  const j=T[0];
                  j&&(d(`${j.game_name} (appid: ${j.app_id})`),S( {
                    ...w,value:j.app_id
                  }),f(!0))
                },children:_
              })]
            }),w.key_type==="game"&&!u&&c.trim().length>0&&!_&&T.length===0&&l.jsx("div", {
              className:"keys-help-text",children:"Không tìm thấy game phù hợp."
            })]
          }),w.key_type==="random"&&l.jsxs("label", {
            children:["Random loại",l.jsxs("select", {
              className:"keys-input keys-select",value:w.random_type,onChange:M=>S( {
                ...w,random_type:M.target.value,value:""
              }),children:[l.jsx("option", {
                value:"balance",children:"balance"
              }),l.jsx("option", {
                value:"vip",children:"vip"
              }),l.jsx("option", {
                value:"vip_plus",children:"vip_plus"
              }),l.jsx("option", {
                value:"game",children:"game"
              })]
            })]
          }),l.jsxs("label", {
            children:["Max uses",l.jsx("input", {
              className:"keys-input",type:"number",value:w.max_uses,onChange:M=>S( {
                ...w,max_uses:M.target.value
              }),placeholder:"Để trống = không giới hạn"
            })]
          }),l.jsxs("label", {
            children:["Hết hạn (YYYY-MM-DD hoặc 20D / 1M / 1Y)",l.jsx("input", {
              className:"keys-input",type:"text",value:w.expires_at,onChange:M=>S( {
                ...w,expires_at:M.target.value
              }),onBlur:M=> {
                const j=k(M.target.value);
                S(B=>( {
                  ...B,expires_at:j
                }))
              },placeholder:"VD: 2025-12-31 hoặc 20D / 1M / 1Y"
            })]
          })]
        }),l.jsxs("div", {
          className:"keys-modal-actions",children:[l.jsx("button", {
            className:"keys-btn ghost",type:"button",onClick:()=>m(!1),children:"Hủy"
          }),l.jsx("button", {
            className:"keys-btn primary",type:"button",disabled:p,onClick:async()=> {
              y(!0);
              try {
                const M=await fetch(`${Se}/admin/keys`, {
                  method:"POST",headers: {
                    "Content-Type":"application/json",...e? {
                      Authorization:`Bearer ${e}`
                    }
                    :{}
                  },body:JSON.stringify( {
                    key_code:w.key_code,key_type:w.key_type,value:w.value,random_type:w.random_type,max_uses:w.max_uses,expires_at:w.expires_at
                  })
                });
                if(!M.ok) {
                  const j=await M.json().catch(()=>({}));
                  console.error("Create key failed",(j==null?void 0:j.message)||M.statusText);
                  return
                }
                m(!1),S( {
                  key_code:"",key_type:"balance",value:"",max_uses:"",expires_at:"",random_type:"balance",vip_days:""
                }),d(""),f(!1),await x()
              }
              finally {
                y(!1)
              }
            },children:"Lưu"
          })]
        })]
      })
    })]
  })
}
function qne() {
  const {
    sessionId:n
  }
  =nn(),[e,t]=g.useState([]),[i,r]=g.useState(!1),[s,a]=g.useState(null),[o,c]=g.useState(!1),[d,u]=g.useState( {
    account:"",password:"",status:"active"
  }),[f,h]=g.useState(!1),[m,p]=g.useState(null),[y,v]=g.useState(null),[b,w]=g.useState(null),[S,T]=g.useState( {
    user:!1,vip:!1,vip_plus:!1
  }),[E,x]=g.useState(!1),k=async()=> {
    try {
      const W=await fetch(`${Se}/admin/netflix/visibility`, {
        headers:n? {
          Authorization:`Bearer ${n}`
        }
        :{}
      });
      if(W.ok) {
        const U=await W.json();
        U.success&&U.data&&T(U.data)
      }
    }
    catch{}
  },C=async W=> {
    x(!0),p(null);
    try {
      (await fetch(`${Se}/admin/netflix/visibility`, {
        method:"PUT",headers: {
          "Content-Type":"application/json",...n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        },body:JSON.stringify(W)
      })).ok?(T(W),v("Cập nhật quyền xem Netflix thành công")):p("Không thể lưu cài đặt")
    }
    catch {
      p("Lỗi kết nối server")
    }
    finally {
      x(!1)
    }
  },_=W=> {
    const U= {
      ...S,[W]:!S[W]
    };
    C(U)
  },M=async()=> {
    r(!0),p(null);
    try {
      const W=await fetch(`${Se}/admin/netfix/accounts`, {
        headers:n? {
          Authorization:`Bearer ${n}`
        }
        :{}
      });
      if(!W.ok)throw new Error("failed");
      const U=await W.json();
      U.success&&Array.isArray(U.data)?t(U.data):t([])
    }
    catch {
      p("Không tải được danh sách tài khoản"),t([])
    }
    finally {
      r(!1)
    }
  };
  g.useEffect(()=> {
    M(),k()
  },[n]);
  const j=async()=> {
    if(!d.account.trim()||!d.password.trim()) {
      p("Vui lòng nhập đầy đủ thông tin");
      return
    }
    h(!0),p(null),v(null);
    try {
      const W=await fetch(`${Se}/admin/netfix/accounts`, {
        method:"POST",headers: {
          "Content-Type":"application/json",...n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        },body:JSON.stringify(d)
      });
      if(!W.ok) {
        const U=await W.json();
        throw new Error(U.message||"failed")
      }
      v("Thêm tài khoản thành công"),u( {
        account:"",password:"",status:"active"
      }),c(!1),await M()
    }
    catch(W) {
      p(W.message||"Không thể thêm tài khoản")
    }
    finally {
      h(!1)
    }
  },B=async W=> {
    if(confirm("Bạn có chắc chắn muốn xóa tài khoản này?")) {
      a(W),p(null),v(null);
      try {
        const U=await fetch(`${Se}/admin/netfix/accounts/${W}`, {
          method:"DELETE",headers:n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        });
        if(!U.ok) {
          const q=await U.json();
          throw new Error(q.message||"failed")
        }
        v("Xóa tài khoản thành công"),await M()
      }
      catch(U) {
        p(U.message||"Không thể xóa tài khoản")
      }
      finally {
        a(null)
      }
    }
  },G=async(W,U)=> {
    w(W),p(null),v(null);
    try {
      const q=await fetch(`${Se}/admin/netfix/accounts/${W}/status`, {
        method:"PUT",headers: {
          "Content-Type":"application/json",...n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        },body:JSON.stringify( {
          status:U
        })
      });
      if(!q.ok) {
        const Q=await q.json();
        throw new Error(Q.message||"failed")
      }
      v("Cập nhật trạng thái thành công"),await M()
    }
    catch(q) {
      p(q.message||"Không thể cập nhật trạng thái")
    }
    finally {
      w(null)
    }
  };
  return l.jsxs("div", {
    className:"netflix-manager",children:[l.jsxs("div", {
      className:"netflix-header",children:[l.jsxs("div", {
        children:[l.jsx("div", {
          className:"netflix-title",children:"Netflix Account Manager"
        }),l.jsxs("div", {
          className:"netflix-sub",children:["Quản lý tài khoản Netflix (Tổng: ",e.length,")"]
        })]
      }),l.jsx("div", {
        className:"netflix-actions",children:l.jsx("button", {
          type:"button",className:"netflix-add-btn",onClick:()=> {
            c(!o),p(null),v(null)
          },children:o?"Hủy":"+ Thêm tài khoản"
        })
      })]
    }),l.jsxs("div", {
      className:"netflix-form",style: {
        marginBottom:16
      },children:[l.jsx("div", {
        style: {
          fontWeight:600,color:"#fff",marginBottom:8,fontSize:14
        },children:"🔒 Chọn role sẽ thấy nút netflix:"
      }),l.jsxs("div", {
        style: {
          display:"flex",gap:12,flexWrap:"wrap",alignItems:"center"
        },children:[[ {
          key:"user",label:"User"
        }, {
          key:"vip",label:"VIP"
        }, {
          key:"vip_plus",label:"VIP+"
        }
        ].map(W=>l.jsxs("label", {
          style: {
            display:"flex",alignItems:"center",gap:6,color:"#ccc",fontSize:13,cursor:"pointer"
          },children:[l.jsx("input", {
            type:"checkbox",checked:!!S[W.key],disabled:E,onChange:()=>_(W.key),style: {
              accentColor:"#e50914",width:16,height:16
            }
          }),W.label]
        },W.key)),l.jsx("span", {
          style: {
            color:"#888",fontSize:11,marginLeft:8
          },children:"(Admin/Super Admin luôn thấy)"
        })]
      })]
    }),m&&l.jsx("div", {
      className:"netflix-message netflix-error",children:m
    }),y&&l.jsx("div", {
      className:"netflix-message netflix-success",children:y
    }),o&&l.jsxs("div", {
      className:"netflix-form",children:[l.jsxs("div", {
        className:"netflix-form-row",children:[l.jsx("label", {
          className:"netflix-form-label",children:"Email/Account:"
        }),l.jsx("input", {
          className:"netflix-form-input",type:"text",placeholder:"Nhập email hoặc tài khoản",value:d.account,onChange:W=>u( {
            ...d,account:W.target.value
          }),disabled:f
        })]
      }),l.jsxs("div", {
        className:"netflix-form-row",children:[l.jsx("label", {
          className:"netflix-form-label",children:"Password:"
        }),l.jsx("input", {
          className:"netflix-form-input",type:"password",placeholder:"Nhập mật khẩu",value:d.password,onChange:W=>u( {
            ...d,password:W.target.value
          }),disabled:f
        })]
      }),l.jsxs("div", {
        className:"netflix-form-row",children:[l.jsx("label", {
          className:"netflix-form-label",children:"Status:"
        }),l.jsxs("select", {
          className:"netflix-form-select",value:d.status,onChange:W=>u( {
            ...d,status:W.target.value
          }),disabled:f,children:[l.jsx("option", {
            value:"active",children:"Active"
          }),l.jsx("option", {
            value:"inactive",children:"Inactive"
          }),l.jsx("option", {
            value:"expired",children:"Expired"
          })]
        })]
      }),l.jsx("div", {
        className:"netflix-form-actions",children:l.jsx("button", {
          type:"button",className:"netflix-form-submit",onClick:j,disabled:f,children:f?"Đang thêm...":"Thêm"
        })
      })]
    }),l.jsxs("div", {
      className:"netflix-table",children:[l.jsxs("div", {
        className:"netflix-table-head",children:[l.jsx("div", {
          children:"Account"
        }),l.jsx("div", {
          children:"Password"
        }),l.jsx("div", {
          children:"Status"
        }),l.jsx("div", {
          children:"Created At"
        }),l.jsx("div", {
          children:"Updated At"
        }),l.jsx("div", {
          children:"Actions"
        })]
      }),i?l.jsx("div", {
        className:"netflix-table-empty",children:"Đang tải..."
      }):e.length===0?l.jsx("div", {
        className:"netflix-table-empty",children:"Không có tài khoản nào"
      }):e.map(W=>l.jsxs("div", {
        className:"netflix-table-row",children:[l.jsx("div", {
          children:W.account
        }),l.jsx("div", {
          className:"netflix-password",children:"••••••••"
        }),l.jsx("div", {
          children:l.jsxs("select", {
            className:"netflix-form-select",value:W.status,disabled:b===W.id,onChange:U=>G(W.id,U.target.value),children:[l.jsx("option", {
              value:"active",children:"active"
            }),l.jsx("option", {
              value:"inactive",children:"inactive"
            }),l.jsx("option", {
              value:"expired",children:"expired"
            })]
          })
        }),l.jsx("div", {
          children:new Date(W.created_at).toLocaleString("vi-VN")
        }),l.jsx("div", {
          children:new Date(W.updated_at).toLocaleString("vi-VN")
        }),l.jsx("div", {
          children:l.jsx("button", {
            type:"button",className:"netflix-delete-btn",onClick:()=>B(W.id),disabled:s===W.id,children:s===W.id?"Đang xóa...":"Xóa"
          })
        })]
      },W.id))]
    })]
  })
}
function Jne() {
  const {
    sessionId:n
  }
  =nn(),[e,t]=g.useState(""),[i,r]=g.useState(""),[s,a]=g.useState(""),[o,c]=g.useState([]),[d,u]=g.useState(!1),[f,h]=g.useState(1),[m,p]=g.useState(0),[y,v]=g.useState(null),[b,w]=g.useState(""),[S,T]=g.useState( {
    isOpen:!1,type:"info",message:""
  }),E=50,x=(ee,he="info",me)=> {
    T( {
      isOpen:!0,type:he,message:ee,title:me,showCancel:!1
    })
  },k=(ee,he,me)=> {
    T( {
      isOpen:!0,type:"warning",message:ee,title:me,showCancel:!0,onConfirm:he
    })
  },C=()=>T(ee=>( {
    ...ee,isOpen:!1
  }));
  g.useEffect(()=> {
    const ee=setTimeout(()=> {
      w(e)
    },500);
    return()=>clearTimeout(ee)
  },[e]);
  const _=async()=> {
    if(n) {
      u(!0);
      try {
        const ee=new URLSearchParams( {
          limit:E.toString(),offset:((f-1)*E).toString()
        });
        i&&ee.append("type",i),s&&ee.append("status",s),b.trim()&&ee.append("search",b.trim());
        const he=await fetch(`${Se}/admin/transactions?${ee}`, {
          headers: {
            Authorization:`Bearer ${n}`
          }
        });
        if(!he.ok)throw new Error("failed");
        const me=await he.json(),se=Array.isArray(me.data)?me.data:[];
        c(se.map(be=>( {
          id:String(be.id),user_id:String(be.user_id),username:be.username||null,email:be.email||null,type:be.type,amount:Number(be.amount||0),currency:String(be.currency||"P"),status:be.status,payment_method:be.payment_method||null,description:be.description||null,reference_id:be.reference_id||null,fiat_amount:be.fiat_amount?Number(be.fiat_amount):null,bank_transaction_id:be.bank_transaction_id||null,bank_description:be.bank_description||null,created_at:be.created_at,updated_at:be.updated_at
        }))),p(Number(me.total||0))
      }
      catch {
        c([]),p(0)
      }
      finally {
        u(!1)
      }
    }
  },M=ee=> {
    n&&k("Xác nhận hủy giao dịch này?",async()=> {
      v(ee);
      try {
        const me=await(await fetch(`${Se}/admin/transaction/cancel`, {
          method:"POST",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${n}`
          },body:JSON.stringify( {
            transactionId:ee
          })
        })).json();
        me.success?await _():x(me.message||"Lỗi hủy giao dịch","error")
      }
      catch {
        x("Lỗi kết nối","error")
      }
      finally {
        v(null)
      }
    })
  },j=ee=> {
    n&&k("Xác nhận duyệt nạp tiền cho giao dịch này? User sẽ được cộng tiền.",async()=> {
      v(ee);
      try {
        const me=await(await fetch(`${Se}/admin/transaction/approve`, {
          method:"POST",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${n}`
          },body:JSON.stringify( {
            transactionId:ee
          })
        })).json();
        me.success?await _():x(me.message||"Lỗi duyệt giao dịch","error")
      }
      catch {
        x("Lỗi kết nối","error")
      }
      finally {
        v(null)
      }
    })
  };
  g.useEffect(()=> {
    _();
    const ee=setInterval(_,3e4);
    return()=>clearInterval(ee)
  },[n,f,i,s,b]),g.useEffect(()=> {
    h(1)
  },[i,s,b]);
  const B=g.useMemo(()=>[...o].sort((he,me)=>he.status==="completed"&&me.status!=="completed"?-1:he.status!=="completed"&&me.status==="completed"?1:new Date(me.created_at).getTime()-new Date(he.created_at).getTime()),[o]),G=Math.max(1,Math.ceil(m/E)),W=(ee,he)=>`${Math.round(ee).toLocaleString("vi-VN")} ${he}`,U=ee=>new Date(ee).toLocaleString("vi-VN", {
    year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"
  }),q=ee=>( {
    deposit:"Nạp tiền",withdrawal:"Rút tiền",purchase:"Mua game",refund:"Hoàn tiền",vip_purchase:"Mua VIP",vip_voice:"Mua VIP Voice",cart_checkout:"Thanh toán giỏ hàng",key_redeem:"Đổi key",avatar_purchase:"Mua Avatar","":""
  })[ee]||ee,Q=ee=>( {
    pending:"Đang chờ",completed:"Hoàn thành",failed:"Thất bại",cancelled:"Đã hủy","":""
  })[ee]||ee,te=ee=>( {
    pending:"status-pending",completed:"status-completed",failed:"status-failed",cancelled:"status-cancelled","":""
  })[ee]||"";
  return l.jsxs("div", {
    className:"deposit-check",children:[l.jsxs("div", {
      className:"deposit-header",children:[l.jsxs("div", {
        children:[l.jsx("div", {
          className:"deposit-title",children:"Transaction Manager"
        }),l.jsxs("div", {
          className:"deposit-sub",children:["Quản lý giao dịch (Tổng: ",m,")"]
        })]
      }),l.jsxs("div", {
        className:"deposit-actions",children:[l.jsxs("select", {
          className:"deposit-filter-select",value:i,onChange:ee=>r(ee.target.value),children:[l.jsx("option", {
            value:"",children:"Tất cả loại"
          }),l.jsx("option", {
            value:"deposit",children:"Nạp tiền"
          }),l.jsx("option", {
            value:"withdrawal",children:"Rút tiền"
          }),l.jsx("option", {
            value:"purchase",children:"Mua game"
          }),l.jsx("option", {
            value:"refund",children:"Hoàn tiền"
          }),l.jsx("option", {
            value:"vip_purchase",children:"Mua VIP"
          }),l.jsx("option", {
            value:"vip_voice",children:"Mua VIP Voice"
          }),l.jsx("option", {
            value:"cart_checkout",children:"Thanh toán giỏ hàng"
          }),l.jsx("option", {
            value:"key_redeem",children:"Đổi key"
          }),l.jsx("option", {
            value:"avatar_purchase",children:"Mua Avatar"
          })]
        }),l.jsxs("select", {
          className:"deposit-filter-select",value:s,onChange:ee=>a(ee.target.value),children:[l.jsx("option", {
            value:"",children:"Tất cả trạng thái"
          }),l.jsx("option", {
            value:"pending",children:"Đang chờ"
          }),l.jsx("option", {
            value:"completed",children:"Hoàn thành"
          }),l.jsx("option", {
            value:"failed",children:"Thất bại"
          }),l.jsx("option", {
            value:"cancelled",children:"Đã hủy"
          })]
        }),l.jsx("input", {
          className:"deposit-search",placeholder:"Tìm ID, user, email, reference...",value:e,onChange:ee=>t(ee.target.value)
        })]
      })]
    }),l.jsxs("div", {
      className:"deposit-table-wrapper",children:[l.jsxs("div", {
        className:"deposit-table-head",children:[l.jsx("div", {
          children:"ID"
        }),l.jsx("div", {
          children:"User"
        }),l.jsx("div", {
          children:"Loại"
        }),l.jsx("div", {
          style: {
            textAlign:"right"
          },children:"Số tiền"
        }),l.jsx("div", {
          children:"Trạng thái"
        }),l.jsx("div", {
          children:"Phương thức"
        }),l.jsx("div", {
          children:"Mô tả"
        }),l.jsx("div", {
          children:"Thời gian"
        }),l.jsx("div", {
          children:"Hành động"
        })]
      }),B.length===0?l.jsx("div", {
        className:"deposit-table-empty",children:d?"Đang tải...":"Không có giao dịch"
      }):B.map(ee=>l.jsxs("div", {
        className:"deposit-table-row",children:[l.jsxs("div", {
          className:"deposit-id",title:ee.id,children:[ee.id.substring(0,8),"..."]
        }),l.jsxs("div", {
          children:[l.jsx("div", {
            className:"deposit-username",children:ee.username||"N/A"
          }),l.jsx("div", {
            className:"deposit-email",children:ee.email||""
          })]
        }),l.jsx("div", {
          className:"deposit-type",children:q(ee.type)
        }),l.jsxs("div", {
          className:"deposit-amount",children:[W(ee.amount,ee.currency),ee.fiat_amount&&l.jsxs("div", {
            className:"deposit-fiat",children:["(",W(ee.fiat_amount,"VND"),")"]
          })]
        }),l.jsx("div", {
          className:"deposit-status-cell",children:l.jsx("span", {
            className:`deposit-status ${te(ee.status)}`,children:Q(ee.status)
          })
        }),l.jsx("div", {
          className:"deposit-method",children:ee.payment_method||"-"
        }),l.jsxs("div", {
          className:"deposit-description",children:[ee.description||"-",ee.reference_id&&l.jsxs("div", {
            className:"deposit-ref",children:["Ref: ",ee.reference_id]
          })]
        }),l.jsxs("div", {
          className:"deposit-date",children:[l.jsx("div", {
            children:U(ee.created_at)
          }),ee.updated_at!==ee.created_at&&l.jsxs("div", {
            className:"deposit-updated",children:["Cập nhật: ",U(ee.updated_at)]
          })]
        }),l.jsxs("div", {
          style: {
            display:"flex",gap:"8px"
          },children:[l.jsx("button", {
            className:`deposit-cancel-btn${ee.status!=="pending"?" deposit-cancel-btn--disabled":""}`,style: {
              backgroundColor:"#22c55e"
            },title:ee.status==="pending"?"Duyệt giao dịch":"Chỉ duyệt được giao dịch đang chờ",disabled:y===ee.id||ee.status!=="pending",onClick:()=>ee.status==="pending"&&j(ee.id),children:y===ee.id?"...":"✅ Duyệt"
          }),l.jsx("button", {
            className:`deposit-cancel-btn${ee.status!=="pending"?" deposit-cancel-btn--disabled":""}`,title:ee.status==="pending"?"Hủy giao dịch":"Chỉ hủy được giao dịch đang chờ",disabled:y===ee.id||ee.status!=="pending",onClick:()=>ee.status==="pending"&&M(ee.id),children:y===ee.id?"...":"❌ Xóa"
          })]
        })]
      },ee.id))]
    }),m>E&&l.jsxs("div", {
      className:"deposit-pagination",children:[l.jsx("button", {
        type:"button",className:"deposit-page-btn",onClick:()=>h(ee=>Math.max(1,ee-1)),disabled:f===1||d,children:"Trước"
      }),l.jsxs("div", {
        className:"deposit-page-info",children:["Trang ",f," / ",G]
      }),l.jsx("button", {
        type:"button",className:"deposit-page-btn",onClick:()=>h(ee=>Math.min(G,ee+1)),disabled:f===G||d,children:"Sau"
      })]
    }),l.jsx(uh, {
      isOpen:S.isOpen,onClose:C,title:S.title||"Goslynk Admin",message:S.message,type:S.type,showCancel:S.showCancel,onConfirm:S.onConfirm
    })]
  })
}
function Qne() {
  const {
    sessionId:n
  }
  =nn(),[e,t]=g.useState( {
    title:"",message:"",imageUrls:[],level:"info"
  }),[i,r]=g.useState(!1),[s,a]=g.useState(!1),[o,c]=g.useState(null),d=g.useRef(null),u=g.useRef(null);
  g.useEffect(()=> {
    (async()=> {
      try {
        const v=await fetch(`${Se}/announcement`);
        if(!v.ok)return;
        const b=await v.json();
        b!=null&&b.announcement&&t( {
          title:b.announcement.title||"",message:b.announcement.message||"",imageUrls:b.announcement.imageUrls||[],level:b.announcement.level||"info",updatedAt:b.announcement.updatedAt
        })
      }
      catch{}
    })()
  },[]);
  const f=async()=> {
    if(!e.title.trim()||!e.message.trim()) {
      c("Vui lòng nhập đầy đủ tiêu đề và nội dung.");
      return
    }
    r(!0),c(null);
    try {
      const y=await fetch(`${Se}/admin/announcement`, {
        method:"POST",headers: {
          "Content-Type":"application/json",...n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        },body:JSON.stringify( {
          title:e.title.trim(),message:e.message.trim(),imageUrls:e.imageUrls||[],level:e.level||"info"
        })
      }),v=await y.json();
      y.ok&&(v!=null&&v.success)?(t(b=> {
        var w;
        return {
          ...b,updatedAt:(w=v.announcement)==null?void 0:w.updatedAt
        }
      }),c("Đã lưu thông báo")):c((v==null?void 0:v.message)||"Lưu thất bại")
    }
    catch {
      c("Lưu thất bại")
    }
    finally {
      r(!1)
    }
  },h=y=> {
    const v=d.current,b=` [nav:${y}] `;
    if(v) {
      const w=v.selectionStart,S=v.selectionEnd,T=e.message,E=T.substring(0,w)+b+T.substring(S);
      t(x=>( {
        ...x,message:E
      })),setTimeout(()=> {
        v.focus(),v.setSelectionRange(w+b.length,w+b.length)
      },0)
    }
    else t(w=>( {
      ...w,message:w.message+b
    }))
  },m=async y=> {
    var b;
    const v=(b=y.target.files)==null?void 0:b[0];
    if(v) {
      if(e.imageUrls&&e.imageUrls.length>=3) {
        c("Tối đa 3 ảnh");
        return
      }
      a(!0);
      try {
        const w=new FormData;
        w.append("image",v);
        const S=await fetch(`${Se}/admin/announcement/upload-image`, {
          method:"POST",headers:n? {
            Authorization:`Bearer ${n}`
          }
          :{},body:w
        }),T=await S.json();
        S.ok&&(T!=null&&T.success)&&T.imageUrl?(t(E=>( {
          ...E,imageUrls:[...E.imageUrls||[],T.imageUrl].slice(0,3)
        })),c("Đã upload ảnh")):c((T==null?void 0:T.message)||"Upload thất bại")
      }
      catch {
        c("Upload thất bại")
      }
      finally {
        a(!1),u.current&&(u.current.value="")
      }
    }
  },p=y=> {
    t(v=>( {
      ...v,imageUrls:(v.imageUrls||[]).filter((b,w)=>w!==y)
    }))
  };
  return l.jsx("div", {
    className:"admin-card full announcement-card",children:l.jsxs("div", {
      className:"announcement-form",children:[l.jsxs("div", {
        className:"announcement-row",children:[l.jsxs("div", {
          className:"announcement-field ann-col-8",children:[l.jsx("label", {
            children:"Thông báo"
          }),l.jsx("input", {
            type:"text",value:e.title,maxLength:200,onChange:y=>t(v=>( {
              ...v,title:y.target.value
            })),placeholder:"Nhập tiêu đề thông báo"
          })]
        }),l.jsxs("div", {
          className:"announcement-field ann-col-4",children:[l.jsx("label", {
            children:"Mức cảnh báo"
          }),l.jsx("div", {
            className:"announcement-levels",children:["info","warning","danger"].map(y=>l.jsxs("button", {
              type:"button",className:`announcement-level ${e.level===y?"active":""}`,onClick:()=>t(v=>( {
                ...v,level:y
              })),children:[y==="info"&&"Info",y==="warning"&&"Warning",y==="danger"&&"Danger"]
            },y))
          })]
        })]
      }),l.jsxs("div", {
        className:"announcement-row",children:[l.jsxs("div", {
          className:"announcement-field ann-col-7",children:[l.jsx("label", {
            children:"Ảnh đính kèm (tối đa 3)"
          }),l.jsxs("div", {
            className:"announcement-images-list",children:[e.imageUrls&&e.imageUrls.length>0&&e.imageUrls.map((y,v)=>l.jsxs("div", {
              className:"announcement-image-item",children:[l.jsx("img", {
                src:y,alt:`Preview ${v+1}`,onError:b=> {
                  b.target.style.display="none"
                }
              }),l.jsx("button", {
                type:"button",className:"announcement-image-remove",onClick:()=>p(v),children:"×"
              })]
            },v)),(!e.imageUrls||e.imageUrls.length<3)&&l.jsxs("div", {
              className:"announcement-image-add",children:[l.jsx("input", {
                type:"file",ref:u,accept:"image/jpeg,image/jpg,image/png,image/gif,image/webp",onChange:m,style: {
                  display:"none"
                }
              }),l.jsx("button", {
                type:"button",className:"announcement-image-upload-btn",onClick:()=> {
                  var y;
                  return(y=u.current)==null?void 0:y.click()
                },disabled:s,children:s?"...":"+"
              })]
            })]
          })]
        }),l.jsxs("div", {
          className:"announcement-field ann-col-5",children:[l.jsx("label", {
            children:"Chèn nút điều hướng"
          }),l.jsxs("div", {
            className:"announcement-toolkit",children:[l.jsx("button", {
              type:"button",className:"toolkit-btn",onClick:()=>h("settings"),children:"⚙️ Cài đặt"
            }),l.jsx("button", {
              type:"button",className:"toolkit-btn",onClick:()=>h("store"),children:"🛒 Cửa hàng"
            }),l.jsx("button", {
              type:"button",className:"toolkit-btn",onClick:()=>h("vip"),children:"💎 VIP"
            })]
          })]
        })]
      }),l.jsxs("div", {
        className:"announcement-field",children:[l.jsx("label", {
          children:"Nội dung"
        }),l.jsx("textarea", {
          ref:d,value:e.message,maxLength:1e4,rows:6,onChange:y=>t(v=>( {
            ...v,message:y.target.value
          })),placeholder:"Nội dung thông báo hiển thị cho người dùng"
        }),l.jsxs("div", {
          className:"toolkit-hint",children:["Mẹo: Khi lưu, các thẻ ",l.jsx("code", {
            children:"[nav:...]"
          })," sẽ biến thành nút bấm có thể click được ở màn hình của User."]
        })]
      }),l.jsxs("div", {
        className:"announcement-footer",children:[l.jsx("div", {
          className:"announcement-meta",children:e.updatedAt&&`Cập nhật lần cuối: ${new Date(e.updatedAt).toLocaleString("vi-VN")}`
        }),l.jsxs("div", {
          className:"announcement-actions",children:[l.jsx("button", {
            type:"button",className:"announcement-save",onClick:f,disabled:i,children:i?"Đang lưu...":"Lưu thông báo"
          }),o&&l.jsx("div", {
            className:"announcement-status",children:o
          })]
        })]
      })]
    })
  })
}
function Zne() {
  const {
    sessionId:n
  }
  =nn(),[e,t]=g.useState([]),[i,r]=g.useState(!1),[s,a]=g.useState(""),[o,c]=g.useState([]),[d,u]=g.useState(!1),[f,h]=g.useState(!1),[m,p]=g.useState(null),[y,v]=g.useState("Phần mềm bên thứ ba chứa mã độc"),[b,w]=g.useState(!1),[S,T]=g.useState(null),E=async()=> {
    if(n) {
      r(!0);
      try {
        const _=await fetch(`${Se}/hardware-ban/list`, {
          headers: {
            Authorization:`Bearer ${n}`
          }
        }),M=await _.json();
        M.success?t(M.data):console.error("[BanList] API error:",M.message,"status:",_.status)
      }
      catch(_) {
        console.error("[BanList] Fetch error:",_)
      }
      finally {
        r(!1)
      }
    }
  };
  g.useEffect(()=> {
    E()
  },[n]);
  const x=async()=> {
    if(!(!s.trim()||!n)&&!(s.trim().length<2)) {
      u(!0);
      try {
        const M=await(await fetch(`${Se}/admin/users?q=${encodeURIComponent(s)}&limit=10`, {
          headers: {
            Authorization:`Bearer ${n}`
          }
        })).json();
        M.success&&c((M.data||[]).slice(0,10))
      }
      catch {
        c([])
      }
      finally {
        u(!1)
      }
    }
  },k=async()=> {
    if(!(!m||!n)) {
      w(!0),T(null);
      try {
        let _=m.hardware_id;
        _||(_=await oe("get_machine_hwid"));
        const j=await(await fetch(`${Se}/hardware-ban`, {
          method:"POST",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${n}`
          },body:JSON.stringify( {
            user_id:m.id,hardware_id:_,reason:y
          })
        })).json();
        j.success?(T( {
          type:"ok",text:"Ban phần cứng thành công"
        }),p(null),h(!1),a(""),c([]),E()):T( {
          type:"err",text:j.message||"Lỗi khi ban"
        })
      }
      catch {
        T( {
          type:"err",text:"Lỗi kết nối"
        })
      }
      finally {
        w(!1)
      }
    }
  },C=async _=> {
    if(n)try {
      (await(await fetch(`${Se}/hardware-ban/${_}`, {
        method:"DELETE",headers: {
          Authorization:`Bearer ${n}`
        }
      })).json()).success&&t(B=>B.filter(G=>G.id!==_))
    }
    catch{}
  };
  return l.jsxs("div", {
    className:"hb-panel",children:[l.jsxs("div", {
      className:"hb-header",children:[l.jsxs("div", {
        className:"hb-title-row",children:[l.jsx(GI, {
          className:"hb-icon"
        }),l.jsx("h2", {
          className:"hb-title",children:"Hardware Ban"
        }),l.jsx("span", {
          className:"hb-badge",children:e.length
        })]
      }),l.jsx("p", {
        className:"hb-desc",children:"Khoá vô hạn phần cứng. Tất cả phần mềm can thiệp (spoofer, launcher của đối thủ) đều bị chặn tự động."
      })]
    }),S&&l.jsx("div", {
      className:`hb-msg ${S.type}`,children:S.text
    }),l.jsxs("div", {
      className:"hb-toolbar",children:[l.jsxs("button", {
        className:"hb-btn hb-btn--primary",onClick:()=> {
          h(!f),T(null)
        },children:[l.jsx(GI,{})," Ban Phần Cứng"]
      }),l.jsx("button", {
        className:"hb-btn hb-btn--ghost",onClick:E,disabled:i,children:"Tải lại"
      })]
    }),f&&l.jsxs("div", {
      className:"hb-add-form",children:[l.jsxs("div", {
        className:"hb-section-title",children:[l.jsx(rS,{})," Ban Phần Cứng"]
      }),l.jsxs("div", {
        className:"hb-form-group",children:[l.jsx("label", {
          children:"Tìm user"
        }),l.jsxs("div", {
          className:"hb-search-row",children:[l.jsx("input", {
            type:"text",placeholder:"Nhập ít nhất 2 ký tự...",value:s,onChange:_=> {
              a(_.target.value),c([])
            },onKeyDown:_=>_.key==="Enter"&&x()
          }),l.jsx("button", {
            className:"hb-btn hb-btn--search",onClick:x,disabled:d,children:l.jsx(gE,{})
          })]
        })]
      }),o.length>0&&!m&&l.jsx("div", {
        className:"hb-search-results",children:o.map(_=>l.jsxs("div", {
          className:"hb-search-result-item",onClick:()=> {
            p(_),c([]),a(_.username)
          },children:[l.jsx("span", {
            className:"hb-result-username",children:_.username
          }),l.jsxs("span", {
            className:"hb-result-id",children:[_.id.slice(0,8),"..."]
          })]
        },_.id))
      }),m&&l.jsx("div", {
        className:"hb-selected-user",children:l.jsxs("div", {
          className:"hb-user-info",children:[l.jsx("span", {
            className:"hb-user-label",children:"Đã chọn:"
          }),l.jsx("span", {
            className:"hb-user-name",children:m.username
          }),l.jsx("button", {
            className:"hb-clear-btn",onClick:()=>p(null),children:"×"
          })]
        })
      }),l.jsxs("div", {
        className:"hb-form-group",children:[l.jsx("label", {
          children:"Lý do"
        }),l.jsx("input", {
          type:"text",value:y,onChange:_=>v(_.target.value),placeholder:"Lý do ban phần cứng..."
        })]
      }),l.jsxs("div", {
        className:"hb-warning",children:[l.jsx(rS,{}),"Hành động này sẽ khoá vô hạn phần cứng của user này trên tất cả thiết bị. Không thể hoàn tác nếu không có admin xác nhận."]
      }),l.jsxs("div", {
        className:"hb-form-actions",children:[l.jsx("button", {
          className:"hb-btn hb-btn--danger",onClick:k,disabled:!m||b,children:b?"Đang xử lý...":"Khoá Phần Cứng"
        }),l.jsx("button", {
          className:"hb-btn",onClick:()=> {
            h(!1),p(null)
          },children:"Huỷ"
        })]
      })]
    }),l.jsxs("div", {
      className:"hb-list",children:[l.jsxs("div", {
        className:"hb-list-head",children:[l.jsx("div", {
          children:"User"
        }),l.jsx("div", {
          children:"Hardware ID"
        }),l.jsx("div", {
          children:"Lý do"
        }),l.jsx("div", {
          children:"Ngày"
        }),l.jsx("div", {
          children:"Hành động"
        })]
      }),i?l.jsx("div", {
        className:"hb-loading",children:"Đang tải..."
      }):e.length===0?l.jsx("div", {
        className:"hb-empty",children:"Chưa có ai bị ban phần cứng"
      }):e.map(_=>l.jsxs("div", {
        className:"hb-row",children:[l.jsxs("div", {
          children:[l.jsx("div", {
            className:"hb-row-username",children:_.username||_.user_id.slice(0,8)
          }),l.jsxs("div", {
            className:"hb-row-userid",children:[_.user_id.slice(0,8),"..."]
          })]
        }),l.jsx("div", {
          className:"hb-row-hwid",children:_.hardware_id
        }),l.jsx("div", {
          className:"hb-row-reason",children:_.reason
        }),l.jsx("div", {
          className:"hb-row-date",children:new Date(_.created_at).toLocaleDateString("vi-VN")
        }),l.jsx("div", {
          children:l.jsxs("button", {
            className:"hb-btn hb-btn--unban",onClick:()=>C(_.id),title:"Unban",children:[l.jsx(Yp,{})," Bỏ khoá"]
          })
        })]
      },_.id))]
    })]
  })
}
function Q3(n) {
  var e,t,i="";
  if(typeof n=="string"||typeof n=="number")i+=n;
  else if(typeof n=="object")if(Array.isArray(n)) {
    var r=n.length;
    for(e=0;
    e<r;
    e++)n[e]&&(t=Q3(n[e]))&&(i&&(i+=" "),i+=t)
  }
  else for(t in n)n[t]&&(i&&(i+=" "),i+=t);
  return i
}
function ei() {
  for(var n,e,t=0,i="",r=arguments.length;
  t<r;
  t++)(n=arguments[t])&&(e=Q3(n))&&(i&&(i+=" "),i+=e);
  return i
}
var Xne=["dangerouslySetInnerHTML","onCopy","onCopyCapture","onCut","onCutCapture","onPaste","onPasteCapture","onCompositionEnd","onCompositionEndCapture","onCompositionStart","onCompositionStartCapture","onCompositionUpdate","onCompositionUpdateCapture","onFocus","onFocusCapture","onBlur","onBlurCapture","onChange","onChangeCapture","onBeforeInput","onBeforeInputCapture","onInput","onInputCapture","onReset","onResetCapture","onSubmit","onSubmitCapture","onInvalid","onInvalidCapture","onLoad","onLoadCapture","onError","onErrorCapture","onKeyDown","onKeyDownCapture","onKeyPress","onKeyPressCapture","onKeyUp","onKeyUpCapture","onAbort","onAbortCapture","onCanPlay","onCanPlayCapture","onCanPlayThrough","onCanPlayThroughCapture","onDurationChange","onDurationChangeCapture","onEmptied","onEmptiedCapture","onEncrypted","onEncryptedCapture","onEnded","onEndedCapture","onLoadedData","onLoadedDataCapture","onLoadedMetadata","onLoadedMetadataCapture","onLoadStart","onLoadStartCapture","onPause","onPauseCapture","onPlay","onPlayCapture","onPlaying","onPlayingCapture","onProgress","onProgressCapture","onRateChange","onRateChangeCapture","onSeeked","onSeekedCapture","onSeeking","onSeekingCapture","onStalled","onStalledCapture","onSuspend","onSuspendCapture","onTimeUpdate","onTimeUpdateCapture","onVolumeChange","onVolumeChangeCapture","onWaiting","onWaitingCapture","onAuxClick","onAuxClickCapture","onClick","onClickCapture","onContextMenu","onContextMenuCapture","onDoubleClick","onDoubleClickCapture","onDrag","onDragCapture","onDragEnd","onDragEndCapture","onDragEnter","onDragEnterCapture","onDragExit","onDragExitCapture","onDragLeave","onDragLeaveCapture","onDragOver","onDragOverCapture","onDragStart","onDragStartCapture","onDrop","onDropCapture","onMouseDown","onMouseDownCapture","onMouseEnter","onMouseLeave","onMouseMove","onMouseMoveCapture","onMouseOut","onMouseOutCapture","onMouseOver","onMouseOverCapture","onMouseUp","onMouseUpCapture","onSelect","onSelectCapture","onTouchCancel","onTouchCancelCapture","onTouchEnd","onTouchEndCapture","onTouchMove","onTouchMoveCapture","onTouchStart","onTouchStartCapture","onPointerDown","onPointerDownCapture","onPointerMove","onPointerMoveCapture","onPointerUp","onPointerUpCapture","onPointerCancel","onPointerCancelCapture","onPointerEnter","onPointerEnterCapture","onPointerLeave","onPointerLeaveCapture","onPointerOver","onPointerOverCapture","onPointerOut","onPointerOutCapture","onGotPointerCapture","onGotPointerCaptureCapture","onLostPointerCapture","onLostPointerCaptureCapture","onScroll","onScrollCapture","onWheel","onWheelCapture","onAnimationStart","onAnimationStartCapture","onAnimationEnd","onAnimationEndCapture","onAnimationIteration","onAnimationIterationCapture","onTransitionEnd","onTransitionEndCapture"];
function mT(n) {
  if(typeof n!="string")return!1;
  var e=Xne;
  return e.includes(n)
}
var eie=["aria-activedescendant","aria-atomic","aria-autocomplete","aria-busy","aria-checked","aria-colcount","aria-colindex","aria-colspan","aria-controls","aria-current","aria-describedby","aria-details","aria-disabled","aria-errormessage","aria-expanded","aria-flowto","aria-haspopup","aria-hidden","aria-invalid","aria-keyshortcuts","aria-label","aria-labelledby","aria-level","aria-live","aria-modal","aria-multiline","aria-multiselectable","aria-orientation","aria-owns","aria-placeholder","aria-posinset","aria-pressed","aria-readonly","aria-relevant","aria-required","aria-roledescription","aria-rowcount","aria-rowindex","aria-rowspan","aria-selected","aria-setsize","aria-sort","aria-valuemax","aria-valuemin","aria-valuenow","aria-valuetext","className","color","height","id","lang","max","media","method","min","name","style","target","width","role","tabIndex","accentHeight","accumulate","additive","alignmentBaseline","allowReorder","alphabetic","amplitude","arabicForm","ascent","attributeName","attributeType","autoReverse","azimuth","baseFrequency","baselineShift","baseProfile","bbox","begin","bias","by","calcMode","capHeight","clip","clipPath","clipPathUnits","clipRule","colorInterpolation","colorInterpolationFilters","colorProfile","colorRendering","contentScriptType","contentStyleType","cursor","cx","cy","d","decelerate","descent","diffuseConstant","direction","display","divisor","dominantBaseline","dur","dx","dy","edgeMode","elevation","enableBackground","end","exponent","externalResourcesRequired","fill","fillOpacity","fillRule","filter","filterRes","filterUnits","floodColor","floodOpacity","focusable","fontFamily","fontSize","fontSizeAdjust","fontStretch","fontStyle","fontVariant","fontWeight","format","from","fx","fy","g1","g2","glyphName","glyphOrientationHorizontal","glyphOrientationVertical","glyphRef","gradientTransform","gradientUnits","hanging","horizAdvX","horizOriginX","href","ideographic","imageRendering","in2","in","intercept","k1","k2","k3","k4","k","kernelMatrix","kernelUnitLength","kerning","keyPoints","keySplines","keyTimes","lengthAdjust","letterSpacing","lightingColor","limitingConeAngle","local","markerEnd","markerHeight","markerMid","markerStart","markerUnits","markerWidth","mask","maskContentUnits","maskUnits","mathematical","mode","numOctaves","offset","opacity","operator","order","orient","orientation","origin","overflow","overlinePosition","overlineThickness","paintOrder","panose1","pathLength","patternContentUnits","patternTransform","patternUnits","pointerEvents","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","r","radius","refX","refY","renderingIntent","repeatCount","repeatDur","requiredExtensions","requiredFeatures","restart","result","rotate","rx","ry","seed","shapeRendering","slope","spacing","specularConstant","specularExponent","speed","spreadMethod","startOffset","stdDeviation","stemh","stemv","stitchTiles","stopColor","stopOpacity","strikethroughPosition","strikethroughThickness","string","stroke","strokeDasharray","strokeDashoffset","strokeLinecap","strokeLinejoin","strokeMiterlimit","strokeOpacity","strokeWidth","surfaceScale","systemLanguage","tableValues","target