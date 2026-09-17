'use client';

import "./portfolio.css";
import { useEffect, useMemo, useState } from "react";
import { GlassContainer } from "@/components/GlassContainer";
import { IconLink } from "@/components/IconLink";
import Image from "next/image";
import Link from "next/link";

// the css is specific to this page, so we can make a specific css file for it.
// It could be imported as a module (as in portfolio.module.css), which helps with scoping,
// but then we would have to use it as `import styles from "./portfolio.module.css"`,
// and use it like `styles.gridCell` instead of just `gridCell`, which is less convenient.
// But exactly because this is a specific css file, there's not much worry about scoping.
// So the easier use wins.

const SQUARE_WIDTH = 35;
const LTD_RANDOM_NUMS_LEN = 1000;
const UINT16_LIMIT = 65536;
const ANIMATION_OFFSET = 300; // in seconds, should be more than the animation duration in the css
const SHOW_DEV_TAG = process.env.NEXT_PUBLIC_SHOW_DEV_TAG === "true";

export default function Portfolio() {
    const [state, setState] = useState(0);
    const [gridCount, setGridCount] = useState({ columns: 0, rows: 0 });
    const [gridEnabled, setGridEnabled] = useState(true);
    // Array of random values that will be generated once and never changed again so to maintain purity
    const [limitedRandomNums] = useState(() =>
        Uint16Array.from({ length: LTD_RANDOM_NUMS_LEN }, () => Math.floor(Math.random() * UINT16_LIMIT))
    );

    useEffect(() => {
        const updateGridSize = () => {
            setGridCount({
                columns: Math.ceil(window.innerWidth / SQUARE_WIDTH),
                rows: Math.ceil(window.innerHeight / SQUARE_WIDTH),
            });
        };

        updateGridSize();
        window.addEventListener("resize", updateGridSize);

        return () => window.removeEventListener("resize", updateGridSize);
        // returning a function definition means that the useEffect will run it as a CLEANUP function
        // the cleanup happens whenever the useEffect is re-run, or when the component is unmounted
        // Since this useEffect has no dependencies, it will only run once on mount,
        // and the cleanup will run on unmount
    }, []);

    const gridSquares = useMemo(() => {
        const squares = Array.from({ length: gridCount.columns * gridCount.rows });
        return squares.map((_, index) => (
            <div
                key={index}
                className="gridCell aspect-square"
                style={{
                    animationDelay: `${-(limitedRandomNums[index % LTD_RANDOM_NUMS_LEN] / UINT16_LIMIT) * ANIMATION_OFFSET}s`,
                }}
            />
        ))
    }, [gridCount, limitedRandomNums]);


    console.debug("Rendering");

    return (
        <>
            {gridEnabled && <section id="background" className="fixed h-screen w-screen">
                <div id="gridContainer" className="grid overflow-hidden gap-px" style={{
                    gridTemplateColumns: `repeat(${gridCount.columns}, minmax(0, 1fr))`,
                }}>
                    {gridSquares}
                </div>
            </section>}
            <main className="min-h-screen flex flex-col px-16 bg-base-gray/90 z-10 font-mono text-center sm:max-w-9/10 lg:max-w-5/10 md:max-w-7/10 self-center pt-16 pb-16" style={{ boxShadow: "20px 0px 20px color-mix(in oklab, var(--color-base-gray) 90%, transparent), -20px 0px 20px color-mix(in oklab, var(--color-base-gray) 90%, transparent)" }}>

                <button
                    id="toggleGridButton"
                    className="fixed top-4 right-4 dark:bg-white dark:text-black bg-black text-white text-lg transition-all py-2 px-4 rounded-full"
                    onClick={() => setGridEnabled((prev) => !prev)}
                >
                    Toggle grid
                </button>

                <GlassContainer>
                    <h1 className="text-5xl">Marcelo Robert Santos</h1>
                </GlassContainer>
                <div id="links" className="flex justify-center gap-8 pt-4 pb-8">
                    <IconLink
                        text="GitHub"
                        href="https://github.com/MarceloRobert"
                        iconSrc="/icons/GitHub_Invertocat_Black.svg"
                        iconAlt="GitHub logo"
                    />
                    <IconLink
                        text="LinkedIn"
                        href="https://www.linkedin.com/in/marcelorobert/"
                        iconSrc="/icons/InBug-Black.png"
                        iconAlt="LinkedIn logo"
                    />
                </div>

                {SHOW_DEV_TAG && <div>
                    <span>{state} </span>
                    <button
                        onClick={() => setState((prev) => prev + 1)}
                    >
                        Change state
                    </button>
                </div>}

                <div id="summary" className="text-lg self-center">
                    <p>Hi! I&apos;m a Full-Stack developer with experience in frontend, backend, and database. Check out the projects I have worked on!</p>
                </div>

                {SHOW_DEV_TAG && <div className="size-21 lg:bg-red-500 md:bg-amber-500 sm:bg-yellow-300 bg-green-200"></div>}

                <section id="experience">
                    {PortfolioH2("Experience")}
                    {PortfolioH3("ProFusion Mobi / KernelCI Dashboard")}
                    <div className="portfolioParagraph">

                        <Image className="bg-white rounded-2xl mx-auto my-4 p-4 w-62.5" src={"/images/portfolio/kernelci-logo-color.svg"} width={250} height={125} alt="KernelCI Logo" />

                        <p>Within <Link href={"https://profusion.mobi/"} target="_blank" rel="noopener noreferrer">ProFusion mobi</Link>, I was able to work in the KernelCI Dashboard project. KernelCI is an opensource project helping Linux Kernel developers to build and test their code, and they need a dashboard to visualize all the results.</p>
                        <p>I worked on the frontend, backend and database, as well as CI/CD, unit and integration tests, email notifications, performance monitoring, and more. I was the development team leader for a while too.</p>
                        <p>I contributed to:</p>
                        <ul className="indent-0 ml-12">
                            <li>· Creating new pages and <a href="https://github.com/kernelci/dashboard/pulls?q=is%3Apr+state%3Aclosed+author%3AMarceloRobert+Feat+-label%3ABackend%2Cbug%2CCI%2FCD%2Cdependencies%2CIngester" target="_blank">multiple features</a> with React;</li>
                            <li>· Database optimizations with Django and PostgreSQL, improving the performance by <a href="https://github.com/kernelci/dashboard/pull/1562" target="_blank">more than 10x</a>;</li>
                            <li>· <a href="https://github.com/kernelci/dashboard/pull/1777" target="_blank">CI/CD and test integrations</a> and with GitHub Actions, increasing the <a href="https://github.com/kernelci/dashboard/tree/main/backend#backend-" target="_blank">backend coverage</a> to 70%;</li>
                            <li>· Feature discussions with Scrum and Kanban in two-week sprints.</li>
                        </ul>
                        <p className="technologiesUsed">Technologies used: React, TypeScript, Django, Python, PostgreSQL, Docker, Git, GitHub Actions, CI/CD, Scrum, Kanban, Cron jobs, Prometheus, Jinja.</p>
                        {ProjectLink({ text: "You can find KernelCI Dashboard's repository at", href: "https://github.com/kernelci/dashboard" })}
                    </div>
                </section>
                <section id="projects">
                    {PortfolioH2("Projects")}
                    <div>
                        {PortfolioH3("This very website")}
                        <div className="portfolioParagraph">
                            <p>I&apos;ve made everything in this website myself, from design to implementation and deployment. This is a personal portfolio website built with Next.js. It showcases my projects, experience, and skills as a developer.</p>
                            <p>Some cool features include: </p>
                            <ul>
                                <li>· Dynamic background with gradient effects;</li>
                                <li>· Responsive design;</li>
                                <li>· Semantic HTML.</li>
                            </ul>
                            <p className="technologiesUsed">Technologies used: Next.js, TypeScript, Tailwind CSS</p>
                            {ProjectLink({ text: "You can find this website's repository at", href: "https://github.com/MarceloRobert/landing-pages" })}
                        </div>
                    </div>
                    <hr className="w-1/2 mx-auto my-8" />
                    <div>
                        {PortfolioH3("Hidroponic Garden Monitoring System")}
                        <div className="portfolioParagraph">
                            <p>In university, I learned about distributed systems and one of the topics was multiple microcontrollers installed in an hidroponic garden for environment control. I made the frontend in Dart, connecting to a backend in Java, that received data from a microcontroller in C++.</p>
                            <p>The frontend was made with Flutter and we used an ActiveMQ AWS broker as the medium between all components.</p>
                            <p className="technologiesUsed">Technologies used: Flutter, Dart, ActiveMQ, AWS</p>
                            {ProjectLink({ text: "You can find the frontend's repository at", href: "https://github.com/MarceloRobert/hidroponic_app"})}
                        </div>
                    </div>
                    <hr className="w-1/2 mx-auto my-8" />
                    <div>
                        {PortfolioH3("Website to create and share portfolios")}
                        <div className="portfolioParagraph">
                            <p>With a colleague, I made the frontend of a web platform having CRUD (Create, Read, Update, Delete) functionality of projects and users. This would allow users to create and share their own portfolios.</p>
                            <p>The frontend was made with Next.js and it connected to a Java backend.</p>
                            <p className="technologiesUsed">Technologies used: Next.js, TypeScript, Tailwind CSS, REST APIs</p>
                            {ProjectLink({ text: "You can find the repository at", href: "https://github.com/MarceloRobert/web-portfolio" })}
                        </div>
                    </div>
                </section>
                <section id="education">
                    {PortfolioH2("Education")}
                    {PortfolioH3("Bachelor's Degree in Computer Science")}
                    <p>By Federal University of Itajubá - UNIFEI.</p>
                    <p>From 2020 to 2025, in Itajubá, Minas Gerais, Brazil.</p>
                    <p className="mt-4">Some highlighted subjects: Software Engineering, Object Oriented Programming, Algorithm Analysis and Design, Web Development, and Distributed Systems.</p>
                </section>
            </main >
        </>
    )
}

const PortfolioH2 = (title: string) => {
    return <h2 className="text-left text-4xl font-semibold underline mt-10">## {title}</h2>
}

const PortfolioH3 = (title: string) => {
    return <h3 className="text-2xl my-4 font-bold">{title}</h3>
}

const ProjectLink = ({ text, href }: { text: string, href: string }) => {
    return <div className="text-center indent-0 mt-4">
        <p>{text}</p>
        <Link href={href} target="_blank" rel="noopener noreferrer">
            {href}
        </Link>
    </div>
    
}
