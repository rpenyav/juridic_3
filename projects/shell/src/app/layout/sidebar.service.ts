import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  private sidebarWidth = new BehaviorSubject<string>('60px');
  sidebarWidth$ = this.sidebarWidth.asObservable();

  toggleSidebar(): void {
    this.isOpen.next(!this.isOpen.value);
    this.sidebarWidth.next(this.isOpen.value ? '250px' : '60px');
  }
}
