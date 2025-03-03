import { Component, OnInit } from '@angular/core';
import { productList } from '../products/prducts.mock'
import { IProduct } from '../models/product.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit{

    productsList: IProduct[] = [];
    constructor(private _apiServide: ApiService) {} // Sirve par ainyectar servicios

    ngOnInit(): void {
      this._apiServide.getAllProducts().subscribe((data: IProduct[]) => {
        this.productsList = data;
      });
    }

}
