import { Component, OnInit } from '@angular/core';
import { Ticket } from '../form/class/ticket-category';

@Component({
  selector: 'app-viewform',
  templateUrl: './viewform.component.html',
  styleUrls: ['./viewform.component.scss'],
})
export class ViewformComponent implements OnInit {
  ticketCategories: Ticket[] = [];
  totalPrice: number = 0;

  constructor() {}

  addCategory(event: any) {
    if (event as Ticket[]) {
      let ticketCategory: Ticket = event;
      this.ticketCategories.push(ticketCategory);
    } else {
      throw new Error('Error of type');
    }
  }

  getTotalPrice() {
    return this.ticketCategories.reduce(
      (acc, item) => acc + item.totalSales,
      0
    );
  }

  ngOnInit() {}
}
