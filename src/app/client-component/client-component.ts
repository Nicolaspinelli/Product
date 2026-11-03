import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Client } from '../models/client';
import { ClientService } from '../client-service';

@Component({
  selector: 'app-client-component',
  standalone: false,
  templateUrl: './client-component.html',
  styleUrl: './client-component.css'
})
export class ClientComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly clientService = inject(ClientService);

  readonly contactPreferences = [
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'E-mail', label: 'E-mail' },
    { value: 'Telefone', label: 'Telefone' },
  ];

  readonly customerTypes = [
    { value: 'Pessoa física', label: 'Pessoa física' },
    { value: 'Pessoa jurídica', label: 'Pessoa jurídica' },
  ];

  readonly clients = signal<Client[]>([]);
  readonly successMessage = signal('');

  readonly registrationForm = this.formBuilder.nonNullable.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    birthDate: ['', Validators.required],
    contactPreference: ['', Validators.required],
    customerType: ['', Validators.required],
    privacyConsent: [false, Validators.requiredTrue],
  });

  ngOnInit(): void {
    this.clientService.getAllClients().subscribe({
      next: (clients) => this.clients.set(clients),
    });
  }

  registerClient(): void {
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      this.successMessage.set('');
      return;
    }

    const client: Client = this.registrationForm.getRawValue();
    this.clientService.save(client).subscribe({
      next: (savedClient) => {
        this.clients.update((clients) => [...clients, savedClient]);
        this.successMessage.set(`Cliente ${savedClient.fullName} cadastrado com sucesso.`);
        this.registrationForm.reset();
      },
    });
  }
}
