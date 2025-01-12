import{_ as r,c as o,a as e,i as n,o as l}from"./index-ChGo4v9w.js";const u={data(){return{user:{firstName:"",lastName:"",email:"",id:null}}},inject:["userState"],name:"ProfileView",methods:{async fetchUserData(){const i=localStorage.getItem("token"),t=await fetch("https://web-i3-back.fly.dev/user/data",{headers:{Authorization:`Bearer ${i}`}});this.user=await t.json()}},async beforeMount(){await this.fetchUserData()}},d={class:"flex space-x-4"},c={class:"border-b border-gray-900/10 pb-12"},m={class:"mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"},f={class:"sm:col-span-3"},p={class:"mt-2"},x=["placeholder"],y={class:"sm:col-span-3"},h={class:"mt-2"},g=["placeholder"],b={class:"sm:col-span-4"},_={class:"mt-2"},k=["placeholder"],w={key:0,class:"sm:col-span-4"},v={key:0,for:"teacher-id",class:"block text-sm/6 font-medium text-gray-900"},S={key:1,for:"student-id",class:"block text-sm/6 font-medium text-gray-900"},N={class:"mt-2"},T=["placeholder"];function B(i,t,D,I,s,a){return l(),o("div",d,[e("div",c,[t[3]||(t[3]=e("h2",{class:"text-base/7 font-semibold text-gray-900"},"Personal Information",-1)),t[4]||(t[4]=e("p",{class:"mt-1 text-sm/6 text-gray-600"},"Use a permanent address where you can receive mail.",-1)),e("div",m,[e("div",f,[t[0]||(t[0]=e("label",{for:"first-name",class:"block text-sm/6 font-medium text-gray-900"},"First name",-1)),e("div",p,[e("input",{disabled:"",type:"text",name:"first-name",id:"first-name",autocomplete:"given-name",placeholder:s.user.firstName,class:"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"},null,8,x)])]),e("div",y,[t[1]||(t[1]=e("label",{for:"last-name",class:"block text-sm/6 font-medium text-gray-900"},"Last name",-1)),e("div",h,[e("input",{disabled:"",type:"text",name:"last-name",id:"last-name",autocomplete:"family-name",placeholder:s.user.lastName,class:"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"},null,8,g)])]),e("div",b,[t[2]||(t[2]=e("label",{for:"email",class:"block text-sm/6 font-medium text-gray-900"},"Email address",-1)),e("div",_,[e("input",{disabled:"",id:"email",name:"email",type:"email",autocomplete:"email",placeholder:s.user.email,class:"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"},null,8,k)])]),a.userState.userType!=="Admin"?(l(),o("div",w,[a.userState.userType==="Teacher"?(l(),o("label",v,"Teacher ID")):a.userState.userType==="Student"?(l(),o("label",S,"Student ID")):n("",!0),e("div",N,[e("input",{disabled:"",id:"email",name:"email",type:"email",autocomplete:"email",placeholder:s.user.id,class:"block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"},null,8,T)])])):n("",!0)])])])}const P=r(u,[["render",B]]);export{P as default};
