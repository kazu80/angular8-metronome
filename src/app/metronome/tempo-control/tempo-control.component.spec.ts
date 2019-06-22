import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoControlComponent } from './tempo-control.component';

describe('TempoControlComponent', () => {
  let component: TempoControlComponent;
  let fixture: ComponentFixture<TempoControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempoControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
