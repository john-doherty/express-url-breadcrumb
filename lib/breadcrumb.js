var url = require('url');

module.exports = function(req, res, next){
	
		// grab the current url
	var baseUrl = url.format({ protocol: req.protocol, host: req.get('host')}),
		// break it apart removing empty string
		parts = req.url.split('/').filter(Boolean),//.slice(1),
		// array to store breadcrumb items
		items = [];

	// insert home link
	items.push({ label: 'Home', url: baseUrl });

	// go through each item and add a breadcrumb object to the items array
	for (var i=0, l=parts.length; i<l; i++){ 
		
		// create breadcrumb item
		items.push({
			label	: parts[i].replace('-',' ').toTitleCase(),
			url		: url.resolve(baseUrl, parts.slice(0,i+1).join('/')) 
		});
	}
	
	// make the breadcrumbs available to express (in views etc)
	req.app.locals.breadcrumb = items;
	
	next();
};

String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};
