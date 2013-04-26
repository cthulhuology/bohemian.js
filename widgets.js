// widgets.js - casual easy widgets for bohemian.js
// 
//
//

_('does',
	'connector', function (x1,y1,x2,y2) {
		_('begin')('color',0,0,0,1)('at',x1,y1)('curveTo',x1+(x2-x1)/2,y1,x2-(x2-x1)/2,y2,x2,y2)('stroke')('end')
		('begin')('color',0,0,0,1.0)('at',x1,y1)('circle',5)('fill')('end')
		('begin')('at',x1,y1)('circle',4)('color',255,255,255,1.0)('fill')('end')
		('begin')('color',0,0,0,1.0)('at',x2,y2)('circle',5)('fill')('end')
		('begin')('at',x2,y2)('circle',4)('color',255,255,255,1.0)('fill')('end') 
	},
)


