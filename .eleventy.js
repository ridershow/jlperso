// Inspired from https://stackblitz.com/github/josephdyer/skeleventy

module.exports = (eleventyConfig) => {
  // Return your Object options:

  // Minify our HTML
  config.addTransform(
    'htmlminify',
    require('./utilities/transforms/htmlminify')
  );


 // Layout aliases
 config.addLayoutAlias('base', 'layouts/base.njk');
 config.addLayoutAlias('home', 'layouts/home.njk');
 config.addLayoutAlias('page', 'layouts/page.njk');
 config.addLayoutAlias('blog', 'layouts/blog.njk');
 //config.addLayoutAlias('post', 'layouts/post.njk');
 //config.addLayoutAlias('contact', 'layouts/contact.njk');
 //config.addLayoutAlias('category', 'layouts/category.njk');

 // Include our static assets
 config.addPassthroughCopy('css');
 config.addPassthroughCopy('js');
 config.addPassthroughCopy('images');


  return {
    markdownTemplateEngine: 'njk',
    dir: {
      input: 'src',
      output: 'public',
      includes: 'includes',
      data: 'globals',
    },
  };

};