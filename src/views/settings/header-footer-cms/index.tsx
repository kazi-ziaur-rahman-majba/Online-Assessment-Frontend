import PageHeader from "@/components/page-header/PageHeader";
import CmsForm from "./components/CmsForm";

const HeaderFooterCMS = () => {
	return (
		<>
			<div className="flex flex-col gap-8">
				<div className="flex items-center justify-between flex-wrap">
					<PageHeader
						headerTitle="Header Footer CMS"
						headerDescription="Manage your header-footer-cms"
					/>
				</div>

				<div className="grid grid-cols-12 gap-12">
					<div className="col-span-12 xl:col-span-12">
						<CmsForm />
					</div>
				</div>
			</div>
		</>
	);
}

export default HeaderFooterCMS;
