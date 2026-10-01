"use client";

import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { GlassContainer } from "./GlassContainer";
import { IconWithLink } from "./IconWithLink";
import { ICONS } from "@/constants/icons";

export function SocialLinksPill() {
    const [isVisible, setIsVisible] = useState(false);
    
    useEffect(() => {
        const linksNav = document.getElementById("links");
        
        if (!linksNav) {
            return;
        }
        
        const updateVisibility = () => {
            setIsVisible(linksNav.getBoundingClientRect().bottom <= 0);
        };
        
        updateVisibility();
        window.addEventListener("scroll", updateVisibility, { passive: true });
        
        return () => window.removeEventListener("scroll", updateVisibility);
    }, []);
    
    return (
        <aside id="sideLinks" className="hidden md:block" aria-label="Professional profiles">
            <GlassContainer
            className={twMerge(
                "fixed z-10 top-1/3 right-10 translate-x-28 invisible opacity-0 duration-500 transition-all motion-reduce:transition-none flex flex-col gap-4 px-4 py-6",
                isVisible && "translate-x-0 visible opacity-100",
            )}
            >
            {IconWithLink(ICONS.GITHUB)}
            {IconWithLink(ICONS.LINKEDIN)}
            </GlassContainer>
        </aside>
    );
}
