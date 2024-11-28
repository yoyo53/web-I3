import{_ as u,o,c as r,a as e,t as c,r as _,F as p,e as v,f as m,g as f}from"./index-COpQ1_gN.js";const x={props:{survey:{type:Object,required:!0}}},h={class:"flex min-w-0 gap-x-4"},g={class:"min-w-0 flex-auto"},$={class:"text-sm/6 font-semibold text-gray-900"},S={class:"mt-1 truncate text-xs/5 text-gray-500"},b={class:"hidden shrink-0 sm:flex sm:flex-col sm:items-end"},C={class:"mt-1 text-xs/5 text-gray-500"};function k(n,t,s,l,a,d){return o(),r("div",h,[e("div",g,[e("p",$,c(s.survey.firstname)+" "+c(s.survey.lastname),1),e("p",S," Subject: "+c(s.survey.subject),1)]),e("div",b,[t[0]||(t[0]=e("p",{class:"text-sm/6 text-gray-900"},"Group",-1)),e("p",C,c(s.survey.group),1)])])}const w=u(x,[["render",k]]),j={components:{SurveyComponent:w},props:{surveys:{type:Array,required:!0}}},A={class:"stack-list"},L={class:"flex flex-col gap-4"};function N(n,t,s,l,a,d){const i=_("SurveyComponent");return o(),r("div",A,[e("ul",L,[(o(!0),r(p,null,v(s.surveys,y=>(o(),r("li",{key:y.id,class:"border border-gray-300 rounded-lg p-4 bg-gray-50 transition-transform duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-pointer"},[m(i,{survey:y},null,8,["survey"])]))),128))])])}const V=u(j,[["render",N]]),B={data(){return{surveys:[]}},components:{SurveysListComponent:V},methods:{async fetchAllSurveys(){const n=await fetch("http://localhost:3000/admin");this.surveys=await n.json()}},beforeMount(){this.fetchAllSurveys()}},q={class:"flex flex-col gap-y-4"},F={key:0,class:"text-gray-500 text-sm"};function D(n,t,s,l,a,d){const i=_("SurveysListComponent");return o(),r("div",q,[t[0]||(t[0]=e("h1",{class:"text-2xl font-semibold text-gray-900"},"Surveys",-1)),a.surveys.length===0?(o(),r("div",F," No surveys yet ")):f("",!0),m(i,{surveys:a.surveys},null,8,["surveys"])])}const G=u(B,[["render",D]]);export{G as default};
