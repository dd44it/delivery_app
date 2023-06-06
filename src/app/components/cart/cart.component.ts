import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Shop';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: 'cart.component.html'
})
export class CartComponent implements OnInit {
  products: Product[] = []

  constructor(private cartService: CartService){}

  ngOnInit(): void {
    this.products = this.cartService.getCart()
    console.log(this.products)
    
  }

}
