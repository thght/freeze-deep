# freeze-deep

<br/>

*A fast and type safe recursive (deep) object/array/function freeze*

Fast, type safe and tested, it always returns the type and value(s) you've feeded it, frozen if freezable.

---

```javascript
const freezeDeep = require('freeze-deep');

const MODEL= freezeDeep({
	person: {
		name: ''
		friends: []
	}
});

MODEL.person.name= 'Max';
console.log( MODEL.person.name );
// ''

delete MODEL.person.name;
console.log( MODEL.person );
// { name: '', friends: [] }

MODEL.person.friends[0]= 'Jack';
console.log( MODEL.person.friends[0] );
// undefined

// no runtime error on undefined or null
freezeDeep();
freezeDeep( null );
```

---

When using with node.js: `npm install --save freeze-deep` in the project root.

To run the tests: `npm test` at the cli in the project root.

I am always open for feedback and suggestions on how to improve the code.

---------------------------------------------

**0.1.0**

-	initial commit

---

### license

MIT