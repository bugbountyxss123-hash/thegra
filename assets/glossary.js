/* قاموس المصطلحات. لإضافة مصطلح أضف سطراً: ["English","العربي","التعريف","مسار صفحة ذات صلة (اختياري)"] */
(function(){
var TH=window.TH,q=TH.q,G=[
[
"Prompt Injection",
"حقن التعليمات",
"نص يخدع النموذج فيتجاهل تعليماته الأصلية وينفّذ أمراً آخر.",
"learn/prompt-injection.html"
],
[
"Indirect Prompt Injection",
"الحقن غير المباشر",
"أمر مخبّأ في محتوى خارجي (صفحة، ملف، بريد) يقرؤه النموذج فينفّذه دون علم المستخدم.",
"labs/indirect-injection.html"
],
[
"Jailbreak",
"كسر القيود",
"محاولة إقناع النموذج بتجاوز قواعد السلامة التي دُرّب عليها.",
"learn/jailbreak.html"
],
[
"System Prompt",
"تعليمات النظام",
"تعليمات يكتبها المطوّر ويقرؤها النموذج قبل كلام المستخدم لتحدد سلوكه.",
"learn/data-leakage.html"
],
[
"Data Leakage",
"تسريب البيانات",
"كشف النموذج معلومات لا يجوز كشفها، كتعليمات النظام أو بيانات المستخدمين أو بيانات التدريب.",
"learn/data-leakage.html"
],
[
"LLM (Large Language Model)",
"النموذج اللغوي الكبير",
"نموذج ذكاء اصطناعي مدرَّب على نصوص ضخمة ليفهم اللغة ويولّدها.",
""
],
[
"Training Data",
"بيانات التدريب",
"البيانات التي يتعلّم منها النموذج أنماطه قبل أن يُستخدم.",
""
],
[
"Inference",
"الاستدلال",
"مرحلة استخدام النموذج المدرَّب للإجابة عن مدخلات جديدة.",
""
],
[
"Weights",
"الأوزان",
"الأرقام التي يتعلمها النموذج أثناء التدريب وتحدد سلوكه.",
"learn/model-extraction.html"
],
[
"Guardrails",
"حواجز الحماية",
"طبقات فحص تُوضع حول النموذج لتصفية المدخلات والمخرجات الخطرة.",
""
],
[
"AI Agent",
"الوكيل الذكي",
"نموذج مربوط بأدوات (بريد، ملفات، دفع) تمكّنه من تنفيذ إجراءات فعلية.",
"learn/excessive-agency.html"
],
[
"Excessive Agency",
"الصلاحيات الزائدة",
"إعطاء الوكيل صلاحيات أوسع مما تحتاجه مهمته، فيتحول أي خداع إلى ضرر.",
"learn/excessive-agency.html"
],
[
"Least Privilege",
"أقل صلاحية",
"مبدأ يعطي الوكيل أو المستخدم ما تحتاجه المهمة فقط وليس أكثر.",
"labs/agent-risks.html"
],
[
"Human-in-the-Loop",
"الإنسان في الحلقة",
"اشتراط موافقة بشرية قبل تنفيذ الإجراءات الحساسة.",
"labs/agent-risks.html"
],
[
"Data Poisoning",
"تسميم البيانات",
"حقن بيانات مضلِّلة في تدريب النموذج لتحريف سلوكه.",
"learn/data-poisoning.html"
],
[
"Backdoor",
"الباب الخلفي",
"سلوك خفي في نموذج مسمَّم لا يظهر إلا عند مُحفِّز معيّن.",
"learn/data-poisoning.html"
],
[
"Adversarial Example",
"المثال العدائي",
"مدخل عُدّل تعديلاً طفيفاً لا يلحظه الإنسان فيجعل النموذج يخطئ.",
"learn/adversarial-examples.html"
],
[
"Adversarial Training",
"التدريب العدائي",
"إضافة أمثلة عدائية أثناء التدريب لتقوية النموذج أمامها.",
"learn/adversarial-examples.html"
],
[
"Model Extraction",
"استخراج النموذج",
"استنساخ نموذج بإرسال استعلامات كثيرة وتدريب نموذج على إجاباته.",
"learn/model-extraction.html"
],
[
"Surrogate Model",
"النموذج البديل",
"نموذج يدرّبه المهاجم ليقلّد النموذج الهدف، ويجرّب عليه هجمات أخرى.",
"learn/model-extraction.html"
],
[
"Model Distillation",
"تقطير النموذج",
"تدريب نموذج صغير ليقلّد نموذجاً أكبر، وهو تقنية مشروعة حين يقوم بها المالك.",
"learn/model-extraction.html"
],
[
"Rate Limiting",
"تحديد المعدل",
"وضع حد أقصى لعدد الطلبات المسموحة لكل مستخدم في فترة محددة.",
"labs/model-extraction.html"
],
[
"Membership Inference",
"استنتاج العضوية",
"معرفة هل كان سجل معيّن ضمن بيانات تدريب النموذج.",
"labs/membership-inference.html"
],
[
"Overfitting",
"الإفراط في التعلّم",
"حفظ النموذج لبيانات التدريب بدل تعلّم القاعدة العامة، فيضعف أداؤه على بيانات جديدة.",
"labs/membership-inference.html"
],
[
"Confidence Score",
"درجة الثقة",
"رقم يعبّر عن مدى تأكد النموذج من إجابته.",
"labs/membership-inference.html"
],
[
"Differential Privacy",
"الخصوصية التفاضلية",
"تقنية تضيف ضوضاء محسوبة حتى لا يكشف النموذج وجود سجل فردي في تدريبه.",
"labs/membership-inference.html"
],
[
"Side-Channel Attack",
"هجوم القناة الجانبية",
"استنتاج معلومة سرية من سلوك النظام (زمن، حجم، استهلاك) لا من مخرجاته.",
"labs/side-channel.html"
],
[
"Cache",
"الذاكرة المؤقتة",
"تخزين نتائج سابقة لتسريع الطلبات المتكررة.",
"labs/side-channel.html"
],
[
"RAG (Retrieval-Augmented Generation)",
"التوليد المعزَّز بالاسترجاع",
"يسترجع النظام مستندات من قاعدة معرفة ثم يجيب النموذج بناءً عليها.",
"labs/rag-attacks.html"
],
[
"Knowledge Base",
"قاعدة المعرفة",
"مجموعة المستندات التي يبحث فيها نظام RAG.",
"labs/rag-attacks.html"
],
[
"Supply Chain Attack",
"هجوم سلسلة التوريد",
"اختراق مكوّن تعتمد عليه (نموذج، مكتبة، بيانات) بدل مهاجمتك مباشرة.",
"labs/supply-chain.html"
],
[
"Typosquatting",
"انتحال الأسماء المشابهة",
"نشر ملف باسم قريب من اسم مشهور بحرف مبدّل لخداع من يحمّله.",
"labs/supply-chain.html"
],
[
"Pickle",
"صيغة pickle",
"صيغة لحفظ الكائنات في بايثون، وقد تنفّذ شيفرة عند فتحها فلا تُفتح ملفات مجهولة منها.",
"labs/supply-chain.html"
],
[
"Safetensors",
"صيغة safetensors",
"صيغة لحفظ أوزان النماذج لا تنفّذ شيفرة عند التحميل.",
"labs/supply-chain.html"
],
[
"Hash (SHA-256)",
"التجزئة",
"بصمة رقمية للملف، وأي تعديل فيه يغيّرها فتكشف التلاعب.",
"labs/supply-chain.html"
],
[
"Red Teaming",
"الاختبار الهجومي",
"محاكاة هجمات على نظام بإذن أصحابه لاكتشاف ثغراته قبل المهاجمين.",
"about/index.html"
],
[
"Deepfake",
"التزييف العميق",
"صوت أو صورة أو فيديو مولَّد بالذكاء الاصطناعي ينتحل شخصاً حقيقياً.",
"learn/deepfake.html"
],
[
"Phishing",
"التصيّد",
"رسائل احتيالية تخدعك لتكشف بياناتك أو تحوّل مالاً.",
"learn/deepfake.html"
],
[
"OWASP",
"منظمة OWASP",
"منظمة مفتوحة تنشر قوائم المخاطر الأمنية، منها قائمة أبرز ١٠ مخاطر لتطبيقات النماذج اللغوية.",
"about/index.html"
],
[
"MITRE ATLAS",
"مصفوفة ATLAS",
"قاعدة معرفة بأساليب الهجوم على أنظمة الذكاء الاصطناعي.",
"about/index.html"
]
];
function norm(s){return(s||"").toLowerCase().replace(/[\u064B-\u0652\u0640]/g,"").replace(/[أإآ]/g,"ا").replace(/ى/g,"ي")}
window.GLOSSARY=G;G.sort(function(a,b){return a[0].localeCompare(b[0])});
var list=q("#gl"),inp=q("#gs"),cnt=q("#gcount");
function render(){
  var k=norm(inp.value.trim()),r=G.filter(function(g){return!k||norm(g.slice(0,3).join(" ")).indexOf(k)>=0});
  cnt.textContent=r.length?TH.ar(r.length)+" مصطلح":"لا توجد نتائج مطابقة.";
  list.innerHTML=r.map(function(g){return'<div class="term-row"><h3><span>'+g[1]+'</span><span class="en">'+g[0]+"</span></h3><p>"+g[2]+"</p>"+(g[3]?'<a href="'+TH.BASE+g[3]+'">اقرأ المزيد ←</a>':"")+"</div>"}).join("");
}
if(list&&inp){inp.addEventListener("input",render);render()}
})();
