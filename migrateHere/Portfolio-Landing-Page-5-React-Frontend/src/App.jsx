/**
 * Root App component. Wraps the entire site in Lenis for smooth scrolling.
 * Migrated content: Freddy Barak / חיים שכאלה – event production landing page.
 */
import React from "react";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import ServiceSummary from "./sections/ServiceSummary";
import Services from "./sections/Services";
import ReactLenis from "lenis/react";
import About from "./sections/About";
import Works from "./sections/Works";
import ContactSummary from "./sections/ContactSummary";
import Contact from "./sections/Contact";
import PopupForm from "./components/PopupForm";

const App = () => {
  return (
    <ReactLenis root className="relative w-screen min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <ServiceSummary />
      <Services />
      <About />
      <Works />
      <ContactSummary />
      <Contact />
      <PopupForm />
    </ReactLenis>
  );
};

export default App;
