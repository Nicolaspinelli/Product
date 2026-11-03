import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { ClientService } from '../client-service';

import { ClientComponent } from './client-component';

describe('ClientComponent', () => {
  let component: ClientComponent;
  let fixture: ComponentFixture<ClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ClientComponent],
      imports: [ReactiveFormsModule],
      providers: [
        {
          provide: ClientService,
          useValue: {
            getAllClients: () => of([]),
            save: (client: unknown) => of(client),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ClientComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register a client with all seven required details', () => {
    component.registrationForm.setValue({
      fullName: 'Maria da Silva',
      email: 'maria@example.com',
      phone: '(11) 99999-9999',
      birthDate: '1990-05-10',
      contactPreference: 'WhatsApp',
      customerType: 'Pessoa física',
      privacyConsent: true,
    });

    component.registerClient();

    expect(component.clients()).toHaveLength(1);
    expect(component.clients()[0].fullName).toBe('Maria da Silva');
    expect(component.successMessage()).toContain('Maria da Silva');
  });

  it('should not register an invalid client', () => {
    component.registerClient();

    expect(component.clients()).toHaveLength(0);
    expect(component.registrationForm.touched).toBe(true);
  });
});
