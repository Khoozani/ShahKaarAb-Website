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

var resizeTimer = null;


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

addResource(
    "Background_Pattern.png"
);


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


            /*
             * ==================================
             * SET GAME AREA
             * ==================================
             */

            setGameAreaSize();


            /*
             * ==================================
             * START MOVING IMAGES
             * ==================================
             */

            startMovingImages();


            /*
             * ==================================
             * START BUTTON HOVER
             * ==================================
             */

            startButtonHover();


            /*
             * ==================================
             * START IMAGE SLIDER
             * ==================================
             */

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

    for (var j = 0; j < resources.length; j++) {

        var preloadImage = new Image();

        preloadImage.onload =
            resourceLoaded;

        preloadImage.onerror =
            resourceLoaded;

        preloadImage.src =
            resources[j];

    }

}


/* ========================================
   MAIN GAME AREA SIZE
======================================== */

function setGameAreaSize() {

    if (!mainImage) {
        return;
    }


    if (
        !mainImage.naturalWidth ||
        !mainImage.naturalHeight
    ) {

        return;

    }


    /*
     * عرض واقعی Game Area
     *
     * Desktop:
     * حداکثر 900px
     *
     * Mobile:
     * عرض واقعی viewport
     */

    var availableWidth =
        document.documentElement.clientWidth;


    if (!availableWidth || availableWidth <= 0) {

        availableWidth =
            window.innerWidth;

    }


    /*
     * رعایت حداکثر عرض طراحی
     */

    var width =
        Math.min(
            availableWidth,
            900
        );


    /*
     * جلوگیری از عرض منفی یا صفر
     */

    if (width < 1) {
        return;
    }


    /*
     * ارتفاع متناسب با تصویر اصلی
     */

    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;


    /*
     * اعمال اندازه واقعی
     */

    gameArea.style.width =
        width + "px";

    gameArea.style.height =
        height + "px";

}


/* ========================================
   WINDOW RESIZE
======================================== */

window.addEventListener(
    "resize",
    function () {

        if (!websiteStarted) {
            return;
        }


        clearTimeout(resizeTimer);


        resizeTimer = setTimeout(
            function () {

                setGameAreaSize();

            },
            50
        );

    }
);


/* ========================================
   ORIENTATION CHANGE
======================================== */

window.addEventListener(
    "orientationchange",
    function () {

        if (!websiteStarted) {
            return;
        }


        setTimeout(
            function () {

                setGameAreaSize();

            },
            150
        );

    }
);


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


    /*
     * اگر مختصات ناقص باشند،
     * انیمیشن متوقف می‌شود.
     */

    if (
        isNaN(startX) ||
        isNaN(startY) ||
        isNaN(endX) ||
        isNaN(endY)
    ) {

        return;

    }


    var mode =
        image.getAttribute(
            "data-mode"
        );


    if (!mode) {
        mode = "pingpong";
    }


    var speed =
        parseFloat(
            image.getAttribute(
                "data-speed"
            )
        );


    if (!speed || speed <= 0) {
        speed = 5;
    }


    var progress = 0;

    var direction = 1;


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


        /*
         * STATIC
         */

        if (mode === "static") {
            return;
        }


        /*
         * ONCE
         */

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


        /*
         * PINGPONG
         */

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


    /*
     * Hide all
     */

    for (
        var s = 0;
        s < sliderImages.length;
        s++
    ) {

        sliderImages[s].style.opacity =
            "0";

    }


    /*
     * Show first
     */

    sliderImages[0].style.opacity =
        "1";


    /*
     * NEXT IMAGE
     */

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


    /*
     * EVERY 4 SECONDS
     */

    setInterval(
        showNextImage,
        4000
    );

}
