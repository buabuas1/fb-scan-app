import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-body-detail-form',
    templateUrl: './body-detail-form.component.html',
    styleUrls: ['./body-detail-form.component.scss']
})
export class BodyDetailFormComponent implements OnInit {
    @Output() close: EventEmitter<void> = new EventEmitter<void>();
    @Output() submit: EventEmitter<void> = new EventEmitter<void>();

    constructor() {
    }

    ngOnInit(): void {
    }

}
