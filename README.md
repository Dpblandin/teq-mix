# Teq Mix

## Usage

Within `webpack.mix.js`:

```js
let mix = require('laravel-mix');

require('teq-mix');

mix
    .teqMix(options)
```

## Options

Possible options (with default values)

```js
const defaultOptions = {
    frontPath: './assets/',
    appPath: '../../app/public/dist/frontend/',
    publicPath: null,
    entry: {
        js: '_src/scripts/app.js',
        css: '_src/sass/styles.scss',
    },
    destination: {
        fonts: 'styles/fonts',
        images: 'styles/images',
        js: 'scripts',
        css: 'styles',
   },
   vendor: false,
   cssOptions: {
       processCssUrls: false,
       purifyCss: false,
   }
}
```
vendor options: either false, true, or a vendor file ie 'vendor.js'
