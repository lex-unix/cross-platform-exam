import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Author } from './class/author';
import { Validators } from '@angular/forms';
import { dateValidator } from './service/date-validator';
import { AlertController } from '@ionic/angular';
import { ValidatorDayDateService } from './service/validator-day-date-service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  formGroup!: FormGroup;
  author!: Author;
  @Output() authorAdd: EventEmitter<Author> = new EventEmitter<Author>();

  constructor(
    private formBuilder: FormBuilder,
    private alertController: AlertController
  ) {
    this.formGroup = this.formBuilder.group({
      authorName: ['', [Validators.required]],
      authorDateBirth: ['', [dateValidator()]],
      authorDateDeath: ['', [dateValidator()]],
      authorBio: [''],
      books: new FormArray([new FormControl()]),
    });
  }

  addBooks() {
    (this.formGroup.controls['books'] as FormArray).push(new FormControl());
  }

  deleteBook(i: any) {
    (this.formGroup.controls['books'] as FormArray).removeAt(i);
  }

  getControls() {
    return (this.formGroup.get('books') as FormArray).controls;
  }

  onSubmit() {
    let name = this.formGroup.value.authorName;
    let d1 = this.formGroup.value.authorDateBirth;
    let d2 = this.formGroup.value.authorDateDeath;
    let bio = this.formGroup.value.authorBio;
    let books = this.formGroup.value.books;
    let valid = new ValidatorDayDateService();
    if (valid.validate_diff_date(d1, d2)) {
      this.author = new Author(name, d1, d2, bio, books);
      this.authorAdd.emit(this.author);
      console.log(this.author);
    } else {
      this.presentAlert('Дата смерті невірна');
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
