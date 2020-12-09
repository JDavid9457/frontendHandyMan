import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTechnicalComponent } from './list-technical.component';

describe('ListTechnicalComponent', () => {
  let component: ListTechnicalComponent;
  let fixture: ComponentFixture<ListTechnicalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListTechnicalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTechnicalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
