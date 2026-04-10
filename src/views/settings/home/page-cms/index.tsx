import PageHeader from "@/components/page-header/PageHeader";
import PageCmsForm from "./components/PageCms";
import Footer from "@/components/admin/Footer";

const HomePageCMS = () => {
    return (
        <>
            <div className="flex flex-col gap-8 min-h-screen p-6">
                <div className="flex items-center justify-between flex-wrap">
                    <PageHeader
                        headerTitle="Home Page CMS"
                        headerDescription="Manage your home page"
                    />
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 xl:col-span-12">
                        <PageCmsForm />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default HomePageCMS;
