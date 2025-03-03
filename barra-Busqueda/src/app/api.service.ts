import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category, IProduct } from './models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl: string = 'https://fakestoreapi.com/products';

  constructor(private _httpClient: HttpClient) { }

  public getAllProducts(): Observable<IProduct[]> { // Devuelve UN ARRAY de productos
    return this._httpClient.get<IProduct[]>(this.baseUrl);
  }

  public getProductById(id: number | string ): Observable<IProduct> { // Devuelve UN producto por id
    return this._httpClient.get<IProduct>(`${this.baseUrl}/${id}`);
  }


  public getAllProductsByCategory(): Observable<Category[]> { // Devuelve UN ARRAY de categorias
    return this._httpClient.get<Category[]>(`${this.baseUrl}/category`);
  }

  public newProduct(product: IProduct): Observable<IProduct> { // Crea UN nuevo producto  
    return this._httpClient.post<IProduct>(`${this.baseUrl}`, product);

  }

  public updateProduct(product: IProduct): Observable<IProduct> { // Actualiza UN producto
    return this._httpClient.put<IProduct>(`${this.baseUrl}/${product.id}`, product);
  } 

  public deleteProduct(id: number | string): Observable<IProduct> { // Elimina UN producto
    return this._httpClient.delete<IProduct>(`${this.baseUrl}/${id}`);
  } 
}
