=0;
i<t.length;
i++)this.engine.write(t[i],e.options)
}
cleanup() {
  this.subs.forEach(e=>e()),this.subs.length=0,this.decoder.destroy()
}
_close() {
  this.skipReconnect=!0,this._reconnecting=!1,this.onclose("forced close")
}
disconnect() {
  return this._close()
}
onclose(e,t) {
  var i;
  this.cleanup(),(i=this.engine)===null||i===void 0||i.close(),this.backoff.reset(),this._readyState="closed",this.emitReserved("close",e,t),this._reconnection&&!this.skipReconnect&&this.reconnect()
}
reconnect() {
  if(this._reconnecting||this.skipReconnect)return this;
  const e=this;
  if(this.backoff.attempts>=this._reconnectionAttempts)this.backoff.reset(),this.emitReserved("reconnect_failed"),this._reconnecting=!1;
  else {
    const t=this.backoff.duration();
    this._reconnecting=!0;
    const i=this.setTimeoutFn(()=> {
      e.skipReconnect||(this.emitReserved("reconnect_attempt",e.backoff.attempts),!e.skipReconnect&&e.open(r=> {
        r?(e._reconnecting=!1,e.reconnect(),this.emitReserved("reconnect_error",r)):e.onreconnect()
      }))
    },t);
    this.opts.autoUnref&&i.unref(),this.subs.push(()=> {
      this.clearTimeoutFn(i)
    })
  }
}
onreconnect() {
  const e=this.backoff.attempts;
  this._reconnecting=!1,this.backoff.reset(),this.emitReserved("reconnect",e)
}
}
const rf={};
function Wp(n,e) {
  typeof n=="object"&&(e=n,n=void 0),e=e||{};
  const t=aH(n,e.path||"/socket.io"),i=t.source,r=t.id,s=t.path,a=rf[r]&&s in rf[r].nsps,o=e.forceNew||e["force new connection"]||e.multiplex===!1||a;
  let c;
  return o?c=new eS(i,e):(rf[r]||(rf[r]=new eS(i,e)),c=rf[r]),t.query&&!e.query&&(e.query=t.queryKey),c.socket(t.path,e)
}
Object.assign(Wp, {
  Manager:eS,Socket:_4,io:Wp,connect:Wp
});
const tS="notification",bH=3e3,wH=5500;
let Zl=null,$I=0,Ng=!1,zI=!1,Om=null,nS=!1;
function mE() {
  var n,e;
  if(Zl)return Zl;
  try {
    const t=((e=(n=import.meta)==null?void 0:n.env)==null?void 0:e.BASE_URL)||"/";
    Zl=new Audio(`${t}soundchat.mp3`)
  }
  catch {
    Zl=new Audio("/soundchat.mp3")
  }
  return Zl.volume=.15,Zl
}
function SH() {
  if(zI)return;
  const n=()=> {
    const e=mE();
    e.play().then(()=> {
      e.pause(),e.currentTime=0,zI=!0
    }).catch(()=>{})
  };
  window.addEventListener("click",n, {
    once:!0
  }),window.addEventListener("keydown",n, {
    once:!0
  }),window.addEventListener("touchstart",n, {
    once:!0
  })
}
function L4() {
  const n=Date.now();
  if(!(n-$I<bH)) {
    $I=n;
    try {
      const e=mE();
      e&&(e.currentTime=0,e.play().catch(()=>{}))
    }
    catch{}
  }
}
async function iS() {
  const {
    WebviewWindow:n
  }
  =await $n(async()=> {
    const {
      WebviewWindow:e
    }
    =await import("./webviewWindow-r6d-cT4E.js");
    return {
      WebviewWindow:e
    }
  },__vite__mapDeps([4,1,2]),import.meta.url);
  return await n.getByLabel(tS)
}
async function xH() {
  try {
    const {
      currentMonitor:n
    }
    =await $n(async()=> {
      const {
        currentMonitor:d
      }
      =await Promise.resolve().then(()=>vy);
      return {
        currentMonitor:d
      }
    },void 0,import.meta.url), {
      LogicalPosition:e,LogicalSize:t
    }
    =await $n(async()=> {
      const {
        LogicalPosition:d,LogicalSize:u
      }
      =await Promise.resolve().then(()=>xW);
      return {
        LogicalPosition:d,LogicalSize:u
      }
    },void 0,import.meta.url),i=await n();
    if(!i)return;
    const r=await iS();
    if(!r)return;
    const s=i.scaleFactor??1,a=Math.round(i.size.width/s),o=360,c=84;
    await r.setSize(new t(o,c)),await r.setPosition(new e(a-o-20,20))
  }
  catch{}
}
async function EH(n=2e3) {
  if(nS)return!0;
  try {
    const {
      listen:e
    }
    =await $n(async()=> {
      const {
        listen:t
      }
      =await Promise.resolve().then(()=>mg);
      return {
        listen:t
      }
    },void 0,import.meta.url);
    return await new Promise(t=> {
      let i=null;
      const r=a=> {
        clearTimeout(s),i&&(i(),i=null),t(a)
      },s=setTimeout(()=> {
        console.warn("[Notif] Timed out waiting for notification-ready"),r(!1)
      },n);
      e("notification-ready",()=> {
        console.log("[Notif] Got notification-ready!"),nS=!0,r(!0)
      }).then(a=> {
        i=a
      }).catch(a=> {
        console.error("[Notif] listen error:",a),r(!1)
      })
    })
  }
  catch(e) {
    return console.error("[Notif] waitForWindowReady error:",e),!1
  }
}
async function TH(n,e,t,i,r,s) {
  try {
    const a=await iS();
    if(!a) {
      console.warn("[Notif] notification window not found");
      return
    }
    await xH(),nS||(await a.show(),await EH(1500),await a.hide());
    const {
      emitTo:o
    }
    =await $n(async()=> {
      const {
        emitTo:c
      }
      =await Promise.resolve().then(()=>mg);
      return {
        emitTo:c
      }
    },void 0,import.meta.url);
    await o(tS,"show-notification", {
      senderName:n,content:e,avatarUrl:t,role:i,isAdminMessage:r,senderId:s
    }),await new Promise(c=>setTimeout(c,80)),await a.show(),Om!==null&&clearTimeout(Om),Om=setTimeout(async()=> {
      try {
        const {
          emitTo:c
        }
        =await $n(async()=> {
          const {
            emitTo:u
          }
          =await Promise.resolve().then(()=>mg);
          return {
            emitTo:u
          }
        },void 0,import.meta.url);
        await c(tS,"hide-notification",null);
        const d=await iS();
        await(d==null?void 0:d.hide())
      }
      catch{}Om=null
    },wH)
  }
  catch(a) {
    console.error("[Notif] showPersistentNotification error:",a)
  }
}
async function pE() {
  try {
    const {
      isTauri:n
    }
    =await $n(async()=> {
      const {
        isTauri:e
      }
      =await Promise.resolve().then(()=>_p);
      return {
        isTauri:e
      }
    },void 0,import.meta.url);
    Ng=await n()
  }
  catch {
    Ng=!1
  }
  Zl||(mE(),SH())
}
async function M4(n,e,t,i,r,s) {
  const a=localStorage.getItem("notif_mute_sound")==="1",o=localStorage.getItem("notif_disable_popup")==="1";
  a||L4(),Ng&&!o?await TH(n,e,t||"",i||"user",r??0,s||""):!Ng&&!o&&"Notification"in window&&(Notification.permission==="granted"?new Notification(n, {
    body:e,icon:t||"/favicon.ico"
  }):Notification.permission!=="denied"&&Notification.requestPermission().then(c=> {
    c==="granted"&&new Notification(n, {
      body:e,icon:t||"/favicon.ico"
    })
  }))
}
const CH=Object.freeze(Object.defineProperty( {
  __proto__:null,initializeNotificationService:pE,playNotificationSound:L4,showNotification:M4
},Symbol.toStringTag, {
  value:"Module"
})),IH=g.createContext(void 0);
function kH( {
  children:n
}) {
  const {
    user:e,sessionId:t,checkAuth:i
  }
  =nn(),r=g.useRef(!0),[s,a]=g.useState(null),[o,c]=g.useState(!1),[d,u]=g.useState(!1),[f,h]=g.useState(null),m=g.useRef(null),p=g.useCallback(y=> {
    h(y)
  },[]);
  return g.useEffect(()=> {
    m.current=f
  },[f]),g.useEffect(()=> {
    if(!t||!e) {
      s&&(s.disconnect(),a(null),c(!1),u(!1));
      return
    }
    if(s&&s.connected)return;
    s&&(s.removeAllListeners(),s.disconnect());
    const y=Wp(Se, {
      withCredentials:!0,transports:["websocket"],reconnection:!0,reconnectionAttempts:1/0,reconnectionDelay:1e3,reconnectionDelayMax:3e4,randomizationFactor:.5
    });
    y.on("reconnect_attempt",T=> {
      console.info(`[Socket] Mất kết nối. Đang thử lại lần thứ ${T}...`),window.dispatchEvent(new CustomEvent("socketReconnecting", {
        detail: {
          attempt:T
        }
      }))
    }),a(y);
    const v=()=> {
      c(!0),y.emit("auth", {
        sessionId:t
      },T=> {
        T!=null&&T.success?(u(!0),r.current||i(),r.current=!1):u(!1)
      })
    },b=()=> {
      c(!1),u(!1)
    },w=()=> {
      i()
    },S=T=> {
      if(!T||!T.sender_id||T.sender_id===e.id||m.current===T.sender_id)return;
      const E=T.sender_name||"New Message",x=T.content||(T.message_type==="image"?"[Image]":"[File]");
      M4(E,x,T.sender_avatar_url||void 0,T.sender_role||"user",T.is_admin_message??0,T.sender_id||"")
    };
    return y.on("connect",v),y.on("disconnect",b),y.on("message:new",S),y.on("user:role_updated",w),()=> {
      y.off("connect",v),y.off("disconnect",b),y.off("message:new",S),y.off("user:role_updated",w),y.disconnect(),a(null),c(!1)
    }
  },[t,e==null?void 0:e.id]),l.jsx(IH.Provider, {
    value: {
      socket:s,connected:o,authenticated:d,activeChatPeerId:f,setActiveChatPeerId:p
    },children:n
  })
}
const _H= {
  header: {
    topMenu: {
      view:"View",friends:"Friends",games:"Games",help:"Help",vipNow:"Get VIP Now",burrspeak:"Voice-over"
    },wishlist:"Wishlist",cart:"Cart",searchPlaceholder:"Search the store",searchResults:"Search results",profileMenu: {
      viewProfile:"View my profile",accountDetailsPrefix:"Account details:",storePreferences:"Store Preferences",viewWalletPrefix:"View my wallet",showTutorial:"Show Tutorial",signOut:"Sign out of account…"
    }
  },accountDetails: {
    breadcrumbHome:"Home",breadcrumbAccount:"Account",headerSuffix:"",accountIdLabel:"Account ID:",storeHistoryTitle:"Store & Purchase History",walletBalanceLabel:"Wallet Balance",contactInfoTitle:"Contact Info",emailLabel:"Email address:",phoneLabel:"Phone:",save:"Save",cancel:"Cancel",changeEmail:"Change my email address",managePhone:"Manage your phone number",phonePlaceholder:"Enter phone number",phoneNotSet:"Not set",accountInfoTitle:"Account Information",roleLabel:"Role:",emailEmptyError:"Email cannot be empty",emailUpdateFail:"Failed to update email",emailUpdateSuccess:"Email updated successfully",phoneUpdateFail:"Failed to update phone number",phoneUpdateSuccess:"Phone number updated successfully",viewPurchaseHistory:"View purchase history",storeLanguageButton:"Store language",vipExpiresAt:"VIP Expires:",subscriptionExpiresAt:"Subscription Expires:",vipPermanent:"Permanent",buyVip:"Buy VIP",upgradeVip:"Upgrade VIP"
  },nav: {
    store:"STORE",library:"LIBRARY",market:"MARKET"
  },profileMenu: {
    purchaseHistory:"Purchase History"
  },market: {
    title:"Market",subtitle:"Buy products at the best prices",searchPlaceholder:"Search products...",allCategories:"All",outOfStock:"Out of stock",inStock:"{count} available",buyNow:"Buy Now",outOfStockBtn:"Out of Stock",loginRequired:"Please login to purchase",purchasedAt:"Purchased at",category:"Category",featured:"Featured",empty:"No products found",loading:"Loading...",other:"Other",buySuccess:"Purchase successful!",buyError:"Purchase failed",confirmPurchase:"Confirm Purchase",available:"Available",processing:"Processing...",close:"Close",confirmPay:"Pay",emailSent:"Key has been sent to your email"
  },historyOrder: {
    title:"Purchase History",subtitle:"{count} purchased items",emptyTitle:"No purchases yet",emptyDesc:"You haven't bought anything from the market yet.",copyKey:"Copy key",copied:"Copied!",refunded:"Refunded",completed:"Completed",loading:"Loading...",keyViaEmail:"Key sent via email"
  },gameDetail: {
    loading:"Loading game…",errorPrefix:"Error",notFound:"Game not found.",follow:"Follow",following:"Following",followLoading:"...",inLibrary:"In Library",inCart:"In Cart",addToCart:"Add to cart",alreadyOwned:"Already Owned",releaseDate:"Release Date:",developer:"Developer:",publisher:"Publisher:",specialPromotion:"SPECIAL PROMOTION! Offer may end soon.",free:"FREE",aboutThisGame:"ABOUT THIS GAME",addedToCartTitle:"Added to your cart!",continueShopping:"Continue Shopping",viewMyCart:"View My Cart",previous:"Previous",next:"Next",addGameSuccess:"Game added to library",addGameError:"Cannot add game",addGameFailed:"Error adding game",addingGame:"Adding...",addGameVip:"Add Game VIP/VIP+",addGameVipPlus:"Add Game VIP+",vipRequired:"VIP Account Required",vipRequiredMessage:"This feature is only available for VIP or VIP+ accounts",vipPlusRequiredMessage:"This game is only available for VIP+ accounts",vipUpgradeMessage:"Please upgrade your account to use this feature.",upgradeAccount:"Upgrade Account",close:"Close",buy:"Buy",backToStore:"Back to Store"
  },storeSetting: {
    title:"Store Preferences",languageTitle:"Language",languageDescription:"Choose which language is used for store content and interface text.",englishLabel:"English",vietnameseLabel:"Vietnamese (Tiếng Việt)"
  },cart: {
    breadcrumbHome:"Home",breadcrumbCart:"Your Shopping Cart",title:"Your Shopping Cart",emptyText:"Your cart is currently empty.",emptyBrowse:"Continue shopping",remove:"Remove",includesPrefix:"Includes",includesSuffix:"items:",continueShopping:"Continue Shopping",removeAll:"Remove all items",estimatedTotal:"Estimated total",zeroTotal:"0 G",taxNote:"Sales tax will be calculated during checkout where applicable.",continueToPayment:"Buy Now",summaryLegal:"A purchase of a digital product grants a license for the product on Goslynk. For full terms and conditions, please see the Goslynk Subscriber Agreement."
  },deposit: {
    breadcrumbAccount:"Account",breadcrumbWallet:"Wallet",title:"Add funds to your Goslynk Wallet",selectAmount:"Select an amount",customLabel:"Or enter a custom amount",customPlaceholder:"e.g. 150000",customNote:"Conversion rate: 1,000đ = 1,000 G",paymentMethodTitle:"Payment method",paymentMbName:"MB Bank",paymentMbDesc:"Transfer via Military Bank (MB Bank).",selectedAmountTitle:"Selected amount",noAmountSelected:"No amount selected",note:"Funds added to your Goslynk Wallet can be used to exchange for products on the store.",continue:"Continue",demoAlert:"This is a demo payment processing is not implemented.",qrTitle:"Scan VietQR to pay",qrBankLabel:"Bank",qrAccountLabel:"Account number",qrAmountLabel:"Amount",qrDescriptionLabel:"Transfer note",qrDescriptionPrefix:"NAP",qrCopy:"Copy QR link",qrCopySuccess:"QR link copied",qrCopyFail:"Unable to copy link, please try again.",qrOpenImage:"Open QR image",qrClose:"Close",showDepositCode:"Show deposit code",creating:"Creating code...",scanErrorTitle:"Could not create deposit code",scanErrorOk:"OK",scanIdleHint:"Tap when you are ready to pay. QR and transfer code appear after that.",depositCodeLabel:"Transfer description",copyDepositCode:"Copy code",copyCodeSuccess:"Deposit code copied",copyCodeFail:"Could not copy code, please try again.",graceCountdown:"Auto-check in {{s}}s, scan QR to deposit G points",pollingActive:"Checking payment automatically...",checkTransferred:"I've paid, check now",checking:"Checking...",qrNote:"Scan this code with your banking app to complete the payment."
  },wishlist: {
    title:"Wishlist",loading:"Loading…",errorPrefix:"Error",countSingle:"game",countMultiple:"games",emptyText:"Your wishlist is empty.",browseStore:"Browse Store",free:"FREE",remove:"Remove"
  },complete: {
    breadcrumbComplete:"Completed",purchaseTitle:"Purchase Complete",purchaseMessage:"Your games have been added to your library and are ready to play.",depositTitle:"Deposit Complete",depositMessage:"Your funds have been added to your Goslynk Wallet.",backToStore:"Back to Store",goToLibrary:"Go to Library",thankYouTab:"Thank you",receiptTitle:"Your purchase receipt",receiptDescription:"Confirmation of your transaction is provided below. This information will also be emailed to you shortly.",accountNameLabel:"Account Name",totalLabel:"Total",confirmationCodeLabel:"Confirmation code",assistTitle:"Need assistance?",assistDescription:"For help or product support, please visit Goslynk Support online.",returnToStore:"Return to the store",printReceipt:"Print receipt"
  },library: {
    home:"Home",back:"Back",gamesAndSoftware:"Games and Software",allGamesSection:"ALL GAMES",allGamesTitle:"All games",loading:"Loading…",empty:"You have no games in your library.",buyTag:"Buy",loadMore:"Load more",searchPlaceholder:"Search games...",failedToLoad:"Failed to load library"
  },libraryDetail: {
    installButton:"INSTALL",storePage:"Store Page",dlc:"DLC",communityHub:"Community Hub",discussions:"Discussions",guides:"Guides",support:"Support",featured:"FEATURED",viewAll:"View All",showLess:"Show Less",loadingNews:"Loading news...",news:"NEWS",noFeaturedContent:"No featured content available",activity:"ACTIVITY",activityPlaceholder:"Say something about this game to your friends...",loadingContent:"Loading content...",viewOnSteam:"View on Steam Community",rateUp:"Rate Up",rateDown:"Rate Down",discuss:"Discuss",share:"Share",posted:"POSTED",months:["JANUARY","FEBRUARY","MARCH","APRIL","MAY","JUNE","JULY","AUGUST","SEPTEMBER","OCTOBER","NOVEMBER","DECEMBER"],monthsFull:["January","February","March","April","May","June","July","August","September","October","November","December"],days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],installationNotAvailable:"Installation is only available on the desktop app (Windows). Please use the desktop version.",exeNotFound:"Executable file not found after installation. Please try again.",installationCompleted:"Installation completed successfully",installationFailed:"Installation failed",playNotAvailable:"Play is only available on the desktop app (Windows). Please use the desktop version.",gameNotInstalled:"Game is not installed. Please install the game first.",exeNotFoundPlay:"Game executable not found. Please install the game first.",launchFailed:"Failed to launch game",launchSuccess:"Game launched successfully",onlineNotAvailable:"Online is only available on the app (Windows). Please use the desktop version.",onlineFixApplied:"Online fix applied successfully",onlineFixFailed:"Online fix failed",vipExpired:"VIP EXPIRED",vipExpiredTooltip:"VIP game has expired. Please renew VIP to continue using.",desktopOnly:"Only available on desktop app",vipExpiredTooltipShort:"VIP game has expired",needVipToInstall:"You need VIP/VIP+ or own the game to install",updating:"Updating...",installing:"Installing...",update:"UPDATE",install:"INSTALL",launching:"Launching...",playing:"Playing",play:"PLAY",downloading:"Downloading...",online:"ONLINE"
  },friendsChat: {
    title:"Friends & Chat",back:"Back",connecting:"Connecting...",loading:"Loading messages...",noMessages:"No messages yet",startConversation:"Start a conversation with admin",typeMessage:"Type a message...",typeMessageToAdmin:"Type a message to Admin...",send:"Send",selectPeer:"Select a user to chat",engagedBy:"Engaged by",engage:"Engage",disengage:"Disengage",admin:"Admin",directMessages:"Direct Messages",online:"Online",attachments:"Attachments",override:"Override",processingBy:"Being processed by {admin}",youProcessing:"You are processing",spamWarning:"Please wait 1 second before sending another message.",loadingOlder:"Loading older messages...",selectUserToView:"Select a user to view messages",noConversation:"No conversation yet.",user:"User",searchPlaceholder:"Search user / ID...",filterAllRoles:"All Roles",roleUser:"User",roleVip:"VIP",roleVipPlus:"VIP+",roleNetflix:"Netflix",saveFileTitle:"Save file",downloadSuccess:"File saved",downloadCancelled:"File save cancelled",downloadFailed:"Failed to save file",uploadFailed:"Upload failed. Please try again.",messageActionFailed:"Message action failed. Please try again."
  },vipPurchase: {
    title:"Purchase VIP",upgradeTitle:"Upgrade VIP",vipPackages:"VIP Packages",vipPlusPackages:"VIP Plus Packages",upgradePackages:"VIP+ Upgrade Packages",days:"days",buyNow:"Buy Now",upgradeNow:"Upgrade Now",processing:"Processing...",noPackages:"No VIP packages available",loginRequired:"Please login to purchase VIP",purchaseFailed:"Failed to purchase VIP",purchaseSuccess:"VIP purchase successful!",features:"Features",upgradePrice:"Upgrade Price",originalPrice:"Original Price"
  },login: {
    subtitle:"sign in",usernameLabel:"Username",usernamePlaceholder:"Enter username",passwordLabel:"Password",passwordPlaceholder:"Enter password",rememberMe:"Remember me",forgotPassword:"Forgot password?",submitButton:"Sign in",submitting:"Signing in...",noAccount:"Don't have an account?",signUp:"Sign up now",errorEmptyFields:"Please enter username and password",errorLoginFailed:"Login failed"
  },register: {
    subtitle:"sign up",usernameLabel:"Username",usernamePlaceholder:"Enter username",emailLabel:"Email",emailPlaceholder:"Enter email address",passwordLabel:"Password",passwordPlaceholder:"Enter password",confirmPasswordLabel:"Confirm Password",confirmPasswordPlaceholder:"Re-enter password",submitButton:"Sign up",submitting:"Signing up...",hasAccount:"Already have an account?",signIn:"Sign in now",errorEmptyFields:"Please fill in all fields",errorPasswordMismatch:"Passwords do not match",errorInvalidEmail:"Invalid email address",errorUsernameExists:"Username already exists",errorEmailExists:"Email already in use",errorRegisterFailed:"Registration failed",otpTitle:"Verify Email",otpDescription:"We've sent an OTP code to your email",otpLabel:"OTP Code",otpPlaceholder:"Enter 6-digit OTP code",otpResend:"Resend code",otpResending:"Resending...",otpVerify:"Verify",otpVerifying:"Verifying...",otpErrorInvalid:"Invalid OTP code",otpErrorExpired:"OTP code has expired",otpErrorEmpty:"Please enter OTP code",otpResendSuccess:"OTP code resent",otpResendFailed:"Failed to resend OTP code",otpVerifySuccess:"Verification successful",otpVerifyFailed:"Verification failed",sendingOtp:"Sending OTP code..."
  },forgotPassword: {
    title:"Forgot Password",subtitle:"reset password",emailLabel:"Email",emailPlaceholder:"Enter your email address",submitButton:"Send OTP Code",submitting:"Sending...",backToLogin:"Back to login",errorEmptyEmail:"Please enter email",errorInvalidEmail:"Invalid email address",errorEmailNotFound:"Email not found in system",errorSendOtpFailed:"Failed to send OTP code",otpTitle:"Verify Email",otpDescription:"We've sent an OTP code to your email",otpLabel:"OTP Code",otpPlaceholder:"Enter 6-digit OTP code",otpResend:"Resend code",otpResending:"Resending...",otpVerify:"Verify",otpVerifying:"Verifying...",otpErrorEmpty:"Please enter OTP code",otpErrorInvalid:"Invalid OTP code",otpErrorExpired:"OTP code has expired",otpResendSuccess:"OTP code resent",otpResendFailed:"Failed to resend OTP code",otpVerifySuccess:"Verification successful",otpVerifyFailed:"Verification failed",resetPasswordTitle:"Reset Password",newPasswordLabel:"New Password",newPasswordPlaceholder:"Enter new password",confirmPasswordLabel:"Confirm Password",confirmPasswordPlaceholder:"Re-enter new password",resetButton:"Reset Password",resetting:"Resetting...",errorPasswordMismatch:"Passwords do not match",errorPasswordTooShort:"Password must be at least 6 characters",resetSuccess:"Password reset successful",resetFailed:"Password reset failed"
  },footer: {
    addGame:"Add a Game",friendsChat:"Chat Hỗ Trợ"
  },tutorial: {
    welcome: {
      title:"Welcome to Goslynk!",description:"This is the Store page where you can browse and purchase games. Click 'OK' to continue."
    },library: {
      title:"Your Game Library",description:"Access all your purchased games here. Your library contains all games you've bought or activated."
    },search: {
      title:"Search Games",description:"Use the search bar to find games by name. Type and press Enter or click the search icon."
    },wishlist: {
      title:"Wishlist",description:"Add games to your wishlist to save them for later. Click here to view your wishlist."
    },profile: {
      title:"Your Profile",description:"Access your account settings, view your balance, and manage your profile. Click to open the menu."
    },addGame: {
      title:"Add a Game",description:"Activate a product key to add games to your library. Click here to activate a Steam product code."
    },friendsChat: {
      title:"Chat Support",description:"Chat with friends and admins. Click here to open the chat interface."
    },gameDetail: {
      wishlist: {
        title:"Add to Wishlist",description:"Click here to add this game to your wishlist. You'll be notified when the price changes."
      },addVip: {
        title:"Add VIP Game",description:"If you have VIP or VIP+ subscription, you can add this game directly to your library for free."
      },buyButton: {
        title:"Purchase Game",description:"Click here to add this game to your cart and proceed to checkout."
      }
    },accountDetails: {
      viewHistory: {
        title:"View Purchase History",description:"Click here to see all your past purchases and transactions."
      },storeSettings: {
        title:"Store Settings",description:"Customize your store preferences and language settings."
      },buyVip: {
        title:"Buy/Upgrade VIP",description:"Upgrade to VIP or VIP+ to access exclusive games and features."
      }
    },cartPage: {
      title:"Shopping Cart",description:"View items you've added to your cart. Click here to proceed to checkout.",checkout: {
        title:"Proceed to Checkout",description:"Click here to complete your purchase. Make sure you have enough balance."
      }
    },depositPage: {
      continue: {
        title:"Continue to Payment",description:"Click here to generate a QR code for depositing money into your wallet."
      }
    },wishlistPage: {
      browse: {
        title:"Browse Store",description:"Click here to go back to the store and find more games to add to your wishlist."
      }
    },store: {
      browse: {
        title:"Browse Games",description:"Here you can see all available games. Click on any game card to view details."
      },gameCard: {
        title:"View Game Details",description:"Click on any game card to see more information, screenshots, and purchase options."
      },nsfw: {
        warning:"18+ Content. Please ensure you are 18 years or older. We are not responsible for this content.",ageVerification: {
          title:"SENSITIVE CONTENT WARNING",description:"This area contains games with sensitive images, intended only for adults.",notice:"By continuing, you confirm that you are at least 18 years old and fully accept responsibility for your experience.",cancel:"Go back to safety",confirm:"I am over 18, Continue",error: {
            incomplete:"Please confirm your age to continue.",invalid:"Invalid confirmation.",underage:"You must be 18 years or older to view this content."
          }
        }
      }
    },libraryPage: {
      sidebar: {
        title:"Your Game Library",description:"This sidebar shows all your purchased games. Click on any game to view details."
      },gameCard: {
        title:"Game Details",description:"Click on a game card to view installation options, play the game, or see news and updates."
      }
    },libraryDetail: {
      install: {
        title:"Install Game",description:"Click here to install the game to your computer. You can then play it anytime."
      },store: {
        title:"View on Store",description:"Click here to view this game on the store page with full details and purchase options."
      }
    }
  }
},LH= {
  header: {
    topMenu: {
      friends:"Bạn bè",vipNow:"Nhận VIP ngay",burrspeak:"Thuyết minh"
    },wishlist:"Danh sách ước",cart:"Giỏ hàng",searchPlaceholder:"Tìm kiếm trong cửa hàng",searchResults:"Kết quả tìm kiếm",profileMenu: {
      viewProfile:"Xem hồ sơ của tôi",accountDetailsPrefix:"Chi tiết tài khoản:",storePreferences:"Tùy chỉnh cửa hàng",viewWalletPrefix:"Xem ví của tôi",showTutorial:"Hiển thị Hướng dẫn",signOut:"Đăng xuất khỏi tài khoản…"
    }
  },nav: {
    store:"CỬA HÀNG",library:"THƯ VIỆN",market:"CHỢ"
  },profileMenu: {
    purchaseHistory:"Lịch sử mua hàng"
  },market: {
    title:"Chợ",subtitle:"Mua sản phẩm với giá tốt nhất",searchPlaceholder:"Tìm kiếm sản phẩm...",allCategories:"Tất cả",outOfStock:"Hết hàng",inStock:"Còn {count}",buyNow:"Mua ngay",outOfStockBtn:"Hết hàng",loginRequired:"Vui lòng đăng nhập để mua",purchasedAt:"Ngày mua",category:"Danh mục",featured:"Nổi bật",empty:"Không tìm thấy sản phẩm",loading:"Đang tải...",other:"Khác",buySuccess:"Mua thành công!",buyError:"Mua thất bại",confirmPurchase:"Xác nhận mua hàng",available:"Còn lại",processing:"Đang xử lý...",close:"Đóng",confirmPay:"Thanh toán",emailSent:"Key đã được gửi qua email của bạn"
  },historyOrder: {
    title:"Lịch sử mua hàng",subtitle:"{count} sản phẩm đã mua",emptyTitle:"Chưa có đơn hàng nào",emptyDesc:"Bạn chưa mua gì từ chợ.",copyKey:"Copy key",copied:"Đã copy!",refunded:"Đã hoàn tiền",completed:"Thành công",loading:"Đang tải...",keyViaEmail:"Key đã gửi qua email"
  },accountDetails: {
    breadcrumbHome:"Trang chủ",breadcrumbAccount:"Tài khoản",headerSuffix:"",accountIdLabel:"ID Tài khoản:",storeHistoryTitle:"Lịch sử mua hàng & cửa hàng",walletBalanceLabel:"Số dư ví",contactInfoTitle:"Thông tin liên hệ",emailLabel:"Địa chỉ email:",phoneLabel:"Số điện thoại:",save:"Lưu",cancel:"Hủy",changeEmail:"Thay đổi địa chỉ email",managePhone:"Quản lý số điện thoại",phonePlaceholder:"Nhập số điện thoại",phoneNotSet:"Chưa thiết lập",accountInfoTitle:"Thông tin tài khoản",roleLabel:"Quyền hạn:",emailEmptyError:"Email không được để trống",emailUpdateFail:"Cập nhật email thất bại",emailUpdateSuccess:"Cập nhật email thành công",phoneUpdateFail:"Cập nhật số điện thoại thất bại",phoneUpdateSuccess:"Cập nhật số điện thoại thành công",viewPurchaseHistory:"Xem lịch sử mua hàng",storeLanguageButton:"Ngôn ngữ cửa hàng",vipExpiresAt:"VIP hết hạn:",subscriptionExpiresAt:"Gói đăng ký hết hạn:",vipPermanent:"Vĩnh viễn",buyVip:"Mua VIP",upgradeVip:"Nâng cấp VIP"
  },gameDetail: {
    loading:"Đang tải game…",errorPrefix:"Lỗi",notFound:"Không tìm thấy game.",follow:"Theo dõi",following:"Đang theo dõi",followLoading:"...",inLibrary:"Trong thư viện",inCart:"Trong giỏ hàng",addToCart:"Thêm vào giỏ",alreadyOwned:"Đã mua",releaseDate:"Ngày phát hành:",developer:"Nhà phát triển:",publisher:"Nhà phát hành:",specialPromotion:"KHUYẾN MÃI ĐẶC BIỆT! Ưu đãi có thể kết thúc sớm.",free:"MIỄN PHÍ",aboutThisGame:"GIỚI THIỆU GAME NÀY",addedToCartTitle:"Đã thêm vào giỏ hàng!",continueShopping:"Tiếp tục mua sắm",viewMyCart:"Xem giỏ hàng",previous:"Trước",next:"Sau",addGameSuccess:"Đã thêm game vào thư viện",addGameError:"Không thể thêm game",addGameFailed:"Lỗi khi thêm game",addingGame:"Đang thêm...",addGameVip:"Thêm game VIP/VIP+",addGameVipPlus:"Thêm game VIP+",vipRequired:"Yêu cầu tài khoản VIP",vipRequiredMessage:"Tính năng này chỉ dành cho tài khoản VIP hoặc VIP+",vipPlusRequiredMessage:"Game này chỉ dành cho tài khoản VIP+",vipUpgradeMessage:"Vui lòng nâng cấp tài khoản để sử dụng tính năng này.",upgradeAccount:"Nâng cấp tài khoản",close:"Đóng",buy:"Mua",backToStore:"Quay lại cửa hàng"
  },storeSetting: {
    title:"Tùy chỉnh cửa hàng",languageTitle:"Ngôn ngữ",languageDescription:"Chọn ngôn ngữ hiển thị nội dung và giao diện cửa hàng.",englishLabel:"Tiếng Anh",vietnameseLabel:"Tiếng Việt"
  },cart: {
    breadcrumbHome:"Trang chủ",breadcrumbCart:"Giỏ hàng của bạn",title:"Giỏ hàng của bạn",emptyText:"Giỏ hàng của bạn đang trống.",emptyBrowse:"Tiếp tục mua sắm",remove:"Xóa",includesPrefix:"Bao gồm",includesSuffix:"mục:",continueShopping:"Tiếp tục mua sắm",removeAll:"Xóa tất cả",estimatedTotal:"Tổng tạm tính",zeroTotal:"0 G",taxNote:"Thuế (nếu có) sẽ được tính ở bước thanh toán.",continueToPayment:"Mua ngay",summaryLegal:"Việc mua sản phẩm số sẽ cấp giấy phép sử dụng sản phẩm trên Goslynk. Xem đầy đủ điều khoản trong Thỏa thuận người dùng Goslynk."
  },deposit: {
    breadcrumbAccount:"Tài khoản",breadcrumbWallet:"Ví",title:"Nạp ví Goslynk",selectAmount:"Chọn số G-points cần nạp",customLabel:"Hoặc nhập số G-points tùy chọn",customPlaceholder:"vd. 150000",customNote:"Tỉ lệ Quy Đổi : 1000.Đ = 1000.G",paymentMethodTitle:"Phương thức thanh toán",paymentMbName:"MB Bank",paymentMbDesc:"Chuyển khoản qua ngân hàng Quân đội (MB Bank).",selectedAmountTitle:"Số G-points đã chọn",noAmountSelected:"Chưa chọn số G-points",note:"Số G-points nạp vào ví Goslynk có thể dùng để quy đổi các sản phẩm có trên cửa hàng.",continue:"Tiếp tục",demoAlert:"Đây chỉ là trang test tính năng thanh toán chưa được triển khai.",qrTitle:"Quét mã VietQR để thanh toán",qrBankLabel:"Ngân hàng",qrAccountLabel:"Số tài khoản",qrAmountLabel:"Số tiền",qrDescriptionLabel:"Nội dung chuyển khoản",qrDescriptionPrefix:"NAP",qrCopy:"Sao chép link QR",qrCopySuccess:"Đã sao chép link QR",qrCopyFail:"Không thể sao chép link, vui lòng thử lại.",qrOpenImage:"Mở ảnh QR",qrClose:"Đóng",showDepositCode:"Hiện mã nạp",creating:"Đang tạo mã...",scanErrorTitle:"Không thể tạo mã nạp",scanErrorOk:"Đã hiểu",scanIdleHint:"Bấm Hiện mã nạp khi bạn sẵn sàng chuyển khoản. QR và mã sẽ hiện sau đó.",depositCodeLabel:"Nội dung chuyển khoản",copyDepositCode:"Sao chép mã",copyCodeSuccess:"Đã sao chép mã nạp",copyCodeFail:"Không thể sao chép mã, thử lại.",graceCountdown:"Bắt đầu kiểm tra sau {{s}}s, quét QR để nạp G point",pollingActive:"Đang kiểm tra giao dịch tự động...",checkTransferred:"Đã chuyển, kiểm tra",checking:"Đang kiểm tra...",qrNote:"Quét mã bằng ứng dụng ngân hàng để hoàn tất thanh toán."
  },wishlist: {
    title:"Danh sách ước",loading:"Đang tải…",errorPrefix:"Lỗi",countSingle:"game",countMultiple:"game",emptyText:"Danh sách ước của bạn đang trống.",browseStore:"Xem cửa hàng",free:"MIỄN PHÍ",remove:"Xóa"
  },complete: {
    breadcrumbComplete:"Hoàn tất",purchaseTitle:"Mua game thành công",purchaseMessage:"Game của bạn đã được thêm vào thư viện và sẵn sàng để chơi.",depositTitle:"Nạp tiền thành công",depositMessage:"Số tiền đã được cộng vào ví Goslynk của bạn.",backToStore:"Quay lại cửa hàng",goToLibrary:"Tới thư viện",thankYouTab:"Cảm ơn",receiptTitle:"Biên nhận giao dịch",receiptDescription:"Xác nhận giao dịch của bạn được hiển thị bên dưới. Thông tin này cũng sẽ được gửi qua email cho bạn.",accountNameLabel:"Tên tài khoản",totalLabel:"Tổng cộng",confirmationCodeLabel:"Mã xác nhận",assistTitle:"Cần hỗ trợ?",assistDescription:"Nếu cần trợ giúp hoặc hỗ trợ sản phẩm, vui lòng truy cập Goslynk Support online.",returnToStore:"Quay lại cửa hàng",printReceipt:"In biên nhận"
  },library: {
    home:"Trang chủ",back:"Quay lại",gamesAndSoftware:"Trò chơi và phần mềm",allGamesSection:"TẤT CẢ GAME",allGamesTitle:"Tất cả game",loading:"Đang tải…",empty:"Bạn chưa có game nào trong thư viện.",buyTag:"Mua",loadMore:"Xem thêm",searchPlaceholder:"Tìm kiếm game...",failedToLoad:"Không thể tải thư viện"
  },libraryDetail: {
    installButton:"CÀI ĐẶT",storePage:"Trang cửa hàng",dlc:"DLC",communityHub:"Cộng đồng",discussions:"Thảo luận",guides:"Hướng dẫn",support:"Hỗ trợ",featured:"NỔI BẬT",viewAll:"Xem tất cả",showLess:"Thu gọn",loadingNews:"Đang tải tin tức...",news:"TIN TỨC",noFeaturedContent:"Không có nội dung nổi bật",activity:"HOẠT ĐỘNG",activityPlaceholder:"Nói gì đó về game này với bạn bè của bạn...",loadingContent:"Đang tải nội dung...",viewOnSteam:"Xem trên Steam Community",rateUp:"Đánh giá tích cực",rateDown:"Đánh giá tiêu cực",discuss:"Thảo luận",share:"Chia sẻ",posted:"ĐĂNG",months:["THÁNG 1","THÁNG 2","THÁNG 3","THÁNG 4","THÁNG 5","THÁNG 6","THÁNG 7","THÁNG 8","THÁNG 9","THÁNG 10","THÁNG 11","THÁNG 12"],monthsFull:["Tháng 1","Tháng 2","Tháng 3","Tháng 4","Tháng 5","Tháng 6","Tháng 7","Tháng 8","Tháng 9","Tháng 10","Tháng 11","Tháng 12"],days:["CN","T2","T3","T4","T5","T6","T7"],installationNotAvailable:"Installation chỉ khả dụng trên ứng dụng (Windows). Vui lòng sử dụng phiên bản desktop.",exeNotFound:"Không tìm thấy file .exe sau khi cài. Vui lòng thử lại.",installationCompleted:"Installation completed successfully",installationFailed:"Installation failed",playNotAvailable:"Play chỉ khả dụng trên ứng dụng (Windows). Vui lòng sử dụng phiên bản desktop.",gameNotInstalled:"Game chưa được cài đặt. Vui lòng cài đặt game trước.",exeNotFoundPlay:"Game executable not found. Please install the game first.",launchFailed:"Failed to launch game",launchSuccess:"Khởi chạy game thành công",onlineNotAvailable:"Online chỉ khả dụng trên ứng dụng Tauri (Windows). Vui lòng sử dụng phiên bản desktop.",onlineFixApplied:"Online fix applied successfully",onlineFixFailed:"Online fix failed",vipExpired:"VIP EXPIRED",vipExpiredTooltip:"Game VIP đã hết hạn. Vui lòng gia hạn VIP để tiếp tục sử dụng.",desktopOnly:"Chỉ khả dụng trên ứng dụng desktop",vipExpiredTooltipShort:"Game VIP đã hết hạn",needVipToInstall:"Bạn cần có VIP/VIP+ hoặc sở hữu game để cài đặt",updating:"Updating...",installing:"Installing...",update:"UPDATE",install:"INSTALL",launching:"Launching...",playing:"Playing",play:"PLAY",downloading:"Downloading...",online:"ONLINE"
  },friendsChat: {
    title:"Bạn bè & Trò chuyện",back:"Quay lại",connecting:"Đang kết nối...",loading:"Đang tải tin nhắn...",noMessages:"Chưa có tin nhắn",startConversation:"Bắt đầu trò chuyện với admin",typeMessage:"Nhập tin nhắn...",typeMessageToAdmin:"Nhập tin nhắn cho Admin...",send:"Gửi",selectPeer:"Chọn người dùng để trò chuyện",engagedBy:"Đang được hỗ trợ bởi",engage:"Hỗ trợ",disengage:"Ngừng hỗ trợ",admin:"Admin",directMessages:"Tin nhắn trực tiếp",online:"Trực tuyến",attachments:"Đính kèm",override:"Giành quyền",processingBy:"Đang được {admin} xử lý",youProcessing:"Bạn đang xử lý",spamWarning:"Vui lòng đợi 1 giây trước khi nhắn tiếp.",loadingOlder:"Đang tải tin cũ...",selectUserToView:"Chọn 1 user để xem tin nhắn",noConversation:"Chưa có cuộc hội thoại.",user:"Người dùng",searchPlaceholder:"Tìm user / ID...",filterAllRoles:"Tất cả role",roleUser:"User",roleVip:"VIP",roleVipPlus:"VIP+",roleNetflix:"Netflix",saveFileTitle:"Lưu file",downloadSuccess:"Đã lưu file",downloadCancelled:"Đã hủy lưu file",downloadFailed:"Lưu file thất bại",uploadFailed:"Tải file lên thất bại. Vui lòng thử lại.",messageActionFailed:"Thao tác với tin nhắn thất bại. Vui lòng thử lại."
  },vipPurchase: {
    title:"Mua VIP",upgradeTitle:"Nâng cấp VIP",vipPackages:"Gói VIP",vipPlusPackages:"Gói VIP Plus",upgradePackages:"Gói nâng cấp VIP+",days:"ngày",buyNow:"Mua ngay",upgradeNow:"Nâng cấp ngay",processing:"Đang xử lý...",noPackages:"Không có gói VIP nào khả dụng",loginRequired:"Vui lòng đăng nhập để mua VIP",purchaseFailed:"Mua VIP thất bại",purchaseSuccess:"Mua gói VIP thành công!",features:"Tính năng",upgradePrice:"Giá nâng cấp",originalPrice:"Giá gốc"
  },login: {
    subtitle:"đăng nhập",usernameLabel:"Tên đăng nhập",usernamePlaceholder:"Nhập tên đăng nhập",passwordLabel:"Mật khẩu",passwordPlaceholder:"Nhập mật khẩu",rememberMe:"Ghi nhớ đăng nhập",forgotPassword:"Quên mật khẩu?",submitButton:"Đăng nhập",submitting:"Đang đăng nhập...",noAccount:"Chưa có tài khoản?",signUp:"Đăng ký ngay",errorEmptyFields:"Vui lòng nhập tên đăng nhập và mật khẩu",errorLoginFailed:"Đăng nhập thất bại"
  },register: {
    subtitle:"đăng ký",usernameLabel:"Tên đăng nhập",usernamePlaceholder:"Nhập tên đăng nhập",emailLabel:"Email",emailPlaceholder:"Nhập địa chỉ email",passwordLabel:"Mật khẩu",passwordPlaceholder:"Nhập mật khẩu",confirmPasswordLabel:"Xác nhận mật khẩu",confirmPasswordPlaceholder:"Nhập lại mật khẩu",submitButton:"Đăng ký",submitting:"Đang đăng ký...",hasAccount:"Đã có tài khoản?",signIn:"Đăng nhập ngay",errorEmptyFields:"Vui lòng điền đầy đủ thông tin",errorPasswordMismatch:"Mật khẩu không khớp",errorInvalidEmail:"Email không hợp lệ",errorUsernameExists:"Tên đăng nhập đã tồn tại",errorEmailExists:"Email đã được sử dụng",errorRegisterFailed:"Đăng ký thất bại",otpTitle:"Xác thực Email",otpDescription:"Chúng tôi đã gửi mã OTP đến email của bạn",otpLabel:"Mã OTP",otpPlaceholder:"Nhập mã OTP 6 chữ số",otpResend:"Gửi lại mã",otpResending:"Đang gửi lại...",otpVerify:"Xác thực",otpVerifying:"Đang xác thực...",otpErrorInvalid:"Mã OTP không hợp lệ",otpErrorExpired:"Mã OTP đã hết hạn",otpErrorEmpty:"Vui lòng nhập mã OTP",otpResendSuccess:"Đã gửi lại mã OTP",otpResendFailed:"Không thể gửi lại mã OTP",otpVerifySuccess:"Xác thực thành công",otpVerifyFailed:"Xác thực thất bại",sendingOtp:"Đang gửi mã OTP..."
  },forgotPassword: {
    title:"Quên mật khẩu",subtitle:"khôi phục mật khẩu",emailLabel:"Email",emailPlaceholder:"Nhập địa chỉ email của bạn",submitButton:"Gửi mã OTP",submitting:"Đang gửi...",backToLogin:"Quay lại đăng nhập",errorEmptyEmail:"Vui lòng nhập email",errorInvalidEmail:"Email không hợp lệ",errorEmailNotFound:"Email không tồn tại trong hệ thống",errorSendOtpFailed:"Không thể gửi mã OTP",otpTitle:"Xác thực Email",otpDescription:"Chúng tôi đã gửi mã OTP đến email của bạn",otpLabel:"Mã OTP",otpPlaceholder:"Nhập mã OTP 6 chữ số",otpResend:"Gửi lại mã",otpResending:"Đang gửi lại...",otpVerify:"Xác thực",otpVerifying:"Đang xác thực...",otpErrorEmpty:"Vui lòng nhập mã OTP",otpErrorInvalid:"Mã OTP không hợp lệ",otpErrorExpired:"Mã OTP đã hết hạn",otpResendSuccess:"Đã gửi lại mã OTP",otpResendFailed:"Không thể gửi lại mã OTP",otpVerifySuccess:"Xác thực thành công",otpVerifyFailed:"Xác thực thất bại",resetPasswordTitle:"Đặt lại mật khẩu",newPasswordLabel:"Mật khẩu mới",newPasswordPlaceholder:"Nhập mật khẩu mới",confirmPasswordLabel:"Xác nhận mật khẩu",confirmPasswordPlaceholder:"Nhập lại mật khẩu mới",resetButton:"Đặt lại mật khẩu",resetting:"Đang đặt lại...",errorPasswordMismatch:"Mật khẩu không khớp",errorPasswordTooShort:"Mật khẩu phải có ít nhất 6 ký tự",resetSuccess:"Đặt lại mật khẩu thành công",resetFailed:"Đặt lại mật khẩu thất bại"
  },footer: {
    addGame:"Thêm game",friendsChat:"Chat Hỗ Trợ"
  },tutorial: {
    welcome: {
      title:"Chào mừng đến với Goslynk!",description:"Đây là trang Cửa hàng nơi bạn có thể duyệt và mua game. Nhấn 'OK' để tiếp tục."
    },library: {
      title:"Thư viện Game của bạn",description:"Truy cập tất cả các game bạn đã mua tại đây. Thư viện chứa tất cả game bạn đã mua hoặc kích hoạt."
    },search: {
      title:"Tìm kiếm Game",description:"Sử dụng thanh tìm kiếm để tìm game theo tên. Gõ và nhấn Enter hoặc nhấn vào biểu tượng tìm kiếm."
    },wishlist: {
      title:"Danh sách ước",description:"Thêm game vào danh sách ước để lưu lại sau. Nhấn vào đây để xem danh sách ước của bạn."
    },profile: {
      title:"Hồ sơ của bạn",description:"Truy cập cài đặt tài khoản, xem số dư và quản lý hồ sơ của bạn. Nhấn để mở menu."
    },addGame: {
      title:"Thêm Game",description:"Kích hoạt mã sản phẩm để thêm game vào thư viện của bạn. Nhấn vào đây để kích hoạt mã sản phẩm Steam."
    },friendsChat: {
      title:"Chat Hỗ Trợ",description:"Trò chuyện với bạn bè và quản trị viên. Nhấn vào đây để mở giao diện trò chuyện."
    },gameDetail: {
      wishlist: {
        title:"Thêm vào Danh sách ước",description:"Nhấn vào đây để thêm game này vào danh sách ước. Bạn sẽ được thông báo khi giá thay đổi."
      },addVip: {
        title:"Thêm Game VIP",description:"Nếu bạn có gói VIP hoặc VIP+, bạn có thể thêm game này trực tiếp vào thư viện miễn phí."
      },buyButton: {
        title:"Mua Game",description:"Nhấn vào đây để thêm game này vào giỏ hàng và tiến hành thanh toán."
      }
    },accountDetails: {
      viewHistory: {
        title:"Xem Lịch sử Mua hàng",description:"Nhấn vào đây để xem tất cả các giao dịch và mua hàng trước đây của bạn."
      },storeSettings: {
        title:"Cài đặt Cửa hàng",description:"Tùy chỉnh tùy chọn cửa hàng và cài đặt ngôn ngữ."
      },buyVip: {
        title:"Mua/Nâng cấp VIP",description:"Nâng cấp lên VIP hoặc VIP+ để truy cập các game và tính năng độc quyền."
      }
    },cartPage: {
      title:"Giỏ hàng",description:"Xem các mục bạn đã thêm vào giỏ hàng. Nhấn vào đây để tiến hành thanh toán.",checkout: {
        title:"Tiến hành Thanh toán",description:"Nhấn vào đây để hoàn tất mua hàng. Đảm bảo bạn có đủ số dư."
      }
    },depositPage: {
      continue: {
        title:"Tiếp tục Thanh toán",description:"Nhấn vào đây để tạo mã QR để nạp tiền vào ví của bạn."
      }
    },wishlistPage: {
      browse: {
        title:"Duyệt Cửa hàng",description:"Nhấn vào đây để quay lại cửa hàng và tìm thêm game để thêm vào danh sách ước."
      }
    },store: {
      browse: {
        title:"Duyệt Game",description:"Tại đây bạn có thể xem tất cả các game có sẵn. Nhấn vào bất kỳ thẻ game nào để xem chi tiết."
      },gameCard: {
        title:"Xem Chi tiết Game",description:"Nhấn vào bất kỳ thẻ game nào để xem thông tin, hình ảnh và tùy chọn mua hàng."
      },nsfw: {
        warning:"Nội dung 18+. Hãy chắc rằng bạn đã đủ 18 tuổi. Chúng tôi không chịu trách nhiệm về nội dung này.",ageVerification: {
          title:"CẢNH BÁO NỘI DUNG NHẠY CẢM",description:"Khu vực này chứa các tựa game nhạy cảm chỉ dành cho người lớn.",notice:"Bằng việc nhấn tiếp tục, bạn xác nhận mình đã đủ 18 tuổi và hoàn toàn tự chịu trách nhiệm với trải nghiệm của mình.",cancel:"Quay lại an toàn",confirm:"Tôi đã đủ 18 tuổi, Tiếp tục",error: {
            incomplete:"Vui lòng xác nhận độ tuổi của bạn.",invalid:"Thông tin xác nhận không hợp lệ.",underage:"Bạn chưa đủ 18 tuổi để xem nội dung này."
          }
        }
      }
    },libraryPage: {
      sidebar: {
        title:"Thư viện Game của bạn",description:"Sidebar này hiển thị tất cả các game bạn đã mua. Nhấn vào bất kỳ game nào để xem chi tiết."
      },gameCard: {
        title:"Chi tiết Game",description:"Nhấn vào thẻ game để xem tùy chọn cài đặt, chơi game hoặc xem tin tức và cập nhật."
      }
    },libraryDetail: {
      install: {
        title:"Cài đặt Game",description:"Nhấn vào đây để cài đặt game vào máy tính của bạn. Sau đó bạn có thể chơi bất cứ lúc nào."
      },store: {
        title:"Xem trên Cửa hàng",description:"Nhấn vào đây để xem game này trên trang cửa hàng với đầy đủ chi tiết và tùy chọn mua hàng."
      }
    }
  }
},Hp= {
  en:_H,vi:LH
},A4=g.createContext(void 0);
function MH(n,e,t) {
  const i=e.split(".");
  let r=Hp[n];
  for(const a of i)if(r&&typeof r=="object"&&a in r)r=r[a];
  else return e;
  let s=typeof r=="string"?r:e;
  if(t)for(const[a,o]of Object.entries(t))s=s.replace(new RegExp(`\\{${a}\\}`,"g"),String(o));
  return s
}
function AH( {
  children:n
}) {
  const {
    sessionId:e
  }
  =nn(),[t,i]=g.useState("vi"),[r,s]=g.useState(!0);
  g.useEffect(()=> {
    (async()=> {
      var d;
      if(!e) {
        i("vi"),s(!1);
        return
      }
      try {
        const u=await fetch(`${Se}/user/settings?sessionId=${e}`, {
          headers: {
            Authorization:`Bearer ${e}`
          }
        });
        if(u.ok) {
          const f=await u.json(),h=(d=f==null?void 0:f.settings)==null?void 0:d.storeLanguage;
          i(h==="vi"||h==="en"?h:"vi")
        }
        else i("vi")
      }
      catch {
        i("vi")
      }
      finally {
        s(!1)
      }
    })()
  },[e]);
  const o= {
    language:t,t:(c,d)=>MH(t,c,d),setLanguage:async c=> {
      if(i(c),!!e)try {
        await fetch(`${Se}/user/settings`, {
          method:"PUT",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${e}`
          },body:JSON.stringify( {
            sessionId:e,settings: {
              storeLanguage:c
            }
          })
        })
      }
      catch{}
    },loading:r
  };
  return l.jsx(A4.Provider, {
    value:o,children:n
  })
}
function ni() {
  const n=g.useContext(A4);
  if(!n)throw new Error("useLanguage must be used within a LanguageProvider");
  return n
}
function NH( {
  toast:n,onRemove:e
}) {
  const[t,i]=g.useState(!1),[r,s]=g.useState(!1);
  g.useEffect(()=> {
    setTimeout(()=>i(!0),10);
    const c=n.duration??3e3,d=setTimeout(()=> {
      a()
    },c);
    return()=>clearTimeout(d)
  },[n.duration,n.id]);
  const a=()=> {
    r||(s(!0),setTimeout(()=> {
      e(n.id)
    },300))
  },o=()=> {
    switch(n.type) {
      case"success":return"✓";
      case"error":return"✕";
      case"warning":return"⚠";
      case"info":return"ℹ";
      default:return""
    }
  };
  return l.jsxs("div", {
    className:`toast toast-${n.type} ${t?"toast-visible":""} ${r?"toast-removing":""}`,onClick:a,children:[l.jsx("div", {
      className:"toast-icon",children:o()
    }),l.jsx("div", {
      className:"toast-message",children:n.message
    }),l.jsx("button", {
      className:"toast-close",onClick:c=> {
        c.stopPropagation(),a()
      },children:"×"
    })]
  })
}
function RH( {
  toasts:n,onRemove:e
}) {
  return l.jsx("div", {
    className:"toast-container",children:n.map(t=>l.jsx(NH, {
      toast:t,onRemove:e
    },t.id))
  })
}
const N4=g.createContext(void 0);
function jH( {
  children:n
}) {
  const[e,t]=g.useState([]),i=g.useCallback(d=> {
    t(u=>u.filter(f=>f.id!==d))
  },[]),r=g.useCallback((d,u="info",f)=> {
    const m= {
      id:`toast-${Date.now()}-${Math.random()}`,message:d,type:u,duration:f
    };
    t(p=>[...p,m])
  },[]),s=g.useCallback((d,u)=> {
    r(d,"success",u)
  },[r]),a=g.useCallback((d,u)=> {
    r(d,"error",u)
  },[r]),o=g.useCallback((d,u)=> {
    r(d,"warning",u)
  },[r]),c=g.useCallback((d,u)=> {
    r(d,"info",u)
  },[r]);
  return l.jsxs(N4.Provider, {
    value: {
      showToast:r,showSuccess:s,showError:a,showWarning:o,showInfo:c
    },children:[n,l.jsx(RH, {
      toasts:e,onRemove:i
    })]
  })
}
function Ka() {
  const n=g.useContext(N4);
  if(!n)throw new Error("useToast must be used within ToastProvider");
  return n
}
const R4=g.createContext(void 0);
function PH( {
  children:n
}) {
  const[e,t]=g.useState(!1),[i,r]=g.useState(0),[s,a]=g.useState([]);
  oi();
  const {
    sessionId:o,user:c,checkAuth:d
  }
  =nn(),u=y=> {
    a(y),r(0),t(!0)
  },f=()=> {
    i<s.length-1&&r(y=>y+1)
  },h=()=> {
    i>0&&r(y=>y-1)
  },m=async(y,v)=> {
    const b=s[s.length-1],w=y||(b==null?void 0:b.tutorialKey);
    if(v||(b==null||b.navigateTo),t(!1),r(0),a([]),w&&o)try {
      await(await fetch(`${Se}/tutorial/complete`, {
        method:"POST",headers: {
          "Content-Type":"application/json",Authorization:`Bearer ${o}`
        },body:JSON.stringify( {
          tutorialKey:w
        })
      })).json(),d&&setTimeout(()=> {
        d()
      },300)
    }
    catch{}
  },p=()=> {
    t(!1),r(0),a([])
  };
  return l.jsx(R4.Provider, {
    value: {
      isActive:e,currentStep:i,steps:s,startTutorial:u,nextStep:f,prevStep:h,completeTutorial:m,resetTutorial:p
    },children:n
  })
}
function la() {
  const n=g.useContext(R4);
  if(n===void 0)throw new Error("useTutorial must be used within a TutorialProvider");
  return n
}
const j4=g.createContext(null);
function DH( {
  children:n
}) {
  const[e,t]=g.useState(!1),i=g.useCallback(()=> {
    t(!0)
  },[]),r=g.useCallback(()=> {
    t(!1)
  },[]);
  return l.jsx(j4.Provider, {
    value: {
      isCartOverlayOpen:e,openCartOverlay:i,closeCartOverlay:r
    },children:n
  })
}
function Sy() {
  const n=g.useContext(j4);
  if(!n)throw new Error("useCartOverlay must be used within CartOverlayProvider");
  return n
}
const P4=g.createContext(null);
function OH( {
  children:n
}) {
  const {
    showSuccess:e
  }
  =Ka(),[t,i]=g.useState( {
    isDownloading:!1,progress:0,statusText:"",gameId:null,gameName:null
  }),r=g.useRef(null),s=g.useRef(!1),a=g.useRef(!1),o=g.useRef(null),c=g.useRef(null),d=zn(),u=g.useCallback(m=> {
    a.current||(a.current=!0,s.current=!0,e(m?`Đã tải và giải nén xong: ${m}`:"Secondary Download hoàn tất!"),i( {
      isDownloading:!1,progress:0,statusText:"",gameId:null,gameName:null
    }))
  },[e]);
  g.useEffect(()=> {
    if(d&&!(!t.isDownloading||!t.gameId))return s.current=!1,(async()=> {
      try {
        const m=await _i("secondary-download-progress",p=> {
          if(s.current)return;
          const y=(p==null?void 0:p.payload)||{};
          if(String(y.appid||"")!==String(o.current))return;
          const v=Number(y.percent??0);
          i(b=>( {
            ...b,progress:Number.isNaN(v)?b.progress:Math.max(0,Math.min(100,v)),statusText:typeof y.statusText=="string"?y.statusText:b.statusText
          })),y.phase==="success"&&u(c.current)
        });
        r.current=m
      }
      catch{}
    })(),()=> {
      var m;
      try {
        (m=r.current)==null||m.call(r)
      }
      catch{}
    }
  },[d,t.isDownloading,t.gameId,u]);
  const f=async(m,p,y)=> {
    if(!t.isDownloading) {
      a.current=!1,s.current=!1,o.current=m,c.current=p,i( {
        isDownloading:!0,progress:0,statusText:"Đang chuẩn bị...",gameId:m,gameName:p
      });
      try {
        const v=await oe("find_game_install_dir", {
          appId:m,gameName:p
        });
        if(!v)throw new Error("Không tìm được thư mục game.");
        await oe("download_and_extract_secondary", {
          appid:m,downloadUrl:y,gamePath:v
        }),u(p)
      }
      catch(v) {
        const b=v instanceof Error?v.message:String(v);
        throw a.current=!1,o.current=null,c.current=null,i( {
          isDownloading:!1,progress:0,statusText:"",gameId:null,gameName:null
        }),new Error(b)
      }
    }
  },h=()=> {
    var m;
    s.current=!0,a.current=!1;
    try {
      (m=r.current)==null||m.call(r)
    }
    catch{}o.current=null,c.current=null,i( {
      isDownloading:!1,progress:0,statusText:"",gameId:null,gameName:null
    })
  };
  return l.jsx(P4.Provider, {
    value: {
      downloadState:t,startSecondaryDownload:f,cancelDownload:h
    },children:n
  })
}
function D4() {
  const n=g.useContext(P4);
  if(!n)throw new Error("useDownload must be used inside DownloadProvider");
  return n
}
function Rg(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 384 512"
    },child:[ {
      tag:"path",attr: {
        d:"M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      },child:[]
    }
    ]
  })(n)
}
function jg(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M220.8 123.3c1 .5 1.8 1.7 3 1.7 1.1 0 2.8-.4 2.9-1.5.2-1.4-1.9-2.3-3.2-2.9-1.7-.7-3.9-1-5.5-.1-.4.2-.8.7-.6 1.1.3 1.3 2.3 1.1 3.4 1.7zm-21.9 1.7c1.2 0 2-1.2 3-1.7 1.1-.6 3.1-.4 3.5-1.6.2-.4-.2-.9-.6-1.1-1.6-.9-3.8-.6-5.5.1-1.3.6-3.4 1.5-3.2 2.9.1 1 1.8 1.5 2.8 1.4zM420 403.8c-3.6-4-5.3-11.6-7.2-19.7-1.8-8.1-3.9-16.8-10.5-22.4-1.3-1.1-2.6-2.1-4-2.9-1.3-.8-2.7-1.5-4.1-2 9.2-27.3 5.6-54.5-3.7-79.1-11.4-30.1-31.3-56.4-46.5-74.4-17.1-21.5-33.7-41.9-33.4-72C311.1 85.4 315.7.1 234.8 0 132.4-.2 158 103.4 156.9 135.2c-1.7 23.4-6.4 41.8-22.5 64.7-18.9 22.5-45.5 58.8-58.1 96.7-6 17.9-8.8 36.1-6.2 53.3-6.5 5.8-11.4 14.7-16.6 20.2-4.2 4.3-10.3 5.9-17 8.3s-14 6-18.5 14.5c-2.1 3.9-2.8 8.1-2.8 12.4 0 3.9.6 7.9 1.2 11.8 1.2 8.1 2.5 15.7.8 20.8-5.2 14.4-5.9 24.4-2.2 31.7 3.8 7.3 11.4 10.5 20.1 12.3 17.3 3.6 40.8 2.7 59.3 12.5 19.8 10.4 39.9 14.1 55.9 10.4 11.6-2.6 21.1-9.6 25.9-20.2 12.5-.1 26.3-5.4 48.3-6.6 14.9-1.2 33.6 5.3 55.1 4.1.6 2.3 1.4 4.6 2.5 6.7v.1c8.3 16.7 23.8 24.3 40.3 23 16.6-1.3 34.1-11 48.3-27.9 13.6-16.4 36-23.2 50.9-32.2 7.4-4.5 13.4-10.1 13.9-18.3.4-8.2-4.4-17.3-15.5-29.7zM223.7 87.3c9.8-22.2 34.2-21.8 44-.4 6.5 14.2 3.6 30.9-4.3 40.4-1.6-.8-5.9-2.6-12.6-4.9 1.1-1.2 3.1-2.7 3.9-4.6 4.8-11.8-.2-27-9.1-27.3-7.3-.5-13.9 10.8-11.8 23-4.1-2-9.4-3.5-13-4.4-1-6.9-.3-14.6 2.9-21.8zM183 75.8c10.1 0 20.8 14.2 19.1 33.5-3.5 1-7.1 2.5-10.2 4.6 1.2-8.9-3.3-20.1-9.6-19.6-8.4.7-9.8 21.2-1.8 28.1 1 .8 1.9-.2-5.9 5.5-15.6-14.6-10.5-52.1 8.4-52.1zm-13.6 60.7c6.2-4.6 13.6-10 14.1-10.5 4.7-4.4 13.5-14.2 27.9-14.2 7.1 0 15.6 2.3 25.9 8.9 6.3 4.1 11.3 4.4 22.6 9.3 8.4 3.5 13.7 9.7 10.5 18.2-2.6 7.1-11 14.4-22.7 18.1-11.1 3.6-19.8 16-38.2 14.9-3.9-.2-7-1-9.6-2.1-8-3.5-12.2-10.4-20-15-8.6-4.8-13.2-10.4-14.7-15.3-1.4-4.9 0-9 4.2-12.3zm3.3 334c-2.7 35.1-43.9 34.4-75.3 18-29.9-15.8-68.6-6.5-76.5-21.9-2.4-4.7-2.4-12.7 2.6-26.4v-.2c2.4-7.6.6-16-.6-23.9-1.2-7.8-1.8-15 .9-20 3.5-6.7 8.5-9.1 14.8-11.3 10.3-3.7 11.8-3.4 19.6-9.9 5.5-5.7 9.5-12.9 14.3-18 5.1-5.5 10-8.1 17.7-6.9 8.1 1.2 15.1 6.8 21.9 16l19.6 35.6c9.5 19.9 43.1 48.4 41 68.9zm-1.4-25.9c-4.1-6.6-9.6-13.6-14.4-19.6 7.1 0 14.2-2.2 16.7-8.9 2.3-6.2 0-14.9-7.4-24.9-13.5-18.2-38.3-32.5-38.3-32.5-13.5-8.4-21.1-18.7-24.6-29.9s-3-23.3-.3-35.2c5.2-22.9 18.6-45.2 27.2-59.2 2.3-1.7.8 3.2-8.7 20.8-8.5 16.1-24.4 53.3-2.6 82.4.6-20.7 5.5-41.8 13.8-61.5 12-27.4 37.3-74.9 39.3-112.7 1.1.8 4.6 3.2 6.2 4.1 4.6 2.7 8.1 6.7 12.6 10.3 12.4 10 28.5 9.2 42.4 1.2 6.2-3.5 11.2-7.5 15.9-9 9.9-3.1 17.8-8.6 22.3-15 7.7 30.4 25.7 74.3 37.2 95.7 6.1 11.4 18.3 35.5 23.6 64.6 3.3-.1 7 .4 10.9 1.4 13.8-35.7-11.7-74.2-23.3-84.9-4.7-4.6-4.9-6.6-2.6-6.5 12.6 11.2 29.2 33.7 35.2 59 2.8 11.6 3.3 23.7.4 35.7 16.4 6.8 35.9 17.9 30.7 34.8-2.2-.1-3.2 0-4.2 0 3.2-10.1-3.9-17.6-22.8-26.1-19.6-8.6-36-8.6-38.3 12.5-12.1 4.2-18.3 14.7-21.4 27.3-2.8 11.2-3.6 24.7-4.4 39.9-.5 7.7-3.6 18-6.8 29-32.1 22.9-76.7 32.9-114.3 7.2zm257.4-11.5c-.9 16.8-41.2 19.9-63.2 46.5-13.2 15.7-29.4 24.4-43.6 25.5s-26.5-4.8-33.7-19.3c-4.7-11.1-2.4-23.1 1.1-36.3 3.7-14.2 9.2-28.8 9.9-40.6.8-15.2 1.7-28.5 4.2-38.7 2.6-10.3 6.6-17.2 13.7-21.1.3-.2.7-.3 1-.5.8 13.2 7.3 26.6 18.8 29.5 12.6 3.3 30.7-7.5 38.4-16.3 9-.3 15.7-.9 22.6 5.1 9.9 8.5 7.1 30.3 17.1 41.6 10.6 11.6 14 19.5 13.7 24.6zM173.3 148.7c2 1.9 4.7 4.5 8 7.1 6.6 5.2 15.8 10.6 27.3 10.6 11.6 0 22.5-5.9 31.8-10.8 4.9-2.6 10.9-7 14.8-10.4s5.9-6.3 3.1-6.6-2.6 2.6-6 5.1c-4.4 3.2-9.7 7.4-13.9 9.8-7.4 4.2-19.5 10.2-29.9 10.2s-18.7-4.8-24.9-9.7c-3.1-2.5-5.7-5-7.7-6.9-1.5-1.4-1.9-4.6-4.3-4.9-1.4-.1-1.8 3.7 1.7 6.5z"
      },child:[]
    }
    ]
  })(n)
}
function Pg(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M0 93.7l183.6-25.3v177.4H0V93.7zm0 324.6l183.6 25.3V268.4H0v149.9zm203.8 28L448 480V268.4H203.8v177.9zm0-380.6v180.1H448V32L203.8 65.7z"
      },child:[]
    }
    ]
  })(n)
}
function UH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"
      },child:[]
    }
    ]
  })(n)
}
function FH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"
      },child:[]
    }
    ]
  })(n)
}
function BH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
      },child:[]
    }
    ]
  })(n)
}
function GI(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M256 8C119.034 8 8 119.033 8 256s111.034 248 248 248 248-111.034 248-248S392.967 8 256 8zm130.108 117.892c65.448 65.448 70 165.481 20.677 235.637L150.47 105.216c70.204-49.356 170.226-44.735 235.638 20.676zM125.892 386.108c-65.448-65.448-70-165.481-20.677-235.637L361.53 406.784c-70.203 49.356-170.226 44.736-235.638-20.676z"
      },child:[]
    }
    ]
  })(n)
}
function Ib(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 640 512"
    },child:[ {
      tag:"path",attr: {
        d:"M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"
      },child:[]
    }
    ]
  })(n)
}
function $H(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M0 464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V192H0v272zm320-196c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM192 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-40zM64 268c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zm0 128c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H76c-6.6 0-12-5.4-12-12v-40zM400 64h-48V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H160V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48H48C21.5 64 0 85.5 0 112v48h448v-48c0-26.5-21.5-48-48-48z"
      },child:[]
    }
    ]
  })(n)
}
function kb(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
      },child:[]
    }
    ]
  })(n)
}
function O4(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
      },child:[]
    }
    ]
  })(n)
}
function VI(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z"
      },child:[]
    }
    ]
  })(n)
}
function WI(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 384 512"
    },child:[ {
      tag:"path",attr: {
        d:"M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"
      },child:[]
    }
    ]
  })(n)
}
function zH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
      },child:[]
    }
    ]
  })(n)
}
function xy(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 640 512"
    },child:[ {
      tag:"path",attr: {
        d:"M528 448H112c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h416c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm64-320c-26.5 0-48 21.5-48 48 0 7.1 1.6 13.7 4.4 19.8L476 239.2c-15.4 9.2-35.3 4-44.2-11.6L350.3 85C361 76.2 368 63 368 48c0-26.5-21.5-48-48-48s-48 21.5-48 48c0 15 7 28.2 17.7 37l-81.5 142.6c-8.9 15.6-28.9 20.8-44.2 11.6l-72.3-43.4c2.7-6 4.4-12.7 4.4-19.8 0-26.5-21.5-48-48-48S0 149.5 0 176s21.5 48 48 48c2.6 0 5.2-.4 7.7-.8L128 416h384l72.3-192.8c2.5.4 5.1.8 7.7.8 26.5 0 48-21.5 48-48s-21.5-48-48-48z"
      },child:[]
    }
    ]
  })(n)
}
function GH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 288 512"
    },child:[ {
      tag:"path",attr: {
        d:"M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"
      },child:[]
    }
    ]
  })(n)
}
function sf(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
      },child:[]
    }
    ]
  })(n)
}
function rS(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 576 512"
    },child:[ {
      tag:"path",attr: {
        d:"M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"
      },child:[]
    }
    ]
  })(n)
}
function VH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"
      },child:[]
    }
    ]
  })(n)
}
function Um(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 384 512"
    },child:[ {
      tag:"path",attr: {
        d:"M216 23.86c0-23.8-30.65-32.77-44.15-13.04C48 191.85 224 200 224 288c0 35.63-29.11 64.46-64.85 63.99-35.17-.45-63.15-29.77-63.15-64.94v-85.51c0-21.7-26.47-32.23-41.43-16.5C27.8 213.16 0 261.33 0 320c0 105.87 86.13 192 192 192s192-86.13 192-192c0-170.29-168-193-168-296.14z"
      },child:[]
    }
    ]
  })(n)
}
function WH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 640 512"
    },child:[ {
      tag:"path",attr: {
        d:"M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z"
      },child:[]
    }
    ]
  })(n)
}
function Kp(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z"
      },child:[]
    }
    ]
  })(n)
}
function HH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"
      },child:[]
    }
    ]
  })(n)
}
function KH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
      },child:[]
    }
    ]
  })(n)
}
function U4(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 352 512"
    },child:[ {
      tag:"path",attr: {
        d:"M176 352c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96S80 42.98 80 96v160c0 53.02 42.98 96 96 96zm160-160h-16c-8.84 0-16 7.16-16 16v48c0 74.8-64.49 134.82-140.79 127.38C96.71 376.89 48 317.11 48 250.3V208c0-8.84-7.16-16-16-16H16c-8.84 0-16 7.16-16 16v40.16c0 89.64 63.97 169.55 152 181.69V464H96c-8.84 0-16 7.16-16 16v16c0 8.84 7.16 16 16 16h160c8.84 0 16-7.16 16-16v-16c0-8.84-7.16-16-16-16h-56v-33.77C285.71 418.47 352 344.9 352 256v-48c0-8.84-7.16-16-16-16z"
      },child:[]
    }
    ]
  })(n)
}
function HI(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
      },child:[]
    }
    ]
  })(n)
}
function KI(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
      },child:[]
    }
    ]
  })(n)
}
function YH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-32 252c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92H92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
      },child:[]
    }
    ]
  })(n)
}
function YI(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      },child:[]
    }
    ]
  })(n)
}
function qH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M448 192V77.25c0-8.49-3.37-16.62-9.37-22.63L393.37 9.37c-6-6-14.14-9.37-22.63-9.37H96C78.33 0 64 14.33 64 32v160c-35.35 0-64 28.65-64 64v112c0 8.84 7.16 16 16 16h48v96c0 17.67 14.33 32 32 32h320c17.67 0 32-14.33 32-32v-96h48c8.84 0 16-7.16 16-16V256c0-35.35-28.65-64-64-64zm-64 256H128v-96h256v96zm0-224H128V64h192v48c0 8.84 7.16 16 16 16h48v96zm48 72c-13.25 0-24-10.75-24-24 0-13.26 10.75-24 24-24s24 10.74 24 24c0 13.25-10.75 24-24 24z"
      },child:[]
    }
    ]
  })(n)
}
function gE(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
      },child:[]
    }
    ]
  })(n)
}
function JH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M466.5 83.7l-192-80a48.15 48.15 0 0 0-36.9 0l-192 80C27.7 91.1 16 108.6 16 128c0 198.5 114.5 335.7 221.5 380.3 11.8 4.9 25.1 4.9 36.9 0C360.1 472.6 496 349.3 496 128c0-19.4-11.7-36.9-29.5-44.3zM256.1 446.3l-.1-381 175.9 73.3c-3.3 151.4-82.1 261.1-175.8 307.7z"
      },child:[]
    }
    ]
  })(n)
}
function QH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 496 512"
    },child:[ {
      tag:"path",attr: {
        d:"M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm194.8 170.2C334.3 380.4 292.5 400 248 400s-86.3-19.6-114.8-53.8c-13.6-16.3 11-36.7 24.6-20.5 22.4 26.9 55.2 42.2 90.2 42.2s67.8-15.4 90.2-42.2c13.4-16.2 38.1 4.2 24.6 20.5z"
      },child:[]
    }
    ]
  })(n)
}
function Cc(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 576 512"
    },child:[ {
      tag:"path",attr: {
        d:"M259.3 17.8L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0z"
      },child:[]
    }
    ]
  })(n)
}
function qI(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 512 512"
    },child:[ {
      tag:"path",attr: {
        d:"M0 252.118V48C0 21.49 21.49 0 48 0h204.118a48 48 0 0 1 33.941 14.059l211.882 211.882c18.745 18.745 18.745 49.137 0 67.882L293.823 497.941c-18.745 18.745-49.137 18.745-67.882 0L14.059 286.059A48 48 0 0 1 0 252.118zM112 64c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z"
      },child:[]
    }
    ]
  })(n)
}
function Dd(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 352 512"
    },child:[ {
      tag:"path",attr: {
        d:"M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
      },child:[]
    }
    ]
  })(n)
}
function Yp(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
      },child:[]
    }
    ]
  })(n)
}
function ZH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 640 512"
    },child:[ {
      tag:"path",attr: {
        d:"M592 0H48A48 48 0 0 0 0 48v320a48 48 0 0 0 48 48h240v32H112a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16H352v-32h240a48 48 0 0 0 48-48V48a48 48 0 0 0-48-48zm-16 352H64V64h512z"
      },child:[]
    }
    ]
  })(n)
}
function XH(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 640 512"
    },child:[ {
      tag:"path",attr: {
        d:"M192 256c61.9 0 112-50.1 112-112S253.9 32 192 32 80 82.1 80 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C51.6 288 0 339.6 0 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zM480 256c53 0 96-43 96-96s-43-96-96-96-96 43-96 96 43 96 96 96zm48 32h-3.8c-13.9 4.8-28.6 8-44.2 8s-30.3-3.2-44.2-8H432c-20.4 0-39.2 5.9-55.7 15.4 24.4 26.3 39.7 61.2 39.7 99.8v38.4c0 2.2-.5 4.3-.6 6.4H592c26.5 0 48-21.5 48-48 0-61.9-50.1-112-112-112z"
      },child:[]
    }
    ]
  })(n)
}
function eK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 448 512"
    },child:[ {
      tag:"path",attr: {
        d:"M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
      },child:[]
    }
    ]
  })(n)
}
function F4(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 640 512"
    },child:[ {
      tag:"path",attr: {
        d:"M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
      },child:[]
    }
    ]
  })(n)
}
function tK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 576 512"
    },child:[ {
      tag:"path",attr: {
        d:"M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
      },child:[]
    }
    ]
  })(n)
}
function nK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
      },child:[]
    }
    ]
  })(n)
}
function iK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"
      },child:[]
    }
    ]
  })(n)
}
function rK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M6 19h4V5H6v14zm8-14v14h4V5h-4z"
      },child:[]
    }
    ]
  })(n)
}
function sK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M8 5v14l11-7z"
      },child:[]
    }
    ]
  })(n)
}
function aK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M16.5 12A4.5 4.5 0 0 0 14 7.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3 3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4 9.91 6.09 12 8.18V4z"
      },child:[]
    }
    ]
  })(n)
}
function oK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 7.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
      },child:[]
    }
    ]
  })(n)
}
function lK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z"
      },child:[]
    }
    ]
  })(n)
}
function cK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
      },child:[]
    }
    ]
  })(n)
}
function dK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24"
    },child:[ {
      tag:"path",attr: {
        fill:"none",d:"M0 0h24v24H0z"
      },child:[]
    }, {
      tag:"path",attr: {
        d:"M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"
      },child:[]
    }
    ]
  })(n)
}
const uK=5*60*1e3,Bf=new Map,Fm=new Map;
async function B4(n,e,t=0,i=1e3,r) {
  let s=!1;
  try {
    s=zn()
  }
  catch{}if(t>0)return sS(e,t,i);
  const a=Date.now(),o=Bf.get(n);
  if(o)return a-o.fetchedAt<uK||JI(n,e,t,i,s,r),o.data;
  if(s)try {
    const d=await oe("read_library_cache", {
      userId:n,version:"v1"
    });
    if(d) {
      const u=JSON.parse(d);
      return Bf.set(n, {
        data:u.data,fetchedAt:u.fetchedAt
      }),JI(n,e,t,i,s,r),u.data
    }
  }
  catch{}const c=await sS(e,t,i);
  return c&&(Bf.set(n, {
    data:c,fetchedAt:Date.now()
  }),$4(n,c,s)),c
}
function $4(n,e,t) {
  if(!t)return;
  const i= {
    fetchedAt:Date.now(),data:e
  };
  oe("cache_library_data", {
    userId:n,version:"v1",data:JSON.stringify(i)
  }).catch(()=>{})
}
function JI(n,e,t,i,r,s) {
  sS(e,t,i).then(a=> {
    a&&(Bf.set(n, {
      data:a,fetchedAt:Date.now()
    }),$4(n,a,r),s&&s(a))
  }).catch(a=> {
    console.warn("Library background revalidate failed:",a)
  })
}
async function sS(n,e,t) {
  const i=`library_${n}_${e}_${t}`;
  if(Fm.has(i))return Fm.get(i);
  const r=(async()=> {
    const s=await fetch(`${Se}/purchases/history?sessionId=${n}&limit=${t}&offset=${e}`, {
      headers: {
        Authorization:`Bearer ${n}`
      }
    });
    if(!s.ok) {
      const o=await s.json().catch(()=>({}));
      throw new Error(o.message||"Failed to load library from network")
    }
    const a=await s.json();
    if(!a.success)throw new Error(a.message||"Failed to load library from network");
    return a
  })();
  Fm.set(i,r);
  try {
    return await r
  }
  finally {
    Fm.delete(i)
  }
}
async function Ey(n) {
  Bf.delete(n);
  try {
    zn()&&await oe("delete_library_cache", {
      userId:n,version:"v1"
    }).catch(()=>{})
  }
  catch{}
}
const z4="cartItems";
function fK() {
  try {
    const n=localStorage.getItem(z4);
    if(n) {
      const e=JSON.parse(n);
      if(Array.isArray(e)&&e.length>0)return e
    }
  }
  catch(n) {
    console.error("Failed to read cart items:",n)
  }
  return[]
}
function G4( {
  isOverlay:n=!1,onClose:e
}
={}) {
  var G,W,U;
  const t=oi(),i=br(), {
    t:r
  }
  =ni(), {
    sessionId:s,checkAuth:a,user:o
  }
  =nn(), {
    startTutorial:c,isActive:d
  }
  =la(),[u,f]=g.useState(()=>fK()),h=u.length>0,m=g.useRef(!1),[p,y]=g.useState(0),[v,b]=g.useState(0),[w,S]=g.useState(null),[T,E]=g.useState(!1);
  g.useEffect(()=> {
    localStorage.setItem(z4,JSON.stringify(u)),window.dispatchEvent(new CustomEvent("cartUpdated"))
  },[u]),g.useEffect(()=> {
    (async()=> {
      try {
        const Q=await fetch(`${Se}/settings/discount`);
        if(Q.ok) {
          const te=await Q.json();
          te.success&&(y(te.discount_vipyear||0),b(te.discount_vip_plus_year||0))
        }
      }
      catch(Q) {
        console.error("Failed to load discount settings:",Q)
      }
    })()
  },[]),g.useEffect(()=> {
    (async()=> {
      if(!(!s||!o))try {
        const Q=await fetch(`${Se}/vip/subscription`, {
          headers: {
            Authorization:`Bearer ${s}`
          }
        });
        if(Q.ok) {
          const te=await Q.json();
          te.success&&te.subscription?S(te.subscription):S(null)
        }
      }
      catch(Q) {
        console.error("Failed to load VIP subscription:",Q)
      }
    })()
  },[s,o]),g.useEffect(()=> {
    if(!o||(!d&&m.current&&(m.current=!1),d||m.current))return;
    const q=i.state&&i.state.replayTutorial==="cart";
    if(!q)return;
    m.current=!0;
    const Q=[ {
      id:"cart-checkout-button",target:"[data-tutorial-id='cart-checkout-button']",title:r("tutorial.cartPage.checkout.title"),description:r("tutorial.cartPage.checkout.description"),position:"top",navigateTo:"/wishlist",tutorialKey:"cart"
    }
    ],te=setTimeout(()=> {
      c(Q),q&&t(i.pathname, {
        replace:!0,state: {
          ...i.state,replayTutorial:void 0
        }
      })
    },800);
    return()=>clearTimeout(te)
  },[o==null?void 0:o.id,c,r,d,(G=o==null?void 0:o.tutorial_completed)==null?void 0:G.welcome,(W=o==null?void 0:o.tutorial_completed)==null?void 0:W.deposit,(U=o==null?void 0:o.tutorial_completed)==null?void 0:U.cart]);
  const x=g.useMemo(()=>u.reduce((q,Q)=>q+(isNaN(Q.finalPrice)?0:Q.finalPrice),0),[u]),k=g.useMemo(()=> {
    if(!w)return 0;
    if(w.expires_at) {
      if(new Date(w.expires_at)<new Date)return 0
    }
    else return 0;
    return w.duration!==365?0:w.type==="vip_plus"?v:w.type==="vip"?p:0
  },[w,p,v]),C=g.useMemo(()=>k<=0||x<=0?0:Math.round(x*k/100),[x,k]),_=g.useMemo(()=>Math.max(0,x-C),[x,C]),M=q=> {
    f(Q=>Q.filter(te=>te.id!==q))
  },j=()=> {
    f([])
  },B=q=>q==null||isNaN(q)?null:`${Math.round(q).toLocaleString("vi-VN")} G`;
  return l.jsxs("div", {
    className:"cart-page",children:[l.jsxs("div", {
      className:"cart-breadcrumb",children:[l.jsx("button", {
        className:"cart-breadcrumb-link",onClick:()=>n&&e?e():t("/store"),children:r("cart.breadcrumbHome")
      }),l.jsx("span", {
        className:"cart-breadcrumb-separator",children:" > "
      }),l.jsx("span", {
        children:r("cart.breadcrumbCart")
      })]
    }),l.jsx("h1", {
      className:"cart-title",children:r("cart.title")
    }),l.jsxs("div", {
      className:"cart-layout",children:[l.jsxs("div", {
        className:"cart-items",children:[h?u.map(q=>l.jsxs("div", {
          className:"cart-item-card",children:[l.jsx("img", {
            src:q.image,alt:q.title,className:"cart-item-image"
          }),l.jsxs("div", {
            className:"cart-item-details",children:[l.jsxs("div", {
              className:"cart-item-header",children:[l.jsx("h2", {
                children:q.title
              }),l.jsx("button", {
                className:"cart-remove-link",onClick:()=>M(q.id),children:r("cart.remove")
              })]
            }),q.includes.length>0&&l.jsxs("div", {
              className:"cart-item-includes",children:[r("cart.includesPrefix")," ",q.includes.length," ",r("cart.includesSuffix")," ",l.jsx("span", {
                children:q.includes.join(", ")
              })]
            }),l.jsxs("div", {
              className:"cart-platform-row",children:[q.platform.windows&&l.jsx("span", {
                className:"cart-platform-icon",title:"Windows",children:l.jsx(Pg,{})
              }),q.platform.mac&&l.jsx("span", {
                className:"cart-platform-icon",title:"Mac",children:l.jsx(Rg,{})
              }),q.platform.linux&&l.jsx("span", {
                className:"cart-platform-icon",title:"Linux",children:l.jsx(jg,{})
              })]
            }),(()=> {
              const Q=(q.discountPercent??0)>0&&!!q.originalPrice&&q.finalPrice<(q.originalPrice??0);
              return l.jsxs("div", {
                className:`cart-price-row ${Q?"":"no-discount"}`,children:[Q&&l.jsxs("span", {
                  className:"cart-discount-pill",children:["-",q.discountPercent,"%"]
                }),l.jsxs("div", {
                  className:"cart-price-stack",children:[Q&&l.jsx("span", {
                    className:"cart-original-price",children:B(q.originalPrice)
                  }),l.jsx("span", {
                    className:"cart-final-price",children:B(q.finalPrice)
                  })]
                })]
              })
            })()]
          })]
        },q.id)):l.jsxs("div", {
          className:"cart-empty",children:[l.jsx("p", {
            children:r("cart.emptyText")
          }),l.jsx("button", {
            className:"cart-secondary-btn",onClick:()=>n&&e?e():t("/store"),children:r("cart.emptyBrowse")
          })]
        }),h&&l.jsxs("div", {
          className:"cart-actions-row",children:[l.jsx("button", {
            className:"cart-secondary-btn",onClick:()=>n&&e?e():t("/store"),children:r("cart.continueShopping")
          }),l.jsx("button", {
            className:"cart-link-btn",onClick:j,children:r("cart.removeAll")
          })]
        })]
      }),l.jsxs("aside", {
        className:"cart-summary",children:[l.jsxs("div", {
          className:"cart-summary-card",children:[l.jsx("div", {
            className:"cart-summary-title",children:r("cart.estimatedTotal")
          }),C>0&&l.jsxs(l.Fragment, {
            children:[l.jsxs("div", {
              className:"cart-summary-row",children:[l.jsx("span", {
                className:"cart-summary-row-label",children:"Tổng tiền:"
              }),l.jsx("span", {
                className:"cart-summary-row-value",children:B(x)??"0 G"
              })]
            }),l.jsxs("div", {
              className:"cart-summary-row",children:[l.jsxs("span", {
                className:"cart-summary-discount-label",children:["Giảm giá VIP (",k,"%):"]
              }),l.jsxs("span", {
                className:"cart-summary-discount-value",children:["-",B(C)??"0 G"]
              })]
            })]
          }),l.jsx("div", {
            className:"cart-summary-value",children:B(_)??r("cart.zeroTotal")
          }),l.jsx("div", {
            className:"cart-summary-note",children:r("cart.taxNote")
          }),l.jsx("button", {
            className:"cart-primary-btn",disabled:!h||T,"data-tutorial-id":"cart-checkout-button",onClick:async()=> {
              if(!(!h||!s||T)) {
                E(!0);
                try {
                  const q=await fetch(`${Se}/cart/checkout`, {
                    method:"POST",headers: {
                      "Content-Type":"application/json",Authorization:`Bearer ${s}`
                    },body:JSON.stringify( {
                      sessionId:s,items:u.map(ee=> {
                        let he=ee.finalPrice;
                        if(k>0&&he>0) {
                          const me=Math.round(he*k/100);
                          he=Math.max(0,he-me)
                        }
                        return {
                          game_id:ee.appId,price:he
                        }
                      })
                    })
                  }),Q=await q.json();
                  if(!q.ok||!Q.success) {
                    Q.code==="INSUFFICIENT_FUNDS"?alert("Số dư ví không đủ để thanh toán giỏ hàng."):alert(Q.message||"Thanh toán thất bại.");
                    return
                  }
                  const te=u.map(ee=>( {
                    title:ee.title,image:ee.image,platform:ee.platform
                  }));
                  localStorage.setItem("lastPurchaseSummary",JSON.stringify(te)),f([]),await a(),o!=null&&o.id&&await Ey(o.id),window.dispatchEvent(new CustomEvent("libraryUpdated")),n&&e&&e(),t(`/store?complete=1&type=purchase&amount=${Q.totalCharged}&tx=${Q.transactionId}`)
                }
                catch(q) {
                  console.error("Checkout failed:",q),alert("Thanh toán thất bại.")
                }
                finally {
                  E(!1)
                }
              }
            },children:T?"Đang xử lý...":"Mua ngay"
          })]
        }),l.jsxs("div", {
          className:"cart-summary-illustration",children:[l.jsx("div", {
            className:"cart-summary-art"
          }),l.jsx("p", {
            children:r("cart.summaryLegal")
          })]
        })]
      })]
    })]
  })
}
function hK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"
    },child:[ {
      tag:"circle",attr: {
        cx:"12",cy:"12",r:"10"
      },child:[]
    }, {
      tag:"line",attr: {
        x1:"12",y1:"8",x2:"12",y2:"12"
      },child:[]
    }, {
      tag:"line",attr: {
        x1:"12",y1:"16",x2:"12.01",y2:"16"
      },child:[]
    }
    ]
  })(n)
}
function QI(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"
    },child:[ {
      tag:"path",attr: {
        d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"
      },child:[]
    }, {
      tag:"polyline",attr: {
        points:"22 4 12 14.01 9 11.01"
      },child:[]
    }
    ]
  })(n)
}
function mK(n) {
  return Pt( {
    attr: {
      viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"
    },child:[ {
      tag:"circle",attr: {
        cx:"12",cy:"12",r:"10"
      },child:[]
    }, {
      tag:"line",attr: {
        x1:"12",y1:"16",x2:"12",y2:"12"
      },child:[]
    }, {
      tag:"line",attr: {
        x1:"12",y1:"8",x2:"12.01",y2:"8"
      },child:[]
    }
    ]
  })(n)
}
function pK( {
  onClose:n,replayTutorial:e
}) {
  const {
    t
  }
  =ni(), {
    isActive:i,startTutorial:r
  }
  =la(), {
    user:s,sessionId:a,checkAuth:o
  }
  =nn(),[c,d]=g.useState(!1),[u,f]=g.useState(!1),[h,m]=g.useState(!1),[p,y]=g.useState("read"),[v,b]=g.useState(!1),[w,S]=g.useState(0),[T,E]=g.useState("en"),[x,k]=g.useState("vi"),[C,_]=g.useState("google"),[M,j]=g.useState(""),[B,G]=g.useState("Translate to Vietnamese. FIRST, verify if the text is spoken dialogue by a character. If the text is UI, system instructions, player actions, HUD, or garbage (e.g. 'Press [KEY_E]', 'HP', '007'), you MUST output EXACTLY ONE BLANK SPACE ' ' and nothing else. CRITICAL RULES: NO chat, NO explanations, NO quotes. Output ONLY the raw translated dialogue. For game: [Nhập tên Game vào đây]"),[W,U]=g.useState(!1),[q,Q]=g.useState(null),[te,ee]=g.useState(!1),[he,me]=g.useState(!1),[se,be]=g.useState(!1),[K,X]=g.useState([]),[$,z]=g.useState("default"),[D,R]=g.useState(!1),[L,A]=g.useState(!1),[N,V]=g.useState(!1),[O,F]=g.useState(!1),[J,re]=g.useState(!1),[ie,fe]=g.useState(0),[ce,ke]=g.useState("idle"),[Pe,de]=g.useState(""),[ze,Xe]=g.useState(!1),Ye=async()=> {
    try {
      const Z=await oe("check_voice_app_installed");
      Xe(Z)
    }
    catch{}
  },ve=async()=> {
    try {
      ke("installing"),await oe("download_and_install_voice_app"),ke("success"),await Ye(),setTimeout(()=>ke("idle"),5e3)
    }
    catch(Z) {
      de(String(Z)),ke("error")
    }
  },[nt,ft]=g.useState(!1),[Rt,Mt]=g.useState(""),[Ze,Fe]=g.useState(!1),[le,pe]=g.useState(null),[_e,Ge]=g.useState(null),[Ve,qe]=g.useState(null),[rt,bt]=g.useState(!1),[mt,Nt]=g.useState([]),[Ae,dt]=g.useState(null),Wt=g.useRef( {
    x:0,y:0
  }),Le=g.useRef(!1),Qe=g.useRef(null),ot=g.useRef( {
    x:0,y:0
  });
  g.useRef(!1),g.useEffect(()=> {
    (async()=> {
      try {
        const ue=localStorage.getItem("burrspeak_scan_hotkey")||"";
        Mt(ue),ue&&await oe("update_scan_hotkey", {
          oldHotkey:null,hotkey:ue
        });
        const ye=await oe("check_data_ready");
        F(ye);
        const Ne=await oe("has_legacy_crnn");
        re(Ne)
      }
      catch{}
    })(),Ye(),(async()=> {
      try {
        const ue=await oe("get_tts_voice");
        S(ue)
      }
      catch{}
    })(),(async()=> {
      try {
        const ue=await oe("get_stream_bypass_state");
        A(ue)
      }
      catch{}
    })(),(async()=> {
      try {
        const ue=await oe("get_movie_mode");
        V(ue)
      }
      catch{}
    })(),(async()=> {
      try {
        const ue=await oe("get_movie_mode");
        V(ue)
      }
      catch{}
    })();
    const Z=async()=> {
      try {
        const ue=await oe("get_translator_config");
        m(ue.enabled),y(ue.enabled?"translate":"read");
        let ye=ue.backend;
        const Ne=localStorage.getItem("trans_backend_saved");
        Ne&&ye==="google"&&(ye=Ne),_(ye),E(ue.source_lang),k(ue.target_lang);
        let et=ue.api_key,lt=ue.prompt;
        if(!et&&ye!=="google"&&(et=localStorage.getItem(`trans_api_key_${ye}`)||""),!lt||lt.startsWith("Dịch đoạn")||lt.startsWith("Translate to")) {
          const kt=localStorage.getItem(`trans_prompt_${ye}`);
          kt?lt=kt:lt='{"style":"Tự do (AI tự quyết định)","ignore":""}'
        }
        j(et),G(lt),typeof ue.ai_filter_enabled=="boolean"&&ee(ue.ai_filter_enabled),me(!0)
      }
      catch{}
    };
    return Z(),xt(),window.addEventListener("focus",Z),()=>window.removeEventListener("focus",Z)
  },[]),g.useEffect(()=> {
    s&&!s.translator_unlocked&&p==="translate"&&y("read")
  },[s,p]),g.useEffect(()=> {
    if(!he)return;
    const Z= {
      enabled:p==="translate",backend:C,api_key:M,prompt:B,source_lang:T,target_lang:x,is_unlocked:!!(s!=null&&s.translator_unlocked),ai_filter_enabled:te
    };
    oe("update_translator_config", {
      config:Z
    }).catch(console.error)
  },[he,p,C,M,B,T,x,s==null?void 0:s.translator_unlocked,te]);
  const xt=async()=> {
    R(!0);
    try {
      const Z=await oe("list_audio_output_devices");
      X(Z)
    }
    catch {
      X([])
    }
    finally {
      R(!1)
    }
  };
  g.useEffect(()=> {
    const Z=[];
    return(async()=>(Z.push(await _i("setup:progress",ue=> {
      fe(Math.round(ue.payload.percent)),ft(!0)
    })),Z.push(await _i("setup:complete",async()=> {
      F(!0),ft(!1),fe(100);
      try {
        await oe("init_voice_features_cmd")
      }
      catch{}
    })),Z.push(await _i("setup:error",ue=> {
      Ge(ue.payload),ft(!1),fe(0)
    })),Z.push(await _i("scan-region:saved",ue=> {
      qe(ue.payload)
    })),Z.push(await _i("yolo:results",ue=> {
      console.log("[BurrSpeak Eye] YOLO results:",ue.payload)
    })),Z.push(await _i("yolo:capture_error",ue=> {
      console.error("[BurrSpeak Eye] CAPTURE ERROR:",ue.payload)
    })),Z.push(await _i("yolo:pipeline_status",ue=> {
      console.log("[BurrSpeak Eye] Pipeline status:",ue.payload)
    })),Z.push(await _i("toggle_mask_mode",async ue=> {
      const {
        state:ye
      }
      =ue.payload;
      if(bt(ye),ye)try {
        const Ne=await oe("get_scan_region");
        qe(Ne);
        const et=window.devicePixelRatio||1,lt=await oe("get_blackout_masks");
        Nt(lt.map((kt,Gt)=>( {
          id:"mask_"+Gt,x:kt.x/et,y:kt.y/et,width:kt.width/et,height:kt.height/et
        })))
      }
      catch(Ne) {
        console.error("[BurrSpeak] load mask state error:",Ne)
      }
      else try {
        const Ne=window.devicePixelRatio||1,et=mt.map(( {
          x:lt,y:kt,width:Gt,height:fn
        })=>( {
          x:Math.round(lt*Ne),y:Math.round(kt*Ne),width:Math.round(Gt*Ne),height:Math.round(fn*Ne)
        }));
        await oe("set_blackout_masks", {
          masks:et
        })
      }
      catch(Ne) {
        console.error("[BurrSpeak] set_blackout_masks error:",Ne)
      }
    }))))(),()=> {
      Z.forEach(ue=>ue())
    }
  },[mt]),g.useEffect(()=> {
    (async()=> {
      try {
        const Z=await oe("get_icon_visibility");
        b(Z)
      }
      catch{}
    })()
  },[]),g.useEffect(()=> {
    const Z=ue=> {
      ue.key==="Escape"&&!rt&&n()
    };
    return document.addEventListener("keydown",Z),()=>document.removeEventListener("keydown",Z)
  },[n,rt]);
  const Ee=async()=> {
    ft(!0),fe(0),Ge(null);
    try {
      await oe("setup_download_data")
    }
    catch(Z) {
      Ge(String(Z)),ft(!1)
    }
  },Ke=Z=> {
    !rt||Z.button!==0||Z.target.classList.contains("burrspeak-mask-rect")||(Le.current=!0,Wt.current= {
      x:Z.clientX,y:Z.clientY
    },dt( {
      id:"",x:Z.clientX,y:Z.clientY,width:0,height:0
    }))
  },$e=Z=> {
    if(!Le.current||!Ae)return;
    const ue=Z.clientX,ye=Z.clientY,Ne=Math.min(ue,Wt.current.x),et=Math.min(ye,Wt.current.y),lt=Math.abs(ue-Wt.current.x),kt=Math.abs(ye-Wt.current.y);
    if(dt( {
      id:"",x:Ne,y:et,width:lt,height:kt
    }),Qe.current) {
      if(!mt.find(Ot=>Ot.id===Qe.current))return;
      const fn=Z.clientX-ot.current.x,on=Z.clientY-ot.current.y;
      Nt(Ot=>Ot.map(rn=>rn.id===Qe.current? {
        ...rn,x:fn,y:on
      }
      :rn))
    }
  },st=()=> {
    if(Le.current&&Ae) {
      if(Le.current=!1,Ae.width>10&&Ae.height>5) {
        const Z= {
          id:"mask_"+Date.now(),x:Ae.x,y:Ae.y,width:Ae.width,height:Ae.height
        };
        Nt(ue=>[...ue,Z])
      }
      dt(null)
    }
    Qe.current&&(Qe.current=null)
  },Ct=(Z,ue)=> {
    Z.stopPropagation();
    const ye=mt.find(Ne=>Ne.id===ue);
    ye&&(Le.current=!1,Qe.current=ue,ot.current= {
      x:Z.clientX-ye.x,y:Z.clientY-ye.y
    })
  },wt=(Z,ue)=> {
    Z.stopPropagation(),Z.preventDefault(),Nt(ye=>ye.filter(Ne=>Ne.id!==ue))
  };
  return l.jsxs("div", {
    className:"burrspeak-overlay",onClick:rt?void 0:n,onMouseDown:rt?Ke:void 0,onMouseMove:rt?$e:void 0,onMouseUp:rt?st:void 0,children:[se&&l.jsxs("div", {
      onClick:()=>be(!1),style: {
        position:"fixed",top:0,left:0,right:0,bottom:0,background:"rgba(0,0,0,0.85)",zIndex:99999,display:"flex",justifyContent:"center",alignItems:"center"
      },children:[l.jsx("video", {
        src:"/turorial.webm",controls:!0,autoPlay:!0,loop:!0,style: {
          maxWidth:"80%",maxHeight:"80%",borderRadius:"8px",boxShadow:"0 0 30px rgba(0,0,0,0.8)"
        },onClick:Z=>Z.stopPropagation()
      }),l.jsx("button", {
        style: {
          position:"absolute",top:"24px",right:"24px",background:"rgba(255,255,255,0.1)",border:"none",color:"white",width:"40px",height:"40px",borderRadius:"50%",fontSize:"20px",cursor:"pointer",display:"flex",justifyContent:"center",alignItems:"center"
        },onClick:()=>be(!1),children:"✕"
      })]
    }),l.jsxs("div", {
      className:"burrspeak-panel",onClick:Z=>Z.stopPropagation(),children:[l.jsxs("div", {
        className:"burrspeak-header","data-tutorial-id":"burrspeak-header",children:[l.jsx("div", {
          className:"burrspeak-header-left",children:l.jsx("span", {
            className:"burrspeak-title",children:t("header.topMenu.burrspeak")
          })
        }),l.jsx("button", {
          className:"burrspeak-close",onClick:n,children:"✕"
        })]
      }),l.jsxs("div", {
        className:"burrspeak-body",style: {
          padding:"20px"
        },children:[l.jsxs("div", {
          style: {
            padding:"16px",background:"rgba(59, 130, 246, 0.1)",border:"1px solid rgba(59, 130, 246, 0.3)",borderRadius:"8px"
          },children:[l.jsxs("div", {
            style: {
              display:"flex",justifyContent:"space-between",alignItems:"center"
            },children:[l.jsxs("div", {
              children:[l.jsxs("h3", {
                style: {
                  margin:"0 0 8px 0",fontSize:"14px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#60a5fa",display:"flex",alignItems:"center",gap:"6px"
                },children:["Cài đặt Goslynk Voice",ze&&l.jsx(QI, {
                  color:"#34d399",size:16,title:"Đã cài đặt"
                })]
              }),l.jsx("p", {
                style: {
                  margin:0,fontSize:"12px",color:"#94a3b8"
                },children:"Tự động tải về, chạy setup."
              })]
            }),l.jsxs("div", {
              style: {
                display:"flex",gap:"10px",alignItems:"center"
              },children:[ce==="installing"&&l.jsx("span", {
                style: {
                  color:"#fbbf24",fontSize:"12px"
                },children:"Đang xử lý..."
              }),ce==="success"&&l.jsx("span", {
                style: {
                  color:"#34d399",fontSize:"12px"
                },children:"Thành công!"
              }),ce==="error"&&l.jsx("button", {
                className:"burrspeak-mode-btn",style: {
                  background:"#ef4444",padding:"6px 12px",width:"auto"
                },onClick:ve,children:"Tải lại (Lỗi)"
              }),ce!=="error"&&l.jsx("button", {
                className:"burrspeak-mode-btn",style: {
                  background:"rgba(59, 130, 246, 0.15)",color:"#60a5fa",borderColor:"rgba(59, 130, 246, 0.3)",padding:"6px 12px",width:"auto"
                },onClick:ve,disabled:ce==="installing",children:ce==="installing"?"Đang cài đặt...":ze?"Khôi phục & Cập nhật":"Tải & Cài đặt"
              })]
            })]
          }),ce==="error"&&l.jsx("div", {
            style: {
              marginTop:"12px",color:"#f87171",fontSize:"12px",background:"rgba(239,68,68,0.1)",padding:"8px",borderRadius:"4px"
            },children:Pe
          })]
        }),p==="read"&&l.jsx("div", {
          className:"burrspeak-card","data-tutorial-id":"burrspeak-scan-zone",style: {
            marginTop:"16px"
          },children:l.jsxs("div", {
            className:"burrspeak-card-header",style: {
              display:"flex",justifyContent:"space-between",alignItems:"center"
            },children:[l.jsx("div", {
              style: {
                fontSize:"14px",fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",color:"#94a3b8"
              },children:"Thông Tin và Hướng Dẫn Căn Bản"
            }),l.jsxs("div", {
              style: {
                display:"flex",gap:"10px"
              },children:[l.jsx("button", {
                className:"burrspeak-mode-btn",style: {
                  background:"rgba(234, 179, 8, 0.15)",color:"#eab308",borderColor:"rgba(234, 179, 8, 0.3)",padding:"4px 8px",width:"auto",fontSize:"11px",height:"fit-content"
                },onClick:async()=> {
                  try {
                    const Z=await oe("burrspeak_export_debug_logs");
                    Q(Z)
                  }
                  catch(Z) {
                    Q("Lỗi khi xuất log: "+Z)
                  }
                },title:"Check debug logs",children:"Check debug"
              }),l.jsxs("button", {
                onClick:()=>be(!0),style: {
                  background:"rgba(255, 255, 255, 0.1)",border:"1px solid rgba(255, 255, 255, 0.2)",borderRadius:"4px",color:"#fff",padding:"4px 8px",fontSize:"11px",cursor:"pointer",display:"flex",alignItems:"center",gap:"6px",transition:"all 0.2s ease"
                },onMouseEnter:Z=> {
                  Z.currentTarget.style.background="rgba(255, 255, 255, 0.2)"
                },onMouseLeave:Z=> {
                  Z.currentTarget.style.background="rgba(255, 255, 255, 0.1)"
                },children:[l.jsx("span", {
                  style: {
                    fontSize:"12px"
                  },children:"▶️"
                })," Xem Video Hướng Dẫn"]
              })]
            })]
          })
        })]
      })]
    }),rt&&l.jsxs("div", {
      className:"burrspeak-mask-overlay",children:[Ve&&l.jsx("div", {
        className:"burrspeak-crop-highlight",style: {
          left:Ve.x,top:Ve.y,width:Ve.w,height:Ve.h
        }
      }),mt.map(Z=>l.jsx("div", {
        className:"burrspeak-mask-rect",style: {
          left:Z.x,top:Z.y,width:Z.width,height:Z.height
        },onMouseDown:ue=>Ct(ue,Z.id),onContextMenu:ue=>wt(ue,Z.id),children:l.jsx("button", {
          className:"burrspeak-mask-delete",onClick:ue=>wt(ue,Z.id),children:"✕"
        })
      },Z.id)),Ae&&Ae.width>0&&Ae.height>0&&l.jsx("div", {
        className:"burrspeak-mask-rect burrspeak-mask-drawing",style: {
          left:Ae.x,top:Ae.y,width:Ae.width,height:Ae.height
        }
      }),l.jsx("div", {
        className:"burrspeak-mask-hint",children:"Kéo trong vùng sáng để thêm mask | Kéo mask để di chuyển | Click ✕ hoặc chuột phải để xóa | ESC để thoát"
      })]
    }),W&&l.jsx("div", {
      style: {
        position:"fixed",inset:0,zIndex:1e4,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.15s ease-out"
      },onClick:Z=> {
        Z.stopPropagation(),U(!1)
      },children:l.jsxs("div", {
        className:"burrspeak-panel",style: {
          width:400,minHeight:"auto"
        },onClick:Z=>Z.stopPropagation(),children:[l.jsx("div", {
          className:"burrspeak-header",children:l.jsx("div", {
            className:"burrspeak-header-left",children:l.jsx("span", {
              className:"burrspeak-title",style: {
                color:"#f87171",textShadow:"0 0 12px rgba(239, 68, 68, 0.5)"
              },children:"⚠️ Xác nhận tải lại Data"
            })
          })
        }),l.jsxs("div", {
          className:"burrspeak-body",style: {
            padding:"20px",display:"block"
          },children:[l.jsx("p", {
            style: {
              color:"#cbd5e1",fontSize:13,marginBottom:20,lineHeight:1.5,fontWeight:500
            },children:"Bạn có chắc chắn muốn xóa toàn bộ Data AI hiện tại và tải lại từ đầu không?"
          }),l.jsxs("div", {
            style: {
              display:"flex",justifyContent:"flex-end",gap:10
            },children:[l.jsx("button", {
              className:"burrspeak-mode-btn",onClick:()=>U(!1),children:"Hủy bỏ"
            }),l.jsx("button", {
              className:"burrspeak-mode-btn",style: {
                background:"rgba(239, 68, 68, 0.15)",color:"#f87171",borderColor:"rgba(239, 68, 68, 0.3)"
              },onClick:async()=> {
                U(!1);
                try {
                  await oe("force_delete_data"),F(!1),re(!1),Ge(null),Ee()
                }
                catch(Z) {
                  console.error(Z)
                }
              },children:"Đồng ý"
            })]
          })]
        })]
      })
    }),q&&l.jsx("div", {
      style: {
        position:"fixed",inset:0,zIndex:1e4,background:"rgba(0,0,0,0.6)",display:"flex",alignItems:"center",justifyContent:"center",animation:"fadeIn 0.15s ease-out"
      },onClick:Z=> {
        Z.stopPropagation(),Q(null)
      },children:l.jsxs("div", {
        className:"burrspeak-panel",style: {
          width:400,minHeight:"auto"
        },onClick:Z=>Z.stopPropagation(),children:[l.jsx("div", {
          className:"burrspeak-header",children:l.jsx("div", {
            className:"burrspeak-header-left",children:l.jsx("span", {
              className:"burrspeak-title",style: {
                color:"#38bdf8",textShadow:"0 0 12px rgba(56, 189, 248, 0.5)"
              },children:"ℹ️ Trạng thái xuất Log"
            })
          })
        }),l.jsxs("div", {
          className:"burrspeak-body",style: {
            padding:"20px",display:"block"
          },children:[l.jsx("p", {
            style: {
              color:"#cbd5e1",fontSize:13,marginBottom:20,lineHeight:1.5,fontWeight:500,whiteSpace:"pre-wrap"
            },children:q
          }),l.jsx("div", {
            style: {
              display:"flex",justifyContent:"flex-end",gap:10
            },children:l.jsx("button", {
              className:"burrspeak-mode-btn",style: {
                background:"rgba(56, 189, 248, 0.15)",color:"#38bdf8",borderColor:"rgba(56, 189, 248, 0.3)"
              },onClick:()=>Q(null),children:"OK"
            })
          })]
        })]
      })
    }),le&&le.isOpen&&l.jsx("div", {
      className:"burrspeak-modal-overlay",onClick:Z=> {
        Z.stopPropagation(),pe(null)
      },children:l.jsxs("div", {
        className:"burrspeak-modal",onClick:Z=>Z.stopPropagation(),children:[l.jsxs("div", {
          className:`burrspeak-modal-header ${le.type}`,children:[le.type==="error"&&l.jsx(hK, {
            size:20
          }),le.type==="info"&&l.jsx(mK, {
            size:20
          }),le.type==="confirm"&&l.jsx(QI, {
            size:20
          }),l.jsx("h3", {
            children:le.title
          })]
        }),l.jsx("div", {
          className:"burrspeak-modal-body",children:l.jsx("p", {
            children:le.message
          })
        }),l.jsx("div", {
          className:"burrspeak-modal-footer",children:le.type==="confirm"?l.jsxs(l.Fragment, {
            children:[l.jsx("button", {
              className:"burrspeak-btn-cancel",onClick:()=>pe(null),children:"Hủy bỏ"
            }),l.jsx("button", {
              className:"burrspeak-btn-confirm",onClick:()=> {
                pe(null),le.onConfirm&&le.onConfirm()
              },children:"Xác nhận"
            })]
          }):l.jsx("button", {
            className:"burrspeak-btn-confirm",onClick:()=>pe(null),children:"Đóng"
          })
        })]
      })
    })]
  })
}
function ho( {
  isOpen:n,onClose:e,title:t,children:i,showCloseButton:r=!0,width:s="400px",height:a="auto"
}) {
  if(g.useEffect(()=>(n?document.body.style.overflow="hidden":document.body.style.overflow="unset",()=> {
    document.body.style.overflow="unset"
  }),[n]),g.useEffect(()=> {
    const c=d=> {
      d.key==="Escape"&&n&&e()
    };
    return window.addEventListener("keydown",c),()=>window.removeEventListener("keydown",c)
  },[n,e]),!n)return null;
  const o=l.jsx("div", {
    className:"modal-overlay",onClick:e,children:l.jsxs("div", {
      className:"modal-content",onClick:c=>c.stopPropagation(),style: {
        width:s,height:a
      },children:[t&&l.jsxs("div", {
        className:"modal-header",children:[l.jsx("h2", {
          className:"modal-title",children:t
        }),r&&l.jsx("button", {
          className:"modal-close",onClick:e,children:l.jsx(Dd, {
            size:16
          })
        })]
      }),!t&&r&&l.jsx("button", {
        className:"modal-close-top-right",onClick:e,children:l.jsx(Dd, {
          size:16
        })
      }),l.jsx("div", {
        className:"modal-body",children:i
      })]
    })
  });
  return zh.createPortal(o,document.body)
}
function uh( {
  isOpen:n,onClose:e,title:t,message:i,type:r="info",confirmText:s="OK",showCancel:a=!1,cancelText:o="Cancel",onConfirm:c
}) {
  const d=()=> {
    c&&c(),e()
  };
  return l.jsx(ho, {
    isOpen:n,onClose:e,title:t,width:"400px",children:l.jsxs("div", {
      className:`alert-modal alert-modal-${r}`,children:[l.jsx("div", {
        className:"alert-message",children:i
      }),l.jsxs("div", {
        className:"alert-actions",children:[a&&l.jsx("button", {
          className:"alert-button alert-button-cancel",onClick:e,children:o
        }),l.jsx("button", {
          className:`alert-button alert-button-${r}`,onClick:d,children:s
        })]
      })]
    })
  })
}
const ZI=n=>n?n.startsWith("http")?n:`${Se}${n}`:"",XI=(n,e)=>n.split(/(\[nav:[a-zA-Z0-9_]+\])/g).map((i,r)=> {
  if(i.startsWith("[nav:")&&i.endsWith("]")) {
    const s=i.slice(5,-1),a= {
      settings:"MỞ CÀI ĐẶT",store:"VÀO CỬA HÀNG",vip:"NẠP VIP NGAY"
    };
    return l.jsx("button", {
      className:"announcement-inline-btn",onClick:()=> {
        console.log("Đang chuyển User đến Tab:",s),e==null||e(s)
      },children:a[s]||"BẤM VÀO ĐÂY"
    },r)
  }
  return l.jsx("span", {
    children:i
  },r)
});
function gK( {
  onNavigate:n
}) {
  const[e,t]=g.useState(null),[i,r]=g.useState(!1),[s,a]=g.useState(!1),[o,c]=g.useState(null),d=g.useMemo(()=>e?`announcement-dismissed-${e.updatedAt||"0"}`:null,[e]);
  if(g.useEffect(()=> {
    (async()=> {
      try {
        const b=await fetch(`${Se}/announcement`);
        if(!b.ok)return;
        const w=await b.json();
        console.log("[AnnouncementBanner] API response:",w),w!=null&&w.announcement&&t(w.announcement)
      }
      catch(b) {
        console.error("[AnnouncementBanner] Load error:",b)
      }
    })()
  },[]),g.useEffect(()=> {
    if(!d)return;
    const v=localStorage.getItem(d);
    r(v==="true")
  },[d]),!e||i)return null;
  const u=e.level||"info",f=e.imageUrls||[],h=f.length>0,m=()=> {
    d&&localStorage.setItem(d,"true"),r(!0)
  },p=()=> {
    a(!0)
  },y=()=> {
    a(!1)
  };
  return l.jsx("div", {
    className:"announcement-overlay",children:l.jsx("div", {
      className:`announcement-modal announcement-${u}`,role:"dialog","aria-modal":"true",children:h?l.jsxs(l.Fragment, {
        children:[l.jsxs("div", {
          className:`announcement-slider ${s?"announcement-slider-active":""}`,children:[l.jsxs("div", {
            className:"announcement-view",children:[l.jsx("div", {
              className:"announcement-header",children:l.jsx("div", {
                className:"announcement-title",id:"announcement-title",children:e.title
              })
            }),l.jsx("div", {
              className:`announcement-image ${f.length===3?"layout-bento":""}`,children:f.map((v,b)=>l.jsx("img", {
                src:ZI(v),alt:`${e.title} ${b+1}`,onClick:()=>c(ZI(v)),onError:w=> {
                  w.target.style.display="none"
                }
              },b))
            }),l.jsxs("div", {
              className:"announcement-cover-actions",children:[l.jsx("button", {
                className:"announcement-btn-secondary",type:"button",onClick:m,children:"Bỏ qua"
              }),l.jsx("button", {
                className:"announcement-btn-primary",type:"button",onClick:p,children:"Đọc chi tiết"
              })]
            })]
          }),l.jsxs("div", {
            className:"announcement-view",children:[l.jsxs("div", {
              className:"announcement-header",children:[l.jsx("button", {
                className:"announcement-back",type:"button",onClick:y,"aria-label":"Quay lại",children:"←"
              }),l.jsx("div", {
                className:"announcement-title announcement-title-small",id:"announcement-title",children:e.title
              })]
            }),l.jsx("div", {
              className:"announcement-detail-content",children:l.jsx("div", {
                className:"announcement-message",children:XI(e.message,n)
              })
            }),l.jsx("div", {
              className:"announcement-actions",children:l.jsx("button", {
                className:"announcement-primary",type:"button",onClick:m,children:"Đã hiểu"
              })
            })]
          })]
        }),o&&l.jsx("div", {
          className:"announcement-lightbox",onClick:()=>c(null),children:l.jsx("img", {
            src:o,alt:"Full size"
          })
        })]
      }):l.jsxs("div", {
        className:"announcement-single-view",children:[l.jsx("div", {
          className:"announcement-header",children:l.jsx("div", {
            className:"announcement-title",children:e.title
          })
        }),l.jsx("div", {
          className:"announcement-detail-content announcement-text-only",children:l.jsx("div", {
            className:"announcement-message",children:XI(e.message,n)
          })
        }),l.jsx("div", {
          className:"announcement-actions",children:l.jsx("button", {
            className:"announcement-btn-primary",type:"button",onClick:m,children:"Đã hiểu"
          })
        })]
      })
    })
  })
}
function V4() {
  const n=br(),e=oi(), {
    t
  }
  =ni(), {
    user:i,checkAuth:r
  }
  =nn(),s=new URLSearchParams(n.search),a=s.get("type")==="deposit"?"deposit":"purchase",o=s.get("amount"),c=s.get("tx");
  let d=[];
  if(a==="purchase")try {
    const p=localStorage.getItem("lastPurchaseSummary");
    if(p) {
      const y=JSON.parse(p);
      Array.isArray(y)&&(d=y)
    }
  }
  catch {
    d=[]
  }
  const u=o&&!isNaN(Number(o))?Math.round(Number(o)):null,f=u?`${u.toLocaleString("vi-VN")} G`:"-",h=t(a==="deposit"?"complete.depositTitle":"complete.purchaseTitle"),m=t(a==="deposit"?"complete.depositMessage":"complete.purchaseMessage");
  return g.useEffect(()=> {
    const p=document.body.style.overflow,y=document.documentElement.style.overflow;
    return document.body.style.overflow="hidden",document.documentElement.style.overflow="hidden",()=> {
      document.body.style.overflow=p,document.documentElement.style.overflow=y
    }
  },[]),g.useEffect(()=> {
    a==="deposit"&&r().catch(()=>{})
  },[a,r]),l.jsxs("div", {
    className:"complete-page",children:[l.jsx("div", {
      className:"complete-banner",children:l.jsx("div", {
        className:"complete-banner-tab",children:t("complete.thankYouTab")
      })
    }),l.jsxs("div", {
      className:"complete-main",children:[l.jsxs("section", {
        className:"complete-main-left",children:[l.jsxs("h1", {
          className:"complete-title",children:[l.jsx(nK, {
            className:"complete-title-icon"
          }),l.jsx("span", {
            children:h
          })]
        }),l.jsx("div", {
          className:"complete-message-block",children:l.jsx("p", {
            className:"complete-message-line",children:m
          })
        }),l.jsxs("div", {
          className:"complete-receipt",children:[l.jsx("h2", {
            className:"complete-receipt-title",children:t("complete.receiptTitle")
          }),l.jsx("p", {
            className:"complete-receipt-text",children:t("complete.receiptDescription")
          }),l.jsxs("div", {
            className:"complete-receipt-row",children:[l.jsx("span", {
              className:"complete-receipt-label",children:t("complete.accountNameLabel")
            }),l.jsx("span", {
              className:"complete-receipt-value",children:(i==null?void 0:i.username)||"-"
            })]
          }),l.jsxs("div", {
            className:"complete-receipt-row",children:[l.jsx("span", {
              className:"complete-receipt-label",children:t("complete.totalLabel")
            }),l.jsx("span", {
              className:"complete-receipt-value",children:f
            })]
          }),l.jsxs("div", {
            className:"complete-receipt-row",children:[l.jsx("span", {
              className:"complete-receipt-label",children:t("complete.confirmationCodeLabel")
            }),l.jsx("span", {
              className:"complete-receipt-value",children:c||"-"
            })]
          }),a==="purchase"&&d.length>0&&l.jsxs("div", {
            className:"complete-game-summary",children:[d[0].image&&l.jsx("img", {
              src:d[0].image,alt:d[0].title,className:"complete-game-image"
            }),l.jsxs("div", {
              className:"complete-game-info",children:[l.jsx("div", {
                className:"complete-game-title",children:d[0].title
              }),d.length>1&&l.jsxs("div", {
                className:"complete-game-extra",children:["+ ",d.length-1," ",d.length-1===1?"game":"games"]
              }),l.jsxs("div", {
                className:"complete-game-platforms",children:[d.some(p=> {
                  var y;
                  return(y=p.platform)==null?void 0:y.windows
                })&&l.jsx("span", {
                  className:"complete-game-platform-icon",title:"Windows",children:l.jsx(Pg,{})
                }),d.some(p=> {
                  var y;
                  return(y=p.platform)==null?void 0:y.mac
                })&&l.jsx("span", {
                  className:"complete-game-platform-icon",title:"Mac",children:l.jsx(Rg,{})
                }),d.some(p=> {
                  var y;
                  return(y=p.platform)==null?void 0:y.linux
                })&&l.jsx("span", {
                  className:"complete-game-platform-icon",title:"Linux",children:l.jsx(jg,{})
                })]
              })]
            })]
          })]
        }),l.jsxs("div", {
          className:"complete-footer-actions",children:[l.jsxs("button", {
            className:"complete-primary-btn",onClick:()=>window.print(),children:[l.jsx(qH, {
              style: {
                marginRight:6
              }
            }),t("complete.printReceipt")]
          }),l.jsx("button", {
            className:"complete-secondary-btn",onClick:()=> {
              const y=new URLSearchParams(n.search).get("type");
              n.pathname.startsWith("/store")?e("/store", {
                replace:!0
              }):e("/store")
            },children:t("complete.returnToStore")
          }),a==="purchase"&&l.jsx("button", {
            className:"complete-secondary-btn",onClick:()=>e("/library"),children:t("complete.goToLibrary")
          })]
        })]
      }),l.jsxs("aside", {
        className:"complete-main-right",children:[l.jsx("h2", {
          className:"complete-assist-title",children:t("complete.assistTitle")
        }),l.jsx("p", {
          className:"complete-assist-text",children:t("complete.assistDescription")
        })]
      })]
    })]
  })
}
function yK() {
  var v,b;
  const {
    isActive:n,currentStep:e,steps:t,nextStep:i,prevStep:r,completeTutorial:s
  }
  =la(),a=oi(),o=br(),[c,d]=g.useState(null),[u,f]=g.useState(null),h=g.useRef(null);
  if(g.useEffect(()=> {
    if(!n||t.length===0)return;
    let w;
    const S=()=> {
      const E=t[e];
      if(!E)return;
      const x=document.querySelector(E.target);
      if(x) {
        const k=x.getBoundingClientRect();
        if(k.width===0&&k.height===0)return;
        if(d(C=>C&&C.x===k.x&&C.y===k.y&&C.width===k.width&&C.height===k.height?C:k),h.current) {
          const C=h.current.getBoundingClientRect(),_=C.width,M=C.height,j=E.position||"bottom";
          let B=0,G=0;
          switch(j) {
            case"top":B=k.top-M-20,G=k.left+k.width/2-_/2;
            break;
            case"bottom":B=k.bottom+20,G=k.left+k.width/2-_/2;
            break;
            case"left":B=k.top+k.height/2-M/2,G=k.left-_-20;
            break;
            case"right":B=k.top+k.height/2-M/2,G=k.right+20;
            break;
            case"center":B=window.innerHeight/2-M/2,G=window.innerWidth/2-_/2;
            break
          }
          f(W=>W&&W.top===B&&W.left===G?W: {
            top:B,left:G
          })
        }
      }
      w=requestAnimationFrame(S)
    },T=t[e];
    if(T) {
      let E=0;
      const x=()=> {
        const k=document.querySelector(T.target);
        if(k) {
          const C=k.getBoundingClientRect();
          if(C.width>0&&C.height>0) {
            k.scrollIntoView( {
              behavior:"smooth",block:"center"
            }),w=requestAnimationFrame(S);
            return
          }
        }
        E<20&&(E++,setTimeout(x,100))
      };
      x()
    }
    return()=> {
      w&&cancelAnimationFrame(w)
    }
  },[n,e,t]),!n||t.length===0||e>=t.length)return null;
  const m=t[e],p=e===0,y=e===t.length-1;
  return l.jsxs(l.Fragment, {
    children:[l.jsx("div", {
      className:"tutorial-overlay"
    }),c&&l.jsx("div", {
      className:"tutorial-spotlight",style: {
        top:c.top-8,left:c.left-8,width:c.width+16,height:c.height+16
      }
    }),l.jsxs("div", {
      ref:h,className:"tutorial-tooltip",style: {
        visibility:u?"visible":"hidden",top:u?`${Math.max(20,Math.min(u.top,window.innerHeight-(((v=h.current)==null?void 0:v.getBoundingClientRect().height)||200)-20))}px`:"50%",left:u?`${Math.max(20,Math.min(u.left,window.innerWidth-(((b=h.current)==null?void 0:b.getBoundingClientRect().width)||300)-20))}px`:"50%"
      },children:[l.jsx("div", {
        className:"tutorial-tooltip-header",children:l.jsxs("div", {
          className:"tutorial-step-indicator",children:[e+1," / ",t.length]
        })
      }),l.jsxs("div", {
        className:"tutorial-tooltip-content",children:[l.jsx("h3", {
          className:"tutorial-title",children:m.title
        }),l.jsx("p", {
          className:"tutorial-description",children:m.description
        })]
      }),l.jsxs("div", {
        className:"tutorial-tooltip-footer",children:[!p&&l.jsx("button", {
          className:"tutorial-btn tutorial-btn-secondary",onClick:r,children:"Trước đó"
        }),l.jsx("div", {
          style: {
            flex:1
          }
        }),l.jsx("button", {
          className:"tutorial-btn tutorial-btn-primary",onClick:()=> {
            if(y) {
              const w=t[t.length-1];
              s(w.tutorialKey,w.navigateTo),w.navigateTo&&o.pathname!==w.navigateTo&&setTimeout(()=> {
                a(w.navigateTo)
              },500)
            }
            else i()
          },children:y?"Hoàn thành":"Tiếp theo"
        })]
      })]
    })]
  })
}
function vK() {
  const {
    user:n,sessionId:e,checkAuth:t
  }
  =nn(),[i,r]=g.useState(""),[s,a]=g.useState(""),[o,c]=g.useState(""),[d,u]=g.useState(null),[f,h]=g.useState(!1);
  if(!n||!n.username.startsWith("g_"))return null;
  const m=async p=> {
    if(p.preventDefault(),u(null),!i||!s||!o) {
      u("Vui lòng điền đầy đủ thông tin.");
      return
    }
    if(i.length<3||i.length>15) {
      u("Tên đăng nhập phải từ 3 đến 15 ký tự.");
      return
    }
    if(!/^[a-zA-Z0-9_]+$/.test(i)) {
      u("Tên đăng nhập chỉ được chứa chữ cái, số và dấu gạch dưới.");
      return
    }
    if(s!==o) {
      u("Mật khẩu nhập lại không khớp.");
      return
    }
    h(!0);
    try {
      const v=await fetch(`${Se}/auth/google/complete-profile`, {
        method:"POST",headers: {
          "Content-Type":"application/json",Authorization:`Bearer ${e}`
        },body:JSON.stringify( {
          newUsername:i,newPassword:s
        })
      }),b=await v.json();
      if(!v.ok||!b.success)throw new Error(b.message||"Đã xảy ra lỗi khi cập nhật thông tin.");
      await t()
    }
    catch(v) {
      u(v.message)
    }
    finally {
      h(!1)
    }
  };
  return l.jsx("div", {
    className:"cpm-overlay",children:l.jsxs("div", {
      className:"cpm-modal",children:[l.jsxs("div", {
        className:"cpm-header",children:[l.jsx("h2", {
          className:"cpm-title",children:"Tạo Tài Khoản"
        }),l.jsx("p", {
          className:"cpm-subtitle",children:"Chào mừng bạn đến với Goslynk! Vì bạn đăng nhập qua Google lần đầu, vui lòng tạo Tên đăng nhập và Mật khẩu để bảo vệ tài khoản (Chỉ thực hiện 1 lần duy nhất)."
        })]
      }),l.jsxs("form", {
        className:"cpm-form",onSubmit:m,children:[d&&l.jsx("div", {
          className:"cpm-error",children:d
        }),l.jsxs("div", {
          className:"cpm-field",children:[l.jsx("label", {
            htmlFor:"cpm-username",children:"Tên đăng nhập (3 - 15 ký tự)"
          }),l.jsx("input", {
            id:"cpm-username",type:"text",value:i,onChange:p=>r(p.target.value),placeholder:"Nhập tên đăng nhập mới...",autoComplete:"off",maxLength:15
          })]
        }),l.jsxs("div", {
          className:"cpm-field",children:[l.jsx("label", {
            htmlFor:"cpm-password",children:"Mật khẩu"
          }),l.jsx("input", {
            id:"cpm-password",type:"password",value:s,onChange:p=>a(p.target.value),placeholder:"Nhập mật khẩu...",autoComplete:"new-password"
          })]
        }),l.jsxs("div", {
          className:"cpm-field",children:[l.jsx("label", {
            htmlFor:"cpm-confirm-password",children:"Xác nhận mật khẩu"
          }),l.jsx("input", {
            id:"cpm-confirm-password",type:"password",value:o,onChange:p=>c(p.target.value),placeholder:"Nhập lại mật khẩu...",autoComplete:"new-password"
          })]
        }),l.jsx("button", {
          type:"submit",className:"cpm-submit",disabled:f,children:f?"Đang xử lý...":"Xác nhận và Bắt đầu"
        })]
      })]
    })
  })
}
const bK=5*60*1e3,wK=10,wd=new Map;
function SK(n) {
  return n?JSON.stringify(n):"default"
}
function W4() {
  wd.clear()
}
async function If(n) {
  const e=SK(n),t=wd.get(e);
  if(t&&Date.now()-t.timestamp<bK)return t.data;
  const i=(n==null?void 0:n.page)??1,r=(n==null?void 0:n.limit)??20,s=n==null?void 0:n.filter,a=n==null?void 0:n.tag,o=n==null?void 0:n.sort,c=n==null?void 0:n.minPrice,d=n==null?void 0:n.maxPrice,u=new URL(`${Se}/games`);
  u.searchParams.set("page",String(i)),u.searchParams.set("limit",String(r)),s&&u.searchParams.set("filter",s),a&&u.searchParams.set("tag",a),o&&u.searchParams.set("sort",o),typeof c=="number"&&!Number.isNaN(c)&&u.searchParams.set("minPrice",String(c)),typeof d=="number"&&!Number.isNaN(d)&&u.searchParams.set("maxPrice",String(d));
  const f=await fetch(u.toString());
  if(!f.ok)throw new Error(`API /games failed with ${f.status}`);
  const h=await f.json();
  let m;
  if(h&&Array.isArray(h.data)&&h.pagination)m=h;
  else if(Array.isArray(h))m= {
    data:h,pagination: {
      total:h.length,page:1,limit:h.length,totalPages:1,hasNextPage:!1,hasPrevPage:!1
    }
  };
  else throw new Error("Invalid response structure from /games API");
  if(wd.size>=wK) {
    const p=wd.keys().next().value;
    p!==void 0&&wd.delete(p)
  }
  return wd.set(e, {
    data:m,timestamp:Date.now()
  }),m
}
async function yE(n) {
  const e=await fetch(`${Se}/games/${encodeURIComponent(n)}/refresh-banner`, {
    method:"POST"
  });
  if(!e.ok)throw new Error(`Refresh banner failed (${e.status})`);
  const t=await e.json();
  if(!t.success||!t.banner_url)throw new Error("No banner returned");
  return {
    banner_url:t.banner_url
  }
}
async function xK() {
  const n=await fetch(`${Se}/games/tags`);
  if(!n.ok)throw new Error(`Failed to fetch tags (${n.status})`);
  const e=await n.json();
  return e.success?e.tags:[]
}
function Ty() {
  if(typeof navigator>"u")return!1;
  const n=navigator.userAgent;
  return/Mac|iPhone|iPad|iPod/i.test(navigator.platform)||/Mac OS X/i.test(n)
}
const H4=g.createContext(void 0);
function EK( {
  children:n
}) {
  const[e,t]=g.useState("news"),[i,r]=g.useState(""),[s,a]=g.useState(""),[o,c]=g.useState([]),[d,u]=g.useState("none"),[f,h]=g.useState(""),[m,p]=g.useState(""),[y,v]=g.useState(""),[b,w]=g.useState(""),[S,T]=g.useState(null),[E,x]=g.useState(!0),[k,C]=g.useState(""),[_,M]=g.useState(""),j= {
    activeFilter:e,setActiveFilter:t,activeTag:i,setActiveTag:r,tagSearch:s,setTagSearch:a,allTags:o,setAllTags:c,priceSort:d,setPriceSort:u,minPrice:f,maxPrice:m,setMinPrice:h,setMaxPrice:p,minPriceDraft:y,maxPriceDraft:b,setMinPriceDraft:v,setMaxPriceDraft:w,activeDropdown:S,setActiveDropdown:T,showSubNav:E,setShowSubNav:x,newsTopImage:k,setNewsTopImage:C,denuvoTopImage:_,setDenuvoTopImage:M
  };
  return l.jsx(H4.Provider, {
    value:j,children:n
  })
}
function K4() {
  const n=g.useContext(H4);
  if(!n)throw new Error("useStoreFilter must be used within a StoreFilterProvider");
  return n
}
function TK() {
  const n=br(), {
    t:e
  }
  =ni(), {
    activeFilter:t,setActiveFilter:i,activeTag:r,setActiveTag:s,tagSearch:a,setTagSearch:o,allTags:c,priceSort:d,setPriceSort:u,minPrice:f,setMinPrice:h,maxPrice:m,setMaxPrice:p,minPriceDraft:y,setMinPriceDraft:v,maxPriceDraft:b,setMaxPriceDraft:w,activeDropdown:S,setActiveDropdown:T,showSubNav:E,newsTopImage:x,denuvoTopImage:k
  }
  =K4(),C=g.useMemo(()=> {
    if(!a.trim())return c;
    const j=a.toLowerCase();
    return c.filter(B=>B.toLowerCase().includes(j))
  },[c,a]);
  if(!(n.pathname==="/store"||n.pathname==="/"||n.pathname.startsWith("/store/")))return null;
  const M=j=> {
    T(S===j?null:j)
  };
  return l.jsxs("nav", {
    className:`store-sub-nav ${E?"":"nav-hidden"}`,children:[l.jsxs("div", {
      className:"store-sub-nav-left",children:[l.jsxs("button", {
        type:"button",className:`store-sub-nav-btn ${S==="tags"?"active":""}`,onClick:()=>M("tags"),children:[l.jsx("span", {
          className:"store-sub-nav-label",children:"Thể loại"
        }),l.jsx("span", {
          className:"store-sub-nav-caret",children:"▾"
        })]
      }),l.jsxs("button", {
        type:"button",className:`store-sub-nav-btn ${S==="features"?"active":""}`,onClick:()=>M("features"),children:[l.jsx("span", {
          className:"store-sub-nav-label",children:"Danh mục"
        }),l.jsx("span", {
          className:"store-sub-nav-caret",children:"▾"
        })]
      }),l.jsxs("button", {
        type:"button",className:`store-sub-nav-btn ${S==="price"?"active":""}`,onClick:()=>M("price"),children:[l.jsx("span", {
          className:"store-sub-nav-label",children:"Giá & Sắp xếp"
        }),l.jsx("span", {
          className:"store-sub-nav-caret",children:"▾"
        })]
      })]
    }),l.jsxs("div", {
      className:"store-sub-nav-panels",children:[S==="tags"&&l.jsxs("div", {
        className:"store-sub-nav-panel store-sub-nav-panel-tags",children:[l.jsx("div", {
          className:"tags-header-row",children:l.jsx("input", {
            type:"text",className:"tags-search-input",placeholder:"Tìm tags...",value:a,onChange:j=>o(j.target.value),autoFocus:!0
          })
        }),l.jsx("div", {
          className:"tags-chip-list",children:C.length===0?l.jsx("div", {
            className:"tags-empty",children:"Không tìm thấy tags"
          }):C.map(j=>l.jsx("button", {
            type:"button",className:`tag-chip ${r===j?"active":""}`,onClick:()=> {
              s(r===j?"":j),o(""),T(null)
            },children:j
          },j))
        })]
      }),S==="features"&&l.jsx("div", {
        className:"store-sub-nav-panel store-sub-nav-panel-features",children:l.jsxs("div", {
          className:"store-feature-card-row",children:[l.jsx("button", {
            type:"button",className:`feature-mega-card ${t==="news"?"active":""}`,style: {
              backgroundImage:x?`url("${x}")`:'url("https://cdn.akamai.steamstatic.com/steam/apps/1091500/header.jpg")'
            },onClick:()=>i("news"),children:l.jsx("span", {
              className:"feature-mega-label",children:"MỚI THÊM"
            })
          }),l.jsx("button", {
            type:"button",className:`feature-mega-card ${t==="nsfw"?"active":""}`,style: {
              backgroundImage:'url("https://cdn.akamai.steamstatic.com/steam/apps/3189470/header.jpg")'
            },onClick:()=> {
              window.dispatchEvent(new CustomEvent("store-nsfw-click")),T(null)
            },children:l.jsx("span", {
              className:"feature-mega-label",children:"NSFW"
            })
          }),l.jsx("button", {
            type:"button",className:`feature-mega-card ${t==="denuvo"?"active":""}`,style: {
              backgroundImage:k?`url("${k}")`:'url("https://cdn.akamai.steamstatic.com/steam/apps/2358720/header.jpg")'
            },onClick:()=>i("denuvo"),children:l.jsx("span", {
              className:"feature-mega-label",children:"DENUVO"
            })
          })]
        })
      }),S==="price"&&l.jsxs("div", {
        className:"store-sub-nav-panel store-sub-nav-panel-price",children:[l.jsxs("div", {
          className:"price-slider-row",children:[l.jsx("input", {
            type:"range",min:"0",max:"800000",step:"10000",className:"price-range-input",value:y||f||"0",onChange:j=> {
              const B=j.target.value.replace(/[^0-9]/g,"");
              v(B),h(B)
            }
          }),l.jsx("div", {
            className:"price-range-label",children:y||f?`Từ ${(Number(y||f)||0).toLocaleString("vi-VN")} G`:"Không giới hạn"
          })]
        }),l.jsxs("div", {
          className:"price-row",children:[l.jsxs("div", {
            className:"price-input-group",children:[l.jsx("label", {
              children:"Từ"
            }),l.jsx("input", {
              className:"price-input-inline",value:y,inputMode:"numeric",size:Math.max(3,y.length+1),onChange:j=> {
                const B=j.target.value.replace(/[^0-9]/g,"");
                v(B)
              },onKeyDown:j=> {
                j.key==="Enter"&&h(y)
              },placeholder:"0"
            })]
          }),l.jsxs("div", {
            className:"price-input-group",children:[l.jsx("label", {
              children:"Đến"
            }),l.jsx("input", {
              className:"price-input-inline",value:b,inputMode:"numeric",size:Math.max(3,b.length+1),onChange:j=> {
                const B=j.target.value.replace(/[^0-9]/g,"");
                w(B)
              },onKeyDown:j=> {
                j.key==="Enter"&&p(b)
              },placeholder:"∞"
            })]
          }),(f||m||d!=="none")&&l.jsx("button", {
            type:"button",className:"price-clear-btn-inline",onClick:()=> {
              h(""),p(""),v(""),w(""),u("none")
            },children:"Xóa"
          })]
        }),l.jsxs("div", {
          className:"price-sort-row",children:[l.jsx("button", {
            type:"button",className:`price-sort-btn ${d==="asc"?"active":""}`,onClick:()=>u(d==="asc"?"none":"asc"),children:"Giá ↑"
          }),l.jsx("button", {
            type:"button",className:`price-sort-btn ${d==="desc"?"active":""}`,onClick:()=>u(d==="desc"?"none":"desc"),children:"Giá ↓"
          })]
        })]
      })]
    })]
  })
}
function Y4( {
  isOpen:n,onClose:e,onPurchaseSuccess:t,isUpgrade:i=!1
}) {
  const {
    user:r,sessionId:s,checkAuth:a
  }
  =nn(), {
    t:o
  }
  =ni(), {
    showSuccess:c
  }
  =Ka(),[d,u]=g.useState([]),[f,h]=g.useState(!1),[m,p]=g.useState(null),[y,v]=g.useState(null),[b,w]=g.useState(null),[S,T]=g.useState("vip"),[E,x]=g.useState(null),k=K=> {
    const X=b||(r==null?void 0:r.vip_expires_at);
    if(!i||!X)return K.duration===30?15e4:K.price;
    const $=new Date,D=new Date(X).getTime()-$.getTime(),R=Math.max(0,Math.ceil(D/(1e3*60*60*24)));
    return R<=0?K.duration===30?15e4:K.price:K.duration===30?R>=25?99e3:K.price:K.duration===365?R>=6&&R<=7?22e5:R>=25?Math.round(22e5*.95):22e5:K.price
  };
  g.useEffect(()=> {
    n?(_(),i&&C()):(w(null),v(null))
  },[n,i]);
  const C=async()=> {
    if(s)try {
      const X=await(await fetch(`${Se}/auth/me?sessionId=${s}`, {
        headers: {
          Authorization:`Bearer ${s}`
        }
      })).json();
      X.success&&X.user&&w(X.user.vip_expires_at||null)
    }
    catch{}
  },_=async()=> {
    h(!0);
    try {
      const X=await(await fetch(`${Se}/vip/packages`, {
        headers: {
          Authorization:`Bearer ${s}`
        }
      })).json();
      X.success&&X.packages&&u(X.packages.filter($=>$.is_active))
    }
    catch{}finally {
      h(!1)
    }
  },M=d.filter(K=>K.type==="vip"),j=d.filter(K=>K.type==="vip_plus"),B=[ {
    id:"vip-voice-permanent",name:"VIP Voice Vĩnh Viễn",code:"VIPVOICE_PERM",type:"vip_voice",duration:0,price:15e4,description:"Gói VIP Voice mở khóa quyền truy cập tính năng Thuyết minh vĩnh viễn.",features:["Hỗ trợ ưu tiên Support","Sử dụng tính năng Thuyết minh","Icon VIP Voice đặc biệt"],is_active:!0
  }
  ],G=[...d,...B],W=async K=> {
    if(!r||!s) {
      v(o("vipPurchase.loginRequired"));
      return
    }
    if(!G.find($=>$.id===K)) {
      v("Package not found");
      return
    }
    U(K)
  },U=async K=> {
    if(!r||!s)return;
    const X=G.find(z=>z.id===K);
    if(!X)return;
    p(K),v(null);
    const $=i&&X.type==="vip_plus"?k(X):X.price;
    try {
      const z=await fetch(`${Se}/vip/purchase`, {
        method:"POST",headers: {
          "Content-Type":"application/json",Authorization:`Bearer ${s}`
        },body:JSON.stringify( {
          package_id:K,sessionId:s,upgrade_price:i?$:void 0,is_upgrade:i
        })
      }),D=await z.json();
      if(!z.ok)throw new Error(D.message||o("vipPurchase.purchaseFailed"));
      if(D.success)console.info("vip purchase success", {
        packageId:K,packageType:X.type
      }),c(o("vipPurchase.purchaseSuccess")||"Mua gói VIP thành công!"),await a(),t&&t(),e();
      else throw new Error(D.message||o("vipPurchase.purchaseFailed"))
    }
    catch(z) {
      v(z instanceof Error?z.message:o("vipPurchase.purchaseFailed"))
    }
    finally {
      p(null)
    }
  };
  g.useEffect(()=> {
    const K=S==="vip"?M:S==="vip_plus"?j:B;
    K.length>0&&!K.find(X=>X.id===E)&&x(K[0].id)
  },[d,S,M,j,B,E]);
  const Q=(K=>[...K==="vip"?M:K==="vip_plus"?j:B].sort(($,z)=>$.duration-z.duration))(S),te=Q.find(K=>K.id===E)||Q[0],ee=K=>K.type==="vip_voice"?"Vĩnh viễn":K.duration===7?"7 ngày":K.duration===30?"1 tháng":K.duration===365?"1 năm":`${K.duration} ngày`,he=K=>K.duration>=365,me=K=> {
    if(!K)return {
      displayPrice:0,originalPrice:null
    };
    if(i&&K.type==="vip_plus") {
      const X=k(K);
      return X!==K.price? {
        displayPrice:X,originalPrice:K.price
      }
      : {
        displayPrice:X,originalPrice:null
      }
    }
    return {
      displayPrice:K.price,originalPrice:null
    }
  }, {
    displayPrice:se,originalPrice:be
  }
  =me(te);
  return l.jsx(ho, {
    isOpen:n,onClose:e,title:o(i?"vipPurchase.upgradeTitle":"vipPurchase.title"),width:"1100px",children:l.jsxs("div", {
      className:"vip-purchase-modal",children:[y&&l.jsx("div", {
        className:"vip-error",children:y
      }),l.jsx("div", {
        className:"vip-packages-container",children:d.length===0&&!f?l.jsx("div", {
          className:"vip-empty",children:o("vipPurchase.noPackages")
        }):l.jsxs("div", {
          className:"vip-compact-layout",children:[l.jsxs("div", {
            className:"vip-tier-tabs",children:[l.jsxs("button", {
              type:"button",className:`vip-tier-tab ${S==="vip"?"active":""}`,onClick:()=>T("vip"),children:[l.jsx(Cc, {
                className:"vip-tier-icon basic"
              }),l.jsx("span", {
                children:"VIP Basic"
              })]
            }),l.jsxs("button", {
              type:"button",className:`vip-tier-tab ${S==="vip_plus"?"active":""}`,onClick:()=>T("vip_plus"),children:[l.jsx(xy, {
                className:"vip-tier-icon plus"
              }),l.jsx("span", {
                children:"VIP Plus"
              })]
            }),l.jsxs("button", {
              type:"button",className:`vip-tier-tab vip-voice-highlight ${S==="vip_voice"?"active":""}`,onClick:()=>T("vip_voice"),children:[l.jsx(U4, {
                className:"vip-tier-icon basic"
              }),l.jsx("span", {
                children:"VIP Voice"
              })]
            })]
          }),l.jsxs("div", {
            className:"vip-body-row",children:[l.jsxs("div", {
              className:"vip-duration-column",children:[l.jsx("div", {
                className:"vip-duration-label",children:"Thời hạn"
              }),l.jsxs("div", {
                className:"vip-duration-toggle",children:[Q.map(K=> {
                  const X=te&&K.id===te.id,$=he(K);
                  return l.jsxs("button", {
                    type:"button",className:`vip-duration-pill ${X?"active":""}`,onClick:()=>x(K.id),children:[l.jsx("span", {
                      className:"vip-duration-pill-label",children:ee(K)
                    }),$&&l.jsx("span", {
                      className:"vip-duration-discount-badge",children:"-20%"
                    })]
                  },K.id)
                }),Q.length===0&&l.jsx("div", {
                  className:"vip-duration-empty",children:"Không có gói khả dụng cho hạng này."
                })]
              })]
            }),l.jsxs("div", {
              className:"vip-features-column",children:[l.jsxs("div", {
                className:"vip-features-header",children:[l.jsx("div", {
                  className:"vip-selected-name",children:(te==null?void 0:te.name)||"Chưa chọn gói"
                }),te&&l.jsxs("div", {
                  className:"vip-selected-duration",children:[l.jsx(kb, {
                    className:"duration-icon"
                  }),ee(te)]
                })]
              }),l.jsxs("div", {
                className:"vip-features-list-wrapper",children:[(te==null?void 0:te.description)&&l.jsx("div", {
                  className:"vip-selected-description",children:te.description
                }),te!=null&&te.features&&te.features.length>0?l.jsx("ul", {
                  className:"vip-compact-features",children:te.features.map((K,X)=>l.jsxs("li", {
                    children:[l.jsx(kb, {
                      className:"feature-icon"
                    }),K]
                  },X))
                }):l.jsx("div", {
                  className:"vip-features-empty",children:"Không có mô tả tính năng cho gói này."
                })]
              })]
            })]
          }),l.jsxs("div", {
            className:`vip-footer-bar vip-footer-${S}`,children:[l.jsxs("div", {
              className:"vip-footer-pricing",children:[be&&l.jsxs("div", {
                className:"vip-footer-original-price",children:[be.toLocaleString("vi-VN")," G"]
              }),l.jsxs("div", {
                className:"vip-footer-price-main",children:[se.toLocaleString("vi-VN")," G"]
              }),i&&S==="vip_plus"&&l.jsx("div", {
                className:"vip-footer-upgrade-label",children:o("vipPurchase.upgradePrice")
              })]
            }),S==="vip_voice"&&(r!=null&&r.has_vip_voice)?l.jsxs("div", {
              style: {
                display:"flex",alignItems:"center",gap:"10px",color:"#2ecc71",fontWeight:600,fontSize:"1rem"
              },children:[l.jsx(kb,{}),l.jsx("span", {
                children:"Bạn đã sở hữu VIP Voice"
              })]
            }):l.jsx("button", {
              type:"button",className:`vip-footer-cta ${S==="vip_plus"?"vip-footer-cta-plus":"vip-footer-cta-basic"}`,disabled:!te||m!==null,onClick:()=>te&&W(te.id),children:o(m?"vipPurchase.processing":i&&S==="vip_plus"?"vipPurchase.upgradeNow":"vipPurchase.buyNow")
            })]
          })]
        })
      })]
    })
  })
}
function CK( {
  sessionId:n,onRenew:e,testSubscriptions:t,testMode:i=!1
}) {
  const[r,s]=g.useState([]),[a,o]=g.useState(()=> {
    const E=localStorage.getItem("vipExpirationDismissed");
    return E?JSON.parse(E):{}
  }),[c,d]=g.useState(!0),[u,f]=g.useState(!1),h=i||t&&t.length>0,m=()=>new Date().toISOString().split("T")[0],p=(E,x)=> {
    const k=`vipDismissed_${x}_${m()}`,C=localStorage.getItem(k),_=m();
    return C!==_
  },y=E=> {
    const x=`vipDismissed_${E}_${m()}`;
    localStorage.setItem(x,m())
  },v=E=> {
    const x=new Date,C=new Date(E).getTime()-x.getTime();
    return Math.ceil(C/(1e3*60*60*24))
  };
  g.useEffect(()=> {
    if(h&&t) {
      s(t),d(!1);
      return
    }
    if(!n) {
      d(!1);
      return
    }
    (async()=> {
      try {
        const k=await(await fetch(`${Se}/vip/all-subscriptions?sessionId=${n}`, {
          headers: {
            Authorization:`Bearer ${n}`
          }
        })).json();
        k.success&&k.data&&s(k.data.subscriptions||[])
      }
      catch(x) {
        console.error("Failed to fetch subscriptions:",x)
      }
      finally {
        d(!1)
      }
    })()
  },[n,t,i,h]),g.useEffect(()=> {
    if(c||h) {
      f(!!h);
      return
    }
    let E=!1;
    for(const x of r) {
      const k=v(x.expires_at);
      if(k<=5) {
        E=!0;
        break
      }
      else if(k<=15&&p(k,x.type)) {
        E=!0;
        break
      }
    }
    f(E)
  },[r,c,h]),g.useEffect(()=> {
    if(!h&&u) {
      const E=setTimeout(()=> {
        f(!1)
      },1e4);
      return()=>clearTimeout(E)
    }
  },[u,h]);
  const b=E=> {
    if((r.find(k=>k.type===E)?v(r.find(k=>k.type===E).expires_at):0)<=5) {
      const k= {
        ...a,[E]:!0
      };
      o(k),localStorage.setItem("vipExpirationDismissed",JSON.stringify(k))
    }
    else y(E);
    f(!1)
  },w=E=> {
    b(E),e()
  };
  if(c)return null;
  const S=new Date,T=r.filter(E=>new Date(E.expires_at)>S&&!a[E.type]);
  return u?l.jsx("div", {
    className:"vip-expiration-container",children:T.map(E=> {
      const x=v(E.expires_at),k=x<=7,C=E.type==="vip_plus",_=E.type==="netflix";
      return l.jsxs("div", {
        className:`vip-expiration-notice ${k?"urgent":""}`,children:[l.jsxs("div", {
          className:"vip-expiration-content",children:[l.jsx("div", {
            className:"vip-expiration-icon",children:C?l.jsx(xy,{}):_?l.jsx(Cc,{}):l.jsx(rS,{})
          }),l.jsxs("div", {
            className:"vip-expiration-info",children:[l.jsxs("div", {
              className:"vip-expiration-title",children:[C?"VIP Plus":_?"Netflix":"VIP"," sắp hết hạn",h&&l.jsx("span", {
                style: {
                  fontSize:"10px",marginLeft:"8px",color:"#ff6b35"
                },children:"[TEST]"
              })]
            }),l.jsx("div", {
              className:"vip-expiration-subtitle",children:x<=3?"Sắp hết rồi!":x<=7?"Thời gian của bạn sắp hêt":"Nhớ gia hạn nhé"
            }),l.jsxs("div", {
              className:"vip-expiration-countdown",children:[l.jsx($H, {
                className:"countdown-icon"
              }),l.jsxs("span", {
                children:["Còn ",l.jsx("strong", {
                  children:x
                })," ngày"]
              })]
            })]
          }),l.jsxs("div", {
            className:"vip-expiration-actions",children:[l.jsx("button", {
              className:"vip-renew-btn",onClick:()=>w(E.type),children:"Gia hạn ngay"
            }),l.jsx("button", {
              className:"vip-dismiss-btn",onClick:()=>b(E.type),children:l.jsx(Dd,{})
            })]
          })]
        }),l.jsx("div", {
          className:"vip-expiration-progress",children:l.jsx("div", {
            className:"vip-expiration-progress-bar",style: {
              width:`${Math.max(0,(30-x)/30*100)}%`
            }
          })
        })]
      },E.id)
    })
  }):null
}
function IK( {
  onClose:n
}) {
  const {
    sessionId:e
  }
  =nn(), {
    t
  }
  =ni(),i=oi(),[r,s]=g.useState(null),[a,o]=g.useState(!0),[c,d]=g.useState(!1),[u,f]=g.useState(null),[h,m]=g.useState(null),[p,y]=g.useState(new Set),[v,b]=g.useState(null),w="nm_revealed_v1",S=M=> {
    const j=localStorage.getItem(w);
    if(!j)return[];
    try {
      const B=JSON.parse(j);
      return B.eventId!==M?[]:B.revealed||[]
    }
    catch {
      return[]
    }
  },T=(M,j)=> {
    localStorage.setItem(w,JSON.stringify( {
      eventId:M,revealed:j
    }))
  },E=async()=> {
    if(!(!e||!h)) {
      d(!0),f(null);
      try {
        const j=await(await fetch(`${Se}/nightmarket/buy/${h.id}`, {
          method:"POST",headers: {
            "Content-Type":"application/json",Authorization:`Bearer ${e}`
          }
        })).json();
        j.success?(s(B=>B? {
          ...B,items:B.items.map(G=>G.id===h.id? {
            ...G,purchased_by:e
          }
          :G)
        }
        :null),m(null),i("/history-order")):f( {
          type:"error",text:j.message||t("market.buyError")||"Mua thất bại"
        })
      }
      catch {
        f( {
          type:"error",text:t("market.connectionError")||"Lỗi kết nối"
        })
      }
      finally {
        d(!1)
      }
    }
  };
  g.useEffect(()=> {
    fetch(`${Se}/nightmarket/current`).then(M=>M.json()).then(M=> {
      M.success&&M.data&&(s(M.data),y(new Set(S(M.data.id))))
    }).catch(()=>{}).finally(()=>o(!1))
  },[]);
  const x=M=> {
    v||(b(M.id),f(null),setTimeout(()=> {
      if(b(null),m(M),!p.has(M.id)) {
        const j=new Set(p);
        j.add(M.id),y(j),T(r.id,[...j])
      }
    },620))
  },k=()=> {
    m(null),f(null)
  },C=r?r.items.every(M=>!!M.purchased_by):!1,_=r?Math.max(0,Math.ceil((new Date(r.ended_at).getTime()-Date.now())/864e5)):0;
  return l.jsx("div", {
    className:"nm-overlay",onClick:n,children:l.jsxs("div", {
      className:"nm-panel",onClick:M=>M.stopPropagation(),children:[l.jsxs("div", {
        className:"nm-header",children:[l.jsxs("div", {
          className:"nm-title-row",children:[l.jsx(Um, {
            className:"nm-fire-icon"
          }),l.jsx("h2", {
            className:"nm-title",children:"Nightmarket"
          }),r&&l.jsxs("span", {
            className:"nm-timer",children:["Còn ",_," ngày"]
          })]
        }),l.jsx("button", {
          className:"nm-close",onClick:n,children:"X"
        })]
      }),l.jsx("div", {
        className:"nm-body",children:a?l.jsx("div", {
          className:"nm-loading",children:l.jsx("div", {
            className:"nm-spinner"
          })
        }):r?C&&!h?l.jsxs("div", {
          className:"nm-empty",children:[l.jsx(Um, {
            className:"nm-empty-icon"
          }),l.jsx("p", {
            children:"Đã mở hết case!"
          }),l.jsx("span", {
            children:" Chờ sự kiện tiếp theo."
          })]
        }):h?l.jsxs("div", {
          className:"nm-reveal-area",children:[l.jsxs("div", {
            className:"nm-reveal-card",children:[l.jsxs("div", {
              className:"nm-reveal-img",children:[h.banner_url?l.jsx("img", {
                src:h.banner_url,alt:h.game_name
              }):l.jsx("div", {
                className:"nm-reveal-placeholder"
              }),l.jsxs("div", {
                className:"nm-reveal-discount-overlay",children:[l.jsx(qI,{})," -",h.discount_percent,"%"]
              })]
            }),l.jsxs("div", {
              className:"nm-reveal-info",children:[l.jsx("div", {
                className:"nm-reveal-name",children:h.game_name
              }),l.jsxs("div", {
                className:"nm-reveal-prices",children:[l.jsxs("span", {
                  className:"nm-price-orig",children:[Number(h.original_price).toLocaleString("vi-VN")," G"]
                }),l.jsxs("span", {
                  className:"nm-price-sale",children:[Number(h.sale_price).toLocaleString("vi-VN")," G"]
                })]
              })]
            })]
          }),u&&l.jsxs("div", {
            className:"nm-result error",children:[l.jsx("div", {
              className:"nm-result-icon",children:l.jsxs("svg", {
                width:"36",height:"36",viewBox:"0 0 24 24",fill:"none",stroke:"#ef4444",strokeWidth:"2",children:[l.jsx("circle", {
                  cx:"12",cy:"12",r:"10"
                }),l.jsx("line", {
                  x1:"15",y1:"9",x2:"9",y2:"15"
                }),l.jsx("line", {
                  x1:"9",y1:"9",x2:"15",y2:"15"
                })]
              })
            }),l.jsx("div", {
              className:"nm-result-msg",children:u.text
            })]
          }),!u&&l.jsx("button", {
            type:"button",className:"nm-buy-btn",onClick:E,disabled:c||!!h.purchased_by,children:h.purchased_by?t("market.buySuccess")||"Đã mua":c?t("market.processing")||"Đang xử lý...":`${t("market.confirmPay")||"Thanh toán"} ${Number(h.sale_price).toLocaleString("vi-VN")} G`
          }),l.jsx("button", {
            type:"button",className:"nm-modal-cancel",onClick:k,children:t("market.close")||"Đóng"
          })]
        }):l.jsxs(l.Fragment, {
          children:[l.jsx("p", {
            className:"nm-hint",children:"Nhấn vào case để xem deal game giảm giá!"
          }),l.jsx("div", {
            className:"nm-cases-grid",children:r.items.map((M,j)=> {
              const B=p.has(M.id);
              return M.purchased_by,l.jsx("div", {
                className:`nm-case-card${B?" nm-case-card--revealed":""}${v===M.id?" nm-case-card--flipping":""}`,onClick:()=>!v&&x(M),style: {
                  animationDelay:`${j*.06}s`
                },children:B?l.jsxs("div", {
                  className:"nm-case-revealed",children:[l.jsxs("div", {
                    className:"nm-case-revealed-img",children:[M.banner_url?l.jsx("img", {
                      src:M.banner_url,alt:M.game_name
                    }):l.jsx("div", {
                      className:"nm-case-revealed-placeholder"
                    }),l.jsxs("div", {
                      className:"nm-case-revealed-discount",children:[l.jsx(qI,{})," -",M.discount_percent,"%"]
                    })]
                  }),l.jsxs("div", {
                    className:"nm-case-revealed-info",children:[l.jsx("span", {
                      className:"nm-case-revealed-name",children:M.game_name
                    }),l.jsxs("span", {
                      className:"nm-case-revealed-price",children:[Number(M.sale_price).toLocaleString("vi-VN")," G"]
                    })]
                  })]
                }):l.jsxs("div", {
                  className:"nm-case-front",children:[l.jsx("div", {
                    className:"nm-case-glow"
                  }),l.jsx("div", {
                    className:"nm-case-particles",children:[0,1,2,3,4,5].map(G=>l.jsx("div", {
                      className:"nm-particle",style: {
                        "--i":G
                      }
                    },G))
                  }),l.jsxs("div", {
                    className:"nm-case-label",children:[l.jsx(Um,{})," CASE ",j+1]
                  }),l.jsx("div", {
                    className:"nm-case-mystery",children:"?"
                  })]
                })
              },M.id)
            })
          })]
        }):l.jsxs("div", {
          className:"nm-empty",children:[l.jsx(Um, {
            className:"nm-empty-icon"
          }),l.jsx("p", {
            children:"Hiện tại chưa có event Nightmarket"
          }),l.jsx("span", {
            children:" Quay lại sau nhé!"
          })]
        })
      })]
    })
  })
}
function kK(n,e) {
  const t=document.createElement("div"),i=n.left+n.width/2,r=n.top+n.height/2,s=e.left+e.width/2,a=e.top+e.height/2;
  Object.assign(t.style, {
    position:"fixed",left:`${i}px`,top:`${r}px`,width:"12px",height:"12px",borderRadius:"50%",background:"radial-gradient(circle, #fff9c4 0%, #f5c518 55%, #e6a000 100%)",boxShadow:"0 0 10px 4px rgba(245, 197, 24, 0.8)",zIndex:"99999",pointerEvents:"none",transform:"translate(-50%, -50%) scale(1)",transition:`left ${.35}s cubic-bezier(0.4, 0.0, 0.2, 1), top ${.35}s cubic-bezier(0.4, 0.0, 0.2, 1), opacity 0.1s 0.28s ease`
  }),document.body.appendChild(t),requestAnimationFrame(()=> {
    requestAnimationFrame(()=> {
      t.style.left=`${s}px`,t.style.top=`${a}px`,t.style.opacity="0"
    })
  }),setTimeout(()=> {
    t.remove(),_K(s,a),q4(s,a,1)
  },380)
}
function _K(n,e) {
  const t=document.createElement("div");
  Object.assign(t.style, {
    position:"fixed",left:`${n}px`,top:`${e}px`,width:"32px",height:"32px",borderRadius:"50%",border:"2.5px solid #f5c518",transform:"translate(-50%, -50%) scale(0.5)",opacity:"1",zIndex:"99999",pointerEvents:"none",animation:"wlFxRing 0.35s ease-out forwards"
  }),document.body.appendChild(t),setTimeout(()=>t.remove(),400)
}
function q4(n,e,t) {
  const i=document.createElement("div"),r=t>0;
  Object.assign(i.style, {
    position:"fixed",left:`${n}px`,top:`${e-6}px`,transform:"translate(-50%, -50%)",zIndex:"99999",pointerEvents:"none",fontFamily:"var(--font-store, sans-serif)",fontWeight:"800",fontSize:"13px",color:r?"#f5c518":"#ff7676",textShadow:r?"0 0 8px rgba(245,197,24,0.9)":"0 0 8px rgba(255,118,118,0.9)",animation:r?"wlFxPlusOne 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards":"wlFxMinusOne 0.45s ease-in forwards"
  }),i.textContent=r?"+1":"-1",document.body.appendChild(i),setTimeout(()=>i.remove(),600)
}
let ek=!1;
function LK() {
  if(ek)return;
  ek=!0;
  const n=document.createElement("style");
  n.textContent=`
    @keyframes wlFxRing {
      0%   { transform: translate(-50%, -50%) scale(0.5); opacity: 1; }
      100% { transform: translate(-50%, -50%) scale(2.2); opacity: 0; }
    }
    @keyframes wlFxPlusOne {
      0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.6) translateY(0); }
      20%  { opacity: 1; transform: translate(-50%, -50%) scale(1.25) translateY(0); }
      100% { opacity: 0; transform: translate(-50%, -50%) scale(1) translateY(-28px); }
    }
    @keyframes wlFxMinusOne {
      0%   { opacity: 1; transform: translate(-50%, -50%) translateY(0); }
      100% { opacity: 0; transform: translate(-50%, -50%) translateY(24px); }
    }
  `,document.head.appendChild(n)
}
let tk=!1;
function MK() {
  if(tk)return;
  tk=!0,LK();
  const n=new Set;
  window.addEventListener("wishlistFx",e=> {
    const {
      fromRect:t,toRect:i,delta:r
    }
    =e.detail,s=`${Math.round(t.left)}_${Math.round(t.top)}`;
    if(!n.has(s))if(n.add(s),setTimeout(()=>n.delete(s),600),r>0)kK(t,i);
    else {
      const a=i.left+i.width/2,o=i.top+i.height/2;
      q4(a,o,-1)
    }
  })
}
function AK() {
  return g.useEffect(()=> {
    MK()
  },[]),null
}
const qp=["https://avatars.steamstatic.com/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg","https://api.dicebear.com/7.x/bottts/svg?seed=Goslynk1&backgroundColor=1b2838","https://api.dicebear.com/7.x/bottts/svg?seed=Goslynk2&backgroundColor=2a475e","https://api.dicebear.com/7.x/bottts/svg?seed=Goslynk3&backgroundColor=66c0f4","https://api.dicebear.com/7.x/bottts/svg?seed=Goslynk4&backgroundColor=c28f2c","https://shared.fastly.steamstatic.com/community_assets/images/items/3296260/ea50cd34208e8b6470a0ba96171c98b8d4fb7176.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2873080/b7aa246e15b0bb0033e3566b4ed7db3861efad84.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2873080/33e549955162361a7684873731207e3cce5d66ad.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2022180/e081bb44f8c79e9b5ae44d1be71aae559d7fcf88.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2873080/52a165249be20fb3755e9dfff33205506d457616.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2194530/cbb9975540917388d28f66420cc60357331b94a0.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1286990/f3be8d902648f1baa8d3dc93df849e6df1d9e400.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2593370/59a8f707049a6ba31d814eace41dbc03a192006b.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/3558920/22c4592abb8a36fc11bdecf7b88ba0c5f709a66f.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2459330/11bbadea5154c316c883df0f3f1944395b3715b8.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2873080/2cf13c9b16e68774aeaaa12f812d0f0e25a56548.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/236390/18d11f424e4c0481770ba42a034eeff3a30e7732.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/216150/5933160d2b734175fd7e7adbeb894fc1b4a02f08.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/662960/dc93cd9f1ce3ac26d99d33cf3e7b7a59927c32e1.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2507950/f60248b8dfdc8973308aac3d0f6df74e4375e412.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1390700/28a30c70a999c0673453a417a9e5df1ab76bc72d.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1442870/5c6d12fe965d46def2989e9fb74fc0b100765258.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1940340/8a6bf2dfc491be809c2fccf61f297d6f98ac049d.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2302140/43f645cf0d8009297f379da3f2294a8febf234ef.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/3339420/fde8c7b55cde823a32d47b7c862dc19b0f82d241.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2853160/f5b55f5076670e3f5803b621ee25055cd5d85e70.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2507950/17f4474b137df104d02f45c8edb8c8130dae4a4d.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/774171/ea16deb58fb1582c5ec3acfe5344fdc7b00077de.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/3489700/bebb6a24df08f483ead9c77fb363804851425f08.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1529220/a8ba0e6ab807cd1f9dbe24f3958242e2d989e8c6.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1260320/5583056d8caa52d8be8a8da6dec13797924ead67.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2139460/ceac3f2dd323201409ff386df51811edefe515bb.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2018640/20e81a85eedd2d7e619242fcd1b9c4c416486784.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/3489700/3171bc1876f9606456b976036cb98aac6f7d803a.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2861720/0f9367f89fad6b92c96b686442d61bcb86d627f5.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2593370/5a2a47d2f5a3be9ef3e769892df633dc2cb11d88.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/1091500/d3ca470b90fe64e5203af68b5238e99665b05e2f.gif","https://shared.fastly.steamstatic.com/community_assets/images/items/2055500/9fa2a22c70382fcc6658728d23759d1fa36bd61f.gif"],NK= {
  0:0,1:0,2:0,3:0,4:0,5:1e4,6:1e4,7:1e4,8:1e4,9:1e4,10:1e4,11:1e4,12:15e3,13:15e3,14:15e3,15:15e3,16:15e3,17:15e3,18:15e3,19:15e3,20:2e4,21:2e4,22:2e4,23:2e4,24:2e4,25:2e4,26:2e4,27:25e3,28:25e3,29:25e3,30:25e3,31:25e3,32:25e3,33:25e3,34:3e4,35:3e4,36:3e4,37:3e4
},nk=n=> {
  const e=parseInt(n.replace("avatar_",""),10);
  return e>=0&&e<qp.length?qp[e]:qp[0]
},ik=n=> {
  const e=parseInt(n.replace("avatar_",""),10);
  return NK[e]||0
},rk=n=> {
  const e=parseInt(n.replace("avatar_",""),10);
  return e>=0&&e<=4
};
function RK( {
  children:n
}) {
  var Pl,Kr,xs,qa;
  const e=br(),t=oi(), {
    user:i,logout:r,sessionId:s,checkAuth:a,hardwareBanned:o,banReason:c
  }
  =nn(), {
    t:d
  }
  =ni(), {
    showWarning:u
  }
  =Ka(), {
    startTutorial:f,isActive:h
  }
  =la(), {
    openCartOverlay:m,closeCartOverlay:p,isCartOverlayOpen:y
  }
  =Sy(),[v,b]=g.useState(!1),[w,S]=g.useState( {
    isOpen:!1,message:""
  }),[T,E]=g.useState(""),[x,k]=g.useState([]),[C,_]=g.useState(!1),[M,j]=g.useState(0),[B,G]=g.useState(0),[W,U]=g.useState(0),[q,Q]=g.useState([]),[te,ee]=g.useState(0),[he,me]=g.useState(0),[se,be]=g.useState(!1),[K,X]=g.useState(!1),$=Ty(),z=se&&!$,D=g.useCallback(async ge=> {
    if(!(!se||$||ge.button!==0||ge.target.closest('button, a, input, select, textarea, label, [data-tauri-drag-region="false"]')))try {
      await si().startDragging()
    }
    catch{}
  },[se,$]),[R,L]=g.useState(!1),[A,N]=g.useState(!1),[V,O]=g.useState(!1),[F,J]=g.useState(!1),[re,ie]=g.useState(!1),[fe,ce]=g.useState(""),[ke,Pe]=g.useState(!1),de=g.useRef(null),ze=g.useRef(null),[Xe,Ye]=g.useState({});
  g.useRef(!1),g.useRef(!1);
  const ve=g.useRef(!1),[nt,ft]=g.useState( {
    discount_denuvo_enabled:!0,discount_normal_enabled:!0
  }),[Rt,Mt]=g.useState(!1),[Ze,Fe]=g.useState(!0),[le,pe]=g.useState(null),_e="netflixHideMainPreference",[Ge,Ve]=g.useState({}),[qe,rt]=g.useState(!1),[bt,mt]=g.useState(!1),[Nt,Ae]=g.useState(!1),[dt,Wt]=g.useState([]),[Le,Qe]=g.useState(null),[ot,xt]=g.useState(null),[Ee,Ke]=g.useState(null),$e=g.useRef(null),st=g.useRef( {
    isDown:!1,startX:0,scrollLeft:0
  }),Ct=ge=> {
    $e.current&&(st.current.isDown=!0,$e.current.classList.add("dragging"),st.current.startX=ge.pageX-$e.current.offsetLeft,st.current.scrollLeft=$e.current.scrollLeft)
  },wt=()=> {
    var ge;
    st.current.isDown=!1,(ge=$e.current)==null||ge.classList.remove("dragging")
  },Z=ge=> {
    if(!st.current.isDown||!$e.current)return;
    ge.preventDefault();
    const _t=(ge.pageX-$e.current.offsetLeft-st.current.startX)*1.5;
    $e.current.scrollLeft=st.current.scrollLeft-_t
  },ue=ge=> {
    $e.current&&($e.current.scrollLeft+=ge.deltaY)
  },ye=ge=>e.pathname===ge?"nav-item active":"nav-item",Ne=ge=>ge&&(Xe[ge.app_id]||ge.banner_url)||"",et=async ge=> {
    if(!(!ge||Xe[ge]==="__failed"))try {
      const ct=await yE(ge);
      Ye(_t=>( {
        ..._t,[ge]:ct.banner_url
      }))
    }
    catch {
      Ye(ct=>( {
        ...ct,[ge]:"__failed"
      }))
    }
  };
  g.useEffect(()=> {
    const ge=zn();
    be(ge),ge&&(async()=> {
      try {
        const Jt=await si().isMaximized();
        L(Jt)
      }
      catch{}
    })()
  },[]),g.useEffect(()=> {
    (async()=> {
      try {
        const _t=await fetch(`${Se}/settings/discount`);
        if(_t.ok) {
          const Jt=await _t.json();
          Jt.success&&ft( {
            discount_denuvo_enabled:Jt.discount_denuvo_enabled??!0,discount_normal_enabled:Jt.discount_normal_enabled??!0
          })
        }
      }
      catch{}
    })(),fetch(`${Se}/admin/netflix/visibility`).then(_t=>_t.ok?_t.json():null).then(_t=> {
      _t!=null&&_t.success&&_t.data&&Ve(_t.data)
    }).catch(()=>{});
    const ct=_t=> {
      _t.detail&&(ft( {
        discount_denuvo_enabled:_t.detail.discount_denuvo_enabled??!0,discount_normal_enabled:_t.detail.discount_normal_enabled??!0
      }),lt.current.clear())
    };
    return window.addEventListener("discountSettingsChanged",ct),()=> {
      window.removeEventListener("discountSettingsChanged",ct)
    }
  },[]),g.useEffect(()=> {
    const ge=ct=> {
      de.current&&!de.current.contains(ct.target)&&_(!1),Si.current&&!Si.current.contains(ct.target)&&Dn.current&&!Dn.current.contains(ct.target)&&it(!1)
    };
    return document.addEventListener("mousedown",ge),()=>document.removeEventListener("mousedown",ge)
  },[]);
  const lt=g.useRef(new Map);
  g.useEffect(()=> {
    if(!T.trim()) {
      k([]),_(!1);
      return
    }
    if(document.hidden) {
      k([]),_(!1);
      return
    }
    const ge=setTimeout(()=> {
      document.hidden||fetch(`${Se}/games/search/${encodeURIComponent(T)}`).then(ct=>ct.json()).then(async ct=> {
        if(document.hidden)return;
        const _t=ct.map(Jt=> {
          const qn=Math.round(Number(Jt.price??0));
          return {
            ...Jt,discountPercent:0,originalPrice:void 0,finalPrice:qn
          }
        });
        document.hidden||(k(_t),_(_t.length>0))
      }).catch(()=> {
        document.hidden||(k([]),_(!1))
      })
    },300);
    return()=>clearTimeout(ge)
  },[T]),g.useEffect(()=> {
    if(!s||!i) {
      j(0);
      return
    }
    const ge=async()=> {
      try {
        const Jt=await fetch(`${Se}/wishlist/count?sessionId=${s}`, {
          headers: {
            Authorization:`Bearer ${s}`
          }
        });
        if(Jt.ok) {
          const qn=await Jt.json();
          qn.success&&j(qn.count||0)
        }
      }
      catch{}
    };
    ge();
    const ct=Jt=> {
      var On;
      const qn=(On=Jt.detail)==null?void 0:On.delta;
      typeof qn=="number"?j(ln=>Math.max(0,ln+qn)):ge()
    };
    window.addEventListener("wishlistUpdated",ct);
    const _t=setInterval(ge,3e5);
    return()=> {
      window.removeEventListener("wishlistUpdated",ct),clearInterval(_t)
    }
  },[s,i]);
  const kt=()=> {
    T.trim()&&(t(`/search?term=${encodeURIComponent(T)}`),_(!1),E(""))
  },Gt=ge=> {
    ge.key==="Enter"&&kt()
  },fn=ge=> {
    t(`/store/${ge}`),_(!1),E("")
  },on=()=> {
    E(""),k([]),_(!1)
  },Ot=async()=> {
    await r(),t("/login"),b(!1)
  },rn=()=> {
    let ge=[];
    try {
      if(i!=null&&i.unlocked_avatars) {
        const ct=typeof i.unlocked_avatars=="string"?JSON.parse(i.unlocked_avatars):i.unlocked_avatars;
        Array.isArray(ct)&&(ge=ct)
      }
    }
    catch(ct) {
      console.error("Lỗi đọc dữ liệu avatar:",ct),ge=[]
    }
    Wt([...ge,"avatar_0","avatar_1","avatar_2","avatar_3","avatar_4"]),Ae(!0),b(!1)
  };
  g.useEffect(()=> {
    const ge=()=>rn();
    return window.addEventListener("openAvatarModal",ge),e.state&&e.state.openAvatarModal&&(ge(),t(e.pathname, {
      replace:!0,state:{}
    })),()=>window.removeEventListener("openAvatarModal",ge)
  },[i,e.state]);
  const mi=()=> {
    Ae(!1),Qe(null)
  },wn=ge=> {
    const ct=(i==null?void 0:i.role)||"user";
    return ct==="admin"||ct==="super_admin"?!0:dt.includes(ge)
  },Nr=async ge=> {
    if(!(!wn(ge)&&!rk(ge)))try {
      const ct=await fetch(`${Se}/user/avatar`, {
        method:"PUT",headers: {
          "Content-Type":"application/json",...s? {
            Authorization:`Bearer ${s}`
          }
          :{}
        },body:JSON.stringify( {
          avatar_id:ge
        })
      });
      if(ct.ok) {
        const _t=await ct.json();
        i&&(i.avatar_url=_t.avatar_url),mi(),a&&await a()
      }
    }
    catch(ct) {
      console.error("Failed to update avatar:",ct)
    }
  },Rr=async ge=> {
    if(!i)return;
    const ct=ik(ge);
    if(i.p_balance<ct) {
      S( {
        isOpen:!0,title:"Không đủ Point",message:`Bạn cần ${ct.toLocaleString("vi-VN")} Point để mở khóa avatar này.`,type:"warning"
      });
      return
    }
    xt(ge);
    try {
      const _t=await fetch(`${Se}/user/avatar/unlock`, {
        method:"POST",headers: {
          "Content-Type":"application/json",...s? {
            Authorization:`Bearer ${s}`
          }
          :{}
        },body:JSON.stringify( {
          avatar_id:ge
        })
      });
      if(_t.ok) {
        const Jt=await _t.json();
        Ke(ge),setTimeout(async()=> {
          Ke(null),Wt(qn=>[...qn,ge]),i.p_balance=Jt.new_balance,i.avatar_url=ge,a&&await a()
        },1e3)
      }
      else {
        const Jt=await _t.json();
        S( {
          isOpen:!0,title:"Lỗi",message:Jt.message||"Lỗi giao dịch",type:"error"
        })
      }
    }
    catch(_t) {
      console.error("Failed to buy avatar:",_t)
    }
    finally {
      xt(null)
    }
  },hn=async()=> {
    if(se)try {
      await si().minimize()
    }
    catch{}
  },_n=async()=> {
    if(se)try {
      const ge=si();
      await ge.isMaximized()?(await ge.unmaximize(),L(!1)):(await ge.maximize(),L(!0))
    }
    catch{}
  },Pn=async()=> {
    if(se)try {
      await si().close()
    }
    catch{}
  },zi=async(ge,ct)=> {
    try {
      se?await oe("open_webview_window", {
        url:ge,hideMain:ct
      }):window.open(ge,"_blank","noopener,noreferrer")
    }
    catch {
      window.open(ge,"_blank","noopener,noreferrer")
    }
  },zo=async ge=> {
    if(ge.preventDefault(),!i||i.role!=="admin"&&i.role!=="super_admin"&&i.role!=="vip_plus"&&i.role!=="netflix") {
      S( {
        isOpen:!0,title:"VIP+ Required",message:"You need to upgrade to VIP+ or Netflix to access Netflix. Please upgrade your account.",type:"warning"
      });
      return
    }
    const ct="https://netflix.com/login";
    if(!se) {
      window.open(ct,"_blank","noopener,noreferrer");
      return
    }
    const _t=(()=> {
      try {
        return localStorage.getItem(_e)
      }
      catch {
        return null
      }
    })();
    if(_t==="always_hide") {
      await zi(ct,!0);
      return
    }
    if(_t==="never_hide") {
      await zi(ct,!1);
      return
    }
    pe(ct),Mt(!0)
  },ua=async ge=> {
    const ct=le||"https://netflix.com/login";
    if(Ze)try {
      localStorage.setItem(_e,ge?"always_hide":"never_hide")
    }
    catch{}Mt(!1),pe(null),await zi(ct,ge)
  },ae=()=> {
    !i||i.role!=="admin"&&i.role!=="super_admin"||t("/admin")
  },[We,it]=g.useState(!1),[St,Bt]=g.useState([]),Si=g.useRef(null),Dn=g.useRef(null),ws=async()=> {
    if(!We&&s)try {
      const ct=await(await fetch(`${Se}/api/market/recent-notifications`, {
        headers: {
          Authorization:`Bearer ${s}`
        }
      })).json();
      ct.success&&Bt(ct.data),te>0&&fetch(`${Se}/api/market/mark-read`, {
        method:"POST",headers: {
          Authorization:`Bearer ${s}`
        }
      }).then(()=>ee(0)).catch(()=>{})
    }
    catch{}it(!We)
  },Ws=g.useRef(!0),Ss=g.useRef(!0),Hr=g.useRef(te),Go=g.useRef(he);
  g.useEffect(()=> {
    Hr.current=te
  },[te]),g.useEffect(()=> {
    Go.current=he
  },[he]),g.useEffect(()=> {
    if(!s||!i)return;
    const ge=i.role==="admin"||i.role==="super_admin",ct=async()=> {
      try {
        const[Jt,qn]=await Promise.all([fetch(`${Se}/api/market/unread-count`, {
          headers: {
            Authorization:`Bearer ${s}`
          }
        }),ge?fetch(`${Se}/api/market/admin/pending-count`, {
          headers: {
            Authorization:`Bearer ${s}`
          }
        }):Promise.resolve(null)]);
        if(Jt.ok) {
          const On=await Jt.json();
          On.success&&(!Ws.current&&On.count>Hr.current&&u("Bạn có cập nhật mới về đơn hàng Market!"),ee(On.count||0),Ws.current=!1)
        }
        if(qn&&qn.ok) {
          const On=await qn.json();
          On.success&&(!Ss.current&&On.count>Go.current&&u("CÓ ĐƠN HÀNG MARKET MỚI CẦN XỬ LÝ!"),me(On.count||0),Ss.current=!1)
        }
      }
      catch{}
    };
    ct();
    const _t=setInterval(ct,3e4);
    return()=>clearInterval(_t)
  },[s,i,u]);
  const Ya=()=> {
    S( {
      isOpen:!0,title:"Sắp có mặt",message:"Tính năng bạn bè & cộng đồng đang được phát triển và sẽ sớm ra mắt trong các bản cập nhật tiếp theo.",type:"info"
    })
  },fa=()=> {
    mt(!0)
  },[Vo,ha]=g.useState(()=>localStorage.getItem("dns_enabled")==="true");
  g.useEffect(()=> {
    const ge=async()=> {
      try {
        const _t=await oe("warp_status");
        ha(_t),localStorage.setItem("dns_enabled",_t?"true":"false")
      }
      catch{}
    };
    ge();
    const ct=setInterval(ge,5e3);
    return()=>clearInterval(ct)
  },[]);
  const Jc=async ge=> {
    try {
      ge?await oe("set_cloudflare_dns"):await oe("reset_dns_to_dhcp"),ha(ge),localStorage.setItem("dns_enabled",ge?"true":"false")
    }
    catch(ct) {
      console.error("Toggle failed:",ct),S( {
        isOpen:!0,title:"Lỗi tăng tốc",message:`Không thể tăng tốc. Chi tiết: ${ct}`,type:"error"
      })
    }
  },Qc=()=> {
    try {
      const ge=localStorage.getItem("cartItems");
      if(!ge)return 0;
      const ct=JSON.parse(ge);
      if(Array.isArray(ct))return ct.length
    }
    catch{}return 0
  };
  g.useEffect(()=> {
    const ge=()=>G(Qc());
    return ge(),window.addEventListener("cartUpdated",ge),()=> {
      window.removeEventListener("cartUpdated",ge)
    }
  },[]),g.useEffect(()=> {
    if(!s||!i)return;
    const ge=async()=> {
      if(!(document.hidden||ve.current)) {
        ve.current=!0;
        try {
          const Jt=new AbortController,qn=setTimeout(()=>Jt.abort(),1e4);
          try {
            await a()
          }
          catch(On) {
            if(On instanceof Error&&On.name==="AbortError"||On instanceof TypeError&&(On.message.includes("Failed to fetch")||On.message.includes("NetworkError")))return;
            throw On
          }
          finally {
            clearTimeout(qn)
          }
        }
        catch{}finally {
          ve.current=!1
        }
      }
    },ct=setTimeout(()=> {
      ge()
    },2e3),_t=setInterval(ge,6e4);
    return()=> {
      clearTimeout(ct),clearInterval(_t)
    }
  },[s,i==null?void 0:i.id,a]),g.useEffect(()=> {
    if(!s||!i) {
      U(0);
      return
    }
    U(0),Q([])
  },[s,i==null?void 0:i.id,e.pathname]),g.useEffect(()=> {
    const ge=ct=> {
      ze.current&&!ze.current.contains(ct.target)&&N(!1)
    };
    if(A)return document.addEventListener("mousedown",ge),()=> {
      document.removeEventListener("mousedown",ge)
    }
  },[A]),g.useEffect(()=> {
    if(!y)return;
    const ge=ct=> {
      ct.key==="Escape"&&p()
    };
    return document.addEventListener("keydown",ge),()=>document.removeEventListener("keydown",ge)
  },[y,p]),g.useEffect(()=> {
    if(!s)return;
    let ge=!1,ct=0;
    const _t=3;
    let Jt=0;
    const qn=1e4,On=async()=> {
      if(ge)return;
      const Gi=Date.now();
      if(!(Gi-Jt<qn)) {
        Jt=Gi;
        try {
          const Yr=localStorage.getItem("pendingDeposit");
          if(!Yr) {
            ge=!0;
            return
          }
          const pr=JSON.parse(Yr);
          if(!(pr!=null&&pr.tx)||pr.polling!==!0) {
            ge=!0;
            return
          }
          const ma=await fetch(`${Se}/wallet/deposit/refresh`, {
            method:"POST",headers: {
              "Content-Type":"application/json",Authorization:`Bearer ${s}`
            },body:JSON.stringify( {
              sessionId:s,transactionId:pr.tx
            })
          });
          if(!ma.ok) {
            if(ma.status===404) {
              localStorage.removeItem("pendingDeposit"),ge=!0;
              return
            }
            if(ct++,ct>=_t) {
              ge=!0;
              return
            }
            return
          }
          const Ja=await ma.json();
          Ja.success&&Ja.status==="completed"&&(localStorage.removeItem("pendingDeposit"),ge=!0,await a(),t(`/complete?type=deposit&amount=${Ja.amount||pr.amount||""}&tx=${Ja.transactionId||pr.tx}`))
        }
        catch {
          ct++,ct>=_t&&(ge=!0)
        }
      }
    },ln=setTimeout(()=> {
      ge||On()
    },2e3),ci=setInterval(()=> {
      if(ge) {
        clearInterval(ci);
        return
      }
      On()
    },15e3);
    return()=> {
      ge=!0,clearTimeout(ln),clearInterval(ci)
    }
  },[s,t,a]);
  const Wo=g.useMemo(()=>[ {
    id:"welcome",target:"[data-tutorial-id='nav-store']",title:d("tutorial.welcome.title"),description:d("tutorial.welcome.description"),position:"bottom"
  }, {
    id:"library",target:"[data-tutorial-id='nav-library']",title:d("tutorial.library.title"),description:d("tutorial.library.description"),position:"bottom"
  }, {
    id:"search",target:"[data-tutorial-id='search']",title:d("tutorial.search.title"),description:d("tutorial.search.description"),position:"bottom"
  }, {
    id:"wishlist",target:"[data-tutorial-id='wishlist']",title:d("tutorial.wishlist.title"),description:d("tutorial.wishlist.description"),position:"bottom"
  }, {
    id:"cart",target:"[data-tutorial-id='cart']",title:d("tutorial.cartPage.title"),description:d("tutorial.cartPage.description"),position:"bottom"
  }, {
    id:"profile",target:"[data-tutorial-id='profile']",title:d("tutorial.profile.title"),description:d("tutorial.profile.description"),position:"bottom"
  }, {
    id:"add-game",target:"[data-tutorial-id='add-game']",title:d("tutorial.addGame.title"),description:d("tutorial.addGame.description"),position:"top"
  }, {
    id:"friends-chat",target:"[data-tutorial-id='friends-chat']",title:d("tutorial.friendsChat.title"),description:d("tutorial.friendsChat.description"),position:"top",navigateTo:"/account",tutorialKey:"welcome"
  }
  ],[d]),$u=()=> {
    b(!1),X(!0)
  };
  g.useEffect(()=>{},[(Pl=i==null?void 0:i.tutorial_completed)==null?void 0:Pl.welcome,i==null?void 0:i.id,f,d,h,i==null?void 0:i.username]);
  const jl=g.useMemo(()=>[ {
    id:"burrspeak_discovery",target:"[data-tutorial-id='nav-burrspeak']",title:"🎙️ Tính năng Thuyết minh (Mới)",description:"Goslynk vừa ra mắt tính năng Thuyết minh, hỗ trợ đọc sub game trực tiếp trên màn hình. Hãy bấm vào đây để trải nghiệm nhé!",position:"bottom",tutorialKey:"burrspeak_discovery"
  }
  ],[]);
  return g.useEffect(()=>{},[(Kr=i==null?void 0:i.tutorial_completed)==null?void 0:Kr.welcome,(xs=i==null?void 0:i.tutorial_completed)==null?void 0:xs.burrspeak_discovery,i==null?void 0:i.id,h,f,jl,i==null?void 0:i.username]),o?l.jsx("div", {
    style: {
      position:"fixed",inset:0,zIndex:99999,background:"rgba(0,0,0,0.92)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"var(--font-store, -apple-system, sans-serif)"
    },children:l.jsxs("div", {
      style: {
        background:"#1a0a0a",border:"2px solid #dc2626",borderRadius:16,padding:"40px 48px",maxWidth:480,width:"90%",textAlign:"center",boxShadow:"0 0 60px rgba(220,38,38,0.3)"
      },children:[l.jsx("div", {
        style: {
          width:64,height:64,margin:"0 auto 20px",background:"rgba(220,38,38,0.15)",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center"
        },children:l.jsx("span", {
          style: {
            fontSize:32
          },children:"🚫"
        })
      }),l.jsx("h2", {
        style: {
          color:"#dc2626",margin:"0 0 12px",fontSize:22,fontWeight:800
        },children:"Tài khoản bị Ban Phần Cứng"
      }),l.jsx("p", {
        style: {
          color:"#aaa",margin:"0 0 28px",fontSize:14,lineHeight:1.6
        },children:c||"Tài khoản của bạn đã bị khóa phần cứng do sử dụng phần mềm bên thứ ba chứa mã độc. Từ bộ phận Nestg"
      }),l.jsx("button", {
        onClick:()=>r(),style: {
          background:"#dc2626",color:"#fff",border:"none",borderRadius:8,padding:"12px 32px",fontSize:14,fontWeight:700,cursor:"pointer",width:"100%"
        },children:"Đăng xuất"
      })]
    })
  }):l.jsxs("div", {
    className:`app-shell${$&&se?" app-shell--macos-native-titlebar":""}`,children:[l.jsx(AK,{}),l.jsxs("header", {
      className:"app-header",...se? {
        "data-tauri-drag-region":""
      }
      :{},onPointerDown:z?D:void 0,children:[l.jsxs("div", {
        className:"header-strip",children:[l.jsxs("div", {
          className:"header-strip-left",...se? {
            "data-tauri-drag-region":""
          }
          :{},children:[l.jsxs("span", {
            className:"logo",onClick:ae,...se? {
              "data-tauri-drag-region":!1
            }
            :{},style: {
              cursor:"pointer",position:"relative",display:"inline-block"
            },children:["Goslynk",he>0&&l.jsx("span", {
              style: {
                position:"absolute",top:-4,right:-10,background:"#dc2626",color:"#fff",fontSize:"10px",fontWeight:700,borderRadius:"999px",minWidth:"16px",height:"16px",display:"flex",alignItems:"center",justifyContent:"center",padding:"0 3px",lineHeight:1,pointerEvents:"none"
              },children:he>99?"99+":he
            })]
          }),l.jsx("button", {
            type:"button",className:"header-strip-link",onClick:Ya,...se? {
              "data-tauri-drag-region":!1
            }
            :{},children:d("header.topMenu.friends")
          }),l.jsx("button", {
            type:"button",className:"header-strip-link header-strip-link-vip",onClick:fa,...se? {
              "data-tauri-drag-region":!1
            }
            :{},children:d("header.topMenu.vipNow")
          }),l.jsxs("div", {
            className:"dns-toggle-wrapper",...se? {
              "data-tauri-drag-region":!1
            }
            :{},children:[l.jsx("span", {
              className:"dns-toggle-label",children:"Tăng tốc"
            }),l.jsxs("label", {
              className:"dns-switch",children:[l.jsx("input", {
                type:"checkbox",checked:Vo,onChange:ge=>Jc(ge.target.checked)
              }),l.jsx("span", {
                className:"dns-slider"
              })]
            })]
          }),l.jsx("button", {
            type:"button",className:"burrspeak-btn","data-tutorial-id":"nav-burrspeak",title:"Đây là tính năng thuyết minh của Goslynk",onClick:()=> {
              i&&(["vip_plus","vip_voice","admin","super_admin"].includes(i.role)||i.has_vip_voice===!0)?J(!0):(u("Tính năng này yêu cầu gói VIP Plus hoặc VIP Voice. Vui lòng nâng cấp để sử dụng!"),mt(!0))
            },...se? {
              "data-tauri-drag-region":!1
            }
            :{},children:d("header.topMenu.burrspeak")
          })]
        }),z&&l.jsx("div", {
          className:"header-drag-spacer","data-tauri-drag-region":!0,onPointerDown:D,"aria-hidden":!0
        }),l.jsxs("div", {
          className:"header-strip-right",children:[l.jsxs("button", {
            className:"wishlist-pill",onClick:()=>t("/wishlist"),"data-tutorial-id":"wishlist",...se? {
              "data-tauri-drag-region":!1
            }
            :{},children:[l.jsx(Cc, {
              size:14,style: {
                marginRight:6
              }
            }),d("header.wishlist")," ",l.jsx("span", {
              className:"pill-count",children:M
            })]
          }),l.jsxs("button", {
            className:"cart-pill",onClick:m,"data-tutorial-id":"cart",...se? {
              "data-tauri-drag-region":!1
            }
            :{},children:[l.jsx(iK, {
              size:16,style: {
                marginRight:6
              }
            }),d("header.cart")," ",l.jsx("span", {
              className:"pill-count",children:B
            })]
          }),l.jsxs("div", {
            style: {
              position:"relative"
            },children:[l.jsx("button", {
              ref:Dn,className:"cart-pill",onClick:ws,style: {
                padding:"8px",background:We?"rgba(255,255,255,0.15)":"rgba(255,255,255,0.1)"
              },...se? {
                "data-tauri-drag-region":!1
              }
              :{},children:l.jsxs("div", {
                style: {
                  position:"relative",display:"flex",alignItems:"center",justifyContent:"center"
                },children:[l.jsxs("svg", {
                  width:"18",height:"18",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:[l.jsx("path", {
                    d:"M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                  }),l.jsx("path", {
                    d:"M13.73 21a2 2 0 0 1-3.46 0"
                  })]
                }),te>0&&l.jsx("div", {
                  style: {
                    position:"absolute",top:-4,right:-4,background:"#dc2626",borderRadius:"50%",width:"8px",height:"8px"
                  }
                })]
              })
            }),We&&l.jsxs("div", {
              ref:Si,style: {
                position:"absolute",top:"100%",right:0,marginTop:"8px",background:"#18202c",borderRadius:"8px",width:"320px",boxShadow:"0 8px 32px rgba(0,0,0,0.5)",zIndex:1e3,border:"1px solid rgba(255,255,255,0.05)",display:"flex",flexDirection:"column"
              },children:[l.jsxs("div", {
                style: {
                  padding:"16px",borderBottom:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center"
                },children:[l.jsx("h3", {
                  style: {
                    margin:0,fontSize:"14px",color:"#fff",fontWeight:600
                  },children:"Thông báo"
                }),l.jsx("button", {
                  onClick:()=> {
                    it(!1),t("/history-order", {
                      state: {
                        tab:"resolved"
                      }
                    })
                  },style: {
                    background:"rgba(255,255,255,0.1)",border:"none",color:"#e2e8f0",fontSize:"12px",padding:"4px 8px",borderRadius:"4px",cursor:"pointer"
                  },children:"Xem tất cả"
                })]
              }),l.jsx("div", {
                style: {
                  maxHeight:"300px",overflowY:"auto",padding:"8px"
                },children:St.length===0?l.jsx("div", {
                  style: {
                    padding:"20px 10px",textAlign:"center",color:"#94a3b8",fontSize:"13px"
                  },children:"Bạn không có thông báo mới nào."
                }):St.map(ge=>l.jsxs("button", {
                  type:"button",style: {
                    display:"flex",gap:"12px",padding:"12px",borderRadius:"6px",background:"rgba(255,255,255,0.02)",marginBottom:"8px",cursor:"pointer",border:ge.is_read===0?"1px solid rgba(102, 192, 244, 0.3)":"1px solid transparent",width:"100%",textAlign:"left",color:"inherit",outline:"none"
                  },onClick:()=> {
                    it(!1),t("/history-order", {
                      state: {
                        tab:"resolved"
                      }
                    })
                  },children:[ge.image_url?l.jsx("img", {
                    src:ge.image_url,alt:"",style: {
                      width:"48px",height:"36px",objectFit:"cover",borderRadius:"4px"
                    }
                  }):l.jsx("div", {
                    style: {
                      width:"48px",height:"36px",background:"rgba(0,0,0,0.2)",borderRadius:"4px"
                    }
                  }),l.jsxs("div", {
                    style: {
                      flex:1,display:"flex",flexDirection:"column",gap:"4px"
                    },children:[l.jsx("div", {
                      style: {
                        fontSize:"13px",color:"#e2e8f0",lineHeight:1.4
                      },children:ge.status==="fulfilled"?"Đơn hàng của bạn đã được duyệt":"Đơn hàng của bạn đã bị hủy"
                    }),l.jsx("div", {
                      style: {
                        fontSize:"12px",color:"#94a3b8"
                      },children:ge.product_name
                    })]
                  }),ge.is_read===0&&l.jsx("div", {
                    style: {
                      width:"8px",height:"8px",background:"#66c0f4",borderRadius:"50%",alignSelf:"center",flexShrink:0
                    }
                  })]
                },ge.id))
              })]
            })]
          }),l.jsxs("div", {
            className:"profile-wrapper",...se? {
              "data-tauri-drag-region":!1
            }
            :{},style: {
              position:"relative"
            },children:[l.jsxs("button", {
              className:"profile-pill",onClick:()=>b(ge=>!ge),"data-tutorial-id":"profile",...se? {
                "data-tauri-drag-region":!1
              }
              :{},children:[l.jsx("div", {
                className:"profile-avatar-wrapper",onClick:ge=> {
                  ge.stopPropagation(),rn()
                },title:"Đổi Avatar",children:i!=null&&i.avatar_url?l.jsx("img", {
                  src:i.avatar_url.startsWith("http")?i.avatar_url:nk(i.avatar_url),alt:i.username||"User",className:"profile-avatar",onError:ge=> {
                    const ct=ge.target;
                    ct.src=nk("avatar_0")
                  }
                }):l.jsx("div", {
                  className:"profile-avatar-placeholder",children:((qa=i==null?void 0:i.username)==null?void 0:qa.charAt(0).toUpperCase())||"U"
                })
              }),l.jsx("span", {
                className:"profile-username",style:i!=null&&i.name_color?i.name_color.includes("gradient")? {
                  backgroundImage:i.name_color,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textShadow:"0 0 10px rgba(255,255,255,0.2)"
                }
                : {
                  color:i.name_color,textShadow:`0 0 10px ${i.name_color}40`
                }
                :{},children:(i==null?void 0:i.username)||"User"
              }),l.jsx("span", {
                className:"profile-dropdown",children:"▾"
              }),l.jsxs("span", {
                className:"profile-balance",children:[i!=null&&i.p_balance?Math.round(Number(i.p_balance)).toLocaleString("vi-VN"):"0"," ","G"]
              })]
            }),v&&l.jsxs("div", {
              className:"profile-menu",children:[l.jsx("button", {
                className:"profile-menu-item muted",disabled:!0,children:d("header.profileMenu.viewProfile")
              }),l.jsxs("button", {
                className:"profile-menu-item",onClick:()=> {
                  y&&p(),t("/account"),b(!1)
                },children:[d("header.profileMenu.accountDetailsPrefix")," ",l.jsx("span", {
                  className:"profile-link",children:(i==null?void 0:i.email)||""
                })]
              }),l.jsx("button", {
                className:"profile-menu-item",onClick:()=> {
                  y&&p(),t("/store-settings"),b(!1)
                },children:d("header.profileMenu.storePreferences")
              }),l.jsx("div", {
                className:"profile-menu-separator"
              }),l.jsxs("button", {
                className:"profile-menu-item",onClick:()=> {
                  y&&p(),t("/deposit"),b(!1)
                },children:[d("header.profileMenu.viewWalletPrefix")," ",i!=null&&i.p_balance?Math.round(Number(i.p_balance)).toLocaleString("vi-VN"):"0"," ","G"]
              }),l.jsx("div", {
                className:"profile-menu-separator"
              }),l.jsx("button", {
                className:"profile-menu-item",style: {
                  position:"relative"
                },onClick:()=> {
                  y&&p(),t("/history-order"),b(!1)
                },children:"Lịch sử mua hàng"
              }),l.jsx("div", {
                className:"profile-menu-separator"
              }),l.jsx("button", {
                className:"profile-menu-item",onClick:$u,children:"Xem lại hướng dẫn"
              }),l.jsx("button", {
                className:"profile-menu-item",onClick:()=> {
                  y&&p(),Ot()
                },children:d("header.profileMenu.signOut")
              })]
            })]
          }),z&&l.jsxs("div", {
            className:"window-controls","data-tauri-drag-region":!1,children:[l.jsx("button", {
              className:"titlebar-btn",type:"button","aria-label":"Minimize",onClick:hn,children:l.jsx("span", {
                className:"titlebar-icon",children:l.jsx("svg", {
                  width:"10",height:"10",viewBox:"0 0 10 10",children:l.jsx("rect", {
                    x:"1",y:"5",width:"8",height:"1.5",rx:"0.75",fill:"currentColor"
                  })
                })
              })
            }),l.jsx("button", {
              className:"titlebar-btn",type:"button","aria-label":R?"Restore":"Maximize",onClick:_n,children:l.jsx("span", {
                className:"titlebar-icon",children:R?l.jsxs("svg", {
                  width:"10",height:"10",viewBox:"0 0 10 10",children:[l.jsx("rect", {
                    x:"2",y:"3",width:"6",height:"5",rx:"0.8",ry:"0.8",stroke:"currentColor",fill:"none",strokeWidth:"1"
                  }),l.jsx("path", {
                    d:"M3 3V2.5C3 2.22 3.22 2 3.5 2H7.5C7.78 2 8 2.22 8 2.5V5.5C8 5.78 7.78 6 7.5 6H7",stroke:"currentColor",fill:"none",strokeWidth:"1"
                  })]
                }):l.jsx("svg", {
                  width:"10",height:"10",viewBox:"0 0 10 10",children:l.jsx("rect", {
                    x:"2",y:"2",width:"6",height:"6",rx:"0.9",ry:"0.9",stroke:"currentColor",fill:"none",strokeWidth:"1"
                  })
                })
              })
            }),l.jsx("button", {
              className:"titlebar-btn titlebar-btn-close",type:"button","aria-label":"Close",onClick:Pn,children:l.jsx("span", {
                className:"titlebar-icon",children:l.jsx("svg", {
                  width:"10",height:"10",viewBox:"0 0 10 10",children:l.jsx("path", {
                    d:"M2 2L8 8M8 2L2 8",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"
                  })
                })
              })
            })]
          })]
        })]
      }),l.jsxs("div", {
        className:"header-main",...se? {
          "data-tauri-drag-region":""
        }
        :{},onPointerDown:z?D:void 0,children:[l.jsxs("nav", {
          className:"top-nav",children:[l.jsx(Ip, {
            to:"/store",className:ye("/store"),"data-tutorial-id":"nav-store",children:d("nav.store")
          }),l.jsx(Ip, {
            to:"/library",className:ye("/library"),"data-tutorial-id":"nav-library",children:d("nav.library")
          }),l.jsx(Ip, {
            to:"/market",className:`${ye("/market")} nav-market`,children:d("nav.market")
          }),l.jsx("button", {
            type:"button",className:"nav-item nav-nightmarket",onClick:()=>rt(!0),children:"Nightmarket"
          }),(()=> {
            const ge=(i==null?void 0:i.role)||"user";
            return ge==="admin"||ge==="super_admin"||!!Ge[ge]?l.jsx("a", {
              href:"https://netflix.com/login",onClick:zo,className:"nav-item",children:"NETFLIX"
            }):null
          })()]
        }),z&&l.jsx("div", {
          className:"header-main-drag-fill","data-tauri-drag-region":!0,onPointerDown:D,"aria-hidden":!0
        }),l.jsx("div", {
          className:"header-right",...se? {
            "data-tauri-drag-region":!1
          }
          :{},children:l.jsxs("div", {
            className:"search-container",ref:de,"data-tutorial-id":"search",children:[l.jsx("input", {
              className:"search-input",placeholder:d("header.searchPlaceholder"),autoComplete:"off",value:T,onChange:ge=>E(ge.target.value),onKeyPress:Gt,onFocus:()=>x.length>0&&_(!0)
            }),T&&l.jsx("button", {
              className:"search-clear",type:"button",onClick:on,children:l.jsx(Dd, {
                size:12
              })
            }),l.jsx("button", {
              className:"search-button",type:"button",onClick:kt,children:l.jsx(gE, {
                size:16
              })
            }),C&&x.length>0&&l.jsxs("div", {
              className:"search-results",children:[l.jsx("div", {
                className:"search-results-header",children:d("header.searchResults")
              }),x.map(ge=>l.jsxs("div", {
                className:"search-result-item",onClick:()=>fn(ge.app_id),children:[l.jsx("img", {
                  src:Ne(ge),alt:ge.game_name,className:"search-result-image",onError:ct=> {
                    ct.currentTarget.onerror=null,et(ge.app_id)
                  }
                }),l.jsxs("div", {
                  className:"search-result-info",children:[l.jsx("div", {
                    className:"search-result-title",children:ge.game_name
                  }),l.jsx("div", {
                    className:"search-result-price",children:ge.price===0||!ge.price?l.jsx("span", {
                      className:"free-chip",children:d("gameDetail.free")
                    }):(()=> {
                      const ct=(ge.discountPercent??0)>0&&!!ge.originalPrice&&!!ge.finalPrice&&ge.finalPrice<ge.originalPrice,_t=Math.round(Number(ge.finalPrice??ge.price??0)),Jt=Math.round(Number(ge.originalPrice??ge.price??0));
                      return ct?l.jsxs("div", {
                        className:"search-result-price-row",children:[l.jsxs("span", {
                          className:"search-result-discount-pill",children:["-",ge.discountPercent,"%"]
                        }),l.jsxs("div", {
                          className:"search-result-price-stack",children:[l.jsxs("span", {
                            className:"search-result-original-price",children:[Jt.toLocaleString("vi-VN")," G"]
                          }),l.jsxs("span", {
                            className:"search-result-final-price",children:[_t.toLocaleString("vi-VN")," G"]
                          })]
                        })]
                      }):l.jsxs("span", {
                        children:[_t.toLocaleString("vi-VN")," G"]
                      })
                    })()
                  })]
                })]
              },ge.app_id))]
            })]
          })
        })]
      })]
    }),l.jsx(gK, {
      onNavigate:ge=> {
        switch(ge) {
          case"settings":t("/store-settings");
          break;
          case"store":t("/store");
          break;
          case"vip":t("/deposit");
          break;
          default:console.log("Unknown navigation action:",ge)
        }
      }
    }),l.jsx(TK,{}),l.jsx(Y4, {
      isOpen:bt,onClose:()=>mt(!1),isUpgrade:(i==null?void 0:i.role)==="vip"
    }),l.jsxs("main", {
      className:["content-full",e.pathname.startsWith("/library")?"content-full-library":""].filter(Boolean).join(" "),children:[l.jsx(CK, {
        sessionId:s,onRenew:()=>mt(!0)
      }),l.jsx(vK,{}),n]
    }),K&&l.jsx("div", {
      className:"avatar-modal-overlay",onClick:()=>X(!1),style: {
        zIndex:1e5
      },children:l.jsxs("div", {
        className:"avatar-modal",onClick:ge=>ge.stopPropagation(),style: {
          maxWidth:450
        },children:[l.jsxs("div", {
          className:"avatar-modal-header",children:[l.jsx("h3", {
            children:"Xem lại Hướng dẫn"
          }),l.jsx("button", {
            className:"avatar-modal-close",onClick:()=>X(!1),children:l.jsx(Dd,{})
          })]
        }),l.jsxs("div", {
          className:"avatar-modal-body",style: {
            padding:"24px 20px"
          },children:[l.jsx("p", {
            style: {
              margin:"0 0 16px 0",color:"#cbd5e1"
            },children:"Bạn muốn xem lại hướng dẫn về tính năng nào?"
          }),l.jsxs("div", {
            style: {
              display:"flex",flexDirection:"column",gap:"10px"
            },children:[l.jsx("button", {
              type:"button",className:"replay-tutorial-option primary-option",onClick:()=> {
                X(!1),f(Wo)
              },children:"🌐 Giao diện chung"
            }),l.jsx("button", {
              type:"button",className:"replay-tutorial-option",onClick:()=> {
                X(!1),t("/store", {
                  state: {
                    replayTutorial:"store"
                  }
                })
              },children:"🏪 Cửa hàng Game"
            }),l.jsx("button", {
              type:"button",className:"replay-tutorial-option",onClick:()=> {
                X(!1),t("/library", {
                  state: {
                    replayTutorial:"library"
                  }
                })
              },children:"📚 Thư viện Game"
            }),l.jsx("button", {
              type:"button",className:"replay-tutorial-option",onClick:()=> {
                X(!1),t("/account", {
                  state: {
                    replayTutorial:"account_details"
                  }
                })
              },children:"👤 Chi tiết Tài khoản"
            }),l.jsx("button", {
              type:"button",className:"replay-tutorial-option",onClick:()=> {
                X(!1),t("/deposit", {
                  state: {
                    replayTutorial:"deposit"
                  }
                })
              },children:"💳 Nạp G-Coin"
            }),l.jsx("button", {
              type:"button",className:"replay-tutorial-option",onClick:()=> {
                X(!1),t("/wishlist", {
                  state: {
                    replayTutorial:"wishlist"
                  }
                })
              },children:"⭐ Danh sách ước"
            }),l.jsx("button", {
              type:"button",className:"replay-tutorial-option",onClick:()=> {
                X(!1),t("/cart", {
                  state: {
                    replayTutorial:"cart"
                  }
                })
              },children:"🛒 Giỏ hàng"
            }),l.jsx("button", {
              type:"button",className:"replay-tutorial-option",style: {
                borderColor:"rgba(192, 132, 252, 0.3)",color:"#c084fc",background:"rgba(192, 132, 252, 0.08)"
              },onClick:()=> {
                X(!1),i&&(["vip_plus","vip_voice","admin","super_admin"].includes(i.role)||i.has_vip_voice===!0)?(ie(!0),J(!0)):(u("Tính năng này yêu cầu gói VIP Plus hoặc VIP Voice. Vui lòng nâng cấp để sử dụng!"),mt(!0))
              },children:"🎙️ Thuyết minh"
            })]
          })]
        })]
      })
    }),e.pathname.startsWith("/store")&&new URLSearchParams(e.search).get("complete")==="1"&&l.jsx("div", {
      style: {
        position:"fixed",inset:0,zIndex:11e3,display:"flex",alignItems:"stretch",justifyContent:"center",background:"rgba(0, 0, 0, 0.85)"
      },children:l.jsx("div", {
        style: {
          position:"relative",flex:1,maxWidth:"1200px",margin:"40px auto",borderRadius:"10px",overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.8)"
        },children:l.jsx(V4,{})
      })
    }),l.jsxs("footer", {
      className:"mini-footer",children:[l.jsxs("div", {
        className:"mini-footer-left",ref:ze,children:[l.jsxs("button", {
          type:"button",className:"mini-footer-btn","data-tutorial-id":"add-game",onClick:ge=> {
            ge.stopPropagation(),N(!A)
          },children:[l.jsx(YH, {
            size:14
          }),l.jsx("span", {
            children:d("footer.addGame")
          })]
        }),A&&l.jsx("div", {
          className:"add-game-dropdown",children:l.jsx("button", {
            type:"button",className:"add-game-dropdown-item",onClick:()=> {
              N(!1),O(!0)
            },children:"Activate a Product on Steam..."
          })
        })]
      }),l.jsx("div", {
        className:"mini-footer-right",children:l.jsxs("button", {
          type:"button",className:"mini-footer-btn",onClick:()=>t("/friends"),"data-tutorial-id":"friends-chat",children:[l.jsx(XH, {
            size:14
          }),l.jsx("span", {
            children:d("footer.friendsChat")
          }),W>0&&l.jsx(l.Fragment, {
            children:(i==null?void 0:i.role)==="admin"||(i==null?void 0:i.role)==="super_admin"?l.jsx("span", {
              className:"mini-footer-badge",title:q.length>0?q.map(ge=>`${ge.username}: ${ge.unread_count||0} tin nhắn`).join(`
`):"",children:W>99?"99+":W
            }):l.jsx("span", {
              className:"mini-footer-badge mini-footer-badge-exclamation",children:"!"
            })
          })]
        })
      })]
    }),l.jsx(uh, {
      isOpen:w.isOpen,onClose:()=>S( {
        ...w,isOpen:!1
      }),title:w.title,message:w.message,type:w.type
    }),Nt&&l.jsx("div", {
      className:"avatar-modal-overlay",onClick:mi,children:l.jsxs("div", {
        className:"avatar-modal",onClick:ge=>ge.stopPropagation(),children:[l.jsxs("div", {
          className:"avatar-modal-header",children:[l.jsx("h3", {
            children:"Chọn Avatar"
          }),l.jsx("button", {
            className:"avatar-modal-close",onClick:mi,children:l.jsx(Dd,{})
          })]
        }),l.jsx("div", {
          className:"avatar-modal-body",children:(()=> {
            const ge=[],ct=[];
            qp.forEach((ln,ci)=> {
              const Gi=`avatar_${ci}`;
              wn(Gi)||rk(Gi)?ge.push( {
                id:Gi,url:ln,index:ci
              }):ct.push( {
                id:Gi,url:ln,index:ci,price:ik(Gi)
              })
            });
            const _t=(i==null?void 0:i.role)||"user",Jt=["admin","super_admin"].includes(_t),qn=ln=>!!(Jt||_t==="vip_plus"||_t==="vip"||_t==="netflix"||ln<=25e3),On=ln=>ln>25e3?"VIP":"";
            return l.jsxs(l.Fragment, {
              children:[l.jsx("div", {
                className:"avatar-section-title",children:"Kho Đồ Của Bạn"
              }),l.jsx("div", {
                className:"avatar-inventory-wrapper",children:l.jsx("div", {
                  ref:$e,className:"avatar-inventory-scroll",onMouseDown:Ct,onMouseLeave:wt,onMouseUp:wt,onMouseMove:Z,onWheel:ue,children:ge.length===0?l.jsx("div", {
                    className:"avatar-empty-message",children:"Bạn chưa sở hữu avatar nào"
                  }):ge.map(ln=> {
                    const ci=(i==null?void 0:i.avatar_url)===ln.id;
                    return l.jsxs("div", {
                      className:`avatar-item unlocked ${ci?"equipped":""}`,onClick:()=>!ci&&Nr(ln.id),title:ci?"Đang sử dụng":"Bấm để đổi",draggable:!1,children:[l.jsx("img", {
                        src:ln.url,alt:`Avatar ${ln.index}`,className:"avatar-img",draggable:!1
                      }),ci&&l.jsxs("div", {
                        className:"avatar-equipped-badge",children:[l.jsx(O4, {
                          size:9,style: {
                            marginRight:"4px"
                          }
                        })," Đang dùng"]
                      }),!ci&&l.jsx("div", {
                        className:"avatar-action-overlay",children:l.jsx("span", {
                          className:"avatar-equipped-text",style: {
                            color:"#fff",background:"#007bff"
                          },children:"ĐỔI NGAY"
                        })
                      })]
                    },ln.id)
                  })
                })
              }),l.jsx("div", {
                className:"avatar-separator"
              }),l.jsx("div", {
                className:"avatar-section-title",children:"Cửa Hàng Avatar"
              }),l.jsx("div", {
                className:"avatar-grid",children:ct.map(ln=> {
                  const ci=qn(ln.price),Gi=On(ln.price);
                  return l.jsxs("div", {
                    className:"avatar-item locked",children:[l.jsx("img", {
                      src:ln.url,alt:`Avatar ${ln.index}`,className:"avatar-img"
                    }),l.jsxs("div", {
                      className:"avatar-lock-static",children:[l.jsx(KH, {
                        className:"lock-icon"
                      }),l.jsxs("div", {
                        className:"price-static",children:[ln.price.toLocaleString("vi-VN")," G"]
                      }),Gi&&!ci&&l.jsxs("div", {
                        className:"role-badge-static",children:["Yêu cầu ",Gi]
                      })]
                    }),l.jsx("div", {
                      className:"avatar-action-overlay",children:l.jsxs("div", {
                        className:"avatar-buy-container",children:[l.jsxs("span", {
                          className:"avatar-hover-price",children:[ln.price.toLocaleString("vi-VN")," G"]
                        }),ci?l.jsx("button", {
                          className:`avatar-action-btn buy-btn ${Ee===ln.id?"success-btn":""}`,onClick:Yr=> {
                            Yr.stopPropagation(),Rr(ln.id)
                          },disabled:ot===ln.id||Ee===ln.id,style:Ee===ln.id? {
                            backgroundColor:"#4caf50",color:"#fff"
                          }
                          :void 0,children:Ee===ln.id?"Đã mua!":ot===ln.id?"Xử lý...":"Mua ngay"
                        }):l.jsxs("button", {
                          className:"avatar-action-btn require-role-btn",disabled:!0,children:["Cần ",Gi]
                        })]
                      })
                    })]
                  },ln.id)
                })
              })]
            })
          })()
        })]
      })
    }),Rt&&l.jsx("div", {
      className:"netflix-confirm-overlay",onClick:()=>Mt(!1),children:l.jsxs("div", {
        className:"netflix-confirm-dialog",onClick:ge=>ge.stopPropagation(),children:[l.jsxs("div", {
          className:"netflix-confirm-header",children:[l.jsx("h2", {
            className:"netflix-confirm-title",children:"Ẩn Goslynk khi mở Netflix?"
          }),l.jsx("p", {
            className:"netflix-confirm-subtitle",children:"Hide Goslynk to system tray while the Netflix window is open."
          })]
        }),l.jsx("div", {
          className:"netflix-confirm-body",children:l.jsxs("label", {
            className:"netflix-confirm-remember",children:[l.jsx("input", {
              type:"checkbox",checked:Ze,onChange:ge=>Fe(ge.target.checked)
            }),l.jsxs("span", {
              children:["Ghi nhớ lựa chọn này / ",l.jsx("strong", {
                children:"Remember this choice"
              })]
            })]
          })
        }),l.jsxs("div", {
          className:"netflix-confirm-footer",children:[l.jsx("button", {
            type:"button",className:"netflix-confirm-btn secondary",onClick:()=>ua(!1),children:"Không / No"
          }),l.jsx("button", {
            type:"button",className:"netflix-confirm-btn primary",onClick:()=>ua(!0),children:"Có / Yes"
          })]
        })]
      })
    }),qe&&l.jsx(IK, {
      onClose:()=>rt(!1)
    }),V&&l.jsx("div", {
      className:"activate-product-overlay",onClick:()=>O(!1),children:l.jsxs("div", {
        className:"activate-product-dialog",onClick:ge=>ge.stopPropagation(),children:[l.jsxs("div", {
          className:"activate-product-header",children:[l.jsx("h2", {
            className:"activate-product-title",children:"Enter your product code"
          }),l.jsx("button", {
            type:"button",className:"activate-product-close",onClick:()=>O(!1),children:"×"
          })]
        }),l.jsxs("div", {
          className:"activate-product-content",children:[l.jsx("p", {
            className:"activate-product-description",children:"By entering your code you will be registering your product with Steam and adding it to your library. You can enter a product code distributed with a retail CD/DVD or other Steam product."
          }),l.jsxs("div", {
            className:"activate-product-examples",children:[l.jsx("div", {
              className:"activate-product-examples-title",children:"EXAMPLE PRODUCT CODES"
            }),l.jsxs("div", {
              className:"activate-product-examples-list",children:[l.jsx("div", {
                children:"AAAAA-BBBBB-CCCCC"
              }),l.jsx("div", {
                children:"AAAAA-BBBBB-CCCCC-DDDDD-EEEEE"
              }),l.jsx("div", {
                children:"237ABCDGHJLPRST 23"
              })]
            })]
          }),l.jsx("div", {
            className:"activate-product-input-wrapper",children:l.jsx("input", {
              type:"text",className:"activate-product-input",value:fe,onChange:ge=>ce(ge.target.value),placeholder:"Enter product code",autoFocus:!0
            })
          })]
        }),l.jsxs("div", {
          className:"activate-product-footer",children:[l.jsx("button", {
            type:"button",className:"activate-product-button activate-product-button-cancel",onClick:()=> {
              O(!1),ce("")
            },children:"Cancel"
          }),l.jsx("button", {
            type:"button",className:"activate-product-button activate-product-button-confirm",disabled:!fe.trim()||ke,onClick:async()=> {
              if(!(!fe.trim()||ke)) {
                Pe(!0);
                try {
                  const ge=await fetch(`${Se}/activate-product`, {
                    method:"POST",headers: {
                      "Content-Type":"application/json",...s? {
                        Authorization:`Bearer ${s}`
                      }
                      :{}
                    },body:JSON.stringify( {
                      product_code:fe.trim()
                    })
                  }),ct=await ge.json();
                  ge.ok&&ct.success?(S( {
                    isOpen:!0,title:"Success",message:ct.message||"Product code activated successfully!",type:"success"
                  }),O(!1),ce(""),a&&await a(),i!=null&&i.id&&await Ey(i.id),window.dispatchEvent(new CustomEvent("libraryUpdated"))):S( {
                    isOpen:!0,title:"Error",message:ct.message||"Failed to activate product code",type:"error"
                  })
                }
                catch {
                  S( {
                    isOpen:!0,title:"Error",message:"Failed to activate product code. Please try again.",type:"error"
                  })
                }
                finally {
                  Pe(!1)
                }
              }
            },children:ke?"Activating...":"Confirm"
          })]
        })]
      })
    }),y&&l.jsx("div", {
      className:"cart-overlay",onClick:p,role:"dialog","aria-label":"Shopping cart",children:l.jsx("div", {
        className:"cart-overlay-content",onClick:ge=>ge.stopPropagation(),children:l.jsx(G4, {
          isOverlay:!0,onClose:p
        })
      })
    }),F&&l.jsx(pK, {
      onClose:()=> {
        J(!1),ie(!1)
      },replayTutorial:re
    }),l.jsx(yK,{})]
  })
}
function Bm( {
  children:n
}) {
  const {
    user:e,loading:t
  }
  =nn();
  return t?l.jsx("div", {
    style: {
      display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",color:"#fff"
    },children:"Đang tải..."
  }):e?l.jsx(l.Fragment, {
    children:n
  }):l.jsx(BB, {
    to:"/login",replace:!0
  })
}
function jK() {
  const {
    language:n,setLanguage:e,t,loading:i
  }
  =ni(),[r,s]=g.useState(!1),[a,o]=g.useState(!1),[c,d]=g.useState(!1),[u,f]=g.useState(!1),[h,m]=g.useState(0),[p,y]=g.useState(!1),[v,b]=g.useState(""),[w,S]=g.useState(!1),[T,E]=g.useState("store"),[x,k]=g.useState(!1),[C,_]=g.useState(""),[M,j]=g.useState(()=>localStorage.getItem("snippingHotkey")||"Ctrl+Shift+S"),[B,G]=g.useState(()=>localStorage.getItem("snippingEnabled")==="true"),[W,U]=g.useState(!1);
  g.useEffect(()=> {
    const se=zn();
    if(s(se),se) {
      q();
      const be=_i("rollback-progress",K=> {
        m(K.payload)
      });
      return()=> {
        be.then(K=>K())
      }
    }
  },[]);
  const q=async()=> {
    d(!0);
    try {
      const se=await oe("check_steam_update_status");
      o(se)
    }
    catch(se) {
      console.error("Failed to check steam update status:",se)
    }
    finally {
      d(!1)
    }
  },Q=async()=> {
    y(!1),f(!0),m(0);
    try {
      const se=await oe("rollback_steam_core");
      b(se),S(!1),y(!0),await q()
    }
    catch(se) {
      console.error("Rollback failed:",se),b("Khôi phục thất bại: "+se),S(!1),y(!0)
    }
    finally {
      f(!1),m(0)
    }
  },te=()=> {
    y(!1)
  },ee=async()=> {
    k(!0),_("Đang kiểm tra bản cập nhật mới nhất..."),console.log("[StoreSetting] User clicking Force Update");
    try {
      console.log(`[StoreSetting] Fetching from: ${Se}/update/latest`);
      const se=await fetch(`${Se}/update/latest`);
      if(!se.ok)throw console.error(`[StoreSetting] Fetch failed with status: ${se.status}`),new Error("Không thể kết nối đến máy chủ");
      const be=await se.json();
      if(console.log("[StoreSetting] Received update data:",be),be&&be.url) {
        _(`Đang tải phiên bản ${be.version||"mới nhất"}...`),console.log(`[StoreSetting] Invoking 'download_and_install' with url: ${be.url}, sha256: ${be.sha256}`);
        try {
          await oe("download_and_install", {
            url:be.url,sha256:be.sha256||null
          }),console.log("[StoreSetting] 'download_and_install' completed successfully. Closing window..."),_("Đang khởi chạy trình cài đặt...");
          try {
            await si().close()
          }
          catch {
            window.close()
          }
        }
        catch(K) {
          console.error("[StoreSetting] Failed to invoke download_and_install:",K),_("Không thể tự động cài đặt. Đang mở liên kết tải về..."),setTimeout(()=> {
            window.location.href=be.url
          },1500)
        }
      }
      else console.log("[StoreSetting] Data does not contain valid URL."),_("Không tìm thấy thông tin bản cập nhật.")
    }
    catch(se) {
      console.error("[StoreSetting] Force update error:",se),_(`Lỗi: ${se.message}`)
    }
    finally {
      k(!1)
    }
  },he=se=> {
    if(se.preventDefault(),se.key==="Escape") {
      U(!1);
      return
    }
    let be=[];
    if(se.ctrlKey&&be.push("Ctrl"),se.altKey&&be.push("Alt"),se.shiftKey&&be.push("Shift"),se.metaKey&&be.push("Meta"),!["Control","Alt","Shift","Meta"].includes(se.key)) {
      be.push(se.key.toUpperCase());
      const K=be.join("+");
      j(K),localStorage.setItem("snippingHotkey",K),U(!1),B&&oe("update_snipping_hotkey", {
        hotkey:K
      }).catch(X=> {
        console.error("Failed to update hotkey:",X)
      })
    }
  },me=()=> {
    const se=!B;
    G(se),localStorage.setItem("snippingEnabled",String(se)),oe("update_snipping_hotkey", {
      hotkey:se?M:""
    }).catch(be=> {
      console.error("Failed to update hotkey:",be)
    })
  };
  return l.jsxs("div", {
    className:"store-setting-page",children:[l.jsxs("div", {
      className:"store-setting-breadcrumb",children:[l.jsx("span", {
        children:"Account"
      }),l.jsx("span", {
        className:"store-setting-breadcrumb-separator",children:" > "
      }),l.jsx("span", {
        children:"Store preferences"
      })]
    }),l.jsxs("div", {
      className:"store-setting-layout",children:[l.jsxs("aside", {
        className:"store-setting-sidebar",children:[l.jsx("button", {
          className:`store-setting-tab ${T==="store"?"active":""}`,onClick:()=>E("store"),children:"Tùy chỉnh cửa hàng"
        }),l.jsx("button", {
          className:`store-setting-tab ${T==="app"?"active":""}`,onClick:()=>E("app"),children:"Tùy chỉnh app"
        })]
      }),l.jsx("section", {
        className:"store-setting-main",children:l.jsx("div", {
          className:"store-setting-content",children:T==="store"?l.jsxs(l.Fragment, {
            children:[l.jsxs("div", {
              className:"store-setting-section",children:[l.jsx("h2", {
                className:"store-setting-section-title",children:"Language"
              }),l.jsx("p", {
                className:"store-setting-description",children:t("storeSetting.languageDescription")
              }),l.jsxs("div", {
                className:"store-setting-language-options",children:[l.jsxs("label", {
                  className:"store-setting-language-option",children:[l.jsx("input", {
                    type:"radio",name:"store-language",value:"en",checked:n==="en",onChange:()=>e("en"),disabled:i
                  }),l.jsx("span", {
                    className:"store-setting-language-label",children:t("storeSetting.englishLabel")
                  })]
                }),l.jsxs("label", {
                  className:"store-setting-language-option",children:[l.jsx("input", {
                    type:"radio",name:"store-language",value:"vi",checked:n==="vi",onChange:()=>e("vi"),disabled:i
                  }),l.jsx("span", {
                    className:"store-setting-language-label",children:t("storeSetting.vietnameseLabel")
                  })]
                })]
              })]
            }),r&&l.jsxs("div", {
              className:"store-setting-section",children:[l.jsx("h2", {
                className:"store-setting-section-title",children:"System Utilities"
              }),l.jsx("p", {
                className:"store-setting-description",children:"Quản lý Steam của bạn"
              }),l.jsxs("div", {
                className:"steam-tool-item",children:[l.jsxs("div", {
                  className:"steam-tool-info",children:[l.jsx("div", {
                    className:"steam-tool-name",children:"Chặn cập nhật Steam"
                  }),l.jsx("div", {
                    className:"steam-tool-desc",children:a?"Đang bật - Steam sẽ không tự cập nhật":"Đang tắt - Steam có thể tự cập nhật"
                  })]
                }),l.jsx("div", {
                  style: {
                    color:a?"#4ade80":"#f87171",fontWeight:"bold",fontSize:"14px",paddingRight:"10px"
                  },children:a?"ĐÃ BẬT":"ĐÃ TẮT"
                })]
              }),l.jsxs("div", {
                className:"steam-tool-item",children:[l.jsxs("div", {
                  className:"steam-tool-info",children:[l.jsx("div", {
                    className:"steam-tool-name",children:"Khôi phục Steam"
                  }),l.jsx("div", {
                    className:"steam-tool-desc",children:"Trả Steam về phiên bản cũ, được quản lý bởi Server"
                  })]
                }),l.jsx("div", {
                  style: {
                    color:"#60a5fa",fontWeight:"bold",fontSize:"14px",paddingRight:"10px"
                  },children:"TỰ ĐỘNG"
                })]
              })]
            })]
          }):l.jsxs("div", {
            className:"store-setting-section",children:[l.jsx("h2", {
              className:"store-setting-section-title",children:"Cập nhật ứng dụng"
            }),l.jsx("p", {
              className:"store-setting-description",children:"Tải lại và cài đặt bản nâng cấp mới nhất trong trường hợp ứng dụng gặp lỗi."
            }),l.jsxs("div", {
              className:"steam-tool-item",children:[l.jsxs("div", {
                className:"steam-tool-info",children:[l.jsx("div", {
                  className:"steam-tool-name",children:"Khôi phục & Cập nhật"
                }),l.jsx("div", {
                  className:"steam-tool-desc",style: {
                    color:C?"#60a5fa":void 0
                  },children:C||"Tải và cài đặt tự động phiên bản mới nhất từ máy chủ"
                })]
              }),l.jsx("button", {
                className:"steam-tool-rollback",onClick:ee,disabled:x,children:x?"Đang xử lý...":"Cập nhật ứng dụng"
              })]
            }),l.jsxs("div", {
              className:"steam-tool-item",children:[l.jsxs("div", {
                className:"steam-tool-info",children:[l.jsx("div", {
                  className:"steam-tool-name",children:"Công cụ chụp ảnh màn hình"
                }),l.jsxs("div", {
                  className:"steam-tool-desc",children:[l.jsxs("label", {
                    className:"steam-toggle-label",style: {
                      display:"flex",alignItems:"center",cursor:"pointer",marginBottom:"8px"
                    },children:[l.jsx("div", {
                      className:`steam-toggle ${B?"on":"off"}`,style: {
                        width:"36px",height:"20px",borderRadius:"10px",background:B?"#3b82f6":"#4b5563",position:"relative",transition:"background 0.2s",marginRight:"8px"
                      },children:l.jsx("div", {
                        style: {
                          width:"16px",height:"16px",borderRadius:"50%",background:"white",position:"absolute",top:"2px",left:B?"18px":"2px",transition:"left 0.2s"
                        }
                      })
                    }),l.jsx("input", {
                      type:"checkbox",checked:B,onChange:me,style: {
                        display:"none"
                      }
                    }),l.jsx("span", {
                      style: {
                        color:B?"#e2e8f0":"#9ca3af"
                      },children:B?"Đang Bật":"Đang Tắt"
                    })]
                  }),l.jsxs("div", {
                    style: {
                      opacity:B?1:.5,pointerEvents:B?"auto":"none"
                    },children:["Phím tắt hiện tại: ",W?l.jsx("input", {
                      autoFocus:!0,type:"text",value:"Nhấn phím mới...",readOnly:!0,onKeyDown:he,onBlur:()=>U(!1),style: {
                        background:"#1f2937",color:"#60a5fa",border:"1px solid #3b82f6",padding:"2px 8px",borderRadius:"4px",outline:"none",width:"120px",marginLeft:"8px"
                      }
                    }):l.jsx("strong", {
                      style: {
                        color:"#60a5fa",marginLeft:"8px"
                      },children:M
                    })]
                  })]
                })]
              }),l.jsx("button", {
                className:"steam-tool-rollback",onClick:()=>U(!0),disabled:!B,style: {
                  opacity:B?1:.5
                },children:"Đổi phím"
              })]
            })]
          })
        })
      })]
    }),p&&l.jsx("div", {
      className:"steam-modal-overlay",onClick:te,children:l.jsxs("div", {
        className:"steam-modal",onClick:se=>se.stopPropagation(),children:[l.jsxs("div", {
          className:"steam-modal-header",children:[l.jsx("div", {
            className:"steam-modal-icon",children:w?"⚠️":"ℹ️"
          }),l.jsx("div", {
            className:"steam-modal-title",children:w?"Cảnh báo":"Thông báo"
          })]
        }),l.jsxs("div", {
          className:"steam-modal-body",children:[l.jsx("p", {
            children:v
          }),u&&l.jsxs("div", {
            className:"steam-modal-progress",children:[l.jsx("div", {
              className:"steam-modal-progress-bar",children:l.jsx("div", {
                className:"steam-modal-progress-fill",style: {
                  width:`${h}%`
                }
              })
            }),l.jsxs("span", {
              className:"steam-modal-progress-text",children:[h,"%"]
            })]
          })]
        }),l.jsx("div", {
          className:"steam-modal-actions",children:w?l.jsxs(l.Fragment, {
            children:[l.jsx("button", {
              className:"steam-modal-btn cancel",onClick:te,disabled:u,children:"Hủy bỏ"
            }),l.jsx("button", {
              className:"steam-modal-btn confirm",onClick:Q,disabled:u,children:u?"Đang xử lý...":"Tiếp tục"
            })]
          }):l.jsx("button", {
            className:"steam-modal-btn ok",onClick:te,children:"OK"
          })
        })]
      })
    })]
  })
}
function PK() {
  const n=br();
  return["/login","/register","/forgot-password"].includes(n.pathname)?l.jsx("div", {
    className:"goslynk-captcha-badge",children:l.jsxs("div", {
      className:"goslynk-captcha-content",children:[l.jsxs("div", {
        className:"goslynk-captcha-text",children:["Được bảo vệ bởi",l.jsx("br",{}),l.jsx("strong", {
          children:"Goslynk Captcha"
        })]
      }),l.jsx("div", {
        className:"goslynk-captcha-icon",children:l.jsxs("svg", {
          viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[l.jsx("path", {
            d:"M12 2L21 7V17L12 22L3 17V7L12 2Z",stroke:"#3b82f6",strokeWidth:"2",strokeLinejoin:"round"
          }),l.jsx("path", {
            d:"M12 6L17.5 9V15L12 18L6.5 15V9L12 6Z",fill:"#1e3a8a",stroke:"#60a5fa",strokeWidth:"1"
          }),l.jsx("circle", {
            cx:"12",cy:"12",r:"2.5",fill:"#93c5fd"
          })]
        })
      })]
    })
  }):null
}
function DK() {
  const[n,e]=g.useState(!1);
  g.useEffect(()=> {
    const r=_i("request-close",()=> {
      e(!0)
    });
    return()=> {
      r.then(s=>s())
    }
  },[]);
  const t=async()=> {
    try {
      e(!1),await si().hide()
    }
    catch(r) {
      console.error("Failed to hide window",r)
    }
  },i=async()=> {
    try {
      e(!1),await oe("force_quit_app")
    }
    catch(r) {
      console.error("Failed to quit app",r)
    }
  };
  return n?l.jsx("div", {
    className:"library-detail-remove-dialog-overlay",onClick:()=>e(!1),style: {
      zIndex:9999
    },children:l.jsxs("div", {
      className:"library-detail-remove-dialog",onClick:r=>r.stopPropagation(),children:[l.jsxs("div", {
        className:"library-detail-remove-dialog-header",children:[l.jsx("div", {
          className:"library-detail-remove-dialog-icon",children:"🏃‍♂️"
        }),l.jsx("div", {
          className:"library-detail-remove-dialog-title",children:"Thoát ứng dụng"
        })]
      }),l.jsx("div", {
        className:"library-detail-remove-dialog-content",children:l.jsx("div", {
          className:"library-detail-remove-dialog-message",children:"Bạn có muốn thoát khỏi ứng dụng không?"
        })
      }),l.jsxs("div", {
        className:"library-detail-remove-dialog-actions",children:[l.jsx("button", {
          className:"library-detail-remove-dialog-btn library-detail-remove-dialog-btn-cancel",onClick:i,children:"Thoát hẳn"
        }),l.jsx("button", {
          className:"library-detail-remove-dialog-btn library-detail-remove-dialog-btn-confirm",onClick:t,style: {
            background:"linear-gradient(135deg, #f12711 0%, #f5af19 100%)",boxShadow:"0 0 15px rgba(241, 39, 17, 0.4)"
          },children:"Chỉ ẩn"
        })]
      })]
    })
  }):null
}
const _b=15*60*1e3;
class OK {
  constructor() {
    Gu(this,"cache",new Map);
    Gu(this,"cleanupInterval",null);
    this.startCleanup()
  }
  startCleanup() {
    this.cleanupInterval||(this.cleanupInterval=setInterval(()=> {
      const e=Date.now();
      for(const[t,i]of this.cache.entries())e-i.timestamp>_b&&this.cache.delete(t)
    },6e4))
  }
  get(e) {
    const t=this.cache.get(e);
    return t?Date.now()-t.timestamp>_b?(this.cache.delete(e),null):t.data:null
  }
  set(e,t) {
    this.cache.set(e, {
      data:t,timestamp:Date.now()
    })
  }
  clear(e) {
    e?this.cache.delete(e):this.cache.clear()
  }
  has(e) {
    const t=this.cache.get(e);
    return t?Date.now()-t.timestamp>_b?(this.cache.delete(e),!1):!0:!1
  }
}
const sk=new OK,UK="";
function FK() {
  const {
    sessionId:n
  }
  =nn(),[e,t]=g.useState(UK),[i,r]=g.useState(!1),s=g.useRef(null),a=g.useRef(null),o=g.useRef(null);
  g.useEffect(()=> {
    (async()=> {
      const u=`banner_${n||"anonymous"}`,f=sk.get(u);
      if(f!==null) {
        t(f);
        return
      }
      try {
        const h=await fetch(`${Se}/admin/settings/banner`, {
          headers:n? {
            Authorization:`Bearer ${n}`
          }
          :{}
        });
        if(!h.ok)return;
        const m=await h.json(),p=m&&m.url||"";
        t(p),sk.set(u,p)
      }
      catch{}
    })()
  },[n]),g.useEffect(()=> {
    if(!(!s.current||!e))return o.current=new IntersectionObserver(d=> {
      d.forEach(u=> {
        r(u.isIntersecting)
      })
    }, {
      rootMargin:"50px",threshold:.1
    }),o.current.observe(s.current),()=> {
      o.current&&o.current.disconnect()
    }
  },[e]),g.useEffect(()=> {
    if(!a.current||!e)return;
    const d=a.current;
    if(e.toLowerCase().endsWith(".webm")||e.toLowerCase().endsWith(".mp4"))if(i) {
      d.preload="metadata",d.muted=!0,d.playsInline=!0,d.loop=!0;
      const f=()=> {
        d.play().catch(()=>{})
      };
      return d.addEventListener("loadedmetadata",f),()=> {
        d.removeEventListener("loadedmetadata",f),d.pause()
      }
    }
    else d.pause(),d.currentTime=0
  },[i,e]);
  const c=e.toLowerCase().endsWith(".webm")||e.toLowerCase().endsWith(".mp4");
  return l.jsx("section", {
    className:"banner",ref:s,children:e&&i&&l.jsx(l.Fragment, {
      children:c?l.jsx("video", {
        ref:a,className:"banner-media",src:e,muted:!0,loop:!0,playsInline:!0,preload:"metadata",onError:d=> {
          d.currentTarget.style.display="none"
        }
      },e):l.jsx("img", {
        className:"banner-media",src:e,alt:"store banner",loading:"lazy",decoding:"async",onError:d=> {
          d.currentTarget.style.display="none"
        }
      },e)
    })
  })
}
const aS=15*60*1e3,BK=50,Jp=new Map,Lb=new Map;
function J4(n,e) {
  return n.get(e)||null
}
function $K(n) {
  return Date.now()-n.fetchedAt<aS
}
function Dg(n,e,t) {
  if(n.size>=BK) {
    let i=null,r=1/0;
    for(const[s,a]of n)a.fetchedAt<r&&(r=a.fetchedAt,i=s);
    i&&n.delete(i)
  }
  n.set(e, {
    data:t,fetchedAt:Date.now()
  })
}
let Mb=0;
const zK=2,GK=500,oS=[];
function Q4() {
  for(;
  Mb<zK&&oS.length>0;
  ) {
    const n=oS.shift();
    Mb++,n.task().then(n.resolve).catch(n.reject).finally(()=> {
      Mb--,setTimeout(()=>Q4(),GK)
    })
  }
}
function VK(n) {
  return new Promise((e,t)=> {
    oS.push( {
      resolve:e,reject:t,task:n
    }),Q4()
  })
}
const fl=new Map;
async function Z4(n,e) {
  let t=!1;
  try {
    t=zn()
  }
  catch{}const i=Date.now(),r=J4(Jp,n);
  if(r)return i-r.fetchedAt<aS||ak(n,t,e),r.data;
  if(t)try {
    const a=await oe("read_game_detail_cache", {
      appId:n,version:"v1"
    });
    if(a) {
      const o=JSON.parse(a);
      return Jp.set(n, {
        data:o.data,fetchedAt:o.fetchedAt
      }),i-o.fetchedAt<aS||ak(n,t,e),o.data
    }
  }
  catch{}const s=await eP(n);
  return s&&(Dg(Jp,n,s),X4(n,s,t)),s
}
function X4(n,e,t) {
  if(!t)return;
  const i= {
    fetchedAt:Date.now(),data:e
  };
  oe("cache_game_detail", {
    appId:n,version:"v1",data:JSON.stringify(i)
  }).catch(()=>{})
}
function ak(n,e,t) {
  eP(n).then(i=> {
    i&&(Dg(Jp,n,i),X4(n,i,e),t&&t(i))
  }).catch(()=>{})
}
async function eP(n) {
  if(fl.has(n))return fl.get(n);
  const e=(async()=> {
    try {
      const t=await oe("fetch_steam_app_details", {
        appId:n
      });
      if(t&&typeof t=="object") {
        const i=t[n];
        if(i!=null&&i.success&&(i!=null&&i.data))return i.data
      }
    }
    catch{}try {
      const t=await fetch(`${Se}/steam/${encodeURIComponent(n)}`);
      if(t.ok) {
        const r=(await t.json())[n];
        if(r!=null&&r.success&&(r!=null&&r.data))return r.data
      }
    }
    catch{}return null
  })();
  fl.set(n,e);
  try {
    return await e
  }
  finally {
    fl.delete(n)
  }
}
async function ok(n,e=5,t=300) {
  const i=`${n}_${e}_${t}`,r=J4(Lb,i);
  if(r&&$K(r))return r.data;
  const s=`news_${i}`;
  if(fl.has(s))return fl.get(s);
  const a=VK(async()=> {
    var c,d;
    const o=`https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${encodeURIComponent(n)}&count=${e}&maxlength=${t}`;
    try {
      const u=await fetch(o);
      if(u.ok) {
        const f=await u.json();
        if((c=f==null?void 0:f.appnews)!=null&&c.newsitems)return Dg(Lb,i,f),f
      }
    }
    catch{}try {
      const u=await fetch(`${Se}/steam/${encodeURIComponent(n)}/news?count=${e}&maxlength=${t}`);
      if(u.ok) {
        const f=await u.json();
        if((d=f==null?void 0:f.appnews)!=null&&d.newsitems)return Dg(Lb,i,f),f
      }
    }
    catch{}return null
  });
  fl.set(s,a);
  try {
    return await a
  }
  finally {
    fl.delete(s)
  }
}
function $m(n) {
  if(!n)return"";
  const e=new Set(["b","i","em","strong","p","br","ul","ol","li","h1","h2","h3","h4","h5","h6","a","img","div","span","blockquote","pre","code","table","tr","td","th","thead","tbody"]),t=new Set(["href","src","alt","title","class","width","height","target"]),i=new DOMParser().parseFromString(n,"text/html"),r=s=> {
    var o;
    if(s.nodeType===Node.ELEMENT_NODE) {
      const c=s;
      if(!e.has(c.tagName.toLowerCase())) {
        const d=document.createTextNode(c.textContent||"");
        (o=c.parentNode)==null||o.replaceChild(d,c);
        return
      }
      for(const d of Array.from(c.attributes))t.has(d.name.toLowerCase())||c.removeAttribute(d.name);
      c.hasAttribute("href")&&(c.getAttribute("href")||"").trim().toLowerCase().startsWith("javascript:")&&c.setAttribute("href","#")
    }
    const a=Array.from(s.childNodes);
    for(const c of a)r(c)
  };
  return r(i.body),i.body.innerHTML
}
async function WK(n) {
  var e,t,i,r;
  try {
    const s=await fetch(`https://api.steamcmd.net/v1/info/${encodeURIComponent(n)}`);
    if(!s.ok)throw new Error("steamcmd api error");
    const a=await s.json(),o=(e=a==null?void 0:a.data)==null?void 0:e[n];
    if(!o)return null;
    const c=o==null?void 0:o.common,d=((r=(i=(t=c==null?void 0:c.library_assets_full)==null?void 0:t.library_hero)==null?void 0:i.image)==null?void 0:r.english)||null;
    return d?`https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/${n}/${d}`:null
  }
  catch {
    return null
  }
}
const gt=Number.isFinite||function(n) {
  return typeof n=="number"&&isFinite(n)
},HK=Number.isSafeInteger||function(n) {
  return typeof n=="number"&&Math.abs(n)<=KK
},KK=Number.MAX_SAFE_INTEGER||9007199254740991;
let Lt=function(n) {
  return n.NETWORK_ERROR="networkError",n.MEDIA_ERROR="mediaError",n.KEY_SYSTEM_ERROR="keySystemError",n.MUX_ERROR="muxError",n.OTHER_ERROR="otherError",n
}
({}),Me=function(n) {
  return n.KEY_SYSTEM_NO_KEYS="keySystemNoKeys",n.KEY_SYSTEM_NO_ACCESS="keySystemNoAccess",n.KEY_SYSTEM_NO_SESSION="keySystemNoSession",n.KEY_SYSTEM_NO_CONFIGURED_LICENSE="keySystemNoConfiguredLicense",n.KEY_SYSTEM_LICENSE_REQUEST_FAILED="keySystemLicenseRequestFailed",n.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED="keySystemServerCertificateRequestFailed",n.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED="keySystemServerCertificateUpdateFailed",n.KEY_SYSTEM_SESSION_UPDATE_FAILED="keySystemSessionUpdateFailed",n.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED="keySystemStatusOutputRestricted",n.KEY_SYSTEM_STATUS_INTERNAL_ERROR="keySystemStatusInternalError",n.KEY_SYSTEM_DESTROY_MEDIA_KEYS_ERROR="keySystemDestroyMediaKeysError",n.KEY_SYSTEM_DESTROY_CLOSE_SESSION_ERROR="keySystemDestroyCloseSessionError",n.KEY_SYSTEM_DESTROY_REMOVE_SESSION_ERROR="keySystemDestroyRemoveSessionError",n.MANIFEST_LOAD_ERROR="manifestLoadError",n.MANIFEST_LOAD_TIMEOUT="manifestLoadTimeOut",n.MANIFEST_PARSING_ERROR="manifestParsingError",n.MANIFEST_INCOMPATIBLE_CODECS_ERROR="manifestIncompatibleCodecsError",n.LEVEL_EMPTY_ERROR="levelEmptyError",n.LEVEL_LOAD_ERROR="levelLoadError",n.LEVEL_LOAD_TIMEOUT="levelLoadTimeOut",n.LEVEL_PARSING_ERROR="levelParsingError",n.LEVEL_SWITCH_ERROR="levelSwitchError",n.AUDIO_TRACK_LOAD_ERROR="audioTrackLoadError",n.AUDIO_TRACK_LOAD_TIMEOUT="audioTrackLoadTimeOut",n.SUBTITLE_LOAD_ERROR="subtitleTrackLoadError",n.SUBTITLE_TRACK_LOAD_TIMEOUT="subtitleTrackLoadTimeOut",n.FRAG_LOAD_ERROR="fragLoadError",n.FRAG_LOAD_TIMEOUT="fragLoadTimeOut",n.FRAG_DECRYPT_ERROR="fragDecryptError",n.FRAG_PARSING_ERROR="fragParsingError",n.FRAG_GAP="fragGap",n.REMUX_ALLOC_ERROR="remuxAllocError",n.KEY_LOAD_ERROR="keyLoadError",n.KEY_LOAD_TIMEOUT="keyLoadTimeOut",n.BUFFER_ADD_CODEC_ERROR="bufferAddCodecError",n.BUFFER_INCOMPATIBLE_CODECS_ERROR="bufferIncompatibleCodecsError",n.BUFFER_APPEND_ERROR="bufferAppendError",n.BUFFER_APPENDING_ERROR="bufferAppendingError",n.BUFFER_STALLED_ERROR="bufferStalledError",n.BUFFER_FULL_ERROR="bufferFullError",n.BUFFER_SEEK_OVER_HOLE="bufferSeekOverHole",n.BUFFER_NUDGE_ON_STALL="bufferNudgeOnStall",n.ASSET_LIST_LOAD_ERROR="assetListLoadError",n.ASSET_LIST_LOAD_TIMEOUT="assetListLoadTimeout",n.ASSET_LIST_PARSING_ERROR="assetListParsingError",n.INTERSTITIAL_ASSET_ITEM_ERROR="interstitialAssetItemError",n.INTERNAL_EXCEPTION="internalException",n.INTERNAL_ABORTED="aborted",n.ATTACH_MEDIA_ERROR="attachMediaError",n.UNKNOWN="unknown",n
}
({}),P=function(n) {
  return n.MEDIA_ATTACHING="hlsMediaAttaching",n.MEDIA_ATTACHED="hlsMediaAttached",n.MEDIA_DETACHING="hlsMediaDetaching",n.MEDIA_DETACHED="hlsMediaDetached",n.MEDIA_ENDED="hlsMediaEnded",n.STALL_RESOLVED="hlsStallResolved",n.BUFFER_RESET="hlsBufferReset",n.BUFFER_CODECS="hlsBufferCodecs",n.BUFFER_CREATED="hlsBufferCreated",n.BUFFER_APPENDING="hlsBufferAppending",n.BUFFER_APPENDED="hlsBufferAppended",n.BUFFER_EOS="hlsBufferEos",n.BUFFERED_TO_END="hlsBufferedToEnd",n.BUFFER_FLUSHING="hlsBufferFlushing",n.BUFFER_FLUSHED="hlsBufferFlushed",n.MANIFEST_LOADING="hlsManifestLoading",n.MANIFEST_LOADED="hlsManifestLoaded",n.MANIFEST_PARSED="hlsManifestParsed",n.LEVEL_SWITCHING="hlsLevelSwitching",n.LEVEL_SWITCHED="hlsLevelSwitched",n.LEVEL_LOADING="hlsLevelLoading",n.LEVEL_LOADED="hlsLevelLoaded",n.LEVEL_UPDATED="hlsLevelUpdated",n.LEVEL_PTS_UPDATED="hlsLevelPtsUpdated",n.LEVELS_UPDATED="hlsLevelsUpdated",n.AUDIO_TRACKS_UPDATED="hlsAudioTracksUpdated",n.AUDIO_TRACK_SWITCHING="hlsAudioTrackSwitching",n.AUDIO_TRACK_SWITCHED="hlsAudioTrackSwitched",n.AUDIO_TRACK_LOADING="hlsAudioTrackLoading",n.AUDIO_TRACK_LOADED="hlsAudioTrackLoaded",n.AUDIO_TRACK_UPDATED="hlsAudioTrackUpdated",n.SUBTITLE_TRACKS_UPDATED="hlsSu