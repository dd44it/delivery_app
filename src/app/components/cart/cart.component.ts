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
  userAddress = '';
  pickUserAddress = '';

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
    const localStorageCart = localStorage.getItem("cart");
    const localStorageUserAddress = localStorage.getItem("userAddress");
    if (localStorageCart) {
      this.products = JSON.parse(localStorageCart);
    } else {
      this.products = this.cartService.getCart();
    }
    if(localStorageUserAddress) {
      this.pickUserAddress = localStorageUserAddress;
    }
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
        this.cartService.resetCart();
      },
      (error) => {
        console.error(
          "Error occurred while sending data to MongoDB. Status code:",
          error
        );
        this.resultResponse = `Error occurred while sending data. Error message is: ${error.error.message}. Try send data later`;
        this.cartService.resetCart();
      }
    );
  }

  onChangeCount(product: Product, element: any): void {
    const countProduct = element.target.value;
    const findProductIndex = this.products.findIndex(
      (item) => item._id === product._id
    );
    if (findProductIndex !== -1) {
      this.products[findProductIndex].count = Number(countProduct);
      this.updateFinalPrice();
    }
  }

  updateFinalPrice(): void {
    const countProduct = this.products.length && this.products.reduce((prevVal, curVal) => prevVal + curVal.count,0);
    console.log("countProduct", countProduct);
    this.finalPrice = this.products
      ?.map((product) => product.count * product.price)
      .map((product) => (product < 0 ? -1 * product : product))
      .reduce((prevVal, curVal) => prevVal + curVal, 0);

    this.cartService.setToLocalStorage("cart", JSON.stringify(this.products));
    this.cartService.setToLocalStorage("count", countProduct.toString());
    this.cartService.setCountCart(countProduct);
  }

  onRemoveProduct(product: Product): void {
    const findProductIndex = this.products.findIndex(
      (item) => item._id === product._id
    );
    if (findProductIndex !== -1) {
      this.products.splice(findProductIndex, 1);
      this.updateFinalPrice();
    }
  }

  onShowAddress(e: any): void {
    const value = e.target.value
    // console.log(value)
    this.userAddress = value
  }

  handleAddressSelected(address: string): void {
    this.pickUserAddress = address;
  }

}
