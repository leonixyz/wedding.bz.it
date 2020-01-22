(() => {
  customElements.define('my-contact-form',
    /**
     * A contact form that POSTs to an API in order to send me an email.
     */
    class MyContactForm extends HTMLElement {

      /**
       * Observed attributes
       */
      static get observedAttributes() {
        return [
          'subject',
          'message',
          'submit',
          'delivered',
          'retry',
          'error'
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
       * Render element and attach form submission event listener.
       */
      connectedCallback () {
        // replace text labels in template with attributes
        this.shadowRoot.querySelector('input').placeholder    = this.getAttribute('subject')   || 'Subject';
        this.shadowRoot.querySelector('textarea').placeholder = this.getAttribute('message')   || 'Message';
        this.shadowRoot.querySelector('button').innerText     = this.getAttribute('submit')    || 'Send';
        
        // handle form submission via AJAX
        const form = this.shadowRoot.querySelector('form');
        form.subjectLabel   = this.getAttribute('subject')   || 'Subject';
        form.messageLabel   = this.getAttribute('message')   || 'Message';
        form.submitLabel    = this.getAttribute('submit')    || 'Send';
        form.deliveredLabel = this.getAttribute('delivered') || 'Message delivered.';
        form.retryLabel     = this.getAttribute('retry')     || 'Please retry later.';
        form.errorLabel     = this.getAttribute('error')     || 'An error occurred.';
        form.addEventListener('submit', this.submit);
      }


      /**
       * Implement form submission via AJAX.
       */
      submit (event) {
        event.preventDefault();
        const form = event.target;

        const subject = form.subject.value;
        const message = form.message.value;
        if (!subject || !message) {
          return;
        }

        form.submitBtn.disabled = true;
        form.submitBtn.innerText = '...';
        
        fetch(form.action, {
          method: form.method,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            subject: subject,
            message: message
          })
        })
        .then(async response => {
          response = await response.json();
          let message;
          if (response && response.MessageId) {
            message = form.deliveredLabel;
          } else if (response && response.error) {
            message = `${response.error} ${form.retryLabel}`;
          } else {
            message = `${form.errorLabel} ${form.retryLabel}`;
          }

          form.innerHTML = `<p>${message}</p>`;

          return form;
        })
        .then(form => {
          setTimeout(() => {
            form.parentNode.innerHTML = html;
          }, 6000)
        });
      }
    }
  );
})();
