import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ModalComponent } from '../../modal/modal.component';
import { ICategory, IProduct } from '../../../interfaces';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductFormComponent,
    ModalComponent,
    CommonModule
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent{
  @Input() productsList: IProduct [] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedProduct: IProduct = {};
  public productService: ProductService = inject(ProductService);
  public categoryService: CategoryService = inject(CategoryService);
  public categoryList: ICategory[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areActionsAvailable']){
      console.log("are actions available: ", this.areActionsAvailable);
    }
  }
  showDetailModal(product: IProduct, modal: any){
    this.selectedProduct = {...product};
    modal.show();
  }

  handleFormAction(product: IProduct) {
    this.productService.update(product);
  }

  deleteProduct(product: IProduct) {
    this.productService.delete(product);
  }
}
