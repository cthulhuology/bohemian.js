// bohemian.js - just a casual casual easy thing

_ = Bohemian = function() { 
	var self = arguments.callee
	if (typeof(self[arguments[0]]) == 'function') 
		self._ = self[arguments[0]].apply(self,Array.prototype.splice.apply(arguments,[1]))
	else if (self._ && typeof(self._[arguments[0]]) == 'function')
		self._ = self._[arguments[0]].apply(self._,Array.prototype.splice.apply(arguments,[1]))
	else self.push(arguments[0])	// set the internal state if we don't know what to do with our args
	return self 
} 

_.method = function(name,definition) {
	this[name] = typeof(definition) == 'function' ? definition :
		(function(value) { return function() { return value }})(definition)
	return this
}

_('method','does',function() {
	for (var i = 0; i < arguments.length; i += 2) this.method(arguments[i],arguments[i+1])
	return this })
('does',
	'push', function(o) {
		this.dup()
		return this._ = o
	},
	'dup', function() {
		this.stack = this.stack ? this.stack : []
		this.stack.push(this._)
		return this._
	},
	'drop', function() {
		return this.stack.pop()	
	},
	'has', function(o,method) {
		return o.hasOwnProperty(method)
	},
	'can', function(o,method) {
		return typeof(o[method]) == 'function'
	},
	'new', function() { 
		var proto = function(){}
		proto.prototype = this._
		var self = new proto()
		return this.can(self,'init') ? self.init.apply(self,arguments) : self
	},
	'named', function(name) {
		return window[name] = this._	
	},
	'called', function(name) {
		return window[name] = this._.new()
	},
	'after', function(i) {
		return Array.prototype.slice.apply(this._,[i+1])
	},
	'super', function(method) {
		this._.__proto__.__proto__[method].apply(this._,arguments.after(0))
	},
	'get', function(url,headers) { 
		return this.xhr.apply(this._,['get',url,false,headers]) 
	},
	'post', function(url,data,headers) { 
		return this.xhr.apply(this._, ['post',url,data,headers]) 
	},
	'put', function(url,data,headers) { 
		return this.xhr.apply(this._,['put',url,data,headers]) 
	},
	'delete', function(url,headers) { 
		return this.xhr.apply(this._,['delete',url,false,headers]) 
	},
	'each', function(m,o) {
		for (k in o) if (this.has(o,k)) this[m](o[k],k)
	},
	'every', function(m,a) {
		for (var i = 0; i < a.length; ++i) this[m](a[i],i)
	},
	'xhr', function(method,url,data,headers) {
		var self = this
		var _ = XMLHttpRequest ? new XMLHttpRequest(): _doc.createRequest()
		_.onreadystatechange = function () {
			if (this.readyState != 4) return;
			if (this.status < 200 || this.status >= 300) return;
			try { self(JSON.parse(this.responseText)) } catch(e) { self(this.responseText) }
		}
		_.open(method,url,true)
		if (headers && headers.length > 0) (function(v,k) { _.setRequestHeader(k,v) }).each(headers)
		_.send(data ? data : '')
		return this
	},
	'add', function(e) {
		this._.appendChild(typeof(e) == 'string' ? document.createTextNode(e) : e	)
		return this._
	},	
	'tag', function(tag) {
		this.method(tag,function() {
			this._ = document.createElement(tag)
			for (var i = 0; i < arguments.length; ++i) this.add(arguments[i])
			return this._
		})
	},
	'source', function(s) {
		this._.src = s
		return this._
	},
	'href', function(u) {
		this._.href = u
		return this._
	},
	'css', function(style) {
		for (k in style) if (this.has(style,k)) this._.style[k] = style[k]
		return this._
	},
	'draw', function() {
		arguments.length > 0 ? arguments[0].appendChild(this._) : document.body.appendChild(this._)
		return this._
	},
	'remove', function() {
		this._.parentElement.removeChild(this._)
		return this._
	},
	'at', function(x,y) {
		return this.css({ position: 'absolute', top: y + 'px', left: x + 'px'})
	},
	'to', function(x,y) {
		return this.css({ position: 'absolute', top: 1*y + this._.offsetTop + 'px', left: 1*x + this._.offsetLeft + 'px'})
	},
	'by', function(w,h) {
		return this.css({ width: w + 'px', height: h + 'px' })
	},
	'font', function(f) {
		return this.css({ fontFamily: f })	
	},
	'color', function(r,g,b,a) {
		return this.css({ color: 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' })
	},
	'size', function(p) {
		return this.css({ fontSize: p + 'px' })
	},
	'normal', function() {
		return this.css({ fontStyle: 'normal', fontWeight: 'normal', textDecoration: 'none' })
	},
	'italic', function() {
		return this.css({ fontStyle: 'italic' })
	},
	'bold', function() {
		return this.css({ fontWeight: 'bold' })
	},
	'underline', function() {
		return this.css({ textDecoration: 'underline' })
	},
	'overline', function() {
		return this.css({ textDecoration: 'overline' })
	},
	'strikeout', function() {
		return this.css({ textDecoration: 'line-through' })
	},
	'clear', function() {
		while(document.body.firstChild) document.body.removeChild(document.body.firstChild)
		return this._
	})
('every','tag',[
	'div','span','br',
	'button','a',
	'ul','ol','li',
	'textarea','input',
	'h1','h2','h3','h4','h5',
	'img','audio','video',
	'script','canvas'])
('canvas')('by', window.innerWidth,window.innerHeight)('draw')
()


