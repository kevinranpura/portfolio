import { useEffect, useRef, useState } from "react";

/**
 * MiniTerminal
 * A small interactive terminal for the About Me section. Visitors can type
 * commands like `skills`, `projects`, or `contact` and get real output.
 *
 * Drop-in usage:
 *   <div className="relative w-[430px] h-[430px] rounded-3xl overflow-hidden
 *        border border-[#00e676]/20 bg-[#050806] shadow-[0_0_80px_rgba(0,230,118,.15)]">
 *     <MiniTerminal />
 *   </div>
 *
 * 🔧 Edit PROJECTS / SKILLS / CONTACT below to match your real info.
 */

const PROMPT_USER = "guest@kevin-portfolio";

const SKILLS = {
    Languages: ["Python", "Java", "JavaScript", "SQL", "TypeScript"],
    Frameworks: ["React", "Next.js", "Tailwind CSS"],
    Backend: ["Node.js", "Express", "FastAPI", "PostgreSQL", "MongoDB"],
    "AI / GenAI": ["LangChain", "LangGraph", "RAG", "Agentic AI"],
    Tools: ["Git", "Github", "Vercel", "Postman"],
};

const PROJECTS = [
    {
        name: "Project One",
        desc: "Short one-line description of what it does.",
        stack: "React · Node.js · PostgreSQL",
        link: "github.com/kevinranpura/project-one",
    },
    {
        name: "Project Two",
        desc: "Short one-line description of what it does.",
        stack: "Next.js · LangChain · OpenAI API",
        link: "github.com/kevinranpura/project-two",
    },
    {
        name: "Project Three",
        desc: "Short one-line description of what it does.",
        stack: "Python · FastAPI · Docker",
        link: "github.com/kevinranpura/project-three",
    },
];

const CONTACT = {
    email: "kevinranpura27@gmail.com",
    github: "github.com/kevinranpura",
    linkedin: "linkedin.com/in/kevinranpura27",
};

const COMMANDS = ["help", "whoami", "about", "skills", "projects", "contact", "clear"];

const BOOT_LINES = [
    { text: "booting kevin@portfolio v1.0.0...", v: "muted" },
    { text: "connection established.", v: "muted" },
    { text: "Kevin Ranpura — Full-stack / AI Engineer", v: "heading" },
    { text: "Type 'help' to see available commands.", v: "default" },
];

function runCommand(raw) {
    const cmd = raw.trim().toLowerCase();

    if (cmd === "" ) return [];

    if (cmd === "help" || cmd === "ls") {
        return [
            { text: "Available commands:", v: "heading" },
            { text: "  whoami", v: "default" },
            { text: "  about", v: "default" },
            { text: "  skills", v: "default" },
            { text: "  projects", v: "default" },
            { text: "  contact", v: "default" },
            { text: "  clear", v: "default" },
        ];
    }

    if (cmd === "whoami") {
        return [{ text: "Kevin Ranpura. Full Stack Developer. AI Engineer. Building AI-powered products with modern web technologies.", v: "accent" }];
    }

    if (cmd === "about") {
        return [
            {
                text: "I enjoy turning ideas into products that people actually use. My work spans full-stack development, RAG pipelines, LLM-powered applications, and Agentic AI—with a focus on building software that's practical, scalable, and reliable.",
                v: "default",
            }
        ];
    }

    if (cmd === "skills") {
        const lines = [{ text: "Skills:", v: "heading" }];
        Object.entries(SKILLS).forEach(([category, items]) => {
            lines.push({
                text: `  ${category.padEnd(13, " ")} ${items.join(", ")}`,
                v: "default",
            });
        });
        return lines;
    }

    if (cmd === "projects") {
        const lines = [{ text: "Featured projects:", v: "heading" }];
        PROJECTS.forEach((p, i) => {
            lines.push({ text: `  ${i + 1}. ${p.name}`, v: "accent" });
            lines.push({ text: `     ${p.desc}`, v: "default" });
            lines.push({ text: `     ${p.stack}`, v: "muted" });
            lines.push({ text: `     ${p.link}`, v: "muted" });
        });
        return lines;
    }

    if (cmd === "contact") {
        return [
            { text: "Contact:", v: "heading" },
            { text: `  email     ${CONTACT.email}`, v: "default" },
            { text: `  github    ${CONTACT.github}`, v: "default" },
            { text: `  linkedin  ${CONTACT.linkedin}`, v: "default" },
        ];
    }

    // if (cmd === "sudo hire-me") {
    //     return [{ text: "permission granted. let's talk →", v: "accent" }];
    // }

    return [
        { text: `command not found: ${raw}`, v: "muted" },
        { text: "type 'help' to see available commands.", v: "muted" },
    ];
}

function variantClass(v) {
    switch (v) {
        case "heading":
            return "text-[#d6f5e3] font-semibold";
        case "accent":
            return "text-[#d6f5e3]";``
        case "muted":
            return "text-[#5c7a68]";
        default:
            return "text-[#d6f5e3]";
    }
}

function MiniTerminal() {
    const [lines, setLines] = useState([]);
    const [value, setValue] = useState("");
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(null);
    const [booted, setBooted] = useState(false);

    const inputRef = useRef(null);
    const scrollRef = useRef(null);

    // boot sequence
    useEffect(() => {
        let i = 0;
        const id = setInterval(() => {
            setLines((prev) => [...prev, { type: "output", ...BOOT_LINES[i] }]);
            i++;
            if (i >= BOOT_LINES.length) {
                clearInterval(id);
                setBooted(true);
            }
        }, 320);
        return () => clearInterval(id);
    }, []);

    // autoscroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [lines]);

    function focusInput() {
        inputRef.current?.focus();
    }

    function submit() {
        const cmd = value;
        setLines((prev) => [...prev, { type: "input", text: cmd }]);
        if (cmd.trim().toLowerCase() === "clear") {
            setLines([]);
        } else {
            const output = runCommand(cmd).map((l) => ({ type: "output", ...l }));
            setLines((prev) => [...prev, ...output]);
        }
        if (cmd.trim() !== "") setHistory((prev) => [...prev, cmd]);
        setHistoryIndex(null);
        setValue("");
    }

    function handleKeyDown(e) {
        if (e.key === "Enter") {
            submit();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (history.length === 0) return;
            const nextIndex =
                historyIndex === null
                    ? history.length - 1
                    : Math.max(0, historyIndex - 1);
            setHistoryIndex(nextIndex);
            setValue(history[nextIndex]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex === null) return;
            const nextIndex = historyIndex + 1;
            if (nextIndex >= history.length) {
                setHistoryIndex(null);
                setValue("");
            } else {
                setHistoryIndex(nextIndex);
                setValue(history[nextIndex]);
            }
        } else if (e.key === "Tab") {
            e.preventDefault();
            const match = COMMANDS.find((c) => c.startsWith(value.toLowerCase()));
            if (match) setValue(match);
        }
    }

    return (
        <div
            // className="relative w-full h-full flex flex-col bg-transparent font-mono text-[13px] cursor-text"
            className="relative w-full h-full flex flex-col bg-[#050806]/60 font-mono text-[13px] cursor-text"
            onClick={focusInput}
        >
            <style>{`
        .mt-scroll::-webkit-scrollbar { width: 6px; }
        .mt-scroll::-webkit-scrollbar-thumb { background: rgba(0,230,118,.25); border-radius: 4px; }
        .mt-scroll::-webkit-scrollbar-track { background: transparent; }
        @keyframes mtBlink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
        .mt-cursor { animation: mtBlink 1s step-start infinite; }
      `}</style>

            {/* title bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#00e676]/15 shrink-0">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]/70" />
                <span className="ml-2 text-[11px] tracking-wide text-[#5c7a68]">
                    {PROMPT_USER}: ~
                </span>
            </div>

            {/* output */}
            <div
                ref={scrollRef}
                className="mt-scroll flex-1 overflow-y-auto px-4 py-3 space-y-1"
            >
                {lines.map((line, i) =>
                    line.type === "input" ? (
                        <div key={i} className="flex gap-2 text-[#d6f5e3]">
                            <span className="text-[#00e676] shrink-0">
                                {PROMPT_USER}$
                            </span>
                            <span className="break-all">{line.text}</span>
                        </div>
                    ) : (
                        <div key={i} className={`whitespace-pre-wrap ${variantClass(line.v)}`}>
                            {line.text}
                        </div>
                    )
                )}

                {/* active input line */}
                {booted && (
                    <div className="flex gap-2 text-[#d6f5e3]">
                        <span className="text-[#00e676] shrink-0">{PROMPT_USER}$</span>
                        <span className="relative flex-1 break-all">
                            {value}
                            <span className="mt-cursor inline-block w-[7px] h-[14px] bg-[#c1dbcf] align-middle ml-[1px]" />
                        </span>
                    </div>
                )}
            </div>

            {/* hidden real input to capture keystrokes */}
            <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                className="absolute opacity-0 pointer-events-none w-px h-px"
                aria-label="terminal input"
            />
        </div>
    );
}

export default MiniTerminal;