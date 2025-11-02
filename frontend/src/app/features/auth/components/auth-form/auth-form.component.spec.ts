import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthFormComponent } from './auth-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';

describe('AuthFormComponent', () => {
  let component: AuthFormComponent;
  let fixture: ComponentFixture<AuthFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthFormComponent, BrowserAnimationsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve inicializar o formulário inválido', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('deve validar os campos obrigatórios', () => {
    const user = component.form.controls['user'];
    const password = component.form.controls['password'];

    expect(user.errors?.['required']).toBeTruthy();
    expect(password.errors?.['required']).toBeTruthy();
  });

  it('deve submeter o formulário com valores válidos', () => {
    component.form.setValue({
      user: 'admin',
      password: '123'
    });

    const formDebug = fixture.debugElement.query(By.css('form'));
    formDebug.triggerEventHandler('ngSubmit', {});

    expect(component.form.valid).toBeTrue();
    expect(component.doLogin()).toBeTrue();
  });

  it('não deve submeter se o formulário for inválido', () => {
    expect(component.form.valid).toBeFalse();

    const formDebug = fixture.debugElement.query(By.css('form'));
    formDebug.triggerEventHandler('ngSubmit', {});

    expect(component.doLogin()).toBeFalse();
  });

});
