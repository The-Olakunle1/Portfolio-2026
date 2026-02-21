"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "motion/react";

const tabs = [
    { key: "case-study", label: "Case studies", href: "/" },
    { key: "visuals", label: "Visuals", href: "/visuals" },
];

const PageToggle = () => {
    const pathname = usePathname();
    const activeTab = pathname === "/visuals" ? "visuals" : "case-study";

    return (
        <motion.div
            className="page-toggle"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            {tabs.map((tab) => (
                <Link
                    key={tab.key}
                    href={tab.href}
                    className={`toggle-tab${activeTab === tab.key ? " active" : ""}`}
                >
                    {activeTab === tab.key && (
                        <motion.span
                            className="toggle-tab-bg"
                            layoutId="activeTab"
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                    )}
                    <span className="toggle-tab-label">{tab.label}</span>
                </Link>
            ))}
        </motion.div>
    );
};

export default PageToggle;
