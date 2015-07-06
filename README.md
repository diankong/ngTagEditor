
## This is a fork from ngTagEditor, updated a few things to make it more useful for most simple cases

## updated:
##### remove output attr from opion, now it only support simple tags: 

```` javascript
var tags = ['string1', 'string2'];
````
##### add readonly attr

##### change tags' color to indigo

ngTagEditor: AngularJS tag input, editor
===========

A new tag input, built for AngularJS

## Demo

See the live demo page [here](http://varyoo.github.io/ngTagEditor).

## Installation

Add the following files to your application:

```html
<link rel="stylesheet" href="ngTagEditor.css" type="text/css"/>
<script type="text/javascript" src="http://cdn.jsdelivr.net/angularjs/1.3.15/angular.js"></script>
<script type="text/javascript" src="ngTagEditor.tpls.js"></script>
```

## Usage

### Basic usage

`<tag-editor></tag-editor>` In your html in any form.

It will add a hidden input `<input type="hidden" name="tags">` containing added tags name, separated by a comma.

### Advanced usage

#### Initializing tags

Add something like that to your javascript code:
```javascript
var app = angular.module('app', ['ngTagEditor']);
app.controller('RandomController', function($scope, $http) {
	$scope.tags = [
		"This", "is", "a", "test"
	];
});
```
That goes with the following html:

```html
<form ng-controller="RandomController">
	<tag-editor ng-model="tags" readonly="false"></tag-editor>
</form>
```

#### Available options

You can pass options by the following way: `<tag-editor option="value"></tag-editor>`.

name | values | description | default
---- | ------ | ----------- | -------
readonly | boolean | when true, you won't modify tags anymore | false
fetch | any valid API URL | required to suggest tags while the user is typing, this way, you can save ids instead of names (see `output`). The API output, must be formated properly, see Suggestions paragraph bellow. | "url/to/my/api.php?query="
placeholder | any string | Text to display as input placeholder | "Enter a few letters..."
  
##### Suggestions

##### haven't tested since fork

First, give the URL of your API through the `fetch` option.
The data must be formated as follow, as stated [this article](http://labs.omniti.com/labs/jsend).

```json
{
    "status": "success",
    "data": ["Say","Hello","to","JSON"]
}
```

## Exemple

See `test.html`
