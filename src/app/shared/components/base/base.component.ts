import {Component, OnDestroy, OnInit} from '@angular/core';
import {ReplaySubject} from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {
    public destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    constructor() {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

}
