/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(30)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssridKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var require;var require;var require;var require;var require;var require;// OpenLayers 3. See http://openlayers.org/
// License: https://raw.githubusercontent.com/openlayers/ol3/master/LICENSE.md
// Version: v3.11.1

(function (root, factory) {
  if (true) {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define([], factory);
  } else {
    root.ol = factory();
  }
}(this, function () {
  var OPENLAYERS = {};
  var l,aa=aa||{},ba=this;function ca(b){return void 0!==b}function u(b,c,d){b=b.split(".");d=d||ba;b[0]in d||!d.execScript||d.execScript("var "+b[0]);for(var e;b.length&&(e=b.shift());)!b.length&&ca(c)?d[e]=c:d[e]?d=d[e]:d=d[e]={}}function da(){}function ea(b){b.Yb=function(){return b.Ng?b.Ng:b.Ng=new b}}
function fa(b){var c=typeof b;if("object"==c)if(b){if(b instanceof Array)return"array";if(b instanceof Object)return c;var d=Object.prototype.toString.call(b);if("[object Window]"==d)return"object";if("[object Array]"==d||"number"==typeof b.length&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return"array";if("[object Function]"==d||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return"function"}else return"null";
else if("function"==c&&"undefined"==typeof b.call)return"object";return c}function ga(b){return"array"==fa(b)}function ha(b){var c=fa(b);return"array"==c||"object"==c&&"number"==typeof b.length}function ia(b){return"string"==typeof b}function ja(b){return"number"==typeof b}function ka(b){return"function"==fa(b)}function ma(b){var c=typeof b;return"object"==c&&null!=b||"function"==c}function w(b){return b[na]||(b[na]=++oa)}var na="closure_uid_"+(1E9*Math.random()>>>0),oa=0;
function pa(b,c,d){return b.call.apply(b.bind,arguments)}function qa(b,c,d){if(!b)throw Error();if(2<arguments.length){var e=Array.prototype.slice.call(arguments,2);return function(){var d=Array.prototype.slice.call(arguments);Array.prototype.unshift.apply(d,e);return b.apply(c,d)}}return function(){return b.apply(c,arguments)}}function ra(b,c,d){ra=Function.prototype.bind&&-1!=Function.prototype.bind.toString().indexOf("native code")?pa:qa;return ra.apply(null,arguments)}
function sa(b,c){var d=Array.prototype.slice.call(arguments,1);return function(){var c=d.slice();c.push.apply(c,arguments);return b.apply(this,c)}}var ta=Date.now||function(){return+new Date};function y(b,c){function d(){}d.prototype=c.prototype;b.da=c.prototype;b.prototype=new d;b.prototype.constructor=b;b.zp=function(b,d,g){for(var h=Array(arguments.length-2),k=2;k<arguments.length;k++)h[k-2]=arguments[k];return c.prototype[d].apply(b,h)}};var ua,va;function wa(){};function xa(b){if(Error.captureStackTrace)Error.captureStackTrace(this,xa);else{var c=Error().stack;c&&(this.stack=c)}b&&(this.message=String(b))}y(xa,Error);xa.prototype.name="CustomError";var ya;function Aa(b,c){var d=b.length-c.length;return 0<=d&&b.indexOf(c,d)==d}function Ba(b,c){for(var d=b.split("%s"),e="",f=Array.prototype.slice.call(arguments,1);f.length&&1<d.length;)e+=d.shift()+f.shift();return e+d.join("%s")}var Ca=String.prototype.trim?function(b){return b.trim()}:function(b){return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g,"")};
function Da(b){if(!Fa.test(b))return b;-1!=b.indexOf("&")&&(b=b.replace(Ga,"&amp;"));-1!=b.indexOf("<")&&(b=b.replace(Ha,"&lt;"));-1!=b.indexOf(">")&&(b=b.replace(Ia,"&gt;"));-1!=b.indexOf('"')&&(b=b.replace(Ja,"&quot;"));-1!=b.indexOf("'")&&(b=b.replace(La,"&#39;"));-1!=b.indexOf("\x00")&&(b=b.replace(Ma,"&#0;"));return b}var Ga=/&/g,Ha=/</g,Ia=/>/g,Ja=/"/g,La=/'/g,Ma=/\x00/g,Fa=/[\x00&<>"']/,Na=String.prototype.repeat?function(b,c){return b.repeat(c)}:function(b,c){return Array(c+1).join(b)};
function Oa(b){b=ca(void 0)?b.toFixed(void 0):String(b);var c=b.indexOf(".");-1==c&&(c=b.length);return Na("0",Math.max(0,2-c))+b}
function Pa(b,c){for(var d=0,e=Ca(String(b)).split("."),f=Ca(String(c)).split("."),g=Math.max(e.length,f.length),h=0;0==d&&h<g;h++){var k=e[h]||"",m=f[h]||"",n=RegExp("(\\d*)(\\D*)","g"),p=RegExp("(\\d*)(\\D*)","g");do{var q=n.exec(k)||["","",""],r=p.exec(m)||["","",""];if(0==q[0].length&&0==r[0].length)break;d=Qa(0==q[1].length?0:parseInt(q[1],10),0==r[1].length?0:parseInt(r[1],10))||Qa(0==q[2].length,0==r[2].length)||Qa(q[2],r[2])}while(0==d)}return d}function Qa(b,c){return b<c?-1:b>c?1:0};function Sa(b,c,d){return Math.min(Math.max(b,c),d)}var Ta=function(){var b;"cosh"in Math?b=Math.cosh:b=function(b){b=Math.exp(b);return(b+1/b)/2};return b}();function Ua(b,c,d,e,f,g){var h=f-d,k=g-e;if(0!==h||0!==k){var m=((b-d)*h+(c-e)*k)/(h*h+k*k);1<m?(d=f,e=g):0<m&&(d+=h*m,e+=k*m)}return Va(b,c,d,e)}function Va(b,c,d,e){b=d-b;c=e-c;return b*b+c*c}function Wa(b){return b*Math.PI/180};function Xa(b){return function(c){if(c)return[Sa(c[0],b[0],b[2]),Sa(c[1],b[1],b[3])]}}function Ya(b){return b};var Za=Array.prototype;function $a(b,c){return Za.indexOf.call(b,c,void 0)}function ab(b,c){Za.forEach.call(b,c,void 0)}function bb(b,c){return Za.filter.call(b,c,void 0)}function db(b,c){return Za.map.call(b,c,void 0)}function eb(b,c){return Za.some.call(b,c,void 0)}function fb(b,c){var d=gb(b,c,void 0);return 0>d?null:ia(b)?b.charAt(d):b[d]}function gb(b,c,d){for(var e=b.length,f=ia(b)?b.split(""):b,g=0;g<e;g++)if(g in f&&c.call(d,f[g],g,b))return g;return-1}
function hb(b,c){var d=$a(b,c),e;(e=0<=d)&&Za.splice.call(b,d,1);return e}function ib(b){return Za.concat.apply(Za,arguments)}function jb(b){var c=b.length;if(0<c){for(var d=Array(c),e=0;e<c;e++)d[e]=b[e];return d}return[]}function lb(b,c){for(var d=1;d<arguments.length;d++){var e=arguments[d];if(ha(e)){var f=b.length||0,g=e.length||0;b.length=f+g;for(var h=0;h<g;h++)b[f+h]=e[h]}else b.push(e)}}function mb(b,c,d,e){Za.splice.apply(b,nb(arguments,1))}
function nb(b,c,d){return 2>=arguments.length?Za.slice.call(b,c):Za.slice.call(b,c,d)}function ob(b,c){b.sort(c||pb)}function qb(b){for(var c=rb,d=0;d<b.length;d++)b[d]={index:d,value:b[d]};var e=c||pb;ob(b,function(b,c){return e(b.value,c.value)||b.index-c.index});for(d=0;d<b.length;d++)b[d]=b[d].value}function sb(b,c){if(!ha(b)||!ha(c)||b.length!=c.length)return!1;for(var d=b.length,e=tb,f=0;f<d;f++)if(!e(b[f],c[f]))return!1;return!0}function pb(b,c){return b>c?1:b<c?-1:0}
function tb(b,c){return b===c}function ub(b){for(var c=[],d=0;d<arguments.length;d++){var e=arguments[d];if(ga(e))for(var f=0;f<e.length;f+=8192)for(var g=nb(e,f,f+8192),g=ub.apply(null,g),h=0;h<g.length;h++)c.push(g[h]);else c.push(e)}return c};function vb(b,c){return 0<=b.indexOf(c)}function wb(b,c,d){var e=b.length;if(b[0]<=c)return 0;if(!(c<=b[e-1]))if(0<d)for(d=1;d<e;++d){if(b[d]<c)return d-1}else if(0>d)for(d=1;d<e;++d){if(b[d]<=c)return d}else for(d=1;d<e;++d){if(b[d]==c)return d;if(b[d]<c)return b[d-1]-c<c-b[d]?d-1:d}return e-1};function xb(b){return function(c,d,e){if(void 0!==c)return c=wb(b,c,e),c=Sa(c+d,0,b.length-1),b[c]}}function yb(b,c,d){return function(e,f,g){if(void 0!==e)return e=Math.max(Math.floor(Math.log(c/e)/Math.log(b)+(0<g?0:0>g?1:.5))+f,0),void 0!==d&&(e=Math.min(e,d)),c/Math.pow(b,e)}};function zb(b){if(void 0!==b)return 0}function Ab(b,c){if(void 0!==b)return b+c}function Bb(b){var c=2*Math.PI/b;return function(b,e){if(void 0!==b)return b=Math.floor((b+e)/c+.5)*c}}function Cb(){var b=Wa(5);return function(c,d){if(void 0!==c)return Math.abs(c+d)<=b?0:c+d}};function Db(b,c,d){this.center=b;this.resolution=c;this.rotation=d};var Eb;a:{var Fb=ba.navigator;if(Fb){var Gb=Fb.userAgent;if(Gb){Eb=Gb;break a}}Eb=""}function Hb(b){return-1!=Eb.indexOf(b)};function Ib(b,c,d){for(var e in b)c.call(d,b[e],e,b)}function Jb(b,c){for(var d in b)if(c.call(void 0,b[d],d,b))return!0;return!1}function Kb(b){var c=0,d;for(d in b)c++;return c}function Lb(b){var c=[],d=0,e;for(e in b)c[d++]=b[e];return c}function Mb(b){var c=[],d=0,e;for(e in b)c[d++]=e;return c}function Nb(b,c){return c in b}function Ob(b,c){for(var d in b)if(b[d]==c)return!0;return!1}function Pb(b,c){for(var d in b)if(c.call(void 0,b[d],d,b))return d}
function Qb(b){for(var c in b)return!1;return!0}function Rb(b){for(var c in b)delete b[c]}function Sb(b,c,d){return c in b?b[c]:d}function Tb(b,c){var d=[];return c in b?b[c]:b[c]=d}function Ub(b){var c={},d;for(d in b)c[d]=b[d];return c}function Vb(b){var c=fa(b);if("object"==c||"array"==c){if(ka(b.clone))return b.clone();var c="array"==c?[]:{},d;for(d in b)c[d]=Vb(b[d]);return c}return b}var Wb="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
function Xb(b,c){for(var d,e,f=1;f<arguments.length;f++){e=arguments[f];for(d in e)b[d]=e[d];for(var g=0;g<Wb.length;g++)d=Wb[g],Object.prototype.hasOwnProperty.call(e,d)&&(b[d]=e[d])}};var Yb=Hb("Opera")||Hb("OPR"),Zb=Hb("Trident")||Hb("MSIE"),$b=Hb("Edge"),ac=Hb("Gecko")&&!(-1!=Eb.toLowerCase().indexOf("webkit")&&!Hb("Edge"))&&!(Hb("Trident")||Hb("MSIE"))&&!Hb("Edge"),bc=-1!=Eb.toLowerCase().indexOf("webkit")&&!Hb("Edge"),cc=Hb("Macintosh"),dc=Hb("Windows"),ec=Hb("Linux")||Hb("CrOS");function fc(){var b=Eb;if(ac)return/rv\:([^\);]+)(\)|;)/.exec(b);if($b)return/Edge\/([\d\.]+)/.exec(b);if(Zb)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(b);if(bc)return/WebKit\/(\S+)/.exec(b)}
function gc(){var b=ba.document;return b?b.documentMode:void 0}var hc=function(){if(Yb&&ba.opera){var b;var c=ba.opera.version;try{b=c()}catch(d){b=c}return b}b="";(c=fc())&&(b=c?c[1]:"");return Zb&&(c=gc(),c>parseFloat(b))?String(c):b}(),ic={};function jc(b){return ic[b]||(ic[b]=0<=Pa(hc,b))}var kc=ba.document,lc=kc&&Zb?gc()||("CSS1Compat"==kc.compatMode?parseInt(hc,10):5):void 0;var mc=!Zb||9<=lc,nc=!Zb||9<=lc,oc=Zb&&!jc("9");!bc||jc("528");ac&&jc("1.9b")||Zb&&jc("8")||Yb&&jc("9.5")||bc&&jc("528");ac&&!jc("8")||Zb&&jc("9");function pc(){0!=qc&&(rc[w(this)]=this);this.ia=this.ia;this.oa=this.oa}var qc=0,rc={};pc.prototype.ia=!1;pc.prototype.Ec=function(){if(!this.ia&&(this.ia=!0,this.X(),0!=qc)){var b=w(this);delete rc[b]}};function tc(b,c){var d=sa(uc,c);b.ia?d.call(void 0):(b.oa||(b.oa=[]),b.oa.push(ca(void 0)?ra(d,void 0):d))}pc.prototype.X=function(){if(this.oa)for(;this.oa.length;)this.oa.shift()()};function uc(b){b&&"function"==typeof b.Ec&&b.Ec()};function vc(b,c){this.type=b;this.g=this.target=c;this.i=!1;this.Qh=!0}vc.prototype.b=function(){this.i=!0};vc.prototype.preventDefault=function(){this.Qh=!1};function wc(b){b.b()}function xc(b){b.preventDefault()};var yc=Zb?"focusout":"DOMFocusOut";function zc(b){zc[" "](b);return b}zc[" "]=da;function Ac(b,c){vc.call(this,b?b.type:"");this.relatedTarget=this.g=this.target=null;this.u=this.j=this.button=this.screenY=this.screenX=this.clientY=this.clientX=this.offsetY=this.offsetX=0;this.A=this.f=this.c=this.B=!1;this.state=null;this.l=!1;this.a=null;if(b){var d=this.type=b.type,e=b.changedTouches?b.changedTouches[0]:null;this.target=b.target||b.srcElement;this.g=c;var f=b.relatedTarget;if(f){if(ac){var g;a:{try{zc(f.nodeName);g=!0;break a}catch(h){}g=!1}g||(f=null)}}else"mouseover"==d?
f=b.fromElement:"mouseout"==d&&(f=b.toElement);this.relatedTarget=f;null===e?(this.offsetX=bc||void 0!==b.offsetX?b.offsetX:b.layerX,this.offsetY=bc||void 0!==b.offsetY?b.offsetY:b.layerY,this.clientX=void 0!==b.clientX?b.clientX:b.pageX,this.clientY=void 0!==b.clientY?b.clientY:b.pageY,this.screenX=b.screenX||0,this.screenY=b.screenY||0):(this.clientX=void 0!==e.clientX?e.clientX:e.pageX,this.clientY=void 0!==e.clientY?e.clientY:e.pageY,this.screenX=e.screenX||0,this.screenY=e.screenY||0);this.button=
b.button;this.j=b.keyCode||0;this.u=b.charCode||("keypress"==d?b.keyCode:0);this.B=b.ctrlKey;this.c=b.altKey;this.f=b.shiftKey;this.A=b.metaKey;this.l=cc?b.metaKey:b.ctrlKey;this.state=b.state;this.a=b;b.defaultPrevented&&this.preventDefault()}}y(Ac,vc);var Bc=[1,4,2];function Cc(b){return(mc?0==b.a.button:"click"==b.type?!0:!!(b.a.button&Bc[0]))&&!(bc&&cc&&b.B)}Ac.prototype.b=function(){Ac.da.b.call(this);this.a.stopPropagation?this.a.stopPropagation():this.a.cancelBubble=!0};
Ac.prototype.preventDefault=function(){Ac.da.preventDefault.call(this);var b=this.a;if(b.preventDefault)b.preventDefault();else if(b.returnValue=!1,oc)try{if(b.ctrlKey||112<=b.keyCode&&123>=b.keyCode)b.keyCode=-1}catch(c){}};var Dc="closure_listenable_"+(1E6*Math.random()|0);function Ec(b){return!(!b||!b[Dc])}var Fc=0;function Gc(b,c,d,e,f){this.listener=b;this.a=null;this.src=c;this.type=d;this.ad=!!e;this.je=f;this.key=++Fc;this.Tc=this.Ud=!1}function Hc(b){b.Tc=!0;b.listener=null;b.a=null;b.src=null;b.je=null};function Ic(b){this.src=b;this.a={};this.c=0}Ic.prototype.add=function(b,c,d,e,f){var g=b.toString();b=this.a[g];b||(b=this.a[g]=[],this.c++);var h=Jc(b,c,e,f);-1<h?(c=b[h],d||(c.Ud=!1)):(c=new Gc(c,this.src,g,!!e,f),c.Ud=d,b.push(c));return c};Ic.prototype.remove=function(b,c,d,e){b=b.toString();if(!(b in this.a))return!1;var f=this.a[b];c=Jc(f,c,d,e);return-1<c?(Hc(f[c]),Za.splice.call(f,c,1),0==f.length&&(delete this.a[b],this.c--),!0):!1};
function Kc(b,c){var d=c.type;if(!(d in b.a))return!1;var e=hb(b.a[d],c);e&&(Hc(c),0==b.a[d].length&&(delete b.a[d],b.c--));return e}function Lc(b,c,d,e,f){b=b.a[c.toString()];c=-1;b&&(c=Jc(b,d,e,f));return-1<c?b[c]:null}function Mc(b,c,d){var e=ca(c),f=e?c.toString():"",g=ca(d);return Jb(b.a,function(b){for(var c=0;c<b.length;++c)if(!(e&&b[c].type!=f||g&&b[c].ad!=d))return!0;return!1})}
function Jc(b,c,d,e){for(var f=0;f<b.length;++f){var g=b[f];if(!g.Tc&&g.listener==c&&g.ad==!!d&&g.je==e)return f}return-1};var Nc="closure_lm_"+(1E6*Math.random()|0),Oc={},Pc=0;function C(b,c,d,e,f){if(ga(c)){for(var g=0;g<c.length;g++)C(b,c[g],d,e,f);return null}d=Qc(d);return Ec(b)?b.Qa(c,d,e,f):Sc(b,c,d,!1,e,f)}
function Sc(b,c,d,e,f,g){if(!c)throw Error("Invalid event type");var h=!!f,k=Tc(b);k||(b[Nc]=k=new Ic(b));d=k.add(c,d,e,f,g);if(d.a)return d;e=Uc();d.a=e;e.src=b;e.listener=d;if(b.addEventListener)b.addEventListener(c.toString(),e,h);else if(b.attachEvent)b.attachEvent(Vc(c.toString()),e);else throw Error("addEventListener and attachEvent are unavailable.");Pc++;return d}
function Uc(){var b=Wc,c=nc?function(d){return b.call(c.src,c.listener,d)}:function(d){d=b.call(c.src,c.listener,d);if(!d)return d};return c}function Xc(b,c,d,e,f){if(ga(c)){for(var g=0;g<c.length;g++)Xc(b,c[g],d,e,f);return null}d=Qc(d);return Ec(b)?b.zb.add(String(c),d,!0,e,f):Sc(b,c,d,!0,e,f)}function Yc(b,c,d,e,f){if(ga(c))for(var g=0;g<c.length;g++)Yc(b,c[g],d,e,f);else d=Qc(d),Ec(b)?b.Vf(c,d,e,f):b&&(b=Tc(b))&&(c=Lc(b,c,d,!!e,f))&&Zc(c)}
function Zc(b){if(ja(b)||!b||b.Tc)return!1;var c=b.src;if(Ec(c))return Kc(c.zb,b);var d=b.type,e=b.a;c.removeEventListener?c.removeEventListener(d,e,b.ad):c.detachEvent&&c.detachEvent(Vc(d),e);Pc--;(d=Tc(c))?(Kc(d,b),0==d.c&&(d.src=null,c[Nc]=null)):Hc(b);return!0}function Vc(b){return b in Oc?Oc[b]:Oc[b]="on"+b}function $c(b,c,d,e){var f=!0;if(b=Tc(b))if(c=b.a[c.toString()])for(c=c.concat(),b=0;b<c.length;b++){var g=c[b];g&&g.ad==d&&!g.Tc&&(g=ad(g,e),f=f&&!1!==g)}return f}
function ad(b,c){var d=b.listener,e=b.je||b.src;b.Ud&&Zc(b);return d.call(e,c)}
function Wc(b,c){if(b.Tc)return!0;if(!nc){var d;if(!(d=c))a:{d=["window","event"];for(var e=ba,f;f=d.shift();)if(null!=e[f])e=e[f];else{d=null;break a}d=e}f=d;d=new Ac(f,this);e=!0;if(!(0>f.keyCode||void 0!=f.returnValue)){a:{var g=!1;if(0==f.keyCode)try{f.keyCode=-1;break a}catch(m){g=!0}if(g||void 0==f.returnValue)f.returnValue=!0}f=[];for(g=d.g;g;g=g.parentNode)f.push(g);for(var g=b.type,h=f.length-1;!d.i&&0<=h;h--){d.g=f[h];var k=$c(f[h],g,!0,d),e=e&&k}for(h=0;!d.i&&h<f.length;h++)d.g=f[h],k=
$c(f[h],g,!1,d),e=e&&k}return e}return ad(b,new Ac(c,this))}function Tc(b){b=b[Nc];return b instanceof Ic?b:null}var bd="__closure_events_fn_"+(1E9*Math.random()>>>0);function Qc(b){if(ka(b))return b;b[bd]||(b[bd]=function(c){return b.handleEvent(c)});return b[bd]};function cd(){pc.call(this);this.zb=new Ic(this);this.Nd=this;this.eb=null}y(cd,pc);cd.prototype[Dc]=!0;l=cd.prototype;l.addEventListener=function(b,c,d,e){C(this,b,c,d,e)};l.removeEventListener=function(b,c,d,e){Yc(this,b,c,d,e)};
l.o=function(b){var c,d=this.eb;if(d)for(c=[];d;d=d.eb)c.push(d);var d=this.Nd,e=b.type||b;if(ia(b))b=new vc(b,d);else if(b instanceof vc)b.target=b.target||d;else{var f=b;b=new vc(e,d);Xb(b,f)}var f=!0,g;if(c)for(var h=c.length-1;!b.i&&0<=h;h--)g=b.g=c[h],f=dd(g,e,!0,b)&&f;b.i||(g=b.g=d,f=dd(g,e,!0,b)&&f,b.i||(f=dd(g,e,!1,b)&&f));if(c)for(h=0;!b.i&&h<c.length;h++)g=b.g=c[h],f=dd(g,e,!1,b)&&f;return f};
l.X=function(){cd.da.X.call(this);if(this.zb){var b=this.zb,c=0,d;for(d in b.a){for(var e=b.a[d],f=0;f<e.length;f++)++c,Hc(e[f]);delete b.a[d];b.c--}}this.eb=null};l.Qa=function(b,c,d,e){return this.zb.add(String(b),c,!1,d,e)};l.Vf=function(b,c,d,e){return this.zb.remove(String(b),c,d,e)};
function dd(b,c,d,e){c=b.zb.a[String(c)];if(!c)return!0;c=c.concat();for(var f=!0,g=0;g<c.length;++g){var h=c[g];if(h&&!h.Tc&&h.ad==d){var k=h.listener,m=h.je||h.src;h.Ud&&Kc(b.zb,h);f=!1!==k.call(m,e)&&f}}return f&&0!=e.Qh}function ed(b,c,d){return Mc(b.zb,ca(c)?String(c):void 0,d)};function fd(){cd.call(this);this.c=0}y(fd,cd);function gd(b){Zc(b)}l=fd.prototype;l.s=function(){++this.c;this.o("change")};l.L=function(){return this.c};l.H=function(b,c,d){return C(this,b,c,!1,d)};l.M=function(b,c,d){return Xc(this,b,c,!1,d)};l.K=function(b,c,d){Yc(this,b,c,!1,d)};l.N=gd;function hd(b,c,d){vc.call(this,b);this.key=c;this.oldValue=d}y(hd,vc);function id(b){fd.call(this);w(this);this.B={};void 0!==b&&this.I(b)}y(id,fd);var jd={};function kd(b){return jd.hasOwnProperty(b)?jd[b]:jd[b]="change:"+b}l=id.prototype;l.get=function(b){var c;this.B.hasOwnProperty(b)&&(c=this.B[b]);return c};l.O=function(){return Object.keys(this.B)};l.P=function(){var b={},c;for(c in this.B)b[c]=this.B[c];return b};
function ld(b,c,d){var e;e=kd(c);b.o(new hd(e,c,d));b.o(new hd("propertychange",c,d))}l.set=function(b,c,d){d?this.B[b]=c:(d=this.B[b],this.B[b]=c,ld(this,b,d))};l.I=function(b,c){for(var d in b)this.set(d,b[d],c)};l.R=function(b,c){if(b in this.B){var d=this.B[b];delete this.B[b];c||ld(this,b,d)}};function md(b,c,d){void 0===d&&(d=[0,0]);d[0]=b[0]+2*c;d[1]=b[1]+2*c;return d}function nd(b,c,d){void 0===d&&(d=[0,0]);d[0]=b[0]*c+.5|0;d[1]=b[1]*c+.5|0;return d}function od(b,c){if(ga(b))return b;void 0===c?c=[b,b]:(c[0]=b,c[1]=b);return c};function pd(b,c){var d=b%c;return 0>d*c?d+c:d}function qd(b,c,d){return b+d*(c-b)};function rd(b,c){b[0]+=c[0];b[1]+=c[1];return b}function sd(b,c){var d=b[0],e=b[1],f=c[0],g=c[1],h=f[0],f=f[1],k=g[0],g=g[1],m=k-h,n=g-f,d=0===m&&0===n?0:(m*(d-h)+n*(e-f))/(m*m+n*n||0);0>=d||(1<=d?(h=k,f=g):(h+=d*m,f+=d*n));return[h,f]}function td(b,c){var d=pd(b+180,360)-180,e=Math.abs(Math.round(3600*d));return Math.floor(e/3600)+"\u00b0 "+Oa(Math.floor(e/60%60))+"\u2032 "+Oa(Math.floor(e%60))+"\u2033 "+c.charAt(0>d?1:0)}
function ud(b,c,d){return b?c.replace("{x}",b[0].toFixed(d)).replace("{y}",b[1].toFixed(d)):""}function vd(b,c){for(var d=!0,e=b.length-1;0<=e;--e)if(b[e]!=c[e]){d=!1;break}return d}function wd(b,c){var d=Math.cos(c),e=Math.sin(c),f=b[1]*d+b[0]*e;b[0]=b[0]*d-b[1]*e;b[1]=f;return b}function xd(b,c){var d=b[0]-c[0],e=b[1]-c[1];return d*d+e*e}function yd(b,c){return xd(b,sd(b,c))}function zd(b,c){return ud(b,"{x}, {y}",c)};function Ad(b){this.length=b.length||b;for(var c=0;c<this.length;c++)this[c]=b[c]||0}Ad.prototype.a=4;Ad.prototype.set=function(b,c){c=c||0;for(var d=0;d<b.length&&c+d<this.length;d++)this[c+d]=b[d]};Ad.prototype.toString=Array.prototype.join;"undefined"==typeof Float32Array&&(Ad.BYTES_PER_ELEMENT=4,Ad.prototype.BYTES_PER_ELEMENT=Ad.prototype.a,Ad.prototype.set=Ad.prototype.set,Ad.prototype.toString=Ad.prototype.toString,u("Float32Array",Ad,void 0));function Bd(b){this.length=b.length||b;for(var c=0;c<this.length;c++)this[c]=b[c]||0}Bd.prototype.a=8;Bd.prototype.set=function(b,c){c=c||0;for(var d=0;d<b.length&&c+d<this.length;d++)this[c+d]=b[d]};Bd.prototype.toString=Array.prototype.join;if("undefined"==typeof Float64Array){try{Bd.BYTES_PER_ELEMENT=8}catch(b){}Bd.prototype.BYTES_PER_ELEMENT=Bd.prototype.a;Bd.prototype.set=Bd.prototype.set;Bd.prototype.toString=Bd.prototype.toString;u("Float64Array",Bd,void 0)};function Cd(b,c,d,e,f){b[0]=c;b[1]=d;b[2]=e;b[3]=f};function Dd(){var b=Array(16);Ed(b,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);return b}function Fd(){var b=Array(16);Ed(b,1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1);return b}function Ed(b,c,d,e,f,g,h,k,m,n,p,q,r,t,x,z,B){b[0]=c;b[1]=d;b[2]=e;b[3]=f;b[4]=g;b[5]=h;b[6]=k;b[7]=m;b[8]=n;b[9]=p;b[10]=q;b[11]=r;b[12]=t;b[13]=x;b[14]=z;b[15]=B}
function Gd(b,c){b[0]=c[0];b[1]=c[1];b[2]=c[2];b[3]=c[3];b[4]=c[4];b[5]=c[5];b[6]=c[6];b[7]=c[7];b[8]=c[8];b[9]=c[9];b[10]=c[10];b[11]=c[11];b[12]=c[12];b[13]=c[13];b[14]=c[14];b[15]=c[15]}function Hd(b){b[0]=1;b[1]=0;b[2]=0;b[3]=0;b[4]=0;b[5]=1;b[6]=0;b[7]=0;b[8]=0;b[9]=0;b[10]=1;b[11]=0;b[12]=0;b[13]=0;b[14]=0;b[15]=1}
function Id(b,c,d){var e=b[0],f=b[1],g=b[2],h=b[3],k=b[4],m=b[5],n=b[6],p=b[7],q=b[8],r=b[9],t=b[10],x=b[11],z=b[12],B=b[13],A=b[14];b=b[15];var v=c[0],O=c[1],K=c[2],I=c[3],G=c[4],la=c[5],Ea=c[6],L=c[7],za=c[8],Ra=c[9],Ka=c[10],kb=c[11],cb=c[12],Rc=c[13],sc=c[14];c=c[15];d[0]=e*v+k*O+q*K+z*I;d[1]=f*v+m*O+r*K+B*I;d[2]=g*v+n*O+t*K+A*I;d[3]=h*v+p*O+x*K+b*I;d[4]=e*G+k*la+q*Ea+z*L;d[5]=f*G+m*la+r*Ea+B*L;d[6]=g*G+n*la+t*Ea+A*L;d[7]=h*G+p*la+x*Ea+b*L;d[8]=e*za+k*Ra+q*Ka+z*kb;d[9]=f*za+m*Ra+r*Ka+B*kb;d[10]=
g*za+n*Ra+t*Ka+A*kb;d[11]=h*za+p*Ra+x*Ka+b*kb;d[12]=e*cb+k*Rc+q*sc+z*c;d[13]=f*cb+m*Rc+r*sc+B*c;d[14]=g*cb+n*Rc+t*sc+A*c;d[15]=h*cb+p*Rc+x*sc+b*c}
function Jd(b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],k=b[5],m=b[6],n=b[7],p=b[8],q=b[9],r=b[10],t=b[11],x=b[12],z=b[13],B=b[14],A=b[15],v=d*k-e*h,O=d*m-f*h,K=d*n-g*h,I=e*m-f*k,G=e*n-g*k,la=f*n-g*m,Ea=p*z-q*x,L=p*B-r*x,za=p*A-t*x,Ra=q*B-r*z,Ka=q*A-t*z,kb=r*A-t*B,cb=v*kb-O*Ka+K*Ra+I*za-G*L+la*Ea;0!=cb&&(cb=1/cb,c[0]=(k*kb-m*Ka+n*Ra)*cb,c[1]=(-e*kb+f*Ka-g*Ra)*cb,c[2]=(z*la-B*G+A*I)*cb,c[3]=(-q*la+r*G-t*I)*cb,c[4]=(-h*kb+m*za-n*L)*cb,c[5]=(d*kb-f*za+g*L)*cb,c[6]=(-x*la+B*K-A*O)*cb,c[7]=(p*la-r*K+t*
O)*cb,c[8]=(h*Ka-k*za+n*Ea)*cb,c[9]=(-d*Ka+e*za-g*Ea)*cb,c[10]=(x*G-z*K+A*v)*cb,c[11]=(-p*G+q*K-t*v)*cb,c[12]=(-h*Ra+k*L-m*Ea)*cb,c[13]=(d*Ra-e*L+f*Ea)*cb,c[14]=(-x*I+z*O-B*v)*cb,c[15]=(p*I-q*O+r*v)*cb)}function Kd(b,c,d){var e=b[1]*c+b[5]*d+0*b[9]+b[13],f=b[2]*c+b[6]*d+0*b[10]+b[14],g=b[3]*c+b[7]*d+0*b[11]+b[15];b[12]=b[0]*c+b[4]*d+0*b[8]+b[12];b[13]=e;b[14]=f;b[15]=g}
function Ld(b,c,d){Ed(b,b[0]*c,b[1]*c,b[2]*c,b[3]*c,b[4]*d,b[5]*d,b[6]*d,b[7]*d,1*b[8],1*b[9],1*b[10],1*b[11],b[12],b[13],b[14],b[15])}function Md(b,c){var d=b[0],e=b[1],f=b[2],g=b[3],h=b[4],k=b[5],m=b[6],n=b[7],p=Math.cos(c),q=Math.sin(c);b[0]=d*p+h*q;b[1]=e*p+k*q;b[2]=f*p+m*q;b[3]=g*p+n*q;b[4]=d*-q+h*p;b[5]=e*-q+k*p;b[6]=f*-q+m*p;b[7]=g*-q+n*p}new Float64Array(3);new Float64Array(3);new Float64Array(4);new Float64Array(4);new Float64Array(4);new Float64Array(16);function Nd(b){for(var c=Od(),d=0,e=b.length;d<e;++d)Pd(c,b[d]);return c}function Qd(b,c,d){var e=Math.min.apply(null,b),f=Math.min.apply(null,c);b=Math.max.apply(null,b);c=Math.max.apply(null,c);return Rd(e,f,b,c,d)}function Sd(b,c,d){return d?(d[0]=b[0]-c,d[1]=b[1]-c,d[2]=b[2]+c,d[3]=b[3]+c,d):[b[0]-c,b[1]-c,b[2]+c,b[3]+c]}function Td(b,c){return c?(c[0]=b[0],c[1]=b[1],c[2]=b[2],c[3]=b[3],c):b.slice()}
function Ud(b,c,d){c=c<b[0]?b[0]-c:b[2]<c?c-b[2]:0;b=d<b[1]?b[1]-d:b[3]<d?d-b[3]:0;return c*c+b*b}function Vd(b,c){return Wd(b,c[0],c[1])}function Xd(b,c){return b[0]<=c[0]&&c[2]<=b[2]&&b[1]<=c[1]&&c[3]<=b[3]}function Wd(b,c,d){return b[0]<=c&&c<=b[2]&&b[1]<=d&&d<=b[3]}function Yd(b,c){var d=b[1],e=b[2],f=b[3],g=c[0],h=c[1],k=0;g<b[0]?k=k|16:g>e&&(k=k|4);h<d?k|=8:h>f&&(k|=2);0===k&&(k=1);return k}function Od(){return[Infinity,Infinity,-Infinity,-Infinity]}
function Rd(b,c,d,e,f){return f?(f[0]=b,f[1]=c,f[2]=d,f[3]=e,f):[b,c,d,e]}function Zd(b,c){var d=b[0],e=b[1];return Rd(d,e,d,e,c)}function $d(b,c,d,e,f){f=Rd(Infinity,Infinity,-Infinity,-Infinity,f);return ae(f,b,c,d,e)}function be(b,c){return b[0]==c[0]&&b[2]==c[2]&&b[1]==c[1]&&b[3]==c[3]}function ce(b,c){c[0]<b[0]&&(b[0]=c[0]);c[2]>b[2]&&(b[2]=c[2]);c[1]<b[1]&&(b[1]=c[1]);c[3]>b[3]&&(b[3]=c[3]);return b}
function Pd(b,c){c[0]<b[0]&&(b[0]=c[0]);c[0]>b[2]&&(b[2]=c[0]);c[1]<b[1]&&(b[1]=c[1]);c[1]>b[3]&&(b[3]=c[1])}function ae(b,c,d,e,f){for(;d<e;d+=f){var g=b,h=c[d],k=c[d+1];g[0]=Math.min(g[0],h);g[1]=Math.min(g[1],k);g[2]=Math.max(g[2],h);g[3]=Math.max(g[3],k)}return b}function de(b,c,d){var e;return(e=c.call(d,ee(b)))||(e=c.call(d,fe(b)))||(e=c.call(d,ge(b)))?e:(e=c.call(d,he(b)))?e:!1}function ie(b){var c=0;je(b)||(c=ke(b)*le(b));return c}function ee(b){return[b[0],b[1]]}
function fe(b){return[b[2],b[1]]}function me(b){return[(b[0]+b[2])/2,(b[1]+b[3])/2]}function ne(b,c,d,e){var f=c*e[0]/2;e=c*e[1]/2;c=Math.cos(d);d=Math.sin(d);f=[-f,-f,f,f];e=[-e,e,-e,e];var g,h,k;for(g=0;4>g;++g)h=f[g],k=e[g],f[g]=b[0]+h*c-k*d,e[g]=b[1]+h*d+k*c;return Qd(f,e,void 0)}function le(b){return b[3]-b[1]}function oe(b,c,d){d=d?d:Od();pe(b,c)&&(d[0]=b[0]>c[0]?b[0]:c[0],d[1]=b[1]>c[1]?b[1]:c[1],d[2]=b[2]<c[2]?b[2]:c[2],d[3]=b[3]<c[3]?b[3]:c[3]);return d}function he(b){return[b[0],b[3]]}
function ge(b){return[b[2],b[3]]}function ke(b){return b[2]-b[0]}function pe(b,c){return b[0]<=c[2]&&b[2]>=c[0]&&b[1]<=c[3]&&b[3]>=c[1]}function je(b){return b[2]<b[0]||b[3]<b[1]}function qe(b,c){var d=(b[2]-b[0])/2*(c-1),e=(b[3]-b[1])/2*(c-1);b[0]-=d;b[2]+=d;b[1]-=e;b[3]+=e}function re(b,c,d){b=[b[0],b[1],b[0],b[3],b[2],b[1],b[2],b[3]];c(b,b,2);return Qd([b[0],b[2],b[4],b[6]],[b[1],b[3],b[5],b[7]],d)};function se(b){return function(){return b}}var te=se(!1),ue=se(!0),ve=se(null);function we(b){return b}function xe(b){var c;c=c||0;return function(){return b.apply(this,Array.prototype.slice.call(arguments,0,c))}}function ye(b){var c=arguments,d=c.length;return function(){for(var b,f=0;f<d;f++)b=c[f].apply(this,arguments);return b}}function ze(b){var c=arguments,d=c.length;return function(){for(var b=0;b<d;b++)if(!c[b].apply(this,arguments))return!1;return!0}};/*

 Latitude/longitude spherical geodesy formulae taken from
 http://www.movable-type.co.uk/scripts/latlong.html
 Licensed under CC-BY-3.0.
*/
function Ae(b){this.radius=b}Ae.prototype.c=function(b){for(var c=0,d=b.length,e=b[d-1][0],f=b[d-1][1],g=0;g<d;g++)var h=b[g][0],k=b[g][1],c=c+Wa(h-e)*(2+Math.sin(Wa(f))+Math.sin(Wa(k))),e=h,f=k;return c*this.radius*this.radius/2};Ae.prototype.a=function(b,c){var d=Wa(b[1]),e=Wa(c[1]),f=(e-d)/2,g=Wa(c[0]-b[0])/2,d=Math.sin(f)*Math.sin(f)+Math.sin(g)*Math.sin(g)*Math.cos(d)*Math.cos(e);return 2*this.radius*Math.atan2(Math.sqrt(d),Math.sqrt(1-d))};
Ae.prototype.offset=function(b,c,d){var e=Wa(b[1]);c/=this.radius;var f=Math.asin(Math.sin(e)*Math.cos(c)+Math.cos(e)*Math.sin(c)*Math.cos(d));return[180*(Wa(b[0])+Math.atan2(Math.sin(d)*Math.sin(c)*Math.cos(e),Math.cos(c)-Math.sin(e)*Math.sin(f)))/Math.PI,180*f/Math.PI]};var Be=new Ae(6370997);var Ce={};Ce.degrees=2*Math.PI*Be.radius/360;Ce.ft=.3048;Ce.m=1;Ce["us-ft"]=1200/3937;
function De(b){this.a=b.code;this.c=b.units;this.j=void 0!==b.extent?b.extent:null;this.i=void 0!==b.worldExtent?b.worldExtent:null;this.g=void 0!==b.axisOrientation?b.axisOrientation:"enu";this.f=void 0!==b.global?b.global:!1;this.b=!(!this.f||!this.j);this.B=void 0!==b.getPointResolution?b.getPointResolution:this.dk;this.l=null;var c=Ee,d=b.code;if("function"==typeof proj4&&void 0===c[d]){var e=proj4.defs(d);if(void 0!==e){void 0!==e.axis&&void 0===b.axisOrientation&&(this.g=e.axis);void 0===b.units&&
(b=e.units,void 0===e.to_meter||void 0!==b&&void 0!==Ce[b]||(b=e.to_meter.toString(),Ce[b]=e.to_meter),this.c=b);for(var f in c)b=proj4.defs(f),void 0!==b&&(c=Fe(f),b===e?Ge([c,this]):(b=proj4(f,d),He(c,this,b.forward,b.inverse)))}}}l=De.prototype;l.Fj=function(){return this.a};l.J=function(){return this.j};l.wm=function(){return this.c};l.Jc=function(){return Ce[this.c]};l.pk=function(){return this.i};function Ie(b){return b.g}l.cl=function(){return this.f};
l.No=function(b){this.f=b;this.b=!(!b||!this.j)};l.xm=function(b){this.j=b;this.b=!(!this.f||!b)};l.Vo=function(b){this.i=b};l.Mo=function(b){this.B=b};l.dk=function(b,c){if("degrees"==this.c)return b;var d=Je(this,Fe("EPSG:4326")),e=[c[0]-b/2,c[1],c[0]+b/2,c[1],c[0],c[1]-b/2,c[0],c[1]+b/2],e=d(e,e,2),d=Be.a(e.slice(0,2),e.slice(2,4)),e=Be.a(e.slice(4,6),e.slice(6,8)),e=(d+e)/2,d=this.Jc();void 0!==d&&(e/=d);return e};l.getPointResolution=function(b,c){return this.B(b,c)};var Ee={},Ke={};
function Ge(b){Le(b);b.forEach(function(c){b.forEach(function(b){c!==b&&Me(c,b,Ne)})})}function Pe(){var b=Qe,c=Re,d=Se;Te.forEach(function(e){b.forEach(function(b){Me(e,b,c);Me(b,e,d)})})}function Ue(b){Ee[b.a]=b;Me(b,b,Ne)}function Le(b){var c=[];b.forEach(function(b){c.push(Ue(b))})}function Ve(b){return b?ia(b)?Fe(b):b:Fe("EPSG:3857")}function Me(b,c,d){b=b.a;c=c.a;b in Ke||(Ke[b]={});Ke[b][c]=d}function He(b,c,d,e){b=Fe(b);c=Fe(c);Me(b,c,We(d));Me(c,b,We(e))}
function We(b){return function(c,d,e){var f=c.length;e=void 0!==e?e:2;d=void 0!==d?d:Array(f);var g,h;for(h=0;h<f;h+=e)for(g=b([c[h],c[h+1]]),d[h]=g[0],d[h+1]=g[1],g=e-1;2<=g;--g)d[h+g]=c[h+g];return d}}function Fe(b){var c;b instanceof De?c=b:ia(b)?(c=Ee[b],void 0===c&&"function"==typeof proj4&&void 0!==proj4.defs(b)&&(c=new De({code:b}),Ue(c))):c=null;return c}function Xe(b,c){return b===c?!0:b.a===c.a?b.c===c.c:Je(b,c)===Ne}function Ye(b,c){var d=Fe(b),e=Fe(c);return Je(d,e)}
function Je(b,c){var d=b.a,e=c.a,f;d in Ke&&e in Ke[d]&&(f=Ke[d][e]);void 0===f&&(f=Ze);return f}function Ze(b,c){if(void 0!==c&&b!==c){for(var d=0,e=b.length;d<e;++d)c[d]=b[d];b=c}return b}function Ne(b,c){var d;if(void 0!==c){d=0;for(var e=b.length;d<e;++d)c[d]=b[d];d=c}else d=b.slice();return d}function $e(b,c,d){return Ye(c,d)(b,void 0,b.length)}function af(b,c,d){c=Ye(c,d);return re(b,c)};function bf(){id.call(this);this.A=Od();this.C=-1;this.j={};this.u=this.i=0}y(bf,id);l=bf.prototype;l.pb=function(b,c){var d=c?c:[NaN,NaN];this.mb(b[0],b[1],d,Infinity);return d};l.ng=function(b){return this.rc(b[0],b[1])};l.rc=te;l.J=function(b){this.C!=this.c&&(this.A=this.Vd(this.A),this.C=this.c);var c=this.A;b?(b[0]=c[0],b[1]=c[1],b[2]=c[2],b[3]=c[3]):b=c;return b};l.yb=function(b){return this.sd(b*b)};l.kb=function(b,c){this.mc(Ye(b,c));return this};function cf(b,c,d,e,f,g){var h=f[0],k=f[1],m=f[4],n=f[5],p=f[12];f=f[13];for(var q=g?g:[],r=0;c<d;c+=e){var t=b[c],x=b[c+1];q[r++]=h*t+m*x+p;q[r++]=k*t+n*x+f}g&&q.length!=r&&(q.length=r);return q};function df(){bf.call(this);this.b="XY";this.a=2;this.v=null}y(df,bf);function ef(b){if("XY"==b)return 2;if("XYZ"==b||"XYM"==b)return 3;if("XYZM"==b)return 4}l=df.prototype;l.rc=te;l.Vd=function(b){return $d(this.v,0,this.v.length,this.a,b)};l.Jb=function(){return this.v.slice(0,this.a)};l.ja=function(){return this.v};l.Kb=function(){return this.v.slice(this.v.length-this.a)};l.Lb=function(){return this.b};
l.sd=function(b){this.u!=this.c&&(Rb(this.j),this.i=0,this.u=this.c);if(0>b||0!==this.i&&b<=this.i)return this;var c=b.toString();if(this.j.hasOwnProperty(c))return this.j[c];var d=this.Kc(b);if(d.ja().length<this.v.length)return this.j[c]=d;this.i=b;return this};l.Kc=function(){return this};l.ra=function(){return this.a};function ff(b,c,d){b.a=ef(c);b.b=c;b.v=d}
function gf(b,c,d,e){if(c)d=ef(c);else{for(c=0;c<e;++c){if(0===d.length){b.b="XY";b.a=2;return}d=d[0]}d=d.length;c=2==d?"XY":3==d?"XYZ":4==d?"XYZM":void 0}b.b=c;b.a=d}l.mc=function(b){this.v&&(b(this.v,this.v,this.a),this.s())};l.Oc=function(b,c){var d=this.ja();if(d){var e=this.ra(),f=d.length,g=d?d:[],h=0,k,m;for(k=0;k<f;k+=e)for(g[h++]=d[k]+b,g[h++]=d[k+1]+c,m=k+2;m<k+e;++m)g[h++]=d[m];d&&g.length!=h&&(g.length=h);this.s()}};function hf(b,c,d,e){for(var f=0,g=b[d-e],h=b[d-e+1];c<d;c+=e)var k=b[c],m=b[c+1],f=f+(h*k-g*m),g=k,h=m;return f/2}function jf(b,c,d,e){var f=0,g,h;g=0;for(h=d.length;g<h;++g){var k=d[g],f=f+hf(b,c,k,e);c=k}return f};function kf(b,c,d,e,f,g,h){var k=b[c],m=b[c+1],n=b[d]-k,p=b[d+1]-m;if(0!==n||0!==p)if(g=((f-k)*n+(g-m)*p)/(n*n+p*p),1<g)c=d;else if(0<g){for(f=0;f<e;++f)h[f]=qd(b[c+f],b[d+f],g);h.length=e;return}for(f=0;f<e;++f)h[f]=b[c+f];h.length=e}function lf(b,c,d,e,f){var g=b[c],h=b[c+1];for(c+=e;c<d;c+=e){var k=b[c],m=b[c+1],g=Va(g,h,k,m);g>f&&(f=g);g=k;h=m}return f}function mf(b,c,d,e,f){var g,h;g=0;for(h=d.length;g<h;++g){var k=d[g];f=lf(b,c,k,e,f);c=k}return f}
function nf(b,c,d,e,f,g,h,k,m,n,p){if(c==d)return n;var q;if(0===f){q=Va(h,k,b[c],b[c+1]);if(q<n){for(p=0;p<e;++p)m[p]=b[c+p];m.length=e;return q}return n}for(var r=p?p:[NaN,NaN],t=c+e;t<d;)if(kf(b,t-e,t,e,h,k,r),q=Va(h,k,r[0],r[1]),q<n){n=q;for(p=0;p<e;++p)m[p]=r[p];m.length=e;t+=e}else t+=e*Math.max((Math.sqrt(q)-Math.sqrt(n))/f|0,1);if(g&&(kf(b,d-e,c,e,h,k,r),q=Va(h,k,r[0],r[1]),q<n)){n=q;for(p=0;p<e;++p)m[p]=r[p];m.length=e}return n}
function of(b,c,d,e,f,g,h,k,m,n,p){p=p?p:[NaN,NaN];var q,r;q=0;for(r=d.length;q<r;++q){var t=d[q];n=nf(b,c,t,e,f,g,h,k,m,n,p);c=t}return n};function pf(b,c){var d=0,e,f;e=0;for(f=c.length;e<f;++e)b[d++]=c[e];return d}function qf(b,c,d,e){var f,g;f=0;for(g=d.length;f<g;++f){var h=d[f],k;for(k=0;k<e;++k)b[c++]=h[k]}return c}function rf(b,c,d,e,f){f=f?f:[];var g=0,h,k;h=0;for(k=d.length;h<k;++h)c=qf(b,c,d[h],e),f[g++]=c;f.length=g;return f};function sf(b,c,d,e,f){f=void 0!==f?f:[];for(var g=0;c<d;c+=e)f[g++]=b.slice(c,c+e);f.length=g;return f}function tf(b,c,d,e,f){f=void 0!==f?f:[];var g=0,h,k;h=0;for(k=d.length;h<k;++h){var m=d[h];f[g++]=sf(b,c,m,e,f[g]);c=m}f.length=g;return f};function uf(b,c,d,e,f,g,h){var k=(d-c)/e;if(3>k){for(;c<d;c+=e)g[h++]=b[c],g[h++]=b[c+1];return h}var m=Array(k);m[0]=1;m[k-1]=1;d=[c,d-e];for(var n=0,p;0<d.length;){var q=d.pop(),r=d.pop(),t=0,x=b[r],z=b[r+1],B=b[q],A=b[q+1];for(p=r+e;p<q;p+=e){var v=Ua(b[p],b[p+1],x,z,B,A);v>t&&(n=p,t=v)}t>f&&(m[(n-c)/e]=1,r+e<n&&d.push(r,n),n+e<q&&d.push(n,q))}for(p=0;p<k;++p)m[p]&&(g[h++]=b[c+p*e],g[h++]=b[c+p*e+1]);return h}
function vf(b,c,d,e,f,g,h,k){var m,n;m=0;for(n=d.length;m<n;++m){var p=d[m];a:{var q=b,r=p,t=e,x=f,z=g;if(c!=r){var B=x*Math.round(q[c]/x),A=x*Math.round(q[c+1]/x);c+=t;z[h++]=B;z[h++]=A;var v=void 0,O=void 0;do if(v=x*Math.round(q[c]/x),O=x*Math.round(q[c+1]/x),c+=t,c==r){z[h++]=v;z[h++]=O;break a}while(v==B&&O==A);for(;c<r;){var K,I;K=x*Math.round(q[c]/x);I=x*Math.round(q[c+1]/x);c+=t;if(K!=v||I!=O){var G=v-B,la=O-A,Ea=K-B,L=I-A;G*L==la*Ea&&(0>G&&Ea<G||G==Ea||0<G&&Ea>G)&&(0>la&&L<la||la==L||0<la&&
L>la)||(z[h++]=v,z[h++]=O,B=v,A=O);v=K;O=I}}z[h++]=v;z[h++]=O}}k.push(h);c=p}return h};function wf(b,c){df.call(this);this.g=this.l=-1;this.ma(b,c)}y(wf,df);l=wf.prototype;l.clone=function(){var b=new wf(null);xf(b,this.b,this.v.slice());return b};l.mb=function(b,c,d,e){if(e<Ud(this.J(),b,c))return e;this.g!=this.c&&(this.l=Math.sqrt(lf(this.v,0,this.v.length,this.a,0)),this.g=this.c);return nf(this.v,0,this.v.length,this.a,this.l,!0,b,c,d,e)};l.Yl=function(){return hf(this.v,0,this.v.length,this.a)};l.Y=function(){return sf(this.v,0,this.v.length,this.a)};
l.Kc=function(b){var c=[];c.length=uf(this.v,0,this.v.length,this.a,b,c,0);b=new wf(null);xf(b,"XY",c);return b};l.V=function(){return"LinearRing"};l.ma=function(b,c){b?(gf(this,c,b,1),this.v||(this.v=[]),this.v.length=qf(this.v,0,b,this.a),this.s()):xf(this,"XY",null)};function xf(b,c,d){ff(b,c,d);b.s()};function D(b,c){df.call(this);this.ma(b,c)}y(D,df);l=D.prototype;l.clone=function(){var b=new D(null);b.ba(this.b,this.v.slice());return b};l.mb=function(b,c,d,e){var f=this.v;b=Va(b,c,f[0],f[1]);if(b<e){e=this.a;for(c=0;c<e;++c)d[c]=f[c];d.length=e;return b}return e};l.Y=function(){return this.v?this.v.slice():[]};l.Vd=function(b){return Zd(this.v,b)};l.V=function(){return"Point"};l.Da=function(b){return Wd(b,this.v[0],this.v[1])};
l.ma=function(b,c){b?(gf(this,c,b,0),this.v||(this.v=[]),this.v.length=pf(this.v,b),this.s()):this.ba("XY",null)};l.ba=function(b,c){ff(this,b,c);this.s()};function yf(b,c,d,e,f){return!de(f,function(f){return!zf(b,c,d,e,f[0],f[1])})}function zf(b,c,d,e,f,g){for(var h=!1,k=b[d-e],m=b[d-e+1];c<d;c+=e){var n=b[c],p=b[c+1];m>g!=p>g&&f<(n-k)*(g-m)/(p-m)+k&&(h=!h);k=n;m=p}return h}function Af(b,c,d,e,f,g){if(0===d.length||!zf(b,c,d[0],e,f,g))return!1;var h;c=1;for(h=d.length;c<h;++c)if(zf(b,d[c-1],d[c],e,f,g))return!1;return!0};function Bf(b,c,d,e,f,g,h){var k,m,n,p,q,r=f[g+1],t=[],x=d[0];n=b[x-e];q=b[x-e+1];for(k=c;k<x;k+=e){p=b[k];m=b[k+1];if(r<=q&&m<=r||q<=r&&r<=m)n=(r-q)/(m-q)*(p-n)+n,t.push(n);n=p;q=m}x=NaN;q=-Infinity;t.sort();n=t[0];k=1;for(m=t.length;k<m;++k){p=t[k];var z=Math.abs(p-n);z>q&&(n=(n+p)/2,Af(b,c,d,e,n,r)&&(x=n,q=z));n=p}isNaN(x)&&(x=f[g]);return h?(h.push(x,r),h):[x,r]};function Cf(b,c,d,e,f,g){for(var h=[b[c],b[c+1]],k=[],m;c+e<d;c+=e){k[0]=b[c+e];k[1]=b[c+e+1];if(m=f.call(g,h,k))return m;h[0]=k[0];h[1]=k[1]}return!1};function Df(b,c,d,e,f){var g=ae(Od(),b,c,d,e);return pe(f,g)?Xd(f,g)||g[0]>=f[0]&&g[2]<=f[2]||g[1]>=f[1]&&g[3]<=f[3]?!0:Cf(b,c,d,e,function(b,c){var d=!1,e=Yd(f,b),g=Yd(f,c);if(1===e||1===g)d=!0;else{var q=f[0],r=f[1],t=f[2],x=f[3],z=c[0],B=c[1],A=(B-b[1])/(z-b[0]);g&2&&!(e&2)&&(d=z-(B-x)/A,d=d>=q&&d<=t);d||!(g&4)||e&4||(d=B-(z-t)*A,d=d>=r&&d<=x);d||!(g&8)||e&8||(d=z-(B-r)/A,d=d>=q&&d<=t);d||!(g&16)||e&16||(d=B-(z-q)*A,d=d>=r&&d<=x)}return d}):!1}
function Ef(b,c,d,e,f){var g=d[0];if(!(Df(b,c,g,e,f)||zf(b,c,g,e,f[0],f[1])||zf(b,c,g,e,f[0],f[3])||zf(b,c,g,e,f[2],f[1])||zf(b,c,g,e,f[2],f[3])))return!1;if(1===d.length)return!0;c=1;for(g=d.length;c<g;++c)if(yf(b,d[c-1],d[c],e,f))return!1;return!0};function Ff(b,c,d,e){for(var f=0,g=b[d-e],h=b[d-e+1];c<d;c+=e)var k=b[c],m=b[c+1],f=f+(k-g)*(m+h),g=k,h=m;return 0<f}function Gf(b,c,d,e){var f=0;e=void 0!==e?e:!1;var g,h;g=0;for(h=c.length;g<h;++g){var k=c[g],f=Ff(b,f,k,d);if(0===g){if(e&&f||!e&&!f)return!1}else if(e&&!f||!e&&f)return!1;f=k}return!0}
function Hf(b,c,d,e,f){f=void 0!==f?f:!1;var g,h;g=0;for(h=d.length;g<h;++g){var k=d[g],m=Ff(b,c,k,e);if(0===g?f&&m||!f&&!m:f&&!m||!f&&m)for(var m=b,n=k,p=e;c<n-p;){var q;for(q=0;q<p;++q){var r=m[c+q];m[c+q]=m[n-p+q];m[n-p+q]=r}c+=p;n-=p}c=k}return c}function If(b,c,d,e){var f=0,g,h;g=0;for(h=c.length;g<h;++g)f=Hf(b,f,c[g],d,e);return f};function E(b,c){df.call(this);this.g=[];this.D=-1;this.G=null;this.T=this.S=this.U=-1;this.l=null;this.ma(b,c)}y(E,df);l=E.prototype;l.lj=function(b){this.v?lb(this.v,b.ja()):this.v=b.ja().slice();this.g.push(this.v.length);this.s()};l.clone=function(){var b=new E(null);b.ba(this.b,this.v.slice(),this.g.slice());return b};
l.mb=function(b,c,d,e){if(e<Ud(this.J(),b,c))return e;this.S!=this.c&&(this.U=Math.sqrt(mf(this.v,0,this.g,this.a,0)),this.S=this.c);return of(this.v,0,this.g,this.a,this.U,!0,b,c,d,e)};l.rc=function(b,c){return Af(this.ac(),0,this.g,this.a,b,c)};l.am=function(){return jf(this.ac(),0,this.g,this.a)};l.Y=function(b){var c;void 0!==b?(c=this.ac().slice(),Hf(c,0,this.g,this.a,b)):c=this.v;return tf(c,0,this.g,this.a)};l.Ab=function(){return this.g};
function Jf(b){if(b.D!=b.c){var c=me(b.J());b.G=Bf(b.ac(),0,b.g,b.a,c,0);b.D=b.c}return b.G}l.Oj=function(){return new D(Jf(this))};l.Tj=function(){return this.g.length};l.Bg=function(b){if(0>b||this.g.length<=b)return null;var c=new wf(null);xf(c,this.b,this.v.slice(0===b?0:this.g[b-1],this.g[b]));return c};l.ae=function(){var b=this.b,c=this.v,d=this.g,e=[],f=0,g,h;g=0;for(h=d.length;g<h;++g){var k=d[g],m=new wf(null);xf(m,b,c.slice(f,k));e.push(m);f=k}return e};
l.ac=function(){if(this.T!=this.c){var b=this.v;Gf(b,this.g,this.a)?this.l=b:(this.l=b.slice(),this.l.length=Hf(this.l,0,this.g,this.a));this.T=this.c}return this.l};l.Kc=function(b){var c=[],d=[];c.length=vf(this.v,0,this.g,this.a,Math.sqrt(b),c,0,d);b=new E(null);b.ba("XY",c,d);return b};l.V=function(){return"Polygon"};l.Da=function(b){return Ef(this.ac(),0,this.g,this.a,b)};
l.ma=function(b,c){if(b){gf(this,c,b,2);this.v||(this.v=[]);var d=rf(this.v,0,b,this.a,this.g);this.v.length=0===d.length?0:d[d.length-1];this.s()}else this.ba("XY",null,this.g)};l.ba=function(b,c,d){ff(this,b,c);this.g=d;this.s()};function Kf(b,c,d,e){var f=e?e:32;e=[];var g;for(g=0;g<f;++g)lb(e,b.offset(c,d,2*Math.PI*g/f));e.push(e[0],e[1]);b=new E(null);b.ba("XY",e,[e.length]);return b}
function Lf(b){var c=b[0],d=b[1],e=b[2];b=b[3];c=[c,d,c,b,e,b,e,d,c,d];d=new E(null);d.ba("XY",c,[c.length]);return d}function Mf(b,c,d){var e=c?c:32,f=b.ra();c=b.b;for(var g=new E(null,c),e=f*(e+1),f=[],h=0;h<e;h++)f[h]=0;g.ba(c,f,[f.length]);Nf(g,b.vd(),b.yf(),d);return g}function Nf(b,c,d,e){var f=b.ja(),g=b.b,h=b.ra(),k=b.Ab(),m=f.length/h-1;e=e?e:0;for(var n,p,q=0;q<=m;++q)p=q*h,n=e+2*pd(q,m)*Math.PI/m,f[p]=c[0]+d*Math.cos(n),f[p+1]=c[1]+d*Math.sin(n);b.ba(g,f,k)};function Of(b){id.call(this);b=b||{};this.b=[0,0];var c={};c.center=void 0!==b.center?b.center:null;this.g=Ve(b.projection);var d,e,f,g=void 0!==b.minZoom?b.minZoom:0;d=void 0!==b.maxZoom?b.maxZoom:28;var h=void 0!==b.zoomFactor?b.zoomFactor:2;if(void 0!==b.resolutions)d=b.resolutions,e=d[0],f=d[d.length-1],d=xb(d);else{e=Ve(b.projection);f=e.J();var k=(f?Math.max(ke(f),le(f)):360*Ce.degrees/Ce[e.c])/256/Math.pow(2,0),m=k/Math.pow(2,28);e=b.maxResolution;void 0!==e?g=0:e=k/Math.pow(h,g);f=b.minResolution;
void 0===f&&(f=void 0!==b.maxZoom?void 0!==b.maxResolution?e/Math.pow(h,d):k/Math.pow(h,d):m);d=g+Math.floor(Math.log(e/f)/Math.log(h));f=e/Math.pow(h,d-g);d=yb(h,e,d-g)}this.a=e;this.i=f;this.f=g;g=void 0!==b.extent?Xa(b.extent):Ya;(void 0!==b.enableRotation?b.enableRotation:1)?(e=b.constrainRotation,e=void 0===e||!0===e?Cb():!1===e?Ab:ja(e)?Bb(e):Ab):e=zb;this.j=new Db(g,d,e);void 0!==b.resolution?c.resolution=b.resolution:void 0!==b.zoom&&(c.resolution=this.constrainResolution(this.a,b.zoom-this.f));
c.rotation=void 0!==b.rotation?b.rotation:0;this.I(c)}y(Of,id);l=Of.prototype;l.Wd=function(b){return this.j.center(b)};l.constrainResolution=function(b,c,d){return this.j.resolution(b,c||0,d||0)};l.constrainRotation=function(b,c){return this.j.rotation(b,c||0)};l.Ta=function(){return this.get("center")};l.Zc=function(b){var c=this.Ta(),d=this.$(),e=this.Ea();return ne(c,d,e,b)};l.Il=function(){return this.g};l.$=function(){return this.get("resolution")};
function Pf(b){var c=b.a,d=Math.log(c/b.i)/Math.log(2);return function(b){return c/Math.pow(2,b*d)}}l.Ea=function(){return this.get("rotation")};function Qf(b){var c=b.a,d=Math.log(c/b.i)/Math.log(2);return function(b){return Math.log(c/b)/Math.log(2)/d}}function Rf(b){var c=b.Ta(),d=b.g,e=b.$();b=b.Ea();return{center:[Math.round(c[0]/e)*e,Math.round(c[1]/e)*e],projection:void 0!==d?d:null,resolution:e,rotation:b}}
l.qk=function(){var b,c=this.$();if(void 0!==c){var d,e=0;do{d=this.constrainResolution(this.a,e);if(d==c){b=e;break}++e}while(d>this.i)}return void 0!==b?this.f+b:b};
l.jf=function(b,c,d){b instanceof df||(b=Lf(b));var e=d||{};d=void 0!==e.padding?e.padding:[0,0,0,0];var f=void 0!==e.constrainResolution?e.constrainResolution:!0,g=void 0!==e.nearest?e.nearest:!1,h;void 0!==e.minResolution?h=e.minResolution:void 0!==e.maxZoom?h=this.constrainResolution(this.a,e.maxZoom-this.f,0):h=0;var k=b.ja(),m=this.Ea(),e=Math.cos(-m),m=Math.sin(-m),n=Infinity,p=Infinity,q=-Infinity,r=-Infinity;b=b.ra();for(var t=0,x=k.length;t<x;t+=b)var z=k[t]*e-k[t+1]*m,B=k[t]*m+k[t+1]*e,
n=Math.min(n,z),p=Math.min(p,B),q=Math.max(q,z),r=Math.max(r,B);k=[n,p,q,r];c=[c[0]-d[1]-d[3],c[1]-d[0]-d[2]];c=Math.max(ke(k)/c[0],le(k)/c[1]);c=isNaN(c)?h:Math.max(c,h);f&&(h=this.constrainResolution(c,0,0),!g&&h<c&&(h=this.constrainResolution(h,-1,0)),c=h);this.Ub(c);m=-m;g=(n+q)/2+(d[1]-d[3])/2*c;d=(p+r)/2+(d[0]-d[2])/2*c;this.jb([g*e-d*m,d*e+g*m])};
l.qj=function(b,c,d){var e=this.Ea(),f=Math.cos(-e),e=Math.sin(-e),g=b[0]*f-b[1]*e;b=b[1]*f+b[0]*e;var h=this.$(),g=g+(c[0]/2-d[0])*h;b+=(d[1]-c[1]/2)*h;e=-e;this.jb([g*f-b*e,b*f+g*e])};function Sf(b){return!!b.Ta()&&void 0!==b.$()}l.rotate=function(b,c){if(void 0!==c){var d,e=this.Ta();void 0!==e&&(d=[e[0]-c[0],e[1]-c[1]],wd(d,b-this.Ea()),rd(d,c));this.jb(d)}this.te(b)};l.jb=function(b){this.set("center",b)};function Tf(b,c){b.b[1]+=c}l.Ub=function(b){this.set("resolution",b)};
l.te=function(b){this.set("rotation",b)};l.Wo=function(b){b=this.constrainResolution(this.a,b-this.f,0);this.Ub(b)};function Uf(b){return Math.pow(b,3)}function Vf(b){return 1-Uf(1-b)}function Wf(b){return 3*b*b-2*b*b*b}function Xf(b){return b}function Yf(b){return.5>b?Wf(2*b):1-Wf(2*(b-.5))};function Zf(b){var c=b.source,d=b.start?b.start:Date.now(),e=c[0],f=c[1],g=void 0!==b.duration?b.duration:1E3,h=b.easing?b.easing:Wf;return function(b,c){if(c.time<d)return c.animate=!0,c.viewHints[0]+=1,!0;if(c.time<d+g){var n=1-h((c.time-d)/g),p=e-c.viewState.center[0],q=f-c.viewState.center[1];c.animate=!0;c.viewState.center[0]+=n*p;c.viewState.center[1]+=n*q;c.viewHints[0]+=1;return!0}return!1}}
function ag(b){var c=b.rotation?b.rotation:0,d=b.start?b.start:Date.now(),e=void 0!==b.duration?b.duration:1E3,f=b.easing?b.easing:Wf,g=b.anchor?b.anchor:null;return function(b,k){if(k.time<d)return k.animate=!0,k.viewHints[0]+=1,!0;if(k.time<d+e){var m=1-f((k.time-d)/e),m=(c-k.viewState.rotation)*m;k.animate=!0;k.viewState.rotation+=m;if(g){var n=k.viewState.center;n[0]-=g[0];n[1]-=g[1];wd(n,m);rd(n,g)}k.viewHints[0]+=1;return!0}return!1}}
function bg(b){var c=b.resolution,d=b.start?b.start:Date.now(),e=void 0!==b.duration?b.duration:1E3,f=b.easing?b.easing:Wf;return function(b,h){if(h.time<d)return h.animate=!0,h.viewHints[0]+=1,!0;if(h.time<d+e){var k=1-f((h.time-d)/e),m=c-h.viewState.resolution;h.animate=!0;h.viewState.resolution+=k*m;h.viewHints[0]+=1;return!0}return!1}};function cg(b,c,d,e){return void 0!==e?(e[0]=b,e[1]=c,e[2]=d,e):[b,c,d]}function dg(b,c,d){return b+"/"+c+"/"+d}function eg(b){var c=b[0],d=Array(c),e=1<<c-1,f,g;for(f=0;f<c;++f)g=48,b[1]&e&&(g+=1),b[2]&e&&(g+=2),d[f]=String.fromCharCode(g),e>>=1;return d.join("")}function fg(b){return dg(b[0],b[1],b[2])};function gg(b,c,d,e){this.a=b;this.f=c;this.c=d;this.b=e}gg.prototype.contains=function(b){return hg(this,b[1],b[2])};function hg(b,c,d){return b.a<=c&&c<=b.f&&b.c<=d&&d<=b.b}function ig(b,c){return b.a==c.a&&b.c==c.c&&b.f==c.f&&b.b==c.b}function jg(b){return b.b-b.c+1}function kg(b){return b.f-b.a+1}function lg(b,c){return b.a<=c.f&&b.f>=c.a&&b.c<=c.b&&b.b>=c.c};function mg(b){this.c=b.html;this.a=b.tileRanges?b.tileRanges:null}mg.prototype.b=function(){return this.c};function ng(b,c,d){vc.call(this,b,d);this.element=c}y(ng,vc);function og(b){id.call(this);this.a=b?b:[];pg(this)}y(og,id);l=og.prototype;l.clear=function(){for(;0<this.$b();)this.pop()};l.tf=function(b){var c,d;c=0;for(d=b.length;c<d;++c)this.push(b[c]);return this};l.forEach=function(b,c){this.a.forEach(b,c)};l.sl=function(){return this.a};l.item=function(b){return this.a[b]};l.$b=function(){return this.get("length")};l.ke=function(b,c){mb(this.a,b,0,c);pg(this);this.o(new ng("add",c,this))};
l.pop=function(){return this.Rf(this.$b()-1)};l.push=function(b){var c=this.a.length;this.ke(c,b);return c};l.remove=function(b){var c=this.a,d,e;d=0;for(e=c.length;d<e;++d)if(c[d]===b)return this.Rf(d)};l.Rf=function(b){var c=this.a[b];Za.splice.call(this.a,b,1);pg(this);this.o(new ng("remove",c,this));return c};l.Jo=function(b,c){var d=this.$b();if(b<d)d=this.a[b],this.a[b]=c,this.o(new ng("remove",d,this)),this.o(new ng("add",c,this));else{for(;d<b;++d)this.ke(d,void 0);this.ke(b,c)}};
function pg(b){b.set("length",b.a.length)};var qg=/^#(?:[0-9a-f]{3}){1,2}$/i,rg=/^(?:rgb)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2})\)$/i,sg=/^(?:rgba)?\((0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|[1-9]\d{0,2}),\s?(0|1|0\.\d{0,10})\)$/i;function tg(b){return ga(b)?b:ug(b)}function vg(b){if(!ia(b)){var c=b[0];c!=(c|0)&&(c=c+.5|0);var d=b[1];d!=(d|0)&&(d=d+.5|0);var e=b[2];e!=(e|0)&&(e=e+.5|0);b="rgba("+c+","+d+","+e+","+b[3]+")"}return b}
var ug=function(){var b={},c=0;return function(d){var e;if(b.hasOwnProperty(d))e=b[d];else{if(1024<=c){e=0;for(var f in b)0===(e++&3)&&(delete b[f],--c)}var g,h;qg.exec(d)?(h=3==d.length-1?1:2,e=parseInt(d.substr(1+0*h,h),16),f=parseInt(d.substr(1+1*h,h),16),g=parseInt(d.substr(1+2*h,h),16),1==h&&(e=(e<<4)+e,f=(f<<4)+f,g=(g<<4)+g),e=[e,f,g,1]):(h=sg.exec(d))?(e=Number(h[1]),f=Number(h[2]),g=Number(h[3]),h=Number(h[4]),e=[e,f,g,h],e=wg(e,e)):(h=rg.exec(d))?(e=Number(h[1]),f=Number(h[2]),g=Number(h[3]),
e=[e,f,g,1],e=wg(e,e)):e=void 0;b[d]=e;++c}return e}}();function wg(b,c){var d=c||[];d[0]=Sa(b[0]+.5|0,0,255);d[1]=Sa(b[1]+.5|0,0,255);d[2]=Sa(b[2]+.5|0,0,255);d[3]=Sa(b[3],0,1);return d};var xg=!Zb||9<=lc;!ac&&!Zb||Zb&&9<=lc||ac&&jc("1.9.1");Zb&&jc("9");function yg(b,c){this.x=ca(b)?b:0;this.y=ca(c)?c:0}l=yg.prototype;l.clone=function(){return new yg(this.x,this.y)};l.ceil=function(){this.x=Math.ceil(this.x);this.y=Math.ceil(this.y);return this};l.floor=function(){this.x=Math.floor(this.x);this.y=Math.floor(this.y);return this};l.round=function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this};l.scale=function(b,c){var d=ja(c)?c:b;this.x*=b;this.y*=d;return this};function zg(b,c){this.width=b;this.height=c}l=zg.prototype;l.clone=function(){return new zg(this.width,this.height)};l.oj=function(){return this.width*this.height};l.Ka=function(){return!this.oj()};l.ceil=function(){this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};l.floor=function(){this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};l.round=function(){this.width=Math.round(this.width);this.height=Math.round(this.height);return this};
l.scale=function(b,c){var d=ja(c)?c:b;this.width*=b;this.height*=d;return this};function Ag(b){return b?new Bg(Cg(b)):ya||(ya=new Bg)}function Dg(b){var c=document;return ia(b)?c.getElementById(b):b}function Eg(b,c){Ib(c,function(c,e){"style"==e?b.style.cssText=c:"class"==e?b.className=c:"for"==e?b.htmlFor=c:Fg.hasOwnProperty(e)?b.setAttribute(Fg[e],c):0==e.lastIndexOf("aria-",0)||0==e.lastIndexOf("data-",0)?b.setAttribute(e,c):b[e]=c})}
var Fg={cellpadding:"cellPadding",cellspacing:"cellSpacing",colspan:"colSpan",frameborder:"frameBorder",height:"height",maxlength:"maxLength",role:"role",rowspan:"rowSpan",type:"type",usemap:"useMap",valign:"vAlign",width:"width"};function Gg(b){b=b.document.documentElement;return new zg(b.clientWidth,b.clientHeight)}
function Hg(b,c,d){var e=arguments,f=document,g=e[0],h=e[1];if(!xg&&h&&(h.name||h.type)){g=["<",g];h.name&&g.push(' name="',Da(h.name),'"');if(h.type){g.push(' type="',Da(h.type),'"');var k={};Xb(k,h);delete k.type;h=k}g.push(">");g=g.join("")}g=f.createElement(g);h&&(ia(h)?g.className=h:ga(h)?g.className=h.join(" "):Eg(g,h));2<e.length&&Ig(f,g,e,2);return g}
function Ig(b,c,d,e){function f(d){d&&c.appendChild(ia(d)?b.createTextNode(d):d)}for(;e<d.length;e++){var g=d[e];!ha(g)||ma(g)&&0<g.nodeType?f(g):ab(Jg(g)?jb(g):g,f)}}function Kg(b){return document.createElement(b)}function Lg(b,c){Ig(Cg(b),b,arguments,1)}function Mg(b){for(var c;c=b.firstChild;)b.removeChild(c)}function Ng(b,c,d){b.insertBefore(c,b.childNodes[d]||null)}function Og(b){b&&b.parentNode&&b.parentNode.removeChild(b)}function Pg(b,c){var d=c.parentNode;d&&d.replaceChild(b,c)}
function Qg(b){if(ca(b.firstElementChild))b=b.firstElementChild;else for(b=b.firstChild;b&&1!=b.nodeType;)b=b.nextSibling;return b}function Rg(b,c){if(b.contains&&1==c.nodeType)return b==c||b.contains(c);if("undefined"!=typeof b.compareDocumentPosition)return b==c||Boolean(b.compareDocumentPosition(c)&16);for(;c&&b!=c;)c=c.parentNode;return c==b}function Cg(b){return 9==b.nodeType?b:b.ownerDocument||b.document}
function Jg(b){if(b&&"number"==typeof b.length){if(ma(b))return"function"==typeof b.item||"string"==typeof b.item;if(ka(b))return"function"==typeof b.item}return!1}function Bg(b){this.a=b||ba.document||document}Bg.prototype.I=Eg;function Sg(){return!0}
function Tg(b){var c=b.a;b=c.scrollingElement?c.scrollingElement:bc?c.body||c.documentElement:c.documentElement;c=c.parentWindow||c.defaultView;return Zb&&jc("10")&&c.pageYOffset!=b.scrollTop?new yg(b.scrollLeft,b.scrollTop):new yg(c.pageXOffset||b.scrollLeft,c.pageYOffset||b.scrollTop)}Bg.prototype.appendChild=function(b,c){b.appendChild(c)};Bg.prototype.contains=Rg;function Ug(b){if(b.classList)return b.classList;b=b.className;return ia(b)&&b.match(/\S+/g)||[]}function Vg(b,c){var d;b.classList?d=b.classList.contains(c):(d=Ug(b),d=0<=$a(d,c));return d}function Wg(b,c){b.classList?b.classList.add(c):Vg(b,c)||(b.className+=0<b.className.length?" "+c:c)}function Xg(b,c){b.classList?b.classList.remove(c):Vg(b,c)&&(b.className=bb(Ug(b),function(b){return b!=c}).join(" "))}function Yg(b,c){Vg(b,c)?Xg(b,c):Wg(b,c)};function Zg(b,c,d,e){this.top=b;this.right=c;this.bottom=d;this.left=e}l=Zg.prototype;l.clone=function(){return new Zg(this.top,this.right,this.bottom,this.left)};l.contains=function(b){return this&&b?b instanceof Zg?b.left>=this.left&&b.right<=this.right&&b.top>=this.top&&b.bottom<=this.bottom:b.x>=this.left&&b.x<=this.right&&b.y>=this.top&&b.y<=this.bottom:!1};
l.ceil=function(){this.top=Math.ceil(this.top);this.right=Math.ceil(this.right);this.bottom=Math.ceil(this.bottom);this.left=Math.ceil(this.left);return this};l.floor=function(){this.top=Math.floor(this.top);this.right=Math.floor(this.right);this.bottom=Math.floor(this.bottom);this.left=Math.floor(this.left);return this};l.round=function(){this.top=Math.round(this.top);this.right=Math.round(this.right);this.bottom=Math.round(this.bottom);this.left=Math.round(this.left);return this};
l.scale=function(b,c){var d=ja(c)?c:b;this.left*=b;this.right*=b;this.top*=d;this.bottom*=d;return this};function $g(b,c,d,e){this.left=b;this.top=c;this.width=d;this.height=e}l=$g.prototype;l.clone=function(){return new $g(this.left,this.top,this.width,this.height)};l.contains=function(b){return b instanceof $g?this.left<=b.left&&this.left+this.width>=b.left+b.width&&this.top<=b.top&&this.top+this.height>=b.top+b.height:b.x>=this.left&&b.x<=this.left+this.width&&b.y>=this.top&&b.y<=this.top+this.height};
l.distance=function(b){var c=b.x<this.left?this.left-b.x:Math.max(b.x-(this.left+this.width),0);b=b.y<this.top?this.top-b.y:Math.max(b.y-(this.top+this.height),0);return Math.sqrt(c*c+b*b)};l.ceil=function(){this.left=Math.ceil(this.left);this.top=Math.ceil(this.top);this.width=Math.ceil(this.width);this.height=Math.ceil(this.height);return this};l.floor=function(){this.left=Math.floor(this.left);this.top=Math.floor(this.top);this.width=Math.floor(this.width);this.height=Math.floor(this.height);return this};
l.round=function(){this.left=Math.round(this.left);this.top=Math.round(this.top);this.width=Math.round(this.width);this.height=Math.round(this.height);return this};l.scale=function(b,c){var d=ja(c)?c:b;this.left*=b;this.width*=b;this.top*=d;this.height*=d;return this};function ah(b,c){var d=Cg(b);return d.defaultView&&d.defaultView.getComputedStyle&&(d=d.defaultView.getComputedStyle(b,null))?d[c]||d.getPropertyValue(c)||"":""}function bh(b,c){return ah(b,c)||(b.currentStyle?b.currentStyle[c]:null)||b.style&&b.style[c]}function ch(b,c,d){var e;c instanceof yg?(e=c.x,c=c.y):(e=c,c=d);b.style.left=dh(e);b.style.top=dh(c)}
function eh(b){var c;try{c=b.getBoundingClientRect()}catch(d){return{left:0,top:0,right:0,bottom:0}}Zb&&b.ownerDocument.body&&(b=b.ownerDocument,c.left-=b.documentElement.clientLeft+b.body.clientLeft,c.top-=b.documentElement.clientTop+b.body.clientTop);return c}function fh(b){if(1==b.nodeType)return b=eh(b),new yg(b.left,b.top);b=b.changedTouches?b.changedTouches[0]:b;return new yg(b.clientX,b.clientY)}function dh(b){"number"==typeof b&&(b=b+"px");return b}
function gh(b){var c=hh;if("none"!=bh(b,"display"))return c(b);var d=b.style,e=d.display,f=d.visibility,g=d.position;d.visibility="hidden";d.position="absolute";d.display="inline";b=c(b);d.display=e;d.position=g;d.visibility=f;return b}function hh(b){var c=b.offsetWidth,d=b.offsetHeight,e=bc&&!c&&!d;return ca(c)&&!e||!b.getBoundingClientRect?new zg(c,d):(b=eh(b),new zg(b.right-b.left,b.bottom-b.top))}function ih(b,c){b.style.display=c?"":"none"}
function jh(b,c,d,e){if(/^\d+px?$/.test(c))return parseInt(c,10);var f=b.style[d],g=b.runtimeStyle[d];b.runtimeStyle[d]=b.currentStyle[d];b.style[d]=c;c=b.style[e];b.style[d]=f;b.runtimeStyle[d]=g;return c}function kh(b,c){var d=b.currentStyle?b.currentStyle[c]:null;return d?jh(b,d,"left","pixelLeft"):0}
function lh(b,c){if(Zb){var d=kh(b,c+"Left"),e=kh(b,c+"Right"),f=kh(b,c+"Top"),g=kh(b,c+"Bottom");return new Zg(f,e,g,d)}d=ah(b,c+"Left");e=ah(b,c+"Right");f=ah(b,c+"Top");g=ah(b,c+"Bottom");return new Zg(parseFloat(f),parseFloat(e),parseFloat(g),parseFloat(d))}var mh={thin:2,medium:4,thick:6};function nh(b,c){if("none"==(b.currentStyle?b.currentStyle[c+"Style"]:null))return 0;var d=b.currentStyle?b.currentStyle[c+"Width"]:null;return d in mh?mh[d]:jh(b,d,"left","pixelLeft")}
function oh(b){if(Zb&&!(9<=lc)){var c=nh(b,"borderLeft"),d=nh(b,"borderRight"),e=nh(b,"borderTop");b=nh(b,"borderBottom");return new Zg(e,d,b,c)}c=ah(b,"borderLeftWidth");d=ah(b,"borderRightWidth");e=ah(b,"borderTopWidth");b=ah(b,"borderBottomWidth");return new Zg(parseFloat(e),parseFloat(d),parseFloat(b),parseFloat(c))};function ph(b,c,d){vc.call(this,b);this.map=c;this.frameState=void 0!==d?d:null}y(ph,vc);function qh(b){id.call(this);this.element=b.element?b.element:null;this.a=this.U=null;this.u=[];this.render=b.render?b.render:wa;b.target&&this.f(b.target)}y(qh,id);qh.prototype.X=function(){Og(this.element);qh.da.X.call(this)};qh.prototype.g=function(){return this.a};
qh.prototype.setMap=function(b){this.a&&Og(this.element);0<this.u.length&&(this.u.forEach(Zc),this.u.length=0);if(this.a=b)(this.U?this.U:b.D).appendChild(this.element),this.render!==wa&&this.u.push(C(b,"postrender",this.render,!1,this)),b.render()};qh.prototype.f=function(b){this.U=Dg(b)};function rh(){this.b=0;this.f={};this.c=this.a=null}l=rh.prototype;l.clear=function(){this.b=0;this.f={};this.c=this.a=null};function sh(b,c){return b.f.hasOwnProperty(c)}l.forEach=function(b,c){for(var d=this.a;d;)b.call(c,d.zc,d.ne,this),d=d.sb};l.get=function(b){b=this.f[b];if(b===this.c)return b.zc;b===this.a?(this.a=this.a.sb,this.a.gc=null):(b.sb.gc=b.gc,b.gc.sb=b.sb);b.sb=null;b.gc=this.c;this.c=this.c.sb=b;return b.zc};l.nc=function(){return this.b};
l.O=function(){var b=Array(this.b),c=0,d;for(d=this.c;d;d=d.gc)b[c++]=d.ne;return b};l.pc=function(){var b=Array(this.b),c=0,d;for(d=this.c;d;d=d.gc)b[c++]=d.zc;return b};l.pop=function(){var b=this.a;delete this.f[b.ne];b.sb&&(b.sb.gc=null);this.a=b.sb;this.a||(this.c=null);--this.b;return b.zc};l.set=function(b,c){var d={ne:b,sb:null,gc:this.c,zc:c};this.c?this.c.sb=d:this.a=d;this.c=d;this.f[b]=d;++this.b};function th(b){rh.call(this);this.g=void 0!==b?b:2048}y(th,rh);function uh(b){return b.nc()>b.g}function vh(b,c){for(var d,e;uh(b)&&!(d=b.a.zc,e=d.a[0].toString(),e in c&&c[e].contains(d.a));)b.pop().Ec()};function wh(b,c){cd.call(this);this.a=b;this.state=c}y(wh,cd);function xh(b){b.o("change")}wh.prototype.tb=function(){return w(this).toString()};wh.prototype.f=function(){return this.a};function yh(b){id.call(this);this.f=Fe(b.projection);this.j=void 0!==b.attributions?b.attributions:null;this.U=b.logo;this.A=void 0!==b.state?b.state:"ready";this.S=void 0!==b.wrapX?b.wrapX:!1}y(yh,id);l=yh.prototype;l.xe=wa;l.sa=function(){return this.j};l.qa=function(){return this.U};l.ta=function(){return this.f};l.ua=function(){return this.A};function zh(b){return b.S}l.na=function(b){this.j=b;this.s()};function Ah(b,c){b.A=c;b.s()};function Bh(b){this.minZoom=void 0!==b.minZoom?b.minZoom:0;this.a=b.resolutions;this.maxZoom=this.a.length-1;this.b=void 0!==b.origin?b.origin:null;this.g=null;void 0!==b.origins&&(this.g=b.origins);var c=b.extent;void 0===c||this.b||this.g||(this.b=he(c));this.j=null;void 0!==b.tileSizes&&(this.j=b.tileSizes);this.l=void 0!==b.tileSize?b.tileSize:this.j?null:256;this.u=void 0!==c?c:null;this.c=null;void 0!==b.sizes?this.c=b.sizes.map(function(b){return new gg(Math.min(0,b[0]),Math.max(b[0]-1,-1),
Math.min(0,b[1]),Math.max(b[1]-1,-1))},this):c&&Ch(this,c);this.f=[0,0]}var Dh=[0,0,0];function Eh(b,c,d,e,f){f=b.Aa(c,f);for(c=c[0]-1;c>=b.minZoom;){if(d.call(null,c,Fh(b,f,c,e)))return!0;--c}return!1}l=Bh.prototype;l.J=function(){return this.u};l.Cg=function(){return this.maxZoom};l.Dg=function(){return this.minZoom};l.Ca=function(b){return this.b?this.b:this.g[b]};l.$=function(b){return this.a[b]};l.wh=function(){return this.a};
function Gh(b,c,d,e){return c[0]<b.maxZoom?(e=b.Aa(c,e),Fh(b,e,c[0]+1,d)):null}function Hh(b,c,d,e){Ih(b,c[0],c[1],d,!1,Dh);var f=Dh[1],g=Dh[2];Ih(b,c[2],c[3],d,!0,Dh);b=Dh[1];c=Dh[2];void 0!==e?(e.a=f,e.f=b,e.c=g,e.b=c):e=new gg(f,b,g,c);return e}function Fh(b,c,d,e){d=b.$(d);return Hh(b,c,d,e)}function Jh(b,c){var d=b.Ca(c[0]),e=b.$(c[0]),f=od(b.Ha(c[0]),b.f);return[d[0]+(c[1]+.5)*f[0]*e,d[1]+(c[2]+.5)*f[1]*e]}
l.Aa=function(b,c){var d=this.Ca(b[0]),e=this.$(b[0]),f=od(this.Ha(b[0]),this.f),g=d[0]+b[1]*f[0]*e,d=d[1]+b[2]*f[1]*e;return Rd(g,d,g+f[0]*e,d+f[1]*e,c)};l.ee=function(b,c,d){return Ih(this,b[0],b[1],c,!1,d)};function Ih(b,c,d,e,f,g){var h=Kh(b,e),k=e/b.$(h),m=b.Ca(h);b=od(b.Ha(h),b.f);c=k*Math.floor((c-m[0])/e+(f?.5:0))/b[0];d=k*Math.floor((d-m[1])/e+(f?0:.5))/b[1];f?(c=Math.ceil(c)-1,d=Math.ceil(d)-1):(c=Math.floor(c),d=Math.floor(d));return cg(h,c,d,g)}
l.fe=function(b,c,d){c=this.$(c);return Ih(this,b[0],b[1],c,!1,d)};l.Ha=function(b){return this.l?this.l:this.j[b]};function Kh(b,c){var d=wb(b.a,c,0);return Sa(d,b.minZoom,b.maxZoom)}function Ch(b,c){for(var d=b.a.length,e=Array(d),f=b.minZoom;f<d;++f)e[f]=Fh(b,c,f);b.c=e}function Lh(b){var c=b.l;if(!c){var c=Mh(b),d=Nh(c,void 0,void 0),c=new Bh({extent:c,origin:he(c),resolutions:d,tileSize:void 0});b.l=c}return c}
function Oh(b){var c={};Xb(c,void 0!==b?b:{});void 0===c.extent&&(c.extent=Fe("EPSG:3857").J());c.resolutions=Nh(c.extent,c.maxZoom,c.tileSize);delete c.maxZoom;return new Bh(c)}function Nh(b,c,d){c=void 0!==c?c:42;var e=le(b);b=ke(b);d=od(void 0!==d?d:256);d=Math.max(b/d[0],e/d[1]);c+=1;e=Array(c);for(b=0;b<c;++b)e[b]=d/Math.pow(2,b);return e}function Mh(b){b=Fe(b);var c=b.J();c||(b=180*Ce.degrees/b.Jc(),c=Rd(-b,-b,b,b));return c};function Ph(b){yh.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,projection:b.projection,state:b.state,wrapX:b.wrapX});this.pa=void 0!==b.opaque?b.opaque:!1;this.C=void 0!==b.tilePixelRatio?b.tilePixelRatio:1;this.tileGrid=void 0!==b.tileGrid?b.tileGrid:null;this.a=new th(b.cf);this.b=[0,0]}y(Ph,yh);l=Ph.prototype;l.nh=function(){return uh(this.a)};l.oh=function(b,c){var d=this.td(b);d&&vh(d,c)};
function Qh(b,c,d,e,f){c=b.td(c);if(!c)return!1;for(var g=!0,h,k,m=e.a;m<=e.f;++m)for(var n=e.c;n<=e.b;++n)h=b.gb(d,m,n),k=!1,sh(c,h)&&(h=c.get(h),(k=2===h.state)&&(k=!1!==f(h))),k||(g=!1);return g}l.$d=function(){return 0};l.gb=dg;l.Ga=function(){return this.tileGrid};l.hb=function(b){return this.tileGrid?this.tileGrid:Lh(b)};l.td=function(b){var c=this.f;return c&&!Xe(c,b)?null:this.a};l.Pb=function(b,c,d){c=this.hb(d);return nd(od(c.Ha(b),this.b),this.C,this.b)};
function Rh(b,c,d){var e=void 0!==d?d:b.f;d=b.hb(e);if(b.S&&e.f){var f=c;c=f[0];b=Jh(d,f);e=Mh(e);Vd(e,b)?c=f:(f=ke(e),b[0]+=f*Math.ceil((e[0]-b[0])/f),c=d.fe(b,c))}f=c[0];e=c[1];b=c[2];if(d.minZoom>f||f>d.maxZoom)d=!1;else{var g=d.J();d=(d=g?Fh(d,g,f):d.c?d.c[f]:null)?hg(d,e,b):!0}return d?c:null}l.Xf=wa;function Sh(b,c){vc.call(this,b);this.tile=c}y(Sh,vc);function Th(b){b=b?b:{};this.D=Kg("UL");this.A=Kg("LI");this.D.appendChild(this.A);ih(this.A,!1);this.b=void 0!==b.collapsed?b.collapsed:!0;this.i=void 0!==b.collapsible?b.collapsible:!0;this.i||(this.b=!1);var c=b.className?b.className:"ol-attribution",d=b.tipLabel?b.tipLabel:"Attributions",e=b.collapseLabel?b.collapseLabel:"\u00bb";this.G=ia(e)?Hg("SPAN",{},e):e;e=b.label?b.label:"i";this.S=ia(e)?Hg("SPAN",{},e):e;d=Hg("BUTTON",{type:"button",title:d},this.i&&!this.b?this.G:this.S);C(d,"click",
this.Ll,!1,this);C(d,["mouseout",yc],function(){this.blur()},!1);c=Hg("DIV",c+" ol-unselectable ol-control"+(this.b&&this.i?" ol-collapsed":"")+(this.i?"":" ol-uncollapsible"),this.D,d);qh.call(this,{element:c,render:b.render?b.render:Uh,target:b.target});this.C=!0;this.l={};this.j={};this.T={}}y(Th,qh);
function Uh(b){if(b=b.frameState){var c,d,e,f,g,h,k,m,n,p,q,r=b.layerStatesArray,t=Ub(b.attributions),x={},z=b.viewState.projection;d=0;for(c=r.length;d<c;d++)if(h=r[d].layer.fa())if(p=w(h).toString(),n=h.j)for(e=0,f=n.length;e<f;e++)if(k=n[e],m=w(k).toString(),!(m in t)){if(g=b.usedTiles[p]){var B=h.hb(z);a:{q=k;var A=z;if(q.a){var v=void 0,O=void 0,K=void 0,I=void 0;for(I in g)if(I in q.a)for(var K=g[I],G,v=0,O=q.a[I].length;v<O;++v){G=q.a[I][v];if(lg(G,K)){q=!0;break a}var la=Fh(B,A.J(),parseInt(I,
10)),Ea=kg(la);if(K.a<la.a||K.f>la.f)if(lg(G,new gg(pd(K.a,Ea),pd(K.f,Ea),K.c,K.b))||kg(K)>Ea&&lg(G,la)){q=!0;break a}}q=!1}else q=!0}}else q=!1;q?(m in x&&delete x[m],t[m]=k):x[m]=k}c=[t,x];d=c[0];c=c[1];for(var L in this.l)L in d?(this.j[L]||(ih(this.l[L],!0),this.j[L]=!0),delete d[L]):L in c?(this.j[L]&&(ih(this.l[L],!1),delete this.j[L]),delete c[L]):(Og(this.l[L]),delete this.l[L],delete this.j[L]);for(L in d)e=Kg("LI"),e.innerHTML=d[L].c,this.D.appendChild(e),this.l[L]=e,this.j[L]=!0;for(L in c)e=
Kg("LI"),e.innerHTML=c[L].c,ih(e,!1),this.D.appendChild(e),this.l[L]=e;L=!Qb(this.j)||!Qb(b.logos);this.C!=L&&(ih(this.element,L),this.C=L);L&&Qb(this.j)?Wg(this.element,"ol-logo-only"):Xg(this.element,"ol-logo-only");var za;b=b.logos;L=this.T;for(za in L)za in b||(Og(L[za]),delete L[za]);for(var Ra in b)Ra in L||(za=new Image,za.src=Ra,d=b[Ra],""===d?d=za:(d=Hg("A",{href:d}),d.appendChild(za)),this.A.appendChild(d),L[Ra]=d);ih(this.A,!Qb(b))}else this.C&&(ih(this.element,!1),this.C=!1)}l=Th.prototype;
l.Ll=function(b){b.preventDefault();Vh(this)};function Vh(b){Yg(b.element,"ol-collapsed");b.b?Pg(b.G,b.S):Pg(b.S,b.G);b.b=!b.b}l.Kl=function(){return this.i};l.Nl=function(b){this.i!==b&&(this.i=b,Yg(this.element,"ol-uncollapsible"),!b&&this.b&&Vh(this))};l.Ml=function(b){this.i&&this.b!==b&&Vh(this)};l.Jl=function(){return this.b};function Wh(b){b=b?b:{};var c=b.className?b.className:"ol-rotate",d=b.label?b.label:"\u21e7";this.b=null;ia(d)?this.b=Hg("SPAN","ol-compass",d):(this.b=d,Wg(this.b,"ol-compass"));d=Hg("BUTTON",{"class":c+"-reset",type:"button",title:b.tipLabel?b.tipLabel:"Reset rotation"},this.b);C(d,"click",Wh.prototype.A,!1,this);c=Hg("DIV",c+" ol-unselectable ol-control",d);qh.call(this,{element:c,render:b.render?b.render:Xh,target:b.target});this.i=b.duration?b.duration:250;this.j=void 0!==b.autoHide?b.autoHide:
!0;this.l=void 0;this.j&&Wg(this.element,"ol-hidden")}y(Wh,qh);Wh.prototype.A=function(b){b.preventDefault();b=this.a;var c=b.aa();if(c){var d=c.Ea();void 0!==d&&(0<this.i&&(d%=2*Math.PI,d<-Math.PI&&(d+=2*Math.PI),d>Math.PI&&(d-=2*Math.PI),b.Ma(ag({rotation:d,duration:this.i,easing:Vf}))),c.te(0))}};
function Xh(b){if(b=b.frameState){b=b.viewState.rotation;if(b!=this.l){var c="rotate("+b+"rad)";if(this.j){var d=this.element;0===b?Wg(d,"ol-hidden"):Xg(d,"ol-hidden")}this.b.style.msTransform=c;this.b.style.webkitTransform=c;this.b.style.transform=c}this.l=b}};function Yh(b){b=b?b:{};var c=b.className?b.className:"ol-zoom",d=b.delta?b.delta:1,e=b.zoomOutLabel?b.zoomOutLabel:"\u2212",f=b.zoomOutTipLabel?b.zoomOutTipLabel:"Zoom out",g=Hg("BUTTON",{"class":c+"-in",type:"button",title:b.zoomInTipLabel?b.zoomInTipLabel:"Zoom in"},b.zoomInLabel?b.zoomInLabel:"+");C(g,"click",sa(Yh.prototype.j,d),!1,this);e=Hg("BUTTON",{"class":c+"-out",type:"button",title:f},e);C(e,"click",sa(Yh.prototype.j,-d),!1,this);c=Hg("DIV",c+" ol-unselectable ol-control",g,e);qh.call(this,
{element:c,target:b.target});this.b=void 0!==b.duration?b.duration:250}y(Yh,qh);Yh.prototype.j=function(b,c){c.preventDefault();var d=this.a,e=d.aa();if(e){var f=e.$();f&&(0<this.b&&d.Ma(bg({resolution:f,duration:this.b,easing:Vf})),d=e.constrainResolution(f,b),e.Ub(d))}};function Zh(b){b=b?b:{};var c=new og;(void 0!==b.zoom?b.zoom:1)&&c.push(new Yh(b.zoomOptions));(void 0!==b.rotate?b.rotate:1)&&c.push(new Wh(b.rotateOptions));(void 0!==b.attribution?b.attribution:1)&&c.push(new Th(b.attributionOptions));return c};var $h=bc?"webkitfullscreenchange":ac?"mozfullscreenchange":Zb?"MSFullscreenChange":"fullscreenchange";function ai(){var b=Ag().a,c=b.body;return!!(c.webkitRequestFullscreen||c.mozRequestFullScreen&&b.mozFullScreenEnabled||c.msRequestFullscreen&&b.msFullscreenEnabled||c.requestFullscreen&&b.fullscreenEnabled)}
function bi(b){b.webkitRequestFullscreen?b.webkitRequestFullscreen():b.mozRequestFullScreen?b.mozRequestFullScreen():b.msRequestFullscreen?b.msRequestFullscreen():b.requestFullscreen&&b.requestFullscreen()}function di(){var b=Ag().a;return!!(b.webkitIsFullScreen||b.mozFullScreen||b.msFullscreenElement||b.fullscreenElement)};function ei(b){b=b?b:{};this.b=b.className?b.className:"ol-full-screen";var c=b.label?b.label:"\u2194";this.j=ia(c)?document.createTextNode(String(c)):c;c=b.labelActive?b.labelActive:"\u00d7";this.i=ia(c)?document.createTextNode(String(c)):c;c=b.tipLabel?b.tipLabel:"Toggle full-screen";c=Hg("BUTTON",{"class":this.b+"-"+di(),type:"button",title:c},this.j);C(c,"click",this.C,!1,this);C(ba.document,$h,this.l,!1,this);var d=this.b+" ol-unselectable ol-control "+(ai()?"":"ol-unsupported"),c=Hg("DIV",d,
c);qh.call(this,{element:c,target:b.target});this.A=void 0!==b.keys?b.keys:!1}y(ei,qh);ei.prototype.C=function(b){b.preventDefault();ai()&&(b=this.a)&&(di()?(b=Ag().a,b.webkitCancelFullScreen?b.webkitCancelFullScreen():b.mozCancelFullScreen?b.mozCancelFullScreen():b.msExitFullscreen?b.msExitFullscreen():b.exitFullscreen&&b.exitFullscreen()):(b=b.wf(),b=Dg(b),this.A?b.mozRequestFullScreenWithKeys?b.mozRequestFullScreenWithKeys():b.webkitRequestFullscreen?b.webkitRequestFullscreen():bi(b):bi(b)))};
ei.prototype.l=function(){var b=this.b+"-true",c=this.b+"-false",d=Qg(this.element),e=this.a;di()?(Vg(d,c)&&(Xg(d,c),Wg(d,b)),Pg(this.i,this.j)):(Vg(d,b)&&(Xg(d,b),Wg(d,c)),Pg(this.j,this.i));e&&e.Uc()};function fi(b){b=b?b:{};var c=Hg("DIV",b.className?b.className:"ol-mouse-position");qh.call(this,{element:c,render:b.render?b.render:gi,target:b.target});C(this,kd("projection"),this.Ol,!1,this);b.coordinateFormat&&this.Th(b.coordinateFormat);b.projection&&this.$g(Fe(b.projection));this.A=b.undefinedHTML?b.undefinedHTML:"";this.l=c.innerHTML;this.i=this.j=this.b=null}y(fi,qh);
function gi(b){b=b.frameState;b?this.b!=b.viewState.projection&&(this.b=b.viewState.projection,this.j=null):this.b=null;hi(this,this.i)}l=fi.prototype;l.Ol=function(){this.j=null};l.vg=function(){return this.get("coordinateFormat")};l.Zg=function(){return this.get("projection")};l.Jk=function(b){this.i=this.a.Zd(b.a);hi(this,this.i)};l.Kk=function(){hi(this,null);this.i=null};
l.setMap=function(b){fi.da.setMap.call(this,b);b&&(b=b.a,this.u.push(C(b,"mousemove",this.Jk,!1,this),C(b,"mouseout",this.Kk,!1,this)))};l.Th=function(b){this.set("coordinateFormat",b)};l.$g=function(b){this.set("projection",b)};function hi(b,c){var d=b.A;if(c&&b.b){if(!b.j){var e=b.Zg();b.j=e?Je(b.b,e):Ze}if(e=b.a.Fa(c))b.j(e,e),d=(d=b.vg())?d(e):e.toString()}b.l&&d==b.l||(b.element.innerHTML=d,b.l=d)};function ii(b,c,d){pc.call(this);this.wa=null;this.b=!1;this.j=b;this.g=d;this.a=c||window;this.c=ra(this.f,this)}y(ii,pc);ii.prototype.start=function(){ji(this);this.b=!1;var b=ki(this),c=li(this);b&&!c&&this.a.mozRequestAnimationFrame?(this.wa=C(this.a,"MozBeforePaint",this.c),this.a.mozRequestAnimationFrame(null),this.b=!0):this.wa=b&&c?b.call(this.a,this.c):this.a.setTimeout(xe(this.c),20)};
function ji(b){if(null!=b.wa){var c=ki(b),d=li(b);c&&!d&&b.a.mozRequestAnimationFrame?Zc(b.wa):c&&d?d.call(b.a,b.wa):b.a.clearTimeout(b.wa)}b.wa=null}ii.prototype.f=function(){this.b&&this.wa&&Zc(this.wa);this.wa=null;this.j.call(this.g,ta())};ii.prototype.X=function(){ji(this);ii.da.X.call(this)};function ki(b){b=b.a;return b.requestAnimationFrame||b.webkitRequestAnimationFrame||b.mozRequestAnimationFrame||b.oRequestAnimationFrame||b.msRequestAnimationFrame||null}
function li(b){b=b.a;return b.cancelAnimationFrame||b.cancelRequestAnimationFrame||b.webkitCancelRequestAnimationFrame||b.mozCancelRequestAnimationFrame||b.oCancelRequestAnimationFrame||b.msCancelRequestAnimationFrame||null};function mi(b){ba.setTimeout(function(){throw b;},0)}function ni(b,c){var d=b;c&&(d=ra(b,c));d=oi(d);!ka(ba.setImmediate)||ba.Window&&ba.Window.prototype&&ba.Window.prototype.setImmediate==ba.setImmediate?(pi||(pi=qi()),pi(d)):ba.setImmediate(d)}var pi;
function qi(){var b=ba.MessageChannel;"undefined"===typeof b&&"undefined"!==typeof window&&window.postMessage&&window.addEventListener&&!Hb("Presto")&&(b=function(){var b=document.createElement("IFRAME");b.style.display="none";b.src="";document.documentElement.appendChild(b);var c=b.contentWindow,b=c.document;b.open();b.write("");b.close();var d="callImmediate"+Math.random(),e="file:"==c.location.protocol?"*":c.location.protocol+"//"+c.location.host,b=ra(function(b){if(("*"==e||b.origin==e)&&b.data==
d)this.port1.onmessage()},this);c.addEventListener("message",b,!1);this.port1={};this.port2={postMessage:function(){c.postMessage(d,e)}}});if("undefined"!==typeof b&&!Hb("Trident")&&!Hb("MSIE")){var c=new b,d={},e=d;c.port1.onmessage=function(){if(ca(d.next)){d=d.next;var b=d.mg;d.mg=null;b()}};return function(b){e.next={mg:b};e=e.next;c.port2.postMessage(0)}}return"undefined"!==typeof document&&"onreadystatechange"in document.createElement("SCRIPT")?function(b){var c=document.createElement("SCRIPT");
c.onreadystatechange=function(){c.onreadystatechange=null;c.parentNode.removeChild(c);c=null;b();b=null};document.documentElement.appendChild(c)}:function(b){ba.setTimeout(b,0)}}var oi=we;function ri(b,c){this.c={};this.a=[];this.b=0;var d=arguments.length;if(1<d){if(d%2)throw Error("Uneven number of arguments");for(var e=0;e<d;e+=2)this.set(arguments[e],arguments[e+1])}else if(b){b instanceof ri?(d=b.O(),e=b.pc()):(d=Mb(b),e=Lb(b));for(var f=0;f<d.length;f++)this.set(d[f],e[f])}}l=ri.prototype;l.nc=function(){return this.b};l.pc=function(){si(this);for(var b=[],c=0;c<this.a.length;c++)b.push(this.c[this.a[c]]);return b};l.O=function(){si(this);return this.a.concat()};
l.Ka=function(){return 0==this.b};l.clear=function(){this.c={};this.b=this.a.length=0};l.remove=function(b){return ti(this.c,b)?(delete this.c[b],this.b--,this.a.length>2*this.b&&si(this),!0):!1};function si(b){if(b.b!=b.a.length){for(var c=0,d=0;c<b.a.length;){var e=b.a[c];ti(b.c,e)&&(b.a[d++]=e);c++}b.a.length=d}if(b.b!=b.a.length){for(var f={},d=c=0;c<b.a.length;)e=b.a[c],ti(f,e)||(b.a[d++]=e,f[e]=1),c++;b.a.length=d}}l.get=function(b,c){return ti(this.c,b)?this.c[b]:c};
l.set=function(b,c){ti(this.c,b)||(this.b++,this.a.push(b));this.c[b]=c};l.forEach=function(b,c){for(var d=this.O(),e=0;e<d.length;e++){var f=d[e],g=this.get(f);b.call(c,g,f,this)}};l.clone=function(){return new ri(this)};function ti(b,c){return Object.prototype.hasOwnProperty.call(b,c)};function ui(){this.a=ta()}new ui;ui.prototype.set=function(b){this.a=b};ui.prototype.reset=function(){this.set(ta())};ui.prototype.get=function(){return this.a};function vi(b){cd.call(this);this.a=b||window;this.c=C(this.a,"resize",this.f,!1,this);this.b=Gg(this.a||window)}y(vi,cd);vi.prototype.X=function(){vi.da.X.call(this);this.c&&(Zc(this.c),this.c=null);this.b=this.a=null};vi.prototype.f=function(){var b=Gg(this.a||window),c=this.b;b==c||b&&c&&b.width==c.width&&b.height==c.height||(this.b=b,this.o("resize"))};function wi(b,c,d,e,f){if(!(Zb||$b||bc&&jc("525")))return!0;if(cc&&f)return xi(b);if(f&&!e)return!1;ja(c)&&(c=yi(c));if(!d&&(17==c||18==c||cc&&91==c))return!1;if((bc||$b)&&e&&d)switch(b){case 220:case 219:case 221:case 192:case 186:case 189:case 187:case 188:case 190:case 191:case 192:case 222:return!1}if(Zb&&e&&c==b)return!1;switch(b){case 13:return!0;case 27:return!(bc||$b)}return xi(b)}
function xi(b){if(48<=b&&57>=b||96<=b&&106>=b||65<=b&&90>=b||(bc||$b)&&0==b)return!0;switch(b){case 32:case 43:case 63:case 64:case 107:case 109:case 110:case 111:case 186:case 59:case 189:case 187:case 61:case 188:case 190:case 191:case 192:case 222:case 219:case 220:case 221:return!0;default:return!1}}function yi(b){if(ac)b=zi(b);else if(cc&&bc)a:switch(b){case 93:b=91;break a}return b}
function zi(b){switch(b){case 61:return 187;case 59:return 186;case 173:return 189;case 224:return 91;case 0:return 224;default:return b}};function Ai(b,c){cd.call(this);b&&Bi(this,b,c)}y(Ai,cd);l=Ai.prototype;l.ud=null;l.le=null;l.qf=null;l.me=null;l.ib=-1;l.Zb=-1;l.bf=!1;
var Ci={3:13,12:144,63232:38,63233:40,63234:37,63235:39,63236:112,63237:113,63238:114,63239:115,63240:116,63241:117,63242:118,63243:119,63244:120,63245:121,63246:122,63247:123,63248:44,63272:46,63273:36,63275:35,63276:33,63277:34,63289:144,63302:45},Di={Up:38,Down:40,Left:37,Right:39,Enter:13,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,"U+007F":46,Home:36,End:35,PageUp:33,PageDown:34,Insert:45},Ei=Zb||$b||bc&&jc("525"),Fi=cc&&ac;
Ai.prototype.a=function(b){if(bc||$b)if(17==this.ib&&!b.B||18==this.ib&&!b.c||cc&&91==this.ib&&!b.A)this.Zb=this.ib=-1;-1==this.ib&&(b.B&&17!=b.j?this.ib=17:b.c&&18!=b.j?this.ib=18:b.A&&91!=b.j&&(this.ib=91));Ei&&!wi(b.j,this.ib,b.f,b.B,b.c)?this.handleEvent(b):(this.Zb=yi(b.j),Fi&&(this.bf=b.c))};Ai.prototype.c=function(b){this.Zb=this.ib=-1;this.bf=b.c};
Ai.prototype.handleEvent=function(b){var c=b.a,d,e,f=c.altKey;Zb&&"keypress"==b.type?(d=this.Zb,e=13!=d&&27!=d?c.keyCode:0):(bc||$b)&&"keypress"==b.type?(d=this.Zb,e=0<=c.charCode&&63232>c.charCode&&xi(d)?c.charCode:0):Yb&&!bc?(d=this.Zb,e=xi(d)?c.keyCode:0):(d=c.keyCode||this.Zb,e=c.charCode||0,Fi&&(f=this.bf),cc&&63==e&&224==d&&(d=191));var g=d=yi(d),h=c.keyIdentifier;d?63232<=d&&d in Ci?g=Ci[d]:25==d&&b.f&&(g=9):h&&h in Di&&(g=Di[h]);this.ib=g;b=new Gi(g,e,0,c);b.c=f;this.o(b)};
function Bi(b,c,d){b.me&&Hi(b);b.ud=c;b.le=C(b.ud,"keypress",b,d);b.qf=C(b.ud,"keydown",b.a,d,b);b.me=C(b.ud,"keyup",b.c,d,b)}function Hi(b){b.le&&(Zc(b.le),Zc(b.qf),Zc(b.me),b.le=null,b.qf=null,b.me=null);b.ud=null;b.ib=-1;b.Zb=-1}Ai.prototype.X=function(){Ai.da.X.call(this);Hi(this)};function Gi(b,c,d,e){Ac.call(this,e);this.type="key";this.j=b;this.u=c}y(Gi,Ac);function Ii(b,c){cd.call(this);var d=this.a=b;(d=ma(d)&&1==d.nodeType?this.a:this.a?this.a.body:null)&&bh(d,"direction");this.c=C(this.a,ac?"DOMMouseScroll":"mousewheel",this,c)}y(Ii,cd);
Ii.prototype.handleEvent=function(b){var c=0,d=0;b=b.a;if("mousewheel"==b.type){c=1;if(Zb||bc&&(dc||jc("532.0")))c=40;d=Ji(-b.wheelDelta,c);c=ca(b.wheelDeltaX)?Ji(-b.wheelDeltaY,c):d}else d=b.detail,100<d?d=3:-100>d&&(d=-3),ca(b.axis)&&b.axis===b.HORIZONTAL_AXIS||(c=d);ja(this.b)&&(c=Math.min(Math.max(c,-this.b),this.b));d=new Ki(d,b,0,c);this.o(d)};function Ji(b,c){return bc&&(cc||ec)&&0!=b%c?b:b/c}Ii.prototype.X=function(){Ii.da.X.call(this);Zc(this.c);this.c=null};
function Ki(b,c,d,e){Ac.call(this,c);this.type="mousewheel";this.detail=b;this.C=e}y(Ki,Ac);function Li(b,c,d){vc.call(this,b);this.a=c;b=d?d:{};this.buttons=Mi(b);this.pressure=Ni(b,this.buttons);this.bubbles="bubbles"in b?b.bubbles:!1;this.cancelable="cancelable"in b?b.cancelable:!1;this.view="view"in b?b.view:null;this.detail="detail"in b?b.detail:null;this.screenX="screenX"in b?b.screenX:0;this.screenY="screenY"in b?b.screenY:0;this.clientX="clientX"in b?b.clientX:0;this.clientY="clientY"in b?b.clientY:0;this.button="button"in b?b.button:0;this.relatedTarget="relatedTarget"in b?b.relatedTarget:
null;this.pointerId="pointerId"in b?b.pointerId:0;this.width="width"in b?b.width:0;this.height="height"in b?b.height:0;this.pointerType="pointerType"in b?b.pointerType:"";this.isPrimary="isPrimary"in b?b.isPrimary:!1;c.preventDefault&&(this.preventDefault=function(){c.preventDefault()})}y(Li,vc);function Mi(b){if(b.buttons||Oi)b=b.buttons;else switch(b.which){case 1:b=1;break;case 2:b=4;break;case 3:b=2;break;default:b=0}return b}
function Ni(b,c){var d=0;b.pressure?d=b.pressure:d=c?.5:0;return d}var Oi=!1;try{Oi=1===(new MouseEvent("click",{buttons:1})).buttons}catch(b){};function Pi(b,c){var d=Kg("CANVAS");b&&(d.width=b);c&&(d.height=c);return d.getContext("2d")}
var Qi=function(){var b;return function(){if(void 0===b)if(ba.getComputedStyle){var c=Kg("P"),d,e={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(c);for(var f in e)f in c.style&&(c.style[f]="translate(1px,1px)",d=ba.getComputedStyle(c).getPropertyValue(e[f]));Og(c);b=d&&"none"!==d}else b=!1;return b}}(),Ri=function(){var b;return function(){if(void 0===b)if(ba.getComputedStyle){var c=
Kg("P"),d,e={webkitTransform:"-webkit-transform",OTransform:"-o-transform",msTransform:"-ms-transform",MozTransform:"-moz-transform",transform:"transform"};document.body.appendChild(c);for(var f in e)f in c.style&&(c.style[f]="translate3d(1px,1px,1px)",d=ba.getComputedStyle(c).getPropertyValue(e[f]));Og(c);b=d&&"none"!==d}else b=!1;return b}}();function Si(b,c){var d=b.style;d.WebkitTransform=c;d.MozTransform=c;d.a=c;d.msTransform=c;d.transform=c;Zb&&jc("9.0")&&(b.style.transformOrigin="0 0")}
function Ti(b,c){var d;if(Ri()){var e=Array(16);for(d=0;16>d;++d)e[d]=c[d].toFixed(6);Si(b,"matrix3d("+e.join(",")+")")}else if(Qi()){var e=[c[0],c[1],c[4],c[5],c[12],c[13]],f=Array(6);for(d=0;6>d;++d)f[d]=e[d].toFixed(6);Si(b,"matrix("+f.join(",")+")")}else b.style.left=Math.round(c[12])+"px",b.style.top=Math.round(c[13])+"px"};var Ui=["experimental-webgl","webgl","webkit-3d","moz-webgl"];function Vi(b,c){var d,e,f=Ui.length;for(e=0;e<f;++e)try{if(d=b.getContext(Ui[e],c))return d}catch(g){}return null};var Wi,Xi=ba.devicePixelRatio||1,Yi=!1,Zi=function(){if(!("HTMLCanvasElement"in ba))return!1;try{var b=Pi();return b?(void 0!==b.setLineDash&&(Yi=!0),!0):!1}catch(c){return!1}}(),$i="DeviceOrientationEvent"in ba,aj="geolocation"in ba.navigator,bj="ontouchstart"in ba,cj="PointerEvent"in ba,dj=!!ba.navigator.msPointerEnabled,ej=!1,fj,gj=[];if("WebGLRenderingContext"in ba)try{var hj=Vi(Kg("CANVAS"),{failIfMajorPerformanceCaveat:!0});hj&&(ej=!0,fj=hj.getParameter(hj.MAX_TEXTURE_SIZE),gj=hj.getSupportedExtensions())}catch(b){}
Wi=ej;va=gj;ua=fj;function ij(b,c){this.a=b;this.g=c};function jj(b){ij.call(this,b,{mousedown:this.el,mousemove:this.fl,mouseup:this.il,mouseover:this.hl,mouseout:this.gl});this.c=b.c;this.b=[]}y(jj,ij);function kj(b,c){for(var d=b.b,e=c.clientX,f=c.clientY,g=0,h=d.length,k;g<h&&(k=d[g]);g++){var m=Math.abs(f-k[1]);if(25>=Math.abs(e-k[0])&&25>=m)return!0}return!1}function lj(b){var c=mj(b,b.a),d=c.preventDefault;c.preventDefault=function(){b.preventDefault();d()};c.pointerId=1;c.isPrimary=!0;c.pointerType="mouse";return c}l=jj.prototype;
l.el=function(b){if(!kj(this,b)){(1).toString()in this.c&&this.cancel(b);var c=lj(b);this.c[(1).toString()]=b;nj(this.a,oj,c,b)}};l.fl=function(b){if(!kj(this,b)){var c=lj(b);nj(this.a,pj,c,b)}};l.il=function(b){if(!kj(this,b)){var c=this.c[(1).toString()];c&&c.button===b.button&&(c=lj(b),nj(this.a,qj,c,b),delete this.c[(1).toString()])}};l.hl=function(b){if(!kj(this,b)){var c=lj(b);rj(this.a,c,b)}};l.gl=function(b){if(!kj(this,b)){var c=lj(b);sj(this.a,c,b)}};
l.cancel=function(b){var c=lj(b);this.a.cancel(c,b);delete this.c[(1).toString()]};function tj(b){ij.call(this,b,{MSPointerDown:this.nl,MSPointerMove:this.ol,MSPointerUp:this.rl,MSPointerOut:this.pl,MSPointerOver:this.ql,MSPointerCancel:this.ml,MSGotPointerCapture:this.kl,MSLostPointerCapture:this.ll});this.c=b.c;this.b=["","unavailable","touch","pen","mouse"]}y(tj,ij);function uj(b,c){var d=c;ja(c.a.pointerType)&&(d=mj(c,c.a),d.pointerType=b.b[c.a.pointerType]);return d}l=tj.prototype;l.nl=function(b){this.c[b.a.pointerId.toString()]=b;var c=uj(this,b);nj(this.a,oj,c,b)};
l.ol=function(b){var c=uj(this,b);nj(this.a,pj,c,b)};l.rl=function(b){var c=uj(this,b);nj(this.a,qj,c,b);delete this.c[b.a.pointerId.toString()]};l.pl=function(b){var c=uj(this,b);sj(this.a,c,b)};l.ql=function(b){var c=uj(this,b);rj(this.a,c,b)};l.ml=function(b){var c=uj(this,b);this.a.cancel(c,b);delete this.c[b.a.pointerId.toString()]};l.ll=function(b){this.a.o(new Li("lostpointercapture",b,b.a))};l.kl=function(b){this.a.o(new Li("gotpointercapture",b,b.a))};function vj(b){ij.call(this,b,{pointerdown:this.Vn,pointermove:this.Wn,pointerup:this.Zn,pointerout:this.Xn,pointerover:this.Yn,pointercancel:this.Un,gotpointercapture:this.rk,lostpointercapture:this.dl})}y(vj,ij);l=vj.prototype;l.Vn=function(b){wj(this.a,b)};l.Wn=function(b){wj(this.a,b)};l.Zn=function(b){wj(this.a,b)};l.Xn=function(b){wj(this.a,b)};l.Yn=function(b){wj(this.a,b)};l.Un=function(b){wj(this.a,b)};l.dl=function(b){wj(this.a,b)};l.rk=function(b){wj(this.a,b)};function xj(b,c){ij.call(this,b,{touchstart:this.ap,touchmove:this.$o,touchend:this.Zo,touchcancel:this.Yo});this.c=b.c;this.i=c;this.b=void 0;this.j=0;this.f=void 0}y(xj,ij);l=xj.prototype;l.Ph=function(){this.j=0;this.f=void 0};
function yj(b,c,d){c=mj(c,d);c.pointerId=d.identifier+2;c.bubbles=!0;c.cancelable=!0;c.detail=b.j;c.button=0;c.buttons=1;c.width=d.webkitRadiusX||d.radiusX||0;c.height=d.webkitRadiusY||d.radiusY||0;c.pressure=d.webkitForce||d.force||.5;c.isPrimary=b.b===d.identifier;c.pointerType="touch";c.clientX=d.clientX;c.clientY=d.clientY;c.screenX=d.screenX;c.screenY=d.screenY;return c}
function zj(b,c,d){function e(){c.preventDefault()}var f=Array.prototype.slice.call(c.a.changedTouches),g=f.length,h,k;for(h=0;h<g;++h)k=yj(b,c,f[h]),k.preventDefault=e,d.call(b,c,k)}
l.ap=function(b){var c=b.a.touches,d=Mb(this.c),e=d.length;if(e>=c.length){var f=[],g,h,k;for(g=0;g<e;++g){h=d[g];k=this.c[h];var m;if(!(m=1==h))a:{m=c.length;for(var n=void 0,p=0;p<m;p++)if(n=c[p],n.identifier===h-2){m=!0;break a}m=!1}m||f.push(k.tc)}for(g=0;g<f.length;++g)this.df(b,f[g])}c=Kb(this.c);if(0===c||1===c&&(1).toString()in this.c)this.b=b.a.changedTouches[0].identifier,void 0!==this.f&&ba.clearTimeout(this.f);Bj(this,b);this.j++;zj(this,b,this.Qn)};
l.Qn=function(b,c){this.c[c.pointerId]={target:c.target,tc:c,xh:c.target};var d=this.a;c.bubbles=!0;nj(d,Cj,c,b);d=this.a;c.bubbles=!1;nj(d,Dj,c,b);nj(this.a,oj,c,b)};l.$o=function(b){b.preventDefault();zj(this,b,this.jl)};l.jl=function(b,c){var d=this.c[c.pointerId];if(d){var e=d.tc,f=d.xh;nj(this.a,pj,c,b);e&&f!==c.target&&(e.relatedTarget=c.target,c.relatedTarget=f,e.target=f,c.target?(sj(this.a,e,b),rj(this.a,c,b)):(c.target=f,c.relatedTarget=null,this.df(b,c)));d.tc=c;d.xh=c.target}};
l.Zo=function(b){Bj(this,b);zj(this,b,this.bp)};l.bp=function(b,c){nj(this.a,qj,c,b);this.a.tc(c,b);var d=this.a;c.bubbles=!1;nj(d,Ej,c,b);delete this.c[c.pointerId];c.isPrimary&&(this.b=void 0,this.f=ba.setTimeout(ra(this.Ph,this),200))};l.Yo=function(b){zj(this,b,this.df)};l.df=function(b,c){this.a.cancel(c,b);this.a.tc(c,b);var d=this.a;c.bubbles=!1;nj(d,Ej,c,b);delete this.c[c.pointerId];c.isPrimary&&(this.b=void 0,this.f=ba.setTimeout(ra(this.Ph,this),200))};
function Bj(b,c){var d=b.i.b,e=c.a.changedTouches[0];if(b.b===e.identifier){var f=[e.clientX,e.clientY];d.push(f);ba.setTimeout(function(){hb(d,f)},2500)}};function Fj(b){cd.call(this);this.f=b;this.c={};this.b={};this.a=[];cj?Gj(this,new vj(this)):dj?Gj(this,new tj(this)):(b=new jj(this),Gj(this,b),bj&&Gj(this,new xj(this,b)));b=this.a.length;for(var c,d=0;d<b;d++)c=this.a[d],Hj(this,Object.keys(c.g))}y(Fj,cd);function Gj(b,c){var d=Object.keys(c.g);d&&(d.forEach(function(b){var d=c.g[b];d&&(this.b[b]=ra(d,c))},b),b.a.push(c))}Fj.prototype.g=function(b){var c=this.b[b.type];c&&c(b)};
function Hj(b,c){c.forEach(function(b){C(this.f,b,this.g,!1,this)},b)}function Ij(b,c){c.forEach(function(b){Yc(this.f,b,this.g,!1,this)},b)}function mj(b,c){for(var d={},e,f=0,g=Jj.length;f<g;f++)e=Jj[f][0],d[e]=b[e]||c[e]||Jj[f][1];return d}Fj.prototype.tc=function(b,c){b.bubbles=!0;nj(this,Kj,b,c)};Fj.prototype.cancel=function(b,c){nj(this,Lj,b,c)};function sj(b,c,d){b.tc(c,d);var e=c.relatedTarget;e&&Rg(c.target,e)||(c.bubbles=!1,nj(b,Ej,c,d))}
function rj(b,c,d){c.bubbles=!0;nj(b,Cj,c,d);var e=c.relatedTarget;e&&Rg(c.target,e)||(c.bubbles=!1,nj(b,Dj,c,d))}function nj(b,c,d,e){b.o(new Li(c,e,d))}function wj(b,c){b.o(new Li(c.type,c,c.a))}Fj.prototype.X=function(){for(var b=this.a.length,c,d=0;d<b;d++)c=this.a[d],Ij(this,Object.keys(c.g));Fj.da.X.call(this)};
var pj="pointermove",oj="pointerdown",qj="pointerup",Cj="pointerover",Kj="pointerout",Dj="pointerenter",Ej="pointerleave",Lj="pointercancel",Jj=[["bubbles",!1],["cancelable",!1],["view",null],["detail",null],["screenX",0],["screenY",0],["clientX",0],["clientY",0],["ctrlKey",!1],["altKey",!1],["shiftKey",!1],["metaKey",!1],["button",0],["relatedTarget",null],["buttons",0],["pointerId",0],["width",0],["height",0],["pressure",0],["tiltX",0],["tiltY",0],["pointerType",""],["hwTimestamp",0],["isPrimary",
!1],["type",""],["target",null],["currentTarget",null],["which",0]];function Mj(b,c,d,e,f){ph.call(this,b,c,f);this.a=d;this.originalEvent=d.a;this.pixel=c.Zd(this.originalEvent);this.coordinate=c.Fa(this.pixel);this.dragging=void 0!==e?e:!1}y(Mj,ph);Mj.prototype.preventDefault=function(){Mj.da.preventDefault.call(this);this.a.preventDefault()};Mj.prototype.b=function(){Mj.da.b.call(this);this.a.b()};function Nj(b,c,d,e,f){Mj.call(this,b,c,d.a,e,f);this.c=d}y(Nj,Mj);
function Oj(b){cd.call(this);this.b=b;this.j=0;this.i=!1;this.c=this.l=this.f=null;b=this.b.a;this.A=0;this.u={};this.g=new Fj(b);this.a=null;this.l=C(this.g,oj,this.Nk,!1,this);this.B=C(this.g,pj,this.xo,!1,this)}y(Oj,cd);function Pj(b,c){var d;d=new Nj(Qj,b.b,c);b.o(d);0!==b.j?(ba.clearTimeout(b.j),b.j=0,d=new Nj(Rj,b.b,c),b.o(d)):b.j=ba.setTimeout(ra(function(){this.j=0;var b=new Nj(Sj,this.b,c);this.o(b)},b),250)}
function Tj(b,c){c.type==Uj||c.type==Vj?delete b.u[c.pointerId]:c.type==Wj&&(b.u[c.pointerId]=!0);b.A=Kb(b.u)}l=Oj.prototype;l.Jg=function(b){Tj(this,b);var c=new Nj(Uj,this.b,b);this.o(c);!this.i&&0===b.button&&Pj(this,this.c);0===this.A&&(this.f.forEach(Zc),this.f=null,this.i=!1,this.c=null,uc(this.a),this.a=null)};
l.Nk=function(b){Tj(this,b);var c=new Nj(Wj,this.b,b);this.o(c);this.c=b;this.f||(this.a=new Fj(document),this.f=[C(this.a,Xj,this.El,!1,this),C(this.a,Uj,this.Jg,!1,this),C(this.g,Vj,this.Jg,!1,this)])};l.El=function(b){if(b.clientX!=this.c.clientX||b.clientY!=this.c.clientY){this.i=!0;var c=new Nj(Yj,this.b,b,this.i);this.o(c)}b.preventDefault()};l.xo=function(b){this.o(new Nj(b.type,this.b,b,!(!this.c||b.clientX==this.c.clientX&&b.clientY==this.c.clientY)))};
l.X=function(){this.B&&(Zc(this.B),this.B=null);this.l&&(Zc(this.l),this.l=null);this.f&&(this.f.forEach(Zc),this.f=null);this.a&&(uc(this.a),this.a=null);this.g&&(uc(this.g),this.g=null);Oj.da.X.call(this)};var Sj="singleclick",Qj="click",Rj="dblclick",Yj="pointerdrag",Xj="pointermove",Wj="pointerdown",Uj="pointerup",Vj="pointercancel",Zj={up:Sj,jp:Qj,kp:Rj,np:Yj,qp:Xj,mp:Wj,tp:Uj,sp:"pointerover",rp:"pointerout",op:"pointerenter",pp:"pointerleave",lp:Vj};function ak(b){id.call(this);var c=Ub(b);c.opacity=void 0!==b.opacity?b.opacity:1;c.visible=void 0!==b.visible?b.visible:!0;c.zIndex=void 0!==b.zIndex?b.zIndex:0;c.maxResolution=void 0!==b.maxResolution?b.maxResolution:Infinity;c.minResolution=void 0!==b.minResolution?b.minResolution:0;this.I(c)}y(ak,id);
function bk(b){var c=b.Rb(),d=b.of(),e=b.qb(),f=b.J(),g=b.Sb(),h=b.Mb(),k=b.Nb();return{layer:b,opacity:Sa(c,0,1),S:d,visible:e,rb:!0,extent:f,zIndex:g,maxResolution:h,minResolution:Math.max(k,0)}}l=ak.prototype;l.J=function(){return this.get("extent")};l.Mb=function(){return this.get("maxResolution")};l.Nb=function(){return this.get("minResolution")};l.Rb=function(){return this.get("opacity")};l.qb=function(){return this.get("visible")};l.Sb=function(){return this.get("zIndex")};
l.bc=function(b){this.set("extent",b)};l.jc=function(b){this.set("maxResolution",b)};l.kc=function(b){this.set("minResolution",b)};l.cc=function(b){this.set("opacity",b)};l.dc=function(b){this.set("visible",b)};l.ec=function(b){this.set("zIndex",b)};function ck(){};function dk(b,c,d,e,f,g){vc.call(this,b,c);this.vectorContext=d;this.frameState=e;this.context=f;this.glContext=g}y(dk,vc);function ek(b){var c=Ub(b);delete c.source;ak.call(this,c);this.j=this.A=this.u=null;b.map&&this.setMap(b.map);C(this,kd("source"),this.Tk,!1,this);this.wc(b.source?b.source:null)}y(ek,ak);function fk(b,c){return b.visible&&c>=b.minResolution&&c<b.maxResolution}l=ek.prototype;l.nf=function(b){b=b?b:[];b.push(bk(this));return b};l.fa=function(){return this.get("source")||null};l.of=function(){var b=this.fa();return b?b.A:"undefined"};l.vm=function(){this.s()};
l.Tk=function(){this.j&&(Zc(this.j),this.j=null);var b=this.fa();b&&(this.j=C(b,"change",this.vm,!1,this));this.s()};l.setMap=function(b){Zc(this.u);this.u=null;b||this.s();Zc(this.A);this.A=null;b&&(this.u=C(b,"precompose",function(b){var d=bk(this);d.rb=!1;d.zIndex=Infinity;b.frameState.layerStatesArray.push(d);b.frameState.layerStates[w(this)]=d},!1,this),this.A=C(this,"change",b.render,!1,b),this.s())};l.wc=function(b){this.set("source",b)};function gk(b,c,d,e,f){cd.call(this);this.j=f;this.extent=b;this.b=d;this.resolution=c;this.state=e}y(gk,cd);function hk(b){b.o("change")}gk.prototype.J=function(){return this.extent};gk.prototype.$=function(){return this.resolution};function ik(b,c,d,e,f,g,h,k){Hd(b);0===c&&0===d||Kd(b,c,d);1==e&&1==f||Ld(b,e,f);0!==g&&Md(b,g);0===h&&0===k||Kd(b,h,k);return b}function jk(b,c){return b[0]==c[0]&&b[1]==c[1]&&b[4]==c[4]&&b[5]==c[5]&&b[12]==c[12]&&b[13]==c[13]}function kk(b,c,d){var e=b[1],f=b[5],g=b[13],h=c[0];c=c[1];d[0]=b[0]*h+b[4]*c+b[12];d[1]=e*h+f*c+g;return d};function lk(b){fd.call(this);this.a=b}y(lk,fd);l=lk.prototype;l.Za=wa;l.sc=function(b,c,d,e){b=b.slice();kk(c.pixelToCoordinateMatrix,b,b);if(this.Za(b,c,ue,this))return d.call(e,this.a)};l.we=te;l.bd=function(b,c,d){return function(e,f){return Qh(b,c,e,f,function(b){d[e]||(d[e]={});d[e][b.a.toString()]=b})}};l.zm=function(b){2===b.target.state&&mk(this)};function nk(b,c){var d=c.state;2!=d&&3!=d&&C(c,"change",b.zm,!1,b);0==d&&(c.load(),d=c.state);return 2==d}
function mk(b){var c=b.a;c.qb()&&"ready"==c.of()&&b.s()}function ok(b,c){c.nh()&&b.postRenderFunctions.push(sa(function(b,c,f){c=w(b).toString();b.oh(f.viewState.projection,f.usedTiles[c])},c))}function pk(b,c){if(c){var d,e,f;e=0;for(f=c.length;e<f;++e)d=c[e],b[w(d).toString()]=d}}function qk(b,c){var d=c.U;void 0!==d&&(ia(d)?b.logos[d]="":ma(d)&&(b.logos[d.src]=d.href))}
function rk(b,c,d,e){c=w(c).toString();d=d.toString();c in b?d in b[c]?(b=b[c][d],e.a<b.a&&(b.a=e.a),e.f>b.f&&(b.f=e.f),e.c<b.c&&(b.c=e.c),e.b>b.b&&(b.b=e.b)):b[c][d]=e:(b[c]={},b[c][d]=e)}function sk(b,c,d){return[c*(Math.round(b[0]/c)+d[0]%2/2),c*(Math.round(b[1]/c)+d[1]%2/2)]}
function tk(b,c,d,e,f,g,h,k,m,n){var p=w(c).toString();p in b.wantedTiles||(b.wantedTiles[p]={});var q=b.wantedTiles[p];b=b.tileQueue;var r=d.minZoom,t,x,z,B,A,v;for(v=h;v>=r;--v)for(x=Fh(d,g,v,x),z=d.$(v),B=x.a;B<=x.f;++B)for(A=x.c;A<=x.b;++A)h-v<=k?(t=c.Ob(v,B,A,e,f),0==t.state&&(q[fg(t.a)]=!0,t.tb()in b.b||uk(b,[t,p,Jh(d,t.a),z])),void 0!==m&&m.call(n,t)):c.Xf(v,B,A,f)};function vk(b){this.A=b.opacity;this.D=b.rotateWithView;this.u=b.rotation;this.i=b.scale;this.G=b.snapToPixel}l=vk.prototype;l.Ae=function(){return this.A};l.ce=function(){return this.D};l.Be=function(){return this.u};l.Ce=function(){return this.i};l.de=function(){return this.G};l.De=function(b){this.A=b};l.Ee=function(b){this.u=b};l.Fe=function(b){this.i=b};function wk(b){b=b||{};this.g=void 0!==b.anchor?b.anchor:[.5,.5];this.f=null;this.c=void 0!==b.anchorOrigin?b.anchorOrigin:"top-left";this.l=void 0!==b.anchorXUnits?b.anchorXUnits:"fraction";this.B=void 0!==b.anchorYUnits?b.anchorYUnits:"fraction";var c=void 0!==b.crossOrigin?b.crossOrigin:null,d=void 0!==b.img?b.img:null,e=void 0!==b.imgSize?b.imgSize:null,f=b.src;void 0!==f&&0!==f.length||!d||(f=d.src);var g=void 0!==b.src?0:2,h=xk.Yb(),k=h.get(f,c);k||(k=new yk(d,f,e,c,g),h.set(f,c,k));this.a=
k;this.ia=void 0!==b.offset?b.offset:[0,0];this.b=void 0!==b.offsetOrigin?b.offsetOrigin:"top-left";this.j=null;this.C=void 0!==b.size?b.size:null;vk.call(this,{opacity:void 0!==b.opacity?b.opacity:1,rotation:void 0!==b.rotation?b.rotation:0,scale:void 0!==b.scale?b.scale:1,snapToPixel:void 0!==b.snapToPixel?b.snapToPixel:!0,rotateWithView:void 0!==b.rotateWithView?b.rotateWithView:!1})}y(wk,vk);l=wk.prototype;
l.Xb=function(){if(this.f)return this.f;var b=this.g,c=this.Bb();if("fraction"==this.l||"fraction"==this.B){if(!c)return null;b=this.g.slice();"fraction"==this.l&&(b[0]*=c[0]);"fraction"==this.B&&(b[1]*=c[1])}if("top-left"!=this.c){if(!c)return null;b===this.g&&(b=this.g.slice());if("top-right"==this.c||"bottom-right"==this.c)b[0]=-b[0]+c[0];if("bottom-left"==this.c||"bottom-right"==this.c)b[1]=-b[1]+c[1]}return this.f=b};l.fc=function(){return this.a.a};l.qd=function(){return this.a.b};l.Bd=function(){return this.a.c};
l.ze=function(){var b=this.a;if(!b.g)if(b.l){var c=b.b[0],d=b.b[1],e=Pi(c,d);e.fillRect(0,0,c,d);b.g=e.canvas}else b.g=b.a;return b.g};l.Ca=function(){if(this.j)return this.j;var b=this.ia;if("top-left"!=this.b){var c=this.Bb(),d=this.a.b;if(!c||!d)return null;b=b.slice();if("top-right"==this.b||"bottom-right"==this.b)b[0]=d[0]-c[0]-b[0];if("bottom-left"==this.b||"bottom-right"==this.b)b[1]=d[1]-c[1]-b[1]}return this.j=b};l.fn=function(){return this.a.j};l.Bb=function(){return this.C?this.C:this.a.b};
l.sf=function(b,c){return C(this.a,"change",b,!1,c)};l.load=function(){this.a.load()};l.Wf=function(b,c){Yc(this.a,"change",b,!1,c)};function yk(b,c,d,e,f){cd.call(this);this.g=null;this.a=b?b:new Image;e&&(this.a.crossOrigin=e);this.f=null;this.c=f;this.b=d;this.j=c;this.l=!1;2==this.c&&zk(this)}y(yk,cd);function zk(b){var c=Pi(1,1);try{c.drawImage(b.a,0,0),c.getImageData(0,0,1,1)}catch(d){b.l=!0}}yk.prototype.i=function(){this.c=3;this.f.forEach(Zc);this.f=null;this.o("change")};
yk.prototype.B=function(){this.c=2;this.b=[this.a.width,this.a.height];this.f.forEach(Zc);this.f=null;zk(this);this.o("change")};yk.prototype.load=function(){if(0==this.c){this.c=1;this.f=[Xc(this.a,"error",this.i,!1,this),Xc(this.a,"load",this.B,!1,this)];try{this.a.src=this.j}catch(b){this.i()}}};function xk(){this.a={};this.c=0}ea(xk);xk.prototype.clear=function(){this.a={};this.c=0};xk.prototype.get=function(b,c){var d=c+":"+b;return d in this.a?this.a[d]:null};
xk.prototype.set=function(b,c,d){this.a[c+":"+b]=d;++this.c};function Ak(b,c){pc.call(this);this.j=c;this.f={};this.u={}}y(Ak,pc);function Bk(b){var c=b.viewState,d=b.coordinateToPixelMatrix;ik(d,b.size[0]/2,b.size[1]/2,1/c.resolution,-1/c.resolution,-c.rotation,-c.center[0],-c.center[1]);Jd(d,b.pixelToCoordinateMatrix)}l=Ak.prototype;l.X=function(){Ib(this.f,uc);Ak.da.X.call(this)};
function Ck(){var b=xk.Yb();if(32<b.c){var c=0,d,e;for(d in b.a){e=b.a[d];var f;if(f=0===(c++&3))Ec(e)?e=ed(e,void 0,void 0):(e=Tc(e),e=!!e&&Mc(e,void 0,void 0)),f=!e;f&&(delete b.a[d],--b.c)}}}
l.Af=function(b,c,d,e,f,g){function h(b){var c=w(b).toString();if(!(c in p))return p[c]=!0,d.call(e,b,null)}var k,m=c.viewState,n=m.resolution,p={},q=m.projection,m=b;if(q.b){var q=q.J(),r=ke(q),t=b[0];if(t<q[0]||t>q[2])m=[t+r*Math.ceil((q[0]-t)/r),b[1]]}q=c.layerStatesArray;for(r=q.length-1;0<=r;--r){var t=q[r],x=t.layer;if(!t.rb||fk(t,n)&&f.call(g,x)){var z=Dk(this,x);x.fa()&&(k=z.Za(zh(x.fa())?m:b,c,t.rb?d:h,e));if(k)return k}}};
l.jh=function(b,c,d,e,f,g){var h,k=c.viewState.resolution,m=c.layerStatesArray,n;for(n=m.length-1;0<=n;--n){h=m[n];var p=h.layer;if(fk(h,k)&&f.call(g,p)&&(h=Dk(this,p).sc(b,c,d,e)))return h}};l.kh=function(b,c,d,e){return void 0!==this.Af(b,c,ue,this,d,e)};function Dk(b,c){var d=w(c).toString();if(d in b.f)return b.f[d];var e=b.gf(c);b.f[d]=e;b.u[d]=C(e,"change",b.Dk,!1,b);return e}l.Dk=function(){this.j.render()};l.Me=wa;
l.Do=function(b,c){for(var d in this.f)if(!(c&&d in c.layerStates)){var e=d,f=this.f[e];delete this.f[e];Zc(this.u[e]);delete this.u[e];uc(f)}};function Ek(b,c){for(var d in b.f)if(!(d in c.layerStates)){c.postRenderFunctions.push(ra(b.Do,b));break}}function rb(b,c){return b.zIndex-c.zIndex};function Fk(b,c){this.i=b;this.g=c;this.a=[];this.c=[];this.b={}}Fk.prototype.clear=function(){this.a.length=0;this.c.length=0;Rb(this.b)};function Gk(b){var c=b.a,d=b.c,e=c[0];1==c.length?(c.length=0,d.length=0):(c[0]=c.pop(),d[0]=d.pop(),Hk(b,0));c=b.g(e);delete b.b[c];return e}function uk(b,c){var d=b.i(c);Infinity!=d&&(b.a.push(c),b.c.push(d),b.b[b.g(c)]=!0,Ik(b,0,b.a.length-1))}Fk.prototype.nc=function(){return this.a.length};Fk.prototype.Ka=function(){return 0===this.a.length};
function Hk(b,c){for(var d=b.a,e=b.c,f=d.length,g=d[c],h=e[c],k=c;c<f>>1;){var m=2*c+1,n=2*c+2,m=n<f&&e[n]<e[m]?n:m;d[c]=d[m];e[c]=e[m];c=m}d[c]=g;e[c]=h;Ik(b,k,c)}function Ik(b,c,d){var e=b.a;b=b.c;for(var f=e[d],g=b[d];d>c;){var h=d-1>>1;if(b[h]>g)e[d]=e[h],b[d]=b[h],d=h;else break}e[d]=f;b[d]=g}function Jk(b){var c=b.i,d=b.a,e=b.c,f=0,g=d.length,h,k,m;for(k=0;k<g;++k)h=d[k],m=c(h),Infinity==m?delete b.b[b.g(h)]:(e[f]=m,d[f++]=h);d.length=f;e.length=f;for(c=(b.a.length>>1)-1;0<=c;c--)Hk(b,c)};function Kk(b,c){Fk.call(this,function(c){return b.apply(null,c)},function(b){return b[0].tb()});this.l=c;this.f=0}y(Kk,Fk);Kk.prototype.j=function(b){b=b.target;var c=b.state;if(2===c||3===c||4===c)Yc(b,"change",this.j,!1,this),--this.f,this.l()};function Lk(b,c,d){for(var e=0,f;b.f<c&&e<d&&0<b.nc();)f=Gk(b)[0],0===f.state&&(C(f,"change",b.j,!1,b),f.load(),++b.f,++e)};function Mk(b,c,d){this.f=b;this.b=c;this.j=d;this.a=[];this.c=this.g=0}function Nk(b,c){var d=b.f,e=b.c,f=b.b-e,g=Math.log(b.b/b.c)/b.f;return Zf({source:c,duration:g,easing:function(b){return e*(Math.exp(d*b*g)-1)/f}})};function Ok(b){id.call(this);this.u=null;this.g(!0);this.handleEvent=b.handleEvent}y(Ok,id);Ok.prototype.b=function(){return this.get("active")};Ok.prototype.g=function(b){this.set("active",b)};Ok.prototype.setMap=function(b){this.u=b};function Pk(b,c,d,e,f){if(void 0!==d){var g=c.Ea(),h=c.Ta();void 0!==g&&h&&f&&0<f&&(b.Ma(ag({rotation:g,duration:f,easing:Vf})),e&&b.Ma(Zf({source:h,duration:f,easing:Vf})));c.rotate(d,e)}}
function Qk(b,c,d,e,f){var g=c.$();d=c.constrainResolution(g,d,0);Rk(b,c,d,e,f)}function Rk(b,c,d,e,f){if(d){var g=c.$(),h=c.Ta();void 0!==g&&h&&d!==g&&f&&0<f&&(b.Ma(bg({resolution:g,duration:f,easing:Vf})),e&&b.Ma(Zf({source:h,duration:f,easing:Vf})));if(e){var k;b=c.Ta();f=c.$();void 0!==b&&void 0!==f&&(k=[e[0]-d*(e[0]-b[0])/f,e[1]-d*(e[1]-b[1])/f]);c.jb(k)}c.Ub(d)}};function Sk(b){b=b?b:{};this.a=b.delta?b.delta:1;Ok.call(this,{handleEvent:Tk});this.f=b.duration?b.duration:250}y(Sk,Ok);function Tk(b){var c=!1,d=b.a;if(b.type==Rj){var c=b.map,e=b.coordinate,d=d.f?-this.a:this.a,f=c.aa();Qk(c,f,d,e,this.f);b.preventDefault();c=!0}return!c};function Uk(b){b=b.a;return b.c&&!b.l&&b.f}function Vk(b){return"pointermove"==b.type}function Wk(b){return b.type==Sj}function Xk(b){b=b.a;return!b.c&&!b.l&&!b.f}function Yk(b){b=b.a;return!b.c&&!b.l&&b.f}function Zk(b){b=b.a.target.tagName;return"INPUT"!==b&&"SELECT"!==b&&"TEXTAREA"!==b}function $k(b){return"mouse"==b.c.pointerType};function al(b){b=b?b:{};Ok.call(this,{handleEvent:b.handleEvent?b.handleEvent:bl});this.Ac=b.handleDownEvent?b.handleDownEvent:te;this.Bc=b.handleDragEvent?b.handleDragEvent:wa;this.Xc=b.handleMoveEvent?b.handleMoveEvent:wa;this.We=b.handleUpEvent?b.handleUpEvent:te;this.C=!1;this.Z={};this.j=[]}y(al,Ok);function cl(b){for(var c=b.length,d=0,e=0,f=0;f<c;f++)d+=b[f].clientX,e+=b[f].clientY;return[d/c,e/c]}
function bl(b){if(!(b instanceof Nj))return!0;var c=!1,d=b.type;if(d===Wj||d===Yj||d===Uj)d=b.c,b.type==Uj?delete this.Z[d.pointerId]:b.type==Wj?this.Z[d.pointerId]=d:d.pointerId in this.Z&&(this.Z[d.pointerId]=d),this.j=Lb(this.Z);this.C&&(b.type==Yj?this.Bc(b):b.type==Uj&&(this.C=this.We(b)));b.type==Wj?(this.C=b=this.Ac(b),c=this.xc(b)):b.type==Xj&&this.Xc(b);return!c}al.prototype.xc=we;function dl(b){al.call(this,{handleDownEvent:el,handleDragEvent:fl,handleUpEvent:gl});b=b?b:{};this.a=b.kinetic;this.f=this.i=null;this.A=b.condition?b.condition:Xk;this.l=!1}y(dl,al);function fl(b){var c=cl(this.j);this.a&&this.a.a.push(c[0],c[1],Date.now());if(this.f){var d=this.f[0]-c[0],e=c[1]-this.f[1];b=b.map;var f=b.aa(),g=Rf(f),e=d=[d,e],h=g.resolution;e[0]*=h;e[1]*=h;wd(d,g.rotation);rd(d,g.center);d=f.Wd(d);b.render();f.jb(d)}this.f=c}
function gl(b){b=b.map;var c=b.aa();if(0===this.j.length){var d;if(d=!this.l&&this.a)if(d=this.a,6>d.a.length)d=!1;else{var e=Date.now()-d.j,f=d.a.length-3;if(d.a[f+2]<e)d=!1;else{for(var g=f-3;0<g&&d.a[g+2]>e;)g-=3;var e=d.a[f+2]-d.a[g+2],h=d.a[f]-d.a[g],f=d.a[f+1]-d.a[g+1];d.g=Math.atan2(f,h);d.c=Math.sqrt(h*h+f*f)/e;d=d.c>d.b}}d&&(d=this.a,d=(d.b-d.c)/d.f,f=this.a.g,g=c.Ta(),this.i=Nk(this.a,g),b.Ma(this.i),g=b.Oa(g),d=b.Fa([g[0]-d*Math.cos(f),g[1]-d*Math.sin(f)]),d=c.Wd(d),c.jb(d));Tf(c,-1);b.render();
return!1}this.f=null;return!0}function el(b){if(0<this.j.length&&this.A(b)){var c=b.map,d=c.aa();this.f=null;this.C||Tf(d,1);c.render();this.i&&hb(c.S,this.i)&&(d.jb(b.frameState.viewState.center),this.i=null);this.a&&(b=this.a,b.a.length=0,b.g=0,b.c=0);this.l=1<this.j.length;return!0}return!1}dl.prototype.xc=te;function hl(b){b=b?b:{};al.call(this,{handleDownEvent:il,handleDragEvent:jl,handleUpEvent:kl});this.f=b.condition?b.condition:Uk;this.a=void 0;this.i=b.duration?b.duration:250}y(hl,al);function jl(b){if($k(b)){var c=b.map,d=c.Ra();b=b.pixel;d=Math.atan2(d[1]/2-b[1],b[0]-d[0]/2);if(void 0!==this.a){b=d-this.a;var e=c.aa(),f=e.Ea();c.render();Pk(c,e,f-b)}this.a=d}}
function kl(b){if(!$k(b))return!0;b=b.map;var c=b.aa();Tf(c,-1);var d=c.Ea(),e=this.i,d=c.constrainRotation(d,0);Pk(b,c,d,void 0,e);return!1}function il(b){return $k(b)&&Cc(b.a)&&this.f(b)?(b=b.map,Tf(b.aa(),1),b.render(),this.a=void 0,!0):!1}hl.prototype.xc=te;function ll(b){this.f=null;this.c=document.createElement("div");this.c.style.position="absolute";this.c.className="ol-box "+b;this.b=this.g=this.a=null}y(ll,pc);ll.prototype.X=function(){this.setMap(null);ll.da.X.call(this)};function ml(b){var c=b.g,d=b.b;b=b.c.style;b.left=Math.min(c[0],d[0])+"px";b.top=Math.min(c[1],d[1])+"px";b.width=Math.abs(d[0]-c[0])+"px";b.height=Math.abs(d[1]-c[1])+"px"}
ll.prototype.setMap=function(b){if(this.a){this.a.G.removeChild(this.c);var c=this.c.style;c.left=c.top=c.width=c.height="inherit"}(this.a=b)&&this.a.G.appendChild(this.c)};function nl(b){var c=b.g,d=b.b,c=[c,[c[0],d[1]],d,[d[0],c[1]]].map(b.a.Fa,b.a);c[4]=c[0].slice();b.f?b.f.ma([c]):b.f=new E([c])}ll.prototype.W=function(){return this.f};function pl(b,c){vc.call(this,b);this.coordinate=c}y(pl,vc);function ql(b){al.call(this,{handleDownEvent:rl,handleDragEvent:sl,handleUpEvent:tl});b=b?b:{};this.f=new ll(b.className||"ol-dragbox");this.a=null;this.A=b.condition?b.condition:ue}y(ql,al);function sl(b){if($k(b)){var c=this.f;b=b.pixel;c.g=this.a;c.b=b;nl(c);ml(c)}}ql.prototype.W=function(){return this.f.W()};ql.prototype.l=wa;
function tl(b){if(!$k(b))return!0;this.f.setMap(null);var c=b.pixel[0]-this.a[0],d=b.pixel[1]-this.a[1];64<=c*c+d*d&&(this.l(b),this.o(new pl("boxend",b.coordinate)));return!1}function rl(b){if($k(b)&&Cc(b.a)&&this.A(b)){this.a=b.pixel;this.f.setMap(b.map);var c=this.f,d=this.a;c.g=this.a;c.b=d;nl(c);ml(c);this.o(new pl("boxstart",b.coordinate));return!0}return!1};function ul(b){b=b?b:{};var c=b.condition?b.condition:Yk;this.i=void 0!==b.duration?b.duration:200;ql.call(this,{condition:c,className:b.className||"ol-dragzoom"})}y(ul,ql);ul.prototype.l=function(){var b=this.u,c=b.aa(),d=b.Ra(),e=this.W().J(),d=c.constrainResolution(Math.max(ke(e)/d[0],le(e)/d[1])),f=c.$(),g=c.Ta();b.Ma(bg({resolution:f,duration:this.i,easing:Vf}));b.Ma(Zf({source:g,duration:this.i,easing:Vf}));c.jb(me(e));c.Ub(d)};function vl(b){Ok.call(this,{handleEvent:wl});b=b||{};this.a=void 0!==b.condition?b.condition:ze(Xk,Zk);this.f=void 0!==b.duration?b.duration:100;this.j=void 0!==b.pixelDelta?b.pixelDelta:128}y(vl,Ok);
function wl(b){var c=!1;if("key"==b.type){var d=b.a.j;if(this.a(b)&&(40==d||37==d||39==d||38==d)){var e=b.map,c=e.aa(),f=c.$()*this.j,g=0,h=0;40==d?h=-f:37==d?g=-f:39==d?g=f:h=f;d=[g,h];wd(d,c.Ea());f=this.f;if(g=c.Ta())f&&0<f&&e.Ma(Zf({source:g,duration:f,easing:Xf})),e=c.Wd([g[0]+d[0],g[1]+d[1]]),c.jb(e);b.preventDefault();c=!0}}return!c};function xl(b){Ok.call(this,{handleEvent:yl});b=b?b:{};this.f=b.condition?b.condition:Zk;this.a=b.delta?b.delta:1;this.j=void 0!==b.duration?b.duration:100}y(xl,Ok);function yl(b){var c=!1;if("key"==b.type){var d=b.a.u;if(this.f(b)&&(43==d||45==d)){c=b.map;d=43==d?this.a:-this.a;c.render();var e=c.aa();Qk(c,e,d,void 0,this.j);b.preventDefault();c=!0}}return!c};function zl(b){Ok.call(this,{handleEvent:Al});b=b||{};this.f=0;this.C=void 0!==b.duration?b.duration:250;this.l=void 0!==b.useAnchor?b.useAnchor:!0;this.a=null;this.i=this.j=void 0}y(zl,Ok);function Al(b){var c=!1;if("mousewheel"==b.type){var c=b.map,d=b.a;this.l&&(this.a=b.coordinate);this.f+=d.C;void 0===this.j&&(this.j=Date.now());d=Math.max(80-(Date.now()-this.j),0);ba.clearTimeout(this.i);this.i=ba.setTimeout(ra(this.A,this,c),d);b.preventDefault();c=!0}return!c}
zl.prototype.A=function(b){var c=Sa(this.f,-1,1),d=b.aa();b.render();Qk(b,d,-c,this.a,this.C);this.f=0;this.a=null;this.i=this.j=void 0};zl.prototype.D=function(b){this.l=b;b||(this.a=null)};function Bl(b){al.call(this,{handleDownEvent:Cl,handleDragEvent:Dl,handleUpEvent:El});b=b||{};this.f=null;this.i=void 0;this.a=!1;this.l=0;this.D=void 0!==b.threshold?b.threshold:.3;this.A=void 0!==b.duration?b.duration:250}y(Bl,al);
function Dl(b){var c=0,d=this.j[0],e=this.j[1],d=Math.atan2(e.clientY-d.clientY,e.clientX-d.clientX);void 0!==this.i&&(c=d-this.i,this.l+=c,!this.a&&Math.abs(this.l)>this.D&&(this.a=!0));this.i=d;b=b.map;d=fh(b.a);e=cl(this.j);e[0]-=d.x;e[1]-=d.y;this.f=b.Fa(e);this.a&&(d=b.aa(),e=d.Ea(),b.render(),Pk(b,d,e+c,this.f))}function El(b){if(2>this.j.length){b=b.map;var c=b.aa();Tf(c,-1);if(this.a){var d=c.Ea(),e=this.f,f=this.A,d=c.constrainRotation(d,0);Pk(b,c,d,e,f)}return!1}return!0}
function Cl(b){return 2<=this.j.length?(b=b.map,this.f=null,this.i=void 0,this.a=!1,this.l=0,this.C||Tf(b.aa(),1),b.render(),!0):!1}Bl.prototype.xc=te;function Fl(b){al.call(this,{handleDownEvent:Gl,handleDragEvent:Hl,handleUpEvent:Il});b=b?b:{};this.f=null;this.l=void 0!==b.duration?b.duration:400;this.a=void 0;this.i=1}y(Fl,al);function Hl(b){var c=1,d=this.j[0],e=this.j[1],f=d.clientX-e.clientX,d=d.clientY-e.clientY,f=Math.sqrt(f*f+d*d);void 0!==this.a&&(c=this.a/f);this.a=f;1!=c&&(this.i=c);b=b.map;var f=b.aa(),d=f.$(),e=fh(b.a),g=cl(this.j);g[0]-=e.x;g[1]-=e.y;this.f=b.Fa(g);b.render();Rk(b,f,d*c,this.f)}
function Il(b){if(2>this.j.length){b=b.map;var c=b.aa();Tf(c,-1);var d=c.$(),e=this.f,f=this.l,d=c.constrainResolution(d,0,this.i-1);Rk(b,c,d,e,f);return!1}return!0}function Gl(b){return 2<=this.j.length?(b=b.map,this.f=null,this.a=void 0,this.i=1,this.C||Tf(b.aa(),1),b.render(),!0):!1}Fl.prototype.xc=te;function Jl(b){b=b?b:{};var c=new og,d=new Mk(-.005,.05,100);(void 0!==b.altShiftDragRotate?b.altShiftDragRotate:1)&&c.push(new hl);(void 0!==b.doubleClickZoom?b.doubleClickZoom:1)&&c.push(new Sk({delta:b.zoomDelta,duration:b.zoomDuration}));(void 0!==b.dragPan?b.dragPan:1)&&c.push(new dl({kinetic:d}));(void 0!==b.pinchRotate?b.pinchRotate:1)&&c.push(new Bl);(void 0!==b.pinchZoom?b.pinchZoom:1)&&c.push(new Fl({duration:b.zoomDuration}));if(void 0!==b.keyboard?b.keyboard:1)c.push(new vl),c.push(new xl({delta:b.zoomDelta,
duration:b.zoomDuration}));(void 0!==b.mouseWheelZoom?b.mouseWheelZoom:1)&&c.push(new zl({duration:b.zoomDuration}));(void 0!==b.shiftDragZoom?b.shiftDragZoom:1)&&c.push(new ul({duration:b.zoomDuration}));return c};function Kl(b){var c=b||{};b=Ub(c);delete b.layers;c=c.layers;ak.call(this,b);this.b=[];this.a={};C(this,kd("layers"),this.Fk,!1,this);c?ga(c)&&(c=new og(c.slice())):c=new og;this.gh(c)}y(Kl,ak);l=Kl.prototype;l.he=function(){this.qb()&&this.s()};
l.Fk=function(){this.b.forEach(Zc);this.b.length=0;var b=this.Pc();this.b.push(C(b,"add",this.Ek,!1,this),C(b,"remove",this.Gk,!1,this));Ib(this.a,function(b){b.forEach(Zc)});Rb(this.a);var b=b.a,c,d,e;c=0;for(d=b.length;c<d;c++)e=b[c],this.a[w(e).toString()]=[C(e,"propertychange",this.he,!1,this),C(e,"change",this.he,!1,this)];this.s()};l.Ek=function(b){b=b.element;var c=w(b).toString();this.a[c]=[C(b,"propertychange",this.he,!1,this),C(b,"change",this.he,!1,this)];this.s()};
l.Gk=function(b){b=w(b.element).toString();this.a[b].forEach(Zc);delete this.a[b];this.s()};l.Pc=function(){return this.get("layers")};l.gh=function(b){this.set("layers",b)};
l.nf=function(b){var c=void 0!==b?b:[],d=c.length;this.Pc().forEach(function(b){b.nf(c)});b=bk(this);var e,f;for(e=c.length;d<e;d++)f=c[d],f.opacity*=b.opacity,f.visible=f.visible&&b.visible,f.maxResolution=Math.min(f.maxResolution,b.maxResolution),f.minResolution=Math.max(f.minResolution,b.minResolution),void 0!==b.extent&&(f.extent=void 0!==f.extent?oe(f.extent,b.extent):b.extent);return c};l.of=function(){return"ready"};function Ll(b){De.call(this,{code:b,units:"m",extent:Ml,global:!0,worldExtent:Nl})}y(Ll,De);Ll.prototype.getPointResolution=function(b,c){return b/Ta(c[1]/6378137)};var Ol=6378137*Math.PI,Ml=[-Ol,-Ol,Ol,Ol],Nl=[-180,-85,180,85],Qe="EPSG:3857 EPSG:102100 EPSG:102113 EPSG:900913 urn:ogc:def:crs:EPSG:6.18:3:3857 urn:ogc:def:crs:EPSG::3857 http://www.opengis.net/gml/srs/epsg.xml#3857".split(" ").map(function(b){return new Ll(b)});
function Re(b,c,d){var e=b.length;d=1<d?d:2;void 0===c&&(2<d?c=b.slice():c=Array(e));for(var f=0;f<e;f+=d)c[f]=6378137*Math.PI*b[f]/180,c[f+1]=6378137*Math.log(Math.tan(Math.PI*(b[f+1]+90)/360));return c}function Se(b,c,d){var e=b.length;d=1<d?d:2;void 0===c&&(2<d?c=b.slice():c=Array(e));for(var f=0;f<e;f+=d)c[f]=180*b[f]/(6378137*Math.PI),c[f+1]=360*Math.atan(Math.exp(b[f+1]/6378137))/Math.PI-90;return c};function Pl(b,c){De.call(this,{code:b,units:"degrees",extent:Ql,axisOrientation:c,global:!0,worldExtent:Ql})}y(Pl,De);Pl.prototype.getPointResolution=function(b){return b};
var Ql=[-180,-90,180,90],Te=[new Pl("CRS:84"),new Pl("EPSG:4326","neu"),new Pl("urn:ogc:def:crs:EPSG::4326","neu"),new Pl("urn:ogc:def:crs:EPSG:6.6:4326","neu"),new Pl("urn:ogc:def:crs:OGC:1.3:CRS84"),new Pl("urn:ogc:def:crs:OGC:2:84"),new Pl("http://www.opengis.net/gml/srs/epsg.xml#4326","neu"),new Pl("urn:x-ogc:def:crs:EPSG:4326","neu")];function Rl(){Ge(Qe);Ge(Te);Pe()};function Sl(b){ek.call(this,b?b:{})}y(Sl,ek);function F(b){b=b?b:{};var c=Ub(b);delete c.preload;delete c.useInterimTilesOnError;ek.call(this,c);this.f(void 0!==b.preload?b.preload:0);this.g(void 0!==b.useInterimTilesOnError?b.useInterimTilesOnError:!0)}y(F,ek);F.prototype.a=function(){return this.get("preload")};F.prototype.f=function(b){this.set("preload",b)};F.prototype.b=function(){return this.get("useInterimTilesOnError")};F.prototype.g=function(b){this.set("useInterimTilesOnError",b)};var Tl=[0,0,0,1],Ul=[],Vl=[0,0,0,1];function Wl(b){b=b||{};this.a=void 0!==b.color?b.color:null;this.c=void 0}Wl.prototype.b=function(){return this.a};Wl.prototype.f=function(b){this.a=b;this.c=void 0};Wl.prototype.Ib=function(){void 0===this.c&&(this.c="f"+(this.a?vg(this.a):"-"));return this.c};function Xl(){this.c=-1};function Yl(){this.c=-1;this.c=64;this.a=Array(4);this.g=Array(this.c);this.f=this.b=0;this.reset()}y(Yl,Xl);Yl.prototype.reset=function(){this.a[0]=1732584193;this.a[1]=4023233417;this.a[2]=2562383102;this.a[3]=271733878;this.f=this.b=0};
function Zl(b,c,d){d||(d=0);var e=Array(16);if(ia(c))for(var f=0;16>f;++f)e[f]=c.charCodeAt(d++)|c.charCodeAt(d++)<<8|c.charCodeAt(d++)<<16|c.charCodeAt(d++)<<24;else for(f=0;16>f;++f)e[f]=c[d++]|c[d++]<<8|c[d++]<<16|c[d++]<<24;c=b.a[0];d=b.a[1];var f=b.a[2],g=b.a[3],h=0,h=c+(g^d&(f^g))+e[0]+3614090360&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[1]+3905402710&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[2]+606105819&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^
c))+e[3]+3250441966&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[4]+4118548399&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[5]+1200080426&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[6]+2821735955&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[7]+4249261313&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[8]+1770035416&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[9]+2336552879&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+
(d^g&(c^d))+e[10]+4294925233&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[11]+2304563134&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(g^d&(f^g))+e[12]+1804603682&4294967295;c=d+(h<<7&4294967295|h>>>25);h=g+(f^c&(d^f))+e[13]+4254626195&4294967295;g=c+(h<<12&4294967295|h>>>20);h=f+(d^g&(c^d))+e[14]+2792965006&4294967295;f=g+(h<<17&4294967295|h>>>15);h=d+(c^f&(g^c))+e[15]+1236535329&4294967295;d=f+(h<<22&4294967295|h>>>10);h=c+(f^g&(d^f))+e[1]+4129170786&4294967295;c=d+(h<<5&4294967295|
h>>>27);h=g+(d^f&(c^d))+e[6]+3225465664&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[11]+643717713&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[0]+3921069994&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(f^g&(d^f))+e[5]+3593408605&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[10]+38016083&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[15]+3634488961&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[4]+3889429448&4294967295;d=f+(h<<20&4294967295|
h>>>12);h=c+(f^g&(d^f))+e[9]+568446438&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[14]+3275163606&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[3]+4107603335&4294967295;f=g+(h<<14&4294967295|h>>>18);h=d+(g^c&(f^g))+e[8]+1163531501&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(f^g&(d^f))+e[13]+2850285829&4294967295;c=d+(h<<5&4294967295|h>>>27);h=g+(d^f&(c^d))+e[2]+4243563512&4294967295;g=c+(h<<9&4294967295|h>>>23);h=f+(c^d&(g^c))+e[7]+1735328473&4294967295;f=g+(h<<14&4294967295|
h>>>18);h=d+(g^c&(f^g))+e[12]+2368359562&4294967295;d=f+(h<<20&4294967295|h>>>12);h=c+(d^f^g)+e[5]+4294588738&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[8]+2272392833&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[11]+1839030562&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[14]+4259657740&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[1]+2763975236&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[4]+1272893353&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^
c^d)+e[7]+4139469664&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[10]+3200236656&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[13]+681279174&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[0]+3936430074&4294967295;g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[3]+3572445317&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[6]+76029189&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(d^f^g)+e[9]+3654602809&4294967295;c=d+(h<<4&4294967295|h>>>28);h=g+(c^d^f)+e[12]+3873151461&4294967295;
g=c+(h<<11&4294967295|h>>>21);h=f+(g^c^d)+e[15]+530742520&4294967295;f=g+(h<<16&4294967295|h>>>16);h=d+(f^g^c)+e[2]+3299628645&4294967295;d=f+(h<<23&4294967295|h>>>9);h=c+(f^(d|~g))+e[0]+4096336452&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[7]+1126891415&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[14]+2878612391&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[5]+4237533241&4294967295;d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[12]+1700485571&4294967295;c=d+
(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[3]+2399980690&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[10]+4293915773&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[1]+2240044497&4294967295;d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[8]+1873313359&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[15]+4264355552&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[6]+2734768916&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[13]+1309151649&4294967295;
d=f+(h<<21&4294967295|h>>>11);h=c+(f^(d|~g))+e[4]+4149444226&4294967295;c=d+(h<<6&4294967295|h>>>26);h=g+(d^(c|~f))+e[11]+3174756917&4294967295;g=c+(h<<10&4294967295|h>>>22);h=f+(c^(g|~d))+e[2]+718787259&4294967295;f=g+(h<<15&4294967295|h>>>17);h=d+(g^(f|~c))+e[9]+3951481745&4294967295;b.a[0]=b.a[0]+c&4294967295;b.a[1]=b.a[1]+(f+(h<<21&4294967295|h>>>11))&4294967295;b.a[2]=b.a[2]+f&4294967295;b.a[3]=b.a[3]+g&4294967295}
function $l(b,c){var d;ca(d)||(d=c.length);for(var e=d-b.c,f=b.g,g=b.b,h=0;h<d;){if(0==g)for(;h<=e;)Zl(b,c,h),h+=b.c;if(ia(c))for(;h<d;){if(f[g++]=c.charCodeAt(h++),g==b.c){Zl(b,f);g=0;break}}else for(;h<d;)if(f[g++]=c[h++],g==b.c){Zl(b,f);g=0;break}}b.b=g;b.f+=d};function am(b){b=b||{};this.a=void 0!==b.color?b.color:null;this.f=b.lineCap;this.b=void 0!==b.lineDash?b.lineDash:null;this.g=b.lineJoin;this.j=b.miterLimit;this.c=b.width;this.i=void 0}l=am.prototype;l.mn=function(){return this.a};l.Qj=function(){return this.f};l.nn=function(){return this.b};l.Rj=function(){return this.g};l.Wj=function(){return this.j};l.pn=function(){return this.c};l.qn=function(b){this.a=b;this.i=void 0};l.Oo=function(b){this.f=b;this.i=void 0};
l.rn=function(b){this.b=b;this.i=void 0};l.Po=function(b){this.g=b;this.i=void 0};l.Qo=function(b){this.j=b;this.i=void 0};l.Uo=function(b){this.c=b;this.i=void 0};
l.Ib=function(){if(void 0===this.i){var b="s"+(this.a?vg(this.a):"-")+","+(void 0!==this.f?this.f.toString():"-")+","+(this.b?this.b.toString():"-")+","+(void 0!==this.g?this.g:"-")+","+(void 0!==this.j?this.j.toString():"-")+","+(void 0!==this.c?this.c.toString():"-"),c=new Yl;$l(c,b);b=Array((56>c.b?c.c:2*c.c)-c.b);b[0]=128;for(var d=1;d<b.length-8;++d)b[d]=0;for(var e=8*c.f,d=b.length-8;d<b.length;++d)b[d]=e&255,e/=256;$l(c,b);b=Array(16);for(d=e=0;4>d;++d)for(var f=0;32>f;f+=8)b[e++]=c.a[d]>>>
f&255;if(8192>=b.length)c=String.fromCharCode.apply(null,b);else for(c="",d=0;d<b.length;d+=8192)e=nb(b,d,d+8192),c+=String.fromCharCode.apply(null,e);this.i=c}return this.i};function bm(b){b=b||{};this.j=this.a=this.g=null;this.f=void 0!==b.fill?b.fill:null;this.c=void 0!==b.stroke?b.stroke:null;this.b=b.radius;this.C=[0,0];this.B=this.ia=this.l=null;var c=b.atlasManager,d,e=null,f,g=0;this.c&&(f=vg(this.c.a),g=this.c.c,void 0===g&&(g=1),e=this.c.b,Yi||(e=null));var h=2*(this.b+g)+1;f={strokeStyle:f,Hd:g,size:h,lineDash:e};void 0===c?(this.a=Kg("CANVAS"),this.a.height=h,this.a.width=h,d=h=this.a.width,c=this.a.getContext("2d"),this.sh(f,c,0,0),this.f?this.j=this.a:(c=
this.j=Kg("CANVAS"),c.height=f.size,c.width=f.size,c=c.getContext("2d"),this.rh(f,c,0,0))):(h=Math.round(h),(e=!this.f)&&(d=ra(this.rh,this,f)),g=this.Ib(),f=c.add(g,h,h,ra(this.sh,this,f),d),this.a=f.image,this.C=[f.offsetX,f.offsetY],d=f.image.width,this.j=e?f.Mg:this.a);this.l=[h/2,h/2];this.ia=[h,h];this.B=[d,d];vk.call(this,{opacity:1,rotateWithView:!1,rotation:0,scale:1,snapToPixel:void 0!==b.snapToPixel?b.snapToPixel:!0})}y(bm,vk);l=bm.prototype;l.Xb=function(){return this.l};l.cn=function(){return this.f};
l.ze=function(){return this.j};l.fc=function(){return this.a};l.Bd=function(){return 2};l.qd=function(){return this.B};l.Ca=function(){return this.C};l.dn=function(){return this.b};l.Bb=function(){return this.ia};l.en=function(){return this.c};l.sf=wa;l.load=wa;l.Wf=wa;
l.sh=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();c.arc(b.size/2,b.size/2,this.b,0,2*Math.PI,!0);this.f&&(c.fillStyle=vg(this.f.a),c.fill());this.c&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Hd,b.lineDash&&c.setLineDash(b.lineDash),c.stroke());c.closePath()};
l.rh=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();c.arc(b.size/2,b.size/2,this.b,0,2*Math.PI,!0);c.fillStyle=vg(Tl);c.fill();this.c&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Hd,b.lineDash&&c.setLineDash(b.lineDash),c.stroke());c.closePath()};l.Ib=function(){var b=this.c?this.c.Ib():"-",c=this.f?this.f.Ib():"-";this.g&&b==this.g[1]&&c==this.g[2]&&this.b==this.g[3]||(this.g=["c"+b+c+(void 0!==this.b?this.b.toString():"-"),b,c,this.b]);return this.g[0]};function cm(b){b=b||{};this.i=null;this.g=dm;void 0!==b.geometry&&this.vh(b.geometry);this.j=void 0!==b.fill?b.fill:null;this.b=void 0!==b.image?b.image:null;this.f=void 0!==b.stroke?b.stroke:null;this.c=void 0!==b.text?b.text:null;this.a=b.zIndex}l=cm.prototype;l.W=function(){return this.i};l.Lj=function(){return this.g};l.sn=function(){return this.j};l.tn=function(){return this.b};l.vn=function(){return this.f};l.wn=function(){return this.c};l.xn=function(){return this.a};
l.vh=function(b){ka(b)?this.g=b:ia(b)?this.g=function(c){return c.get(b)}:b?void 0!==b&&(this.g=function(){return b}):this.g=dm;this.i=b};l.yn=function(b){this.a=b};function em(b){if(!ka(b)){var c;c=ga(b)?b:[b];b=function(){return c}}return b}var fm=null;function gm(){if(!fm){var b=new Wl({color:"rgba(255,255,255,0.4)"}),c=new am({color:"#3399CC",width:1.25});fm=[new cm({image:new bm({fill:b,stroke:c,radius:5}),fill:b,stroke:c})]}return fm}
function hm(){var b={},c=[255,255,255,1],d=[0,153,255,1];b.Polygon=[new cm({fill:new Wl({color:[255,255,255,.5]})})];b.MultiPolygon=b.Polygon;b.LineString=[new cm({stroke:new am({color:c,width:5})}),new cm({stroke:new am({color:d,width:3})})];b.MultiLineString=b.LineString;b.Circle=b.Polygon.concat(b.LineString);b.Point=[new cm({image:new bm({radius:6,fill:new Wl({color:d}),stroke:new am({color:c,width:1.5})}),zIndex:Infinity})];b.MultiPoint=b.Point;b.GeometryCollection=b.Polygon.concat(b.LineString,
b.Point);return b}function dm(b){return b.W()};function H(b){b=b?b:{};var c=Ub(b);delete c.style;delete c.renderBuffer;delete c.updateWhileAnimating;delete c.updateWhileInteracting;ek.call(this,c);this.a=void 0!==b.renderBuffer?b.renderBuffer:100;this.C=null;this.b=void 0;this.f(b.style);this.i=void 0!==b.updateWhileAnimating?b.updateWhileAnimating:!1;this.l=void 0!==b.updateWhileInteracting?b.updateWhileInteracting:!1}y(H,ek);function im(b){return b.get("renderOrder")}H.prototype.D=function(){return this.C};H.prototype.G=function(){return this.b};
H.prototype.f=function(b){this.C=void 0!==b?b:gm;this.b=null===b?void 0:em(this.C);this.s()};function J(b){b=b?b:{};var c=Ub(b);delete c.preload;delete c.useInterimTilesOnError;H.call(this,c);this.T(b.preload?b.preload:0);this.Z(b.useInterimTilesOnError?b.useInterimTilesOnError:!0)}y(J,H);J.prototype.g=function(){return this.get("preload")};J.prototype.U=function(){return this.get("useInterimTilesOnError")};J.prototype.T=function(b){this.set("preload",b)};J.prototype.Z=function(b){this.set("useInterimTilesOnError",b)};function jm(b,c,d,e,f){this.C={};this.b=b;this.G=c;this.g=d;this.oa=e;this.Xc=f;this.j=this.a=this.c=this.va=this.eb=this.ga=null;this.xa=this.pa=this.A=this.T=this.U=this.S=0;this.fb=!1;this.i=this.Cb=0;this.Db=!1;this.Z=0;this.f="";this.B=this.ia=this.Ac=this.Nd=0;this.ea=this.u=this.l=null;this.D=[];this.Bc=Dd()}
function km(b,c,d){if(b.j){c=cf(c,0,d,2,b.oa,b.D);d=b.b;var e=b.Bc,f=d.globalAlpha;1!=b.A&&(d.globalAlpha=f*b.A);var g=b.Cb;b.fb&&(g+=b.Xc);var h,k;h=0;for(k=c.length;h<k;h+=2){var m=c[h]-b.S,n=c[h+1]-b.U;b.Db&&(m=m+.5|0,n=n+.5|0);if(0!==g||1!=b.i){var p=m+b.S,q=n+b.U;ik(e,p,q,b.i,b.i,g,-p,-q);d.setTransform(e[0],e[1],e[4],e[5],e[12],e[13])}d.drawImage(b.j,b.pa,b.xa,b.Z,b.T,m,n,b.Z,b.T)}0===g&&1==b.i||d.setTransform(1,0,0,1,0,0);1!=b.A&&(d.globalAlpha=f)}}
function lm(b,c,d,e){var f=0;if(b.ea&&""!==b.f){b.l&&mm(b,b.l);b.u&&nm(b,b.u);var g=b.ea,h=b.b,k=b.va;k?(k.font!=g.font&&(k.font=h.font=g.font),k.textAlign!=g.textAlign&&(k.textAlign=h.textAlign=g.textAlign),k.textBaseline!=g.textBaseline&&(k.textBaseline=h.textBaseline=g.textBaseline)):(h.font=g.font,h.textAlign=g.textAlign,h.textBaseline=g.textBaseline,b.va={font:g.font,textAlign:g.textAlign,textBaseline:g.textBaseline});c=cf(c,f,d,e,b.oa,b.D);for(g=b.b;f<d;f+=e){h=c[f]+b.Nd;k=c[f+1]+b.Ac;if(0!==
b.ia||1!=b.B){var m=ik(b.Bc,h,k,b.B,b.B,b.ia,-h,-k);g.setTransform(m[0],m[1],m[4],m[5],m[12],m[13])}b.u&&g.strokeText(b.f,h,k);b.l&&g.fillText(b.f,h,k)}0===b.ia&&1==b.B||g.setTransform(1,0,0,1,0,0)}}function om(b,c,d,e,f,g){var h=b.b;b=cf(c,d,e,f,b.oa,b.D);h.moveTo(b[0],b[1]);for(c=2;c<b.length;c+=2)h.lineTo(b[c],b[c+1]);g&&h.lineTo(b[0],b[1]);return e}function qm(b,c,d,e,f){var g=b.b,h,k;h=0;for(k=e.length;h<k;++h)d=om(b,c,d,e[h],f,!0),g.closePath();return d}l=jm.prototype;
l.ld=function(b,c){var d=b.toString(),e=this.C[d];void 0!==e?e.push(c):this.C[d]=[c]};l.Fc=function(b){if(pe(this.g,b.J())){if(this.c||this.a){this.c&&mm(this,this.c);this.a&&nm(this,this.a);var c;c=this.oa;var d=this.D,e=b.ja();if(e){var f=b.ra();c=cf(e,0,e.length,f,c,d)}else c=null;d=c[2]-c[0];e=c[3]-c[1];d=Math.sqrt(d*d+e*e);e=this.b;e.beginPath();e.arc(c[0],c[1],d,0,2*Math.PI);this.c&&e.fill();this.a&&e.stroke()}""!==this.f&&lm(this,b.vd(),2,2)}};
l.hf=function(b,c){var d=(0,c.g)(b);if(d&&pe(this.g,d.J())){var e=c.a;void 0===e&&(e=0);this.ld(e,function(b){b.$a(c.j,c.f);b.vb(c.b);b.ab(c.c);rm[d.V()].call(b,d,null)})}};l.Xd=function(b,c){var d=b.f,e,f;e=0;for(f=d.length;e<f;++e){var g=d[e];rm[g.V()].call(this,g,c)}};l.Gb=function(b){var c=b.ja();b=b.ra();this.j&&km(this,c,c.length);""!==this.f&&lm(this,c,c.length,b)};l.Fb=function(b){var c=b.ja();b=b.ra();this.j&&km(this,c,c.length);""!==this.f&&lm(this,c,c.length,b)};
l.Wb=function(b){if(pe(this.g,b.J())){if(this.a){nm(this,this.a);var c=this.b,d=b.ja();c.beginPath();om(this,d,0,d.length,b.ra(),!1);c.stroke()}""!==this.f&&(b=sm(b),lm(this,b,2,2))}};l.Gc=function(b){var c=b.J();if(pe(this.g,c)){if(this.a){nm(this,this.a);var c=this.b,d=b.ja(),e=0,f=b.Ab(),g=b.ra();c.beginPath();var h,k;h=0;for(k=f.length;h<k;++h)e=om(this,d,e,f[h],g,!1);c.stroke()}""!==this.f&&(b=tm(b),lm(this,b,b.length,2))}};
l.Ic=function(b){if(pe(this.g,b.J())){if(this.a||this.c){this.c&&mm(this,this.c);this.a&&nm(this,this.a);var c=this.b;c.beginPath();qm(this,b.ac(),0,b.Ab(),b.ra());this.c&&c.fill();this.a&&c.stroke()}""!==this.f&&(b=Jf(b),lm(this,b,2,2))}};
l.Hc=function(b){if(pe(this.g,b.J())){if(this.a||this.c){this.c&&mm(this,this.c);this.a&&nm(this,this.a);var c=this.b,d=um(b),e=0,f=b.g,g=b.ra(),h,k;h=0;for(k=f.length;h<k;++h){var m=f[h];c.beginPath();e=qm(this,d,e,m,g);this.c&&c.fill();this.a&&c.stroke()}}""!==this.f&&(b=vm(b),lm(this,b,b.length,2))}};function wm(b){var c=Object.keys(b.C).map(Number);ob(c);var d,e,f,g,h;d=0;for(e=c.length;d<e;++d)for(f=b.C[c[d].toString()],g=0,h=f.length;g<h;++g)f[g](b)}
function mm(b,c){var d=b.b,e=b.ga;e?e.fillStyle!=c.fillStyle&&(e.fillStyle=d.fillStyle=c.fillStyle):(d.fillStyle=c.fillStyle,b.ga={fillStyle:c.fillStyle})}
function nm(b,c){var d=b.b,e=b.eb;e?(e.lineCap!=c.lineCap&&(e.lineCap=d.lineCap=c.lineCap),Yi&&!sb(e.lineDash,c.lineDash)&&d.setLineDash(e.lineDash=c.lineDash),e.lineJoin!=c.lineJoin&&(e.lineJoin=d.lineJoin=c.lineJoin),e.lineWidth!=c.lineWidth&&(e.lineWidth=d.lineWidth=c.lineWidth),e.miterLimit!=c.miterLimit&&(e.miterLimit=d.miterLimit=c.miterLimit),e.strokeStyle!=c.strokeStyle&&(e.strokeStyle=d.strokeStyle=c.strokeStyle)):(d.lineCap=c.lineCap,Yi&&d.setLineDash(c.lineDash),d.lineJoin=c.lineJoin,d.lineWidth=
c.lineWidth,d.miterLimit=c.miterLimit,d.strokeStyle=c.strokeStyle,b.eb={lineCap:c.lineCap,lineDash:c.lineDash,lineJoin:c.lineJoin,lineWidth:c.lineWidth,miterLimit:c.miterLimit,strokeStyle:c.strokeStyle})}
l.$a=function(b,c){if(b){var d=b.a;this.c={fillStyle:vg(d?d:Tl)}}else this.c=null;if(c){var d=c.a,e=c.f,f=c.b,g=c.g,h=c.c,k=c.j;this.a={lineCap:void 0!==e?e:"round",lineDash:f?f:Ul,lineJoin:void 0!==g?g:"round",lineWidth:this.G*(void 0!==h?h:1),miterLimit:void 0!==k?k:10,strokeStyle:vg(d?d:Vl)}}else this.a=null};
l.vb=function(b){if(b){var c=b.Xb(),d=b.fc(1),e=b.Ca(),f=b.Bb();this.S=c[0];this.U=c[1];this.T=f[1];this.j=d;this.A=b.A;this.pa=e[0];this.xa=e[1];this.fb=b.D;this.Cb=b.u;this.i=b.i;this.Db=b.G;this.Z=f[0]}else this.j=null};
l.ab=function(b){if(b){var c=b.a;c?(c=c.a,this.l={fillStyle:vg(c?c:Tl)}):this.l=null;var d=b.l;if(d){var c=d.a,e=d.f,f=d.b,g=d.g,h=d.c,d=d.j;this.u={lineCap:void 0!==e?e:"round",lineDash:f?f:Ul,lineJoin:void 0!==g?g:"round",lineWidth:void 0!==h?h:1,miterLimit:void 0!==d?d:10,strokeStyle:vg(c?c:Vl)}}else this.u=null;var c=b.f,e=b.g,f=b.j,g=b.i,h=b.c,d=b.b,k=b.B;b=b.u;this.ea={font:void 0!==c?c:"10px sans-serif",textAlign:void 0!==k?k:"center",textBaseline:void 0!==b?b:"middle"};this.f=void 0!==d?d:
"";this.Nd=void 0!==e?this.G*e:0;this.Ac=void 0!==f?this.G*f:0;this.ia=void 0!==g?g:0;this.B=this.G*(void 0!==h?h:1)}else this.f=""};var rm={Point:jm.prototype.Gb,LineString:jm.prototype.Wb,Polygon:jm.prototype.Ic,MultiPoint:jm.prototype.Fb,MultiLineString:jm.prototype.Gc,MultiPolygon:jm.prototype.Hc,GeometryCollection:jm.prototype.Xd,Circle:jm.prototype.Fc};function xm(b){lk.call(this,b);this.S=Dd()}y(xm,lk);
xm.prototype.u=function(b,c,d){ym(this,"precompose",d,b,void 0);var e=this.yd();if(e){var f=c.extent,g=void 0!==f;if(g){var h=b.pixelRatio,k=he(f),m=ge(f),n=fe(f),f=ee(f);kk(b.coordinateToPixelMatrix,k,k);kk(b.coordinateToPixelMatrix,m,m);kk(b.coordinateToPixelMatrix,n,n);kk(b.coordinateToPixelMatrix,f,f);d.save();d.beginPath();d.moveTo(k[0]*h,k[1]*h);d.lineTo(m[0]*h,m[1]*h);d.lineTo(n[0]*h,n[1]*h);d.lineTo(f[0]*h,f[1]*h);d.clip()}h=this.mf();k=d.globalAlpha;d.globalAlpha=c.opacity;0===b.viewState.rotation?
d.drawImage(e,0,0,+e.width,+e.height,Math.round(h[12]),Math.round(h[13]),Math.round(e.width*h[0]),Math.round(e.height*h[5])):(d.setTransform(h[0],h[1],h[4],h[5],h[12],h[13]),d.drawImage(e,0,0),d.setTransform(1,0,0,1,0,0));d.globalAlpha=k;g&&d.restore()}ym(this,"postcompose",d,b,void 0)};function ym(b,c,d,e,f){var g=b.a;ed(g,c)&&(b=void 0!==f?f:zm(b,e,0),b=new jm(d,e.pixelRatio,e.extent,b,e.viewState.rotation),g.o(new dk(c,g,b,e,d,null)),wm(b))}
function zm(b,c,d){var e=c.viewState,f=c.pixelRatio;return ik(b.S,f*c.size[0]/2,f*c.size[1]/2,f/e.resolution,-f/e.resolution,-e.rotation,-e.center[0]+d,-e.center[1])}function Am(b,c){var d=[0,0];kk(c,b,d);return d}
var Bm=function(){var b=null,c=null;return function(d){if(!b){b=Pi(1,1);c=b.createImageData(1,1);var e=c.data;e[0]=42;e[1]=84;e[2]=126;e[3]=255}var e=b.canvas,f=d[0]<=e.width&&d[1]<=e.height;f||(e.width=d[0],e.height=d[1],e=d[0]-1,d=d[1]-1,b.putImageData(c,e,d),d=b.getImageData(e,d,1,1),f=sb(c.data,d.data));return f}}();var Cm=["Polygon","LineString","Image","Text"];function Dm(b,c,d){this.va=b;this.Z=c;this.f=null;this.g=0;this.resolution=d;this.U=this.S=null;this.c=[];this.coordinates=[];this.ga=Dd();this.a=[];this.ea=[];this.eb=Dd()}y(Dm,ck);
function Em(b,c,d,e,f,g){var h=b.coordinates.length,k=b.kf(),m=[c[d],c[d+1]],n=[NaN,NaN],p=!0,q,r,t;for(q=d+f;q<e;q+=f)n[0]=c[q],n[1]=c[q+1],t=Yd(k,n),t!==r?(p&&(b.coordinates[h++]=m[0],b.coordinates[h++]=m[1]),b.coordinates[h++]=n[0],b.coordinates[h++]=n[1],p=!1):1===t?(b.coordinates[h++]=n[0],b.coordinates[h++]=n[1],p=!1):p=!0,m[0]=n[0],m[1]=n[1],r=t;q===d+f&&(b.coordinates[h++]=m[0],b.coordinates[h++]=m[1]);g&&(b.coordinates[h++]=c[d],b.coordinates[h++]=c[d+1]);return h}
function Fm(b,c){b.S=[0,c,0];b.c.push(b.S);b.U=[0,c,0];b.a.push(b.U)}
function Gm(b,c,d,e,f,g,h,k,m){var n;jk(e,b.ga)?n=b.ea:(n=cf(b.coordinates,0,b.coordinates.length,2,e,b.ea),Gd(b.ga,e));e=!Qb(g);var p=0,q=h.length,r=0,t;b=b.eb;for(var x,z,B,A;p<q;){var v=h[p],O,K,I,G;switch(v[0]){case 0:r=v[1];e&&g[w(r).toString()]||!r.W()?p=v[2]:void 0===m||pe(m,r.W().J())?++p:p=v[2];break;case 1:c.beginPath();++p;break;case 2:r=v[1];t=n[r];v=n[r+1];G=n[r+2]-t;r=n[r+3]-v;c.arc(t,v,Math.sqrt(G*G+r*r),0,2*Math.PI,!0);++p;break;case 3:c.closePath();++p;break;case 4:r=v[1];t=v[2];
O=v[3];I=v[4]*d;var la=v[5]*d,Ea=v[6];K=v[7];var L=v[8],za=v[9];B=v[11];A=v[12];var Ra=v[13],Ka=v[14];for(v[10]&&(B+=f);r<t;r+=2){v=n[r]-I;G=n[r+1]-la;Ra&&(v=v+.5|0,G=G+.5|0);if(1!=A||0!==B){var kb=v+I,cb=G+la;ik(b,kb,cb,A,A,B,-kb,-cb);c.setTransform(b[0],b[1],b[4],b[5],b[12],b[13])}kb=c.globalAlpha;1!=K&&(c.globalAlpha=kb*K);c.drawImage(O,L,za,Ka,Ea,v,G,Ka*d,Ea*d);1!=K&&(c.globalAlpha=kb);1==A&&0===B||c.setTransform(1,0,0,1,0,0)}++p;break;case 5:r=v[1];t=v[2];I=v[3];la=v[4]*d;Ea=v[5]*d;B=v[6];A=
v[7]*d;O=v[8];for(K=v[9];r<t;r+=2){v=n[r]+la;G=n[r+1]+Ea;if(1!=A||0!==B)ik(b,v,G,A,A,B,-v,-G),c.setTransform(b[0],b[1],b[4],b[5],b[12],b[13]);K&&c.strokeText(I,v,G);O&&c.fillText(I,v,G);1==A&&0===B||c.setTransform(1,0,0,1,0,0)}++p;break;case 6:if(void 0!==k&&(r=v[1],r=k(r)))return r;++p;break;case 7:c.fill();++p;break;case 8:r=v[1];t=v[2];v=n[r];G=n[r+1];B=v+.5|0;A=G+.5|0;if(B!==x||A!==z)c.moveTo(v,G),x=B,z=A;for(r+=2;r<t;r+=2)if(v=n[r],G=n[r+1],B=v+.5|0,A=G+.5|0,B!==x||A!==z)c.lineTo(v,G),x=B,z=
A;++p;break;case 9:c.fillStyle=v[1];++p;break;case 10:x=void 0!==v[7]?v[7]:!0;z=v[2];c.strokeStyle=v[1];c.lineWidth=x?z*d:z;c.lineCap=v[3];c.lineJoin=v[4];c.miterLimit=v[5];Yi&&c.setLineDash(v[6]);z=x=NaN;++p;break;case 11:c.font=v[1];c.textAlign=v[2];c.textBaseline=v[3];++p;break;case 12:c.stroke();++p;break;default:++p}}}
function Hm(b){var c=b.a;c.reverse();var d,e=c.length,f,g,h=-1;for(d=0;d<e;++d)if(f=c[d],g=f[0],6==g)h=d;else if(0==g){f[2]=d;f=b.a;for(g=d;h<g;){var k=f[h];f[h]=f[g];f[g]=k;++h;--g}h=-1}}function Im(b,c){b.S[2]=b.c.length;b.S=null;b.U[2]=b.a.length;b.U=null;var d=[6,c];b.c.push(d);b.a.push(d)}Dm.prototype.ve=wa;Dm.prototype.kf=function(){return this.Z};function Jm(b,c,d){Dm.call(this,b,c,d);this.l=this.T=null;this.oa=this.ia=this.G=this.D=this.C=this.A=this.u=this.B=this.i=this.j=this.b=void 0}
y(Jm,Dm);Jm.prototype.Gb=function(b,c){if(this.l){Fm(this,c);var d=b.ja(),e=b.ra(),f=this.coordinates.length,d=Em(this,d,0,d.length,e,!1);this.c.push([4,f,d,this.l,this.b,this.j,this.i,this.B,this.u,this.A,this.C,this.D,this.G,this.ia,this.oa]);this.a.push([4,f,d,this.T,this.b,this.j,this.i,this.B,this.u,this.A,this.C,this.D,this.G,this.ia,this.oa]);Im(this,c)}};
Jm.prototype.Fb=function(b,c){if(this.l){Fm(this,c);var d=b.ja(),e=b.ra(),f=this.coordinates.length,d=Em(this,d,0,d.length,e,!1);this.c.push([4,f,d,this.l,this.b,this.j,this.i,this.B,this.u,this.A,this.C,this.D,this.G,this.ia,this.oa]);this.a.push([4,f,d,this.T,this.b,this.j,this.i,this.B,this.u,this.A,this.C,this.D,this.G,this.ia,this.oa]);Im(this,c)}};Jm.prototype.ve=function(){Hm(this);this.j=this.b=void 0;this.l=this.T=null;this.oa=this.ia=this.D=this.C=this.A=this.u=this.B=this.G=this.i=void 0};
Jm.prototype.vb=function(b){var c=b.Xb(),d=b.Bb(),e=b.ze(1),f=b.fc(1),g=b.Ca();this.b=c[0];this.j=c[1];this.T=e;this.l=f;this.i=d[1];this.B=b.A;this.u=g[0];this.A=g[1];this.C=b.D;this.D=b.u;this.G=b.i;this.ia=b.G;this.oa=d[0]};function Km(b,c,d){Dm.call(this,b,c,d);this.b={hd:void 0,cd:void 0,dd:null,ed:void 0,fd:void 0,gd:void 0,rf:0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}y(Km,Dm);
function Lm(b,c,d,e,f){var g=b.coordinates.length;c=Em(b,c,d,e,f,!1);g=[8,g,c];b.c.push(g);b.a.push(g);return e}l=Km.prototype;l.kf=function(){this.f||(this.f=Td(this.Z),0<this.g&&Sd(this.f,this.resolution*(this.g+1)/2,this.f));return this.f};
function Mm(b){var c=b.b,d=c.strokeStyle,e=c.lineCap,f=c.lineDash,g=c.lineJoin,h=c.lineWidth,k=c.miterLimit;c.hd==d&&c.cd==e&&sb(c.dd,f)&&c.ed==g&&c.fd==h&&c.gd==k||(c.rf!=b.coordinates.length&&(b.c.push([12]),c.rf=b.coordinates.length),b.c.push([10,d,h,e,g,k,f],[1]),c.hd=d,c.cd=e,c.dd=f,c.ed=g,c.fd=h,c.gd=k)}
l.Wb=function(b,c){var d=this.b,e=d.lineWidth;void 0!==d.strokeStyle&&void 0!==e&&(Mm(this),Fm(this,c),this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash],[1]),d=b.ja(),e=b.ra(),Lm(this,d,0,d.length,e),this.a.push([12]),Im(this,c))};
l.Gc=function(b,c){var d=this.b,e=d.lineWidth;if(void 0!==d.strokeStyle&&void 0!==e){Mm(this);Fm(this,c);this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash],[1]);var d=b.Ab(),e=b.ja(),f=b.ra(),g=0,h,k;h=0;for(k=d.length;h<k;++h)g=Lm(this,e,g,d[h],f);this.a.push([12]);Im(this,c)}};l.ve=function(){this.b.rf!=this.coordinates.length&&this.c.push([12]);Hm(this);this.b=null};
l.$a=function(b,c){var d=c.a;this.b.strokeStyle=vg(d?d:Vl);d=c.f;this.b.lineCap=void 0!==d?d:"round";d=c.b;this.b.lineDash=d?d:Ul;d=c.g;this.b.lineJoin=void 0!==d?d:"round";d=c.c;this.b.lineWidth=void 0!==d?d:1;d=c.j;this.b.miterLimit=void 0!==d?d:10;this.b.lineWidth>this.g&&(this.g=this.b.lineWidth,this.f=null)};
function Nm(b,c,d){Dm.call(this,b,c,d);this.b={pg:void 0,hd:void 0,cd:void 0,dd:null,ed:void 0,fd:void 0,gd:void 0,fillStyle:void 0,strokeStyle:void 0,lineCap:void 0,lineDash:null,lineJoin:void 0,lineWidth:void 0,miterLimit:void 0}}y(Nm,Dm);
function Om(b,c,d,e,f){var g=b.b,h=[1];b.c.push(h);b.a.push(h);var k,h=0;for(k=e.length;h<k;++h){var m=e[h],n=b.coordinates.length;d=Em(b,c,d,m,f,!0);d=[8,n,d];n=[3];b.c.push(d,n);b.a.push(d,n);d=m}c=[7];b.a.push(c);void 0!==g.fillStyle&&b.c.push(c);void 0!==g.strokeStyle&&(g=[12],b.c.push(g),b.a.push(g));return d}l=Nm.prototype;
l.Fc=function(b,c){var d=this.b,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e){Pm(this);Fm(this,c);this.a.push([9,vg(Tl)]);void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var f=b.ja(),g=b.ra(),e=this.coordinates.length;Em(this,f,0,f.length,g,!1);f=[1];e=[2,e];this.c.push(f,e);this.a.push(f,e);e=[7];this.a.push(e);void 0!==d.fillStyle&&this.c.push(e);void 0!==d.strokeStyle&&(d=[12],this.c.push(d),this.a.push(d));Im(this,c)}};
l.Ic=function(b,c){var d=this.b,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e){Pm(this);Fm(this,c);this.a.push([9,vg(Tl)]);void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var d=b.Ab(),e=b.ac(),f=b.ra();Om(this,e,0,d,f);Im(this,c)}};
l.Hc=function(b,c){var d=this.b,e=d.strokeStyle;if(void 0!==d.fillStyle||void 0!==e){Pm(this);Fm(this,c);this.a.push([9,vg(Tl)]);void 0!==d.strokeStyle&&this.a.push([10,d.strokeStyle,d.lineWidth,d.lineCap,d.lineJoin,d.miterLimit,d.lineDash]);var d=b.g,e=um(b),f=b.ra(),g=0,h,k;h=0;for(k=d.length;h<k;++h)g=Om(this,e,g,d[h],f);Im(this,c)}};l.ve=function(){Hm(this);this.b=null;var b=this.va;if(0!==b){var c=this.coordinates,d,e;d=0;for(e=c.length;d<e;++d)c[d]=b*Math.round(c[d]/b)}};
l.kf=function(){this.f||(this.f=Td(this.Z),0<this.g&&Sd(this.f,this.resolution*(this.g+1)/2,this.f));return this.f};
l.$a=function(b,c){var d=this.b;if(b){var e=b.a;d.fillStyle=vg(e?e:Tl)}else d.fillStyle=void 0;c?(e=c.a,d.strokeStyle=vg(e?e:Vl),e=c.f,d.lineCap=void 0!==e?e:"round",e=c.b,d.lineDash=e?e.slice():Ul,e=c.g,d.lineJoin=void 0!==e?e:"round",e=c.c,d.lineWidth=void 0!==e?e:1,e=c.j,d.miterLimit=void 0!==e?e:10,d.lineWidth>this.g&&(this.g=d.lineWidth,this.f=null)):(d.strokeStyle=void 0,d.lineCap=void 0,d.lineDash=null,d.lineJoin=void 0,d.lineWidth=void 0,d.miterLimit=void 0)};
function Pm(b){var c=b.b,d=c.fillStyle,e=c.strokeStyle,f=c.lineCap,g=c.lineDash,h=c.lineJoin,k=c.lineWidth,m=c.miterLimit;void 0!==d&&c.pg!=d&&(b.c.push([9,d]),c.pg=c.fillStyle);void 0===e||c.hd==e&&c.cd==f&&c.dd==g&&c.ed==h&&c.fd==k&&c.gd==m||(b.c.push([10,e,k,f,h,m,g]),c.hd=e,c.cd=f,c.dd=g,c.ed=h,c.fd=k,c.gd=m)}function Qm(b,c,d){Dm.call(this,b,c,d);this.ia=this.G=this.D=null;this.l="";this.C=this.A=this.u=this.B=0;this.i=this.j=this.b=null}y(Qm,Dm);
Qm.prototype.Hb=function(b,c,d,e,f,g){if(""!==this.l&&this.i&&(this.b||this.j)){if(this.b){f=this.b;var h=this.D;if(!h||h.fillStyle!=f.fillStyle){var k=[9,f.fillStyle];this.c.push(k);this.a.push(k);h?h.fillStyle=f.fillStyle:this.D={fillStyle:f.fillStyle}}}this.j&&(f=this.j,h=this.G,h&&h.lineCap==f.lineCap&&h.lineDash==f.lineDash&&h.lineJoin==f.lineJoin&&h.lineWidth==f.lineWidth&&h.miterLimit==f.miterLimit&&h.strokeStyle==f.strokeStyle||(k=[10,f.strokeStyle,f.lineWidth,f.lineCap,f.lineJoin,f.miterLimit,
f.lineDash,!1],this.c.push(k),this.a.push(k),h?(h.lineCap=f.lineCap,h.lineDash=f.lineDash,h.lineJoin=f.lineJoin,h.lineWidth=f.lineWidth,h.miterLimit=f.miterLimit,h.strokeStyle=f.strokeStyle):this.G={lineCap:f.lineCap,lineDash:f.lineDash,lineJoin:f.lineJoin,lineWidth:f.lineWidth,miterLimit:f.miterLimit,strokeStyle:f.strokeStyle}));f=this.i;h=this.ia;h&&h.font==f.font&&h.textAlign==f.textAlign&&h.textBaseline==f.textBaseline||(k=[11,f.font,f.textAlign,f.textBaseline],this.c.push(k),this.a.push(k),h?
(h.font=f.font,h.textAlign=f.textAlign,h.textBaseline=f.textBaseline):this.ia={font:f.font,textAlign:f.textAlign,textBaseline:f.textBaseline});Fm(this,g);f=this.coordinates.length;b=Em(this,b,c,d,e,!1);b=[5,f,b,this.l,this.B,this.u,this.A,this.C,!!this.b,!!this.j];this.c.push(b);this.a.push(b);Im(this,g)}};
Qm.prototype.ab=function(b){if(b){var c=b.a;c?(c=c.a,c=vg(c?c:Tl),this.b?this.b.fillStyle=c:this.b={fillStyle:c}):this.b=null;var d=b.l;if(d){var c=d.a,e=d.f,f=d.b,g=d.g,h=d.c,d=d.j,e=void 0!==e?e:"round",f=f?f.slice():Ul,g=void 0!==g?g:"round",h=void 0!==h?h:1,d=void 0!==d?d:10,c=vg(c?c:Vl);if(this.j){var k=this.j;k.lineCap=e;k.lineDash=f;k.lineJoin=g;k.lineWidth=h;k.miterLimit=d;k.strokeStyle=c}else this.j={lineCap:e,lineDash:f,lineJoin:g,lineWidth:h,miterLimit:d,strokeStyle:c}}else this.j=null;
var m=b.f,c=b.g,e=b.j,f=b.i,h=b.c,d=b.b,g=b.B,k=b.u;b=void 0!==m?m:"10px sans-serif";g=void 0!==g?g:"center";k=void 0!==k?k:"middle";this.i?(m=this.i,m.font=b,m.textAlign=g,m.textBaseline=k):this.i={font:b,textAlign:g,textBaseline:k};this.l=void 0!==d?d:"";this.B=void 0!==c?c:0;this.u=void 0!==e?e:0;this.A=void 0!==f?f:0;this.C=void 0!==h?h:1}else this.l=""};function Rm(b,c,d,e){this.u=b;this.g=c;this.B=d;this.j=e;this.c={};this.i=Pi(1,1);this.l=Dd()}
function Sm(b){for(var c in b.c){var d=b.c[c],e;for(e in d)d[e].ve()}}Rm.prototype.f=function(b,c,d,e,f){var g=this.l;ik(g,.5,.5,1/c,-1/c,-d,-b[0],-b[1]);var h=this.i;h.clearRect(0,0,1,1);var k;void 0!==this.j&&(k=Od(),Pd(k,b),Sd(k,c*this.j,k));return Tm(this,h,g,d,e,function(b){if(0<h.getImageData(0,0,1,1).data[3]){if(b=f(b))return b;h.clearRect(0,0,1,1)}},k)};
Rm.prototype.a=function(b,c){var d=void 0!==b?b.toString():"0",e=this.c[d];void 0===e&&(e={},this.c[d]=e);d=e[c];void 0===d&&(d=new Um[c](this.u,this.g,this.B),e[c]=d);return d};Rm.prototype.Ka=function(){return Qb(this.c)};
Rm.prototype.b=function(b,c,d,e,f){var g=Object.keys(this.c).map(Number);ob(g);var h=this.g,k=h[0],m=h[1],n=h[2],h=h[3],k=[k,m,k,h,n,h,n,m];cf(k,0,8,2,d,k);b.save();b.beginPath();b.moveTo(k[0],k[1]);b.lineTo(k[2],k[3]);b.lineTo(k[4],k[5]);b.lineTo(k[6],k[7]);b.closePath();b.clip();for(var p,q,k=0,m=g.length;k<m;++k)for(p=this.c[g[k].toString()],n=0,h=Cm.length;n<h;++n)q=p[Cm[n]],void 0!==q&&Gm(q,b,c,d,e,f,q.c,void 0);b.restore()};
function Tm(b,c,d,e,f,g,h){var k=Object.keys(b.c).map(Number);ob(k,function(b,c){return c-b});var m,n,p,q,r;m=0;for(n=k.length;m<n;++m)for(q=b.c[k[m].toString()],p=Cm.length-1;0<=p;--p)if(r=q[Cm[p]],void 0!==r&&(r=Gm(r,c,1,d,e,f,r.a,g,h)))return r}var Um={Image:Jm,LineString:Km,Polygon:Nm,Text:Qm};function Vm(b,c,d,e){this.b=b;this.a=c;this.g=d;this.f=e}l=Vm.prototype;l.get=function(b){return this.f[b]};l.Ab=function(){return this.g};l.J=function(){this.c||(this.c="Point"===this.b?Zd(this.a):$d(this.a,0,this.a.length,2));return this.c};l.ja=Vm.prototype.ac=function(){return this.a};l.W=function(){return this};l.ym=function(){return this.f};l.sd=Vm.prototype.W;l.ra=se(2);l.Qb=wa;l.V=function(){return this.b};function Wm(b,c){return w(b)-w(c)}function Xm(b,c){var d=.5*b/c;return d*d}function Ym(b,c,d,e,f,g){var h=!1,k,m;if(k=d.b)m=k.Bd(),2==m||3==m?k.Wf(f,g):(0==m&&k.load(),k.sf(f,g),h=!0);if(f=(0,d.g)(c))e=f.sd(e),(0,Zm[e.V()])(b,e,d,c);return h}
var Zm={Point:function(b,c,d,e){var f=d.b;if(f){if(2!=f.Bd())return;var g=b.a(d.a,"Image");g.vb(f);g.Gb(c,e)}if(f=d.c)b=b.a(d.a,"Text"),b.ab(f),b.Hb(c.ja(),0,2,2,c,e)},LineString:function(b,c,d,e){var f=d.f;if(f){var g=b.a(d.a,"LineString");g.$a(null,f);g.Wb(c,e)}if(f=d.c)b=b.a(d.a,"Text"),b.ab(f),b.Hb(sm(c),0,2,2,c,e)},Polygon:function(b,c,d,e){var f=d.j,g=d.f;if(f||g){var h=b.a(d.a,"Polygon");h.$a(f,g);h.Ic(c,e)}if(f=d.c)b=b.a(d.a,"Text"),b.ab(f),b.Hb(Jf(c),0,2,2,c,e)},MultiPoint:function(b,c,d,
e){var f=d.b;if(f){if(2!=f.Bd())return;var g=b.a(d.a,"Image");g.vb(f);g.Fb(c,e)}if(f=d.c)b=b.a(d.a,"Text"),b.ab(f),d=c.ja(),b.Hb(d,0,d.length,c.ra(),c,e)},MultiLineString:function(b,c,d,e){var f=d.f;if(f){var g=b.a(d.a,"LineString");g.$a(null,f);g.Gc(c,e)}if(f=d.c)b=b.a(d.a,"Text"),b.ab(f),d=tm(c),b.Hb(d,0,d.length,2,c,e)},MultiPolygon:function(b,c,d,e){var f=d.j,g=d.f;if(g||f){var h=b.a(d.a,"Polygon");h.$a(f,g);h.Hc(c,e)}if(f=d.c)b=b.a(d.a,"Text"),b.ab(f),d=vm(c),b.Hb(d,0,d.length,2,c,e)},GeometryCollection:function(b,
c,d,e){c=c.f;var f,g;f=0;for(g=c.length;f<g;++f)(0,Zm[c[f].V()])(b,c[f],d,e)},Circle:function(b,c,d,e){var f=d.j,g=d.f;if(f||g){var h=b.a(d.a,"Polygon");h.$a(f,g);h.Fc(c,e)}if(f=d.c)b=b.a(d.a,"Text"),b.ab(f),b.Hb(c.vd(),0,2,2,c,e)}};function $m(b,c,d,e,f,g){this.g=void 0!==g?g:null;gk.call(this,b,c,d,void 0!==g?0:2,e);this.f=f;this.c=null}y($m,gk);$m.prototype.getError=function(){return this.c};$m.prototype.i=function(b){b?(this.c=b,this.state=3):this.state=2;hk(this)};$m.prototype.load=function(){0==this.state&&(this.state=1,hk(this),this.g(ra(this.i,this)))};$m.prototype.a=function(){return this.f};var an=!((Hb("Chrome")||Hb("CriOS"))&&!Hb("Opera")&&!Hb("OPR")&&!Hb("Edge"))||Hb("iPhone")&&!Hb("iPod")&&!Hb("iPad")||Hb("iPad")||Hb("iPod");function bn(b,c,d,e){var f=$e(d,c,b);d=c.getPointResolution(e,d);c=c.Jc();void 0!==c&&(d*=c);c=b.Jc();void 0!==c&&(d/=c);b=b.getPointResolution(d,f)/d;isFinite(b)&&!isNaN(b)&&0<b&&(d/=b);return d}function cn(b,c,d,e){b=d-b;c=e-c;var f=Math.sqrt(b*b+c*c);return[Math.round(d+b/f),Math.round(e+c/f)]}
function dn(b,c,d,e,f,g,h,k,m,n){var p=Pi(Math.round(d*b),Math.round(d*c));if(0===m.length)return p.canvas;p.scale(d,d);var q=Od();m.forEach(function(b){ce(q,b.extent)});var r=Pi(Math.round(d*ke(q)/e),Math.round(d*le(q)/e));r.scale(d/e,d/e);r.translate(-q[0],q[3]);m.forEach(function(b){r.drawImage(b.image,b.extent[0],-b.extent[3],ke(b.extent),le(b.extent))});var t=he(h);k.f.forEach(function(b){var c=b.source,f=b.target,h=c[1][0],k=c[1][1],m=c[2][0],n=c[2][1];b=(f[0][0]-t[0])/g;var I=-(f[0][1]-t[1])/
g,G=(f[1][0]-t[0])/g,la=-(f[1][1]-t[1])/g,Ea=(f[2][0]-t[0])/g,L=-(f[2][1]-t[1])/g,f=c[0][0],c=c[0][1],h=h-f,k=k-c,m=m-f,n=n-c;a:{h=[[h,k,0,0,G-b],[m,n,0,0,Ea-b],[0,0,h,k,la-I],[0,0,m,n,L-I]];k=h.length;for(m=0;m<k;m++){for(var n=m,za=Math.abs(h[m][m]),Ra=m+1;Ra<k;Ra++){var Ka=Math.abs(h[Ra][m]);Ka>za&&(za=Ka,n=Ra)}if(0===za){h=null;break a}za=h[n];h[n]=h[m];h[m]=za;for(n=m+1;n<k;n++)for(za=-h[n][m]/h[m][m],Ra=m;Ra<k+1;Ra++)h[n][Ra]=m==Ra?0:h[n][Ra]+za*h[m][Ra]}m=Array(k);for(n=k-1;0<=n;n--)for(m[n]=
h[n][k]/h[n][n],za=n-1;0<=za;za--)h[za][k]-=h[za][n]*m[n];h=m}h&&(p.save(),p.beginPath(),an?(m=(b+G+Ea)/3,n=(I+la+L)/3,k=cn(m,n,b,I),G=cn(m,n,G,la),Ea=cn(m,n,Ea,L),p.moveTo(k[0],k[1]),p.lineTo(G[0],G[1]),p.lineTo(Ea[0],Ea[1])):(p.moveTo(b,I),p.lineTo(G,la),p.lineTo(Ea,L)),p.closePath(),p.clip(),p.transform(h[0],h[2],h[1],h[3],b,I),p.translate(q[0]-f,q[3]-c),p.scale(e/d,-e/d),p.drawImage(r.canvas,0,0),p.restore())});n&&(p.save(),p.strokeStyle="black",p.lineWidth=1,k.f.forEach(function(b){var c=b.target;
b=(c[0][0]-t[0])/g;var d=-(c[0][1]-t[1])/g,e=(c[1][0]-t[0])/g,f=-(c[1][1]-t[1])/g,h=(c[2][0]-t[0])/g,c=-(c[2][1]-t[1])/g;p.beginPath();p.moveTo(b,d);p.lineTo(e,f);p.lineTo(h,c);p.closePath();p.stroke()}),p.restore());return p.canvas};function en(b,c,d,e,f){this.b=b;this.g=c;var g={},h=Ye(this.g,this.b);this.c=function(b){var c=b[0]+"/"+b[1];g[c]||(g[c]=h(b));return g[c]};this.j=e;this.u=f*f;this.f=[];this.l=!1;this.B=this.b.b&&!!e&&!!this.b.J()&&ke(e)==ke(this.b.J());this.a=this.b.J()?ke(this.b.J()):null;this.i=this.g.J()?ke(this.g.J()):null;b=he(d);c=ge(d);e=fe(d);d=ee(d);f=this.c(b);var k=this.c(c),m=this.c(e),n=this.c(d);fn(this,b,c,e,d,f,k,m,n,10);if(this.l){var p=Infinity;this.f.forEach(function(b){p=Math.min(p,b.source[0][0],
b.source[1][0],b.source[2][0])});this.f.forEach(function(b){if(Math.max(b.source[0][0],b.source[1][0],b.source[2][0])-p>this.a/2){var c=[[b.source[0][0],b.source[0][1]],[b.source[1][0],b.source[1][1]],[b.source[2][0],b.source[2][1]]];c[0][0]-p>this.a/2&&(c[0][0]-=this.a);c[1][0]-p>this.a/2&&(c[1][0]-=this.a);c[2][0]-p>this.a/2&&(c[2][0]-=this.a);Math.max(c[0][0],c[1][0],c[2][0])-Math.min(c[0][0],c[1][0],c[2][0])<this.a/2&&(b.source=c)}},this)}g={}}
function fn(b,c,d,e,f,g,h,k,m,n){var p=Nd([g,h,k,m]),q=b.a?ke(p)/b.a:null,r=b.b.b&&.5<q&&1>q,t=!1;if(0<n){if(b.g.f&&b.i)var x=Nd([c,d,e,f]),t=t|.25<ke(x)/b.i;!r&&b.b.f&&q&&(t|=.25<q)}if(t||!b.j||pe(p,b.j)){if(!(t||isFinite(g[0])&&isFinite(g[1])&&isFinite(h[0])&&isFinite(h[1])&&isFinite(k[0])&&isFinite(k[1])&&isFinite(m[0])&&isFinite(m[1])))if(0<n)t=!0;else return;if(0<n&&(t||(q=b.c([(c[0]+e[0])/2,(c[1]+e[1])/2]),p=r?(pd(g[0],b.a)+pd(k[0],b.a))/2-pd(q[0],b.a):(g[0]+k[0])/2-q[0],q=(g[1]+k[1])/2-q[1],
t=p*p+q*q>b.u),t)){Math.abs(c[0]-e[0])<=Math.abs(c[1]-e[1])?(r=[(d[0]+e[0])/2,(d[1]+e[1])/2],p=b.c(r),q=[(f[0]+c[0])/2,(f[1]+c[1])/2],t=b.c(q),fn(b,c,d,r,q,g,h,p,t,n-1),fn(b,q,r,e,f,t,p,k,m,n-1)):(r=[(c[0]+d[0])/2,(c[1]+d[1])/2],p=b.c(r),q=[(e[0]+f[0])/2,(e[1]+f[1])/2],t=b.c(q),fn(b,c,r,q,f,g,p,t,m,n-1),fn(b,r,d,e,q,p,h,k,t,n-1));return}if(r){if(!b.B)return;b.l=!0}b.f.push({source:[g,k,m],target:[c,e,f]});b.f.push({source:[g,h,k],target:[c,d,e]})}}
function gn(b){var c=Od();b.f.forEach(function(b){b=b.source;Pd(c,b[0]);Pd(c,b[1]);Pd(c,b[2])});return c};function hn(b,c,d,e,f,g){this.C=c;this.A=b.J();var h=c.J(),k=h?oe(d,h):d,h=bn(b,c,me(k),e);this.B=new en(b,c,k,this.A,.5*h);this.i=e;this.g=d;b=gn(this.B);this.u=(this.c=g(b,h,f))?this.c.b:1;this.f=this.l=null;f=2;g=[];this.c&&(f=0,g=this.c.j);gk.call(this,d,e,this.u,f,g)}y(hn,gk);hn.prototype.X=function(){1==this.state&&(Zc(this.f),this.f=null);hn.da.X.call(this)};hn.prototype.a=function(){return this.l};
function jn(b){var c=b.c.state;2==c&&(b.l=dn(ke(b.g)/b.i,le(b.g)/b.i,b.u,b.c.$(),0,b.i,b.g,b.B,[{extent:b.c.J(),image:b.c.a()}]));b.state=c;hk(b)}hn.prototype.load=function(){if(0==this.state){this.state=1;hk(this);var b=this.c.state;2==b||3==b?jn(this):(this.f=this.c.Qa("change",function(){var b=this.c.state;if(2==b||3==b)Zc(this.f),this.f=null,jn(this)},!1,this),this.c.load())}};function kn(b){yh.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,projection:b.projection,state:b.state});this.G=void 0!==b.resolutions?b.resolutions:null;this.a=null;this.va=0}y(kn,yh);function ln(b,c){if(b.G){var d=wb(b.G,c,0);c=b.G[d]}return c}
kn.prototype.C=function(b,c,d,e){var f=this.f;if(f&&e&&!Xe(f,e)){if(this.a){if(this.va==this.c&&Xe(this.a.C,e)&&this.a.$()==c&&this.a.b==d&&be(this.a.J(),b))return this.a;this.a.Ec();this.a=null}this.a=new hn(f,e,b,c,d,ra(function(b,c,d){return this.pd(b,c,d,f)},this));this.va=this.c;return this.a}f&&(e=f);return this.pd(b,c,d,e)};kn.prototype.D=function(b){b=b.target;switch(b.state){case 1:this.o(new mn(nn,b));break;case 2:this.o(new mn(on,b));break;case 3:this.o(new mn(pn,b))}};
function qn(b,c){b.a().src=c}function mn(b,c){vc.call(this,b);this.image=c}y(mn,vc);var nn="imageloadstart",on="imageloadend",pn="imageloaderror";function rn(b){kn.call(this,{attributions:b.attributions,logo:b.logo,projection:b.projection,resolutions:b.resolutions,state:void 0!==b.state?b.state:void 0});this.ga=b.canvasFunction;this.Z=null;this.ea=0;this.pa=void 0!==b.ratio?b.ratio:1.5}y(rn,kn);rn.prototype.pd=function(b,c,d,e){c=ln(this,c);var f=this.Z;if(f&&this.ea==this.c&&f.$()==c&&f.b==d&&Xd(f.J(),b))return f;b=b.slice();qe(b,this.pa);(e=this.ga(b,c,d,[ke(b)/c*d,le(b)/c*d],e))&&(f=new $m(b,c,d,this.j,e));this.Z=f;this.ea=this.c;return f};function sn(b){id.call(this);this.wa=void 0;this.a="geometry";this.f=null;this.g=void 0;this.b=null;C(this,kd(this.a),this.ge,!1,this);void 0!==b&&(b instanceof bf||!b?this.La(b):this.I(b))}y(sn,id);l=sn.prototype;l.clone=function(){var b=new sn(this.P());b.vc(this.a);var c=this.W();c&&b.La(c.clone());(c=this.f)&&b.vf(c);return b};l.W=function(){return this.get(this.a)};l.Na=function(){return this.wa};l.Mj=function(){return this.a};l.vl=function(){return this.f};l.Qb=function(){return this.g};
l.wl=function(){this.s()};l.ge=function(){this.b&&(Zc(this.b),this.b=null);var b=this.W();b&&(this.b=C(b,"change",this.wl,!1,this));this.s()};l.La=function(b){this.set(this.a,b)};l.vf=function(b){this.g=(this.f=b)?tn(b):void 0;this.s()};l.ic=function(b){this.wa=b;this.s()};l.vc=function(b){Yc(this,kd(this.a),this.ge,!1,this);this.a=b;C(this,kd(this.a),this.ge,!1,this);this.ge()};function tn(b){if(!ka(b)){var c;c=ga(b)?b:[b];b=function(){return c}}return b};function un(b){b.prototype.then=b.prototype.then;b.prototype.$goog_Thenable=!0}function vn(b){if(!b)return!1;try{return!!b.$goog_Thenable}catch(c){return!1}};function wn(b,c,d){this.f=d;this.b=b;this.g=c;this.c=0;this.a=null}wn.prototype.get=function(){var b;0<this.c?(this.c--,b=this.a,this.a=b.next,b.next=null):b=this.b();return b};function xn(b,c){b.g(c);b.c<b.f&&(b.c++,c.next=b.a,b.a=c)};function yn(){this.c=this.a=null}var An=new wn(function(){return new zn},function(b){b.reset()},100);yn.prototype.add=function(b,c){var d=An.get();d.set(b,c);this.c?this.c.next=d:this.a=d;this.c=d};yn.prototype.remove=function(){var b=null;this.a&&(b=this.a,this.a=this.a.next,this.a||(this.c=null),b.next=null);return b};function zn(){this.next=this.c=this.a=null}zn.prototype.set=function(b,c){this.a=b;this.c=c;this.next=null};zn.prototype.reset=function(){this.next=this.c=this.a=null};function Bn(b,c){Cn||Dn();En||(Cn(),En=!0);Fn.add(b,c)}var Cn;function Dn(){if(ba.Promise&&ba.Promise.resolve){var b=ba.Promise.resolve(void 0);Cn=function(){b.then(Gn)}}else Cn=function(){ni(Gn)}}var En=!1,Fn=new yn;function Gn(){for(var b=null;b=Fn.remove();){try{b.a.call(b.c)}catch(c){mi(c)}xn(An,b)}En=!1};function Hn(b,c){this.a=In;this.i=void 0;this.f=this.c=this.b=null;this.g=this.j=!1;if(b!=da)try{var d=this;b.call(c,function(b){Jn(d,Kn,b)},function(b){Jn(d,Ln,b)})}catch(e){Jn(this,Ln,e)}}var In=0,Kn=2,Ln=3;function Mn(){this.next=this.b=this.c=this.f=this.a=null;this.g=!1}Mn.prototype.reset=function(){this.b=this.c=this.f=this.a=null;this.g=!1};var Nn=new wn(function(){return new Mn},function(b){b.reset()},100);function On(b,c,d){var e=Nn.get();e.f=b;e.c=c;e.b=d;return e}
Hn.prototype.then=function(b,c,d){return Pn(this,ka(b)?b:null,ka(c)?c:null,d)};un(Hn);Hn.prototype.cancel=function(b){this.a==In&&Bn(function(){var c=new Qn(b);Rn(this,c)},this)};function Rn(b,c){if(b.a==In)if(b.b){var d=b.b;if(d.c){for(var e=0,f=null,g=null,h=d.c;h&&(h.g||(e++,h.a==b&&(f=h),!(f&&1<e)));h=h.next)f||(g=h);f&&(d.a==In&&1==e?Rn(d,c):(g?(e=g,e.next==d.f&&(d.f=e),e.next=e.next.next):Sn(d),Tn(d,f,Ln,c)))}b.b=null}else Jn(b,Ln,c)}
function Un(b,c){b.c||b.a!=Kn&&b.a!=Ln||Vn(b);b.f?b.f.next=c:b.c=c;b.f=c}function Pn(b,c,d,e){var f=On(null,null,null);f.a=new Hn(function(b,h){f.f=c?function(d){try{var f=c.call(e,d);b(f)}catch(n){h(n)}}:b;f.c=d?function(c){try{var f=d.call(e,c);!ca(f)&&c instanceof Qn?h(c):b(f)}catch(n){h(n)}}:h});f.a.b=b;Un(b,f);return f.a}Hn.prototype.B=function(b){this.a=In;Jn(this,Kn,b)};Hn.prototype.u=function(b){this.a=In;Jn(this,Ln,b)};
function Jn(b,c,d){if(b.a==In){b==d&&(c=Ln,d=new TypeError("Promise cannot resolve to itself"));b.a=1;var e;a:{var f=d,g=b.B,h=b.u;if(f instanceof Hn)Un(f,On(g||da,h||null,b)),e=!0;else if(vn(f))f.then(g,h,b),e=!0;else{if(ma(f))try{var k=f.then;if(ka(k)){Wn(f,k,g,h,b);e=!0;break a}}catch(m){h.call(b,m);e=!0;break a}e=!1}}e||(b.i=d,b.a=c,b.b=null,Vn(b),c!=Ln||d instanceof Qn||Xn(b,d))}}
function Wn(b,c,d,e,f){function g(b){k||(k=!0,e.call(f,b))}function h(b){k||(k=!0,d.call(f,b))}var k=!1;try{c.call(b,h,g)}catch(m){g(m)}}function Vn(b){b.j||(b.j=!0,Bn(b.l,b))}function Sn(b){var c=null;b.c&&(c=b.c,b.c=c.next,c.next=null);b.c||(b.f=null);return c}Hn.prototype.l=function(){for(var b=null;b=Sn(this);)Tn(this,b,this.a,this.i);this.j=!1};
function Tn(b,c,d,e){if(d==Ln&&c.c&&!c.g)for(;b&&b.g;b=b.b)b.g=!1;if(c.a)c.a.b=null,Yn(c,d,e);else try{c.g?c.f.call(c.b):Yn(c,d,e)}catch(f){Zn.call(null,f)}xn(Nn,c)}function Yn(b,c,d){c==Kn?b.f.call(b.b,d):b.c&&b.c.call(b.b,d)}function Xn(b,c){b.g=!0;Bn(function(){b.g&&Zn.call(null,c)})}var Zn=mi;function Qn(b){xa.call(this,b)}y(Qn,xa);Qn.prototype.name="cancel";function $n(b,c,d){if(ka(b))d&&(b=ra(b,d));else if(b&&"function"==typeof b.handleEvent)b=ra(b.handleEvent,b);else throw Error("Invalid listener argument");return 2147483647<c?-1:ba.setTimeout(b,c||0)};var ao=ba.JSON.parse,bo=ba.JSON.stringify;function co(){}co.prototype.a=null;function eo(b){var c;(c=b.a)||(c={},fo(b)&&(c[0]=!0,c[1]=!0),c=b.a=c);return c};var go;function ho(){}y(ho,co);function io(b){return(b=fo(b))?new ActiveXObject(b):new XMLHttpRequest}function fo(b){if(!b.c&&"undefined"==typeof XMLHttpRequest&&"undefined"!=typeof ActiveXObject){for(var c=["MSXML2.XMLHTTP.6.0","MSXML2.XMLHTTP.3.0","MSXML2.XMLHTTP","Microsoft.XMLHTTP"],d=0;d<c.length;d++){var e=c[d];try{return new ActiveXObject(e),b.c=e}catch(f){}}throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");}return b.c}go=new ho;var jo=/^(?:([^:/?#.]+):)?(?:\/\/(?:([^/?#]*)@)?([^/#?]*?)(?::([0-9]+))?(?=[/#?]|$))?([^?#]+)?(?:\?([^#]*))?(?:#(.*))?$/;function ko(b,c){if(b)for(var d=b.split("&"),e=0;e<d.length;e++){var f=d[e].indexOf("="),g=null,h=null;0<=f?(g=d[e].substring(0,f),h=d[e].substring(f+1)):g=d[e];c(g,h?decodeURIComponent(h.replace(/\+/g," ")):"")}}
function lo(b){if(b[1]){var c=b[0],d=c.indexOf("#");0<=d&&(b.push(c.substr(d)),b[0]=c=c.substr(0,d));d=c.indexOf("?");0>d?b[1]="?":d==c.length-1&&(b[1]=void 0)}return b.join("")}function mo(b,c,d){if(ga(c))for(var e=0;e<c.length;e++)mo(b,String(c[e]),d);else null!=c&&d.push("&",b,""===c?"":"=",encodeURIComponent(String(c)))}function no(b,c){for(var d in c)mo(d,c[d],b);return b};function oo(b){cd.call(this);this.S=new ri;this.B=b||null;this.a=!1;this.l=this.ha=null;this.g=this.U=this.C="";this.c=this.A=this.f=this.u=!1;this.i=0;this.b=null;this.j=po;this.D=this.Z=!1}y(oo,cd);var po="",qo=/^https?$/i,ro=["POST","PUT"];
function so(b,c){if(b.ha)throw Error("[goog.net.XhrIo] Object is active with another request="+b.C+"; newUri="+c);b.C=c;b.g="";b.U="GET";b.u=!1;b.a=!0;b.ha=b.B?io(b.B):io(go);b.l=b.B?eo(b.B):eo(go);b.ha.onreadystatechange=ra(b.G,b);try{b.A=!0,b.ha.open("GET",String(c),!0),b.A=!1}catch(g){to(b,g);return}var d=b.S.clone(),e=fb(d.O(),uo),f=ba.FormData&&!1;!(0<=$a(ro,"GET"))||e||f||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");d.forEach(function(b,c){this.ha.setRequestHeader(c,
b)},b);b.j&&(b.ha.responseType=b.j);"withCredentials"in b.ha&&(b.ha.withCredentials=b.Z);try{vo(b),0<b.i&&(b.D=wo(b.ha),b.D?(b.ha.timeout=b.i,b.ha.ontimeout=ra(b.yc,b)):b.b=$n(b.yc,b.i,b)),b.f=!0,b.ha.send(""),b.f=!1}catch(g){to(b,g)}}function wo(b){return Zb&&jc(9)&&ja(b.timeout)&&ca(b.ontimeout)}function uo(b){return"content-type"==b.toLowerCase()}
oo.prototype.yc=function(){"undefined"!=typeof aa&&this.ha&&(this.g="Timed out after "+this.i+"ms, aborting",this.o("timeout"),this.ha&&this.a&&(this.a=!1,this.c=!0,this.ha.abort(),this.c=!1,this.o("complete"),this.o("abort"),xo(this)))};function to(b,c){b.a=!1;b.ha&&(b.c=!0,b.ha.abort(),b.c=!1);b.g=c;yo(b);xo(b)}function yo(b){b.u||(b.u=!0,b.o("complete"),b.o("error"))}oo.prototype.X=function(){this.ha&&(this.a&&(this.a=!1,this.c=!0,this.ha.abort(),this.c=!1),xo(this,!0));oo.da.X.call(this)};
oo.prototype.G=function(){this.ia||(this.A||this.f||this.c?zo(this):this.T())};oo.prototype.T=function(){zo(this)};function zo(b){if(b.a&&"undefined"!=typeof aa&&(!b.l[1]||4!=Ao(b)||2!=Bo(b)))if(b.f&&4==Ao(b))$n(b.G,0,b);else if(b.o("readystatechange"),4==Ao(b)){b.a=!1;try{if(Co(b))b.o("complete"),b.o("success");else{var c;try{c=2<Ao(b)?b.ha.statusText:""}catch(d){c=""}b.g=c+" ["+Bo(b)+"]";yo(b)}}finally{xo(b)}}}
function xo(b,c){if(b.ha){vo(b);var d=b.ha,e=b.l[0]?da:null;b.ha=null;b.l=null;c||b.o("ready");try{d.onreadystatechange=e}catch(f){}}}function vo(b){b.ha&&b.D&&(b.ha.ontimeout=null);ja(b.b)&&(ba.clearTimeout(b.b),b.b=null)}
function Co(b){var c=Bo(b),d;a:switch(c){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:d=!0;break a;default:d=!1}if(!d){if(c=0===c)b=String(b.C).match(jo)[1]||null,!b&&ba.self&&ba.self.location&&(b=ba.self.location.protocol,b=b.substr(0,b.length-1)),c=!qo.test(b?b.toLowerCase():"");d=c}return d}function Ao(b){return b.ha?b.ha.readyState:0}function Bo(b){try{return 2<Ao(b)?b.ha.status:-1}catch(c){return-1}}function Do(b){try{return b.ha?b.ha.responseText:""}catch(c){return""}}
function Eo(b){try{if(!b.ha)return null;if("response"in b.ha)return b.ha.response;switch(b.j){case po:case "text":return b.ha.responseText;case "arraybuffer":if("mozResponseArrayBuffer"in b.ha)return b.ha.mozResponseArrayBuffer}return null}catch(c){return null}};function Fo(){if(!Zb)return!1;try{return new ActiveXObject("MSXML2.DOMDocument"),!0}catch(b){return!1}}var Go=Zb&&Fo();function Ho(b){var c=b.xml;if(c)return c;if("undefined"!=typeof XMLSerializer)return(new XMLSerializer).serializeToString(b);throw Error("Your browser does not support serializing XML documents");};var Io;a:if(document.implementation&&document.implementation.createDocument)Io=document.implementation.createDocument("","",null);else{if(Go){var Jo=new ActiveXObject("MSXML2.DOMDocument");if(Jo){Jo.resolveExternals=!1;Jo.validateOnParse=!1;try{Jo.setProperty("ProhibitDTD",!0),Jo.setProperty("MaxXMLSize",2048),Jo.setProperty("MaxElementDepth",256)}catch(b){}}if(Jo){Io=Jo;break a}}throw Error("Your browser does not support creating new documents");}var Ko=Io;
function Lo(b,c){return Ko.createElementNS(b,c)}function Mo(b,c){b||(b="");return Ko.createNode(1,c,b)}var No=document.implementation&&document.implementation.createDocument?Lo:Mo;function Oo(b,c){return Po(b,c,[]).join("")}function Po(b,c,d){if(4==b.nodeType||3==b.nodeType)c?d.push(String(b.nodeValue).replace(/(\r\n|\r|\n)/g,"")):d.push(b.nodeValue);else for(b=b.firstChild;b;b=b.nextSibling)Po(b,c,d);return d}function Qo(b){return b.localName}
function Ro(b){var c=b.localName;return void 0!==c?c:b.baseName}var So=Zb?Ro:Qo;function To(b){return b instanceof Document}function Uo(b){return ma(b)&&9==b.nodeType}var Vo=Zb?Uo:To;function Wo(b){return b instanceof Node}function Xo(b){return ma(b)&&void 0!==b.nodeType}var Yo=Zb?Xo:Wo;function Zo(b,c,d){return b.getAttributeNS(c,d)||""}function $o(b,c,d){var e="";b=ap(b,c,d);void 0!==b&&(e=b.nodeValue);return e}var bp=document.implementation&&document.implementation.createDocument?Zo:$o;
function cp(b,c,d){return b.getAttributeNodeNS(c,d)}function dp(b,c,d){var e=null;b=b.attributes;for(var f,g,h=0,k=b.length;h<k;++h)if(f=b[h],f.namespaceURI==c&&(g=f.prefix?f.prefix+":"+d:d,g==f.nodeName)){e=f;break}return e}var ap=document.implementation&&document.implementation.createDocument?cp:dp;function ep(b,c,d,e){b.setAttributeNS(c,d,e)}function fp(b,c,d,e){c?(c=b.ownerDocument.createNode(2,d,c),c.nodeValue=e,b.setAttributeNode(c)):b.setAttribute(d,e)}
var gp=document.implementation&&document.implementation.createDocument?ep:fp;function hp(b){return(new DOMParser).parseFromString(b,"application/xml")}function ip(b,c){return function(d,e){var f=b.call(c,d,e);void 0!==f&&lb(e[e.length-1],f)}}function jp(b,c){return function(d,e){var f=b.call(void 0!==c?c:this,d,e);void 0!==f&&e[e.length-1].push(f)}}function kp(b,c){return function(d,e){var f=b.call(void 0!==c?c:this,d,e);void 0!==f&&(e[e.length-1]=f)}}
function lp(b){return function(c,d){var e=b.call(this,c,d);void 0!==e&&Tb(d[d.length-1],c.localName).push(e)}}function M(b,c){return function(d,e){var f=b.call(this,d,e);void 0!==f&&(e[e.length-1][void 0!==c?c:d.localName]=f)}}function N(b,c){return function(d,e,f){b.call(void 0!==c?c:this,d,e,f);f[f.length-1].node.appendChild(d)}}function mp(b){var c,d;return function(e,f,g){if(void 0===c){c={};var h={};h[e.localName]=b;c[e.namespaceURI]=h;d=np(e.localName)}op(c,d,f,g)}}
function np(b,c){return function(d,e,f){d=e[e.length-1].node;e=b;void 0===e&&(e=f);f=c;void 0===c&&(f=d.namespaceURI);return No(f,e)}}var pp=np();function qp(b,c){for(var d=c.length,e=Array(d),f=0;f<d;++f)e[f]=b[c[f]];return e}function P(b,c,d){d=void 0!==d?d:{};var e,f;e=0;for(f=b.length;e<f;++e)d[b[e]]=c;return d}function rp(b,c,d,e){for(c=c.firstElementChild;c;c=c.nextElementSibling){var f=b[c.namespaceURI];void 0!==f&&(f=f[c.localName],void 0!==f&&f.call(e,c,d))}}
function Q(b,c,d,e,f){e.push(b);rp(c,d,e,f);return e.pop()}function op(b,c,d,e,f,g){for(var h=(void 0!==f?f:d).length,k,m,n=0;n<h;++n)k=d[n],void 0!==k&&(m=c.call(g,k,e,void 0!==f?f[n]:void 0),void 0!==m&&b[m.namespaceURI][m.localName].call(g,m,k,e))}function sp(b,c,d,e,f,g,h){f.push(b);op(c,d,e,f,g,h);f.pop()};function tp(b,c,d,e){return function(f,g,h){var k=new oo;k.j="arraybuffer"==c.V()?"arraybuffer":"text";C(k,"complete",function(b){b=b.target;if(Co(b)){var f=c.V(),g;if("json"==f)g=Do(b);else if("text"==f)g=Do(b);else if("xml"==f){if(!Zb)try{g=b.ha?b.ha.responseXML:null}catch(k){g=null}g||(g=hp(Do(b)))}else"arraybuffer"==f&&(g=Eo(b));g&&(f=c.Ba(g,{featureProjection:h}),2==d.length?d.call(this,f,c.Ia(g)):d.call(this,f))}else e.call(this);uc(b)},!1,this);ka(b)?so(k,b(f,g,h)):so(k,b)}}
function up(b,c){return tp(b,c,function(b,c){this.c=c;this.g=b;this.state=2;xh(this)},function(){this.state=3;xh(this)})}function vp(b,c){return tp(b,c,function(b){this.Dc(b)},wa)};function wp(){return[[-Infinity,-Infinity,Infinity,Infinity]]};var xp,yp,zp,Ap;
(function(){var b={ka:{}};(function(){function c(b,d){if(!(this instanceof c))return new c(b,d);this.af=Math.max(4,b||9);this.gg=Math.max(2,Math.ceil(.4*this.af));d&&this.$i(d);this.clear()}function d(b,c){b.bbox=e(b,0,b.children.length,c)}function e(b,c,d,e){for(var g=[Infinity,Infinity,-Infinity,-Infinity],h;c<d;c++)h=b.children[c],f(g,b.Pa?e(h):h.bbox);return g}function f(b,c){b[0]=Math.min(b[0],c[0]);b[1]=Math.min(b[1],c[1]);b[2]=Math.max(b[2],c[2]);b[3]=Math.max(b[3],c[3])}function g(b,c){return b.bbox[0]-
c.bbox[0]}function h(b,c){return b.bbox[1]-c.bbox[1]}function k(b){return(b[2]-b[0])*(b[3]-b[1])}function m(b){return b[2]-b[0]+(b[3]-b[1])}function n(b,c){return b[0]<=c[0]&&b[1]<=c[1]&&c[2]<=b[2]&&c[3]<=b[3]}function p(b,c){return c[0]<=b[2]&&c[1]<=b[3]&&c[2]>=b[0]&&c[3]>=b[1]}function q(b,c,d,e,f){for(var g=[c,d],h;g.length;)d=g.pop(),c=g.pop(),d-c<=e||(h=c+Math.ceil((d-c)/e/2)*e,r(b,c,d,h,f),g.push(c,h,h,d))}function r(b,c,d,e,f){for(var g,h,k,m,n;d>c;){600<d-c&&(g=d-c+1,h=e-c+1,k=Math.log(g),
m=.5*Math.exp(2*k/3),n=.5*Math.sqrt(k*m*(g-m)/g)*(0>h-g/2?-1:1),k=Math.max(c,Math.floor(e-h*m/g+n)),h=Math.min(d,Math.floor(e+(g-h)*m/g+n)),r(b,k,h,e,f));g=b[e];h=c;m=d;t(b,c,e);for(0<f(b[d],g)&&t(b,c,d);h<m;){t(b,h,m);h++;for(m--;0>f(b[h],g);)h++;for(;0<f(b[m],g);)m--}0===f(b[c],g)?t(b,c,m):(m++,t(b,m,d));m<=e&&(c=m+1);e<=m&&(d=m-1)}}function t(b,c,d){var e=b[c];b[c]=b[d];b[d]=e}c.prototype={all:function(){return this.bg(this.data,[])},search:function(b){var c=this.data,d=[],e=this.cb;if(!p(b,c.bbox))return d;
for(var f=[],g,h,k,m;c;){g=0;for(h=c.children.length;g<h;g++)k=c.children[g],m=c.Pa?e(k):k.bbox,p(b,m)&&(c.Pa?d.push(k):n(b,m)?this.bg(k,d):f.push(k));c=f.pop()}return d},load:function(b){if(!b||!b.length)return this;if(b.length<this.gg){for(var c=0,d=b.length;c<d;c++)this.ya(b[c]);return this}b=this.dg(b.slice(),0,b.length-1,0);this.data.children.length?this.data.height===b.height?this.ig(this.data,b):(this.data.height<b.height&&(c=this.data,this.data=b,b=c),this.fg(b,this.data.height-b.height-1,
!0)):this.data=b;return this},ya:function(b){b&&this.fg(b,this.data.height-1);return this},clear:function(){this.data={children:[],height:1,bbox:[Infinity,Infinity,-Infinity,-Infinity],Pa:!0};return this},remove:function(b){if(!b)return this;for(var c=this.data,d=this.cb(b),e=[],f=[],g,h,k,m;c||e.length;){c||(c=e.pop(),h=e[e.length-1],g=f.pop(),m=!0);if(c.Pa&&(k=c.children.indexOf(b),-1!==k)){c.children.splice(k,1);e.push(c);this.Yi(e);break}m||c.Pa||!n(c.bbox,d)?h?(g++,c=h.children[g],m=!1):c=null:
(e.push(c),f.push(g),g=0,h=c,c=c.children[0])}return this},cb:function(b){return b},ef:function(b,c){return b[0]-c[0]},ff:function(b,c){return b[1]-c[1]},toJSON:function(){return this.data},bg:function(b,c){for(var d=[];b;)b.Pa?c.push.apply(c,b.children):d.push.apply(d,b.children),b=d.pop();return c},dg:function(b,c,e,f){var g=e-c+1,h=this.af,k;if(g<=h)return k={children:b.slice(c,e+1),height:1,bbox:null,Pa:!0},d(k,this.cb),k;f||(f=Math.ceil(Math.log(g)/Math.log(h)),h=Math.ceil(g/Math.pow(h,f-1)));
k={children:[],height:f,bbox:null};var g=Math.ceil(g/h),h=g*Math.ceil(Math.sqrt(h)),m,n,p;for(q(b,c,e,h,this.ef);c<=e;c+=h)for(n=Math.min(c+h-1,e),q(b,c,n,g,this.ff),m=c;m<=n;m+=g)p=Math.min(m+g-1,n),k.children.push(this.dg(b,m,p,f-1));d(k,this.cb);return k},Xi:function(b,c,d,e){for(var f,g,h,m,n,p,q,r;;){e.push(c);if(c.Pa||e.length-1===d)break;q=r=Infinity;f=0;for(g=c.children.length;f<g;f++)h=c.children[f],n=k(h.bbox),p=h.bbox,p=(Math.max(p[2],b[2])-Math.min(p[0],b[0]))*(Math.max(p[3],b[3])-Math.min(p[1],
b[1]))-n,p<r?(r=p,q=n<q?n:q,m=h):p===r&&n<q&&(q=n,m=h);c=m}return c},fg:function(b,c,d){var e=this.cb;d=d?b.bbox:e(b);var e=[],g=this.Xi(d,this.data,c,e);g.children.push(b);for(f(g.bbox,d);0<=c;)if(e[c].children.length>this.af)this.fj(e,c),c--;else break;this.Ui(d,e,c)},fj:function(b,c){var e=b[c],f=e.children.length,g=this.gg;this.Vi(e,g,f);f=this.Wi(e,g,f);f={children:e.children.splice(f,e.children.length-f),height:e.height};e.Pa&&(f.Pa=!0);d(e,this.cb);d(f,this.cb);c?b[c-1].children.push(f):this.ig(e,
f)},ig:function(b,c){this.data={children:[b,c],height:b.height+1};d(this.data,this.cb)},Wi:function(b,c,d){var f,g,h,m,n,p,q;n=p=Infinity;for(f=c;f<=d-c;f++)g=e(b,0,f,this.cb),h=e(b,f,d,this.cb),m=Math.max(0,Math.min(g[2],h[2])-Math.max(g[0],h[0]))*Math.max(0,Math.min(g[3],h[3])-Math.max(g[1],h[1])),g=k(g)+k(h),m<n?(n=m,q=f,p=g<p?g:p):m===n&&g<p&&(p=g,q=f);return q},Vi:function(b,c,d){var e=b.Pa?this.ef:g,f=b.Pa?this.ff:h,k=this.cg(b,c,d,e);c=this.cg(b,c,d,f);k<c&&b.children.sort(e)},cg:function(b,
c,d,g){b.children.sort(g);g=this.cb;var h=e(b,0,c,g),k=e(b,d-c,d,g),n=m(h)+m(k),p,q;for(p=c;p<d-c;p++)q=b.children[p],f(h,b.Pa?g(q):q.bbox),n+=m(h);for(p=d-c-1;p>=c;p--)q=b.children[p],f(k,b.Pa?g(q):q.bbox),n+=m(k);return n},Ui:function(b,c,d){for(;0<=d;d--)f(c[d].bbox,b)},Yi:function(b){for(var c=b.length-1,e;0<=c;c--)0===b[c].children.length?0<c?(e=b[c-1].children,e.splice(e.indexOf(b[c]),1)):this.clear():d(b[c],this.cb)},$i:function(b){var c=["return a"," - b",";"];this.ef=new Function("a","b",
c.join(b[0]));this.ff=new Function("a","b",c.join(b[1]));this.cb=new Function("a","return [a"+b.join(", a")+"];")}};"undefined"!==typeof b?b.ka=c:"undefined"!==typeof self?self.a=c:window.a=c})();xp=b.ka})();function Bp(b){this.c=xp(b);this.a={}}l=Bp.prototype;l.ya=function(b,c){var d=[b[0],b[1],b[2],b[3],c];this.c.ya(d);this.a[w(c)]=d};l.load=function(b,c){for(var d=Array(c.length),e=0,f=c.length;e<f;e++){var g=b[e],h=c[e],g=[g[0],g[1],g[2],g[3],h];d[e]=g;this.a[w(h)]=g}this.c.load(d)};l.remove=function(b){b=w(b);var c=this.a[b];delete this.a[b];return null!==this.c.remove(c)};function Cp(b,c,d){var e=w(d);be(b.a[e].slice(0,4),c)||(b.remove(d),b.ya(c,d))}
function Dp(b){return b.c.all().map(function(b){return b[4]})}function Ep(b,c){return b.c.search(c).map(function(b){return b[4]})}l.forEach=function(b,c){return Fp(Dp(this),b,c)};function Gp(b,c,d,e){return Fp(Ep(b,c),d,e)}function Fp(b,c,d){for(var e,f=0,g=b.length;f<g&&!(e=c.call(d,b[f]));f++);return e}l.Ka=function(){return Qb(this.a)};l.clear=function(){this.c.clear();this.a={}};l.J=function(){return this.c.data.bbox};function R(b){b=b||{};yh.call(this,{attributions:b.attributions,logo:b.logo,projection:void 0,state:"ready",wrapX:void 0!==b.wrapX?b.wrapX:!0});this.T=wa;void 0!==b.loader?this.T=b.loader:void 0!==b.url&&(this.T=vp(b.url,b.format));this.pa=void 0!==b.strategy?b.strategy:wp;var c=void 0!==b.useSpatialIndex?b.useSpatialIndex:!0;this.a=c?new Bp:null;this.Z=new Bp;this.g={};this.i={};this.l={};this.u={};this.b=null;var d,e;b.features instanceof og?(d=b.features,e=d.a):ga(b.features)&&(e=b.features);c||
void 0!==d||(d=new og(e));void 0!==e&&Hp(this,e);void 0!==d&&Ip(this,d)}y(R,yh);l=R.prototype;l.Ad=function(b){var c=w(b).toString();if(Jp(this,c,b)){Kp(this,c,b);var d=b.W();d?(c=d.J(),this.a&&this.a.ya(c,b)):this.g[c]=b;this.o(new Lp("addfeature",b))}this.s()};function Kp(b,c,d){b.u[c]=[C(d,"change",b.qh,!1,b),C(d,"propertychange",b.qh,!1,b)]}function Jp(b,c,d){var e=!0,f=d.Na();void 0!==f?f.toString()in b.i?e=!1:b.i[f.toString()]=d:b.l[c]=d;return e}l.Dc=function(b){Hp(this,b);this.s()};
function Hp(b,c){var d,e,f,g,h=[],k=[],m=[];e=0;for(f=c.length;e<f;e++)g=c[e],d=w(g).toString(),Jp(b,d,g)&&k.push(g);e=0;for(f=k.length;e<f;e++){g=k[e];d=w(g).toString();Kp(b,d,g);var n=g.W();n?(d=n.J(),h.push(d),m.push(g)):b.g[d]=g}b.a&&b.a.load(h,m);e=0;for(f=k.length;e<f;e++)b.o(new Lp("addfeature",k[e]))}
function Ip(b,c){var d=!1;C(b,"addfeature",function(b){d||(d=!0,c.push(b.feature),d=!1)});C(b,"removefeature",function(b){d||(d=!0,c.remove(b.feature),d=!1)});C(c,"add",function(b){d||(b=b.element,d=!0,this.Ad(b),d=!1)},!1,b);C(c,"remove",function(b){d||(b=b.element,d=!0,this.Qc(b),d=!1)},!1,b);b.b=c}
l.clear=function(b){if(b){for(var c in this.u)this.u[c].forEach(Zc);this.b||(this.u={},this.i={},this.l={})}else b=this.Nh,this.a&&(this.a.forEach(b,this),Ib(this.g,b,this));this.b&&this.b.clear();this.a&&this.a.clear();this.Z.clear();this.g={};this.o(new Lp("clear"));this.s()};l.rg=function(b,c){if(this.a)return this.a.forEach(b,c);if(this.b)return this.b.forEach(b,c)};function Mp(b,c,d){b.ob([c[0],c[1],c[0],c[1]],function(b){if(b.W().ng(c))return d.call(void 0,b)})}
l.ob=function(b,c,d){if(this.a)return Gp(this.a,b,c,d);if(this.b)return this.b.forEach(c,d)};l.sg=function(b,c,d){return this.ob(b,function(e){if(e.W().Da(b)&&(e=c.call(d,e)))return e})};l.yg=function(){return this.b};l.ye=function(){var b;this.b?b=this.b.a:this.a&&(b=Dp(this.a),Qb(this.g)||lb(b,Lb(this.g)));return b};l.xg=function(b){var c=[];Mp(this,b,function(b){c.push(b)});return c};l.lf=function(b){return Ep(this.a,b)};
l.ug=function(b){var c=b[0],d=b[1],e=null,f=[NaN,NaN],g=Infinity,h=[-Infinity,-Infinity,Infinity,Infinity];Gp(this.a,h,function(b){var m=b.W(),n=g;g=m.mb(c,d,f,g);g<n&&(e=b,b=Math.sqrt(g),h[0]=c-b,h[1]=d-b,h[2]=c+b,h[3]=d+b)});return e};l.J=function(){return this.a.J()};l.wg=function(b){b=this.i[b.toString()];return void 0!==b?b:null};
l.qh=function(b){b=b.target;var c=w(b).toString(),d=b.W();d?(d=d.J(),c in this.g?(delete this.g[c],this.a&&this.a.ya(d,b)):this.a&&Cp(this.a,d,b)):c in this.g||(this.a&&this.a.remove(b),this.g[c]=b);d=b.Na();void 0!==d?(d=d.toString(),c in this.l?(delete this.l[c],this.i[d]=b):this.i[d]!==b&&(Np(this,b),this.i[d]=b)):c in this.l||(Np(this,b),this.l[c]=b);this.s();this.o(new Lp("changefeature",b))};l.Ka=function(){return this.a.Ka()&&Qb(this.g)};
l.Mc=function(b,c,d){var e=this.Z;b=this.pa(b,c);var f,g;f=0;for(g=b.length;f<g;++f){var h=b[f];Gp(e,h,function(b){return Xd(b.extent,h)})||(this.T.call(this,h,c,d),e.ya(h,{extent:h.slice()}))}};l.Qc=function(b){var c=w(b).toString();c in this.g?delete this.g[c]:this.a&&this.a.remove(b);this.Nh(b);this.s()};l.Nh=function(b){var c=w(b).toString();this.u[c].forEach(Zc);delete this.u[c];var d=b.Na();void 0!==d?delete this.i[d.toString()]:delete this.l[c];this.o(new Lp("removefeature",b))};
function Np(b,c){for(var d in b.i)if(b.i[d]===c){delete b.i[d];break}}function Lp(b,c){vc.call(this,b);this.feature=c}y(Lp,vc);function Op(b){this.b=b.source;this.xa=Dd();this.g=Pi();this.i=[0,0];this.u=null;rn.call(this,{attributions:b.attributions,canvasFunction:ra(this.pj,this),logo:b.logo,projection:b.projection,ratio:b.ratio,resolutions:b.resolutions,state:this.b.A});this.T=null;this.l=void 0;this.mh(b.style);C(this.b,"change",this.Mm,void 0,this)}y(Op,rn);l=Op.prototype;
l.pj=function(b,c,d,e,f){var g=new Rm(.5*c/d,b,c);this.b.Mc(b,c,f);var h=!1;this.b.ob(b,function(b){var e;if(!(e=h)){var f;(e=b.Qb())?f=e.call(b,c):this.l&&(f=this.l(b,c));if(f){var p,q=!1;e=0;for(p=f.length;e<p;++e)q=Ym(g,b,f[e],Xm(c,d),this.Lm,this)||q;e=q}else e=!1}h=e},this);Sm(g);if(h)return null;this.i[0]!=e[0]||this.i[1]!=e[1]?(this.g.canvas.width=e[0],this.g.canvas.height=e[1],this.i[0]=e[0],this.i[1]=e[1]):this.g.clearRect(0,0,e[0],e[1]);b=Pp(this,me(b),c,d,e);g.b(this.g,d,b,0,{});this.u=
g;return this.g.canvas};l.xe=function(b,c,d,e,f){if(this.u){var g={};return this.u.f(b,c,0,e,function(b){var c=w(b).toString();if(!(c in g))return g[c]=!0,f(b)})}};l.Im=function(){return this.b};l.Jm=function(){return this.T};l.Km=function(){return this.l};function Pp(b,c,d,e,f){return ik(b.xa,f[0]/2,f[1]/2,e/d,-e/d,0,-c[0],-c[1])}l.Lm=function(){this.s()};l.Mm=function(){Ah(this,this.b.A)};l.mh=function(b){this.T=void 0!==b?b:gm;this.l=b?em(this.T):void 0;this.s()};function Qp(b){xm.call(this,b);this.g=null;this.j=Dd();this.b=this.f=null}y(Qp,xm);l=Qp.prototype;l.Za=function(b,c,d,e){var f=this.a;return f.fa().xe(b,c.viewState.resolution,c.viewState.rotation,c.skippedFeatureUids,function(b){return d.call(e,b,f)})};
l.sc=function(b,c,d,e){if(this.yd())if(this.a.fa()instanceof Op){if(b=b.slice(),kk(c.pixelToCoordinateMatrix,b,b),this.Za(b,c,ue,this))return d.call(e,this.a)}else if(this.f||(this.f=Dd(),Jd(this.j,this.f)),c=Am(b,this.f),this.b||(this.b=Pi(1,1)),this.b.clearRect(0,0,1,1),this.b.drawImage(this.yd(),c[0],c[1],1,1,0,0,1,1),0<this.b.getImageData(0,0,1,1).data[3])return d.call(e,this.a)};l.yd=function(){return this.g?this.g.a():null};l.mf=function(){return this.j};
l.zd=function(b,c){var d=b.pixelRatio,e=b.viewState,f=e.center,g=e.resolution,h=e.rotation,k=this.a.fa(),m=b.viewHints,n=b.extent;void 0!==c.extent&&(n=oe(n,c.extent));m[0]||m[1]||je(n)||(e=k.C(n,g,d,e.projection))&&nk(this,e)&&(this.g=e);if(this.g){var e=this.g,m=e.J(),n=e.$(),p=e.b,g=d*n/(g*p);ik(this.j,d*b.size[0]/2,d*b.size[1]/2,g,g,h,p*(m[0]-f[0])/n,p*(f[1]-m[3])/n);this.f=null;pk(b.attributions,e.j);qk(b,k)}return!0};function Rp(b){xm.call(this,b);this.b=this.j=null;this.B=!1;this.i=null;this.A=Dd();this.g=null;this.D=this.G=this.C=NaN;this.l=this.f=null;this.U=[0,0]}y(Rp,xm);Rp.prototype.yd=function(){return this.j};Rp.prototype.mf=function(){return this.A};
Rp.prototype.zd=function(b,c){var d=b.pixelRatio,e=b.viewState,f=e.projection,g=this.a,h=g.fa(),k=h.hb(f),m=h.$d(),n=Kh(k,e.resolution),p=h.Pb(n,b.pixelRatio,f),q=p[0]/od(k.Ha(n),this.U)[0],r=k.$(n),q=r/q,t=e.center,x;r==e.resolution?(t=sk(t,r,b.size),x=ne(t,r,e.rotation,b.size)):x=b.extent;void 0!==c.extent&&(x=oe(x,c.extent));if(je(x))return!1;var z=Hh(k,x,r),B=p[0]*kg(z),A=p[1]*jg(z),v,O;this.j?(v=this.j,O=this.i,this.b[0]<B||this.b[1]<A||this.G!==p[0]||this.D!==p[1]||this.B&&(this.b[0]>B||this.b[1]>
A)?(v.width=B,v.height=A,this.b=[B,A],this.B=!Bm(this.b),this.f=null):(B=this.b[0],A=this.b[1],(v=n!=this.C)||(v=this.f,v=!(v.a<=z.a&&z.f<=v.f&&v.c<=z.c&&z.b<=v.b)),v&&(this.f=null))):(O=Pi(B,A),this.j=O.canvas,this.b=[B,A],this.i=O,this.B=!Bm(this.b));var K,I;this.f?(A=this.f,B=kg(A)):(B/=p[0],A/=p[1],K=z.a-Math.floor((B-kg(z))/2),I=z.c-Math.floor((A-jg(z))/2),this.C=n,this.G=p[0],this.D=p[1],this.f=new gg(K,K+B-1,I,I+A-1),this.l=Array(B*A),A=this.f);v={};v[n]={};var G=[],la=this.bd(h,f,v),Ea=g.b(),
L=Od(),za=new gg(0,0,0,0),Ra,Ka,kb;for(I=z.a;I<=z.f;++I)for(kb=z.c;kb<=z.b;++kb)Ka=h.Ob(n,I,kb,d,f),K=Ka.state,2==K||4==K||3==K&&!Ea?v[n][fg(Ka.a)]=Ka:(Ra=Eh(k,Ka.a,la,za,L),Ra||(G.push(Ka),(Ra=Gh(k,Ka.a,za,L))&&la(n+1,Ra)));la=0;for(Ra=G.length;la<Ra;++la)Ka=G[la],I=p[0]*(Ka.a[1]-A.a),kb=p[1]*(A.b-Ka.a[2]),O.clearRect(I,kb,p[0],p[1]);G=Object.keys(v).map(Number);ob(G);var cb=h.pa,Rc=he(k.Aa([n,A.a,A.b],L)),sc,Oe,Aj,ci,$f,pm,la=0;for(Ra=G.length;la<Ra;++la)if(sc=G[la],p=h.Pb(sc,d,f),ci=v[sc],sc==
n)for(Aj in ci)Ka=ci[Aj],Oe=(Ka.a[2]-A.c)*B+(Ka.a[1]-A.a),this.l[Oe]!=Ka&&(I=p[0]*(Ka.a[1]-A.a),kb=p[1]*(A.b-Ka.a[2]),K=Ka.state,4!=K&&(3!=K||Ea)&&cb||O.clearRect(I,kb,p[0],p[1]),2==K&&O.drawImage(Ka.Sa(),m,m,p[0],p[1],I,kb,p[0],p[1]),this.l[Oe]=Ka);else for(Aj in sc=k.$(sc)/r,ci)for(Ka=ci[Aj],Oe=k.Aa(Ka.a,L),I=(Oe[0]-Rc[0])/q,kb=(Rc[1]-Oe[3])/q,pm=sc*p[0],$f=sc*p[1],K=Ka.state,4!=K&&cb||O.clearRect(I,kb,pm,$f),2==K&&O.drawImage(Ka.Sa(),m,m,p[0],p[1],I,kb,pm,$f),Ka=Fh(k,Oe,n,za),K=Math.max(Ka.a,A.a),
kb=Math.min(Ka.f,A.f),I=Math.max(Ka.c,A.c),Ka=Math.min(Ka.b,A.b);K<=kb;++K)for($f=I;$f<=Ka;++$f)Oe=($f-A.c)*B+(K-A.a),this.l[Oe]=void 0;rk(b.usedTiles,h,n,z);tk(b,h,k,d,f,x,n,g.a());ok(b,h);qk(b,h);ik(this.A,d*b.size[0]/2,d*b.size[1]/2,d*q/e.resolution,d*q/e.resolution,e.rotation,(Rc[0]-t[0])/q,(t[1]-Rc[1])/q);this.g=null;return!0};Rp.prototype.sc=function(b,c,d,e){if(this.i&&(this.g||(this.g=Dd(),Jd(this.A,this.g)),b=Am(b,this.g),0<this.i.getImageData(b[0],b[1],1,1).data[3]))return d.call(e,this.a)};function Sp(b){xm.call(this,b);this.f=!1;this.B=-1;this.l=NaN;this.j=Od();this.b=this.i=null;this.g=Pi()}y(Sp,xm);
Sp.prototype.u=function(b,c,d){var e=b.extent,f=b.pixelRatio,g=c.rb?b.skippedFeatureUids:{},h=b.viewState,k=h.projection,h=h.rotation,m=k.J(),n=this.a.fa(),p=zm(this,b,0);ym(this,"precompose",d,b,p);var q=this.b;if(q&&!q.Ka()){var r;ed(this.a,"render")?(this.g.canvas.width=d.canvas.width,this.g.canvas.height=d.canvas.height,r=this.g):r=d;var t=r.globalAlpha;r.globalAlpha=c.opacity;q.b(r,f,p,h,g);if(n.S&&k.b&&!Xd(m,e)){c=e[0];k=ke(m);for(n=0;c<m[0];)--n,p=k*n,p=zm(this,b,p),q.b(r,f,p,h,g),c+=k;n=0;
for(c=e[2];c>m[2];)++n,p=k*n,p=zm(this,b,p),q.b(r,f,p,h,g),c-=k;p=zm(this,b,0)}r!=d&&(ym(this,"render",r,b,p),d.drawImage(r.canvas,0,0));r.globalAlpha=t}ym(this,"postcompose",d,b,p)};Sp.prototype.Za=function(b,c,d,e){if(this.b){var f=c.viewState.resolution,g=c.viewState.rotation,h=this.a,k=c.layerStates[w(h)],m={};return this.b.f(b,f,g,k.rb?c.skippedFeatureUids:{},function(b){var c=w(b).toString();if(!(c in m))return m[c]=!0,d.call(e,b,h)})}};Sp.prototype.A=function(){mk(this)};
Sp.prototype.zd=function(b){function c(b){var c,e=b.Qb();e?c=e.call(b,n):(e=d.b)&&(c=e(b,n));if(c){if(c){var f,g=!1,e=0;for(f=c.length;e<f;++e)g=Ym(r,b,c[e],Xm(n,p),this.A,this)||g;b=g}else b=!1;this.f=this.f||b}}var d=this.a,e=d.fa();pk(b.attributions,e.j);qk(b,e);var f=b.viewHints[0],g=b.viewHints[1],h=d.i,k=d.l;if(!this.f&&!h&&f||!k&&g)return!0;var m=b.extent,k=b.viewState,f=k.projection,n=k.resolution,p=b.pixelRatio,g=d.c,q=d.a,h=im(d);void 0===h&&(h=Wm);m=Sd(m,q*n);q=k.projection.J();e.S&&k.projection.b&&
!Xd(q,b.extent)&&(b=Math.max(ke(m)/2,ke(q)),m[0]=q[0]-b,m[2]=q[2]+b);if(!this.f&&this.l==n&&this.B==g&&this.i==h&&Xd(this.j,m))return!0;uc(this.b);this.b=null;this.f=!1;var r=new Rm(.5*n/p,m,n,d.a);e.Mc(m,n,f);if(h){var t=[];e.ob(m,function(b){t.push(b)},this);ob(t,h);t.forEach(c,this)}else e.ob(m,c,this);Sm(r);this.l=n;this.B=g;this.i=h;this.j=m;this.b=r;return!0};function Tp(b,c,d,e,f){wh.call(this,b,c);this.j=e;this.c=this.g=null;this.b={jd:!1,Sf:null,Oh:-1,Gd:null};this.B=f;this.i=d}y(Tp,wh);l=Tp.prototype;l.X=function(){Tp.da.X.call(this)};l.Hl=function(){return this.j};l.tb=function(){return this.i};l.load=function(){0==this.state&&(this.state=1,xh(this),this.B(this,this.i),this.l(null,NaN,null))};l.Yh=function(b){this.l=b};function Up(b,c){var d=/\{z\}/g,e=/\{x\}/g,f=/\{y\}/g,g=/\{-y\}/g;return function(h){if(h)return b.replace(d,h[0].toString()).replace(e,h[1].toString()).replace(f,function(){return(-h[2]-1).toString()}).replace(g,function(){return(jg(c.c?c.c[h[0]]:null)+h[2]).toString()})}}function Vp(b,c){for(var d=b.length,e=Array(d),f=0;f<d;++f)e[f]=Up(b[f],c);return Wp(e)}function Wp(b){return 1===b.length?b[0]:function(c,d,e){if(c)return b[pd((c[1]<<c[0])+c[2],b.length)](c,d,e)}}function Xp(){}
function Yp(b){var c=[],d=/\{(\d)-(\d)\}/.exec(b)||/\{([a-z])-([a-z])\}/.exec(b);if(d){var e=d[2].charCodeAt(0),f;for(f=d[1].charCodeAt(0);f<=e;++f)c.push(b.replace(d[0],String.fromCharCode(f)))}else c.push(b);return c};function Zp(b){Ph.call(this,{attributions:b.attributions,cf:b.cf,extent:b.extent,logo:b.logo,opaque:b.opaque,projection:b.projection,state:b.state?b.state:void 0,tileGrid:b.tileGrid,tilePixelRatio:b.tilePixelRatio,wrapX:b.wrapX});this.tileLoadFunction=b.tileLoadFunction;this.tileUrlFunction=b.tileUrlFunction?b.tileUrlFunction:Xp;this.urls=null;b.urls?b.tileUrlFunction?this.urls=b.urls:this.Va(b.urls):b.url&&this.Ua(b.url);b.tileUrlFunction&&this.Ja(b.tileUrlFunction)}y(Zp,Ph);l=Zp.prototype;
l.Wa=function(){return this.tileLoadFunction};l.Xa=function(){return this.tileUrlFunction};l.Ya=function(){return this.urls};l.ph=function(b){b=b.target;switch(b.state){case 1:this.o(new Sh("tileloadstart",b));break;case 2:this.o(new Sh("tileloadend",b));break;case 3:this.o(new Sh("tileloaderror",b))}};l.bb=function(b){this.a.clear();this.tileLoadFunction=b;this.s()};l.Ja=function(b){this.a.clear();this.tileUrlFunction=b;this.s()};l.Ua=function(b){this.Ja(Vp(Yp(b),this.tileGrid));this.urls=[b]};
l.Va=function(b){this.Ja(Vp(b,this.tileGrid));this.urls=b};l.Xf=function(b,c,d){b=this.gb(b,c,d);sh(this.a,b)&&this.a.get(b)};function $p(b){Zp.call(this,{attributions:b.attributions,cf:128,extent:b.extent,logo:b.logo,opaque:b.opaque,projection:b.projection,state:b.state?b.state:void 0,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction?b.tileLoadFunction:aq,tileUrlFunction:b.tileUrlFunction,tilePixelRatio:b.tilePixelRatio,url:b.url,urls:b.urls,wrapX:void 0===b.wrapX?!0:b.wrapX});this.g=b.format?b.format:null;this.tileClass=b.tileClass?b.tileClass:Tp}y($p,Zp);
$p.prototype.Ob=function(b,c,d,e,f){var g=this.gb(b,c,d);if(sh(this.a,g))return this.a.get(g);b=[b,c,d];e=(c=Rh(this,b,f))?this.tileUrlFunction(c,e,f):void 0;e=new this.tileClass(b,void 0!==e?0:4,void 0!==e?e:"",this.g,this.tileLoadFunction);C(e,"change",this.ph,!1,this);this.a.set(g,e);return e};function aq(b,c){b.Yh(up(c,b.j))};function bq(b){xm.call(this,b);this.f=Pi();this.b=!1;this.g=[];this.j=Od();this.i=[NaN,NaN];this.B=Dd()}y(bq,xm);
bq.prototype.u=function(b,c,d){var e=b.pixelRatio,f=c.rb?b.skippedFeatureUids:{},g=b.viewState,h=g.center,k=g.projection,m=g.resolution,n=g.rotation,p=this.a,q=p.fa(),r=zm(this,b,0);ym(this,"precompose",d,b,r);ed(p,"render")?(this.f.canvas.width=d.canvas.width,this.f.canvas.height=d.canvas.height,p=this.f):p=d;var t=p.globalAlpha;p.globalAlpha=c.opacity;c=this.g;var x=q.tileGrid,z,B,A,v,O,K;B=0;for(A=c.length;B<A;++B)v=c[B],z=v.a[0],O=x.Ha(z),K=q.Pb(z,e,k),O=K[0]/od(O,this.i)[0],z=x.$(z),z/=O,"tile-pixels"==
v.c.c&&(r=he(x.Aa(v.a,this.j)),r=ik(this.B,e*b.size[0]/2,e*b.size[1]/2,e*z/m,e*z/m,g.rotation,(r[0]-h[0])/z,(h[1]-r[1])/z)),v.b.Gd.b(p,e,r,n,f);r=zm(this,b,0);p!=d&&(ym(this,"render",p,b,r),d.drawImage(p.canvas,0,0));p.globalAlpha=t;ym(this,"postcompose",d,b,r)};
function cq(b,c,d,e){function f(b){var c;b.Qb()?c=b.Qb().call(b,t):d.b&&(c=(0,d.b)(b,t));if(c){var e=z,f=x;if(c){var g,h,m=!1;g=0;for(h=c.length;g<h;++g)m=Ym(f,b,c[g],e,this.l,this)||m;b=m}else b=!1;this.b=this.b||b;k.jd=k.jd||b}}var g=d.c,h=im(d)||null,k=c.b;if(k.jd||k.Oh!=g||k.Sf!=h){uc(k.Gd);k.Gd=null;k.jd=!1;var m=d.fa(),n=m.tileGrid,p=c.a,q="tile-pixels"==c.c.c,r;q?(r=m.Pb(p[0],e,c.c),r=[0,0,r[0],r[1]]):r=n.Aa(p);var t=n.$(p[0]),m=q?m.C:t;k.jd=!1;var x=new Rm(0,r,m,d.a),z=Xm(m,e);c=c.g;h&&h!==
k.Sf&&c.sort(h);c.forEach(f,b);Sm(x);k.Oh=g;k.Sf=h;k.Gd=x}}
bq.prototype.Za=function(b,c,d,e){var f=c.viewState.resolution,g=c.viewState.rotation,h=this.a,k=c.layerStates[w(h)],m={},n=this.g,p=h.fa(),q=p.tileGrid,r,t,x,z,B,A,v;x=0;for(z=n.length;x<z;++x)A=n[x],t=A.a,B=p.tileGrid.Aa(t,this.j),Vd(B,b)&&("tile-pixels"===A.c.c?(B=he(B),f=p.C,v=q.$(t[0])/f,od(q.Ha(t[0])),t=[(b[0]-B[0])/v,(B[1]-b[1])/v]):t=b,A=A.b.Gd,r=r||A.f(t,f,g,k.rb?c.skippedFeatureUids:{},function(b){var c=w(b).toString();if(!(c in m))return m[c]=!0,d.call(e,b,h)}));return r};
bq.prototype.l=function(){mk(this)};
bq.prototype.zd=function(b,c){var d=this.a,e=d.fa();pk(b.attributions,e.j);qk(b,e);var f=b.viewHints[0],g=b.viewHints[1],h=d.i,k=d.l;if(!this.b&&!h&&f||!k&&g)return!0;g=b.extent;c.extent&&(g=oe(g,c.extent));if(je(g))return!1;for(var f=b.viewState,h=f.projection,k=f.resolution,f=b.pixelRatio,m=e.tileGrid,n=m.a,p=n.length-1;0<p&&n[p]<k;)--p;n=Fh(m,g,p);rk(b.usedTiles,e,p,n);tk(b,e,m,f,h,g,p,d.g());ok(b,e);g={};g[p]={};var q=this.bd(e,h,g),r=d.U(),t=this.j,x=new gg(0,0,0,0),z,B,A;for(B=n.a;B<=n.f;++B)for(A=
n.c;A<=n.b;++A)k=e.Ob(p,B,A,f,h),z=k.state,2==z||4==z||3==z&&!r?g[p][fg(k.a)]=k:(z=Eh(m,k.a,q,x,t),z||(k=Gh(m,k.a,x,t))&&q(p+1,k));this.b=!1;e=Object.keys(g).map(Number);e.sort();for(var h=[],v,m=0,p=e.length;m<p;++m)for(v in k=e[m],n=g[k],n)k=n[v],2==k.state&&(h.push(k),cq(this,k,d,f));this.g=h;return!0};function dq(b,c){Ak.call(this,0,c);this.b=Pi();this.a=this.b.canvas;this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";Ng(b,this.a,0);this.c=!0;this.g=Dd()}y(dq,Ak);dq.prototype.gf=function(b){return b instanceof Sl?new Qp(b):b instanceof F?new Rp(b):b instanceof J?new bq(b):b instanceof H?new Sp(b):null};
function eq(b,c,d){var e=b.j,f=b.b;if(ed(e,c)){var g=d.extent,h=d.pixelRatio,k=d.viewState.rotation,m=d.pixelRatio,n=d.viewState,p=n.resolution;b=ik(b.g,b.a.width/2,b.a.height/2,m/p,-m/p,-n.rotation,-n.center[0],-n.center[1]);g=new jm(f,h,g,b,k);e.o(new dk(c,e,g,d,f,null));wm(g)}}dq.prototype.V=function(){return"canvas"};
dq.prototype.Me=function(b){if(b){var c=this.b,d=b.size[0]*b.pixelRatio,e=b.size[1]*b.pixelRatio;this.a.width!=d||this.a.height!=e?(this.a.width=d,this.a.height=e):c.clearRect(0,0,this.a.width,this.a.height);Bk(b);eq(this,"precompose",b);d=b.layerStatesArray;qb(d);var e=b.viewState.resolution,f,g,h,k;f=0;for(g=d.length;f<g;++f)k=d[f],h=k.layer,h=Dk(this,h),fk(k,e)&&"ready"==k.S&&h.zd(b,k)&&h.u(b,k,c);eq(this,"postcompose",b);this.c||(ih(this.a,!0),this.c=!0);Ek(this,b);b.postRenderFunctions.push(Ck)}else this.c&&
(ih(this.a,!1),this.c=!1)};function fq(b,c){lk.call(this,b);this.target=c}y(fq,lk);fq.prototype.g=wa;fq.prototype.l=wa;function gq(b){var c=Kg("DIV");c.style.position="absolute";fq.call(this,b,c);this.b=null;this.f=Fd()}y(gq,fq);gq.prototype.Za=function(b,c,d,e){var f=this.a;return f.fa().xe(b,c.viewState.resolution,c.viewState.rotation,c.skippedFeatureUids,function(b){return d.call(e,b,f)})};gq.prototype.g=function(){Mg(this.target);this.b=null};
gq.prototype.j=function(b,c){var d=b.viewState,e=d.center,f=d.resolution,g=d.rotation,h=this.b,k=this.a.fa(),m=b.viewHints,n=b.extent;void 0!==c.extent&&(n=oe(n,c.extent));m[0]||m[1]||je(n)||(d=k.C(n,f,b.pixelRatio,d.projection))&&nk(this,d)&&(h=d);h&&(m=h.J(),n=h.$(),d=Dd(),ik(d,b.size[0]/2,b.size[1]/2,n/f,n/f,g,(m[0]-e[0])/n,(e[1]-m[3])/n),h!=this.b&&(e=h.a(this),e.style.maxWidth="none",e.style.position="absolute",Mg(this.target),this.target.appendChild(e),this.b=h),jk(d,this.f)||(Ti(this.target,
d),Gd(this.f,d)),pk(b.attributions,h.j),qk(b,k));return!0};function hq(b){var c=Kg("DIV");c.style.position="absolute";fq.call(this,b,c);this.f=!0;this.B=1;this.i=0;this.b={}}y(hq,fq);hq.prototype.g=function(){Mg(this.target);this.i=0};
hq.prototype.j=function(b,c){if(!c.visible)return this.f&&(ih(this.target,!1),this.f=!1),!0;var d=b.pixelRatio,e=b.viewState,f=e.projection,g=this.a,h=g.fa(),k=h.hb(f),m=h.$d(),n=Kh(k,e.resolution),p=k.$(n),q=e.center,r;p==e.resolution?(q=sk(q,p,b.size),r=ne(q,p,e.rotation,b.size)):r=b.extent;void 0!==c.extent&&(r=oe(r,c.extent));var p=Hh(k,r,p),t={};t[n]={};var x=this.bd(h,f,t),z=g.b(),B=Od(),A=new gg(0,0,0,0),v,O,K,I;for(K=p.a;K<=p.f;++K)for(I=p.c;I<=p.b;++I)v=h.Ob(n,K,I,d,f),O=v.state,2==O?t[n][fg(v.a)]=
v:4==O||3==O&&!z||(O=Eh(k,v.a,x,A,B),O||(v=Gh(k,v.a,A,B))&&x(n+1,v));var G;if(this.i!=h.c){for(G in this.b)z=this.b[+G],Og(z.target);this.b={};this.i=h.c}B=Object.keys(t).map(Number);ob(B);var x={},la;K=0;for(I=B.length;K<I;++K){G=B[K];G in this.b?z=this.b[G]:(z=k.fe(q,G),z=new iq(k,z),x[G]=!0,this.b[G]=z);G=t[G];for(la in G){v=z;O=G[la];var Ea=m,L=O.a,za=L[0],Ra=L[1],Ka=L[2],L=fg(L);if(!(L in v.c)){var za=od(v.g.Ha(za),v.l),kb=O.Sa(v),cb=kb.style;cb.maxWidth="none";var Rc=void 0,sc=void 0;0<Ea?(Rc=
Kg("DIV"),sc=Rc.style,sc.overflow="hidden",sc.width=za[0]+"px",sc.height=za[1]+"px",cb.position="absolute",cb.left=-Ea+"px",cb.top=-Ea+"px",cb.width=za[0]+2*Ea+"px",cb.height=za[1]+2*Ea+"px",Rc.appendChild(kb)):(cb.width=za[0]+"px",cb.height=za[1]+"px",Rc=kb,sc=cb);sc.position="absolute";sc.left=(Ra-v.b[1])*za[0]+"px";sc.top=(v.b[2]-Ka)*za[1]+"px";v.a||(v.a=document.createDocumentFragment());v.a.appendChild(Rc);v.c[L]=O}}z.a&&(z.target.appendChild(z.a),z.a=null)}m=Object.keys(this.b).map(Number);
ob(m);K=Dd();la=0;for(B=m.length;la<B;++la)if(G=m[la],z=this.b[G],G in t)if(v=z.$(),I=z.Ca(),ik(K,b.size[0]/2,b.size[1]/2,v/e.resolution,v/e.resolution,e.rotation,(I[0]-q[0])/v,(q[1]-I[1])/v),z.setTransform(K),G in x){for(--G;0<=G;--G)if(G in this.b){I=this.b[G].target;I.parentNode&&I.parentNode.insertBefore(z.target,I.nextSibling);break}0>G&&Ng(this.target,z.target,0)}else{if(!b.viewHints[0]&&!b.viewHints[1]){O=Fh(z.g,r,z.b[0],A);G=[];v=I=void 0;for(v in z.c)I=z.c[v],O.contains(I.a)||G.push(I);Ea=
O=void 0;O=0;for(Ea=G.length;O<Ea;++O)I=G[O],v=fg(I.a),Og(I.Sa(z)),delete z.c[v]}}else Og(z.target),delete this.b[G];c.opacity!=this.B&&(this.B=this.target.style.opacity=c.opacity);c.visible&&!this.f&&(ih(this.target,!0),this.f=!0);rk(b.usedTiles,h,n,p);tk(b,h,k,d,f,r,n,g.a());ok(b,h);qk(b,h);return!0};
function iq(b,c){this.target=Kg("DIV");this.target.style.position="absolute";this.target.style.width="100%";this.target.style.height="100%";this.g=b;this.b=c;this.j=he(b.Aa(c));this.i=b.$(c[0]);this.c={};this.a=null;this.f=Fd();this.l=[0,0]}iq.prototype.Ca=function(){return this.j};iq.prototype.$=function(){return this.i};iq.prototype.setTransform=function(b){jk(b,this.f)||(Ti(this.target,b),Gd(this.f,b))};function jq(b){this.i=Pi();var c=this.i.canvas;c.style.maxWidth="none";c.style.position="absolute";fq.call(this,b,c);this.f=!1;this.C=-1;this.A=NaN;this.B=Od();this.b=this.u=null;this.G=Dd();this.D=Dd()}y(jq,fq);
jq.prototype.l=function(b,c){var d=b.viewState,e=d.center,f=d.rotation,g=d.resolution,d=b.pixelRatio,h=b.size[0],k=b.size[1],m=h*d,n=k*d,e=ik(this.G,d*h/2,d*k/2,d/g,-d/g,-f,-e[0],-e[1]),g=this.i;g.canvas.width=m;g.canvas.height=n;h=ik(this.D,0,0,1/d,1/d,0,-(m-h)/2*d,-(n-k)/2*d);Ti(g.canvas,h);kq(this,"precompose",b,e);(h=this.b)&&!h.Ka()&&(g.globalAlpha=c.opacity,h.b(g,d,e,f,c.rb?b.skippedFeatureUids:{}),kq(this,"render",b,e));kq(this,"postcompose",b,e)};
function kq(b,c,d,e){var f=b.i;b=b.a;ed(b,c)&&(e=new jm(f,d.pixelRatio,d.extent,e,d.viewState.rotation),b.o(new dk(c,b,e,d,f,null)),wm(e))}jq.prototype.Za=function(b,c,d,e){if(this.b){var f=c.viewState.resolution,g=c.viewState.rotation,h=this.a,k=c.layerStates[w(h)],m={};return this.b.f(b,f,g,k.rb?c.skippedFeatureUids:{},function(b){var c=w(b).toString();if(!(c in m))return m[c]=!0,d.call(e,b,h)})}};jq.prototype.S=function(){mk(this)};
jq.prototype.j=function(b){function c(b){var c,e=b.Qb();e?c=e.call(b,m):(e=d.b)&&(c=e(b,m));if(c){if(c){var f,g=!1,e=0;for(f=c.length;e<f;++e)g=Ym(p,b,c[e],Xm(m,n),this.S,this)||g;b=g}else b=!1;this.f=this.f||b}}var d=this.a,e=d.fa();pk(b.attributions,e.j);qk(b,e);var f=b.viewHints[0],g=b.viewHints[1],h=d.i,k=d.l;if(!this.f&&!h&&f||!k&&g)return!0;var g=b.extent,h=b.viewState,f=h.projection,m=h.resolution,n=b.pixelRatio;b=d.c;k=d.a;h=im(d);void 0===h&&(h=Wm);g=Sd(g,k*m);if(!this.f&&this.A==m&&this.C==
b&&this.u==h&&Xd(this.B,g))return!0;uc(this.b);this.b=null;this.f=!1;var p=new Rm(.5*m/n,g,m,d.a);e.Mc(g,m,f);if(h){var q=[];e.ob(g,function(b){q.push(b)},this);ob(q,h);q.forEach(c,this)}else e.ob(g,c,this);Sm(p);this.A=m;this.C=b;this.u=h;this.B=g;this.b=p;return!0};function lq(b,c){Ak.call(this,0,c);this.b=Pi();var d=this.b.canvas;d.style.position="absolute";d.style.width="100%";d.style.height="100%";d.className="ol-unselectable";Ng(b,d,0);this.g=Dd();this.a=Kg("DIV");this.a.className="ol-unselectable";d=this.a.style;d.position="absolute";d.width="100%";d.height="100%";C(this.a,"touchstart",xc);Ng(b,this.a,0);this.c=!0}y(lq,Ak);lq.prototype.X=function(){Og(this.a);lq.da.X.call(this)};
lq.prototype.gf=function(b){if(b instanceof Sl)b=new gq(b);else if(b instanceof F)b=new hq(b);else if(b instanceof H)b=new jq(b);else return null;return b};function mq(b,c,d){var e=b.j;if(ed(e,c)){var f=d.extent,g=d.pixelRatio,h=d.viewState,k=h.rotation,m=b.b,n=m.canvas;ik(b.g,n.width/2,n.height/2,g/h.resolution,-g/h.resolution,-h.rotation,-h.center[0],-h.center[1]);b=new jm(m,g,f,b.g,k);e.o(new dk(c,e,b,d,m,null));wm(b)}}lq.prototype.V=function(){return"dom"};
lq.prototype.Me=function(b){if(b){var c=this.j;if(ed(c,"precompose")||ed(c,"postcompose")){var c=this.b.canvas,d=b.pixelRatio;c.width=b.size[0]*d;c.height=b.size[1]*d}mq(this,"precompose",b);c=b.layerStatesArray;qb(c);var d=b.viewState.resolution,e,f,g,h;e=0;for(f=c.length;e<f;++e)h=c[e],g=h.layer,g=Dk(this,g),Ng(this.a,g.target,e),fk(h,d)&&"ready"==h.S?g.j(b,h)&&g.l(b,h):g.g();var c=b.layerStates,k;for(k in this.f)k in c||(g=this.f[k],Og(g.target));this.c||(ih(this.a,!0),this.c=!0);Bk(b);Ek(this,
b);b.postRenderFunctions.push(Ck);mq(this,"postcompose",b)}else this.c&&(ih(this.a,!1),this.c=!1)};function nq(b){this.a=b}function oq(b){this.a=b}y(oq,nq);oq.prototype.V=function(){return 35632};function pq(b){this.a=b}y(pq,nq);pq.prototype.V=function(){return 35633};function qq(){this.a="precision mediump float;varying vec2 a;varying float b;uniform float k;uniform sampler2D l;void main(void){vec4 texColor=texture2D(l,a);gl_FragColor.rgb=texColor.rgb;float alpha=texColor.a*b*k;if(alpha==0.0){discard;}gl_FragColor.a=alpha;}"}y(qq,oq);ea(qq);
function rq(){this.a="varying vec2 a;varying float b;attribute vec2 c;attribute vec2 d;attribute vec2 e;attribute float f;attribute float g;uniform mat4 h;uniform mat4 i;uniform mat4 j;void main(void){mat4 offsetMatrix=i;if(g==1.0){offsetMatrix=i*j;}vec4 offsets=offsetMatrix*vec4(e,0.,0.);gl_Position=h*vec4(c,0.,1.)+offsets;a=d;b=f;}"}y(rq,pq);ea(rq);
function sq(b,c){this.l=b.getUniformLocation(c,"j");this.B=b.getUniformLocation(c,"i");this.j=b.getUniformLocation(c,"k");this.i=b.getUniformLocation(c,"h");this.a=b.getAttribLocation(c,"e");this.c=b.getAttribLocation(c,"f");this.f=b.getAttribLocation(c,"c");this.b=b.getAttribLocation(c,"g");this.g=b.getAttribLocation(c,"d")};function tq(b){this.a=void 0!==b?b:[]};function uq(b,c){this.u=b;this.a=c;this.c={};this.j={};this.g={};this.l=this.B=this.f=this.i=null;(this.b=vb(va,"OES_element_index_uint"))&&c.getExtension("OES_element_index_uint");C(this.u,"webglcontextlost",this.Hn,!1,this);C(this.u,"webglcontextrestored",this.In,!1,this)}
function vq(b,c,d){var e=b.a,f=d.a,g=w(d);if(g in b.c)e.bindBuffer(c,b.c[g].buffer);else{var h=e.createBuffer();e.bindBuffer(c,h);var k;34962==c?k=new Float32Array(f):34963==c&&(k=b.b?new Uint32Array(f):new Uint16Array(f));e.bufferData(c,k,35044);b.c[g]={Eb:d,buffer:h}}}function wq(b,c){var d=b.a,e=w(c),f=b.c[e];d.isContextLost()||d.deleteBuffer(f.buffer);delete b.c[e]}l=uq.prototype;
l.X=function(){var b=this.a;b.isContextLost()||(Ib(this.c,function(c){b.deleteBuffer(c.buffer)}),Ib(this.g,function(c){b.deleteProgram(c)}),Ib(this.j,function(c){b.deleteShader(c)}),b.deleteFramebuffer(this.f),b.deleteRenderbuffer(this.l),b.deleteTexture(this.B))};l.Gn=function(){return this.a};
function xq(b){if(!b.f){var c=b.a,d=c.createFramebuffer();c.bindFramebuffer(c.FRAMEBUFFER,d);var e=yq(c,1,1),f=c.createRenderbuffer();c.bindRenderbuffer(c.RENDERBUFFER,f);c.renderbufferStorage(c.RENDERBUFFER,c.DEPTH_COMPONENT16,1,1);c.framebufferTexture2D(c.FRAMEBUFFER,c.COLOR_ATTACHMENT0,c.TEXTURE_2D,e,0);c.framebufferRenderbuffer(c.FRAMEBUFFER,c.DEPTH_ATTACHMENT,c.RENDERBUFFER,f);c.bindTexture(c.TEXTURE_2D,null);c.bindRenderbuffer(c.RENDERBUFFER,null);c.bindFramebuffer(c.FRAMEBUFFER,null);b.f=d;
b.B=e;b.l=f}return b.f}function zq(b,c){var d=w(c);if(d in b.j)return b.j[d];var e=b.a,f=e.createShader(c.V());e.shaderSource(f,c.a);e.compileShader(f);return b.j[d]=f}function Aq(b,c,d){var e=w(c)+"/"+w(d);if(e in b.g)return b.g[e];var f=b.a,g=f.createProgram();f.attachShader(g,zq(b,c));f.attachShader(g,zq(b,d));f.linkProgram(g);return b.g[e]=g}l.Hn=function(){Rb(this.c);Rb(this.j);Rb(this.g);this.l=this.B=this.f=this.i=null};l.In=function(){};
l.Ge=function(b){if(b==this.i)return!1;this.a.useProgram(b);this.i=b;return!0};function Bq(b,c,d){var e=b.createTexture();b.bindTexture(b.TEXTURE_2D,e);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MAG_FILTER,b.LINEAR);b.texParameteri(b.TEXTURE_2D,b.TEXTURE_MIN_FILTER,b.LINEAR);void 0!==c&&b.texParameteri(3553,10242,c);void 0!==d&&b.texParameteri(3553,10243,d);return e}function yq(b,c,d){var e=Bq(b,void 0,void 0);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,c,d,0,b.RGBA,b.UNSIGNED_BYTE,null);return e}
function Cq(b,c){var d=Bq(b,33071,33071);b.texImage2D(b.TEXTURE_2D,0,b.RGBA,b.RGBA,b.UNSIGNED_BYTE,c);return d};function Dq(b,c){this.G=this.D=void 0;this.B=me(c);this.C=[];this.j=[];this.oa=void 0;this.g=[];this.f=[];this.U=this.S=void 0;this.c=[];this.ia=this.l=null;this.T=void 0;this.fb=Fd();this.Cb=Fd();this.ea=this.Z=void 0;this.Db=Fd();this.va=this.eb=this.ga=void 0;this.xa=[];this.i=[];this.a=[];this.A=null;this.b=[];this.u=[];this.pa=void 0}y(Dq,ck);
function Eq(b,c){var d=b.A,e=b.l,f=b.xa,g=b.i,h=c.a;return function(){if(!h.isContextLost()){var b,m;b=0;for(m=f.length;b<m;++b)h.deleteTexture(f[b]);b=0;for(m=g.length;b<m;++b)h.deleteTexture(g[b])}wq(c,d);wq(c,e)}}
function Fq(b,c,d,e){var f=b.D,g=b.G,h=b.oa,k=b.S,m=b.U,n=b.T,p=b.Z,q=b.ea,r=b.ga?1:0,t=b.eb,x=b.va,z=b.pa,B=Math.cos(t),t=Math.sin(t),A=b.c.length,v=b.a.length,O,K,I,G,la,Ea;for(O=0;O<d;O+=e)la=c[O]-b.B[0],Ea=c[O+1]-b.B[1],K=v/8,I=-x*f,G=-x*(h-g),b.a[v++]=la,b.a[v++]=Ea,b.a[v++]=I*B-G*t,b.a[v++]=I*t+G*B,b.a[v++]=p/m,b.a[v++]=(q+h)/k,b.a[v++]=n,b.a[v++]=r,I=x*(z-f),G=-x*(h-g),b.a[v++]=la,b.a[v++]=Ea,b.a[v++]=I*B-G*t,b.a[v++]=I*t+G*B,b.a[v++]=(p+z)/m,b.a[v++]=(q+h)/k,b.a[v++]=n,b.a[v++]=r,I=x*(z-f),
G=x*g,b.a[v++]=la,b.a[v++]=Ea,b.a[v++]=I*B-G*t,b.a[v++]=I*t+G*B,b.a[v++]=(p+z)/m,b.a[v++]=q/k,b.a[v++]=n,b.a[v++]=r,I=-x*f,G=x*g,b.a[v++]=la,b.a[v++]=Ea,b.a[v++]=I*B-G*t,b.a[v++]=I*t+G*B,b.a[v++]=p/m,b.a[v++]=q/k,b.a[v++]=n,b.a[v++]=r,b.c[A++]=K,b.c[A++]=K+1,b.c[A++]=K+2,b.c[A++]=K,b.c[A++]=K+2,b.c[A++]=K+3}Dq.prototype.Fb=function(b,c){this.b.push(this.c.length);this.u.push(c);var d=b.ja(),e=b.ra();Fq(this,d,d.length,e)};
Dq.prototype.Gb=function(b,c){this.b.push(this.c.length);this.u.push(c);var d=b.ja(),e=b.ra();Fq(this,d,d.length,e)};function Gq(b,c){var d=c.a;b.C.push(b.c.length);b.j.push(b.c.length);b.A=new tq(b.a);vq(c,34962,b.A);b.l=new tq(b.c);vq(c,34963,b.l);var e={};Hq(b.xa,b.g,e,d);Hq(b.i,b.f,e,d);b.D=void 0;b.G=void 0;b.oa=void 0;b.g=null;b.f=null;b.S=void 0;b.U=void 0;b.c=null;b.T=void 0;b.Z=void 0;b.ea=void 0;b.ga=void 0;b.eb=void 0;b.va=void 0;b.a=null;b.pa=void 0}
function Hq(b,c,d,e){var f,g,h,k=c.length;for(h=0;h<k;++h)f=c[h],g=w(f).toString(),g in d?f=d[g]:(f=Cq(e,f),d[g]=f),b[h]=f}
function Iq(b,c,d,e,f,g,h,k,m,n,p){var q=c.a;vq(c,34962,b.A);vq(c,34963,b.l);var r=qq.Yb(),t=rq.Yb(),t=Aq(c,r,t);b.ia?r=b.ia:(r=new sq(q,t),b.ia=r);c.Ge(t);q.enableVertexAttribArray(r.f);q.vertexAttribPointer(r.f,2,5126,!1,32,0);q.enableVertexAttribArray(r.a);q.vertexAttribPointer(r.a,2,5126,!1,32,8);q.enableVertexAttribArray(r.g);q.vertexAttribPointer(r.g,2,5126,!1,32,16);q.enableVertexAttribArray(r.c);q.vertexAttribPointer(r.c,1,5126,!1,32,24);q.enableVertexAttribArray(r.b);q.vertexAttribPointer(r.b,
1,5126,!1,32,28);t=b.Db;ik(t,0,0,2/(e*g[0]),2/(e*g[1]),-f,-(d[0]-b.B[0]),-(d[1]-b.B[1]));d=b.Cb;e=2/g[0];g=2/g[1];Hd(d);d[0]=e;d[5]=g;d[10]=1;d[15]=1;g=b.fb;Hd(g);0!==f&&Md(g,-f);q.uniformMatrix4fv(r.i,!1,t);q.uniformMatrix4fv(r.B,!1,d);q.uniformMatrix4fv(r.l,!1,g);q.uniform1f(r.j,h);var x;if(void 0===m)Jq(b,q,c,k,b.xa,b.C);else{if(n)a:{f=c.b?5125:5123;c=c.b?4:2;g=b.b.length-1;for(h=b.i.length-1;0<=h;--h)for(q.bindTexture(3553,b.i[h]),n=0<h?b.j[h-1]:0,t=b.j[h];0<=g&&b.b[g]>=n;){x=b.b[g];d=b.u[g];
e=w(d).toString();if(void 0===k[e]&&d.W()&&(void 0===p||pe(p,d.W().J()))&&(q.clear(q.COLOR_BUFFER_BIT|q.DEPTH_BUFFER_BIT),q.drawElements(4,t-x,f,x*c),t=m(d))){b=t;break a}t=x;g--}b=void 0}else q.clear(q.COLOR_BUFFER_BIT|q.DEPTH_BUFFER_BIT),Jq(b,q,c,k,b.i,b.j),b=(b=m(null))?b:void 0;x=b}q.disableVertexAttribArray(r.f);q.disableVertexAttribArray(r.a);q.disableVertexAttribArray(r.g);q.disableVertexAttribArray(r.c);q.disableVertexAttribArray(r.b);return x}
function Jq(b,c,d,e,f,g){var h=d.b?5125:5123;d=d.b?4:2;if(Qb(e)){var k;b=0;e=f.length;for(k=0;b<e;++b){c.bindTexture(3553,f[b]);var m=g[b];c.drawElements(4,m-k,h,k*d);k=m}}else{k=0;var n,m=0;for(n=f.length;m<n;++m){c.bindTexture(3553,f[m]);for(var p=0<m?g[m-1]:0,q=g[m],r=p;k<b.b.length&&b.b[k]<=q;){var t=w(b.u[k]).toString();void 0!==e[t]?(r!==p&&c.drawElements(4,p-r,h,r*d),p=r=k===b.b.length-1?q:b.b[k+1]):p=k===b.b.length-1?q:b.b[k+1];k++}r!==p&&c.drawElements(4,p-r,h,r*d)}}}
Dq.prototype.vb=function(b){var c=b.Xb(),d=b.fc(1),e=b.qd(),f=b.ze(1),g=b.A,h=b.Ca(),k=b.D,m=b.u,n=b.Bb();b=b.i;var p;0===this.g.length?this.g.push(d):(p=this.g[this.g.length-1],w(p)!=w(d)&&(this.C.push(this.c.length),this.g.push(d)));0===this.f.length?this.f.push(f):(p=this.f[this.f.length-1],w(p)!=w(f)&&(this.j.push(this.c.length),this.f.push(f)));this.D=c[0];this.G=c[1];this.oa=n[1];this.S=e[1];this.U=e[0];this.T=g;this.Z=h[0];this.ea=h[1];this.eb=m;this.ga=k;this.va=b;this.pa=n[0]};
function Kq(b,c,d){this.j=c;this.i=b;this.g=d;this.c={}}function Lq(b,c){var d=[],e;for(e in b.c)d.push(Eq(b.c[e],c));return ye.apply(null,d)}function Mq(b,c){for(var d in b.c)Gq(b.c[d],c)}Kq.prototype.a=function(b,c){var d=this.c[c];void 0===d&&(d=new Nq[c](this.i,this.j),this.c[c]=d);return d};Kq.prototype.Ka=function(){return Qb(this.c)};Kq.prototype.b=function(b,c,d,e,f,g,h,k){var m,n;g=0;for(m=Cm.length;g<m;++g)n=this.c[Cm[g]],void 0!==n&&Iq(n,b,c,d,e,f,h,k,void 0,!1)};
function Oq(b,c,d,e,f,g,h,k,m,n){var p=Pq,q,r;for(q=Cm.length-1;0<=q;--q)if(r=b.c[Cm[q]],void 0!==r&&(r=Iq(r,c,d,e,f,p,g,h,k,m,n)))return r}Kq.prototype.f=function(b,c,d,e,f,g,h,k,m,n){var p=c.a;p.bindFramebuffer(p.FRAMEBUFFER,xq(c));var q;void 0!==this.g&&(q=Sd(Zd(b),e*this.g));return Oq(this,c,b,e,f,k,m,function(b){var c=new Uint8Array(4);p.readPixels(0,0,1,1,p.RGBA,p.UNSIGNED_BYTE,c);if(0<c[3]&&(b=n(b)))return b},!0,q)};
function Qq(b,c,d,e,f,g,h){var k=d.a;k.bindFramebuffer(k.FRAMEBUFFER,xq(d));return void 0!==Oq(b,d,c,e,f,g,h,function(){var b=new Uint8Array(4);k.readPixels(0,0,1,1,k.RGBA,k.UNSIGNED_BYTE,b);return 0<b[3]},!1)}var Nq={Image:Dq},Pq=[1,1];function Rq(b,c,d,e,f,g){this.c=b;this.g=c;this.f=g;this.l=f;this.i=e;this.j=d;this.b=null;this.a={}}y(Rq,ck);l=Rq.prototype;l.ld=function(b,c){var d=b.toString(),e=this.a[d];void 0!==e?e.push(c):this.a[d]=[c]};l.Fc=function(){};l.hf=function(b,c){var d=(0,c.g)(b);if(d&&pe(this.f,d.J())){var e=c.a;void 0===e&&(e=0);this.ld(e,function(b){b.$a(c.j,c.f);b.vb(c.b);b.ab(c.c);var e=Sq[d.V()];e&&e.call(b,d,null)})}};
l.Xd=function(b,c){var d=b.f,e,f;e=0;for(f=d.length;e<f;++e){var g=d[e],h=Sq[g.V()];h&&h.call(this,g,c)}};l.Gb=function(b,c){var d=this.c,e=(new Kq(1,this.f)).a(0,"Image");e.vb(this.b);e.Gb(b,c);Gq(e,d);Iq(e,this.c,this.g,this.j,this.i,this.l,1,{},void 0,!1);Eq(e,d)()};l.Wb=function(){};l.Gc=function(){};l.Fb=function(b,c){var d=this.c,e=(new Kq(1,this.f)).a(0,"Image");e.vb(this.b);e.Fb(b,c);Gq(e,d);Iq(e,this.c,this.g,this.j,this.i,this.l,1,{},void 0,!1);Eq(e,d)()};l.Hc=function(){};l.Ic=function(){};
l.Hb=function(){};l.$a=function(){};l.vb=function(b){this.b=b};l.ab=function(){};var Sq={Point:Rq.prototype.Gb,MultiPoint:Rq.prototype.Fb,GeometryCollection:Rq.prototype.Xd};function Tq(){this.a="precision mediump float;varying vec2 a;uniform float f;uniform sampler2D g;void main(void){vec4 texColor=texture2D(g,a);gl_FragColor.rgb=texColor.rgb;gl_FragColor.a=texColor.a*f;}"}y(Tq,oq);ea(Tq);function Uq(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform mat4 d;uniform mat4 e;void main(void){gl_Position=e*vec4(b,0.,1.);a=(d*vec4(c,0.,1.)).st;}"}y(Uq,pq);ea(Uq);
function Vq(b,c){this.b=b.getUniformLocation(c,"f");this.f=b.getUniformLocation(c,"e");this.j=b.getUniformLocation(c,"d");this.g=b.getUniformLocation(c,"g");this.a=b.getAttribLocation(c,"b");this.c=b.getAttribLocation(c,"c")};function Wq(b,c){lk.call(this,c);this.b=b;this.U=new tq([-1,-1,0,0,1,-1,1,0,-1,1,0,1,1,1,1,1]);this.g=this.lb=null;this.j=void 0;this.B=Dd();this.A=Fd();this.u=null}y(Wq,lk);
function Xq(b,c,d){var e=b.b.b;if(void 0===b.j||b.j!=d){c.postRenderFunctions.push(sa(function(b,c,d){b.isContextLost()||(b.deleteFramebuffer(c),b.deleteTexture(d))},e,b.g,b.lb));c=yq(e,d,d);var f=e.createFramebuffer();e.bindFramebuffer(36160,f);e.framebufferTexture2D(36160,36064,3553,c,0);b.lb=c;b.g=f;b.j=d}else e.bindFramebuffer(36160,b.g)}
Wq.prototype.lh=function(b,c,d){Yq(this,"precompose",d,b);vq(d,34962,this.U);var e=d.a,f=Tq.Yb(),g=Uq.Yb(),f=Aq(d,f,g);this.u?g=this.u:this.u=g=new Vq(e,f);d.Ge(f)&&(e.enableVertexAttribArray(g.a),e.vertexAttribPointer(g.a,2,5126,!1,16,0),e.enableVertexAttribArray(g.c),e.vertexAttribPointer(g.c,2,5126,!1,16,8),e.uniform1i(g.g,0));e.uniformMatrix4fv(g.j,!1,this.B);e.uniformMatrix4fv(g.f,!1,this.A);e.uniform1f(g.b,c.opacity);e.bindTexture(3553,this.lb);e.drawArrays(5,0,4);Yq(this,"postcompose",d,b)};
function Yq(b,c,d,e){b=b.a;if(ed(b,c)){var f=e.viewState;b.o(new dk(c,b,new Rq(d,f.center,f.resolution,f.rotation,e.size,e.extent),e,null,d))}}Wq.prototype.Bf=function(){this.g=this.lb=null;this.j=void 0};function Zq(b,c){Wq.call(this,b,c);this.l=this.i=this.f=null}y(Zq,Wq);function $q(b,c){var d=c.a();return Cq(b.b.b,d)}Zq.prototype.Za=function(b,c,d,e){var f=this.a;return f.fa().xe(b,c.viewState.resolution,c.viewState.rotation,c.skippedFeatureUids,function(b){return d.call(e,b,f)})};
Zq.prototype.Cf=function(b,c){var d=this.b.b,e=b.pixelRatio,f=b.viewState,g=f.center,h=f.resolution,k=f.rotation,m=this.f,n=this.lb,p=this.a.fa(),q=b.viewHints,r=b.extent;void 0!==c.extent&&(r=oe(r,c.extent));q[0]||q[1]||je(r)||(f=p.C(r,h,e,f.projection))&&nk(this,f)&&(m=f,n=$q(this,f),this.lb&&b.postRenderFunctions.push(sa(function(b,c){b.isContextLost()||b.deleteTexture(c)},d,this.lb)));m&&(d=this.b.g.u,ar(this,d.width,d.height,e,g,h,k,m.J()),this.l=null,e=this.B,Hd(e),Ld(e,1,-1),Kd(e,0,-1),this.f=
m,this.lb=n,pk(b.attributions,m.j),qk(b,p));return!0};function ar(b,c,d,e,f,g,h,k){c*=g;d*=g;b=b.A;Hd(b);Ld(b,2*e/c,2*e/d);Md(b,-h);Kd(b,k[0]-f[0],k[1]-f[1]);Ld(b,(k[2]-k[0])/2,(k[3]-k[1])/2);Kd(b,1,1)}Zq.prototype.we=function(b,c){return void 0!==this.Za(b,c,ue,this)};
Zq.prototype.sc=function(b,c,d,e){if(this.f&&this.f.a())if(this.a.fa()instanceof Op){if(b=b.slice(),kk(c.pixelToCoordinateMatrix,b,b),this.Za(b,c,ue,this))return d.call(e,this.a)}else{var f=[this.f.a().width,this.f.a().height];if(!this.l){var g=c.size;c=Dd();Hd(c);Kd(c,-1,-1);Ld(c,2/g[0],2/g[1]);Kd(c,0,g[1]);Ld(c,1,-1);g=Dd();Jd(this.A,g);var h=Dd();Hd(h);Kd(h,0,f[1]);Ld(h,1,-1);Ld(h,f[0]/2,f[1]/2);Kd(h,1,1);var k=Dd();Id(h,g,k);Id(k,c,k);this.l=k}c=[0,0];kk(this.l,b,c);if(!(0>c[0]||c[0]>f[0]||0>
c[1]||c[1]>f[1])&&(this.i||(this.i=Pi(1,1)),this.i.clearRect(0,0,1,1),this.i.drawImage(this.f.a(),c[0],c[1],1,1,0,0,1,1),0<this.i.getImageData(0,0,1,1).data[3]))return d.call(e,this.a)}};function br(){this.a="precision mediump float;varying vec2 a;uniform sampler2D e;void main(void){gl_FragColor=texture2D(e,a);}"}y(br,oq);ea(br);function cr(){this.a="varying vec2 a;attribute vec2 b;attribute vec2 c;uniform vec4 d;void main(void){gl_Position=vec4(b*d.xy+d.zw,0.,1.);a=c;}"}y(cr,pq);ea(cr);function dr(b,c){this.b=b.getUniformLocation(c,"e");this.f=b.getUniformLocation(c,"d");this.a=b.getAttribLocation(c,"b");this.c=b.getAttribLocation(c,"c")};function er(b,c){Wq.call(this,b,c);this.G=br.Yb();this.T=cr.Yb();this.f=null;this.D=new tq([0,0,0,1,1,0,1,1,0,1,0,0,1,1,1,0]);this.C=this.i=null;this.l=-1;this.S=[0,0]}y(er,Wq);l=er.prototype;l.X=function(){wq(this.b.g,this.D);er.da.X.call(this)};l.bd=function(b,c,d){var e=this.b;return function(f,g){return Qh(b,c,f,g,function(b){var c=sh(e.c,b.tb());c&&(d[f]||(d[f]={}),d[f][b.a.toString()]=b);return c})}};l.Bf=function(){er.da.Bf.call(this);this.f=null};
l.Cf=function(b,c,d){var e=this.b,f=d.a,g=b.viewState,h=g.projection,k=this.a,m=k.fa(),n=m.hb(h),p=Kh(n,g.resolution),q=n.$(p),r=m.Pb(p,b.pixelRatio,h),t=r[0]/od(n.Ha(p),this.S)[0],x=q/t,z=m.$d(),B=g.center,A;q==g.resolution?(B=sk(B,q,b.size),A=ne(B,q,g.rotation,b.size)):A=b.extent;q=Hh(n,A,q);if(this.i&&ig(this.i,q)&&this.l==m.c)x=this.C;else{var v=[kg(q),jg(q)],O=Math.pow(2,Math.ceil(Math.log(Math.max(v[0]*r[0],v[1]*r[1]))/Math.LN2)),v=x*O,K=n.Ca(p),I=K[0]+q.a*r[0]*x,x=K[1]+q.c*r[1]*x,x=[I,x,I+
v,x+v];Xq(this,b,O);f.viewport(0,0,O,O);f.clearColor(0,0,0,0);f.clear(16384);f.disable(3042);O=Aq(d,this.G,this.T);d.Ge(O);this.f||(this.f=new dr(f,O));vq(d,34962,this.D);f.enableVertexAttribArray(this.f.a);f.vertexAttribPointer(this.f.a,2,5126,!1,16,0);f.enableVertexAttribArray(this.f.c);f.vertexAttribPointer(this.f.c,2,5126,!1,16,8);f.uniform1i(this.f.b,0);d={};d[p]={};var G=this.bd(m,h,d),la=k.b(),O=!0,I=Od(),Ea=new gg(0,0,0,0),L,za,Ra;for(za=q.a;za<=q.f;++za)for(Ra=q.c;Ra<=q.b;++Ra){K=m.Ob(p,
za,Ra,t,h);if(void 0!==c.extent&&(L=n.Aa(K.a,I),!pe(L,c.extent)))continue;L=K.state;if(2==L){if(sh(e.c,K.tb())){d[p][fg(K.a)]=K;continue}}else if(4==L||3==L&&!la)continue;O=!1;L=Eh(n,K.a,G,Ea,I);L||(K=Gh(n,K.a,Ea,I))&&G(p+1,K)}c=Object.keys(d).map(Number);ob(c);for(var G=new Float32Array(4),Ka,kb,cb,la=0,Ea=c.length;la<Ea;++la)for(Ka in kb=d[c[la]],kb)K=kb[Ka],L=n.Aa(K.a,I),za=2*(L[2]-L[0])/v,Ra=2*(L[3]-L[1])/v,cb=2*(L[0]-x[0])/v-1,L=2*(L[1]-x[1])/v-1,Cd(G,za,Ra,cb,L),f.uniform4fv(this.f.f,G),fr(e,
K,r,z*t),f.drawArrays(5,0,4);O?(this.i=q,this.C=x,this.l=m.c):(this.C=this.i=null,this.l=-1,b.animate=!0)}rk(b.usedTiles,m,p,q);var Rc=e.l;tk(b,m,n,t,h,A,p,k.a(),function(b){var c;(c=2!=b.state||sh(e.c,b.tb()))||(c=b.tb()in Rc.b);c||uk(Rc,[b,Jh(n,b.a),n.$(b.a[0]),r,z*t])},this);ok(b,m);qk(b,m);f=this.B;Hd(f);Kd(f,(B[0]-x[0])/(x[2]-x[0]),(B[1]-x[1])/(x[3]-x[1]));0!==g.rotation&&Md(f,g.rotation);Ld(f,b.size[0]*g.resolution/(x[2]-x[0]),b.size[1]*g.resolution/(x[3]-x[1]));Kd(f,-.5,-.5);return!0};
l.sc=function(b,c,d,e){if(this.g){var f=[0,0];kk(this.B,[b[0]/c.size[0],(c.size[1]-b[1])/c.size[1]],f);b=[f[0]*this.j,f[1]*this.j];c=this.b.g.a;c.bindFramebuffer(c.FRAMEBUFFER,this.g);f=new Uint8Array(4);c.readPixels(b[0],b[1],1,1,c.RGBA,c.UNSIGNED_BYTE,f);if(0<f[3])return d.call(e,this.a)}};function gr(b,c){Wq.call(this,b,c);this.l=!1;this.S=-1;this.G=NaN;this.C=Od();this.i=this.f=this.D=null}y(gr,Wq);l=gr.prototype;l.lh=function(b,c,d){this.i=c;var e=b.viewState,f=this.f;f&&!f.Ka()&&f.b(d,e.center,e.resolution,e.rotation,b.size,b.pixelRatio,c.opacity,c.rb?b.skippedFeatureUids:{})};l.X=function(){var b=this.f;b&&(Lq(b,this.b.g)(),this.f=null);gr.da.X.call(this)};
l.Za=function(b,c,d,e){if(this.f&&this.i){var f=c.viewState,g=this.a,h=this.i,k={};return this.f.f(b,this.b.g,f.center,f.resolution,f.rotation,c.size,c.pixelRatio,h.opacity,h.rb?c.skippedFeatureUids:{},function(b){var c=w(b).toString();if(!(c in k))return k[c]=!0,d.call(e,b,g)})}};l.we=function(b,c){if(this.f&&this.i){var d=c.viewState;return Qq(this.f,b,this.b.g,d.resolution,d.rotation,this.i.opacity,c.skippedFeatureUids)}return!1};
l.sc=function(b,c,d,e){b=b.slice();kk(c.pixelToCoordinateMatrix,b,b);if(this.we(b,c))return d.call(e,this.a)};l.Cm=function(){mk(this)};
l.Cf=function(b,c,d){function e(b){var c,d=b.Qb();d?c=d.call(b,n):(d=f.b)&&(c=d(b,n));if(c){if(c){var e,g=!1,d=0;for(e=c.length;d<e;++d)g=Ym(r,b,c[d],Xm(n,p),this.Cm,this)||g;b=g}else b=!1;this.l=this.l||b}}var f=this.a;c=f.fa();pk(b.attributions,c.j);qk(b,c);var g=b.viewHints[0],h=b.viewHints[1],k=f.i,m=f.l;if(!this.l&&!k&&g||!m&&h)return!0;var h=b.extent,k=b.viewState,g=k.projection,n=k.resolution,p=b.pixelRatio,k=f.c,q=f.a,m=im(f);void 0===m&&(m=Wm);h=Sd(h,q*n);if(!this.l&&this.G==n&&this.S==k&&
this.D==m&&Xd(this.C,h))return!0;this.f&&b.postRenderFunctions.push(Lq(this.f,d));this.l=!1;var r=new Kq(.5*n/p,h,f.a);c.Mc(h,n,g);if(m){var t=[];c.ob(h,function(b){t.push(b)},this);ob(t,m);t.forEach(e,this)}else c.ob(h,e,this);Mq(r,d);this.G=n;this.S=k;this.D=m;this.C=h;this.f=r;return!0};function hr(b,c){Ak.call(this,0,c);this.a=Kg("CANVAS");this.a.style.width="100%";this.a.style.height="100%";this.a.className="ol-unselectable";Ng(b,this.a,0);this.C=this.D=0;this.G=Pi();this.B=!0;this.b=Vi(this.a,{antialias:!0,depth:!1,failIfMajorPerformanceCaveat:!0,preserveDrawingBuffer:!1,stencil:!0});this.g=new uq(this.a,this.b);C(this.a,"webglcontextlost",this.Am,!1,this);C(this.a,"webglcontextrestored",this.Bm,!1,this);this.c=new rh;this.A=null;this.l=new Fk(ra(function(b){var c=b[1];b=b[2];
var f=c[0]-this.A[0],c=c[1]-this.A[1];return 65536*Math.log(b)+Math.sqrt(f*f+c*c)/b},this),function(b){return b[0].tb()});this.S=ra(function(){if(!this.l.Ka()){Jk(this.l);var b=Gk(this.l);fr(this,b[0],b[3],b[4])}},this);this.i=0;ir(this)}y(hr,Ak);
function fr(b,c,d,e){var f=b.b,g=c.tb();if(sh(b.c,g))b=b.c.get(g),f.bindTexture(3553,b.lb),9729!=b.Qg&&(f.texParameteri(3553,10240,9729),b.Qg=9729),9729!=b.Rg&&(f.texParameteri(3553,10240,9729),b.Rg=9729);else{var h=f.createTexture();f.bindTexture(3553,h);if(0<e){var k=b.G.canvas,m=b.G;b.D!==d[0]||b.C!==d[1]?(k.width=d[0],k.height=d[1],b.D=d[0],b.C=d[1]):m.clearRect(0,0,d[0],d[1]);m.drawImage(c.Sa(),e,e,d[0],d[1],0,0,d[0],d[1]);f.texImage2D(3553,0,6408,6408,5121,k)}else f.texImage2D(3553,0,6408,6408,
5121,c.Sa());f.texParameteri(3553,10240,9729);f.texParameteri(3553,10241,9729);f.texParameteri(3553,10242,33071);f.texParameteri(3553,10243,33071);b.c.set(g,{lb:h,Qg:9729,Rg:9729})}}l=hr.prototype;l.gf=function(b){return b instanceof Sl?new Zq(this,b):b instanceof F?new er(this,b):b instanceof H?new gr(this,b):null};
function jr(b,c,d){var e=b.j;if(ed(e,c)){var f=b.g;b=d.viewState;b=new Rq(f,b.center,b.resolution,b.rotation,d.size,d.extent);e.o(new dk(c,e,b,d,null,f));c=Object.keys(b.a).map(Number);ob(c);var g,h;d=0;for(e=c.length;d<e;++d)for(f=b.a[c[d].toString()],g=0,h=f.length;g<h;++g)f[g](b)}}l.X=function(){var b=this.b;b.isContextLost()||this.c.forEach(function(c){c&&b.deleteTexture(c.lb)});uc(this.g);hr.da.X.call(this)};
l.tj=function(b,c){for(var d=this.b,e;1024<this.c.nc()-this.i;){if(e=this.c.a.zc)d.deleteTexture(e.lb);else if(+this.c.a.ne==c.index)break;else--this.i;this.c.pop()}};l.V=function(){return"webgl"};l.Am=function(b){b.preventDefault();this.c.clear();this.i=0;Ib(this.f,function(b){b.Bf()})};l.Bm=function(){ir(this);this.j.render()};function ir(b){b=b.b;b.activeTexture(33984);b.blendFuncSeparate(770,771,1,771);b.disable(2884);b.disable(2929);b.disable(3089);b.disable(2960)}
l.Me=function(b){var c=this.g,d=this.b;if(d.isContextLost())return!1;if(!b)return this.B&&(ih(this.a,!1),this.B=!1),!1;this.A=b.focus;this.c.set((-b.index).toString(),null);++this.i;jr(this,"precompose",b);var e=[],f=b.layerStatesArray;qb(f);var g=b.viewState.resolution,h,k,m,n;h=0;for(k=f.length;h<k;++h)n=f[h],fk(n,g)&&"ready"==n.S&&(m=Dk(this,n.layer),m.Cf(b,n,c)&&e.push(n));f=b.size[0]*b.pixelRatio;g=b.size[1]*b.pixelRatio;if(this.a.width!=f||this.a.height!=g)this.a.width=f,this.a.height=g;d.bindFramebuffer(36160,
null);d.clearColor(0,0,0,0);d.clear(16384);d.enable(3042);d.viewport(0,0,this.a.width,this.a.height);h=0;for(k=e.length;h<k;++h)n=e[h],m=Dk(this,n.layer),m.lh(b,n,c);this.B||(ih(this.a,!0),this.B=!0);Bk(b);1024<this.c.nc()-this.i&&b.postRenderFunctions.push(ra(this.tj,this));this.l.Ka()||(b.postRenderFunctions.push(this.S),b.animate=!0);jr(this,"postcompose",b);Ek(this,b);b.postRenderFunctions.push(Ck)};
l.Af=function(b,c,d,e,f,g){var h;if(this.b.isContextLost())return!1;var k=c.viewState,m=c.layerStatesArray,n;for(n=m.length-1;0<=n;--n){h=m[n];var p=h.layer;if(fk(h,k.resolution)&&f.call(g,p)&&(h=Dk(this,p).Za(b,c,d,e)))return h}};l.kh=function(b,c,d,e){var f=!1;if(this.b.isContextLost())return!1;var g=c.viewState,h=c.layerStatesArray,k;for(k=h.length-1;0<=k;--k){var m=h[k],n=m.layer;if(fk(m,g.resolution)&&d.call(e,n)&&(f=Dk(this,n).we(b,c)))return!0}return f};
l.jh=function(b,c,d,e,f){if(this.b.isContextLost())return!1;var g=c.viewState,h,k=c.layerStatesArray,m;for(m=k.length-1;0<=m;--m){h=k[m];var n=h.layer;if(fk(h,g.resolution)&&f.call(e,n)&&(h=Dk(this,n).sc(b,c,d,e)))return h}};var kr=["canvas","webgl","dom"];
function S(b){id.call(this);var c=lr(b);this.Ac=void 0!==b.loadTilesWhileAnimating?b.loadTilesWhileAnimating:!1;this.Bc=void 0!==b.loadTilesWhileInteracting?b.loadTilesWhileInteracting:!1;this.We=void 0!==b.pixelRatio?b.pixelRatio:Xi;this.Xc=c.logos;this.u=new ii(this.Eo,void 0,this);tc(this,this.u);this.Cb=Dd();this.Xe=Dd();this.Db=0;this.b=null;this.xa=Od();this.C=this.U=null;this.a=Hg("DIV","ol-viewport");this.a.style.position="relative";this.a.style.overflow="hidden";this.a.style.width="100%";
this.a.style.height="100%";this.a.style.msTouchAction="none";this.a.style.touchAction="none";bj&&Wg(this.a,"ol-touch");this.G=Hg("DIV","ol-overlaycontainer");this.a.appendChild(this.G);this.D=Hg("DIV","ol-overlaycontainer-stopevent");C(this.D,["click","dblclick","mousedown","touchstart","MSPointerDown",Wj,ac?"DOMMouseScroll":"mousewheel"],wc);this.a.appendChild(this.D);b=new Oj(this);C(b,Lb(Zj),this.Ig,!1,this);tc(this,b);this.ga=c.keyboardEventTarget;this.A=new Ai;C(this.A,"key",this.Hg,!1,this);
tc(this,this.A);b=new Ii(this.a);C(b,"mousewheel",this.Hg,!1,this);tc(this,b);this.g=c.controls;this.f=c.interactions;this.j=c.overlays;this.Z={};this.i=new c.Go(this.a,this);tc(this,this.i);this.fb=new vi;tc(this,this.fb);this.T=this.l=null;this.S=[];this.pa=[];this.va=new Kk(ra(this.lk,this),ra(this.Vk,this));this.ea={};C(this,kd("layergroup"),this.Ak,!1,this);C(this,kd("view"),this.Wk,!1,this);C(this,kd("size"),this.Sk,!1,this);C(this,kd("target"),this.Uk,!1,this);this.I(c.values);this.g.forEach(function(b){b.setMap(this)},
this);C(this.g,"add",function(b){b.element.setMap(this)},!1,this);C(this.g,"remove",function(b){b.element.setMap(null)},!1,this);this.f.forEach(function(b){b.setMap(this)},this);C(this.f,"add",function(b){b.element.setMap(this)},!1,this);C(this.f,"remove",function(b){b.element.setMap(null)},!1,this);this.j.forEach(this.lg,this);C(this.j,"add",function(b){this.lg(b.element)},!1,this);C(this.j,"remove",function(b){var c=b.element.Na();void 0!==c&&delete this.Z[c.toString()];b.element.setMap(null)},
!1,this)}y(S,id);l=S.prototype;l.hj=function(b){this.g.push(b)};l.ij=function(b){this.f.push(b)};l.jg=function(b){this.oc().Pc().push(b)};l.kg=function(b){this.j.push(b)};l.lg=function(b){var c=b.Na();void 0!==c&&(this.Z[c.toString()]=b);b.setMap(this)};l.Ma=function(b){this.render();Array.prototype.push.apply(this.S,arguments)};l.X=function(){Og(this.a);S.da.X.call(this)};l.od=function(b,c,d,e,f){if(this.b)return b=this.Fa(b),this.i.Af(b,this.b,c,void 0!==d?d:null,void 0!==e?e:ue,void 0!==f?f:null)};
l.Fl=function(b,c,d,e,f){if(this.b)return this.i.jh(b,this.b,c,void 0!==d?d:null,void 0!==e?e:ue,void 0!==f?f:null)};l.Yk=function(b,c,d){if(!this.b)return!1;b=this.Fa(b);return this.i.kh(b,this.b,void 0!==c?c:ue,void 0!==d?d:null)};l.Ij=function(b){return this.Fa(this.Zd(b))};l.Zd=function(b){var c;c=this.a;b=fh(b);c=fh(c);c=new yg(b.x-c.x,b.y-c.y);return[c.x,c.y]};l.wf=function(){return this.get("target")};l.Lc=function(){var b=this.wf();return void 0!==b?Dg(b):null};
l.Fa=function(b){var c=this.b;return c?(b=b.slice(),kk(c.pixelToCoordinateMatrix,b,b)):null};l.Gj=function(){return this.g};l.$j=function(){return this.j};l.Zj=function(b){b=this.Z[b.toString()];return void 0!==b?b:null};l.Nj=function(){return this.f};l.oc=function(){return this.get("layergroup")};l.Xg=function(){return this.oc().Pc()};l.Oa=function(b){var c=this.b;return c?(b=b.slice(0,2),kk(c.coordinateToPixelMatrix,b,b)):null};l.Ra=function(){return this.get("size")};l.aa=function(){return this.get("view")};
l.nk=function(){return this.a};l.lk=function(b,c,d,e){var f=this.b;if(!(f&&c in f.wantedTiles&&f.wantedTiles[c][fg(b.a)]))return Infinity;b=d[0]-f.focus[0];d=d[1]-f.focus[1];return 65536*Math.log(e)+Math.sqrt(b*b+d*d)/e};l.Hg=function(b,c){var d=new Mj(c||b.type,this,b);this.Ig(d)};l.Ig=function(b){if(this.b){this.T=b.coordinate;b.frameState=this.b;var c=this.f.a,d;if(!1!==this.o(b))for(d=c.length-1;0<=d;d--){var e=c[d];if(e.b()&&!e.handleEvent(b))break}}};
l.Qk=function(){var b=this.b,c=this.va;if(!c.Ka()){var d=16,e=d,f=0;b&&(f=b.viewHints,f[0]&&(d=this.Ac?8:0,e=2),f[1]&&(d=this.Bc?8:0,e=2),f=Kb(b.wantedTiles));d*=f;e*=f;c.f<d&&(Jk(c),Lk(c,d,e))}c=this.pa;d=0;for(e=c.length;d<e;++d)c[d](this,b);c.length=0};l.Sk=function(){this.render()};l.Uk=function(){var b=this.Lc();Hi(this.A);b?(b.appendChild(this.a),Bi(this.A,this.ga?this.ga:b),this.l||(this.l=C(this.fb,"resize",this.Uc,!1,this))):(Og(this.a),this.l&&(Zc(this.l),this.l=null));this.Uc()};l.Vk=function(){this.render()};
l.Xk=function(){this.render()};l.Wk=function(){this.U&&(Zc(this.U),this.U=null);var b=this.aa();b&&(this.U=C(b,"propertychange",this.Xk,!1,this));this.render()};l.Bk=function(){this.render()};l.Ck=function(){this.render()};l.Ak=function(){this.C&&(this.C.forEach(Zc),this.C=null);var b=this.oc();b&&(this.C=[C(b,"propertychange",this.Ck,!1,this),C(b,"change",this.Bk,!1,this)]);this.render()};l.Fo=function(){var b=this.u;ji(b);b.f()};l.render=function(){null!=this.u.wa||this.u.start()};l.yo=function(b){return this.g.remove(b)};
l.zo=function(b){return this.f.remove(b)};l.Bo=function(b){return this.oc().Pc().remove(b)};l.Co=function(b){return this.j.remove(b)};
l.Eo=function(b){var c,d,e,f=this.Ra(),g=this.aa(),h=null;if(void 0!==f&&0<f[0]&&0<f[1]&&g&&Sf(g)){var h=g.b.slice(),k=this.oc().nf(),m={};c=0;for(d=k.length;c<d;++c)m[w(k[c].layer)]=k[c];e=Rf(g);h={animate:!1,attributions:{},coordinateToPixelMatrix:this.Cb,extent:null,focus:this.T?this.T:e.center,index:this.Db++,layerStates:m,layerStatesArray:k,logos:Ub(this.Xc),pixelRatio:this.We,pixelToCoordinateMatrix:this.Xe,postRenderFunctions:[],size:f,skippedFeatureUids:this.ea,tileQueue:this.va,time:b,usedTiles:{},
viewState:e,viewHints:h,wantedTiles:{}}}if(h){b=this.S;c=f=0;for(d=b.length;c<d;++c)g=b[c],g(this,h)&&(b[f++]=g);b.length=f;h.extent=ne(e.center,e.resolution,e.rotation,h.size)}this.b=h;this.i.Me(h);h&&(h.animate&&this.render(),Array.prototype.push.apply(this.pa,h.postRenderFunctions),0!==this.S.length||h.viewHints[0]||h.viewHints[1]||be(h.extent,this.xa)||(this.o(new ph("moveend",this,h)),Td(h.extent,this.xa)));this.o(new ph("postrender",this,h));ni(this.Qk,this)};
l.Xh=function(b){this.set("layergroup",b)};l.Uf=function(b){this.set("size",b)};l.Gl=function(b){this.set("target",b)};l.To=function(b){this.set("view",b)};l.fi=function(b){b=w(b).toString();this.ea[b]=!0;this.render()};
l.Uc=function(){var b=this.Lc();if(b){var c=Cg(b),d=Zb&&b.currentStyle;d&&Sg(Ag(c))&&"auto"!=d.width&&"auto"!=d.height&&!d.boxSizing?(c=jh(b,d.width,"width","pixelWidth"),b=jh(b,d.height,"height","pixelHeight"),b=new zg(c,b)):(d=new zg(b.offsetWidth,b.offsetHeight),c=lh(b,"padding"),b=oh(b),b=new zg(d.width-b.left-c.left-c.right-b.right,d.height-b.top-c.top-c.bottom-b.bottom));this.Uf([b.width,b.height])}else this.Uf(void 0)};l.ii=function(b){b=w(b).toString();delete this.ea[b];this.render()};
function lr(b){var c=null;void 0!==b.keyboardEventTarget&&(c=ia(b.keyboardEventTarget)?document.getElementById(b.keyboardEventTarget):b.keyboardEventTarget);var d={},e={};if(void 0===b.logo||"boolean"==typeof b.logo&&b.logo)e["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAAAHGAAABxgEXwfpGAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAhNQTFRF////AP//AICAgP//AFVVQECA////K1VVSbbbYL/fJ05idsTYJFtbbcjbJllmZszWWMTOIFhoHlNiZszTa9DdUcHNHlNlV8XRIVdiasrUHlZjIVZjaMnVH1RlIFRkH1RkH1ZlasvYasvXVsPQH1VkacnVa8vWIVZjIFRjVMPQa8rXIVVkXsXRsNveIFVkIFZlIVVj3eDeh6GmbMvXH1ZkIFRka8rWbMvXIFVkIFVjIFVkbMvWH1VjbMvWIFVlbcvWIFVla8vVIFVkbMvWbMvVH1VkbMvWIFVlbcvWIFVkbcvVbMvWjNPbIFVkU8LPwMzNIFVkbczWIFVkbsvWbMvXIFVkRnB8bcvW2+TkW8XRIFVkIlZlJVloJlpoKlxrLl9tMmJwOWd0Omh1RXF8TneCT3iDUHiDU8LPVMLPVcLPVcPQVsPPVsPQV8PQWMTQWsTQW8TQXMXSXsXRX4SNX8bSYMfTYcfTYsfTY8jUZcfSZsnUaIqTacrVasrVa8jTa8rWbI2VbMvWbcvWdJObdcvUdszUd8vVeJaee87Yfc3WgJyjhqGnitDYjaarldPZnrK2oNbborW5o9bbo9fbpLa6q9ndrL3ArtndscDDutzfu8fJwN7gwt7gxc/QyuHhy+HizeHi0NfX0+Pj19zb1+Tj2uXk29/e3uLg3+Lh3+bl4uXj4ufl4+fl5Ofl5ufl5ujm5+jmySDnBAAAAFp0Uk5TAAECAgMEBAYHCA0NDg4UGRogIiMmKSssLzU7PkJJT1JTVFliY2hrdHZ3foSFhYeJjY2QkpugqbG1tre5w8zQ09XY3uXn6+zx8vT09vf4+Pj5+fr6/P39/f3+gz7SsAAAAVVJREFUOMtjYKA7EBDnwCPLrObS1BRiLoJLnte6CQy8FLHLCzs2QUG4FjZ5GbcmBDDjxJBXDWxCBrb8aM4zbkIDzpLYnAcE9VXlJSWlZRU13koIeW57mGx5XjoMZEUqwxWYQaQbSzLSkYGfKFSe0QMsX5WbjgY0YS4MBplemI4BdGBW+DQ11eZiymfqQuXZIjqwyadPNoSZ4L+0FVM6e+oGI6g8a9iKNT3o8kVzNkzRg5lgl7p4wyRUL9Yt2jAxVh6mQCogae6GmflI8p0r13VFWTHBQ0rWPW7ahgWVcPm+9cuLoyy4kCJDzCm6d8PSFoh0zvQNC5OjDJhQopPPJqph1doJBUD5tnkbZiUEqaCnB3bTqLTFG1bPn71kw4b+GFdpLElKIzRxxgYgWNYc5SCENVHKeUaltHdXx0dZ8uBI1hJ2UUDgq82CM2MwKeibqAvSO7MCABq0wXEPiqWEAAAAAElFTkSuQmCC"]=
"http://openlayers.org/";else{var f=b.logo;ia(f)?e[f]="":ma(f)&&(e[f.src]=f.href)}f=b.layers instanceof Kl?b.layers:new Kl({layers:b.layers});d.layergroup=f;d.target=b.target;d.view=void 0!==b.view?b.view:new Of;var f=Ak,g;void 0!==b.renderer?ga(b.renderer)?g=b.renderer:ia(b.renderer)&&(g=[b.renderer]):g=kr;var h,k;h=0;for(k=g.length;h<k;++h){var m=g[h];if("canvas"==m){if(Zi){f=dq;break}}else if("dom"==m){f=lq;break}else if("webgl"==m&&Wi){f=hr;break}}var n;void 0!==b.controls?n=ga(b.controls)?new og(b.controls.slice()):
b.controls:n=Zh();var p;void 0!==b.interactions?p=ga(b.interactions)?new og(b.interactions.slice()):b.interactions:p=Jl();b=void 0!==b.overlays?ga(b.overlays)?new og(b.overlays.slice()):b.overlays:new og;return{controls:n,interactions:p,keyboardEventTarget:c,logos:e,overlays:b,Go:f,values:d}}Rl();function mr(b){id.call(this);this.wa=b.id;this.i=void 0!==b.insertFirst?b.insertFirst:!0;this.l=void 0!==b.stopEvent?b.stopEvent:!0;this.b=Hg("DIV",{"class":"ol-overlay-container"});this.b.style.position="absolute";this.autoPan=void 0!==b.autoPan?b.autoPan:!1;this.g=void 0!==b.autoPanAnimation?b.autoPanAnimation:{};this.j=void 0!==b.autoPanMargin?b.autoPanMargin:20;this.a={Td:"",oe:"",Ne:"",Oe:"",visible:!0};this.f=null;C(this,kd("element"),this.wk,!1,this);C(this,kd("map"),this.Hk,!1,this);C(this,
kd("offset"),this.Mk,!1,this);C(this,kd("position"),this.Ok,!1,this);C(this,kd("positioning"),this.Pk,!1,this);void 0!==b.element&&this.Uh(b.element);this.Zh(void 0!==b.offset?b.offset:[0,0]);this.bi(void 0!==b.positioning?b.positioning:"top-left");void 0!==b.position&&this.xf(b.position)}y(mr,id);l=mr.prototype;l.re=function(){return this.get("element")};l.Na=function(){return this.wa};l.se=function(){return this.get("map")};l.Eg=function(){return this.get("offset")};l.Yg=function(){return this.get("position")};
l.Fg=function(){return this.get("positioning")};l.wk=function(){Mg(this.b);var b=this.re();b&&Lg(this.b,b)};l.Hk=function(){this.f&&(Og(this.b),Zc(this.f),this.f=null);var b=this.se();b&&(this.f=C(b,"postrender",this.render,!1,this),nr(this),b=this.l?b.D:b.G,this.i?Ng(b,this.b,0):Lg(b,this.b))};l.render=function(){nr(this)};l.Mk=function(){nr(this)};
l.Ok=function(){nr(this);if(void 0!==this.get("position")&&this.autoPan){var b=this.se();if(void 0!==b&&b.Lc()){var c=or(b.Lc(),b.Ra()),d=this.re(),e=d.offsetWidth,f=d.currentStyle||window.getComputedStyle(d),e=e+(parseInt(f.marginLeft,10)+parseInt(f.marginRight,10)),f=d.offsetHeight,g=d.currentStyle||window.getComputedStyle(d),f=f+(parseInt(g.marginTop,10)+parseInt(g.marginBottom,10)),h=or(d,[e,f]),d=this.j;Xd(c,h)||(e=h[0]-c[0],f=c[2]-h[2],g=h[1]-c[1],h=c[3]-h[3],c=[0,0],0>e?c[0]=e-d:0>f&&(c[0]=
Math.abs(f)+d),0>g?c[1]=g-d:0>h&&(c[1]=Math.abs(h)+d),0===c[0]&&0===c[1])||(d=b.aa().Ta(),e=b.Oa(d),c=[e[0]+c[0],e[1]+c[1]],this.g&&(this.g.source=d,b.Ma(Zf(this.g))),b.aa().jb(b.Fa(c)))}}};l.Pk=function(){nr(this)};l.Uh=function(b){this.set("element",b)};l.setMap=function(b){this.set("map",b)};l.Zh=function(b){this.set("offset",b)};l.xf=function(b){this.set("position",b)};
function or(b,c){var d=Cg(b),e=new yg(0,0),f;f=d?Cg(d):document;f=!Zb||9<=lc||Sg(Ag(f))?f.documentElement:f.body;b!=f&&(f=eh(b),d=Tg(Ag(d)),e.x=f.left+d.x,e.y=f.top+d.y);return[e.x,e.y,e.x+c[0],e.y+c[1]]}l.bi=function(b){this.set("positioning",b)};function pr(b,c){b.a.visible!==c&&(ih(b.b,c),b.a.visible=c)}
function nr(b){var c=b.se(),d=b.Yg();if(void 0!==c&&c.b&&void 0!==d){var d=c.Oa(d),e=c.Ra(),c=b.b.style,f=b.Eg(),g=b.Fg(),h=f[0],f=f[1];if("bottom-right"==g||"center-right"==g||"top-right"==g)""!==b.a.oe&&(b.a.oe=c.left=""),h=Math.round(e[0]-d[0]-h)+"px",b.a.Ne!=h&&(b.a.Ne=c.right=h);else{""!==b.a.Ne&&(b.a.Ne=c.right="");if("bottom-center"==g||"center-center"==g||"top-center"==g)h-=gh(b.b).width/2;h=Math.round(d[0]+h)+"px";b.a.oe!=h&&(b.a.oe=c.left=h)}if("bottom-left"==g||"bottom-center"==g||"bottom-right"==
g)""!==b.a.Oe&&(b.a.Oe=c.top=""),d=Math.round(e[1]-d[1]-f)+"px",b.a.Td!=d&&(b.a.Td=c.bottom=d);else{""!==b.a.Td&&(b.a.Td=c.bottom="");if("center-left"==g||"center-center"==g||"center-right"==g)f-=gh(b.b).height/2;d=Math.round(d[1]+f)+"px";b.a.Oe!=d&&(b.a.Oe=c.top=d)}pr(b,!0)}else pr(b,!1)};function qr(b){b=b?b:{};this.j=void 0!==b.collapsed?b.collapsed:!0;this.i=void 0!==b.collapsible?b.collapsible:!0;this.i||(this.j=!1);var c=b.className?b.className:"ol-overviewmap",d=b.tipLabel?b.tipLabel:"Overview map",e=b.collapseLabel?b.collapseLabel:"\u00ab";this.A=ia(e)?Hg("SPAN",{},e):e;e=b.label?b.label:"\u00bb";this.C=ia(e)?Hg("SPAN",{},e):e;d=Hg("BUTTON",{type:"button",title:d},this.i&&!this.j?this.A:this.C);C(d,"click",this.Rl,!1,this);var e=Hg("DIV","ol-overviewmap-map"),f=this.b=new S({controls:new og,
interactions:new og,target:e,view:b.view});b.layers&&b.layers.forEach(function(b){f.jg(b)},this);var g=Hg("DIV","ol-overviewmap-box");this.l=new mr({position:[0,0],positioning:"bottom-left",element:g});this.b.kg(this.l);c=Hg("DIV",c+" ol-unselectable ol-control"+(this.j&&this.i?" ol-collapsed":"")+(this.i?"":" ol-uncollapsible"),e,d);qh.call(this,{element:c,render:b.render?b.render:rr,target:b.target})}y(qr,qh);l=qr.prototype;
l.setMap=function(b){var c=this.a;b!==c&&(c&&(c=c.aa())&&Yc(c,kd("rotation"),this.ie,!1,this),qr.da.setMap.call(this,b),b&&(this.u.push(C(b,"propertychange",this.Ik,!1,this)),0===this.b.Xg().$b()&&this.b.Xh(b.oc()),b=b.aa()))&&(C(b,kd("rotation"),this.ie,!1,this),Sf(b)&&(this.b.Uc(),sr(this)))};l.Ik=function(b){"view"===b.key&&((b=b.oldValue)&&Yc(b,kd("rotation"),this.ie,!1,this),b=this.a.aa(),C(b,kd("rotation"),this.ie,!1,this))};l.ie=function(){this.b.aa().te(this.a.aa().Ea())};
function rr(){var b=this.a,c=this.b;if(b.b&&c.b){var d=b.Ra(),b=b.aa().Zc(d),e=c.Ra(),d=c.aa().Zc(e),f=c.Oa(he(b)),c=c.Oa(fe(b)),c=new zg(Math.abs(f[0]-c[0]),Math.abs(f[1]-c[1])),f=e[0],e=e[1];c.width<.1*f||c.height<.1*e||c.width>.75*f||c.height>.75*e?sr(this):Xd(d,b)||(b=this.b,d=this.a.aa(),b.aa().jb(d.Ta()))}tr(this)}function sr(b){var c=b.a;b=b.b;var d=c.Ra(),c=c.aa().Zc(d),d=b.Ra();b=b.aa();qe(c,1/(.1*Math.pow(2,Math.log(7.5)/Math.LN2/2)));b.jf(c,d)}
function tr(b){var c=b.a,d=b.b;if(c.b&&d.b){var e=c.Ra(),f=c.aa(),g=d.aa();d.Ra();var c=f.Ea(),h=b.l,d=b.l.re(),f=f.Zc(e),e=g.$(),g=ee(f),f=ge(f),k;if(b=b.a.aa().Ta())k=[g[0]-b[0],g[1]-b[1]],wd(k,c),rd(k,b);h.xf(k);d&&(k=new zg(Math.abs((g[0]-f[0])/e),Math.abs((f[1]-g[1])/e)),c=Sg(Ag(Cg(d))),!Zb||jc("10")||c&&jc("8")?(d=d.style,ac?d.MozBoxSizing="border-box":bc?d.WebkitBoxSizing="border-box":d.boxSizing="border-box",d.width=Math.max(k.width,0)+"px",d.height=Math.max(k.height,0)+"px"):(b=d.style,c?
(c=lh(d,"padding"),d=oh(d),b.pixelWidth=k.width-d.left-c.left-c.right-d.right,b.pixelHeight=k.height-d.top-c.top-c.bottom-d.bottom):(b.pixelWidth=k.width,b.pixelHeight=k.height)))}}l.Rl=function(b){b.preventDefault();ur(this)};function ur(b){Yg(b.element,"ol-collapsed");b.j?Pg(b.A,b.C):Pg(b.C,b.A);b.j=!b.j;var c=b.b;b.j||c.b||(c.Uc(),sr(b),Xc(c,"postrender",function(){tr(this)},!1,b))}l.Ql=function(){return this.i};
l.Tl=function(b){this.i!==b&&(this.i=b,Yg(this.element,"ol-uncollapsible"),!b&&this.j&&ur(this))};l.Sl=function(b){this.i&&this.j!==b&&ur(this)};l.Pl=function(){return this.j};l.ak=function(){return this.b};function vr(b){b=b?b:{};var c=b.className?b.className:"ol-scale-line";this.l=Hg("DIV",c+"-inner");this.i=Hg("DIV",c+" ol-unselectable",this.l);this.C=null;this.A=void 0!==b.minWidth?b.minWidth:64;this.b=!1;this.S=void 0;this.D="";this.j=null;qh.call(this,{element:this.i,render:b.render?b.render:wr,target:b.target});C(this,kd("units"),this.Z,!1,this);this.T(b.units||"metric")}y(vr,qh);var xr=[1,2,5];vr.prototype.G=function(){return this.get("units")};
function wr(b){(b=b.frameState)?this.C=b.viewState:this.C=null;yr(this)}vr.prototype.Z=function(){yr(this)};vr.prototype.T=function(b){this.set("units",b)};
function yr(b){var c=b.C;if(c){var d=c.center,e=c.projection,c=e.getPointResolution(c.resolution,d),f=e.c,g=b.G();"degrees"!=f||"metric"!=g&&"imperial"!=g&&"us"!=g&&"nautical"!=g?"degrees"!=f&&"degrees"==g?(b.j||(b.j=Je(e,Fe("EPSG:4326"))),d=Math.cos(Wa(b.j(d)[1])),e=Be.radius,e/=Ce[f],c*=180/(Math.PI*d*e)):b.j=null:(b.j=null,d=Math.cos(Wa(d[1])),c*=Math.PI*d*Be.radius/180);d=b.A*c;f="";"degrees"==g?d<1/60?(f="\u2033",c*=3600):1>d?(f="\u2032",c*=60):f="\u00b0":"imperial"==g?.9144>d?(f="in",c/=.0254):
1609.344>d?(f="ft",c/=.3048):(f="mi",c/=1609.344):"nautical"==g?(c/=1852,f="nm"):"metric"==g?1>d?(f="mm",c*=1E3):1E3>d?f="m":(f="km",c/=1E3):"us"==g&&(.9144>d?(f="in",c*=39.37):1609.344>d?(f="ft",c/=.30480061):(f="mi",c/=1609.3472));for(d=3*Math.floor(Math.log(b.A*c)/Math.log(10));;){e=xr[d%3]*Math.pow(10,Math.floor(d/3));g=Math.round(e/c);if(isNaN(g)){ih(b.i,!1);b.b=!1;return}if(g>=b.A)break;++d}c=e+" "+f;b.D!=c&&(b.l.innerHTML=c,b.D=c);b.S!=g&&(b.l.style.width=g+"px",b.S=g);b.b||(ih(b.i,!0),b.b=
!0)}else b.b&&(ih(b.i,!1),b.b=!1)};function zr(b){pc.call(this);this.c=b;this.a={}}y(zr,pc);var Ar=[];zr.prototype.Qa=function(b,c,d,e){ga(c)||(c&&(Ar[0]=c.toString()),c=Ar);for(var f=0;f<c.length;f++){var g=C(b,c[f],d||this.handleEvent,e||!1,this.c||this);if(!g)break;this.a[g.key]=g}return this};
zr.prototype.Vf=function(b,c,d,e,f){if(ga(c))for(var g=0;g<c.length;g++)this.Vf(b,c[g],d,e,f);else d=d||this.handleEvent,f=f||this.c||this,d=Qc(d),e=!!e,c=Ec(b)?Lc(b.zb,String(c),d,e,f):b?(b=Tc(b))?Lc(b,c,d,e,f):null:null,c&&(Zc(c),delete this.a[c.key]);return this};function Br(b){Ib(b.a,function(b,d){this.a.hasOwnProperty(d)&&Zc(b)},b);b.a={}}zr.prototype.X=function(){zr.da.X.call(this);Br(this)};zr.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented");};function Cr(b,c,d){cd.call(this);this.target=b;this.handle=c||b;this.a=d||new $g(NaN,NaN,NaN,NaN);this.j=Cg(b);this.c=new zr(this);tc(this,this.c);this.g=this.f=this.B=this.l=this.screenY=this.screenX=this.clientY=this.clientX=0;this.b=!1;C(this.handle,["touchstart","mousedown"],this.gi,!1,this)}y(Cr,cd);var Dr=Zb||ac&&jc("1.9.3");l=Cr.prototype;
l.X=function(){Cr.da.X.call(this);Yc(this.handle,["touchstart","mousedown"],this.gi,!1,this);Br(this.c);Dr&&this.j.releaseCapture();this.handle=this.target=null};
l.gi=function(b){var c="mousedown"==b.type;if(this.b||c&&!Cc(b))this.o("earlycancel");else if(this.o(new Er("start",this,b.clientX,b.clientY))){this.b=!0;b.preventDefault();var c=this.j,d=c.documentElement,e=!Dr;this.c.Qa(c,["touchmove","mousemove"],this.Lk,e);this.c.Qa(c,["touchend","mouseup"],this.Yd,e);Dr?(d.setCapture(!1),this.c.Qa(d,"losecapture",this.Yd)):this.c.Qa(c?c.parentWindow||c.defaultView:window,"blur",this.Yd);this.u&&this.c.Qa(this.u,"scroll",this.Nn,e);this.clientX=this.l=b.clientX;
this.clientY=this.B=b.clientY;this.screenX=b.screenX;this.screenY=b.screenY;this.f=this.target.offsetLeft;this.g=this.target.offsetTop;this.i=Tg(Ag(this.j))}};l.Yd=function(b){Br(this.c);Dr&&this.j.releaseCapture();this.b?(this.b=!1,this.o(new Er("end",this,b.clientX,b.clientY,0,Fr(this,this.f),Gr(this,this.g)))):this.o("earlycancel")};
l.Lk=function(b){var c=1*(b.clientX-this.clientX),d=b.clientY-this.clientY;this.clientX=b.clientX;this.clientY=b.clientY;this.screenX=b.screenX;this.screenY=b.screenY;if(!this.b){var e=this.l-this.clientX,f=this.B-this.clientY;if(0<e*e+f*f)if(this.o(new Er("start",this,b.clientX,b.clientY)))this.b=!0;else{this.ia||this.Yd(b);return}}d=Hr(this,c,d);c=d.x;d=d.y;this.b&&this.o(new Er("beforedrag",this,b.clientX,b.clientY,0,c,d))&&(Ir(this,b,c,d),b.preventDefault())};
function Hr(b,c,d){var e=Tg(Ag(b.j));c+=e.x-b.i.x;d+=e.y-b.i.y;b.i=e;b.f+=c;b.g+=d;return new yg(Fr(b,b.f),Gr(b,b.g))}l.Nn=function(b){var c=Hr(this,0,0);b.clientX=this.clientX;b.clientY=this.clientY;Ir(this,b,c.x,c.y)};function Ir(b,c,d,e){b.target.style.left=d+"px";b.target.style.top=e+"px";b.o(new Er("drag",b,c.clientX,c.clientY,0,d,e))}function Fr(b,c){var d=b.a,e=isNaN(d.left)?null:d.left,d=isNaN(d.width)?0:d.width;return Math.min(null!=e?e+d:Infinity,Math.max(null!=e?e:-Infinity,c))}
function Gr(b,c){var d=b.a,e=isNaN(d.top)?null:d.top,d=isNaN(d.height)?0:d.height;return Math.min(null!=e?e+d:Infinity,Math.max(null!=e?e:-Infinity,c))}function Er(b,c,d,e,f,g,h){vc.call(this,b);this.clientX=d;this.clientY=e;this.left=ca(g)?g:c.f;this.top=ca(h)?h:c.g}y(Er,vc);function Jr(b){b=b?b:{};this.j=void 0;this.i=Kr;this.l=null;this.C=!1;this.A=b.duration?b.duration:200;var c=b.className?b.className:"ol-zoomslider",d=Hg("BUTTON",{type:"button","class":c+"-thumb ol-unselectable"}),c=Hg("DIV",[c,"ol-unselectable","ol-control"],d);this.b=new Cr(d);tc(this,this.b);C(this.b,"start",this.vk,!1,this);C(this.b,"drag",this.tk,!1,this);C(this.b,"end",this.uk,!1,this);C(c,"click",this.sk,!1,this);C(d,"click",wc);qh.call(this,{element:c,render:b.render?b.render:Lr})}y(Jr,qh);
var Kr=0;l=Jr.prototype;l.setMap=function(b){Jr.da.setMap.call(this,b);b&&b.render()};
function Lr(b){if(b.frameState){if(!this.C){var c=this.element,d=gh(c),e=Qg(c),c=lh(e,"margin"),f=new zg(e.offsetWidth,e.offsetHeight),e=f.width+c.right+c.left,c=f.height+c.top+c.bottom;this.l=[e,c];e=d.width-e;c=d.height-c;d.width>d.height?(this.i=1,d=new $g(0,0,e,0)):(this.i=Kr,d=new $g(0,0,0,c));this.b.a=d||new $g(NaN,NaN,NaN,NaN);this.C=!0}b=b.frameState.viewState.resolution;b!==this.j&&(this.j=b,b=1-Qf(this.a.aa())(b),d=this.b,c=Qg(this.element),1==this.i?ch(c,d.a.left+d.a.width*b):ch(c,d.a.left,
d.a.top+d.a.height*b))}}l.sk=function(b){var c=this.a,d=c.aa(),e=d.$();c.Ma(bg({resolution:e,duration:this.A,easing:Vf}));b=Mr(this,Nr(this,b.offsetX-this.l[0]/2,b.offsetY-this.l[1]/2));d.Ub(d.constrainResolution(b))};l.vk=function(){Tf(this.a.aa(),1)};l.tk=function(b){this.j=Mr(this,Nr(this,b.left,b.top));this.a.aa().Ub(this.j)};l.uk=function(){var b=this.a,c=b.aa();Tf(c,-1);b.Ma(bg({resolution:this.j,duration:this.A,easing:Vf}));b=c.constrainResolution(this.j);c.Ub(b)};
function Nr(b,c,d){var e=b.b.a;return Sa(1===b.i?(c-e.left)/e.width:(d-e.top)/e.height,0,1)}function Mr(b,c){return Pf(b.a.aa())(1-c)};function Or(b){b=b?b:{};this.b=b.extent?b.extent:null;var c=b.className?b.className:"ol-zoom-extent",d=Hg("BUTTON",{type:"button",title:b.tipLabel?b.tipLabel:"Fit to extent"},b.label?b.label:"E");C(d,"click",this.j,!1,this);c=Hg("DIV",c+" ol-unselectable ol-control",d);qh.call(this,{element:c,target:b.target})}y(Or,qh);Or.prototype.j=function(b){b.preventDefault();var c=this.a;b=c.aa();var d=this.b?this.b:b.g.J(),c=c.Ra();b.jf(d,c)};function Pr(b){id.call(this);b=b?b:{};this.a=null;C(this,kd("tracking"),this.ul,!1,this);this.uf(void 0!==b.tracking?b.tracking:!1)}y(Pr,id);l=Pr.prototype;l.X=function(){this.uf(!1);Pr.da.X.call(this)};
l.On=function(b){b=b.a;if(null!==b.alpha){var c=Wa(b.alpha);this.set("alpha",c);"boolean"==typeof b.absolute&&b.absolute?this.set("heading",c):ja(b.webkitCompassHeading)&&-1!=b.webkitCompassAccuracy&&this.set("heading",Wa(b.webkitCompassHeading))}null!==b.beta&&this.set("beta",Wa(b.beta));null!==b.gamma&&this.set("gamma",Wa(b.gamma));this.s()};l.Bj=function(){return this.get("alpha")};l.Ej=function(){return this.get("beta")};l.Kj=function(){return this.get("gamma")};l.tl=function(){return this.get("heading")};
l.Tg=function(){return this.get("tracking")};l.ul=function(){if($i){var b=this.Tg();b&&!this.a?this.a=C(ba,"deviceorientation",this.On,!1,this):!b&&this.a&&(Zc(this.a),this.a=null)}};l.uf=function(b){this.set("tracking",b)};function Qr(){this.defaultDataProjection=null}function Rr(b,c,d){var e;d&&(e={dataProjection:d.dataProjection?d.dataProjection:b.Ia(c),featureProjection:d.featureProjection});return Sr(b,e)}function Sr(b,c){var d;c&&(d={featureProjection:c.featureProjection,dataProjection:c.dataProjection?c.dataProjection:b.defaultDataProjection,rightHanded:c.rightHanded});return d}
function Tr(b,c,d){var e=d?Fe(d.featureProjection):null;d=d?Fe(d.dataProjection):null;return e&&d&&!Xe(e,d)?b instanceof bf?(c?b.clone():b).kb(c?e:d,c?d:e):af(c?b.slice():b,c?e:d,c?d:e):b};function Ur(){this.defaultDataProjection=null}y(Ur,Qr);function Vr(b){return ma(b)?b:ia(b)?(b=ao(b))?b:null:null}l=Ur.prototype;l.V=function(){return"json"};l.Tb=function(b,c){return this.Rc(Vr(b),Rr(this,b,c))};l.Ba=function(b,c){return this.Jf(Vr(b),Rr(this,b,c))};l.Sc=function(b,c){return this.Dh(Vr(b),Rr(this,b,c))};l.Ia=function(b){return this.Kh(Vr(b))};l.Jd=function(b,c){return bo(this.Vc(b,c))};l.Vb=function(b,c){return bo(this.Re(b,c))};l.Wc=function(b,c){return bo(this.Te(b,c))};function Wr(b,c,d,e,f){var g=NaN,h=NaN,k=(d-c)/e;if(0!==k)if(1==k)g=b[c],h=b[c+1];else if(2==k)g=.5*b[c]+.5*b[c+e],h=.5*b[c+1]+.5*b[c+e+1];else{var h=b[c],k=b[c+1],m=0,g=[0],n;for(n=c+e;n<d;n+=e){var p=b[n],q=b[n+1],m=m+Math.sqrt((p-h)*(p-h)+(q-k)*(q-k));g.push(m);h=p;k=q}d=.5*m;for(var r,h=pb,k=0,m=g.length;k<m;)n=k+m>>1,p=h(d,g[n]),0<p?k=n+1:(m=n,r=!p);r=r?k:~k;0>r?(d=(d-g[-r-2])/(g[-r-1]-g[-r-2]),c+=(-r-2)*e,g=qd(b[c],b[c+e],d),h=qd(b[c+1],b[c+e+1],d)):(g=b[c+r*e],h=b[c+r*e+1])}return f?(f[0]=
g,f[1]=h,f):[g,h]}function Xr(b,c,d,e,f,g){if(d==c)return null;if(f<b[c+e-1])return g?(d=b.slice(c,c+e),d[e-1]=f,d):null;if(b[d-1]<f)return g?(d=b.slice(d-e,d),d[e-1]=f,d):null;if(f==b[c+e-1])return b.slice(c,c+e);c/=e;for(d/=e;c<d;)g=c+d>>1,f<b[(g+1)*e-1]?d=g:c=g+1;d=b[c*e-1];if(f==d)return b.slice((c-1)*e,(c-1)*e+e);g=(f-d)/(b[(c+1)*e-1]-d);d=[];var h;for(h=0;h<e-1;++h)d.push(qd(b[(c-1)*e+h],b[c*e+h],g));d.push(f);return d}
function Yr(b,c,d,e,f,g){var h=0;if(g)return Xr(b,h,c[c.length-1],d,e,f);if(e<b[d-1])return f?(b=b.slice(0,d),b[d-1]=e,b):null;if(b[b.length-1]<e)return f?(b=b.slice(b.length-d),b[d-1]=e,b):null;f=0;for(g=c.length;f<g;++f){var k=c[f];if(h!=k){if(e<b[h+d-1])break;if(e<=b[k-1])return Xr(b,h,k,d,e,!1);h=k}}return null};function T(b,c){df.call(this);this.g=null;this.D=this.G=this.l=-1;this.ma(b,c)}y(T,df);l=T.prototype;l.jj=function(b){this.v?lb(this.v,b):this.v=b.slice();this.s()};l.clone=function(){var b=new T(null);b.ba(this.b,this.v.slice());return b};l.mb=function(b,c,d,e){if(e<Ud(this.J(),b,c))return e;this.D!=this.c&&(this.G=Math.sqrt(lf(this.v,0,this.v.length,this.a,0)),this.D=this.c);return nf(this.v,0,this.v.length,this.a,this.G,!1,b,c,d,e)};
l.yj=function(b,c){return Cf(this.v,0,this.v.length,this.a,b,c)};l.Wl=function(b,c){return"XYM"!=this.b&&"XYZM"!=this.b?null:Xr(this.v,0,this.v.length,this.a,b,void 0!==c?c:!1)};l.Y=function(){return sf(this.v,0,this.v.length,this.a)};l.Xl=function(){var b=this.v,c=this.a,d=b[0],e=b[1],f=0,g;for(g=0+c;g<this.v.length;g+=c)var h=b[g],k=b[g+1],f=f+Math.sqrt((h-d)*(h-d)+(k-e)*(k-e)),d=h,e=k;return f};function sm(b){b.l!=b.c&&(b.g=Wr(b.v,0,b.v.length,b.a,b.g),b.l=b.c);return b.g}
l.Kc=function(b){var c=[];c.length=uf(this.v,0,this.v.length,this.a,b,c,0);b=new T(null);b.ba("XY",c);return b};l.V=function(){return"LineString"};l.Da=function(b){return Df(this.v,0,this.v.length,this.a,b)};l.ma=function(b,c){b?(gf(this,c,b,1),this.v||(this.v=[]),this.v.length=qf(this.v,0,b,this.a),this.s()):this.ba("XY",null)};l.ba=function(b,c){ff(this,b,c);this.s()};function U(b,c){df.call(this);this.g=[];this.l=this.D=-1;this.ma(b,c)}y(U,df);l=U.prototype;l.kj=function(b){this.v?lb(this.v,b.ja().slice()):this.v=b.ja().slice();this.g.push(this.v.length);this.s()};l.clone=function(){var b=new U(null);b.ba(this.b,this.v.slice(),this.g.slice());return b};l.mb=function(b,c,d,e){if(e<Ud(this.J(),b,c))return e;this.l!=this.c&&(this.D=Math.sqrt(mf(this.v,0,this.g,this.a,0)),this.l=this.c);return of(this.v,0,this.g,this.a,this.D,!1,b,c,d,e)};
l.Zl=function(b,c,d){return"XYM"!=this.b&&"XYZM"!=this.b||0===this.v.length?null:Yr(this.v,this.g,this.a,b,void 0!==c?c:!1,void 0!==d?d:!1)};l.Y=function(){return tf(this.v,0,this.g,this.a)};l.Ab=function(){return this.g};l.Sj=function(b){if(0>b||this.g.length<=b)return null;var c=new T(null);c.ba(this.b,this.v.slice(0===b?0:this.g[b-1],this.g[b]));return c};
l.rd=function(){var b=this.v,c=this.g,d=this.b,e=[],f=0,g,h;g=0;for(h=c.length;g<h;++g){var k=c[g],m=new T(null);m.ba(d,b.slice(f,k));e.push(m);f=k}return e};function tm(b){var c=[],d=b.v,e=0,f=b.g;b=b.a;var g,h;g=0;for(h=f.length;g<h;++g){var k=f[g],e=Wr(d,e,k,b);lb(c,e);e=k}return c}l.Kc=function(b){var c=[],d=[],e=this.v,f=this.g,g=this.a,h=0,k=0,m,n;m=0;for(n=f.length;m<n;++m){var p=f[m],k=uf(e,h,p,g,b,c,k);d.push(k);h=p}c.length=k;b=new U(null);b.ba("XY",c,d);return b};l.V=function(){return"MultiLineString"};
l.Da=function(b){a:{var c=this.v,d=this.g,e=this.a,f=0,g,h;g=0;for(h=d.length;g<h;++g){if(Df(c,f,d[g],e,b)){b=!0;break a}f=d[g]}b=!1}return b};l.ma=function(b,c){if(b){gf(this,c,b,2);this.v||(this.v=[]);var d=rf(this.v,0,b,this.a,this.g);this.v.length=0===d.length?0:d[d.length-1];this.s()}else this.ba("XY",null,this.g)};l.ba=function(b,c,d){ff(this,b,c);this.g=d;this.s()};
function Zr(b,c){var d=b.b,e=[],f=[],g,h;g=0;for(h=c.length;g<h;++g){var k=c[g];0===g&&(d=k.b);lb(e,k.ja());f.push(e.length)}b.ba(d,e,f)};function $r(b,c){df.call(this);this.ma(b,c)}y($r,df);l=$r.prototype;l.mj=function(b){this.v?lb(this.v,b.ja()):this.v=b.ja().slice();this.s()};l.clone=function(){var b=new $r(null);b.ba(this.b,this.v.slice());return b};l.mb=function(b,c,d,e){if(e<Ud(this.J(),b,c))return e;var f=this.v,g=this.a,h,k,m;h=0;for(k=f.length;h<k;h+=g)if(m=Va(b,c,f[h],f[h+1]),m<e){e=m;for(m=0;m<g;++m)d[m]=f[h+m];d.length=g}return e};l.Y=function(){return sf(this.v,0,this.v.length,this.a)};
l.ck=function(b){var c=this.v?this.v.length/this.a:0;if(0>b||c<=b)return null;c=new D(null);c.ba(this.b,this.v.slice(b*this.a,(b+1)*this.a));return c};l.ue=function(){var b=this.v,c=this.b,d=this.a,e=[],f,g;f=0;for(g=b.length;f<g;f+=d){var h=new D(null);h.ba(c,b.slice(f,f+d));e.push(h)}return e};l.V=function(){return"MultiPoint"};l.Da=function(b){var c=this.v,d=this.a,e,f,g,h;e=0;for(f=c.length;e<f;e+=d)if(g=c[e],h=c[e+1],Wd(b,g,h))return!0;return!1};
l.ma=function(b,c){b?(gf(this,c,b,1),this.v||(this.v=[]),this.v.length=qf(this.v,0,b,this.a),this.s()):this.ba("XY",null)};l.ba=function(b,c){ff(this,b,c);this.s()};function V(b,c){df.call(this);this.g=[];this.D=-1;this.G=null;this.T=this.S=this.U=-1;this.l=null;this.ma(b,c)}y(V,df);l=V.prototype;l.nj=function(b){if(this.v){var c=this.v.length;lb(this.v,b.ja());b=b.Ab().slice();var d,e;d=0;for(e=b.length;d<e;++d)b[d]+=c}else this.v=b.ja().slice(),b=b.Ab().slice(),this.g.push();this.g.push(b);this.s()};l.clone=function(){var b=new V(null),c=Vb(this.g);as(b,this.b,this.v.slice(),c);return b};
l.mb=function(b,c,d,e){if(e<Ud(this.J(),b,c))return e;if(this.S!=this.c){var f=this.g,g=0,h=0,k,m;k=0;for(m=f.length;k<m;++k)var n=f[k],h=mf(this.v,g,n,this.a,h),g=n[n.length-1];this.U=Math.sqrt(h);this.S=this.c}f=um(this);g=this.g;h=this.a;k=this.U;m=0;var n=[NaN,NaN],p,q;p=0;for(q=g.length;p<q;++p){var r=g[p];e=of(f,m,r,h,k,!0,b,c,d,e,n);m=r[r.length-1]}return e};
l.rc=function(b,c){var d;a:{d=um(this);var e=this.g,f=0;if(0!==e.length){var g,h;g=0;for(h=e.length;g<h;++g){var k=e[g];if(Af(d,f,k,this.a,b,c)){d=!0;break a}f=k[k.length-1]}}d=!1}return d};l.$l=function(){var b=um(this),c=this.g,d=0,e=0,f,g;f=0;for(g=c.length;f<g;++f)var h=c[f],e=e+jf(b,d,h,this.a),d=h[h.length-1];return e};
l.Y=function(b){var c;void 0!==b?(c=um(this).slice(),If(c,this.g,this.a,b)):c=this.v;b=c;c=this.g;var d=this.a,e=0,f=[],g=0,h,k;h=0;for(k=c.length;h<k;++h){var m=c[h];f[g++]=tf(b,e,m,d,f[g]);e=m[m.length-1]}f.length=g;return f};
function vm(b){if(b.D!=b.c){var c=b.v,d=b.g,e=b.a,f=0,g=[],h,k,m=Od();h=0;for(k=d.length;h<k;++h){var n=d[h],m=$d(c,f,n[0],e);g.push((m[0]+m[2])/2,(m[1]+m[3])/2);f=n[n.length-1]}c=um(b);d=b.g;e=b.a;f=0;h=[];k=0;for(m=d.length;k<m;++k)n=d[k],h=Bf(c,f,n,e,g,2*k,h),f=n[n.length-1];b.G=h;b.D=b.c}return b.G}l.Pj=function(){var b=new $r(null);b.ba("XY",vm(this).slice());return b};
function um(b){if(b.T!=b.c){var c=b.v,d;a:{d=b.g;var e,f;e=0;for(f=d.length;e<f;++e)if(!Gf(c,d[e],b.a,void 0)){d=!1;break a}d=!0}d?b.l=c:(b.l=c.slice(),b.l.length=If(b.l,b.g,b.a));b.T=b.c}return b.l}l.Kc=function(b){var c=[],d=[],e=this.v,f=this.g,g=this.a;b=Math.sqrt(b);var h=0,k=0,m,n;m=0;for(n=f.length;m<n;++m){var p=f[m],q=[],k=vf(e,h,p,g,b,c,k,q);d.push(q);h=p[p.length-1]}c.length=k;e=new V(null);as(e,"XY",c,d);return e};
l.ek=function(b){if(0>b||this.g.length<=b)return null;var c;0===b?c=0:(c=this.g[b-1],c=c[c.length-1]);b=this.g[b].slice();var d=b[b.length-1];if(0!==c){var e,f;e=0;for(f=b.length;e<f;++e)b[e]-=c}e=new E(null);e.ba(this.b,this.v.slice(c,d),b);return e};l.be=function(){var b=this.b,c=this.v,d=this.g,e=[],f=0,g,h,k,m;g=0;for(h=d.length;g<h;++g){var n=d[g].slice(),p=n[n.length-1];if(0!==f)for(k=0,m=n.length;k<m;++k)n[k]-=f;k=new E(null);k.ba(b,c.slice(f,p),n);e.push(k);f=p}return e};l.V=function(){return"MultiPolygon"};
l.Da=function(b){a:{var c=um(this),d=this.g,e=this.a,f=0,g,h;g=0;for(h=d.length;g<h;++g){var k=d[g];if(Ef(c,f,k,e,b)){b=!0;break a}f=k[k.length-1]}b=!1}return b};l.ma=function(b,c){if(b){gf(this,c,b,3);this.v||(this.v=[]);var d=this.v,e=this.a,f=this.g,g=0,f=f?f:[],h=0,k,m;k=0;for(m=b.length;k<m;++k)g=rf(d,g,b[k],e,f[h]),f[h++]=g,g=g[g.length-1];f.length=h;0===f.length?this.v.length=0:(d=f[f.length-1],this.v.length=0===d.length?0:d[d.length-1]);this.s()}else as(this,"XY",null,this.g)};
function as(b,c,d,e){ff(b,c,d);b.g=e;b.s()}function bs(b,c){var d=b.b,e=[],f=[],g,h,k;g=0;for(h=c.length;g<h;++g){var m=c[g];0===g&&(d=m.b);var n=e.length;k=m.Ab();var p,q;p=0;for(q=k.length;p<q;++p)k[p]+=n;lb(e,m.ja());f.push(k)}as(b,d,e,f)};function cs(b){b=b?b:{};this.defaultDataProjection=null;this.a=b.geometryName}y(cs,Ur);
function ds(b,c){if(!b)return null;var d;if(ja(b.x)&&ja(b.y))d="Point";else if(b.points)d="MultiPoint";else if(b.paths)d=1===b.paths.length?"LineString":"MultiLineString";else if(b.rings){var e=b.rings,f=es(b),g=[];d=[];var h,k;h=0;for(k=e.length;h<k;++h){var m=ub(e[h]);Ff(m,0,m.length,f.length)?g.push([e[h]]):d.push(e[h])}for(;d.length;){e=d.shift();f=!1;for(h=g.length-1;0<=h;h--)if(Xd((new wf(g[h][0])).J(),(new wf(e)).J())){g[h].push(e);f=!0;break}f||g.push([e.reverse()])}b=Ub(b);1===g.length?(d=
"Polygon",b.rings=g[0]):(d="MultiPolygon",b.rings=g)}return Tr((0,fs[d])(b),!1,c)}function es(b){var c="XY";!0===b.hasZ&&!0===b.hasM?c="XYZM":!0===b.hasZ?c="XYZ":!0===b.hasM&&(c="XYM");return c}function gs(b){b=b.b;return{hasZ:"XYZ"===b||"XYZM"===b,hasM:"XYM"===b||"XYZM"===b}}
var fs={Point:function(b){return void 0!==b.m&&void 0!==b.z?new D([b.x,b.y,b.z,b.m],"XYZM"):void 0!==b.z?new D([b.x,b.y,b.z],"XYZ"):void 0!==b.m?new D([b.x,b.y,b.m],"XYM"):new D([b.x,b.y])},LineString:function(b){return new T(b.paths[0],es(b))},Polygon:function(b){return new E(b.rings,es(b))},MultiPoint:function(b){return new $r(b.points,es(b))},MultiLineString:function(b){return new U(b.paths,es(b))},MultiPolygon:function(b){return new V(b.rings,es(b))}},hs={Point:function(b){var c=b.Y();b=b.b;if("XYZ"===
b)return{x:c[0],y:c[1],z:c[2]};if("XYM"===b)return{x:c[0],y:c[1],m:c[2]};if("XYZM"===b)return{x:c[0],y:c[1],z:c[2],m:c[3]};if("XY"===b)return{x:c[0],y:c[1]}},LineString:function(b){var c=gs(b);return{hasZ:c.hasZ,hasM:c.hasM,paths:[b.Y()]}},Polygon:function(b){var c=gs(b);return{hasZ:c.hasZ,hasM:c.hasM,rings:b.Y(!1)}},MultiPoint:function(b){var c=gs(b);return{hasZ:c.hasZ,hasM:c.hasM,points:b.Y()}},MultiLineString:function(b){var c=gs(b);return{hasZ:c.hasZ,hasM:c.hasM,paths:b.Y()}},MultiPolygon:function(b){var c=
gs(b);b=b.Y(!1);for(var d=[],e=0;e<b.length;e++)for(var f=b[e].length-1;0<=f;f--)d.push(b[e][f]);return{hasZ:c.hasZ,hasM:c.hasM,rings:d}}};l=cs.prototype;l.Rc=function(b,c){var d=ds(b.geometry,c),e=new sn;this.a&&e.vc(this.a);e.La(d);c&&c.pf&&b.attributes[c.pf]&&e.ic(b.attributes[c.pf]);b.attributes&&e.I(b.attributes);return e};
l.Jf=function(b,c){var d=c?c:{};if(b.features){var e=[],f=b.features,g,h;d.pf=b.objectIdFieldName;g=0;for(h=f.length;g<h;++g)e.push(this.Rc(f[g],d));return e}return[this.Rc(b,d)]};l.Dh=function(b,c){return ds(b,c)};l.Kh=function(b){return b.spatialReference&&b.spatialReference.wkid?Fe("EPSG:"+b.spatialReference.wkid):null};function is(b,c){return(0,hs[b.V()])(Tr(b,!0,c),c)}l.Te=function(b,c){return is(b,Sr(this,c))};
l.Vc=function(b,c){c=Sr(this,c);var d={},e=b.W();e&&(d.geometry=is(e,c));e=b.P();delete e[b.a];d.attributes=Qb(e)?{}:e;c&&c.featureProjection&&(d.spatialReference={wkid:Fe(c.featureProjection).a.split(":").pop()});return d};l.Re=function(b,c){c=Sr(this,c);var d=[],e,f;e=0;for(f=b.length;e<f;++e)d.push(this.Vc(b[e],c));return{features:d}};function js(b){bf.call(this);this.f=b?b:null;ks(this)}y(js,bf);function ls(b){var c=[],d,e;d=0;for(e=b.length;d<e;++d)c.push(b[d].clone());return c}function ms(b){var c,d;if(b.f)for(c=0,d=b.f.length;c<d;++c)Yc(b.f[c],"change",b.s,!1,b)}function ks(b){var c,d;if(b.f)for(c=0,d=b.f.length;c<d;++c)C(b.f[c],"change",b.s,!1,b)}l=js.prototype;l.clone=function(){var b=new js(null);b.Vh(this.f);return b};
l.mb=function(b,c,d,e){if(e<Ud(this.J(),b,c))return e;var f=this.f,g,h;g=0;for(h=f.length;g<h;++g)e=f[g].mb(b,c,d,e);return e};l.rc=function(b,c){var d=this.f,e,f;e=0;for(f=d.length;e<f;++e)if(d[e].rc(b,c))return!0;return!1};l.Vd=function(b){Rd(Infinity,Infinity,-Infinity,-Infinity,b);for(var c=this.f,d=0,e=c.length;d<e;++d)ce(b,c[d].J());return b};l.zg=function(){return ls(this.f)};
l.sd=function(b){this.u!=this.c&&(Rb(this.j),this.i=0,this.u=this.c);if(0>b||0!==this.i&&b<this.i)return this;var c=b.toString();if(this.j.hasOwnProperty(c))return this.j[c];var d=[],e=this.f,f=!1,g,h;g=0;for(h=e.length;g<h;++g){var k=e[g],m=k.sd(b);d.push(m);m!==k&&(f=!0)}if(f)return b=new js(null),ms(b),b.f=d,ks(b),b.s(),this.j[c]=b;this.i=b;return this};l.V=function(){return"GeometryCollection"};l.Da=function(b){var c=this.f,d,e;d=0;for(e=c.length;d<e;++d)if(c[d].Da(b))return!0;return!1};
l.Ka=function(){return 0===this.f.length};l.Vh=function(b){b=ls(b);ms(this);this.f=b;ks(this);this.s()};l.mc=function(b){var c=this.f,d,e;d=0;for(e=c.length;d<e;++d)c[d].mc(b);this.s()};l.Oc=function(b,c){var d=this.f,e,f;e=0;for(f=d.length;e<f;++e)d[e].Oc(b,c);this.s()};l.X=function(){ms(this);js.da.X.call(this)};function ns(b){b=b?b:{};this.defaultDataProjection=null;this.defaultDataProjection=Fe(b.defaultDataProjection?b.defaultDataProjection:"EPSG:4326");this.a=b.geometryName}y(ns,Ur);function os(b,c){return b?Tr((0,ps[b.type])(b),!1,c):null}function qs(b,c){return(0,rs[b.V()])(Tr(b,!0,c),c)}
var ps={Point:function(b){return new D(b.coordinates)},LineString:function(b){return new T(b.coordinates)},Polygon:function(b){return new E(b.coordinates)},MultiPoint:function(b){return new $r(b.coordinates)},MultiLineString:function(b){return new U(b.coordinates)},MultiPolygon:function(b){return new V(b.coordinates)},GeometryCollection:function(b,c){var d=b.geometries.map(function(b){return os(b,c)});return new js(d)}},rs={Point:function(b){return{type:"Point",coordinates:b.Y()}},LineString:function(b){return{type:"LineString",
coordinates:b.Y()}},Polygon:function(b,c){var d;c&&(d=c.rightHanded);return{type:"Polygon",coordinates:b.Y(d)}},MultiPoint:function(b){return{type:"MultiPoint",coordinates:b.Y()}},MultiLineString:function(b){return{type:"MultiLineString",coordinates:b.Y()}},MultiPolygon:function(b,c){var d;c&&(d=c.rightHanded);return{type:"MultiPolygon",coordinates:b.Y(d)}},GeometryCollection:function(b,c){return{type:"GeometryCollection",geometries:b.f.map(function(b){return qs(b,c)})}},Circle:function(){return{type:"GeometryCollection",
geometries:[]}}};l=ns.prototype;l.Rc=function(b,c){var d=os(b.geometry,c),e=new sn;this.a&&e.vc(this.a);e.La(d);void 0!==b.id&&e.ic(b.id);b.properties&&e.I(b.properties);return e};l.Jf=function(b,c){if("Feature"==b.type)return[this.Rc(b,c)];if("FeatureCollection"==b.type){var d=[],e=b.features,f,g;f=0;for(g=e.length;f<g;++f)d.push(this.Rc(e[f],c));return d}return[]};l.Dh=function(b,c){return os(b,c)};
l.Kh=function(b){return(b=b.crs)?"name"==b.type?Fe(b.properties.name):"EPSG"==b.type?Fe("EPSG:"+b.properties.code):null:this.defaultDataProjection};l.Vc=function(b,c){c=Sr(this,c);var d={type:"Feature"},e=b.Na();void 0!==e&&(d.id=e);e=b.W();d.geometry=e?qs(e,c):null;e=b.P();delete e[b.a];d.properties=Qb(e)?null:e;return d};l.Re=function(b,c){c=Sr(this,c);var d=[],e,f;e=0;for(f=b.length;e<f;++e)d.push(this.Vc(b[e],c));return{type:"FeatureCollection",features:d}};
l.Te=function(b,c){return qs(b,Sr(this,c))};function ss(){this.defaultDataProjection=null}y(ss,Qr);l=ss.prototype;l.V=function(){return"xml"};l.Tb=function(b,c){if(Vo(b))return ts(this,b,c);if(Yo(b))return this.Bh(b,c);if(ia(b)){var d=hp(b);return ts(this,d,c)}return null};function ts(b,c,d){b=us(b,c,d);return 0<b.length?b[0]:null}l.Ba=function(b,c){if(Vo(b))return us(this,b,c);if(Yo(b))return this.hc(b,c);if(ia(b)){var d=hp(b);return us(this,d,c)}return[]};
function us(b,c,d){var e=[];for(c=c.firstChild;c;c=c.nextSibling)1==c.nodeType&&lb(e,b.hc(c,d));return e}l.Sc=function(b,c){if(Vo(b))return this.u(b,c);if(Yo(b)){var d=this.Ie(b,[Rr(this,b,c?c:{})]);return d?d:null}return ia(b)?(d=hp(b),this.u(d,c)):null};l.Ia=function(b){return Vo(b)?this.Pf(b):Yo(b)?this.Le(b):ia(b)?(b=hp(b),this.Pf(b)):null};l.Pf=function(){return this.defaultDataProjection};l.Le=function(){return this.defaultDataProjection};l.Jd=function(b,c){var d=this.C(b,c);return Ho(d)};
l.Vb=function(b,c){var d=this.c(b,c);return Ho(d)};l.Wc=function(b,c){var d=this.B(b,c);return Ho(d)};function vs(b){b=b?b:{};this.featureType=b.featureType;this.featureNS=b.featureNS;this.srsName=b.srsName;this.schemaLocation="";this.a={};this.a["http://www.opengis.net/gml"]={featureMember:kp(vs.prototype.Dd),featureMembers:kp(vs.prototype.Dd)};this.defaultDataProjection=null}y(vs,ss);l=vs.prototype;
l.Dd=function(b,c){var d=So(b),e;if("FeatureCollection"==d)"http://www.opengis.net/wfs"===b.namespaceURI?e=Q([],this.a,b,c,this):e=Q(null,this.a,b,c,this);else if("featureMembers"==d||"featureMember"==d){var f=c[0],g=f.featureType;e=f.featureNS;var h,k;if(!g&&b.childNodes){g=[];e={};h=0;for(k=b.childNodes.length;h<k;++h){var m=b.childNodes[h];if(1===m.nodeType){var n=m.nodeName.split(":").pop();if(-1===g.indexOf(n)){var p;Ob(e,m.namespaceURI)?p=Pb(e,function(b){return b===m.namespaceURI}):(p="p"+
Kb(e),e[p]=m.namespaceURI);g.push(p+":"+n)}}}f.featureType=g;f.featureNS=e}ia(e)&&(h=e,e={},e.p0=h);var f={},g=ga(g)?g:[g],q;for(q in e){n={};h=0;for(k=g.length;h<k;++h)(-1===g[h].indexOf(":")?"p0":g[h].split(":")[0])===q&&(n[g[h].split(":").pop()]="featureMembers"==d?jp(this.If,this):kp(this.If,this));f[e[q]]=n}e=Q([],f,b,c)}e||(e=[]);return e};l.Ie=function(b,c){var d=c[0];d.srsName=b.firstElementChild.getAttribute("srsName");var e=Q(null,this.ag,b,c,this);if(e)return Tr(e,!1,d)};
l.If=function(b,c){var d,e=b.getAttribute("fid")||bp(b,"http://www.opengis.net/gml","id"),f={},g;for(d=b.firstElementChild;d;d=d.nextElementSibling){var h=So(d);if(0===d.childNodes.length||1===d.childNodes.length&&(3===d.firstChild.nodeType||4===d.firstChild.nodeType)){var k=Oo(d,!1);/^[\s\xa0]*$/.test(k)&&(k=void 0);f[h]=k}else"boundedBy"!==h&&(g=h),f[h]=this.Ie(d,c)}d=new sn(f);g&&d.vc(g);e&&d.ic(e);return d};l.Jh=function(b,c){var d=this.He(b,c);if(d){var e=new D(null);e.ba("XYZ",d);return e}};
l.Hh=function(b,c){var d=Q([],this.Hi,b,c,this);if(d)return new $r(d)};l.Gh=function(b,c){var d=Q([],this.Gi,b,c,this);if(d){var e=new U(null);Zr(e,d);return e}};l.Ih=function(b,c){var d=Q([],this.Ii,b,c,this);if(d){var e=new V(null);bs(e,d);return e}};l.yh=function(b,c){rp(this.Li,b,c,this)};l.Og=function(b,c){rp(this.Ei,b,c,this)};l.zh=function(b,c){rp(this.Mi,b,c,this)};l.Je=function(b,c){var d=this.He(b,c);if(d){var e=new T(null);e.ba("XYZ",d);return e}};
l.jo=function(b,c){var d=Q(null,this.Ld,b,c,this);if(d)return d};l.Fh=function(b,c){var d=this.He(b,c);if(d){var e=new wf(null);xf(e,"XYZ",d);return e}};l.Ke=function(b,c){var d=Q([null],this.Ve,b,c,this);if(d&&d[0]){var e=new E(null),f=d[0],g=[f.length],h,k;h=1;for(k=d.length;h<k;++h)lb(f,d[h]),g.push(f.length);e.ba("XYZ",f,g);return e}};l.He=function(b,c){return Q(null,this.Ld,b,c,this)};l.Hi=Object({"http://www.opengis.net/gml":{pointMember:jp(vs.prototype.yh),pointMembers:jp(vs.prototype.yh)}});
l.Gi=Object({"http://www.opengis.net/gml":{lineStringMember:jp(vs.prototype.Og),lineStringMembers:jp(vs.prototype.Og)}});l.Ii=Object({"http://www.opengis.net/gml":{polygonMember:jp(vs.prototype.zh),polygonMembers:jp(vs.prototype.zh)}});l.Li=Object({"http://www.opengis.net/gml":{Point:jp(vs.prototype.He)}});l.Ei=Object({"http://www.opengis.net/gml":{LineString:jp(vs.prototype.Je)}});l.Mi=Object({"http://www.opengis.net/gml":{Polygon:jp(vs.prototype.Ke)}});l.Md=Object({"http://www.opengis.net/gml":{LinearRing:kp(vs.prototype.jo)}});
l.hc=function(b,c){var d={featureType:this.featureType,featureNS:this.featureNS};c&&Xb(d,Rr(this,b,c));return this.Dd(b,[d])};l.Le=function(b){return Fe(this.A?this.A:b.firstElementChild.getAttribute("srsName"))};function ws(b){b=Oo(b,!1);return xs(b)}function xs(b){if(b=/^\s*(true|1)|(false|0)\s*$/.exec(b))return void 0!==b[1]||!1}
function ys(b){b=Oo(b,!1);if(b=/^\s*(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?))\s*$/.exec(b)){var c=Date.UTC(parseInt(b[1],10),parseInt(b[2],10)-1,parseInt(b[3],10),parseInt(b[4],10),parseInt(b[5],10),parseInt(b[6],10))/1E3;if("Z"!=b[7]){var d="-"==b[8]?-1:1,c=c+60*d*parseInt(b[9],10);void 0!==b[10]&&(c+=3600*d*parseInt(b[10],10))}return c}}function zs(b){b=Oo(b,!1);return As(b)}
function As(b){if(b=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*$/i.exec(b))return parseFloat(b[1])}function Bs(b){b=Oo(b,!1);return Cs(b)}function Cs(b){if(b=/^\s*(\d+)\s*$/.exec(b))return parseInt(b[1],10)}function W(b){return Oo(b,!1).trim()}function Ds(b,c){Es(b,c?"1":"0")}function Fs(b,c){b.appendChild(Ko.createTextNode(c.toPrecision()))}function Gs(b,c){b.appendChild(Ko.createTextNode(c.toString()))}function Es(b,c){b.appendChild(Ko.createTextNode(c))};function Hs(b){b=b?b:{};vs.call(this,b);this.a["http://www.opengis.net/gml"].featureMember=jp(vs.prototype.Dd);this.schemaLocation=b.schemaLocation?b.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd"}y(Hs,vs);l=Hs.prototype;
l.Ch=function(b,c){var d=Oo(b,!1).replace(/^\s*|\s*$/g,""),e=c[0].srsName,f=b.parentNode.getAttribute("srsDimension"),g="enu";e&&(g=Ie(Fe(e)));d=d.split(/[\s,]+/);e=2;b.getAttribute("srsDimension")?e=Cs(b.getAttribute("srsDimension")):b.getAttribute("dimension")?e=Cs(b.getAttribute("dimension")):f&&(e=Cs(f));for(var h,k,m=[],n=0,p=d.length;n<p;n+=e)f=parseFloat(d[n]),h=parseFloat(d[n+1]),k=3===e?parseFloat(d[n+2]):0,"en"===g.substr(0,2)?m.push(f,h,k):m.push(h,f,k);return m};
l.fo=function(b,c){var d=Q([null],this.Ai,b,c,this);return Rd(d[1][0],d[1][1],d[1][3],d[1][4])};l.$k=function(b,c){var d=Q(void 0,this.Md,b,c,this);d&&c[c.length-1].push(d)};l.Pn=function(b,c){var d=Q(void 0,this.Md,b,c,this);d&&(c[c.length-1][0]=d)};l.Ld=Object({"http://www.opengis.net/gml":{coordinates:kp(Hs.prototype.Ch)}});l.Ve=Object({"http://www.opengis.net/gml":{innerBoundaryIs:Hs.prototype.$k,outerBoundaryIs:Hs.prototype.Pn}});l.Ai=Object({"http://www.opengis.net/gml":{coordinates:jp(Hs.prototype.Ch)}});
l.ag=Object({"http://www.opengis.net/gml":{Point:kp(vs.prototype.Jh),MultiPoint:kp(vs.prototype.Hh),LineString:kp(vs.prototype.Je),MultiLineString:kp(vs.prototype.Gh),LinearRing:kp(vs.prototype.Fh),Polygon:kp(vs.prototype.Ke),MultiPolygon:kp(vs.prototype.Ih),Box:kp(Hs.prototype.fo)}});function Is(b){b=b?b:{};vs.call(this,b);this.l=void 0!==b.surface?b.surface:!1;this.g=void 0!==b.curve?b.curve:!1;this.j=void 0!==b.multiCurve?b.multiCurve:!0;this.i=void 0!==b.multiSurface?b.multiSurface:!0;this.schemaLocation=b.schemaLocation?b.schemaLocation:"http://www.opengis.net/gml http://schemas.opengis.net/gml/3.1.1/profiles/gmlsfProfile/1.0.0/gmlsf.xsd"}y(Is,vs);l=Is.prototype;l.no=function(b,c){var d=Q([],this.Fi,b,c,this);if(d){var e=new U(null);Zr(e,d);return e}};
l.oo=function(b,c){var d=Q([],this.Ji,b,c,this);if(d){var e=new V(null);bs(e,d);return e}};l.qg=function(b,c){rp(this.Bi,b,c,this)};l.hi=function(b,c){rp(this.Qi,b,c,this)};l.ro=function(b,c){return Q([null],this.Ki,b,c,this)};l.to=function(b,c){return Q([null],this.Pi,b,c,this)};l.so=function(b,c){return Q([null],this.Ve,b,c,this)};l.mo=function(b,c){return Q([null],this.Ld,b,c,this)};l.bl=function(b,c){var d=Q(void 0,this.Md,b,c,this);d&&c[c.length-1].push(d)};
l.uj=function(b,c){var d=Q(void 0,this.Md,b,c,this);d&&(c[c.length-1][0]=d)};l.Lh=function(b,c){var d=Q([null],this.Ri,b,c,this);if(d&&d[0]){var e=new E(null),f=d[0],g=[f.length],h,k;h=1;for(k=d.length;h<k;++h)lb(f,d[h]),g.push(f.length);e.ba("XYZ",f,g);return e}};l.Ah=function(b,c){var d=Q([null],this.Ci,b,c,this);if(d){var e=new T(null);e.ba("XYZ",d);return e}};l.io=function(b,c){var d=Q([null],this.Di,b,c,this);return Rd(d[1][0],d[1][1],d[2][0],d[2][1])};
l.ko=function(b,c){for(var d=Oo(b,!1),e=/^\s*([+\-]?\d*\.?\d+(?:[eE][+\-]?\d+)?)\s*/,f=[],g;g=e.exec(d);)f.push(parseFloat(g[1])),d=d.substr(g[0].length);if(""===d){d=c[0].srsName;e="enu";d&&(e=Ie(Fe(d)));if("neu"===e)for(d=0,e=f.length;d<e;d+=3)g=f[d],f[d]=f[d+1],f[d+1]=g;d=f.length;2==d&&f.push(0);return 0===d?void 0:f}};
l.Mf=function(b,c){var d=Oo(b,!1).replace(/^\s*|\s*$/g,""),e=c[0].srsName,f=b.parentNode.getAttribute("srsDimension"),g="enu";e&&(g=Ie(Fe(e)));d=d.split(/\s+/);e=2;b.getAttribute("srsDimension")?e=Cs(b.getAttribute("srsDimension")):b.getAttribute("dimension")?e=Cs(b.getAttribute("dimension")):f&&(e=Cs(f));for(var h,k,m=[],n=0,p=d.length;n<p;n+=e)f=parseFloat(d[n]),h=parseFloat(d[n+1]),k=3===e?parseFloat(d[n+2]):0,"en"===g.substr(0,2)?m.push(f,h,k):m.push(h,f,k);return m};
l.Ld=Object({"http://www.opengis.net/gml":{pos:kp(Is.prototype.ko),posList:kp(Is.prototype.Mf)}});l.Ve=Object({"http://www.opengis.net/gml":{interior:Is.prototype.bl,exterior:Is.prototype.uj}});
l.ag=Object({"http://www.opengis.net/gml":{Point:kp(vs.prototype.Jh),MultiPoint:kp(vs.prototype.Hh),LineString:kp(vs.prototype.Je),MultiLineString:kp(vs.prototype.Gh),LinearRing:kp(vs.prototype.Fh),Polygon:kp(vs.prototype.Ke),MultiPolygon:kp(vs.prototype.Ih),Surface:kp(Is.prototype.Lh),MultiSurface:kp(Is.prototype.oo),Curve:kp(Is.prototype.Ah),MultiCurve:kp(Is.prototype.no),Envelope:kp(Is.prototype.io)}});l.Fi=Object({"http://www.opengis.net/gml":{curveMember:jp(Is.prototype.qg),curveMembers:jp(Is.prototype.qg)}});
l.Ji=Object({"http://www.opengis.net/gml":{surfaceMember:jp(Is.prototype.hi),surfaceMembers:jp(Is.prototype.hi)}});l.Bi=Object({"http://www.opengis.net/gml":{LineString:jp(vs.prototype.Je),Curve:jp(Is.prototype.Ah)}});l.Qi=Object({"http://www.opengis.net/gml":{Polygon:jp(vs.prototype.Ke),Surface:jp(Is.prototype.Lh)}});l.Ri=Object({"http://www.opengis.net/gml":{patches:kp(Is.prototype.ro)}});l.Ci=Object({"http://www.opengis.net/gml":{segments:kp(Is.prototype.to)}});
l.Di=Object({"http://www.opengis.net/gml":{lowerCorner:jp(Is.prototype.Mf),upperCorner:jp(Is.prototype.Mf)}});l.Ki=Object({"http://www.opengis.net/gml":{PolygonPatch:kp(Is.prototype.so)}});l.Pi=Object({"http://www.opengis.net/gml":{LineStringSegment:kp(Is.prototype.mo)}});function Js(b,c,d){d=d[d.length-1].srsName;c=c.Y();for(var e=c.length,f=Array(e),g,h=0;h<e;++h){g=c[h];var k=h,m="enu";d&&(m=Ie(Fe(d)));f[k]="en"===m.substr(0,2)?g[0]+" "+g[1]:g[1]+" "+g[0]}Es(b,f.join(" "))}
l.wi=function(b,c,d){var e=d[d.length-1].srsName;e&&b.setAttribute("srsName",e);e=No(b.namespaceURI,"pos");b.appendChild(e);d=d[d.length-1].srsName;b="enu";d&&(b=Ie(Fe(d)));c=c.Y();Es(e,"en"===b.substr(0,2)?c[0]+" "+c[1]:c[1]+" "+c[0])};var Ks={"http://www.opengis.net/gml":{lowerCorner:N(Es),upperCorner:N(Es)}};l=Is.prototype;l.fp=function(b,c,d){var e=d[d.length-1].srsName;e&&b.setAttribute("srsName",e);sp({node:b},Ks,pp,[c[0]+" "+c[1],c[2]+" "+c[3]],d,["lowerCorner","upperCorner"],this)};
l.ti=function(b,c,d){var e=d[d.length-1].srsName;e&&b.setAttribute("srsName",e);e=No(b.namespaceURI,"posList");b.appendChild(e);Js(e,c,d)};l.Oi=function(b,c){var d=c[c.length-1],e=d.node,f=d.exteriorWritten;void 0===f&&(d.exteriorWritten=!0);return No(e.namespaceURI,void 0!==f?"interior":"exterior")};
l.Ue=function(b,c,d){var e=d[d.length-1].srsName;"PolygonPatch"!==b.nodeName&&e&&b.setAttribute("srsName",e);"Polygon"===b.nodeName||"PolygonPatch"===b.nodeName?(c=c.ae(),sp({node:b,srsName:e},Ls,this.Oi,c,d,void 0,this)):"Surface"===b.nodeName&&(e=No(b.namespaceURI,"patches"),b.appendChild(e),b=No(e.namespaceURI,"PolygonPatch"),e.appendChild(b),this.Ue(b,c,d))};
l.Pe=function(b,c,d){var e=d[d.length-1].srsName;"LineStringSegment"!==b.nodeName&&e&&b.setAttribute("srsName",e);"LineString"===b.nodeName||"LineStringSegment"===b.nodeName?(e=No(b.namespaceURI,"posList"),b.appendChild(e),Js(e,c,d)):"Curve"===b.nodeName&&(e=No(b.namespaceURI,"segments"),b.appendChild(e),b=No(e.namespaceURI,"LineStringSegment"),e.appendChild(b),this.Pe(b,c,d))};
l.vi=function(b,c,d){var e=d[d.length-1],f=e.srsName,e=e.surface;f&&b.setAttribute("srsName",f);c=c.be();sp({node:b,srsName:f,surface:e},Ms,this.f,c,d,void 0,this)};l.gp=function(b,c,d){var e=d[d.length-1].srsName;e&&b.setAttribute("srsName",e);c=c.ue();sp({node:b,srsName:e},Ns,np("pointMember"),c,d,void 0,this)};l.ui=function(b,c,d){var e=d[d.length-1],f=e.srsName,e=e.curve;f&&b.setAttribute("srsName",f);c=c.rd();sp({node:b,srsName:f,curve:e},Os,this.f,c,d,void 0,this)};
l.xi=function(b,c,d){var e=No(b.namespaceURI,"LinearRing");b.appendChild(e);this.ti(e,c,d)};l.yi=function(b,c,d){var e=this.b(c,d);e&&(b.appendChild(e),this.Ue(e,c,d))};l.hp=function(b,c,d){var e=No(b.namespaceURI,"Point");b.appendChild(e);this.wi(e,c,d)};l.si=function(b,c,d){var e=this.b(c,d);e&&(b.appendChild(e),this.Pe(e,c,d))};
l.Se=function(b,c,d){var e=d[d.length-1],f=Ub(e);f.node=b;var g;ga(c)?e.dataProjection?g=af(c,e.featureProjection,e.dataProjection):g=c:g=Tr(c,!0,e);sp(f,Ps,this.b,[g],d,void 0,this)};
l.ni=function(b,c,d){var e=c.Na();e&&b.setAttribute("fid",e);var e=d[d.length-1],f=e.featureNS,g=c.a;e.uc||(e.uc={},e.uc[f]={});var h=c.P();c=[];var k=[],m;for(m in h){var n=h[m];null!==n&&(c.push(m),k.push(n),m==g||n instanceof bf?m in e.uc[f]||(e.uc[f][m]=N(this.Se,this)):m in e.uc[f]||(e.uc[f][m]=N(Es)))}m=Ub(e);m.node=b;sp(m,e.uc,np(void 0,f),k,d,c)};
var Ms={"http://www.opengis.net/gml":{surfaceMember:N(Is.prototype.yi),polygonMember:N(Is.prototype.yi)}},Ns={"http://www.opengis.net/gml":{pointMember:N(Is.prototype.hp)}},Os={"http://www.opengis.net/gml":{lineStringMember:N(Is.prototype.si),curveMember:N(Is.prototype.si)}},Ls={"http://www.opengis.net/gml":{exterior:N(Is.prototype.xi),interior:N(Is.prototype.xi)}},Ps={"http://www.opengis.net/gml":{Curve:N(Is.prototype.Pe),MultiCurve:N(Is.prototype.ui),Point:N(Is.prototype.wi),MultiPoint:N(Is.prototype.gp),
LineString:N(Is.prototype.Pe),MultiLineString:N(Is.prototype.ui),LinearRing:N(Is.prototype.ti),Polygon:N(Is.prototype.Ue),MultiPolygon:N(Is.prototype.vi),Surface:N(Is.prototype.Ue),MultiSurface:N(Is.prototype.vi),Envelope:N(Is.prototype.fp)}},Qs={MultiLineString:"lineStringMember",MultiCurve:"curveMember",MultiPolygon:"polygonMember",MultiSurface:"surfaceMember"};Is.prototype.f=function(b,c){return No("http://www.opengis.net/gml",Qs[c[c.length-1].node.nodeName])};
Is.prototype.b=function(b,c){var d=c[c.length-1],e=d.multiSurface,f=d.surface,g=d.curve,d=d.multiCurve,h;ga(b)?h="Envelope":(h=b.V(),"MultiPolygon"===h&&!0===e?h="MultiSurface":"Polygon"===h&&!0===f?h="Surface":"LineString"===h&&!0===g?h="Curve":"MultiLineString"===h&&!0===d&&(h="MultiCurve"));return No("http://www.opengis.net/gml",h)};
Is.prototype.B=function(b,c){c=Sr(this,c);var d=No("http://www.opengis.net/gml","geom"),e={node:d,srsName:this.srsName,curve:this.g,surface:this.l,multiSurface:this.i,multiCurve:this.j};c&&Xb(e,c);this.Se(d,b,[e]);return d};
Is.prototype.c=function(b,c){c=Sr(this,c);var d=No("http://www.opengis.net/gml","featureMembers");gp(d,"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.schemaLocation);var e={srsName:this.srsName,curve:this.g,surface:this.l,multiSurface:this.i,multiCurve:this.j,featureNS:this.featureNS,featureType:this.featureType};c&&Xb(e,c);var e=[e],f=e[e.length-1],g=f.featureType,h=f.featureNS,k={};k[h]={};k[h][g]=N(this.ni,this);f=Ub(f);f.node=d;sp(f,k,np(g,h),b,e);return d};function Rs(b){b=b?b:{};this.defaultDataProjection=null;this.defaultDataProjection=Fe("EPSG:4326");this.a=b.readExtensions}y(Rs,ss);var Ss=[null,"http://www.topografix.com/GPX/1/0","http://www.topografix.com/GPX/1/1"];function Ts(b,c,d){b.push(parseFloat(c.getAttribute("lon")),parseFloat(c.getAttribute("lat")));"ele"in d?(b.push(d.ele),delete d.ele):b.push(0);"time"in d?(b.push(d.time),delete d.time):b.push(0);return b}
function Us(b,c){var d=c[c.length-1],e=b.getAttribute("href");null!==e&&(d.link=e);rp(Vs,b,c)}function Ws(b,c){c[c.length-1].extensionsNode_=b}function Xs(b,c){var d=c[0],e=Q({flatCoordinates:[]},Ys,b,c);if(e){var f=e.flatCoordinates;delete e.flatCoordinates;var g=new T(null);g.ba("XYZM",f);Tr(g,!1,d);d=new sn(g);d.I(e);return d}}
function Zs(b,c){var d=c[0],e=Q({flatCoordinates:[],ends:[]},$s,b,c);if(e){var f=e.flatCoordinates;delete e.flatCoordinates;var g=e.ends;delete e.ends;var h=new U(null);h.ba("XYZM",f,g);Tr(h,!1,d);d=new sn(h);d.I(e);return d}}function at(b,c){var d=c[0],e=Q({},bt,b,c);if(e){var f=Ts([],b,e),f=new D(f,"XYZM");Tr(f,!1,d);d=new sn(f);d.I(e);return d}}
var ct={rte:Xs,trk:Zs,wpt:at},dt=P(Ss,{rte:jp(Xs),trk:jp(Zs),wpt:jp(at)}),Vs=P(Ss,{text:M(W,"linkText"),type:M(W,"linkType")}),Ys=P(Ss,{name:M(W),cmt:M(W),desc:M(W),src:M(W),link:Us,number:M(Bs),extensions:Ws,type:M(W),rtept:function(b,c){var d=Q({},et,b,c);d&&Ts(c[c.length-1].flatCoordinates,b,d)}}),et=P(Ss,{ele:M(zs),time:M(ys)}),$s=P(Ss,{name:M(W),cmt:M(W),desc:M(W),src:M(W),link:Us,number:M(Bs),type:M(W),extensions:Ws,trkseg:function(b,c){var d=c[c.length-1];rp(ft,b,c);d.ends.push(d.flatCoordinates.length)}}),
ft=P(Ss,{trkpt:function(b,c){var d=Q({},gt,b,c);d&&Ts(c[c.length-1].flatCoordinates,b,d)}}),gt=P(Ss,{ele:M(zs),time:M(ys)}),bt=P(Ss,{ele:M(zs),time:M(ys),magvar:M(zs),geoidheight:M(zs),name:M(W),cmt:M(W),desc:M(W),src:M(W),link:Us,sym:M(W),type:M(W),fix:M(W),sat:M(Bs),hdop:M(zs),vdop:M(zs),pdop:M(zs),ageofdgpsdata:M(zs),dgpsid:M(Bs),extensions:Ws});
function ht(b,c){c||(c=[]);for(var d=0,e=c.length;d<e;++d){var f=c[d];if(b.a){var g=f.get("extensionsNode_")||null;b.a(f,g)}f.set("extensionsNode_",void 0)}}Rs.prototype.Bh=function(b,c){if(!vb(Ss,b.namespaceURI))return null;var d=ct[b.localName];if(!d)return null;d=d(b,[Rr(this,b,c)]);if(!d)return null;ht(this,[d]);return d};Rs.prototype.hc=function(b,c){if(!vb(Ss,b.namespaceURI))return[];if("gpx"==b.localName){var d=Q([],dt,b,[Rr(this,b,c)]);if(d)return ht(this,d),d}return[]};
function it(b,c,d){b.setAttribute("href",c);c=d[d.length-1].properties;sp({node:b},jt,pp,[c.linkText,c.linkType],d,kt)}function lt(b,c,d){var e=d[d.length-1],f=e.node.namespaceURI,g=e.properties;gp(b,null,"lat",c[1]);gp(b,null,"lon",c[0]);switch(e.geometryLayout){case "XYZM":0!==c[3]&&(g.time=c[3]);case "XYZ":0!==c[2]&&(g.ele=c[2]);break;case "XYM":0!==c[2]&&(g.time=c[2])}c=mt[f];e=qp(g,c);sp({node:b,properties:g},nt,pp,e,d,c)}
var kt=["text","type"],jt=P(Ss,{text:N(Es),type:N(Es)}),ot=P(Ss,"name cmt desc src link number type rtept".split(" ")),pt=P(Ss,{name:N(Es),cmt:N(Es),desc:N(Es),src:N(Es),link:N(it),number:N(Gs),type:N(Es),rtept:mp(N(lt))}),qt=P(Ss,"name cmt desc src link number type trkseg".split(" ")),tt=P(Ss,{name:N(Es),cmt:N(Es),desc:N(Es),src:N(Es),link:N(it),number:N(Gs),type:N(Es),trkseg:mp(N(function(b,c,d){sp({node:b,geometryLayout:c.b,properties:{}},rt,st,c.Y(),d)}))}),st=np("trkpt"),rt=P(Ss,{trkpt:N(lt)}),
mt=P(Ss,"ele time magvar geoidheight name cmt desc src link sym type fix sat hdop vdop pdop ageofdgpsdata dgpsid".split(" ")),nt=P(Ss,{ele:N(Fs),time:N(function(b,c){var d=new Date(1E3*c),d=d.getUTCFullYear()+"-"+Oa(d.getUTCMonth()+1)+"-"+Oa(d.getUTCDate())+"T"+Oa(d.getUTCHours())+":"+Oa(d.getUTCMinutes())+":"+Oa(d.getUTCSeconds())+"Z";b.appendChild(Ko.createTextNode(d))}),magvar:N(Fs),geoidheight:N(Fs),name:N(Es),cmt:N(Es),desc:N(Es),src:N(Es),link:N(it),sym:N(Es),type:N(Es),fix:N(Es),sat:N(Gs),
hdop:N(Fs),vdop:N(Fs),pdop:N(Fs),ageofdgpsdata:N(Fs),dgpsid:N(Gs)}),ut={Point:"wpt",LineString:"rte",MultiLineString:"trk"};function vt(b,c){var d=b.W();if(d&&(d=ut[d.V()]))return No(c[c.length-1].node.namespaceURI,d)}
var wt=P(Ss,{rte:N(function(b,c,d){var e=d[0],f=c.P();b={node:b,properties:f};if(c=c.W())c=Tr(c,!0,e),b.geometryLayout=c.b,f.rtept=c.Y();e=ot[d[d.length-1].node.namespaceURI];f=qp(f,e);sp(b,pt,pp,f,d,e)}),trk:N(function(b,c,d){var e=d[0],f=c.P();b={node:b,properties:f};if(c=c.W())c=Tr(c,!0,e),f.trkseg=c.rd();e=qt[d[d.length-1].node.namespaceURI];f=qp(f,e);sp(b,tt,pp,f,d,e)}),wpt:N(function(b,c,d){var e=d[0],f=d[d.length-1];f.properties=c.P();if(c=c.W())c=Tr(c,!0,e),f.geometryLayout=c.b,lt(b,c.Y(),
d)})});Rs.prototype.c=function(b,c){c=Sr(this,c);var d=No("http://www.topografix.com/GPX/1/1","gpx");sp({node:d},wt,vt,b,[c]);return d};function xt(b){b=yt(b);return db(b,function(b){return b.b.substring(b.c,b.a)})}function zt(b,c,d){this.b=b;this.c=c;this.a=d}function yt(b){for(var c=RegExp("\r\n|\r|\n","g"),d=0,e,f=[];e=c.exec(b);)d=new zt(b,d,e.index),f.push(d),d=c.lastIndex;d<b.length&&(d=new zt(b,d,b.length),f.push(d));return f};function At(){this.defaultDataProjection=null}y(At,Qr);l=At.prototype;l.V=function(){return"text"};l.Tb=function(b,c){return this.Cd(ia(b)?b:"",Sr(this,c))};l.Ba=function(b,c){return this.Kf(ia(b)?b:"",Sr(this,c))};l.Sc=function(b,c){return this.Ed(ia(b)?b:"",Sr(this,c))};l.Ia=function(){return this.defaultDataProjection};l.Jd=function(b,c){return this.Qe(b,Sr(this,c))};l.Vb=function(b,c){return this.oi(b,Sr(this,c))};l.Wc=function(b,c){return this.Kd(b,Sr(this,c))};function Bt(b){b=b?b:{};this.defaultDataProjection=null;this.defaultDataProjection=Fe("EPSG:4326");this.a=b.altitudeMode?b.altitudeMode:"none"}y(Bt,At);var Ct=/^B(\d{2})(\d{2})(\d{2})(\d{2})(\d{5})([NS])(\d{3})(\d{5})([EW])([AV])(\d{5})(\d{5})/,Dt=/^H.([A-Z]{3}).*?:(.*)/,Et=/^HFDTE(\d{2})(\d{2})(\d{2})/;
Bt.prototype.Cd=function(b,c){var d=this.a,e=xt(b),f={},g=[],h=2E3,k=0,m=1,n,p;n=0;for(p=e.length;n<p;++n){var q=e[n],r;if("B"==q.charAt(0)){if(r=Ct.exec(q)){var q=parseInt(r[1],10),t=parseInt(r[2],10),x=parseInt(r[3],10),z=parseInt(r[4],10)+parseInt(r[5],10)/6E4;"S"==r[6]&&(z=-z);var B=parseInt(r[7],10)+parseInt(r[8],10)/6E4;"W"==r[9]&&(B=-B);g.push(B,z);"none"!=d&&g.push("gps"==d?parseInt(r[11],10):"barometric"==d?parseInt(r[12],10):0);g.push(Date.UTC(h,k,m,q,t,x)/1E3)}}else if("H"==q.charAt(0))if(r=
Et.exec(q))m=parseInt(r[1],10),k=parseInt(r[2],10)-1,h=2E3+parseInt(r[3],10);else if(r=Dt.exec(q))f[r[1]]=r[2].trim(),Et.exec(q)}if(0===g.length)return null;e=new T(null);e.ba("none"==d?"XYM":"XYZM",g);d=new sn(Tr(e,!1,c));d.I(f);return d};Bt.prototype.Kf=function(b,c){var d=this.Cd(b,c);return d?[d]:[]};function Ft(b,c){this.c=this.i=this.f="";this.l=null;this.g=this.a="";this.j=!1;var d;b instanceof Ft?(this.j=ca(c)?c:b.j,Gt(this,b.f),this.i=b.i,this.c=b.c,Ht(this,b.l),this.a=b.a,It(this,b.b.clone()),this.g=b.g):b&&(d=String(b).match(jo))?(this.j=!!c,Gt(this,d[1]||"",!0),this.i=Jt(d[2]||""),this.c=Jt(d[3]||"",!0),Ht(this,d[4]),this.a=Jt(d[5]||"",!0),It(this,d[6]||"",!0),this.g=Jt(d[7]||"")):(this.j=!!c,this.b=new Kt(null,0,this.j))}
Ft.prototype.toString=function(){var b=[],c=this.f;c&&b.push(Lt(c,Mt,!0),":");var d=this.c;if(d||"file"==c)b.push("//"),(c=this.i)&&b.push(Lt(c,Mt,!0),"@"),b.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.l,null!=d&&b.push(":",String(d));if(d=this.a)this.c&&"/"!=d.charAt(0)&&b.push("/"),b.push(Lt(d,"/"==d.charAt(0)?Nt:Ot,!0));(d=this.b.toString())&&b.push("?",d);(d=this.g)&&b.push("#",Lt(d,Pt));return b.join("")};Ft.prototype.clone=function(){return new Ft(this)};
function Gt(b,c,d){b.f=d?Jt(c,!0):c;b.f&&(b.f=b.f.replace(/:$/,""))}function Ht(b,c){if(c){c=Number(c);if(isNaN(c)||0>c)throw Error("Bad port number "+c);b.l=c}else b.l=null}function It(b,c,d){c instanceof Kt?(b.b=c,Qt(b.b,b.j)):(d||(c=Lt(c,Rt)),b.b=new Kt(c,0,b.j))}function St(b){return b instanceof Ft?b.clone():new Ft(b,void 0)}
function Tt(b,c){b instanceof Ft||(b=St(b));c instanceof Ft||(c=St(c));var d=b,e=c,f=d.clone(),g=!!e.f;g?Gt(f,e.f):g=!!e.i;g?f.i=e.i:g=!!e.c;g?f.c=e.c:g=null!=e.l;var h=e.a;if(g)Ht(f,e.l);else if(g=!!e.a)if("/"!=h.charAt(0)&&(d.c&&!d.a?h="/"+h:(d=f.a.lastIndexOf("/"),-1!=d&&(h=f.a.substr(0,d+1)+h))),d=h,".."==d||"."==d)h="";else if(-1!=d.indexOf("./")||-1!=d.indexOf("/.")){for(var h=0==d.lastIndexOf("/",0),d=d.split("/"),k=[],m=0;m<d.length;){var n=d[m++];"."==n?h&&m==d.length&&k.push(""):".."==n?
((1<k.length||1==k.length&&""!=k[0])&&k.pop(),h&&m==d.length&&k.push("")):(k.push(n),h=!0)}h=k.join("/")}else h=d;g?f.a=h:g=""!==e.b.toString();g?It(f,Jt(e.b.toString())):g=!!e.g;g&&(f.g=e.g);return f}function Jt(b,c){return b?c?decodeURI(b.replace(/%25/g,"%2525")):decodeURIComponent(b):""}function Lt(b,c,d){return ia(b)?(b=encodeURI(b).replace(c,Ut),d&&(b=b.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),b):null}function Ut(b){b=b.charCodeAt(0);return"%"+(b>>4&15).toString(16)+(b&15).toString(16)}
var Mt=/[#\/\?@]/g,Ot=/[\#\?:]/g,Nt=/[\#\?]/g,Rt=/[\#\?@]/g,Pt=/#/g;function Kt(b,c,d){this.c=this.a=null;this.b=b||null;this.f=!!d}function Vt(b){b.a||(b.a=new ri,b.c=0,b.b&&ko(b.b,function(c,d){b.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}l=Kt.prototype;l.nc=function(){Vt(this);return this.c};l.add=function(b,c){Vt(this);this.b=null;b=Wt(this,b);var d=this.a.get(b);d||this.a.set(b,d=[]);d.push(c);this.c++;return this};
l.remove=function(b){Vt(this);b=Wt(this,b);return ti(this.a.c,b)?(this.b=null,this.c-=this.a.get(b).length,this.a.remove(b)):!1};l.clear=function(){this.a=this.b=null;this.c=0};l.Ka=function(){Vt(this);return 0==this.c};function Xt(b,c){Vt(b);c=Wt(b,c);return ti(b.a.c,c)}l.O=function(){Vt(this);for(var b=this.a.pc(),c=this.a.O(),d=[],e=0;e<c.length;e++)for(var f=b[e],g=0;g<f.length;g++)d.push(c[e]);return d};
l.pc=function(b){Vt(this);var c=[];if(ia(b))Xt(this,b)&&(c=ib(c,this.a.get(Wt(this,b))));else{b=this.a.pc();for(var d=0;d<b.length;d++)c=ib(c,b[d])}return c};l.set=function(b,c){Vt(this);this.b=null;b=Wt(this,b);Xt(this,b)&&(this.c-=this.a.get(b).length);this.a.set(b,[c]);this.c++;return this};l.get=function(b,c){var d=b?this.pc(b):[];return 0<d.length?String(d[0]):c};function Yt(b,c,d){b.remove(c);0<d.length&&(b.b=null,b.a.set(Wt(b,c),jb(d)),b.c+=d.length)}
l.toString=function(){if(this.b)return this.b;if(!this.a)return"";for(var b=[],c=this.a.O(),d=0;d<c.length;d++)for(var e=c[d],f=encodeURIComponent(String(e)),e=this.pc(e),g=0;g<e.length;g++){var h=f;""!==e[g]&&(h+="="+encodeURIComponent(String(e[g])));b.push(h)}return this.b=b.join("&")};l.clone=function(){var b=new Kt;b.b=this.b;this.a&&(b.a=this.a.clone(),b.c=this.c);return b};function Wt(b,c){var d=String(c);b.f&&(d=d.toLowerCase());return d}
function Qt(b,c){c&&!b.f&&(Vt(b),b.b=null,b.a.forEach(function(b,c){var f=c.toLowerCase();c!=f&&(this.remove(c),Yt(this,f,b))},b));b.f=c};function Zt(b){b=b||{};this.f=b.font;this.i=b.rotation;this.c=b.scale;this.b=b.text;this.B=b.textAlign;this.u=b.textBaseline;this.a=void 0!==b.fill?b.fill:new Wl({color:"#333"});this.l=void 0!==b.stroke?b.stroke:null;this.g=void 0!==b.offsetX?b.offsetX:0;this.j=void 0!==b.offsetY?b.offsetY:0}l=Zt.prototype;l.Jj=function(){return this.f};l.Xj=function(){return this.g};l.Yj=function(){return this.j};l.zn=function(){return this.a};l.An=function(){return this.i};l.Bn=function(){return this.c};l.Cn=function(){return this.l};
l.Dn=function(){return this.b};l.jk=function(){return this.B};l.kk=function(){return this.u};l.Lo=function(b){this.f=b};l.$h=function(b){this.g=b};l.ai=function(b){this.j=b};l.Ko=function(b){this.a=b};l.En=function(b){this.i=b};l.Fn=function(b){this.c=b};l.Ro=function(b){this.l=b};l.ci=function(b){this.b=b};l.di=function(b){this.B=b};l.So=function(b){this.u=b};function $t(b){b=b?b:{};this.defaultDataProjection=null;this.defaultDataProjection=Fe("EPSG:4326");this.b=b.defaultStyle?b.defaultStyle:au;this.f=void 0!==b.extractStyles?b.extractStyles:!0;this.j=void 0!==b.writeStyles?b.writeStyles:!0;this.a={};this.g=void 0!==b.showPointNames?b.showPointNames:!0}y($t,ss);
var bu=["http://www.google.com/kml/ext/2.2"],cu=[null,"http://earth.google.com/kml/2.0","http://earth.google.com/kml/2.1","http://earth.google.com/kml/2.2","http://www.opengis.net/kml/2.2"],du=[255,255,255,1],eu=new Wl({color:du}),fu=[20,2],gu=[64,64],hu=new wk({anchor:fu,anchorOrigin:"bottom-left",anchorXUnits:"pixels",anchorYUnits:"pixels",crossOrigin:"anonymous",rotation:0,scale:.5,size:gu,src:"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"}),iu=new am({color:du,width:1}),ju=new Zt({font:"bold 16px Helvetica",
fill:eu,stroke:new am({color:[51,51,51,1],width:2}),scale:.8}),au=[new cm({fill:eu,image:hu,text:ju,stroke:iu,zIndex:0})],ku={fraction:"fraction",pixels:"pixels"};function lu(b,c){var d=null,e=[0,0],f="start";b.b&&(d=b.b.qd())&&2==d.length&&(e[0]=b.b.i*d[0]/2,e[1]=-b.b.i*d[1]/2,f="left");Qb(b.c)?d=new Zt({text:c,offsetX:e[0],offsetY:e[1],textAlign:f}):(d=Ub(b.c),d.ci(c),d.di(f),d.$h(e[0]),d.ai(e[1]));return new cm({text:d})}
function mu(b,c,d,e,f){return function(){var g=f,h="";g&&this.W()&&(g="Point"===this.W().V());g&&(h=this.P().name,g=g&&h);if(b)return g?(g=lu(b[0],h),b.concat(g)):b;if(c){var k=nu(c,d,e);return g?(g=lu(k[0],h),k.concat(g)):k}return g?(g=lu(d[0],h),d.concat(g)):d}}function nu(b,c,d){return ga(b)?b:ia(b)?(!(b in d)&&"#"+b in d&&(b="#"+b),nu(d[b],c,d)):c}
function ou(b){b=Oo(b,!1);if(b=/^\s*#?\s*([0-9A-Fa-f]{8})\s*$/.exec(b))return b=b[1],[parseInt(b.substr(6,2),16),parseInt(b.substr(4,2),16),parseInt(b.substr(2,2),16),parseInt(b.substr(0,2),16)/255]}function pu(b){b=Oo(b,!1);for(var c=[],d=/^\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?)(?:\s*,\s*([+\-]?\d*\.?\d+(?:e[+\-]?\d+)?))?\s*/i,e;e=d.exec(b);)c.push(parseFloat(e[1]),parseFloat(e[2]),e[3]?parseFloat(e[3]):0),b=b.substr(e[0].length);return""!==b?void 0:c}
function qu(b){var c=Oo(b,!1);return b.baseURI?Tt(b.baseURI,c.trim()).toString():c.trim()}function ru(b){b=zs(b);if(void 0!==b)return Math.sqrt(b)}function su(b,c){return Q(null,tu,b,c)}function uu(b,c){var d=Q({v:[],li:[]},vu,b,c);if(d){var e=d.v,d=d.li,f,g;f=0;for(g=Math.min(e.length,d.length);f<g;++f)e[4*f+3]=d[f];d=new T(null);d.ba("XYZM",e);return d}}function wu(b,c){var d=Q({},xu,b,c),e=Q(null,yu,b,c);if(e){var f=new T(null);f.ba("XYZ",e);f.I(d);return f}}
function zu(b,c){var d=Q({},xu,b,c),e=Q(null,yu,b,c);if(e){var f=new E(null);f.ba("XYZ",e,[e.length]);f.I(d);return f}}
function Au(b,c){var d=Q([],Bu,b,c);if(!d)return null;if(0===d.length)return new js(d);var e=!0,f=d[0].V(),g,h,k;h=1;for(k=d.length;h<k;++h)if(g=d[h],g.V()!=f){e=!1;break}if(e){if("Point"==f){g=d[0];e=g.b;f=g.ja();h=1;for(k=d.length;h<k;++h)g=d[h],lb(f,g.ja());g=new $r(null);g.ba(e,f);Cu(g,d);return g}return"LineString"==f?(g=new U(null),Zr(g,d),Cu(g,d),g):"Polygon"==f?(g=new V(null),bs(g,d),Cu(g,d),g):"GeometryCollection"==f?new js(d):null}return new js(d)}
function Du(b,c){var d=Q({},xu,b,c),e=Q(null,yu,b,c);if(e){var f=new D(null);f.ba("XYZ",e);f.I(d);return f}}function Eu(b,c){var d=Q({},xu,b,c),e=Q([null],Fu,b,c);if(e&&e[0]){var f=new E(null),g=e[0],h=[g.length],k,m;k=1;for(m=e.length;k<m;++k)lb(g,e[k]),h.push(g.length);f.ba("XYZ",g,h);f.I(d);return f}}
function Gu(b,c){var d=Q({},Hu,b,c);if(!d)return null;var e="fillStyle"in d?d.fillStyle:eu,f=d.fill;void 0===f||f||(e=null);var f="imageStyle"in d?d.imageStyle:hu,g="textStyle"in d?d.textStyle:ju,h="strokeStyle"in d?d.strokeStyle:iu,d=d.outline;void 0===d||d||(h=null);return[new cm({fill:e,image:f,stroke:h,text:g,zIndex:void 0})]}
function Cu(b,c){var d=c.length,e=Array(c.length),f=Array(c.length),g,h,k,m;k=m=!1;for(h=0;h<d;++h)g=c[h],e[h]=g.get("extrude"),f[h]=g.get("altitudeMode"),k=k||void 0!==e[h],m=m||f[h];k&&b.set("extrude",e);m&&b.set("altitudeMode",f)}function Iu(b,c){rp(Ju,b,c)}
var Ku=P(cu,{value:kp(W)}),Ju=P(cu,{Data:function(b,c){var d=b.getAttribute("name");if(null!==d){var e=Q(void 0,Ku,b,c);e&&(c[c.length-1][d]=e)}},SchemaData:function(b,c){rp(Lu,b,c)}}),xu=P(cu,{extrude:M(ws),altitudeMode:M(W)}),tu=P(cu,{coordinates:kp(pu)}),Fu=P(cu,{innerBoundaryIs:function(b,c){var d=Q(void 0,Mu,b,c);d&&c[c.length-1].push(d)},outerBoundaryIs:function(b,c){var d=Q(void 0,Nu,b,c);d&&(c[c.length-1][0]=d)}}),vu=P(cu,{when:function(b,c){var d=c[c.length-1].li,e=Oo(b,!1);if(e=/^\s*(\d{4})($|-(\d{2})($|-(\d{2})($|T(\d{2}):(\d{2}):(\d{2})(Z|(?:([+\-])(\d{2})(?::(\d{2}))?)))))\s*$/.exec(e)){var f=
Date.UTC(parseInt(e[1],10),e[3]?parseInt(e[3],10)-1:0,e[5]?parseInt(e[5],10):1,e[7]?parseInt(e[7],10):0,e[8]?parseInt(e[8],10):0,e[9]?parseInt(e[9],10):0);if(e[10]&&"Z"!=e[10]){var g="-"==e[11]?-1:1,f=f+60*g*parseInt(e[12],10);e[13]&&(f+=3600*g*parseInt(e[13],10))}d.push(f)}else d.push(0)}},P(bu,{coord:function(b,c){var d=c[c.length-1].v,e=Oo(b,!1);(e=/^\s*([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s+([+\-]?\d+(?:\.\d*)?(?:e[+\-]?\d*)?)\s*$/i.exec(e))?d.push(parseFloat(e[1]),
parseFloat(e[2]),parseFloat(e[3]),0):d.push(0,0,0,0)}})),yu=P(cu,{coordinates:kp(pu)}),Ou=P(cu,{href:M(qu)},P(bu,{x:M(zs),y:M(zs),w:M(zs),h:M(zs)})),Pu=P(cu,{Icon:M(function(b,c){var d=Q({},Ou,b,c);return d?d:null}),heading:M(zs),hotSpot:M(function(b){var c=b.getAttribute("xunits"),d=b.getAttribute("yunits");return{x:parseFloat(b.getAttribute("x")),Zf:ku[c],y:parseFloat(b.getAttribute("y")),$f:ku[d]}}),scale:M(ru)}),Mu=P(cu,{LinearRing:kp(su)}),Qu=P(cu,{color:M(ou),scale:M(ru)}),Ru=P(cu,{color:M(ou),
width:M(zs)}),Bu=P(cu,{LineString:jp(wu),LinearRing:jp(zu),MultiGeometry:jp(Au),Point:jp(Du),Polygon:jp(Eu)}),Su=P(bu,{Track:jp(uu)}),Uu=P(cu,{ExtendedData:Iu,Link:function(b,c){rp(Tu,b,c)},address:M(W),description:M(W),name:M(W),open:M(ws),phoneNumber:M(W),visibility:M(ws)}),Tu=P(cu,{href:M(qu)}),Nu=P(cu,{LinearRing:kp(su)}),Vu=P(cu,{Style:M(Gu),key:M(W),styleUrl:M(function(b){var c=Oo(b,!1).trim();return b.baseURI?Tt(b.baseURI,c).toString():c})}),Xu=P(cu,{ExtendedData:Iu,MultiGeometry:M(Au,"geometry"),
LineString:M(wu,"geometry"),LinearRing:M(zu,"geometry"),Point:M(Du,"geometry"),Polygon:M(Eu,"geometry"),Style:M(Gu),StyleMap:function(b,c){var d=Q(void 0,Wu,b,c);if(d){var e=c[c.length-1];ga(d)?e.Style=d:ia(d)&&(e.styleUrl=d)}},address:M(W),description:M(W),name:M(W),open:M(ws),phoneNumber:M(W),styleUrl:M(qu),visibility:M(ws)},P(bu,{MultiTrack:M(function(b,c){var d=Q([],Su,b,c);if(d){var e=new U(null);Zr(e,d);return e}},"geometry"),Track:M(uu,"geometry")})),Yu=P(cu,{color:M(ou),fill:M(ws),outline:M(ws)}),
Lu=P(cu,{SimpleData:function(b,c){var d=b.getAttribute("name");if(null!==d){var e=W(b);c[c.length-1][d]=e}}}),Hu=P(cu,{IconStyle:function(b,c){var d=Q({},Pu,b,c);if(d){var e=c[c.length-1],f="Icon"in d?d.Icon:{},g;g=(g=f.href)?g:"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png";var h,k,m,n=d.hotSpot;n?(h=[n.x,n.y],k=n.Zf,m=n.$f):"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"===g?(h=fu,m=k="pixels"):/^http:\/\/maps\.(?:google|gstatic)\.com\//.test(g)&&(h=[.5,0],m=k="fraction");
var p,n=f.x,q=f.y;void 0!==n&&void 0!==q&&(p=[n,q]);var r,n=f.w,f=f.h;void 0!==n&&void 0!==f&&(r=[n,f]);var t,f=d.heading;void 0!==f&&(t=Wa(f));d=d.scale;"https://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png"==g&&(r=gu,void 0===d&&(d=.5));h=new wk({anchor:h,anchorOrigin:"bottom-left",anchorXUnits:k,anchorYUnits:m,crossOrigin:"anonymous",offset:p,offsetOrigin:"bottom-left",rotation:t,scale:d,size:r,src:g});e.imageStyle=h}},LabelStyle:function(b,c){var d=Q({},Qu,b,c);d&&(c[c.length-1].textStyle=
new Zt({fill:new Wl({color:"color"in d?d.color:du}),scale:d.scale}))},LineStyle:function(b,c){var d=Q({},Ru,b,c);d&&(c[c.length-1].strokeStyle=new am({color:"color"in d?d.color:du,width:"width"in d?d.width:1}))},PolyStyle:function(b,c){var d=Q({},Yu,b,c);if(d){var e=c[c.length-1];e.fillStyle=new Wl({color:"color"in d?d.color:du});var f=d.fill;void 0!==f&&(e.fill=f);d=d.outline;void 0!==d&&(e.outline=d)}}}),Wu=P(cu,{Pair:function(b,c){var d=Q({},Vu,b,c);if(d){var e=d.key;e&&"normal"==e&&((e=d.styleUrl)&&
(c[c.length-1]=e),(d=d.Style)&&(c[c.length-1]=d))}}});l=$t.prototype;l.Gf=function(b,c){So(b);var d=P(cu,{Document:ip(this.Gf,this),Folder:ip(this.Gf,this),Placemark:jp(this.Of,this),Style:ra(this.vo,this),StyleMap:ra(this.uo,this)});if(d=Q([],d,b,c,this))return d};
l.Of=function(b,c){var d=Q({geometry:null},Xu,b,c);if(d){var e=new sn,f=b.getAttribute("id");null!==f&&e.ic(f);var f=c[0],g=d.geometry;g&&Tr(g,!1,f);e.La(g);delete d.geometry;this.f&&e.vf(mu(d.Style,d.styleUrl,this.b,this.a,this.g));delete d.Style;e.I(d);return e}};l.vo=function(b,c){var d=b.getAttribute("id");if(null!==d){var e=Gu(b,c);e&&(d=b.baseURI?Tt(b.baseURI,"#"+d).toString():"#"+d,this.a[d]=e)}};
l.uo=function(b,c){var d=b.getAttribute("id");if(null!==d){var e=Q(void 0,Wu,b,c);e&&(d=b.baseURI?Tt(b.baseURI,"#"+d).toString():"#"+d,this.a[d]=e)}};l.Bh=function(b,c){if(!vb(cu,b.namespaceURI))return null;var d=this.Of(b,[Rr(this,b,c)]);return d?d:null};
l.hc=function(b,c){if(!vb(cu,b.namespaceURI))return[];var d;d=So(b);if("Document"==d||"Folder"==d)return(d=this.Gf(b,[Rr(this,b,c)]))?d:[];if("Placemark"==d)return(d=this.Of(b,[Rr(this,b,c)]))?[d]:[];if("kml"==d){d=[];var e;for(e=b.firstElementChild;e;e=e.nextElementSibling){var f=this.hc(e,c);f&&lb(d,f)}return d}return[]};l.po=function(b){if(Vo(b))return Zu(this,b);if(Yo(b))return $u(this,b);if(ia(b))return b=hp(b),Zu(this,b)};
function Zu(b,c){var d;for(d=c.firstChild;d;d=d.nextSibling)if(1==d.nodeType){var e=$u(b,d);if(e)return e}}function $u(b,c){var d;for(d=c.firstElementChild;d;d=d.nextElementSibling)if(vb(cu,d.namespaceURI)&&"name"==d.localName)return W(d);for(d=c.firstElementChild;d;d=d.nextElementSibling){var e=So(d);if(vb(cu,d.namespaceURI)&&("Document"==e||"Folder"==e||"Placemark"==e||"kml"==e)&&(e=$u(b,d)))return e}}
l.qo=function(b){var c=[];Vo(b)?lb(c,av(this,b)):Yo(b)?lb(c,bv(this,b)):ia(b)&&(b=hp(b),lb(c,av(this,b)));return c};function av(b,c){var d,e=[];for(d=c.firstChild;d;d=d.nextSibling)1==d.nodeType&&lb(e,bv(b,d));return e}
function bv(b,c){var d,e=[];for(d=c.firstElementChild;d;d=d.nextElementSibling)if(vb(cu,d.namespaceURI)&&"NetworkLink"==d.localName){var f=Q({},Uu,d,[]);e.push(f)}for(d=c.firstElementChild;d;d=d.nextElementSibling)f=So(d),!vb(cu,d.namespaceURI)||"Document"!=f&&"Folder"!=f&&"kml"!=f||lb(e,bv(b,d));return e}function cv(b,c){var d=tg(c),d=[255*(4==d.length?d[3]:1),d[2],d[1],d[0]],e;for(e=0;4>e;++e){var f=parseInt(d[e],10).toString(16);d[e]=1==f.length?"0"+f:f}Es(b,d.join(""))}
function dv(b,c,d){sp({node:b},ev,fv,[c],d)}function gv(b,c,d){var e={node:b};c.Na()&&b.setAttribute("id",c.Na());b=c.P();var f=c.Qb();if(f&&(f=f.call(c,0))&&0<f.length){var g=f[0];this.j&&(b.Style=f[0]);(f=g.c)&&(b.name=f.b)}f=hv[d[d.length-1].node.namespaceURI];b=qp(b,f);sp(e,iv,pp,b,d,f);b=d[0];(c=c.W())&&(c=Tr(c,!0,b));sp(e,iv,jv,[c],d)}function kv(b,c,d){var e=c.ja();b={node:b};b.layout=c.b;b.stride=c.ra();sp(b,lv,mv,[e],d)}
function nv(b,c,d){c=c.ae();var e=c.shift();b={node:b};sp(b,ov,pv,c,d);sp(b,ov,qv,[e],d)}function rv(b,c){Fs(b,c*c)}
var sv=P(cu,["Document","Placemark"]),vv=P(cu,{Document:N(function(b,c,d){sp({node:b},tv,uv,c,d)}),Placemark:N(gv)}),tv=P(cu,{Placemark:N(gv)}),wv={Point:"Point",LineString:"LineString",LinearRing:"LinearRing",Polygon:"Polygon",MultiPoint:"MultiGeometry",MultiLineString:"MultiGeometry",MultiPolygon:"MultiGeometry"},xv=P(cu,["href"],P(bu,["x","y","w","h"])),yv=P(cu,{href:N(Es)},P(bu,{x:N(Fs),y:N(Fs),w:N(Fs),h:N(Fs)})),zv=P(cu,["scale","heading","Icon","hotSpot"]),Bv=P(cu,{Icon:N(function(b,c,d){b=
{node:b};var e=xv[d[d.length-1].node.namespaceURI],f=qp(c,e);sp(b,yv,pp,f,d,e);e=xv[bu[0]];f=qp(c,e);sp(b,yv,Av,f,d,e)}),heading:N(Fs),hotSpot:N(function(b,c){b.setAttribute("x",c.x);b.setAttribute("y",c.y);b.setAttribute("xunits",c.Zf);b.setAttribute("yunits",c.$f)}),scale:N(rv)}),Cv=P(cu,["color","scale"]),Dv=P(cu,{color:N(cv),scale:N(rv)}),Ev=P(cu,["color","width"]),Fv=P(cu,{color:N(cv),width:N(Fs)}),ev=P(cu,{LinearRing:N(kv)}),Gv=P(cu,{LineString:N(kv),Point:N(kv),Polygon:N(nv)}),hv=P(cu,"name open visibility address phoneNumber description styleUrl Style".split(" ")),
iv=P(cu,{MultiGeometry:N(function(b,c,d){b={node:b};var e=c.V(),f,g;"MultiPoint"==e?(f=c.ue(),g=Hv):"MultiLineString"==e?(f=c.rd(),g=Iv):"MultiPolygon"==e&&(f=c.be(),g=Jv);sp(b,Gv,g,f,d)}),LineString:N(kv),LinearRing:N(kv),Point:N(kv),Polygon:N(nv),Style:N(function(b,c,d){b={node:b};var e={},f=c.j,g=c.f,h=c.b;c=c.c;h instanceof wk&&(e.IconStyle=h);c&&(e.LabelStyle=c);g&&(e.LineStyle=g);f&&(e.PolyStyle=f);c=Kv[d[d.length-1].node.namespaceURI];e=qp(e,c);sp(b,Lv,pp,e,d,c)}),address:N(Es),description:N(Es),
name:N(Es),open:N(Ds),phoneNumber:N(Es),styleUrl:N(Es),visibility:N(Ds)}),lv=P(cu,{coordinates:N(function(b,c,d){d=d[d.length-1];var e=d.layout;d=d.stride;var f;"XY"==e||"XYM"==e?f=2:("XYZ"==e||"XYZM"==e)&&(f=3);var g,h=c.length,k="";if(0<h){k+=c[0];for(e=1;e<f;++e)k+=","+c[e];for(g=d;g<h;g+=d)for(k+=" "+c[g],e=1;e<f;++e)k+=","+c[g+e]}Es(b,k)})}),ov=P(cu,{outerBoundaryIs:N(dv),innerBoundaryIs:N(dv)}),Mv=P(cu,{color:N(cv)}),Kv=P(cu,["IconStyle","LabelStyle","LineStyle","PolyStyle"]),Lv=P(cu,{IconStyle:N(function(b,
c,d){b={node:b};var e={},f=c.Bb(),g=c.qd(),h={href:c.a.j};if(f){h.w=f[0];h.h=f[1];var k=c.Xb(),m=c.Ca();m&&g&&0!==m[0]&&m[1]!==f[1]&&(h.x=m[0],h.y=g[1]-(m[1]+f[1]));k&&0!==k[0]&&k[1]!==f[1]&&(e.hotSpot={x:k[0],Zf:"pixels",y:f[1]-k[1],$f:"pixels"})}e.Icon=h;f=c.i;1!==f&&(e.scale=f);c=c.u;0!==c&&(e.heading=c);c=zv[d[d.length-1].node.namespaceURI];e=qp(e,c);sp(b,Bv,pp,e,d,c)}),LabelStyle:N(function(b,c,d){b={node:b};var e={},f=c.a;f&&(e.color=f.a);(c=c.c)&&1!==c&&(e.scale=c);c=Cv[d[d.length-1].node.namespaceURI];
e=qp(e,c);sp(b,Dv,pp,e,d,c)}),LineStyle:N(function(b,c,d){b={node:b};var e=Ev[d[d.length-1].node.namespaceURI];c=qp({color:c.a,width:c.c},e);sp(b,Fv,pp,c,d,e)}),PolyStyle:N(function(b,c,d){sp({node:b},Mv,Nv,[c.a],d)})});function Av(b,c,d){return No(bu[0],"gx:"+d)}function uv(b,c){return No(c[c.length-1].node.namespaceURI,"Placemark")}function jv(b,c){if(b)return No(c[c.length-1].node.namespaceURI,wv[b.V()])}
var Nv=np("color"),mv=np("coordinates"),pv=np("innerBoundaryIs"),Hv=np("Point"),Iv=np("LineString"),fv=np("LinearRing"),Jv=np("Polygon"),qv=np("outerBoundaryIs");
$t.prototype.c=function(b,c){c=Sr(this,c);var d=No(cu[4],"kml");gp(d,"http://www.w3.org/2000/xmlns/","xmlns:gx",bu[0]);gp(d,"http://www.w3.org/2000/xmlns/","xmlns:xsi","http://www.w3.org/2001/XMLSchema-instance");gp(d,"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation","http://www.opengis.net/kml/2.2 https://developers.google.com/kml/schema/kml22gx.xsd");var e={node:d},f={};1<b.length?f.Document=b:1==b.length&&(f.Placemark=b[0]);var g=sv[d.namespaceURI],f=qp(f,g);sp(e,vv,pp,f,[c],g,this);
return d};(function(){var b={},c={ka:b};(function(d){if("object"===typeof b&&"undefined"!==typeof c)c.ka=d();else{var e;"undefined"!==typeof window?e=window:"undefined"!==typeof global?e=global:"undefined"!==typeof self?e=self:e=this;e.Ap=d()}})(function(){return function e(b,c,h){function k(n,q){if(!c[n]){if(!b[n]){var r="function"==typeof require&&require;if(!q&&r)return require(n,!0);if(m)return m(n,!0);r=Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r;}r=c[n]={ka:{}};b[n][0].call(r.ka,function(c){var e=
b[n][1][c];return k(e?e:c)},r,r.ka,e,b,c,h)}return c[n].ka}for(var m="function"==typeof require&&require,n=0;n<h.length;n++)k(h[n]);return k}({1:[function(b,c,g){g.read=function(b,c,e,f,g){var q;q=8*g-f-1;var r=(1<<q)-1,t=r>>1,x=-7;g=e?g-1:0;var z=e?-1:1,B=b[c+g];g+=z;e=B&(1<<-x)-1;B>>=-x;for(x+=q;0<x;e=256*e+b[c+g],g+=z,x-=8);q=e&(1<<-x)-1;e>>=-x;for(x+=f;0<x;q=256*q+b[c+g],g+=z,x-=8);if(0===e)e=1-t;else{if(e===r)return q?NaN:Infinity*(B?-1:1);q+=Math.pow(2,f);e=e-t}return(B?-1:1)*q*Math.pow(2,e-
f)};g.write=function(b,c,e,f,g,q){var r,t=8*q-g-1,x=(1<<t)-1,z=x>>1,B=23===g?Math.pow(2,-24)-Math.pow(2,-77):0;q=f?0:q-1;var A=f?1:-1,v=0>c||0===c&&0>1/c?1:0;c=Math.abs(c);isNaN(c)||Infinity===c?(c=isNaN(c)?1:0,f=x):(f=Math.floor(Math.log(c)/Math.LN2),1>c*(r=Math.pow(2,-f))&&(f--,r*=2),c=1<=f+z?c+B/r:c+B*Math.pow(2,1-z),2<=c*r&&(f++,r/=2),f+z>=x?(c=0,f=x):1<=f+z?(c=(c*r-1)*Math.pow(2,g),f+=z):(c=c*Math.pow(2,z-1)*Math.pow(2,g),f=0));for(;8<=g;b[e+q]=c&255,q+=A,c/=256,g-=8);f=f<<g|c;for(t+=g;0<t;b[e+
q]=f&255,q+=A,f/=256,t-=8);b[e+q-A]|=128*v}},{}],2:[function(b,c){function g(b){var c;b&&b.length&&(c=b,b=c.length);b=new Uint8Array(b||0);c&&b.set(c);b.Mh=m.Mh;b.Yf=m.Yf;b.Eh=m.Eh;b.ri=m.ri;b.Nf=m.Nf;b.pi=m.pi;b.Hf=m.Hf;b.mi=m.mi;b.toString=m.toString;b.write=m.write;b.slice=m.slice;b.og=m.og;b.aj=!0;return b}function h(b){for(var c=b.length,e=[],f=0,g,h;f<c;f++){g=b.charCodeAt(f);if(55295<g&&57344>g)if(h)if(56320>g){e.push(239,191,189);h=g;continue}else g=h-55296<<10|g-56320|65536,h=null;else{56319<
g||f+1===c?e.push(239,191,189):h=g;continue}else h&&(e.push(239,191,189),h=null);128>g?e.push(g):2048>g?e.push(g>>6|192,g&63|128):65536>g?e.push(g>>12|224,g>>6&63|128,g&63|128):e.push(g>>18|240,g>>12&63|128,g>>6&63|128,g&63|128)}return e}c.ka=g;var k=b("ieee754"),m,n,p;m={Mh:function(b){return(this[b]|this[b+1]<<8|this[b+2]<<16)+16777216*this[b+3]},Yf:function(b,c){this[c]=b;this[c+1]=b>>>8;this[c+2]=b>>>16;this[c+3]=b>>>24},Eh:function(b){return(this[b]|this[b+1]<<8|this[b+2]<<16)+(this[b+3]<<24)},
Nf:function(b){return k.read(this,b,!0,23,4)},Hf:function(b){return k.read(this,b,!0,52,8)},pi:function(b,c){return k.write(this,b,c,!0,23,4)},mi:function(b,c){return k.write(this,b,c,!0,52,8)},toString:function(b,c,e){var f=b="";e=Math.min(this.length,e||this.length);for(c=c||0;c<e;c++){var g=this[c];127>=g?(b+=decodeURIComponent(f)+String.fromCharCode(g),f=""):f+="%"+g.toString(16)}return b+=decodeURIComponent(f)},write:function(b,c){for(var e=b===n?p:h(b),f=0;f<e.length;f++)this[c+f]=e[f]},slice:function(b,
c){return this.subarray(b,c)},og:function(b,c){c=c||0;for(var e=0;e<this.length;e++)b[c+e]=this[e]}};m.ri=m.Yf;g.byteLength=function(b){n=b;p=h(b);return p.length};g.isBuffer=function(b){return!(!b||!b.aj)}},{ieee754:1}],3:[function(b,c){(function(g){function h(b){this.Eb=k.isBuffer(b)?b:new k(b||0);this.ca=0;this.length=this.Eb.length}c.ka=h;var k=g.ip||b("./buffer");h.f=0;h.b=1;h.a=2;h.c=5;var m=Math.pow(2,63);h.prototype={Lf:function(b,c,e){for(e=e||this.length;this.ca<e;){var f=this.za(),g=this.ca;
b(f>>3,c,this);this.ca===g&&this.Xo(f)}return c},lo:function(){var b=this.Eb.Nf(this.ca);this.ca+=4;return b},ho:function(){var b=this.Eb.Hf(this.ca);this.ca+=8;return b},za:function(){var b=this.Eb,c,e,f,g,h;c=b[this.ca++];if(128>c)return c;c=c&127;f=b[this.ca++];if(128>f)return c|f<<7;f=(f&127)<<7;g=b[this.ca++];if(128>g)return c|f|g<<14;g=(g&127)<<14;h=b[this.ca++];if(128>h)return c|f|g|h<<21;e=b[this.ca++];c=(c|f|g|(h&127)<<21)+268435456*(e&127);if(128>e)return c;e=b[this.ca++];c+=34359738368*
(e&127);if(128>e)return c;e=b[this.ca++];c+=4398046511104*(e&127);if(128>e)return c;e=b[this.ca++];c+=562949953421312*(e&127);if(128>e)return c;e=b[this.ca++];c+=72057594037927936*(e&127);if(128>e)return c;e=b[this.ca++];c+=0x7fffffffffffffff*(e&127);if(128>e)return c;throw Error("Expected varint not more than 10 bytes");},wo:function(){var b=this.ca,c=this.za();if(c<m)return c;for(var e=this.ca-2;255===this.Eb[e];)e--;e<b&&(e=b);for(var f=c=0;f<e-b+1;f++)var g=~this.Eb[b+f]&127,c=c+(4>f?g<<7*f:g*
Math.pow(2,7*f));return-c-1},Fd:function(){var b=this.za();return 1===b%2?(b+1)/-2:b/2},eo:function(){return Boolean(this.za())},Qf:function(){var b=this.za()+this.ca,c=this.Eb.toString("utf8",this.ca,b);this.ca=b;return c},Xo:function(b){b=b&7;if(b===h.f)for(;127<this.Eb[this.ca++];);else if(b===h.a)this.ca=this.za()+this.ca;else if(b===h.c)this.ca+=4;else if(b===h.b)this.ca+=8;else throw Error("Unimplemented type: "+b);}}}).call(this,"undefined"!==typeof global?global:"undefined"!==typeof self?
self:"undefined"!==typeof window?window:{})},{"./buffer":2}]},{},[3])(3)});yp=c.ka})();(function(){var b={},c={ka:b};(function(d){if("object"===typeof b&&"undefined"!==typeof c)c.ka=d();else{var e;"undefined"!==typeof window?e=window:"undefined"!==typeof global?e=global:"undefined"!==typeof self?e=self:e=this;e.Cp=d()}})(function(){return function e(b,c,h){function k(n,q){if(!c[n]){if(!b[n]){var r="function"==typeof require&&require;if(!q&&r)return require(n,!0);if(m)return m(n,!0);r=Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r;}r=c[n]={ka:{}};b[n][0].call(r.ka,function(c){var e=
b[n][1][c];return k(e?e:c)},r,r.ka,e,b,c,h)}return c[n].ka}for(var m="function"==typeof require&&require,n=0;n<h.length;n++)k(h[n]);return k}({1:[function(b,c){function g(b,c){this.x=b;this.y=c}c.ka=g;g.prototype={clone:function(){return new g(this.x,this.y)},add:function(b){return this.clone().Ti(b)},rotate:function(b){return this.clone().dj(b)},round:function(){return this.clone().ej()},angle:function(){return Math.atan2(this.y,this.x)},Ti:function(b){this.x+=b.x;this.y+=b.y;return this},dj:function(b){var c=
Math.cos(b);b=Math.sin(b);var e=b*this.x+c*this.y;this.x=c*this.x-b*this.y;this.y=e;return this},ej:function(){this.x=Math.round(this.x);this.y=Math.round(this.y);return this}};g.a=function(b){return b instanceof g?b:Array.isArray(b)?new g(b[0],b[1]):b}},{}],2:[function(b,c){c.ka.Si=b("./lib/vectortile.js");c.ka.vp=b("./lib/vectortilefeature.js");c.ka.wp=b("./lib/vectortilelayer.js")},{"./lib/vectortile.js":3,"./lib/vectortilefeature.js":4,"./lib/vectortilelayer.js":5}],3:[function(b,c){function g(b,
c,e){3===b&&(b=new h(e,e.za()+e.ca),b.length&&(c[b.name]=b))}var h=b("./vectortilelayer");c.ka=function(b,c){this.layers=b.Lf(g,{},c)}},{"./vectortilelayer":5}],4:[function(b,c){function g(b,c,e,f,g){this.properties={};this.extent=e;this.type=0;this.lc=b;this.Ye=-1;this.Pd=f;this.Rd=g;b.Lf(h,this,c)}function h(b,c,e){if(1==b)c.yp=e.za();else if(2==b)for(b=e.za()+e.ca;e.ca<b;){var f=c.Pd[e.za()],g=c.Rd[e.za()];c.properties[f]=g}else 3==b?c.type=e.za():4==b&&(c.Ye=e.ca)}var k=b("point-geometry");c.ka=
g;g.types=["Unknown","Point","LineString","Polygon"];g.prototype.Pg=function(){var b=this.lc;b.ca=this.Ye;for(var c=b.za()+b.ca,e=1,f=0,g=0,h=0,x=[],z;b.ca<c;)if(f||(f=b.za(),e=f&7,f=f>>3),f--,1===e||2===e)g+=b.Fd(),h+=b.Fd(),1===e&&(z&&x.push(z),z=[]),z.push(new k(g,h));else if(7===e)z&&z.push(z[0].clone());else throw Error("unknown command "+e);z&&x.push(z);return x};g.prototype.bbox=function(){var b=this.lc;b.ca=this.Ye;for(var c=b.za()+b.ca,e=1,f=0,g=0,h=0,k=Infinity,z=-Infinity,B=Infinity,A=
-Infinity;b.ca<c;)if(f||(f=b.za(),e=f&7,f=f>>3),f--,1===e||2===e)g+=b.Fd(),h+=b.Fd(),g<k&&(k=g),g>z&&(z=g),h<B&&(B=h),h>A&&(A=h);else if(7!==e)throw Error("unknown command "+e);return[k,B,z,A]}},{"point-geometry":1}],5:[function(b,c){function g(b,c){this.version=1;this.name=null;this.extent=4096;this.length=0;this.lc=b;this.Pd=[];this.Rd=[];this.Od=[];b.Lf(h,this,c);this.length=this.Od.length}function h(b,c,e){15===b?c.version=e.za():1===b?c.name=e.Qf():5===b?c.extent=e.za():2===b?c.Od.push(e.ca):
3===b?c.Pd.push(e.Qf()):4===b&&c.Rd.push(k(e))}function k(b){for(var c=null,e=b.za()+b.ca;b.ca<e;)c=b.za()>>3,c=1===c?b.Qf():2===c?b.lo():3===c?b.ho():4===c?b.wo():5===c?b.za():6===c?b.Fd():7===c?b.eo():null;return c}var m=b("./vectortilefeature.js");c.ka=g;g.prototype.feature=function(b){if(0>b||b>=this.Od.length)throw Error("feature index out of bounds");this.lc.ca=this.Od[b];b=this.lc.za()+this.lc.ca;return new m(this.lc,b,this.extent,this.Pd,this.Rd)}},{"./vectortilefeature.js":4}]},{},[2])(2)});
zp=c.ka})();function Ov(b){this.defaultDataProjection=null;b=b?b:{};this.defaultDataProjection=new De({code:"EPSG:3857",units:"tile-pixels"});this.a=b.featureClass?b.featureClass:Vm;this.f=b.geometryName?b.geometryName:"geometry";this.c=b.layerName?b.layerName:"layer";this.b=b.layers?b.layers:null}y(Ov,Qr);Ov.prototype.V=function(){return"arraybuffer"};
Ov.prototype.Ba=function(b,c){var d=this.b,e=new yp(b),e=new zp.Si(e),f=[],g=this.a,h,k,m;for(m in e.layers)if(!d||-1!=d.indexOf(m)){h=e.layers[m];for(var n=0,p=h.length;n<p;++n){if(g===Vm){var q=h.feature(n);k=m;var r=q.Pg(),t=[],x=[];Pv(r,x,t);var z=q.type,B=void 0;1===z?B=1===r.length?"Point":"MultiPoint":2===z?B=1===r.length?"LineString":"MultiLineString":3===z&&(B="Polygon");q=q.properties;q[this.c]=k;k=new this.a(B,x,t,q)}else{q=h.feature(n);B=m;x=c;k=new this.a;t=q.properties;t[this.c]=B;B=
q.type;if(0===B)B=null;else{q=q.Pg();r=[];z=[];Pv(q,z,r);var A=void 0;1===B?A=1===q.length?new D(null):new $r(null):2===B?1===q.length?A=new T(null):A=new U(null):3===B&&(A=new E(null));A.ba("XY",z,r);B=A}(x=Tr(B,!1,Sr(this,x)))&&(t[this.f]=x);k.I(t);k.vc(this.f)}f.push(k)}}return f};Ov.prototype.Ia=function(){return this.defaultDataProjection};Ov.prototype.g=function(b){this.b=b};
function Pv(b,c,d){for(var e=0,f,g,h=0,k=b.length;h<k;++h){f=b[h];for(var m=0,n=f.length;m<n;++m)g=f[m],c.push(g.x,g.y);e+=2*m;d.push(e)}};function Qv(){this.defaultDataProjection=null;this.defaultDataProjection=Fe("EPSG:4326")}y(Qv,ss);function Rv(b,c){c[c.length-1].Id[b.getAttribute("k")]=b.getAttribute("v")}
var Sv=[null],Tv=P(Sv,{nd:function(b,c){c[c.length-1].Nc.push(b.getAttribute("ref"))},tag:Rv}),Vv=P(Sv,{node:function(b,c){var d=c[0],e=c[c.length-1],f=b.getAttribute("id"),g=[parseFloat(b.getAttribute("lon")),parseFloat(b.getAttribute("lat"))];e.Sg[f]=g;var h=Q({Id:{}},Uv,b,c);Qb(h.Id)||(g=new D(g),Tr(g,!1,d),d=new sn(g),d.ic(f),d.I(h.Id),e.features.push(d))},way:function(b,c){for(var d=c[0],e=b.getAttribute("id"),f=Q({Nc:[],Id:{}},Tv,b,c),g=c[c.length-1],h=[],k=0,m=f.Nc.length;k<m;k++)lb(h,g.Sg[f.Nc[k]]);
f.Nc[0]==f.Nc[f.Nc.length-1]?(k=new E(null),k.ba("XY",h,[h.length])):(k=new T(null),k.ba("XY",h));Tr(k,!1,d);d=new sn(k);d.ic(e);d.I(f.Id);g.features.push(d)}}),Uv=P(Sv,{tag:Rv});Qv.prototype.hc=function(b,c){var d=Rr(this,b,c);return"osm"==b.localName&&(d=Q({Sg:{},features:[]},Vv,b,[d]),d.features)?d.features:[]};function Wv(b){return b.getAttributeNS("http://www.w3.org/1999/xlink","href")};function Xv(){}Xv.prototype.read=function(b){return Vo(b)?this.c(b):Yo(b)?this.a(b):ia(b)?(b=hp(b),this.c(b)):null};function Yv(){}y(Yv,Xv);Yv.prototype.c=function(b){for(b=b.firstChild;b;b=b.nextSibling)if(1==b.nodeType)return this.a(b);return null};Yv.prototype.a=function(b){return(b=Q({},Zv,b,[]))?b:null};
var $v=[null,"http://www.opengis.net/ows/1.1"],Zv=P($v,{ServiceIdentification:M(function(b,c){return Q({},aw,b,c)}),ServiceProvider:M(function(b,c){return Q({},bw,b,c)}),OperationsMetadata:M(function(b,c){return Q({},cw,b,c)})}),dw=P($v,{DeliveryPoint:M(W),City:M(W),AdministrativeArea:M(W),PostalCode:M(W),Country:M(W),ElectronicMailAddress:M(W)}),ew=P($v,{Value:lp(function(b){return W(b)})}),fw=P($v,{AllowedValues:M(function(b,c){return Q({},ew,b,c)})}),hw=P($v,{Phone:M(function(b,c){return Q({},
gw,b,c)}),Address:M(function(b,c){return Q({},dw,b,c)})}),jw=P($v,{HTTP:M(function(b,c){return Q({},iw,b,c)})}),iw=P($v,{Get:lp(function(b,c){var d=Wv(b);return d?Q({href:d},kw,b,c):void 0}),Post:void 0}),lw=P($v,{DCP:M(function(b,c){return Q({},jw,b,c)})}),cw=P($v,{Operation:function(b,c){var d=b.getAttribute("name"),e=Q({},lw,b,c);e&&(c[c.length-1][d]=e)}}),gw=P($v,{Voice:M(W),Facsimile:M(W)}),kw=P($v,{Constraint:lp(function(b,c){var d=b.getAttribute("name");return d?Q({name:d},fw,b,c):void 0})}),
mw=P($v,{IndividualName:M(W),PositionName:M(W),ContactInfo:M(function(b,c){return Q({},hw,b,c)})}),aw=P($v,{Title:M(W),ServiceTypeVersion:M(W),ServiceType:M(W)}),bw=P($v,{ProviderName:M(W),ProviderSite:M(Wv),ServiceContact:M(function(b,c){return Q({},mw,b,c)})});function nw(b,c,d,e){var f;void 0!==e?f=e:f=[];e=0;var g,h;for(g=0;g<c;)for(h=b[g++],f[e++]=b[g++],f[e++]=h,h=2;h<d;++h)f[e++]=b[g++];f.length=e};function ow(b){b=b?b:{};this.defaultDataProjection=null;this.defaultDataProjection=Fe("EPSG:4326");this.a=b.factor?b.factor:1E5;this.c=b.geometryLayout?b.geometryLayout:"XY"}y(ow,At);function pw(b,c,d){var e,f=Array(c);for(e=0;e<c;++e)f[e]=0;var g,h;g=0;for(h=b.length;g<h;)for(e=0;e<c;++e,++g){var k=b[g],m=k-f[e];f[e]=k;b[g]=m}return qw(b,d?d:1E5)}
function rw(b,c,d){var e,f=Array(c);for(e=0;e<c;++e)f[e]=0;b=sw(b,d?d:1E5);var g;d=0;for(g=b.length;d<g;)for(e=0;e<c;++e,++d)f[e]+=b[d],b[d]=f[e];return b}function qw(b,c){var d=c?c:1E5,e,f;e=0;for(f=b.length;e<f;++e)b[e]=Math.round(b[e]*d);d=0;for(e=b.length;d<e;++d)f=b[d],b[d]=0>f?~(f<<1):f<<1;d="";e=0;for(f=b.length;e<f;++e){for(var g=b[e],h=void 0,k="";32<=g;)h=(32|g&31)+63,k+=String.fromCharCode(h),g>>=5;h=g+63;k+=String.fromCharCode(h);d+=k}return d}
function sw(b,c){var d=c?c:1E5,e=[],f=0,g=0,h,k;h=0;for(k=b.length;h<k;++h){var m=b.charCodeAt(h)-63,f=f|(m&31)<<g;32>m?(e.push(f),g=f=0):g+=5}f=0;for(g=e.length;f<g;++f)h=e[f],e[f]=h&1?~(h>>1):h>>1;f=0;for(g=e.length;f<g;++f)e[f]/=d;return e}l=ow.prototype;l.Cd=function(b,c){var d=this.Ed(b,c);return new sn(d)};l.Kf=function(b,c){return[this.Cd(b,c)]};l.Ed=function(b,c){var d=ef(this.c),e=rw(b,d,this.a);nw(e,e.length,d,e);d=sf(e,0,e.length,d);return Tr(new T(d,this.c),!1,Sr(this,c))};
l.Qe=function(b,c){var d=b.W();return d?this.Kd(d,c):""};l.oi=function(b,c){return this.Qe(b[0],c)};l.Kd=function(b,c){b=Tr(b,!0,Sr(this,c));var d=b.ja(),e=b.ra();nw(d,d.length,e,d);return pw(d,e,this.a)};function tw(b){b=b?b:{};this.defaultDataProjection=null;this.defaultDataProjection=Fe(b.defaultDataProjection?b.defaultDataProjection:"EPSG:4326")}y(tw,Ur);function uw(b,c){var d=[],e,f,g,h;g=0;for(h=b.length;g<h;++g)e=b[g],0<g&&d.pop(),0<=e?f=c[e]:f=c[~e].slice().reverse(),d.push.apply(d,f);e=0;for(f=d.length;e<f;++e)d[e]=d[e].slice();return d}function vw(b,c,d,e,f){b=b.geometries;var g=[],h,k;h=0;for(k=b.length;h<k;++h)g[h]=ww(b[h],c,d,e,f);return g}
function ww(b,c,d,e,f){var g=b.type,h=xw[g];c="Point"===g||"MultiPoint"===g?h(b,d,e):h(b,c);d=new sn;d.La(Tr(c,!1,f));void 0!==b.id&&d.ic(b.id);b.properties&&d.I(b.properties);return d}
tw.prototype.Jf=function(b,c){if("Topology"==b.type){var d,e=null,f=null;b.transform&&(d=b.transform,e=d.scale,f=d.translate);var g=b.arcs;if(d){d=e;var h=f,k,m;k=0;for(m=g.length;k<m;++k)for(var n=g[k],p=d,q=h,r=0,t=0,x=void 0,z=void 0,B=void 0,z=0,B=n.length;z<B;++z)x=n[z],r+=x[0],t+=x[1],x[0]=r,x[1]=t,yw(x,p,q)}d=[];h=Lb(b.objects);k=0;for(m=h.length;k<m;++k)"GeometryCollection"===h[k].type?(n=h[k],d.push.apply(d,vw(n,g,e,f,c))):(n=h[k],d.push(ww(n,g,e,f,c)));return d}return[]};
function yw(b,c,d){b[0]=b[0]*c[0]+d[0];b[1]=b[1]*c[1]+d[1]}tw.prototype.Ia=function(){return this.defaultDataProjection};
var xw={Point:function(b,c,d){b=b.coordinates;c&&d&&yw(b,c,d);return new D(b)},LineString:function(b,c){var d=uw(b.arcs,c);return new T(d)},Polygon:function(b,c){var d=[],e,f;e=0;for(f=b.arcs.length;e<f;++e)d[e]=uw(b.arcs[e],c);return new E(d)},MultiPoint:function(b,c,d){b=b.coordinates;var e,f;if(c&&d)for(e=0,f=b.length;e<f;++e)yw(b[e],c,d);return new $r(b)},MultiLineString:function(b,c){var d=[],e,f;e=0;for(f=b.arcs.length;e<f;++e)d[e]=uw(b.arcs[e],c);return new U(d)},MultiPolygon:function(b,c){var d=
[],e,f,g,h,k,m;k=0;for(m=b.arcs.length;k<m;++k){e=b.arcs[k];f=[];g=0;for(h=e.length;g<h;++g)f[g]=uw(e[g],c);d[k]=f}return new V(d)}};function zw(b){b=b?b:{};this.g=b.featureType;this.b=b.featureNS;this.a=b.gmlFormat?b.gmlFormat:new Is;this.f=b.schemaLocation?b.schemaLocation:"http://www.opengis.net/wfs http://schemas.opengis.net/wfs/1.1.0/wfs.xsd";this.defaultDataProjection=null}y(zw,ss);zw.prototype.hc=function(b,c){var d={featureType:this.g,featureNS:this.b};Xb(d,Rr(this,b,c?c:{}));d=[d];this.a.a["http://www.opengis.net/gml"].featureMember=jp(vs.prototype.Dd);(d=Q([],this.a.a,b,d,this.a))||(d=[]);return d};
zw.prototype.i=function(b){if(Vo(b))return Aw(b);if(Yo(b))return Q({},Bw,b,[]);if(ia(b))return b=hp(b),Aw(b)};zw.prototype.j=function(b){if(Vo(b))return Cw(this,b);if(Yo(b))return Dw(this,b);if(ia(b))return b=hp(b),Cw(this,b)};function Cw(b,c){for(var d=c.firstChild;d;d=d.nextSibling)if(1==d.nodeType)return Dw(b,d)}var Ew={"http://www.opengis.net/gml":{boundedBy:M(vs.prototype.Ie,"bounds")}};
function Dw(b,c){var d={},e=Cs(c.getAttribute("numberOfFeatures"));d.numberOfFeatures=e;return Q(d,Ew,c,[],b.a)}
var Fw={"http://www.opengis.net/wfs":{totalInserted:M(Bs),totalUpdated:M(Bs),totalDeleted:M(Bs)}},Gw={"http://www.opengis.net/ogc":{FeatureId:jp(function(b){return b.getAttribute("fid")})}},Hw={"http://www.opengis.net/wfs":{Feature:function(b,c){rp(Gw,b,c)}}},Bw={"http://www.opengis.net/wfs":{TransactionSummary:M(function(b,c){return Q({},Fw,b,c)},"transactionSummary"),InsertResults:M(function(b,c){return Q([],Hw,b,c)},"insertIds")}};
function Aw(b){for(b=b.firstChild;b;b=b.nextSibling)if(1==b.nodeType)return Q({},Bw,b,[])}var Iw={"http://www.opengis.net/wfs":{PropertyName:N(Es)}};function Jw(b,c){var d=No("http://www.opengis.net/ogc","Filter"),e=No("http://www.opengis.net/ogc","FeatureId");d.appendChild(e);e.setAttribute("fid",c);b.appendChild(d)}
var Kw={"http://www.opengis.net/wfs":{Insert:N(function(b,c,d){var e=d[d.length-1],e=No(e.featureNS,e.featureType);b.appendChild(e);Is.prototype.ni(e,c,d)}),Update:N(function(b,c,d){var e=d[d.length-1],f=e.featureType,g=e.featurePrefix,g=g?g:"feature",h=e.featureNS;b.setAttribute("typeName",g+":"+f);gp(b,"http://www.w3.org/2000/xmlns/","xmlns:"+g,h);if(f=c.Na()){for(var g=c.O(),h=[],k=0,m=g.length;k<m;k++){var n=c.get(g[k]);void 0!==n&&h.push({name:g[k],value:n})}sp({node:b,srsName:e.srsName},Kw,
np("Property"),h,d);Jw(b,f)}}),Delete:N(function(b,c,d){var e=d[d.length-1];d=e.featureType;var f=e.featurePrefix,f=f?f:"feature",e=e.featureNS;b.setAttribute("typeName",f+":"+d);gp(b,"http://www.w3.org/2000/xmlns/","xmlns:"+f,e);(c=c.Na())&&Jw(b,c)}),Property:N(function(b,c,d){var e=No("http://www.opengis.net/wfs","Name");b.appendChild(e);Es(e,c.name);void 0!==c.value&&null!==c.value&&(e=No("http://www.opengis.net/wfs","Value"),b.appendChild(e),c.value instanceof bf?Is.prototype.Se(e,c.value,d):
Es(e,c.value))}),Native:N(function(b,c){c.ep&&b.setAttribute("vendorId",c.ep);void 0!==c.Io&&b.setAttribute("safeToIgnore",c.Io);void 0!==c.value&&Es(b,c.value)})}},Lw={"http://www.opengis.net/wfs":{Query:N(function(b,c,d){var e=d[d.length-1],f=e.featurePrefix,g=e.featureNS,h=e.propertyNames,k=e.srsName;b.setAttribute("typeName",(f?f+":":"")+c);k&&b.setAttribute("srsName",k);g&&gp(b,"http://www.w3.org/2000/xmlns/","xmlns:"+f,g);c=Ub(e);c.node=b;sp(c,Iw,np("PropertyName"),h,d);if(e=e.bbox)h=No("http://www.opengis.net/ogc",
"Filter"),c=d[d.length-1].geometryName,f=No("http://www.opengis.net/ogc","BBOX"),h.appendChild(f),g=No("http://www.opengis.net/ogc","PropertyName"),Es(g,c),f.appendChild(g),Is.prototype.Se(f,e,d),b.appendChild(h)})}};
zw.prototype.l=function(b){var c=No("http://www.opengis.net/wfs","GetFeature");c.setAttribute("service","WFS");c.setAttribute("version","1.1.0");b&&(b.handle&&c.setAttribute("handle",b.handle),b.outputFormat&&c.setAttribute("outputFormat",b.outputFormat),void 0!==b.maxFeatures&&c.setAttribute("maxFeatures",b.maxFeatures),b.resultType&&c.setAttribute("resultType",b.resultType),void 0!==b.startIndex&&c.setAttribute("startIndex",b.startIndex),void 0!==b.count&&c.setAttribute("count",b.count));gp(c,"http://www.w3.org/2001/XMLSchema-instance",
"xsi:schemaLocation",this.f);var d=b.featureTypes;b=[{node:c,srsName:b.srsName,featureNS:b.featureNS?b.featureNS:this.b,featurePrefix:b.featurePrefix,geometryName:b.geometryName,bbox:b.bbox,propertyNames:b.propertyNames?b.propertyNames:[]}];var e=Ub(b[b.length-1]);e.node=c;sp(e,Lw,np("Query"),d,b);return c};
zw.prototype.A=function(b,c,d,e){var f=[],g=No("http://www.opengis.net/wfs","Transaction");g.setAttribute("service","WFS");g.setAttribute("version","1.1.0");var h,k;e&&(h=e.gmlOptions?e.gmlOptions:{},e.handle&&g.setAttribute("handle",e.handle));gp(g,"http://www.w3.org/2001/XMLSchema-instance","xsi:schemaLocation",this.f);b&&(k={node:g,featureNS:e.featureNS,featureType:e.featureType,featurePrefix:e.featurePrefix},Xb(k,h),sp(k,Kw,np("Insert"),b,f));c&&(k={node:g,featureNS:e.featureNS,featureType:e.featureType,
featurePrefix:e.featurePrefix},Xb(k,h),sp(k,Kw,np("Update"),c,f));d&&sp({node:g,featureNS:e.featureNS,featureType:e.featureType,featurePrefix:e.featurePrefix},Kw,np("Delete"),d,f);e.nativeElements&&sp({node:g,featureNS:e.featureNS,featureType:e.featureType,featurePrefix:e.featurePrefix},Kw,np("Native"),e.nativeElements,f);return g};zw.prototype.Pf=function(b){for(b=b.firstChild;b;b=b.nextSibling)if(1==b.nodeType)return this.Le(b);return null};
zw.prototype.Le=function(b){if(b.firstElementChild&&b.firstElementChild.firstElementChild)for(b=b.firstElementChild.firstElementChild,b=b.firstElementChild;b;b=b.nextElementSibling)if(0!==b.childNodes.length&&(1!==b.childNodes.length||3!==b.firstChild.nodeType)){var c=[{}];this.a.Ie(b,c);return Fe(c.pop().srsName)}return null};function Mw(b){b=b?b:{};this.defaultDataProjection=null;this.a=void 0!==b.splitCollection?b.splitCollection:!1}y(Mw,At);function Nw(b){b=b.Y();return 0===b.length?"":b[0]+" "+b[1]}function Ow(b){b=b.Y();for(var c=[],d=0,e=b.length;d<e;++d)c.push(b[d][0]+" "+b[d][1]);return c.join(",")}function Pw(b){var c=[];b=b.ae();for(var d=0,e=b.length;d<e;++d)c.push("("+Ow(b[d])+")");return c.join(",")}function Qw(b){var c=b.V();b=(0,Rw[c])(b);c=c.toUpperCase();return 0===b.length?c+" EMPTY":c+"("+b+")"}
var Rw={Point:Nw,LineString:Ow,Polygon:Pw,MultiPoint:function(b){var c=[];b=b.ue();for(var d=0,e=b.length;d<e;++d)c.push("("+Nw(b[d])+")");return c.join(",")},MultiLineString:function(b){var c=[];b=b.rd();for(var d=0,e=b.length;d<e;++d)c.push("("+Ow(b[d])+")");return c.join(",")},MultiPolygon:function(b){var c=[];b=b.be();for(var d=0,e=b.length;d<e;++d)c.push("("+Pw(b[d])+")");return c.join(",")},GeometryCollection:function(b){var c=[];b=b.zg();for(var d=0,e=b.length;d<e;++d)c.push(Qw(b[d]));return c.join(",")}};
l=Mw.prototype;l.Cd=function(b,c){var d=this.Ed(b,c);if(d){var e=new sn;e.La(d);return e}return null};l.Kf=function(b,c){var d=[],e=this.Ed(b,c);this.a&&"GeometryCollection"==e.V()?d=e.f:d=[e];for(var f=[],g=0,h=d.length;g<h;++g)e=new sn,e.La(d[g]),f.push(e);return f};l.Ed=function(b,c){var d;d=new Sw(new Tw(b));d.a=Uw(d.c);return(d=Vw(d))?Tr(d,!1,c):null};l.Qe=function(b,c){var d=b.W();return d?this.Kd(d,c):""};
l.oi=function(b,c){if(1==b.length)return this.Qe(b[0],c);for(var d=[],e=0,f=b.length;e<f;++e)d.push(b[e].W());d=new js(d);return this.Kd(d,c)};l.Kd=function(b,c){return Qw(Tr(b,!0,c))};function Tw(b){this.c=b;this.a=-1}function Ww(b,c){return"0"<=b&&"9">=b||"."==b&&!(void 0!==c&&c)}
function Uw(b){var c=b.c.charAt(++b.a),d={position:b.a,value:c};if("("==c)d.type=2;else if(","==c)d.type=5;else if(")"==c)d.type=3;else if(Ww(c)||"-"==c){d.type=4;var e,c=b.a,f=!1,g=!1;do{if("."==e)f=!0;else if("e"==e||"E"==e)g=!0;e=b.c.charAt(++b.a)}while(Ww(e,f)||!g&&("e"==e||"E"==e)||g&&("-"==e||"+"==e));b=parseFloat(b.c.substring(c,b.a--));d.value=b}else if("a"<=c&&"z">=c||"A"<=c&&"Z">=c){d.type=1;c=b.a;do e=b.c.charAt(++b.a);while("a"<=e&&"z">=e||"A"<=e&&"Z">=e);b=b.c.substring(c,b.a--).toUpperCase();
d.value=b}else{if(" "==c||"\t"==c||"\r"==c||"\n"==c)return Uw(b);if(""===c)d.type=6;else throw Error("Unexpected character: "+c);}return d}function Sw(b){this.c=b}l=Sw.prototype;l.match=function(b){if(b=this.a.type==b)this.a=Uw(this.c);return b};
function Vw(b){var c=b.a;if(b.match(1)){var d=c.value;if("GEOMETRYCOLLECTION"==d){a:{if(b.match(2)){c=[];do c.push(Vw(b));while(b.match(5));if(b.match(3)){b=c;break a}}else if(Xw(b)){b=[];break a}throw Error(Yw(b));}return new js(b)}var e=Zw[d],c=$w[d];if(!e||!c)throw Error("Invalid geometry type: "+d);b=e.call(b);return new c(b)}throw Error(Yw(b));}l.Ef=function(){if(this.match(2)){var b=ax(this);if(this.match(3))return b}else if(Xw(this))return null;throw Error(Yw(this));};
l.Df=function(){if(this.match(2)){var b=bx(this);if(this.match(3))return b}else if(Xw(this))return[];throw Error(Yw(this));};l.Ff=function(){if(this.match(2)){var b=cx(this);if(this.match(3))return b}else if(Xw(this))return[];throw Error(Yw(this));};l.Sn=function(){if(this.match(2)){var b;if(2==this.a.type)for(b=[this.Ef()];this.match(5);)b.push(this.Ef());else b=bx(this);if(this.match(3))return b}else if(Xw(this))return[];throw Error(Yw(this));};
l.Rn=function(){if(this.match(2)){var b=cx(this);if(this.match(3))return b}else if(Xw(this))return[];throw Error(Yw(this));};l.Tn=function(){if(this.match(2)){for(var b=[this.Ff()];this.match(5);)b.push(this.Ff());if(this.match(3))return b}else if(Xw(this))return[];throw Error(Yw(this));};function ax(b){for(var c=[],d=0;2>d;++d){var e=b.a;if(b.match(4))c.push(e.value);else break}if(2==c.length)return c;throw Error(Yw(b));}function bx(b){for(var c=[ax(b)];b.match(5);)c.push(ax(b));return c}
function cx(b){for(var c=[b.Df()];b.match(5);)c.push(b.Df());return c}function Xw(b){var c=1==b.a.type&&"EMPTY"==b.a.value;c&&(b.a=Uw(b.c));return c}function Yw(b){return"Unexpected `"+b.a.value+"` at position "+b.a.position+" in `"+b.c.c+"`"}var $w={POINT:D,LINESTRING:T,POLYGON:E,MULTIPOINT:$r,MULTILINESTRING:U,MULTIPOLYGON:V},Zw={POINT:Sw.prototype.Ef,LINESTRING:Sw.prototype.Df,POLYGON:Sw.prototype.Ff,MULTIPOINT:Sw.prototype.Sn,MULTILINESTRING:Sw.prototype.Rn,MULTIPOLYGON:Sw.prototype.Tn};function dx(){this.version=void 0}y(dx,Xv);dx.prototype.c=function(b){for(b=b.firstChild;b;b=b.nextSibling)if(1==b.nodeType)return this.a(b);return null};dx.prototype.a=function(b){this.version=b.getAttribute("version").trim();return(b=Q({version:this.version},ex,b,[]))?b:null};function fx(b,c){return Q({},gx,b,c)}function hx(b,c){return Q({},ix,b,c)}function jx(b,c){var d=fx(b,c);if(d){var e=[Cs(b.getAttribute("width")),Cs(b.getAttribute("height"))];d.size=e;return d}}
function kx(b,c){return Q([],lx,b,c)}
var mx=[null,"http://www.opengis.net/wms"],ex=P(mx,{Service:M(function(b,c){return Q({},nx,b,c)}),Capability:M(function(b,c){return Q({},ox,b,c)})}),ox=P(mx,{Request:M(function(b,c){return Q({},px,b,c)}),Exception:M(function(b,c){return Q([],qx,b,c)}),Layer:M(function(b,c){return Q({},rx,b,c)})}),nx=P(mx,{Name:M(W),Title:M(W),Abstract:M(W),KeywordList:M(kx),OnlineResource:M(Wv),ContactInformation:M(function(b,c){return Q({},sx,b,c)}),Fees:M(W),AccessConstraints:M(W),LayerLimit:M(Bs),MaxWidth:M(Bs),
MaxHeight:M(Bs)}),sx=P(mx,{ContactPersonPrimary:M(function(b,c){return Q({},tx,b,c)}),ContactPosition:M(W),ContactAddress:M(function(b,c){return Q({},ux,b,c)}),ContactVoiceTelephone:M(W),ContactFacsimileTelephone:M(W),ContactElectronicMailAddress:M(W)}),tx=P(mx,{ContactPerson:M(W),ContactOrganization:M(W)}),ux=P(mx,{AddressType:M(W),Address:M(W),City:M(W),StateOrProvince:M(W),PostCode:M(W),Country:M(W)}),qx=P(mx,{Format:jp(W)}),rx=P(mx,{Name:M(W),Title:M(W),Abstract:M(W),KeywordList:M(kx),CRS:lp(W),
EX_GeographicBoundingBox:M(function(b,c){var d=Q({},vx,b,c);if(d){var e=d.westBoundLongitude,f=d.southBoundLatitude,g=d.eastBoundLongitude,d=d.northBoundLatitude;return void 0===e||void 0===f||void 0===g||void 0===d?void 0:[e,f,g,d]}}),BoundingBox:lp(function(b){var c=[As(b.getAttribute("minx")),As(b.getAttribute("miny")),As(b.getAttribute("maxx")),As(b.getAttribute("maxy"))],d=[As(b.getAttribute("resx")),As(b.getAttribute("resy"))];return{crs:b.getAttribute("CRS"),extent:c,res:d}}),Dimension:lp(function(b){return{name:b.getAttribute("name"),
units:b.getAttribute("units"),unitSymbol:b.getAttribute("unitSymbol"),"default":b.getAttribute("default"),multipleValues:xs(b.getAttribute("multipleValues")),nearestValue:xs(b.getAttribute("nearestValue")),current:xs(b.getAttribute("current")),values:W(b)}}),Attribution:M(function(b,c){return Q({},wx,b,c)}),AuthorityURL:lp(function(b,c){var d=fx(b,c);if(d)return d.name=b.getAttribute("name"),d}),Identifier:lp(W),MetadataURL:lp(function(b,c){var d=fx(b,c);if(d)return d.type=b.getAttribute("type"),
d}),DataURL:lp(fx),FeatureListURL:lp(fx),Style:lp(function(b,c){return Q({},xx,b,c)}),MinScaleDenominator:M(zs),MaxScaleDenominator:M(zs),Layer:lp(function(b,c){var d=c[c.length-1],e=Q({},rx,b,c);if(e){var f=xs(b.getAttribute("queryable"));void 0===f&&(f=d.queryable);e.queryable=void 0!==f?f:!1;f=Cs(b.getAttribute("cascaded"));void 0===f&&(f=d.cascaded);e.cascaded=f;f=xs(b.getAttribute("opaque"));void 0===f&&(f=d.opaque);e.opaque=void 0!==f?f:!1;f=xs(b.getAttribute("noSubsets"));void 0===f&&(f=d.noSubsets);
e.noSubsets=void 0!==f?f:!1;(f=As(b.getAttribute("fixedWidth")))||(f=d.fixedWidth);e.fixedWidth=f;(f=As(b.getAttribute("fixedHeight")))||(f=d.fixedHeight);e.fixedHeight=f;["Style","CRS","AuthorityURL"].forEach(function(b){if(b in d){var c=Tb(e,b),c=c.concat(d[b]);e[b]=c}});"EX_GeographicBoundingBox BoundingBox Dimension Attribution MinScaleDenominator MaxScaleDenominator".split(" ").forEach(function(b){b in e||(e[b]=d[b])});return e}})}),wx=P(mx,{Title:M(W),OnlineResource:M(Wv),LogoURL:M(jx)}),vx=
P(mx,{westBoundLongitude:M(zs),eastBoundLongitude:M(zs),southBoundLatitude:M(zs),northBoundLatitude:M(zs)}),px=P(mx,{GetCapabilities:M(hx),GetMap:M(hx),GetFeatureInfo:M(hx)}),ix=P(mx,{Format:lp(W),DCPType:lp(function(b,c){return Q({},yx,b,c)})}),yx=P(mx,{HTTP:M(function(b,c){return Q({},zx,b,c)})}),zx=P(mx,{Get:M(fx),Post:M(fx)}),xx=P(mx,{Name:M(W),Title:M(W),Abstract:M(W),LegendURL:lp(jx),StyleSheetURL:M(fx),StyleURL:M(fx)}),gx=P(mx,{Format:M(W),OnlineResource:M(Wv)}),lx=P(mx,{Keyword:jp(W)});function Ax(){this.b="http://mapserver.gis.umn.edu/mapserver";this.a=new Hs;this.defaultDataProjection=null}y(Ax,ss);
Ax.prototype.hc=function(b,c){var d={featureType:this.featureType,featureNS:this.featureNS};c&&Xb(d,Rr(this,b,c));var e=[d];b.namespaceURI=this.b;var f=So(b),d=[];if(0!==b.childNodes.length){if("msGMLOutput"==f)for(var g=0,h=b.childNodes.length;g<h;g++){var k=b.childNodes[g];if(1===k.nodeType){var m=e[0],n=k.localName.replace("_layer","")+"_feature";m.featureType=n;m.featureNS=this.b;var p={};p[n]=jp(this.a.If,this.a);m=P([m.featureNS,null],p);k.namespaceURI=this.b;(k=Q([],m,k,e,this.a))&&lb(d,k)}}"FeatureCollection"==
f&&(e=Q([],this.a.a,b,[{}],this.a))&&(d=e)}return d};function Bx(){this.b=new Yv}y(Bx,Xv);Bx.prototype.c=function(b){for(b=b.firstChild;b;b=b.nextSibling)if(1==b.nodeType)return this.a(b);return null};Bx.prototype.a=function(b){this.version=b.getAttribute("version").trim();var c=this.b.a(b);if(!c)return null;c.version=this.version;return(c=Q(c,Cx,b,[]))?c:null};function Dx(b){var c=W(b).split(" ");if(c&&2==c.length)return b=+c[0],c=+c[1],isNaN(b)||isNaN(c)?void 0:[b,c]}
var Ex=[null,"http://www.opengis.net/wmts/1.0"],Fx=[null,"http://www.opengis.net/ows/1.1"],Cx=P(Ex,{Contents:M(function(b,c){return Q({},Gx,b,c)})}),Gx=P(Ex,{Layer:lp(function(b,c){return Q({},Hx,b,c)}),TileMatrixSet:lp(function(b,c){return Q({},Ix,b,c)})}),Hx=P(Ex,{Style:lp(function(b,c){var d=Q({},Jx,b,c);if(d){var e="true"===b.getAttribute("isDefault");d.isDefault=e;return d}}),Format:lp(W),TileMatrixSetLink:lp(function(b,c){return Q({},Kx,b,c)}),Dimension:lp(function(b,c){return Q({},Lx,b,c)}),
ResourceURL:lp(function(b){var c=b.getAttribute("format"),d=b.getAttribute("template");b=b.getAttribute("resourceType");var e={};c&&(e.format=c);d&&(e.template=d);b&&(e.resourceType=b);return e})},P(Fx,{Title:M(W),Abstract:M(W),WGS84BoundingBox:M(function(b,c){var d=Q([],Mx,b,c);return 2!=d.length?void 0:Nd(d)}),Identifier:M(W)})),Jx=P(Ex,{LegendURL:lp(function(b){var c={};c.format=b.getAttribute("format");c.href=Wv(b);return c})},P(Fx,{Title:M(W),Identifier:M(W)})),Kx=P(Ex,{TileMatrixSet:M(W)}),
Lx=P(Ex,{Default:M(W),Value:lp(W)},P(Fx,{Identifier:M(W)})),Mx=P(Fx,{LowerCorner:jp(Dx),UpperCorner:jp(Dx)}),Ix=P(Ex,{WellKnownScaleSet:M(W),TileMatrix:lp(function(b,c){return Q({},Nx,b,c)})},P(Fx,{SupportedCRS:M(W),Identifier:M(W)})),Nx=P(Ex,{TopLeftCorner:M(Dx),ScaleDenominator:M(zs),TileWidth:M(Bs),TileHeight:M(Bs),MatrixWidth:M(Bs),MatrixHeight:M(Bs)},P(Fx,{Identifier:M(W)}));var Ox=new Ae(6378137);function Px(b){id.call(this);b=b||{};this.a=null;this.f=Ze;this.b=void 0;C(this,kd("projection"),this.zl,!1,this);C(this,kd("tracking"),this.Al,!1,this);void 0!==b.projection&&this.Wg(Fe(b.projection));void 0!==b.trackingOptions&&this.ei(b.trackingOptions);this.qe(void 0!==b.tracking?b.tracking:!1)}y(Px,id);l=Px.prototype;l.X=function(){this.qe(!1);Px.da.X.call(this)};l.zl=function(){var b=this.Ug();b&&(this.f=Je(Fe("EPSG:4326"),b),this.a&&this.set("position",this.f(this.a)))};
l.Al=function(){if(aj){var b=this.Vg();b&&void 0===this.b?this.b=ba.navigator.geolocation.watchPosition(ra(this.$n,this),ra(this.ao,this),this.Gg()):b||void 0===this.b||(ba.navigator.geolocation.clearWatch(this.b),this.b=void 0)}};
l.$n=function(b){b=b.coords;this.set("accuracy",b.accuracy);this.set("altitude",null===b.altitude?void 0:b.altitude);this.set("altitudeAccuracy",null===b.altitudeAccuracy?void 0:b.altitudeAccuracy);this.set("heading",null===b.heading?void 0:Wa(b.heading));this.a?(this.a[0]=b.longitude,this.a[1]=b.latitude):this.a=[b.longitude,b.latitude];var c=this.f(this.a);this.set("position",c);this.set("speed",null===b.speed?void 0:b.speed);b=Kf(Ox,this.a,b.accuracy);b.mc(this.f);this.set("accuracyGeometry",b);
this.s()};l.ao=function(b){b.type="error";this.qe(!1);this.o(b)};l.zj=function(){return this.get("accuracy")};l.Aj=function(){return this.get("accuracyGeometry")||null};l.Cj=function(){return this.get("altitude")};l.Dj=function(){return this.get("altitudeAccuracy")};l.xl=function(){return this.get("heading")};l.yl=function(){return this.get("position")};l.Ug=function(){return this.get("projection")};l.hk=function(){return this.get("speed")};l.Vg=function(){return this.get("tracking")};l.Gg=function(){return this.get("trackingOptions")};
l.Wg=function(b){this.set("projection",b)};l.qe=function(b){this.set("tracking",b)};l.ei=function(b){this.set("trackingOptions",b)};function Qx(b,c,d){df.call(this);this.Tf(b,c?c:0,d)}y(Qx,df);l=Qx.prototype;l.clone=function(){var b=new Qx(null),c=this.v.slice();ff(b,this.b,c);b.s();return b};l.mb=function(b,c,d,e){var f=this.v;b-=f[0];var g=c-f[1];c=b*b+g*g;if(c<e){if(0===c)for(e=0;e<this.a;++e)d[e]=f[e];else for(e=this.yf()/Math.sqrt(c),d[0]=f[0]+e*b,d[1]=f[1]+e*g,e=2;e<this.a;++e)d[e]=f[e];d.length=this.a;return c}return e};l.rc=function(b,c){var d=this.v,e=b-d[0],d=c-d[1];return e*e+d*d<=Rx(this)};
l.vd=function(){return this.v.slice(0,this.a)};l.Vd=function(b){var c=this.v,d=c[this.a]-c[0];return Rd(c[0]-d,c[1]-d,c[0]+d,c[1]+d,b)};l.yf=function(){return Math.sqrt(Rx(this))};function Rx(b){var c=b.v[b.a]-b.v[0];b=b.v[b.a+1]-b.v[1];return c*c+b*b}l.V=function(){return"Circle"};l.Da=function(b){var c=this.J();return pe(b,c)?(c=this.vd(),b[0]<=c[0]&&b[2]>=c[0]||b[1]<=c[1]&&b[3]>=c[1]?!0:de(b,this.ng,this)):!1};
l.Ul=function(b){var c=this.a,d=this.v[c]-this.v[0],e=b.slice();e[c]=e[0]+d;for(d=1;d<c;++d)e[c+d]=b[d];ff(this,this.b,e);this.s()};l.Tf=function(b,c,d){if(b){gf(this,d,b,0);this.v||(this.v=[]);d=this.v;b=pf(d,b);d[b++]=d[0]+c;var e;c=1;for(e=this.a;c<e;++c)d[b++]=d[c];d.length=b}else ff(this,"XY",null);this.s()};l.Vl=function(b){this.v[this.a]=this.v[0]+b;this.s()};function Sx(b,c,d){for(var e=[],f=b(0),g=b(1),h=c(f),k=c(g),m=[g,f],n=[k,h],p=[1,0],q={},r=1E5,t,x,z,B,A;0<--r&&0<p.length;)z=p.pop(),f=m.pop(),h=n.pop(),g=z.toString(),g in q||(e.push(h[0],h[1]),q[g]=!0),B=p.pop(),g=m.pop(),k=n.pop(),A=(z+B)/2,t=b(A),x=c(t),Ua(x[0],x[1],h[0],h[1],k[0],k[1])<d?(e.push(k[0],k[1]),g=B.toString(),q[g]=!0):(p.push(B,A,A,z),n.push(k,x,x,h),m.push(g,t,t,f));return e}function Tx(b,c,d,e,f){var g=Fe("EPSG:4326");return Sx(function(e){return[b,c+(d-c)*e]},Ye(g,e),f)}
function Ux(b,c,d,e,f){var g=Fe("EPSG:4326");return Sx(function(e){return[c+(d-c)*e,b]},Ye(g,e),f)};function Vx(b){b=b||{};this.g=this.l=null;this.b=this.j=Infinity;this.f=this.i=-Infinity;this.D=this.C=Infinity;this.ia=this.G=-Infinity;this.U=void 0!==b.targetSize?b.targetSize:100;this.oa=void 0!==b.maxLines?b.maxLines:100;this.a=[];this.c=[];this.S=void 0!==b.strokeStyle?b.strokeStyle:Wx;this.A=this.B=void 0;this.u=null;this.setMap(void 0!==b.map?b.map:null)}var Wx=new am({color:"rgba(0,0,0,0.2)"}),Xx=[90,45,30,20,10,5,2,1,.5,.2,.1,.05,.01,.005,.002,.001];
function Yx(b,c,d,e,f,g,h){var k=h;c=Tx(c,d,e,b.g,f);k=void 0!==b.a[k]?b.a[k]:new T(null);k.ba("XY",c);pe(k.J(),g)&&(b.a[h++]=k);return h}function Zx(b,c,d,e,f){var g=f;c=Ux(c,b.f,b.b,b.g,d);g=void 0!==b.c[g]?b.c[g]:new T(null);g.ba("XY",c);pe(g.J(),e)&&(b.c[f++]=g);return f}l=Vx.prototype;l.Bl=function(){return this.l};l.Vj=function(){return this.a};l.bk=function(){return this.c};
l.Kg=function(b){var c=b.vectorContext,d=b.frameState,e=d.extent;b=d.viewState;var f=b.center,g=b.projection,h=b.resolution;b=d.pixelRatio;b=h*h/(4*b*b);if(!this.g||!Xe(this.g,g)){var k=Fe("EPSG:4326"),m=g.J(),n=g.i,p=af(n,k,g),q=n[2],r=n[1],t=n[0],x=p[3],z=p[2],B=p[1],p=p[0];this.j=n[3];this.b=q;this.i=r;this.f=t;this.C=x;this.D=z;this.G=B;this.ia=p;this.B=Ye(k,g);this.A=Ye(g,k);this.u=this.A(me(m));this.g=g}k=0;g.b&&(g=g.J(),k=ke(g),d=d.focus[0],d<g[0]||d>g[2])&&(k*=Math.ceil((g[0]-d)/k),e=[e[0]+
k,e[1],e[2]+k,e[3]]);d=this.u[0];g=this.u[1];k=-1;n=Math.pow(this.U*h,2);q=[];r=[];h=0;for(m=Xx.length;h<m;++h){t=Xx[h]/2;q[0]=d-t;q[1]=g-t;r[0]=d+t;r[1]=g+t;this.B(q,q);this.B(r,r);t=Math.pow(r[0]-q[0],2)+Math.pow(r[1]-q[1],2);if(t<=n)break;k=Xx[h]}h=k;if(-1==h)this.a.length=this.c.length=0;else{d=this.A(f);f=d[0];d=d[1];g=this.oa;k=[Math.max(e[0],this.ia),Math.max(e[1],this.G),Math.min(e[2],this.D),Math.min(e[3],this.C)];k=af(k,this.g,"EPSG:4326");n=k[3];r=k[1];f=Math.floor(f/h)*h;q=Sa(f,this.f,
this.b);m=Yx(this,q,r,n,b,e,0);for(k=0;q!=this.f&&k++<g;)q=Math.max(q-h,this.f),m=Yx(this,q,r,n,b,e,m);q=Sa(f,this.f,this.b);for(k=0;q!=this.b&&k++<g;)q=Math.min(q+h,this.b),m=Yx(this,q,r,n,b,e,m);this.a.length=m;d=Math.floor(d/h)*h;f=Sa(d,this.i,this.j);m=Zx(this,f,b,e,0);for(k=0;f!=this.i&&k++<g;)f=Math.max(f-h,this.i),m=Zx(this,f,b,e,m);f=Sa(d,this.i,this.j);for(k=0;f!=this.j&&k++<g;)f=Math.min(f+h,this.j),m=Zx(this,f,b,e,m);this.c.length=m}c.$a(null,this.S);b=0;for(f=this.a.length;b<f;++b)h=this.a[b],
c.Wb(h,null);b=0;for(f=this.c.length;b<f;++b)h=this.c[b],c.Wb(h,null)};l.setMap=function(b){this.l&&(this.l.K("postcompose",this.Kg,this),this.l.render());b&&(b.H("postcompose",this.Kg,this),b.render());this.l=b};function $x(b,c,d,e,f,g,h){gk.call(this,b,c,d,0,e);this.l=f;this.c=new Image;g&&(this.c.crossOrigin=g);this.g={};this.f=null;this.state=0;this.i=h}y($x,gk);$x.prototype.a=function(b){if(void 0!==b){var c=w(b);if(c in this.g)return this.g[c];b=Qb(this.g)?this.c:this.c.cloneNode(!1);return this.g[c]=b}return this.c};$x.prototype.B=function(){this.state=3;this.f.forEach(Zc);this.f=null;hk(this)};
$x.prototype.u=function(){void 0===this.resolution&&(this.resolution=le(this.extent)/this.c.height);this.state=2;this.f.forEach(Zc);this.f=null;hk(this)};$x.prototype.load=function(){0==this.state&&(this.state=1,hk(this),this.f=[Xc(this.c,"error",this.B,!1,this),Xc(this.c,"load",this.u,!1,this)],this.i(this,this.l))};function ay(b,c,d,e,f){wh.call(this,b,c);this.i=d;this.c=new Image;e&&(this.c.crossOrigin=e);this.b={};this.j=null;this.l=f}y(ay,wh);l=ay.prototype;l.X=function(){1==this.state&&by(this);ay.da.X.call(this)};l.Sa=function(b){if(void 0!==b){var c=w(b);if(c in this.b)return this.b[c];b=Qb(this.b)?this.c:this.c.cloneNode(!1);return this.b[c]=b}return this.c};l.tb=function(){return this.i};l.Cl=function(){this.state=3;by(this);xh(this)};
l.Dl=function(){this.state=this.c.naturalWidth&&this.c.naturalHeight?2:4;by(this);xh(this)};l.load=function(){0==this.state&&(this.state=1,xh(this),this.j=[Xc(this.c,"error",this.Cl,!1,this),Xc(this.c,"load",this.Dl,!1,this)],this.l(this,this.i))};function by(b){b.j.forEach(Zc);b.j=null};function cy(b,c,d){return function(e,f,g){return d(b,c,e,f,g)}}function dy(){};function ey(b,c){cd.call(this);this.a=new zr(this);var d=b;c&&(d=Cg(b));this.a.Qa(d,"dragenter",this.Jn);d!=b&&this.a.Qa(d,"dragover",this.Kn);this.a.Qa(b,"dragover",this.Ln);this.a.Qa(b,"drop",this.Mn)}y(ey,cd);l=ey.prototype;l.kd=!1;l.X=function(){ey.da.X.call(this);this.a.Ec()};l.Jn=function(b){var c=b.a.dataTransfer;(this.kd=!(!c||!(c.types&&(0<=$a(c.types,"Files")||0<=$a(c.types,"public.file-url"))||c.files&&0<c.files.length)))&&b.preventDefault()};
l.Kn=function(b){this.kd&&(b.preventDefault(),b.a.dataTransfer.dropEffect="none")};l.Ln=function(b){if(this.kd){b.preventDefault();b.b();b=b.a.dataTransfer;try{b.effectAllowed="all"}catch(c){}b.dropEffect="copy"}};l.Mn=function(b){this.kd&&(b.preventDefault(),b.b(),b=new Ac(b.a),b.type="drop",this.o(b))};/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function fy(b,c){this.g=[];this.C=b;this.A=c||null;this.f=this.a=!1;this.b=void 0;this.B=this.D=this.i=!1;this.j=0;this.c=null;this.l=0}fy.prototype.cancel=function(b){if(this.a)this.b instanceof fy&&this.b.cancel();else{if(this.c){var c=this.c;delete this.c;b?c.cancel(b):(c.l--,0>=c.l&&c.cancel())}this.C?this.C.call(this.A,this):this.B=!0;this.a||(b=new gy,hy(this),iy(this,!1,b))}};fy.prototype.u=function(b,c){this.i=!1;iy(this,b,c)};function iy(b,c,d){b.a=!0;b.b=d;b.f=!c;jy(b)}
function hy(b){if(b.a){if(!b.B)throw new ky;b.B=!1}}fy.prototype.$c=function(b){hy(this);iy(this,!0,b)};function ly(b,c,d,e){b.g.push([c,d,e]);b.a&&jy(b)}fy.prototype.then=function(b,c,d){var e,f,g=new Hn(function(b,c){e=b;f=c});ly(this,e,function(b){b instanceof gy?g.cancel():f(b)});return g.then(b,c,d)};un(fy);function my(b){return eb(b.g,function(b){return ka(b[1])})}
function jy(b){if(b.j&&b.a&&my(b)){var c=b.j,d=ny[c];d&&(ba.clearTimeout(d.wa),delete ny[c]);b.j=0}b.c&&(b.c.l--,delete b.c);for(var c=b.b,e=d=!1;b.g.length&&!b.i;){var f=b.g.shift(),g=f[0],h=f[1],f=f[2];if(g=b.f?h:g)try{var k=g.call(f||b.A,c);ca(k)&&(b.f=b.f&&(k==c||k instanceof Error),b.b=c=k);if(vn(c)||"function"===typeof ba.Promise&&c instanceof ba.Promise)e=!0,b.i=!0}catch(m){c=m,b.f=!0,my(b)||(d=!0)}}b.b=c;e&&(k=ra(b.u,b,!0),e=ra(b.u,b,!1),c instanceof fy?(ly(c,k,e),c.D=!0):c.then(k,e));d&&
(c=new oy(c),ny[c.wa]=c,b.j=c.wa)}function ky(){xa.call(this)}y(ky,xa);ky.prototype.message="Deferred has already fired";ky.prototype.name="AlreadyCalledError";function gy(){xa.call(this)}y(gy,xa);gy.prototype.message="Deferred was canceled";gy.prototype.name="CanceledError";function oy(b){this.wa=ba.setTimeout(ra(this.c,this),0);this.a=b}oy.prototype.c=function(){delete ny[this.wa];throw this.a;};var ny={};function py(b,c){ca(b.name)?(this.name=b.name,this.code=qy[b.name]):(this.code=b.code,this.name=ry(b.code));xa.call(this,Ba("%s %s",this.name,c))}y(py,xa);function ry(b){var c=Pb(qy,function(c){return b==c});if(!ca(c))throw Error("Invalid code: "+b);return c}var qy={AbortError:3,EncodingError:5,InvalidModificationError:9,InvalidStateError:7,NotFoundError:1,NotReadableError:4,NoModificationAllowedError:6,PathExistsError:12,QuotaExceededError:10,SecurityError:2,SyntaxError:8,TypeMismatchError:11};function sy(b,c){vc.call(this,b.type,c)}y(sy,vc);function ty(){cd.call(this);this.ub=new FileReader;this.ub.onloadstart=ra(this.a,this);this.ub.onprogress=ra(this.a,this);this.ub.onload=ra(this.a,this);this.ub.onabort=ra(this.a,this);this.ub.onerror=ra(this.a,this);this.ub.onloadend=ra(this.a,this)}y(ty,cd);ty.prototype.getError=function(){return this.ub.error&&new py(this.ub.error,"reading file")};ty.prototype.a=function(b){this.o(new sy(b,this))};ty.prototype.X=function(){ty.da.X.call(this);delete this.ub};
function uy(b){var c=new fy;b.Qa("loadend",sa(function(b,c){var f=c.ub.result,g=c.getError();null==f||g?(hy(b),iy(b,!1,g)):b.$c(f);c.Ec()},c,b));return c};function vy(b){b=b?b:{};Ok.call(this,{handleEvent:ue});this.j=b.formatConstructors?b.formatConstructors:[];this.A=b.projection?Fe(b.projection):null;this.f=null;this.a=void 0}y(vy,Ok);vy.prototype.X=function(){this.a&&Zc(this.a);vy.da.X.call(this)};vy.prototype.i=function(b){b=b.a.dataTransfer.files;var c,d,e;c=0;for(d=b.length;c<d;++c){e=b[c];var f;f=e;var g=new ty,h=uy(g);g.ub.readAsText(f,"");f=h;e=sa(this.l,e);ly(f,e,null,this)}};
vy.prototype.l=function(b,c){var d=this.u,e=this.A;e||(e=d.aa().g);var d=this.j,f=[],g,h;g=0;for(h=d.length;g<h;++g){var k=new d[g],m;try{m=k.Ba(c)}catch(t){m=null}if(m){var k=k.Ia(c),k=Ye(k,e),n,p;n=0;for(p=m.length;n<p;++n){var q=m[n],r=q.W();r&&r.mc(k);f.push(q)}}}this.o(new wy(xy,this,b,f,e))};vy.prototype.setMap=function(b){this.a&&(Zc(this.a),this.a=void 0);this.f&&(uc(this.f),this.f=null);vy.da.setMap.call(this,b);b&&(this.f=new ey(b.a),this.a=C(this.f,"drop",this.i,!1,this))};var xy="addfeatures";
function wy(b,c,d,e,f){vc.call(this,b,c);this.features=e;this.file=d;this.projection=f}y(wy,vc);function yy(b,c){this.x=b;this.y=c}y(yy,yg);yy.prototype.clone=function(){return new yy(this.x,this.y)};yy.prototype.scale=yg.prototype.scale;yy.prototype.add=function(b){this.x+=b.x;this.y+=b.y;return this};yy.prototype.rotate=function(b){var c=Math.cos(b);b=Math.sin(b);var d=this.y*c+this.x*b;this.x=this.x*c-this.y*b;this.y=d;return this};function zy(b){b=b?b:{};al.call(this,{handleDownEvent:Ay,handleDragEvent:By,handleUpEvent:Cy});this.l=b.condition?b.condition:Yk;this.a=this.f=void 0;this.i=0;this.A=b.duration?b.duration:400}y(zy,al);
function By(b){if($k(b)){var c=b.map,d=c.Ra();b=b.pixel;b=new yy(b[0]-d[0]/2,d[1]/2-b[1]);d=Math.atan2(b.y,b.x);b=Math.sqrt(b.x*b.x+b.y*b.y);var e=c.aa();c.render();if(void 0!==this.f){var f=d-this.f;Pk(c,e,e.Ea()-f)}this.f=d;void 0!==this.a&&(d=this.a*(e.$()/b),Rk(c,e,d));void 0!==this.a&&(this.i=this.a/b);this.a=b}}
function Cy(b){if(!$k(b))return!0;b=b.map;var c=b.aa();Tf(c,-1);var d=this.i-1,e=c.Ea(),e=c.constrainRotation(e,0);Pk(b,c,e,void 0,void 0);var e=c.$(),f=this.A,e=c.constrainResolution(e,0,d);Rk(b,c,e,void 0,f);this.i=0;return!1}function Ay(b){return $k(b)&&this.l(b)?(Tf(b.map.aa(),1),this.a=this.f=void 0,!0):!1};function Dy(b,c){vc.call(this,b);this.feature=c}y(Dy,vc);
function Ey(b){al.call(this,{handleDownEvent:Fy,handleEvent:Gy,handleUpEvent:Hy});this.ea=null;this.U=!1;this.Db=b.source?b.source:null;this.fb=b.features?b.features:null;this.zi=b.snapTolerance?b.snapTolerance:12;this.T=b.type;this.f=Iy(this.T);this.xa=b.minPoints?b.minPoints:this.f===Jy?3:2;this.pa=b.maxPoints?b.maxPoints:Infinity;var c=b.geometryFunction;if(!c)if("Circle"===this.T)c=function(b,c){var d=c?c:new Qx([NaN,NaN]);d.Tf(b[0],Math.sqrt(xd(b[0],b[1])));return d};else{var d,c=this.f;c===
Ky?d=D:c===Ly?d=T:c===Jy&&(d=E);c=function(b,c){var g=c;g?g.ma(b):g=new d(b);return g}}this.D=c;this.S=this.A=this.a=this.G=this.i=this.l=null;this.gj=b.clickTolerance?b.clickTolerance*b.clickTolerance:36;this.ga=new H({source:new R({useSpatialIndex:!1,wrapX:b.wrapX?b.wrapX:!1}),style:b.style?b.style:My()});this.Cb=b.geometryName;this.Xe=b.condition?b.condition:Xk;this.va=b.freehandCondition?b.freehandCondition:Yk;C(this,kd("active"),this.ki,!1,this)}y(Ey,al);
function My(){var b=hm();return function(c){return b[c.W().V()]}}l=Ey.prototype;l.setMap=function(b){Ey.da.setMap.call(this,b);this.ki()};function Gy(b){var c=!this.U;this.U&&b.type===Yj?(Ny(this,b),c=!1):b.type===Xj?c=Oy(this,b):b.type===Rj&&(c=!1);return bl.call(this,b)&&c}function Fy(b){if(this.Xe(b))return this.ea=b.pixel,!0;if(this.f!==Ly&&this.f!==Jy||!this.va(b))return!1;this.ea=b.pixel;this.U=!0;this.l||Py(this,b);return!0}
function Hy(b){this.U=!1;var c=this.ea,d=b.pixel,e=c[0]-d[0],c=c[1]-d[1],d=!0;e*e+c*c<=this.gj&&(Oy(this,b),this.l?this.f===Qy?this.md():Ry(this,b)?this.md():Ny(this,b):(Py(this,b),this.f===Ky&&this.md()),d=!1);return d}
function Oy(b,c){if(b.l){var d=c.coordinate,e=b.i.W(),f;b.f===Ky?f=b.a:b.f===Jy?(f=b.a[0],f=f[f.length-1],Ry(b,c)&&(d=b.l.slice())):(f=b.a,f=f[f.length-1]);f[0]=d[0];f[1]=d[1];b.D(b.a,e);b.G&&b.G.W().ma(d);e instanceof E&&b.f!==Jy?(b.A||(b.A=new sn(new T(null))),e=e.Bg(0),d=b.A.W(),d.ba(e.b,e.ja())):b.S&&(d=b.A.W(),d.ma(b.S));Sy(b)}else d=c.coordinate.slice(),b.G?b.G.W().ma(d):(b.G=new sn(new D(d)),Sy(b));return!0}
function Ry(b,c){var d=!1;if(b.i){var e=!1,f=[b.l];b.f===Ly?e=b.a.length>b.xa:b.f===Jy&&(e=b.a[0].length>b.xa,f=[b.a[0][0],b.a[0][b.a[0].length-2]]);if(e)for(var e=c.map,g=0,h=f.length;g<h;g++){var k=f[g],m=e.Oa(k),n=c.pixel,d=n[0]-m[0],m=n[1]-m[1],n=b.U&&b.va(c)?1:b.zi;if(d=Math.sqrt(d*d+m*m)<=n){b.l=k;break}}}return d}
function Py(b,c){var d=c.coordinate;b.l=d;b.f===Ky?b.a=d.slice():b.f===Jy?(b.a=[[d.slice(),d.slice()]],b.S=b.a[0]):(b.a=[d.slice(),d.slice()],b.f===Qy&&(b.S=b.a));b.S&&(b.A=new sn(new T(b.S)));d=b.D(b.a);b.i=new sn;b.Cb&&b.i.vc(b.Cb);b.i.La(d);Sy(b);b.o(new Dy("drawstart",b.i))}
function Ny(b,c){var d=c.coordinate,e=b.i.W(),f,g;if(b.f===Ly)b.l=d.slice(),g=b.a,g.push(d.slice()),f=g.length>b.pa,b.D(g,e);else if(b.f===Jy){g=b.a[0];g.push(d.slice());if(f=g.length>b.pa)b.l=g[0];b.D(b.a,e)}Sy(b);f&&b.md()}l.Ao=function(){var b=this.i.W(),c,d;this.f===Ly?(c=this.a,c.splice(-2,1),this.D(c,b)):this.f===Jy&&(c=this.a[0],c.splice(-2,1),d=this.A.W(),d.ma(c),this.D(this.a,b));0===c.length&&(this.l=null);Sy(this)};
l.md=function(){var b=Ty(this),c=this.a,d=b.W();this.f===Ly?(c.pop(),this.D(c,d)):this.f===Jy&&(c[0].pop(),c[0].push(c[0][0]),this.D(c,d));"MultiPoint"===this.T?b.La(new $r([c])):"MultiLineString"===this.T?b.La(new U([c])):"MultiPolygon"===this.T&&b.La(new V([c]));this.o(new Dy("drawend",b));this.fb&&this.fb.push(b);this.Db&&this.Db.Ad(b)};function Ty(b){b.l=null;var c=b.i;c&&(b.i=null,b.G=null,b.A=null,b.ga.fa().clear(!0));return c}
l.bm=function(b){var c=b.W();this.i=b;this.a=c.Y();b=this.a[this.a.length-1];this.l=b.slice();this.a.push(b.slice());Sy(this);this.o(new Dy("drawstart",this.i))};l.xc=te;function Sy(b){var c=[];b.i&&c.push(b.i);b.A&&c.push(b.A);b.G&&c.push(b.G);b=b.ga.fa();b.clear(!0);b.Dc(c)}l.ki=function(){var b=this.u,c=this.b();b&&c||Ty(this);this.ga.setMap(c?b:null)};
function Iy(b){var c;"Point"===b||"MultiPoint"===b?c=Ky:"LineString"===b||"MultiLineString"===b?c=Ly:"Polygon"===b||"MultiPolygon"===b?c=Jy:"Circle"===b&&(c=Qy);return c}var Ky="Point",Ly="LineString",Jy="Polygon",Qy="Circle";function Uy(b,c,d){vc.call(this,b);this.features=c;this.mapBrowserPointerEvent=d}y(Uy,vc);
function Vy(b){al.call(this,{handleDownEvent:Wy,handleDragEvent:Xy,handleEvent:Yy,handleUpEvent:Zy});this.pa=b.deleteCondition?b.deleteCondition:ze(Xk,Wk);this.va=this.f=null;this.ea=[0,0];this.D=this.U=!1;this.a=new Bp;this.G=void 0!==b.pixelTolerance?b.pixelTolerance:10;this.l=this.ga=!1;this.i=null;this.S=new H({source:new R({useSpatialIndex:!1,wrapX:!!b.wrapX}),style:b.style?b.style:$y(),updateWhileAnimating:!0,updateWhileInteracting:!0});this.T={Point:this.im,LineString:this.bh,LinearRing:this.bh,
Polygon:this.jm,MultiPoint:this.gm,MultiLineString:this.fm,MultiPolygon:this.hm,GeometryCollection:this.em};this.A=b.features;this.A.forEach(this.zf,this);C(this.A,"add",this.cm,!1,this);C(this.A,"remove",this.dm,!1,this)}y(Vy,al);l=Vy.prototype;l.zf=function(b){var c=b.W();c.V()in this.T&&this.T[c.V()].call(this,b,c);(c=this.u)&&az(this,this.ea,c);C(b,"change",this.ah,!1,this)};function bz(b,c){b.D||(b.D=!0,b.o(new Uy("modifystart",b.A,c)))}
function cz(b,c){dz(b,c);b.f&&0===b.A.$b()&&(b.S.fa().Qc(b.f),b.f=null);Yc(c,"change",b.ah,!1,b)}function dz(b,c){var d=b.a,e=[];d.forEach(function(b){c===b.feature&&e.push(b)});for(var f=e.length-1;0<=f;--f)d.remove(e[f])}l.setMap=function(b){this.S.setMap(b);Vy.da.setMap.call(this,b)};l.cm=function(b){this.zf(b.element)};l.ah=function(b){this.l||(b=b.target,cz(this,b),this.zf(b))};l.dm=function(b){cz(this,b.element)};
l.im=function(b,c){var d=c.Y(),d={feature:b,geometry:c,la:[d,d]};this.a.ya(c.J(),d)};l.gm=function(b,c){var d=c.Y(),e,f,g;f=0;for(g=d.length;f<g;++f)e=d[f],e={feature:b,geometry:c,depth:[f],index:f,la:[e,e]},this.a.ya(c.J(),e)};l.bh=function(b,c){var d=c.Y(),e,f,g,h;e=0;for(f=d.length-1;e<f;++e)g=d.slice(e,e+2),h={feature:b,geometry:c,index:e,la:g},this.a.ya(Nd(g),h)};
l.fm=function(b,c){var d=c.Y(),e,f,g,h,k,m,n;h=0;for(k=d.length;h<k;++h)for(e=d[h],f=0,g=e.length-1;f<g;++f)m=e.slice(f,f+2),n={feature:b,geometry:c,depth:[h],index:f,la:m},this.a.ya(Nd(m),n)};l.jm=function(b,c){var d=c.Y(),e,f,g,h,k,m,n;h=0;for(k=d.length;h<k;++h)for(e=d[h],f=0,g=e.length-1;f<g;++f)m=e.slice(f,f+2),n={feature:b,geometry:c,depth:[h],index:f,la:m},this.a.ya(Nd(m),n)};
l.hm=function(b,c){var d=c.Y(),e,f,g,h,k,m,n,p,q,r;m=0;for(n=d.length;m<n;++m)for(p=d[m],h=0,k=p.length;h<k;++h)for(e=p[h],f=0,g=e.length-1;f<g;++f)q=e.slice(f,f+2),r={feature:b,geometry:c,depth:[h,m],index:f,la:q},this.a.ya(Nd(q),r)};l.em=function(b,c){var d,e=c.f;for(d=0;d<e.length;++d)this.T[e[d].V()].call(this,b,e[d])};function ez(b,c){var d=b.f;d?d.W().ma(c):(d=new sn(new D(c)),b.f=d,b.S.fa().Ad(d))}function fz(b,c){return b.index-c.index}
function Wy(b){az(this,b.pixel,b.map);this.i=[];this.D=!1;var c=this.f;if(c){var d=[],c=c.W().Y(),e=Nd([c]),e=Ep(this.a,e),f={};e.sort(fz);for(var g=0,h=e.length;g<h;++g){var k=e[g],m=k.la,n=w(k.feature),p=k.depth;p&&(n+="-"+p.join("-"));f[n]||(f[n]=Array(2));if(vd(m[0],c)&&!f[n][0])this.i.push([k,0]),f[n][0]=k;else if(vd(m[1],c)&&!f[n][1]){if("LineString"!==k.geometry.V()&&"MultiLineString"!==k.geometry.V()||!f[n][0]||0!==f[n][0].index)this.i.push([k,1]),f[n][1]=k}else w(m)in this.va&&!f[n][0]&&
!f[n][1]&&d.push([k,c])}d.length&&bz(this,b);for(g=d.length-1;0<=g;--g)this.al.apply(this,d[g])}return!!this.f}
function Xy(b){this.U=!1;bz(this,b);b=b.coordinate;for(var c=0,d=this.i.length;c<d;++c){for(var e=this.i[c],f=e[0],g=f.depth,h=f.geometry,k=h.Y(),m=f.la,e=e[1];b.length<h.ra();)b.push(0);switch(h.V()){case "Point":k=b;m[0]=m[1]=b;break;case "MultiPoint":k[f.index]=b;m[0]=m[1]=b;break;case "LineString":k[f.index+e]=b;m[e]=b;break;case "MultiLineString":k[g[0]][f.index+e]=b;m[e]=b;break;case "Polygon":k[g[0]][f.index+e]=b;m[e]=b;break;case "MultiPolygon":k[g[1]][g[0]][f.index+e]=b,m[e]=b}f=h;this.l=
!0;f.ma(k);this.l=!1}ez(this,b)}function Zy(b){for(var c,d=this.i.length-1;0<=d;--d)c=this.i[d][0],Cp(this.a,Nd(c.la),c);this.D&&(this.o(new Uy("modifyend",this.A,b)),this.D=!1);return!1}
function Yy(b){if(!(b instanceof Nj))return!0;var c;b.map.aa().b.slice()[1]||b.type!=Xj||this.C||(this.ea=b.pixel,az(this,b.pixel,b.map));if(this.f&&this.pa(b))if(b.type==Sj&&this.U)c=!0;else{this.f.W();bz(this,b);c=this.i;var d={},e,f,g,h,k,m,n,p,q;for(k=c.length-1;0<=k;--k)if(g=c[k],p=g[0],h=p.geometry,f=h.Y(),q=w(p.feature),p.depth&&(q+="-"+p.depth.join("-")),n=e=m=void 0,0===g[1]?(e=p,m=p.index):1==g[1]&&(n=p,m=p.index+1),q in d||(d[q]=[n,e,m]),g=d[q],void 0!==n&&(g[0]=n),void 0!==e&&(g[1]=e),
void 0!==g[0]&&void 0!==g[1]){e=f;q=!1;n=m-1;switch(h.V()){case "MultiLineString":f[p.depth[0]].splice(m,1);q=!0;break;case "LineString":f.splice(m,1);q=!0;break;case "MultiPolygon":e=e[p.depth[1]];case "Polygon":e=e[p.depth[0]],4<e.length&&(m==e.length-1&&(m=0),e.splice(m,1),q=!0,0===m&&(e.pop(),e.push(e[0]),n=e.length-1))}q&&(this.a.remove(g[0]),this.a.remove(g[1]),e=h,this.l=!0,e.ma(f),this.l=!1,f={depth:p.depth,feature:p.feature,geometry:p.geometry,index:n,la:[g[0].la[0],g[1].la[1]]},this.a.ya(Nd(f.la),
f),gz(this,h,m,p.depth,-1),this.f&&(this.S.fa().Qc(this.f),this.f=null))}c=!0;this.o(new Uy("modifyend",this.A,b));this.D=!1}b.type==Sj&&(this.U=!1);return bl.call(this,b)&&!c}
function az(b,c,d){function e(b,c){return yd(f,b.la)-yd(f,c.la)}var f=d.Fa(c),g=d.Fa([c[0]-b.G,c[1]+b.G]),h=d.Fa([c[0]+b.G,c[1]-b.G]),g=Nd([g,h]),g=Ep(b.a,g);if(0<g.length){g.sort(e);var h=g[0].la,k=sd(f,h),m=d.Oa(k);if(Math.sqrt(xd(c,m))<=b.G){c=d.Oa(h[0]);d=d.Oa(h[1]);c=xd(m,c);d=xd(m,d);b.ga=Math.sqrt(Math.min(c,d))<=b.G;b.ga&&(k=c>d?h[1]:h[0]);ez(b,k);d={};d[w(h)]=!0;c=1;for(m=g.length;c<m;++c)if(k=g[c].la,vd(h[0],k[0])&&vd(h[1],k[1])||vd(h[0],k[1])&&vd(h[1],k[0]))d[w(k)]=!0;else break;b.va=d;
return}}b.f&&(b.S.fa().Qc(b.f),b.f=null)}
l.al=function(b,c){for(var d=b.la,e=b.feature,f=b.geometry,g=b.depth,h=b.index,k;c.length<f.ra();)c.push(0);switch(f.V()){case "MultiLineString":k=f.Y();k[g[0]].splice(h+1,0,c);break;case "Polygon":k=f.Y();k[g[0]].splice(h+1,0,c);break;case "MultiPolygon":k=f.Y();k[g[1]][g[0]].splice(h+1,0,c);break;case "LineString":k=f.Y();k.splice(h+1,0,c);break;default:return}this.l=!0;f.ma(k);this.l=!1;k=this.a;k.remove(b);gz(this,f,h,g,1);var m={la:[d[0],c],feature:e,geometry:f,depth:g,index:h};k.ya(Nd(m.la),
m);this.i.push([m,1]);d={la:[c,d[1]],feature:e,geometry:f,depth:g,index:h+1};k.ya(Nd(d.la),d);this.i.push([d,0]);this.U=!0};function gz(b,c,d,e,f){Gp(b.a,c.J(),function(b){b.geometry===c&&(void 0===e||void 0===b.depth||sb(b.depth,e))&&b.index>d&&(b.index+=f)})}function $y(){var b=hm();return function(){return b.Point}};function hz(b,c,d,e){vc.call(this,b);this.selected=c;this.deselected=d;this.mapBrowserEvent=e}y(hz,vc);
function iz(b){Ok.call(this,{handleEvent:jz});b=b?b:{};this.C=b.condition?b.condition:Wk;this.l=b.addCondition?b.addCondition:te;this.D=b.removeCondition?b.removeCondition:te;this.G=b.toggleCondition?b.toggleCondition:Yk;this.A=b.multi?b.multi:!1;this.j=b.filter?b.filter:ue;var c;if(b.layers)if(ka(b.layers))c=b.layers;else{var d=b.layers;c=function(b){return vb(d,b)}}else c=ue;this.i=c;this.a={};this.f=new H({source:new R({useSpatialIndex:!1,features:b.features,wrapX:b.wrapX}),style:b.style?b.style:
kz(),updateWhileAnimating:!0,updateWhileInteracting:!0});b=this.f.fa().b;C(b,"add",this.km,!1,this);C(b,"remove",this.nm,!1,this)}y(iz,Ok);l=iz.prototype;l.lm=function(){return this.f.fa().b};l.mm=function(b){b=w(b);return this.a[b]};
function jz(b){if(!this.C(b))return!0;var c=this.l(b),d=this.D(b),e=this.G(b),f=!c&&!d&&!e,g=b.map,h=this.f.fa().b,k=[],m=[],n=!1;if(f)g.od(b.pixel,function(b,c){if(c&&this.j(b,c)){m.push(b);var d=w(b);this.a[d]=c;return!this.A}},this,this.i),0<m.length&&1==h.$b()&&h.item(0)==m[0]||(n=!0,0!==h.$b()&&(k=Array.prototype.concat(h.a),h.clear()),h.tf(m),0===m.length?Rb(this.a):0<k.length&&k.forEach(function(b){b=w(b);delete this.a[b]},this));else{g.od(b.pixel,function(b,f){if(!vb(h.a,b)){if((c||e)&&this.j(b,
f)){m.push(b);var g=w(b);this.a[g]=f}}else if(d||e)k.push(b),g=w(b),delete this.a[g]},this,this.i);for(f=k.length-1;0<=f;--f)h.remove(k[f]);h.tf(m);if(0<m.length||0<k.length)n=!0}n&&this.o(new hz("select",m,k,b));return Vk(b)}l.setMap=function(b){var c=this.u,d=this.f.fa().b;null===c||d.forEach(c.ii,c);iz.da.setMap.call(this,b);this.f.setMap(b);null===b||d.forEach(b.fi,b)};
function kz(){var b=hm();lb(b.Polygon,b.LineString);lb(b.GeometryCollection,b.LineString);return function(c){return b[c.W().V()]}}l.km=function(b){b=b.element;var c=this.u;null===c||c.fi(b)};l.nm=function(b){b=b.element;var c=this.u;null===c||c.ii(b)};function lz(b){al.call(this,{handleEvent:mz,handleDownEvent:ue,handleUpEvent:nz});b=b?b:{};this.l=b.source?b.source:null;this.i=b.features?b.features:null;this.ea=[];this.D={};this.G={};this.U={};this.A={};this.S=null;this.f=void 0!==b.pixelTolerance?b.pixelTolerance:10;this.ga=ra(oz,this);this.a=new Bp;this.T={Point:this.tm,LineString:this.fh,LinearRing:this.fh,Polygon:this.um,MultiPoint:this.rm,MultiLineString:this.qm,MultiPolygon:this.sm,GeometryCollection:this.pm}}y(lz,al);l=lz.prototype;
l.wd=function(b,c){var d=void 0!==c?c:!0,e=b.W(),f=this.T[e.V()];if(f){var g=w(b);this.U[g]=e.J(Od());f.call(this,b,e);d&&(this.G[g]=e.H("change",ra(this.yk,this,b),this),this.D[g]=b.H(kd(b.a),this.om,this))}};l.wj=function(b){this.wd(b)};l.xj=function(b){this.xd(b)};l.dh=function(b){var c;b instanceof Lp?c=b.feature:b instanceof ng&&(c=b.element);this.wd(c)};l.eh=function(b){var c;b instanceof Lp?c=b.feature:b instanceof ng&&(c=b.element);this.xd(c)};
l.om=function(b){b=b.g;this.xd(b,!0);this.wd(b,!0)};l.yk=function(b){if(this.C){var c=w(b);c in this.A||(this.A[c]=b)}else this.ji(b)};l.xd=function(b,c){var d=void 0!==c?c:!0,e=w(b),f=this.U[e];if(f){var g=this.a,h=[];Gp(g,f,function(c){b===c.feature&&h.push(c)});for(f=h.length-1;0<=f;--f)g.remove(h[f]);d&&(Zc(this.G[e]),delete this.G[e],Zc(this.D[e]),delete this.D[e])}};
l.setMap=function(b){var c=this.u,d=this.ea,e;this.i?e=this.i:this.l&&(e=this.l.ye());c&&(d.forEach(gd),d.length=0,e.forEach(this.xj,this));lz.da.setMap.call(this,b);b&&(this.i?(d.push(this.i.H("add",this.dh,this)),d.push(this.i.H("remove",this.eh,this))):this.l&&(d.push(this.l.H("addfeature",this.dh,this)),d.push(this.l.H("removefeature",this.eh,this))),e.forEach(this.wj,this))};l.xc=te;l.ji=function(b){this.xd(b,!1);this.wd(b,!1)};
l.pm=function(b,c){var d,e=c.f;for(d=0;d<e.length;++d)this.T[e[d].V()].call(this,b,e[d])};l.fh=function(b,c){var d=c.Y(),e,f,g,h;e=0;for(f=d.length-1;e<f;++e)g=d.slice(e,e+2),h={feature:b,la:g},this.a.ya(Nd(g),h)};l.qm=function(b,c){var d=c.Y(),e,f,g,h,k,m,n;h=0;for(k=d.length;h<k;++h)for(e=d[h],f=0,g=e.length-1;f<g;++f)m=e.slice(f,f+2),n={feature:b,la:m},this.a.ya(Nd(m),n)};l.rm=function(b,c){var d=c.Y(),e,f,g;f=0;for(g=d.length;f<g;++f)e=d[f],e={feature:b,la:[e,e]},this.a.ya(c.J(),e)};
l.sm=function(b,c){var d=c.Y(),e,f,g,h,k,m,n,p,q,r;m=0;for(n=d.length;m<n;++m)for(p=d[m],h=0,k=p.length;h<k;++h)for(e=p[h],f=0,g=e.length-1;f<g;++f)q=e.slice(f,f+2),r={feature:b,la:q},this.a.ya(Nd(q),r)};l.tm=function(b,c){var d=c.Y(),d={feature:b,la:[d,d]};this.a.ya(c.J(),d)};l.um=function(b,c){var d=c.Y(),e,f,g,h,k,m,n;h=0;for(k=d.length;h<k;++h)for(e=d[h],f=0,g=e.length-1;f<g;++f)m=e.slice(f,f+2),n={feature:b,la:m},this.a.ya(Nd(m),n)};
function mz(b){var c,d,e=b.pixel,f=b.coordinate;c=b.map;var g=c.Fa([e[0]-this.f,e[1]+this.f]);d=c.Fa([e[0]+this.f,e[1]-this.f]);var g=Nd([g,d]),h=Ep(this.a,g),k=!1,g=!1,m=null;d=null;0<h.length&&(this.S=f,h.sort(this.ga),h=h[0].la,m=sd(f,h),d=c.Oa(m),Math.sqrt(xd(e,d))<=this.f&&(g=!0,e=c.Oa(h[0]),f=c.Oa(h[1]),e=xd(d,e),f=xd(d,f),k=Math.sqrt(Math.min(e,f))<=this.f))&&(m=e>f?h[1]:h[0],d=c.Oa(m),d=[Math.round(d[0]),Math.round(d[1])]);c=m;g&&(b.coordinate=c.slice(0,2),b.pixel=d);return bl.call(this,b)}
function nz(){var b=Lb(this.A);b.length&&(b.forEach(this.ji,this),this.A={});return!1}function oz(b,c){return yd(this.S,b.la)-yd(this.S,c.la)};function pz(b,c,d){vc.call(this,b);this.features=c;this.coordinate=d}y(pz,vc);function qz(b){al.call(this,{handleDownEvent:rz,handleDragEvent:sz,handleMoveEvent:tz,handleUpEvent:uz});this.l=void 0;this.a=null;this.f=void 0!==b.features?b.features:null;this.i=null}y(qz,al);function rz(b){this.i=vz(this,b.pixel,b.map);return!this.a&&this.i?(this.a=b.coordinate,tz.call(this,b),this.o(new pz("translatestart",this.f,b.coordinate)),!0):!1}
function uz(b){return this.a?(this.a=null,tz.call(this,b),this.o(new pz("translateend",this.f,b.coordinate)),!0):!1}function sz(b){if(this.a){b=b.coordinate;var c=b[0]-this.a[0],d=b[1]-this.a[1];if(this.f)this.f.forEach(function(b){var e=b.W();e.Oc(c,d);b.La(e)});else if(this.i){var e=this.i.W();e.Oc(c,d);this.i.La(e)}this.a=b;this.o(new pz("translating",this.f,b))}}
function tz(b){var c=b.map.Lc();if(b=b.map.od(b.pixel,function(b){return b})){var d=!1;this.f&&vb(this.f.a,b)&&(d=!0);this.l=c.style.cursor;c.style.cursor=this.a?"-webkit-grabbing":d?"-webkit-grab":"pointer";c.style.cursor=this.a?d?"grab":"pointer":"grabbing"}else c.style.cursor=void 0!==this.l?this.l:"",this.l=void 0}function vz(b,c,d){var e=null;c=d.od(c,function(b){return b});b.f&&vb(b.f.a,c)&&(e=c);return e};function X(b){b=b?b:{};var c=Ub(b);delete c.gradient;delete c.radius;delete c.blur;delete c.shadow;delete c.weight;H.call(this,c);this.g=null;this.Z=void 0!==b.shadow?b.shadow:250;this.T=void 0;this.U=null;C(this,kd("gradient"),this.zk,!1,this);this.Wh(b.gradient?b.gradient:wz);this.Sh(void 0!==b.blur?b.blur:15);this.ih(void 0!==b.radius?b.radius:8);C(this,[kd("blur"),kd("radius")],this.Lg,!1,this);this.Lg();var d=b.weight?b.weight:"weight",e;ia(d)?e=function(b){return b.get(d)}:e=d;this.f(ra(function(b){b=
e(b);b=void 0!==b?Sa(b,0,1):1;var c=255*b|0,d=this.U[c];d||(d=[new cm({image:new wk({opacity:b,src:this.T})})],this.U[c]=d);return d},this));this.set("renderOrder",null);C(this,"render",this.Rk,!1,this)}y(X,H);var wz=["#00f","#0ff","#0f0","#ff0","#f00"];l=X.prototype;l.tg=function(){return this.get("blur")};l.Ag=function(){return this.get("gradient")};l.hh=function(){return this.get("radius")};
l.zk=function(){for(var b=this.Ag(),c=Pi(1,256),d=c.createLinearGradient(0,0,1,256),e=1/(b.length-1),f=0,g=b.length;f<g;++f)d.addColorStop(f*e,b[f]);c.fillStyle=d;c.fillRect(0,0,1,256);this.g=c.getImageData(0,0,1,256).data};l.Lg=function(){var b=this.hh(),c=this.tg(),d=b+c+1,e=2*d,e=Pi(e,e);e.shadowOffsetX=e.shadowOffsetY=this.Z;e.shadowBlur=c;e.shadowColor="#000";e.beginPath();c=d-this.Z;e.arc(c,c,b,0,2*Math.PI,!0);e.fill();this.T=e.canvas.toDataURL();this.U=Array(256);this.s()};
l.Rk=function(b){b=b.context;var c=b.canvas,c=b.getImageData(0,0,c.width,c.height),d=c.data,e,f,g;e=0;for(f=d.length;e<f;e+=4)if(g=4*d[e+3])d[e]=this.g[g],d[e+1]=this.g[g+1],d[e+2]=this.g[g+2];b.putImageData(c,0,0)};l.Sh=function(b){this.set("blur",b)};l.Wh=function(b){this.set("gradient",b)};l.ih=function(b){this.set("radius",b)};function xz(b,c,d,e,f,g,h,k,m,n,p){wh.call(this,[f,g,h],0);this.C=void 0!==p?p:!1;this.A=k;this.j=null;this.g={};this.i=c;this.B=e;this.c=[];this.b=null;this.l=0;h=e.Aa(this.a);p=this.B.J();g=this.i.J();h=p?oe(h,p):h;if(0===ie(h))this.state=4;else if((p=b.J())&&(g?g=oe(g,p):g=p),e=e.$(f),e=bn(b,d,me(h),e),!isFinite(e)||isNaN(e)||0>=e)this.state=4;else if(this.u=new en(b,d,h,g,e*(void 0!==n?n:.5)),0===this.u.f.length)this.state=4;else if(this.l=Kh(c,e),d=gn(this.u),g&&(b.b?(d[1]=Sa(d[1],g[1],g[3]),
d[3]=Sa(d[3],g[1],g[3])):d=oe(d,g)),ie(d))if(b=Fh(c,d,this.l),100>kg(b)*jg(b)){for(c=b.a;c<=b.f;c++)for(d=b.c;d<=b.b;d++)(n=m(this.l,c,d,k))&&this.c.push(n);0===this.c.length&&(this.state=4)}else this.state=3;else this.state=4}y(xz,wh);xz.prototype.X=function(){1==this.state&&(this.b.forEach(Zc),this.b=null);xz.da.X.call(this)};xz.prototype.Sa=function(b){if(void 0!==b){var c=w(b);if(c in this.g)return this.g[c];b=Qb(this.g)?this.j:this.j.cloneNode(!1);return this.g[c]=b}return this.j};
function yz(b){var c=[];b.c.forEach(function(b){b&&2==b.state&&c.push({extent:this.i.Aa(b.a),image:b.Sa()})},b);b.c.length=0;var d=b.a,e=d[0],f=b.B.Ha(e),g=ja(f)?f:f[0],f=ja(f)?f:f[1],e=b.B.$(e),h=b.i.$(b.l),d=b.B.Aa(d);b.j=dn(g,f,b.A,h,b.i.J(),e,d,b.u,c,b.C);b.state=2;xh(b)}
xz.prototype.load=function(){if(0==this.state){this.state=1;xh(this);var b=0;this.b=[];this.c.forEach(function(c){var d=c.state;if(0==d||1==d){b++;var e;e=c.Qa("change",function(){var d=c.state;if(2==d||3==d||4==d)Zc(e),b--,0===b&&(this.b.forEach(Zc),this.b=null,yz(this))},!1,this);this.b.push(e)}},this);this.c.forEach(function(b){0==b.state&&b.load()});0===b&&yz(this)}};function zz(b,c){var d=c||{},e=d.document||document,f=Kg("SCRIPT"),g={Rh:f,yc:void 0},h=new fy(Az,g),k=null,m=null!=d.timeout?d.timeout:5E3;0<m&&(k=window.setTimeout(function(){Bz(f,!0);var c=new Cz(Dz,"Timeout reached for loading script "+b);hy(h);iy(h,!1,c)},m),g.yc=k);f.onload=f.onreadystatechange=function(){f.readyState&&"loaded"!=f.readyState&&"complete"!=f.readyState||(Bz(f,d.rj||!1,k),h.$c(null))};f.onerror=function(){Bz(f,!0,k);var c=new Cz(Ez,"Error while loading script "+b);hy(h);iy(h,!1,
c)};g=d.attributes||{};Xb(g,{type:"text/javascript",charset:"UTF-8",src:b});Eg(f,g);Fz(e).appendChild(f);return h}function Fz(b){var c=b.getElementsByTagName("HEAD");return c&&0!=c.length?c[0]:b.documentElement}function Az(){if(this&&this.Rh){var b=this.Rh;b&&"SCRIPT"==b.tagName&&Bz(b,!0,this.yc)}}function Bz(b,c,d){null!=d&&ba.clearTimeout(d);b.onload=da;b.onerror=da;b.onreadystatechange=da;c&&window.setTimeout(function(){Og(b)},0)}var Ez=0,Dz=1;
function Cz(b,c){var d="Jsloader error (code #"+b+")";c&&(d+=": "+c);xa.call(this,d);this.code=b}y(Cz,xa);function Gz(b,c){this.c=new Ft(b);this.a=c?c:"callback";this.yc=5E3}var Hz=0;function Iz(b,c,d,e){c=c||null;var f="_"+(Hz++).toString(36)+ta().toString(36);ba._callbacks_||(ba._callbacks_={});var g=b.c.clone();if(c)for(var h in c)if(!c.hasOwnProperty||c.hasOwnProperty(h)){var k=g,m=h,n=c[h];ga(n)||(n=[String(n)]);Yt(k.b,m,n)}d&&(ba._callbacks_[f]=Jz(f,d),d=b.a,h="_callbacks_."+f,ga(h)||(h=[String(h)]),Yt(g.b,d,h));b=zz(g.toString(),{timeout:b.yc,rj:!0});ly(b,null,Kz(f,c,e),void 0)}
Gz.prototype.cancel=function(b){b&&(b.sj&&b.sj.cancel(),b.wa&&Lz(b.wa,!1))};function Kz(b,c,d){return function(){Lz(b,!1);d&&d(c)}}function Jz(b,c){return function(d){Lz(b,!0);c.apply(void 0,arguments)}}function Lz(b,c){ba._callbacks_[b]&&(c?delete ba._callbacks_[b]:ba._callbacks_[b]=da)};function Y(b){Zp.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,opaque:b.opaque,projection:b.projection,state:void 0!==b.state?b.state:void 0,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction?b.tileLoadFunction:Mz,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:b.tileUrlFunction,url:b.url,urls:b.urls,wrapX:b.wrapX});this.crossOrigin=void 0!==b.crossOrigin?b.crossOrigin:null;this.tileClass=void 0!==b.tileClass?b.tileClass:ay;this.i={};this.u={};this.xa=b.reprojectionErrorThreshold;
this.T=!1}y(Y,Zp);l=Y.prototype;l.nh=function(){return uh(this.a)?!0:Jb(this.i,function(b){return uh(b)})};l.oh=function(b,c){var d=this.td(b);vh(this.a,this.a==d?c:{});Ib(this.i,function(b){vh(b,b==d?c:{})})};l.hb=function(b){var c=this.f;return!this.tileGrid||c&&!Xe(c,b)?(c=w(b).toString(),c in this.u||(this.u[c]=Lh(b)),this.u[c]):this.tileGrid};l.td=function(b){var c=this.f;if(!c||Xe(c,b))return this.a;b=w(b).toString();b in this.i||(this.i[b]=new th);return this.i[b]};
l.Ob=function(b,c,d,e,f){if(this.f&&f&&!Xe(this.f,f)){e=this.td(f);var g=this.gb(b,c,d);if(sh(e,g))return e.get(g);var h=this.f,k=this.hb(h),m=this.hb(f);b=new xz(h,k,f,m,b,c,d,this.C,ra(function(b,c,d,e){return Nz(this,b,c,d,e,h)},this),this.xa,this.T);e.set(g,b);return b}return Nz(this,b,c,d,e,f)};
function Nz(b,c,d,e,f,g){var h=b.gb(c,d,e);if(sh(b.a,h))return b.a.get(h);c=[c,d,e];f=(d=Rh(b,c,g))?b.tileUrlFunction(d,f,g):void 0;f=new b.tileClass(c,void 0!==f?0:4,void 0!==f?f:"",b.crossOrigin,b.tileLoadFunction);C(f,"change",b.ph,!1,b);b.a.set(h,f);return f}l.wb=function(b){this.T!=b&&(this.T=b,Ib(this.i,function(b){b.clear()}),this.s())};l.xb=function(b,c){var d=Fe(b);d&&(d=w(d).toString(),d in this.u||(this.u[d]=c))};function Mz(b,c){b.Sa().src=c};function Oz(b){Y.call(this,{crossOrigin:"anonymous",opaque:!0,projection:Fe("EPSG:3857"),reprojectionErrorThreshold:b.reprojectionErrorThreshold,state:"loading",tileLoadFunction:b.tileLoadFunction,wrapX:void 0!==b.wrapX?b.wrapX:!0});this.l=void 0!==b.culture?b.culture:"en-us";this.g=void 0!==b.maxZoom?b.maxZoom:-1;var c=new Ft("https://dev.virtualearth.net/REST/v1/Imagery/Metadata/"+b.imagerySet);Iz(new Gz(c,"jsonp"),{include:"ImageryProviders",uriScheme:"https",key:b.key},ra(this.D,this))}y(Oz,Y);
var Pz=new mg({html:'<a class="ol-attribution-bing-tos" href="http://www.microsoft.com/maps/product/terms.html">Terms of Use</a>'});
Oz.prototype.D=function(b){if(200!=b.statusCode||"OK"!=b.statusDescription||"ValidCredentials"!=b.authenticationResultCode||1!=b.resourceSets.length||1!=b.resourceSets[0].resources.length)Ah(this,"error");else{var c=b.brandLogoUri;-1==c.indexOf("https")&&(c=c.replace("http","https"));var d=b.resourceSets[0].resources[0],e=-1==this.g?d.zoomMax:this.g;b=Mh(this.f);var f=Oh({extent:b,minZoom:d.zoomMin,maxZoom:e,tileSize:d.imageWidth==d.imageHeight?d.imageWidth:[d.imageWidth,d.imageHeight]});this.tileGrid=
f;var g=this.l;this.tileUrlFunction=Wp(d.imageUrlSubdomains.map(function(b){var c=[0,0,0],e=d.imageUrl.replace("{subdomain}",b).replace("{culture}",g);return function(b){if(b)return cg(b[0],b[1],-b[2]-1,c),e.replace("{quadkey}",eg(c))}}));if(d.imageryProviders){var h=Je(Fe("EPSG:4326"),this.f);b=d.imageryProviders.map(function(b){var c=b.attribution,d={};b.coverageAreas.forEach(function(b){var c=b.zoomMin,g=Math.min(b.zoomMax,e);b=b.bbox;b=re([b[1],b[0],b[3],b[2]],h);var k,m;for(k=c;k<=g;++k)m=k.toString(),
c=Fh(f,b,k),m in d?d[m].push(c):d[m]=[c]});return new mg({html:c,tileRanges:d})});b.push(Pz);this.na(b)}this.U=c;Ah(this,"ready")}};function Qz(b){R.call(this,{attributions:b.attributions,extent:b.extent,logo:b.logo,projection:b.projection,wrapX:b.wrapX});this.G=void 0;this.ea=void 0!==b.distance?b.distance:20;this.D=[];this.C=b.source;this.C.H("change",Qz.prototype.va,this)}y(Qz,R);Qz.prototype.ga=function(){return this.C};Qz.prototype.Mc=function(b,c,d){this.C.Mc(b,c,d);c!==this.G&&(this.clear(),this.G=c,Rz(this),this.Dc(this.D))};Qz.prototype.va=function(){this.clear();Rz(this);this.Dc(this.D);this.s()};
function Rz(b){if(void 0!==b.G){b.D.length=0;for(var c=Od(),d=b.ea*b.G,e=b.C.ye(),f={},g=0,h=e.length;g<h;g++){var k=e[g];Nb(f,w(k).toString())||(k=k.W().Y(),Zd(k,c),Sd(c,d,c),k=b.C.lf(c),k=k.filter(function(b){b=w(b).toString();return b in f?!1:f[b]=!0}),b.D.push(Sz(k)))}}}function Sz(b){for(var c=b.length,d=[0,0],e=0;e<c;e++){var f=b[e].W().Y();rd(d,f)}c=1/c;d[0]*=c;d[1]*=c;d=new sn(new D(d));d.set("features",b);return d};function Tz(b){kn.call(this,{projection:b.projection,resolutions:b.resolutions});this.ga=void 0!==b.crossOrigin?b.crossOrigin:null;this.l=void 0!==b.displayDpi?b.displayDpi:96;this.i=void 0!==b.params?b.params:{};var c;void 0!==b.url?c=cy(b.url,this.i,ra(this.Fm,this)):c=dy;this.Z=c;this.b=void 0!==b.imageLoadFunction?b.imageLoadFunction:qn;this.pa=void 0!==b.hidpi?b.hidpi:!0;this.ea=void 0!==b.metersPerUnit?b.metersPerUnit:1;this.u=void 0!==b.ratio?b.ratio:1;this.xa=void 0!==b.useOverlay?b.useOverlay:
!1;this.g=null;this.T=0}y(Tz,kn);l=Tz.prototype;l.Em=function(){return this.i};l.pd=function(b,c,d,e){c=ln(this,c);d=this.pa?d:1;var f=this.g;if(f&&this.T==this.c&&f.$()==c&&f.b==d&&Xd(f.J(),b))return f;1!=this.u&&(b=b.slice(),qe(b,this.u));e=this.Z(b,[ke(b)/c*d,le(b)/c*d],e);void 0!==e?(f=new $x(b,c,d,this.j,e,this.ga,this.b),C(f,"change",this.D,!1,this)):f=null;this.g=f;this.T=this.c;return f};l.Dm=function(){return this.b};l.Hm=function(b){Xb(this.i,b);this.s()};
l.Fm=function(b,c,d,e){var f=me(d),g=this.ea,h=ke(d);d=le(d);var k=e[0],m=e[1],n=.0254/this.l;e={OPERATION:this.xa?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol.source.ImageMapGuide source",CLIP:"1",SETDISPLAYDPI:this.l,SETDISPLAYWIDTH:Math.round(e[0]),SETDISPLAYHEIGHT:Math.round(e[1]),SETVIEWSCALE:m*h>k*d?h*g/(k*n):d*g/(m*n),SETVIEWCENTERX:f[0],SETVIEWCENTERY:f[1]};Xb(e,c);return lo(no([b],e))};l.Gm=function(b){this.g=null;this.b=b;this.s()};function Uz(b){var c=void 0!==b.attributions?b.attributions:null,d=b.imageExtent,e,f;void 0!==b.imageSize&&(e=le(d)/b.imageSize[1],f=[e]);var g=void 0!==b.crossOrigin?b.crossOrigin:null,h=void 0!==b.imageLoadFunction?b.imageLoadFunction:qn;kn.call(this,{attributions:c,logo:b.logo,projection:Fe(b.projection),resolutions:f});this.b=new $x(d,e,1,c,b.url,g,h);C(this.b,"change",this.D,!1,this)}y(Uz,kn);Uz.prototype.pd=function(b){return pe(b,this.b.J())?this.b:null};function Vz(b){b=b||{};kn.call(this,{attributions:b.attributions,logo:b.logo,projection:b.projection,resolutions:b.resolutions});this.pa=void 0!==b.crossOrigin?b.crossOrigin:null;this.i=b.url;this.T=void 0!==b.imageLoadFunction?b.imageLoadFunction:qn;this.g=b.params;this.u=!0;Wz(this);this.ga=b.serverType;this.xa=void 0!==b.hidpi?b.hidpi:!0;this.b=null;this.Z=[0,0];this.ea=0;this.l=void 0!==b.ratio?b.ratio:1.5}y(Vz,kn);var Xz=[101,101];l=Vz.prototype;
l.Nm=function(b,c,d,e){if(void 0!==this.i){var f=ne(b,c,0,Xz),g={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.g.LAYERS};Xb(g,this.g,e);e=Math.floor((f[3]-b[1])/c);g[this.u?"I":"X"]=Math.floor((b[0]-f[0])/c);g[this.u?"J":"Y"]=e;return Yz(this,f,Xz,1,Fe(d),g)}};l.Pm=function(){return this.g};
l.pd=function(b,c,d,e){if(void 0===this.i)return null;c=ln(this,c);1==d||this.xa&&void 0!==this.ga||(d=1);b=b.slice();var f=(b[0]+b[2])/2,g=(b[1]+b[3])/2,h=c/d,k=ke(b)/h,h=le(b)/h,m=this.b;if(m&&this.ea==this.c&&m.$()==c&&m.b==d&&Xd(m.J(),b))return m;if(1!=this.l){var m=this.l*ke(b)/2,n=this.l*le(b)/2;b[0]=f-m;b[1]=g-n;b[2]=f+m;b[3]=g+n}f={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};Xb(f,this.g);this.Z[0]=Math.ceil(k*this.l);this.Z[1]=Math.ceil(h*this.l);e=Yz(this,
b,this.Z,d,e,f);this.b=new $x(b,c,d,this.j,e,this.pa,this.T);this.ea=this.c;C(this.b,"change",this.D,!1,this);return this.b};l.Om=function(){return this.T};
function Yz(b,c,d,e,f,g){g[b.u?"CRS":"SRS"]=f.a;"STYLES"in b.g||(g.STYLES=new String(""));if(1!=e)switch(b.ga){case "geoserver":e=90*e+.5|0;g.FORMAT_OPTIONS="FORMAT_OPTIONS"in g?g.FORMAT_OPTIONS+(";dpi:"+e):"dpi:"+e;break;case "mapserver":g.MAP_RESOLUTION=90*e;break;case "carmentaserver":case "qgis":g.DPI=90*e}g.WIDTH=d[0];g.HEIGHT=d[1];d=f.g;var h;b.u&&"ne"==d.substr(0,2)?h=[c[1],c[0],c[3],c[2]]:h=c;g.BBOX=h.join(",");return lo(no([b.i],g))}l.Qm=function(){return this.i};
l.Rm=function(b){this.b=null;this.T=b;this.s()};l.Sm=function(b){b!=this.i&&(this.i=b,this.b=null,this.s())};l.Tm=function(b){Xb(this.g,b);Wz(this);this.b=null;this.s()};function Wz(b){b.u=0<=Pa(Sb(b.g,"VERSION","1.3.0"),"1.3")};function Zz(b){var c=void 0!==b.projection?b.projection:"EPSG:3857",d=void 0!==b.tileGrid?b.tileGrid:Oh({extent:Mh(c),maxZoom:b.maxZoom,tileSize:b.tileSize});Y.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,logo:b.logo,projection:c,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileGrid:d,tileLoadFunction:b.tileLoadFunction,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:b.tileUrlFunction,url:b.url,urls:b.urls,wrapX:void 0!==b.wrapX?b.wrapX:!0})}y(Zz,Y);function $z(b){b=b||{};var c;void 0!==b.attributions?c=b.attributions:c=[aA];Zz.call(this,{attributions:c,crossOrigin:void 0!==b.crossOrigin?b.crossOrigin:"anonymous",opaque:!0,maxZoom:void 0!==b.maxZoom?b.maxZoom:19,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileLoadFunction:b.tileLoadFunction,url:void 0!==b.url?b.url:"https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png",wrapX:b.wrapX})}y($z,Zz);var aA=new mg({html:'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors.'});function bA(b){b=b||{};var c=cA[b.layer];this.g=b.layer;Zz.call(this,{attributions:c.attributions,crossOrigin:"anonymous",logo:"https://developer.mapquest.com/content/osm/mq_logo.png",maxZoom:c.maxZoom,reprojectionErrorThreshold:b.reprojectionErrorThreshold,opaque:!0,tileLoadFunction:b.tileLoadFunction,url:void 0!==b.url?b.url:"https://otile{1-4}-s.mqcdn.com/tiles/1.0.0/"+this.g+"/{z}/{x}/{y}.jpg"})}y(bA,Zz);
var dA=new mg({html:'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a>'}),cA={osm:{maxZoom:19,attributions:[dA,aA]},sat:{maxZoom:18,attributions:[dA,new mg({html:"Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency"})]},hyb:{maxZoom:18,attributions:[dA,aA]}};bA.prototype.l=function(){return this.g};(function(){var b={},c={ka:b};(function(d){if("object"===typeof b&&"undefined"!==typeof c)c.ka=d();else{var e;"undefined"!==typeof window?e=window:"undefined"!==typeof global?e=global:"undefined"!==typeof self?e=self:e=this;e.Bp=d()}})(function(){return function e(b,c,h){function k(n,q){if(!c[n]){if(!b[n]){var r="function"==typeof require&&require;if(!q&&r)return require(n,!0);if(m)return m(n,!0);r=Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r;}r=c[n]={ka:{}};b[n][0].call(r.ka,function(c){var e=
b[n][1][c];return k(e?e:c)},r,r.ka,e,b,c,h)}return c[n].ka}for(var m="function"==typeof require&&require,n=0;n<h.length;n++)k(h[n]);return k}({1:[function(b,c,g){b=b("./processor");g.Ni=b},{"./processor":2}],2:[function(b,c){function g(b){return function(c){var e=c.buffers,f=c.meta,g=c.width,h=c.height,k=e.length,m=e[0].byteLength,A;if(c.imageOps){m=Array(k);for(A=0;A<k;++A)m[A]=new ImageData(new Uint8ClampedArray(e[A]),g,h);g=b(m,f).data}else{g=new Uint8ClampedArray(m);h=Array(k);c=Array(k);for(A=
0;A<k;++A)h[A]=new Uint8ClampedArray(e[A]),c[A]=[0,0,0,0];for(e=0;e<m;e+=4){for(A=0;A<k;++A){var v=h[A];c[A][0]=v[e];c[A][1]=v[e+1];c[A][2]=v[e+2];c[A][3]=v[e+3]}A=b(c,f);g[e]=A[0];g[e+1]=A[1];g[e+2]=A[2];g[e+3]=A[3]}}return g.buffer}}function h(b,c){var e=Object.keys(b.lib||{}).map(function(c){return"var "+c+" = "+b.lib[c].toString()+";"}).concat(["var __minion__ = ("+g.toString()+")(",b.operation.toString(),");",'self.addEventListener("message", function(__event__) {',"var buffer = __minion__(__event__.data);",
"self.postMessage({buffer: buffer, meta: __event__.data.meta}, [buffer]);","});"]),e=URL.createObjectURL(new Blob(e,{type:"text/javascript"})),e=new Worker(e);e.addEventListener("message",c);return e}function k(b,c){var e=g(b.operation);return{postMessage:function(b){setTimeout(function(){c({data:{buffer:e(b),pe:b.pe}})},0)}}}function m(b){this.Ze=!!b.Zk;var c;0===b.threads?c=0:this.Ze?c=1:c=b.threads||1;var e=[];if(c)for(var f=0;f<c;++f)e[f]=h(b,this.hg.bind(this,f));else e[0]=k(b,this.hg.bind(this,
0));this.Sd=e;this.Yc=[];this.bj=b.co||Infinity;this.Qd=0;this.Cc={};this.$e=null}m.prototype.bo=function(b,c,e){this.Zi({qc:b,pe:c,$c:e});this.eg()};m.prototype.Zi=function(b){for(this.Yc.push(b);this.Yc.length>this.bj;)this.Yc.shift().$c(null,null)};m.prototype.eg=function(){if(0===this.Qd&&0<this.Yc.length){var b=this.$e=this.Yc.shift(),c=b.qc[0].width,e=b.qc[0].height,f=b.qc.map(function(b){return b.data.buffer}),g=this.Sd.length;this.Qd=g;if(1===g)this.Sd[0].postMessage({buffers:f,meta:b.pe,
imageOps:this.Ze,width:c,height:e},f);else for(var h=4*Math.ceil(b.qc[0].data.length/4/g),k=0;k<g;++k){for(var m=k*h,A=[],v=0,O=f.length;v<O;++v)A.push(f[k].slice(m,m+h));this.Sd[k].postMessage({buffers:A,meta:b.pe,imageOps:this.Ze,width:c,height:e},A)}}};m.prototype.hg=function(b,c){this.xp||(this.Cc[b]=c.data,--this.Qd,0===this.Qd&&this.cj())};m.prototype.cj=function(){var b=this.$e,c=this.Sd.length,e,f;if(1===c)e=new Uint8ClampedArray(this.Cc[0].buffer),f=this.Cc[0].meta;else{var g=b.qc[0].data.length;
e=new Uint8ClampedArray(g);f=Array(g);for(var g=4*Math.ceil(g/4/c),h=0;h<c;++h){var k=h*g;e.set(new Uint8ClampedArray(this.Cc[h].buffer),k);f[h]=this.Cc[h].meta}}this.$e=null;this.Cc={};b.$c(null,new ImageData(e,b.qc[0].width,b.qc[0].height),f);this.eg()};c.ka=m},{}]},{},[1])(1)});Ap=c.ka})();function eA(b){this.T=null;this.xa=void 0!==b.operationType?b.operationType:"pixel";this.fb=void 0!==b.threads?b.threads:1;this.b=fA(b.sources);for(var c=0,d=this.b.length;c<d;++c)C(this.b[c],"change",this.s,!1,this);this.g=Pi();this.ga=new Kk(function(){return 1},ra(this.s,this));for(var c=gA(this.b),d={},e=0,f=c.length;e<f;++e)d[w(c[e].layer)]=c[e];this.i=this.l=null;this.ea={animate:!1,attributions:{},coordinateToPixelMatrix:Dd(),extent:null,focus:null,index:0,layerStates:d,layerStatesArray:c,
logos:{},pixelRatio:1,pixelToCoordinateMatrix:Dd(),postRenderFunctions:[],size:[0,0],skippedFeatureUids:{},tileQueue:this.ga,time:Date.now(),usedTiles:{},viewState:{rotation:0},viewHints:[],wantedTiles:{}};kn.call(this,{});void 0!==b.operation&&this.u(b.operation,b.lib)}y(eA,kn);eA.prototype.u=function(b,c){this.T=new Ap.Ni({operation:b,Zk:"image"===this.xa,co:1,lib:c,threads:this.fb});this.s()};function hA(b,c,d){var e=b.l;return!e||b.c!==e.Ho||d!==e.resolution||!be(c,e.extent)}
eA.prototype.C=function(b,c,d,e){d=!0;for(var f,g=0,h=this.b.length;g<h;++g)if(f=this.b[g].a.fa(),"ready"!==f.A){d=!1;break}if(!d)return null;if(!hA(this,b,c))return this.i;d=this.g.canvas;f=Math.round(ke(b)/c);g=Math.round(le(b)/c);if(f!==d.width||g!==d.height)d.width=f,d.height=g;f=Ub(this.ea);f.viewState=Ub(f.viewState);var g=me(b),h=Math.round(ke(b)/c),k=Math.round(le(b)/c);f.extent=b;f.focus=me(b);f.size[0]=h;f.size[1]=k;h=f.viewState;h.center=g;h.projection=e;h.resolution=c;this.i=e=new $m(b,
c,1,this.j,d,this.Z.bind(this,f));this.l={extent:b,resolution:c,Ho:this.c};return e};
eA.prototype.Z=function(b,c){for(var d=this.b.length,e=Array(d),f=0;f<d;++f){var g;var h=this.b[f],k=b;h.zd(k,b.layerStatesArray[f]);if(g=h.yd()){var h=h.mf(),m=Math.round(h[12]),n=Math.round(h[13]),p=k.size[0],k=k.size[1];if(g instanceof Image){if(iA){var q=iA.canvas;q.width!==p||q.height!==k?iA=Pi(p,k):iA.clearRect(0,0,p,k)}else iA=Pi(p,k);iA.drawImage(g,m,n,Math.round(g.width*h[0]),Math.round(g.height*h[5]));g=iA.getImageData(0,0,p,k)}else g=g.getContext("2d").getImageData(-m,-n,p,k)}else g=null;
if(g)e[f]=g;else return}d={};this.o(new jA(kA,b,d));this.T.bo(e,d,this.pa.bind(this,b,c));Lk(b.tileQueue,16,16)};eA.prototype.pa=function(b,c,d,e,f){d?c(d):e&&(this.o(new jA(lA,b,f)),hA(this,b.extent,b.viewState.resolution/b.pixelRatio)||this.g.putImageData(e,0,0),c(null))};var iA=null;function gA(b){return b.map(function(b){return bk(b.a)})}
function fA(b){for(var c=b.length,d=Array(c),e=0;e<c;++e){var f=e,g=b[e],h=null;g instanceof Ph?(g=new F({source:g}),h=new Rp(g)):g instanceof kn&&(g=new Sl({source:g}),h=new Qp(g));d[f]=h}return d}function jA(b,c,d){vc.call(this,b);this.extent=c.extent;this.resolution=c.viewState.resolution/c.pixelRatio;this.data=d}y(jA,vc);var kA="beforeoperations",lA="afteroperations";var mA={terrain:{nb:"jpg",opaque:!0},"terrain-background":{nb:"jpg",opaque:!0},"terrain-labels":{nb:"png",opaque:!1},"terrain-lines":{nb:"png",opaque:!1},"toner-background":{nb:"png",opaque:!0},toner:{nb:"png",opaque:!0},"toner-hybrid":{nb:"png",opaque:!1},"toner-labels":{nb:"png",opaque:!1},"toner-lines":{nb:"png",opaque:!1},"toner-lite":{nb:"png",opaque:!0},watercolor:{nb:"jpg",opaque:!0}},nA={terrain:{minZoom:4,maxZoom:18},toner:{minZoom:0,maxZoom:20},watercolor:{minZoom:3,maxZoom:16}};
function oA(b){var c=b.layer.indexOf("-"),c=-1==c?b.layer:b.layer.slice(0,c),d=mA[b.layer];Zz.call(this,{attributions:pA,crossOrigin:"anonymous",maxZoom:nA[c].maxZoom,opaque:d.opaque,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileLoadFunction:b.tileLoadFunction,url:void 0!==b.url?b.url:"https://stamen-tiles-{a-d}.a.ssl.fastly.net/"+b.layer+"/{z}/{x}/{y}."+d.nb})}y(oA,Zz);
var pA=[new mg({html:'Map tiles by <a href="http://stamen.com/">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.'}),aA];function qA(b){b=b||{};var c=void 0!==b.params?b.params:{};Y.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,logo:b.logo,projection:b.projection,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction,tileUrlFunction:ra(this.G,this),url:b.url,urls:b.urls,wrapX:void 0!==b.wrapX?b.wrapX:!0});this.g=c;this.l=Od()}y(qA,Y);qA.prototype.D=function(){return this.g};
qA.prototype.Pb=function(b,c,d){b=qA.da.Pb.call(this,b,c,d);return 1==c?b:nd(b,c,this.b)};
qA.prototype.G=function(b,c,d){var e=this.tileGrid;e||(e=this.hb(d));if(!(e.a.length<=b[0])){var f=e.Aa(b,this.l),g=od(e.Ha(b[0]),this.b);1!=c&&(g=nd(g,c,this.b));e={F:"image",FORMAT:"PNG32",TRANSPARENT:!0};Xb(e,this.g);var h=this.urls;0!==h.length?(d=d.a.split(":").pop(),e.SIZE=g[0]+","+g[1],e.BBOX=f.join(","),e.BBOXSR=d,e.IMAGESR=d,e.DPI=Math.round(90*c),b=1==h.length?h[0]:h[pd((b[1]<<b[0])+b[2],h.length)],Aa(b,"/")||(b+="/"),Aa(b,"MapServer/")?b+="export":Aa(b,"ImageServer/")&&(b+="exportImage"),
b=lo(no([b],e))):b=void 0;return b}};qA.prototype.Z=function(b){Xb(this.g,b);this.s()};function rA(b,c,d){wh.call(this,b,2);this.g=c;this.b=d;this.c={}}y(rA,wh);rA.prototype.Sa=function(b){b=void 0!==b?w(b):-1;if(b in this.c)return this.c[b];var c=this.g,d=Pi(c[0],c[1]);d.strokeStyle="black";d.strokeRect(.5,.5,c[0]+.5,c[1]+.5);d.fillStyle="black";d.textAlign="center";d.textBaseline="middle";d.font="24px sans-serif";d.fillText(this.b,c[0]/2,c[1]/2);return this.c[b]=d.canvas};
function sA(b){Ph.call(this,{opaque:!1,projection:b.projection,tileGrid:b.tileGrid,wrapX:void 0!==b.wrapX?b.wrapX:!0})}y(sA,Ph);sA.prototype.Ob=function(b,c,d){var e=this.gb(b,c,d);if(sh(this.a,e))return this.a.get(e);var f=od(this.tileGrid.Ha(b));b=[b,c,d];c=(c=Rh(this,b))?fg(Rh(this,c)):"";f=new rA(b,f,c);this.a.set(e,f);return f};function tA(b){Y.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,projection:Fe("EPSG:3857"),reprojectionErrorThreshold:b.reprojectionErrorThreshold,state:"loading",tileLoadFunction:b.tileLoadFunction,wrapX:void 0!==b.wrapX?b.wrapX:!0});Iz(new Gz(b.url),void 0,ra(this.l,this),ra(this.g,this))}y(tA,Y);
tA.prototype.l=function(b){var c=Fe("EPSG:4326"),d=this.f,e;void 0!==b.bounds&&(e=re(b.bounds,Je(c,d)));var f=b.minzoom||0,g=b.maxzoom||22;this.tileGrid=d=Oh({extent:Mh(d),maxZoom:g,minZoom:f});this.tileUrlFunction=Vp(b.tiles,d);if(void 0!==b.attribution&&!this.j){c=void 0!==e?e:c.J();e={};for(var h;f<=g;++f)h=f.toString(),e[h]=[Fh(d,c,f)];this.na([new mg({html:b.attribution,tileRanges:e})])}Ah(this,"ready")};tA.prototype.g=function(){Ah(this,"error")};function uA(b){Ph.call(this,{projection:Fe("EPSG:3857"),state:"loading"});this.l=void 0!==b.preemptive?b.preemptive:!0;this.g=Xp;this.i=void 0;Iz(new Gz(b.url),void 0,ra(this.Vm,this))}y(uA,Ph);l=uA.prototype;l.ik=function(){return this.i};l.vj=function(b,c,d,e,f){this.tileGrid?(c=this.tileGrid.ee(b,c),vA(this.Ob(c[0],c[1],c[2],1,this.f),b,d,e,f)):!0===f?ni(function(){d.call(e,null)}):d.call(e,null)};
l.Vm=function(b){var c=Fe("EPSG:4326"),d=this.f,e;void 0!==b.bounds&&(e=re(b.bounds,Je(c,d)));var f=b.minzoom||0,g=b.maxzoom||22;this.tileGrid=d=Oh({extent:Mh(d),maxZoom:g,minZoom:f});this.i=b.template;var h=b.grids;if(h){this.g=Vp(h,d);if(void 0!==b.attribution){c=void 0!==e?e:c.J();for(e={};f<=g;++f)h=f.toString(),e[h]=[Fh(d,c,f)];this.na([new mg({html:b.attribution,tileRanges:e})])}Ah(this,"ready")}else Ah(this,"error")};
l.Ob=function(b,c,d,e,f){var g=this.gb(b,c,d);if(sh(this.a,g))return this.a.get(g);b=[b,c,d];c=Rh(this,b,f);e=this.g(c,e,f);e=new wA(b,void 0!==e?0:4,void 0!==e?e:"",this.tileGrid.Aa(b),this.l);this.a.set(g,e);return e};l.Xf=function(b,c,d){b=this.gb(b,c,d);sh(this.a,b)&&this.a.get(b)};function wA(b,c,d,e,f){wh.call(this,b,c);this.i=d;this.c=e;this.l=f;this.j=this.g=this.b=null}y(wA,wh);l=wA.prototype;l.Sa=function(){return null};
function xA(b,c){if(!b.b||!b.g||!b.j)return null;var d=b.b[Math.floor((1-(c[1]-b.c[1])/(b.c[3]-b.c[1]))*b.b.length)];if(!ia(d))return null;d=d.charCodeAt(Math.floor((c[0]-b.c[0])/(b.c[2]-b.c[0])*d.length));93<=d&&d--;35<=d&&d--;d-=32;return d in b.g?b.j[b.g[d]]:null}function vA(b,c,d,e,f){0==b.state&&!0===f?(Xc(b,"change",function(){d.call(e,xA(this,c))},!1,b),yA(b)):!0===f?ni(function(){d.call(e,xA(this,c))},b):d.call(e,xA(b,c))}l.tb=function(){return this.i};l.xk=function(){this.state=3;xh(this)};
l.Um=function(b){this.b=b.grid;this.g=b.keys;this.j=b.data;this.state=4;xh(this)};function yA(b){0==b.state&&(b.state=1,Iz(new Gz(b.i),void 0,ra(b.Um,b),ra(b.xk,b)))}l.load=function(){this.l&&yA(this)};function zA(b){b=b||{};var c=void 0!==b.params?b.params:{};Y.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,logo:b.logo,opaque:!Sb(c,"TRANSPARENT",!0),projection:b.projection,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileGrid:b.tileGrid,tileLoadFunction:b.tileLoadFunction,tileUrlFunction:ra(this.Ym,this),url:b.url,urls:b.urls,wrapX:void 0!==b.wrapX?b.wrapX:!0});this.D=void 0!==b.gutter?b.gutter:0;this.g=c;this.l=!0;this.G=b.serverType;this.ea=void 0!==b.hidpi?b.hidpi:
!0;this.Z="";AA(this);this.ga=Od();BA(this)}y(zA,Y);l=zA.prototype;
l.Wm=function(b,c,d,e){d=Fe(d);var f=this.tileGrid;f||(f=this.hb(d));c=f.ee(b,c);if(!(f.a.length<=c[0])){var g=f.$(c[0]),h=f.Aa(c,this.ga),f=od(f.Ha(c[0]),this.b),k=this.D;0!==k&&(f=md(f,k,this.b),h=Sd(h,g*k,h));k={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetFeatureInfo",FORMAT:"image/png",TRANSPARENT:!0,QUERY_LAYERS:this.g.LAYERS};Xb(k,this.g,e);e=Math.floor((h[3]-b[1])/g);k[this.l?"I":"X"]=Math.floor((b[0]-h[0])/g);k[this.l?"J":"Y"]=e;return CA(this,c,f,h,1,d,k)}};l.$d=function(){return this.D};
l.gb=function(b,c,d){return this.Z+zA.da.gb.call(this,b,c,d)};l.Xm=function(){return this.g};
function CA(b,c,d,e,f,g,h){var k=b.urls;if(0!==k.length){h.WIDTH=d[0];h.HEIGHT=d[1];h[b.l?"CRS":"SRS"]=g.a;"STYLES"in b.g||(h.STYLES=new String(""));if(1!=f)switch(b.G){case "geoserver":d=90*f+.5|0;h.FORMAT_OPTIONS="FORMAT_OPTIONS"in h?h.FORMAT_OPTIONS+(";dpi:"+d):"dpi:"+d;break;case "mapserver":h.MAP_RESOLUTION=90*f;break;case "carmentaserver":case "qgis":h.DPI=90*f}g=g.g;b.l&&"ne"==g.substr(0,2)&&(b=e[0],e[0]=e[1],e[1]=b,b=e[2],e[2]=e[3],e[3]=b);h.BBOX=e.join(",");return lo(no([1==k.length?k[0]:
k[pd((c[1]<<c[0])+c[2],k.length)]],h))}}l.Pb=function(b,c,d){b=zA.da.Pb.call(this,b,c,d);return 1!=c&&this.ea&&void 0!==this.G?nd(b,c,this.b):b};function AA(b){var c=0,d=[],e,f;e=0;for(f=b.urls.length;e<f;++e)d[c++]=b.urls[e];for(var g in b.g)d[c++]=g+"-"+b.g[g];b.Z=d.join("#")}
l.Ym=function(b,c,d){var e=this.tileGrid;e||(e=this.hb(d));if(!(e.a.length<=b[0])){1==c||this.ea&&void 0!==this.G||(c=1);var f=e.$(b[0]),g=e.Aa(b,this.ga),e=od(e.Ha(b[0]),this.b),h=this.D;0!==h&&(e=md(e,h,this.b),g=Sd(g,f*h,g));1!=c&&(e=nd(e,c,this.b));f={SERVICE:"WMS",VERSION:"1.3.0",REQUEST:"GetMap",FORMAT:"image/png",TRANSPARENT:!0};Xb(f,this.g);return CA(this,b,e,g,c,d,f)}};l.Zm=function(b){Xb(this.g,b);AA(this);BA(this);this.s()};function BA(b){b.l=0<=Pa(Sb(b.g,"VERSION","1.3.0"),"1.3")};function DA(b){this.i=b.matrixIds;Bh.call(this,{extent:b.extent,origin:b.origin,origins:b.origins,resolutions:b.resolutions,tileSize:b.tileSize,tileSizes:b.tileSizes,sizes:b.sizes})}y(DA,Bh);DA.prototype.B=function(){return this.i};
function EA(b,c){var d=[],e=[],f=[],g=[],h=[],k;k=Fe(b.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var m=k.Jc(),n="ne"==k.g.substr(0,2);ob(b.TileMatrix,function(b,c){return c.ScaleDenominator-b.ScaleDenominator});b.TileMatrix.forEach(function(b){e.push(b.Identifier);var c=2.8E-4*b.ScaleDenominator/m,k=b.TileWidth,t=b.TileHeight;n?f.push([b.TopLeftCorner[1],b.TopLeftCorner[0]]):f.push(b.TopLeftCorner);d.push(c);g.push(k==t?k:[k,t]);h.push([b.MatrixWidth,-b.MatrixHeight])});
return new DA({extent:c,origins:f,resolutions:d,matrixIds:e,tileSizes:g,sizes:h})};function Z(b){function c(b){b="KVP"==e?lo(no([b],g)):b.replace(/\{(\w+?)\}/g,function(b,c){return c.toLowerCase()in g?g[c.toLowerCase()]:b});return function(c){if(c){var d={TileMatrix:f.i[c[0]],TileCol:c[1],TileRow:-c[2]-1};Xb(d,h);c=b;return c="KVP"==e?lo(no([c],d)):c.replace(/\{(\w+?)\}/g,function(b,c){return d[c]})}}}this.ga=void 0!==b.version?b.version:"1.0.0";this.G=void 0!==b.format?b.format:"image/jpeg";this.g=void 0!==b.dimensions?b.dimensions:{};this.D="";FA(this);this.Z=b.layer;this.l=b.matrixSet;
this.ea=b.style;var d=b.urls;void 0===d&&void 0!==b.url&&(d=Yp(b.url));var e=this.va=void 0!==b.requestEncoding?b.requestEncoding:"KVP",f=b.tileGrid,g={layer:this.Z,style:this.ea,tilematrixset:this.l};"KVP"==e&&Xb(g,{Service:"WMTS",Request:"GetTile",Version:this.ga,Format:this.G});var h=this.g,k=d&&0<d.length?Wp(d.map(c)):Xp;Y.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,logo:b.logo,projection:b.projection,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileClass:b.tileClass,
tileGrid:f,tileLoadFunction:b.tileLoadFunction,tilePixelRatio:b.tilePixelRatio,tileUrlFunction:k,urls:d,wrapX:void 0!==b.wrapX?b.wrapX:!1})}y(Z,Y);l=Z.prototype;l.Hj=function(){return this.g};l.$m=function(){return this.G};l.gb=function(b,c,d){return this.D+Z.da.gb.call(this,b,c,d)};l.an=function(){return this.Z};l.Uj=function(){return this.l};l.gk=function(){return this.va};l.bn=function(){return this.ea};l.mk=function(){return this.ga};
function FA(b){var c=0,d=[],e;for(e in b.g)d[c++]=e+"-"+b.g[e];b.D=d.join("/")}l.cp=function(b){Xb(this.g,b);FA(this);this.s()};function GA(b){b=b||{};var c=b.size,d=c[0],e=c[1],f=[],g=256;switch(void 0!==b.tierSizeCalculation?b.tierSizeCalculation:"default"){case "default":for(;d>g||e>g;)f.push([Math.ceil(d/g),Math.ceil(e/g)]),g+=g;break;case "truncated":for(;d>g||e>g;)f.push([Math.ceil(d/g),Math.ceil(e/g)]),d>>=1,e>>=1}f.push([1,1]);f.reverse();for(var g=[1],h=[0],e=1,d=f.length;e<d;e++)g.push(1<<e),h.push(f[e-1][0]*f[e-1][1]+h[e-1]);g.reverse();var c=[0,-c[1],c[0],0],c=new Bh({extent:c,origin:he(c),resolutions:g}),k=b.url;
Y.call(this,{attributions:b.attributions,crossOrigin:b.crossOrigin,logo:b.logo,reprojectionErrorThreshold:b.reprojectionErrorThreshold,tileClass:HA,tileGrid:c,tileUrlFunction:function(b){if(b){var c=b[0],d=b[1];b=-b[2]-1;return k+"TileGroup"+((d+b*f[c][0]+h[c])/256|0)+"/"+c+"-"+d+"-"+b+".jpg"}}})}y(GA,Y);function HA(b,c,d,e,f){ay.call(this,b,c,d,e,f);this.g={}}y(HA,ay);
HA.prototype.Sa=function(b){var c=void 0!==b?w(b).toString():"";if(c in this.g)return this.g[c];b=HA.da.Sa.call(this,b);if(2==this.state){if(256==b.width&&256==b.height)return this.g[c]=b;var d=Pi(256,256);d.drawImage(b,0,0);return this.g[c]=d.canvas}return b};function IA(b){b=b||{};this.c=void 0!==b.initialSize?b.initialSize:256;this.b=void 0!==b.maxSize?b.maxSize:void 0!==ua?ua:2048;this.a=void 0!==b.space?b.space:1;this.g=[new JA(this.c,this.a)];this.f=this.c;this.j=[new JA(this.f,this.a)]}IA.prototype.add=function(b,c,d,e,f,g){if(c+this.a>this.b||d+this.a>this.b)return null;e=KA(this,!1,b,c,d,e,g);if(!e)return null;b=KA(this,!0,b,c,d,void 0!==f?f:ve,g);return{offsetX:e.offsetX,offsetY:e.offsetY,image:e.image,Mg:b.image}};
function KA(b,c,d,e,f,g,h){var k=c?b.j:b.g,m,n,p;n=0;for(p=k.length;n<p;++n){m=k[n];if(m=m.add(d,e,f,g,h))return m;m||n!==p-1||(c?(m=Math.min(2*b.f,b.b),b.f=m):(m=Math.min(2*b.c,b.b),b.c=m),m=new JA(m,b.a),k.push(m),++p)}}function JA(b,c){this.a=c;this.c=[{x:0,y:0,width:b,height:b}];this.f={};this.b=Kg("CANVAS");this.b.width=b;this.b.height=b;this.g=this.b.getContext("2d")}JA.prototype.get=function(b){return Sb(this.f,b,null)};
JA.prototype.add=function(b,c,d,e,f){var g,h,k;h=0;for(k=this.c.length;h<k;++h)if(g=this.c[h],g.width>=c+this.a&&g.height>=d+this.a)return k={offsetX:g.x+this.a,offsetY:g.y+this.a,image:this.b},this.f[b]=k,e.call(f,this.g,g.x+this.a,g.y+this.a),b=h,c=c+this.a,d=d+this.a,f=e=void 0,g.width-c>g.height-d?(e={x:g.x+c,y:g.y,width:g.width-c,height:g.height},f={x:g.x,y:g.y+d,width:c,height:g.height-d},LA(this,b,e,f)):(e={x:g.x+c,y:g.y,width:g.width-c,height:d},f={x:g.x,y:g.y+d,width:g.width,height:g.height-
d},LA(this,b,e,f)),k;return null};function LA(b,c,d,e){c=[c,1];0<d.width&&0<d.height&&c.push(d);0<e.width&&0<e.height&&c.push(e);b.c.splice.apply(b.c,c)};function MA(b){this.C=this.f=this.g=null;this.B=void 0!==b.fill?b.fill:null;this.S=[0,0];this.a=b.points;this.b=void 0!==b.radius?b.radius:b.radius1;this.j=void 0!==b.radius2?b.radius2:this.b;this.l=void 0!==b.angle?b.angle:0;this.c=void 0!==b.stroke?b.stroke:null;this.oa=this.U=this.ia=null;var c=b.atlasManager,d="",e="",f=0,g=null,h,k=0;this.c&&(h=vg(this.c.a),k=this.c.c,void 0===k&&(k=1),g=this.c.b,Yi||(g=null),e=this.c.g,void 0===e&&(e="round"),d=this.c.f,void 0===d&&(d="round"),f=this.c.j,void 0===
f&&(f=10));var m=2*(this.b+k)+1,d={strokeStyle:h,Hd:k,size:m,lineCap:d,lineDash:g,lineJoin:e,miterLimit:f};if(void 0===c){this.f=Kg("CANVAS");this.f.height=m;this.f.width=m;var c=m=this.f.width,n=this.f.getContext("2d");this.uh(d,n,0,0);this.B?this.C=this.f:(n=this.C=Kg("CANVAS"),n.height=d.size,n.width=d.size,n=n.getContext("2d"),this.th(d,n,0,0))}else m=Math.round(m),(e=!this.B)&&(n=ra(this.th,this,d)),f=this.Ib(),n=c.add(f,m,m,ra(this.uh,this,d),n),this.f=n.image,this.S=[n.offsetX,n.offsetY],c=
n.image.width,this.C=e?n.Mg:this.f;this.ia=[m/2,m/2];this.U=[m,m];this.oa=[c,c];vk.call(this,{opacity:1,rotateWithView:!1,rotation:void 0!==b.rotation?b.rotation:0,scale:1,snapToPixel:void 0!==b.snapToPixel?b.snapToPixel:!0})}y(MA,vk);l=MA.prototype;l.Xb=function(){return this.ia};l.gn=function(){return this.l};l.hn=function(){return this.B};l.ze=function(){return this.C};l.fc=function(){return this.f};l.qd=function(){return this.oa};l.Bd=function(){return 2};l.Ca=function(){return this.S};l.jn=function(){return this.a};
l.kn=function(){return this.b};l.fk=function(){return this.j};l.Bb=function(){return this.U};l.ln=function(){return this.c};l.sf=wa;l.load=wa;l.Wf=wa;
l.uh=function(b,c,d,e){var f;c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();this.j!==this.b&&(this.a*=2);for(d=0;d<=this.a;d++)e=2*d*Math.PI/this.a-Math.PI/2+this.l,f=0===d%2?this.b:this.j,c.lineTo(b.size/2+f*Math.cos(e),b.size/2+f*Math.sin(e));this.B&&(c.fillStyle=vg(this.B.a),c.fill());this.c&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Hd,b.lineDash&&c.setLineDash(b.lineDash),c.lineCap=b.lineCap,c.lineJoin=b.lineJoin,c.miterLimit=b.miterLimit,c.stroke());c.closePath()};
l.th=function(b,c,d,e){c.setTransform(1,0,0,1,0,0);c.translate(d,e);c.beginPath();this.j!==this.b&&(this.a*=2);var f;for(d=0;d<=this.a;d++)f=2*d*Math.PI/this.a-Math.PI/2+this.l,e=0===d%2?this.b:this.j,c.lineTo(b.size/2+e*Math.cos(f),b.size/2+e*Math.sin(f));c.fillStyle=Tl;c.fill();this.c&&(c.strokeStyle=b.strokeStyle,c.lineWidth=b.Hd,b.lineDash&&c.setLineDash(b.lineDash),c.stroke());c.closePath()};
l.Ib=function(){var b=this.c?this.c.Ib():"-",c=this.B?this.B.Ib():"-";this.g&&b==this.g[1]&&c==this.g[2]&&this.b==this.g[3]&&this.j==this.g[4]&&this.l==this.g[5]&&this.a==this.g[6]||(this.g=["r"+b+c+(void 0!==this.b?this.b.toString():"-")+(void 0!==this.j?this.j.toString():"-")+(void 0!==this.l?this.l.toString():"-")+(void 0!==this.a?this.a.toString():"-"),b,c,this.b,this.j,this.l,this.a]);return this.g[0]};u("ol.animation.bounce",function(b){var c=b.resolution,d=b.start?b.start:Date.now(),e=void 0!==b.duration?b.duration:1E3,f=b.easing?b.easing:Yf;return function(b,h){if(h.time<d)return h.animate=!0,h.viewHints[0]+=1,!0;if(h.time<d+e){var k=f((h.time-d)/e),m=c-h.viewState.resolution;h.animate=!0;h.viewState.resolution+=k*m;h.viewHints[0]+=1;return!0}return!1}},OPENLAYERS);u("ol.animation.pan",Zf,OPENLAYERS);u("ol.animation.rotate",ag,OPENLAYERS);u("ol.animation.zoom",bg,OPENLAYERS);
u("ol.Attribution",mg,OPENLAYERS);mg.prototype.getHTML=mg.prototype.b;ng.prototype.element=ng.prototype.element;u("ol.Collection",og,OPENLAYERS);og.prototype.clear=og.prototype.clear;og.prototype.extend=og.prototype.tf;og.prototype.forEach=og.prototype.forEach;og.prototype.getArray=og.prototype.sl;og.prototype.item=og.prototype.item;og.prototype.getLength=og.prototype.$b;og.prototype.insertAt=og.prototype.ke;og.prototype.pop=og.prototype.pop;og.prototype.push=og.prototype.push;
og.prototype.remove=og.prototype.remove;og.prototype.removeAt=og.prototype.Rf;og.prototype.setAt=og.prototype.Jo;u("ol.coordinate.add",rd,OPENLAYERS);u("ol.coordinate.createStringXY",function(b){return function(c){return zd(c,b)}},OPENLAYERS);u("ol.coordinate.format",ud,OPENLAYERS);u("ol.coordinate.rotate",wd,OPENLAYERS);u("ol.coordinate.toStringHDMS",function(b){return b?td(b[1],"NS")+" "+td(b[0],"EW"):""},OPENLAYERS);u("ol.coordinate.toStringXY",zd,OPENLAYERS);u("ol.DeviceOrientation",Pr,OPENLAYERS);
Pr.prototype.getAlpha=Pr.prototype.Bj;Pr.prototype.getBeta=Pr.prototype.Ej;Pr.prototype.getGamma=Pr.prototype.Kj;Pr.prototype.getHeading=Pr.prototype.tl;Pr.prototype.getTracking=Pr.prototype.Tg;Pr.prototype.setTracking=Pr.prototype.uf;u("ol.easing.easeIn",Uf,OPENLAYERS);u("ol.easing.easeOut",Vf,OPENLAYERS);u("ol.easing.inAndOut",Wf,OPENLAYERS);u("ol.easing.linear",Xf,OPENLAYERS);u("ol.easing.upAndDown",Yf,OPENLAYERS);u("ol.extent.boundingExtent",Nd,OPENLAYERS);u("ol.extent.buffer",Sd,OPENLAYERS);
u("ol.extent.containsCoordinate",Vd,OPENLAYERS);u("ol.extent.containsExtent",Xd,OPENLAYERS);u("ol.extent.containsXY",Wd,OPENLAYERS);u("ol.extent.createEmpty",Od,OPENLAYERS);u("ol.extent.equals",be,OPENLAYERS);u("ol.extent.extend",ce,OPENLAYERS);u("ol.extent.getBottomLeft",ee,OPENLAYERS);u("ol.extent.getBottomRight",fe,OPENLAYERS);u("ol.extent.getCenter",me,OPENLAYERS);u("ol.extent.getHeight",le,OPENLAYERS);u("ol.extent.getIntersection",oe,OPENLAYERS);
u("ol.extent.getSize",function(b){return[b[2]-b[0],b[3]-b[1]]},OPENLAYERS);u("ol.extent.getTopLeft",he,OPENLAYERS);u("ol.extent.getTopRight",ge,OPENLAYERS);u("ol.extent.getWidth",ke,OPENLAYERS);u("ol.extent.intersects",pe,OPENLAYERS);u("ol.extent.isEmpty",je,OPENLAYERS);u("ol.extent.applyTransform",re,OPENLAYERS);u("ol.Feature",sn,OPENLAYERS);sn.prototype.clone=sn.prototype.clone;sn.prototype.getGeometry=sn.prototype.W;sn.prototype.getId=sn.prototype.Na;sn.prototype.getGeometryName=sn.prototype.Mj;
sn.prototype.getStyle=sn.prototype.vl;sn.prototype.getStyleFunction=sn.prototype.Qb;sn.prototype.setGeometry=sn.prototype.La;sn.prototype.setStyle=sn.prototype.vf;sn.prototype.setId=sn.prototype.ic;sn.prototype.setGeometryName=sn.prototype.vc;u("ol.featureloader.tile",up,OPENLAYERS);u("ol.featureloader.xhr",vp,OPENLAYERS);u("ol.Geolocation",Px,OPENLAYERS);Px.prototype.getAccuracy=Px.prototype.zj;Px.prototype.getAccuracyGeometry=Px.prototype.Aj;Px.prototype.getAltitude=Px.prototype.Cj;
Px.prototype.getAltitudeAccuracy=Px.prototype.Dj;Px.prototype.getHeading=Px.prototype.xl;Px.prototype.getPosition=Px.prototype.yl;Px.prototype.getProjection=Px.prototype.Ug;Px.prototype.getSpeed=Px.prototype.hk;Px.prototype.getTracking=Px.prototype.Vg;Px.prototype.getTrackingOptions=Px.prototype.Gg;Px.prototype.setProjection=Px.prototype.Wg;Px.prototype.setTracking=Px.prototype.qe;Px.prototype.setTrackingOptions=Px.prototype.ei;u("ol.Graticule",Vx,OPENLAYERS);Vx.prototype.getMap=Vx.prototype.Bl;
Vx.prototype.getMeridians=Vx.prototype.Vj;Vx.prototype.getParallels=Vx.prototype.bk;Vx.prototype.setMap=Vx.prototype.setMap;u("ol.has.DEVICE_PIXEL_RATIO",Xi,OPENLAYERS);u("ol.has.CANVAS",Zi,OPENLAYERS);u("ol.has.DEVICE_ORIENTATION",$i,OPENLAYERS);u("ol.has.GEOLOCATION",aj,OPENLAYERS);u("ol.has.TOUCH",bj,OPENLAYERS);u("ol.has.WEBGL",Wi,OPENLAYERS);$x.prototype.getImage=$x.prototype.a;ay.prototype.getImage=ay.prototype.Sa;u("ol.Kinetic",Mk,OPENLAYERS);u("ol.loadingstrategy.all",wp,OPENLAYERS);
u("ol.loadingstrategy.bbox",function(b){return[b]},OPENLAYERS);u("ol.loadingstrategy.tile",function(b){return function(c,d){var e=Kh(b,d),f=Fh(b,c,e),g=[],e=[e,0,0];for(e[1]=f.a;e[1]<=f.f;++e[1])for(e[2]=f.c;e[2]<=f.b;++e[2])g.push(b.Aa(e));return g}},OPENLAYERS);u("ol.Map",S,OPENLAYERS);S.prototype.addControl=S.prototype.hj;S.prototype.addInteraction=S.prototype.ij;S.prototype.addLayer=S.prototype.jg;S.prototype.addOverlay=S.prototype.kg;S.prototype.beforeRender=S.prototype.Ma;
S.prototype.forEachFeatureAtPixel=S.prototype.od;S.prototype.forEachLayerAtPixel=S.prototype.Fl;S.prototype.hasFeatureAtPixel=S.prototype.Yk;S.prototype.getEventCoordinate=S.prototype.Ij;S.prototype.getEventPixel=S.prototype.Zd;S.prototype.getTarget=S.prototype.wf;S.prototype.getTargetElement=S.prototype.Lc;S.prototype.getCoordinateFromPixel=S.prototype.Fa;S.prototype.getControls=S.prototype.Gj;S.prototype.getOverlays=S.prototype.$j;S.prototype.getOverlayById=S.prototype.Zj;
S.prototype.getInteractions=S.prototype.Nj;S.prototype.getLayerGroup=S.prototype.oc;S.prototype.getLayers=S.prototype.Xg;S.prototype.getPixelFromCoordinate=S.prototype.Oa;S.prototype.getSize=S.prototype.Ra;S.prototype.getView=S.prototype.aa;S.prototype.getViewport=S.prototype.nk;S.prototype.renderSync=S.prototype.Fo;S.prototype.render=S.prototype.render;S.prototype.removeControl=S.prototype.yo;S.prototype.removeInteraction=S.prototype.zo;S.prototype.removeLayer=S.prototype.Bo;
S.prototype.removeOverlay=S.prototype.Co;S.prototype.setLayerGroup=S.prototype.Xh;S.prototype.setSize=S.prototype.Uf;S.prototype.setTarget=S.prototype.Gl;S.prototype.setView=S.prototype.To;S.prototype.updateSize=S.prototype.Uc;Mj.prototype.originalEvent=Mj.prototype.originalEvent;Mj.prototype.pixel=Mj.prototype.pixel;Mj.prototype.coordinate=Mj.prototype.coordinate;Mj.prototype.dragging=Mj.prototype.dragging;Mj.prototype.preventDefault=Mj.prototype.preventDefault;Mj.prototype.stopPropagation=Mj.prototype.b;
ph.prototype.map=ph.prototype.map;ph.prototype.frameState=ph.prototype.frameState;hd.prototype.key=hd.prototype.key;hd.prototype.oldValue=hd.prototype.oldValue;u("ol.Object",id,OPENLAYERS);id.prototype.get=id.prototype.get;id.prototype.getKeys=id.prototype.O;id.prototype.getProperties=id.prototype.P;id.prototype.set=id.prototype.set;id.prototype.setProperties=id.prototype.I;id.prototype.unset=id.prototype.R;u("ol.Observable",fd,OPENLAYERS);u("ol.Observable.unByKey",gd,OPENLAYERS);
fd.prototype.changed=fd.prototype.s;fd.prototype.dispatchEvent=fd.prototype.o;fd.prototype.getRevision=fd.prototype.L;fd.prototype.on=fd.prototype.H;fd.prototype.once=fd.prototype.M;fd.prototype.un=fd.prototype.K;fd.prototype.unByKey=fd.prototype.N;u("ol.inherits",y,OPENLAYERS);u("ol.Overlay",mr,OPENLAYERS);mr.prototype.getElement=mr.prototype.re;mr.prototype.getId=mr.prototype.Na;mr.prototype.getMap=mr.prototype.se;mr.prototype.getOffset=mr.prototype.Eg;mr.prototype.getPosition=mr.prototype.Yg;
mr.prototype.getPositioning=mr.prototype.Fg;mr.prototype.setElement=mr.prototype.Uh;mr.prototype.setMap=mr.prototype.setMap;mr.prototype.setOffset=mr.prototype.Zh;mr.prototype.setPosition=mr.prototype.xf;mr.prototype.setPositioning=mr.prototype.bi;u("ol.size.toSize",od,OPENLAYERS);wh.prototype.getTileCoord=wh.prototype.f;Tp.prototype.getFormat=Tp.prototype.Hl;Tp.prototype.setLoader=Tp.prototype.Yh;u("ol.View",Of,OPENLAYERS);Of.prototype.constrainCenter=Of.prototype.Wd;
Of.prototype.constrainResolution=Of.prototype.constrainResolution;Of.prototype.constrainRotation=Of.prototype.constrainRotation;Of.prototype.getCenter=Of.prototype.Ta;Of.prototype.calculateExtent=Of.prototype.Zc;Of.prototype.getProjection=Of.prototype.Il;Of.prototype.getResolution=Of.prototype.$;Of.prototype.getRotation=Of.prototype.Ea;Of.prototype.getZoom=Of.prototype.qk;Of.prototype.fit=Of.prototype.jf;Of.prototype.centerOn=Of.prototype.qj;Of.prototype.rotate=Of.prototype.rotate;
Of.prototype.setCenter=Of.prototype.jb;Of.prototype.setResolution=Of.prototype.Ub;Of.prototype.setRotation=Of.prototype.te;Of.prototype.setZoom=Of.prototype.Wo;u("ol.xml.getAllTextContent",Oo,OPENLAYERS);u("ol.xml.parse",hp,OPENLAYERS);uq.prototype.getGL=uq.prototype.Gn;uq.prototype.useProgram=uq.prototype.Ge;u("ol.tilegrid.TileGrid",Bh,OPENLAYERS);Bh.prototype.getMaxZoom=Bh.prototype.Cg;Bh.prototype.getMinZoom=Bh.prototype.Dg;Bh.prototype.getOrigin=Bh.prototype.Ca;Bh.prototype.getResolution=Bh.prototype.$;
Bh.prototype.getResolutions=Bh.prototype.wh;Bh.prototype.getTileCoordExtent=Bh.prototype.Aa;Bh.prototype.getTileCoordForCoordAndResolution=Bh.prototype.ee;Bh.prototype.getTileCoordForCoordAndZ=Bh.prototype.fe;Bh.prototype.getTileSize=Bh.prototype.Ha;u("ol.tilegrid.createXYZ",Oh,OPENLAYERS);u("ol.tilegrid.WMTS",DA,OPENLAYERS);DA.prototype.getMatrixIds=DA.prototype.B;u("ol.tilegrid.WMTS.createFromCapabilitiesMatrixSet",EA,OPENLAYERS);u("ol.style.AtlasManager",IA,OPENLAYERS);u("ol.style.Circle",bm,OPENLAYERS);
bm.prototype.getFill=bm.prototype.cn;bm.prototype.getImage=bm.prototype.fc;bm.prototype.getRadius=bm.prototype.dn;bm.prototype.getStroke=bm.prototype.en;u("ol.style.Fill",Wl,OPENLAYERS);Wl.prototype.getColor=Wl.prototype.b;Wl.prototype.setColor=Wl.prototype.f;u("ol.style.Icon",wk,OPENLAYERS);wk.prototype.getAnchor=wk.prototype.Xb;wk.prototype.getImage=wk.prototype.fc;wk.prototype.getOrigin=wk.prototype.Ca;wk.prototype.getSrc=wk.prototype.fn;wk.prototype.getSize=wk.prototype.Bb;wk.prototype.load=wk.prototype.load;
u("ol.style.Image",vk,OPENLAYERS);vk.prototype.getOpacity=vk.prototype.Ae;vk.prototype.getRotateWithView=vk.prototype.ce;vk.prototype.getRotation=vk.prototype.Be;vk.prototype.getScale=vk.prototype.Ce;vk.prototype.getSnapToPixel=vk.prototype.de;vk.prototype.setOpacity=vk.prototype.De;vk.prototype.setRotation=vk.prototype.Ee;vk.prototype.setScale=vk.prototype.Fe;u("ol.style.RegularShape",MA,OPENLAYERS);MA.prototype.getAnchor=MA.prototype.Xb;MA.prototype.getAngle=MA.prototype.gn;
MA.prototype.getFill=MA.prototype.hn;MA.prototype.getImage=MA.prototype.fc;MA.prototype.getOrigin=MA.prototype.Ca;MA.prototype.getPoints=MA.prototype.jn;MA.prototype.getRadius=MA.prototype.kn;MA.prototype.getRadius2=MA.prototype.fk;MA.prototype.getSize=MA.prototype.Bb;MA.prototype.getStroke=MA.prototype.ln;u("ol.style.Stroke",am,OPENLAYERS);am.prototype.getColor=am.prototype.mn;am.prototype.getLineCap=am.prototype.Qj;am.prototype.getLineDash=am.prototype.nn;am.prototype.getLineJoin=am.prototype.Rj;
am.prototype.getMiterLimit=am.prototype.Wj;am.prototype.getWidth=am.prototype.pn;am.prototype.setColor=am.prototype.qn;am.prototype.setLineCap=am.prototype.Oo;am.prototype.setLineDash=am.prototype.rn;am.prototype.setLineJoin=am.prototype.Po;am.prototype.setMiterLimit=am.prototype.Qo;am.prototype.setWidth=am.prototype.Uo;u("ol.style.Style",cm,OPENLAYERS);cm.prototype.getGeometry=cm.prototype.W;cm.prototype.getGeometryFunction=cm.prototype.Lj;cm.prototype.getFill=cm.prototype.sn;
cm.prototype.getImage=cm.prototype.tn;cm.prototype.getStroke=cm.prototype.vn;cm.prototype.getText=cm.prototype.wn;cm.prototype.getZIndex=cm.prototype.xn;cm.prototype.setGeometry=cm.prototype.vh;cm.prototype.setZIndex=cm.prototype.yn;u("ol.style.Text",Zt,OPENLAYERS);Zt.prototype.getFont=Zt.prototype.Jj;Zt.prototype.getOffsetX=Zt.prototype.Xj;Zt.prototype.getOffsetY=Zt.prototype.Yj;Zt.prototype.getFill=Zt.prototype.zn;Zt.prototype.getRotation=Zt.prototype.An;Zt.prototype.getScale=Zt.prototype.Bn;
Zt.prototype.getStroke=Zt.prototype.Cn;Zt.prototype.getText=Zt.prototype.Dn;Zt.prototype.getTextAlign=Zt.prototype.jk;Zt.prototype.getTextBaseline=Zt.prototype.kk;Zt.prototype.setFont=Zt.prototype.Lo;Zt.prototype.setOffsetX=Zt.prototype.$h;Zt.prototype.setOffsetY=Zt.prototype.ai;Zt.prototype.setFill=Zt.prototype.Ko;Zt.prototype.setRotation=Zt.prototype.En;Zt.prototype.setScale=Zt.prototype.Fn;Zt.prototype.setStroke=Zt.prototype.Ro;Zt.prototype.setText=Zt.prototype.ci;Zt.prototype.setTextAlign=Zt.prototype.di;
Zt.prototype.setTextBaseline=Zt.prototype.So;u("ol.Sphere",Ae,OPENLAYERS);Ae.prototype.geodesicArea=Ae.prototype.c;Ae.prototype.haversineDistance=Ae.prototype.a;u("ol.source.BingMaps",Oz,OPENLAYERS);u("ol.source.BingMaps.TOS_ATTRIBUTION",Pz,OPENLAYERS);u("ol.source.Cluster",Qz,OPENLAYERS);Qz.prototype.getSource=Qz.prototype.ga;u("ol.source.ImageCanvas",rn,OPENLAYERS);u("ol.source.ImageMapGuide",Tz,OPENLAYERS);Tz.prototype.getParams=Tz.prototype.Em;Tz.prototype.getImageLoadFunction=Tz.prototype.Dm;
Tz.prototype.updateParams=Tz.prototype.Hm;Tz.prototype.setImageLoadFunction=Tz.prototype.Gm;u("ol.source.Image",kn,OPENLAYERS);mn.prototype.image=mn.prototype.image;u("ol.source.ImageStatic",Uz,OPENLAYERS);u("ol.source.ImageVector",Op,OPENLAYERS);Op.prototype.getSource=Op.prototype.Im;Op.prototype.getStyle=Op.prototype.Jm;Op.prototype.getStyleFunction=Op.prototype.Km;Op.prototype.setStyle=Op.prototype.mh;u("ol.source.ImageWMS",Vz,OPENLAYERS);Vz.prototype.getGetFeatureInfoUrl=Vz.prototype.Nm;
Vz.prototype.getParams=Vz.prototype.Pm;Vz.prototype.getImageLoadFunction=Vz.prototype.Om;Vz.prototype.getUrl=Vz.prototype.Qm;Vz.prototype.setImageLoadFunction=Vz.prototype.Rm;Vz.prototype.setUrl=Vz.prototype.Sm;Vz.prototype.updateParams=Vz.prototype.Tm;u("ol.source.MapQuest",bA,OPENLAYERS);bA.prototype.getLayer=bA.prototype.l;u("ol.source.OSM",$z,OPENLAYERS);u("ol.source.OSM.ATTRIBUTION",aA,OPENLAYERS);u("ol.source.Raster",eA,OPENLAYERS);eA.prototype.setOperation=eA.prototype.u;
jA.prototype.extent=jA.prototype.extent;jA.prototype.resolution=jA.prototype.resolution;jA.prototype.data=jA.prototype.data;u("ol.source.Source",yh,OPENLAYERS);yh.prototype.getAttributions=yh.prototype.sa;yh.prototype.getLogo=yh.prototype.qa;yh.prototype.getProjection=yh.prototype.ta;yh.prototype.getState=yh.prototype.ua;yh.prototype.setAttributions=yh.prototype.na;u("ol.source.Stamen",oA,OPENLAYERS);u("ol.source.TileArcGISRest",qA,OPENLAYERS);qA.prototype.getParams=qA.prototype.D;
qA.prototype.updateParams=qA.prototype.Z;u("ol.source.TileDebug",sA,OPENLAYERS);u("ol.source.TileImage",Y,OPENLAYERS);Y.prototype.setRenderReprojectionEdges=Y.prototype.wb;Y.prototype.setTileGridForProjection=Y.prototype.xb;u("ol.source.TileJSON",tA,OPENLAYERS);u("ol.source.Tile",Ph,OPENLAYERS);Ph.prototype.getTileGrid=Ph.prototype.Ga;Sh.prototype.tile=Sh.prototype.tile;u("ol.source.TileUTFGrid",uA,OPENLAYERS);uA.prototype.getTemplate=uA.prototype.ik;
uA.prototype.forDataAtCoordinateAndResolution=uA.prototype.vj;u("ol.source.TileWMS",zA,OPENLAYERS);zA.prototype.getGetFeatureInfoUrl=zA.prototype.Wm;zA.prototype.getParams=zA.prototype.Xm;zA.prototype.updateParams=zA.prototype.Zm;Zp.prototype.getTileLoadFunction=Zp.prototype.Wa;Zp.prototype.getTileUrlFunction=Zp.prototype.Xa;Zp.prototype.getUrls=Zp.prototype.Ya;Zp.prototype.setTileLoadFunction=Zp.prototype.bb;Zp.prototype.setTileUrlFunction=Zp.prototype.Ja;Zp.prototype.setUrl=Zp.prototype.Ua;
Zp.prototype.setUrls=Zp.prototype.Va;u("ol.source.Vector",R,OPENLAYERS);R.prototype.addFeature=R.prototype.Ad;R.prototype.addFeatures=R.prototype.Dc;R.prototype.clear=R.prototype.clear;R.prototype.forEachFeature=R.prototype.rg;R.prototype.forEachFeatureInExtent=R.prototype.ob;R.prototype.forEachFeatureIntersectingExtent=R.prototype.sg;R.prototype.getFeaturesCollection=R.prototype.yg;R.prototype.getFeatures=R.prototype.ye;R.prototype.getFeaturesAtCoordinate=R.prototype.xg;
R.prototype.getFeaturesInExtent=R.prototype.lf;R.prototype.getClosestFeatureToCoordinate=R.prototype.ug;R.prototype.getExtent=R.prototype.J;R.prototype.getFeatureById=R.prototype.wg;R.prototype.removeFeature=R.prototype.Qc;Lp.prototype.feature=Lp.prototype.feature;u("ol.source.VectorTile",$p,OPENLAYERS);u("ol.source.WMTS",Z,OPENLAYERS);Z.prototype.getDimensions=Z.prototype.Hj;Z.prototype.getFormat=Z.prototype.$m;Z.prototype.getLayer=Z.prototype.an;Z.prototype.getMatrixSet=Z.prototype.Uj;
Z.prototype.getRequestEncoding=Z.prototype.gk;Z.prototype.getStyle=Z.prototype.bn;Z.prototype.getVersion=Z.prototype.mk;Z.prototype.updateDimensions=Z.prototype.cp;
u("ol.source.WMTS.optionsFromCapabilities",function(b,c){var d=fb(b.Contents.Layer,function(b){return b.Identifier==c.layer}),e=b.Contents.TileMatrixSet,f,g;f=1<d.TileMatrixSetLink.length?"projection"in c?gb(d.TileMatrixSetLink,function(b){return fb(e,function(c){return c.Identifier==b.TileMatrixSet}).SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3")==c.projection}):gb(d.TileMatrixSetLink,function(b){return b.TileMatrixSet==c.matrixSet}):0;0>f&&(f=0);g=d.TileMatrixSetLink[f].TileMatrixSet;
var h=d.Format[0];"format"in c&&(h=c.format);f=gb(d.Style,function(b){return"style"in c?b.Title==c.style:b.isDefault});0>f&&(f=0);f=d.Style[f].Identifier;var k={};"Dimension"in d&&d.Dimension.forEach(function(b){var c=b.Identifier,d=b.Default;void 0===d&&(d=b.Value[0]);k[c]=d});var m=fb(b.Contents.TileMatrixSet,function(b){return b.Identifier==g}),n;n="projection"in c?Fe(c.projection):Fe(m.SupportedCRS.replace(/urn:ogc:def:crs:(\w+):(.*:)?(\w+)$/,"$1:$3"));var p=d.WGS84BoundingBox,q,r;void 0!==p&&
(r=Fe("EPSG:4326").J(),r=p[0]==r[0]&&p[2]==r[2],q=af(p,"EPSG:4326",n),(p=n.J())&&(Xd(p,q)||(q=void 0)));var m=EA(m,q),t=[];q=c.requestEncoding;q=void 0!==q?q:"";if(b.hasOwnProperty("OperationsMetadata")&&b.OperationsMetadata.hasOwnProperty("GetTile")&&0!==q.indexOf("REST"))for(var d=b.OperationsMetadata.GetTile.DCP.HTTP.Get,p=0,x=d.length;p<x;++p){var z=fb(d[p].Constraint,function(b){return"GetEncoding"==b.name}).AllowedValues.Value;0<z.length&&vb(z,"KVP")&&(q="KVP",t.push(d[p].href))}else q="REST",
d.ResourceURL.forEach(function(b){"tile"==b.resourceType&&(h=b.format,t.push(b.template))});return{urls:t,layer:c.layer,matrixSet:g,format:h,projection:n,requestEncoding:q,tileGrid:m,style:f,dimensions:k,wrapX:r}},OPENLAYERS);u("ol.source.XYZ",Zz,OPENLAYERS);u("ol.source.Zoomify",GA,OPENLAYERS);dk.prototype.vectorContext=dk.prototype.vectorContext;dk.prototype.frameState=dk.prototype.frameState;dk.prototype.context=dk.prototype.context;dk.prototype.glContext=dk.prototype.glContext;
Vm.prototype.get=Vm.prototype.get;Vm.prototype.getExtent=Vm.prototype.J;Vm.prototype.getGeometry=Vm.prototype.W;Vm.prototype.getProperties=Vm.prototype.ym;Vm.prototype.getType=Vm.prototype.V;u("ol.render.VectorContext",ck,OPENLAYERS);Rq.prototype.drawAsync=Rq.prototype.ld;Rq.prototype.drawCircleGeometry=Rq.prototype.Fc;Rq.prototype.drawFeature=Rq.prototype.hf;Rq.prototype.drawGeometryCollectionGeometry=Rq.prototype.Xd;Rq.prototype.drawPointGeometry=Rq.prototype.Gb;
Rq.prototype.drawLineStringGeometry=Rq.prototype.Wb;Rq.prototype.drawMultiLineStringGeometry=Rq.prototype.Gc;Rq.prototype.drawMultiPointGeometry=Rq.prototype.Fb;Rq.prototype.drawMultiPolygonGeometry=Rq.prototype.Hc;Rq.prototype.drawPolygonGeometry=Rq.prototype.Ic;Rq.prototype.drawText=Rq.prototype.Hb;Rq.prototype.setFillStrokeStyle=Rq.prototype.$a;Rq.prototype.setImageStyle=Rq.prototype.vb;Rq.prototype.setTextStyle=Rq.prototype.ab;jm.prototype.drawAsync=jm.prototype.ld;
jm.prototype.drawCircleGeometry=jm.prototype.Fc;jm.prototype.drawFeature=jm.prototype.hf;jm.prototype.drawPointGeometry=jm.prototype.Gb;jm.prototype.drawMultiPointGeometry=jm.prototype.Fb;jm.prototype.drawLineStringGeometry=jm.prototype.Wb;jm.prototype.drawMultiLineStringGeometry=jm.prototype.Gc;jm.prototype.drawPolygonGeometry=jm.prototype.Ic;jm.prototype.drawMultiPolygonGeometry=jm.prototype.Hc;jm.prototype.setFillStrokeStyle=jm.prototype.$a;jm.prototype.setImageStyle=jm.prototype.vb;
jm.prototype.setTextStyle=jm.prototype.ab;u("ol.proj.common.add",Rl,OPENLAYERS);u("ol.proj.METERS_PER_UNIT",Ce,OPENLAYERS);u("ol.proj.Projection",De,OPENLAYERS);De.prototype.getCode=De.prototype.Fj;De.prototype.getExtent=De.prototype.J;De.prototype.getUnits=De.prototype.wm;De.prototype.getMetersPerUnit=De.prototype.Jc;De.prototype.getWorldExtent=De.prototype.pk;De.prototype.isGlobal=De.prototype.cl;De.prototype.setGlobal=De.prototype.No;De.prototype.setExtent=De.prototype.xm;
De.prototype.setWorldExtent=De.prototype.Vo;De.prototype.setGetPointResolution=De.prototype.Mo;De.prototype.getPointResolution=De.prototype.getPointResolution;u("ol.proj.addEquivalentProjections",Ge,OPENLAYERS);u("ol.proj.addProjection",Ue,OPENLAYERS);u("ol.proj.addCoordinateTransforms",He,OPENLAYERS);u("ol.proj.fromLonLat",function(b,c){return $e(b,"EPSG:4326",void 0!==c?c:"EPSG:3857")},OPENLAYERS);u("ol.proj.toLonLat",function(b,c){return $e(b,void 0!==c?c:"EPSG:3857","EPSG:4326")},OPENLAYERS);
u("ol.proj.get",Fe,OPENLAYERS);u("ol.proj.getTransform",Ye,OPENLAYERS);u("ol.proj.transform",$e,OPENLAYERS);u("ol.proj.transformExtent",af,OPENLAYERS);u("ol.layer.Heatmap",X,OPENLAYERS);X.prototype.getBlur=X.prototype.tg;X.prototype.getGradient=X.prototype.Ag;X.prototype.getRadius=X.prototype.hh;X.prototype.setBlur=X.prototype.Sh;X.prototype.setGradient=X.prototype.Wh;X.prototype.setRadius=X.prototype.ih;u("ol.layer.Image",Sl,OPENLAYERS);Sl.prototype.getSource=Sl.prototype.fa;
u("ol.layer.Layer",ek,OPENLAYERS);ek.prototype.getSource=ek.prototype.fa;ek.prototype.setMap=ek.prototype.setMap;ek.prototype.setSource=ek.prototype.wc;u("ol.layer.Base",ak,OPENLAYERS);ak.prototype.getExtent=ak.prototype.J;ak.prototype.getMaxResolution=ak.prototype.Mb;ak.prototype.getMinResolution=ak.prototype.Nb;ak.prototype.getOpacity=ak.prototype.Rb;ak.prototype.getVisible=ak.prototype.qb;ak.prototype.getZIndex=ak.prototype.Sb;ak.prototype.setExtent=ak.prototype.bc;
ak.prototype.setMaxResolution=ak.prototype.jc;ak.prototype.setMinResolution=ak.prototype.kc;ak.prototype.setOpacity=ak.prototype.cc;ak.prototype.setVisible=ak.prototype.dc;ak.prototype.setZIndex=ak.prototype.ec;u("ol.layer.Group",Kl,OPENLAYERS);Kl.prototype.getLayers=Kl.prototype.Pc;Kl.prototype.setLayers=Kl.prototype.gh;u("ol.layer.Tile",F,OPENLAYERS);F.prototype.getPreload=F.prototype.a;F.prototype.getSource=F.prototype.fa;F.prototype.setPreload=F.prototype.f;
F.prototype.getUseInterimTilesOnError=F.prototype.b;F.prototype.setUseInterimTilesOnError=F.prototype.g;u("ol.layer.Vector",H,OPENLAYERS);H.prototype.getSource=H.prototype.fa;H.prototype.getStyle=H.prototype.D;H.prototype.getStyleFunction=H.prototype.G;H.prototype.setStyle=H.prototype.f;u("ol.layer.VectorTile",J,OPENLAYERS);J.prototype.getPreload=J.prototype.g;J.prototype.getSource=J.prototype.fa;J.prototype.getUseInterimTilesOnError=J.prototype.U;J.prototype.setPreload=J.prototype.T;
J.prototype.setUseInterimTilesOnError=J.prototype.Z;u("ol.interaction.DoubleClickZoom",Sk,OPENLAYERS);u("ol.interaction.DoubleClickZoom.handleEvent",Tk,OPENLAYERS);u("ol.interaction.DragAndDrop",vy,OPENLAYERS);u("ol.interaction.DragAndDrop.handleEvent",ue,OPENLAYERS);wy.prototype.features=wy.prototype.features;wy.prototype.file=wy.prototype.file;wy.prototype.projection=wy.prototype.projection;pl.prototype.coordinate=pl.prototype.coordinate;u("ol.interaction.DragBox",ql,OPENLAYERS);
ql.prototype.getGeometry=ql.prototype.W;u("ol.interaction.DragPan",dl,OPENLAYERS);u("ol.interaction.DragRotateAndZoom",zy,OPENLAYERS);u("ol.interaction.DragRotate",hl,OPENLAYERS);u("ol.interaction.DragZoom",ul,OPENLAYERS);Dy.prototype.feature=Dy.prototype.feature;u("ol.interaction.Draw",Ey,OPENLAYERS);u("ol.interaction.Draw.handleEvent",Gy,OPENLAYERS);Ey.prototype.removeLastPoint=Ey.prototype.Ao;Ey.prototype.finishDrawing=Ey.prototype.md;Ey.prototype.extend=Ey.prototype.bm;
u("ol.interaction.Draw.createRegularPolygon",function(b,c){return function(d,e){var f=d[0],g=d[1],h=Math.sqrt(xd(f,g)),k=e?e:Mf(new Qx(f),b);Nf(k,f,h,c?c:Math.atan((g[1]-f[1])/(g[0]-f[0])));return k}},OPENLAYERS);u("ol.interaction.Interaction",Ok,OPENLAYERS);Ok.prototype.getActive=Ok.prototype.b;Ok.prototype.setActive=Ok.prototype.g;u("ol.interaction.defaults",Jl,OPENLAYERS);u("ol.interaction.KeyboardPan",vl,OPENLAYERS);u("ol.interaction.KeyboardPan.handleEvent",wl,OPENLAYERS);
u("ol.interaction.KeyboardZoom",xl,OPENLAYERS);u("ol.interaction.KeyboardZoom.handleEvent",yl,OPENLAYERS);Uy.prototype.features=Uy.prototype.features;Uy.prototype.mapBrowserPointerEvent=Uy.prototype.mapBrowserPointerEvent;u("ol.interaction.Modify",Vy,OPENLAYERS);u("ol.interaction.Modify.handleEvent",Yy,OPENLAYERS);u("ol.interaction.MouseWheelZoom",zl,OPENLAYERS);u("ol.interaction.MouseWheelZoom.handleEvent",Al,OPENLAYERS);zl.prototype.setMouseAnchor=zl.prototype.D;
u("ol.interaction.PinchRotate",Bl,OPENLAYERS);u("ol.interaction.PinchZoom",Fl,OPENLAYERS);u("ol.interaction.Pointer",al,OPENLAYERS);u("ol.interaction.Pointer.handleEvent",bl,OPENLAYERS);hz.prototype.selected=hz.prototype.selected;hz.prototype.deselected=hz.prototype.deselected;hz.prototype.mapBrowserEvent=hz.prototype.mapBrowserEvent;u("ol.interaction.Select",iz,OPENLAYERS);iz.prototype.getFeatures=iz.prototype.lm;iz.prototype.getLayer=iz.prototype.mm;u("ol.interaction.Select.handleEvent",jz,OPENLAYERS);
iz.prototype.setMap=iz.prototype.setMap;u("ol.interaction.Snap",lz,OPENLAYERS);lz.prototype.addFeature=lz.prototype.wd;lz.prototype.removeFeature=lz.prototype.xd;pz.prototype.features=pz.prototype.features;pz.prototype.coordinate=pz.prototype.coordinate;u("ol.interaction.Translate",qz,OPENLAYERS);u("ol.geom.Circle",Qx,OPENLAYERS);Qx.prototype.clone=Qx.prototype.clone;Qx.prototype.getCenter=Qx.prototype.vd;Qx.prototype.getRadius=Qx.prototype.yf;Qx.prototype.getType=Qx.prototype.V;
Qx.prototype.intersectsExtent=Qx.prototype.Da;Qx.prototype.setCenter=Qx.prototype.Ul;Qx.prototype.setCenterAndRadius=Qx.prototype.Tf;Qx.prototype.setRadius=Qx.prototype.Vl;Qx.prototype.transform=Qx.prototype.kb;u("ol.geom.Geometry",bf,OPENLAYERS);bf.prototype.getClosestPoint=bf.prototype.pb;bf.prototype.getExtent=bf.prototype.J;bf.prototype.simplify=bf.prototype.yb;bf.prototype.transform=bf.prototype.kb;u("ol.geom.GeometryCollection",js,OPENLAYERS);js.prototype.clone=js.prototype.clone;
js.prototype.getGeometries=js.prototype.zg;js.prototype.getType=js.prototype.V;js.prototype.intersectsExtent=js.prototype.Da;js.prototype.setGeometries=js.prototype.Vh;js.prototype.applyTransform=js.prototype.mc;js.prototype.translate=js.prototype.Oc;u("ol.geom.LinearRing",wf,OPENLAYERS);wf.prototype.clone=wf.prototype.clone;wf.prototype.getArea=wf.prototype.Yl;wf.prototype.getCoordinates=wf.prototype.Y;wf.prototype.getType=wf.prototype.V;wf.prototype.setCoordinates=wf.prototype.ma;
u("ol.geom.LineString",T,OPENLAYERS);T.prototype.appendCoordinate=T.prototype.jj;T.prototype.clone=T.prototype.clone;T.prototype.forEachSegment=T.prototype.yj;T.prototype.getCoordinateAtM=T.prototype.Wl;T.prototype.getCoordinates=T.prototype.Y;T.prototype.getLength=T.prototype.Xl;T.prototype.getType=T.prototype.V;T.prototype.intersectsExtent=T.prototype.Da;T.prototype.setCoordinates=T.prototype.ma;u("ol.geom.MultiLineString",U,OPENLAYERS);U.prototype.appendLineString=U.prototype.kj;
U.prototype.clone=U.prototype.clone;U.prototype.getCoordinateAtM=U.prototype.Zl;U.prototype.getCoordinates=U.prototype.Y;U.prototype.getLineString=U.prototype.Sj;U.prototype.getLineStrings=U.prototype.rd;U.prototype.getType=U.prototype.V;U.prototype.intersectsExtent=U.prototype.Da;U.prototype.setCoordinates=U.prototype.ma;u("ol.geom.MultiPoint",$r,OPENLAYERS);$r.prototype.appendPoint=$r.prototype.mj;$r.prototype.clone=$r.prototype.clone;$r.prototype.getCoordinates=$r.prototype.Y;
$r.prototype.getPoint=$r.prototype.ck;$r.prototype.getPoints=$r.prototype.ue;$r.prototype.getType=$r.prototype.V;$r.prototype.intersectsExtent=$r.prototype.Da;$r.prototype.setCoordinates=$r.prototype.ma;u("ol.geom.MultiPolygon",V,OPENLAYERS);V.prototype.appendPolygon=V.prototype.nj;V.prototype.clone=V.prototype.clone;V.prototype.getArea=V.prototype.$l;V.prototype.getCoordinates=V.prototype.Y;V.prototype.getInteriorPoints=V.prototype.Pj;V.prototype.getPolygon=V.prototype.ek;
V.prototype.getPolygons=V.prototype.be;V.prototype.getType=V.prototype.V;V.prototype.intersectsExtent=V.prototype.Da;V.prototype.setCoordinates=V.prototype.ma;u("ol.geom.Point",D,OPENLAYERS);D.prototype.clone=D.prototype.clone;D.prototype.getCoordinates=D.prototype.Y;D.prototype.getType=D.prototype.V;D.prototype.intersectsExtent=D.prototype.Da;D.prototype.setCoordinates=D.prototype.ma;u("ol.geom.Polygon",E,OPENLAYERS);E.prototype.appendLinearRing=E.prototype.lj;E.prototype.clone=E.prototype.clone;
E.prototype.getArea=E.prototype.am;E.prototype.getCoordinates=E.prototype.Y;E.prototype.getInteriorPoint=E.prototype.Oj;E.prototype.getLinearRingCount=E.prototype.Tj;E.prototype.getLinearRing=E.prototype.Bg;E.prototype.getLinearRings=E.prototype.ae;E.prototype.getType=E.prototype.V;E.prototype.intersectsExtent=E.prototype.Da;E.prototype.setCoordinates=E.prototype.ma;u("ol.geom.Polygon.circular",Kf,OPENLAYERS);u("ol.geom.Polygon.fromExtent",Lf,OPENLAYERS);u("ol.geom.Polygon.fromCircle",Mf,OPENLAYERS);
u("ol.geom.SimpleGeometry",df,OPENLAYERS);df.prototype.getFirstCoordinate=df.prototype.Jb;df.prototype.getLastCoordinate=df.prototype.Kb;df.prototype.getLayout=df.prototype.Lb;df.prototype.applyTransform=df.prototype.mc;df.prototype.translate=df.prototype.Oc;u("ol.format.EsriJSON",cs,OPENLAYERS);cs.prototype.readFeature=cs.prototype.Tb;cs.prototype.readFeatures=cs.prototype.Ba;cs.prototype.readGeometry=cs.prototype.Sc;cs.prototype.readProjection=cs.prototype.Ia;cs.prototype.writeGeometry=cs.prototype.Wc;
cs.prototype.writeGeometryObject=cs.prototype.Te;cs.prototype.writeFeature=cs.prototype.Jd;cs.prototype.writeFeatureObject=cs.prototype.Vc;cs.prototype.writeFeatures=cs.prototype.Vb;cs.prototype.writeFeaturesObject=cs.prototype.Re;u("ol.format.Feature",Qr,OPENLAYERS);u("ol.format.GeoJSON",ns,OPENLAYERS);ns.prototype.readFeature=ns.prototype.Tb;ns.prototype.readFeatures=ns.prototype.Ba;ns.prototype.readGeometry=ns.prototype.Sc;ns.prototype.readProjection=ns.prototype.Ia;ns.prototype.writeFeature=ns.prototype.Jd;
ns.prototype.writeFeatureObject=ns.prototype.Vc;ns.prototype.writeFeatures=ns.prototype.Vb;ns.prototype.writeFeaturesObject=ns.prototype.Re;ns.prototype.writeGeometry=ns.prototype.Wc;ns.prototype.writeGeometryObject=ns.prototype.Te;u("ol.format.GPX",Rs,OPENLAYERS);Rs.prototype.readFeature=Rs.prototype.Tb;Rs.prototype.readFeatures=Rs.prototype.Ba;Rs.prototype.readProjection=Rs.prototype.Ia;Rs.prototype.writeFeatures=Rs.prototype.Vb;Rs.prototype.writeFeaturesNode=Rs.prototype.c;
u("ol.format.IGC",Bt,OPENLAYERS);Bt.prototype.readFeature=Bt.prototype.Tb;Bt.prototype.readFeatures=Bt.prototype.Ba;Bt.prototype.readProjection=Bt.prototype.Ia;u("ol.format.KML",$t,OPENLAYERS);$t.prototype.readFeature=$t.prototype.Tb;$t.prototype.readFeatures=$t.prototype.Ba;$t.prototype.readName=$t.prototype.po;$t.prototype.readNetworkLinks=$t.prototype.qo;$t.prototype.readProjection=$t.prototype.Ia;$t.prototype.writeFeatures=$t.prototype.Vb;$t.prototype.writeFeaturesNode=$t.prototype.c;
u("ol.format.MVT",Ov,OPENLAYERS);Ov.prototype.setLayers=Ov.prototype.g;u("ol.format.OSMXML",Qv,OPENLAYERS);Qv.prototype.readFeatures=Qv.prototype.Ba;Qv.prototype.readProjection=Qv.prototype.Ia;u("ol.format.Polyline",ow,OPENLAYERS);u("ol.format.Polyline.encodeDeltas",pw,OPENLAYERS);u("ol.format.Polyline.decodeDeltas",rw,OPENLAYERS);u("ol.format.Polyline.encodeFloats",qw,OPENLAYERS);u("ol.format.Polyline.decodeFloats",sw,OPENLAYERS);ow.prototype.readFeature=ow.prototype.Tb;
ow.prototype.readFeatures=ow.prototype.Ba;ow.prototype.readGeometry=ow.prototype.Sc;ow.prototype.readProjection=ow.prototype.Ia;ow.prototype.writeGeometry=ow.prototype.Wc;u("ol.format.TopoJSON",tw,OPENLAYERS);tw.prototype.readFeatures=tw.prototype.Ba;tw.prototype.readProjection=tw.prototype.Ia;u("ol.format.WFS",zw,OPENLAYERS);zw.prototype.readFeatures=zw.prototype.Ba;zw.prototype.readTransactionResponse=zw.prototype.i;zw.prototype.readFeatureCollectionMetadata=zw.prototype.j;
zw.prototype.writeGetFeature=zw.prototype.l;zw.prototype.writeTransaction=zw.prototype.A;zw.prototype.readProjection=zw.prototype.Ia;u("ol.format.WKT",Mw,OPENLAYERS);Mw.prototype.readFeature=Mw.prototype.Tb;Mw.prototype.readFeatures=Mw.prototype.Ba;Mw.prototype.readGeometry=Mw.prototype.Sc;Mw.prototype.writeFeature=Mw.prototype.Jd;Mw.prototype.writeFeatures=Mw.prototype.Vb;Mw.prototype.writeGeometry=Mw.prototype.Wc;u("ol.format.WMSCapabilities",dx,OPENLAYERS);dx.prototype.read=dx.prototype.read;
u("ol.format.WMSGetFeatureInfo",Ax,OPENLAYERS);Ax.prototype.readFeatures=Ax.prototype.Ba;u("ol.format.WMTSCapabilities",Bx,OPENLAYERS);Bx.prototype.read=Bx.prototype.read;u("ol.format.GML2",Hs,OPENLAYERS);u("ol.format.GML3",Is,OPENLAYERS);Is.prototype.writeGeometryNode=Is.prototype.B;Is.prototype.writeFeatures=Is.prototype.Vb;Is.prototype.writeFeaturesNode=Is.prototype.c;u("ol.format.GML",Is,OPENLAYERS);Is.prototype.writeFeatures=Is.prototype.Vb;Is.prototype.writeFeaturesNode=Is.prototype.c;
vs.prototype.readFeatures=vs.prototype.Ba;u("ol.events.condition.altKeyOnly",function(b){b=b.a;return b.c&&!b.l&&!b.f},OPENLAYERS);u("ol.events.condition.altShiftKeysOnly",Uk,OPENLAYERS);u("ol.events.condition.always",ue,OPENLAYERS);u("ol.events.condition.click",function(b){return b.type==Qj},OPENLAYERS);u("ol.events.condition.never",te,OPENLAYERS);u("ol.events.condition.pointerMove",Vk,OPENLAYERS);u("ol.events.condition.singleClick",Wk,OPENLAYERS);
u("ol.events.condition.doubleClick",function(b){return b.type==Rj},OPENLAYERS);u("ol.events.condition.noModifierKeys",Xk,OPENLAYERS);u("ol.events.condition.platformModifierKeyOnly",function(b){b=b.a;return!b.c&&b.l&&!b.f},OPENLAYERS);u("ol.events.condition.shiftKeyOnly",Yk,OPENLAYERS);u("ol.events.condition.targetNotEditable",Zk,OPENLAYERS);u("ol.events.condition.mouseOnly",$k,OPENLAYERS);u("ol.control.Attribution",Th,OPENLAYERS);u("ol.control.Attribution.render",Uh,OPENLAYERS);
Th.prototype.getCollapsible=Th.prototype.Kl;Th.prototype.setCollapsible=Th.prototype.Nl;Th.prototype.setCollapsed=Th.prototype.Ml;Th.prototype.getCollapsed=Th.prototype.Jl;u("ol.control.Control",qh,OPENLAYERS);qh.prototype.getMap=qh.prototype.g;qh.prototype.setMap=qh.prototype.setMap;qh.prototype.setTarget=qh.prototype.f;u("ol.control.defaults",Zh,OPENLAYERS);u("ol.control.FullScreen",ei,OPENLAYERS);u("ol.control.MousePosition",fi,OPENLAYERS);u("ol.control.MousePosition.render",gi,OPENLAYERS);
fi.prototype.getCoordinateFormat=fi.prototype.vg;fi.prototype.getProjection=fi.prototype.Zg;fi.prototype.setCoordinateFormat=fi.prototype.Th;fi.prototype.setProjection=fi.prototype.$g;u("ol.control.OverviewMap",qr,OPENLAYERS);u("ol.control.OverviewMap.render",rr,OPENLAYERS);qr.prototype.getCollapsible=qr.prototype.Ql;qr.prototype.setCollapsible=qr.prototype.Tl;qr.prototype.setCollapsed=qr.prototype.Sl;qr.prototype.getCollapsed=qr.prototype.Pl;qr.prototype.getOverviewMap=qr.prototype.ak;
u("ol.control.Rotate",Wh,OPENLAYERS);u("ol.control.Rotate.render",Xh,OPENLAYERS);u("ol.control.ScaleLine",vr,OPENLAYERS);vr.prototype.getUnits=vr.prototype.G;u("ol.control.ScaleLine.render",wr,OPENLAYERS);vr.prototype.setUnits=vr.prototype.T;u("ol.control.Zoom",Yh,OPENLAYERS);u("ol.control.ZoomSlider",Jr,OPENLAYERS);u("ol.control.ZoomSlider.render",Lr,OPENLAYERS);u("ol.control.ZoomToExtent",Or,OPENLAYERS);u("ol.color.asArray",tg,OPENLAYERS);u("ol.color.asString",vg,OPENLAYERS);
id.prototype.changed=id.prototype.s;id.prototype.dispatchEvent=id.prototype.o;id.prototype.getRevision=id.prototype.L;id.prototype.on=id.prototype.H;id.prototype.once=id.prototype.M;id.prototype.un=id.prototype.K;id.prototype.unByKey=id.prototype.N;og.prototype.get=og.prototype.get;og.prototype.getKeys=og.prototype.O;og.prototype.getProperties=og.prototype.P;og.prototype.set=og.prototype.set;og.prototype.setProperties=og.prototype.I;og.prototype.unset=og.prototype.R;og.prototype.changed=og.prototype.s;
og.prototype.dispatchEvent=og.prototype.o;og.prototype.getRevision=og.prototype.L;og.prototype.on=og.prototype.H;og.prototype.once=og.prototype.M;og.prototype.un=og.prototype.K;og.prototype.unByKey=og.prototype.N;Pr.prototype.get=Pr.prototype.get;Pr.prototype.getKeys=Pr.prototype.O;Pr.prototype.getProperties=Pr.prototype.P;Pr.prototype.set=Pr.prototype.set;Pr.prototype.setProperties=Pr.prototype.I;Pr.prototype.unset=Pr.prototype.R;Pr.prototype.changed=Pr.prototype.s;Pr.prototype.dispatchEvent=Pr.prototype.o;
Pr.prototype.getRevision=Pr.prototype.L;Pr.prototype.on=Pr.prototype.H;Pr.prototype.once=Pr.prototype.M;Pr.prototype.un=Pr.prototype.K;Pr.prototype.unByKey=Pr.prototype.N;sn.prototype.get=sn.prototype.get;sn.prototype.getKeys=sn.prototype.O;sn.prototype.getProperties=sn.prototype.P;sn.prototype.set=sn.prototype.set;sn.prototype.setProperties=sn.prototype.I;sn.prototype.unset=sn.prototype.R;sn.prototype.changed=sn.prototype.s;sn.prototype.dispatchEvent=sn.prototype.o;sn.prototype.getRevision=sn.prototype.L;
sn.prototype.on=sn.prototype.H;sn.prototype.once=sn.prototype.M;sn.prototype.un=sn.prototype.K;sn.prototype.unByKey=sn.prototype.N;Px.prototype.get=Px.prototype.get;Px.prototype.getKeys=Px.prototype.O;Px.prototype.getProperties=Px.prototype.P;Px.prototype.set=Px.prototype.set;Px.prototype.setProperties=Px.prototype.I;Px.prototype.unset=Px.prototype.R;Px.prototype.changed=Px.prototype.s;Px.prototype.dispatchEvent=Px.prototype.o;Px.prototype.getRevision=Px.prototype.L;Px.prototype.on=Px.prototype.H;
Px.prototype.once=Px.prototype.M;Px.prototype.un=Px.prototype.K;Px.prototype.unByKey=Px.prototype.N;ay.prototype.getTileCoord=ay.prototype.f;S.prototype.get=S.prototype.get;S.prototype.getKeys=S.prototype.O;S.prototype.getProperties=S.prototype.P;S.prototype.set=S.prototype.set;S.prototype.setProperties=S.prototype.I;S.prototype.unset=S.prototype.R;S.prototype.changed=S.prototype.s;S.prototype.dispatchEvent=S.prototype.o;S.prototype.getRevision=S.prototype.L;S.prototype.on=S.prototype.H;
S.prototype.once=S.prototype.M;S.prototype.un=S.prototype.K;S.prototype.unByKey=S.prototype.N;Mj.prototype.map=Mj.prototype.map;Mj.prototype.frameState=Mj.prototype.frameState;Nj.prototype.originalEvent=Nj.prototype.originalEvent;Nj.prototype.pixel=Nj.prototype.pixel;Nj.prototype.coordinate=Nj.prototype.coordinate;Nj.prototype.dragging=Nj.prototype.dragging;Nj.prototype.preventDefault=Nj.prototype.preventDefault;Nj.prototype.stopPropagation=Nj.prototype.b;Nj.prototype.map=Nj.prototype.map;
Nj.prototype.frameState=Nj.prototype.frameState;mr.prototype.get=mr.prototype.get;mr.prototype.getKeys=mr.prototype.O;mr.prototype.getProperties=mr.prototype.P;mr.prototype.set=mr.prototype.set;mr.prototype.setProperties=mr.prototype.I;mr.prototype.unset=mr.prototype.R;mr.prototype.changed=mr.prototype.s;mr.prototype.dispatchEvent=mr.prototype.o;mr.prototype.getRevision=mr.prototype.L;mr.prototype.on=mr.prototype.H;mr.prototype.once=mr.prototype.M;mr.prototype.un=mr.prototype.K;
mr.prototype.unByKey=mr.prototype.N;Tp.prototype.getTileCoord=Tp.prototype.f;Of.prototype.get=Of.prototype.get;Of.prototype.getKeys=Of.prototype.O;Of.prototype.getProperties=Of.prototype.P;Of.prototype.set=Of.prototype.set;Of.prototype.setProperties=Of.prototype.I;Of.prototype.unset=Of.prototype.R;Of.prototype.changed=Of.prototype.s;Of.prototype.dispatchEvent=Of.prototype.o;Of.prototype.getRevision=Of.prototype.L;Of.prototype.on=Of.prototype.H;Of.prototype.once=Of.prototype.M;Of.prototype.un=Of.prototype.K;
Of.prototype.unByKey=Of.prototype.N;DA.prototype.getMaxZoom=DA.prototype.Cg;DA.prototype.getMinZoom=DA.prototype.Dg;DA.prototype.getOrigin=DA.prototype.Ca;DA.prototype.getResolution=DA.prototype.$;DA.prototype.getResolutions=DA.prototype.wh;DA.prototype.getTileCoordExtent=DA.prototype.Aa;DA.prototype.getTileCoordForCoordAndResolution=DA.prototype.ee;DA.prototype.getTileCoordForCoordAndZ=DA.prototype.fe;DA.prototype.getTileSize=DA.prototype.Ha;bm.prototype.getOpacity=bm.prototype.Ae;
bm.prototype.getRotateWithView=bm.prototype.ce;bm.prototype.getRotation=bm.prototype.Be;bm.prototype.getScale=bm.prototype.Ce;bm.prototype.getSnapToPixel=bm.prototype.de;bm.prototype.setOpacity=bm.prototype.De;bm.prototype.setRotation=bm.prototype.Ee;bm.prototype.setScale=bm.prototype.Fe;wk.prototype.getOpacity=wk.prototype.Ae;wk.prototype.getRotateWithView=wk.prototype.ce;wk.prototype.getRotation=wk.prototype.Be;wk.prototype.getScale=wk.prototype.Ce;wk.prototype.getSnapToPixel=wk.prototype.de;
wk.prototype.setOpacity=wk.prototype.De;wk.prototype.setRotation=wk.prototype.Ee;wk.prototype.setScale=wk.prototype.Fe;MA.prototype.getOpacity=MA.prototype.Ae;MA.prototype.getRotateWithView=MA.prototype.ce;MA.prototype.getRotation=MA.prototype.Be;MA.prototype.getScale=MA.prototype.Ce;MA.prototype.getSnapToPixel=MA.prototype.de;MA.prototype.setOpacity=MA.prototype.De;MA.prototype.setRotation=MA.prototype.Ee;MA.prototype.setScale=MA.prototype.Fe;yh.prototype.get=yh.prototype.get;
yh.prototype.getKeys=yh.prototype.O;yh.prototype.getProperties=yh.prototype.P;yh.prototype.set=yh.prototype.set;yh.prototype.setProperties=yh.prototype.I;yh.prototype.unset=yh.prototype.R;yh.prototype.changed=yh.prototype.s;yh.prototype.dispatchEvent=yh.prototype.o;yh.prototype.getRevision=yh.prototype.L;yh.prototype.on=yh.prototype.H;yh.prototype.once=yh.prototype.M;yh.prototype.un=yh.prototype.K;yh.prototype.unByKey=yh.prototype.N;Ph.prototype.getAttributions=Ph.prototype.sa;
Ph.prototype.getLogo=Ph.prototype.qa;Ph.prototype.getProjection=Ph.prototype.ta;Ph.prototype.getState=Ph.prototype.ua;Ph.prototype.setAttributions=Ph.prototype.na;Ph.prototype.get=Ph.prototype.get;Ph.prototype.getKeys=Ph.prototype.O;Ph.prototype.getProperties=Ph.prototype.P;Ph.prototype.set=Ph.prototype.set;Ph.prototype.setProperties=Ph.prototype.I;Ph.prototype.unset=Ph.prototype.R;Ph.prototype.changed=Ph.prototype.s;Ph.prototype.dispatchEvent=Ph.prototype.o;Ph.prototype.getRevision=Ph.prototype.L;
Ph.prototype.on=Ph.prototype.H;Ph.prototype.once=Ph.prototype.M;Ph.prototype.un=Ph.prototype.K;Ph.prototype.unByKey=Ph.prototype.N;Zp.prototype.getTileGrid=Zp.prototype.Ga;Zp.prototype.getAttributions=Zp.prototype.sa;Zp.prototype.getLogo=Zp.prototype.qa;Zp.prototype.getProjection=Zp.prototype.ta;Zp.prototype.getState=Zp.prototype.ua;Zp.prototype.setAttributions=Zp.prototype.na;Zp.prototype.get=Zp.prototype.get;Zp.prototype.getKeys=Zp.prototype.O;Zp.prototype.getProperties=Zp.prototype.P;
Zp.prototype.set=Zp.prototype.set;Zp.prototype.setProperties=Zp.prototype.I;Zp.prototype.unset=Zp.prototype.R;Zp.prototype.changed=Zp.prototype.s;Zp.prototype.dispatchEvent=Zp.prototype.o;Zp.prototype.getRevision=Zp.prototype.L;Zp.prototype.on=Zp.prototype.H;Zp.prototype.once=Zp.prototype.M;Zp.prototype.un=Zp.prototype.K;Zp.prototype.unByKey=Zp.prototype.N;Y.prototype.getTileLoadFunction=Y.prototype.Wa;Y.prototype.getTileUrlFunction=Y.prototype.Xa;Y.prototype.getUrls=Y.prototype.Ya;
Y.prototype.setTileLoadFunction=Y.prototype.bb;Y.prototype.setTileUrlFunction=Y.prototype.Ja;Y.prototype.setUrl=Y.prototype.Ua;Y.prototype.setUrls=Y.prototype.Va;Y.prototype.getTileGrid=Y.prototype.Ga;Y.prototype.getAttributions=Y.prototype.sa;Y.prototype.getLogo=Y.prototype.qa;Y.prototype.getProjection=Y.prototype.ta;Y.prototype.getState=Y.prototype.ua;Y.prototype.setAttributions=Y.prototype.na;Y.prototype.get=Y.prototype.get;Y.prototype.getKeys=Y.prototype.O;Y.prototype.getProperties=Y.prototype.P;
Y.prototype.set=Y.prototype.set;Y.prototype.setProperties=Y.prototype.I;Y.prototype.unset=Y.prototype.R;Y.prototype.changed=Y.prototype.s;Y.prototype.dispatchEvent=Y.prototype.o;Y.prototype.getRevision=Y.prototype.L;Y.prototype.on=Y.prototype.H;Y.prototype.once=Y.prototype.M;Y.prototype.un=Y.prototype.K;Y.prototype.unByKey=Y.prototype.N;Oz.prototype.setRenderReprojectionEdges=Oz.prototype.wb;Oz.prototype.setTileGridForProjection=Oz.prototype.xb;Oz.prototype.getTileLoadFunction=Oz.prototype.Wa;
Oz.prototype.getTileUrlFunction=Oz.prototype.Xa;Oz.prototype.getUrls=Oz.prototype.Ya;Oz.prototype.setTileLoadFunction=Oz.prototype.bb;Oz.prototype.setTileUrlFunction=Oz.prototype.Ja;Oz.prototype.setUrl=Oz.prototype.Ua;Oz.prototype.setUrls=Oz.prototype.Va;Oz.prototype.getTileGrid=Oz.prototype.Ga;Oz.prototype.getAttributions=Oz.prototype.sa;Oz.prototype.getLogo=Oz.prototype.qa;Oz.prototype.getProjection=Oz.prototype.ta;Oz.prototype.getState=Oz.prototype.ua;Oz.prototype.setAttributions=Oz.prototype.na;
Oz.prototype.get=Oz.prototype.get;Oz.prototype.getKeys=Oz.prototype.O;Oz.prototype.getProperties=Oz.prototype.P;Oz.prototype.set=Oz.prototype.set;Oz.prototype.setProperties=Oz.prototype.I;Oz.prototype.unset=Oz.prototype.R;Oz.prototype.changed=Oz.prototype.s;Oz.prototype.dispatchEvent=Oz.prototype.o;Oz.prototype.getRevision=Oz.prototype.L;Oz.prototype.on=Oz.prototype.H;Oz.prototype.once=Oz.prototype.M;Oz.prototype.un=Oz.prototype.K;Oz.prototype.unByKey=Oz.prototype.N;R.prototype.getAttributions=R.prototype.sa;
R.prototype.getLogo=R.prototype.qa;R.prototype.getProjection=R.prototype.ta;R.prototype.getState=R.prototype.ua;R.prototype.setAttributions=R.prototype.na;R.prototype.get=R.prototype.get;R.prototype.getKeys=R.prototype.O;R.prototype.getProperties=R.prototype.P;R.prototype.set=R.prototype.set;R.prototype.setProperties=R.prototype.I;R.prototype.unset=R.prototype.R;R.prototype.changed=R.prototype.s;R.prototype.dispatchEvent=R.prototype.o;R.prototype.getRevision=R.prototype.L;R.prototype.on=R.prototype.H;
R.prototype.once=R.prototype.M;R.prototype.un=R.prototype.K;R.prototype.unByKey=R.prototype.N;Qz.prototype.addFeature=Qz.prototype.Ad;Qz.prototype.addFeatures=Qz.prototype.Dc;Qz.prototype.clear=Qz.prototype.clear;Qz.prototype.forEachFeature=Qz.prototype.rg;Qz.prototype.forEachFeatureInExtent=Qz.prototype.ob;Qz.prototype.forEachFeatureIntersectingExtent=Qz.prototype.sg;Qz.prototype.getFeaturesCollection=Qz.prototype.yg;Qz.prototype.getFeatures=Qz.prototype.ye;Qz.prototype.getFeaturesAtCoordinate=Qz.prototype.xg;
Qz.prototype.getFeaturesInExtent=Qz.prototype.lf;Qz.prototype.getClosestFeatureToCoordinate=Qz.prototype.ug;Qz.prototype.getExtent=Qz.prototype.J;Qz.prototype.getFeatureById=Qz.prototype.wg;Qz.prototype.removeFeature=Qz.prototype.Qc;Qz.prototype.getAttributions=Qz.prototype.sa;Qz.prototype.getLogo=Qz.prototype.qa;Qz.prototype.getProjection=Qz.prototype.ta;Qz.prototype.getState=Qz.prototype.ua;Qz.prototype.setAttributions=Qz.prototype.na;Qz.prototype.get=Qz.prototype.get;Qz.prototype.getKeys=Qz.prototype.O;
Qz.prototype.getProperties=Qz.prototype.P;Qz.prototype.set=Qz.prototype.set;Qz.prototype.setProperties=Qz.prototype.I;Qz.prototype.unset=Qz.prototype.R;Qz.prototype.changed=Qz.prototype.s;Qz.prototype.dispatchEvent=Qz.prototype.o;Qz.prototype.getRevision=Qz.prototype.L;Qz.prototype.on=Qz.prototype.H;Qz.prototype.once=Qz.prototype.M;Qz.prototype.un=Qz.prototype.K;Qz.prototype.unByKey=Qz.prototype.N;kn.prototype.getAttributions=kn.prototype.sa;kn.prototype.getLogo=kn.prototype.qa;
kn.prototype.getProjection=kn.prototype.ta;kn.prototype.getState=kn.prototype.ua;kn.prototype.setAttributions=kn.prototype.na;kn.prototype.get=kn.prototype.get;kn.prototype.getKeys=kn.prototype.O;kn.prototype.getProperties=kn.prototype.P;kn.prototype.set=kn.prototype.set;kn.prototype.setProperties=kn.prototype.I;kn.prototype.unset=kn.prototype.R;kn.prototype.changed=kn.prototype.s;kn.prototype.dispatchEvent=kn.prototype.o;kn.prototype.getRevision=kn.prototype.L;kn.prototype.on=kn.prototype.H;
kn.prototype.once=kn.prototype.M;kn.prototype.un=kn.prototype.K;kn.prototype.unByKey=kn.prototype.N;rn.prototype.getAttributions=rn.prototype.sa;rn.prototype.getLogo=rn.prototype.qa;rn.prototype.getProjection=rn.prototype.ta;rn.prototype.getState=rn.prototype.ua;rn.prototype.setAttributions=rn.prototype.na;rn.prototype.get=rn.prototype.get;rn.prototype.getKeys=rn.prototype.O;rn.prototype.getProperties=rn.prototype.P;rn.prototype.set=rn.prototype.set;rn.prototype.setProperties=rn.prototype.I;
rn.prototype.unset=rn.prototype.R;rn.prototype.changed=rn.prototype.s;rn.prototype.dispatchEvent=rn.prototype.o;rn.prototype.getRevision=rn.prototype.L;rn.prototype.on=rn.prototype.H;rn.prototype.once=rn.prototype.M;rn.prototype.un=rn.prototype.K;rn.prototype.unByKey=rn.prototype.N;Tz.prototype.getAttributions=Tz.prototype.sa;Tz.prototype.getLogo=Tz.prototype.qa;Tz.prototype.getProjection=Tz.prototype.ta;Tz.prototype.getState=Tz.prototype.ua;Tz.prototype.setAttributions=Tz.prototype.na;
Tz.prototype.get=Tz.prototype.get;Tz.prototype.getKeys=Tz.prototype.O;Tz.prototype.getProperties=Tz.prototype.P;Tz.prototype.set=Tz.prototype.set;Tz.prototype.setProperties=Tz.prototype.I;Tz.prototype.unset=Tz.prototype.R;Tz.prototype.changed=Tz.prototype.s;Tz.prototype.dispatchEvent=Tz.prototype.o;Tz.prototype.getRevision=Tz.prototype.L;Tz.prototype.on=Tz.prototype.H;Tz.prototype.once=Tz.prototype.M;Tz.prototype.un=Tz.prototype.K;Tz.prototype.unByKey=Tz.prototype.N;Uz.prototype.getAttributions=Uz.prototype.sa;
Uz.prototype.getLogo=Uz.prototype.qa;Uz.prototype.getProjection=Uz.prototype.ta;Uz.prototype.getState=Uz.prototype.ua;Uz.prototype.setAttributions=Uz.prototype.na;Uz.prototype.get=Uz.prototype.get;Uz.prototype.getKeys=Uz.prototype.O;Uz.prototype.getProperties=Uz.prototype.P;Uz.prototype.set=Uz.prototype.set;Uz.prototype.setProperties=Uz.prototype.I;Uz.prototype.unset=Uz.prototype.R;Uz.prototype.changed=Uz.prototype.s;Uz.prototype.dispatchEvent=Uz.prototype.o;Uz.prototype.getRevision=Uz.prototype.L;
Uz.prototype.on=Uz.prototype.H;Uz.prototype.once=Uz.prototype.M;Uz.prototype.un=Uz.prototype.K;Uz.prototype.unByKey=Uz.prototype.N;Op.prototype.getAttributions=Op.prototype.sa;Op.prototype.getLogo=Op.prototype.qa;Op.prototype.getProjection=Op.prototype.ta;Op.prototype.getState=Op.prototype.ua;Op.prototype.setAttributions=Op.prototype.na;Op.prototype.get=Op.prototype.get;Op.prototype.getKeys=Op.prototype.O;Op.prototype.getProperties=Op.prototype.P;Op.prototype.set=Op.prototype.set;
Op.prototype.setProperties=Op.prototype.I;Op.prototype.unset=Op.prototype.R;Op.prototype.changed=Op.prototype.s;Op.prototype.dispatchEvent=Op.prototype.o;Op.prototype.getRevision=Op.prototype.L;Op.prototype.on=Op.prototype.H;Op.prototype.once=Op.prototype.M;Op.prototype.un=Op.prototype.K;Op.prototype.unByKey=Op.prototype.N;Vz.prototype.getAttributions=Vz.prototype.sa;Vz.prototype.getLogo=Vz.prototype.qa;Vz.prototype.getProjection=Vz.prototype.ta;Vz.prototype.getState=Vz.prototype.ua;
Vz.prototype.setAttributions=Vz.prototype.na;Vz.prototype.get=Vz.prototype.get;Vz.prototype.getKeys=Vz.prototype.O;Vz.prototype.getProperties=Vz.prototype.P;Vz.prototype.set=Vz.prototype.set;Vz.prototype.setProperties=Vz.prototype.I;Vz.prototype.unset=Vz.prototype.R;Vz.prototype.changed=Vz.prototype.s;Vz.prototype.dispatchEvent=Vz.prototype.o;Vz.prototype.getRevision=Vz.prototype.L;Vz.prototype.on=Vz.prototype.H;Vz.prototype.once=Vz.prototype.M;Vz.prototype.un=Vz.prototype.K;
Vz.prototype.unByKey=Vz.prototype.N;Zz.prototype.setRenderReprojectionEdges=Zz.prototype.wb;Zz.prototype.setTileGridForProjection=Zz.prototype.xb;Zz.prototype.getTileLoadFunction=Zz.prototype.Wa;Zz.prototype.getTileUrlFunction=Zz.prototype.Xa;Zz.prototype.getUrls=Zz.prototype.Ya;Zz.prototype.setTileLoadFunction=Zz.prototype.bb;Zz.prototype.setTileUrlFunction=Zz.prototype.Ja;Zz.prototype.setUrl=Zz.prototype.Ua;Zz.prototype.setUrls=Zz.prototype.Va;Zz.prototype.getTileGrid=Zz.prototype.Ga;
Zz.prototype.getAttributions=Zz.prototype.sa;Zz.prototype.getLogo=Zz.prototype.qa;Zz.prototype.getProjection=Zz.prototype.ta;Zz.prototype.getState=Zz.prototype.ua;Zz.prototype.setAttributions=Zz.prototype.na;Zz.prototype.get=Zz.prototype.get;Zz.prototype.getKeys=Zz.prototype.O;Zz.prototype.getProperties=Zz.prototype.P;Zz.prototype.set=Zz.prototype.set;Zz.prototype.setProperties=Zz.prototype.I;Zz.prototype.unset=Zz.prototype.R;Zz.prototype.changed=Zz.prototype.s;Zz.prototype.dispatchEvent=Zz.prototype.o;
Zz.prototype.getRevision=Zz.prototype.L;Zz.prototype.on=Zz.prototype.H;Zz.prototype.once=Zz.prototype.M;Zz.prototype.un=Zz.prototype.K;Zz.prototype.unByKey=Zz.prototype.N;bA.prototype.setRenderReprojectionEdges=bA.prototype.wb;bA.prototype.setTileGridForProjection=bA.prototype.xb;bA.prototype.getTileLoadFunction=bA.prototype.Wa;bA.prototype.getTileUrlFunction=bA.prototype.Xa;bA.prototype.getUrls=bA.prototype.Ya;bA.prototype.setTileLoadFunction=bA.prototype.bb;bA.prototype.setTileUrlFunction=bA.prototype.Ja;
bA.prototype.setUrl=bA.prototype.Ua;bA.prototype.setUrls=bA.prototype.Va;bA.prototype.getTileGrid=bA.prototype.Ga;bA.prototype.getAttributions=bA.prototype.sa;bA.prototype.getLogo=bA.prototype.qa;bA.prototype.getProjection=bA.prototype.ta;bA.prototype.getState=bA.prototype.ua;bA.prototype.setAttributions=bA.prototype.na;bA.prototype.get=bA.prototype.get;bA.prototype.getKeys=bA.prototype.O;bA.prototype.getProperties=bA.prototype.P;bA.prototype.set=bA.prototype.set;bA.prototype.setProperties=bA.prototype.I;
bA.prototype.unset=bA.prototype.R;bA.prototype.changed=bA.prototype.s;bA.prototype.dispatchEvent=bA.prototype.o;bA.prototype.getRevision=bA.prototype.L;bA.prototype.on=bA.prototype.H;bA.prototype.once=bA.prototype.M;bA.prototype.un=bA.prototype.K;bA.prototype.unByKey=bA.prototype.N;$z.prototype.setRenderReprojectionEdges=$z.prototype.wb;$z.prototype.setTileGridForProjection=$z.prototype.xb;$z.prototype.getTileLoadFunction=$z.prototype.Wa;$z.prototype.getTileUrlFunction=$z.prototype.Xa;
$z.prototype.getUrls=$z.prototype.Ya;$z.prototype.setTileLoadFunction=$z.prototype.bb;$z.prototype.setTileUrlFunction=$z.prototype.Ja;$z.prototype.setUrl=$z.prototype.Ua;$z.prototype.setUrls=$z.prototype.Va;$z.prototype.getTileGrid=$z.prototype.Ga;$z.prototype.getAttributions=$z.prototype.sa;$z.prototype.getLogo=$z.prototype.qa;$z.prototype.getProjection=$z.prototype.ta;$z.prototype.getState=$z.prototype.ua;$z.prototype.setAttributions=$z.prototype.na;$z.prototype.get=$z.prototype.get;
$z.prototype.getKeys=$z.prototype.O;$z.prototype.getProperties=$z.prototype.P;$z.prototype.set=$z.prototype.set;$z.prototype.setProperties=$z.prototype.I;$z.prototype.unset=$z.prototype.R;$z.prototype.changed=$z.prototype.s;$z.prototype.dispatchEvent=$z.prototype.o;$z.prototype.getRevision=$z.prototype.L;$z.prototype.on=$z.prototype.H;$z.prototype.once=$z.prototype.M;$z.prototype.un=$z.prototype.K;$z.prototype.unByKey=$z.prototype.N;eA.prototype.getAttributions=eA.prototype.sa;
eA.prototype.getLogo=eA.prototype.qa;eA.prototype.getProjection=eA.prototype.ta;eA.prototype.getState=eA.prototype.ua;eA.prototype.setAttributions=eA.prototype.na;eA.prototype.get=eA.prototype.get;eA.prototype.getKeys=eA.prototype.O;eA.prototype.getProperties=eA.prototype.P;eA.prototype.set=eA.prototype.set;eA.prototype.setProperties=eA.prototype.I;eA.prototype.unset=eA.prototype.R;eA.prototype.changed=eA.prototype.s;eA.prototype.dispatchEvent=eA.prototype.o;eA.prototype.getRevision=eA.prototype.L;
eA.prototype.on=eA.prototype.H;eA.prototype.once=eA.prototype.M;eA.prototype.un=eA.prototype.K;eA.prototype.unByKey=eA.prototype.N;oA.prototype.setRenderReprojectionEdges=oA.prototype.wb;oA.prototype.setTileGridForProjection=oA.prototype.xb;oA.prototype.getTileLoadFunction=oA.prototype.Wa;oA.prototype.getTileUrlFunction=oA.prototype.Xa;oA.prototype.getUrls=oA.prototype.Ya;oA.prototype.setTileLoadFunction=oA.prototype.bb;oA.prototype.setTileUrlFunction=oA.prototype.Ja;oA.prototype.setUrl=oA.prototype.Ua;
oA.prototype.setUrls=oA.prototype.Va;oA.prototype.getTileGrid=oA.prototype.Ga;oA.prototype.getAttributions=oA.prototype.sa;oA.prototype.getLogo=oA.prototype.qa;oA.prototype.getProjection=oA.prototype.ta;oA.prototype.getState=oA.prototype.ua;oA.prototype.setAttributions=oA.prototype.na;oA.prototype.get=oA.prototype.get;oA.prototype.getKeys=oA.prototype.O;oA.prototype.getProperties=oA.prototype.P;oA.prototype.set=oA.prototype.set;oA.prototype.setProperties=oA.prototype.I;oA.prototype.unset=oA.prototype.R;
oA.prototype.changed=oA.prototype.s;oA.prototype.dispatchEvent=oA.prototype.o;oA.prototype.getRevision=oA.prototype.L;oA.prototype.on=oA.prototype.H;oA.prototype.once=oA.prototype.M;oA.prototype.un=oA.prototype.K;oA.prototype.unByKey=oA.prototype.N;qA.prototype.setRenderReprojectionEdges=qA.prototype.wb;qA.prototype.setTileGridForProjection=qA.prototype.xb;qA.prototype.getTileLoadFunction=qA.prototype.Wa;qA.prototype.getTileUrlFunction=qA.prototype.Xa;qA.prototype.getUrls=qA.prototype.Ya;
qA.prototype.setTileLoadFunction=qA.prototype.bb;qA.prototype.setTileUrlFunction=qA.prototype.Ja;qA.prototype.setUrl=qA.prototype.Ua;qA.prototype.setUrls=qA.prototype.Va;qA.prototype.getTileGrid=qA.prototype.Ga;qA.prototype.getAttributions=qA.prototype.sa;qA.prototype.getLogo=qA.prototype.qa;qA.prototype.getProjection=qA.prototype.ta;qA.prototype.getState=qA.prototype.ua;qA.prototype.setAttributions=qA.prototype.na;qA.prototype.get=qA.prototype.get;qA.prototype.getKeys=qA.prototype.O;
qA.prototype.getProperties=qA.prototype.P;qA.prototype.set=qA.prototype.set;qA.prototype.setProperties=qA.prototype.I;qA.prototype.unset=qA.prototype.R;qA.prototype.changed=qA.prototype.s;qA.prototype.dispatchEvent=qA.prototype.o;qA.prototype.getRevision=qA.prototype.L;qA.prototype.on=qA.prototype.H;qA.prototype.once=qA.prototype.M;qA.prototype.un=qA.prototype.K;qA.prototype.unByKey=qA.prototype.N;sA.prototype.getTileGrid=sA.prototype.Ga;sA.prototype.getAttributions=sA.prototype.sa;
sA.prototype.getLogo=sA.prototype.qa;sA.prototype.getProjection=sA.prototype.ta;sA.prototype.getState=sA.prototype.ua;sA.prototype.setAttributions=sA.prototype.na;sA.prototype.get=sA.prototype.get;sA.prototype.getKeys=sA.prototype.O;sA.prototype.getProperties=sA.prototype.P;sA.prototype.set=sA.prototype.set;sA.prototype.setProperties=sA.prototype.I;sA.prototype.unset=sA.prototype.R;sA.prototype.changed=sA.prototype.s;sA.prototype.dispatchEvent=sA.prototype.o;sA.prototype.getRevision=sA.prototype.L;
sA.prototype.on=sA.prototype.H;sA.prototype.once=sA.prototype.M;sA.prototype.un=sA.prototype.K;sA.prototype.unByKey=sA.prototype.N;tA.prototype.setRenderReprojectionEdges=tA.prototype.wb;tA.prototype.setTileGridForProjection=tA.prototype.xb;tA.prototype.getTileLoadFunction=tA.prototype.Wa;tA.prototype.getTileUrlFunction=tA.prototype.Xa;tA.prototype.getUrls=tA.prototype.Ya;tA.prototype.setTileLoadFunction=tA.prototype.bb;tA.prototype.setTileUrlFunction=tA.prototype.Ja;tA.prototype.setUrl=tA.prototype.Ua;
tA.prototype.setUrls=tA.prototype.Va;tA.prototype.getTileGrid=tA.prototype.Ga;tA.prototype.getAttributions=tA.prototype.sa;tA.prototype.getLogo=tA.prototype.qa;tA.prototype.getProjection=tA.prototype.ta;tA.prototype.getState=tA.prototype.ua;tA.prototype.setAttributions=tA.prototype.na;tA.prototype.get=tA.prototype.get;tA.prototype.getKeys=tA.prototype.O;tA.prototype.getProperties=tA.prototype.P;tA.prototype.set=tA.prototype.set;tA.prototype.setProperties=tA.prototype.I;tA.prototype.unset=tA.prototype.R;
tA.prototype.changed=tA.prototype.s;tA.prototype.dispatchEvent=tA.prototype.o;tA.prototype.getRevision=tA.prototype.L;tA.prototype.on=tA.prototype.H;tA.prototype.once=tA.prototype.M;tA.prototype.un=tA.prototype.K;tA.prototype.unByKey=tA.prototype.N;uA.prototype.getTileGrid=uA.prototype.Ga;uA.prototype.getAttributions=uA.prototype.sa;uA.prototype.getLogo=uA.prototype.qa;uA.prototype.getProjection=uA.prototype.ta;uA.prototype.getState=uA.prototype.ua;uA.prototype.setAttributions=uA.prototype.na;
uA.prototype.get=uA.prototype.get;uA.prototype.getKeys=uA.prototype.O;uA.prototype.getProperties=uA.prototype.P;uA.prototype.set=uA.prototype.set;uA.prototype.setProperties=uA.prototype.I;uA.prototype.unset=uA.prototype.R;uA.prototype.changed=uA.prototype.s;uA.prototype.dispatchEvent=uA.prototype.o;uA.prototype.getRevision=uA.prototype.L;uA.prototype.on=uA.prototype.H;uA.prototype.once=uA.prototype.M;uA.prototype.un=uA.prototype.K;uA.prototype.unByKey=uA.prototype.N;
zA.prototype.setRenderReprojectionEdges=zA.prototype.wb;zA.prototype.setTileGridForProjection=zA.prototype.xb;zA.prototype.getTileLoadFunction=zA.prototype.Wa;zA.prototype.getTileUrlFunction=zA.prototype.Xa;zA.prototype.getUrls=zA.prototype.Ya;zA.prototype.setTileLoadFunction=zA.prototype.bb;zA.prototype.setTileUrlFunction=zA.prototype.Ja;zA.prototype.setUrl=zA.prototype.Ua;zA.prototype.setUrls=zA.prototype.Va;zA.prototype.getTileGrid=zA.prototype.Ga;zA.prototype.getAttributions=zA.prototype.sa;
zA.prototype.getLogo=zA.prototype.qa;zA.prototype.getProjection=zA.prototype.ta;zA.prototype.getState=zA.prototype.ua;zA.prototype.setAttributions=zA.prototype.na;zA.prototype.get=zA.prototype.get;zA.prototype.getKeys=zA.prototype.O;zA.prototype.getProperties=zA.prototype.P;zA.prototype.set=zA.prototype.set;zA.prototype.setProperties=zA.prototype.I;zA.prototype.unset=zA.prototype.R;zA.prototype.changed=zA.prototype.s;zA.prototype.dispatchEvent=zA.prototype.o;zA.prototype.getRevision=zA.prototype.L;
zA.prototype.on=zA.prototype.H;zA.prototype.once=zA.prototype.M;zA.prototype.un=zA.prototype.K;zA.prototype.unByKey=zA.prototype.N;$p.prototype.getTileLoadFunction=$p.prototype.Wa;$p.prototype.getTileUrlFunction=$p.prototype.Xa;$p.prototype.getUrls=$p.prototype.Ya;$p.prototype.setTileLoadFunction=$p.prototype.bb;$p.prototype.setTileUrlFunction=$p.prototype.Ja;$p.prototype.setUrl=$p.prototype.Ua;$p.prototype.setUrls=$p.prototype.Va;$p.prototype.getTileGrid=$p.prototype.Ga;
$p.prototype.getAttributions=$p.prototype.sa;$p.prototype.getLogo=$p.prototype.qa;$p.prototype.getProjection=$p.prototype.ta;$p.prototype.getState=$p.prototype.ua;$p.prototype.setAttributions=$p.prototype.na;$p.prototype.get=$p.prototype.get;$p.prototype.getKeys=$p.prototype.O;$p.prototype.getProperties=$p.prototype.P;$p.prototype.set=$p.prototype.set;$p.prototype.setProperties=$p.prototype.I;$p.prototype.unset=$p.prototype.R;$p.prototype.changed=$p.prototype.s;$p.prototype.dispatchEvent=$p.prototype.o;
$p.prototype.getRevision=$p.prototype.L;$p.prototype.on=$p.prototype.H;$p.prototype.once=$p.prototype.M;$p.prototype.un=$p.prototype.K;$p.prototype.unByKey=$p.prototype.N;Z.prototype.setRenderReprojectionEdges=Z.prototype.wb;Z.prototype.setTileGridForProjection=Z.prototype.xb;Z.prototype.getTileLoadFunction=Z.prototype.Wa;Z.prototype.getTileUrlFunction=Z.prototype.Xa;Z.prototype.getUrls=Z.prototype.Ya;Z.prototype.setTileLoadFunction=Z.prototype.bb;Z.prototype.setTileUrlFunction=Z.prototype.Ja;
Z.prototype.setUrl=Z.prototype.Ua;Z.prototype.setUrls=Z.prototype.Va;Z.prototype.getTileGrid=Z.prototype.Ga;Z.prototype.getAttributions=Z.prototype.sa;Z.prototype.getLogo=Z.prototype.qa;Z.prototype.getProjection=Z.prototype.ta;Z.prototype.getState=Z.prototype.ua;Z.prototype.setAttributions=Z.prototype.na;Z.prototype.get=Z.prototype.get;Z.prototype.getKeys=Z.prototype.O;Z.prototype.getProperties=Z.prototype.P;Z.prototype.set=Z.prototype.set;Z.prototype.setProperties=Z.prototype.I;
Z.prototype.unset=Z.prototype.R;Z.prototype.changed=Z.prototype.s;Z.prototype.dispatchEvent=Z.prototype.o;Z.prototype.getRevision=Z.prototype.L;Z.prototype.on=Z.prototype.H;Z.prototype.once=Z.prototype.M;Z.prototype.un=Z.prototype.K;Z.prototype.unByKey=Z.prototype.N;GA.prototype.setRenderReprojectionEdges=GA.prototype.wb;GA.prototype.setTileGridForProjection=GA.prototype.xb;GA.prototype.getTileLoadFunction=GA.prototype.Wa;GA.prototype.getTileUrlFunction=GA.prototype.Xa;GA.prototype.getUrls=GA.prototype.Ya;
GA.prototype.setTileLoadFunction=GA.prototype.bb;GA.prototype.setTileUrlFunction=GA.prototype.Ja;GA.prototype.setUrl=GA.prototype.Ua;GA.prototype.setUrls=GA.prototype.Va;GA.prototype.getTileGrid=GA.prototype.Ga;GA.prototype.getAttributions=GA.prototype.sa;GA.prototype.getLogo=GA.prototype.qa;GA.prototype.getProjection=GA.prototype.ta;GA.prototype.getState=GA.prototype.ua;GA.prototype.setAttributions=GA.prototype.na;GA.prototype.get=GA.prototype.get;GA.prototype.getKeys=GA.prototype.O;
GA.prototype.getProperties=GA.prototype.P;GA.prototype.set=GA.prototype.set;GA.prototype.setProperties=GA.prototype.I;GA.prototype.unset=GA.prototype.R;GA.prototype.changed=GA.prototype.s;GA.prototype.dispatchEvent=GA.prototype.o;GA.prototype.getRevision=GA.prototype.L;GA.prototype.on=GA.prototype.H;GA.prototype.once=GA.prototype.M;GA.prototype.un=GA.prototype.K;GA.prototype.unByKey=GA.prototype.N;xz.prototype.getTileCoord=xz.prototype.f;lk.prototype.changed=lk.prototype.s;
lk.prototype.dispatchEvent=lk.prototype.o;lk.prototype.getRevision=lk.prototype.L;lk.prototype.on=lk.prototype.H;lk.prototype.once=lk.prototype.M;lk.prototype.un=lk.prototype.K;lk.prototype.unByKey=lk.prototype.N;Wq.prototype.changed=Wq.prototype.s;Wq.prototype.dispatchEvent=Wq.prototype.o;Wq.prototype.getRevision=Wq.prototype.L;Wq.prototype.on=Wq.prototype.H;Wq.prototype.once=Wq.prototype.M;Wq.prototype.un=Wq.prototype.K;Wq.prototype.unByKey=Wq.prototype.N;Zq.prototype.changed=Zq.prototype.s;
Zq.prototype.dispatchEvent=Zq.prototype.o;Zq.prototype.getRevision=Zq.prototype.L;Zq.prototype.on=Zq.prototype.H;Zq.prototype.once=Zq.prototype.M;Zq.prototype.un=Zq.prototype.K;Zq.prototype.unByKey=Zq.prototype.N;er.prototype.changed=er.prototype.s;er.prototype.dispatchEvent=er.prototype.o;er.prototype.getRevision=er.prototype.L;er.prototype.on=er.prototype.H;er.prototype.once=er.prototype.M;er.prototype.un=er.prototype.K;er.prototype.unByKey=er.prototype.N;gr.prototype.changed=gr.prototype.s;
gr.prototype.dispatchEvent=gr.prototype.o;gr.prototype.getRevision=gr.prototype.L;gr.prototype.on=gr.prototype.H;gr.prototype.once=gr.prototype.M;gr.prototype.un=gr.prototype.K;gr.prototype.unByKey=gr.prototype.N;fq.prototype.changed=fq.prototype.s;fq.prototype.dispatchEvent=fq.prototype.o;fq.prototype.getRevision=fq.prototype.L;fq.prototype.on=fq.prototype.H;fq.prototype.once=fq.prototype.M;fq.prototype.un=fq.prototype.K;fq.prototype.unByKey=fq.prototype.N;gq.prototype.changed=gq.prototype.s;
gq.prototype.dispatchEvent=gq.prototype.o;gq.prototype.getRevision=gq.prototype.L;gq.prototype.on=gq.prototype.H;gq.prototype.once=gq.prototype.M;gq.prototype.un=gq.prototype.K;gq.prototype.unByKey=gq.prototype.N;hq.prototype.changed=hq.prototype.s;hq.prototype.dispatchEvent=hq.prototype.o;hq.prototype.getRevision=hq.prototype.L;hq.prototype.on=hq.prototype.H;hq.prototype.once=hq.prototype.M;hq.prototype.un=hq.prototype.K;hq.prototype.unByKey=hq.prototype.N;jq.prototype.changed=jq.prototype.s;
jq.prototype.dispatchEvent=jq.prototype.o;jq.prototype.getRevision=jq.prototype.L;jq.prototype.on=jq.prototype.H;jq.prototype.once=jq.prototype.M;jq.prototype.un=jq.prototype.K;jq.prototype.unByKey=jq.prototype.N;xm.prototype.changed=xm.prototype.s;xm.prototype.dispatchEvent=xm.prototype.o;xm.prototype.getRevision=xm.prototype.L;xm.prototype.on=xm.prototype.H;xm.prototype.once=xm.prototype.M;xm.prototype.un=xm.prototype.K;xm.prototype.unByKey=xm.prototype.N;Qp.prototype.changed=Qp.prototype.s;
Qp.prototype.dispatchEvent=Qp.prototype.o;Qp.prototype.getRevision=Qp.prototype.L;Qp.prototype.on=Qp.prototype.H;Qp.prototype.once=Qp.prototype.M;Qp.prototype.un=Qp.prototype.K;Qp.prototype.unByKey=Qp.prototype.N;Rp.prototype.changed=Rp.prototype.s;Rp.prototype.dispatchEvent=Rp.prototype.o;Rp.prototype.getRevision=Rp.prototype.L;Rp.prototype.on=Rp.prototype.H;Rp.prototype.once=Rp.prototype.M;Rp.prototype.un=Rp.prototype.K;Rp.prototype.unByKey=Rp.prototype.N;Sp.prototype.changed=Sp.prototype.s;
Sp.prototype.dispatchEvent=Sp.prototype.o;Sp.prototype.getRevision=Sp.prototype.L;Sp.prototype.on=Sp.prototype.H;Sp.prototype.once=Sp.prototype.M;Sp.prototype.un=Sp.prototype.K;Sp.prototype.unByKey=Sp.prototype.N;bq.prototype.changed=bq.prototype.s;bq.prototype.dispatchEvent=bq.prototype.o;bq.prototype.getRevision=bq.prototype.L;bq.prototype.on=bq.prototype.H;bq.prototype.once=bq.prototype.M;bq.prototype.un=bq.prototype.K;bq.prototype.unByKey=bq.prototype.N;ak.prototype.get=ak.prototype.get;
ak.prototype.getKeys=ak.prototype.O;ak.prototype.getProperties=ak.prototype.P;ak.prototype.set=ak.prototype.set;ak.prototype.setProperties=ak.prototype.I;ak.prototype.unset=ak.prototype.R;ak.prototype.changed=ak.prototype.s;ak.prototype.dispatchEvent=ak.prototype.o;ak.prototype.getRevision=ak.prototype.L;ak.prototype.on=ak.prototype.H;ak.prototype.once=ak.prototype.M;ak.prototype.un=ak.prototype.K;ak.prototype.unByKey=ak.prototype.N;ek.prototype.getExtent=ek.prototype.J;
ek.prototype.getMaxResolution=ek.prototype.Mb;ek.prototype.getMinResolution=ek.prototype.Nb;ek.prototype.getOpacity=ek.prototype.Rb;ek.prototype.getVisible=ek.prototype.qb;ek.prototype.getZIndex=ek.prototype.Sb;ek.prototype.setExtent=ek.prototype.bc;ek.prototype.setMaxResolution=ek.prototype.jc;ek.prototype.setMinResolution=ek.prototype.kc;ek.prototype.setOpacity=ek.prototype.cc;ek.prototype.setVisible=ek.prototype.dc;ek.prototype.setZIndex=ek.prototype.ec;ek.prototype.get=ek.prototype.get;
ek.prototype.getKeys=ek.prototype.O;ek.prototype.getProperties=ek.prototype.P;ek.prototype.set=ek.prototype.set;ek.prototype.setProperties=ek.prototype.I;ek.prototype.unset=ek.prototype.R;ek.prototype.changed=ek.prototype.s;ek.prototype.dispatchEvent=ek.prototype.o;ek.prototype.getRevision=ek.prototype.L;ek.prototype.on=ek.prototype.H;ek.prototype.once=ek.prototype.M;ek.prototype.un=ek.prototype.K;ek.prototype.unByKey=ek.prototype.N;H.prototype.setMap=H.prototype.setMap;H.prototype.setSource=H.prototype.wc;
H.prototype.getExtent=H.prototype.J;H.prototype.getMaxResolution=H.prototype.Mb;H.prototype.getMinResolution=H.prototype.Nb;H.prototype.getOpacity=H.prototype.Rb;H.prototype.getVisible=H.prototype.qb;H.prototype.getZIndex=H.prototype.Sb;H.prototype.setExtent=H.prototype.bc;H.prototype.setMaxResolution=H.prototype.jc;H.prototype.setMinResolution=H.prototype.kc;H.prototype.setOpacity=H.prototype.cc;H.prototype.setVisible=H.prototype.dc;H.prototype.setZIndex=H.prototype.ec;H.prototype.get=H.prototype.get;
H.prototype.getKeys=H.prototype.O;H.prototype.getProperties=H.prototype.P;H.prototype.set=H.prototype.set;H.prototype.setProperties=H.prototype.I;H.prototype.unset=H.prototype.R;H.prototype.changed=H.prototype.s;H.prototype.dispatchEvent=H.prototype.o;H.prototype.getRevision=H.prototype.L;H.prototype.on=H.prototype.H;H.prototype.once=H.prototype.M;H.prototype.un=H.prototype.K;H.prototype.unByKey=H.prototype.N;X.prototype.getSource=X.prototype.fa;X.prototype.getStyle=X.prototype.D;
X.prototype.getStyleFunction=X.prototype.G;X.prototype.setStyle=X.prototype.f;X.prototype.setMap=X.prototype.setMap;X.prototype.setSource=X.prototype.wc;X.prototype.getExtent=X.prototype.J;X.prototype.getMaxResolution=X.prototype.Mb;X.prototype.getMinResolution=X.prototype.Nb;X.prototype.getOpacity=X.prototype.Rb;X.prototype.getVisible=X.prototype.qb;X.prototype.getZIndex=X.prototype.Sb;X.prototype.setExtent=X.prototype.bc;X.prototype.setMaxResolution=X.prototype.jc;X.prototype.setMinResolution=X.prototype.kc;
X.prototype.setOpacity=X.prototype.cc;X.prototype.setVisible=X.prototype.dc;X.prototype.setZIndex=X.prototype.ec;X.prototype.get=X.prototype.get;X.prototype.getKeys=X.prototype.O;X.prototype.getProperties=X.prototype.P;X.prototype.set=X.prototype.set;X.prototype.setProperties=X.prototype.I;X.prototype.unset=X.prototype.R;X.prototype.changed=X.prototype.s;X.prototype.dispatchEvent=X.prototype.o;X.prototype.getRevision=X.prototype.L;X.prototype.on=X.prototype.H;X.prototype.once=X.prototype.M;
X.prototype.un=X.prototype.K;X.prototype.unByKey=X.prototype.N;Sl.prototype.setMap=Sl.prototype.setMap;Sl.prototype.setSource=Sl.prototype.wc;Sl.prototype.getExtent=Sl.prototype.J;Sl.prototype.getMaxResolution=Sl.prototype.Mb;Sl.prototype.getMinResolution=Sl.prototype.Nb;Sl.prototype.getOpacity=Sl.prototype.Rb;Sl.prototype.getVisible=Sl.prototype.qb;Sl.prototype.getZIndex=Sl.prototype.Sb;Sl.prototype.setExtent=Sl.prototype.bc;Sl.prototype.setMaxResolution=Sl.prototype.jc;
Sl.prototype.setMinResolution=Sl.prototype.kc;Sl.prototype.setOpacity=Sl.prototype.cc;Sl.prototype.setVisible=Sl.prototype.dc;Sl.prototype.setZIndex=Sl.prototype.ec;Sl.prototype.get=Sl.prototype.get;Sl.prototype.getKeys=Sl.prototype.O;Sl.prototype.getProperties=Sl.prototype.P;Sl.prototype.set=Sl.prototype.set;Sl.prototype.setProperties=Sl.prototype.I;Sl.prototype.unset=Sl.prototype.R;Sl.prototype.changed=Sl.prototype.s;Sl.prototype.dispatchEvent=Sl.prototype.o;Sl.prototype.getRevision=Sl.prototype.L;
Sl.prototype.on=Sl.prototype.H;Sl.prototype.once=Sl.prototype.M;Sl.prototype.un=Sl.prototype.K;Sl.prototype.unByKey=Sl.prototype.N;Kl.prototype.getExtent=Kl.prototype.J;Kl.prototype.getMaxResolution=Kl.prototype.Mb;Kl.prototype.getMinResolution=Kl.prototype.Nb;Kl.prototype.getOpacity=Kl.prototype.Rb;Kl.prototype.getVisible=Kl.prototype.qb;Kl.prototype.getZIndex=Kl.prototype.Sb;Kl.prototype.setExtent=Kl.prototype.bc;Kl.prototype.setMaxResolution=Kl.prototype.jc;Kl.prototype.setMinResolution=Kl.prototype.kc;
Kl.prototype.setOpacity=Kl.prototype.cc;Kl.prototype.setVisible=Kl.prototype.dc;Kl.prototype.setZIndex=Kl.prototype.ec;Kl.prototype.get=Kl.prototype.get;Kl.prototype.getKeys=Kl.prototype.O;Kl.prototype.getProperties=Kl.prototype.P;Kl.prototype.set=Kl.prototype.set;Kl.prototype.setProperties=Kl.prototype.I;Kl.prototype.unset=Kl.prototype.R;Kl.prototype.changed=Kl.prototype.s;Kl.prototype.dispatchEvent=Kl.prototype.o;Kl.prototype.getRevision=Kl.prototype.L;Kl.prototype.on=Kl.prototype.H;
Kl.prototype.once=Kl.prototype.M;Kl.prototype.un=Kl.prototype.K;Kl.prototype.unByKey=Kl.prototype.N;F.prototype.setMap=F.prototype.setMap;F.prototype.setSource=F.prototype.wc;F.prototype.getExtent=F.prototype.J;F.prototype.getMaxResolution=F.prototype.Mb;F.prototype.getMinResolution=F.prototype.Nb;F.prototype.getOpacity=F.prototype.Rb;F.prototype.getVisible=F.prototype.qb;F.prototype.getZIndex=F.prototype.Sb;F.prototype.setExtent=F.prototype.bc;F.prototype.setMaxResolution=F.prototype.jc;
F.prototype.setMinResolution=F.prototype.kc;F.prototype.setOpacity=F.prototype.cc;F.prototype.setVisible=F.prototype.dc;F.prototype.setZIndex=F.prototype.ec;F.prototype.get=F.prototype.get;F.prototype.getKeys=F.prototype.O;F.prototype.getProperties=F.prototype.P;F.prototype.set=F.prototype.set;F.prototype.setProperties=F.prototype.I;F.prototype.unset=F.prototype.R;F.prototype.changed=F.prototype.s;F.prototype.dispatchEvent=F.prototype.o;F.prototype.getRevision=F.prototype.L;F.prototype.on=F.prototype.H;
F.prototype.once=F.prototype.M;F.prototype.un=F.prototype.K;F.prototype.unByKey=F.prototype.N;J.prototype.getStyle=J.prototype.D;J.prototype.getStyleFunction=J.prototype.G;J.prototype.setStyle=J.prototype.f;J.prototype.setMap=J.prototype.setMap;J.prototype.setSource=J.prototype.wc;J.prototype.getExtent=J.prototype.J;J.prototype.getMaxResolution=J.prototype.Mb;J.prototype.getMinResolution=J.prototype.Nb;J.prototype.getOpacity=J.prototype.Rb;J.prototype.getVisible=J.prototype.qb;
J.prototype.getZIndex=J.prototype.Sb;J.prototype.setExtent=J.prototype.bc;J.prototype.setMaxResolution=J.prototype.jc;J.prototype.setMinResolution=J.prototype.kc;J.prototype.setOpacity=J.prototype.cc;J.prototype.setVisible=J.prototype.dc;J.prototype.setZIndex=J.prototype.ec;J.prototype.get=J.prototype.get;J.prototype.getKeys=J.prototype.O;J.prototype.getProperties=J.prototype.P;J.prototype.set=J.prototype.set;J.prototype.setProperties=J.prototype.I;J.prototype.unset=J.prototype.R;
J.prototype.changed=J.prototype.s;J.prototype.dispatchEvent=J.prototype.o;J.prototype.getRevision=J.prototype.L;J.prototype.on=J.prototype.H;J.prototype.once=J.prototype.M;J.prototype.un=J.prototype.K;J.prototype.unByKey=J.prototype.N;Ok.prototype.get=Ok.prototype.get;Ok.prototype.getKeys=Ok.prototype.O;Ok.prototype.getProperties=Ok.prototype.P;Ok.prototype.set=Ok.prototype.set;Ok.prototype.setProperties=Ok.prototype.I;Ok.prototype.unset=Ok.prototype.R;Ok.prototype.changed=Ok.prototype.s;
Ok.prototype.dispatchEvent=Ok.prototype.o;Ok.prototype.getRevision=Ok.prototype.L;Ok.prototype.on=Ok.prototype.H;Ok.prototype.once=Ok.prototype.M;Ok.prototype.un=Ok.prototype.K;Ok.prototype.unByKey=Ok.prototype.N;Sk.prototype.getActive=Sk.prototype.b;Sk.prototype.setActive=Sk.prototype.g;Sk.prototype.get=Sk.prototype.get;Sk.prototype.getKeys=Sk.prototype.O;Sk.prototype.getProperties=Sk.prototype.P;Sk.prototype.set=Sk.prototype.set;Sk.prototype.setProperties=Sk.prototype.I;Sk.prototype.unset=Sk.prototype.R;
Sk.prototype.changed=Sk.prototype.s;Sk.prototype.dispatchEvent=Sk.prototype.o;Sk.prototype.getRevision=Sk.prototype.L;Sk.prototype.on=Sk.prototype.H;Sk.prototype.once=Sk.prototype.M;Sk.prototype.un=Sk.prototype.K;Sk.prototype.unByKey=Sk.prototype.N;vy.prototype.getActive=vy.prototype.b;vy.prototype.setActive=vy.prototype.g;vy.prototype.get=vy.prototype.get;vy.prototype.getKeys=vy.prototype.O;vy.prototype.getProperties=vy.prototype.P;vy.prototype.set=vy.prototype.set;vy.prototype.setProperties=vy.prototype.I;
vy.prototype.unset=vy.prototype.R;vy.prototype.changed=vy.prototype.s;vy.prototype.dispatchEvent=vy.prototype.o;vy.prototype.getRevision=vy.prototype.L;vy.prototype.on=vy.prototype.H;vy.prototype.once=vy.prototype.M;vy.prototype.un=vy.prototype.K;vy.prototype.unByKey=vy.prototype.N;al.prototype.getActive=al.prototype.b;al.prototype.setActive=al.prototype.g;al.prototype.get=al.prototype.get;al.prototype.getKeys=al.prototype.O;al.prototype.getProperties=al.prototype.P;al.prototype.set=al.prototype.set;
al.prototype.setProperties=al.prototype.I;al.prototype.unset=al.prototype.R;al.prototype.changed=al.prototype.s;al.prototype.dispatchEvent=al.prototype.o;al.prototype.getRevision=al.prototype.L;al.prototype.on=al.prototype.H;al.prototype.once=al.prototype.M;al.prototype.un=al.prototype.K;al.prototype.unByKey=al.prototype.N;ql.prototype.getActive=ql.prototype.b;ql.prototype.setActive=ql.prototype.g;ql.prototype.get=ql.prototype.get;ql.prototype.getKeys=ql.prototype.O;ql.prototype.getProperties=ql.prototype.P;
ql.prototype.set=ql.prototype.set;ql.prototype.setProperties=ql.prototype.I;ql.prototype.unset=ql.prototype.R;ql.prototype.changed=ql.prototype.s;ql.prototype.dispatchEvent=ql.prototype.o;ql.prototype.getRevision=ql.prototype.L;ql.prototype.on=ql.prototype.H;ql.prototype.once=ql.prototype.M;ql.prototype.un=ql.prototype.K;ql.prototype.unByKey=ql.prototype.N;dl.prototype.getActive=dl.prototype.b;dl.prototype.setActive=dl.prototype.g;dl.prototype.get=dl.prototype.get;dl.prototype.getKeys=dl.prototype.O;
dl.prototype.getProperties=dl.prototype.P;dl.prototype.set=dl.prototype.set;dl.prototype.setProperties=dl.prototype.I;dl.prototype.unset=dl.prototype.R;dl.prototype.changed=dl.prototype.s;dl.prototype.dispatchEvent=dl.prototype.o;dl.prototype.getRevision=dl.prototype.L;dl.prototype.on=dl.prototype.H;dl.prototype.once=dl.prototype.M;dl.prototype.un=dl.prototype.K;dl.prototype.unByKey=dl.prototype.N;zy.prototype.getActive=zy.prototype.b;zy.prototype.setActive=zy.prototype.g;zy.prototype.get=zy.prototype.get;
zy.prototype.getKeys=zy.prototype.O;zy.prototype.getProperties=zy.prototype.P;zy.prototype.set=zy.prototype.set;zy.prototype.setProperties=zy.prototype.I;zy.prototype.unset=zy.prototype.R;zy.prototype.changed=zy.prototype.s;zy.prototype.dispatchEvent=zy.prototype.o;zy.prototype.getRevision=zy.prototype.L;zy.prototype.on=zy.prototype.H;zy.prototype.once=zy.prototype.M;zy.prototype.un=zy.prototype.K;zy.prototype.unByKey=zy.prototype.N;hl.prototype.getActive=hl.prototype.b;hl.prototype.setActive=hl.prototype.g;
hl.prototype.get=hl.prototype.get;hl.prototype.getKeys=hl.prototype.O;hl.prototype.getProperties=hl.prototype.P;hl.prototype.set=hl.prototype.set;hl.prototype.setProperties=hl.prototype.I;hl.prototype.unset=hl.prototype.R;hl.prototype.changed=hl.prototype.s;hl.prototype.dispatchEvent=hl.prototype.o;hl.prototype.getRevision=hl.prototype.L;hl.prototype.on=hl.prototype.H;hl.prototype.once=hl.prototype.M;hl.prototype.un=hl.prototype.K;hl.prototype.unByKey=hl.prototype.N;ul.prototype.getGeometry=ul.prototype.W;
ul.prototype.getActive=ul.prototype.b;ul.prototype.setActive=ul.prototype.g;ul.prototype.get=ul.prototype.get;ul.prototype.getKeys=ul.prototype.O;ul.prototype.getProperties=ul.prototype.P;ul.prototype.set=ul.prototype.set;ul.prototype.setProperties=ul.prototype.I;ul.prototype.unset=ul.prototype.R;ul.prototype.changed=ul.prototype.s;ul.prototype.dispatchEvent=ul.prototype.o;ul.prototype.getRevision=ul.prototype.L;ul.prototype.on=ul.prototype.H;ul.prototype.once=ul.prototype.M;ul.prototype.un=ul.prototype.K;
ul.prototype.unByKey=ul.prototype.N;Ey.prototype.getActive=Ey.prototype.b;Ey.prototype.setActive=Ey.prototype.g;Ey.prototype.get=Ey.prototype.get;Ey.prototype.getKeys=Ey.prototype.O;Ey.prototype.getProperties=Ey.prototype.P;Ey.prototype.set=Ey.prototype.set;Ey.prototype.setProperties=Ey.prototype.I;Ey.prototype.unset=Ey.prototype.R;Ey.prototype.changed=Ey.prototype.s;Ey.prototype.dispatchEvent=Ey.prototype.o;Ey.prototype.getRevision=Ey.prototype.L;Ey.prototype.on=Ey.prototype.H;
Ey.prototype.once=Ey.prototype.M;Ey.prototype.un=Ey.prototype.K;Ey.prototype.unByKey=Ey.prototype.N;vl.prototype.getActive=vl.prototype.b;vl.prototype.setActive=vl.prototype.g;vl.prototype.get=vl.prototype.get;vl.prototype.getKeys=vl.prototype.O;vl.prototype.getProperties=vl.prototype.P;vl.prototype.set=vl.prototype.set;vl.prototype.setProperties=vl.prototype.I;vl.prototype.unset=vl.prototype.R;vl.prototype.changed=vl.prototype.s;vl.prototype.dispatchEvent=vl.prototype.o;
vl.prototype.getRevision=vl.prototype.L;vl.prototype.on=vl.prototype.H;vl.prototype.once=vl.prototype.M;vl.prototype.un=vl.prototype.K;vl.prototype.unByKey=vl.prototype.N;xl.prototype.getActive=xl.prototype.b;xl.prototype.setActive=xl.prototype.g;xl.prototype.get=xl.prototype.get;xl.prototype.getKeys=xl.prototype.O;xl.prototype.getProperties=xl.prototype.P;xl.prototype.set=xl.prototype.set;xl.prototype.setProperties=xl.prototype.I;xl.prototype.unset=xl.prototype.R;xl.prototype.changed=xl.prototype.s;
xl.prototype.dispatchEvent=xl.prototype.o;xl.prototype.getRevision=xl.prototype.L;xl.prototype.on=xl.prototype.H;xl.prototype.once=xl.prototype.M;xl.prototype.un=xl.prototype.K;xl.prototype.unByKey=xl.prototype.N;Vy.prototype.getActive=Vy.prototype.b;Vy.prototype.setActive=Vy.prototype.g;Vy.prototype.get=Vy.prototype.get;Vy.prototype.getKeys=Vy.prototype.O;Vy.prototype.getProperties=Vy.prototype.P;Vy.prototype.set=Vy.prototype.set;Vy.prototype.setProperties=Vy.prototype.I;Vy.prototype.unset=Vy.prototype.R;
Vy.prototype.changed=Vy.prototype.s;Vy.prototype.dispatchEvent=Vy.prototype.o;Vy.prototype.getRevision=Vy.prototype.L;Vy.prototype.on=Vy.prototype.H;Vy.prototype.once=Vy.prototype.M;Vy.prototype.un=Vy.prototype.K;Vy.prototype.unByKey=Vy.prototype.N;zl.prototype.getActive=zl.prototype.b;zl.prototype.setActive=zl.prototype.g;zl.prototype.get=zl.prototype.get;zl.prototype.getKeys=zl.prototype.O;zl.prototype.getProperties=zl.prototype.P;zl.prototype.set=zl.prototype.set;zl.prototype.setProperties=zl.prototype.I;
zl.prototype.unset=zl.prototype.R;zl.prototype.changed=zl.prototype.s;zl.prototype.dispatchEvent=zl.prototype.o;zl.prototype.getRevision=zl.prototype.L;zl.prototype.on=zl.prototype.H;zl.prototype.once=zl.prototype.M;zl.prototype.un=zl.prototype.K;zl.prototype.unByKey=zl.prototype.N;Bl.prototype.getActive=Bl.prototype.b;Bl.prototype.setActive=Bl.prototype.g;Bl.prototype.get=Bl.prototype.get;Bl.prototype.getKeys=Bl.prototype.O;Bl.prototype.getProperties=Bl.prototype.P;Bl.prototype.set=Bl.prototype.set;
Bl.prototype.setProperties=Bl.prototype.I;Bl.prototype.unset=Bl.prototype.R;Bl.prototype.changed=Bl.prototype.s;Bl.prototype.dispatchEvent=Bl.prototype.o;Bl.prototype.getRevision=Bl.prototype.L;Bl.prototype.on=Bl.prototype.H;Bl.prototype.once=Bl.prototype.M;Bl.prototype.un=Bl.prototype.K;Bl.prototype.unByKey=Bl.prototype.N;Fl.prototype.getActive=Fl.prototype.b;Fl.prototype.setActive=Fl.prototype.g;Fl.prototype.get=Fl.prototype.get;Fl.prototype.getKeys=Fl.prototype.O;Fl.prototype.getProperties=Fl.prototype.P;
Fl.prototype.set=Fl.prototype.set;Fl.prototype.setProperties=Fl.prototype.I;Fl.prototype.unset=Fl.prototype.R;Fl.prototype.changed=Fl.prototype.s;Fl.prototype.dispatchEvent=Fl.prototype.o;Fl.prototype.getRevision=Fl.prototype.L;Fl.prototype.on=Fl.prototype.H;Fl.prototype.once=Fl.prototype.M;Fl.prototype.un=Fl.prototype.K;Fl.prototype.unByKey=Fl.prototype.N;iz.prototype.getActive=iz.prototype.b;iz.prototype.setActive=iz.prototype.g;iz.prototype.get=iz.prototype.get;iz.prototype.getKeys=iz.prototype.O;
iz.prototype.getProperties=iz.prototype.P;iz.prototype.set=iz.prototype.set;iz.prototype.setProperties=iz.prototype.I;iz.prototype.unset=iz.prototype.R;iz.prototype.changed=iz.prototype.s;iz.prototype.dispatchEvent=iz.prototype.o;iz.prototype.getRevision=iz.prototype.L;iz.prototype.on=iz.prototype.H;iz.prototype.once=iz.prototype.M;iz.prototype.un=iz.prototype.K;iz.prototype.unByKey=iz.prototype.N;lz.prototype.getActive=lz.prototype.b;lz.prototype.setActive=lz.prototype.g;lz.prototype.get=lz.prototype.get;
lz.prototype.getKeys=lz.prototype.O;lz.prototype.getProperties=lz.prototype.P;lz.prototype.set=lz.prototype.set;lz.prototype.setProperties=lz.prototype.I;lz.prototype.unset=lz.prototype.R;lz.prototype.changed=lz.prototype.s;lz.prototype.dispatchEvent=lz.prototype.o;lz.prototype.getRevision=lz.prototype.L;lz.prototype.on=lz.prototype.H;lz.prototype.once=lz.prototype.M;lz.prototype.un=lz.prototype.K;lz.prototype.unByKey=lz.prototype.N;qz.prototype.getActive=qz.prototype.b;qz.prototype.setActive=qz.prototype.g;
qz.prototype.get=qz.prototype.get;qz.prototype.getKeys=qz.prototype.O;qz.prototype.getProperties=qz.prototype.P;qz.prototype.set=qz.prototype.set;qz.prototype.setProperties=qz.prototype.I;qz.prototype.unset=qz.prototype.R;qz.prototype.changed=qz.prototype.s;qz.prototype.dispatchEvent=qz.prototype.o;qz.prototype.getRevision=qz.prototype.L;qz.prototype.on=qz.prototype.H;qz.prototype.once=qz.prototype.M;qz.prototype.un=qz.prototype.K;qz.prototype.unByKey=qz.prototype.N;bf.prototype.get=bf.prototype.get;
bf.prototype.getKeys=bf.prototype.O;bf.prototype.getProperties=bf.prototype.P;bf.prototype.set=bf.prototype.set;bf.prototype.setProperties=bf.prototype.I;bf.prototype.unset=bf.prototype.R;bf.prototype.changed=bf.prototype.s;bf.prototype.dispatchEvent=bf.prototype.o;bf.prototype.getRevision=bf.prototype.L;bf.prototype.on=bf.prototype.H;bf.prototype.once=bf.prototype.M;bf.prototype.un=bf.prototype.K;bf.prototype.unByKey=bf.prototype.N;df.prototype.getClosestPoint=df.prototype.pb;
df.prototype.getExtent=df.prototype.J;df.prototype.simplify=df.prototype.yb;df.prototype.transform=df.prototype.kb;df.prototype.get=df.prototype.get;df.prototype.getKeys=df.prototype.O;df.prototype.getProperties=df.prototype.P;df.prototype.set=df.prototype.set;df.prototype.setProperties=df.prototype.I;df.prototype.unset=df.prototype.R;df.prototype.changed=df.prototype.s;df.prototype.dispatchEvent=df.prototype.o;df.prototype.getRevision=df.prototype.L;df.prototype.on=df.prototype.H;
df.prototype.once=df.prototype.M;df.prototype.un=df.prototype.K;df.prototype.unByKey=df.prototype.N;Qx.prototype.getFirstCoordinate=Qx.prototype.Jb;Qx.prototype.getLastCoordinate=Qx.prototype.Kb;Qx.prototype.getLayout=Qx.prototype.Lb;Qx.prototype.getClosestPoint=Qx.prototype.pb;Qx.prototype.getExtent=Qx.prototype.J;Qx.prototype.simplify=Qx.prototype.yb;Qx.prototype.get=Qx.prototype.get;Qx.prototype.getKeys=Qx.prototype.O;Qx.prototype.getProperties=Qx.prototype.P;Qx.prototype.set=Qx.prototype.set;
Qx.prototype.setProperties=Qx.prototype.I;Qx.prototype.unset=Qx.prototype.R;Qx.prototype.changed=Qx.prototype.s;Qx.prototype.dispatchEvent=Qx.prototype.o;Qx.prototype.getRevision=Qx.prototype.L;Qx.prototype.on=Qx.prototype.H;Qx.prototype.once=Qx.prototype.M;Qx.prototype.un=Qx.prototype.K;Qx.prototype.unByKey=Qx.prototype.N;js.prototype.getClosestPoint=js.prototype.pb;js.prototype.getExtent=js.prototype.J;js.prototype.simplify=js.prototype.yb;js.prototype.transform=js.prototype.kb;
js.prototype.get=js.prototype.get;js.prototype.getKeys=js.prototype.O;js.prototype.getProperties=js.prototype.P;js.prototype.set=js.prototype.set;js.prototype.setProperties=js.prototype.I;js.prototype.unset=js.prototype.R;js.prototype.changed=js.prototype.s;js.prototype.dispatchEvent=js.prototype.o;js.prototype.getRevision=js.prototype.L;js.prototype.on=js.prototype.H;js.prototype.once=js.prototype.M;js.prototype.un=js.prototype.K;js.prototype.unByKey=js.prototype.N;
wf.prototype.getFirstCoordinate=wf.prototype.Jb;wf.prototype.getLastCoordinate=wf.prototype.Kb;wf.prototype.getLayout=wf.prototype.Lb;wf.prototype.getClosestPoint=wf.prototype.pb;wf.prototype.getExtent=wf.prototype.J;wf.prototype.simplify=wf.prototype.yb;wf.prototype.transform=wf.prototype.kb;wf.prototype.get=wf.prototype.get;wf.prototype.getKeys=wf.prototype.O;wf.prototype.getProperties=wf.prototype.P;wf.prototype.set=wf.prototype.set;wf.prototype.setProperties=wf.prototype.I;
wf.prototype.unset=wf.prototype.R;wf.prototype.changed=wf.prototype.s;wf.prototype.dispatchEvent=wf.prototype.o;wf.prototype.getRevision=wf.prototype.L;wf.prototype.on=wf.prototype.H;wf.prototype.once=wf.prototype.M;wf.prototype.un=wf.prototype.K;wf.prototype.unByKey=wf.prototype.N;T.prototype.getFirstCoordinate=T.prototype.Jb;T.prototype.getLastCoordinate=T.prototype.Kb;T.prototype.getLayout=T.prototype.Lb;T.prototype.getClosestPoint=T.prototype.pb;T.prototype.getExtent=T.prototype.J;
T.prototype.simplify=T.prototype.yb;T.prototype.transform=T.prototype.kb;T.prototype.get=T.prototype.get;T.prototype.getKeys=T.prototype.O;T.prototype.getProperties=T.prototype.P;T.prototype.set=T.prototype.set;T.prototype.setProperties=T.prototype.I;T.prototype.unset=T.prototype.R;T.prototype.changed=T.prototype.s;T.prototype.dispatchEvent=T.prototype.o;T.prototype.getRevision=T.prototype.L;T.prototype.on=T.prototype.H;T.prototype.once=T.prototype.M;T.prototype.un=T.prototype.K;
T.prototype.unByKey=T.prototype.N;U.prototype.getFirstCoordinate=U.prototype.Jb;U.prototype.getLastCoordinate=U.prototype.Kb;U.prototype.getLayout=U.prototype.Lb;U.prototype.getClosestPoint=U.prototype.pb;U.prototype.getExtent=U.prototype.J;U.prototype.simplify=U.prototype.yb;U.prototype.transform=U.prototype.kb;U.prototype.get=U.prototype.get;U.prototype.getKeys=U.prototype.O;U.prototype.getProperties=U.prototype.P;U.prototype.set=U.prototype.set;U.prototype.setProperties=U.prototype.I;
U.prototype.unset=U.prototype.R;U.prototype.changed=U.prototype.s;U.prototype.dispatchEvent=U.prototype.o;U.prototype.getRevision=U.prototype.L;U.prototype.on=U.prototype.H;U.prototype.once=U.prototype.M;U.prototype.un=U.prototype.K;U.prototype.unByKey=U.prototype.N;$r.prototype.getFirstCoordinate=$r.prototype.Jb;$r.prototype.getLastCoordinate=$r.prototype.Kb;$r.prototype.getLayout=$r.prototype.Lb;$r.prototype.getClosestPoint=$r.prototype.pb;$r.prototype.getExtent=$r.prototype.J;
$r.prototype.simplify=$r.prototype.yb;$r.prototype.transform=$r.prototype.kb;$r.prototype.get=$r.prototype.get;$r.prototype.getKeys=$r.prototype.O;$r.prototype.getProperties=$r.prototype.P;$r.prototype.set=$r.prototype.set;$r.prototype.setProperties=$r.prototype.I;$r.prototype.unset=$r.prototype.R;$r.prototype.changed=$r.prototype.s;$r.prototype.dispatchEvent=$r.prototype.o;$r.prototype.getRevision=$r.prototype.L;$r.prototype.on=$r.prototype.H;$r.prototype.once=$r.prototype.M;$r.prototype.un=$r.prototype.K;
$r.prototype.unByKey=$r.prototype.N;V.prototype.getFirstCoordinate=V.prototype.Jb;V.prototype.getLastCoordinate=V.prototype.Kb;V.prototype.getLayout=V.prototype.Lb;V.prototype.getClosestPoint=V.prototype.pb;V.prototype.getExtent=V.prototype.J;V.prototype.simplify=V.prototype.yb;V.prototype.transform=V.prototype.kb;V.prototype.get=V.prototype.get;V.prototype.getKeys=V.prototype.O;V.prototype.getProperties=V.prototype.P;V.prototype.set=V.prototype.set;V.prototype.setProperties=V.prototype.I;
V.prototype.unset=V.prototype.R;V.prototype.changed=V.prototype.s;V.prototype.dispatchEvent=V.prototype.o;V.prototype.getRevision=V.prototype.L;V.prototype.on=V.prototype.H;V.prototype.once=V.prototype.M;V.prototype.un=V.prototype.K;V.prototype.unByKey=V.prototype.N;D.prototype.getFirstCoordinate=D.prototype.Jb;D.prototype.getLastCoordinate=D.prototype.Kb;D.prototype.getLayout=D.prototype.Lb;D.prototype.getClosestPoint=D.prototype.pb;D.prototype.getExtent=D.prototype.J;D.prototype.simplify=D.prototype.yb;
D.prototype.transform=D.prototype.kb;D.prototype.get=D.prototype.get;D.prototype.getKeys=D.prototype.O;D.prototype.getProperties=D.prototype.P;D.prototype.set=D.prototype.set;D.prototype.setProperties=D.prototype.I;D.prototype.unset=D.prototype.R;D.prototype.changed=D.prototype.s;D.prototype.dispatchEvent=D.prototype.o;D.prototype.getRevision=D.prototype.L;D.prototype.on=D.prototype.H;D.prototype.once=D.prototype.M;D.prototype.un=D.prototype.K;D.prototype.unByKey=D.prototype.N;
E.prototype.getFirstCoordinate=E.prototype.Jb;E.prototype.getLastCoordinate=E.prototype.Kb;E.prototype.getLayout=E.prototype.Lb;E.prototype.getClosestPoint=E.prototype.pb;E.prototype.getExtent=E.prototype.J;E.prototype.simplify=E.prototype.yb;E.prototype.transform=E.prototype.kb;E.prototype.get=E.prototype.get;E.prototype.getKeys=E.prototype.O;E.prototype.getProperties=E.prototype.P;E.prototype.set=E.prototype.set;E.prototype.setProperties=E.prototype.I;E.prototype.unset=E.prototype.R;
E.prototype.changed=E.prototype.s;E.prototype.dispatchEvent=E.prototype.o;E.prototype.getRevision=E.prototype.L;E.prototype.on=E.prototype.H;E.prototype.once=E.prototype.M;E.prototype.un=E.prototype.K;E.prototype.unByKey=E.prototype.N;Hs.prototype.readFeatures=Hs.prototype.Ba;Is.prototype.readFeatures=Is.prototype.Ba;Is.prototype.readFeatures=Is.prototype.Ba;qh.prototype.get=qh.prototype.get;qh.prototype.getKeys=qh.prototype.O;qh.prototype.getProperties=qh.prototype.P;qh.prototype.set=qh.prototype.set;
qh.prototype.setProperties=qh.prototype.I;qh.prototype.unset=qh.prototype.R;qh.prototype.changed=qh.prototype.s;qh.prototype.dispatchEvent=qh.prototype.o;qh.prototype.getRevision=qh.prototype.L;qh.prototype.on=qh.prototype.H;qh.prototype.once=qh.prototype.M;qh.prototype.un=qh.prototype.K;qh.prototype.unByKey=qh.prototype.N;Th.prototype.getMap=Th.prototype.g;Th.prototype.setMap=Th.prototype.setMap;Th.prototype.setTarget=Th.prototype.f;Th.prototype.get=Th.prototype.get;Th.prototype.getKeys=Th.prototype.O;
Th.prototype.getProperties=Th.prototype.P;Th.prototype.set=Th.prototype.set;Th.prototype.setProperties=Th.prototype.I;Th.prototype.unset=Th.prototype.R;Th.prototype.changed=Th.prototype.s;Th.prototype.dispatchEvent=Th.prototype.o;Th.prototype.getRevision=Th.prototype.L;Th.prototype.on=Th.prototype.H;Th.prototype.once=Th.prototype.M;Th.prototype.un=Th.prototype.K;Th.prototype.unByKey=Th.prototype.N;ei.prototype.getMap=ei.prototype.g;ei.prototype.setMap=ei.prototype.setMap;ei.prototype.setTarget=ei.prototype.f;
ei.prototype.get=ei.prototype.get;ei.prototype.getKeys=ei.prototype.O;ei.prototype.getProperties=ei.prototype.P;ei.prototype.set=ei.prototype.set;ei.prototype.setProperties=ei.prototype.I;ei.prototype.unset=ei.prototype.R;ei.prototype.changed=ei.prototype.s;ei.prototype.dispatchEvent=ei.prototype.o;ei.prototype.getRevision=ei.prototype.L;ei.prototype.on=ei.prototype.H;ei.prototype.once=ei.prototype.M;ei.prototype.un=ei.prototype.K;ei.prototype.unByKey=ei.prototype.N;fi.prototype.getMap=fi.prototype.g;
fi.prototype.setMap=fi.prototype.setMap;fi.prototype.setTarget=fi.prototype.f;fi.prototype.get=fi.prototype.get;fi.prototype.getKeys=fi.prototype.O;fi.prototype.getProperties=fi.prototype.P;fi.prototype.set=fi.prototype.set;fi.prototype.setProperties=fi.prototype.I;fi.prototype.unset=fi.prototype.R;fi.prototype.changed=fi.prototype.s;fi.prototype.dispatchEvent=fi.prototype.o;fi.prototype.getRevision=fi.prototype.L;fi.prototype.on=fi.prototype.H;fi.prototype.once=fi.prototype.M;fi.prototype.un=fi.prototype.K;
fi.prototype.unByKey=fi.prototype.N;qr.prototype.getMap=qr.prototype.g;qr.prototype.setMap=qr.prototype.setMap;qr.prototype.setTarget=qr.prototype.f;qr.prototype.get=qr.prototype.get;qr.prototype.getKeys=qr.prototype.O;qr.prototype.getProperties=qr.prototype.P;qr.prototype.set=qr.prototype.set;qr.prototype.setProperties=qr.prototype.I;qr.prototype.unset=qr.prototype.R;qr.prototype.changed=qr.prototype.s;qr.prototype.dispatchEvent=qr.prototype.o;qr.prototype.getRevision=qr.prototype.L;
qr.prototype.on=qr.prototype.H;qr.prototype.once=qr.prototype.M;qr.prototype.un=qr.prototype.K;qr.prototype.unByKey=qr.prototype.N;Wh.prototype.getMap=Wh.prototype.g;Wh.prototype.setMap=Wh.prototype.setMap;Wh.prototype.setTarget=Wh.prototype.f;Wh.prototype.get=Wh.prototype.get;Wh.prototype.getKeys=Wh.prototype.O;Wh.prototype.getProperties=Wh.prototype.P;Wh.prototype.set=Wh.prototype.set;Wh.prototype.setProperties=Wh.prototype.I;Wh.prototype.unset=Wh.prototype.R;Wh.prototype.changed=Wh.prototype.s;
Wh.prototype.dispatchEvent=Wh.prototype.o;Wh.prototype.getRevision=Wh.prototype.L;Wh.prototype.on=Wh.prototype.H;Wh.prototype.once=Wh.prototype.M;Wh.prototype.un=Wh.prototype.K;Wh.prototype.unByKey=Wh.prototype.N;vr.prototype.getMap=vr.prototype.g;vr.prototype.setMap=vr.prototype.setMap;vr.prototype.setTarget=vr.prototype.f;vr.prototype.get=vr.prototype.get;vr.prototype.getKeys=vr.prototype.O;vr.prototype.getProperties=vr.prototype.P;vr.prototype.set=vr.prototype.set;vr.prototype.setProperties=vr.prototype.I;
vr.prototype.unset=vr.prototype.R;vr.prototype.changed=vr.prototype.s;vr.prototype.dispatchEvent=vr.prototype.o;vr.prototype.getRevision=vr.prototype.L;vr.prototype.on=vr.prototype.H;vr.prototype.once=vr.prototype.M;vr.prototype.un=vr.prototype.K;vr.prototype.unByKey=vr.prototype.N;Yh.prototype.getMap=Yh.prototype.g;Yh.prototype.setMap=Yh.prototype.setMap;Yh.prototype.setTarget=Yh.prototype.f;Yh.prototype.get=Yh.prototype.get;Yh.prototype.getKeys=Yh.prototype.O;Yh.prototype.getProperties=Yh.prototype.P;
Yh.prototype.set=Yh.prototype.set;Yh.prototype.setProperties=Yh.prototype.I;Yh.prototype.unset=Yh.prototype.R;Yh.prototype.changed=Yh.prototype.s;Yh.prototype.dispatchEvent=Yh.prototype.o;Yh.prototype.getRevision=Yh.prototype.L;Yh.prototype.on=Yh.prototype.H;Yh.prototype.once=Yh.prototype.M;Yh.prototype.un=Yh.prototype.K;Yh.prototype.unByKey=Yh.prototype.N;Jr.prototype.getMap=Jr.prototype.g;Jr.prototype.setMap=Jr.prototype.setMap;Jr.prototype.setTarget=Jr.prototype.f;Jr.prototype.get=Jr.prototype.get;
Jr.prototype.getKeys=Jr.prototype.O;Jr.prototype.getProperties=Jr.prototype.P;Jr.prototype.set=Jr.prototype.set;Jr.prototype.setProperties=Jr.prototype.I;Jr.prototype.unset=Jr.prototype.R;Jr.prototype.changed=Jr.prototype.s;Jr.prototype.dispatchEvent=Jr.prototype.o;Jr.prototype.getRevision=Jr.prototype.L;Jr.prototype.on=Jr.prototype.H;Jr.prototype.once=Jr.prototype.M;Jr.prototype.un=Jr.prototype.K;Jr.prototype.unByKey=Jr.prototype.N;Or.prototype.getMap=Or.prototype.g;Or.prototype.setMap=Or.prototype.setMap;
Or.prototype.setTarget=Or.prototype.f;Or.prototype.get=Or.prototype.get;Or.prototype.getKeys=Or.prototype.O;Or.prototype.getProperties=Or.prototype.P;Or.prototype.set=Or.prototype.set;Or.prototype.setProperties=Or.prototype.I;Or.prototype.unset=Or.prototype.R;Or.prototype.changed=Or.prototype.s;Or.prototype.dispatchEvent=Or.prototype.o;Or.prototype.getRevision=Or.prototype.L;Or.prototype.on=Or.prototype.H;Or.prototype.once=Or.prototype.M;Or.prototype.un=Or.prototype.K;Or.prototype.unByKey=Or.prototype.N;
  return OPENLAYERS.ol;
}));


/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(61);

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(62)(content, options);

if(content.locals) module.exports = content.locals;

if(false) {
	module.hot.accept("!!../../../node_modules/css-loader/index.js!./ol.css", function() {
		var newContent = require("!!../../../node_modules/css-loader/index.js!./ol.css");

		if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];

		var locals = (function(a, b) {
			var key, idx = 0;

			for(key in a) {
				if(!b || a[key] !== b[key]) return false;
				idx++;
			}

			for(key in b) idx--;

			return idx === 0;
		}(content.locals, newContent.locals));

		if(!locals) throw new Error('Aborting CSS HMR due to changed css-modules locals.');

		update(newContent);
	});

	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*!
 * Vue.js v2.5.13
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// these helpers produces better vm code in JS engines due to their
// explicitness and function inlining
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value e.g. [object Object]
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if a attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/)
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */


/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var SSR_ATTR = 'data-server-rendered';

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured'
];

/*  */

var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "production" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "production" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */


// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;

var supportsPassive = false;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
        /* istanbul ignore next */
        supportsPassive = true;
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (false) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm || {};
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm) {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode, deep) {
  var componentOptions = vnode.componentOptions;
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.isCloned = true;
  if (deep) {
    if (vnode.children) {
      cloned.children = cloneVNodes(vnode.children, true);
    }
    if (componentOptions && componentOptions.children) {
      componentOptions.children = cloneVNodes(componentOptions.children, true);
    }
  }
  return cloned
}

function cloneVNodes (vnodes, deep) {
  var len = vnodes.length;
  var res = new Array(len);
  for (var i = 0; i < len; i++) {
    res[i] = cloneVNode(vnodes[i], deep);
  }
  return res
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
].forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src, keys) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (false) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    "production" !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (false) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
      "production" !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
    "production" !== 'production' && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (false) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "production" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!/^[a-zA-Z][\w-]*$/.test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'can only contain alphanumeric characters and the hyphen, ' +
      'and must start with a letter.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (false) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (false) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (false) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      parent = mergeOptions(parent, child.mixins[i], vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (false) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (
    false
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (false) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      "Invalid prop: type check failed for prop \"" + name + "\"." +
      " Expected " + (expectedTypes.map(capitalize).join(', ')) +
      ", got " + (toRawType(value)) + ".",
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}

/*  */

function handleError (err, vm, info) {
  if (vm) {
    var cur = vm;
    while ((cur = cur.$parent)) {
      var hooks = cur.$options.errorCaptured;
      if (hooks) {
        for (var i = 0; i < hooks.length; i++) {
          try {
            var capture = hooks[i].call(cur, err, vm, info) === false;
            if (capture) { return }
          } catch (e) {
            globalHandleError(e, cur, 'errorCaptured hook');
          }
        }
      }
    }
  }
  globalHandleError(err, vm, info);
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      logError(e, null, 'config.errorHandler');
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (false) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */
/* globals MessageChannel */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using both micro and macro tasks.
// In < 2.4 we used micro tasks everywhere, but there are some scenarios where
// micro tasks have too high a priority and fires in between supposedly
// sequential events (e.g. #4521, #6690) or even between bubbling of the same
// event (#6566). However, using macro tasks everywhere also has subtle problems
// when state is changed right before repaint (e.g. #6813, out-in transitions).
// Here we use micro task by default, but expose a way to force macro task when
// needed (e.g. in event handlers attached by v-on).
var microTimerFunc;
var macroTimerFunc;
var useMacroTask = false;

// Determine (macro) Task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  macroTimerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  var channel = new MessageChannel();
  var port = channel.port2;
  channel.port1.onmessage = flushCallbacks;
  macroTimerFunc = function () {
    port.postMessage(1);
  };
} else {
  /* istanbul ignore next */
  macroTimerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

// Determine MicroTask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  microTimerFunc = function () {
    p.then(flushCallbacks);
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else {
  // fallback to macro
  microTimerFunc = macroTimerFunc;
}

/**
 * Wrap a function so that if any code inside triggers state change,
 * the changes are queued using a Task instead of a MicroTask.
 */
function withMacroTask (fn) {
  return fn._withTask || (fn._withTask = function () {
    useMacroTask = true;
    var res = fn.apply(null, arguments);
    useMacroTask = false;
    return res
  })
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    if (useMacroTask) {
      macroTimerFunc();
    } else {
      microTimerFunc();
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (false) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (false) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      perf.clearMeasures(name);
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        cloned[i].apply(null, arguments$1);
      }
    } else {
      // return handler return value for single handlers
      return fns.apply(null, arguments)
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, def, cur, old, event;
  for (name in on) {
    def = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    /* istanbul ignore if */
    if (isUndef(cur)) {
      "production" !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur);
      }
      add(event.name, cur, event.once, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook) {
  if (def instanceof VNode) {
    def = def.data.hook || (def.data.hook = {});
  }
  var invoker;
  var oldHook = def[hookKey];

  function wrappedHook () {
    hook.apply(this, arguments);
    // important: remove merged hook to ensure it's called only once
    // and prevent memory leak
    remove(invoker.fns, wrappedHook);
  }

  if (isUndef(oldHook)) {
    // no existing hook
    invoker = createFnInvoker([wrappedHook]);
  } else {
    /* istanbul ignore if */
    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
      // already a merged invoker
      invoker = oldHook;
      invoker.fns.push(wrappedHook);
    } else {
      // existing plain hook
      invoker = createFnInvoker([oldHook, wrappedHook]);
    }
  }

  invoker.merged = true;
  def[hookKey] = invoker;
}

/*  */

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (false) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  context
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (isDef(factory.contexts)) {
    // already pending
    factory.contexts.push(context);
  } else {
    var contexts = factory.contexts = [context];
    var sync = true;

    var forceRender = function () {
      for (var i = 0, l = contexts.length; i < l; i++) {
        contexts[i].$forceUpdate();
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender();
      }
    });

    var reject = once(function (reason) {
      "production" !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender();
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (typeof res.then === 'function') {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isDef(res.component) && typeof res.component.then === 'function') {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            setTimeout(function () {
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender();
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          setTimeout(function () {
            if (isUndef(factory.resolved)) {
              reject(
                 false
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : null
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var this$1 = this;

    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var this$1 = this;

    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        this$1.$off(event[i], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    if (fn) {
      // specific handler
      var cb;
      var i$1 = cbs.length;
      while (i$1--) {
        cb = cbs[i$1];
        if (cb === fn || cb.fn === fn) {
          cbs.splice(i$1, 1);
          break
        }
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (false) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        try {
          cbs[i].apply(vm, args);
        } catch (e) {
          handleError(e, vm, ("event handler for \"" + event + "\""));
        }
      }
    }
    return vm
  };
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      (slots.default || (slots.default = [])).push(child);
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

function resolveScopedSlots (
  fns, // see flow/vnode
  res
) {
  res = res || {};
  for (var i = 0; i < fns.length; i++) {
    if (Array.isArray(fns[i])) {
      resolveScopedSlots(fns[i], res);
    } else {
      res[fns[i].key] = fns[i].fn;
    }
  }
  return res
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
      // no need for the ref nodes after initial patch
      // this prevents keeping a detached DOM tree in memory (#5851)
      vm.$options._parentElm = vm.$options._refElm = null;
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function mountComponent (
  vm,
  el,
  hydrating
) {
  vm.$el = el;
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode;
    if (false) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }
  callHook(vm, 'beforeMount');

  var updateComponent;
  /* istanbul ignore if */
  if (false) {
    updateComponent = function () {
      var name = vm._name;
      var id = vm._uid;
      var startTag = "vue-perf-start:" + id;
      var endTag = "vue-perf-end:" + id;

      mark(startTag);
      var vnode = vm._render();
      mark(endTag);
      measure(("vue " + name + " render"), startTag, endTag);

      mark(startTag);
      vm._update(vnode, hydrating);
      mark(endTag);
      measure(("vue " + name + " patch"), startTag, endTag);
    };
  } else {
    updateComponent = function () {
      vm._update(vm._render(), hydrating);
    };
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */);
  hydrating = false;

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true;
    callHook(vm, 'mounted');
  }
  return vm
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (false) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren
  var hasChildren = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    parentVnode.data.scopedSlots || // has new scoped slots
    vm.$scopedSlots !== emptyObject // has old scoped slots
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = (parentVnode.data && parentVnode.data.attrs) || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    observerState.shouldConvert = false;
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      props[key] = validateProp(key, vm.$options.props, propsData, vm);
    }
    observerState.shouldConvert = true;
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // update listeners
  if (listeners) {
    var oldListeners = vm.$options._parentListeners;
    vm.$options._parentListeners = listeners;
    updateComponentListeners(vm, listeners, oldListeners);
  }
  // resolve slots + force update if has children
  if (hasChildren) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (false) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm);
      } catch (e) {
        handleError(e, vm, (hook + " hook"));
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (false) {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (false) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  false
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      "production" !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (false) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive(props, key, value, function () {
        if (vm.$parent && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive(props, key, value);
    }
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    "production" !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (false) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
      "production" !== 'production' && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if (false) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (false) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : userDef;
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : userDef.get
      : noop;
    sharedPropertyDefinition.set = userDef.set
      ? userDef.set
      : noop;
  }
  if (false) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.target) {
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (false) {
      if (methods[key] == null) {
        warn(
          "Method \"" + key + "\" has an undefined value in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  keyOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(keyOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (false) {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    observerState.shouldConvert = false;
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (false) {
        defineReactive(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {
        defineReactive(vm, key, result[key]);
      }
    });
    observerState.shouldConvert = true;
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject).filter(function (key) {
        /* istanbul ignore next */
        return Object.getOwnPropertyDescriptor(inject, key).enumerable
      })
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && provideKey in source._provided) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (false) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i);
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i);
    }
  } else if (isObject(val)) {
    keys = Object.keys(val);
    ret = new Array(keys.length);
    for (i = 0, l = keys.length; i < l; i++) {
      key = keys[i];
      ret[i] = render(val[key], key, i);
    }
  }
  if (isDef(ret)) {
    (ret)._isVList = true;
  }
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if (false) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    nodes = scopedSlotFn(props) || fallback;
  } else {
    var slotNodes = this.$slots[name];
    // warn duplicate slot usage
    if (slotNodes) {
      if (false) {
        warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
      }
      slotNodes._rendered = true;
    }
    nodes = slotNodes || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInAlias,
  eventKeyName
) {
  var keyCodes = config.keyCodes[key] || builtInAlias;
  if (keyCodes) {
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
      "production" !== 'production' && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        if (!(key in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree by doing a shallow clone.
  if (tree && !isInFor) {
    return Array.isArray(tree)
      ? cloneVNodes(tree)
      : cloneVNode(tree)
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
      "production" !== 'production' && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var options = Ctor.options;
  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () { return resolveSlots(children, parent); };

  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm = Object.create(parent);
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = data.scopedSlots || emptyObject;
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    vnode.fnContext = contextVm;
    vnode.fnOptions = options;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }

  return vnode
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */




// Register the component hook to weex native render engine.
// The hook will be triggered by native, not javascript.


// Updates the state of the component to weex native render engine.

/*  */

// https://github.com/Hanks10100/weex-native-directive/tree/master/component

// listening on native callback

/*  */

/*  */

// hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (
    vnode,
    hydrating,
    parentElm,
    refElm
  ) {
    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance,
        parentElm,
        refElm
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    } else if (vnode.data.keepAlive) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (false) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor, context);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag);

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  // Weex specific: invoke recycle-list optimized @render function for
  // extracting cell-slot template.
  // https://github.com/Hanks10100/weex-native-directive/tree/master/component
  /* istanbul ignore if */
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var options = {
    _isComponent: true,
    parent: parent,
    _parentVnode: vnode,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = componentVNodeHooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event]);
  } else {
    on[event] = data.model.callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
    "production" !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if (false
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (isDef(vnode)) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (isUndef(child.ns) || isTrue(force))) {
        applyNS(child, ns, force);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (false) {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {
    defineReactive(vm, '$attrs', parentData && parentData.attrs || emptyObject, null, true);
    defineReactive(vm, '$listeners', options._parentListeners || emptyObject, null, true);
  }
}

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // if the parent didn't update, the slot nodes will be the ones from
      // last render. They need to be cloned to ensure "freshness" for this render.
      for (var key in vm.$slots) {
        var slot = vm.$slots[key];
        // _rendered is a flag added by renderSlot, but may not be present
        // if the slot is passed from manually written render functions
        if (slot._rendered || (slot[0] && slot[0].elm)) {
          vm.$slots[key] = cloneVNodes(slot, true /* deep */);
        }
      }
    }

    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if (false) {
        if (vm.$options.renderError) {
          try {
            vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
          } catch (e) {
            handleError(e, vm, "renderError");
            vnode = vm._vnode;
          }
        } else {
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (false) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;

    var startTag, endTag;
    /* istanbul ignore if */
    if (false) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (false) {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initInjections(vm); // resolve injections before data/props
    initState(vm);
    initProvide(vm); // resolve provide after data/props
    callHook(vm, 'created');

    /* istanbul ignore if */
    if (false) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var extended = Ctor.extendOptions;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
    }
  }
  return modified
}

function dedupe (latest, extended, sealed) {
  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
  // between merges
  if (Array.isArray(latest)) {
    var res = [];
    sealed = Array.isArray(sealed) ? sealed : [sealed];
    extended = Array.isArray(extended) ? extended : [extended];
    for (var i = 0; i < latest.length; i++) {
      // push original options and not sealed options to exclude duplicated options
      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
        res.push(latest[i]);
      }
    }
    return res
  } else {
    return latest
  }
}

function Vue$3 (options) {
  if (false
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$3);
stateMixin(Vue$3);
eventsMixin(Vue$3);
lifecycleMixin(Vue$3);
renderMixin(Vue$3);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if (false) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (false) {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this$1.cache) {
      pruneCacheEntry(this$1.cache, key, this$1.keys);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (false) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$3);

Object.defineProperty(Vue$3.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue$3.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

Vue$3.version = '2.5.13';

/*  */

// these are reserved for web because they are directly compiled away
// during template compilation
var isReservedAttr = makeMap('style,class');

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select,progress');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (isDef(childNode.componentInstance)) {
    childNode = childNode.componentInstance._vnode;
    if (childNode && childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while (isDef(parentNode = parentNode.parent)) {
    if (parentNode && parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return renderClass(data.staticClass, data.class)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: isDef(child.class)
      ? [child.class, parent.class]
      : parent.class
  }
}

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template,blockquote,iframe,tfoot'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

var isTextInputType = makeMap('text,number,password,search,email,tel,url');

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selected = document.querySelector(el);
    if (!selected) {
      "production" !== 'production' && warn(
        'Cannot find element: ' + el
      );
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  // false or null will remove the attribute but undefined will not
  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (!Array.isArray(refs[key])) {
        refs[key] = [ref];
      } else if (refs[key].indexOf(ref) < 0) {
        // $flow-disable-line
        refs[key].push(ref);
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];

function sameVnode (a, b) {
  return (
    a.key === b.key && (
      (
        a.tag === b.tag &&
        a.isComment === b.isComment &&
        isDef(a.data) === isDef(b.data) &&
        sameInputType(a, b)
      ) || (
        isTrue(a.isAsyncPlaceholder) &&
        a.asyncFactory === b.asyncFactory &&
        isUndef(b.asyncFactory.error)
      )
    )
  )
}

function sameInputType (a, b) {
  if (a.tag !== 'input') { return true }
  var i;
  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
  return typeA === typeB || isTextInputType(typeA) && isTextInputType(typeB)
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks.length; ++i) {
    cbs[hooks[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (isDef(modules[j][hooks[i]])) {
        cbs[hooks[i]].push(modules[j][hooks[i]]);
      }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove () {
      if (--remove.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove.listeners = listeners;
    return remove
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (isDef(parent)) {
      nodeOps.removeChild(parent, el);
    }
  }

  function isUnknownElement$$1 (vnode, inVPre) {
    return (
      !inVPre &&
      !vnode.ns &&
      !(
        config.ignoredElements.length &&
        config.ignoredElements.some(function (ignore) {
          return isRegExp(ignore)
            ? ignore.test(vnode.tag)
            : ignore === vnode.tag
        })
      ) &&
      config.isUnknownElement(vnode.tag)
    )
  }

  var creatingElmInVPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (false) {
        if (data && data.pre) {
          creatingElmInVPre++;
        }
        if (isUnknownElement$$1(vnode, creatingElmInVPre)) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (false) {
        creatingElmInVPre--;
      }
    } else if (isTrue(vnode.isComment)) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isTrue(isReactivated)) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (isDef(vnode.data.pendingInsert)) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
      vnode.data.pendingInsert = null;
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref$$1) {
    if (isDef(parent)) {
      if (isDef(ref$$1)) {
        if (ref$$1.parentNode === parent) {
          nodeOps.insertBefore(parent, elm, ref$$1);
        }
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      if (false) {
        checkDuplicateKeys(children);
      }
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(String(vnode.text)));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (isDef(i.create)) { i.create(emptyNode, vnode); }
      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.fnScopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    } else {
      var ancestor = vnode;
      while (ancestor) {
        if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
          nodeOps.setAttribute(vnode.elm, i, '');
        }
        ancestor = ancestor.parent;
      }
    }
    // for slot content they should also get the scopeId from the host instance.
    if (isDef(i = activeInstance) &&
      i !== vnode.context &&
      i !== vnode.fnContext &&
      isDef(i = i.$options._scopeId)
    ) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (isDef(rm) || isDef(vnode.data)) {
      var i;
      var listeners = cbs.remove.length + 1;
      if (isDef(rm)) {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      } else {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, vnodeToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    if (false) {
      checkDuplicateKeys(newCh);
    }

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx);
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
        } else {
          vnodeToMove = oldCh[idxInOld];
          if (sameVnode(vnodeToMove, newStartVnode)) {
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm);
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          }
        }
        newStartVnode = newCh[++newStartIdx];
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function checkDuplicateKeys (children) {
    var seenKeys = {};
    for (var i = 0; i < children.length; i++) {
      var vnode = children[i];
      var key = vnode.key;
      if (isDef(key)) {
        if (seenKeys[key]) {
          warn(
            ("Duplicate keys detected: '" + key + "'. This may cause an update error."),
            vnode.context
          );
        } else {
          seenKeys[key] = true;
        }
      }
    }
  }

  function findIdxInOld (node, oldCh, start, end) {
    for (var i = start; i < end; i++) {
      var c = oldCh[i];
      if (isDef(c) && sameVnode(node, c)) { return i }
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }

    var elm = vnode.elm = oldVnode.elm;

    if (isTrue(oldVnode.isAsyncPlaceholder)) {
      if (isDef(vnode.asyncFactory.resolved)) {
        hydrate(oldVnode.elm, vnode, insertedVnodeQueue);
      } else {
        vnode.isAsyncPlaceholder = true;
      }
      return
    }

    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (isTrue(vnode.isStatic) &&
      isTrue(oldVnode.isStatic) &&
      vnode.key === oldVnode.key &&
      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
    ) {
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }

    var i;
    var data = vnode.data;
    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }

    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (isDef(data) && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (isTrue(initial) && isDef(vnode.parent)) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var hydrationBailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  // Note: style is excluded because it relies on initial clone for future
  // deep updates (#7063).
  var isRenderedModule = makeMap('attrs,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue, inVPre) {
    var i;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    inVPre = inVPre || (data && data.pre);
    vnode.elm = elm;

    if (isTrue(vnode.isComment) && isDef(vnode.asyncFactory)) {
      vnode.isAsyncPlaceholder = true;
      return true
    }
    // assert node match
    if (false) {
      if (!assertNodeMatch(elm, vnode, inVPre)) {
        return false
      }
    }
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          // v-html and domProps: innerHTML
          if (isDef(i = data) && isDef(i = i.domProps) && isDef(i = i.innerHTML)) {
            if (i !== elm.innerHTML) {
              /* istanbul ignore if */
              if (false
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('server innerHTML: ', i);
                console.warn('client innerHTML: ', elm.innerHTML);
              }
              return false
            }
          } else {
            // iterate and compare children lists
            var childrenMatch = true;
            var childNode = elm.firstChild;
            for (var i$1 = 0; i$1 < children.length; i$1++) {
              if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue, inVPre)) {
                childrenMatch = false;
                break
              }
              childNode = childNode.nextSibling;
            }
            // if childNode is not null, it means the actual childNodes list is
            // longer than the virtual children list.
            if (!childrenMatch || childNode) {
              /* istanbul ignore if */
              if (false
              ) {
                hydrationBailed = true;
                console.warn('Parent: ', elm);
                console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
              }
              return false
            }
          }
        }
      }
      if (isDef(data)) {
        var fullInvoke = false;
        for (var key in data) {
          if (!isRenderedModule(key)) {
            fullInvoke = true;
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
        if (!fullInvoke && data['class']) {
          // ensure collecting deps for deep class bindings for future updates
          traverse(data['class']);
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode, inVPre) {
    if (isDef(vnode.tag)) {
      return vnode.tag.indexOf('vue-component') === 0 || (
        !isUnknownElement$$1(vnode, inVPre) &&
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (isUndef(vnode)) {
      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (isUndef(oldVnode)) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
            oldVnode.removeAttribute(SSR_ATTR);
            hydrating = true;
          }
          if (isTrue(hydrating)) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (false) {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }

        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);

        // create new node
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        // update parent placeholder node element, recursively
        if (isDef(vnode.parent)) {
          var ancestor = vnode.parent;
          var patchable = isPatchable(vnode);
          while (ancestor) {
            for (var i = 0; i < cbs.destroy.length; ++i) {
              cbs.destroy[i](ancestor);
            }
            ancestor.elm = vnode.elm;
            if (patchable) {
              for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
                cbs.create[i$1](emptyNode, ancestor);
              }
              // #6513
              // invoke insert hooks that may have been merged by create hooks.
              // e.g. for directives that uses the "inserted" hook.
              var insert = ancestor.data.hook.insert;
              if (insert.merged) {
                // start at index 1 to avoid re-invoking component mounted hook
                for (var i$2 = 1; i$2 < insert.fns.length; i$2++) {
                  insert.fns[i$2]();
                }
              }
            } else {
              registerRef(ancestor);
            }
            ancestor = ancestor.parent;
          }
        }

        // destroy old node
        if (isDef(parentElm$1)) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode, 'insert', callInsert);
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode, 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    });
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    // $flow-disable-line
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      // $flow-disable-line
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  // $flow-disable-line
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    try {
      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
    } catch (e) {
      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
    }
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  var opts = vnode.componentOptions;
  if (isDef(opts) && opts.Ctor.options.inheritAttrs === false) {
    return
  }
  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(attrs.__ob__)) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  // #6666: IE/Edge forces progress value down to 1 before setting a max
  /* istanbul ignore if */
  if ((isIE || isEdge) && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (isUndef(attrs[key])) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // technically allowfullscreen is a boolean attribute for <iframe>,
      // but Flash expects a value of "true" when used on <embed> tag
      value = key === 'allowfullscreen' && el.tagName === 'EMBED'
        ? 'true'
        : key;
      el.setAttribute(key, value);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      // #7138: IE10 & 11 fires input event when setting placeholder on
      // <textarea>... block the first input event and remove the blocker
      // immediately.
      /* istanbul ignore if */
      if (
        isIE && !isIE9 &&
        el.tagName === 'TEXTAREA' &&
        key === 'placeholder' && !el.__ieph
      ) {
        var blocker = function (e) {
          e.stopImmediatePropagation();
          el.removeEventListener('input', blocker);
        };
        el.addEventListener('input', blocker);
        // $flow-disable-line
        el.__ieph = true; /* IE placeholder patched */
      }
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (
    isUndef(data.staticClass) &&
    isUndef(data.class) && (
      isUndef(oldData) || (
        isUndef(oldData.staticClass) &&
        isUndef(oldData.class)
      )
    )
  ) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (isDef(transitionClass)) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

/*  */









// add a raw attr (use this in preTransforms)








// note: this only removes the attr from the Array (attrsList) so that it
// doesn't get processed by processAttrs.
// By default it does NOT remove it from the map (attrsMap) because the map is
// needed during codegen.

/*  */

/**
 * Cross-platform code generation for component v-model
 */


/**
 * Cross-platform codegen helper for generating v-model value assignment code.
 */

/*  */

// in some cases, the event used has to be determined at runtime
// so we used some reserved tokens during compile.
var RANGE_TOKEN = '__r';
var CHECKBOX_RADIO_TOKEN = '__c';

/*  */

// normalize v-model event tokens that can only be determined at runtime.
// it's important to place the event as the first in the array because
// the whole point is ensuring the v-model callback gets called before
// user-attached handlers.
function normalizeEvents (on) {
  /* istanbul ignore if */
  if (isDef(on[RANGE_TOKEN])) {
    // IE input[type=range] only supports `change` event
    var event = isIE ? 'change' : 'input';
    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
    delete on[RANGE_TOKEN];
  }
  // This was originally intended to fix #4521 but no longer necessary
  // after 2.5. Keeping it for backwards compat with generated code from < 2.4
  /* istanbul ignore if */
  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
    on.change = [].concat(on[CHECKBOX_RADIO_TOKEN], on.change || []);
    delete on[CHECKBOX_RADIO_TOKEN];
  }
}

var target$1;

function createOnceHandler (handler, event, capture) {
  var _target = target$1; // save current target element in closure
  return function onceHandler () {
    var res = handler.apply(null, arguments);
    if (res !== null) {
      remove$2(event, onceHandler, capture, _target);
    }
  }
}

function add$1 (
  event,
  handler,
  once$$1,
  capture,
  passive
) {
  handler = withMacroTask(handler);
  if (once$$1) { handler = createOnceHandler(handler, event, capture); }
  target$1.addEventListener(
    event,
    handler,
    supportsPassive
      ? { capture: capture, passive: passive }
      : capture
  );
}

function remove$2 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(
    event,
    handler._withTask || handler,
    capture
  );
}

function updateDOMListeners (oldVnode, vnode) {
  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  normalizeEvents(on);
  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
  target$1 = undefined;
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (isDef(props.__ob__)) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (isUndef(props[key])) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
      // #6601 work around Chrome version <= 55 bug where single textNode
      // replaced by innerHTML/textContent retains its parentNode property
      if (elm.childNodes.length === 1) {
        elm.removeChild(elm.childNodes[0]);
      }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = isUndef(cur) ? '' : String(cur);
      if (shouldUpdateValue(elm, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (elm, checkVal) {
  return (!elm.composing && (
    elm.tagName === 'OPTION' ||
    isNotInFocusAndDirty(elm, checkVal) ||
    isDirtyWithModifiers(elm, checkVal)
  ))
}

function isNotInFocusAndDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is
  // not equal to the updated value
  var notInFocus = true;
  // #6157
  // work around IE bug when accessing document.activeElement in an iframe
  try { notInFocus = document.activeElement !== elm; } catch (e) {}
  return notInFocus && elm.value !== checkVal
}

function isDirtyWithModifiers (elm, newVal) {
  var value = elm.value;
  var modifiers = elm._vModifiers; // injected by v-model runtime
  if (isDef(modifiers)) {
    if (modifiers.lazy) {
      // inputs with lazy should only be updated when not in focus
      return false
    }
    if (modifiers.number) {
      return toNumber(value) !== toNumber(newVal)
    }
    if (modifiers.trim) {
      return value.trim() !== newVal.trim()
    }
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (
        childNode && childNode.data &&
        (styleData = normalizeStyleData(childNode.data))
      ) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    var normalizedName = normalize(name);
    if (Array.isArray(val)) {
      // Support values array created by autoprefixer, e.g.
      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
      // Set them one by one, and the browser will only set those it can recognize
      for (var i = 0, len = val.length; i < len; i++) {
        el.style[normalizedName] = val[i];
      }
    } else {
      el.style[normalizedName] = val;
    }
  }
};

var vendorNames = ['Webkit', 'Moz', 'ms'];

var emptyStyle;
var normalize = cached(function (prop) {
  emptyStyle = emptyStyle || document.createElement('div').style;
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in emptyStyle)) {
    return prop
  }
  var capName = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < vendorNames.length; i++) {
    var name = vendorNames[i] + capName;
    if (name in emptyStyle) {
      return name
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (isUndef(data.staticStyle) && isUndef(data.style) &&
    isUndef(oldData.staticStyle) && isUndef(oldData.style)
  ) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldData.staticStyle;
  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  // store normalized style under a different key for next diff
  // make sure to clone it if it's reactive, since the user likely wants
  // to mutate it.
  vnode.data.normalizedStyle = isDef(style.__ob__)
    ? extend({}, style)
    : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (isUndef(newStyle[name])) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !(cls = cls.trim())) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
    if (!el.classList.length) {
      el.removeAttribute('class');
    }
  } else {
    var cur = " " + (el.getAttribute('class') || '') + " ";
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    cur = cur.trim();
    if (cur) {
      el.setAttribute('class', cur);
    } else {
      el.removeAttribute('class');
    }
  }
}

/*  */

function resolveTransition (def) {
  if (!def) {
    return
  }
  /* istanbul ignore else */
  if (typeof def === 'object') {
    var res = {};
    if (def.css !== false) {
      extend(res, autoCssTransition(def.name || 'v'));
    }
    extend(res, def);
    return res
  } else if (typeof def === 'string') {
    return autoCssTransition(def)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveClass: (name + "-leave"),
    leaveToClass: (name + "-leave-to"),
    leaveActiveClass: (name + "-leave-active")
  }
});

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined
  ) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined
  ) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser
  ? window.requestAnimationFrame
    ? window.requestAnimationFrame.bind(window)
    : setTimeout
  : /* istanbul ignore next */ function (fn) { return fn(); };

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  var transitionClasses = el._transitionClasses || (el._transitionClasses = []);
  if (transitionClasses.indexOf(cls) < 0) {
    transitionClasses.push(cls);
    addClass(el, cls);
  }
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (isDef(el._leaveCb)) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data)) {
    return
  }

  /* istanbul ignore if */
  if (isDef(el._enterCb) || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;
  var duration = data.duration;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear && appearClass
    ? appearClass
    : enterClass;
  var activeClass = isAppear && appearActiveClass
    ? appearActiveClass
    : enterActiveClass;
  var toClass = isAppear && appearToClass
    ? appearToClass
    : enterToClass;

  var beforeEnterHook = isAppear
    ? (beforeAppear || beforeEnter)
    : beforeEnter;
  var enterHook = isAppear
    ? (typeof appear === 'function' ? appear : enter)
    : enter;
  var afterEnterHook = isAppear
    ? (afterAppear || afterEnter)
    : afterEnter;
  var enterCancelledHook = isAppear
    ? (appearCancelled || enterCancelled)
    : enterCancelled;

  var explicitEnterDuration = toNumber(
    isObject(duration)
      ? duration.enter
      : duration
  );

  if (false) {
    checkDuration(explicitEnterDuration, 'enter', vnode);
  }

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(enterHook);

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode, 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
        pendingNode.tag === vnode.tag &&
        pendingNode.elm._leaveCb
      ) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    });
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        if (isValidDuration(explicitEnterDuration)) {
          setTimeout(cb, explicitEnterDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (isDef(el._enterCb)) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (isUndef(data) || el.nodeType !== 1) {
    return rm()
  }

  /* istanbul ignore if */
  if (isDef(el._leaveCb)) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;
  var duration = data.duration;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl = getHookArgumentsLength(leave);

  var explicitLeaveDuration = toNumber(
    isObject(duration)
      ? duration.leave
      : duration
  );

  if (false) {
    checkDuration(explicitLeaveDuration, 'leave', vnode);
  }

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          if (isValidDuration(explicitLeaveDuration)) {
            setTimeout(cb, explicitLeaveDuration);
          } else {
            whenTransitionEnds(el, type, cb);
          }
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

// only used in dev mode
function checkDuration (val, name, vnode) {
  if (typeof val !== 'number') {
    warn(
      "<transition> explicit " + name + " duration is not a valid number - " +
      "got " + (JSON.stringify(val)) + ".",
      vnode.context
    );
  } else if (isNaN(val)) {
    warn(
      "<transition> explicit " + name + " duration is NaN - " +
      'the duration expression might be incorrect.',
      vnode.context
    );
  }
}

function isValidDuration (val) {
  return typeof val === 'number' && !isNaN(val)
}

/**
 * Normalize a transition hook's argument length. The hook may be:
 * - a merged hook (invoker) with the original in .fns
 * - a wrapped component method (check ._length)
 * - a plain function (.length)
 */
function getHookArgumentsLength (fn) {
  if (isUndef(fn)) {
    return false
  }
  var invokerFns = fn.fns;
  if (isDef(invokerFns)) {
    // invoker
    return getHookArgumentsLength(
      Array.isArray(invokerFns)
        ? invokerFns[0]
        : invokerFns
    )
  } else {
    return (fn._length || fn.length) > 1
  }
}

function _enter (_, vnode) {
  if (vnode.data.show !== true) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove$$1 (vnode, rm) {
    /* istanbul ignore else */
    if (vnode.data.show !== true) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var directive = {
  inserted: function inserted (el, binding, vnode, oldVnode) {
    if (vnode.tag === 'select') {
      // #6903
      if (oldVnode.elm && !oldVnode.elm._vOptions) {
        mergeVNodeHook(vnode, 'postpatch', function () {
          directive.componentUpdated(el, binding, vnode);
        });
      } else {
        setSelected(el, binding, vnode.context);
      }
      el._vOptions = [].map.call(el.options, getValue);
    } else if (vnode.tag === 'textarea' || isTextInputType(el.type)) {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        // Safari < 10.2 & UIWebView doesn't fire compositionend when
        // switching focus before confirming composition choice
        // this also fixes the issue where some browsers e.g. iOS Chrome
        // fires "change" instead of "input" on autocomplete.
        el.addEventListener('change', onCompositionEnd);
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },

  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var prevOptions = el._vOptions;
      var curOptions = el._vOptions = [].map.call(el.options, getValue);
      if (curOptions.some(function (o, i) { return !looseEqual(o, prevOptions[i]); })) {
        // trigger change event if
        // no matching option found for at least one value
        var needReset = el.multiple
          ? binding.value.some(function (v) { return hasNoMatchingOption(v, curOptions); })
          : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, curOptions);
        if (needReset) {
          trigger(el, 'change');
        }
      }
    }
  }
};

function setSelected (el, binding, vm) {
  actuallySetSelected(el, binding, vm);
  /* istanbul ignore if */
  if (isIE || isEdge) {
    setTimeout(function () {
      actuallySetSelected(el, binding, vm);
    }, 0);
  }
}

function actuallySetSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    "production" !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  return options.every(function (o) { return !looseEqual(o, value); })
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  // prevent triggering an input event for no reason
  if (!e.target.composing) { return }
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition$$1) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition$$1 = vnode.data && vnode.data.transition;
    if (transition$$1) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: directive,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String,
  duration: [Number, String, Object]
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1];
  }
  return data
}

function placeholder (h, rawChild) {
  if (/\d-keep-alive$/.test(rawChild.tag)) {
    return h('keep-alive', {
      props: rawChild.componentOptions.propsData
    })
  }
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag || isAsyncPlaceholder(c); });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (false) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (false
    ) {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    child.key = child.key == null
      ? child.isComment
        ? id + 'comment'
        : id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;

    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (
      oldChild &&
      oldChild.data &&
      !isSameChild(child, oldChild) &&
      !isAsyncPlaceholder(oldChild) &&
      // #6687 component root is a comment node
      !(oldChild.componentInstance && oldChild.componentInstance._vnode.isComment)
    ) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild.data.transition = extend({}, data);
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        });
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        if (isAsyncPlaceholder(child)) {
          return oldRawChild
        }
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave);
        mergeVNodeHook(data, 'enterCancelled', performLeave);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final desired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (false) {
          var opts = c.componentOptions;
          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    // assign to this to avoid being removed in tree-shaking
    // $flow-disable-line
    this._reflow = document.body.offsetHeight;

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      /* istanbul ignore if */
      if (this._hasMove) {
        return this._hasMove
      }
      // Detect whether an element with the move class applied has
      // CSS transitions. Since the element may be inside an entering
      // transition at this very moment, we make a clone of it and remove
      // all other transition classes applied to ensure only the move class
      // is applied.
      var clone = el.cloneNode();
      if (el._transitionClasses) {
        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
      }
      addClass(clone, moveClass);
      clone.style.display = 'none';
      this.$el.appendChild(clone);
      var info = getTransitionInfo(clone);
      this.$el.removeChild(clone);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$3.config.mustUseProp = mustUseProp;
Vue$3.config.isReservedTag = isReservedTag;
Vue$3.config.isReservedAttr = isReservedAttr;
Vue$3.config.getTagNamespace = getTagNamespace;
Vue$3.config.isUnknownElement = isUnknownElement;

// install platform runtime directives & components
extend(Vue$3.options.directives, platformDirectives);
extend(Vue$3.options.components, platformComponents);

// install platform patch function
Vue$3.prototype.__patch__ = inBrowser ? patch : noop;

// public mount method
Vue$3.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return mountComponent(this, el, hydrating)
};

// devtools global hook
/* istanbul ignore next */
Vue$3.nextTick(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$3);
    } else if (false) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
  if (false
  ) {
    console[console.info ? 'info' : 'log'](
      "You are running Vue in development mode.\n" +
      "Make sure to turn on production mode when deploying for production.\n" +
      "See more tips at https://vuejs.org/guide/deployment.html"
    );
  }
}, 0);

/*  */

/* harmony default export */ __webpack_exports__["a"] = (Vue$3);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3), __webpack_require__(25).setImmediate))

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
  * vue-router v3.0.1
  * (c) 2017 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (false) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (false) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

function extend (to, from) {
  for (var key in from) {
    to[key] = from[key];
  }
  return to
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "production" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */


var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback = globalActiveClass == null
            ? 'router-link-active'
            : globalActiveClass;
    var exactActiveClassFallback = globalExactActiveClass == null
            ? 'router-link-exact-active'
            : globalExactActiveClass;
    var activeClass = this.activeClass == null
            ? activeClassFallback
            : this.activeClass;
    var exactActiveClass = this.exactActiveClass == null
            ? exactActiveClassFallback
            : this.exactActiveClass;
    var compareTarget = location.path
      ? createRoute(null, location, null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (false) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (false) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions = route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(
    path,
    parent,
    pathToRegexpOptions.strict
  );

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (false) {
      if (route.name && !route.redirect && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias)
      ? route.alias
      : [route.alias];

    aliases.forEach(function (alias) {
      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (false) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (path, pathToRegexpOptions) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (false) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (path, parent, strict) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */


function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (false) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */


function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (false) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location, null, router))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (false) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (false) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (false) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      params[key.name] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  window.history.replaceState({ key: getStateKey() }, '');
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (false) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll.then(function (shouldScroll) {
        scrollToPosition((shouldScroll), position);
      }).catch(function (err) {
        if (false) {
          assert(false, err.toString());
        }
      });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    var el = document.querySelector(shouldScroll.selector);
    if (el) {
      var offset = shouldScroll.offset && typeof shouldScroll.offset === 'object' ? shouldScroll.offset : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "production" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) { cb(route); });
    }
  }, function (err) {
    if (onAbort) {
      onAbort(err);
    }
    if (err && !this$1.ready) {
      this$1.ready = true;
      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
    }
  });
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    if (isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) { cb(err); });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' && (
            typeof to.path === 'string' ||
            typeof to.name === 'string'
          ))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (expectScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(supportsPushState ? 'popstate' : 'hashchange', function () {
      var current = this$1.current;
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        if (supportsScroll) {
          handleScroll(this$1.router, route, current, true);
        }
        if (!supportsPushState) {
          replaceHash(route.fullPath);
        }
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function getUrl (path) {
  var href = window.location.href;
  var i = href.indexOf('#');
  var base = i >= 0 ? href.slice(0, i) : href;
  return (base + "#" + path)
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (false) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "production" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(
    to,
    current || this.history.current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.0.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["a"] = (VueRouter);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__ = __webpack_require__(9);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5883dbcf_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__ = __webpack_require__(54);
function injectStyle (ssrContext) {
  __webpack_require__(28)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_App_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5883dbcf_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_App_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Home_vue__ = __webpack_require__(31);
//
//
//
//
//


/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    Home: __WEBPACK_IMPORTED_MODULE_0__Home_vue__["a" /* default */]
  },
  name: "App"
});


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TreeView_vue__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_header_vue__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_left_vue__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_right_vue__ = __webpack_require__(49);
//
//
//
//
//
//
//






/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    TreeView: __WEBPACK_IMPORTED_MODULE_0__TreeView_vue__["a" /* default */],
    Header: __WEBPACK_IMPORTED_MODULE_1__common_header_vue__["a" /* default */],
    Leftbar: __WEBPACK_IMPORTED_MODULE_2__common_left_vue__["a" /* default */],
    Right: __WEBPACK_IMPORTED_MODULE_3__common_right_vue__["a" /* default */]
  },
  name: "Home"
});


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_TreeView_vue__ = __webpack_require__(12);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3178fa82_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TreeView_vue__ = __webpack_require__(40);
function injectStyle (ssrContext) {
  __webpack_require__(34)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-3178fa82"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_TreeView_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_3178fa82_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TreeView_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__TreeViewItem_vue__ = __webpack_require__(36);
//
//
//
//
//


const menusData = [];
/* harmony default export */ __webpack_exports__["a"] = ({
  components: {
    TreeViewItem: __WEBPACK_IMPORTED_MODULE_0__TreeViewItem_vue__["a" /* default */]
  },
  name: "TreeViewMenu",
  data() {
    return {
      menus: this.$store.state.menusModule.menus
    };
  }
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "TreeViewItem",
  props: ["menus"],
  created() {
    this.$store.commit("firstInit", { url: this.$route.path });
  },
  methods: {
    toggle(menu) {
      this.$store.commit("findParents", { menu });
    }
  }
});


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_TreeView_vue__ = __webpack_require__(11);
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  data(){
    return{
      
    }
  },
  components:{
	TreeView: __WEBPACK_IMPORTED_MODULE_0__components_TreeView_vue__["a" /* default */]
  },
  methods:{
    
  }
});



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//



/* harmony default export */ __webpack_exports__["a"] = ({
  data(){
    return{
      
    }
  },
  components:{
 
  },
  methods:{
    
  }
});



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
  name: "TreeViewDetail",
  data() {
    return {
      currentRoute: this.$route.path
    };
  },
  watch: {
    //监听路由，只要路由有变化(路径，参数等变化)都有执行下面的函数
    $route: {
      handler: function(val, oldVal) {
        this.currentRoute = val.name;
      },
      deep: true
    }
  }
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css__);
//
//
//

    
    
    /* harmony default export */ __webpack_exports__["a"] = ({
        mounted: function () {
			let googleMapLayer = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.layer.Tile({
				source:new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.source.XYZ({
					url:"http://wprd0{1-4}.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}"
				})
			});
			let map = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.Map({
				layers: [
					googleMapLayer
				],
				target: 'map',
				view: new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.View({
					center: [12959773,4853101],
					zoom: 12
				}),
				controls: __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.control.defaults({
								zoom: false,
								attribution: false
				}),
			});
		},	
    });


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css__);
//
//
//

    
    
    /* harmony default export */ __webpack_exports__["a"] = ({
        mounted: function () {
            var projection = __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.proj.get("EPSG:3857");
            var resolutions = [];
            for (var i = 0; i < 19; i++) {
                resolutions[i] = Math.pow(2, 18 - i);
            }
            var tilegrid = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.tilegrid.TileGrid({
                origin: [0, 0],
                resolutions: resolutions
            });

            var baidu_source = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.source.TileImage({
                projection: projection,
                tileGrid: tilegrid,
                tileUrlFunction: function (tileCoord, pixelRatio, proj) {
                    if (!tileCoord) {
                        return "";
                    }
                    var z = tileCoord[0];
                    var x = tileCoord[1];
                    var y = tileCoord[2];

                    if (x < 0) {
                        x = "M" + (-x);
                    }
                    if (y < 0) {
                        y = "M" + (-y);
                    }

                    return "http://online3.map.bdimg.com/onlinelabel/?qt=tile&x=" + x + "&y=" + y + "&z=" + z + "&styles=pl&udt=20151021&scaler=1&p=1&ak=E4805d16520de693a3fe707cdc962045&customid=midnight";
                }
            });

            var baidu_layer = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.layer.Tile({
                source: baidu_source
            });
			
			let map = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.Map({
				layers: [
					baidu_layer
				],
				target: 'map',
				view: new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.View({
					center: [12959773,4853101],
					zoom: 12
                }),
                controls: __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.control.defaults({
								zoom: false,
								attribution: false
				}),
			});
		},	
    });


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css__);
//
//
//

    
    
    /* harmony default export */ __webpack_exports__["a"] = ({
        mounted: function () {
            let googleMapLayer = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.layer.Tile({
                source: new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.source.XYZ({
                   url:"http://mt0.google.cn/vt/lyrs=m@1&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}&s=Galil"  
                })
            })
			let map = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.Map({
				layers: [
					googleMapLayer
				],
				target: 'map',
				view: new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.View({
					center: [12959773,4853101],
					zoom: 12
				}),
                controls: __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.control.defaults({
								zoom: false,
								attribution: false
				}),
			});
		},	
    });


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__assets_styles_ol_css__);
//
//
//

    
    
    /* harmony default export */ __webpack_exports__["a"] = ({
        mounted: function () {
            let bingMap = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.layer.Tile({
                source: new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.source.BingMaps({
                    key: 'AkjzA7OhS4MIBjutL21bkAop7dc41HSE0CNTR5c6HJy8JKc7U9U9RveWJrylD3XJ',
                    imagerySet: 'Road'
                })
            });
			let map = new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.Map({
				layers: [
					bingMap
				],
				target: 'map',
				view: new __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.View({
					center: [12959773,4853101],
					zoom: 12
				}),
                controls: __WEBPACK_IMPORTED_MODULE_0__assets_libs_ol_js___default.a.control.defaults({
								zoom: false,
								attribution: false
				}),
			});
		},	
    });


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__checkbox_vue__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__singlebox_vue__ = __webpack_require__(78);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





    /* harmony default export */ __webpack_exports__["a"] = ({
        name:"Page05",
        components: {
            Mycheckbox: __WEBPACK_IMPORTED_MODULE_0__checkbox_vue__["a" /* default */],
            Singlebox: __WEBPACK_IMPORTED_MODULE_1__singlebox_vue__["a" /* default */]
        },
        data:function(){
            return {
                msg:"hreo",
                color:"color",
                inputdata:"",
                fruit: {//数据
                    apple: true,
                    peach: false
                },
                package: "peach"
            }
        },
        mounted: function () {},
        methods:{
            loadingdata(){
                alert("ok");
            },
        },	
    });


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name:"Mycheckbox",
    data:function(){
        return{}
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean,
        value: String
    },
    methods: {
        doThis() {
            this.$emit('change', !this.checked);
        }
    }              
});


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["a"] = ({
    name:"Singlebox",
    data:function(){
        return{}
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: String,
        value: String,
        name: String
    },
    methods: {
        doThis() {
            this.$emit('change', this.$refs.radio.value);
        }
    }              
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_App_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__router_router_js__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__store_index__ = __webpack_require__(83);


// import App from './app.vue'




__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].config.productionTip = false

const root = document.createElement('div');
document.body.appendChild(root);

new __WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */]({
	store: __WEBPACK_IMPORTED_MODULE_4__store_index__["a" /* default */],
	router:__WEBPACK_IMPORTED_MODULE_3__router_router_js__["a" /* default */],
	render:(h)=>h(__WEBPACK_IMPORTED_MODULE_2__components_App_vue__["a" /* default */])
}).$mount(root);


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(26);
// On some exotic environments, it's not clear which object `setimmeidate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(27)))

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("5a59787a", content, true, {});

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "*{padding:0;margin:0}#app{font-family:Avenir,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;color:#2c3e50}#app,.home,body,html{height:100%}body,html{overflow:hidden}", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__ = __webpack_require__(10);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_01224480_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__ = __webpack_require__(53);
function injectStyle (ssrContext) {
  __webpack_require__(32)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-01224480"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_Home_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_01224480_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_Home_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("74d83e00", content, true, {});

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".side-bar[data-v-01224480]{width:300px;height:100%;overflow-y:auto;overflow-x:hidden;font-size:14px;position:absolute;top:0;left:0}.continer[data-v-01224480]{padding-left:320px}", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("628e2cc3", content, true, {});

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".tree-view-menu[data-v-3178fa82]{width:300px;height:100%;overflow-y:auto;overflow-x:hidden}.tree-view-menu[data-v-3178fa82]::-webkit-scrollbar{height:6px;width:6px}.tree-view-menu[data-v-3178fa82]::-webkit-scrollbar-trac{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);box-shadow:inset 0 0 6px rgba(0,0,0,.3)}.tree-view-menu[data-v-3178fa82]::-webkit-scrollbar-thumb{outline:1px solid #333}.tree-view-menu[data-v-3178fa82]::-webkit-scrollbar{height:4px;width:4px}.tree-view-menu[data-v-3178fa82]::-webkit-scrollbar-track{-webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);box-shadow:inset 0 0 6px rgba(0,0,0,.3)}.tree-view-menu[data-v-3178fa82]::-webkit-scrollbar-thumb{background-color:#6e6e6e;outline:1px solid #708090}", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_TreeViewItem_vue__ = __webpack_require__(13);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5a9fea05_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TreeViewItem_vue__ = __webpack_require__(39);
function injectStyle (ssrContext) {
  __webpack_require__(37)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5a9fea05"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_TreeViewItem_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5a9fea05_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TreeViewItem_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(38);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("eb261122", content, true, {});

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "a[data-v-5a9fea05]{text-decoration:none;color:#333}.button[data-v-5a9fea05],.link[data-v-5a9fea05]{display:block;padding:10px 15px;transition:background-color .2s ease-in-out 0s,color .3s ease-in-out .1s;-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;-khtml-user-select:none;user-select:none}.button[data-v-5a9fea05]{position:relative}.button[data-v-5a9fea05]:hover,.link[data-v-5a9fea05]:hover{color:#1976d2;background-color:#eee;cursor:pointer}.icon[data-v-5a9fea05]{position:absolute;right:0;display:inline-block;height:24px;width:24px;fill:currentColor;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;transition-timing-function:ease-in-out}.heading-children[data-v-5a9fea05]{padding-left:14px;overflow:hidden}.expand[data-v-5a9fea05]{display:block}.collapsed[data-v-5a9fea05]{display:none}.expand .icon[data-v-5a9fea05]{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.selected[data-v-5a9fea05]{color:#1976d2}.fade-enter-active[data-v-5a9fea05]{transition:all .5s ease 0s}.fade-enter[data-v-5a9fea05]{opacity:0}.fade-enter-to[data-v-5a9fea05]{opacity:1}.fade-leave-to[data-v-5a9fea05]{height:0}", ""]);

// exports


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-view-item"},_vm._l((_vm.menus),function(menu){return _c('div',{key:menu.id,staticClass:"level",class:'level-'+ menu.level},[(menu.type === 'link')?_c('div',[_c('router-link',{staticClass:"link",attrs:{"to":menu.url},nativeOn:{"click":function($event){_vm.toggle(menu)}}},[_vm._v(_vm._s(menu.name))])],1):_vm._e(),_vm._v(" "),(menu.type === 'button')?_c('div',[_c('div',{staticClass:"button heading",class:{selected: menu.isSelected,expand:menu.isExpanded},on:{"click":function($event){_vm.toggle(menu)}}},[_vm._v("\n        "+_vm._s(menu.name)+"\n        "),_c('div',{staticClass:"icon"},[_c('svg',{attrs:{"xmlns":"http://www.w3.org/2000/svg","focusable":"false","viewBox":"0 0 24 24"}},[_c('path',{attrs:{"d":"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z "}})])])]),_vm._v(" "),_c('transition',{attrs:{"name":"fade"}},[(menu.subMenu)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(menu.isExpanded),expression:"menu.isExpanded"}],staticClass:"heading-children"},[_c('Tree-view-item',{attrs:{"menus":menu.subMenu}})],1):_vm._e()])],1):_vm._e()])}))}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tree-view-menu"},[_c('Tree-view-item',{attrs:{"menus":_vm.menus}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c99d96e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_header_vue__ = __webpack_require__(44);
function injectStyle (ssrContext) {
  __webpack_require__(42)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-5c99d96e"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_template_compiler_index_id_data_v_5c99d96e_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_header_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(43);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("12de0c36", content, true, {});

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".main-header[data-v-5c99d96e]{text-align:center}.main-header h1[data-v-5c99d96e]{font-size:100px;color:rgba(175,47,47,.4);font-weight:100;margin:20px}", ""]);

// exports


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _vm._m(0)}
var staticRenderFns = [function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('header',{staticClass:"main-header"},[_c('h1',[_vm._v("Vue Webpack")])])}]
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_left_vue__ = __webpack_require__(14);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1131addc_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_left_vue__ = __webpack_require__(48);
function injectStyle (ssrContext) {
  __webpack_require__(46)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-1131addc"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_left_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_1131addc_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_left_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(47);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("4f534cd0", content, true, {});

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#left[data-v-1131addc]{float:left;width:19%;height:300px;background:#7fffd4}.navwrapper[data-v-1131addc]{padding:10px;text-align:center}.nav[data-v-1131addc]{margin:10px;padding:5px;background:rgba(16,48,176,.302);text-decoration:none;display:block}.router-link-active>span[data-v-1131addc]{background:#faebd7;padding:5px;margin:-5px}.nav.router-link-active[data-v-1131addc]{background:#faebd7}.side-bar[data-v-1131addc]{width:300px;height:100%;overflow-y:auto;overflow-x:hidden;font-size:14px;position:absolute;top:0;left:0}", ""]);

// exports


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"side-bar"},[_c('Tree-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_right_vue__ = __webpack_require__(15);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_47317c56_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_right_vue__ = __webpack_require__(52);
function injectStyle (ssrContext) {
  __webpack_require__(50)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-47317c56"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_right_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_47317c56_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_right_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(51);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("740ad5ba", content, true, {});

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "#right[data-v-47317c56]{float:right;width:80%;height:300px;background:#7fffd4}.navwrapper[data-v-47317c56]{padding:10px;text-align:center}.nav[data-v-47317c56]{margin:10px;padding:5px;background:rgba(16,48,176,.302);text-decoration:none;display:block}.router-link-active>span[data-v-47317c56]{background:#faebd7;padding:5px;margin:-5px}.nav.router-link-active[data-v-47317c56]{background:#faebd7}.continer[data-v-47317c56]{padding-left:320px}", ""]);

// exports


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"continer"},[_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"home"},[_c('Header'),_vm._v(" "),_c('Leftbar'),_vm._v(" "),_c('Right')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"app"}},[_c('Home')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vue_router__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_App_vue__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_page01_vue__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_page02_vue__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_page03_vue__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_page04_vue__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_page05_vue__ = __webpack_require__(71);









__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */])
/* harmony default export */ __webpack_exports__["a"] = (new __WEBPACK_IMPORTED_MODULE_1_vue_router__["a" /* default */]({
  linkActiveClass: 'selected',
  routes: [{
      path: '/',
      name: 'App',
      component: __WEBPACK_IMPORTED_MODULE_2__components_App_vue__["a" /* default */]
    },
    {
      path: '/detail/quickstart',
      name: 'quickstart',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
        path: '/gaode',
        name: 'gaode',
        component: __WEBPACK_IMPORTED_MODULE_4__components_page01_vue__["a" /* default */]
    },
    {
        path: '/baidu',
        name: 'baidu',
        component: __WEBPACK_IMPORTED_MODULE_5__components_page02_vue__["a" /* default */]
    },
    {
        path: '/guge',
        name: 'google',
        component: __WEBPACK_IMPORTED_MODULE_6__components_page03_vue__["a" /* default */]
    },
    {
        path: '/biying',
        name: 'biying',
        component: __WEBPACK_IMPORTED_MODULE_7__components_page04_vue__["a" /* default */]
    },
    {
      path: '/detail/tutorial',
      name: 'tutorial',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/toh-pt1',
      name: 'toh-pt1',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/toh-pt2',
      name: 'toh-pt2',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/toh-pt3',
      name: 'toh-pt3',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/toh-pt4',
      name: 'toh-pt4',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/toh-pt5',
      name: 'toh-pt5',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/toh-pt6',
      name: 'toh-pt6',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/architecture',
      name: 'architecture',
      component: __WEBPACK_IMPORTED_MODULE_8__components_page05_vue__["a" /* default */]
    },
    {
      path: '/detail/displaying-data',
      name: 'displaying-data',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/template-syntax',
      name: 'template-syntax',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/lifecycle-hooks',
      name: 'lifecycle-hooks',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/component-interaction',
      name: 'component-interaction',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/component-styles',
      name: 'component-styles',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/dynamic-component-loader',
      name: 'dynamic-component-loader',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/attribute-directives',
      name: 'attribute-directives',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/structural-directives',
      name: 'structural-directives',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/pipes',
      name: 'pipes',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/animations',
      name: 'animations',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/user-input',
      name: 'user-input',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/forms',
      name: 'forms',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/form-validation',
      name: 'form-validation',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/reactive-forms',
      name: 'reactive-forms',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/dynamic-form',
      name: 'dynamic-form',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/bootstrapping',
      name: 'bootstrapping',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/ngmodule',
      name: 'ngmodule',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/ngmodule-faq',
      name: 'ngmodule-faq',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/dependency-injection',
      name: 'dependency-injection',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/hierarchical-dependency-injection',
      name: 'hierarchical-dependency-injection',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/dependency-injection-in-action',
      name: 'dependency-injection-in-action',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/http',
      name: 'http',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/router',
      name: 'router',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/testing',
      name: 'testing',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/cheatsheet',
      name: 'cheatsheet',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/i18n',
      name: 'i18n',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/language-service',
      name: 'language-service',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/security',
      name: 'security',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/setup',
      name: 'setup',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/setup-systemjs-anatomy',
      name: 'setup-systemjs-anatomy',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/browser-support',
      name: 'browser-support',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/npm-packages',
      name: 'npm-packages',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/typescript-configuration',
      name: 'typescript-configuration',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/aot-compiler',
      name: 'aot-compiler',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/metadata',
      name: 'metadata',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/deployment',
      name: 'deployment',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/upgrade',
      name: 'upgrade',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/ajs-quick-reference',
      name: 'ajs-quick-reference',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/visual-studio-2015',
      name: 'visual-studio-2015',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/styleguide',
      name: 'styleguide',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/glossary',
      name: 'glossary',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    },
    {
      path: '/detail/api',
      name: 'api',
      component: __WEBPACK_IMPORTED_MODULE_3__components_TreeViewDetail_vue__["a" /* default */]
    }
  ]
}));


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_TreeViewDetail_vue__ = __webpack_require__(16);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2608bf3a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TreeViewDetail_vue__ = __webpack_require__(59);
function injectStyle (ssrContext) {
  __webpack_require__(57)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-2608bf3a"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_TreeViewDetail_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2608bf3a_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_TreeViewDetail_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(58);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("23a3e14f", content, true, {});

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "h3[data-v-2608bf3a]{margin-top:10px;font-weight:400}", ""]);

// exports


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('h3',[_vm._v("\n        这里是"+_vm._s(_vm.currentRoute)+"内容详情\n    ")]),_vm._v(" "),_c('router-view')],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page01_vue__ = __webpack_require__(17);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a0052b32_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page01_vue__ = __webpack_require__(64);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page01_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_a0052b32_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page01_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".ol-control,.ol-scale-line{position:absolute;padding:2px}.ol-box{box-sizing:border-box;border-radius:2px;border:2px solid #00f}.ol-mouse-position{top:8px;right:8px;position:absolute}.ol-scale-line{background:#95b9e6;background:rgba(0,60,136,.3);border-radius:4px;bottom:8px;left:8px}.ol-scale-line-inner{border:1px solid #eee;border-top:none;color:#eee;font-size:10px;text-align:center;margin:1px;will-change:contents,width}.ol-overlay-container{will-change:left,right,top,bottom}.ol-unsupported{display:none}.ol-viewport .ol-unselectable{-webkit-touch-callout:none;-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;-webkit-tap-highlight-color:transparent}.ol-control{background-color:#eee;background-color:rgba(255,255,255,.4);border-radius:4px}.ol-control:hover{background-color:rgba(255,255,255,.6)}.ol-zoom{top:.5em;left:.5em}.ol-rotate{top:.5em;right:.5em;transition:opacity .25s linear,visibility 0s linear}.ol-rotate.ol-hidden{opacity:0;visibility:hidden;transition:opacity .25s linear,visibility 0s linear .25s}.ol-zoom-extent{top:4.643em;left:.5em}.ol-full-screen{right:.5em;top:.5em}@media print{.ol-control{display:none}}.ol-control button{display:block;margin:1px;padding:0;color:#fff;font-size:1.14em;font-weight:700;text-decoration:none;text-align:center;height:1.375em;width:1.375em;line-height:.4em;background-color:#7b98bc;background-color:rgba(0,60,136,.5);border:none;border-radius:2px}.ol-control button::-moz-focus-inner{border:none;padding:0}.ol-zoom-extent button{line-height:1.4em}.ol-compass{display:block;font-weight:400;font-size:1.2em;will-change:transform}.ol-touch .ol-control button{font-size:1.5em}.ol-touch .ol-zoom-extent{top:5.5em}.ol-control button:focus,.ol-control button:hover{text-decoration:none;background-color:#4c6079;background-color:rgba(0,60,136,.7)}.ol-zoom .ol-zoom-in{border-radius:2px 2px 0 0}.ol-zoom .ol-zoom-out{border-radius:0 0 2px 2px}.ol-attribution{text-align:right;bottom:.5em;right:.5em;max-width:calc(100% - 1.3em)}.ol-attribution ul{margin:0;padding:0 .5em;font-size:.7rem;line-height:1.375em;color:#000;text-shadow:0 0 2px #fff}.ol-attribution li{display:inline;list-style:none;line-height:inherit}.ol-attribution li:not(:last-child):after{content:\" \"}.ol-attribution img{max-height:2em;max-width:inherit;vertical-align:middle}.ol-attribution button,.ol-attribution ul{display:inline-block}.ol-attribution.ol-collapsed ul{display:none}.ol-attribution.ol-logo-only ul{display:block}.ol-attribution:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-attribution.ol-uncollapsible{bottom:0;right:0;border-radius:4px 0 0;height:1.1em;line-height:1em}.ol-attribution.ol-logo-only{background:0 0;bottom:.4em;height:1.1em;line-height:1em}.ol-attribution.ol-uncollapsible img{margin-top:-.2em;max-height:1.6em}.ol-attribution.ol-logo-only button,.ol-attribution.ol-uncollapsible button{display:none}.ol-zoomslider{top:4.5em;left:.5em;height:200px}.ol-zoomslider button{position:relative;height:10px}.ol-touch .ol-zoomslider{top:5.5em}.ol-overviewmap{left:.5em;bottom:.5em}.ol-overviewmap.ol-uncollapsible{bottom:0;left:0;border-radius:0 4px 0 0}.ol-overviewmap .ol-overviewmap-map,.ol-overviewmap button{display:inline-block}.ol-overviewmap .ol-overviewmap-map{border:1px solid #7b98bc;height:150px;margin:2px;width:150px}.ol-overviewmap:not(.ol-collapsed) button{bottom:1px;left:2px;position:absolute}.ol-overviewmap.ol-collapsed .ol-overviewmap-map,.ol-overviewmap.ol-uncollapsible button{display:none}.ol-overviewmap:not(.ol-collapsed){background:rgba(255,255,255,.8)}.ol-overviewmap-box{border:2px dotted rgba(0,60,136,.7)}", ""]);

// exports


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(63);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 63 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"map"}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page02_vue__ = __webpack_require__(18);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2caa2ee8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page02_vue__ = __webpack_require__(66);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page02_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_2caa2ee8_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page02_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"map"}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page03_vue__ = __webpack_require__(19);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_04792b8a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page03_vue__ = __webpack_require__(68);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page03_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_04792b8a_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page03_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"map"}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page04_vue__ = __webpack_require__(20);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_653c3c7b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page04_vue__ = __webpack_require__(70);
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page04_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_653c3c7b_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page04_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{attrs:{"id":"map"}})}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page05_vue__ = __webpack_require__(21);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8450bb14_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page05_vue__ = __webpack_require__(82);
function injectStyle (ssrContext) {
  __webpack_require__(72)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = "data-v-8450bb14"
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_page05_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_8450bb14_hasScoped_true_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_page05_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(73);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3a2359eb", content, true, {});

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, ".color[data-v-8450bb14]{background:#7fffd4}", ""]);

// exports


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__ = __webpack_require__(22);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_71dbc74f_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__ = __webpack_require__(77);
function injectStyle (ssrContext) {
  __webpack_require__(75)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_checkbox_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_71dbc74f_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_checkbox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(76);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("bcc962dc", content, true, {});

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 77 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',[_vm._v(_vm._s(_vm.value))]),_vm._v(" "),_c('input',{attrs:{"type":"checkbox"},domProps:{"checked":_vm.checked,"value":_vm.value},on:{"change":_vm.doThis}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_singlebox_vue__ = __webpack_require__(23);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23bf03ed_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_singlebox_vue__ = __webpack_require__(81);
function injectStyle (ssrContext) {
  __webpack_require__(79)
}
var normalizeComponent = __webpack_require__(0)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__node_modules_vue_loader_lib_selector_type_script_index_0_singlebox_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_23bf03ed_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_singlebox_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)

/* harmony default export */ __webpack_exports__["a"] = (Component.exports);


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(80);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("51ca465b", content, true, {});

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/***/ }),
/* 81 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',[_vm._v(_vm._s(_vm.value))]),_vm._v(" "),_c('input',{ref:"radio",attrs:{"name":_vm.name,"type":"radio"},domProps:{"checked":_vm.checked===_vm.value,"value":_vm.value},on:{"change":_vm.doThis}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 82 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{class:_vm.color},[_vm._v("target: "+_vm._s(_vm.msg))]),_vm._v(" "),_c('div',[_c('input',{attrs:{"type":"button","value":"load"},on:{"click":function($event){_vm.loadingdata()}}})]),_vm._v(" "),_c('div',[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.inputdata),expression:"inputdata"}],attrs:{"placeholder":"請輸入"},domProps:{"value":(_vm.inputdata)},on:{"input":function($event){if($event.target.composing){ return; }_vm.inputdata=$event.target.value}}})]),_vm._v(" "),_c('div',[_c('span',[_vm._v(_vm._s(_vm.inputdata))])]),_vm._v(" "),_c('Mycheckbox',{attrs:{"value":"peach"},model:{value:(_vm.fruit.peach),callback:function ($$v) {_vm.$set(_vm.fruit, "peach", $$v)},expression:"fruit.peach"}}),_vm._v(" "),_c('Mycheckbox',{attrs:{"value":"apple"},model:{value:(_vm.fruit.apple),callback:function ($$v) {_vm.$set(_vm.fruit, "apple", $$v)},expression:"fruit.apple"}}),_vm._v(" "),_c('Singlebox',{attrs:{"value":"peach","name":"myFruit"},model:{value:(_vm.package),callback:function ($$v) {_vm.package=$$v},expression:"package"}}),_vm._v(" "),_c('Singlebox',{attrs:{"value":"apple","name":"myFruit"},model:{value:(_vm.package),callback:function ($$v) {_vm.package=$$v},expression:"package"}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);

/***/ }),
/* 83 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_vuex__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__module_menusModule__ = __webpack_require__(85);



__WEBPACK_IMPORTED_MODULE_0_vue__["a" /* default */].use(__WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */]);
const store = new __WEBPACK_IMPORTED_MODULE_1_vuex__["a" /* default */].Store({
  modules: {
    menusModule: __WEBPACK_IMPORTED_MODULE_2__module_menusModule__["a" /* default */]
  }
})
/* harmony default export */ __webpack_exports__["a"] = (store);


/***/ }),
/* 84 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export Store */
/* unused harmony export install */
/* unused harmony export mapState */
/* unused harmony export mapMutations */
/* unused harmony export mapGetters */
/* unused harmony export mapActions */
/* unused harmony export createNamespacedHelpers */
/**
 * vuex v3.0.1
 * (c) 2017 Evan You
 * @license MIT
 */
var applyMixin = function (Vue) {
  var version = Number(Vue.version.split('.')[0]);

  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit });
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    var _init = Vue.prototype._init;
    Vue.prototype._init = function (options) {
      if ( options === void 0 ) options = {};

      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit;
      _init.call(this, options);
    };
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   */

  function vuexInit () {
    var options = this.$options;
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store;
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store;
    }
  }
};

var devtoolHook =
  typeof window !== 'undefined' &&
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

function devtoolPlugin (store) {
  if (!devtoolHook) { return }

  store._devtoolHook = devtoolHook;

  devtoolHook.emit('vuex:init', store);

  devtoolHook.on('vuex:travel-to-state', function (targetState) {
    store.replaceState(targetState);
  });

  store.subscribe(function (mutation, state) {
    devtoolHook.emit('vuex:mutation', mutation, state);
  });
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */


/**
 * forEach for object
 */
function forEachValue (obj, fn) {
  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

function isPromise (val) {
  return val && typeof val.then === 'function'
}

function assert (condition, msg) {
  if (!condition) { throw new Error(("[vuex] " + msg)) }
}

var Module = function Module (rawModule, runtime) {
  this.runtime = runtime;
  this._children = Object.create(null);
  this._rawModule = rawModule;
  var rawState = rawModule.state;
  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
};

var prototypeAccessors$1 = { namespaced: { configurable: true } };

prototypeAccessors$1.namespaced.get = function () {
  return !!this._rawModule.namespaced
};

Module.prototype.addChild = function addChild (key, module) {
  this._children[key] = module;
};

Module.prototype.removeChild = function removeChild (key) {
  delete this._children[key];
};

Module.prototype.getChild = function getChild (key) {
  return this._children[key]
};

Module.prototype.update = function update (rawModule) {
  this._rawModule.namespaced = rawModule.namespaced;
  if (rawModule.actions) {
    this._rawModule.actions = rawModule.actions;
  }
  if (rawModule.mutations) {
    this._rawModule.mutations = rawModule.mutations;
  }
  if (rawModule.getters) {
    this._rawModule.getters = rawModule.getters;
  }
};

Module.prototype.forEachChild = function forEachChild (fn) {
  forEachValue(this._children, fn);
};

Module.prototype.forEachGetter = function forEachGetter (fn) {
  if (this._rawModule.getters) {
    forEachValue(this._rawModule.getters, fn);
  }
};

Module.prototype.forEachAction = function forEachAction (fn) {
  if (this._rawModule.actions) {
    forEachValue(this._rawModule.actions, fn);
  }
};

Module.prototype.forEachMutation = function forEachMutation (fn) {
  if (this._rawModule.mutations) {
    forEachValue(this._rawModule.mutations, fn);
  }
};

Object.defineProperties( Module.prototype, prototypeAccessors$1 );

var ModuleCollection = function ModuleCollection (rawRootModule) {
  // register root module (Vuex.Store options)
  this.register([], rawRootModule, false);
};

ModuleCollection.prototype.get = function get (path) {
  return path.reduce(function (module, key) {
    return module.getChild(key)
  }, this.root)
};

ModuleCollection.prototype.getNamespace = function getNamespace (path) {
  var module = this.root;
  return path.reduce(function (namespace, key) {
    module = module.getChild(key);
    return namespace + (module.namespaced ? key + '/' : '')
  }, '')
};

ModuleCollection.prototype.update = function update$1 (rawRootModule) {
  update([], this.root, rawRootModule);
};

ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
    var this$1 = this;
    if ( runtime === void 0 ) runtime = true;

  if (false) {
    assertRawModule(path, rawModule);
  }

  var newModule = new Module(rawModule, runtime);
  if (path.length === 0) {
    this.root = newModule;
  } else {
    var parent = this.get(path.slice(0, -1));
    parent.addChild(path[path.length - 1], newModule);
  }

  // register nested modules
  if (rawModule.modules) {
    forEachValue(rawModule.modules, function (rawChildModule, key) {
      this$1.register(path.concat(key), rawChildModule, runtime);
    });
  }
};

ModuleCollection.prototype.unregister = function unregister (path) {
  var parent = this.get(path.slice(0, -1));
  var key = path[path.length - 1];
  if (!parent.getChild(key).runtime) { return }

  parent.removeChild(key);
};

function update (path, targetModule, newModule) {
  if (false) {
    assertRawModule(path, newModule);
  }

  // update target module
  targetModule.update(newModule);

  // update nested modules
  if (newModule.modules) {
    for (var key in newModule.modules) {
      if (!targetModule.getChild(key)) {
        if (false) {
          console.warn(
            "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
            'manual reload is needed'
          );
        }
        return
      }
      update(
        path.concat(key),
        targetModule.getChild(key),
        newModule.modules[key]
      );
    }
  }
}

var functionAssert = {
  assert: function (value) { return typeof value === 'function'; },
  expected: 'function'
};

var objectAssert = {
  assert: function (value) { return typeof value === 'function' ||
    (typeof value === 'object' && typeof value.handler === 'function'); },
  expected: 'function or object with "handler" function'
};

var assertTypes = {
  getters: functionAssert,
  mutations: functionAssert,
  actions: objectAssert
};

function assertRawModule (path, rawModule) {
  Object.keys(assertTypes).forEach(function (key) {
    if (!rawModule[key]) { return }

    var assertOptions = assertTypes[key];

    forEachValue(rawModule[key], function (value, type) {
      assert(
        assertOptions.assert(value),
        makeAssertionMessage(path, key, type, value, assertOptions.expected)
      );
    });
  });
}

function makeAssertionMessage (path, key, type, value, expected) {
  var buf = key + " should be " + expected + " but \"" + key + "." + type + "\"";
  if (path.length > 0) {
    buf += " in module \"" + (path.join('.')) + "\"";
  }
  buf += " is " + (JSON.stringify(value)) + ".";
  return buf
}

var Vue; // bind on install

var Store = function Store (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #731
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  if (false) {
    assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
    assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
    assert(this instanceof Store, "Store must be called with the new operator.");
  }

  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
  var strict = options.strict; if ( strict === void 0 ) strict = false;

  var state = options.state; if ( state === void 0 ) state = {};
  if (typeof state === 'function') {
    state = state() || {};
  }

  // store internal state
  this._committing = false;
  this._actions = Object.create(null);
  this._actionSubscribers = [];
  this._mutations = Object.create(null);
  this._wrappedGetters = Object.create(null);
  this._modules = new ModuleCollection(options);
  this._modulesNamespaceMap = Object.create(null);
  this._subscribers = [];
  this._watcherVM = new Vue();

  // bind commit and dispatch to self
  var store = this;
  var ref = this;
  var dispatch = ref.dispatch;
  var commit = ref.commit;
  this.dispatch = function boundDispatch (type, payload) {
    return dispatch.call(store, type, payload)
  };
  this.commit = function boundCommit (type, payload, options) {
    return commit.call(store, type, payload, options)
  };

  // strict mode
  this.strict = strict;

  // init root module.
  // this also recursively registers all sub-modules
  // and collects all module getters inside this._wrappedGetters
  installModule(this, state, [], this._modules.root);

  // initialize the store vm, which is responsible for the reactivity
  // (also registers _wrappedGetters as computed properties)
  resetStoreVM(this, state);

  // apply plugins
  plugins.forEach(function (plugin) { return plugin(this$1); });

  if (Vue.config.devtools) {
    devtoolPlugin(this);
  }
};

var prototypeAccessors = { state: { configurable: true } };

prototypeAccessors.state.get = function () {
  return this._vm._data.$$state
};

prototypeAccessors.state.set = function (v) {
  if (false) {
    assert(false, "Use store.replaceState() to explicit replace store state.");
  }
};

Store.prototype.commit = function commit (_type, _payload, _options) {
    var this$1 = this;

  // check object-style commit
  var ref = unifyObjectStyle(_type, _payload, _options);
    var type = ref.type;
    var payload = ref.payload;
    var options = ref.options;

  var mutation = { type: type, payload: payload };
  var entry = this._mutations[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown mutation type: " + type));
    }
    return
  }
  this._withCommit(function () {
    entry.forEach(function commitIterator (handler) {
      handler(payload);
    });
  });
  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });

  if (
    false
  ) {
    console.warn(
      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
      'Use the filter functionality in the vue-devtools'
    );
  }
};

Store.prototype.dispatch = function dispatch (_type, _payload) {
    var this$1 = this;

  // check object-style dispatch
  var ref = unifyObjectStyle(_type, _payload);
    var type = ref.type;
    var payload = ref.payload;

  var action = { type: type, payload: payload };
  var entry = this._actions[type];
  if (!entry) {
    if (false) {
      console.error(("[vuex] unknown action type: " + type));
    }
    return
  }

  this._actionSubscribers.forEach(function (sub) { return sub(action, this$1.state); });

  return entry.length > 1
    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
    : entry[0](payload)
};

Store.prototype.subscribe = function subscribe (fn) {
  return genericSubscribe(fn, this._subscribers)
};

Store.prototype.subscribeAction = function subscribeAction (fn) {
  return genericSubscribe(fn, this._actionSubscribers)
};

Store.prototype.watch = function watch (getter, cb, options) {
    var this$1 = this;

  if (false) {
    assert(typeof getter === 'function', "store.watch only accepts a function.");
  }
  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
};

Store.prototype.replaceState = function replaceState (state) {
    var this$1 = this;

  this._withCommit(function () {
    this$1._vm._data.$$state = state;
  });
};

Store.prototype.registerModule = function registerModule (path, rawModule, options) {
    if ( options === void 0 ) options = {};

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
    assert(path.length > 0, 'cannot register the root module by using registerModule.');
  }

  this._modules.register(path, rawModule);
  installModule(this, this.state, path, this._modules.get(path), options.preserveState);
  // reset store to update getters...
  resetStoreVM(this, this.state);
};

Store.prototype.unregisterModule = function unregisterModule (path) {
    var this$1 = this;

  if (typeof path === 'string') { path = [path]; }

  if (false) {
    assert(Array.isArray(path), "module path must be a string or an Array.");
  }

  this._modules.unregister(path);
  this._withCommit(function () {
    var parentState = getNestedState(this$1.state, path.slice(0, -1));
    Vue.delete(parentState, path[path.length - 1]);
  });
  resetStore(this);
};

Store.prototype.hotUpdate = function hotUpdate (newOptions) {
  this._modules.update(newOptions);
  resetStore(this, true);
};

Store.prototype._withCommit = function _withCommit (fn) {
  var committing = this._committing;
  this._committing = true;
  fn();
  this._committing = committing;
};

Object.defineProperties( Store.prototype, prototypeAccessors );

function genericSubscribe (fn, subs) {
  if (subs.indexOf(fn) < 0) {
    subs.push(fn);
  }
  return function () {
    var i = subs.indexOf(fn);
    if (i > -1) {
      subs.splice(i, 1);
    }
  }
}

function resetStore (store, hot) {
  store._actions = Object.create(null);
  store._mutations = Object.create(null);
  store._wrappedGetters = Object.create(null);
  store._modulesNamespaceMap = Object.create(null);
  var state = store.state;
  // init all modules
  installModule(store, state, [], store._modules.root, true);
  // reset vm
  resetStoreVM(store, state, hot);
}

function resetStoreVM (store, state, hot) {
  var oldVm = store._vm;

  // bind store public getters
  store.getters = {};
  var wrappedGetters = store._wrappedGetters;
  var computed = {};
  forEachValue(wrappedGetters, function (fn, key) {
    // use computed to leverage its lazy-caching mechanism
    computed[key] = function () { return fn(store); };
    Object.defineProperty(store.getters, key, {
      get: function () { return store._vm[key]; },
      enumerable: true // for local getters
    });
  });

  // use a Vue instance to store the state tree
  // suppress warnings just in case the user has added
  // some funky global mixins
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  store._vm = new Vue({
    data: {
      $$state: state
    },
    computed: computed
  });
  Vue.config.silent = silent;

  // enable strict mode for new vm
  if (store.strict) {
    enableStrictMode(store);
  }

  if (oldVm) {
    if (hot) {
      // dispatch changes in all subscribed watchers
      // to force getter re-evaluation for hot reloading.
      store._withCommit(function () {
        oldVm._data.$$state = null;
      });
    }
    Vue.nextTick(function () { return oldVm.$destroy(); });
  }
}

function installModule (store, rootState, path, module, hot) {
  var isRoot = !path.length;
  var namespace = store._modules.getNamespace(path);

  // register in namespace map
  if (module.namespaced) {
    store._modulesNamespaceMap[namespace] = module;
  }

  // set state
  if (!isRoot && !hot) {
    var parentState = getNestedState(rootState, path.slice(0, -1));
    var moduleName = path[path.length - 1];
    store._withCommit(function () {
      Vue.set(parentState, moduleName, module.state);
    });
  }

  var local = module.context = makeLocalContext(store, namespace, path);

  module.forEachMutation(function (mutation, key) {
    var namespacedType = namespace + key;
    registerMutation(store, namespacedType, mutation, local);
  });

  module.forEachAction(function (action, key) {
    var type = action.root ? key : namespace + key;
    var handler = action.handler || action;
    registerAction(store, type, handler, local);
  });

  module.forEachGetter(function (getter, key) {
    var namespacedType = namespace + key;
    registerGetter(store, namespacedType, getter, local);
  });

  module.forEachChild(function (child, key) {
    installModule(store, rootState, path.concat(key), child, hot);
  });
}

/**
 * make localized dispatch, commit, getters and state
 * if there is no namespace, just use root ones
 */
function makeLocalContext (store, namespace, path) {
  var noNamespace = namespace === '';

  var local = {
    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      return store.dispatch(type, payload)
    },

    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
      var args = unifyObjectStyle(_type, _payload, _options);
      var payload = args.payload;
      var options = args.options;
      var type = args.type;

      if (!options || !options.root) {
        type = namespace + type;
        if (false) {
          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
          return
        }
      }

      store.commit(type, payload, options);
    }
  };

  // getters and state object must be gotten lazily
  // because they will be changed by vm update
  Object.defineProperties(local, {
    getters: {
      get: noNamespace
        ? function () { return store.getters; }
        : function () { return makeLocalGetters(store, namespace); }
    },
    state: {
      get: function () { return getNestedState(store.state, path); }
    }
  });

  return local
}

function makeLocalGetters (store, namespace) {
  var gettersProxy = {};

  var splitPos = namespace.length;
  Object.keys(store.getters).forEach(function (type) {
    // skip if the target getter is not match this namespace
    if (type.slice(0, splitPos) !== namespace) { return }

    // extract local getter type
    var localType = type.slice(splitPos);

    // Add a port to the getters proxy.
    // Define as getter property because
    // we do not want to evaluate the getters in this time.
    Object.defineProperty(gettersProxy, localType, {
      get: function () { return store.getters[type]; },
      enumerable: true
    });
  });

  return gettersProxy
}

function registerMutation (store, type, handler, local) {
  var entry = store._mutations[type] || (store._mutations[type] = []);
  entry.push(function wrappedMutationHandler (payload) {
    handler.call(store, local.state, payload);
  });
}

function registerAction (store, type, handler, local) {
  var entry = store._actions[type] || (store._actions[type] = []);
  entry.push(function wrappedActionHandler (payload, cb) {
    var res = handler.call(store, {
      dispatch: local.dispatch,
      commit: local.commit,
      getters: local.getters,
      state: local.state,
      rootGetters: store.getters,
      rootState: store.state
    }, payload, cb);
    if (!isPromise(res)) {
      res = Promise.resolve(res);
    }
    if (store._devtoolHook) {
      return res.catch(function (err) {
        store._devtoolHook.emit('vuex:error', err);
        throw err
      })
    } else {
      return res
    }
  });
}

function registerGetter (store, type, rawGetter, local) {
  if (store._wrappedGetters[type]) {
    if (false) {
      console.error(("[vuex] duplicate getter key: " + type));
    }
    return
  }
  store._wrappedGetters[type] = function wrappedGetter (store) {
    return rawGetter(
      local.state, // local state
      local.getters, // local getters
      store.state, // root state
      store.getters // root getters
    )
  };
}

function enableStrictMode (store) {
  store._vm.$watch(function () { return this._data.$$state }, function () {
    if (false) {
      assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
    }
  }, { deep: true, sync: true });
}

function getNestedState (state, path) {
  return path.length
    ? path.reduce(function (state, key) { return state[key]; }, state)
    : state
}

function unifyObjectStyle (type, payload, options) {
  if (isObject(type) && type.type) {
    options = payload;
    payload = type;
    type = type.type;
  }

  if (false) {
    assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
  }

  return { type: type, payload: payload, options: options }
}

function install (_Vue) {
  if (Vue && _Vue === Vue) {
    if (false) {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      );
    }
    return
  }
  Vue = _Vue;
  applyMixin(Vue);
}

var mapState = normalizeNamespace(function (namespace, states) {
  var res = {};
  normalizeMap(states).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedState () {
      var state = this.$store.state;
      var getters = this.$store.getters;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
        if (!module) {
          return
        }
        state = module.context.state;
        getters = module.context.getters;
      }
      return typeof val === 'function'
        ? val.call(this, state, getters)
        : state[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapMutations = normalizeNamespace(function (namespace, mutations) {
  var res = {};
  normalizeMap(mutations).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedMutation () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var commit = this.$store.commit;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapMutations', namespace);
        if (!module) {
          return
        }
        commit = module.context.commit;
      }
      return typeof val === 'function'
        ? val.apply(this, [commit].concat(args))
        : commit.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var mapGetters = normalizeNamespace(function (namespace, getters) {
  var res = {};
  normalizeMap(getters).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    val = namespace + val;
    res[key] = function mappedGetter () {
      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
        return
      }
      if (false) {
        console.error(("[vuex] unknown getter: " + val));
        return
      }
      return this.$store.getters[val]
    };
    // mark vuex getter for devtools
    res[key].vuex = true;
  });
  return res
});

var mapActions = normalizeNamespace(function (namespace, actions) {
  var res = {};
  normalizeMap(actions).forEach(function (ref) {
    var key = ref.key;
    var val = ref.val;

    res[key] = function mappedAction () {
      var args = [], len = arguments.length;
      while ( len-- ) args[ len ] = arguments[ len ];

      var dispatch = this.$store.dispatch;
      if (namespace) {
        var module = getModuleByNamespace(this.$store, 'mapActions', namespace);
        if (!module) {
          return
        }
        dispatch = module.context.dispatch;
      }
      return typeof val === 'function'
        ? val.apply(this, [dispatch].concat(args))
        : dispatch.apply(this.$store, [val].concat(args))
    };
  });
  return res
});

var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };

function normalizeMap (map) {
  return Array.isArray(map)
    ? map.map(function (key) { return ({ key: key, val: key }); })
    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
}

function normalizeNamespace (fn) {
  return function (namespace, map) {
    if (typeof namespace !== 'string') {
      map = namespace;
      namespace = '';
    } else if (namespace.charAt(namespace.length - 1) !== '/') {
      namespace += '/';
    }
    return fn(namespace, map)
  }
}

function getModuleByNamespace (store, helper, namespace) {
  var module = store._modulesNamespaceMap[namespace];
  if (false) {
    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
  }
  return module
}

var index_esm = {
  Store: Store,
  install: install,
  version: '3.0.1',
  mapState: mapState,
  mapMutations: mapMutations,
  mapGetters: mapGetters,
  mapActions: mapActions,
  createNamespacedHelpers: createNamespacedHelpers
};


/* harmony default export */ __webpack_exports__["a"] = (index_esm);


/***/ }),
/* 85 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
let menus = [
    { id: 1, level: 1, name: '主页', type: "link", url: "/detail/quickstart" },
    {
      id: 2,
      level: 1,
      name: '地图',
      type: "button",
      isExpanded: false,
      isSelected: false,
      subMenu: [
        { id: 21, level: 2, name: '高德地图', type: "link", url: "/gaode" },
        { id: 22, level: 2, name: '百度地图', type: "link", url: "/baidu" },
        { id: 23, level: 2, name: '谷歌地图', type: "link", url: "/guge" },
        { id: 24, level: 2, name: '必应地图', type: "link", url: "/biying" },
        // { id: 25, level: 2, name: '服务', type: "link", url: "/detail/toh-pt4" },
        // { id: 26, level: 2, name: '路由', type: "link", url: "/detail/toh-pt5" },
        // { id: 27, level: 2, name: 'HTTP', type: "link", url: "/detail/toh-pt6" },
      ]
    },
    {
      id: 3,
      level: 1,
      name: '组件',
      type: "button",
      isExpanded: false,
      isSelected: false,
      subMenu: [
        { id: 31, level: 2, name: '架构', type: "link", url: "/detail/architecture" },
        // {
        //   id: 32,
        //   level: 2,
        //   name: '模板与数据绑定',
        //   type: "button",
        //   isExpanded: false,
        //   isSelected: false,
        //   subMenu: [
        //     { id: 321, level: 3, name: '显示数据', type: "link", url: "/detail/displaying-data" },
        //     { id: 322, level: 3, name: '模板语法', type: "link", url: "/detail/template-syntax" },
        //     { id: 323, level: 3, name: '生命周期钩子', type: "link", url: "/detail/lifecycle-hooks" },
        //     { id: 324, level: 3, name: '组件交互', type: "link", url: "/detail/component-interaction" },
        //     { id: 325, level: 3, name: '组件样式', type: "link", url: "/detail/component-styles" },
        //     { id: 326, level: 3, name: '动态组件', type: "link", url: "/detail/dynamic-component-loader" },
        //     { id: 327, level: 3, name: '属性型指令', type: "link", url: "/detail/attribute-directives" },
        //     { id: 328, level: 3, name: '结构型指令', type: "link", url: "/detail/structural-directives" },
        //     { id: 329, level: 3, name: '管道', type: "link", url: "/detail/pipes" },
        //     { id: 3210, level: 3, name: '动画', type: "link", url: "/detail/animations" },
        //   ]
        // },
        {
          id: 33,
          level: 2,
          name: '表单',
          type: "button",
          isExpanded: false,
          isSelected: false,
          subMenu: [
            { name: '用户输入', type: "link", url: "/detail/user-input" },
            { name: '模板驱动表单', type: "link", url: "/detail/forms" },
            { name: '表单验证', type: "link", url: "/detail/form-validation" },
            { name: '响应式表单', type: "link", url: "/detail/reactive-forms" },
            { name: '动态表单', type: "link", url: "/detail/dynamic-form" }
          ]
        },
        { id: 34, level: 2, name: '3', type: "link", url: "/detail/bootstrapping" },
        {
          id: 35,
          level: 2,
          name: '4',
          type: "button",
          isExpanded: false,
          isSelected: false,
          subMenu: [
            { id: 341, level: 3, name: '1', type: "link", url: "/detail/ngmodule" },
            { id: 342, level: 3, name: '2', type: "link", url: "/detail/ngmodule-faq" }
          ]
        },
        {
          id: 36,
          level: 2,
          name: '5',
          type: "button",
          isExpanded: false,
          isSelected: false,
          subMenu: [
            { id: 361, level: 3, name: '1', type: "link", url: "/detail/dependency-injection" },
            { id: 362, level: 3, name: '2', type: "link", url: "/detail/hierarchical-dependency-injection" },
            { id: 363, level: 3, name: '3', type: "link", url: "/detail/dependency-injection-in-action" }
          ]
        },
        { id: 37, level: 2, name: '5', type: "link", url: "/detail/http" },
        { id: 38, level: 2, name: '6', type: "link", url: "/detail/router" },
        { id: 39, level: 2, name: '7', type: "link", url: "/detail/testing" },
        { id: 310, level: 2, name: '8', type: "link", url: "/detail/cheatsheet" },
      ]
    },
    {
      id: 4,
      level: 1,
      name: '其它',
      type: "button",
      isExpanded: false,
      isSelected: false,
      subMenu: [
        { id: 41, level: 2, name: '1', type: "link", url: "/detail/i18n" },
        { id: 42, level: 2, name: '2', type: "link", url: "/detail/language-service" },
        { id: 43, level: 2, name: '3', type: "link", url: "/detail/security" },
        {
          id: 44,
          level: 2,
          name: '4',
          type: "button",
          isExpanded: false,
          isSelected: false,
          subMenu: [
            { id: 441, level: 3, name: '1', type: "link", url: "/detail/setup" },
            { id: 442, level: 3, name: '2', type: "link", url: "/detail/setup-systemjs-anatomy" },
            { id: 443, level: 3, name: '3', type: "link", url: "/detail/browser-support" },
            { id: 444, level: 3, name: '4', type: "link", url: "/detail/npm-packages" },
            { id: 445, level: 3, name: '5', type: "link", url: "/detail/typescript-configuration" },
            { id: 446, level: 3, name: '6', type: "link", url: "/detail/aot-compiler" },
            { id: 447, level: 3, name: '7', type: "link", url: "/detail/metadata" },
            { id: 448, level: 3, name: '8', type: "link", url: "/detail/deployment" }
          ]
        },
        {
          id: 45,
          level: 2,
          name: '介绍',
          type: "button",
          isExpanded: false,
          isSelected: false,
          subMenu: [
            { id: 451, level: 3, name: '1', type: "link", url: "/detail/upgrade" },
            { id: 452, level: 3, name: '2', type: "link", url: "/detail/ajs-quick-reference" }
          ]
        },
        { id: 46, level: 2, name: '7', type: "link", url: "/detail/visual-studio-2015" },
        { id: 47, level: 2, name: '8', type: "link", url: "/detail/styleguide" },
        { id: 48, level: 2, name: '9', type: "link", url: "/detail/glossary" }
      ]
    },
    { id: 5, level: 1, name: '合作伙伴', type: "link", url: "/detail/api" }
  ];
  let levelNum = 1;
  let startExpand = []; // 保存刷新后当前要展开的菜单项
  function setExpand(source, url) {
    let sourceItem = '';
    for (let i = 0; i < source.length; i++) {
      sourceItem = JSON.stringify(source[i]); // 把菜单项转为字符串
      if (sourceItem.indexOf(url) > -1) { // 查找当前 URL 所对应的子菜单属于哪一个祖先菜单
        if (source[i].type === 'button') { // 导航菜单为按钮
          source[i].isSelected = true; // 设置选中高亮
          source[i].isExpanded = true; // 设置为展开
          startExpand.push(source[i]);
          // 递归下一级菜单，以此类推
          setExpand(source[i].subMenu, url);
        }
        break;
      }
    }
  }
  const state = {
    menus,
    levelNum
  };
  const mutations = {
    findParents(state, payload) {
      if (payload.menu.type === "button") {
        payload.menu.isExpanded = !payload.menu.isExpanded;
      } else if (payload.menu.type === "link") {
        if (startExpand.length > 0) {
          for (let i = 0; i < startExpand.length; i++) {
            startExpand[i].isSelected = false;
          }
        }
        startExpand = []; // 清空展开菜单记录项
        setExpand(state.menus, payload.menu.url);
      };
    },
    firstInit(state, payload) {
      setExpand(state.menus, payload.url);
    }
  }
  /* harmony default export */ __webpack_exports__["a"] = ({
    state,
    mutations
  });


/***/ })
/******/ ]);