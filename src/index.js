// Load polyfill for IntersectionObserver on Internet Explorer and old MS Edge
if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver', false);
  request.send(null);

  if (request.status === 200) {
    eval(request.responseText);
  }
}

require('./responsive-images/index.js');
require('./my-contact-form/index.js');
require('./my-image-gallery/index.js');
