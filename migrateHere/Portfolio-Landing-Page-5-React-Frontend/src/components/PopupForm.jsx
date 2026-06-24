import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LeadForm from "./LeadForm";

const PopupForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const overlayRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    // Check if the user already closed or submitted the popup in this session
    const hasSeenPopup = sessionStorage.getItem("freddy_has_seen_popup");
    if (hasSeenPopup) return;

    const handleScroll = () => {
      // Show popup when the user scrolls down past the hero section (e.g. 50% of viewport height)
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useGSAP(() => {
    if (isVisible) {
      gsap.from(overlayRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
      gsap.from(modalRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 0.4,
        ease: "back.out(1.5)",
      });
    }
  }, [isVisible]);

  const closePopup = () => {
    // Fade out animation before actually unmounting
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.2,
      ease: "power2.in",
    });
    gsap.to(modalRef.current, {
      y: 20,
      opacity: 0,
      scale: 0.95,
      duration: 0.2,
      ease: "power2.in",
      onComplete: () => {
        setIsVisible(false);
        sessionStorage.setItem("freddy_has_seen_popup", "true");
      }
    });
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        // Close if clicking outside the modal
        if (e.target === overlayRef.current) {
          closePopup();
        }
      }}
    >
      <div ref={modalRef} className="relative w-full max-w-md">
        <button
          onClick={closePopup}
          className="absolute top-4 left-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-[#241f1c] transition-colors"
          aria-label="סגור"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <LeadForm
          title="שניה לפני שממשיכים..."
          subtitle="השאירו פרטים ונחזור אליכם." 
          className="shadow-2xl !pt-12"
        />
      </div>
    </div>
  );
};

export default PopupForm;
