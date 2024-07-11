
import { Component, inject } from '@angular/core';
import { ProductListComponent } from '../../components/product/product-list/product-list.component';
import { LoaderComponent } from '../../components/loader/loader.component';
import { ICategory, IProduct } from '../../interfaces';
import { ProductService } from '../../services/product.service';
import { ModalComponent } from '../../components/modal/modal.component';
import { ProductFormComponent } from '../../components/product/product-form/product-form.component';
import { CategoryService } from '../../services/category.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ProductListComponent,
    LoaderComponent,
    ModalComponent,
    ProductFormComponent,
    CommonModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent{
  public productsList: IProduct[] = [];
  public categoryService: CategoryService = inject(CategoryService);
  public productService: ProductService = inject(ProductService);
  public route: ActivatedRoute = inject(ActivatedRoute);
  public areActionsAvailable: boolean = false;
  public authService: AuthService = inject(AuthService);
  public routeAuthorities: string[] = [];
  public categoryList: ICategory[] = [];

  constructor() {
    this.productService.getAll();
    this.categoryService.getAll();
  }

  ngOnInit():void {
    this.categoryService.getAll();
    this.productService.getAll();
    this.route.data.subscribe(data => {
      this.routeAuthorities = data['authorities'] ? data['authorities'] : [];
      this.areActionsAvailable = this.authService.areActionsAvailable(this.routeAuthorities);
    })
  }

  handleFormAction(product: IProduct){
    // product.category = {...this.categoryService.find(product.category?.id)};
    this.productService.save(product);
  }

}
