import { TestBed } from '@angular/core/testing';
import { ValidatorCategoryService } from './validate-category';

describe('ValidateCategory', () => {
  let validator: ValidatorCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    validator = TestBed.inject(ValidatorCategoryService);
  });

  it('should be created', () => {
    expect(validator).toBeTruthy();
  });

  it('should check range from 3 to 10', () => {
    expect(validator.checkRange(10)).toBeTrue();
  });
});
