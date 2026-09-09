
const b=document.querySelector('.menu'),n=document.querySelector('.links');
if(b&&n){b.addEventListener('click',()=>{const o=n.classList.toggle('open');b.setAttribute('aria-expanded',String(o))});n.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{n.classList.remove('open');b.setAttribute('aria-expanded','false')}))}
document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());

/* Install dialog.
   The button used to jump to a section further down the page, which meant
   reading past it to find out the page had already answered the question.
   A dialog answers it where it was asked.

   A site cannot install a PWA for you. Chrome's beforeinstallprompt only ever
   applies to the origin you are on, so firing it here would offer to install
   clipcycle.co rather than the app, and iOS has no such API at all. The app
   itself catches that event and replays it — so the honest job here is the
   steps, and a way through to where the real prompt lives. */
(function () {
  const dialog = document.querySelector('#install-dialog');
  if (!dialog) return;

  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    /* iPadOS reports itself as a Mac, and the touch points give it away. */
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  const android = /android/i.test(navigator.userAgent);
  const phone = ios || android;

  /* Lead with the one they are holding. The other stays available, because
     plenty of people read the site on a laptop and install on their phone. */
  if (phone) {
    dialog.querySelectorAll('[data-platform]').forEach((block) => {
      block.hidden = block.dataset.platform !== (ios ? 'ios' : 'android');
    });
    const other = dialog.querySelector('.install-other');
    if (other) other.hidden = false;
  }

  const desktopNote = dialog.querySelector('.install-desktop');
  if (desktopNote) desktopNote.hidden = phone;

  document.querySelectorAll('[data-install]').forEach((trigger) => {
    trigger.addEventListener('click', (event) => {
      event.preventDefault();
      dialog.showModal();
    });
  });

  dialog.querySelectorAll('[data-close]').forEach((button) => {
    button.addEventListener('click', () => dialog.close());
  });

  /* Clicking the backdrop closes it. The dialog fills its own box, so a click
     landing on the element itself landed outside the content. */
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });

  const other = dialog.querySelector('[data-show-all]');
  if (other) {
    other.addEventListener('click', () => {
      dialog.querySelectorAll('[data-platform]').forEach((b) => (b.hidden = false));
      other.hidden = true;
    });
  }
})();
