type ToastButton = {
    label: string;
    variant?: string;
    onClick: () => void;
};

export type ToastEstado = {
    show: boolean;
    title: string;
    message: string;
    onConfirm?: () => void;
    buttons?: ToastButton[];
};