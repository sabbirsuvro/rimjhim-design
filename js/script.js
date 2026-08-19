
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
        =================================================
        DESKTOP
        =================================================
        */


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