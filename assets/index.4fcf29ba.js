import{S as e,i as t,s as a,e as s,t as r,c as l,a as o,b as c,d as i,f as n,g as u,h,j as v,q as m,k as g,l as k,m as f,n as w,o as d,p,r as b,u as S,v as I,w as y}from"./vendor.9249f797.js";function E(e,t,a){const s=e.slice();return s[27]=t[a],s}function T(e){let t,a,v,m,g,k,f,w,d,p,b,S=new Date(e[27].timestamp).toLocaleTimeString()+"",I=e[27].action+"",y=e[11](e[27].timers[0])+"",E=e[11](e[27].timers[1])+"";return{c(){t=s("p"),a=r(S),v=r(' - Action: "'),m=r(I),g=r('"'),k=s("br"),f=r(y),w=r(" work"),d=s("br"),p=r(E),b=r(" break")},l(e){t=l(e,"P",{});var s=o(t);a=c(s,S),v=c(s,' - Action: "'),m=c(s,I),g=c(s,'"'),k=l(s,"BR",{}),f=c(s,y),w=c(s," work"),d=l(s,"BR",{}),p=c(s,E),b=c(s," break"),s.forEach(i)},m(e,s){n(e,t,s),u(t,a),u(t,v),u(t,m),u(t,g),u(t,k),u(t,f),u(t,w),u(t,d),u(t,p),u(t,b)},p(e,t){16&t&&S!==(S=new Date(e[27].timestamp).toLocaleTimeString()+"")&&h(a,S),16&t&&I!==(I=e[27].action+"")&&h(m,I),16&t&&y!==(y=e[11](e[27].timers[0])+"")&&h(f,y),16&t&&E!==(E=e[11](e[27].timers[1])+"")&&h(p,E)},d(e){e&&i(t)}}}function z(e){var t;let a,z,$,B,N,D,M,P,U,L,W,A,R,O,V,J,x,H,C,j,Y,q,F,G,K,Q,X,Z,_,ee,te,ae,se,re,le,oe,ce,ie,ne,ue,he,ve,me,ge,ke,fe,we,de,pe,be,Se,Ie,ye,Ee,Te,ze,$e,Be,Ne,De,Me,Pe,Ue,Le,We,Ae,Re,Oe,Ve,Je,xe,He,Ce,je,Ye,qe,Fe,Ge,Ke,Qe,Xe,Ze,_e,et,tt,at,st,rt,lt,ot,ct,it,nt,ut,ht,vt,mt,gt,kt,ft,wt=e[11](e[1])+"",dt=e[2]*e[3][0]-e[1]*e[3][1]>0?`(-${e[11](e[2]*e[3][0]-e[1]*e[3][1],!0)})`:"",pt=e[11](e[2])+"",bt=e[1]/e[3][0]*e[3][1]-e[2]>=1?`(+${e[11](e[1]/e[3][0]*e[3][1]-e[2],!0)})`:"",St=e[11](e[1]+e[2])+"",It=((null==(t=e[0])?void 0:t.toLocaleTimeString())||"null")+"",yt=e[0]?e[5]?"Pause":"Resume":e[5]?"Stop":"Start",Et=e[6]?"Do Work":"Do Break";document.title=a=e[11](e[6]?e[2]*(e[3][1]/e[3][0]):e[1])+(e[6]?" - Break ":" - Work ")+" | Ratio Timer";let Tt=e[4],zt=[];for(let s=0;s<Tt.length;s+=1)zt[s]=T(E(e,Tt,s));return{c(){z=v(),$=s("main"),B=s("div"),N=s("div"),D=s("span"),M=r("▶"),P=v(),U=s("h1"),L=r("Work: "),W=r(wt),A=v(),R=r(dt),O=v(),V=s("h1"),J=r("Break: "),x=r(pt),H=v(),C=r(bt),j=v(),Y=s("br"),q=v(),F=s("h2"),G=r("Total: "),K=r(St),Q=r(" (work + break)"),X=v(),Z=s("h2"),_=r("Started: "),ee=r(It),te=v(),ae=s("br"),se=v(),re=s("div"),le=s("span"),oe=r("Work:"),ce=v(),ie=s("input"),ne=v(),ue=s("span"),he=r("to"),ve=v(),me=s("span"),ge=r("Break:"),ke=v(),fe=s("input"),we=v(),de=s("div"),pe=s("button"),be=r("Clear"),Se=v(),Ie=s("button"),ye=r(yt),Ee=v(),Te=s("button"),ze=r(Et),$e=v(),Be=s("details"),Ne=s("summary"),De=r("Edit Time"),Me=v(),Pe=s("div"),Ue=r("Work: "),Le=s("input"),We=r("m "),Ae=s("input"),Re=r("s"),Oe=s("br"),Ve=r("\n\t\t\tBreak: "),Je=s("input"),xe=r("m "),He=s("input"),Ce=r("s\n\t\t\t"),je=s("p"),Ye=r("Be sure to pause/stop the timer before editing the time!"),qe=v(),Fe=s("details"),Ge=s("summary"),Ke=r("Logs"),Qe=v(),Xe=s("div");for(let e=0;e<zt.length;e+=1)zt[e].c();Ze=v(),_e=s("div"),et=s("h3"),tt=r("To use:"),at=v(),st=s("ul"),rt=s("li"),lt=r('Set the ratio betweek work time and break time (default 5 to 1). Next, click "Start" to begin working!'),ot=v(),ct=s("li"),it=r('To switch between work and break, hit the "Do (Work|Break)" button.'),nt=v(),ut=s("li"),ht=r("The site will save the session to your device in case you accidentally close or refresh."),vt=v(),mt=s("li"),gt=r('Use the "Clear" button to reset your session.'),this.h()},l(e){m('[data-svelte="svelte-3ox6dj"]',document.head).forEach(i),z=g(e),$=l(e,"MAIN",{class:!0});var t=o($);B=l(t,"DIV",{});var a=o(B);N=l(a,"DIV",{class:!0});var s=o(N);D=l(s,"SPAN",{class:!0});var r=o(D);M=c(r,"▶"),r.forEach(i),s.forEach(i),P=g(a),U=l(a,"H1",{class:!0});var n=o(U);L=c(n,"Work: "),W=c(n,wt),A=g(n),R=c(n,dt),n.forEach(i),O=g(a),V=l(a,"H1",{class:!0});var u=o(V);J=c(u,"Break: "),x=c(u,pt),H=g(u),C=c(u,bt),u.forEach(i),j=g(a),Y=l(a,"BR",{}),q=g(a),F=l(a,"H2",{class:!0});var h=o(F);G=c(h,"Total: "),K=c(h,St),Q=c(h," (work + break)"),h.forEach(i),X=g(a),Z=l(a,"H2",{class:!0});var v=o(Z);_=c(v,"Started: "),ee=c(v,It),v.forEach(i),te=g(a),ae=l(a,"BR",{}),a.forEach(i),se=g(t),re=l(t,"DIV",{class:!0});var k=o(re);le=l(k,"SPAN",{class:!0});var f=o(le);oe=c(f,"Work:"),f.forEach(i),ce=g(k),ie=l(k,"INPUT",{type:!0,class:!0}),ne=g(k),ue=l(k,"SPAN",{class:!0});var w=o(ue);he=c(w,"to"),w.forEach(i),ve=g(k),me=l(k,"SPAN",{class:!0});var d=o(me);ge=c(d,"Break:"),d.forEach(i),ke=g(k),fe=l(k,"INPUT",{type:!0,class:!0}),k.forEach(i),we=g(t),de=l(t,"DIV",{class:!0});var p=o(de);pe=l(p,"BUTTON",{class:!0});var b=o(pe);be=c(b,"Clear"),b.forEach(i),Se=g(p),Ie=l(p,"BUTTON",{class:!0});var S=o(Ie);ye=c(S,yt),S.forEach(i),Ee=g(p),Te=l(p,"BUTTON",{class:!0});var I=o(Te);ze=c(I,Et),I.forEach(i),p.forEach(i),$e=g(t),Be=l(t,"DETAILS",{style:!0});var y=o(Be);Ne=l(y,"SUMMARY",{class:!0});var E=o(Ne);De=c(E,"Edit Time"),E.forEach(i),Me=g(y),Pe=l(y,"DIV",{});var T=o(Pe);Ue=c(T,"Work: "),Le=l(T,"INPUT",{type:!0,class:!0}),We=c(T,"m "),Ae=l(T,"INPUT",{type:!0,class:!0}),Re=c(T,"s"),Oe=l(T,"BR",{}),Ve=c(T,"\n\t\t\tBreak: "),Je=l(T,"INPUT",{type:!0,class:!0}),xe=c(T,"m "),He=l(T,"INPUT",{type:!0,class:!0}),Ce=c(T,"s\n\t\t\t"),je=l(T,"P",{});var kt=o(je);Ye=c(kt,"Be sure to pause/stop the timer before editing the time!"),kt.forEach(i),T.forEach(i),y.forEach(i),qe=g(t),Fe=l(t,"DETAILS",{class:!0});var ft=o(Fe);Ge=l(ft,"SUMMARY",{class:!0});var Tt=o(Ge);Ke=c(Tt,"Logs"),Tt.forEach(i),Qe=g(ft),Xe=l(ft,"DIV",{});var $t=o(Xe);for(let l=0;l<zt.length;l+=1)zt[l].l($t);$t.forEach(i),ft.forEach(i),Ze=g(t),_e=l(t,"DIV",{class:!0});var Bt=o(_e);et=l(Bt,"H3",{});var Nt=o(et);tt=c(Nt,"To use:"),Nt.forEach(i),at=g(Bt),st=l(Bt,"UL",{});var Dt=o(st);rt=l(Dt,"LI",{class:!0});var Mt=o(rt);lt=c(Mt,'Set the ratio betweek work time and break time (default 5 to 1). Next, click "Start" to begin working!'),Mt.forEach(i),ot=g(Dt),ct=l(Dt,"LI",{class:!0});var Pt=o(ct);it=c(Pt,'To switch between work and break, hit the "Do (Work|Break)" button.'),Pt.forEach(i),nt=g(Dt),ut=l(Dt,"LI",{class:!0});var Ut=o(ut);ht=c(Ut,"The site will save the session to your device in case you accidentally close or refresh."),Ut.forEach(i),vt=g(Dt),mt=l(Dt,"LI",{class:!0});var Lt=o(mt);gt=c(Lt,'Use the "Clear" button to reset your session.'),Lt.forEach(i),Dt.forEach(i),Bt.forEach(i),t.forEach(i),this.h()},h(){k(D,"class","svelte-hzw0u9"),k(N,"class","pointer svelte-hzw0u9"),f(N,"break",e[6]),k(U,"class","svelte-hzw0u9"),f(U,"red",e[7]),k(V,"class","svelte-hzw0u9"),f(V,"red",e[7]),k(F,"class","svelte-hzw0u9"),k(Z,"class","svelte-hzw0u9"),k(le,"class","svelte-hzw0u9"),k(ie,"type","number"),k(ie,"class","svelte-hzw0u9"),k(ue,"class","svelte-hzw0u9"),k(me,"class","svelte-hzw0u9"),k(fe,"type","number"),k(fe,"class","svelte-hzw0u9"),k(re,"class","controls svelte-hzw0u9"),k(pe,"class","svelte-hzw0u9"),k(Ie,"class","svelte-hzw0u9"),k(Te,"class","svelte-hzw0u9"),k(de,"class","buttons svelte-hzw0u9"),k(Ne,"class","svelte-hzw0u9"),k(Le,"type","number"),k(Le,"class","svelte-hzw0u9"),k(Ae,"type","number"),k(Ae,"class","svelte-hzw0u9"),k(Je,"type","number"),k(Je,"class","svelte-hzw0u9"),k(He,"type","number"),k(He,"class","svelte-hzw0u9"),w(Be,"text-align","center"),k(Ge,"class","svelte-hzw0u9"),k(Fe,"class","logs svelte-hzw0u9"),k(rt,"class","svelte-hzw0u9"),k(ct,"class","svelte-hzw0u9"),k(ut,"class","svelte-hzw0u9"),k(mt,"class","svelte-hzw0u9"),k(_e,"class","info svelte-hzw0u9"),k($,"class","svelte-hzw0u9")},m(t,a){n(t,z,a),n(t,$,a),u($,B),u(B,N),u(N,D),u(D,M),u(B,P),u(B,U),u(U,L),u(U,W),u(U,A),u(U,R),u(B,O),u(B,V),u(V,J),u(V,x),u(V,H),u(V,C),u(B,j),u(B,Y),u(B,q),u(B,F),u(F,G),u(F,K),u(F,Q),u(B,X),u(B,Z),u(Z,_),u(Z,ee),u(B,te),u(B,ae),u($,se),u($,re),u(re,le),u(le,oe),u(re,ce),u(re,ie),d(ie,e[3][0]),u(re,ne),u(re,ue),u(ue,he),u(re,ve),u(re,me),u(me,ge),u(re,ke),u(re,fe),d(fe,e[3][1]),u($,we),u($,de),u(de,pe),u(pe,be),u(de,Se),u(de,Ie),u(Ie,ye),u(de,Ee),u(de,Te),u(Te,ze),u($,$e),u($,Be),u(Be,Ne),u(Ne,De),u(Be,Me),u(Be,Pe),u(Pe,Ue),u(Pe,Le),d(Le,e[8][0]),u(Pe,We),u(Pe,Ae),d(Ae,e[8][1]),u(Pe,Re),u(Pe,Oe),u(Pe,Ve),u(Pe,Je),d(Je,e[8][2]),u(Pe,xe),u(Pe,He),d(He,e[8][3]),u(Pe,Ce),u(Pe,je),u(je,Ye),u($,qe),u($,Fe),u(Fe,Ge),u(Ge,Ke),u(Fe,Qe),u(Fe,Xe);for(let e=0;e<zt.length;e+=1)zt[e].m(Xe,null);u($,Ze),u($,_e),u(_e,et),u(et,tt),u(_e,at),u(_e,st),u(st,rt),u(rt,lt),u(st,ot),u(st,ct),u(ct,it),u(st,nt),u(st,ut),u(ut,ht),u(st,vt),u(st,mt),u(mt,gt),kt||(ft=[p(ie,"input",e[14]),p(fe,"input",e[15]),p(pe,"click",e[10]),p(Ie,"click",e[9]),p(Te,"click",e[12]),p(Le,"change",e[16]),p(Le,"input",e[17]),p(Ae,"change",e[18]),p(Ae,"input",e[19]),p(Je,"change",e[20]),p(Je,"input",e[21]),p(He,"change",e[22]),p(He,"input",e[23])],kt=!0)},p(e,[t]){var s;if(2126&t&&a!==(a=e[11](e[6]?e[2]*(e[3][1]/e[3][0]):e[1])+(e[6]?" - Break ":" - Work ")+" | Ratio Timer")&&(document.title=a),64&t&&f(N,"break",e[6]),2&t&&wt!==(wt=e[11](e[1])+"")&&h(W,wt),14&t&&dt!==(dt=e[2]*e[3][0]-e[1]*e[3][1]>0?`(-${e[11](e[2]*e[3][0]-e[1]*e[3][1],!0)})`:"")&&h(R,dt),128&t&&f(U,"red",e[7]),4&t&&pt!==(pt=e[11](e[2])+"")&&h(x,pt),14&t&&bt!==(bt=e[1]/e[3][0]*e[3][1]-e[2]>=1?`(+${e[11](e[1]/e[3][0]*e[3][1]-e[2],!0)})`:"")&&h(C,bt),128&t&&f(V,"red",e[7]),6&t&&St!==(St=e[11](e[1]+e[2])+"")&&h(K,St),1&t&&It!==(It=((null==(s=e[0])?void 0:s.toLocaleTimeString())||"null")+"")&&h(ee,It),8&t&&b(ie.value)!==e[3][0]&&d(ie,e[3][0]),8&t&&b(fe.value)!==e[3][1]&&d(fe,e[3][1]),33&t&&yt!==(yt=e[0]?e[5]?"Pause":"Resume":e[5]?"Stop":"Start")&&h(ye,yt),64&t&&Et!==(Et=e[6]?"Do Work":"Do Break")&&h(ze,Et),256&t&&b(Le.value)!==e[8][0]&&d(Le,e[8][0]),256&t&&b(Ae.value)!==e[8][1]&&d(Ae,e[8][1]),256&t&&b(Je.value)!==e[8][2]&&d(Je,e[8][2]),256&t&&b(He.value)!==e[8][3]&&d(He,e[8][3]),2064&t){let a;for(Tt=e[4],a=0;a<Tt.length;a+=1){const s=E(e,Tt,a);zt[a]?zt[a].p(s,t):(zt[a]=T(s),zt[a].c(),zt[a].m(Xe,null))}for(;a<zt.length;a+=1)zt[a].d(1);zt.length=Tt.length}},i:S,o:S,d(e){e&&i(z),e&&i($),I(zt,e),kt=!1,y(ft)}}}function $(e,t,a){let s,r=!1,l=!1,o=!1,c=[0,0,0,0],i=localStorage.getItem("time")?new Date(localStorage.getItem("time")):null,[n,u]=localStorage.getItem("timers")?JSON.parse(localStorage.getItem("timers")):[0,0],h=localStorage.getItem("ratio")?JSON.parse(localStorage.getItem("ratio")):[5,1],v=localStorage.getItem("logs")?JSON.parse(localStorage.getItem("logs")):[];if(localStorage.getItem("total")){let e=+localStorage.getItem("total"),t=+localStorage.getItem("timer");alert("It looks like you're using an older verison. I'll do my best to convert your session!");try{n=0,u=0,t>0?(n+=t,e-=t):t<0&&(t=Math.abs(t),u+=t/(h[0]/h[1]),e-=t/(h[0]/h[1])),n+=Math.round(e*h[0]/(h[0]+h[1])),u+=Math.round(e-e*h[0]/(h[0]+h[1])),localStorage.removeItem("timer"),localStorage.removeItem("total")}catch(f){alert("I'm having trouble converting your session. Try clearing your cache & cookies."),console.error(f)}}const m=e=>{a(4,v=[{timestamp:new Date,timers:[n,u],action:e},...v])},g=()=>{a(8,c[0]=Math.trunc(n/60),c),a(8,c[1]=Math.trunc(n%60),c),a(8,c[2]=Math.trunc(u/60),c),a(8,c[3]=Math.trunc(u%60),c)},k=e=>{const t=Number("break"===e),s=c[2*t],r=c[2*t+1];"work"===e?a(1,n=60*s+r):"break"===e&&a(2,u=60*s+r)};g();return e.$$.update=()=>{1&e.$$.dirty&&(i?localStorage.setItem("time",""+i):localStorage.removeItem("time")),6&e.$$.dirty&&localStorage.setItem("timers",JSON.stringify([n,u])),8&e.$$.dirty&&localStorage.setItem("ratio",JSON.stringify(h)),16&e.$$.dirty&&localStorage.setItem("logs",JSON.stringify(v)),14&e.$$.dirty&&a(7,o=n*h[1]<u*h[0])},[i,n,u,h,v,r,l,o,c,()=>{r?(m("stop"),clearInterval(s)):(m("start"),i||a(0,i=new Date),s=setInterval((()=>{l?a(2,u+=1):a(1,n+=1),g()}),1e3)),a(5,r=!r)},()=>{a(4,v=[]),m("clear"),a(1,n=0),a(2,u=0),a(0,i=null),a(7,o=!1)},(e,t=!1)=>{let a=e<0;e=Math.abs(e);let s=Math.trunc(e/60/60),r=Math.trunc(e/60%60),l=Math.trunc(e%60);return t?`${a?"-":""}${s?s+"h ":""}${r?r+"m ":""}${l||0}s`:`${a?"-":""}${s?s+"h ":""}${r}m ${l<10?"0"+l:l}s`},()=>{a(6,l=!l),m(l?"break":"work")},k,function(){h[0]=b(this.value),a(3,h)},function(){h[1]=b(this.value),a(3,h)},()=>k("work"),function(){c[0]=b(this.value),a(8,c)},()=>k("work"),function(){c[1]=b(this.value),a(8,c)},()=>k("break"),function(){c[2]=b(this.value),a(8,c)},()=>k("break"),function(){c[3]=b(this.value),a(8,c)}]}new class extends e{constructor(e){super(),t(this,e,$,z,a,{})}}({target:document.getElementById("app")});
