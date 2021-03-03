import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  product: Product[];

  constructor(public https: HttpClient) { }

  getProducts() {
    return this.https.get('https://blackisp.herokuapp.com/products');
  }
}
