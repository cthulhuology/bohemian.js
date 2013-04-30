// Takes input from the textarea #console and sends it to the iframe for rendering.
//

var Keys = {
		192: '`~', 49: '1!', 50: '2@', 51: '3#', 52: '4$', 53: '5%', 54: '6^', 55: '7&', 56: '8*', 57 : '9(', 48: '0)',  189: '-_', 187: '=+',
		9: '\t\t', 81: 'qQ', 87: 'wW', 69: 'eE', 82: 'rR', '84' : 'tT', 89: 'yY', 85: 'uU', 73: 'iI', 79: 'oO', 80: 'pP', 219: '[{', 221: ']}', 220: '\\|',
		65: 'aA', 83: 'sS', 68: 'dD', 70: 'fF', 71: 'gG', 72: 'hH', 74: 'jJ', 75: 'kK', 76: 'lL', 186: ';:', 222: '\'"', 13 : 13,
		16: '', 90: 'zZ', 88: 'xX', 67: 'cC', 86: 'vV', 66: 'bB', 78: 'nN', 77: 'mM', 188: ',<', 190:'.>', 191: '/?',
		17: '', 18: '',	91:'', 32: '  ', 93: '', 37: '', 38: '', 39: '', 40: '', 8: -8, 10: 10, 61: '=+', 107: '++', 109: '-_',
		}

window.onload = function() {
	con = document.querySelector("#console");
	con.addEventListener("change", function(e) {
		if (con.value[con.value.length-1] =="\n") {
			try { 
				iframe = document.querySelector('#canvas');
				iframe.contentWindow.postMessage(con.value,"*");
				con.value = ""
			} catch(e) {
				con.value = e.toString()	
			}
		}
	}

}




