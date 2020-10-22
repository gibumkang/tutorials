const intro = document.querySelector('.intro');
const video = intro.querySelector('video');
const text = intro.querySelector('h1');
//END SECTION
const section = document.querySelector('section');
const end = section.querySelector('h1');

//SCROLL MAGIC
const controller = new ScrollMagic.Controller();
const scene = new ScrollMagic.Scene({
    //scroll length of the scene
    duration: 9000,
    triggerElement: intro,
    //ranges from 0 - 1, this is where you palce the trigger hook on the page
    triggerHook: 0,
})
    .addIndicators()
    .setPin(intro)
    .addTo(controller);

//Video Animation
let accelamount = 0.1;
let scrollPosition = 0;
let delay = 0;

scene.on('update', (e) => {
    scrollPosition = e.scrollPos / 1000;
    console.log(e);
});

setInterval(() => {
    //delay is equal to the scrollPosition subtracted by the delay, which is 0 by default, multipled by the accelamount
    //as the delay increases slowly per scrollPosition due to +=, the currentTime of the video becomes the total length of the delay
    delay += (scrollPosition - delay) * accelamount;
    //console.log(scrollPosition, delay);
    video.currentTime = delay;
    //33.3 is determined by 1000 (representing a full second) divided by the framerate the video was shot in (30fps)
}, 33.3);
