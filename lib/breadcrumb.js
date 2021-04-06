var url = require('url');

module.exports = function(modifier){ 

	return function(req, res, next) {
	
		// grab the current url
		var baseUrl = url.format({ protocol: req.protocol, host: req.get('host')});

		// break it apart removing empty string
		var parts = url.parse(req.url).pathname.split('/').filter(Boolean);

		// array to store breadcrumb items
		var items = [];
	
		// insert home link
		items.push({ label: 'Home', url: baseUrl });
	
		// go through each item and add a breadcrumb object to the items array
		for (var i=0, l=parts.length; i<l; i++){ 
			
			// create breadcrumb item
			items.push({
				label : parts[i].replace(/-/g,' '),
				url	: url.resolve(baseUrl, parts.slice(0,i+1).join('/')) 
			});
		}
		
		// if we have a modifier, execute it now..
		if (modifier){
			items.forEach(modifier);
		}
		
		// make the breadcrumbs available to express views (only in current request)
		res.locals.breadcrumb = items;
		
		next();
	};
};