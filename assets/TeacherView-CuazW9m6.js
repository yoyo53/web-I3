import{_ as a,c as o,a as c,e as l,f as u,r as i,o as r}from"./index-Be8YnV4o.js";import{S as y}from"./SurveysListComponent-DSELm9a_.js";const p={data(){return{surveys:[]}},components:{SurveysListComponent:y},methods:{async fetchAllSurveys(){const e=await fetch("http://localhost:3000/teacher/surveys",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});this.surveys=await e.json(),console.log(this.surveys)}},beforeMount(){this.fetchAllSurveys()}},m={class:"flex flex-col gap-y-4"},v={key:0,class:"text-gray-500 text-sm"};function h(e,s,f,d,t,_){const n=i("SurveysListComponent");return r(),o("div",m,[s[0]||(s[0]=c("h1",{class:"text-2xl font-semibold text-gray-900"},"Surveys",-1)),t.surveys.length===0?(r(),o("div",v," No surveys yet ")):l("",!0),u(n,{surveys:t.surveys},null,8,["surveys"])])}const g=a(p,[["render",h]]);export{g as default};