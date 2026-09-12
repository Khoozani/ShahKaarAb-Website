/* ========================================
   MAIN IMAGE / GAME AREA
======================================== */

var mainImage = document.querySelector(".main-image");
var gameArea = document.querySelector(".game-area");


/* ========================================
   SET GAME AREA SIZE
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


    /*
       عرض واقعی Game Area
       توسط CSS تعیین می‌شود.

       روی Desktop:
       حداکثر 900px

       روی Mobile:
       برابر عرض صفحه منهای حاشیه
    */

    var width = gameArea.getBoundingClientRect().width;


    if (!width || width <= 0) {
        return;
    }


    /*
       محاسبه ارتفاع بر اساس نسبت تصویر اصلی
    */

    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;


    gameArea.style.height =
        height + "px";
}


/* ========================================
   IMAGE LOADED
======================================== */

if (mainImage) {

    if (mainImage.complete) {

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

window.addEventListener(
    "resize",
    setGameAreaSize
);


/* ========================================
   ORIENTATION CHANGE
======================================== */

window.addEventListener(
    "orientationchange",
    function () {

        /*
           بعد از چرخش گوشی،
           مرورگر ممکن است هنوز ابعاد جدید
           را کامل اعمال نکرده باشد.
        */

        setTimeout(
            setGameAreaSize,
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


    /* =====================================
       START
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

function showNextImage() {

    if (!sliderImages.length) {
        return;
    }


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


/* ========================================
   NEXT SLIDE
======================================== */

if (sliderImages.length > 1) {

    setInterval(
        showNextImage,
        4000
    );

}
