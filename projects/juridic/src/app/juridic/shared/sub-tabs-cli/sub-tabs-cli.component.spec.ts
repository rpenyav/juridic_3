import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubTabsCliComponent } from './sub-tabs-cli.component';

describe('SubTabsComponent', () => {
  let component: SubTabsCliComponent;
  let fixture: ComponentFixture<SubTabsCliComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubTabsCliComponent],
    });
    fixture = TestBed.createComponent(SubTabsCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
