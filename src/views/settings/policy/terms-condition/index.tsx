import PageHeader from "@/components/page-header/PageHeader";
import TermsConditionsForm from "./components/TermsForm";

const TermsConditions = () => {
    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between flex-wrap">
                    <PageHeader
                        headerTitle="Terms & Conditions"
                        headerDescription="Manage your terms and conditions"
                    />
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 xl:col-span-12">
                        <TermsConditionsForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default TermsConditions;
