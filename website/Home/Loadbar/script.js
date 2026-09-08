/* ========================================
PAGE LOADING SYSTEM
======================================== */

var loader = document.getElementById("page-loader");

var loaderPercent = document.getElementById(
"loader-percent"
);

var loaderProgressBar = document.getElementById(
"loader-progress-bar"
);

var completedTasks = 0;

var totalTasks = 0;

var loadingFinished = false;

var resources = [];

/* ========================================
ADD UNIQUE RESOURCE
======================================== */

function addResource(src) {

```
if (!src) {

    return;

}

if (resources.indexOf(src) === -1) {

    resources.push(src);

}
```

}

/* ========================================
COLLECT ALL IMAGE RESOURCES
======================================== */

var allImages = document.querySelectorAll("img");

for (var i = 0; i < allImages.length; i++) {

```
addResource(
    allImages[i].getAttribute("src")
);
```

}

/* ========================================
COLLECT HOVER IMAGES
======================================== */

var hoverImages = document.querySelectorAll(
"[data-normal][data-hover]"
);

for (var j = 0; j < hoverImages.length; j++) {

```
addResource(
    hoverImages[j].getAttribute("data-normal")
);

addResource(
    hoverImages[j].getAttribute("data-hover")
);
```

}

/* ========================================
CSS BACKGROUND
======================================== */

addResource(
"../Background_Pattern.png"
);

/* ========================================
IFRAME RESOURCE
======================================== */

var videoFrame = document.querySelector(
".video-box iframe"
);

/* ========================================
TOTAL TASKS
======================================== */

totalTasks = resources.length + 1;

/*
+1 برای Font
iframe در صورت وجود نیز به صورت
جداگانه مدیریت می‌شود.
*/

if (videoFrame) {

```
totalTasks++;
```

}

/* ========================================
UPDATE PROGRESS
======================================== */

function updateLoadingProgress() {

```
var percent = 0;


if (totalTasks > 0) {

    percent = Math.floor(
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
```

}

/* ========================================
RESOURCE COMPLETED
======================================== */

function resourceCompleted() {

```
completedTasks++;

updateLoadingProgress();


if (
    completedTasks >= totalTasks &&
    !loadingFinished
) {

    loadingFinished = true;

    finishLoading();

}
```

}

/* ========================================
PRELOAD IMAGE
======================================== */

function preloadImage(src) {

```
var image = new Image();


image.onload = function () {

    resourceCompleted();

};


image.onerror = function () {

    console.warn(
        "Unable to load image:",
        src
    );

    /*
       حتی در صورت خطا، Loading متوقف
       نمی‌شود.
    */

    resourceCompleted();

};


image.src = src;
```

}

/* ========================================
START IMAGE PRELOADING
======================================== */

for (var k = 0; k < resources.length; k++) {

```
preloadImage(
    resources[k]
);
```

}

/* ========================================
FONT LOADING
======================================== */

if (
document.fonts &&
document.fonts.load
) {

```
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
```

} else {

```
resourceCompleted();
```

}

/* ========================================
APARAT IFRAME LOADING
======================================== */

if (videoFrame) {

```
var iframeLoaded = false;


function completeIframeLoading() {

    if (iframeLoaded) {

        return;

    }

    iframeLoaded = true;

    resourceCompleted();

}


videoFrame.addEventListener(
    "load",
    completeIframeLoading
);


/*
   اگر iframe قبلاً Load شده باشد،
   اجازه می‌دهیم رویداد فعلی اجرا شود.
*/
```

}

/* ========================================
FINISH LOADING
======================================== */

function finishLoading() {

```
updateLoadingProgress();


/*
   کمی مکث برای نمایش 100%
   قبل از Fade Out شدن Loader
*/

setTimeout(

    function () {

        startPage();

    },

    200

);
```

}

/* ========================================
PAGE START
======================================== */

function startPage() {

```
/*
   ابتدا اندازه Game Area
   محاسبه می‌شود.
*/

setGameAreaSize();


/*
   Resize
*/

window.addEventListener(
    "resize",
    setGameAreaSize
);


/*
   Hover Buttons
*/

startButtonHover();


/*
   Moving Images
*/

startMovingImages();


/*
   Slider
*/

startSlider();


/*
   نمایش صفحه
*/

document.body.classList.add(
    "loaded"
);
```

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

```
if (
    !mainImage ||
    !gameArea
) {

    return;

}


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
```

}

/* ========================================
BUTTON HOVER IMAGES
======================================== */

function startButtonHover() {

```
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
```

}

/* ========================================
MOVING IMAGES
======================================== */

function startMovingImages() {

```
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
```

}

/* ========================================
MOVING IMAGE FUNCTION
======================================== */

function startMovingImage(image) {

```
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


if (
    !speed ||
    speed <= 0
) {

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

    if (
        mode === "static"
    ) {

        return;

    }


    /* =================================
       ONCE
    ================================= */

    if (
        mode === "once"
    ) {


        progress =
            progress +
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
    ================================= */

    if (
        mode === "pingpong"
    ) {


        progress =
            progress +
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
```

}

/* ========================================
IMAGE FADE SLIDER
======================================== */

function startSlider() {

```
var sliderImages =
    document.querySelectorAll(
        ".image-slider img"
    );


if (
    sliderImages.length <= 1
) {

    return;

}


var currentImage = 0;


function showNextImage() {


    /* ================================
       FADE OUT CURRENT IMAGE
    ================================= */

    sliderImages[
        currentImage
    ].style.opacity = "0";


    /* ================================
       NEXT IMAGE
    ================================= */

    currentImage++;


    /* ================================
       LOOP
    ================================= */

    if (
        currentImage >=
        sliderImages.length
    ) {

        currentImage = 0;

    }


    /* ================================
       FADE IN NEXT IMAGE
    ================================= */

    sliderImages[
        currentImage
    ].style.opacity = "1";

}


/* =====================================
   EVERY 4 SECONDS
====================================== */

setInterval(
    showNextImage,
    4000
);
```

}
