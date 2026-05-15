import PageToggle from "@/components/PageToggle";
import AppsGrid from "@/components/AppsGrid";

export default function AppsPage() {
    return (
        <main>
            <div
                style={{
                    position: "fixed",
                    top: 20,
                    left: 0,
                    right: 0,
                    zIndex: 100,
                    display: "flex",
                    justifyContent: "center",
                    pointerEvents: "none",
                }}
            >
                <div style={{ pointerEvents: "all" }}>
                    <PageToggle />
                </div>
            </div>
            <AppsGrid />
        </main>
    );
}
