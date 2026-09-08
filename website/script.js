/* ========================================
   BUTTON HOVER IMAGES
======================================== */

var hoverImages = document.querySelectorAll(
    "[data-normal][data-hover]"
);

for (var i = 0; i < hoverImages.length; i++) {

    hoverImages[i].addEventListener("mouseenter", function () {

        this.src = this.getAttribute("data-hover");

    });


    hoverImages[i].addEventListener("mouseleave", function () {

        this.src = this.getAttribute("data-normal");

    });

}


/* ========================================
   MOVING IMAGES
======================================== */

var movingImages = document.querySelectorAll(
    ".moving-image"
);


for (var j = 0; j < movingImages.length; j++) {

    startMovingImage(movingImages[j]);

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

    var mode = image.getAttribute("data-mode");

    if (!mode) {
        mode = "pingpong";
    }


    /* =====================================
       MOVEMENT SPEED
    ====================================== */

    var speed = parseFloat(
        image.getAttribute("data-speed")
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


        /* Calculate X */

        var x =
            startX +
            (endX - startX) *
            progress;


        /* Calculate Y */

        var y =
            startY +
            (endY - startY) *
            progress;


        /* Apply position */

        image.style.left = x + "%";
        image.style.top = y + "%";


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


            /* Reached END */

            if (progress >= 1) {

                progress = 1;

                direction = -1;

            }


            /* Reached START */

            if (progress <= 0) {

                progress = 0;

                direction = 1;

            }

        }


        /* Continue animation */

        requestAnimationFrame(
            updatePosition
        );

    }


    /* =====================================
       START
    ====================================== */

    updatePosition();

}
