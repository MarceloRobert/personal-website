"use client";

import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";
import { GlassContainer } from "./GlassContainer";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

// TODO: keep this const in a single place to keep it in sync with main nav links
const socialLinks = [
    {
        href: "https://github.com/MarceloRobert",
        iconSrc: "/icons/GitHub_Invertocat_Black.svg",
        iconAlt: "GitHub logo",
        label: "GitHub",
    },
    {
        href: "https://www.linkedin.com/in/marcelorobert/?locale=en-US",
        iconSrc: "/icons/InBug-Black.png",
        iconAlt: "LinkedIn logo",
        label: "LinkedIn",
    },
];

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
            {/* TODO: replace with IconLink or LinkIcon */}
            {socialLinks.map(({ href, iconSrc, iconAlt, label }) => (
                <Link
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                >
                <Image
                className="block size-8 dark:invert"
                src={`${BASE_PATH}${iconSrc}`}
                alt={iconAlt}
                width={32}
                height={32}
                />
                </Link>
            ))}
            </GlassContainer>
        </aside>
    );
}
