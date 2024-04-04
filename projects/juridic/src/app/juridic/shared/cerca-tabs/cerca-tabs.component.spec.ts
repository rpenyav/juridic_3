import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CercaTabsComponent } from './cerca-tabs.component';

describe('CercaTabsComponent', () => {
  let component: CercaTabsComponent;
  let fixture: ComponentFixture<CercaTabsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CercaTabsComponent]
    });
    fixture = TestBed.createComponent(CercaTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
