import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {ModalConfig} from '../../../common/model/modal-config.model';
import {Observable, Subscription} from 'rxjs';
import {ModalComponent} from '../../../shared/modal/modal.component';
import {ConfirmComponent, IConfirmOptions} from '../../../shared/modal/confirm/confirm.component';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
    public subscriber: Subscription;
    constructor(private modalService: BsModalService) {
    }

    openModal(config: ModalConfig, options?: ModalOptions): BsModalRef {
        let bsModalRef: BsModalRef;

        bsModalRef = this.modalService.show(ModalComponent, options);
        bsModalRef.content.config = config;

        // this.subscriber = this.modalService.onHide.subscribe(() => {
        //     if (config.onClose) {
        //         config.onClose();
        //     }
        //     this.subscriber.unsubscribe();
        // });

        return bsModalRef;
    }

    confirm(options: IConfirmOptions): Observable<any> {
        return new Observable(obs => {
            this.openModal({
                title: options.title || '',
                component: ConfirmComponent,
                inputs: [{
                    key: 'options',
                    value: options
                }],
                onSubmit: (val) => {
                    obs.next(val || true);
                },
                onClose: () => {
                    obs.next(false);
                }
            }, {
                class: 'modal-confirm',
                ignoreBackdropClick: options.ignoreBackdropClick
            });
        });
    }

}
