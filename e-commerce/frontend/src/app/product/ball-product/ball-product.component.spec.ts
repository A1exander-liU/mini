import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BallProductComponent } from './ball-product.component';

describe('BallProductComponent', () => {
  let component: BallProductComponent;
  let fixture: ComponentFixture<BallProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BallProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BallProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
