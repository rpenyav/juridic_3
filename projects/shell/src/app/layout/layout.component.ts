import { Component } from '@angular/core';
import { I18nService } from 'shared-lib';
import { SidebarService } from './sidebar.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  constructor(public sidebarService: SidebarService) {}
}
