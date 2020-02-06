// Load polyfill for IntersectionObserver
if(!("IntersectionObserver" in window)) {
  var request = new XMLHttpRequest();
  request.open('GET', '/intersection-observer.js', false);
  request.send(null);

  if (request.status === 200) {
    eval(request.responseText);
  }
}

require('./responsive-images/index.js');
require('./my-contact-form/index.js');
require('./my-image-gallery/index.js');
