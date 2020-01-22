(() => {
  customElements.define('my-image-gallery',
    /**
     * An image gallery
     */
    class MyImageGallery extends HTMLElement {

      /**
       * Observed attributes
       */
      static get observedAttributes() {
        return [
          'images',
        ];
      }

      
      /**
       * Setup custom element
       */
      constructor () {
        // Always call super() first in constructor.
        super();

        // Create the template and attach it as a shadow DOM - will be available as this.shadowRoot
        const css = require('./style.css').default;
        const html = require('./template.html').default;
        const template = document.createElement('template');
        template.innerHTML = `<style>${css}</style>${html}`;
        this.attachShadow({ mode: 'open' })
          .appendChild(template.content.cloneNode(true));
      }


      /**
       * Render element and setup overlay
       */
      connectedCallback () {
        // Get image list as an attribute
        this.images = JSON.parse(this.getAttribute('images')) || [];

        // Create an overlay for showing the images bigger
        const overlay = this.shadowRoot.querySelector('#overlay');
        overlay.addEventListener('click', event => {
          overlay.classList.toggle('hidden');
        });
        const overlayContent = this.shadowRoot.querySelector('#overlay-content');
        
        // Render images
        const masonry = document.createElement('div');
        masonry.classList.add('masonry');

        this.images.forEach(img => {
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
              rootMargin: '500px',
              threshold: 0
            }
          ).observe(i);

          masonry.appendChild(i);
        });

        this.shadowRoot.appendChild(masonry);
      }
    }
  );
})();

