import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Client } from '../models/client';
import { ClientService } from '../client-service';

@Component({
  selector: 'app-client-component',
  standalone: false,
  templateUrl: './client-component.html',
  styleUrl: './client-component.css'
})
export class ClientComponent implements OnInit {
  isEditing: boolean = false;
  clients = signal<Client[]>([]);
  formGroupClient: FormGroup;

  constructor(private formBuilder: FormBuilder, private service: ClientService) {

      this.formGroupClient = formBuilder.group({
        id: [''],
        fullName: [''],
        email: [''],
        phone: [''],
        birthDate:   [''],
        contactPreference:   [''],
        customerType:   [''],
        privacyConsent:   ['']
      });
  }
  ngOnInit(): void {
    this.service.getAllClients().subscribe({
      next: (clients) => this.clients.set(clients),
    });
  }
  save(){
    this.service.save(this.formGroupClient.value).subscribe(
     {
       next: json => {
          this.clients.update(clients => [...clients, json]);
          this.formGroupClient.reset();
       }
     }
    );
 }

  delete(client: Client) {
        this.service.delete(client).subscribe(
          {
            next: () => {
              this.clients.update(clients => clients.filter(c => c.id !== client.id));
            }
          }
        )
      }
onClickUpdate(client: Client) {
      this.formGroupClient.setValue(client);
      this.isEditing = true;
  }

  update() {
     this.service.update(this.formGroupClient.getRawValue()).subscribe(
        {
          next: json => {
            this.clients.update(clients => clients.map(c => c.id === json.id ? json : c));
            this.isEditing = false;
            this.formGroupClient.reset();
          }
        }
      )
  }
}
