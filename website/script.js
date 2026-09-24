/* ========================================
   WEBSITE LOADER
======================================== */

var loader = document.getElementById("loader");
var loaderPercent = document.getElementById("loader-percent");
var loaderProgress = document.getElementById("loader-progress");

var imagesLoaded = 0;
var totalImages = 0;

var websiteStarted = false;

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
   BACKGROUND RESOURCE
======================================== */

addResource(
    "./Home/Background_Pattern.png"
);


totalImages = resources.length;


/* ========================================
   UPDATE LOADER PROGRESS
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


    /*
       Small delay keeps the completed
       progress state visible before
       the loader disappears.
    */

    setTimeout(
        function () {

            document.body.classList.add(
                "loaded"
            );


            loader.classList.add(
                "hidden"
            );


            startWebsiteInteractions();

        },
        400
    );

}


/* ========================================
   PRELOAD ALL RESOURCES
======================================== */

function preloadResources() {

    if (totalImages === 0) {

        updateProgress();

        waitForFont();

        return;

    }


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
   START WEBSITE INTERACTIONS
======================================== */

function startWebsiteInteractions() {

    startButtonHover();

    startMovingImages();

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
        var j = 0;
        j < movingImages.length;
        j++
    ) {

        startMovingImage(
            movingImages[j]
        );

    }

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


    if (!speed) {
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

           START → END
           THEN STOP
        ================================= */

        if (mode === "once") {

            progress =
                progress +
                speed *
                0.0001;


            if (progress >= 1) {

                progress = 1;

                return;

            }


            requestAnimationFrame(
                updatePosition
            );

            return;

        }


        /* =================================
           PINGPONG

           START → END → START → END...
        ================================= */

        if (mode === "pingpong") {

            progress =
                progress +
                direction *
                speed *
                0.0001;


            /* =============================
               REACHED END
            ============================== */

            if (progress >= 1) {

                progress = 1;

                direction = -1;

            }


            /* =============================
               REACHED START
            ============================== */

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
   START LOADING
======================================== */

updateProgress();

preloadResources();