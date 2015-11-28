# express-url-breadcrumb

Generates an array of breadcrumb items from the current URL and automatically exposes them to views via a variable named `breadcrumb`. 

The module is very useful when you need to generate SEO friendly breadcrumbs as shown below:

## Install

```bash
npm install express-url-breadcrumb --save
```

## Usage

### Server

Add the module to your server application and attach to express. 

```js
// require module
var breadcrumb = require('express-url-breadcrumb');

// ask express to use it on all requests 
app.use(breadcrumb);
```

### View Template

The example below demonstrates how to render a SEO friendly breadcrumb using a handlebars.js template. 

```html
<ol class="breadcrumb">
	{{#each breadcrumb}}
		{{#unless @last}}
			<li itemscope itemtype="http://data-vocabulary.org/Breadcrumb">
				<a href="{{this.url}}" itemprop="url">
					<span itemprop="title">{{this.label}}</span>
				</a>
			</li>
		{{else}}
			<li>
				<span>{{this.label}}</span>
			</li>
		{{/unless}}
	{{/each}}
</ol>

```

### Output
The URL http://mammothworkwear.com/snickers-workwear/snickers-trousers/snickers-3211-craftsmen-trousers would generate the following breadcrumb.

```html
<ol class="breadcrumb">
	<li itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb">
		<a href="http://mammothworkwear.com" itemprop="url">
			<span itemprop="title">Home</span>
		</a>
	</li>
	<li itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb">
		<a href="http://mammothworkwear.com/snickers-workwear" itemprop="url">
			<span itemprop="title">Snickers Workwear</span>
		</a>
	</li>
	<li itemscope="" itemtype="http://data-vocabulary.org/Breadcrumb">
		<a href="http://mammothworkwear.com/snickers-workwear/snickers-trousers" itemprop="url">
			<span itemprop="title">Snickers Trousers</span>
		</a>
	</li>
	<li>
		<span>Snickers 3211 Craftsmen Trousers</span>
	</li>
</ol>
```

The `breadcrumb` variable is an `Array` of objects. To give you an example of its structure I have included an example of its manual creation based on the url above.

```js
  var breadcrumb = [];
  
  breadcrumb.push({ label: 'Home', url: 'http://mammothworkwear.com' });
  breadcrumb.push({ label: 'Snickers Workwear', url: 'http://mammothworkwear.com/snickers-workwear' });
  breadcrumb.push({ label: 'Snickers Trousers', url: 'http://mammothworkwear.com/snickers-workwear/snickers-trousers' });
  breadcrumb.push({ label: 'Snickers 3211 Craftsmen Trousers', url: 'http://mammothworkwear.com/snickers-workwear/snickers-trousers/snickers-3211-craftsmen-trousers' });
```