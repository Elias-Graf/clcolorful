# ClColorful
Print colorful messages using as few instructions possible.

Simply write:
```javascript
const { msg } =  require('clcolorful');

msg('Foreground is red!').fg('red').log();
```
to get a message with red foreground. The same for background:
```javascript
msg('Background is red!').bg('red').log();
```
Multiple chained options:
```javascript
msg('White bg, black fg').bg('white').fg('black').log();
```

## Options
| Option | Effect |
|--|--|
| `<msg>.b()` | Makes the message bold |
| `<msg>.bg(color: string)` | Changes the background color |
| `<msg>.fg(color: string)` | Changes the foreground color |
| `<msg>.u()` | Underlines the message |

## Tail
Sometimes you want to style different part of messages. So there is the `tail(message: string)` function which creates a new message that is tailed to the end of the previous. 
**This will return a new message object!**

In practice this looks something like:
```javascript
msg('This').fg('yellow').tail(' is').fg('red').tail(' colorful!').fg('blue').log();
```

 ## Output methods
 There are basically three output methods.
 
| Method | Effect |
|--|--|
| `<msg>.log()` | Prints the message using the `console.log` function |
| `<msg>.write()` | Prints the message using the `process.stdout.write` method |
| `<msg>.generate()` | Returns the generated string.