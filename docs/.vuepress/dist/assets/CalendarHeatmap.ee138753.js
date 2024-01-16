var le=Object.defineProperty;var oe=(_,e,t)=>e in _?le(_,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):_[e]=t;var c=(_,e,t)=>(oe(_,typeof e!="symbol"?e+"":e,t),t);import{d as ie,r as m,f as _e,g as L,h as ue,i as de,w as K,t as P,o,c as i,j as h,F as f,k as T,l as r,m as I,p as O,q as x,s as v,v as W,n as $}from"./app.350d946f.js";const ce=_=>({radiusX:0,radiusY:0}),he=_=>!0,ge=(_="en-US")=>{const e=[],t=new Date;t.setDate(1);for(let s=0;s<12;s++)t.setMonth(s),e.push(t.toLocaleString(_,{month:"long"}));return e},ye=(_="en-US")=>{const e=[],t=new Date("12/4/2022");for(let s=0;s<7;s++)e.push(t.toLocaleString(_,{weekday:"long"})),t.setDate(t.getDate()+1);return e},fe=async(_="en-US")=>{var e,t;try{return{months:(e=ge(_))!=null?e:n.DEFAULT_LOCALE.months,days:(t=ye(_))!=null?t:n.DEFAULT_LOCALE.months,on:n.DEFAULT_LOCALE.on,less:n.DEFAULT_LOCALE.less,more:n.DEFAULT_LOCALE.more}}catch(s){console.log(s),console.log("No i18n")}},E=class{constructor(e,t,s,a){c(this,"startDate");c(this,"endDate");c(this,"max");c(this,"months");c(this,"_values");c(this,"_firstFullWeekOfMonths");c(this,"_activities");c(this,"_calendar");this.endDate=this.parseDate(e),this.max=a!=null?a:Math.ceil(Math.max(...t.map(u=>u.count))/5*4),this.startDate=s?this.parseDate(s):this.shiftDate(e,-E.DAYS_IN_ONE_YEAR),this._values=t,this.months=12,fe()}set values(e){this.max=Math.ceil(Math.max(...e.map(t=>t.count))/5*4),this._values=e,this._firstFullWeekOfMonths=void 0,this._calendar=void 0,this._activities=void 0}get values(){return this._values}get activities(){if(!this._activities){this._activities=new Map;for(let e=0,t=this.values.length;e<t;e++)this._activities.set(this.keyDayParser(this.values[e].date),{count:this.values[e].count,colorIndex:this.getColorIndex(this.values[e].count)})}return this._activities}get weekCount(){return this.getDaysCount()/E.DAYS_IN_WEEK}get calendar(){if(!this._calendar){let e=this.shiftDate(this.startDate,-this.getCountEmptyDaysAtStart());e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),this._calendar=new Array(this.weekCount);for(let t=0,s=this._calendar.length;t<s;t++){this._calendar[t]=new Array(E.DAYS_IN_WEEK);for(let a=0;a<E.DAYS_IN_WEEK;a++){const u=this.activities.get(this.keyDayParser(e));this._calendar[t][a]={date:new Date(e.valueOf()),count:u?u.count:void 0,colorIndex:u?u.colorIndex:0},e.setDate(e.getDate()+1)}}}return this._calendar}get firstFullWeekOfMonths(){if(!this._firstFullWeekOfMonths){const e=this.calendar;this._firstFullWeekOfMonths=[];for(let t=1,s=e.length;t<s-1;t++){const a=e[t-1][0].date,u=e[t][0].date;(a.getFullYear()<u.getFullYear()||a.getMonth()<u.getMonth())&&this._firstFullWeekOfMonths.push({value:u.getMonth(),index:t})}}return this._firstFullWeekOfMonths}getColorIndex(e){return e==null?0:e<=0?1:e>=this.max?5:Math.ceil(e*100/this.max*.03)+1}getCountEmptyDaysAtStart(){return this.startDate.getDay()}getCountEmptyDaysAtEnd(){return E.DAYS_IN_WEEK-1-this.endDate.getDay()}getDaysCount(){return E.DAYS_IN_ONE_YEAR+1+this.getCountEmptyDaysAtStart()+this.getCountEmptyDaysAtEnd()}shiftDate(e,t){const s=new Date(e);return s.setDate(s.getDate()+t),s}parseDate(e){return e instanceof Date?e:new Date(e)}keyDayParser(e){const t=this.parseDate(e);return String(t.getFullYear())+String(t.getMonth()).padStart(2,"0")+String(t.getDate()).padStart(2,"0")}};let n=E;c(n,"DEFAULT_RANGE_COLOR_LIGHT",["#ebedf0","#39d353","#26a641","#006d32","#0e4429"]),c(n,"DEFAULT_RANGE_COLOR_DARK",["#161b22","#39d353","#26a641","#006d32","#0e4429"]),c(n,"DEFAULT_LOCALE",{months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],on:"on",less:"Less",more:"More"}),c(n,"DEFAULT_TOOLTIP_UNIT","contributions"),c(n,"DAYS_IN_ONE_YEAR",365),c(n,"DAYS_IN_WEEK",7),c(n,"SQUARE_SIZE",11);const ve={style:{display:"flex"}},Ee=["height"],De=["transform"],pe=["x","y"],me=["viewBox"],Ae=["transform"],Se=["x","y"],ke=["transform"],Le=["x"],Te=["rx","ry","width","height","x","y"],Ie=["x","y"],xe=["transform"],Oe=["rx","ry","transform","width","height","data-tippy-content","onClick"],we={class:"calendar__footer"},Ce=["viewBox","height"],Re={class:"vch__legend__wrapper"},Fe=["rx","ry","width","height","x"],Be=ie({props:{endDate:{type:Date,default:new Date},startDate:{type:Date,default:null},max:{type:Number},rangeColor:{type:Array,default:n.DEFAULT_RANGE_COLOR_LIGHT},values:{type:Array,required:!0},locale:{type:Object,default:null},tooltip:{type:Boolean,default:!0},tooltipUnit:{type:String,default:n.DEFAULT_TOOLTIP_UNIT},tooltipFormatter:{type:Function},vertical:{type:Boolean,default:!1},noDataText:{type:[Boolean,String],default:null},noDataTooltip:{type:Boolean,default:!1},radius:{type:[String,Number],default:"20%",validator:_=>he()},darkMode:Boolean,legendDirectionReverse:{type:Boolean,default:!1},noInteract:{type:Boolean,default:!1},monthWithYear:{type:Boolean,default:!1},gapMonths:{type:Number,default:0,validator:_=>!0},groupBy:{type:String,default:"day"}},emits:["dayClick"],setup(_,{emit:e}){const t=_,s=n.SQUARE_SIZE/5,a=n.SQUARE_SIZE+s,u=Math.ceil(n.SQUARE_SIZE*2.5),V=a*3,A=n.SQUARE_SIZE+n.SQUARE_SIZE/2,j=n.SQUARE_SIZE+n.SQUARE_SIZE/2,H=`translate(${u}, ${A})`,Y=m(null),J=m(new Date);m([8,20,32,44,56,68,80]);const w=m(0),C=m(0),R=m(""),F=m(""),{values:q,tooltipUnit:Ne,tooltipFormatter:Ue,noDataText:Me,max:We,vertical:g,locale:b,legendDirectionReverse:z,rangeColor:D,darkMode:p}=_e(t);L(()=>{let l="en-US";return navigator.languages&&navigator.languages.length>0?l=navigator.languages[0]:navigator.language&&(l=navigator.language),l}),ue(()=>{}),de();const X=l=>{},ee=l=>t.vertical?`translate(0, ${a*k.value.weekCount-(l+1)*a})`:`translate(${l*a}, 0)`,te=l=>t.vertical?`translate(${l*a}, 0)`:`translate(0, ${l*a})`,B=l=>t.vertical?{x:3,y:a*k.value.weekCount-a*l.index-a/4}:{x:a*l.index,y:a-s};K([P(t,"rangeColor"),P(t,"darkMode")],([l,Q])=>{D.value=l||(Q?n.DEFAULT_RANGE_COLOR_DARK:n.DEFAULT_RANGE_COLOR_LIGHT)});const ae=L(()=>` 0 0 ${w.value} ${C.value}`),re=L(()=>g.value?`translate(${u+a*n.DAYS_IN_WEEK}, ${A})`:`translate(${w.value-a*D.value.length-30}, ${C.value-j})`),se=L(()=>`0 0 ${n.SQUARE_SIZE*(D.value.length+1)} ${n.SQUARE_SIZE}`),S=L(()=>b.value?{...n.DEFAULT_LOCALE,...b.value}:n.DEFAULT_LOCALE),k=L(()=>new n(t.endDate,q.value,t.startDate,t.max));K(g,l=>{l?(w.value=u+a*n.DAYS_IN_WEEK+V,C.value=A+a*k.value.weekCount+s,R.value=`translate(${u}, 0)`,F.value=`translate(0, ${A})`):(w.value=u+a*k.value.weekCount+s,C.value=A+a*n.DAYS_IN_WEEK,R.value=`translate(0, ${A})`,F.value=`translate(${u}, 0)`)},{immediate:!0});const ne=l=>{t.noInteract||e("dayClick",l)},{radiusX:N,radiusY:U}=ce(t.radius);return(l,Q)=>{var Z;return o(),i("div",{class:v({calendar:!0,"calendar--dark":r(p),"calendar--no_interact":_.noInteract,"calendar--vertical":r(g)===!0})},[h("div",ve,[(o(),i("svg",{viewbox:"0 0 0 0",width:"25",class:"days",height:(Z=Y.value)==null?void 0:Z.clientHeight},[h("g",{class:"calendar__days",transform:R.value},[(o(!0),i(f,null,T(Array(7).keys(),d=>(o(),i("text",{key:d,class:v(["calendar__days__label",{"calendar__months--dark":r(p)}]),x:r(g)?a*d:0,y:r(g)?a-s:8+d*a},[x(l.$slots,"day-"+d,{},()=>[[1,3,5].includes(d)?(o(),i(f,{key:0},[W(I(r(S).days[d]),1)],64)):O("",!0)])],10,pe))),128))],8,De)],8,Ee)),(o(),i("svg",{class:"calendar__wrapper",ref_key:"svg",ref:Y,viewBox:r(ae)},[h("g",{class:"calendar__months",transform:F.value},[(o(!0),i(f,null,T(r(k).firstFullWeekOfMonths,(d,y)=>(o(),i("text",{class:v(["calendar__months__label",{"calendar__months--dark":r(p)}]),key:y,x:B(d).x,y:B(d).y},I(r(S).months[d.value]),11,Se))),128))],8,Ae),r(g)?(o(),i("g",{key:0,class:"vch__legend__wrapper",transform:r(re)},[h("text",{x:a*1.25,y:"8"},I(r(S).less),9,Le),(o(!0),i(f,null,T(r(D),(d,y)=>(o(),i("rect",{key:y,rx:r(N),ry:r(U),style:$({fill:d}),width:a-s,height:a-s,x:a*1.75,y:a*(y+1)},null,12,Te))),128)),h("text",{x:a*1.25,y:a*(r(D).length+2)-s},I(r(S).more),9,Ie)],8,ke)):O("",!0),h("g",{class:"calendar__main__year",transform:H},[(o(!0),i(f,null,T(r(k).calendar,(d,y)=>(o(),i("g",{class:"calendar__main__year__month",key:y,transform:ee(y)},[(o(!0),i(f,null,T(d,(M,G)=>(o(),i(f,{key:G},[M.date<J.value?(o(),i("rect",{key:0,class:v(["calendar__main__year__month__day",{"calendar__main__year__month__day--dark":r(p)}]),rx:r(N),ry:r(U),transform:te(G),width:a-s,height:a-s,style:$({fill:r(D)[M.colorIndex]}),"data-tippy-content":X(),onClick:$e=>ne(M)},null,14,Oe)):O("",!0)],64))),128))],8,xe))),128))])],8,me))]),x(l.$slots,"footer",{},()=>[h("div",we,[x(l.$slots,"footer-link",{},()=>[h("a",{class:v(["calendar__footer__link",{"calendar__footer__link--dark":r(p)}]),href:"link"}," link here ",2)]),r(g)?O("",!0):(o(),i("div",{key:0,class:v(`calendar__footer__legend calendar__footer__legend-${r(z)?r(g)?"bottom":"left":r(g)?"top":"right"}`)},[h("div",{class:v({"calendar__footer__legend__less--dark":r(p)})},[x(l.$slots,"legend-text-less",{},()=>[W(I(r(S).less),1)])],2),x(l.$slots,"legend-range",{},()=>[r(g)?O("",!0):(o(),i("svg",{key:0,class:"vch__external-legend-wrapper",viewBox:r(se),height:a-s},[h("g",Re,[(o(!0),i(f,null,T(r(D),(d,y)=>(o(),i("rect",{key:y,rx:r(N),ry:r(U),style:$({fill:d}),width:a-s,height:a-s,x:a*y},null,12,Fe))),128))])],8,Ce))]),h("div",{class:v({"calendar__footer__legend__more--dark":r(p)})},[x(l.$slots,"legend-text-more",{},()=>[W(I(r(S).more),1)])],2)],2))])])],2)}}});export{Be as default};