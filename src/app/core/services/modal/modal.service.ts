import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService, ModalOptions} from 'ngx-bootstrap';
import {ModalConfig} from '../../../common/model/modal-config.model';
import {Subscription} from 'rxjs';
import {ModalComponent} from '../../../shared/modal/modal.component';

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

}
