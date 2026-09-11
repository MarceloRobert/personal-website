import { twMerge } from "tailwind-merge";

// There's not really a way to make real liquid glass with CSS since it requires distortions.
// However, it would be possible to make it with webGL and js libraries.
export const GlassContainer = ({
   children,
   className,
}: {
   children: React.ReactNode;
   className?: string;
}) => {
   return <div
      className={twMerge("backdrop-contrast-75 w-fit self-center hover:backdrop-contrast-50 transition-all backdrop-blur-md py-4 px-6 rounded-[50px] lg:rounded-full", className)}
      style={{
         boxShadow: "0px 0px 2px var(--color-base-gray) inset, 2px 1px 2px white inset, -2px 0px 2px white inset",
      }}
   >
      {children}
   </div>;
}
