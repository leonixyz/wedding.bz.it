(() => {
  document.addEventListener('DOMContentLoaded', (event) => {
    // get the main element
    const ui = document.getElementById('my-contact-form');

    // replace text labels in with attributes
    ui.querySelector('input').placeholder    = ui.getAttribute('data-subject')   || 'Subject';
    ui.querySelector('textarea').placeholder = ui.getAttribute('data-message')   || 'Message';
    ui.querySelector('button').innerText     = ui.getAttribute('data-submit')    || 'Send';

    const form = ui.querySelector('form');
    form.subjectLabel   = ui.getAttribute('data-subject')   || 'Subject';
    form.messageLabel   = ui.getAttribute('data-message')   || 'Message';
    form.submitLabel    = ui.getAttribute('data-submit')    || 'Send';
    form.deliveredLabel = ui.getAttribute('data-delivered') || 'Message delivered.';
    form.retryLabel     = ui.getAttribute('data-retry')     || 'Please retry later.';
    form.errorLabel     = ui.getAttribute('data-error')     || 'An error occurred.';

    // handle form submission via AJAX
    form.addEventListener('submit', event => {
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

        form.originalInnerHTML = form.innerHTML;
        form.innerHTML = `<p>${message}</p>`;

        return form;
      })
      .then(form => {
        setTimeout(() => {
          form.innerHTML = form.originalInnerHTML;
        }, 6000)
      });
    });
  });
})();
