//steal/js dark-fw/scripts/compress.js

load("steal/rhino/rhino.js");
steal('steal/build','steal/build/scripts','steal/build/styles',function(){
	steal.build('dark-fw/scripts/build.html',{to: 'dark-fw'});
});
