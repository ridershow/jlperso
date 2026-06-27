document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.ds-header');
  if (!header) return;

  const banner = document.querySelector('.ds-banner');
  const mainSection = document.querySelector('.ds-main-section');
  const height = header.offsetHeight;

  if (banner) banner.style.marginTop = height + 'px';
  if (mainSection) mainSection.style.marginTop = height + 'px';

  const onScroll = () => {
    header.classList.toggle('ds-fixed-header', window.scrollY >= 10);
  };

  window.addEventListener('scroll', onScroll);
  onScroll();
});
