import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-exp-by-id',
  templateUrl: './exp-by-id.component.html',
  styleUrls: ['./exp-by-id.component.css'],
})
export class ExpByIdComponent implements OnInit {
  tabId: string;
  private routeSub: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.routeSub = this.route.params.subscribe((params) => {
      this.tabId = params['tabId'];
      console.log('Tab ID recibido desde la URL:', this.tabId);
    });
  }

  ngOnDestroy() {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
