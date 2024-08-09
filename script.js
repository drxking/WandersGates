(function loco() {
    gsap.registerPlugin(ScrollTrigger);


    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    ScrollTrigger.refresh();

})();


let tl = gsap.timeline({
    onComplete: function () {
        let menuBtn = document.querySelector(".menu-btn")
        let menu = document.querySelector(".menu")

        let sts = false
        menuBtn.addEventListener("click", () => {
            if (!sts) {
                let up = gsap.timeline({
                    onComplete: function () {
                        gsap.to(".li-items", {
                            y: `0%`,
                            rotate: 0,
                            stagger: 0.1,
                            opacity: 1,
                            delay: 0.5
                        })
                        gsap.to(".hr-bottom", {
                            width: `100%`,
                            stagger: 0.1,

                        })
                    }
                })
                up.to(menu, {
                    top: `0%`,
                    duration: 0.5
                }, "a")
                up.to("nav", {
                    color: "#fff"
                }, "a")
                up.to(".bars", {
                    backgroundColor: "#fff"
                }, "a")
                up.to(".line-top,.line-bottom", {
                    backgroundColor: "#000"
                }, "a")
                up.to(".line-top", {
                    rotate: 45,
                    y: -5,
                    x: 3,
                    duration: 0.4
                }, "a")
                up.to(".line-bottom", {
                    rotate: -45,
                    y: 5,
                    x: 3,
                    duration: 0.4
                }, "a")
                up.to(".cont", {
                    top: `-100%`
                }, "a")
                sts = true
            }
            else {
                let down = gsap.timeline(
                    {
                        onComplete: function () {
                            gsap.to(menu, {
                                top: `-100%`,
                                duration: 0.5
                            })
                            gsap.to("nav", {
                                color: "#000"
                            })
                            gsap.to(".bars", {
                                backgroundColor: "#000"
                            })
                            gsap.to(".line-top,.line-bottom", {
                                backgroundColor: "#fff"
                            })
                            gsap.to(".line-top,.line-bottom", {
                                rotate: 0,
                                y: 0,
                                x: 0,
                                duration: 0.4
                            })
                            gsap.to(".cont", {
                                top: `0%`
                            })

                        }
                    }
                )
                down.to(".hr-bottom", {
                    width: `0%`,
                    stagger: 0.1
                }, "b")
                down.to(".li-items", {
                    y: `130%`,
                    rotate: 10,
                    stagger: 0.1,
                    delay: 0.5,
                    opacity: 0
                }, "b")


                sts = false
            }
        })

        // MouseMove image popup code

        let imgarr = [
            "https://assets-global.website-files.com/65255f6c73950cc06e5a3610/652d91de440575706961ea56_TinyJPG%20image-8-p-500.jpg",
            "https://assets-global.website-files.com/65255f6c73950cc06e5a3610/652d91de36d2fdd9b3ccc7af_TinyJPG%20image-2.jpg",
            "https://assets-global.website-files.com/65255f6c73950cc06e5a3610/652d91dea5aff4db28ae8958_TinyJPG%20image-3-p-500.jpg",
            "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652bda00fd19962a33f1e80f_Mouse%20Trail%20(5)..jpg",
            "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652bda08e51ee095a8e30bf6_Mouse%20Trail%202.jpg",
            "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652bda16cd21e84660082e31_Mouse%20Trail%20(6)..jpg",
            "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652bda1087d36e6c66ccf4f9_Mouse%20Trail%204.jpg",
            "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652bda267568770d04ae4789_Mouse%20Trail%205.jpg",
            "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652bda399c1f4e8c419d39e5_Mouse%20Trail%206.jpg",
            "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652bda44b05ba5609d9dcfa0_Mouse%20Trail%207.jpg",
            "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652bda4ce3e8f97337c2e5fa_Mouse%20Trail%208.jpg"
        ]




        let hover = document.querySelector(".hoverer")
        let events = 0
        let round = 0
        hover.addEventListener("mousemove", (dets) => {
            let top = hover.getBoundingClientRect().top
            let left = hover.getBoundingClientRect().left
            if (events == 0) {
                events = 1
                let tt = document.createElement("div")
                let img = document.createElement("img")
                img.src = imgarr[round]
                img.classList.add("h-full")
                img.classList.add("w-full")
                img.classList.add("object-cover")
                tt.appendChild(img)
                tt.classList.add("absolute")
                tt.classList.add("w-32")
                tt.classList.add("h-40")
                tt.classList.add("-translate-x-1/2")
                tt.classList.add("-translate-y-1/2")
                tt.classList.add(`top-[${dets.clientY - top}px]`)
                tt.classList.add(`left-[${dets.clientX - left}px]`)
                hover.appendChild(tt)
                gsap.from(tt, {
                    scale: 0,
                    rotate: `-30deg`,
                    opacity: 0.5
                })
                gsap.to(tt, {
                    opacity: 0,
                    scale: 0,
                    rotate: `30deg`,
                    y: 50,
                    delay: 1
                })
                setTimeout(async () => {
                    hover.removeChild(tt)
                }, 2000)


                round++
                if (round >= imgarr.length) {
                    round = 0
                }
                setTimeout(() => {
                    events = 0
                }, 75)
            }

        })
    }
})
tl.from("nav", {
    opacity: 0,
    duration: 1
})
tl.from(".hero .h1-wrapper h1", {
    y: 200,
    rotate: `5deg`,
    stagger: 0.1,
    duration: 0.7
})


let scroll = gsap.timeline();
scroll.to(".scroll h1", {
    y: -15,
    repeat: -1,
    yoyo: true,
}, "a")
scroll.to(".scroll i", {
    y: 15,
    repeat: -1,
    yoyo: true,
}, "a")








let conts = document.querySelectorAll(".image-container")
conts.forEach((cont) => {

    gsap.from(cont, {
        height: 0,
        duration: 0.7,
        ease: Power2,
        scrollTrigger: {
            trigger: cont,
            scroller: "main",
            start: "top 60%",
        }
    })

})



let serviesBox = document.querySelector(".services-container")

serviesBox.addEventListener("mouseenter", () => {
    gsap.to(".upperPic", {
        opacity: 1
    })
    gsap.to(".upperPic img", {
        scale: 1
    })
})
serviesBox.addEventListener("mouseleave", () => {
    gsap.to(".upperPic", {
        opacity: 0
    })
    gsap.to(".upperPic img", {
        scale: 0
    })
})

let images = [
    "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652d68e367cf341750075fd8_Architectural%20Areas.webp",
    "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652d68f9feed285154f6a65b_Areas-Lifestyle-p-500.jpg",
    "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652d691307725fb22535fb7d_Areas%20Aerial-p-500.webp",
    "https://assets-global.website-files.com/652872aec040de3b8c6ee571/652d69240811d0c298c07193_Areas%20Food%26Beverage-p-500.webp",
    "https://images.unsplash.com/photo-1547580116-1b0a345a23f1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

let boxes = document.querySelectorAll(".boxes")

boxes.forEach((box, index) => {
    box.addEventListener("mouseenter", () => {
        document.querySelector(".upperPic img").src = images[index];
        box.querySelector(".right i").style.transform = `rotate(-45deg)`
        box.querySelector(".right p").style.opacity = 1
        box.querySelector(".right p").style.transform = `translate(0)`
    })
    box.addEventListener("mouseleave", () => {
        box.querySelector(".right i").style.transform = `rotate(0deg)`
        box.querySelector(".right p").style.opacity = 0
        box.querySelector(".right p").style.transform = `translate(-8px)`
    })

})





window.addEventListener("mousemove", (dets) => {
    let height = document.querySelector(".cursor").getBoundingClientRect().height
    let width = document.querySelector(".cursor").getBoundingClientRect().width
    gsap.to(".cursor", {
        top: dets.clientY - (height / 2),
        left: dets.clientX - (width / 2),
        duration: 0.2
    })
})



document.querySelectorAll(".zoom").forEach((zoom) => {
    zoom.addEventListener("mouseenter", () => {
        gsap.to(".cursor", {
            height: 120,
            width: 120,
            duration: 0.4
        })
        gsap.to(".cursor p", {
            opacity: 1
        })
    })
    zoom.addEventListener("mouseleave", () => {
        gsap.to(".cursor", {
            height: 8,
            width: 8,
            duration: 0.4
        })
        gsap.to(".cursor p", {
            opacity: 0
        })
    })
})

