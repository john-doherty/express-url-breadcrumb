var url = require('url');

module.exports = function(req, res, next){
	
	// grab the current url
	var baseUrl = url.format({ protocol: req.protocol, host: req.get('host')}),
		// break it apart removing empty string
		parts = url.parse(req.url).pathname.split('/').filter(Boolean),
		// array to store breadcrumb items
		items = [];

	// insert home link
	items.push({ label: 'Home', url: baseUrl });

	// go through each item and add a breadcrumb object to the items array
	for (var i=0, l=parts.length; i<l; i++){ 
		
		// create breadcrumb item
		items.push({
			label : toTitleCase(parts[i].replace(/-/g,' ')),
			url	: url.resolve(baseUrl, parts.slice(0,i+1).join('/')) 
		});
	}
	
	// make the breadcrumbs available to express (in views etc)
	req.app.locals.breadcrumb = items;
	
	next();
};

//
// https://github.com/gouch/to-title-case
//
function toTitleCase(value){
  var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;

  return value.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title){
    if (index > 0 && index + match.length !== title.length &&
      match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
      (title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
      title.charAt(index - 1).search(/[^\s-]/) < 0) {
      return match.toLowerCase();
    }

    if (match.substr(1).search(/[A-Z]|\../) > -1) {
      return match;
    }

    return match.charAt(0).toUpperCase() + match.substr(1);
  });
};