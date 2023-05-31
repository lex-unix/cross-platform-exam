import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidatorCategoryService {
  constructor() {}

  checkRange(value: number) {
    if (value < 3 || value > 10) {
      return false;
    }
    return true;
  }
}
