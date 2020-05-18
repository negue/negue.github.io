function getPostUrl (slug) {
  return `/blog${slug}`;
}

function getPageUrl(index) {
  return index === 1 ? '/blog' : `/blog-${index}`;
}

module.exports = {
  getPostUrl,
  getPageUrl,
}
