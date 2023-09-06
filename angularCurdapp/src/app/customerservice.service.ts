import { Injectable } from '@angular/core';
import { Customer } from './customer';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerserviceService {

  private apiServiceUrl = 'http://localhost:8083';

  constructor(private http:HttpClient) { }

  public getCustomer(): Observable<Customer[]>{
    return this.http.get<Customer[]>(`${this.apiServiceUrl}/allCustomer`)
  }

  public addcustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(`${this.apiServiceUrl}`+`/addCustomer`,customer)
  }

  public updatecustomer(customer: Customer): Observable<Customer>{
    return this.http.put<Customer>(`${this.apiServiceUrl}/update`,customer)
  }

  public deletecustomer(id: number): Observable<void>{
    return this.http.delete<void>(`${this.apiServiceUrl}/customer/${id}`)
  }
}
