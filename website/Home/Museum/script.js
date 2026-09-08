/* ========================================
   PAGE LOADING SYSTEM
======================================== */

var loader = document.getElementById("page-loader");
var loaderPercent = document.getElementById("loader-percent");
var loaderProgressBar = document.getElementById("loader-progress-bar");

var completedTasks = 0;
var totalTasks = 0;
var loadingFinished = false;


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

}


/* ========================================
   COLLECT NORMAL / HOVER IMAGES
======================================== */

var hoverImages = document.querySelectorAll(
    "[data-normal][data-hover]"
);

for (var j = 0; j < hoverImages.length; j++) {

    addResource(
        hoverImages[j].getAttribute("data-normal")
    );

    addResource(
        hoverImages[j].getAttribute("data-hover")
    );

}


/* ========================================
   BACKGROUND IMAGE
======================================== */

addResource(
    "../Background_Pattern.png"
);


/* ========================================
   TOTAL LOADING TASKS
======================================== */

totalTasks = resources.length + 1;


/* ========================================
   UPDATE LOADING PROGRESS
======================================== */

function updateLoadingProgress() {

    var percent = 0;

    if (totalTasks > 0) {

        percent =
            Math.floor(
                (completedTasks / totalTasks) * 100
            );

    }

    if (percent > 100) {

        percent = 100;

    }

    loaderPercent.textContent =
        percent + "%";

    loaderProgressBar.style.width =
        percent + "%";

}


/* ========================================
   RESOURCE COMPLETED
======================================== */

function resourceCompleted() {

    completedTasks++;

    updateLoadingProgress();

    if (
        completedTasks >= totalTasks &&
        !loadingFinished
    ) {

        loadingFinished = true;

        finishLoading();

    }

}


/* ========================================
   PRELOAD IMAGE
======================================== */

function preloadImage(src) {

    var image = new Image();

    image.onload = function () {

        resourceCompleted();

    };

    image.onerror = function () {

        console.warn(
            "Unable to load image:",
            src
        );

        resourceCompleted();

    };

    image.src = src;

}


/* ========================================
   START IMAGE PRELOADING
======================================== */

for (var k = 0; k < resources.length; k++) {

    preloadImage(
        resources[k]
    );

}


/* ========================================
   LOAD UNIXEL FONT
======================================== */

if (
    document.fonts &&
    document.fonts.load
) {

    document.fonts.load(
        'normal 16px "Unixel"'
    ).then(
        function () {

            resourceCompleted();

        }
    ).catch(
        function () {

            resourceCompleted();

        }
    );

} else {

    resourceCompleted();

}


/* ========================================
   FINISH LOADING
======================================== */

function finishLoading() {

    updateLoadingProgress();

    /*
       اجازه می‌دهیم 100% برای مدت کوتاهی
       دیده شود.
    */

    setTimeout(
        function () {

            startPage();

        },
        200
    );

}


/* ========================================
   MAIN IMAGE SIZE
======================================== */

var mainImage = document.querySelector(
    ".main-image"
);

var gameArea = document.querySelector(
    ".game-area"
);


function setGameAreaSize() {

    if (
        !mainImage.naturalWidth ||
        !mainImage.naturalHeight
    ) {

        return;

    }

    var width =
        gameArea.offsetWidth;

    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;

    gameArea.style.height =
        height + "px";

}


/* ========================================
   START PAGE
======================================== */

function startPage() {

    /* =====================================
       SET GAME AREA SIZE
    ====================================== */

    setGameAreaSize();


    /* =====================================
       WINDOW RESIZE
    ====================================== */

    window.addEventListener(
        "resize",
        setGameAreaSize
    );


    /* =====================================
       BUTTON HOVER IMAGES
    ====================================== */

    for (
        var i = 0;
        i < hoverImages.length;
        i++
    ) {

        hoverImages[i].addEventListener(
            "mouseenter",
            function () {

                this.src =
                    this.getAttribute(
                        "data-hover"
                    );

            }
        );


        hoverImages[i].addEventListener(
            "mouseleave",
            function () {

                this.src =
                    this.getAttribute(
                        "data-normal"
                    );

            }
        );

    }


    /* =====================================
       MOVING IMAGES
    ====================================== */

    var movingImages =
        document.querySelectorAll(
            ".moving-image"
        );


    for (
        var j = 0;
        j < movingImages.length;
        j++
    ) {

        startMovingImage(
            movingImages[j]
        );

    }


    /* =====================================
       START SLIDER 1
    ====================================== */

    startSlider(
        ".image-slider img"
    );


    /* =====================================
       START SLIDER 2
    ====================================== */

    startSlider(
        ".image-slider2 img"
    );


    /* =====================================
       SHOW PAGE
    ====================================== */

    document.body.classList.add(
        "loaded"
    );

}


/* ========================================
   MOVING IMAGE FUNCTION
======================================== */

function startMovingImage(image) {


    /* =====================================
       START POSITION
    ====================================== */

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


    /* =====================================
       END POSITION
    ====================================== */

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


    /* =====================================
       MOVEMENT MODE
    ====================================== */

    var mode =
        image.getAttribute(
            "data-mode"
        );

    if (!mode) {

        mode = "pingpong";

    }


    /* =====================================
       MOVEMENT SPEED
    ====================================== */

    var speed = parseFloat(
        image.getAttribute(
            "data-speed"
        )
    );

    if (!speed || speed <= 0) {

        speed = 5;

    }


    /* =====================================
       MOVEMENT PROGRESS

       0 = START
       1 = END
    ====================================== */

    var progress = 0;


    /* =====================================
       MOVEMENT DIRECTION

       1  = FORWARD
       -1 = BACKWARD
    ====================================== */

    var direction = 1;


    /* =====================================
       UPDATE POSITION
    ====================================== */

    function updatePosition() {


        /* =================================
           CALCULATE X
        ================================= */

        var x =
            startX +
            (endX - startX) *
            progress;


        /* =================================
           CALCULATE Y
        ================================= */

        var y =
            startY +
            (endY - startY) *
            progress;


        /* =================================
           APPLY POSITION
        ================================= */

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


            /* =============================
               REACHED END
            ============================= */

            if (progress >= 1) {

                progress = 1;

                direction = -1;

            }


            /* =============================
               REACHED START
            ============================= */

            if (progress <= 0) {

                progress = 0;

                direction = 1;

            }

        }


        /* =================================
           CONTINUE ANIMATION
        ================================= */

        requestAnimationFrame(
            updatePosition
        );

    }


    /* =====================================
       START
    ====================================== */

    updatePosition();

}


/* ========================================
   IMAGE FADE SLIDER
======================================== */

function startSlider(selector) {

    var sliderImages =
        document.querySelectorAll(
            selector
        );

    var currentImage = 0;


    /* =====================================
       NO IMAGES
    ====================================== */

    if (
        !sliderImages ||
        sliderImages.length === 0
    ) {

        return;

    }


    /* =====================================
       FIRST IMAGE
    ====================================== */

    for (
        var i = 0;
        i < sliderImages.length;
        i++
    ) {

        sliderImages[i].style.opacity = "0";

    }


    sliderImages[0].style.opacity = "1";


    /* =====================================
       ONLY ONE IMAGE
    ====================================== */

    if (sliderImages.length <= 1) {

        return;

    }


    /* =====================================
       NEXT IMAGE
    ====================================== */

    function showNextImage() {

        sliderImages[currentImage].style.opacity =
            "0";


        currentImage++;


        if (
            currentImage >=
            sliderImages.length
        ) {

            currentImage = 0;

        }


        sliderImages[currentImage].style.opacity =
            "1";

    }


    /* =====================================
       CHANGE EVERY 4 SECONDS
    ====================================== */

    setInterval(
        showNextImage,
        4000
    );

}