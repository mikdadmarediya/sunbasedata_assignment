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

  onOpenedit(customer:Customer){
    this.editcustomer = customer;
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

  onOpendelete(customer:Customer){
    this.deletecustomer = customer;
  }

  logout(){
    this.userservice.logout();
  }
}
