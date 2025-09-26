// // trigger to play music in the background with sweetalert
// window.addEventListener('load', () => {
//     Swal.fire({
//         title: 'Bạn có muốn nhận quà không?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes',
//         cancelButtonText: 'No',
//     }).then((result) => {
//         if (result.isConfirmed) {
//             document.querySelector('.song').play();
//             animationTimeline();
//         } else {
//             animationTimeline();
//         }
//     });
// });
window.addEventListener('load', () => {
    const gift = document.querySelector('.gift');
    const song = document.querySelector('.song');

    gift.addEventListener('click', () => {
        gift.style.display = 'none';
        if (song && typeof song.play === 'function') {
            song.play().catch(() => {});
        }
        animationTimeline();
    });
});

// animation timeline
const animationTimeline = () => {
    const textBoxChars = document.getElementsByClassName("hbd-chatbox")[0];
    const hbd = document.getElementsByClassName("wish-hbd")[0];

    textBoxChars.innerHTML = `<span>${textBoxChars.innerHTML.split("").join("</span><span>")}</span>`;
    hbd.innerHTML = `<span>${hbd.innerHTML.split("").join("</span><span>")}</span>`;

    const ideaTextTrans = { opacity: 0, y: -20, rotationX: 5, skewX: "15deg" };
    const ideaTextTransLeave = { opacity: 0, y: 20, rotationY: 5, skewX: "-15deg" };

    const tl = gsap.timeline();

    tl.to(".container", { duration: 0.6, visibility: "visible" })
      .from(".one", { duration: 0.7, opacity: 0, y: 10 })
      .from(".two", { duration: 0.4, opacity: 0, y: 10 })
      .to(".one", { duration: 0.7, opacity: 0, y: 10 }, "+=3.5")
      .to(".two", { duration: 0.7, opacity: 0, y: 10 }, "-=1")
      .from(".three", { duration: 0.7, opacity: 0, y: 10 })
      .to(".three", { duration: 0.7, opacity: 0, y: 10 }, "+=3")
      .from(".four", { duration: 0.7, scale: 0.2, opacity: 0 })
      .from(".fake-btn", { duration: 0.3, scale: 0.2, opacity: 0 })
      .to(".hbd-chatbox span", { duration: 1.5, stagger: 0.05, visibility: "visible" })
      .to(".fake-btn", { duration: 0.1, backgroundColor: "rgb(127, 206, 248)" }, "+=4")
      .to(".four", { duration: 0.5, scale: 0.2, opacity: 0, y: -150 }, "+=1")
      .from(".idea-1", { duration: 0.7, ...ideaTextTrans })
      .to(".idea-1", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
      .from(".idea-2", { duration: 0.7, ...ideaTextTrans })
      .to(".idea-2", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
      .from(".idea-3", { duration: 0.7, ...ideaTextTrans })
      .to(".idea-3 strong", { duration: 0.5, scale: 1.2, x: 10, backgroundColor: "rgb(21, 161, 237)", color: "#fff" })
      .to(".idea-3", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
      .from(".idea-4", { duration: 0.7, ...ideaTextTrans })
      .to(".idea-4", { duration: 0.7, ...ideaTextTransLeave }, "+=2.5")
      .from(".idea-5", { duration: 0.7, rotationX: 15, rotationZ: -10, skewY: "-5deg", y: 50, z: 10, opacity: 0 }, "+=1.5")
      .to(".idea-5 span", { duration: 0.7, rotation: 90, x: 8 }, "+=1.4")
      .to(".idea-5", { duration: 0.7, scale: 0.2, opacity: 0 }, "+=2")
      .from(".idea-6 span", { duration: 0.8, stagger: 0.2, scale: 3, opacity: 0, rotation: 15, ease: "expo.out" })
      .to(".idea-6 span", { duration: 0.8, stagger: 0.2, scale: 3, opacity: 0, rotation: -15, ease: "expo.out" }, "+=1.5");

    // Balloons random props
    const balloons = document.querySelectorAll(".baloons img");
    balloons.forEach((img, index) => {
        // keep images within view on both portrait and landscape
        if (index % 2 === 0) {
            img.style.left = (10 + Math.random() * 30) + "%"; // 10% - 40%
        } else {
            img.style.left = (60 + Math.random() * 30) + "%"; // 60% - 90%
        }
        const scale = 0.6 + Math.random() * 0.6;
        img.style.transform = "scale(" + scale + ")";
        // keep hidden until GSAP reveals them
        img.style.opacity = ""; // use CSS default (0) so timeline controls visibility
        // boost clarity
        img.style.filter = "saturate(1.2) contrast(1.2)";
    });

    // show balloons from bottom to top and start after the party moment
    tl.to(".baloons img", { duration: 7, stagger: 0.6, opacity: 1, y: "-160vh", ease: "none", repeat: -1 }, "party+=0.8")
      .from(".profile-picture", { duration: 0.5, scale: 3.5, opacity: 0, x: 25, y: -25, rotationZ: -45 }, "-=2")
      .from(".hat", { duration: 0.5, x: -100, y: 350, rotation: -180, opacity: 0 })
      .from(".wish-hbd span", { duration: 0.7, stagger: 0.1, opacity: 0, y: -50, rotation: 150, skewX: "30deg", ease: "elastic.out(1, 0.5)" })
      .to(".wish-hbd span", { duration: 0.7, stagger: 0.1, scale: 1, rotationY: 0, color: "#ff69b4", ease: "expo.out" }, "party")
      .from(".wish h5", { duration: 0.5, opacity: 0, y: 10, skewX: "-15deg" }, "party")
      .to(".eight svg", { duration: 1.5, stagger: 0.3, visibility: "visible", opacity: 0, scale: 80, repeat: 3, repeatDelay: 1.4 })
      .to(".six", { duration: 0.5, opacity: 0, y: 30, zIndex: -1 })
      // after .six is gone, raise balloons above other content
      .add(() => { document.querySelector('.seven')?.classList.add('seven--active'); })
      .from(".nine p", { duration: 1, stagger: 1.2, ...ideaTextTrans }, "+=5");

    const replyBtn = document.getElementById("replay");
    if (replyBtn) {
        replyBtn.addEventListener("click", () => {
            tl.restart();
        });
    }

    // when music ends, show gallery backdrop
    const song = document.querySelector('.song');
    if (song) {
        song.addEventListener('ended', () => {
            const backdrop = document.querySelector('.gallery-backdrop');
            if (backdrop) backdrop.classList.add('active');
        });
    }
}
