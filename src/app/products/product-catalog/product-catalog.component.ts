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
  cartline = {productName: '', consumerName: ''}

  // TODO: Make the api injectable so you only need to instantiate it here
  // and the childeren component can use the same instance
  constructor(private api: ApiComponent) { }

  ngOnInit(): void {}

  onProductSelect(product) {
    this.productSelected.emit({name: product.name, 
      description: product.description, 
      imagePath: product.imagePath})
  }

  onAddToCart(product) {
    this.cartline.consumerName = "dummy"
    this.cartline.productName = product.name
    alert(`${this.cartline.consumerName} ${this.cartline.productName}`)

    // TODO: Get the current consumer's id or guest and add the product to cart
    
  }
}
