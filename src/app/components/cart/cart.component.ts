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
  resultResponse = "";
  finalPrice = 0;

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
    this.updateFinalPrice();
  }

  onSubmit(): void {
    const formData = {
      ...this.checkoutForm.value,
      products: this.products.map((product: Product) => {
        return {
          id: product._id,
          name: product.name,
          price: product.price,
          count: product.count,
          shop: product.shop,
        };
      }),
      finalPrice: this.finalPrice,
    };
    console.warn("Your order has been submitted", formData);

    this.cartService.sendDataToDB(formData).subscribe(
      (response) => {
        this.resultResponse =
          "Data sent successfully. Wait for the operator to contact you in a few minutes";
          this.cartService.resetCart()
      },
      (error) => {
        console.error(
          "Error occurred while sending data to MongoDB. Status code:",
          error
        );
        this.resultResponse = `Error occurred while sending data. Error message is: ${error.error.message}. Try send data later`;
      }
    );
  }

  onChangeCount(product: Product, element: any): void {
    const countProduct = element.target.value;
    const findProductIndex = this.products.findIndex(
      (item) => item._id === product._id
    );
    if (findProductIndex !== -1) {
      this.products[findProductIndex].count = countProduct;
      this.updateFinalPrice();
    }
  }

  updateFinalPrice(): void {
    this.finalPrice = this.products
      ?.map((product) => product.count * product.price)
      .reduce((prevVal, curVal) => prevVal + curVal, 0);
  }
}
