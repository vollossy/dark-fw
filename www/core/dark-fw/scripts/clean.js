//steal/js dark-fw/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/clean',function(){
	steal.clean('dark-fw/dark-fw.html',{indent_size: 1, indent_char: '\t'});
});
