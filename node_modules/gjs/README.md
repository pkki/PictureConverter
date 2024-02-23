g.js
====

*g.js* is a very small library (0.4kb minified, 0.2kb minified and gzipped)
which provide a simple method to iterate over a suit of numbers. It can be used
with Node.js or in the browser.

Installing
----------

Download the latest version here, then import the script:

Node:
```javascript
var g = require('./g');
```
Browser:
```html
<script src="…/g.min.js"></script>
```

Usage
-----

```
g.from(<from>).to(<to>) [.excluded()] [.by(<step>)] { ._do(<fn>) | .to_a() }
```

* `<from>`: first number
* `<to>`: last number (included)
* `<step>`: increment for each step (may be negative; default: `1`)
* `<fn>`: function executed with every number

* `.excluded()`: exclude the last number
* `.by(…)`: use a custom step
* `.to_a()`: return an array of numbers
* `._do(…)`: iterate over the numbers suit with a function. It can be chained.


Examples
--------

Basic:

```javascript
> g.from(1).to(5)._do(function(e) {
 console.log(e);
});
1
2
3
4
5
```

Excluding final step:

```javascript
> g.from(1).to(5).excluded()._do(function(e) {
 console.log(e);
});
1
2
3
4
```

Negative step:


```javascript
> g.from(3).to(0).by(-1)._do(function(e) {
    console.log(e);
});
3
2
1
0
```

chained `._do(…)`:

```javascript
> var f = function(e) {console.log(e);}
> g.from(0).to(1)._do(f)._do(f)
0
1
0
1
```

Get an array:

```javascript
> g.from(1).to(10).to_a()
[1,2,3,4,5,6,7,8,9,10]
```
