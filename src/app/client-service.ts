import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from './models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  apiUrl = "http://localhost:3000/clients";

  constructor(private http: HttpClient) { }

  getAllClients(): Observable<Client[]>{
    return this.http.get<Client[]>(this.apiUrl);
  }

  save(client: Client): Observable<Client>{
    return this.http.post<Client>(this.apiUrl, client);
  }

   // HTTP DELETE: http://localhost:3000/clients/6
  delete(client: Client): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${client.id}`);
 }

 update(client: Client): Observable<Client>{
    return this.http.put<Client>(`${this.apiUrl}/${client.id}`, client);
}
}
