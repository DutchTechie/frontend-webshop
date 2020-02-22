import { Component, OnInit } from '@angular/core';
import { Product } from '../../products/product.model'
import { ApiComponent } from 'src/app/api/api.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentProduct = {name: "No product select", description: "", imagePath: ""}
  products: Product[] = []

  constructor(private api:ApiComponent) { }

  ngOnInit(): void {
    this.fetchAllProducts()
  }

  onProductSelected(product) {
    this.currentProduct = product
  }
  
  fetchAllProducts() {
    this.api.fetchAllProducts().subscribe(data => {
      this.products = data})
  }

  deleteAllProducts() {
    this.api.deleteProduct().subscribe(data => this.products = [])
  }
}