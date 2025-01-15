import{_ as f,o as r,c as a,a as t,t as p,j as y,u as x,F as _,i as v,b as d,w,g as k,r as u,k as T,d as C}from"./index-DS8IDvsA.js";const M={name:"PopupComponent",props:{isOpen:{type:Boolean,required:!0},popUpText:{type:String,required:!0}},methods:{closeModal(){this.$emit("close-modal")},confirmAction(){this.$emit("confirm-action"),this.closeModal()}}},$={key:0,tabindex:"-1",class:"absolute top-0 left-0 z-50 flex justify-center items-center w-full h-full bg-neutral-900 bg-opacity-50"},A={class:"max-w-md relative bg-white rounded-lg"},L={class:"p-5 text-center"},B={class:"mb-5 text-lg font-normal"};function j(o,e,i,h,l,s){return i.isOpen?(r(),a("div",$,[t("div",A,[t("button",{onClick:e[0]||(e[0]=(...n)=>s.closeModal&&s.closeModal(...n)),type:"button",class:"absolute top-4 end-4 size-8 p-2 hover:bg-neutral-200 rounded-lg"},e[3]||(e[3]=[t("svg",{"aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 14 14"},[t("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"})],-1),t("span",{class:"sr-only"},"Close modal",-1)])),t("div",L,[e[4]||(e[4]=t("svg",{class:"mx-auto mb-4 text-red-500 size-12","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20"},[t("path",{stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"2",d:"M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})],-1)),t("h3",B,p(i.popUpText),1),t("button",{onClick:e[1]||(e[1]=(...n)=>s.confirmAction&&s.confirmAction(...n)),type:"button",class:"py-2.5 px-5 text-sm rounded-lg bg-red-500 text-white cursor-pointer font-semibold text-center hover:bg-red-700 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-red-700"}," Yes, I'm sure "),t("button",{onClick:e[2]||(e[2]=(...n)=>s.closeModal&&s.closeModal(...n)),type:"button",class:"py-2.5 px-5 ms-3 text-sm font-medium text-center rounded-lg border border-neutral-300 hover:bg-efrei-blue-50 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"}," No, cancel ")])])])):y("",!0)}const P=f(M,[["render",j]]),g=x(),E={name:"TemplatesListComponent",props:{templates:{type:Array,required:!0}},data(){return{showPopup:!1,selectedTemplate:null}},components:{PopupComponent:P},methods:{async deleteTemplate(o){try{const e=await fetch("https://web-i3-back.fly.dev/admin/template/"+o,{method:"DELETE",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!e.ok)throw new Error(e.statusText);this.$emit("removeTemplate"),g.success("Template deleted successfully")}catch(e){console.error(e),g.error("Something went wrong")}},openModal(o){this.selectedTemplate=o,this.showPopup=!0},closeModal(){this.showPopup=!1}}},R={class:"space-y-4"},S=["onClick"],V={class:"flex min-w-0 gap-x-4"},D={class:"min-w-0 flex-auto"},I={class:"text-sm/6 font-semibold"};function N(o,e,i,h,l,s){const n=u("RouterLink"),m=u("PopupComponent");return r(),a("div",null,[t("ul",R,[(r(!0),a(_,null,v(i.templates,(c,b)=>(r(),a("li",{key:b},[d(n,{to:{name:"templateDetail",params:{id:c.survey_templateID}},class:"p-4 block border border-neutral-300 rounded-lg bg-neutral-50 cursor-pointer transition-transform duration-200 ease-in-out hover:bg-neutral-100 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"},{default:w(()=>[t("button",{type:"button",onClick:k(Y=>s.openModal(c),["prevent"]),class:"text-red-400 hover:text-red-500 font-semibold rounded-lg focus:outline-none focus:ring-offset-4 focus:ring-2 focus:ring-red-700"}," Remove ",8,S),t("div",V,[t("div",D,[t("p",I,p(c.survey_templateID)+" "+p(c.name),1)])])]),_:2},1032,["to"])]))),128))]),d(m,{isOpen:l.showPopup,popUpText:"Are you sure you want to delete this template ? This will also delete all associated surveys",onCloseModal:s.closeModal,onConfirmAction:e[0]||(e[0]=c=>s.deleteTemplate(l.selectedTemplate.survey_templateID))},null,8,["isOpen","onCloseModal"])])}const z=f(E,[["render",N]]),O=x(),q={name:"TemplatesListView",inject:["userState"],data(){return{templates:[]}},components:{TemplateListComponent:z},methods:{async fetchAllTemplates(){try{const o=await fetch("https://web-i3-back.fly.dev/admin/templates",{method:"GET",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`}});if(!o.ok)throw new Error(o.statusText);this.templates=await o.json()}catch(o){console.error(o),O.error("Something went wrong")}}},beforeMount(){this.fetchAllTemplates()}},U={class:"my-12"},F={key:0,class:"text-gray-500 text-sm text-center"};function G(o,e,i,h,l,s){const n=u("RouterLink"),m=u("TemplateListComponent");return r(),a("div",null,[t("section",U,[e[1]||(e[1]=t("h1",{class:"my-6 text-3xl font-semibold text-center"},"Templates",-1)),d(n,{to:{name:"createTemplate"},class:"block w-full max-w-7xl mx-auto rounded-md text-center my-4 px-4 py-2 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"},{default:w(()=>e[0]||(e[0]=[C(" Create a Template ")])),_:1}),l.templates.length===0?(r(),a("div",F,"No templates yet")):(r(),T(m,{key:1,class:"max-w-7xl mx-auto",templates:l.templates,onRemoveTemplate:s.fetchAllTemplates},null,8,["templates","onRemoveTemplate"]))])])}const H=f(q,[["render",G]]);export{H as default};
