import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-general-layout',
  templateUrl: './generallayout.component.html',
  styleUrls: ['./generallayout.component.scss'],
})
export class GeneralLayoutComponent implements OnInit {
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {}
}
