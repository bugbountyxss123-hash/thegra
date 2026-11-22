/* الهيكل المشترك: القائمة، التقدّم، الشارات، الرسائل، الشهادة، الاختبارات */
(function(){
var BASE=document.currentScript.src.replace(/assets\/site\.js.*$/,""),D=window.SITE,B=document.body,KEY="thagra-v3",PASS=70;
function q(s,r){return(r||document).querySelector(s)}
function qa(s){return document.querySelectorAll(s)}
function ar(n){return String(n).replace(/\d/g,function(d){return"٠١٢٣٤٥٦٧٨٩"[d]})}
function level(p){return p>=90?"خبير":p>=70?"متقدّم":p>=50?"متوسط":"مبتدئ"}

/* الحالة المحفوظة في متصفح الزائر */
var S={l:{},x:{},lv:[0,0,0]};
try{
  var raw=localStorage.getItem(KEY);
  if(raw)S=JSON.parse(raw);
  else{ /* ترحيل تقدّم النسخة القديمة */
    var o=JSON.parse(localStorage.getItem("thagra-v2")||"null");
    if(o){
      var L=["prompt-injection","jailbreak","data-leakage","excessive-agency","data-poisoning","adversarial-examples","model-extraction","deepfake"],
          X=["indirect-injection","membership-inference","data-poisoning","model-extraction","side-channel","rag-attacks","supply-chain","agent-risks"],
          x=o.x||[];
      if(x.length===3)x=[x[0],0,x[2],0,0,0,0,0];
      (o.l||[]).forEach(function(v,i){if(v&&L[i])S.l[L[i]]=1});
      x.forEach(function(v,i){if(v&&X[i])S.x[X[i]]=1});
      S.lv=(o.lab||[0,0,0]).slice(0,3);
    }
  }
}catch(e){}
S.l=S.l||{};S.x=S.x||{};S.lv=S.lv||[0,0,0];S.b=S.b||{};S.ex=S.ex||{};
function persist(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function isDone(k,s){
  if(k==="x"&&s==="prompt-injection")return S.lv.every(Boolean);
  if(k==="e")return(S.ex.best||0)>=PASS;
  return!!S[k][s];
}

/* رسائل التهنئة */
var tq=[],tb=false,tel=document.createElement("div");
tel.className="toast";tel.setAttribute("role","status");document.body.appendChild(tel);
function toast(t){tq.push(t);if(!tb)nextT()}
function nextT(){var t=tq.shift();if(!t){tb=false;tel.classList.remove("show");return}tb=true;tel.textContent=t;tel.classList.add("show");setTimeout(nextT,3800)}

/* الشارات: القواعد هنا، والتعريفات (الاسم والأيقونة) في data.js */
var RULES={"first-lesson":function(s){return s.ld>=1},"first-lab":function(s){return s.xd>=1},"half":function(s){return s.pct>=50},
  "all-lessons":function(s){return s.ld===s.lt},"all-labs":function(s){return s.xd===s.xt},"exam-pass":function(s){return s.ex},
  "exam-top":function(s){return s.best===100},"graduate":function(s){return s.full}};

var seen={},first=true,cstate=null;
function items(){
  var a=[];
  D.lessons.forEach(function(l){a.push({k:"l:"+l.slug,t:"الدرس «"+l.title+"»"})});
  D.labs.forEach(function(l){a.push({k:"x:"+l.slug,t:"المعمل «"+l.title+"»"})});
  a.push({k:"e:final",t:"الاختبار النهائي"});
  return a;
}
function refresh(){
  var it=items(),n=0,ld=0,xd=0,fresh=[];
  it.forEach(function(i){
    var a=i.k.split(":"),d=isDone(a[0],a[1]);
    if(d){n++;if(a[0]==="l")ld++;if(a[0]==="x")xd++}
    if(d&&!seen[i.k]){seen[i.k]=1;if(!first)fresh.push(i.t)}
  });
  var pc=Math.round(n/it.length*100),st={ld:ld,lt:D.lessons.length,xd:xd,xt:D.labs.length,ex:isDone("e"),pct:pc,full:n===it.length,best:S.ex.best};
  qa(".pct").forEach(function(e){e.textContent=pc+"%"});
  qa(".fill").forEach(function(e){e.style.width=pc+"%"});
  qa("[data-ck]").forEach(function(e){var a=e.dataset.ck.split(":");e.classList.toggle("on",isDone(a[0],a[1]))});
  if(st.full&&!S.complete){S.complete=1;S.doneDate=new Date().toISOString()}
  if(!st.full)S.complete=0;
  fresh.forEach(function(t){toast("أحسنت! أكملت "+t+" 🎉")});
  var nb=[];
  (D.badges||[]).forEach(function(b){if(RULES[b.id]&&RULES[b.id](st)&&!S.b[b.id]){S.b[b.id]=new Date().toISOString();nb.push(b)}});
  if(first&&nb.length>2)toast("حصلت على "+ar(nb.length)+" شارات! شاهدها في صفحة إنجازاتي 🏅");
  else nb.forEach(function(b){toast("شارة جديدة: "+b.icon+" «"+b.title+"». "+b.msg)});
  persist();
  renderAch(st);
  renderNext();
  first=false;
}
/* الخطوة التالية في الصفحة الرئيسية */
function renderNext(){
  var ns=q("#next-step");if(!ns)return;
  var t=null;
  D.lessons.some(function(l){if(!isDone("l",l.slug)){t=["الدرس التالي لك",l.title,"learn/"+l.slug+".html"];return true}});
  if(!t)D.labs.some(function(l){if(!isDone("x",l.slug)){t=["المعمل التالي لك",l.title,"labs/"+l.slug+".html"];return true}});
  if(!t&&!isDone("e"))t=["الخطوة الأخيرة","الاختبار النهائي","exam/index.html"];
  if(!t)t=["أحسنت! أكملت المسار","شهادتك جاهزة","achievements/index.html"];
  ns.innerHTML='<div class="box ex"><h3>'+t[0]+'</h3><p><a href="'+BASE+t[2]+'">'+t[1]+" ←</a></p></div>";
}
function save(){persist();refresh()}

/* صفحة الإنجازات: الشارات ونتيجة الاختبار والشهادة */
function renderAch(st){
  var bd=q("#badges");
  if(bd){
    bd.innerHTML=D.badges.map(function(b){return'<div class="bd'+(S.b[b.id]?"":" off")+'"><i>'+b.icon+"</i><b>"+b.title+"</b><small>"+b.desc+"</small></div>"}).join("");
    q("#bcount").textContent="("+ar(D.badges.filter(function(b){return S.b[b.id]}).length)+" من "+ar(D.badges.length)+")";
  }
  var es=q("#exam-sum");
  if(es)es.innerHTML=S.ex.best!=null?"أفضل نتيجة لك: <strong>"+ar(S.ex.best)+"٪</strong>، المستوى: <strong>"+level(S.ex.best)+"</strong>. "+(isDone("e")?"اجتزت الاختبار.":"تحتاج "+ar(PASS)+"٪ للاجتياز.")+' <a href="'+BASE+'exam/index.html">أعد الاختبار</a>':'لم تخض الاختبار بعد. <a href="'+BASE+'exam/index.html">ابدأ الاختبار النهائي</a>';
  if(cstate!==st.full){cstate=st.full;renderCert(st)}
}
function renderCert(st){
  var a=q("#cert-area");if(!a)return;
  if(!st.full){
    var r=[];
    D.lessons.forEach(function(l){if(!isDone("l",l.slug))r.push('<li><a href="'+BASE+"learn/"+l.slug+'.html">الدرس: '+l.title+"</a></li>")});
    D.labs.forEach(function(l){if(!isDone("x",l.slug))r.push('<li><a href="'+BASE+"labs/"+l.slug+'.html">المعمل: '+l.title+"</a></li>")});
    if(!isDone("e"))r.push('<li><a href="'+BASE+'exam/index.html">الاختبار النهائي (٧٠٪ للاجتياز)</a></li>');
    a.innerHTML='<div class="box bad"><h3>الشهادة مقفلة</h3><p>تُفتح عند وصولك إلى ١٠٠٪. المتبقي:</p><ul>'+r.join("")+"</ul></div>";
    return;
  }
  var dt=new Date(S.doneDate||Date.now()).toLocaleDateString("ar",{year:"numeric",month:"long",day:"numeric"});
  a.innerHTML='<label for="cname">اكتب اسمك كما تريده أن يظهر في الشهادة</label><input class="gs" id="cname" maxlength="40" autocomplete="name" placeholder="الاسم الكامل">'+
    '<div class="cert" id="cert"><div class="cb"><i></i>ثغرة</div><h2>شهادة إكمال</h2><p>تشهد أكاديمية «ثغرة» بأن</p><div class="cn" id="cn"></div>'+
    "<p>قد أتمّ بنجاح مسار أمن الذكاء الاصطناعي، ويشمل "+ar(D.lessons.length)+" دروس و"+ar(D.labs.length)+" معامل عملية، واجتاز الاختبار النهائي.</p><p>بتاريخ "+dt+"</p>"+
    "<small>شهادة إكمال تعليمية صادرة من موقع ثغرة، وليست شهادة معتمدة من جهة رسمية.</small></div>"+
    '<div class="btns noprint"><button class="btn p" id="print" type="button">طباعة / حفظ PDF</button></div><p class="noprint cap" id="pmsg"></p>';
  var inp=q("#cname"),cn=q("#cn");inp.value=S.name||"";cn.textContent=inp.value||"اسمك هنا";
  inp.oninput=function(){S.name=inp.value.trim();cn.textContent=S.name||"اسمك هنا";persist()};
  q("#print").onclick=function(){
    if(!S.name){q("#pmsg").textContent="اكتب اسمك أولاً.";inp.focus();return}
    q("#pmsg").textContent="";window.print();
  };
}

window.TH={S:S,q:q,ar:ar,BASE:BASE,PASS:PASS,level:level,toast:toast,save:save,isDone:isDone,done:function(k,s){S[k][s]=1;save()}};

/* القائمة العلوية والتذييل */
var NAV=[["index.html","الرئيسية","home"],["learn/index.html","الدروس","learn"],["labs/index.html","المعامل","labs"],["exam/index.html","الاختبار","exam"],["glossary/index.html","القاموس","glossary"],["achievements/index.html","إنجازاتي","achievements"],["about/index.html","عن الموقع","about"]];
q("#site-header").innerHTML='<div class="wrap bar"><a class="brand" href="'+BASE+'index.html"><i></i>ثغرة</a><nav aria-label="التنقل الرئيسي">'+
  NAV.map(function(n){return'<a href="'+BASE+n[0]+'"'+(B.dataset.nav===n[2]?' aria-current="page"':"")+">"+n[1]+"</a>"}).join("")+'</nav><a class="theme" href="'+BASE+'search/index.html" aria-label="بحث" title="بحث">🔍</a><button class="theme" id="theme" type="button" aria-label="تبديل الوضع الداكن" title="الوضع الداكن / الفاتح">🌓</button></div>';
var root=document.documentElement;
function isDark(){var t=root.getAttribute("data-theme");return t?t==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches}
q("#theme").onclick=function(){var n=isDark()?"light":"dark";root.setAttribute("data-theme",n);try{localStorage.setItem("thagra-theme",n)}catch(e){}};
q("#site-footer").innerHTML='<div class="wrap"><p>ثغرة — محتوى تعليمي للتوعية الأمنية. استخدم المعرفة بمسؤولية.</p></div>';
var cur=q("nav a[aria-current]");if(cur&&cur.scrollIntoView)cur.scrollIntoView({inline:"center",block:"nearest"});

/* قوائم الدروس والمعامل */
function row(href,n,t,en,lv,ck){return'<a class="lrow" href="'+href+'"><strong>'+ar(n)+". "+t+' <span class="en">'+en+'</span></strong><span class="lv">'+lv+'</span><span class="ck" data-ck="'+ck+'"></span></a>'}
function grp(arr,mk){var o="",last="";arr.forEach(function(l,i){if(l.level!==last){last=l.level;o+='<h2 class="lvh">'+last+"</h2>"}o+=mk(l,i)});return o}
var ll=q("#lesson-list");if(ll)ll.innerHTML=grp(D.lessons,function(l,i){return row(BASE+"learn/"+l.slug+".html",i+1,l.title,l.en,l.note||"","l:"+l.slug)});
var bl=q("#lab-list");if(bl)bl.innerHTML=grp(D.labs,function(l,i){return row(BASE+"labs/"+l.slug+".html",i+1,l.title,l.en,l.note||"","x:"+l.slug)});

/* صفحة الدرس: مسار التنقل والاختبار والسابق/التالي */
var ls=B.dataset.lesson;
if(ls){
  var i=D.lessons.findIndex(function(x){return x.slug===ls}),Ls=D.lessons[i];
  q("#crumb").innerHTML='<a href="'+BASE+'learn/index.html">الدروس</a> / الدرس '+ar(i+1);
  var pv=D.lessons[i-1],nx=D.lessons[i+1];
  q("#pn").innerHTML=(pv?'<a href="'+BASE+"learn/"+pv.slug+'.html">→ الدرس السابق</a>':"<span></span>")+
    (nx?'<a href="'+BASE+"learn/"+nx.slug+'.html">الدرس التالي ←</a>':'<a href="'+BASE+'labs/index.html">انتقل إلى المعامل ←</a>');
  var box=q("#quiz"),d=Ls.quiz;
  if(d){
    box.innerHTML="<strong>اختبر نفسك</strong><p style='margin:.4rem 0 0'>"+d.q+"</p>";
    d.o.forEach(function(t,k){
      var b=document.createElement("button");b.type="button";b.textContent=t;
      b.onclick=function(){
        var fb=q(".fb",box);if(!fb){fb=document.createElement("p");box.appendChild(fb)}
        if(k===d.a){S.l[ls]=1;save();fb.className="fb ok";fb.textContent="صحيح. "+d.e;box.querySelectorAll("button").forEach(function(x){x.disabled=true})}
        else{fb.className="fb no";fb.textContent="ليست الإجابة الصحيحة، حاول مرة أخرى."}
      };box.appendChild(b);
    });
    if(S.l[ls]){var f=document.createElement("p");f.className="fb ok";f.textContent="أنجزت هذا الدرس. "+d.e;box.appendChild(f)}
  }else box.hidden=true;
}

/* نسخة احتياطية: تصدير واستيراد التقدّم */
var exb=q("#export");
if(exb){
  exb.onclick=function(){
    var a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(S)],{type:"application/json"}));
    a.download="thagra-progress.json";document.body.appendChild(a);a.click();a.remove();
  };
  var imf=q("#import-file");
  q("#import-btn").onclick=function(){imf.click()};
  imf.onchange=function(){
    var f=imf.files[0];if(!f)return;var r=new FileReader();
    r.onload=function(){
      try{
        var o=JSON.parse(r.result);if(!o||typeof o.l!=="object"||typeof o.x!=="object")throw 0;
        Object.keys(o.l).forEach(function(k){if(o.l[k])S.l[k]=1});
        Object.keys(o.x).forEach(function(k){if(o.x[k])S.x[k]=1});
        (o.lv||[]).slice(0,3).forEach(function(v,i){if(v)S.lv[i]=1});
        Object.keys(o.b||{}).forEach(function(k){S.b[k]=S.b[k]||o.b[k]});
        if(o.ex&&o.ex.best>(S.ex.best||0))S.ex=o.ex;
        if(o.name&&!S.name)S.name=String(o.name).slice(0,40);
        persist();location.reload();
      }catch(e){q("#imsg").textContent="الملف غير صالح. اختر ملفاً صدّرته من هذا الموقع."}
    };r.readAsText(f);
  };
}

/* زر مسح التقدّم */
var rs=q("#reset");
if(rs)rs.onclick=function(){S.l={};S.x={};S.lv=[0,0,0];S.b={};S.ex={};S.complete=0;persist();location.reload()};
refresh();
})();
