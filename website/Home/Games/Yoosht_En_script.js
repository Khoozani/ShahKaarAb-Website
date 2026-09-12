/* ========================================
   MAIN IMAGE SIZE
======================================== */

var mainImage =
    document.querySelector(".main-image");

var gameArea =
    document.querySelector(".game-area");


function setGameAreaSize() {

    if (!mainImage || !gameArea) {
        return;
    }


    /*
       Wait until the main image has
       a real natural size.
    */

    if (
        !mainImage.naturalWidth ||
        !mainImage.naturalHeight
    ) {
        return;
    }


    /*
       IMPORTANT:
       Use the actual displayed width,
       not the original 900px width.
    */

    var width =
        gameArea.clientWidth;


    if (!width || width <= 0) {
        return;
    }


    /*
       Preserve the exact aspect ratio
       of Box.png.
    */

    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;


    gameArea.style.height =
        Math.ceil(height) + "px";
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
           Mobile browsers sometimes need
           a short delay after rotation.
        */

        setTimeout(
            setGameAreaSize,
            100
        );


        setTimeout(
            setGameAreaSize,
            300
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


    if (
        !speed ||
        speed <= 0
    ) {

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
            (
                endX - startX
            ) *
            progress;


        /* =================================
           CALCULATE Y
        ================================= */

        var y =
            startY +
            (
                endY - startY
            ) *
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

        if (
            mode === "static"
        ) {

            return;
        }


        /* =================================
           ONCE
           START → END → STOP
        ================================= */

        if (
            mode === "once"
        ) {

            progress +=
                speed *
                0.0001;


            if (
                progress >= 1
            ) {

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

           START → END → START → ...
        ================================= */

        if (
            mode === "pingpong"
        ) {

            progress +=
                direction *
                speed *
                0.0001;


            /* =============================
               REACHED END
            ============================= */

            if (
                progress >= 1
            ) {

                progress = 1;

                direction = -1;
            }


            /* =============================
               REACHED START
            ============================= */

            if (
                progress <= 0
            ) {

                progress = 0;

                direction = 1;
            }
        }


        /* =================================
           CONTINUE
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

var sliderImages =
    document.querySelectorAll(
        ".image-slider img"
    );


var currentImage = 0;


/* ========================================
   SHOW NEXT IMAGE
======================================== */

function showNextImage() {

    if (
        !sliderImages.length
    ) {

        return;
    }


    /*
       Hide current image.
    */

    sliderImages[
        currentImage
    ].style.opacity = "0";


    /*
       Move to next image.
    */

    currentImage++;


    /*
       Loop back to first image.
    */

    if (
        currentImage >=
        sliderImages.length
    ) {

        currentImage = 0;
    }


    /*
       Show next image.
    */

    sliderImages[
        currentImage
    ].style.opacity = "1";
}


/* ========================================
   SLIDER TIMER
======================================== */

if (
    sliderImages.length > 1
) {

    setInterval(
        showNextImage,
        4000
    );
}
