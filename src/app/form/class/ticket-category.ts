export class Ticket {
  category: number;
  price: number;
  soldTickets: number;
  totalSales!: number;

  constructor(category: number) {
    this.category = category + 1;
    this.price = category * Math.floor(Math.random() * 5) + 1;
    this.soldTickets = Math.floor(Math.random() * 11) + 10;
  }
}
