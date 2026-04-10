const DashboardOverView = ({
	title,
	subTitle,
	bgColor = "bg-gray-200",
	children,
}: {
	title: string;
	subTitle: string;
	bgColor?: string;
	children: React.ReactNode;
}) => {
	return (
		<div className={`px-4 py-6 rounded-md  ${bgColor} text-white`}>
			<div className="flex items-center justify-between">
				<div>
					<p className="text-[24px] font-bold">{title}</p>
					<p className="text-sm">{subTitle}</p>
				</div>
				<div className="text-5xl hover:scale-120 transition-all ease-in duration-300">{children}</div>
			</div>
		</div>
	);
};

export default DashboardOverView;
