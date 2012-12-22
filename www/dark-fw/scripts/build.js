//js ../../dark-fw/scripts/build.js

load("steal/rhino/rhino.js");
steal('steal/build').then('steal/build/scripts','steal/build/styles',function(){
	steal.build('../../dark-fw/dark-fw.html', {to: '../../dark-fw'});
});
