module.exports = function(eleventyConfig) {
    // Return your Object options:
    return {
      dir: {
        input: 'src',
        output: 'public',
        includes: '_includes'
      }
    }
  };
  
    // Copy `img/` to `_site/img`
    //eleventyConfig.addPassthroughCopy("img");
  
    // Copy `css/fonts/` to `_site/css/fonts`
    // Keeps the same directory structure.
    //eleventyConfig.addPassthroughCopy("css/fonts");
  
    // Copy any .jpg file to `_site`, via Glob pattern
    // Keeps the same directory structure.
    //eleventyConfig.addPassthroughCopy("**/*.jpg");

    