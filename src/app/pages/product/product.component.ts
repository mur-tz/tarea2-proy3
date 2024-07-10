import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { IProduct } from '../../interfaces';
import { ProductService } from '../../services/product.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductFormComponent } from '../../components/product/product-form/product-form.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductListComponent,
    LoaderComponent,
    ModalComponent
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent{
  public productsList: IProduct[] = [];
  public service = inject(ProductService);

  constructor(){
    this.service.getAll();
  }

}
