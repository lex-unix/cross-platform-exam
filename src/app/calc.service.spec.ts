import { TestBed } from '@angular/core/testing';

import { CalcService } from './calc.service';
import { Ticket } from './form/class/ticket-category';

describe('CalcService', () => {
  let service: CalcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should procude right calculation', () => {
    const ticket = {
      price: 10,
      soldTickets: 5,
    };

    const totalPrice = service.calculatePrice(ticket as Ticket);
    expect(totalPrice).toBe(50);
  });
});
