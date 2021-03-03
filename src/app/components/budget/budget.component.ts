import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Product } from '../../interfaces/products.interface';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BudgetComponent implements OnInit {

  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts()
      .subscribe(res => {
        this.productService.product = res as Product[];
      })
  }
}
