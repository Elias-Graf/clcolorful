const { msg } = require('./build/index.js');

msg('Foreground is red!').fg('red').log();
msg('Background is red!').bg('red').log();


msg('White bg, black fg').bg('white').fg('black').log();
msg('This').fg('yellow').tail(' is').fg('red').tail(' colorful!').fg('blue').log();