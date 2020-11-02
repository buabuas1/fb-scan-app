import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivationStart, Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
    @ViewChild(RouterOutlet) outlet: RouterOutlet;
  constructor( private router: Router) { }

  ngOnInit(): void {
      this.router.events.subscribe(e => {
          if (e instanceof ActivationStart && e.snapshot.outlet === "group")
              this.outlet.deactivate();
      });
  }

}
