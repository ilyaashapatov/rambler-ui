(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{140:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),l=n(2),u=i(l),o=i(n(273)),r=i(n(576)),s=n(620);function i(e){return e&&e.__esModule?e:{default:e}}function c(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}var p=function(e){function t(){var e,n,a;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);for(var l=arguments.length,u=Array(l),o=0;o<l;o++)u[o]=arguments[o];return n=a=c(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),a.state={inputValue:"foo@ramber.ru",baseIsOpened:!1,customIsOpened:!1},a.openPopup=function(e){var t,n,l;a.setState((l=!0,(n=e+"IsOpened")in(t={})?Object.defineProperty(t,n,{value:l,enumerable:!0,configurable:!0,writable:!0}):t[n]=l,t))},a.closePopup=function(){a.setState({baseIsOpened:!1,customIsOpened:!1})},a.updateValue=function(e,t){a.setState({inputValue:t})},c(a,n)}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,l.Component),a(t,[{key:"render",value:function(){var e=this;return u.default.createElement("div",null,u.default.createElement(s.Popup,{title:"Удаление почты",showClose:!0,isOpened:this.state.baseIsOpened,okButton:u.default.createElement(o.default,{type:"primary",size:"small",onClick:this.closePopup},"Ок"),cancelButton:u.default.createElement(o.default,{type:"flat",size:"small",onClick:this.closePopup},"Нет"),onRequestClose:this.closePopup},"Вы готовы удалить почту"),u.default.createElement(s.Popup,{title:"Укажите почту",showClose:!0,isOpened:this.state.customIsOpened,backdropColor:"blue",okButton:u.default.createElement(o.default,{type:"primary",size:"small",onClick:this.closePopup},"Ок"),cancelButton:u.default.createElement(o.default,{type:"flat",size:"small",onClick:this.closePopup},"Отмена"),onRequestClose:this.closePopup},u.default.createElement("div",{style:{width:400}},u.default.createElement(r.default,{type:"password",autoFocus:!0,value:this.state.inputValue,onChange:this.updateValue}))),u.default.createElement("div",{style:{marginBottom:20}},u.default.createElement(o.default,{onClick:function(){return e.openPopup("base")}},"Базовый попап"),u.default.createElement(o.default,{type:"secondary",style:{marginLeft:20},onClick:function(){return e.openPopup("custom")}},"Попап произвольной ширины")),u.default.createElement("div",null,"this.state.baseIsOpened:"," ",u.default.createElement("b",null,this.state.baseIsOpened?"true":"false")),u.default.createElement("div",null,"this.state.customIsOpened:"," ",u.default.createElement("b",null,this.state.customIsOpened?"true":"false")),u.default.createElement("div",null,"this.state.inputValue: ",u.default.createElement("b",null,this.state.inputValue)))}}]),t}();t.default=p},578:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e};t.default=s;var l=o(n(2)),u=o(n(89));function o(e){return e&&e.__esModule?e:{default:e}}var r=l.default.createElement("path",{d:"M7.5 6.58L1.742.824a.4.4 0 0 0-.565 0l-.354.354a.4.4 0 0 0 0 .565L6.581 7.5.823 13.258a.4.4 0 0 0 0 .565l.354.354a.4.4 0 0 0 .565 0L7.5 8.419l5.758 5.758a.4.4 0 0 0 .565 0l.354-.354a.4.4 0 0 0 0-.565L8.419 7.5l5.758-5.758a.4.4 0 0 0 0-.565l-.354-.354a.4.4 0 0 0-.565 0L7.5 6.581z"});function s(e){return l.default.createElement(u.default,a({},e,{viewBox:"0 0 15 15"}),r)}s.displayName="ClearIcon"}}]);