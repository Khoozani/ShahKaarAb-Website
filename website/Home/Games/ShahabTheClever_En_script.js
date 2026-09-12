/* ========================================
   MAIN IMAGE SIZE
======================================== */

var mainImage = document.querySelector(".main-image");
var gameArea = document.querySelector(".game-area");


function setGameAreaSize() {

    if (!mainImage.naturalWidth || !mainImage.naturalHeight) {
        return;
    }

    var width = gameArea.offsetWidth;

    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;

    gameArea.style.height = height + "px";
}


/* ========================================
   IMAGE LOADED
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

window.addEventListener(
    "resize",
    setGameAreaSize
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

            this.src =
                this.getAttribute("data-hover");

        }
    );


    hoverImages[i].addEventListener(
        "mouseleave",
        function () {

            this.src =
                this.getAttribute("data-normal");

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

           تصویر در نقطه شروع ثابت می‌ماند
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

var sliderImages = document.querySelectorAll(".image-slider img");

var currentImage = 0;

function showNextImage() {

    /* محو کردن تصویر فعلی */
    sliderImages[currentImage].style.opacity = "0";

    /* رفتن به تصویر بعدی */
    currentImage++;

    /* بعد از تصویر هشتم، برگشت به تصویر اول */
    if (currentImage >= sliderImages.length) {
        currentImage = 0;
    }

    /* نمایش تصویر بعدی */
    sliderImages[currentImage].style.opacity = "1";
}


/* هر ۴ ثانیه تصویر بعدی */

setInterval(showNextImage, 4000);
