
/*
=========================================================
GET ALL PROJECTS
=========================================================
*/

const projects =
    document.querySelectorAll(".project-section");


/*
=========================================================
UPDATE ALL PROJECTS
=========================================================
*/

function updateProjectAnimation() {

    const isMobile =
        window.innerWidth <= 768;


    projects.forEach(function (section) {

        const image =
            section.querySelector(".project-image");

        const leftContent =
            section.querySelector(".project-left");

        const rightContent =
            section.querySelector(".project-right");


        /*
        ===============================================
        SECTION POSITION
        ===============================================
        */

        const rect =
            section.getBoundingClientRect();


        const sectionHeight =
            section.offsetHeight;


        const viewportHeight =
            window.innerHeight;


        let progress =
            -rect.top /
            (sectionHeight - viewportHeight);


        progress =
            Math.max(
                0,
                Math.min(1, progress)
            );


        /*
        =================================================
        MOBILE
        =================================================
        */

        if (isMobile) {


            /*
            ---------------------------------------------
            IMAGE
            ---------------------------------------------
            */

            const startWidth = 100;
            const endWidth = 90;

            const startHeight = 100;
            const endHeight = 38;


            const width =
                startWidth +
                (endWidth - startWidth) *
                progress;


            const height =
                startHeight +
                (endHeight - startHeight) *
                progress;


            const left =
                (100 - width) / 2;


            const top =
                -(8 * progress);


            image.style.width =
                width + "%";

            image.style.height =
                height + "%";

            image.style.left =
                left + "%";

            image.style.top =
                top + "%";

            image.style.transform =
                "none";


            /*
            ---------------------------------------------
            LEFT GLASS
            ---------------------------------------------
            */

            const leftStart = 0.30;


            let leftProgress =
                (progress - leftStart) /
                (1 - leftStart);


            leftProgress =
                Math.max(
                    0,
                    Math.min(
                        1,
                        leftProgress
                    )
                );


            leftContent.style.opacity =
                leftProgress;


            leftContent.style.transform =
                `translateY(${30 -
                (30 * leftProgress)
                }px)`;


            /*
            ---------------------------------------------
            RIGHT GLASS
            ---------------------------------------------
            */

            const rightStart = 0.50;


            let rightProgress =
                (progress - rightStart) /
                (1 - rightStart);


            rightProgress =
                Math.max(
                    0,
                    Math.min(
                        1,
                        rightProgress
                    )
                );


            rightContent.style.opacity =
                rightProgress;


            rightContent.style.transform =
                `translateY(${30 -
                (30 * rightProgress)
                }px)`;


            /*
            ---------------------------------------------
            MOBILE POSITIONS
            ---------------------------------------------
            */

            leftContent.style.top =
                "40%";


            rightContent.style.top =
                "62%";


            return;
        }



        /*
        ---------------------------------------------
        IMAGE SIZE
        ---------------------------------------------
        */

        const startWidth = 100;
        const endWidth = 37;

        const startHeight = 100;
        const endHeight = 88;


        const width =
            startWidth +
            (endWidth - startWidth) *
            progress;


        const height =
            startHeight +
            (endHeight - startHeight) *
            progress;


        /*
        ---------------------------------------------
        IMAGE POSITION
        ---------------------------------------------
        */

        const startLeft = 0;
        const endLeft = 31.5;

        const startTop = 0;
        const endTop = 6;


        const left =
            startLeft +
            (endLeft - startLeft) *
            progress;


        const top =
            startTop +
            (endTop - startTop) *
            progress;


        image.style.width =
            width + "%";


        image.style.height =
            height + "%";


        image.style.left =
            left + "%";


        image.style.top =
            top + "%";


        image.style.transform =
            "none";


        /*
        ---------------------------------------------
        DESKTOP TEXT
        ---------------------------------------------
        */

        const textOpacity =
            Math.min(
                Math.max(
                    (progress - 0.25) * 2.5,
                    0
                ),
                1
            );


        leftContent.style.opacity =
            textOpacity;


        rightContent.style.opacity =
            textOpacity;

    });

}


/*
=========================================================
SCROLL
=========================================================
*/

window.addEventListener(
    "scroll",
    updateProjectAnimation,
    {
        passive: true
    }
);


/*
=========================================================
RESIZE
=========================================================
*/

window.addEventListener(
    "resize",
    updateProjectAnimation
);


/*
=========================================================
INITIAL
=========================================================
*/

updateProjectAnimation();



// Side carousale
document.addEventListener("DOMContentLoaded", function () {

    const track = document.getElementById("projectTrack");

    const carousel = document.querySelector(".project-carousel");

    const nextBtn = document.getElementById("nextBtn");

    const prevBtn = document.getElementById("prevBtn");


    /*
    ==========================================
    ORIGINAL ITEMS
    ==========================================
    */

    const originalItems = Array.from(
        track.querySelectorAll(".project-item")
    );


    let currentIndex = 0;

    let isAnimating = false;

    const autoSlideTime = 3500;


    /*
    ==========================================
    CLONE FIRST ITEM
    ==========================================
    */

    const firstClone = originalItems[0].cloneNode(true);

    firstClone.classList.remove("active");

    track.appendChild(firstClone);


    /*
    ==========================================
    GET ALL ITEMS
    ==========================================
    */

    function getItems() {

        return track.querySelectorAll(".project-item");

    }


    /*
    ==========================================
    ACTIVE CLASS
    ==========================================
    */

    function updateActive() {

        const items = getItems();

        items.forEach(function (item) {

            item.classList.remove("active");

        });


        items[currentIndex].classList.add("active");

    }


    /*
    ==========================================
    CALCULATE POSITION
    ==========================================
    */

   function getTranslateX() {

    const items = getItems();

    const activeItem = items[currentIndex];

    const carouselWidth = carousel.offsetWidth;

    const activeWidth = activeItem.offsetWidth;


    /*
    ==========================================
    CENTER ACTIVE IMAGE
    ==========================================
    */

    let position =
        activeItem.offsetLeft -
        (
            carouselWidth -
            activeWidth
        ) / 2;


    /*
    ==========================================
    PREVENT NEGATIVE POSITION
    ==========================================
    */

    return Math.max(0, position);

}


    /*
    ==========================================
    MOVE CAROUSEL
    ==========================================
    */

    function moveCarousel(animate = true) {

        const position = getTranslateX();


        if (!animate) {

            track.style.transition = "none";

        } else {

            track.style.transition =
                "transform .85s cubic-bezier(.77,0,.18,1)";

        }


        track.style.transform =
            `translateX(-${position}px)`;


        updateActive();

    }


    /*
    ==========================================
    NEXT
    ==========================================
    */

    function nextSlide() {

        if (isAnimating) {
            return;
        }


        isAnimating = true;


        currentIndex++;


        moveCarousel(true);


        /*
        Reached cloned first slide
        */

        if (
            currentIndex ===
            originalItems.length
        ) {

            setTimeout(function () {

                /*
                Disable transition
                */

                track.style.transition = "none";


                /*
                Go back to first slide
                */

                currentIndex = 0;


                moveCarousel(false);


                /*
                Force repaint
                */

                track.offsetHeight;


                /*
                Restore transition
                */

                track.style.transition =
                    "transform .85s cubic-bezier(.77,0,.18,1)";


                isAnimating = false;

            }, 900);


        } else {

            setTimeout(function () {

                isAnimating = false;

            }, 900);

        }

    }


    /*
    ==========================================
    PREVIOUS
    ==========================================
    */

    function prevSlide() {

        if (isAnimating) {
            return;
        }


        isAnimating = true;


        /*
        If first item,
        jump to last item
        */

        if (currentIndex === 0) {

            currentIndex =
                originalItems.length - 1;


            moveCarousel(false);


            track.offsetHeight;


            isAnimating = false;


            return;

        }


        currentIndex--;


        moveCarousel(true);


        setTimeout(function () {

            isAnimating = false;

        }, 900);

    }


    /*
    ==========================================
    BUTTONS
    ==========================================
    */

    nextBtn.addEventListener(
        "click",
        nextSlide
    );


    prevBtn.addEventListener(
        "click",
        prevSlide
    );


    /*
    ==========================================
    AUTO SLIDE
    ==========================================
    */

    let autoSlide = setInterval(
        nextSlide,
        autoSlideTime
    );


    /*
    ==========================================
    PAUSE ON HOVER
    ==========================================
    */

    carousel.addEventListener(
        "mouseenter",
        function () {

            clearInterval(autoSlide);

        }
    );


    /*
    ==========================================
    RESUME
    ==========================================
    */

    carousel.addEventListener(
        "mouseleave",
        function () {

            clearInterval(autoSlide);


            autoSlide = setInterval(
                nextSlide,
                autoSlideTime
            );

        }
    );


    /*
    ==========================================
    TOUCH SWIPE
    ==========================================
    */

    let touchStartX = 0;


    carousel.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchend",
        function (event) {

            const touchEndX =
                event.changedTouches[0].screenX;


            const distance =
                touchStartX - touchEndX;


            if (distance > 50) {

                nextSlide();

            }


            if (distance < -50) {

                prevSlide();

            }

        },
        {
            passive: true
        }
    );


    /*
    ==========================================
    RESIZE
    ==========================================
    */

    window.addEventListener(
        "resize",
        function () {

            moveCarousel(false);

        }
    );


    /*
    ==========================================
    INITIAL
    ==========================================
    */

    updateActive();

    moveCarousel(false);

});





/* =========================================================
   PARTNERSHIP CAROUSEL
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const section =
        document.querySelector(".partnership-carousel-section");

    if (!section) return;


    const track =
        section.querySelector("#partnershipTrack");

    const carousel =
        section.querySelector(".partnership-carousel");

    const nextBtn =
        section.querySelector("#partnershipNextBtn");

    const prevBtn =
        section.querySelector("#partnershipPrevBtn");


    if (!track || !carousel || !nextBtn || !prevBtn) {
        return;
    }


    /*
    =========================================================
    ORIGINAL ITEMS
    =========================================================
    */

    const originalItems =
        Array.from(
            track.querySelectorAll(".partnership-item")
        );


    if (originalItems.length === 0) {
        return;
    }


    let currentIndex = 0;

    let isAnimating = false;

    const autoSlideTime = 3500;


    /*
    =========================================================
    CLONE FIRST ITEM
    =========================================================
    */

    const firstClone =
        originalItems[0].cloneNode(true);

    firstClone.classList.remove("active");

    track.appendChild(firstClone);


    /*
    =========================================================
    GET ITEMS
    =========================================================
    */

    function getItems() {

        return track.querySelectorAll(
            ".partnership-item"
        );

    }


    /*
    =========================================================
    ACTIVE
    =========================================================
    */

    function updateActive() {

        const items = getItems();

        items.forEach(function (item) {

            item.classList.remove("active");

        });


        if (items[currentIndex]) {

            items[currentIndex]
                .classList.add("active");

        }

    }


    /*
    =========================================================
    TRANSLATE
    =========================================================
    */

    function getTranslateX() {

        const items = getItems();

        const activeItem =
            items[currentIndex];

        if (!activeItem) {
            return 0;
        }


        const carouselWidth =
            carousel.offsetWidth;

        const activeWidth =
            activeItem.offsetWidth;


        /*
        Center active image
        */

        let position =
            activeItem.offsetLeft -
            (
                carouselWidth -
                activeWidth
            ) / 2;


        return Math.max(0, position);

    }


    /*
    =========================================================
    MOVE
    =========================================================
    */

    function moveCarousel(animate = true) {

        const position =
            getTranslateX();


        if (!animate) {

            track.style.transition = "none";

        } else {

            track.style.transition =
                "transform .85s cubic-bezier(.77,0,.18,1)";

        }


        track.style.transform =
            `translateX(-${position}px)`;


        updateActive();

    }


    /*
    =========================================================
    NEXT
    =========================================================
    */

    function nextSlide() {

        if (isAnimating) {
            return;
        }


        isAnimating = true;

        currentIndex++;


        moveCarousel(true);


        /*
        Reached cloned slide
        */

        if (
            currentIndex ===
            originalItems.length
        ) {

            setTimeout(function () {

                track.style.transition =
                    "none";


                currentIndex = 0;


                moveCarousel(false);


                /*
                Force browser repaint
                */

                track.offsetHeight;


                track.style.transition =
                    "transform .85s cubic-bezier(.77,0,.18,1)";


                isAnimating = false;

            }, 900);

        } else {

            setTimeout(function () {

                isAnimating = false;

            }, 900);

        }

    }


    /*
    =========================================================
    PREVIOUS
    =========================================================
    */

    function prevSlide() {

        if (isAnimating) {
            return;
        }


        isAnimating = true;


        /*
        First slide
        */

        if (currentIndex === 0) {

            currentIndex =
                originalItems.length - 1;


            moveCarousel(false);


            track.offsetHeight;


            isAnimating = false;

            return;

        }


        currentIndex--;


        moveCarousel(true);


        setTimeout(function () {

            isAnimating = false;

        }, 900);

    }


    /*
    =========================================================
    BUTTONS
    =========================================================
    */

    nextBtn.addEventListener(
        "click",
        nextSlide
    );


    prevBtn.addEventListener(
        "click",
        prevSlide
    );


    /*
    =========================================================
    AUTO SLIDE
    =========================================================
    */

    let autoSlide =
        setInterval(
            nextSlide,
            autoSlideTime
        );


    /*
    =========================================================
    PAUSE ON HOVER
    =========================================================
    */

    carousel.addEventListener(
        "mouseenter",
        function () {

            clearInterval(autoSlide);

        }
    );


    /*
    =========================================================
    RESUME
    =========================================================
    */

    carousel.addEventListener(
        "mouseleave",
        function () {

            clearInterval(autoSlide);


            autoSlide =
                setInterval(
                    nextSlide,
                    autoSlideTime
                );

        }
    );


    /*
    =========================================================
    TOUCH SWIPE
    =========================================================
    */

    let touchStartX = 0;


    carousel.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    carousel.addEventListener(
        "touchend",
        function (event) {

            const touchEndX =
                event.changedTouches[0].screenX;


            const distance =
                touchStartX - touchEndX;


            if (distance > 50) {

                nextSlide();

            }


            if (distance < -50) {

                prevSlide();

            }

        },
        {
            passive: true
        }
    );


    /*
    =========================================================
    RESIZE
    =========================================================
    */

    window.addEventListener(
        "resize",
        function () {

            moveCarousel(false);

        }
    );


    /*
    =========================================================
    INITIAL
    =========================================================
    */

    updateActive();

    moveCarousel(false);

});


