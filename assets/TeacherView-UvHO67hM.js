import{S as m}from"./SideBarComponent--2COM9Zm.js";import{S as p}from"./SurveysListComponent-1ziIofYG.js";import{_ as u}from"./_plugin-vue_export-helper-DlAUqK2U.js";import{c as o,a as r,b as n,h as y,r as a,o as c}from"./index-dWdgYF6i.js";const d={data(){return{surveys:[]}},components:{SurveysListComponent:p,SideBarComponent:m},methods:{async fetchAllSurveys(){const e=await fetch("http://localhost:3000/teacher/surveys",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});this.surveys=await e.json(),console.log(this.surveys)}},beforeMount(){this.fetchAllSurveys()}},h={class:"flex"},v={class:"flex flex-col gap-y-4"},f={key:0,class:"text-gray-500 text-sm"};function _(e,s,S,x,t,C){const i=a("SideBarComponent"),l=a("SurveysListComponent");return c(),o("div",h,[r(i),n("div",v,[s[0]||(s[0]=n("h1",{class:"text-2xl font-semibold text-gray-900"},"Surveys",-1)),t.surveys.length===0?(c(),o("div",f," No surveys yet ")):y("",!0),r(l,{surveys:t.surveys},null,8,["surveys"])])])}const V=u(d,[["render",_]]);export{V as default};
