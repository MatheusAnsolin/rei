import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCustomizationComponent } from './product-customization.component';

describe('ProductCustomizationComponent', () => {
  let component: ProductCustomizationComponent;
  let fixture: ComponentFixture<ProductCustomizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCustomizationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
