import { Injectable, signal, inject } from '@angular/core';
import { BaseService } from './base-service';
import { ICategory } from '../interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService<ICategory>{
  protected override source:string = 'category';
  private categorySignal = signal<ICategory[]>([]);
  private snackBar: MatSnackBar = inject(MatSnackBar);

  get categories$() {
    return this.categorySignal;
  }

  public getAll(){
    this.findAll().subscribe({
      next: (response: any) => {
        this.categorySignal.set(response);
      },
      error: (error: any) => {
        console.error("Error in retrieve all categories: ", error);
        this.snackBar.open(error.error.description, 'Close', {
          horizontalPosition: "right",
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      }
    })
  }

  public save (category: ICategory) {
    this.add(category).subscribe({
      next: (response: any) => {
        this.categorySignal.update((categories: ICategory[]) => [response, ...categories]);
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

  public update(category: ICategory) {
    this.add(category).subscribe({
      next: () => {
        const updatedCategories = this.categorySignal().map(nCategory => category.id === nCategory.id ? category: nCategory);
        this.categorySignal.set(updatedCategories);
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

  public delete(category: ICategory) {
    this.del(category.id).subscribe({
      next: () => {
        this.categorySignal.set(this.categorySignal().filter(nCategory => nCategory.id != category.id));
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
