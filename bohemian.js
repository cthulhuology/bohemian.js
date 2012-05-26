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
		this._stack = this.stack ? this.stack : []
		this._stack.push(this._)
		return this._
	},
	'drop', function() {
		return this._stack.pop()	
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
	'as', function(name) {
		this.method(name,this._)
		return this._
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
		this._.width = w
		this._.height = h
		return this.css({ width: w + 'px', height: h + 'px' })
	},
	'fontSize', 12,
	'fontFamily', 'Arial',
	'font', function(f) {
		this.method('fontFamily',f)
		this.context().font = this.fontSize() + 'px ' + f
		return this.css({ fontFamily: f })	
	},
	'color', function(r,g,b,a) {
		this.context().fillStyle = this.context.strokeStyle = 'rgba(' + r + ',' + g + ',' + b ')' 
		return this.css({ color: 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' })
	},
	'size', function(p) {
		this.method('fontSize',p)
		this.context().font = p + 'px ' + this.fontFamily();
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
		this.context().clearRect(0,0,this.screen().width,this.screen().height)
		document.body.appendChild(this.screen())
		return this._
	},
	'context', function() {
		// first time this method gets called it overrides itself with the screen drawing context!
		this.method('context', this.screen().getContext('2d'))
		return this._
	},
	'begin', function() {
		this.context().beginPath()
		return this._
	},
	'end', function() {
		this.context().closePath()
		return this._
	},
	'lineTo',function(x,y) {
		this.context().lineTo(x,y)
		return this._
	},
	'moveTo',function(x,y) {
		this.context().moveTo(x,y)
		return this._
	},
	'fill', function() {
		this.context().fill()
		return this._
	},
	'stroke', function() {
		this.context().stroke()
		return this._
	},
	'clip', function() {
		this.context().clip()
		return this._
	},
	'curveTo', function() {
		switch(arguments.length) {
			case 4:	this.context().quadraticCurveTo.apply(this.context(), arguments); break
			case 5: this.context().arcTo.apply(this.context(), arguments); break
			case 6: this.context().bezierCurveTo.apply(this.context(), arguments); break
		}
		return this._
	},
	'rect', function(x,y,w,h) {
		this.context().rect(x,y,w,h)
	},
	'strokeText', function(text,x,y) {
		this.context().strokeText(text,x,y)
		return this._
	},
	'fillText', function(text,x,y) {
		this.context().fillText(text,x,y)
		return this._
	},
	'clearRect', function(x,y,w,h) {
		this.context().clearRect(x,y,w,h)
		return this._
	},
	'fillRect', function(x,y,w,h) {
		this.context().fillRect(x,y,w,h)
		return this._
	},
	'getImageData', function(x,y,w,h) {
		return this.context().getImageData(x,y,w,h)
	},
	'circle',function(x,y,radius) { 
		this.context().arc(x,y,radius,0,2*Math.PI) 
		return this._
	}
)
('every','tag',[
	'div','span','br',
	'button','a',
	'ul','ol','li',
	'textarea','input',
	'h1','h2','h3','h4','h5',
	'img','audio','video',
	'script','canvas'])
('canvas')('as','screen')('at',0,0)('by', window.innerWidth,window.innerHeight)('draw')('context')
('font','Arial')('size',12)


