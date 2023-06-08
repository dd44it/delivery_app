import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Product } from "src/app/Shop";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-history",
  templateUrl: "history.component.html",
})
export class HistoryComponent implements OnInit {
  products: Product[] = [];

  checkoutForm = this.formBuilder.group({
    email: "test@gmail.com",
    phone: "333333",
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    
  }

  onFindOrders(): void {
    console.log(this.checkoutForm.value)
    this.cartService.getOrderData(this.checkoutForm.value).subscribe(
      (response) => {
        console.log("response", response)
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
