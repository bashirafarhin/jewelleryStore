const locomotiveAnimation = () => {
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation();

const navbarAnimation = () => {
    gsap.to("#nav-part1 img", {
        transform: "translateY(-100%)",
        scrollTrigger: {
          trigger: "#page1",
          scroller: "#main",
          start: "top 0",
          end: "top -5%",
          scrub: true,
        },
      });
    gsap.to("#nav-part2 #links", {
        transform: "translateY(-100%)",
        opacity: 0,
        scrollTrigger: {
          trigger: "#page1",
          scroller: "#main",
          start: "top 0",
          end: "top -5%",
          scrub: true,
        },
    });
}
navbarAnimation();

const videoContainerAnimation = () => { 
  let videoContainer = document.getElementById("video-container");
  let playBtn = document.getElementById("play");
  
  videoContainer.addEventListener("mouseenter", () => {
      //same as writing playBtn.style.scale=1;
      //playBtn.style.opacity=1;
      //playBtn.style.ease="power2.out";
      gsap.to(playBtn, {
          scale: 1,
          opacity: 1,
          ease: "power2.out"
      });
  });

  videoContainer.addEventListener("mouseleave", () => {
      gsap.to(playBtn, {
          scale: 0,
          opacity: 0,
          ease: "power2.out"
      });
  });

  videoContainer.addEventListener("mousemove", (event) => {
      const containerRect = videoContainer.getBoundingClientRect();
      const playBtnWidth = playBtn.offsetWidth;
      const playBtnHeight = playBtn.offsetHeight;

      const adjustedX = event.clientX - containerRect.left;
      const adjustedY = event.clientY - containerRect.top;

      gsap.to(playBtn, {
          left: adjustedX - (playBtnWidth / 2),
          top: adjustedY - (playBtnHeight / 2),
          ease: "power2.out"
      });
  });
};

videoContainerAnimation();


const loadingAnimation = () => {
    gsap.from("#page1 h1", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 0.9,
      stagger: 0.3,
    });
    gsap.from("#page1 #video-container", {
      scale: 0.9,
      opacity: 0,
      delay: 1.3,
      duration: 0.5,
    });
  }
loadingAnimation();

const cursorAnimation = () => {
    document.addEventListener("mousemove",(event)=>{
        gsap.to("#cursor",{
            left : event.clientX,
            top : event.clientY,
            ease: "power2.out",
        })
    })
    
    document.querySelectorAll(".child").forEach((element)=>{
        element.addEventListener("mouseenter",()=>{
            gsap.to("#cursor",{
                transform : "translate(-50%,-50%) scale(1)",
                ease: "power2.out",
            })
        })
    
        element.addEventListener("mouseleave",()=>{
            gsap.to("#cursor",{
                transform : "translate(-50%,-50%) scale(0)",
                ease: "power2.out",
            })
        })
    })
}
cursorAnimation();

const infiniteScroll = () => {
  let previousClickedDiv = null;

  document.querySelectorAll('.messages-container > div').forEach(div => {
    div.addEventListener('click', function() {
        const icon = this.querySelector('i');
        icon.classList.remove('ri-circle-line');
        icon.classList.add('ri-circle-fill');

        if (previousClickedDiv && previousClickedDiv !== this) {
            const previousIcon = previousClickedDiv.querySelector('i');
            previousIcon.classList.remove('ri-circle-fill');
            previousIcon.classList.add('ri-circle-line');
        }

        const messageDisplay = document.getElementById('message-display').querySelector('h1');
        const message = this.querySelector('.message').innerHTML;
        messageDisplay.innerHTML = message;

        const container = document.querySelector('.messages-container');
        const containerWidth = container.offsetWidth;
        const divPosition = this.offsetLeft + (this.offsetWidth / 2);
        const scrollPosition = divPosition - (containerWidth / 2);
        container.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        gsap.from("#message-display h1", {
          y: 100,
          opacity: 0,
          delay: 0.3,
          duration: 0.7,
          stagger: 0.3,
        });

        previousClickedDiv = this;
    });
  });

  const setDefaultDiv = () => {
    const firstDiv = document.querySelector('.messages-container > div');
    if (firstDiv) {
      firstDiv.click();
    }
  };

  setDefaultDiv();
};
infiniteScroll();

const getCurrYear = () => {
    const yearElement = document.querySelector('.copyright span');
    const currentYear = new Date().getFullYear();
    yearElement.textContent = currentYear;
}
getCurrYear();
