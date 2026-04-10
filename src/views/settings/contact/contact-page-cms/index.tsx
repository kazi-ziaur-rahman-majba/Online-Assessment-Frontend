import PageHeader from "@/components/page-header/PageHeader";
import PageCms from "./components/PageCms";

const ContactPageCMS = () => {
    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between flex-wrap">
                    <PageHeader
                        headerTitle="Contact Page CMS"
                        headerDescription="Manage your contact page"
                    />
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 xl:col-span-12">
                        <PageCms />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ContactPageCMS
