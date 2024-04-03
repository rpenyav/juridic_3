import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dynamic-detail',
  templateUrl: './dynamic-detail.component.html',
  styleUrls: ['./dynamic-detail.component.scss'],
})
export class DynamicDetailComponent implements OnInit {
  type!: string;
  id!: string;
  category!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
      this.type = params['type'];
      this.id = params['id'];
    });
  }
}
