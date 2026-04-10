import type { ButtonHTMLAttributes, ReactNode } from "react";

type FloatingUtilityButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	label: string;
	accentClassName: string;
	meta?: ReactNode;
};

const FloatingUtilityButton = ({
	label,
	accentClassName,
	meta,
	className = "",
	type = "button",
	...props
}: FloatingUtilityButtonProps) => {
	return (
		<button
			type={type}
			className={`relative flex h-14 w-full items-center justify-between rounded-full border border-slate-300/30 bg-[#101822] px-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-[1.015] hover:bg-[#162231] md:min-w-[15.5rem] md:w-auto ${className}`}
			style={{ fontFamily: "var(--font-vercetti)" }}
			{...props}>
			<div className="relative z-10 flex items-center gap-3">
				<span className={`h-2.5 w-2.5 rounded-full ${accentClassName}`} />
				<span className="text-[0.72rem] uppercase tracking-[0.24em]">{label}</span>
			</div>
			{meta ? <div className="ml-4 text-[0.7rem] uppercase tracking-[0.22em] text-slate-300">{meta}</div> : null}
		</button>
	);
};

export default FloatingUtilityButton;
