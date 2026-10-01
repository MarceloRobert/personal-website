import { IconType } from "@/types/IconType";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function IconWithLink({
    label,
    href,
    iconSrc,
    iconAlt,
    iconWidth = 32,
    iconHeight = 32,
    iconClassName,
}: IconType) {
    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            title={label}
        >
            <Image
                className={twMerge("block size-8 dark:invert", iconClassName)}
                src={`${BASE_PATH}${iconSrc}`}
                alt={iconAlt}
                width={iconWidth}
                height={iconHeight}
            />
        </Link>
    );
}
