import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineProductComponent } from './medicine-product.component';

describe('MedicineProductComponent', () => {
  let component: MedicineProductComponent;
  let fixture: ComponentFixture<MedicineProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MedicineProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
