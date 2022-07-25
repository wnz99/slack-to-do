users > lists > list > tasks

```javascript
const messageRef = db
  .collection('users')
  .doc('user')
  .collection('lists')
  .doc('list')
  .collection('tasks')
```
