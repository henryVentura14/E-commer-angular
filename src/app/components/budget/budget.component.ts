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
  public total:any;
  public list:any;

  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProducts();
  }

  optionCurrency = { style: 'currency', currency: 'USD' };
  formatCurrency = new Intl.NumberFormat('en-US', this.optionCurrency);


  getProducts() {
    this.productService.getProducts()
      .subscribe(res => {
        this.productService.product = res as Product[];
        this.list = this.productService.product .map(item => ({
          price: Math.floor(item.price)
        }));
         this.total = this.list.reduce((prev, next) => prev + next.price, 0);
      })
  }
}
