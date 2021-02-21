(this.webpackJsonpsea_battle_game=this.webpackJsonpsea_battle_game||[]).push([[0],{12:function(e,t,n){},13:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r,a=n(1),s=n.n(a),i=n(7),c=n.n(i),u=(n(12),n(13),n(2)),o=n(3),l=n(5),h=n(4),d=n(0),v=64,m=[],f=[],j="player",p=[],b="";function O(e){var t="square",n="player"===e.name?m:f;return"player"===e.name&&(t="square computer",isNaN(n.find((function(t){return t===e.index})))||(t+=" colorize")),Object(d.jsx)("button",{className:t,onClick:e.onClick,children:e.value})}var y=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(u.a)(this,n),(r=t.call(this,e)).state={squares:Array(v).fill(null),countMove:v,countDestroy:8},r}return Object(o.a)(n,[{key:"handleClick",value:function(e){if(j!==this.props.name){var t=this.state.squares.slice();if(k(this.state.squares,this.props.name))document.querySelector(".statusWin").style.display="block",b="player"===this.props.name?"\u041f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435!":"\u041f\u043e\u0431\u0435\u0434\u0430!";!this.state.countMove||t[e]||k(this.state.squares,this.props.name)?p=[]:(this.state.countMove?t[e]=isNaN(r.find((function(t){return t===e})))?"-":"+":t[e]=null,this.setState({squares:t,countMove:this.state.countMove-1}),"+"===t[e]?this.setState({countDestroy:this.state.countDestroy-1}):j=this.props.name)}}},{key:"renderSquare",value:function(e){var t=this;return Object(d.jsx)(O,{value:this.state.squares[e],onClick:function(){return t.handleClick(e)},index:e,name:this.props.name})}},{key:"createSquare",value:function(e){var t=e;return Object(d.jsxs)("div",{className:"board-row",children:[this.renderSquare(t++),this.renderSquare(t++),this.renderSquare(t++),this.renderSquare(t++),this.renderSquare(t++),this.renderSquare(t++),this.renderSquare(t++),this.renderSquare(t)]})}},{key:"render",value:function(){var e;return e=k(this.state.squares,this.props.name)?"\u041f\u041e\u0411\u0415\u0414\u0410!!!":this.state.countMove?"\u041e\u0441\u0442\u0430\u043b\u043e\u0441\u044c \u0445\u043e\u0434\u043e\u0432: "+this.state.countMove:"\u0422\u044b \u043f\u0440\u043e\u0438\u0433\u0440\u0430\u043b",Object(d.jsx)("div",{className:"container_area",children:Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"status1",children:e}),Object(d.jsxs)("div",{className:"status2",children:["\u041e\u0441\u0442\u0430\u043b\u043e\u0441\u044c \u0443\u043d\u0438\u0447\u0442\u043e\u0436\u0438\u0442\u044c: ",this.state.countDestroy]}),Object(d.jsxs)("div",{id:"area",children:[this.createSquare(0),"    ",this.createSquare(8),this.createSquare(16),this.createSquare(24),this.createSquare(32),this.createSquare(40),this.createSquare(48),this.createSquare(56)]}),Object(d.jsx)("div",{className:"namePlayer",children:this.props.name})]})})}}]),n}(s.a.Component),q=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(u.a)(this,n),(r=t.call(this,e)).state={date:new Date},r}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.tick()}),100)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tick",value:function(){this.setState({date:new Date})}},{key:"render",value:function(){return Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{className:"statusWin",children:b}),Object(d.jsxs)("div",{className:"nextGamer",children:["\u0421\u043b\u0435\u0434\u0443\u044e\u0449\u0438\u0439 \u0445\u043e\u0434: ",j]})]})}}]),n}(a.Component);function k(e,t){var n="player"===t?m:f;n.length||function(e){for(var t,n=[],r=0;r<8;)(t=Math.floor(Math.random()*Math.floor(63)))!=n.find((function(e){return e===t}))&&(n.push(t),r++);"player"===e?m=n:f=n}(t);var a=new Array(v);n.forEach((function(e){return a[e]="+"}));var s=0;r=a.map((function(e,t){return e?t:null}));for(var i=0;i<a.length;i++)e[i]&&a[i]&&s++;return s===a.reduce((function(e,t){return t?e+1:e}),0)||null}var S=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var r;return Object(u.a)(this,n),(r=t.call(this,e)).state={date:new Date},r}return Object(o.a)(n,[{key:"componentDidMount",value:function(){var e=this;this.timerID=setInterval((function(){return e.handleComp(),e.tick()}),1e3)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timerID)}},{key:"tick",value:function(){this.setState({date:new Date})}},{key:"handleComp",value:function(){"computer"==j&&document.querySelectorAll(".computer")[function(){var e;e=Math.floor(Math.random()*Math.floor(63));for(;e===p.find((function(t){return t===e}));)e=Math.floor(Math.random()*Math.floor(63));return p.push(e),e}()].click()}},{key:"render",value:function(){return Object(d.jsxs)("div",{className:"game",children:[Object(d.jsx)(q,{}),Object(d.jsxs)("div",{className:"game-board",children:[Object(d.jsx)(y,{name:"player"}),Object(d.jsx)(y,{name:"computer"})]})]})}}]),n}(a.Component);var x=function(){return Object(d.jsx)(S,{})},M=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,16)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,s=t.getLCP,i=t.getTTFB;n(e),r(e),a(e),s(e),i(e)}))};c.a.render(Object(d.jsxs)(s.a.StrictMode,{children:[Object(d.jsx)("div",{className:"nameGame",children:"\u041c\u043e\u0440\u0441\u043a\u043e\u0439 \u0431\u043e\u0439 (\u043e\u0434\u0438\u043d\u043e\u0447\u043d\u044b\u0435 \u043a\u043e\u0440\u0430\u0431\u043b\u0438)"}),Object(d.jsx)(x,{}),Object(d.jsx)("button",{id:"reload",onClick:function(){document.location.reload()},children:"\u041d\u0430\u0447\u0430\u0442\u044c \u0437\u0430\u043d\u043e\u0432\u043e"})]}),document.getElementById("root")),M()}},[[15,1,2]]]);
//# sourceMappingURL=main.440cfe10.chunk.js.map