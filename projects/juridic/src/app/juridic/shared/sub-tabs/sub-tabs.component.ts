import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-tabs',
  templateUrl: './sub-tabs.component.html',
  styleUrls: ['./sub-tabs.component.css'],
})
export class SubTabsComponent {
  @Input() identificador: string;

  activeTabId: string = 'carpetas-tab';

  ngOnInit(): void {
    console.log(this.identificador);
    const savedTabId = localStorage.getItem('activeTab');
    if (savedTabId) {
      this.activeTabId = savedTabId;
    }
  }

  setActiveTab(tabId: string): void {
    this.activeTabId = tabId;
    localStorage.setItem('activeTab', tabId);
  }
}
