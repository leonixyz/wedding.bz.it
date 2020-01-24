(() => {
  document.addEventListener('DOMContentLoaded', (event) => {
    const screenWidth = window.screen.width;
    const breakpoints = [640, 768, 1024, 1366, 1600, 1920, 2560, 3840];
    const target = breakpoints.find(b => b > screenWidth);
    const heroes = document.getElementsByClassName('hero');
    for(let hero of heroes) {
      let bgImageCss = window.getComputedStyle(hero).backgroundImage;
      bgImageCss = bgImageCss.replace('placeholders', target);
      bgImage = bgImageCss.replace('url("', '').replace('")', '');
      const img = new Image();
      img.src = bgImage;
      img.addEventListener('load', event => {
        hero.style.backgroundImage = bgImageCss;
      });
    }
  });
})();
