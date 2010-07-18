YUI.add("event-flick",function(B){var F=("ontouchstart" in B.config.win&&!B.UA.chrome)?{start:"touchstart",end:"touchend"}:{start:"mousedown",end:"mouseup"},G="start",J="end",A="ownerDocument",H="minVelocity",D="minDistance",C="_fs",E="_fsh",K="_feh",I="nodeType";B.Event.define("flick",{on:function(M,L,O){var N=M.on(F[G],this._onStart,this,M,L,O);L[E]=N;},detach:function(N,M,P){var O=M[E],L=M[K];if(O){O.detach();M[E]=null;}if(L){L.detach();M[K]=null;}},processArgs:function(L){var M=(L[3])?B.merge(L.splice(3,1)[0]):{};if(!(H in M)){M.minVelocity=this.MIN_VELOCITY;}if(!(D in M)){M.minDistance=this.MIN_DISTANCE;}return M;},_onStart:function(R,N,M,Q){var S=true,L,P,O=R;if(R.touches){S=(R.touches.length===1);R=R.touches[0];}if(S){O.preventDefault();R.flick={time:new Date().getTime()};M[C]=R;L=M[K];if(!L){P=(N.get(I)===9)?N:N.get(A);L=P.on(F[J],B.bind(this._onEnd,this),null,N,M,Q);M[K]=L;}}},_onEnd:function(Y,S,Z,P){var X=new Date().getTime(),N=Z[C],L=!!N,a=Y,O,R,U,W,M,V,T,Q;if(L){if(Y.changedTouches){if(Y.changedTouches.length===1&&Y.touches.length===0){a=Y.changedTouches[0];}else{L=false;}}if(L){a.preventDefault();O=N.flick.time;X=new Date().getTime();R=X-O;U=Z._extra;W=[a.pageX-N.pageX,a.pageY-N.pageY];Q=U.axis||(Math.abs(W[0])>=Math.abs(W[1]))?"x":"y";M=W[(Q==="x")?0:1];V=Math.abs(M);T=V/R;if(isFinite(T)&&(V>=U.minDistance)&&(T>=U.minVelocity)){Y.type="flick";Y.flick={time:R,distance:M,direction:M/V,velocity:T,axis:Q,start:N};P.fire(Y);}Z[C]=null;}}},MIN_VELOCITY:0,MIN_DISTANCE:0});},"@VERSION@",{requires:["node-base","event-touch","event-synthetic"]});YUI.add("event-move",function(C){var G=("ontouchstart" in C.config.win&&!C.UA.chrome)?{start:"touchstart",move:"touchmove",end:"touchend"}:{start:"mousedown",move:"mousemove",end:"mouseup"},Q="start",T="move",F="end",S="_msh",I="_mh",P="_meh",L="_dmsh",J="_dmh",A="_dmeh",E="_ms",M="_m",R="minTime",N="minDistance",O="ownerDocument",K="nodeType",H=function(V,W){var U=(W)?4:3;return V[U]?C.merge(V.splice(U,1)[0]):{};},D=function(V,U){return U._extra.root||(V.get(K)===9)?V:V.get(O);},B=C.Event.define;B("gesturemovestart",{on:function(V,U,W){U[S]=V.on(G[Q],this._onStart,this,V,U,W);},delegate:function(W,V,Y,U){var X=this;V[L]=W.delegate(G[Q],function(Z){X._onStart(Z,W,V,Y,true);},U);},detachDelegate:function(W,V,Y,U){var X=V[L];if(X){X.detach();V[L]=null;}},detach:function(V,U,X){var W=U[S];if(W){W.detach();U[S]=null;}},processArgs:function(U,V){var W=H(U,V);if(!(R in W)){W[R]=this.MIN_TIME;}if(!(N in W)){W[N]=this.MIN_DISTANCE;}return W;},_onStart:function(a,W,h,V,d){a.preventDefault();if(d){W=a.currentTarget;}var b=a,X=h._extra,U=true,Y=X.minTime,g=X.minDistance,Z=X.button,f=D(W,h),c;if(a.touches){U=(a.touches.length===1);a=a.touches[0];a.target=a.target||b.target;a.currentTarget=a.currentTarget||b.currentTarget;}else{U=(Z===undefined)||(Z=a.button);}if(U){if(Y===0||g===0){this._start(a,W,V,X);}else{c=[a.pageX,a.pageY];if(Y>0){X._ht=C.later(Y,this,this._start,[a,W,V,X]);X._hme=f.on(G[F],C.bind(function(){this._cancel(X);},this));}if(g>0){X._hm=f.on(G[T],C.bind(function(e){if(Math.abs(e.pageX-c[0])>g||Math.abs(e.pageY-c[1])>g){this._start(a,W,V,X);}},this));}}}},_cancel:function(U){if(U._ht){U._ht.cancel();U._ht=null;}if(U._hme){U._hme.detach();U._hme=null;}if(U._hm){U._hm.detach();U._hm=null;}},_start:function(W,U,V,X){if(X){this._cancel(X);}W.type="gesturemovestart";U.setData(E,W);V.fire(W);},MIN_TIME:0,MIN_DISTANCE:0});B("gesturemove",{on:function(W,V,Y){var U=D(W,V),X=U.on(G[T],this._onMove,this,W,V,Y);V[I]=X;},delegate:function(W,V,Y,U){var X=this;V[J]=W.delegate(G[T],function(Z){X._onMove(Z,W,V,Y,true);},U);},detach:function(V,U,X){var W=U[I];if(W){W.detach();U[I]=null;}},detachDelegate:function(W,V,Y,U){var X=V[J];if(X){X.detach();V[J]=null;}},processArgs:H,_onMove:function(a,X,W,Z,V){if(V){X=a.currentTarget;}var U=W._extra.standAlone||X.getData(E),Y=a;if(U){if(a.touches){U=(a.touches.length===1);a=a.touches[0];a.target=a.target||Y.target;a.currentTarget=a.currentTarget||Y.currentTarget;}if(U){Y.preventDefault();a.type="gesturemove";Z.fire(a);}}}});B("gesturemoveend",{on:function(X,W,Y){var V=D(X,W),U=V.on(G[F],this._onEnd,this,X,W,Y);W[P]=U;},delegate:function(W,V,Y,U){var X=this;V[A]=W.delegate(G[F],function(Z){X._onEnd(Z,W,V,Y,true);},U);},detachDelegate:function(W,V,Y,U){var X=V[A];if(X){X.detach();V[A]=null;}},detach:function(W,V,X){var U=V[P];if(U){U.detach();V[P]=null;}},processArgs:H,_onEnd:function(a,W,V,Z,U){if(U){W=a.currentTarget;}var Y=V._extra.standAlone||W.getData(M)||W.getData(E),X=a;if(Y){if(a.changedTouches){if(a.changedTouches.length===1){a=a.changedTouches[0];a.target=a.target||X.target;a.currentTarget=a.currentTarget||X.currentTarget;}else{Y=false;}}if(Y){X.preventDefault();a.type="gesturemoveend";Z.fire(a);W.clearData(E);W.clearData(M);}}}});},"@VERSION@",{requires:["node-base","event-touch","event-synthetic"]});YUI.add("event-gestures",function(A){},"@VERSION@",{use:["event-flick","event-move"]});