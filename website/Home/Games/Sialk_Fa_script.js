/* ========================================
   MAIN IMAGE SIZE
======================================== */

var mainImage = document.querySelector(".main-image");
var gameArea = document.querySelector(".game-area");


function setGameAreaSize() {

    if (!mainImage || !gameArea) {
        return;
    }


    /*
        If image dimensions are not available yet,
        wait for the image load event.
    */

    if (!mainImage.naturalWidth || !mainImage.naturalHeight) {
        return;
    }


    /*
        Get the ACTUAL displayed width.

        On desktop:
        approximately 900px

        On mobile:
        viewport width minus available space
    */

    var width = gameArea.getBoundingClientRect().width;


    /*
        Prevent invalid dimensions.
    */

    if (!width || width <= 0) {
        return;
    }


    /*
        Calculate proportional height from
        the original main image aspect ratio.
    */

    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;


    gameArea.style.height = height + "px";
}


/* ========================================
   INITIAL IMAGE LOAD
======================================== */

if (mainImage) {

    if (mainImage.complete && mainImage.naturalWidth) {

        setGameAreaSize();

    } else {

        mainImage.addEventListener(
            "load",
            setGameAreaSize
        );

    }

}


/* ========================================
   WINDOW RESIZE
======================================== */

var resizeTimer = null;

window.addEventListener(
    "resize",
    function () {

        /*
            Avoid calculating hundreds of times
            during continuous mobile rotation
            or browser resizing.
        */

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

        setTimeout(
            function () {

                setGameAreaSize();

            },
            100
        );

    }
);


/* ========================================
   BUTTON HOVER IMAGES
======================================== */

var hoverImages = document.querySelectorAll(
    "[data-normal][data-hover]"
);


for (var i = 0; i < hoverImages.length; i++) {

    hoverImages[i].addEventListener(
        "mouseenter",
        function () {

            var hoverSource =
                this.getAttribute("data-hover");

            if (hoverSource) {

                this.src = hoverSource;

            }

        }
    );


    hoverImages[i].addEventListener(
        "mouseleave",
        function () {

            var normalSource =
                this.getAttribute("data-normal");

            if (normalSource) {

                this.src = normalSource;

            }

        }
    );

}


/* ========================================
   MOVING IMAGES
======================================== */

var movingImages = document.querySelectorAll(
    ".moving-image"
);


for (var j = 0; j < movingImages.length; j++) {

    startMovingImage(
        movingImages[j]
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
        image.getAttribute("data-start-x")
    );

    var startY = parseFloat(
        image.getAttribute("data-start-y")
    );


    /* =====================================
       END POSITION
    ====================================== */

    var endX = parseFloat(
        image.getAttribute("data-end-x")
    );

    var endY = parseFloat(
        image.getAttribute("data-end-y")
    );


    /* =====================================
       MOVEMENT MODE
    ====================================== */

    var mode =
        image.getAttribute("data-mode");


    if (!mode) {

        mode = "pingpong";

    }


    /* =====================================
       MOVEMENT SPEED
    ====================================== */

    var speed = parseFloat(
        image.getAttribute("data-speed")
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

           START → END
           سپس توقف
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

var sliderImages = document.querySelectorAll(
    ".image-slider img"
);

var currentImage = 0;


function showNextImage() {

    /*
        Safety check.
    */

    if (!sliderImages.length) {
        return;
    }


    /* =====================================
       HIDE CURRENT IMAGE
    ====================================== */

    sliderImages[currentImage].style.opacity = "0";


    /* =====================================
       NEXT IMAGE
    ====================================== */

    currentImage++;


    /* =====================================
       LOOP BACK TO FIRST IMAGE
    ====================================== */

    if (
        currentImage >=
        sliderImages.length
    ) {

        currentImage = 0;

    }


    /* =====================================
       SHOW NEXT IMAGE
    ====================================== */

    sliderImages[currentImage].style.opacity = "1";

}


/* ========================================
   START SLIDER
======================================== */

if (sliderImages.length > 1) {

    setInterval(
        showNextImage,
        4000
    );

}
