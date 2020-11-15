import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IConfirmOptions {
    title: string;
    message: string;
    yesText?: string;
    noText?: string;
    iconText?: string;
    hideClose?: boolean;
    noClose?: boolean;
    noYes?: boolean;
    noCancel?: boolean;
    isDeleteConfirm?: boolean;
    on;
    customerText?: string;
    customerValue?: string;
    customeButton?: boolean;
    ignoreBackdropClick?: boolean;
}

@Component({
    selector: 'kv-confirm',
    templateUrl: './confirm.component.html',
})
export class ConfirmComponent implements OnInit {

    @Input() options: IConfirmOptions;

    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<any> = new EventEmitter<any>();

    constructor() {
    }

    ngOnInit() {
    }

    public onModalClose() {
        this.close.emit();
    }
}
