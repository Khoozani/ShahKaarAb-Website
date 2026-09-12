/* ========================================
   MAIN ELEMENTS
======================================== */

var mainImage = document.querySelector(".main-image");
var gameArea = document.querySelector(".game-area");


/* ========================================
   UPDATE GAME AREA
======================================== */

function setGameAreaSize() {

    if (!mainImage || !gameArea) {
        return;
    }


    if (
        !mainImage.naturalWidth ||
        !mainImage.naturalHeight
    ) {
        return;
    }


    /* =====================================
       GET REAL WIDTH
    ====================================== */

    var width = gameArea.clientWidth;


    if (!width || width <= 0) {
        return;
    }


    /* =====================================
       CALCULATE IMAGE HEIGHT
    ====================================== */

    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;


    gameArea.style.height =
        height + "px";


    /* =====================================
       CALCULATE DESIGN SCALE

       Original design = 900px
    ====================================== */

    var scale =
        width / 900;


    /*
       جلوگیری از صفر شدن scale
    */

    if (!scale || scale <= 0) {
        scale = 1;
    }


    gameArea.style.setProperty(
        "--game-scale",
        scale
    );
}


/* ========================================
   INITIAL SIZE
======================================== */

if (mainImage.complete) {

    setGameAreaSize();

} else {

    mainImage.addEventListener(
        "load",
        setGameAreaSize
    );

}


/* ========================================
   WINDOW RESIZE
======================================== */

var resizeTimer;

window.addEventListener(
    "resize",
    function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(
            setGameAreaSize,
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
            setGameAreaSize,
            150
        );

    }
);


/* ========================================
   BUTTON HOVER IMAGES
======================================== */

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

            var hover =
                this.getAttribute(
                    "data-hover"
                );

            if (hover) {
                this.src = hover;
            }

        }
    );


    hoverImages[i].addEventListener(
        "mouseleave",
        function () {

            var normal =
                this.getAttribute(
                    "data-normal"
                );

            if (normal) {
                this.src = normal;
            }

        }
    );

}


/* ========================================
   MOVING IMAGES
======================================== */

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


/* ========================================
   MOVING IMAGE FUNCTION
======================================== */

function startMovingImage(image) {


    /* =====================================
       START POSITION
    ====================================== */

    var startX =
        parseFloat(
            image.getAttribute(
                "data-start-x"
            )
        );


    var startY =
        parseFloat(
            image.getAttribute(
                "data-start-y"
            )
        );


    /* =====================================
       END POSITION
    ====================================== */

    var endX =
        parseFloat(
            image.getAttribute(
                "data-end-x"
            )
        );


    var endY =
        parseFloat(
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

    var speed =
        parseFloat(
            image.getAttribute(
                "data-speed"
            )
        );


    if (!speed || speed <= 0) {
        speed = 5;
    }


    /* =====================================
       MOVEMENT PROGRESS
    ====================================== */

    var progress = 0;


    /* =====================================
       MOVEMENT DIRECTION
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

            progress +=
                speed * 0.0001;


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

            progress +=
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


    /* =====================================
       START ANIMATION
    ====================================== */

    updatePosition();
}


/* ========================================
   IMAGE FADE SLIDER
======================================== */

var sliderImages =
    document.querySelectorAll(
        ".image-slider img"
    );


var currentImage = 0;


/* ========================================
   CHECK SLIDER
======================================== */

if (sliderImages.length > 1) {


    function showNextImage() {


        /* ================================
           HIDE CURRENT
        ================================= */

        sliderImages[
            currentImage
        ].style.opacity = "0";


        /* ================================
           NEXT IMAGE
        ================================= */

        currentImage++;


        if (
            currentImage >=
            sliderImages.length
        ) {

            currentImage = 0;
        }


        /* ================================
           SHOW NEXT
        ================================= */

        sliderImages[
            currentImage
        ].style.opacity = "1";
    }


    /* ====================================
       EVERY 4 SECONDS
    ==================================== */

    setInterval(
        showNextImage,
        4000
    );
}
