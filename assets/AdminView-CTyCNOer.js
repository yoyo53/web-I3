import{S as c}from"./SurveysListComponent-CiEi-M7h.js";import{_ as i,c as o,a as n,i as l,b as u,r as y,o as r}from"./index-u4_1w3lG.js";const m={data(){return{surveys:[]}},components:{SurveysListComponent:c},methods:{async fetchAllSurveys(){const e=await fetch("https://web-i3-back.fly.dev/admin/surveys",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});this.surveys=await e.json(),console.log(this.surveys)}},beforeMount(){this.fetchAllSurveys()}},p={class:"flex flex-col gap-y-4"},v={key:0,class:"text-gray-500 text-sm"};function d(e,s,f,h,t,_){const a=y("SurveysListComponent");return r(),o("div",null,[n("div",p,[s[0]||(s[0]=n("h1",{class:"text-2xl font-semibold text-gray-900"},"Surveys",-1)),t.surveys.length===0?(r(),o("div",v," No surveys yet ")):l("",!0),u(a,{surveys:t.surveys},null,8,["surveys"])])])}const g=i(m,[["render",d]]);export{g as default};
