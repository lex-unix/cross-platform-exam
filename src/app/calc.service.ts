import { Injectable } from '@angular/core';
import { Ticket } from './form/class/ticket-category';

@Injectable({
  providedIn: 'root',
})
export class CalcService {
  constructor() {}

  calculatePrice(ticketCategory: Ticket) {
    return ticketCategory.price * ticketCategory.soldTickets;
  }
}
