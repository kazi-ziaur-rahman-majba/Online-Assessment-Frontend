import PageHeader from "@/components/page-header/PageHeader";
import ExchangeReturnForm from "./ExchangeForm";

const ExchangeReturn = () => {
    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between flex-wrap">
                    <PageHeader
                        headerTitle="Exchange & Return"
                        headerDescription="Manage your exchange and return"
                    />
                </div>
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12 xl:col-span-12">
                        <ExchangeReturnForm />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ExchangeReturn;
