import{_ as a,c as d,a as t,w as m,b as r,v as n,d as u,t as g,o as c}from"./index-ANTf7xIC.js";const f={data(){return{email:"",password:""}},methods:{async login(){try{const e=await fetch("https://web-i3-back.fly.dev/auth/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:this.email,password:this.password})}),s=await e.json();e.ok?(console.log("Login successful:",s),localStorage.setItem("token",s.token),localStorage.setItem("userType",s.type)):console.error("Login failed:",s)}catch(e){console.error("Error:",e)}}}},p={class:"flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8"},x={class:"mt-10 sm:mx-auto sm:w-full sm:max-w-sm"},w={class:"mt-2"},y={class:"mt-2"};function b(e,s,v,h,i,l){return c(),d("div",p,[s[7]||(s[7]=t("div",{class:"sm:mx-auto sm:w-full sm:max-w-sm"},[t("img",{class:"mx-auto h-10 w-auto",src:"https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600",alt:"Your Company"}),t("h2",{class:"mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"},"Sign in to your account")],-1)),t("div",x,[t("form",{class:"space-y-6",onSubmit:s[2]||(s[2]=m((...o)=>l.login&&l.login(...o),["prevent"]))},[t("div",null,[s[3]||(s[3]=t("label",{for:"email",class:"block text-sm/6 font-medium text-gray-900"},"Email address",-1)),t("div",w,[r(t("input",{id:"email",name:"email",type:"email","onUpdate:modelValue":s[0]||(s[0]=o=>i.email=o),autocomplete:"email",required:"",class:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"},null,512),[[n,i.email]])])]),t("div",null,[s[4]||(s[4]=t("div",{class:"flex items-center justify-between"},[t("label",{for:"password",class:"block text-sm/6 font-medium text-gray-900"},"Password"),t("div",{class:"text-sm"},[t("a",{href:"#",class:"font-semibold text-indigo-600 hover:text-indigo-500"},"Forgot password?")])],-1)),t("div",y,[r(t("input",{id:"password",name:"password",type:"password","onUpdate:modelValue":s[1]||(s[1]=o=>i.password=o),autocomplete:"current-password",required:"",class:"block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"},null,512),[[n,i.password]])])]),s[5]||(s[5]=t("div",null,[t("button",{type:"submit",class:"flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"},"Sign in")],-1))],32),s[6]||(s[6]=t("p",{class:"mt-10 text-center text-sm/6 text-gray-500"},[u(" Not a member? "+g(" ")+" "),t("a",{href:"#",class:"font-semibold text-indigo-600 hover:text-indigo-500"},"Start a 14 day free trial")],-1))])])}const S=a(f,[["render",b]]);export{S as default};
