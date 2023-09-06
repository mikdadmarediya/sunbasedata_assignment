import { Component, OnInit } from '@angular/core';
import { CustomerserviceService } from '../customerservice.service';
import { Customer } from '../customer';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { error } from 'console';
import { UserServiceService } from '../user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public customer!: Customer[];
  public editcustomer!: Customer;
  public deletecustomer!: Customer;

  constructor(private customerService:CustomerserviceService,private userservice:UserServiceService) { }

  ngOnInit(): void {
    this.getCustomer();
    console.log(this.customer)
  }

  public getCustomer():void{
    this.customerService.getCustomer().subscribe(
      (response:Customer[])=>{
        this.customer = response;
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
   }

   public onAddEmloyee(addForm: NgForm): void {
    document.getElementById("add-employee-form")!.click();
    this.customerService.addcustomer(addForm.value).subscribe( 
      (response: Customer) => {
        console.log(response);
        this.getCustomer();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onUpdateEmloyee(customer: Customer): void {
    this.customerService.updatecustomer(customer).subscribe(
      (response: Customer) => {
        console.log(response);
        this.getCustomer();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    );
  }

  public ondeleteEmloyee(Id: number): void {
    this.customerService.deletecustomer(Id).subscribe(
      (response: void) => {
        console.log(response);
        this.getCustomer();
        
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
       
      }
    );
  }
 
  public onOpenModal(customer: Customer, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode === 'edit') {
      this.editcustomer = customer; 
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if (mode === 'delete') {
       this.deletecustomer = customer
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button)
    button.click();
  }

  logout(){
    this.userservice.logout();
  }
}
