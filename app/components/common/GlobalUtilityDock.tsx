import DesignPhilosophyModal from "./DesignPhilosophyModal";
import ReferencesDrawer from "./ReferencesDrawer";

const GlobalUtilityDock = () => {
	return (
		<div className="references-dock fixed bottom-5 right-4 z-[95] flex w-[calc(100%-2rem)] max-w-[19rem] flex-col gap-3 md:bottom-8 md:right-8 md:w-auto md:max-w-none">
			<DesignPhilosophyModal />
			<ReferencesDrawer />
		</div>
	);
};

export default GlobalUtilityDock;
