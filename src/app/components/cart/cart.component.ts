import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Product } from "src/app/Shop";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-cart",
  templateUrl: "cart.component.html",
})
export class CartComponent implements OnInit {
  products: Product[] = [];

  checkoutForm = this.formBuilder.group({
    name: "",
    email: "",
    phone: "",
    address: "",
    products: this.formBuilder.array(this.products),
    finalPrice: 0,
  });

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.products = this.cartService.getCart();
  }

  onSubmit(): void {
    const finalPrice = this.products?.map(item => item.count * item.price).reduce( (prevVal, curVal) => prevVal + curVal, 0);
    const formData = {
      ...this.checkoutForm.value,
      products: this.products.map((product: Product) => {
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          count: product.count,
        };
      }),
      finalPrice,
    };
    console.warn("Your order has been submitted", formData);

    this.cartService.sendDataToDB(formData);
  }
}
