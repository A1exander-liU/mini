import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginLogoutMenuComponent } from './login-logout-menu.component';

describe('LoginLogoutMenuComponent', () => {
  let component: LoginLogoutMenuComponent;
  let fixture: ComponentFixture<LoginLogoutMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginLogoutMenuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoginLogoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
