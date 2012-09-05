YUI.add("anim-base",function(b,p){var d="running",n="startTime",l="elapsedTime",j="start",i="tween",m="end",c="node",k="paused",o="reverse",h="iterationCount",a=Number;var f={},e;b.Anim=function(){b.Anim.superclass.constructor.apply(this,arguments);b.Anim._instances[b.stamp(this)]=this;};b.Anim.NAME="anim";b.Anim._instances={};b.Anim.RE_DEFAULT_UNIT=/^width|height|top|right|bottom|left|margin.*|padding.*|border.*$/i;b.Anim.DEFAULT_UNIT="px";b.Anim.DEFAULT_EASING=function(r,q,u,s){return u*r/s+q;};b.Anim._intervalTime=20;b.Anim.behaviors={left:{get:function(r,q){return r._getOffset(q);}}};b.Anim.behaviors.top=b.Anim.behaviors.left;b.Anim.DEFAULT_SETTER=function(u,v,x,y,A,t,w,z){var r=u._node,s=r._node,q=w(A,a(x),a(y)-a(x),t);if(s){if("style" in s&&(v in s.style||v in b.DOM.CUSTOM_STYLES)){z=z||"";r.setStyle(v,q+z);}else{if("attributes" in s&&v in s.attributes){r.setAttribute(v,q);}else{if(v in s){s[v]=q;}}}}else{if(r.set){r.set(v,q);}else{if(v in r){r[v]=q;}}}};b.Anim.DEFAULT_GETTER=function(t,q){var s=t._node,r=s._node,u="";if(r){if("style" in r&&(q in r.style||q in b.DOM.CUSTOM_STYLES)){u=s.getComputedStyle(q);}else{if("attributes" in r&&q in r.attributes){u=s.getAttribute(q);}else{if(q in r){u=r[q];}}}}else{if(s.get){u=s.get(q);}else{if(q in s){u=s[q];}}}return u;};b.Anim.ATTRS={node:{setter:function(q){if(q){if(typeof q=="string"||q.nodeType){q=b.one(q);}}this._node=q;if(!q){}return q;}},duration:{value:1},easing:{value:b.Anim.DEFAULT_EASING,setter:function(q){if(typeof q==="string"&&b.Easing){return b.Easing[q];}}},from:{},to:{},startTime:{value:0,readOnly:true},elapsedTime:{value:0,readOnly:true},running:{getter:function(){return !!f[b.stamp(this)];},value:false,readOnly:true},iterations:{value:1},iterationCount:{value:0,readOnly:true},direction:{value:"normal"},paused:{readOnly:true,value:false},reverse:{value:false}};b.Anim.run=function(){var r=b.Anim._instances;for(var q in r){if(r[q].run){r[q].run();}}};b.Anim.pause=function(){for(var q in f){if(f[q].pause){f[q].pause();}}b.Anim._stopTimer();};b.Anim.stop=function(){for(var q in f){if(f[q].stop){f[q].stop();}}b.Anim._stopTimer();};b.Anim._startTimer=function(){if(!e){e=setInterval(b.Anim._runFrame,b.Anim._intervalTime);}};b.Anim._stopTimer=function(){clearInterval(e);e=0;};b.Anim._runFrame=function(){var q=true;for(var r in f){if(f[r]._runFrame){q=false;f[r]._runFrame();}}if(q){b.Anim._stopTimer();}};b.Anim.RE_UNITS=/^(-?\d*\.?\d*){1}(em|ex|px|in|cm|mm|pt|pc|%)*$/;var g={run:function(){if(this.get(k)){this._resume();}else{if(!this.get(d)){this._start();}}return this;},pause:function(){if(this.get(d)){this._pause();}return this;},stop:function(q){if(this.get(d)||this.get(k)){this._end(q);}return this;},_added:false,_start:function(){this._set(n,new Date()-this.get(l));this._actualFrames=0;if(!this.get(k)){this._initAnimAttr();}f[b.stamp(this)]=this;b.Anim._startTimer();this.fire(j);},_pause:function(){this._set(n,null);this._set(k,true);delete f[b.stamp(this)];this.fire("pause");},_resume:function(){this._set(k,false);f[b.stamp(this)]=this;this._set(n,new Date()-this.get(l));b.Anim._startTimer();this.fire("resume");},_end:function(q){var r=this.get("duration")*1000;if(q){this._runAttrs(r,r,this.get(o));}this._set(n,null);this._set(l,0);this._set(k,false);delete f[b.stamp(this)];this.fire(m,{elapsed:this.get(l)});},_runFrame:function(){var v=this._runtimeAttr.duration,s=new Date()-this.get(n),r=this.get(o),q=(s>=v),u,w;this._runAttrs(s,v,r);this._actualFrames+=1;this._set(l,s);this.fire(i);if(q){this._lastFrame();}},_runAttrs:function(B,A,x){var y=this._runtimeAttr,s=b.Anim.behaviors,z=y.easing,q=A,v=false,r,u,w;if(B>=A){v=true;}if(x){B=A-B;q=0;}for(w in y){if(y[w].to){r=y[w];u=(w in s&&"set" in s[w])?s[w].set:b.Anim.DEFAULT_SETTER;if(!v){u(this,w,r.from,r.to,B,A,z,r.unit);}else{u(this,w,r.from,r.to,q,A,z,r.unit);}}}},_lastFrame:function(){var q=this.get("iterations"),r=this.get(h);r+=1;if(q==="infinite"||r<q){if(this.get("direction")==="alternate"){this.set(o,!this.get(o));}this.fire("iteration");}else{r=0;this._end();}this._set(n,new Date());this._set(h,r);},_initAnimAttr:function(){var x=this.get("from")||{},w=this.get("to")||{},q={duration:this.get("duration")*1000,easing:this.get("easing")},s=b.Anim.behaviors,v=this.get(c),u,t,r;b.each(w,function(B,z){if(typeof B==="function"){B=B.call(this,v);}t=x[z];if(t===undefined){t=(z in s&&"get" in s[z])?s[z].get(this,z):b.Anim.DEFAULT_GETTER(this,z);}else{if(typeof t==="function"){t=t.call(this,v);}}var y=b.Anim.RE_UNITS.exec(t);var A=b.Anim.RE_UNITS.exec(B);t=y?y[1]:t;r=A?A[1]:B;u=A?A[2]:y?y[2]:"";if(!u&&b.Anim.RE_DEFAULT_UNIT.test(z)){u=b.Anim.DEFAULT_UNIT;}if(!t||!r){b.error('invalid "from" or "to" for "'+z+'"',"Anim");return;}q[z]={from:b.Lang.isObject(t)?b.clone(t):t,to:r,unit:u};},this);this._runtimeAttr=q;},_getOffset:function(r){var t=this._node,u=t.getComputedStyle(r),s=(r==="left")?"getX":"getY",v=(r==="left")?"setX":"setY";if(u==="auto"){var q=t.getStyle("position");if(q==="absolute"||q==="fixed"){u=t[s]();t[v](u);}else{u=0;}}return u;},destructor:function(){delete b.Anim._instances[b.stamp(this)];}};b.extend(b.Anim,b.Base,g);},"@VERSION@",{"requires":["base-base","node-style"]});