var shell = require('shelljs');

shell.cp('-R', 'views', 'dist/views');
shell.cat('dist/public/index.html').to('dist/views/layouts/home.hbs');
//shell.cp('-R', 'src/public/images', 'dist/views/layouts/home.hbs');
