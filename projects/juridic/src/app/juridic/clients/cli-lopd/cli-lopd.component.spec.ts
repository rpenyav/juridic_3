import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CliLopdComponent } from './cli-lopd.component';

describe('CliLopdComponent', () => {
  let component: CliLopdComponent;
  let fixture: ComponentFixture<CliLopdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CliLopdComponent]
    });
    fixture = TestBed.createComponent(CliLopdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
