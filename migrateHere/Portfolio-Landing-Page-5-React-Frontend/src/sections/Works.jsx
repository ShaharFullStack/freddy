/**
 * Gallery section: Freddy's event photos as "works".
 * On desktop, hover shows a floating preview image following the cursor.
 * On mobile, inline image with overlay.
 *
 * FIX: preview container needs explicit height (aspect-[4/3]) to render image.
 *      Removed scale:0.55 on hover (was collapsing the preview).
 *      Fixed GSAP quickTo to position the preview from top-left corner (not center).
 *      Mobile: front image now covers its container properly.
 */
import { Icon } from "@iconify/react/dist/iconify.js";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { galleryItems } from "../constants";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const PREVIEW_W = 480; // px – width of floating preview card
const PREVIEW_H = 320; // px – height of floating preview card

const Works = () => {
  const overlayRefs = useRef([]);
  const previewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  const text = `רגעים בלתי נשכחים מאירועים
שהשאירו חותם אמיתי
על אנשים ועל ארגונים`;

  const mouse = useRef({ x: 0, y: 0 });
  const moveX = useRef(null);
  const moveY = useRef(null);

  useGSAP(() => {
    // Position preview card so it follows the cursor (offset by half its size so it
    // appears slightly right+below the pointer, never clipped by viewport edge).
    moveX.current = gsap.quickTo(previewRef.current, "x", {
      duration: 0.8,
      ease: "power3.out",
    });
    moveY.current = gsap.quickTo(previewRef.current, "y", {
      duration: 1,
      ease: "power3.out",
    });

    // Set initial position so the card starts at 0,0 (top-left).
    gsap.set(previewRef.current, { x: 0, y: 0 });

    gsap.from(".gallery-item", {
      y: 80,
      opacity: 0,
      delay: 0.1,
      duration: 1,
      stagger: 0.2,
      ease: "back.out",
      scrollTrigger: {
        trigger: ".gallery-item",
      },
    });
  }, []);

  const handleMouseEnter = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(index);
    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.fromTo(
      el,
      { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" },
      { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)", duration: 0.2, ease: "power2.out" }
    );
    // Fade in preview – no scaling, just opacity
    gsap.to(previewRef.current, { opacity: 1, duration: 0.3, ease: "power2.out" });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth < 768) return;
    setCurrentIndex(null);
    const el = overlayRefs.current[index];
    if (!el) return;
    gsap.killTweensOf(el);
    gsap.to(el, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(previewRef.current, { opacity: 0, duration: 0.2, ease: "power2.out" });
  };

  const handleMouseMove = (e) => {
    if (window.innerWidth < 768) return;
    // Offset so the card appears below-right of the cursor with a small gap
    const offsetX = 24;
    const offsetY = 24;
    // Clamp so the card doesn't overflow the right / bottom of the viewport
    const maxX = window.innerWidth - PREVIEW_W - 16;
    const maxY = window.innerHeight - PREVIEW_H - 16;
    mouse.current.x = Math.min(e.clientX + offsetX, maxX);
    mouse.current.y = Math.min(e.clientY + offsetY, maxY);
    moveX.current(mouse.current.x);
    moveY.current(mouse.current.y);
  };

  return (
    <section id="gallery" className="flex flex-col min-h-screen">
      <AnimatedHeaderSection
        subTitle={"מרגש, מפתיע, בלתי נשכח"}
        title={"גלריה"}
        text={text}
        textColor={"text-black"}
        withScrollTrigger={true}
      />
      <div className="relative flex flex-col font-light" onMouseMove={handleMouseMove}>
        {galleryItems.map((item, index) => (
          <div
            key={item.id}
            id="gallery-item"
            className="gallery-item relative flex flex-col gap-1 py-5 cursor-pointer group md:gap-0"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={() => handleMouseLeave(index)}
          >
            {/* Dark hover overlay (clip-path reveal) */}
            <div
              ref={(el) => { overlayRefs.current[index] = el; }}
              className="absolute inset-0 hidden md:block bg-[#241f1c] -z-10 clip-path"
            />

            {/* Title row */}
            <div className="flex justify-between px-10 text-black transition-all duration-500 md:group-hover:px-12 md:group-hover:text-[#fcf9ea]">
              <h2 className="lg:text-[32px] text-[26px] leading-none">{item.name}</h2>
              <Icon icon="lucide:arrow-up-right" className="md:size-6 size-5" />
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 bg-black/80" />

            {/* Tags */}
            <div className="flex px-10 text-xs leading-loose uppercase transition-all duration-500 md:text-sm gap-x-5 md:group-hover:px-12">
              {item.frameworks.map((fw) => (
                <p key={fw.id} className="text-black transition-colors duration-500 md:group-hover:text-[#fcf9ea]">
                  {fw.name}
                </p>
              ))}
            </div>

            {/* Mobile inline preview */}
            <div className="relative md:hidden h-[320px] mx-10 mt-3 rounded-2xl overflow-hidden">
              <img
                src={item.bgImage}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover brightness-50"
              />
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-contain p-6"
              />
            </div>
          </div>
        ))}

        {/* Desktop floating preview – fixed position, follows cursor via GSAP */}
        {/* Uses fixed top-0 left-0 as origin; GSAP sets x/y transforms */}
        <div
          ref={previewRef}
          className="fixed top-0 left-0 z-50 pointer-events-none hidden md:block opacity-0 overflow-hidden rounded-2xl border-4 border-[#241f1c] shadow-2xl"
          style={{ width: PREVIEW_W, height: PREVIEW_H }}
        >
          {currentIndex !== null && (
            <img
              src={galleryItems[currentIndex].image}
              alt="preview"
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Works;
