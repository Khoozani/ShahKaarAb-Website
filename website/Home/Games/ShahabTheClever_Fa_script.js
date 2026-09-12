/* ========================================
   MAIN IMAGE SIZE
======================================== */

var mainImage = document.querySelector(".main-image");
var gameArea = document.querySelector(".game-area");


function setGameAreaSize() {

    if (
        !mainImage ||
        !gameArea ||
        !mainImage.naturalWidth ||
        !mainImage.naturalHeight
    ) {
        return;
    }

    var width = gameArea.clientWidth;

    var height =
        width *
        mainImage.naturalHeight /
        mainImage.naturalWidth;

    gameArea.style.height = height + "px";
}


/* ========================================
   INITIALIZE
======================================== */

function initializeGameArea() {

    requestAnimationFrame(function () {

        setGameAreaSize();

    });
}


if (mainImage.complete) {

    initializeGameArea();

} else {

    mainImage.addEventListener(
        "load",
        initializeGameArea
    );
}


/* ========================================
   RESIZE
======================================== */

window.addEventListener(
    "resize",
    function () {

        requestAnimationFrame(
            setGameAreaSize
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
