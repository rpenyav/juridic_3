import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { DynamicDetailComponent } from '../dynamic-detail/dynamic-detail.component';

describe('DynamicDetailComponent', () => {
  let component: DynamicDetailComponent;
  let fixture: ComponentFixture<DynamicDetailComponent>;

  const routeParams = of({
    category: 'testCategory',
    type: 'testType',
    id: 'testId',
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DynamicDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: routeParams },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize parameters based on route params', () => {
    expect(component.category).toEqual('testCategory');
    expect(component.type).toEqual('testType');
    expect(component.id).toEqual('testId');
  });
});
