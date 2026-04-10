import toast from "react-hot-toast";

type ToastType = "success" | "error";

const baseStyle = {
    color: "#FFF"
};

const backgroundMap: Record<ToastType, string> = {
    success: "#4CAF50",
    error: "#D32F2F"
};

export const showToast = (
    type: ToastType,
    message: string,
    duration = 3000
) => {
    return toast[type](message, {
        duration,
        style: {
            ...baseStyle,
            background: backgroundMap[type]
        }
    });
};
