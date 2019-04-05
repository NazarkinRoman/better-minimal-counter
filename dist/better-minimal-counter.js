(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BetterMinimalCounter=f()}})(function(){var define,module,exports;return function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){var domify=require("domify"),classes=require("classlist"),transformProperty=require("transform-property");module.exports=BetterMinimalCounter;function BetterMinimalCounter(value){var self=this;this.intervals=[];this.prevShifts=[];this.el=domify('<div class="better-minimal-counter"/>');this.value=value||100;this.value.toString().split("").forEach(self.addCharacter.bind(this));this.update(this.value)}BetterMinimalCounter.prototype.addCharacter=function(){var digit=domify('<div class="character"/>'),sequence=domify('<div class="sequence is-hidden">'+[9,8,7,6,5,4,3,2,1,0].join("\n")+"</div>");digit.appendChild(sequence);this.el.appendChild(digit)};BetterMinimalCounter.prototype.update=function(number){var numberWithSpaces=function(x){return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g," ")};var self=this,characters=numberWithSpaces(number).split("").reverse(),digitElements=this.el.children,diff=digitElements.length-characters.length;if(diff<0){while(diff++)this.addCharacter();digitElements=this.el.children}else{while(diff--)characters.push(-1)}for(var index=0;index<characters.length;index+=1){var character=characters[index],shift=-(9-parseInt(character,10))*10,elIndex=digitElements.length-index-1,element=digitElements[elIndex].children[0];if(character===" "){classes(digitElements[elIndex]).add("is-space")}else{classes(digitElements[elIndex]).remove("is-space");character=parseInt(character,10)}if(character===-1){classes(element).add("is-hidden")}else{classes(element).remove("is-hidden");element.style[transformProperty]="translate(0, "+shift+"%)"}this.prevShifts[index]=shift}}},{classlist:2,domify:3,"transform-property":4}],2:[function(require,module,exports){module.exports=ClassList;var arr=Array.prototype;function ClassList(elem){if(!(this instanceof ClassList)){return new ClassList(elem)}var className=elem.className.replace(/^\s+|\s+$/g,"");var classes=className.split(/\s+/);this._elem=elem;this.length=0;if(!className)return;for(var i=0;i<classes.length;i+=1){arr.push.call(this,classes[i])}}ClassList.prototype.item=function(index){if(index>=this.length){return null}return this[index]};ClassList.prototype.add=function(){for(var i=0;i<arguments.length;i+=1){var token=String(arguments[i]);if(indexOf(this,token)>=0){continue}arr.push.call(this,token)}this._elem.className=this.toString()};ClassList.prototype.remove=function(){for(var i=0;i<arguments.length;i+=1){var token=String(arguments[i]);var index=indexOf(this,token);if(index<0)continue;arr.splice.call(this,index,1)}this._elem.className=this.toString()};ClassList.prototype.contains=function(token){return indexOf(this,String(token))>=0};ClassList.prototype.toggle=function(token,force){if(force!==undefined){if(force){this.add(token)}else{this.remove(token)}}else{if(this.contains(token)){this.remove(token)}else{this.add(token)}}return this.contains(token)};ClassList.prototype.replace=function(token,newToken){var index=indexOf(this,token);if(index<0){return false}arr.splice.call(this,index,1,newToken);this._elem.className=this.toString();return true};ClassList.prototype.toString=function(){return arr.join.call(this," ")};function indexOf(array,item){var len=array.length;for(var i=0;i<len;i+=1){if(array[i]===item){return i}}return-1}},{}],3:[function(require,module,exports){module.exports=parse;var innerHTMLBug=false;var bugTestDiv;if(typeof document!=="undefined"){bugTestDiv=document.createElement("div");bugTestDiv.innerHTML='  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';innerHTMLBug=!bugTestDiv.getElementsByTagName("link").length;bugTestDiv=undefined}var map={legend:[1,"<fieldset>","</fieldset>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],_default:innerHTMLBug?[1,"X<div>","</div>"]:[0,"",""]};map.td=map.th=[3,"<table><tbody><tr>","</tr></tbody></table>"];map.option=map.optgroup=[1,'<select multiple="multiple">',"</select>"];map.thead=map.tbody=map.colgroup=map.caption=map.tfoot=[1,"<table>","</table>"];map.polyline=map.ellipse=map.polygon=map.circle=map.text=map.line=map.path=map.rect=map.g=[1,'<svg xmlns="http://www.w3.org/2000/svg" version="1.1">',"</svg>"];function parse(html,doc){if("string"!=typeof html)throw new TypeError("String expected");if(!doc)doc=document;var m=/<([\w:]+)/.exec(html);if(!m)return doc.createTextNode(html);html=html.replace(/^\s+|\s+$/g,"");var tag=m[1];if(tag=="body"){var el=doc.createElement("html");el.innerHTML=html;return el.removeChild(el.lastChild)}var wrap=map[tag]||map._default;var depth=wrap[0];var prefix=wrap[1];var suffix=wrap[2];var el=doc.createElement("div");el.innerHTML=prefix+html+suffix;while(depth--)el=el.lastChild;if(el.firstChild==el.lastChild){return el.removeChild(el.firstChild)}var fragment=doc.createDocumentFragment();while(el.firstChild){fragment.appendChild(el.removeChild(el.firstChild))}return fragment}},{}],4:[function(require,module,exports){var styles=["webkitTransform","MozTransform","msTransform","OTransform","transform"];var el=document.createElement("p");var style;for(var i=0;i<styles.length;i++){style=styles[i];if(null!=el.style[style]){module.exports=style;break}}},{}]},{},[1])(1)});
