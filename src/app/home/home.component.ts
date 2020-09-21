import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ElectronService} from "../core/services";
import * as queryString from 'query-string';
import {GetGroupBodyModel} from '../common/model/get-group-body.model';
import {ModalService} from '../core/services/modal/modal.service';
import {BodyDetailFormComponent} from './component/body-detail-form/body-detail-form.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public body = new GetGroupBodyModel();

    constructor(private router: Router,
                private electronService: ElectronService,
                private modalService: ModalService
    ) {
    }

    ngOnInit(): void {
    }

    onOpenSetting() {
        this.modalService.openModal({
            title: 'Ghi chú / Món thêm',
            inputs: [
            ],
            onSubmit: async () => {
            },
            component: BodyDetailFormComponent
        }, {
            class: 'modal-note'
        })
    }

    public callApi() {
        this.body.setBody('fb_dtsg', 'AQE-2qJ4zS4F:AQHRSF1ouoP5');
        this.electronService.callApi(queryString.stringify(this.body));
    }
}
