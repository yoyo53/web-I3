import{_ as c,o as r,c as o,a as e,t,F as m,h as p,r as y,f as x}from"./index-Be8YnV4o.js";const v={props:{survey:{type:Object,required:!0}}},f={class:"flex min-w-0 gap-x-4"},g={class:"min-w-0 flex-auto"},h={class:"text-sm/6 font-semibold text-gray-900"},b={class:"mt-1 truncate text-xs/5 text-gray-500"},S={class:"hidden shrink-0 sm:flex sm:flex-col sm:items-end"},$={class:"mt-1 text-xs/5 text-gray-500"};function k(i,n,s,u,d,l){return r(),o("div",f,[e("div",g,[e("p",h,t(s.survey.firstname)+" "+t(s.survey.lastname),1),e("p",b," Subject: "+t(s.survey.subject),1)]),e("div",S,[n[0]||(n[0]=e("p",{class:"text-sm/6 text-gray-900"},"Group",-1)),e("p",$,t(s.survey.group),1)])])}const C=c(v,[["render",k]]),j={components:{SurveyComponent:C},props:{surveys:{type:Array,required:!0}}},w={class:"stack-list"},B={class:"flex flex-col gap-4"};function q(i,n,s,u,d,l){const _=y("SurveyComponent");return r(),o("div",w,[e("ul",B,[(r(!0),o(m,null,p(s.surveys,a=>(r(),o("li",{key:a.id,class:"border border-gray-300 rounded-lg p-4 bg-gray-50 transition-transform duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-pointer"},[x(_,{survey:a},null,8,["survey"])]))),128))])])}const L=c(j,[["render",q]]);export{L as S};