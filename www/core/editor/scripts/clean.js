//steal/js editor/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/clean',function(){
	steal.clean('editor/editor.html',{indent_size: 1, indent_char: '\t'});
});
