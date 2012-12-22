// load('../../dark-fw/scripts/crawl.js')

load('steal/rhino/rhino.js')

steal('steal/html/crawl', function(){
  steal.html.crawl("../../dark-fw/dark-fw.html","../../dark-fw/out")
});
