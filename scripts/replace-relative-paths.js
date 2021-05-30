var replace = require('replace');

replace({
    regex: '/nuxtfiles/',
    replacement: 'nuxtfiles/',
    paths: ['dist'],
    recursive: true,
    silent: true,
});

replace({
    regex: '/assets/',
    replacement: 'nuxtfiles/',
    paths: ['dist'],
    recursive: true,
    silent: true,
});

replace({
    regex: '(href|src|\"href\"|\"src\")=\"/',
    replacement: '$1=\"../',
    paths: ['dist'],
    recursive: true,
    silent: true,
});

replace({
    regex: '(href|src|\"href\"|\"src\"):\"/',
    replacement: '$1:\"../',
    paths: ['dist'],
    recursive: true,
    silent: true,
});
