var le=Object.defineProperty;var oe=(c,e,a)=>e in c?le(c,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):c[e]=a;var d=(c,e,a)=>(oe(c,typeof e!="symbol"?e+"":e,a),a);import{d as ie,r as m,f as _e,g as x,h as ue,i as de,w as K,t as P,o,c as i,j as h,F as y,k as I,l as r,m as T,p as O,q as w,s as v,v as W,n as $}from"./app.591ae66d.js";const E=class{constructor(e,a,l){d(this,"startDate");d(this,"endDate");d(this,"max");d(this,"_values");d(this,"_firstFullWeekOfMonths");d(this,"_activities");d(this,"_calendar");this.endDate=this.parseDate(e),this.max=l||Math.ceil(Math.max(...a.map(t=>t.count))/5*4),this.startDate=this.shiftDate(e,-E.DAYS_IN_ONE_YEAR),this._values=a}set values(e){this.max=Math.ceil(Math.max(...e.map(a=>a.count))/5*4),this._values=e,this._firstFullWeekOfMonths=void 0,this._calendar=void 0,this._activities=void 0}get values(){return this._values}get activities(){if(!this._activities){this._activities=new Map;for(let e=0,a=this.values.length;e<a;e++)this._activities.set(this.keyDayParser(this.values[e].date),{count:this.values[e].count,colorIndex:this.getColorIndex(this.values[e].count)})}return this._activities}get weekCount(){return this.getDaysCount()/E.DAYS_IN_WEEK}get calendar(){if(!this._calendar){let e=this.shiftDate(this.startDate,-this.getCountEmptyDaysAtStart());e=new Date(e.getFullYear(),e.getMonth(),e.getDate()),this._calendar=new Array(this.weekCount);for(let a=0,l=this._calendar.length;a<l;a++){this._calendar[a]=new Array(E.DAYS_IN_WEEK);for(let t=0;t<E.DAYS_IN_WEEK;t++){const u=this.activities.get(this.keyDayParser(e));this._calendar[a][t]={date:new Date(e.valueOf()),count:u?u.count:void 0,colorIndex:u?u.colorIndex:0},e.setDate(e.getDate()+1)}}}return this._calendar}get firstFullWeekOfMonths(){if(!this._firstFullWeekOfMonths){const e=this.calendar;this._firstFullWeekOfMonths=[];for(let a=1,l=e.length;a<l-1;a++){const t=e[a-1][0].date,u=e[a][0].date;(t.getFullYear()<u.getFullYear()||t.getMonth()<u.getMonth())&&this._firstFullWeekOfMonths.push({value:u.getMonth(),index:a})}}return this._firstFullWeekOfMonths}getColorIndex(e){return e==null?0:e<=0?1:e>=this.max?5:Math.ceil(e*100/this.max*.03)+1}getCountEmptyDaysAtStart(){return this.startDate.getDay()}getCountEmptyDaysAtEnd(){return E.DAYS_IN_WEEK-1-this.endDate.getDay()}getDaysCount(){return E.DAYS_IN_ONE_YEAR+1+this.getCountEmptyDaysAtStart()+this.getCountEmptyDaysAtEnd()}shiftDate(e,a){const l=new Date(e);return l.setDate(l.getDate()+a),l}parseDate(e){return e instanceof Date?e:new Date(e)}keyDayParser(e){const a=this.parseDate(e);return String(a.getFullYear())+String(a.getMonth()).padStart(2,"0")+String(a.getDate()).padStart(2,"0")}};let s=E;d(s,"DEFAULT_RANGE_COLOR_LIGHT",["#ebedf0","#dae2ef","#c0ddf9","#73b3f3","#3886e1","#17459e"]),d(s,"DEFAULT_RANGE_COLOR_DARK",["#1f1f22","#1e334a","#1d466c","#1d5689","#1d69ac","#1B95D1"]),d(s,"DEFAULT_LOCALE",{months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],days:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],on:"on",less:"Less",more:"More"}),d(s,"DEFAULT_TOOLTIP_UNIT","contributions"),d(s,"DAYS_IN_ONE_YEAR",365),d(s,"DAYS_IN_WEEK",7),d(s,"SQUARE_SIZE",10);const ce=c=>({radiusX:0,radiusY:0}),he=c=>!0;const ge={style:{display:"flex"}},fe=["height"],ye=["transform"],ve=["x","y"],Ee=["viewBox"],De=["transform"],pe=["x","y"],me=["transform"],Ae=["x"],Se=["rx","ry","width","height","x","y"],ke=["x","y"],xe=["transform"],Ie=["rx","ry","transform","width","height","data-tippy-content","onClick"],Te={class:"calendar__footer"},we=["viewBox","height"],Oe={class:"vch__legend__wrapper"},Ce=["rx","ry","width","height","x"],$e=ie({props:{endDate:{type:Date,default:new Date},startDate:{type:Date,default:null},max:{type:Number},rangeColor:{type:Array,default:s.DEFAULT_RANGE_COLOR_LIGHT},values:{type:Array,required:!0},locale:{type:Object,default:null},tooltip:{type:Boolean,default:!0},tooltipUnit:{type:String,default:s.DEFAULT_TOOLTIP_UNIT},tooltipFormatter:{type:Function},vertical:{type:Boolean,default:!1},noDataText:{type:[Boolean,String],default:null},noDataTooltip:{type:Boolean,default:!1},radius:{type:[String,Number],default:"20%",validator:c=>he()},darkMode:Boolean,legendDirectionReverse:{type:Boolean,default:!1},noInteract:{type:Boolean,default:!1}},emits:["dayClick"],setup(c,{emit:e}){const a=c,l=s.SQUARE_SIZE/5,t=s.SQUARE_SIZE+l,u=Math.ceil(s.SQUARE_SIZE*2.5),V=t*3,A=s.SQUARE_SIZE+s.SQUARE_SIZE/2,H=s.SQUARE_SIZE+s.SQUARE_SIZE/2,j=`translate(${u}, ${A})`,Y=m(null),J=m(new Date);m([8,20,32,44,56,68,80]);const C=m(0),R=m(0),L=m(""),N=m(""),{values:q,tooltipUnit:Re,tooltipFormatter:Le,noDataText:Ne,max:Fe,vertical:g,locale:B,legendDirectionReverse:z,rangeColor:D,darkMode:p}=_e(a);x(()=>{let n="en-US";return navigator.languages&&navigator.languages.length>0?n=navigator.languages[0]:navigator.language&&(n=navigator.language),n}),ue(()=>{}),de();const X=n=>{},ee=n=>a.vertical?`translate(0, ${t*k.value.weekCount-(n+1)*t})`:`translate(${n*t}, 0)`,te=n=>a.vertical?`translate(${n*t}, 0)`:`translate(0, ${n*t})`,b=n=>a.vertical?{x:3,y:t*k.value.weekCount-t*n.index-t/4}:{x:t*n.index,y:t-l};K([P(a,"rangeColor"),P(a,"darkMode")],([n,Q])=>{D.value=n||(Q?s.DEFAULT_RANGE_COLOR_DARK:s.DEFAULT_RANGE_COLOR_LIGHT)});const ae=x(()=>` 0 0 ${C.value} ${R.value}`),re=x(()=>g.value?`translate(${u+t*s.DAYS_IN_WEEK}, ${A})`:`translate(${C.value-t*D.value.length-30}, ${R.value-H})`),se=x(()=>`0 0 ${s.SQUARE_SIZE*(D.value.length+1)} ${s.SQUARE_SIZE}`),S=x(()=>B.value?{...s.DEFAULT_LOCALE,...B.value}:s.DEFAULT_LOCALE),k=x(()=>new s(a.endDate,q.value,a.startDate,a.max));K(g,n=>{n?(C.value=u+t*s.DAYS_IN_WEEK+V,R.value=A+t*k.value.weekCount+l,L.value=`translate(${u}, 0)`,N.value=`translate(0, ${A})`):(C.value=u+t*k.value.weekCount+l,R.value=A+t*s.DAYS_IN_WEEK,L.value=`translate(0, ${A})`,N.value=`translate(${u}, 0)`)},{immediate:!0});const ne=n=>{a.noInteract||e("dayClick",n)},{radiusX:F,radiusY:M}=ce(a.radius);return(n,Q)=>{var Z;return o(),i("div",{class:v({calendar:!0,"calendar--dark":r(p),"calendar--no_interact":c.noInteract,"calendar--vertical":r(g)===!0})},[h("div",ge,[(o(),i("svg",{viewbox:"0 0 0 0",width:"25",class:"days",height:(Z=Y.value)==null?void 0:Z.clientHeight},[h("g",{class:"calendar__days",transform:L.value},[(o(!0),i(y,null,I(Array(7).keys(),_=>(o(),i("text",{key:_,class:v(["calendar__days__label",{"calendar__months--dark":r(p)}]),x:r(g)?t*_:0,y:r(g)?t-l:8+_*t},[w(n.$slots,"day-"+_,{},()=>[[1,3,5].includes(_)?(o(),i(y,{key:0},[W(T(r(S).days[_]),1)],64)):O("",!0)])],10,ve))),128))],8,ye)],8,fe)),(o(),i("svg",{class:"calendar__wrapper",ref_key:"svg",ref:Y,viewBox:r(ae)},[h("g",{class:"calendar__months",transform:N.value},[(o(!0),i(y,null,I(r(k).firstFullWeekOfMonths,(_,f)=>(o(),i("text",{class:v(["calendar__months__label",{"calendar__months--dark":r(p)}]),key:f,x:b(_).x,y:b(_).y},T(r(S).months[_.value]),11,pe))),128))],8,De),r(g)?(o(),i("g",{key:0,class:"vch__legend__wrapper",transform:r(re)},[h("text",{x:t*1.25,y:"8"},T(r(S).less),9,Ae),(o(!0),i(y,null,I(r(D),(_,f)=>(o(),i("rect",{key:f,rx:r(F),ry:r(M),style:$({fill:_}),width:t-l,height:t-l,x:t*1.75,y:t*(f+1)},null,12,Se))),128)),h("text",{x:t*1.25,y:t*(r(D).length+2)-l},T(r(S).more),9,ke)],8,me)):O("",!0),h("g",{class:"calendar__main__year",transform:j},[(o(!0),i(y,null,I(r(k).calendar,(_,f)=>(o(),i("g",{class:"calendar__main__year__month",key:f,transform:ee(f)},[(o(!0),i(y,null,I(_,(U,G)=>(o(),i(y,{key:G},[U.date<J.value?(o(),i("rect",{key:0,class:v(["calendar__main__year__month__day",{"calendar__main__year__month__day--dark":r(p)}]),rx:r(F),ry:r(M),transform:te(G),width:t-l,height:t-l,style:$({fill:r(D)[U.colorIndex]}),"data-tippy-content":X(),onClick:Me=>ne(U)},null,14,Ie)):O("",!0)],64))),128))],8,xe))),128))])],8,Ee))]),w(n.$slots,"footer",{},()=>[h("div",Te,[w(n.$slots,"footer-link",{},()=>[h("a",{class:v(["calendar__footer__link",{"calendar__footer__link--dark":r(p)}]),href:"link"}," link here ",2)]),r(g)?O("",!0):(o(),i("div",{key:0,class:v(`calendar__footer__legend calendar__footer__legend-${r(z)?r(g)?"bottom":"left":r(g)?"top":"right"}`)},[h("div",{class:v({"calendar__footer__legend__less--dark":r(p)})},[w(n.$slots,"legend-text-less",{},()=>[W(T(r(S).less),1)])],2),w(n.$slots,"legend-range",{},()=>[r(g)?O("",!0):(o(),i("svg",{key:0,class:"vch__external-legend-wrapper",viewBox:r(se),height:t-l},[h("g",Oe,[(o(!0),i(y,null,I(r(D),(_,f)=>(o(),i("rect",{key:f,rx:r(F),ry:r(M),style:$({fill:_}),width:t-l,height:t-l,x:t*f},null,12,Ce))),128))])],8,we))]),h("div",{class:v({"calendar__footer__legend__more--dark":r(p)})},[w(n.$slots,"legend-text-more",{},()=>[W(T(r(S).more),1)])],2)],2))])])],2)}}});export{$e as default};
