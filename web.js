// web.js - just a casual casual easy thing
//
// © 2013 David J Goehrig <dave@dloh.org>
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the
// following conditions are met:
// 
// Redistributions of source code must retain the above copyright notice, this list of conditions and the following
// disclaimer. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and
// the following disclaimer in the documentation and/or other materials provided with the distribution.
// 
// Neither the name of the project nor the names of its contributors may be used to endorse or promote products derived
// from this software without specific prior written permission. THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
// CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
// CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
// (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
// (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
// 

_('does',
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
		return this._stack ? this._stack.pop() : undefined
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
	'context', function() {
		this.method('context', this._.getContext('2d'))
		return this._
	},
	'at', function(x,y) {
		this.method('x',x)
		this.method('y',y)
		this.context().moveTo(x,y)
		return this._ && this.css({ position: 'absolute', top: y + 'px', left: x + 'px'})
			
			
	},
	'to', function(x,y) {
		this.method('x', this.x()+x)
		this.method('y', this.y()+y)
		this.context().moveTo(this.x(),this.y())
		return this._ && this.css({ position: 'absolute', top: this.y() + 'px', left: this.x()  + 'px'})
	},
	'by', function(w,h) {
		this.method('w',w)
		this.method('h',h)
		if (!this._) return
		this._.width = w
		this._.height = h
		return this.css({ width: w + 'px', height: h + 'px' })
	},
	'fontSize', 12,
	'fontFamily', 'Arial',
	'font', function(f) {
		this.method('fontFamily',f)
		this.context().font = this.fontSize() + 'px ' + f
		return this._ && this.css({ fontFamily: f })	
	},
	'color', function(r,g,b,a) {
		this.method('r',r)
		this.method('g',g)
		this.method('b',b)
		this.method('a',a)
		this.context().fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' 
		this.context().strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' 
		return this._ && this.css({ color: 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')' })
	},
	'size', function(p) {
		this.method('fontSize',p)
		this.context().font = p + 'px ' + this.fontFamily();
		return this._ && this.css({ fontSize: p + 'px' })
	},
	'normal', function() {
		return this._ && this.css({ fontStyle: 'normal', fontWeight: 'normal', textDecoration: 'none' })
	},
	'italic', function() {
		return this._ && this.css({ fontStyle: 'italic' })
	},
	'bold', function() {
		return this._ && this.css({ fontWeight: 'bold' })
	},
	'underline', function() {
		return this._ && this.css({ textDecoration: 'underline' })
	},
	'overline', function() {
		return this._ && this.css({ textDecoration: 'overline' })
	},
	'strikeout', function() {
		return this._ && this.css({ textDecoration: 'line-through' })
	},
	'clear', function() {
		while(document.body.firstChild) document.body.removeChild(document.body.firstChild)
		this.context().clearRect(0,0,this.screen().width,this.screen().height)
		document.body.appendChild(this.screen())
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
	//	this.at(x,y)
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
	'rect', function() {
		this.context().rect(this.x(),this.y(),this.w(),this.h())
		return this._
	},
	'strokeText', function(text) {
		this.context().strokeText(text,this.x(),this.y())
		return this._
	},
	'fillText', function(text) {
		this.context().fillText(text,this.x(),this.y())
		return this._
	},
	'clearRect', function() {
		this.context().clearRect(this.x(),this.y(),this.w(),this.h())
		return this._
	},
	'fillRect', function() {
		this.context().fillRect(this.x(),this.y(),this.w(),this.h())
		return this._
	},
	'getImageData', function() {
		return this.context().getImageData(this.x(),this.y(),this.w(),this.h())
	},
	'circle', function(radius) { 
		this.context().arc(this.x(),this.y(),radius,0,2*Math.PI) 
		return this._
	},
	'clone', function() {
		return this.push(this._.cloneNode(true))	
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
('canvas')('draw')('as','screen')('context')('at',0,0)('by', window.innerWidth,window.innerHeight)
('font','Arial')('size',12)('drop')

