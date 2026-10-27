import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface ClientRecord {
  fullName: string;
  email: string;
  phone: string;
  birthDate: string;
  contactPreference: string;
  customerType: string;
  privacyConsent: boolean;
}

@Component({
  selector: 'app-client-component',
  standalone: false,
  templateUrl: './client-component.html',
  styleUrl: './client-component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {
  private readonly formBuilder = inject(FormBuilder);

  readonly clients = signal<ClientRecord[]>([]);
  readonly successMessage = signal('');
  readonly contactPreferences = [
    { label: 'WhatsApp', value: 'WhatsApp' },
    { label: 'E-mail', value: 'E-mail' },
    { label: 'Telefone', value: 'Telefone' },
  ];
  readonly customerTypes = [
    { label: 'Pessoa física', value: 'Pessoa física' },
    { label: 'Pessoa jurídica', value: 'Pessoa jurídica' },
  ];

  readonly registrationForm = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    birthDate: ['', Validators.required],
    contactPreference: ['', Validators.required],
    customerType: ['', Validators.required],
    privacyConsent: [false, Validators.requiredTrue],
  });

  registerClient(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.successMessage.set('');
      return;
    }

    const client = this.registrationForm.getRawValue();
    this.clients.update((currentClients) => [client, ...currentClients]);
    this.successMessage.set(`Cadastro de ${client.fullName} realizado com sucesso.`);
    this.registrationForm.reset();
  }
}
