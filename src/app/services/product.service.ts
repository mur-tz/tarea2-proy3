import { Injectable, signal } from '@angular/core';
import { IProduct } from '../interfaces';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct>{
  protected override source:string = 'products'
  private productsListSignal = signal<IProduct[]>([]);

  get products$() {
    return this.productsListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.productsListSignal.set(response)
      },
      error: (error: any) => {
        console.error("Error in request: ", error);
      }
    })
  }
}
