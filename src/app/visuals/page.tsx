import VisualsGrid from "@/components/VisualsGrid";
import PageToggle from "@/components/PageToggle";

export default function VisualsPage() {
    return (
        <main>
            <div
                style={{
                    position: "fixed",
                    top: 40,
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
            <VisualsGrid />
        </main>
    );
}
