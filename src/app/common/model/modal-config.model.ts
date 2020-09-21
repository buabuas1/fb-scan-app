export class ModalConfig {
    title: string;

    width?: string | number;

    height?: string | number;

    template?: string;

    component?: any;

    inputs?: { key: string, value: any }[];

    outputs?: { key: string, value: any }[];

    onClose?: Function;

    onSubmit?: Function;

    onCustomAction?: Function;

    isCustomModalHeader?: boolean;

    onModalClose?: Function;

    draggable?: boolean;
}
