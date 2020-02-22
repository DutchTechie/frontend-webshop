import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ApiComponent } from 'src/app/api/api.component';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  @Input() gridView : boolean
  @Input() products : Product[]
  @Output() productSelected = new EventEmitter<{name: string, description: string, imagePath: string}>();

  constructor(private api: ApiComponent) { }

  ngOnInit(): void {}

  onProductSelect(product) {
    this.productSelected.emit({name: product.name, 
      description: product.description, 
      imagePath: product.imagePath})
  }
}
