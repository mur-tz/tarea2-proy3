import { ProductComponent } from './../pages/product/product.component';
import { Injectable, signal, inject } from '@angular/core';
import { IProduct } from '../interfaces';
import { BaseService } from './base-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService<IProduct>{
  protected override source:string = 'products'
  private productsListSignal = signal<IProduct[]>([]);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  get products$() {
    return this.productsListSignal;
  }

  public getAll() {
    this.findAll().subscribe({
      next: (response: any) => {
        this.productsListSignal.set(response)
      },
      error: (error: any) => {
        console.error("Error in retrieve all products: ", error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: "right",
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

  public save(product: IProduct) {
    this.add(product).subscribe({
      next: (response: any) => {
        this.productsListSignal.update((products: IProduct[]) => [response, ...products]);
      },
      error: (error: any) => {
        console.error("response ", error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: "right",
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

  public update(product: IProduct) {
    this.add(product).subscribe({
      next: () => {
        const updatedCategories = this.productsListSignal().map(nProduct => nProduct.id === product.id ? product: nProduct);
        this.productsListSignal.set(updatedCategories);
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

  public delete(product:IProduct) {
    this.del(product.id).subscribe({
      next: () => {
        this.productsListSignal.set(this.productsListSignal().filter(nProduct => nProduct.id != product.id));
      },
      error: (error: any) => {
        console.error('response', error.description);
        this.snackBar.open(error.error.description, 'Close' , {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }



}
