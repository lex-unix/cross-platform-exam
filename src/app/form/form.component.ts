import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Ticket } from './class/ticket-category';
import { Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { ValidatorCategoryService } from './service/validate-category';
import { CalcService } from '../calc.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formGroup!: FormGroup;
  @Output() ticketCategoryAdd: EventEmitter<Ticket> =
    new EventEmitter<Ticket>();

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController,
    private calcServie: CalcService
  ) {
    this.formGroup = this.formBuilder.group({
      numOfCategories: ['', [Validators.required]],
      numOfSoldTickets: new FormArray([new FormControl()]),
    });
  }

  onSubmit() {
    let { numOfCategories } = this.formGroup.value;
    numOfCategories = Number(numOfCategories);
    const validatator = new ValidatorCategoryService();
    if (validatator.checkRange(numOfCategories)) {
      for (let category = 0; category < numOfCategories; category++) {
        const ticketCategory = new Ticket(category);

        ticketCategory.totalSales =
          this.calcServie.calculatePrice(ticketCategory);

        this.ticketCategoryAdd.emit(ticketCategory);
      }
    } else {
      this.presentAlert('Кільксіть категорій повинна бути від 3-х до 10');
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Помилка',
      subHeader: '',
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnInit() {}
}
