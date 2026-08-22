module.exports = {
  eleventyComputed: {
    permalink: (data) => {
      const parts = data.page.filePathStem.split("/");
      const slug = parts[parts.length - 1];
      return `/posts/${slug}/`;
    }
  }
};