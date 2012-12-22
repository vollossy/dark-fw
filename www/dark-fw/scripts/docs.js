//js ../../dark-fw/scripts/doc.js
//<script type='text/javascript' src='../lib/javascriptMVC/steal/steal.js?/dark-fw/dark-bootstrap.js?documentjs/jmvcdoc'>
load('steal/rhino/rhino.js');
steal("documentjs").then(function(){
	DocumentJS('//dark-fw/dark-fw/dark-fw.html', {
		markdown : ['dark-fw']
	});
});