import{_ as c}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{o as r,c as o,b as e,t as s,F as m,i as p,a as y,r as x}from"./index-dWdgYF6i.js";const v={props:{survey:{type:Object,required:!0}}},f={class:"flex min-w-0 gap-x-4"},g={class:"min-w-0 flex-auto"},h={class:"text-sm/6 font-semibold text-gray-900"},b={class:"mt-1 truncate text-xs/5 text-gray-500"},S={class:"hidden shrink-0 sm:flex sm:flex-col sm:items-end"},$={class:"mt-1 text-xs/5 text-gray-500"};function k(i,n,t,u,d,l){return r(),o("div",f,[e("div",g,[e("p",h,s(t.survey.firstname)+" "+s(t.survey.lastname),1),e("p",b," Subject: "+s(t.survey.subject),1)]),e("div",S,[n[0]||(n[0]=e("p",{class:"text-sm/6 text-gray-900"},"Group",-1)),e("p",$,s(t.survey.group),1)])])}const C=c(v,[["render",k]]),j={components:{SurveyComponent:C},props:{surveys:{type:Array,required:!0}}},w={class:"stack-list"},B={class:"flex flex-col gap-4"};function q(i,n,t,u,d,l){const _=x("SurveyComponent");return r(),o("div",w,[e("ul",B,[(r(!0),o(m,null,p(t.surveys,a=>(r(),o("li",{key:a.id,class:"border border-gray-300 rounded-lg p-4 bg-gray-50 transition-transform duration-200 ease-in-out hover:bg-gray-100 hover:-translate-y-1 hover:shadow-md cursor-pointer"},[y(_,{survey:a},null,8,["survey"])]))),128))])])}const N=c(j,[["render",q]]);export{N as S};
