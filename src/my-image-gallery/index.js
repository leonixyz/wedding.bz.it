(() => {
  document.addEventListener('DOMContentLoaded', (event) => {
    // get the main element
    const ui = document.getElementById('my-image-gallery');

    // Get image list as an attribute
    const images = JSON.parse(ui.getAttribute('data-images')) || [];

    // Create an overlay for showing the images bigger
    const overlay = ui.querySelector('#overlay');
    overlay.addEventListener('click', event => {
      overlay.classList.toggle('hidden');
    });
    const overlayContent = ui.querySelector('#overlay-content');

    // Render images
    const masonry = document.createElement('div');
    masonry.classList.add('masonry');

    images.forEach(img => {
      const i = document.createElement('img');
      i._src = img.preview;
      i.alt = img.alt;

      // add onclick callback on each image to trigger the overlay
      i.addEventListener('click', event => {
        const largeImage = document.createElement('img');
        largeImage.src = img.url;
        largeImage.alt = img.alt;

        overlayContent.innerHTML = '';
        overlayContent.appendChild(largeImage);

        overlay.classList.toggle('hidden');
      });

      // load image previews lazily
      new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.src = entry.target._src;
            }
          });
        },
        {
          root: null,
          rootMargin: '1000px',
          threshold: 0
        }
      ).observe(i);

      masonry.appendChild(i);
    });

    ui.appendChild(masonry);


  });
})();
