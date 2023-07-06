import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { HistoryOrder } from "src/app/Shop";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-history",
  templateUrl: "history.component.html",
})
export class HistoryComponent implements OnInit {
  products: HistoryOrder[] = [];
  emptyOrder = '';

  checkoutForm = this.formBuilder.group({
    email: "",
    phone: "",
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
  }

  onFindOrders(): void {
    this.cartService.getOrderData(this.checkoutForm.value).subscribe(
      (response: HistoryOrder[]) => {
        if(!response.length){
          this.emptyOrder = 'No order found';
          return;
        }
        this.products = response;
      },
      (error) => {
        console.error(
          "Error occurred while sending data to MongoDB. Status code:",
          error.status, error
        );
      }
    )
  }
}
