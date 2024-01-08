import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeldItemProductComponent } from './held-item-product.component';

describe('HeldItemProductComponent', () => {
  let component: HeldItemProductComponent;
  let fixture: ComponentFixture<HeldItemProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeldItemProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeldItemProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
