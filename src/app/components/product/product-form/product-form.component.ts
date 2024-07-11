import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ICategory, IProduct } from '../../../interfaces';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  @Input() product: IProduct = {};
  @Input() categoryList: ICategory[] = [];
  @Input() action = '';
  @Output() callParentEvent: EventEmitter<IProduct> = new EventEmitter<IProduct>();

  callEvent(){
    this.callParentEvent.emit(this.product);
  }

}
