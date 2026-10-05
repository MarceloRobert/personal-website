import { IconType } from "@/types/IconType";
import Image from "next/image";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function LinkWithIcon({
  label,
  href,
  iconSrc,
  iconAlt,
  iconWidth = 32,
  iconHeight = 32,
  iconClassName,
}: IconType): React.ReactNode {
  return (
    <div className="flex items-center justify-center gap-2">
      <Image
        className={twMerge("dark:invert size-8", iconClassName)}
        src={`${basePath}${iconSrc}`}
        alt={iconAlt}
        width={iconWidth}
        height={iconHeight}
        aria-label={label}
        title={label}
        priority
      />
      <Link
        href={href}
        target="_blank"
        className="text-lg"
        rel="noopener noreferrer"
      >
        {label}
      </Link>
    </div>
  );
}
