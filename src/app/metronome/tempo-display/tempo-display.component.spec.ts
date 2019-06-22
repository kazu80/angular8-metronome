import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoDisplayComponent } from './tempo-display.component';

describe('TempoDisplayComponent', () => {
  let component: TempoDisplayComponent;
  let fixture: ComponentFixture<TempoDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempoDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempoDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
