import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoControlButtonComponent } from './tempo-control-button.component';

describe('TempoControlButtonComponent', () => {
  let component: TempoControlButtonComponent;
  let fixture: ComponentFixture<TempoControlButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempoControlButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoControlButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
