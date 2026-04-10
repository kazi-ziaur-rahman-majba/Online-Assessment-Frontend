import Button from "@/components/button/Button";
import InputField from "@/components/form/TextInput";
import Modal from "@/components/modal/Modal";
import { ChangeEvent, useState } from "react";

const initialFieldValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
};

const requiredFields = [
    { key: "name", value: "name", label: "text" },
    { key: "phone", value: "phone", label: "text" },
    { key: "email", value: "email", label: "text" },
    { key: "password", value: "password", label: "text" },
    { key: "confirmPassword", value: "confirm password", label: "text" }
];

const AdminForm = ({ isOpen, onClose, editData, fetchData }: any) => {
    const [fieldValues, setFieldValues] = useState(initialFieldValues);
    const [isLoading, setIsLoading] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFieldValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
      };

    const handleSubmitForm = async () => {
       alert("successfully")
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editData ? "Edit First Category" : "Create New Admin"}
            footerButtons={
                <>
                    <Button label="Cancel" onClick={onClose} color="var(--primary-color-dark)"  />
                    <Button
                        label="Save"
                        onClick={handleSubmitForm}
                        color="var(--color-primary)"
                        // hoverColor="var(--color-primary-light)"
                        isLoading={isLoading}
                        disabled={isLoading}
                    />
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <InputField label="Name" type="text"
                        name="name"
                        value={fieldValues.name}
                        required
                        onChange={handleChange} />
                </div>

                <div>
                    <InputField label="Email" type="text"
                        name="email"
                        value={fieldValues.email}
                        required
                        onChange={handleChange} />
                </div>

                <div>
                    <InputField label="Phone" type="text"
                        name="phone"
                        value={fieldValues.phone}
                        required
                        onChange={handleChange} />
                </div>

                <div>
                    <InputField label="Password" type="text"
                        name="password"
                        value={fieldValues.password}
                        required
                        onChange={handleChange} />
                </div>

                <div>
                    <InputField label="Confirm Password" type="text"
                        name="confirmPassword"
                        value={fieldValues.confirmPassword}
                        required
                        onChange={handleChange} />
                </div>
            </div>
        </Modal>
    );
};

export default AdminForm;