/* البحث في الموقع: عناوين وأوصاف الدروس والمعامل والمصطلحات، ونصوص الدروس عند النشر على الإنترنت */
(function(){
var TH=window.TH,q=TH.q,D=window.SITE,G=window.GLOSSARY||[],docs=[];
function norm(s){return(s||"").toLowerCase().replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي")}
function esc(s){return s.replace(/[&<>]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;"}[c]})}
D.lessons.forEach(function(l){docs.push({t:l.title,en:l.en,k:"درس",u:"learn/"+l.slug+".html",x:l.desc,b:""})});
D.labs.forEach(function(l){docs.push({t:l.title,en:l.en,k:"معمل",u:"labs/"+l.slug+".html",x:l.desc,b:""})});
G.forEach(function(g){docs.push({t:g[1],en:g[0],k:"مصطلح",u:g[3]||"glossary/index.html",x:g[2],b:""})});
var inp=q("#sq"),out=q("#sr"),cnt=q("#scount");
function score(d,k){var s=0;if(norm(d.t).indexOf(k)>=0)s+=5;if(norm(d.en).indexOf(k)>=0)s+=5;if(norm(d.x).indexOf(k)>=0)s+=2;if(d.b&&norm(d.b).indexOf(k)>=0)s+=1;return s}
function snip(d,raw){
  var b=d.b||"",i=b.toLowerCase().indexOf(raw.toLowerCase());
  if(i>=0&&d.x.toLowerCase().indexOf(raw.toLowerCase())<0)return"…"+b.slice(Math.max(0,i-40),i+100)+"…";
  return d.x;
}
function run(){
  var raw=inp.value.trim(),k=norm(raw);
  if(!k){out.innerHTML="";cnt.textContent="";return}
  var r=docs.map(function(d){return{d:d,s:score(d,k)}}).filter(function(x){return x.s>0}).sort(function(a,b){return b.s-a.s});
  cnt.textContent=r.length?TH.ar(r.length)+" نتيجة":"لا توجد نتائج مطابقة.";
  out.innerHTML=r.map(function(x){var d=x.d;return'<div class="term-row"><h3><a href="'+TH.BASE+d.u+'">'+d.t+'</a><span class="en">'+d.en+'</span><small class="tag2">'+d.k+"</small></h3><p>"+esc(snip(d,raw))+"</p></div>"}).join("");
}
inp.addEventListener("input",run);
var p=new URLSearchParams(location.search).get("q");if(p)inp.value=p;
if(location.protocol!=="file:")D.lessons.forEach(function(l,i){
  try{fetch(TH.BASE+"learn/"+l.slug+".html").then(function(r){return r.text()}).then(function(h){
    var m=new DOMParser().parseFromString(h,"text/html").querySelector("main section");
    if(m){docs[i].b=m.textContent.replace(/\s+/g," ").trim();run()}
  }).catch(function(){})}catch(e){}
});
run();inp.focus();
})();
