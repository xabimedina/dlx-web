"use client";

import { useState, useEffect, useRef, useCallback } from "react";

import { Button, cn } from "dlx-components";
import { NavLinks } from "./nav-links";
import { MenuButton } from "./menu-button";
import { NavLogo } from "./nav-logo";
import { NavMobile } from "./nav-mobile";

const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (this: any, ...args: any[]) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  
  const lastScrollY = useRef(0);

  // Memoize the scroll handler
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;

    // Determine if scrolled past threshold
    setIsScrolled(currentScrollY > 10);
    
    // Handle navbar visibility
    if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    lastScrollY.current = currentScrollY;
  }, []);
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { 
      passive: true 
    });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled
            ? "bg-jet/50 backdrop-blur-md shadow-md border-b border-jet/50"
            : "bg-transparent",
          isVisible ? "transform-none" : "-translate-y-full"
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16 z-50">
            <NavLogo />
            
            <div className="max-md:hidden">
              <NavLinks />
            </div>

            <div className="max-md:hidden">
              <Button variant="accent">Calcula tu presupuesto</Button>
            </div>

            <MenuButton
              toggleMenu={toggleMenu}
              isMenuOpen={isMenuOpen}
            />
          </div>
        </div>
      </nav>
      <NavMobile isMenuOpen={isMenuOpen} closeMenu={closeMenu} />
    </>
  );
}
