// widgets.js - casual easy widgets for bohemian.js
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


// NB: We are extending the base vocabulary
_('does',
	'connector', function (x1,y1,x2,y2) {
		_('begin')('color',0,0,0,1)('at',x1,y1)('curveTo',x1+(x2-x1)/2,y1,x2-(x2-x1)/2,y2,x2,y2)('stroke')('end')
		('begin')('color',0,0,0,1.0)('at',x1,y1)('circle',5)('fill')('end')
		('begin')('at',x1,y1)('circle',4)('color',255,255,255,1.0)('fill')('end')
		('begin')('color',0,0,0,1.0)('at',x2,y2)('circle',5)('fill')('end')
		('begin')('at',x2,y2)('circle',4)('color',255,255,255,1.0)('fill')('end') 
	}
)


