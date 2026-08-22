module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy({ "content/photos": "photos" });
  eleventyConfig.addPassthroughCopy({ "content/poems": "poems" });
  eleventyConfig.addPassthroughCopy("js");

  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return new Date(dateObj).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  });

  eleventyConfig.addCollection("posts", (collectionApi) => {
    return collectionApi.getFilteredByGlob("content/posts/*.md");
  });
  eleventyConfig.addCollection("photos", (collectionApi) => {
  return collectionApi.getFilteredByGlob("content/photos/**/album.md");
});
eleventyConfig.addCollection("poems", (collectionApi) => {
  return collectionApi.getFilteredByGlob("content/poems/**/poem.md");
});

  return {
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site"
    }
  };
};