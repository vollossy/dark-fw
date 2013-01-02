//steal/js editor/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('editor/scripts/build.html',{to: 'editor'});
});
