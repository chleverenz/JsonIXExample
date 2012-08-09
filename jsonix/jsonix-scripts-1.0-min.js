/*
 * Jsonix is a JavaScript library which allows you to convert between XML
 * and JavaScript object structures.
 *
 * Copyright (C) 2010  Aleksei Valikov, Highsource.org
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

var Jsonix={singleFile:true};
Jsonix.Util={};
Jsonix.Util.extend=function(g,h){g=g||{};
if(h){for(var i in h){var j=h[i];
if(j!==undefined){g[i]=j
}}var f=typeof window.Event=="function"&&h instanceof window.Event;
if(!f&&h.hasOwnProperty&&h.hasOwnProperty("toString")){g.toString=h.toString
}}return g
};
Jsonix.Class=function(){var n=function(){this.initialize.apply(this,arguments)
};
var p={};
var k=function(){};
var l,i,o;
for(var m=0,j=arguments.length;
m<j;
++m){o=arguments[m];
if(typeof o=="function"){if(m===0&&j>1){i=o.prototype.initialize;
o.prototype.initialize=k;
p=new o();
if(i===undefined){delete o.prototype.initialize
}else{o.prototype.initialize=i
}}l=o.prototype
}else{l=o
}Jsonix.Util.extend(p,l)
}n.prototype=p;
return n
};
Jsonix.XML={};
Jsonix.DOM={createDocument:function(){if(document.implementation&&document.implementation.createDocument){return document.implementation.createDocument("","",null)
}else{var b=new ActiveXObject("MSXML2.DOMDocument");
return b
}},serialize:function(b){Jsonix.Util.Ensure.ensureExists(b);
if(typeof XMLSerializer!=="undefined"){return(new XMLSerializer()).serializeToString(b)
}else{if(Jsonix.Util.Type.exists(b.xml)){return b.xml
}else{throw"Could not serialize the node, neither XMLSerializer nor the [xml] property were found."
}}},parse:function(g){Jsonix.Util.Ensure.ensureExists(g);
if(typeof DOMParser!="undefined"){return(new DOMParser()).parseFromString(g,"application/xml")
}else{if(typeof ActiveXObject!="undefined"){var h=Jsonix.DOM.createDocument("","");
h.loadXML(g);
return h
}else{var f="data:text/xml;charset=utf-8,"+encodeURIComponent(g);
var e=new XMLHttpRequest();
e.open("GET",f,false);
if(e.overrideMimeType){e.overrideMimeType("text/xml")
}e.send(null);
return e.responseXML
}}},load:function(e,g,f){var h=Jsonix.Request.INSTANCE;
h.issue(e,function(a){var b;
if(Jsonix.Util.Type.exists(a.responseXML)&&Jsonix.Util.Type.exists(a.responseXML.documentElement)){b=a.responseXML
}else{if(Jsonix.Util.Type.isString(a.responseText)){b=Jsonix.DOM.parse(a.responseText)
}else{throw"Response does not have valid [responseXML] or [responseText]."
}}g(b)
},function(a){throw"Could not retrieve XML from URL ["+e+"]."
},f)
}};
Jsonix.Request=Jsonix.Class({factories:[function(){return new XMLHttpRequest()
},function(){return new ActiveXObject("Msxml2.XMLHTTP")
},function(){return new ActiveXObject("Msxml2.XMLHTTP.6.0")
},function(){return new ActiveXObject("Msxml2.XMLHTTP.3.0")
},function(){return new ActiveXObject("Microsoft.XMLHTTP")
}],initialize:function(){},issue:function(y,q,x,n){Jsonix.Util.Ensure.ensureString(y);
if(Jsonix.Util.Type.exists(q)){Jsonix.Util.Ensure.ensureFunction(q)
}else{q=function(){}
}if(Jsonix.Util.Type.exists(x)){Jsonix.Util.Ensure.ensureFunction(x)
}else{x=function(){}
}if(Jsonix.Util.Type.exists(n)){Jsonix.Util.Ensure.ensureObject(n)
}else{n={}
}var w=this.createTransport();
var z=Jsonix.Util.Type.isString(n.method)?n.method:"GET";
var v=Jsonix.Util.Type.isBoolean(n.async)?n.async:true;
var p=Jsonix.Util.Type.isString(n.proxy)?n.proxy:Jsonix.Request.PROXY;
var u=Jsonix.Util.Type.isString(n.user)?n.user:null;
var o=Jsonix.Util.Type.isString(n.password)?n.password:null;
if(Jsonix.Util.Type.isString(p)&&(y.indexOf("http")===0)){y=p+encodeURIComponent(y)
}if(Jsonix.Util.Type.isString(u)){w.open(z,y,v,u,o)
}else{w.open(z,y,v)
}if(Jsonix.Util.Type.isObject(n.headers)){for(var s in n.headers){if(n.headers.hasOwnProperty(s)){w.setRequestHeader(s,n.headers[s])
}}}var t=Jsonix.Util.Type.exists(n.data)?n.data:null;
if(!v){w.send(t);
this.handleTransport(w,q,x)
}else{var r=this;
w.onreadystatechange=function(){r.handleTransport(w,q,x)
};
window.setTimeout(function(){w.send(t)
},0)
}return w
},handleTransport:function(f,d,e){if(f.readyState==4){if(!f.status||(f.status>=200&&f.status<300)){d(f)
}if(f.status&&(f.status<200||f.status>=300)){e(f)
}}},createTransport:function(){for(var f=0,e=this.factories.length;
f<e;
f++){try{var g=this.factories[f]();
return g
}catch(h){}}throw"Could not create XML HTTP transport."
},CLASS_NAME:"Jsonix.Request"});
Jsonix.Request.INSTANCE=new Jsonix.Request();
Jsonix.Request.PROXY=null;
Jsonix.Schema={};
Jsonix.Model={};
Jsonix.Util.Type={exists:function(b){return(typeof b!=="undefined"&&b!==null)
},isString:function(b){return typeof b==="string"
},isBoolean:function(b){return typeof b==="boolean"
},isObject:function(b){return typeof b==="object"
},isFunction:function(b){return typeof b==="function"
},isNumber:function(b){return(typeof b==="number")&&!isNaN(b)
},isNumberOrNaN:function(b){return(b===+b)||(Object.prototype.toString.call(b)==="[object Number]")
},isNaN:function(b){return Jsonix.Util.Type.isNumberOrNaN(b)&&isNaN(b)
},isArray:function(b){return !!(b&&b.concat&&b.unshift&&!b.callee)
},isDate:function(b){return !!(b&&b.getTimezoneOffset&&b.setUTCFullYear)
},isRegExp:function(b){return !!(b&&b.test&&b.exec&&(b.ignoreCase||b.ignoreCase===false))
},equals:function(q,s,v){var a=Jsonix.Util.Type.isFunction(v);
var u=function(h,j,e){var l=slice.call(arguments);
var k=l.length<=1;
var f=k?0:l[0];
var i=k?l[0]:l[1];
var m=l[2]||1;
var c=Math.max(Math.ceil((i-f)/m),0);
var g=0;
var d=new Array(c);
while(g<c){d[g++]=f;
f+=m
}return d
};
var t=Object.keys||function(e){if(Jsonix.Util.Type.isArray(e)){return u(0,e.length)
}var c=[];
for(var d in e){if(e.hasOwnProperty(d)){c[c.length]=d
}}return c
};
if(q===s){return true
}if(Jsonix.Util.Type.isNaN(q)&&Jsonix.Util.Type.isNaN(s)){return true
}var w=typeof q;
var y=typeof s;
if(w!=y){if(a){v("Types differ ["+w+"], ["+y+"].")
}return false
}if(q==s){return true
}if((!q&&s)||(q&&!s)){if(a){v("One is falsy, the other is truthy.")
}return false
}if(Jsonix.Util.Type.isDate(q)&&Jsonix.Util.Type.isDate(s)){return q.getTime()===s.getTime()
}if(Jsonix.Util.Type.isNaN(q)&&Jsonix.Util.Type.isNaN(s)){return false
}if(Jsonix.Util.Type.isRegExp(q)&&Jsonix.Util.Type.isRegExp(s)){return q.source===s.source&&q.global===s.global&&q.ignoreCase===s.ignoreCase&&q.multiline===s.multiline
}if(w!=="object"){return false
}if(q.length&&(q.length!==s.length)){return false
}var b=t(q);
var r=t(s);
if(b.length!=r.length){if(a){v("Different number of properties ["+b.length+"], ["+r.length+"].")
}for(var x=0;
x<b.length;
x++){if(a){v("A ["+b[x]+"]="+q[b[x]])
}}for(var z=0;
z<r.length;
z++){if(a){v("B ["+r[z]+"]="+s[r[z]])
}}return false
}for(var p in q){if(q.hasOwnProperty[p]){if(!(p in s)||!Jsonix.Util.Type.isEqual(q[p],s[p])){if(a){v("One of the properties differ.");
v("Key: ["+p+"].");
v("Left: ["+q[p]+"].");
v("Right: ["+s[p]+"].")
}return false
}}}return true
}};
Jsonix.Util.NumberUtils={isInteger:function(b){return Jsonix.Util.Type.isNumber(b)&&((b%1)===0)
}};
Jsonix.Util.StringUtils={trim:function(b){Jsonix.Util.Ensure.ensureString(b);
return b.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
},isEmpty:function(b){return Jsonix.Util.StringUtils.trim(b).length===0
},isBlank:function(b){return !Jsonix.Util.Type.exists(b)||Jsonix.Util.StringUtils.trim(b).length===0
},isNotBlank:function(b){return Jsonix.Util.Type.isString(b)&&Jsonix.Util.StringUtils.trim(b).length!==0
}};
Jsonix.Util.Ensure={ensureBoolean:function(b){if(!Jsonix.Util.Type.isBoolean(b)){throw"Argument ["+b+"] must be a boolean."
}},ensureString:function(b){if(!Jsonix.Util.Type.isString(b)){throw"Argument ["+b+"] must be a string."
}},ensureNumber:function(b){if(!Jsonix.Util.Type.isNumber(b)){throw"Argument ["+b+"] must be a number."
}},ensureNumberOrNaN:function(b){if(!Jsonix.Util.Type.isNumberOrNaN(b)){throw"Argument ["+b+"] must be a number or NaN."
}},ensureInteger:function(b){if(!Jsonix.Util.Type.isNumber(b)){throw"Argument must be an integer, but it is not a number."
}else{if(!Jsonix.Util.NumberUtils.isInteger(b)){throw"Argument ["+b+"] must be an integer."
}}},ensureDate:function(b){if(!(b instanceof Date)){throw"Argument ["+b+"] must be a date."
}},ensureObject:function(b){if(!Jsonix.Util.Type.isObject(b)){throw"Argument ["+b+"] must be an object."
}},ensureArray:function(b){if(!Jsonix.Util.Type.isArray(b)){throw"Argument ["+b+"] must be an array."
}},ensureFunction:function(b){if(!Jsonix.Util.Type.isFunction(b)){throw"Argument ["+b+"] must be a function."
}},ensureExists:function(b){if(!Jsonix.Util.Type.exists(b)){throw"Argument ["+b+"] does not exist."
}}};
Jsonix.XML.QName=Jsonix.Class({key:null,namespaceURI:null,localPart:null,prefix:null,string:null,initialize:function(n,j,r){var q;
var o;
var m;
var k;
var l;
if(!Jsonix.Util.Type.exists(j)){q="";
o=n;
m=""
}else{if(!Jsonix.Util.Type.exists(r)){q=Jsonix.Util.Type.exists(n)?n:"";
o=j;
var p=j.indexOf(":");
if(p>0&&p<j.length){m=j.substring(0,p);
o=j.substring(p+1)
}else{m="";
o=j
}}else{q=Jsonix.Util.Type.exists(n)?n:"";
o=j;
m=Jsonix.Util.Type.exists(r)?r:""
}}this.namespaceURI=q;
this.localPart=o;
this.prefix=m;
this.key=(q!==""?("{"+q+"}"):"")+o;
this.string=(q!==""?("{"+q+"}"):"")+(m!==""?(m+":"):"")+o
},toString:function(){return this.string
},clone:function(){return new Jsonix.XML.QName(this.namespaceURI,this.localPart,this.prefix)
},equals:function(b){if(!b){return false
}else{return(this.namespaceURI==b.namespaceURI)&&(this.localPart==b.localPart)
}},CLASS_NAME:"Jsonix.XML.QName"});
Jsonix.XML.QName.fromString=function(k){var m=k.indexOf("{");
var o=k.lastIndexOf("}");
var p;
var n;
if((m===0)&&(o>0)&&(o<k.length)){p=k.substring(1,o);
n=k.substring(o+1)
}else{p="";
n=k
}var i=n.indexOf(":");
var l;
var j;
if(i>0&&i<n.length){l=n.substring(0,i);
j=n.substring(i+1)
}else{l="";
j=n
}return new Jsonix.XML.QName(p,j,l)
};
Jsonix.XML.QName.fromObject=function(h){Jsonix.Util.Ensure.ensureObject(h);
if(Jsonix.Util.Type.isString(h.CLASS_NAME)&&h.CLASS_NAME==="Jsonix.XML.QName"){return h
}Jsonix.Util.Ensure.ensureString(h.localPart);
var e=Jsonix.Util.Type.isString(h.namespaceURI)?h.namespaceURI:"";
var f=h.localPart;
var g=Jsonix.Util.Type.isString(h.prefix)?h.prefix:"";
return new Jsonix.XML.QName(e,f,g)
};
Jsonix.XML.QName.key=function(c,d){Jsonix.Util.Ensure.ensureString(d);
if(Jsonix.Util.StringUtils.isNotBlank(c)){return"{"+c+"}"+d
}else{return d
}};
Jsonix.XML.Calendar=Jsonix.Class({year:NaN,month:NaN,day:NaN,hour:NaN,minute:NaN,second:NaN,fractionalSecond:NaN,timezone:NaN,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
if(Jsonix.Util.Type.exists(b.year)){Jsonix.Util.Ensure.ensureInteger(b.year);
if(b.year>=-9999&&b.year<=9999){this.year=b.year
}else{throw"Invalid year ["+b.year+"]."
}}else{this.year=NaN
}if(Jsonix.Util.Type.exists(b.month)){Jsonix.Util.Ensure.ensureInteger(b.month);
if(b.month>=1&&b.month<=12){this.month=b.month
}else{throw"Invalid month ["+b.month+"]."
}}else{this.month=NaN
}if(Jsonix.Util.Type.exists(b.day)){Jsonix.Util.Ensure.ensureInteger(b.day);
if(b.day>=1&&b.day<=31){this.day=b.day
}else{throw"Invalid day ["+b.day+"]."
}}else{this.day=NaN
}if(Jsonix.Util.Type.exists(b.hour)){Jsonix.Util.Ensure.ensureInteger(b.hour);
if(b.hour>=0&&b.hour<=23){this.hour=b.hour
}else{throw"Invalid hour ["+b.hour+"]."
}}else{this.hour=NaN
}if(Jsonix.Util.Type.exists(b.minute)){Jsonix.Util.Ensure.ensureInteger(b.minute);
if(b.minute>=0&&b.minute<=59){this.minute=b.minute
}else{throw"Invalid minute ["+b.minute+"]."
}}else{this.minute=NaN
}if(Jsonix.Util.Type.exists(b.second)){Jsonix.Util.Ensure.ensureInteger(b.second);
if(b.second>=0&&b.second<=59){this.second=b.second
}else{throw"Invalid second ["+b.second+"]."
}}else{this.second=NaN
}if(Jsonix.Util.Type.exists(b.fractionalSecond)){Jsonix.Util.Ensure.ensureNumber(b.fractionalSecond);
if(b.fractionalSecond>=0&&b.fractionalSecond<1){this.fractionalSecond=b.fractionalSecond
}else{throw"Invalid fractional second ["+b.fractionalSecond+"]."
}}else{this.fractionalSecond=NaN
}if(Jsonix.Util.Type.exists(b.timezone)){if(Jsonix.Util.Type.isNaN(b.timezone)){this.timezone=NaN
}else{Jsonix.Util.Ensure.ensureInteger(b.timezone);
if(b.timezone>=-1440&&b.timezone<1440){this.timezone=b.timezone
}else{throw"Invalid timezone ["+b.timezone+"]."
}}}else{this.timezone=NaN
}},CLASS_NAME:"Jsonix.XML.Calendar"});
Jsonix.XML.Calendar.fromObject=function(b){Jsonix.Util.Ensure.ensureObject(b);
if(Jsonix.Util.Type.isString(b.CLASS_NAME)&&b.CLASS_NAME==="Jsonix.XML.Calendar"){return b
}return new Jsonix.XML.Calendar(b)
};
Jsonix.XML.Input=Jsonix.Class({root:null,node:null,eventType:null,initialize:function(b){Jsonix.Util.Ensure.ensureExists(b);
this.root=b
},hasNext:function(){if(this.node===null){return true
}else{if(this.node===this.root){if(this.node.nodeType===9&&this.eventType===8){return false
}else{if(this.node.nodeType===1&&this.eventType===2){return false
}else{return true
}}}else{return true
}}},next:function(){if(this.eventType===null){return this.enter(this.root)
}if(this.eventType===7){if(Jsonix.Util.Type.exists(this.node.documentElement)){return this.enter(this.node.documentElement)
}else{return this.leave(this.node)
}}else{if(this.eventType===1){if(Jsonix.Util.Type.exists(this.node.firstChild)){return this.enter(this.node.firstChild)
}else{return this.leave(this.node)
}}else{if(this.eventType===2){if(Jsonix.Util.Type.exists(this.node.nextSibling)){return this.enter(this.node.nextSibling)
}else{return this.leave(this.node)
}}else{return this.leave(this.node)
}}}},enter:function(f){var e=f.nodeType;
if(e===1){this.node=f;
this.eventType=1;
return this.eventType
}else{if(e===2){this.node=f;
this.eventType=10;
return this.eventType
}else{if(e===3){this.node=f;
var d=f.nodeValue;
if(Jsonix.Util.StringUtils.isEmpty(d)){this.eventType=6
}else{this.eventType=4
}return this.eventType
}else{if(e===4){this.node=f;
this.eventType=12;
return this.eventType
}else{if(e===5){this.node=f;
this.eventType=9;
return this.eventType
}else{if(e===6){this.node=f;
this.eventType=15;
return this.eventType
}else{if(e===7){this.node=f;
this.eventType=3;
return this.eventType
}else{if(e===8){this.node=f;
this.eventType=5;
return this.eventType
}else{if(e===9){this.node=f;
this.eventType=7;
return this.eventType
}else{if(e===10){this.node=f;
this.eventType=12;
return this.eventType
}else{if(e===12){this.node=f;
this.eventType=14;
return this.eventType
}else{throw"Node type ["+e+"] is not supported."
}}}}}}}}}}}},leave:function(c){if(c.nodeType===9){if(this.eventType==8){throw"Invalid state."
}else{this.node=c;
this.eventType=8;
return this.eventType
}}else{if(c.nodeType===1){if(this.eventType==2){if(Jsonix.Util.Type.exists(c.nextSibling)){return this.enter(c.nextSibling)
}}else{this.node=c;
this.eventType=2;
return this.eventType
}}}if(Jsonix.Util.Type.exists(c.nextSibling)){return this.enter(c.nextSibling)
}else{var d=c.parentNode;
this.node=d;
if(d.nodeType===9){this.eventType=8
}else{this.eventType=2
}return this.eventType
}},getName:function(){var b=this.node;
if(Jsonix.Util.Type.isString(b.nodeName)){if(Jsonix.Util.Type.isString(b.namespaceURI)){return new Jsonix.XML.QName(b.namespaceURI,b.nodeName)
}else{return new Jsonix.XML.QName(b.nodeName)
}}else{return null
}},getText:function(){return this.node.nodeValue
},nextTag:function(){var b=this.next();
while(b===7||b===4||b===12||b===6||b===3||b===5){b=this.next()
}if(b!==1&&b!==2){throw"Expected start or end tag."
}return b
},getElementText:function(){if(this.eventType!=1){throw"Parser must be on START_ELEMENT to read next text."
}var c=this.next();
var d="";
while(c!==2){if(c===4||c===12||c===6||c===9){d=d+this.getText()
}else{if(c===3||c===5){}else{if(c===8){throw"Unexpected end of document when reading element text content."
}else{if(c===1){throw"Element text content may not contain START_ELEMENT."
}else{throw ("Unexpected event type ["+c+"].")
}}}}c=this.next()
}return d
},getAttributeCount:function(){var b;
if(this.eventType===1){b=this.node.attributes
}else{if(this.eventType===10){b=this.node.parentNode.attributes
}else{throw"Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE."
}}return b.length
},getAttributeName:function(d){var e;
if(this.eventType===1){e=this.node.attributes
}else{if(this.eventType===10){e=this.node.parentNode.attributes
}else{throw"Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE."
}}if(d<0||d>=e.length){throw"Invalid attribute index ["+d+"]."
}var f=e[d];
if(Jsonix.Util.Type.isString(f.namespaceURI)){return new Jsonix.XML.QName(f.namespaceURI,f.nodeName)
}else{return new Jsonix.XML.QName(f.nodeName)
}},getAttributeValue:function(d){var e;
if(this.eventType===1){e=this.node.attributes
}else{if(this.eventType===10){e=this.node.parentNode.attributes
}else{throw"Number of attributes can only be retrieved for START_ELEMENT or ATTRIBUTE."
}}if(d<0||d>=e.length){throw"Invalid attribute index ["+d+"]."
}var f=e[d];
return f.nodeValue
},getElement:function(){if(this.eventType===1||this.eventType===2){this.eventType=2;
return this.node
}else{throw"Parser must be on START_ELEMENT or END_ELEMENT to return current element."
}},CLASS_NAME:"Jsonix.XML.Input"});
Jsonix.XML.Input.START_ELEMENT=1;
Jsonix.XML.Input.END_ELEMENT=2;
Jsonix.XML.Input.PROCESSING_INSTRUCTION=3;
Jsonix.XML.Input.CHARACTERS=4;
Jsonix.XML.Input.COMMENT=5;
Jsonix.XML.Input.SPACE=6;
Jsonix.XML.Input.START_DOCUMENT=7;
Jsonix.XML.Input.END_DOCUMENT=8;
Jsonix.XML.Input.ENTITY_REFERENCE=9;
Jsonix.XML.Input.ATTRIBUTE=10;
Jsonix.XML.Input.DTD=11;
Jsonix.XML.Input.CDATA=12;
Jsonix.XML.Input.NAMESPACE=13;
Jsonix.XML.Input.NOTATION_DECLARATION=14;
Jsonix.XML.Input.ENTITY_DECLARATION=15;
Jsonix.XML.Output=Jsonix.Class({document:null,node:null,nodes:null,xmldom:null,namespacePrefixes:null,namespacePrefixIndex:0,initialize:function(c){if(window.ActiveXObject){this.xmldom=new ActiveXObject("Microsoft.XMLDOM")
}else{this.xmldom=null
}this.nodes=[];
this.namespacePrefixes={"":""};
if(Jsonix.Util.Type.isObject(c)){if(Jsonix.Util.Type.isObject(c.namespacePrefixes)){for(var d in c.namespacePrefixes){if(c.namespacePrefixes.hasOwnProperty(d)){this.namespacePrefixes[d]=c.namespacePrefixes[d]
}}}}},destroy:function(){this.xmldom=null
},writeStartDocument:function(){var b=Jsonix.DOM.createDocument();
this.document=b;
return this.push(b)
},writeEndDocument:function(){return this.pop()
},writeStartElement:function(l){Jsonix.Util.Ensure.ensureObject(l);
Jsonix.Util.Ensure.ensureString(l.localPart);
var g=Jsonix.Util.Type.isString(l.namespaceURI)?l.namespaceURI:"";
var h=l.localPart;
var j=Jsonix.Util.StringUtils.isNotBlank(l.prefix)?l.prefix:this.getPrefix(g);
var i=(j===""?h:j+":"+h);
var k;
if(this.xmldom){k=this.xmldom.createNode(1,i,g)
}else{k=this.document.createElementNS(g,i)
}this.peek().appendChild(k);
return this.push(k)
},writeEndElement:function(){return this.pop()
},writeCharacters:function(c){var d;
if(this.xmldom){d=this.xmldom.createTextNode(c)
}else{d=this.document.createTextNode(c)
}this.peek().appendChild(d);
return d
},writeAttribute:function(p,l){Jsonix.Util.Ensure.ensureObject(p);
Jsonix.Util.Ensure.ensureString(p.localPart);
Jsonix.Util.Ensure.ensureString(l);
var i=Jsonix.Util.Type.isString(p.namespaceURI)?p.namespaceURI:"";
var j=p.localPart;
var m=Jsonix.Util.StringUtils.isNotBlank(p.prefix)?p.prefix:this.getPrefix(i);
var k=(m===""?j:m+":"+j);
var n=this.peek();
if(i===""){n.setAttribute(k,l)
}else{if(n.setAttributeNS){n.setAttributeNS(i,k,l)
}else{if(this.xmldom){var o=this.document.createNode(2,k,i);
o.nodeValue=l;
n.setAttributeNode(o)
}else{throw"setAttributeNS not implemented"
}}}},writeNode:function(c){var d;
if(Jsonix.Util.Type.exists(this.document.importNode)){d=this.document.importNode(c,true)
}else{d=c
}this.peek().appendChild(d);
return d
},push:function(b){this.nodes.push(b);
return b
},peek:function(){return this.nodes[this.nodes.length-1]
},pop:function(){var b=this.nodes.pop();
return b
},getPrefix:function(d){var c=this.namespacePrefixes[d];
if(Jsonix.Util.Type.exists(c)){return c
}else{c="p"+(this.namespacePrefixIndex++);
this.namespacePrefixes[d]=c;
return c
}},CLASS_NAME:"Jsonix.XML.Output"});
Jsonix.Schema.XSD={};
Jsonix.Schema.XSD.NAMESPACE_URI="http://www.w3.org/2001/XMLSchema";
Jsonix.Schema.XSD.PREFIX="xsd";
Jsonix.Schema.XSD.qname=function(b){Jsonix.Util.Ensure.ensureString(b);
return new Jsonix.XML.QName(Jsonix.Schema.XSD.NAMESPACE_URI,b,Jsonix.Schema.XSD.PREFIX)
};
Jsonix.Schema.XSD.AnyType=Jsonix.Class({typeName:Jsonix.Schema.XSD.qname("anyType"),initialize:function(){},isInstance:function(b){throw"Abstract method [isInstance]."
},CLASS_NAME:"Jsonix.Schema.XSD.AnyType"});
Jsonix.Schema.XSD.AnySimpleType=Jsonix.Class(Jsonix.Schema.XSD.AnyType,{typeName:Jsonix.Schema.XSD.qname("anySimpleType"),simpleType:true,print:function(b){throw new Error("Abstract method [print].")
},parse:function(b){throw new Error("Abstract method [parse].")
},unmarshal:function(d,e){var f=e.getElementText();
if(Jsonix.Util.StringUtils.isNotBlank(f)){return this.parse(f)
}else{return null
}},marshal:function(d,f,e){if(Jsonix.Util.Type.exists(f)){e.writeCharacters(this.print(f))
}},CLASS_NAME:"Jsonix.Schema.XSD.AnySimpleType"});
Jsonix.Schema.XSD.List=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:null,typeInfo:null,separator:" ",trimmedSeparator:" ",simpleType:true,initialize:function(e,f,h){Jsonix.Util.Ensure.ensureObject(e);
this.typeInfo=e;
if(Jsonix.Util.Type.exists(f)){this.typeName=f
}if(Jsonix.Util.Type.isString(h)){this.separator=h
}else{this.separator=" "
}var g=Jsonix.Util.StringUtils.trim(this.separator);
if(g.length===0){this.trimmedSeparator=" "
}else{this.trimmedSeparator=g
}},print:function(f){if(!Jsonix.Util.Type.exists(f)){return null
}Jsonix.Util.Ensure.ensureArray(f);
var e="";
for(var d=0;
d<f.length;
d++){if(d>0){e=e+this.separator
}e=e+this.typeInfo.print(f[d])
}return e
},parse:function(g){Jsonix.Util.Ensure.ensureString(g);
var e=g.split(this.trimmedSeparator);
var f=[];
for(var h=0;
h<e.length;
h++){f.push(this.typeInfo.parse(Jsonix.Util.StringUtils.trim(e[h])))
}return f
},CLASS_NAME:"Jsonix.Schema.XSD.List"});
Jsonix.Schema.XSD.String=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("string"),print:function(b){Jsonix.Util.Ensure.ensureString(b);
return b
},parse:function(b){Jsonix.Util.Ensure.ensureString(b);
return b
},isInstance:function(b){return Jsonix.Util.Type.isString(b)
},CLASS_NAME:"Jsonix.Schema.XSD.String"});
Jsonix.Schema.XSD.String.INSTANCE=new Jsonix.Schema.XSD.String();
Jsonix.Schema.XSD.String.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.String.INSTANCE);
Jsonix.Schema.XSD.Strings=Jsonix.Class(Jsonix.Schema.XSD.List,{initialize:function(){Jsonix.Schema.XSD.List.prototype.initialize.apply(this,[Jsonix.Schema.XSD.String.INSTANCE,Jsonix.Schema.XSD.qname("strings")," "])
},CLASS_NAME:"Jsonix.Schema.XSD.Strings"});
Jsonix.Schema.XSD.Strings.INSTANCE=new Jsonix.Schema.XSD.Strings();
Jsonix.Schema.XSD.NormalizedString=Jsonix.Class(Jsonix.Schema.XSD.String,{typeName:Jsonix.Schema.XSD.qname("normalizedString"),CLASS_NAME:"Jsonix.Schema.XSD.NormalizedString"});
Jsonix.Schema.XSD.NormalizedString.INSTANCE=new Jsonix.Schema.XSD.NormalizedString();
Jsonix.Schema.XSD.NormalizedString.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NormalizedString.INSTANCE);
Jsonix.Schema.XSD.Token=Jsonix.Class(Jsonix.Schema.XSD.NormalizedString,{typeName:Jsonix.Schema.XSD.qname("token"),CLASS_NAME:"Jsonix.Schema.XSD.Token"});
Jsonix.Schema.XSD.Token.INSTANCE=new Jsonix.Schema.XSD.Token();
Jsonix.Schema.XSD.Token.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Token.INSTANCE);
Jsonix.Schema.XSD.Language=Jsonix.Class(Jsonix.Schema.XSD.Token,{typeName:Jsonix.Schema.XSD.qname("language"),CLASS_NAME:"Jsonix.Schema.XSD.Language"});
Jsonix.Schema.XSD.Language.INSTANCE=new Jsonix.Schema.XSD.Language();
Jsonix.Schema.XSD.Language.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Language.INSTANCE);
Jsonix.Schema.XSD.Name=Jsonix.Class(Jsonix.Schema.XSD.Token,{typeName:Jsonix.Schema.XSD.qname("Name"),CLASS_NAME:"Jsonix.Schema.XSD.Name"});
Jsonix.Schema.XSD.Name.INSTANCE=new Jsonix.Schema.XSD.Name();
Jsonix.Schema.XSD.Name.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Name.INSTANCE);
Jsonix.Schema.XSD.NCName=Jsonix.Class(Jsonix.Schema.XSD.Name,{typeName:Jsonix.Schema.XSD.qname("NCName"),CLASS_NAME:"Jsonix.Schema.XSD.NCName"});
Jsonix.Schema.XSD.NCName.INSTANCE=new Jsonix.Schema.XSD.NCName();
Jsonix.Schema.XSD.NCName.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NCName.INSTANCE);
Jsonix.Schema.XSD.NMToken=Jsonix.Class(Jsonix.Schema.XSD.Token,{typeName:Jsonix.Schema.XSD.qname("NMTOKEN"),CLASS_NAME:"Jsonix.Schema.XSD.NMToken"});
Jsonix.Schema.XSD.NMToken.INSTANCE=new Jsonix.Schema.XSD.NMToken();
Jsonix.Schema.XSD.NMTokens=Jsonix.Class(Jsonix.Schema.XSD.List,{initialize:function(){Jsonix.Schema.XSD.List.prototype.initialize.apply(this,[Jsonix.Schema.XSD.NMToken.INSTANCE,Jsonix.Schema.XSD.qname("NMTOKEN")," "])
},CLASS_NAME:"Jsonix.Schema.XSD.NMTokens"});
Jsonix.Schema.XSD.NMTokens.INSTANCE=new Jsonix.Schema.XSD.NMTokens();
Jsonix.Schema.XSD.Boolean=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("boolean"),print:function(b){Jsonix.Util.Ensure.ensureBoolean(b);
return b?"true":"false"
},parse:function(b){Jsonix.Util.Ensure.ensureString(b);
if(b==="true"||b==="1"){return true
}else{if(b==="false"||b==="0"){return false
}else{throw"Either [true], [1], [0] or [false] expected as boolean value."
}}},isInstance:function(b){return Jsonix.Util.Type.isBoolean(b)
},CLASS_NAME:"Jsonix.Schema.XSD.Boolean"});
Jsonix.Schema.XSD.Boolean.INSTANCE=new Jsonix.Schema.XSD.Boolean();
Jsonix.Schema.XSD.Boolean.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Boolean.INSTANCE);
Jsonix.Schema.XSD.Base64Binary=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("base64Binary"),CLASS_NAME:"Jsonix.Schema.XSD.Base64Binary"});
Jsonix.Schema.XSD.Base64Binary.INSTANCE=new Jsonix.Schema.XSD.Base64Binary();
Jsonix.Schema.XSD.Base64Binary.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Base64Binary.INSTANCE);
Jsonix.Schema.XSD.HexBinary=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("hexBinary"),CLASS_NAME:"Jsonix.Schema.XSD.HexBinary"});
Jsonix.Schema.XSD.HexBinary.INSTANCE=new Jsonix.Schema.XSD.HexBinary();
Jsonix.Schema.XSD.HexBinary.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.HexBinary.INSTANCE);
Jsonix.Schema.XSD.Number=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("number"),print:function(d){Jsonix.Util.Ensure.ensureNumberOrNaN(d);
if(Jsonix.Util.Type.isNaN(d)){return"NaN"
}else{if(d===Infinity){return"INF"
}else{if(d===-Infinity){return"-INF"
}else{var c=String(d);
return c
}}}},parse:function(c){Jsonix.Util.Ensure.ensureString(c);
if(c==="-INF"){return -Infinity
}else{if(c==="INF"){return Infinity
}else{if(c==="NaN"){return NaN
}else{var d=Number(c);
Jsonix.Util.Ensure.ensureNumber(d);
return d
}}}},isInstance:function(b){return Jsonix.Util.Type.isNumberOrNaN(b)
},CLASS_NAME:"Jsonix.Schema.XSD.Number"});
Jsonix.Schema.XSD.Number.INSTANCE=new Jsonix.Schema.XSD.Number();
Jsonix.Schema.XSD.Number.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Number.INSTANCE);
Jsonix.Schema.XSD.Float=Jsonix.Class(Jsonix.Schema.XSD.Number,{typeName:Jsonix.Schema.XSD.qname("float"),isInstance:function(b){return Jsonix.Util.Type.isNaN(b)||b===-Infinity||b===Infinity||(Jsonix.Util.Type.isNumber(b)&&b>=this.MIN_VALUE&&b<=this.MAX_VALUE)
},MIN_VALUE:-3.4028235e+38,MAX_VALUE:3.4028235e+38,CLASS_NAME:"Jsonix.Schema.XSD.Float"});
Jsonix.Schema.XSD.Float.INSTANCE=new Jsonix.Schema.XSD.Float();
Jsonix.Schema.XSD.Float.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Float.INSTANCE);
Jsonix.Schema.XSD.Decimal=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("decimal"),print:function(d){Jsonix.Util.Ensure.ensureNumber(d);
var c=String(d);
return c
},parse:function(c){Jsonix.Util.Ensure.ensureString(c);
var d=Number(c);
Jsonix.Util.Ensure.ensureNumber(d);
return d
},isInstance:function(b){return Jsonix.Util.Type.isNumber(b)
},CLASS_NAME:"Jsonix.Schema.XSD.Decimal"});
Jsonix.Schema.XSD.Decimal.INSTANCE=new Jsonix.Schema.XSD.Decimal();
Jsonix.Schema.XSD.Decimal.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Decimal.INSTANCE);
Jsonix.Schema.XSD.Integer=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("integer"),print:function(d){Jsonix.Util.Ensure.ensureInteger(d);
var c=String(d);
return c
},parse:function(c){Jsonix.Util.Ensure.ensureString(c);
var d=Number(c);
Jsonix.Util.Ensure.ensureInteger(d);
return d
},isInstance:function(b){return Jsonix.Util.NumberUtils.isInteger(b)&&b>=this.MIN_VALUE&&b<=this.MAX_VALUE
},MIN_VALUE:-9223372036854776000,MAX_VALUE:9223372036854776000,CLASS_NAME:"Jsonix.Schema.XSD.Integer"});
Jsonix.Schema.XSD.Integer.INSTANCE=new Jsonix.Schema.XSD.Integer();
Jsonix.Schema.XSD.Integer.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Integer.INSTANCE);
Jsonix.Schema.XSD.NonPositiveInteger=Jsonix.Class(Jsonix.Schema.XSD.Integer,{typeName:Jsonix.Schema.XSD.qname("nonPositiveInteger"),MIN_VALUE:-9223372036854776000,MAX_VALUE:0,CLASS_NAME:"Jsonix.Schema.XSD.NonPositiveInteger"});
Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE=new Jsonix.Schema.XSD.NonPositiveInteger();
Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NonPositiveInteger.INSTANCE);
Jsonix.Schema.XSD.NegativeInteger=Jsonix.Class(Jsonix.Schema.XSD.NonPositiveInteger,{typeName:Jsonix.Schema.XSD.qname("negativeInteger"),MIN_VALUE:-9223372036854776000,MAX_VALUE:-1,CLASS_NAME:"Jsonix.Schema.XSD.NegativeInteger"});
Jsonix.Schema.XSD.NegativeInteger.INSTANCE=new Jsonix.Schema.XSD.NegativeInteger();
Jsonix.Schema.XSD.NegativeInteger.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NegativeInteger.INSTANCE);
Jsonix.Schema.XSD.Long=Jsonix.Class(Jsonix.Schema.XSD.Integer,{typeName:Jsonix.Schema.XSD.qname("long"),MIN_VALUE:-9223372036854776000,MAX_VALUE:9223372036854776000,CLASS_NAME:"Jsonix.Schema.XSD.Long"});
Jsonix.Schema.XSD.Long.INSTANCE=new Jsonix.Schema.XSD.Long();
Jsonix.Schema.XSD.Long.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Long.INSTANCE);
Jsonix.Schema.XSD.Int=Jsonix.Class(Jsonix.Schema.XSD.Long,{typeName:Jsonix.Schema.XSD.qname("int"),MIN_VALUE:-2147483648,MAX_VALUE:2147483647,CLASS_NAME:"Jsonix.Schema.XSD.Int"});
Jsonix.Schema.XSD.Int.INSTANCE=new Jsonix.Schema.XSD.Int();
Jsonix.Schema.XSD.Int.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Int.INSTANCE);
Jsonix.Schema.XSD.Short=Jsonix.Class(Jsonix.Schema.XSD.Int,{typeName:Jsonix.Schema.XSD.qname("short"),MIN_VALUE:-32768,MAX_VALUE:32767,CLASS_NAME:"Jsonix.Schema.XSD.Short"});
Jsonix.Schema.XSD.Short.INSTANCE=new Jsonix.Schema.XSD.Short();
Jsonix.Schema.XSD.Short.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Short.INSTANCE);
Jsonix.Schema.XSD.Byte=Jsonix.Class(Jsonix.Schema.XSD.Short,{typeName:Jsonix.Schema.XSD.qname("byte"),MIN_VALUE:-128,MAX_VALUE:127,CLASS_NAME:"Jsonix.Schema.XSD.Byte"});
Jsonix.Schema.XSD.Byte.INSTANCE=new Jsonix.Schema.XSD.Byte();
Jsonix.Schema.XSD.Byte.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Byte.INSTANCE);
Jsonix.Schema.XSD.NonNegativeInteger=Jsonix.Class(Jsonix.Schema.XSD.Integer,{typeName:Jsonix.Schema.XSD.qname("nonNegativeInteger"),MIN_VALUE:0,MAX_VALUE:9223372036854776000,CLASS_NAME:"Jsonix.Schema.XSD.NonNegativeInteger"});
Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE=new Jsonix.Schema.XSD.NonNegativeInteger();
Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.NonNegativeInteger.INSTANCE);
Jsonix.Schema.XSD.UnsignedLong=Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger,{typeName:Jsonix.Schema.XSD.qname("unsignedLong"),MIN_VALUE:0,MAX_VALUE:18446744073709552000,CLASS_NAME:"Jsonix.Schema.XSD.UnsignedLong"});
Jsonix.Schema.XSD.UnsignedLong.INSTANCE=new Jsonix.Schema.XSD.UnsignedLong();
Jsonix.Schema.XSD.UnsignedLong.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedLong.INSTANCE);
Jsonix.Schema.XSD.UnsignedInt=Jsonix.Class(Jsonix.Schema.XSD.UnsignedLong,{typeName:Jsonix.Schema.XSD.qname("unsignedInt"),MIN_VALUE:0,MAX_VALUE:4294967295,CLASS_NAME:"Jsonix.Schema.XSD.UnsignedInt"});
Jsonix.Schema.XSD.UnsignedInt.INSTANCE=new Jsonix.Schema.XSD.UnsignedInt();
Jsonix.Schema.XSD.UnsignedInt.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedInt.INSTANCE);
Jsonix.Schema.XSD.UnsignedShort=Jsonix.Class(Jsonix.Schema.XSD.UnsignedInt,{typeName:Jsonix.Schema.XSD.qname("unsignedShort"),MIN_VALUE:0,MAX_VALUE:65535,CLASS_NAME:"Jsonix.Schema.XSD.UnsignedShort"});
Jsonix.Schema.XSD.UnsignedShort.INSTANCE=new Jsonix.Schema.XSD.UnsignedShort();
Jsonix.Schema.XSD.UnsignedShort.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedShort.INSTANCE);
Jsonix.Schema.XSD.UnsignedByte=Jsonix.Class(Jsonix.Schema.XSD.UnsignedShort,{typeName:Jsonix.Schema.XSD.qname("unsignedByte"),MIN_VALUE:0,MAX_VALUE:255,CLASS_NAME:"Jsonix.Schema.XSD.UnsignedByte"});
Jsonix.Schema.XSD.UnsignedByte.INSTANCE=new Jsonix.Schema.XSD.UnsignedByte();
Jsonix.Schema.XSD.UnsignedByte.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.UnsignedByte.INSTANCE);
Jsonix.Schema.XSD.PositiveInteger=Jsonix.Class(Jsonix.Schema.XSD.NonNegativeInteger,{typeName:Jsonix.Schema.XSD.qname("positiveInteger"),MIN_VALUE:1,MAX_VALUE:9223372036854776000,CLASS_NAME:"Jsonix.Schema.XSD.PositiveInteger"});
Jsonix.Schema.XSD.PositiveInteger.INSTANCE=new Jsonix.Schema.XSD.PositiveInteger();
Jsonix.Schema.XSD.PositiveInteger.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.PositiveInteger.INSTANCE);
Jsonix.Schema.XSD.Double=Jsonix.Class(Jsonix.Schema.XSD.Number,{typeName:Jsonix.Schema.XSD.qname("double"),isInstance:function(b){return Jsonix.Util.Type.isNaN(b)||b===-Infinity||b===Infinity||(Jsonix.Util.Type.isNumber(b)&&b>=this.MIN_VALUE&&b<=this.MAX_VALUE)
},MIN_VALUE:-1.7976931348623157e+308,MAX_VALUE:1.7976931348623157e+308,CLASS_NAME:"Jsonix.Schema.XSD.Double"});
Jsonix.Schema.XSD.Double.INSTANCE=new Jsonix.Schema.XSD.Double();
Jsonix.Schema.XSD.Double.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Double.INSTANCE);
Jsonix.Schema.XSD.AnyURI=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("anyURI"),print:function(b){Jsonix.Util.Ensure.ensureString(b);
return b
},parse:function(b){Jsonix.Util.Ensure.ensureString(b);
return b
},isInstance:function(b){return Jsonix.Util.Type.isString(b)
},CLASS_NAME:"Jsonix.Schema.XSD.AnyURI"});
Jsonix.Schema.XSD.AnyURI.INSTANCE=new Jsonix.Schema.XSD.AnyURI();
Jsonix.Schema.XSD.AnyURI.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.AnyURI.INSTANCE);
Jsonix.Schema.XSD.QName=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("QName"),CLASS_NAME:"Jsonix.Schema.XSD.QName"});
Jsonix.Schema.XSD.QName.INSTANCE=new Jsonix.Schema.XSD.QName();
Jsonix.Schema.XSD.QName.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.QName.INSTANCE);
Jsonix.Schema.XSD.Calendar=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("calendar"),parse:function(h){Jsonix.Util.Ensure.ensureString(h);
var j=(h.charAt(0)==="-");
var f=j?-1:1;
var i=j?h.substring(1):h;
var g;
if(i.length>=19&&i.charAt(4)==="-"&&i.charAt(7)==="-"&&i.charAt(10)==="T"&&i.charAt(13)===":"&&i.charAt(16)===":"){return this.parseDateTime(h)
}else{if(i.length>=10&&i.charAt(4)==="-"&&i.charAt(7)==="-"){return this.parseDate(h)
}else{if(i.length>=8&&i.charAt(2)===":"&&i.charAt(5)===":"){return this.parseTime(h)
}else{throw"Value ["+h+"] does not match dateTime, date or time patterns."
}}}},parseDateTime:function(p){Jsonix.Util.Ensure.ensureString(p);
var w=(p.charAt(0)==="-");
var B=w?-1:1;
var v=w?p.substring(1):p;
if(v.length<19||v.charAt(4)!=="-"||v.charAt(7)!=="-"||v.charAt(10)!=="T"||v.charAt(13)!==":"||v.charAt(16)!==":"){throw"Date time string ["+v+"] must be a string in format ['-'? yyyy '-' mm '-' dd 'T' hh ':' mm ':' ss ('.' s+)? (zzzzzz)?]."
}var x;
var A=v.indexOf("+",19);
if(A>=0){x=A
}else{var u=v.indexOf("-",19);
if(u>=0){x=u
}else{var s=v.indexOf("Z",19);
if(s>=0){x=s
}else{x=v.length
}}}var C=x>0&&x<v.length;
var r=v.substring(0,10);
var D=C?v.substring(11,x):v.substring(11);
var q=C?v.substring(x):"";
var y=this.parseDateString(r);
var z=this.parseTimeString(D);
var t=this.parseTimeZoneString(q);
return Jsonix.XML.Calendar.fromObject({year:B*y.year,month:y.month,day:y.day,hour:z.hour,minute:z.minute,second:z.second,fractionalSecond:z.fractionalSecond,timezone:t})
},parseDate:function(n){Jsonix.Util.Ensure.ensureString(n);
var u=(n.charAt(0)==="-");
var y=u?-1:1;
var r=u?n.substring(1):n;
var v;
var x=r.indexOf("+",10);
if(x>=0){v=x
}else{var t=r.indexOf("-",10);
if(t>=0){v=t
}else{var q=r.indexOf("Z",10);
if(q>=0){v=q
}else{v=r.length
}}}var z=v>0&&v<r.length;
var p=z?r.substring(0,v):r;
var w=this.parseDateString(p);
var o=z?n.substring(v):"";
var s=this.parseTimeZoneString(o);
return Jsonix.XML.Calendar.fromObject({year:y*w.year,month:w.month,day:w.day,timezone:s})
},parseTime:function(k){Jsonix.Util.Ensure.ensureString(k);
var p;
var r=k.indexOf("+",7);
if(r>=0){p=r
}else{var o=k.indexOf("-",7);
if(o>=0){p=o
}else{var m=k.indexOf("Z",7);
if(m>=0){p=m
}else{p=k.length
}}}var s=p>0&&p<k.length;
var t=s?k.substring(0,p):k;
var q=this.parseTimeString(t);
var l=s?k.substring(p):"";
var n=this.parseTimeZoneString(l);
return Jsonix.XML.Calendar.fromObject({hour:q.hour,minute:q.minute,second:q.second,fractionalSecond:q.fractionalSecond,timezone:n})
},parseDateString:function(g){Jsonix.Util.Ensure.ensureString(g);
if(g.length!==10){throw"Date string ["+g+"] must be 10 characters long."
}if(g.charAt(4)!=="-"||g.charAt(7)!=="-"){throw"Date string ["+g+"] must be a string in format [yyyy '-' mm '-' ss ]."
}var e=this.parseYear(g.substring(0,4));
var h=this.parseMonth(g.substring(5,7));
var f=this.parseDay(g.substring(8,10));
return{year:e,month:h,day:f}
},parseTimeString:function(r){Jsonix.Util.Ensure.ensureString(r);
if(r.length<8||r.charAt(2)!==":"||r.charAt(5)!==":"){throw"Time string ["+r+"] must be a string in format [hh ':' mm ':' ss ('.' s+)?]."
}var n=r.substring(0,2);
var k=r.substring(3,5);
var p=r.substring(6,8);
var j=r.length>=9?r.substring(8):"";
var m=this.parseHour(n);
var o=this.parseHour(k);
var q=this.parseSecond(p);
var l=this.parseFractionalSecond(j);
return{hour:m,minute:o,second:q,fractionalSecond:l}
},parseTimeZoneString:function(i){Jsonix.Util.Ensure.ensureString(i);
if(i===""){return NaN
}else{if(i==="Z"){return 0
}else{if(i.length!==6){throw"Time zone must be an empty string, 'Z' or a string in format [('+' | '-') hh ':' mm]."
}var h=i.charAt(0);
var f;
if(h==="+"){f=1
}else{if(h==="-"){f=-1
}else{throw"First character of the time zone ["+i+"] must be '+' or '-'."
}}var g=this.parseHour(i.substring(1,3));
var j=this.parseMinute(i.substring(4,6));
return f*(g*60+j)
}}},parseYear:function(c){Jsonix.Util.Ensure.ensureString(c);
if(c.length!==4){throw"Year ["+c+"] must be a four-digit number."
}var d=Number(c);
Jsonix.Util.Ensure.ensureInteger(d);
return d
},parseMonth:function(c){Jsonix.Util.Ensure.ensureString(c);
if(c.length!==2){throw"Month ["+c+"] must be a two-digit number."
}var d=Number(c);
Jsonix.Util.Ensure.ensureInteger(d);
return d
},parseDay:function(c){Jsonix.Util.Ensure.ensureString(c);
if(c.length!==2){throw"Day ["+c+"] must be a two-digit number."
}var d=Number(c);
Jsonix.Util.Ensure.ensureInteger(d);
return d
},parseHour:function(c){Jsonix.Util.Ensure.ensureString(c);
if(c.length!==2){throw"Hour ["+c+"] must be a two-digit number."
}var d=Number(c);
Jsonix.Util.Ensure.ensureInteger(d);
return d
},parseMinute:function(c){Jsonix.Util.Ensure.ensureString(c);
if(c.length!==2){throw"Minute ["+c+"] must be a two-digit number."
}var d=Number(c);
Jsonix.Util.Ensure.ensureInteger(d);
return d
},parseSecond:function(c){Jsonix.Util.Ensure.ensureString(c);
if(c.length!==2){throw"Second ["+c+"] must be a two-digit number."
}var d=Number(c);
Jsonix.Util.Ensure.ensureNumber(d);
return d
},parseFractionalSecond:function(c){Jsonix.Util.Ensure.ensureString(c);
if(c===""){return 0
}else{var d=Number(c);
Jsonix.Util.Ensure.ensureNumber(d);
return d
}},print:function(b){Jsonix.Util.Ensure.ensureObject(b);
if(Jsonix.Util.NumberUtils.isInteger(b.year)&&Jsonix.Util.NumberUtils.isInteger(b.month)&&Jsonix.Util.NumberUtils.isInteger(b.day)&&Jsonix.Util.NumberUtils.isInteger(b.hour)&&Jsonix.Util.NumberUtils.isInteger(b.minute)&&Jsonix.Util.NumberUtils.isInteger(b.second)){return this.printDateTime(b)
}else{if(Jsonix.Util.NumberUtils.isInteger(b.year)&&Jsonix.Util.NumberUtils.isInteger(b.month)&&Jsonix.Util.NumberUtils.isInteger(b.day)){return this.printDate(b)
}else{if(Jsonix.Util.NumberUtils.isInteger(b.hour)&&Jsonix.Util.NumberUtils.isInteger(b.minute)&&Jsonix.Util.NumberUtils.isInteger(b.second)){return this.printTime(b)
}else{throw"Value ["+b+"] is not recognized as dateTime, date or time."
}}}},printDateTime:function(c){Jsonix.Util.Ensure.ensureObject(c);
Jsonix.Util.Ensure.ensureInteger(c.year);
Jsonix.Util.Ensure.ensureInteger(c.month);
Jsonix.Util.Ensure.ensureInteger(c.day);
Jsonix.Util.Ensure.ensureInteger(c.hour);
Jsonix.Util.Ensure.ensureInteger(c.minute);
Jsonix.Util.Ensure.ensureNumber(c.second);
if(Jsonix.Util.Type.exists(c.fractionalString)){Jsonix.Util.Ensure.ensureNumber(c.fractionalString)
}if(Jsonix.Util.Type.exists(c.timezone)&&!Jsonix.Util.Type.isNaN(c.timezone)){Jsonix.Util.Ensure.ensureInteger(c.timezone)
}var d=this.printDateString(c);
d=d+"T";
d=d+this.printTimeString(c);
if(Jsonix.Util.Type.exists(c.timezone)){d=d+this.printTimeZoneString(c.timezone)
}return d
},printDate:function(c){Jsonix.Util.Ensure.ensureObject(c);
Jsonix.Util.Ensure.ensureNumber(c.year);
Jsonix.Util.Ensure.ensureNumber(c.month);
Jsonix.Util.Ensure.ensureNumber(c.day);
if(Jsonix.Util.Type.exists(c.timezone)&&!Jsonix.Util.Type.isNaN(c.timezone)){Jsonix.Util.Ensure.ensureInteger(c.timezone)
}var d=this.printDateString(c);
if(Jsonix.Util.Type.exists(c.timezone)){d=d+this.printTimeZoneString(c.timezone)
}return d
},printTime:function(c){Jsonix.Util.Ensure.ensureObject(c);
Jsonix.Util.Ensure.ensureNumber(c.hour);
Jsonix.Util.Ensure.ensureNumber(c.minute);
Jsonix.Util.Ensure.ensureNumber(c.second);
if(Jsonix.Util.Type.exists(c.fractionalString)){Jsonix.Util.Ensure.ensureNumber(c.fractionalString)
}if(Jsonix.Util.Type.exists(c.timezone)&&!Jsonix.Util.Type.isNaN(c.timezone)){Jsonix.Util.Ensure.ensureInteger(c.timezone)
}var d=this.printTimeString(c);
if(Jsonix.Util.Type.exists(c.timezone)){d=d+this.printTimeZoneString(c.timezone)
}return d
},printDateString:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Util.Ensure.ensureInteger(b.year);
Jsonix.Util.Ensure.ensureInteger(b.month);
Jsonix.Util.Ensure.ensureInteger(b.day);
return(b.year<0?("-"+this.printYear(-b.year)):this.printYear(b.year))+"-"+this.printMonth(b.month)+"-"+this.printDay(b.day)
},printTimeString:function(c){Jsonix.Util.Ensure.ensureObject(c);
Jsonix.Util.Ensure.ensureInteger(c.hour);
Jsonix.Util.Ensure.ensureInteger(c.minute);
Jsonix.Util.Ensure.ensureInteger(c.second);
if(Jsonix.Util.Type.exists(c.fractionalSecond)){Jsonix.Util.Ensure.ensureNumber(c.fractionalSecond)
}var d=this.printHour(c.hour);
d=d+":";
d=d+this.printMinute(c.minute);
d=d+":";
d=d+this.printSecond(c.second);
if(Jsonix.Util.Type.exists(c.fractionalSecond)){d=d+this.printFractionalSecond(c.fractionalSecond)
}return d
},printTimeZoneString:function(j){if(!Jsonix.Util.Type.exists(j)||Jsonix.Util.Type.isNaN(j)){return""
}else{Jsonix.Util.Ensure.ensureInteger(j);
var l=j<0?-1:(j>0?1:0);
var k=j*l;
var i=k%60;
var g=Math.floor(k/60);
var h;
if(l===0){return"Z"
}else{if(l>0){h="+"
}else{if(l<0){h="-"
}}h=h+this.printHour(g);
h=h+":";
h=h+this.printMinute(i);
return h
}}},printYear:function(b){return this.printInteger(b,4)
},printMonth:function(b){return this.printInteger(b,2)
},printDay:function(b){return this.printInteger(b,2)
},printHour:function(b){return this.printInteger(b,2)
},printMinute:function(b){return this.printInteger(b,2)
},printSecond:function(b){return this.printInteger(b,2)
},printFractionalSecond:function(f){Jsonix.Util.Ensure.ensureNumber(f);
if(f<0||f>=1){throw"Fractional second ["+f+"] must be between 0 and 1."
}else{if(f===0){return""
}else{var e=String(f);
var d=e.indexOf(".");
if(d<0){return""
}else{return e.substring(d)
}}}},printInteger:function(g,h){Jsonix.Util.Ensure.ensureInteger(g);
Jsonix.Util.Ensure.ensureInteger(h);
if(h<=0){throw"Length ["+g+"] must be positive."
}if(g<0){throw"Value ["+g+"] must not be negative."
}if(g>=Math.pow(10,h)){throw"Value ["+g+"] must be less than ["+Math.pow(10,h)+"]."
}var f=String(g);
for(var e=f.length;
e<h;
e++){f="0"+f
}return f
},isInstance:function(b){return Jsonix.Util.Type.isObject(b)&&((Jsonix.Util.NumberUtils.isInteger(b.year)&&Jsonix.Util.NumberUtils.isInteger(b.month)&&Jsonix.Util.NumberUtils.isInteger(b.day))||(Jsonix.Util.NumberUtils.isInteger(b.hour)&&Jsonix.Util.NumberUtils.isInteger(b.minute)&&Jsonix.Util.NumberUtils.isInteger(b.second)))
},CLASS_NAME:"Jsonix.Schema.XSD.Calendar"});
Jsonix.Schema.XSD.Calendar.INSTANCE=new Jsonix.Schema.XSD.Calendar();
Jsonix.Schema.XSD.Calendar.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Calendar.INSTANCE);
Jsonix.Schema.XSD.Duration=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("duration"),CLASS_NAME:"Jsonix.Schema.XSD.Duration"});
Jsonix.Schema.XSD.Duration.INSTANCE=new Jsonix.Schema.XSD.Duration();
Jsonix.Schema.XSD.Duration.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Duration.INSTANCE);
Jsonix.Schema.XSD.DateTime=Jsonix.Class(Jsonix.Schema.XSD.Calendar,{typeName:Jsonix.Schema.XSD.qname("dateTime"),parse:function(d){var f=this.parseDateTime(d);
var e=new Date();
e.setFullYear(f.year);
e.setMonth(f.month-1);
e.setDate(f.day);
e.setHours(f.hour);
e.setMinutes(f.minute);
e.setSeconds(f.second);
if(Jsonix.Util.Type.isNumber(f.fractionalSecond)){e.setMilliseconds(Math.floor(1000*f.fractionalSecond))
}if(Jsonix.Util.NumberUtils.isInteger(f.timezone)){return new Date(e.getTime()-(60000*e.getTimezoneOffset())+(f.timezone*60000))
}else{return e
}},print:function(b){Jsonix.Util.Ensure.ensureDate(b);
return this.printDateTime(new Jsonix.XML.Calendar({year:b.getFullYear(),month:b.getMonth()+1,day:b.getDate(),hour:b.getHours(),minute:b.getMinutes(),second:b.getSeconds(),fractionalSecond:(b.getMilliseconds()/1000)}))
},isInstance:function(b){return Jsonix.Util.Type.isDate(b)
},CLASS_NAME:"Jsonix.Schema.XSD.DateTime"});
Jsonix.Schema.XSD.DateTime.INSTANCE=new Jsonix.Schema.XSD.DateTime();
Jsonix.Schema.XSD.DateTime.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.DateTime.INSTANCE);
Jsonix.Schema.XSD.Time=Jsonix.Class(Jsonix.Schema.XSD.Calendar,{typeName:Jsonix.Schema.XSD.qname("time"),parse:function(j){var h=this.parseTime(j);
if(Jsonix.Util.NumberUtils.isInteger(h.timezone)){var f=new Date(70,0,1,h.hour,h.minute,h.second);
if(Jsonix.Util.Type.isNumber(h.fractionalSecond)){f.setMilliseconds(Math.floor(1000*h.fractionalSecond))
}var i=f.getTime()-(h.timezone*60000);
return new Date(i-(60000*f.getTimezoneOffset()))
}else{var g=new Date(70,0,1,h.hour,h.minute,h.second);
if(Jsonix.Util.Type.isNumber(h.fractionalSecond)){g.setMilliseconds(Math.floor(1000*h.fractionalSecond))
}return g
}},print:function(d){Jsonix.Util.Ensure.ensureDate(d);
var f=d.getTime();
if(f<=-86400000&&f>=86400000){throw"Invalid time ["+d+"]."
}if(f>=0){return this.printTime(new Jsonix.XML.Calendar({hour:d.getHours(),minute:d.getMinutes(),second:d.getSeconds(),fractionalSecond:(d.getMilliseconds()/1000)}))
}else{var e=Math.ceil(-f/3600000);
return this.printTime(new Jsonix.XML.Calendar({hour:(d.getUTCHours()+e)%24,minute:d.getUTCMinutes(),second:d.getUTCSeconds(),fractionalSecond:(d.getUTCMilliseconds()/1000),timezone:e*60}))
}},isInstance:function(b){return Jsonix.Util.Type.isDate(b)&&b.getTime()>-86400000&&b.getTime()<86400000
},CLASS_NAME:"Jsonix.Schema.XSD.Time"});
Jsonix.Schema.XSD.Time.INSTANCE=new Jsonix.Schema.XSD.Time();
Jsonix.Schema.XSD.Time.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Time.INSTANCE);
Jsonix.Schema.XSD.Date=Jsonix.Class(Jsonix.Schema.XSD.Calendar,{typeName:Jsonix.Schema.XSD.qname("date"),parse:function(h){var g=this.parseDate(h);
if(Jsonix.Util.NumberUtils.isInteger(g.timezone)){var e=new Date();
e.setFullYear(g.year);
e.setMonth(g.month-1);
e.setDate(g.day);
e.setHours(0);
e.setMinutes(0);
e.setSeconds(0);
e.setMilliseconds(0);
return new Date(e.getTime()-(60000*e.getTimezoneOffset())+(g.timezone*60000))
}else{var f=new Date();
f.setFullYear(g.year);
f.setMonth(g.month-1);
f.setDate(g.day);
f.setHours(0);
f.setMinutes(0);
f.setSeconds(0);
f.setMilliseconds(0);
return f
}},print:function(j){Jsonix.Util.Ensure.ensureDate(j);
var g=new Date(j.getTime());
g.setHours(0);
g.setMinutes(0);
g.setSeconds(0);
g.setMilliseconds(0);
var h=j.getTime()-g.getTime();
if(h===0){return this.printDate(new Jsonix.XML.Calendar({year:j.getFullYear(),month:j.getMonth()+1,day:j.getDate()}))
}else{var f=h+(60000*j.getTimezoneOffset());
if(f<=43200000){return this.printDate(new Jsonix.XML.Calendar({year:j.getFullYear(),month:j.getMonth()+1,day:j.getDate(),timezone:Math.floor(f/(60000))}))
}else{var i=new Date(j.getTime()+86400000);
return this.printDate(new Jsonix.XML.Calendar({year:i.getFullYear(),month:i.getMonth()+1,day:i.getDate(),timezone:(Math.floor(f/(60000))-1440)}))
}}},isInstance:function(b){return Jsonix.Util.Type.isDate(b)
},CLASS_NAME:"Jsonix.Schema.XSD.Date"});
Jsonix.Schema.XSD.Date.INSTANCE=new Jsonix.Schema.XSD.Date();
Jsonix.Schema.XSD.Date.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.Date.INSTANCE);
Jsonix.Schema.XSD.GYearMonth=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("gYearMonth"),CLASS_NAME:"Jsonix.Schema.XSD.GYearMonth"});
Jsonix.Schema.XSD.GYearMonth.INSTANCE=new Jsonix.Schema.XSD.GYearMonth();
Jsonix.Schema.XSD.GYearMonth.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GYearMonth.INSTANCE);
Jsonix.Schema.XSD.GYear=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("gYear"),CLASS_NAME:"Jsonix.Schema.XSD.GYear"});
Jsonix.Schema.XSD.GYear.INSTANCE=new Jsonix.Schema.XSD.GYear();
Jsonix.Schema.XSD.GYear.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GYear.INSTANCE);
Jsonix.Schema.XSD.GMonthDay=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("gMonthDay"),CLASS_NAME:"Jsonix.Schema.XSD.GMonthDay"});
Jsonix.Schema.XSD.GMonthDay.INSTANCE=new Jsonix.Schema.XSD.GMonthDay();
Jsonix.Schema.XSD.GMonthDay.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GMonthDay.INSTANCE);
Jsonix.Schema.XSD.GDay=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("gDay"),CLASS_NAME:"Jsonix.Schema.XSD.GDay"});
Jsonix.Schema.XSD.GDay.INSTANCE=new Jsonix.Schema.XSD.GDay();
Jsonix.Schema.XSD.GDay.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GDay.INSTANCE);
Jsonix.Schema.XSD.GMonth=Jsonix.Class(Jsonix.Schema.XSD.AnySimpleType,{typeName:Jsonix.Schema.XSD.qname("gMonth"),CLASS_NAME:"Jsonix.Schema.XSD.GMonth"});
Jsonix.Schema.XSD.GMonth.INSTANCE=new Jsonix.Schema.XSD.GMonth();
Jsonix.Schema.XSD.GMonth.INSTANCE.LIST=new Jsonix.Schema.XSD.List(Jsonix.Schema.XSD.GMonth.INSTANCE);
Jsonix.Model.ClassInfo=Jsonix.Class({name:null,baseTypeInfo:null,properties:null,structure:null,initialize:function(c){Jsonix.Util.Ensure.ensureObject(c);
Jsonix.Util.Ensure.ensureString(c.name);
this.name=c.name;
if(Jsonix.Util.Type.exists(c.baseTypeInfo)){Jsonix.Util.Ensure.ensureObject(c.baseTypeInfo);
this.baseTypeInfo=c.baseTypeInfo
}this.properties=[];
if(Jsonix.Util.Type.exists(c.properties)){Jsonix.Util.Ensure.ensureArray(c.properties);
for(var d=0;
d<c.properties.length;
d++){this.properties[d]=c.properties[d]
}}},destroy:function(){},build:function(c){if(this.structure!==null){return
}var d={elements:null,attributes:{},anyAttribute:null,value:null,any:null};
if(Jsonix.Util.Type.exists(this.baseTypeInfo)){this.baseTypeInfo.buildStructure(c,d)
}this.buildStructure(c,d);
this.structure=d
},buildStructure:function(h,f){for(var e=0;
e<this.properties.length;
e++){var g=this.properties[e];
g.buildStructure(h,f)
}},unmarshal:function(D,w){this.build(D);
var q={};
if(w.eventType!==1){throw"Parser must be on START_ELEMENT to read a class info."
}if(Jsonix.Util.Type.exists(this.structure.attributes)){var F=w.getAttributeCount();
if(F!==0){for(var A=0;
A<F;
A++){var y=w.getAttributeName(A);
var C=y.key;
if(Jsonix.Util.Type.exists(this.structure.attributes[C])){var E=this.structure.attributes[C];
this.unmarshalProperty(D,w,E,q)
}}}}if(Jsonix.Util.Type.exists(this.structure.anyAttribute)){var z=this.structure.anyAttribute;
this.unmarshalProperty(D,w,z,q)
}if(Jsonix.Util.Type.exists(this.structure.elements)){var v=w.next();
while(v!==Jsonix.XML.Input.END_ELEMENT){if(v===Jsonix.XML.Input.START_ELEMENT){var r=w.getName();
var B=r.key;
if(Jsonix.Util.Type.exists(this.structure.elements[B])){var s=this.structure.elements[B];
this.unmarshalProperty(D,w,s,q)
}else{if(Jsonix.Util.Type.exists(this.structure.any)){var t=this.structure.any;
this.unmarshalProperty(D,w,t,q)
}else{throw"Unexpected element ["+B+"]."
}}}else{if((v===Jsonix.XML.Input.CHARACTERS||v===Jsonix.XML.Input.CDATA||v===Jsonix.XML.Input.ENTITY_REFERENCE)&&Jsonix.Util.Type.exists(this.structure.mixed)){var x=this.structure.mixed;
this.unmarshalProperty(D,w,x,q)
}else{if(v===Jsonix.XML.Input.SPACE||v===Jsonix.XML.Input.COMMENT||v===Jsonix.XML.Input.PROCESSING_INSTRUCTION){}else{throw"Illegal state: unexpected event type ["+v+"]."
}}}v=w.next()
}}else{if(Jsonix.Util.Type.exists(this.structure.value)){var u=this.structure.value;
this.unmarshalProperty(D,w,u,q)
}else{w.nextTag()
}}if(w.eventType!==2){throw"Illegal state: must be END_ELEMENT."
}return q
},unmarshalProperty:function(j,l,i,h){var g=i.unmarshal(j,this,l);
if(Jsonix.Util.Type.exists(g)){if(i.collection){if(!Jsonix.Util.Type.exists(h[i.name])){h[i.name]=[]
}for(var k=0;
k<g.length;
k++){h[i.name].push(g[k])
}}else{h[i.name]=g
}}},marshal:function(k,i,g){if(Jsonix.Util.Type.exists(this.baseTypeInfo)){this.baseTypeInfo.marshal(k,i,g)
}for(var l=0;
l<this.properties.length;
l++){var j=this.properties[l];
var h=i[j.name];
if(Jsonix.Util.Type.exists(h)){j.marshal(k,this,h,g)
}}},isInstance:function(b){return Jsonix.Util.Type.isObject(b)&&Jsonix.Util.Type.isString(b.TYPE_NAME)&&b.TYPE_NAME===this.name
}});
Jsonix.Model.PropertyInfo=Jsonix.Class({name:null,collection:false,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Util.Ensure.ensureString(b.name);
this.name=b.name;
if(Jsonix.Util.Type.isBoolean(b.collection)){this.collection=b.collection
}else{this.collection=false
}},buildStructure:function(c,d){throw"Abstract method [buildStructure]."
},CLASS_NAME:"Jsonix.Model.PropertyInfo"});
Jsonix.Model.AnyAttributePropertyInfo=Jsonix.Class(Jsonix.Model.PropertyInfo,{initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Model.PropertyInfo.prototype.initialize.apply(this,[b])
},unmarshal:function(m,k,i){var n=i.getAttributeCount();
if(n===0){return null
}else{var j={};
for(var o=0;
o<n;
o++){var p=i.getAttributeName(o);
var l=i.getAttributeValue(o);
if(Jsonix.Util.Type.isString(l)){j[p.key]=l
}}return j
}},marshal:function(l,j,i,h){if(!Jsonix.Util.Type.isObject(i)){return
}for(var g in i){if(i.hasOwnProperty(g)){var k=i[g];
if(Jsonix.Util.Type.isString(k)){h.writeAttribute(Jsonix.XML.QName.fromString(g),k)
}}}},buildStructure:function(c,d){Jsonix.Util.Ensure.ensureObject(d);
d.anyAttribute=this
},CLASS_NAME:"Jsonix.Model.AnyAttributePropertyInfo"});
Jsonix.Model.SingleTypePropertyInfo=Jsonix.Class(Jsonix.Model.PropertyInfo,{typeInfo:null,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Model.PropertyInfo.prototype.initialize.apply(this,[b]);
Jsonix.Util.Ensure.ensureObject(b.typeInfo);
this.typeInfo=b.typeInfo
},CLASS_NAME:"Jsonix.Model.SingleTypePropertyInfo"});
Jsonix.Model.AttributePropertyInfo=Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo,{attributeName:null,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this,[b]);
if(Jsonix.Util.Type.isObject(b.attributeName)){this.attributeName=b.attributeName
}else{this.attributeName=new Jsonix.XML.QName(this.name)
}},unmarshal:function(m,k,i){var n=i.getAttributeCount();
var j=null;
for(var o=0;
o<n;
o++){var p=i.getAttributeName(o);
if(this.attributeName.key===p.key){var l=i.getAttributeValue(o);
if(Jsonix.Util.Type.isString(l)){j=this.typeInfo.parse(l)
}}}return j
},marshal:function(e,h,g,f){if(Jsonix.Util.Type.exists(g)){f.writeAttribute(this.attributeName,this.typeInfo.print(g))
}},buildStructure:function(f,e){Jsonix.Util.Ensure.ensureObject(e);
Jsonix.Util.Ensure.ensureObject(e.attributes);
var d=this.attributeName.key;
e.attributes[d]=this
},CLASS_NAME:"Jsonix.Model.AttributePropertyInfo"});
Jsonix.Model.ValuePropertyInfo=Jsonix.Class(Jsonix.Model.SingleTypePropertyInfo,{initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Model.SingleTypePropertyInfo.prototype.initialize.apply(this,[b])
},unmarshal:function(e,h,f){var g=f.getElementText();
if(Jsonix.Util.StringUtils.isNotBlank(g)){return this.typeInfo.parse(g)
}else{return null
}},marshal:function(e,h,g,f){if(!Jsonix.Util.Type.exists(g)){return
}f.writeCharacters(this.typeInfo.print(g))
},buildStructure:function(c,d){Jsonix.Util.Ensure.ensureObject(d);
if(Jsonix.Util.Type.exists(d.elements)){throw"The structure already defines element mappings, it cannot define a value property."
}else{d.value=this
}},CLASS_NAME:"Jsonix.Model.ValuePropertyInfo"});
Jsonix.Model.AbstractElementsPropertyInfo=Jsonix.Class(Jsonix.Model.PropertyInfo,{wrapperElementName:null,elementTypeInfos:null,elementTypeInfosMap:null,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Model.PropertyInfo.prototype.initialize.apply(this,[b]);
if(Jsonix.Util.Type.isObject(b.wrapperElementName)){this.wrapperElementName=b.wrapperElementName
}else{this.wrapperElementName=null
}},unmarshal:function(d,f,e){if(Jsonix.Util.Type.exists(this.wrapperElementName)){return this.unmarshalWrapperElement(d,e)
}else{return this.unmarshalElement(d,e)
}},unmarshalWrapperElement:function(k,g){var h=null;
var i=g.next();
while(i!==Jsonix.XML.Input.END_ELEMENT){if(i===Jsonix.XML.Input.START_ELEMENT){var j=this.unmarshalElement(k,g);
if(this.collection){if(h===null){h=[]
}for(var l=0;
l<j.length;
l++){h.push(j[l])
}}else{if(h===null){h=j
}else{throw"Value already set."
}}}else{if(i===Jsonix.XML.Input.SPACE||i===Jsonix.XML.Input.COMMENT||i===Jsonix.XML.Input.PROCESSING_INSTRUCTION){}else{throw"Illegal state: unexpected event type ["+i+"]."
}}i=g.next()
}return h
},unmarshalElement:function(c,d){throw"Abstract method [unmarshalElement]."
},unmarshalElementTypeInfo:function(e,f,g){var h=g.unmarshal(e,f);
if(this.collection){return[h]
}else{return h
}},marshal:function(l,k,i,h){if(!Jsonix.Util.Type.exists(i)){return
}if(Jsonix.Util.Type.exists(this.wrapperElementName)){h.writeStartElement(this.wrapperElementName)
}if(!this.collection){this.marshalElement(l,i,h)
}else{Jsonix.Util.Ensure.ensureArray(i);
for(var g=0;
g<i.length;
g++){var j=i[g];
this.marshalElement(l,j,h)
}}if(Jsonix.Util.Type.exists(this.wrapperElementName)){h.writeEndElement()
}},marshalElement:function(d,f,e){throw"Abstract method [marshalElement]."
},marshalElementTypeInfo:function(j,h,g,i,f){f.writeStartElement(g);
i.marshal(j,h,f);
f.writeEndElement()
},buildStructure:function(c,d){Jsonix.Util.Ensure.ensureObject(d);
if(Jsonix.Util.Type.exists(d.value)){throw"The structure already defines a value property."
}else{if(!Jsonix.Util.Type.exists(d.elements)){d.elements={}
}}if(Jsonix.Util.Type.exists(this.wrapperElementName)){d.elements[this.wrapperElementName.key]=this
}else{this.buildStructureElements(c,d)
}},buildStructureElements:function(c,d){throw"Abstract method [buildStructureElements]."
},CLASS_NAME:"Jsonix.Model.AbstractElementsPropertyInfo"});
Jsonix.Model.ElementPropertyInfo=Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo,{typeInfo:null,elementName:null,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this,[b]);
Jsonix.Util.Ensure.ensureObject(b.typeInfo);
this.typeInfo=b.typeInfo;
if(Jsonix.Util.Type.isObject(b.elementName)){this.elementName=b.elementName
}else{this.elementName=new Jsonix.XML.QName(this.name)
}},unmarshalElement:function(c,d){return this.unmarshalElementTypeInfo(c,d,this.typeInfo)
},marshalElement:function(d,f,e){this.marshalElementTypeInfo(d,f,this.elementName,this.typeInfo,e)
},buildStructureElements:function(c,d){d.elements[this.elementName.key]=this
},CLASS_NAME:"Jsonix.Model.ElementPropertyInfo"});
Jsonix.Model.ElementsPropertyInfo=Jsonix.Class(Jsonix.Model.AbstractElementsPropertyInfo,{elementTypeInfos:null,elementTypeInfosMap:null,initialize:function(f){Jsonix.Util.Ensure.ensureObject(f);
Jsonix.Model.AbstractElementsPropertyInfo.prototype.initialize.apply(this,[f]);
Jsonix.Util.Ensure.ensureArray(f.elementTypeInfos);
this.elementTypeInfos=f.elementTypeInfos;
this.elementTypeInfosMap={};
for(var d=0;
d<this.elementTypeInfos.length;
d++){var e=this.elementTypeInfos[d];
Jsonix.Util.Ensure.ensureObject(e);
this.elementTypeInfosMap[e.elementName.key]=e.typeInfo
}},unmarshalElement:function(i,f){var g=f.getName();
var j=g.key;
var h=this.elementTypeInfosMap[j];
if(Jsonix.Util.Type.exists(h)){return this.unmarshalElementTypeInfo(i,f,h)
}throw"Element ["+j+"] is not known in this context"
},marshalElement:function(l,j,n){for(var m=0;
m<this.elementTypeInfos.length;
m++){var h=this.elementTypeInfos[m];
var k=h.typeInfo;
if(k.isInstance(j)){var i=h.elementName;
this.marshalElementTypeInfo(l,j,i,k,n);
return
}}throw"Could not find an element with type info supporting the value ["+j+"]."
},buildStructureElements:function(g,f){for(var h=0;
h<this.elementTypeInfos.length;
h++){var e=this.elementTypeInfos[h];
f.elements[e.elementName.key]=this
}},CLASS_NAME:"Jsonix.Model.ElementsPropertyInfo"});
Jsonix.Model.AbstractElementRefsPropertyInfo=Jsonix.Class(Jsonix.Model.PropertyInfo,{wrapperElementName:null,mixed:false,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b,"Options argument must be an object.");
Jsonix.Model.PropertyInfo.prototype.initialize.apply(this,[b]);
if(Jsonix.Util.Type.isObject(b.wrapperElementName)){Jsonix.Util.Ensure.ensureString(b.wrapperElementName.localPart,"Wrapper element name must contain a string property [localPart].");
this.wrapperElementName=Jsonix.XML.QName.fromObject(b.wrapperElementName)
}else{this.wrapperElementName=null
}if(Jsonix.Util.Type.isBoolean(b.mixed)){this.mixed=b.mixed
}else{this.mixed=false
}},unmarshal:function(f,j,g){var h=g.eventType;
if(h===Jsonix.XML.Input.START_ELEMENT){if(Jsonix.Util.Type.exists(this.wrapperElementName)){return this.unmarshalWrapperElement(f,j,g)
}else{return this.unmarshalElement(f,j,g)
}}else{if(this.mixed&&(h===Jsonix.XML.Input.CHARACTERS||h===Jsonix.XML.Input.CDATA||h===Jsonix.XML.Input.ENTITY_REFERENCE)){var i=g.getText();
if(this.collection){return[i]
}else{return i
}}else{if(h===Jsonix.XML.Input.SPACE||h===Jsonix.XML.Input.COMMENT||h===Jsonix.XML.Input.PROCESSING_INSTRUCTION){}else{throw"Illegal state: unexpected event type ["+h+"]."
}}}},unmarshalWrapperElement:function(q,k,o){var j=null;
var n=o.next();
while(n!==Jsonix.XML.Input.END_ELEMENT){if(n===Jsonix.XML.Input.START_ELEMENT){var r=o.getName();
var m=this.unmarshalElement(q,k,o);
if(this.collection){if(j===null){j=[]
}for(var p=0;
p<m.length;
p++){j.push(m[p])
}}else{if(j===null){j=m
}else{throw"Value already set."
}}}else{if(this.mixed&&(n===Jsonix.XML.Input.CHARACTERS||n===Jsonix.XML.Input.CDATA||n===Jsonix.XML.Input.ENTITY_REFERENCE)){var l=o.getText();
if(this.collection){if(j===null){j=[]
}j.push(l)
}else{if(j===null){j=l
}else{throw"Value already set."
}}}else{if(n===Jsonix.XML.Input.SPACE||n===Jsonix.XML.Input.COMMENT||n===Jsonix.XML.Input.PROCESSING_INSTRUCTION){}else{throw"Illegal state: unexpected event type ["+n+"]."
}}}n=o.next()
}return j
},unmarshalElement:function(l,k,h){var g=h.getName();
var i=this.getElementTypeInfo(l,k,g);
var j={name:h.getName(),value:i.unmarshal(l,h)};
if(this.collection){return[j]
}else{return j
}},marshal:function(l,k,i,h){if(Jsonix.Util.Type.exists(i)){if(Jsonix.Util.Type.exists(this.wrapperElementName)){h.writeStartElement(this.wrapperElementName)
}if(!this.collection){this.marshalItem(l,k,i,h)
}else{Jsonix.Util.Ensure.ensureArray(i,"Collection property requires an array value.");
for(var g=0;
g<i.length;
g++){var j=i[g];
this.marshalItem(l,k,j,h)
}}if(Jsonix.Util.Type.exists(this.wrapperElementName)){h.writeEndElement()
}}},marshalItem:function(e,h,g,f){if(Jsonix.Util.Type.isString(g)){if(!this.mixed){throw"Property is not mixed, can't handle string values."
}else{f.writeCharacters(g)
}}else{if(Jsonix.Util.Type.isObject(g)){this.marshalElement(e,h,g,f)
}else{if(this.mixed){throw"Unsupported content type, either objects or strings are supported."
}else{throw"Unsupported content type, only objects are supported."
}}}},marshalElement:function(l,k,i,g){var h=Jsonix.XML.QName.fromObject(i.name);
var j=this.getElementTypeInfo(l,k,h);
return this.marshalElementTypeInfo(l,i,h,j,g)
},marshalElementTypeInfo:function(j,h,g,i,f){f.writeStartElement(g);
if(Jsonix.Util.Type.exists(h.value)){i.marshal(j,h.value,f)
}f.writeEndElement()
},getElementTypeInfo:function(f,i,g){var j=this.getPropertyElementTypeInfo(g);
if(Jsonix.Util.Type.exists(j)){return j.typeInfo
}else{var h=f.getElementInfo(g,i);
if(Jsonix.Util.Type.exists(h)){return h.typeInfo
}else{throw"Element ["+g.key+"] is not known in this context."
}}},getPropertyElementTypeInfo:function(b){throw"Abstract method [getPropertyElementTypeInfo]."
},buildStructure:function(c,d){Jsonix.Util.Ensure.ensureObject(d);
if(Jsonix.Util.Type.exists(d.value)){throw"The structure already defines a value property."
}else{if(!Jsonix.Util.Type.exists(d.elements)){d.elements={}
}}if(Jsonix.Util.Type.exists(this.wrapperElementName)){d.elements[this.wrapperElementName.key]=this
}else{this.buildStructureElements(c,d)
}if(this.mixed&&!Jsonix.Util.Type.exists(this.wrapperElementName)){d.mixed=this
}},buildStructureElements:function(c,d){throw"Abstract method [buildStructureElements]."
},buildStructureElementTypeInfos:function(k,h,g){h.elements[g.elementName.key]=this;
var l=k.getSubstitutionMembers(g.elementName);
if(Jsonix.Util.Type.isArray(l)){for(var i=0;
i<l.length;
i++){var j=l[i];
this.buildStructureElementTypeInfos(k,h,j)
}}},CLASS_NAME:"Jsonix.Model.ElementRefPropertyInfo"});
Jsonix.Model.ElementRefPropertyInfo=Jsonix.Class(Jsonix.Model.AbstractElementRefsPropertyInfo,{typeInfo:null,elementName:null,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize.apply(this,[b]);
Jsonix.Util.Ensure.ensureObject(b.typeInfo);
this.typeInfo=b.typeInfo;
if(Jsonix.Util.Type.isObject(b.elementName)){this.elementName=b.elementName
}else{this.elementName=new Jsonix.XML.QName(this.name)
}},getPropertyElementTypeInfo:function(d){Jsonix.Util.Ensure.ensureObject(d);
Jsonix.Util.Ensure.ensureString(d.localPart);
var c=Jsonix.XML.QName.fromObject(d);
if(c.key===this.elementName.key){return this
}else{return null
}},buildStructureElements:function(c,d){this.buildStructureElementTypeInfos(c,d,this)
},CLASS_NAME:"Jsonix.Model.ElementRefPropertyInfo"});
Jsonix.Model.ElementRefsPropertyInfo=Jsonix.Class(Jsonix.Model.AbstractElementRefsPropertyInfo,{elementTypeInfos:null,elementTypeInfosMap:null,initialize:function(f){Jsonix.Util.Ensure.ensureObject(f);
Jsonix.Model.AbstractElementRefsPropertyInfo.prototype.initialize.apply(this,[f]);
Jsonix.Util.Ensure.ensureArray(f.elementTypeInfos);
this.elementTypeInfos=f.elementTypeInfos;
this.elementTypeInfosMap={};
for(var d=0;
d<this.elementTypeInfos.length;
d++){var e=this.elementTypeInfos[d];
Jsonix.Util.Ensure.ensureObject(e);
this.elementTypeInfosMap[e.elementName.key]=e.typeInfo
}},getPropertyElementTypeInfo:function(e){Jsonix.Util.Ensure.ensureObject(e);
Jsonix.Util.Ensure.ensureString(e.localPart);
var d=Jsonix.XML.QName.fromObject(e);
var f=this.elementTypeInfosMap[d.key];
if(Jsonix.Util.Type.exists(f)){return{elementName:d,typeInfo:f}
}else{return null
}},buildStructureElements:function(g,f){for(var h=0;
h<this.elementTypeInfos.length;
h++){var e=this.elementTypeInfos[h];
this.buildStructureElementTypeInfos(g,f,e)
}},CLASS_NAME:"Jsonix.Model.ElementRefsPropertyInfo"});
Jsonix.Model.AnyElementPropertyInfo=Jsonix.Class(Jsonix.Model.PropertyInfo,{allowDom:true,allowTypedObject:true,mixed:true,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
Jsonix.Model.PropertyInfo.prototype.initialize.apply(this,[b]);
if(Jsonix.Util.Type.isBoolean(b.allowDom)){this.allowDom=b.allowDom
}else{this.allowDom=true
}if(Jsonix.Util.Type.isBoolean(b.allowTypedObject)){this.allowTypedObject=b.allowTypedObject
}else{this.allowTypedObject=true
}if(Jsonix.Util.Type.isBoolean(b.mixed)){this.mixed=b.mixed
}else{this.mixed=true
}},unmarshal:function(f,j,g){var h=g.eventType;
if(h===Jsonix.XML.Input.START_ELEMENT){return this.unmarshalElement(f,j,g)
}else{if(this.mixed&&(h===4||h===12||h===9)){var i=g.getText();
if(this.collection){return[i]
}else{return i
}}else{if(this.mixed&&(h===Jsonix.XML.Input.SPACE)){return null
}else{if(h===Jsonix.XML.Input.COMMENT||h===Jsonix.XML.Input.PROCESSING_INSTRUCTION){return null
}else{throw"Illegal state: unexpected event type ["+h+"]."
}}}}},unmarshalElement:function(l,k,h){var g=h.getName();
var i;
if(this.allowTypedObject&&Jsonix.Util.Type.exists(l.getElementInfo(g,k))){var j=l.getElementInfo(g,k).typeInfo;
i={name:g,value:j.unmarshal(l,h)}
}else{if(this.allowDom){i=h.getElement()
}else{throw"Element ["+g.toString()+"] is not known in this context and property does not allow DOM."
}}if(this.collection){return[i]
}else{return i
}},marshal:function(j,i,h,g){if(!Jsonix.Util.Type.exists(h)){return
}if(!this.collection){this.marshalItem(j,h,g)
}else{Jsonix.Util.Ensure.ensureArray(h);
for(var f=0;
f<h.length;
f++){this.marshalItem(j,h[f],g)
}}},marshalItem:function(j,h,g){if(this.mixed&&Jsonix.Util.Type.isString(h)){g.writeCharacters(h)
}else{if(this.allowDom&&Jsonix.Util.Type.exists(h.nodeType)){g.writeNode(h)
}else{var f=Jsonix.XML.QName.fromObject(h.name);
if(this.allowTypedObject&&Jsonix.Util.Type.exists(j.getElementInfo(f))){var i=j.getElementInfo(f).typeInfo;
g.writeStartElement(f);
i.marshal(j,h.value,g);
g.writeEndElement()
}else{throw"Element ["+f.toString()+"] is not known in this context"
}}}},buildStructure:function(c,d){Jsonix.Util.Ensure.ensureObject(d);
if(Jsonix.Util.Type.exists(d.value)){throw"The structure already defines a value property."
}else{if(!Jsonix.Util.Type.exists(d.elements)){d.elements={}
}}if((this.allowDom||this.allowTypedObject)){d.any=this
}if(this.mixed){d.mixed=this
}},CLASS_NAME:"Jsonix.Model.AnyElementPropertyInfo"});
Jsonix.Context=Jsonix.Class({elementInfos:null,properties:null,substitutionMembersMap:null,scopedElementInfosMap:null,initialize:function(v,p){this.elementInfos=[];
this.properties={namespacePrefixes:{}};
Jsonix.Util.Ensure.ensureArray(v);
for(var q=0;
q<v.length;
q++){var u=v[q];
Jsonix.Util.Ensure.ensureArray(u.elementInfos);
for(var t=0;
t<u.elementInfos.length;
t++){this.elementInfos.push(u.elementInfos[t])
}}if(Jsonix.Util.Type.isObject(p)){if(Jsonix.Util.Type.isObject(p.namespacePrefixes)){this.properties.namespacePrefixes=p.namespacePrefixes
}}this.substitutionMembersMap={};
this.scopedElementInfosMap={};
for(var s=0;
s<this.elementInfos.length;
s++){var w=this.elementInfos[s];
if(Jsonix.Util.Type.exists(w.substitutionHead)){var r=Jsonix.XML.QName.fromObject(w.substitutionHead);
var x=r.key;
var o=this.substitutionMembersMap[x];
if(!Jsonix.Util.Type.isArray(o)){o=[];
this.substitutionMembersMap[x]=o
}o.push(w)
}var m;
if(Jsonix.Util.Type.exists(w.scope)){m=w.scope.name
}else{m="##global"
}var n=this.scopedElementInfosMap[m];
if(!Jsonix.Util.Type.isObject(n)){n={};
this.scopedElementInfosMap[m]=n
}n[w.elementName.key]=w
}},getElementInfo:function(o,m){if(Jsonix.Util.Type.exists(m)){var j=m.name;
var k=this.scopedElementInfosMap[j];
if(Jsonix.Util.Type.exists(k)){var n=k[o.key];
if(Jsonix.Util.Type.exists(n)){return n
}}}var l="##global";
var p=this.scopedElementInfosMap[l];
if(Jsonix.Util.Type.exists(p)){var i=p[o.key];
if(Jsonix.Util.Type.exists(i)){return i
}}return null
},getSubstitutionMembers:function(b){return this.substitutionMembersMap[Jsonix.XML.QName.fromObject(b).key]
},createMarshaller:function(){return new Jsonix.Context.Marshaller(this)
},createUnmarshaller:function(){return new Jsonix.Context.Unmarshaller(this)
},CLASS_NAME:"Jsonix.Context"});
Jsonix.Context.Marshaller=Jsonix.Class({context:null,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
this.context=b
},marshalString:function(e){var d=this.marshalDocument(e);
var f=Jsonix.DOM.serialize(d);
return f
},marshalDocument:function(d){var e=new Jsonix.XML.Output({namespacePrefixes:this.context.properties.namespacePrefixes});
var f=e.writeStartDocument();
this.marshalElementNode(d,e);
e.writeEndDocument();
return f
},marshalElementNode:function(i,g){Jsonix.Util.Ensure.ensureObject(i);
Jsonix.Util.Ensure.ensureObject(i.name);
Jsonix.Util.Ensure.ensureString(i.name.localPart);
Jsonix.Util.Ensure.ensureExists(i.value);
var l=Jsonix.XML.QName.fromObject(i.name);
var h=this.context.getElementInfo(l);
if(!Jsonix.Util.Type.exists(h)){throw"Could not find element declaration for the element ["+l.key+"]."
}Jsonix.Util.Ensure.ensureObject(h.typeInfo);
var j=h.typeInfo;
var k=g.writeStartElement(i.name);
j.marshal(this.context,i.value,g);
g.writeEndElement();
return k
},CLASS_NAME:"Jsonix.Context.Marshaller"});
Jsonix.Context.Unmarshaller=Jsonix.Class({context:null,initialize:function(b){Jsonix.Util.Ensure.ensureObject(b);
this.context=b
},unmarshalString:function(c){Jsonix.Util.Ensure.ensureString(c);
var d=Jsonix.DOM.parse(c);
return this.unmarshalDocument(d)
},unmarshalURL:function(d,f,e){Jsonix.Util.Ensure.ensureString(d);
Jsonix.Util.Ensure.ensureFunction(f);
if(Jsonix.Util.Type.exists(e)){Jsonix.Util.Ensure.ensureObject(e)
}that=this;
Jsonix.DOM.load(d,function(a){f(that.unmarshalDocument(a))
},e)
},unmarshalDocument:function(f){var d=new Jsonix.XML.Input(f);
var e=null;
d.nextTag();
return this.unmarshalElementNode(d)
},unmarshalElementNode:function(l){if(l.eventType!=1){throw"Parser must be on START_ELEMENT to read next text."
}var h=null;
var k=Jsonix.XML.QName.fromObject(l.getName());
var g=this.context.getElementInfo(k);
if(!Jsonix.Util.Type.exists(g)){throw"Could not find element declaration for the element ["+k.key+"]."
}Jsonix.Util.Ensure.ensureObject(g.typeInfo);
var i=g.typeInfo;
var j=i.unmarshal(this.context,l);
h={name:k,value:j};
return h
},CLASS_NAME:"Jsonix.Context.Unmarshaller"});

