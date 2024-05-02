import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sub-tabs-cli',
  templateUrl: './sub-tabs-cli.component.html',
  styleUrls: ['./sub-tabs-cli.component.css'],
})
export class SubTabsCliComponent {
  @Input() identificador: string;

  activeTabId: string = 'generals-tab';

  ngOnInit(): void {
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
