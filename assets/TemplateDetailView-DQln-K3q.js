import{R as f,C as y}from"./CheckBox-Cd0b_5b_.js";import{_ as h,c as a,a as e,t as d,F as k,j as _,o as n,h as p,v as g,k as w,l as m,i as c,r as u}from"./index-BmuAiTre.js";const v={components:{RadioButton:f,CheckBox:y},name:"DetailedSurveysComponent",props:{id:{type:String,required:!0}},data(){return{template:null}},async mounted(){try{const o=await fetch(`https://web-i3-back.fly.dev/admin/templates/${this.id}`);if(!o.ok)throw new Error("Network response was not ok");this.template=await o.json(),console.log(this.template)}catch(o){console.error("There was a problem with the fetch operation:",o)}}},B={key:0,class:"mb-6"},C={key:1,class:"mb-6"},U={class:"text-2xl font-semibold text-[primary] mb-4 p-6 w-full max-w-3xl"},R={class:"block text-sm font-medium text-gray-700 mb-2"},V=["onUpdate:modelValue"],O=["onUpdate:modelValue"];function S(o,s,T,D,l,E){const b=u("RadioButton"),x=u("CheckBox");return l.template?(n(),a("div",C,[e("h1",U,d(l.template.name),1),(n(!0),a(k,null,_(l.template.questions,(t,i)=>(n(),a("div",{key:i,class:"mb-4 p-4 border-2 border-dashed border-transparent-hover rounded-lg"},[e("label",R,"Question "+d(i+1),1),p(e("input",{type:"text","onUpdate:modelValue":r=>t.question_text=r,disabled:"",class:"block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2 font-semibold"},null,8,V),[[g,t.question_text]]),s[2]||(s[2]=e("label",{class:"block text-sm font-medium text-gray-700 mb-2"},"Response Type",-1)),p(e("select",{"onUpdate:modelValue":r=>t.question_type=r,disabled:"",class:"block w-full px-4 py-2 border rounded-md shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-gray-100"},s[1]||(s[1]=[e("option",{value:"text"},"Text Input",-1),e("option",{value:"score"},"Star Rating (1-5)",-1),e("option",{value:"radio"},"Radio Buttons",-1),e("option",{value:"checkbox"},"Checkbox",-1)]),8,O),[[w,t.question_type]]),t.question_type==="radio"?(n(),m(b,{key:0,question:t,onUpdateOptions:o.updateOptions,isEditable:!1},null,8,["question","onUpdateOptions"])):c("",!0),t.question_type==="checkbox"?(n(),m(x,{key:1,question:t,onUpdateOptions:o.updateOptions,isEditable:!1},null,8,["question","onUpdateOptions"])):c("",!0)]))),128))])):(n(),a("div",B,s[0]||(s[0]=[e("p",{class:"text-2xl font-semibold text-[primary] mb-4 p-6 w-full max-w-3xl"},"Loading template details...",-1)])))}const $=h(v,[["render",S]]);export{$ as default};
