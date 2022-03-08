"use strict"

//downloading:
window.onload = function () {
    const parallax = document.querySelector('.parallax');

    if (parallax) {
        const content = document.querySelector('.parallax__container');
        const clouds = document.querySelector('.images-parallax__clouds');
        const mountains = document.querySelector('.images-parallax__mountains');
        const tourist = document.querySelector('.images-parallax__tourist');

        //Сoefficients (how many pixels of move):
        const forClouds = 40;
        const forMountains = 20;
        const forTourist = 10;

        //Animation speed:
        const speed = 0.05;

        // variables declaration :
        let positionX = 0, positionY = 0;
        let coordXpercent = 0, coordYpercent = 0;

        //function of animation while mouse moving:
        function setMouseParallaxStyle() {
            const distX = coordXpercent - positionX;
            const distY = coordYpercent - positionY;

            positionX = positionX + (distX * speed);
            positionY = positionY + (distY * speed);

            //transfering styles into the object:
            clouds.style.cssText = `transform: translate(${positionX / forClouds}%, ${positionY / forClouds}%)`;
            mountains.style.cssText = `transform: translate(${positionX / forMountains}%, ${positionY / forMountains}%)`;
            tourist.style.cssText = `transform: translate(${positionX / forTourist}%, ${positionY / forTourist}%)`;

            requestAnimationFrame(setMouseParallaxStyle);
        }
        setMouseParallaxStyle();
        parallax.addEventListener("mousemove", function (e) {
            //getting w/h of the block:
            const parallaxWidth = parallax.offsetWidth;
            const parallaxHeight = parallax.offsetHeight;

            //when cursor is in the middle of page:
            const coordX = e.pageX - parallaxWidth / 2;
            const coordY = e.pageY - parallaxHeight / 2;

            //how many % from the center of screen:
            coordXpercent = coordX / parallaxWidth * 100;
            coordYpercent = coordY / parallaxHeight * 100;
        });

        //Scroll Parallax:
        let thresholdSets = [];
        for (let i = 0; i < 1.0; i += 0.005) {
            thresholdSets.push(i);
        }
        const callback = function (entries, observer) {
            const scrollTopPercent = window.pageYOffset / parallax.offsetHeight * 100;
            setParallaxItemsStyle(scrollTopPercent);
        };
        const observer = new IntersectionObserver(callback, {
            threshold: thresholdSets
        });

        observer.observe(document.querySelector('.content'));

        function setParallaxItemsStyle(scrollTopPercent) {
            content.style.cssText = `transform: translate(0%,-${scrollTopPercent / 9}%)`;
            mountains.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent / 6}%)`;
            tourist.parentElement.style.cssText = `transform: translate(0%,-${scrollTopPercent / 3}%)`;

        }

    }
}