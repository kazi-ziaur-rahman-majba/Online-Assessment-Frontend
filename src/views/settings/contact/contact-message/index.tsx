import PageHeader from "@/components/page-header/PageHeader";
import { useEffect } from "react";
import MessageTable from "./components/MessageTable";

const ContactMessage = () => {
    return (
        <>
            <div className="flex flex-col gap-8">
                <div className="flex items-center justify-between flex-wrap">
                    <PageHeader
                        headerTitle="Contact Message"
                        headerDescription="Manage your contact message"
                    />
                </div>
                <MessageTable

                />
            </div>
        </>
    );
};

export default ContactMessage;
