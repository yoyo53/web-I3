import{S as c}from"./SurveysListComponent-BEqLKKxK.js";import{_ as l,c as o,a as r,i,b as u,r as y,o as n}from"./index-NFo_HsSF.js";const p={data(){return{surveys:[]}},components:{SurveysListComponent:c},methods:{async fetchAllSurveys(){const e=await fetch("https://web-i3-back.fly.dev/teacher/surveys",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});this.surveys=await e.json(),console.log(this.surveys)}},beforeMount(){this.fetchAllSurveys()}},v={class:"flex flex-col gap-y-4"},m={key:0,class:"text-gray-500 text-sm"};function d(e,s,h,f,t,_){const a=y("SurveysListComponent");return n(),o("div",null,[r("div",v,[s[0]||(s[0]=r("h1",{class:"text-2xl font-semibold text-gray-900"},"Surveys",-1)),t.surveys.length===0?(n(),o("div",m," No surveys yet ")):i("",!0),u(a,{surveys:t.surveys},null,8,["surveys"])])])}const g=l(p,[["render",d]]);export{g as default};