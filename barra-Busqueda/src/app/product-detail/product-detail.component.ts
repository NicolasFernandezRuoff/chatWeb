import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { IProduct } from '../models/product.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product-detail',
  standalone: false,
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {

  constructor(private _route: ActivatedRoute, private _apiServide: ApiService) { }
  producto ?: IProduct;
  productList: IProduct[] = [];
  loading: boolean = true;
  color ?: string;

  // .params Sirve para acceder a los paramentros de url ejemplo /products/:productId
  // .suscribe() es un método que se utiliza para observar los cambios en los parámetros de la URL

  ngOnInit(): void {
    this._route.params.subscribe({
      next: (params: Params) => {
        this._apiServide.getProductById(Number(params['productId'])).subscribe({
          next: (data: IProduct) => {
            this.producto = data;
            this.color = this.producto?.price! < 500 ? 'green' : 'red';
            this.loading = false;
          },
          error: (error: any) => {
            console.log(error);
            this.loading = false;
          }
        });
      },
      error: (error: any) => {
        console.log('Error en la ruta', error);
      }
    });
  }
}