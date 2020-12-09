import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailTechnicalHoursComponent } from './detail-technical-hours.component';

describe('DetailTechnicalHoursComponent', () => {
  let component: DetailTechnicalHoursComponent;
  let fixture: ComponentFixture<DetailTechnicalHoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailTechnicalHoursComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailTechnicalHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
