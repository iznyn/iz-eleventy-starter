// eslint-disable-next-line import/no-extraneous-dependencies
const mix = require('laravel-mix');

mix.disableSuccessNotifications();
mix.setPublicPath('_site/assets');

mix
  .copy('public', '_site')
  // .copy('node_modules/alpinejs/dist/alpine.js', '_site/assets/scripts/alpine.js')
  .js('src/scripts/main.js', 'scripts')
  .js('src/scripts/libs.js', 'scripts')
  .postCss('src/styles/main.css', 'styles');
