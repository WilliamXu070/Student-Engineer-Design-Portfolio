import DesignPhilosophyModal from "./DesignPhilosophyModal";
import ReferencesDrawer from "./ReferencesDrawer";

const InspirationCreditBadge = () => {
	return (
		<a
			href="https://mohitvirli.github.io/"
			target="_blank"
			rel="noopener noreferrer"
			aria-label="Thank you to Mohit Virli for portfolio inspiration"
			className="group fixed right-0 top-1/2 z-[95] flex -translate-y-1/2 items-center border-y-[3px] border-l-[3px] border-black bg-[#f5eddc] px-2.5 py-3 text-[10px] font-bold uppercase tracking-[0.18em] text-black shadow-[5px_5px_0_#000] transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1/2 focus-visible:-translate-x-1 focus-visible:-translate-y-1/2 focus-visible:outline-none md:px-3 md:py-4 md:text-[11px]"
			style={{
				fontFamily: "var(--font-vercetti)",
				writingMode: "vertical-rl",
				textOrientation: "mixed",
			}}>
			Thank you
			<span
				className="pointer-events-none absolute right-full top-1/2 mr-3 w-[18rem] -translate-y-1/2 border-[3px] border-black bg-[#f5eddc] px-4 py-3 text-left text-[11px] font-bold uppercase leading-5 tracking-[0.14em] text-black opacity-0 shadow-[5px_5px_0_#000] transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
				style={{
					writingMode: "horizontal-tb",
					textOrientation: "mixed",
				}}>
				This portfolio took inspiration from Mohit Virli and was heavily updated from that starting point.
			</span>
		</a>
	);
};

const GlobalUtilityDock = () => {
	return (
		<>
			<InspirationCreditBadge />
			<div className="references-dock fixed bottom-5 right-4 z-[95] flex w-[calc(100%-2rem)] max-w-[19rem] flex-col gap-3 md:bottom-8 md:right-8 md:w-auto md:max-w-none">
				<DesignPhilosophyModal />
				<ReferencesDrawer />
			</div>
		</>
	);
};

export default GlobalUtilityDock;
