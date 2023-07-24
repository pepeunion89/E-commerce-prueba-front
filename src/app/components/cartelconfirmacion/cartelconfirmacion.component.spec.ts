import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartelconfirmacionComponent } from './cartelconfirmacion.component';

describe('CartelconfirmacionComponent', () => {
  let component: CartelconfirmacionComponent;
  let fixture: ComponentFixture<CartelconfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartelconfirmacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CartelconfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
