# qmDB

```js
const { qmDB } = require('qmdb')
// or
import { qmDB } from 'qmdb'
```


```js
qmDB.db = new qmDB({
  uri : "url mongodb "
})


```


## Methods


### .set

```js
// saves data to database
qmDB.db.set('key', 'value')
```

### .get

```js
// gets value from key
qmDB.db.get('key') // returns => value
```

### .has

```js
// returns boolean
qmDB.db.has('key') // returns => true
```

### .delete

```js
// deletes data
qmDB.db.delete('key')

// checking for data
qmDB.db..has('key') // returns => false
```
