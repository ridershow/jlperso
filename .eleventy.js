module.exports = (eleventyConfig) => {
  // Layout aliases
  eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
  eleventyConfig.addLayoutAlias('home', 'layouts/home.njk');
  eleventyConfig.addLayoutAlias('page', 'layouts/page.njk');

  // Output static assets under /assets/ to match template paths
  eleventyConfig.addPassthroughCopy({ 'css': 'assets/css' });
  eleventyConfig.addPassthroughCopy({ 'js': 'assets/js' });
  eleventyConfig.addPassthroughCopy({ 'images': 'assets/images' });

  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
      includes: 'includes',
      data: 'global',
    },
  };
};
