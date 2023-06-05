import { Component, OnInit } from "@angular/core";
import { ShopService } from "src/app/services/shop.service";
import { Product, Shop } from "src/app/Shop";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  shops: Shop[] = [];
  error: string = "";
  products: Product[] = [];
  activeProduct = 0
  activeShop = ''

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getAllShops();
  }

  getAllShops(): void {
    this.shopService.getAllShops().subscribe(
      (data: Shop[]) => {
        this.shops = data;
        this.products = data[this.activeProduct].products;
        this.activeShop = data[this.activeProduct].name;
      },
      (error: any) => {
        this.error =
          "An error occurred while fetching shops. Please try again later.";
        console.error(error);
      }
    );
  }

  onShowProducts(shop: Shop): void {
    this.products = shop.products;
    this.activeShop = shop.name;
  }
}
