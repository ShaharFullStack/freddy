/**
 * Service summary: large scrolling Hebrew titles for Freddy's process steps.
 * Each title moves at different xPercent on scroll (scrub = tied to scroll position).
 * Section appears between Hero and Events cards.
 * overflow-hidden prevents horizontal scroll from GSAP transforms.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

const ServiceSummary = () => {
  useGSAP(() => {
    gsap.to("#title-service-1", {
      xPercent: 20,
      scrollTrigger: { target: "#title-service-1", scrub: true },
    });
    gsap.to("#title-service-2", {
      xPercent: -30,
      scrollTrigger: { target: "#title-service-2", scrub: true },
    });
    gsap.to("#title-service-3", {
      xPercent: 80,
      scrollTrigger: { target: "#title-service-3", scrub: true },
    });
    gsap.to("#title-service-4", {
      xPercent: -80,
      scrollTrigger: { target: "#title-service-4", scrub: true },
    });
  });

  return (
    <section
      id="process"
      className="mt-20 overflow-hidden font-light leading-snug text-center mb-42 contact-text-responsive"
    >
      <div id="title-service-1">
        <p>תחקיר</p>
      </div>
      <div
        id="title-service-2"
        className="flex items-center justify-center gap-3"
      >
        <p className="font-normal">ראיונות</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p>כתיבה</p>
      </div>
      <div
        id="title-service-3"
        className="flex items-center justify-center gap-3"
      >
        <p>הפקה</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
        <p className="italic">הנחיה</p>
        <div className="w-10 h-1 md:w-32 bg-gold" />
      </div>
      <div id="title-service-4">
        <p>שירה בציבור</p>
      </div>
    </section>
  );
};

export default ServiceSummary;
