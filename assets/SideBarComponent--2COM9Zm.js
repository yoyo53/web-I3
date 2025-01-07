import{r as l,o as a,c as r,a as c,w as p,b as n,n as d,t as f,f as h,k as w,h as x}from"./index-dWdgYF6i.js";import{_ as i}from"./_plugin-vue_export-helper-DlAUqK2U.js";const y={name:"TabComponent",props:{img:{type:String,required:!0},text:{type:String,required:!0},click:{type:Function,default:()=>{}},textStyle:{type:String,default:"text-white"},to:{type:Object,required:!0}},methods:{handleClick(){this.click()}}},v=["src"];function _(m,g,t,u,o,s){const e=l("router-link");return a(),r("li",null,[c(e,{onClick:h(s.handleClick,["prevent"]),to:t.to,class:"flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"},{default:p(()=>[n("img",{src:t.img,class:"w-7 h-7 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white","aria-hidden":"true"},null,8,v),n("span",{class:d(["ms-3","text-lg",t.textStyle])},f(t.text),3)]),_:1},8,["onClick","to"])])}const S=i(y,[["render",_]]),C="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20448%20512'%3e%3c!--!Font%20Awesome%20Free%206.7.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='%23FFFFFF'%20d='M304%20128a80%2080%200%201%200%20-160%200%2080%2080%200%201%200%20160%200zM96%20128a128%20128%200%201%201%20256%200A128%20128%200%201%201%2096%20128zM49.3%20464l349.5%200c-8.9-63.3-63.3-112-129-112l-91.4%200c-65.7%200-120.1%2048.7-129%20112zM0%20482.3C0%20383.8%2079.8%20304%20178.3%20304l91.4%200C368.2%20304%20448%20383.8%20448%20482.3c0%2016.4-13.3%2029.7-29.7%2029.7L29.7%20512C13.3%20512%200%20498.7%200%20482.3z'/%3e%3c/svg%3e",k="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20384%20512'%3e%3c!--!Font%20Awesome%20Free%206.7.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='white'%20d='M64%200C28.7%200%200%2028.7%200%2064L0%20448c0%2035.3%2028.7%2064%2064%2064l256%200c35.3%200%2064-28.7%2064-64l0-288-128%200c-17.7%200-32-14.3-32-32L224%200%2064%200zM256%200l0%20128%20128%200L256%200zM80%2064l64%200c8.8%200%2016%207.2%2016%2016s-7.2%2016-16%2016L80%2096c-8.8%200-16-7.2-16-16s7.2-16%2016-16zm0%2064l64%200c8.8%200%2016%207.2%2016%2016s-7.2%2016-16%2016l-64%200c-8.8%200-16-7.2-16-16s7.2-16%2016-16zm16%2096l192%200c17.7%200%2032%2014.3%2032%2032l0%2064c0%2017.7-14.3%2032-32%2032L96%20352c-17.7%200-32-14.3-32-32l0-64c0-17.7%2014.3-32%2032-32zm0%2032l0%2064%20192%200%200-64L96%20256zM240%20416l64%200c8.8%200%2016%207.2%2016%2016s-7.2%2016-16%2016l-64%200c-8.8%200-16-7.2-16-16s7.2-16%2016-16z'/%3e%3c/svg%3e",z="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3c!--!Font%20Awesome%20Free%206.7.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='white'%20d='M0%20416c0%2017.7%2014.3%2032%2032%2032l54.7%200c12.3%2028.3%2040.5%2048%2073.3%2048s61-19.7%2073.3-48L480%20448c17.7%200%2032-14.3%2032-32s-14.3-32-32-32l-246.7%200c-12.3-28.3-40.5-48-73.3-48s-61%2019.7-73.3%2048L32%20384c-17.7%200-32%2014.3-32%2032zm128%200a32%2032%200%201%201%2064%200%2032%2032%200%201%201%20-64%200zM320%20256a32%2032%200%201%201%2064%200%2032%2032%200%201%201%20-64%200zm32-80c-32.8%200-61%2019.7-73.3%2048L32%20224c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032l246.7%200c12.3%2028.3%2040.5%2048%2073.3%2048s61-19.7%2073.3-48l54.7%200c17.7%200%2032-14.3%2032-32s-14.3-32-32-32l-54.7%200c-12.3-28.3-40.5-48-73.3-48zM192%20128a32%2032%200%201%201%200-64%2032%2032%200%201%201%200%2064zm73.3-64C253%2035.7%20224.8%2016%20192%2016s-61%2019.7-73.3%2048L32%2064C14.3%2064%200%2078.3%200%2096s14.3%2032%2032%2032l86.7%200c12.3%2028.3%2040.5%2048%2073.3%2048s61-19.7%2073.3-48L480%20128c17.7%200%2032-14.3%2032-32s-14.3-32-32-32L265.3%2064z'/%3e%3c/svg%3e",L="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20512%20512'%3e%3c!--!Font%20Awesome%20Free%206.7.1%20by%20@fontawesome%20-%20https://fontawesome.com%20License%20-%20https://fontawesome.com/license/free%20Copyright%202024%20Fonticons,%20Inc.--%3e%3cpath%20fill='%23ef4444'%20d='M502.6%20278.6c12.5-12.5%2012.5-32.8%200-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3%200s-12.5%2032.8%200%2045.3L402.7%20224%20192%20224c-17.7%200-32%2014.3-32%2032s14.3%2032%2032%2032l210.7%200-73.4%2073.4c-12.5%2012.5-12.5%2032.8%200%2045.3s32.8%2012.5%2045.3%200l128-128zM160%2096c17.7%200%2032-14.3%2032-32s-14.3-32-32-32L96%2032C43%2032%200%2075%200%20128L0%20384c0%2053%2043%2096%2096%2096l64%200c17.7%200%2032-14.3%2032-32s-14.3-32-32-32l-64%200c-17.7%200-32-14.3-32-32l0-256c0-17.7%2014.3-32%2032-32l64%200z'/%3e%3c/svg%3e",F={inject:["userState"],name:"SideBarComponent",components:{TabComponent:S},data(){return{ProfileSVG:C,surveySVG:k,templateSVG:z,logoutSVG:L}},computed:{getSurveyRoute(){return this.userState.userType==="Admin"?{name:"admin"}:this.userState.userType==="Teacher"?{name:"teacher"}:{name:"teacher"}}},methods:{logout(){localStorage.removeItem("token")}}},b={id:"default-sidebar",class:"top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0","aria-label":"Sidebar"},M={class:"h-full px-3 py-8 overflow-y-auto bg-gray-50 dark:bg-gray-800"},V={class:"space-y-4 font-medium h-full flex flex-col"};function B(m,g,t,u,o,s){const e=l("TabComponent");return a(),r("aside",b,[n("div",M,[n("ul",V,[c(e,{img:o.ProfileSVG,text:"Profile",to:{name:"profile"}},null,8,["img"]),c(e,{img:o.surveySVG,text:"Surveys",to:s.getSurveyRoute},null,8,["img","to"]),s.userState.userType==="Admin"?(a(),w(e,{key:0,img:o.templateSVG,text:"Template",to:{name:"templates"}},null,8,["img"])):x("",!0),c(e,{img:o.logoutSVG,text:"Logout",to:{name:"login"},textStyle:"text-red-500 font-semibold",class:"!mt-auto",click:s.logout},null,8,["img","click"])])])])}const A=i(F,[["render",B]]);export{A as S};