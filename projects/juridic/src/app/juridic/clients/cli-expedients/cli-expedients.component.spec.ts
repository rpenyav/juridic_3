import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliExpedientsComponent } from './cli-expedients.component';

describe('CliExpedientsComponent', () => {
  let component: CliExpedientsComponent;
  let fixture: ComponentFixture<CliExpedientsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliExpedientsComponent]
    });
    fixture = TestBed.createComponent(CliExpedientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
