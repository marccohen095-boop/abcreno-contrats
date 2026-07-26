(() => {
  'use strict';

  const ACCESS_HASH = '744b93f9950fc38dad705556931ea48193b99dcb191cc9bd77097f65fbe2f0b8';
  const SESSION_KEY = 'abcreno-web-access';
  const form = document.querySelector('#access-form');
  const input = document.querySelector('#access-code');
  const message = document.querySelector('#access-message');

  function unlock() {
    document.body.classList.remove('app-locked');
    document.body.classList.add('app-ready');
    sessionStorage.setItem(SESSION_KEY, ACCESS_HASH);
    window.setTimeout(() => window.dispatchEvent(new Event('resize')), 80);
  }

  async function digest(value) {
    const bytes = new TextEncoder().encode(value);
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  async function verify() {
    const value = input.value.replace(/\D/g, '').slice(0, 4);
    input.value = value;
    if (value.length !== 4) return;

    form.classList.add('checking');
    const valid = await digest(value) === ACCESS_HASH;
    form.classList.remove('checking');

    if (valid) {
      message.textContent = 'Accès autorisé';
      form.classList.add('accepted');
      window.setTimeout(unlock, 260);
      return;
    }

    message.textContent = 'Code incorrect';
    form.classList.remove('denied');
    void form.offsetWidth;
    form.classList.add('denied');
    input.select();
  }

  if (sessionStorage.getItem(SESSION_KEY) === ACCESS_HASH) {
    unlock();
  } else {
    window.setTimeout(() => input.focus(), 120);
  }

  input.addEventListener('input', () => {
    message.textContent = '4 chiffres';
    input.value = input.value.replace(/\D/g, '').slice(0, 4);
    if (input.value.length === 4) verify();
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    verify();
  });
})();
