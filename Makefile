
all : install
.PHONY: install	

install : 
	curl -X PUT -H "Content-Type: text/html" --data-binary @bohemian.html http://localhost/riak/html/index.html
	curl -X PUT -H "Content-Type: application/javascript" --data-binary @bohemian.js http://localhost/riak/js/bohemian.js
