require('./responsive-images/index.js');

if(/MSIE \d|Trident.*rv:/.test(navigator.userAgent)) {
  // Internet Explorer and old MS Edge
  const ieOnly = document.querySelectorAll('.IE-only');
  const nonIeOnly = document.querySelectorAll('.non-IE-only');
  ieOnly.forEach(e => {
    e.classList.toggle('IE-only')
  });
  nonIeOnly.forEach(e => {
    e.hidden = true;
  });
} else {
  // Normal browsers
  require('./my-contact-form/index.js');
  require('./my-image-gallery/index.js');
}
