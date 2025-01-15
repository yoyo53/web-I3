import{P as y}from"./PopupComponent-zNFI4l28.js";import{u as h,_,o as s,c as l,a as o,F as g,f as b,b as c,w,h as v,t as d,r as i,k,d as C}from"./index-B6xo_3DZ.js";const f=h(),L={name:"TemplatesListComponent",props:{templates:{type:Array,required:!0}},data(){return{showPopup:!1,selectedTemplate:null}},components:{PopupComponent:y},methods:{async deleteTemplate(t){try{const e=await fetch("https://web-i3-back.fly.dev/admin/template/"+t,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!e.ok)throw new Error(e.statusText);this.$emit("removeTemplate"),f.success("Template deleted successfully")}catch(e){console.error(e),f.error("Something went wrong")}},openModal(t){this.selectedTemplate=t,this.showPopup=!0},closeModal(){this.showPopup=!1}}},$={class:"space-y-4"},A=["onClick"],M={class:"flex min-w-0 gap-x-4"},P={class:"min-w-0 flex-auto"},E={class:"text-sm/6 font-semibold"};function R(t,e,u,T,n,a){const m=i("RouterLink"),p=i("PopupComponent");return s(),l("div",null,[o("ul",$,[(s(!0),l(g,null,b(u.templates,(r,x)=>(s(),l("li",{key:x},[c(m,{to:{name:"adminTemplateView",params:{id:r.survey_templateID}},class:"p-4 block border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer transition-transform duration-200 ease-in-out hover:bg-neutral-100 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"},{default:w(()=>[o("button",{type:"button",onClick:v(N=>a.openModal(r),["prevent"]),class:"text-red-400 hover:text-red-500 font-semibold rounded-lg focus:outline-none focus:ring-offset-4 focus:ring-2 focus:ring-red-700"}," Remove ",8,A),o("div",M,[o("div",P,[o("p",E,d(r.survey_templateID)+" "+d(r.name),1)])])]),_:2},1032,["to"])]))),128))]),c(p,{isOpen:n.showPopup,popUpText:"Are you sure you want to delete this template ? This will also delete all associated surveys and answers",onCloseModal:a.closeModal,onConfirmAction:e[0]||(e[0]=r=>a.deleteTemplate(n.selectedTemplate.survey_templateID))},null,8,["isOpen","onCloseModal"])])}const B=_(L,[["render",R]]),S=h(),V={name:"TemplatesListView",inject:["userState"],data(){return{templates:[]}},components:{TemplateListComponent:B},methods:{async fetchAllTemplates(){try{const t=await fetch("https://web-i3-back.fly.dev/admin/templates",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!t.ok)throw new Error(t.statusText);this.templates=await t.json()}catch(t){console.error(t),S.error("Something went wrong")}}},beforeMount(){this.fetchAllTemplates()}},D={class:"my-12"},I={key:0,class:"text-gray-500 text-sm text-center"};function j(t,e,u,T,n,a){const m=i("RouterLink"),p=i("TemplateListComponent");return s(),l("div",null,[o("section",D,[e[1]||(e[1]=o("h1",{class:"my-6 text-3xl font-semibold text-center"},"Templates",-1)),c(m,{to:{name:"adminTemplateCreate"},class:"block w-full max-w-7xl mx-auto rounded-md text-center my-4 px-4 py-2 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"},{default:w(()=>e[0]||(e[0]=[C(" Create a Template ")])),_:1}),n.templates.length===0?(s(),l("div",I,"No templates yet")):(s(),k(p,{key:1,class:"max-w-7xl mx-auto",templates:n.templates,onRemoveTemplate:a.fetchAllTemplates},null,8,["templates","onRemoveTemplate"]))])])}const O=_(V,[["render",j]]);export{O as default};
