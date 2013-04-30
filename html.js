// html.js
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


// a sample Bohemian.js based web framework for node

$ = require('./bohemian.js')._

html = $()
('does', 'tag', function() {
	var args = Array.prototype.slice.call(arguments,0)
	for (i in args) (function(t) {
		this("does",t, function() {
			this('response').write('<' + t + '>')
			for (var i in arguments) 
				this('response').write(arguments[i])
			this('response').write('</' + t + '>')
			return this
		})
	}).call(this,args[i])
	return this
})

html('tag','b','i','p','pre','h1','h2','h3','h4','h5')

var http = require("http")
http.createServer(function(request, response) {
	response.writeHead(200, {"Content-Type": "text/plain"})
	html('has','response',response)
		('b', "Bold Text")
		('h1','h1 heading')
		('h2','h2 heading')
		('h3','h3 heading')
		('h4','h4 heading')
		('h5','h5 heading')
	response.end()
}).listen(6969)


