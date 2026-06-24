/**
 * Reusable section header: subtitle, large title (split by spaces into lines), and body text.
 * Optional scroll-triggered timeline (withScrollTrigger) so animation starts when section enters view.
 */
import React from "react";
import { useRef } from "react";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
const AnimatedHeaderSection = ({
  subTitle,
  title,
  text,
  textColor,
  withScrollTrigger = false,
}) => {
  const contextRef = useRef(null);
  const headerRef = useRef(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: withScrollTrigger
        ? {
            trigger: contextRef.current,
          }
        : undefined,
    });
    tl.from(contextRef.current, {
      y: "50vh",
      duration: 1,
      ease: "circ.out",
    });
    tl.from(
      headerRef.current,
      {
        opacity: 0,
        y: "200",
        duration: 1,
        ease: "circ.out",
      },
      "<+0.2" // Start 0.2s after previous tween
    );
  }, []);
  return (
    <div ref={contextRef}>
      {/* clipPath keeps overflow hidden for the sliding-up animation */}
      <div style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}>
        <div
          ref={headerRef}
          className="flex flex-col justify-center gap-6 pt-10 sm:gap-10 sm:pt-14 lg:gap-8 lg:pt-10"
        >
          <p
            className={`text-sm font-light tracking-[0.5rem] uppercase px-6 sm:px-10 ${textColor}`}
          >
            {subTitle}
          </p>
          <div className="px-6 sm:px-10">
            <h1
              className={`uppercase banner-text-responsive w-full ${textColor}`}
            >
              {title}
            </h1>
          </div>
        </div>
      </div>
      <div className={`relative px-6 sm:px-10 ${textColor}`}>
        <div className="absolute inset-x-0 border-t-2" />
        <div className="py-6 sm:py-10 lg:py-8 text-right">
          <AnimatedTextLines
            text={text}
            className={`font-light uppercase value-text-responsive ${textColor}`}
          />
        </div>
      </div>
    </div>
  );
};

export default AnimatedHeaderSection;
