import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectibleProductComponent } from './collectible-product.component';

describe('CollectibleProductComponent', () => {
  let component: CollectibleProductComponent;
  let fixture: ComponentFixture<CollectibleProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CollectibleProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CollectibleProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
