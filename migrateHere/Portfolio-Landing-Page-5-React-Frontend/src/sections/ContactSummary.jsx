/**
 * Trust / "למה פרדי" section: two marquee strips with a centered trust statement.
 * ScrollTrigger pins this section while scrolling through (pin: true).
 */
import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactSummary = () => {
  const containerRef = useRef(null);

  const trustItems = [
    "ניסיון",
    "מקצועיות",
    "אמינות",
    "חום",
    "מצוינות",
  ];

  const ctaItems = [
    "לשיחת ייעוץ",
    "לשיחת ייעוץ",
    "לשיחת ייעוץ",
    "לשיחת ייעוץ",
    "לשיחת ייעוץ",
  ];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
  }, []);

  return (
    <section
      id="trust"
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >
      <Marquee items={trustItems} />

      <div className="overflow-hidden font-light text-center contact-text-responsive px-8">
        <p>
          ניסיון של מעל{" "}
          <span className="font-normal">20 שנה</span>,{" "}
          <br />
          ויד בטוחה{" "}
          <span className="italic">ברגעים</span>
          <br />
          הכי <span className="text-gold">רגישים</span>
        </p>
      </div>

      <Marquee
        items={ctaItems}
        reverse={true}
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;
