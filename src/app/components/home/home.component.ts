import { Component, OnInit } from "@angular/core";
import { ShopService } from "src/app/services/shop.service";
import { Shop } from "src/app/Shop";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  shops: Shop[] = [];
  error: string = "";

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.getAllShops();
  }

  getAllShops(): void {
    this.shopService.getAllShops().subscribe(
      (data: Shop[]) => {
        this.shops = data;
        console.log(this.shops);
      },
      (error: any) => {
        this.error =
          "An error occurred while fetching shops. Please try again later.";
        console.error(error);
      }
    );
  }
}
