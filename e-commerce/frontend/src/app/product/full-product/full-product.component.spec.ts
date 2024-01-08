import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProductComponent } from './full-product.component';

describe('FullProductComponent', () => {
  let component: FullProductComponent;
  let fixture: ComponentFixture<FullProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FullProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FullProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
