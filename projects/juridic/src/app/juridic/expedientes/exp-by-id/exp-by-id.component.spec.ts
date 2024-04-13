import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExpByIdComponent } from './exp-by-id.component';

describe('ExpByIdComponent', () => {
  let component: ExpByIdComponent;
  let fixture: ComponentFixture<ExpByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpByIdComponent],
      imports: [RouterTestingModule],
    });
    fixture = TestBed.createComponent(ExpByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
