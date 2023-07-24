import { TestBed } from '@angular/core/testing';

import { ServicioVentanasService } from './servicio-ventanas.service';

describe('ServicioVentanasService', () => {
  let service: ServicioVentanasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioVentanasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
