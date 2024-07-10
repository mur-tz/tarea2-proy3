
import { Component, Input } from '@angular/core';
import { IProduct } from '../../../interfaces';
import { ProductFormComponent } from '../product-form/product-form.component';
import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    ProductFormComponent,
    ModalComponent
  ],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent{
  @Input() productsList: IProduct[] = [];
  public selectedProduct: IProduct = {};

  showDetail(product: IProduct, modal: any){
    this.selectedProduct = {...product};
    modal.show();
  }
}
