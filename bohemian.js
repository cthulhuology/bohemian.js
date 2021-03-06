// bohemian.js - just a casual casual easy thing
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


_ = function() { 
	var parents = Array.prototype.splice.call(arguments,0)
	var self = function() {
		var $ = arguments.callee
		var method = arguments[0]
		var args = Array.prototype.splice.call(arguments,1)
		if (typeof($[method]) == 'function')
			return $[method].apply($,args)
		for (i in parents) if (parents[i]("may",method))
			return parents[i]("lookup",method).apply($,args)
		$("*",method,args)
	}
	self.does = function(method,fun) {
		this[method] = fun
		return this	
	}
	self.has = function(property,value) {
		this[property] = function() {
			return value
		}
		return this
	}
	self.can = function(method) {
		if (typeof(this[method]) == "function")
			return true
		for (var i in parents) 
			if (parents[i]("may",method))
				return true
		return false
	}
	self.may = function(method) {
		return typeof(this[method]) == "function"
	}
	self.lookup = function(method) {
		return this[method]	
	}
	self["*"] = function(method,args) {
		console.log(this, "doesn't", method, "with", args)
		return this
	}
	self.is = function(parent) {
		parents.unshift(parent)
		return this
	}
	return self 
}

module.exports =  { '_' : _ }
