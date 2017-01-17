# express-url-breadcrumb
[![Shippable branch](https://img.shields.io/shippable/5818b23bd1184e0f002e1a9c/master.svg)](https://app.shippable.com/projects/5818b23bd1184e0f002e1a9c) [![npm](https://img.shields.io/npm/dt/express-url-breadcrumb.svg)](https://www.npmjs.com/package/express-url-breadcrumb) [![Linked In](https://img.shields.io/badge/Linked-In-blue.svg)](https://www.linkedin.com/in/john-i-doherty) [![Twitter Follow](https://img.shields.io/twitter/follow/CambridgeMVP.svg?style=social&label=Twitter&style=plastic)](https://twitter.com/CambridgeMVP)

Generates a breadcrumb array from the current URL and exposes to views via a `breadcrumb` variable. 

Very useful when you need to generate SEO friendly breadcrumbs as shown below:

## Installation

```bash
$ npm install --save express-url-breadcrumb
```

## Usage
Add the module to your server application and attach to express. 

```js
var breadcrumb = require('express-url-breadcrumb');

// use for every request  
app.use(breadcrumb());

// alternatively, add to a specific route
app.get('/snickers-workwear/snickers-trousers/snickers-3211-craftsmen-trousers', breadcrumb(), function(req, res){
    res.render('product-detail');
});
```

Optionally pass a modifier function to the constructor:
```js
// use for every request  
app.use(breadcrumb(function(item, index){
    // convert each breadcrumb label to upper case
    item.label = item.label.toUpperCase(); 
}));
```

### View Template

The example below demonstrates how to render a SEO friendly breadcrumb using a handlebars.js template. Notice the ```breadcrumb``` variable has not been passed in, it's already available to all views. 

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

### HTML Output

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

The `breadcrumb` variable is an `Array` of objects. To give you an idea of its structure, here is a version created manually:

```js
  var breadcrumb = [];
  
  breadcrumb.push({ label: 'Home', url: 'http://mammothworkwear.com' });
  breadcrumb.push({ label: 'Snickers Workwear', url: 'http://mammothworkwear.com/snickers-workwear' });
  breadcrumb.push({ label: 'Snickers Trousers', url: 'http://mammothworkwear.com/snickers-workwear/snickers-trousers' });
  breadcrumb.push({ label: 'Snickers 3211 Craftsmen Trousers', url: 'http://mammothworkwear.com/snickers-workwear/snickers-trousers/snickers-3211-craftsmen-trousers' });
```
Each item in the ```breadcrumb``` array has a ```.url``` and a ```.label``` property.


## Tests
You can run unit tests using:
```bash
$ npm test
```
You can also request code coverage information using:
```bash
$ npm test --coverage
```

## Changes
### 0.0.6
Removed internal toTitleCase function used to format labels. This can be done using the modifier function mentioned above. 
###  0.0.4 > 0.0.5
**Breaking Change:** Added breadcrumb constructor to allow a modifier function to be passed. It must now be instantiated using parenthesis ```breadcrumb()```

## License

[ISC License](LICENSE) &copy; 2016 [John Doherty](https://courseof.life/johndoherty)