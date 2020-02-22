import { ApiComponent } from 'src/app/api/api.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-create-form',
  templateUrl: './product-create-form.component.html',
  styleUrls: ['./product-create-form.component.css']
})
export class ProductCreateFormComponent implements OnInit {
  newProductName = ""
  newProductDescription = ""
  newProductImageUrl = ""

  constructor(private api: ApiComponent) { }

  ngOnInit(): void {}

  createNewProduct() {
    this.api.addNewProduct(this.newProductName, 
      this.newProductDescription,
      this.newProductImageUrl).subscribe(data => console.log(data))
  }
}