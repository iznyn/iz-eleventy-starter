// const htmlmin = require('html-minifier');
const lazyImagesPlugin = require('eleventy-plugin-lazyimages');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(lazyImagesPlugin, {
    transformImgPath: (imgPath) => {
      if (imgPath.startsWith('http://') || imgPath.startsWith('https://')) {
        // Handle remote file
        return imgPath;
      } else {
        return `./src/${imgPath}`;
      }
    },
  });

  eleventyConfig.setBrowserSyncConfig({
    files: './_site/assets',
  });

  // eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
  //   if (outputPath.endsWith('.html')) {
  //     const minified = htmlmin.minify(content, {
  //       useShortDoctype: true,
  //       removeComments: true,
  //       collapseWhitespace: true,
  //       minifyJS: true,
  //     });
  //     return minified;
  //   }

  //   return content;
  // });

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  return {
    dir: { input: 'src', output: '_site' },
  };
};