/**
 * Full-screen overlay navigation – Freddy Barak / חיים שכאלה.
 * Slide-in panel with Hebrew section links (react-scroll) and contact info.
 * Burger icon toggles open/close with GSAP timelines; hides on scroll-down.
 */
import React, { useEffect, useRef, useState } from "react";
import { contactInfo, logoImg } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Link } from "react-scroll";

const navSections = [
  { label: "מה זה", to: "about" },
  { label: "סוגי אירועים", to: "events" },
  { label: "איך זה עובד", to: "process" },
  { label: "למה פרדי", to: "trust" },
  { label: "גלריה", to: "gallery" },
  { label: "צור קשר", to: "contact" },
]

const Navbar = () => {
  const navRef = useRef(null);
  const linksRef = useRef([]);
  const contactRef = useRef(null);
  const topLineRef = useRef(null);
  const bottomLineRef = useRef(null);
  const tl = useRef(null);
  const iconTl = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showBurger, setShowBurger] = useState(true);

  // GSAP: panel off-screen (xPercent -100 for RTL, right side); reveal on open
  useGSAP(() => {
    gsap.set(navRef.current, { xPercent: -100 });
    gsap.set([linksRef.current, contactRef.current], {
      autoAlpha: 0,
      x: 20,
    });

    tl.current = gsap
      .timeline({ paused: true })
      .to(navRef.current, {
        xPercent: 0,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        linksRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<"
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2"
      );

    iconTl.current = gsap
      .timeline({ paused: true })
      .to(topLineRef.current, {
        rotate: 45,
        y: 3.3,
        duration: 0.3,
        ease: "power2.inOut",
      })
      .to(
        bottomLineRef.current,
        {
          rotate: -45,
          y: -3.3,
          duration: 0.3,
          ease: "power2.inOut",
        },
        "<"
      );
  }, []);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowBurger(currentScrollY <= lastScrollY || currentScrollY < 10);
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      tl.current.reverse();
      iconTl.current.reverse();
    } else {
      tl.current.play();
      iconTl.current.play();
    }
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    tl.current.reverse();
    iconTl.current.reverse();
    setIsOpen(false);
  };

  return (
    <>
      {/* Full-screen overlay nav panel – slides in from left in RTL layout */}
      <nav
        ref={navRef}
        className="fixed z-50 flex flex-col justify-between w-full h-full px-10 bg-[#241f1c] text-[#fcf9ea]/80 py-28 gap-y-10 md:w-1/2 md:right-1/2"
      >
        <div className="flex flex-col text-4xl gap-y-3 md:text-5xl lg:text-7xl font-light">
          {navSections.map((section, index) => (
            <div key={index} ref={(el) => (linksRef.current[index] = el)}>
              <Link
                className="transition-all duration-300 cursor-pointer hover:text-[#fcf9ea]"
                to={section.to}
                smooth
                offset={0}
                duration={1500}
                onClick={closeMenu}
              >
                {section.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Contact info block */}
        <div
          ref={contactRef}
          className="flex flex-col flex-wrap justify-between gap-8 md:flex-row"
        >
          <div className="font-light">
            <p className="tracking-wider text-[#fcf9ea]/50 text-sm mb-1">טלפון / וואטסאפ</p>
            <a
              href={contactInfo.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl tracking-widest hover:text-[#ffa4a4] transition-colors duration-300"
            >
              {contactInfo.phone}
            </a>
          </div>
          <div className="font-light">
            <p className="tracking-wider text-[#fcf9ea]/50 text-sm mb-1">אתר</p>
            <a
              href={contactInfo.websiteHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl tracking-widest hover:text-[#ffa4a4] transition-colors duration-300"
            >
              {contactInfo.website}
            </a>
          </div>
        </div>
      </nav>

      {/* Burger button – top-left in RTL; hides on scroll-down */}
      <div
        className="fixed z-50 flex flex-col items-center justify-center gap-1 transition-all duration-300 bg-[#241f1c] rounded-full cursor-pointer w-14 h-14 md:w-20 md:h-20 top-4 left-10"
        onClick={toggleMenu}
        style={
          showBurger
            ? { clipPath: "circle(50% at 50% 50%)" }
            : { clipPath: "circle(0% at 50% 50%)" }
        }
      >
        <span
          ref={topLineRef}
          className="block w-8 h-0.5 bg-[#fcf9ea] rounded-full origin-center"
        ></span>
        <span
          ref={bottomLineRef}
          className="block w-8 h-0.5 bg-[#fcf9ea] rounded-full origin-center"
        ></span>
      </div>
    </>
  );
};

export default Navbar;
