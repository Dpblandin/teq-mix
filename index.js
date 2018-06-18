let mix = require('laravel-mix');

const isFront = process.env.FRONT;

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
};

class TeqMix {
    /**
     * @return {Array}
     */
    dependencies() {
        return ['webpack-livereload-plugin', 'webpack-bundle-analyzer']
    }

    buildOptions(options) {
        let config = { ...defaultOptions, ...options };

        if (! config.publicPath) {
            config.publicPath = isFront ? config.frontPath || './assets/' : config.appPath || '../../app/public/dist/frontend/';
        }

        config.assetsSources = {
            fonts: config.destination.fonts,
            images: config.destination.images,
        };

        config.destination = {
            fonts: config.publicPath + config.destination.fonts,
            images: config.publicPath + config.destination.images,
            js: config.publicPath + config.destination.js,
            css: config.publicPath + config.destination.css,
        };



        return config;
    }

    /**
     * @param  {Array} options
     * @return {void}
     */

    register(options) {
        this.options = this.buildOptions(options);

        mix
            .setPublicPath(this.options.publicPath)
            .js(this.options.entry.js, this.options.destination.js);

        if (this.options.vendor) {
            mix.extract(Object.keys(require('./package').dependencies), this.options.publicPath + '/' + this.options.vendor);
        }

        mix
            .sass(this.options.entry.css, this.options.destination.css)
            .options(this.options.cssOptions)
            .version()
            .sourceMaps();

        if (! isFront) {
            mix
                .copyDirectory(this.options.frontPath + this.options.assetsSources.images, this.options.destination.images)
                .copyDirectory(this.options.frontPath + this.options.assetsSources.fonts, this.options.destination.fonts);
        }
    }

    /*
     * @return {Array|Object}
     */
    webpackPlugins() {
        let LiveReloadPlugin = require('webpack-livereload-plugin');
        let WebPackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

        let plugins = [
            new LiveReloadPlugin(),
        ];

        if (Mix.inProduction()) {
            plugins.push(new WebPackBundleAnalyzer)
        }

        return plugins;
    }

    /**
     * @param  {Object} webpackConfig
     * @return {void}
     */
    webpackConfig(webpackConfig) {
        webpackConfig.devtool = this.options.devtool || 'source-map';
    }
}

mix.extend('teqMix', new TeqMix());
