import{_ as a,u as c,c as d,a as t,g as f,h as n,v as u,t as m,o as p}from"./index-DS8IDvsA.js";const i=c(),b={name:"CreateUserView",data(){return{email:"",firstName:"",lastName:"",accountNumber:"",accountType:"Student"}},methods:{async registerUser(){try{const r=await fetch("https://web-i3-back.fly.dev/auth/register",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${localStorage.getItem("token")}`},body:JSON.stringify({email:this.email,firstName:this.firstName,lastName:this.lastName,accountNumber:this.accountNumber,accountType:this.accountType})});if(!r.ok)throw new Error(r.statusText);i.success("Account created successfully")}catch(r){console.error(r),i.error("Something went wrong")}},toggleAccountType(){this.accountType=this.accountType==="Student"?"Teacher":"Student"},validateAccountNumber(){this.accountNumber=this.accountNumber.replace(/\D/g,"")}}},g={class:"flex flex-col justify-center"},y={class:"mx-auto w-full my-8 p-6 md:max-w-md"},x={for:"user-id",class:"block text-sm/6 font-medium"},h={class:"flex items-center justify-between"},w={class:"flex p-0.5"},N={class:"grow relative py-2 px-3"},v=["checked"],k={class:"grow relative py-2 px-3"},T=["checked"];function A(r,e,S,U,s,l){return p(),d("div",g,[t("section",y,[t("form",{class:"space-y-4 md:space-y-6",onSubmit:e[7]||(e[7]=f((...o)=>l.registerUser&&l.registerUser(...o),["prevent"]))},[e[14]||(e[14]=t("h1",{class:"text-center text-2xl/9 font-bold tracking-tight"},"Create an account",-1)),t("div",null,[e[8]||(e[8]=t("label",{for:"email",class:"block text-sm/6 font-medium"},"Email",-1)),n(t("input",{type:"email",id:"email","onUpdate:modelValue":e[0]||(e[0]=o=>s.email=o),autocomplete:"email",placeholder:"john.doe@email.com",class:"block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400",required:""},null,512),[[u,s.email]])]),t("div",null,[e[9]||(e[9]=t("label",{for:"first-name",class:"block text-sm/6 font-medium"},"First Name",-1)),n(t("input",{type:"text",id:"first-name","onUpdate:modelValue":e[1]||(e[1]=o=>s.firstName=o),autocomplete:"given-name",placeholder:"John",class:"block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400",required:""},null,512),[[u,s.firstName]])]),t("div",null,[e[10]||(e[10]=t("label",{for:"last-name",class:"block text-sm/6 font-medium"},"Last Name",-1)),n(t("input",{type:"text",id:"last-name","onUpdate:modelValue":e[2]||(e[2]=o=>s.lastName=o),autocomplete:"last-name",placeholder:"Doe",class:"block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400",required:""},null,512),[[u,s.lastName]])]),t("div",null,[t("label",x,m(this.accountType)+" Number",1),n(t("input",{type:"text",id:"user-id","onUpdate:modelValue":e[3]||(e[3]=o=>s.accountNumber=o),onInput:e[4]||(e[4]=(...o)=>l.validateAccountNumber&&l.validateAccountNumber(...o)),placeholder:"123456",class:"block w-full p-2.5 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700 placeholder-neutral-400",required:""},null,544),[[u,s.accountNumber]])]),t("div",h,[e[13]||(e[13]=t("span",{class:"text-sm font-medium"},"Account Type",-1)),t("div",w,[t("div",N,[t("input",{id:"account-type-teacher",name:"account-type",type:"radio",class:"absolute top-0 end-0 size-full cursor-pointer before:absolute before:size-full before:rounded-lg before:bg-white checked:before:bg-efrei-blue-200",checked:s.accountType==="Teacher",onClick:e[5]||(e[5]=(...o)=>l.toggleAccountType&&l.toggleAccountType(...o))},null,8,v),e[11]||(e[11]=t("label",{for:"account-type-teacher",class:"min-w-8 size-full relative text-sm cursor-pointer"},"Teacher",-1))]),t("div",k,[t("input",{id:"account-type-student",name:"account-type",type:"radio",class:"absolute top-0 end-0 size-full cursor-pointer before:absolute before:size-full before:rounded-lg before:bg-white checked:before:bg-efrei-blue-200",checked:s.accountType==="Student",onClick:e[6]||(e[6]=(...o)=>l.toggleAccountType&&l.toggleAccountType(...o))},null,8,T),e[12]||(e[12]=t("label",{for:"account-type-student",class:"min-w-8 size-full relative text-sm"},"Student",-1))])])]),e[15]||(e[15]=t("button",{type:"submit",class:"w-full rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm bg-efrei-blue-500 hover:bg-efrei-blue-950 focus:outline-none focus:ring-offset-2 focus:ring-2 focus:ring-efrei-blue-700"}," Create an account ",-1))],32)])])}const V=a(b,[["render",A]]);export{V as default};
