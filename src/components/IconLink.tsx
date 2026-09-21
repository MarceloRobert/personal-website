import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export const IconLink = ({
    text,
    href,
    iconSrc,
    iconAlt,
    iconWidth = 32,
    iconHeight = 32,
    iconClassName,
}: {
    text: string;
    href: string;
    iconSrc: string;
    iconAlt: string;
    iconWidth?: number;
    iconHeight?: number;
    iconClassName?: string;
}) => {
    return <div className="flex items-center justify-center gap-2">
        <Image
            className={twMerge("dark:invert size-8", iconClassName)}
            src={iconSrc}
            alt={iconAlt}
            width={iconWidth}
            height={iconHeight}
            priority />
        <Link href={href} target="_blank" className="text-lg" rel="noopener noreferrer">
            {text}
        </Link>
    </div>;
}
