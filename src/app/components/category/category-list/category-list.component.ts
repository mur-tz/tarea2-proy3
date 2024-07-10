import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CategoryFormComponent } from '../category-form/category-form.component';
import { ModalComponent } from '../../modal/modal.component';
import { ICategory } from '../../../interfaces';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-list',
  standalone: true,
  imports: [
    CategoryFormComponent,
    ModalComponent
  ],
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss'
})
export class CategoryListComponent {
  @Input() categoryList: ICategory[] = [];
  @Input() areActionsAvailable: boolean = false;
  public selectedCategory: ICategory= {};
  public categoryService: CategoryService = inject(CategoryService);

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['areActionsAvailable']) {
      console.log("areActionsAvailable", this.areActionsAvailable);
    }
  }

  showDetailModal(category: ICategory, modal: any) {
    this.selectedCategory = {...category};
    modal.show();
  }

  handleFormAction(category: ICategory) {
    this.categoryService.update(category);
  }

  deleteCategory(category: ICategory) {
    this.categoryService.delete(category);
  }
}
