/* ========================================
   GLOBAL VARIABLES
======================================== */

var mainImage = document.querySelector(".main-image");
var gameArea = document.querySelector(".game-area");

var loader = document.getElementById("loader");
var loaderPercent = document.getElementById("loader-percent");
var loaderProgress = document.getElementById("loader-progress");

var imagesLoaded = 0;
var totalImages = 0;
var websiteStarted = false;


/* ========================================
   RESOURCE LIST
======================================== */

var resources = [];


/* ========================================
   ADD RESOURCE
======================================== */

function addResource(src) {

    if (!src) {
        return;
    }

    if (resources.indexOf(src) === -1) {
        resources.push(src);
    }

}


/* ========================================
   COLLECT IMAGE RESOURCES
======================================== */

var allImages = document.querySelectorAll("img");

for (var i = 0; i < allImages.length; i++) {

    addResource(
        allImages[i].getAttribute("src")
    );

    addResource(
        allImages[i].getAttribute("data-normal")
    );

    addResource(
        allImages[i].getAttribute("data-hover")
    );

}


/* ========================================
   BACKGROUND IMAGE
======================================== */

addResource("Background_Pattern.png");


/* ========================================
   TOTAL RESOURCES
======================================== */

totalImages = resources.length;


/* ========================================
   UPDATE LOADING PROGRESS
======================================== */

function updateProgress() {

    var percent = 0;

    if (totalImages > 0) {

        percent = Math.round(
            (imagesLoaded / totalImages) * 100
        );

    } else {

        percent = 100;

    }

    if (percent > 100) {
        percent = 100;
    }

    loaderPercent.textContent =
        percent + "%";

    loaderProgress.style.width =
        percent + "%";

}


/* ========================================
   RESOURCE LOADED
======================================== */

function resourceLoaded() {

    imagesLoaded++;

    updateProgress();

    if (imagesLoaded >= totalImages) {

        waitForFont();

    }

}


/* ========================================
   WAIT FOR FONT
======================================== */

function waitForFont() {

    if (
        document.fonts &&
        document.fonts.ready
    ) {

        document.fonts.ready.then(
            function () {

                startWebsite();

            }
        );

    } else {

        startWebsite();

    }

}


/* ========================================
   START WEBSITE
======================================== */

function startWebsite() {

    if (websiteStarted) {
        return;
    }

    websiteStarted = true;

    loaderPercent.textContent =
        "100%";

    loaderProgress.style.width =
        "100%";


    setTimeout(
        function () {

            document.body.classList.add(
                "loaded"
            );

            loader.classList.add(
                "hidden"
            );


            /* ==================================
               SET GAME AREA SIZE
            ================================== */

            setGameAreaSize();


            /* ==================================
               SET SLIDER SIZE
            ================================== */

            setImageSliderSize();


            /* ==================================
               START MOVING IMAGES
            ================================== */

            startMovingImages();


            /* ==================================
               START BUTTON HOVER
            ================================== */

            startButtonHover();


            /* ==================================
               START IMAGE SLIDER
            ================================== */

            startImageSlider();

        },
        400
    );

}


/* ========================================
   PRELOAD ALL RESOURCES
======================================== */

if (totalImages === 0) {

    waitForFont();

} else {

    for (
        var j = 0;
        j < resources.length;
        j++
    ) {

        var preloadImage =
            new Image();

        preloadImage.onload =
            resourceLoaded;

        preloadImage.onerror =
            resourceLoaded;

        preloadImage.src =
            resources[j];

    }

}


/* ========================================
   MAIN IMAGE / GAME AREA SIZE
======================================== */

function setGameAreaSize() {

    if (
        !mainImage ||
        !gameArea ||
        !mainImage.naturalWidth ||
        !mainImage.naturalHeight
    ) {

        return;

    }


    /*
       The width is controlled by CSS.

       Desktop:
       up to 900px

       Mobile:
       viewport width

       Height is calculated from the real
       aspect ratio of the main image.
    */

    var width =
        gameArea.getBoundingClientRect().width;


    if (!width || width <= 0) {
        return;
    }


    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;


    gameArea.style.height =
        height + "px";

}


/* ========================================
   IMAGE SLIDER SIZE
======================================== */

function setImageSliderSize() {

    var slider =
        document.querySelector(".image-slider");

    var firstImage =
        document.querySelector(".image-slider img");


    if (
        !slider ||
        !firstImage
    ) {

        return;

    }


    if (
        !firstImage.naturalWidth ||
        !firstImage.naturalHeight
    ) {

        return;

    }


    var sliderWidth =
        slider.getBoundingClientRect().width;


    if (!sliderWidth || sliderWidth <= 0) {
        return;
    }


    var sliderHeight =
        sliderWidth *
        firstImage.naturalHeight /
        firstImage.naturalWidth;


    slider.style.height =
        sliderHeight + "px";

}


/* ========================================
   WINDOW RESIZE
======================================== */

function handleResize() {

    if (!websiteStarted) {
        return;
    }

    /*
       Wait until browser finishes changing
       viewport dimensions.
    */

    requestAnimationFrame(
        function () {

            setGameAreaSize();
            setImageSliderSize();

        }
    );

}


window.addEventListener(
    "resize",
    handleResize
);


/* ========================================
   ORIENTATION CHANGE
======================================== */

window.addEventListener(
    "orientationchange",
    function () {

        setTimeout(
            function () {

                if (websiteStarted) {

                    setGameAreaSize();
                    setImageSliderSize();

                }

            },
            150
        );

    }
);


/* ========================================
   VISUAL VIEWPORT CHANGE
======================================== */

if (window.visualViewport) {

    window.visualViewport.addEventListener(
        "resize",
        handleResize
    );

}


/* ========================================
   MAIN IMAGE LOAD SAFETY
======================================== */

if (mainImage) {

    mainImage.addEventListener(
        "load",
        function () {

            if (websiteStarted) {

                setGameAreaSize();
                setImageSliderSize();

            }

        }
    );

}


/* ========================================
   BUTTON HOVER IMAGES
======================================== */

function startButtonHover() {

    var hoverImages =
        document.querySelectorAll(
            "[data-normal][data-hover]"
        );


    for (
        var k = 0;
        k < hoverImages.length;
        k++
    ) {

        hoverImages[k].addEventListener(
            "mouseenter",
            function () {

                this.src =
                    this.getAttribute(
                        "data-hover"
                    );

            }
        );


        hoverImages[k].addEventListener(
            "mouseleave",
            function () {

                this.src =
                    this.getAttribute(
                        "data-normal"
                    );

            }
        );

    }

}


/* ========================================
   MOVING IMAGES
======================================== */

function startMovingImages() {

    var movingImages =
        document.querySelectorAll(
            ".moving-image"
        );


    for (
        var m = 0;
        m < movingImages.length;
        m++
    ) {

        startMovingImage(
            movingImages[m]
        );

    }

}


/* ========================================
   MOVING IMAGE FUNCTION
======================================== */

function startMovingImage(image) {

    var startX = parseFloat(
        image.getAttribute(
            "data-start-x"
        )
    );

    var startY = parseFloat(
        image.getAttribute(
            "data-start-y"
        )
    );

    var endX = parseFloat(
        image.getAttribute(
            "data-end-x"
        )
    );

    var endY = parseFloat(
        image.getAttribute(
            "data-end-y"
        )
    );

    var mode =
        image.getAttribute(
            "data-mode"
        );


    if (!mode) {
        mode = "pingpong";
    }


    var speed = parseFloat(
        image.getAttribute(
            "data-speed"
        )
    );


    if (!speed || speed <= 0) {
        speed = 5;
    }


    var progress = 0;
    var direction = 1;


    /* =====================================
       UPDATE POSITION
    ====================================== */

    function updatePosition() {

        var x =
            startX +
            (endX - startX) *
            progress;


        var y =
            startY +
            (endY - startY) *
            progress;


        image.style.left =
            x + "%";

        image.style.top =
            y + "%";


        /* =================================
           STATIC
        ================================= */

        if (mode === "static") {

            return;

        }


        /* =================================
           ONCE
        ================================= */

        if (mode === "once") {

            progress =
                progress +
                speed *
                0.0001;


            if (progress >= 1) {

                progress = 1;

                image.style.left =
                    endX + "%";

                image.style.top =
                    endY + "%";

                return;

            }


            requestAnimationFrame(
                updatePosition
            );

            return;

        }


        /* =================================
           PINGPONG
        ================================= */

        if (mode === "pingpong") {

            progress =
                progress +
                direction *
                speed *
                0.0001;


            if (progress >= 1) {

                progress = 1;

                direction = -1;

            }


            if (progress <= 0) {

                progress = 0;

                direction = 1;

            }

        }


        requestAnimationFrame(
            updatePosition
        );

    }


    updatePosition();

}


/* ========================================
   IMAGE FADE SLIDER
======================================== */

function startImageSlider() {

    var sliderImages =
        document.querySelectorAll(
            ".image-slider img"
        );


    if (!sliderImages.length) {
        return;
    }


    var currentImage = 0;


    /* =====================================
       FIRST IMAGE
    ====================================== */

    for (
        var s = 0;
        s < sliderImages.length;
        s++
    ) {

        sliderImages[s].style.opacity =
            "0";

    }


    sliderImages[0].style.opacity =
        "1";


    /* =====================================
       NEXT IMAGE
    ====================================== */

    function showNextImage() {

        sliderImages[currentImage]
            .style.opacity = "0";


        currentImage++;


        if (
            currentImage >=
            sliderImages.length
        ) {

            currentImage = 0;

        }


        sliderImages[currentImage]
            .style.opacity = "1";

    }


    /* =====================================
       EVERY 4 SECONDS
    ====================================== */

    setInterval(
        showNextImage,
        4000
    );

}
