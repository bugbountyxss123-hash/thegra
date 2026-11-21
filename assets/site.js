/* الهيكل المشترك: القائمة العلوية، التقدّم، الاختبارات، قوائم الدروس والمعامل */
(function(){
var BASE=document.currentScript.src.replace(/assets\/site\.js.*$/,""),D=window.SITE,B=document.body,KEY="thagra-v3";
function q(s,r){return(r||document).querySelector(s)}
function qa(s){return document.querySelectorAll(s)}
function ar(n){return String(n).replace(/\d/g,function(d){return"٠١٢٣٤٥٦٧٨٩"[d]})}

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
S.l=S.l||{};S.x=S.x||{};S.lv=S.lv||[0,0,0];
function persist(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}}
function isDone(k,s){return k==="x"&&s==="prompt-injection"?S.lv.every(Boolean):!!S[k][s]}
function refresh(){
  var n=0,t=D.lessons.length+D.labs.length;
  D.lessons.forEach(function(l){if(isDone("l",l.slug))n++});
  D.labs.forEach(function(l){if(isDone("x",l.slug))n++});
  var p=Math.round(n/t*100)+"%";
  qa(".pct").forEach(function(e){e.textContent=p});
  qa(".fill").forEach(function(e){e.style.width=p});
  qa("[data-ck]").forEach(function(e){var a=e.dataset.ck.split(":");e.classList.toggle("on",isDone(a[0],a[1]))});
}
function save(){persist();refresh()}
window.TH={S:S,q:q,save:save,isDone:isDone,done:function(k,s){S[k][s]=1;save()}};

/* القائمة العلوية والتذييل */
var NAV=[["index.html","الرئيسية","home"],["learn/index.html","الدروس","learn"],["labs/index.html","المعامل","labs"],["certificate.html","الشهادة","cert"],["about/index.html","عن الموقع","about"]];
q("#site-header").innerHTML='<div class="wrap bar"><a class="brand" href="'+BASE+'index.html"><i></i>ثغرة</a><nav aria-label="التنقل الرئيسي">'+
  NAV.map(function(n){return'<a href="'+BASE+n[0]+'"'+(B.dataset.nav===n[2]?' aria-current="page"':"")+">"+n[1]+"</a>"}).join("")+"</nav></div>";
q("#site-footer").innerHTML='<div class="wrap"><p>ثغرة — محتوى تعليمي للتوعية الأمنية. استخدم المعرفة بمسؤولية.</p></div>';
var cur=q("nav a[aria-current]");if(cur&&cur.scrollIntoView)cur.scrollIntoView({inline:"center",block:"nearest"});

/* قوائم الدروس والمعامل */
function row(href,n,t,en,lv,ck){return'<a class="lrow" href="'+href+'"><strong>'+ar(n)+". "+t+' <span class="en">'+en+'</span></strong><span class="lv">'+lv+'</span><span class="ck" data-ck="'+ck+'"></span></a>'}
var ll=q("#lesson-list");if(ll)ll.innerHTML=D.lessons.map(function(l,i){return row(BASE+"learn/"+l.slug+".html",i+1,l.title,l.en,l.level,"l:"+l.slug)}).join("");
var bl=q("#lab-list");if(bl)bl.innerHTML=D.labs.map(function(l,i){return row(BASE+"labs/"+l.slug+".html",i+1,l.title,l.en,l.level,"x:"+l.slug)}).join("");

/* صفحة الدرس: مسار التنقل والاختبار والسابق/التالي */
var ls=B.dataset.lesson;
if(ls){
  var i=D.lessons.findIndex(function(x){return x.slug===ls}),L=D.lessons[i];
  q("#crumb").innerHTML='<a href="'+BASE+'learn/index.html">الدروس</a> / الدرس '+ar(i+1);
  var pv=D.lessons[i-1],nx=D.lessons[i+1];
  q("#pn").innerHTML=(pv?'<a href="'+BASE+"learn/"+pv.slug+'.html">→ الدرس السابق</a>':"<span></span>")+
    (nx?'<a href="'+BASE+"learn/"+nx.slug+'.html">الدرس التالي ←</a>':'<a href="'+BASE+'labs/index.html">انتقل إلى المعامل ←</a>');
  var box=q("#quiz"),d=L.quiz;
  function certLink(){
    var allDone = D.lessons.every(function(l){return isDone("l",l.slug)}) && D.labs.every(function(x){return isDone("x",x.slug)});
    return allDone
      ?' <br><a href="'+BASE+'certificate.html" style="display:inline-block;margin-top:.5rem;font-weight:bold;text-decoration:underline;">🎉 أتممت المسار بالكامل (100%)! اضغط هنا لإصدار شهادتك ←</a>'
      :"";
  }
  if(d){
    box.innerHTML="<strong>اختبر نفسك</strong><p style='margin:.4rem 0 0'>"+d.q+"</p>";
    d.o.forEach(function(t,k){
      var b=document.createElement("button");b.type="button";b.textContent=t;
      b.onclick=function(){
        var fb=q(".fb",box);if(!fb){fb=document.createElement("p");box.appendChild(fb)}
        if(k===d.a){
          S.l[ls]=1;save();
          fb.className="fb ok";
          fb.innerHTML="صحيح. "+d.e+certLink();
          box.querySelectorAll("button").forEach(function(x){x.disabled=true});
        }else{fb.className="fb no";fb.textContent="ليست الإجابة الصحيحة، حاول مرة أخرى."}
      };box.appendChild(b);
    });
    if(S.l[ls]){var f=document.createElement("p");f.className="fb ok";f.innerHTML="أنجزت هذا الدرس. "+d.e+certLink();box.appendChild(f)}
  }else box.hidden=true;
}

/* زر مسح التقدّم */
var rs=q("#reset");
if(rs)rs.onclick=function(){S.l={};S.x={};S.lv=[0,0,0];persist();location.reload()};
persist();refresh();
})();