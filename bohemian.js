// bohemian.js - just a casual casual easy thing
Object.prototype.method = function(name,definition) {
	this[name] = typeof(definition) == 'function' ? definition :
		(function(value) { return function() { return value }})(definition)
}

Object.prototype.does = function() {
	for (var i = 0; i < arguments.length; i += 2) this.prototype.method(arguments[i],arguments[i+1])
}

Object.does(
	'has', function(method) {
		return this.hasOwnProperty(method)
	},
	'can', function(method) {
		return typeof(this[method]) == 'function'
	},
	'new', function() { 
		var proto = function(){}
		proto.prototype = this
		var self = new child()
		return self.can('init') ? self.init.apply(self,arguments) : self
	},
	'after', function(i) {
		return Array.prototype.slice.apply(this,[i+1])
	},
	'super', function(method) {
		this.__proto__.__proto__[method].apply(this,arguments.after(0))
	},
	'isArray', false,
	'isString', false,
	'isNumber', false,
	'isFunction', false
)

Number.does(
	'isNumber', true
)

String.does(
	'get', function(cb,headers) { return cb.xhr('get',this,false,headers) },
	'post', function(cb,data,headers) { return cb.xhr('post',this,data,headers) },
	'put', function(cb,data,headers) { return cb.xhr('put',this,data,headers) },
	'delete', function(cb,headers) { return cb.xhr('delete',this,false,headers) },
	'include', function() { (function(txt){ script({},txt).draw() }).xhr('get',this) },
	'isString', true
)

Array.does(
	'isArray', true
)

Function.does(
	'each', function(o) {
		for (k in o) if (o.has(k)) this(o[k],k)
	},
	'every', function(a) {
		for (var i = 0; i < a.length; ++i) this(a[i],i)
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
	'until', function(test) {
		var self = this
		if (! test()) {
			self()
			setTimeout(function() { self.until(test) },1000)
		}
	},
	'then', function(continuation) {
		this.method('continuations', this.continuations().concat(continuation))
	},
	'isFunction', true
)

HTMLElement.does(
	'add', function(e) {
		this.appendChild(typeof(e) == 'string' ? document.createTextNode(e) : e	)
		return this
	},	
	'tag', function(tag) {
		return window[tag] = function(properties) {
			var self = document.createElement(tag)
			if (properties) (function(v,k) { self[k] = v }).each(properties)
			if (arguments.length > 1) (function(e) { self.add(e) }).every(arguments.after(0))
			return window._ = self
		}
	},
	'css', function(style) {
		for (k in style) if (style.has(k)) this.style[k] = style[k]
		return this
	},
	'draw', function() {
		arguments.length > 0 ? arguments[0].appendChild(this) : document.body.appendChild(this)
		return this
	},
	'at', function(x,y) {
		return this.css({ position: 'absolute', top: y + 'px', left: x + 'px'})
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
	}
)

HTMLElement.prototype.tag.every(['div','span','br','button','ul','ol','li','textarea','input','h1','h2','h3','h4','h5','a','script'])


