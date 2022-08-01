# prompt-sync-history

History manager for `prompt-sync`

## API

### `history(filename, max)`

`filename` is a location for the history file
`max` is the maximum entries to store

Returns an object with the following methods:

```js
{
  atStart, atPenultimate, pastEnd, atEnd, 
  prev, next, reset, push, save
}
```

The [prompt-sync](http://npm.im/prompt-sync) module
uses this interface to manage history interactions.

To create your own custom history handler, simply fork
this repo and modify as desired. 