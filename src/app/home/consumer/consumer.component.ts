import { Component, OnInit } from '@angular/core';
import { ApiComponent } from 'src/app/api/api.component';
import { Product } from '../../products/product.model'

@Component({
  selector: 'app-consumer',
  templateUrl: './consumer.component.html',
  styleUrls: ['./consumer.component.css']
})
export class ConsumerComponent implements OnInit {
  usesGridView : boolean = true
  products : Product[] = []

  constructor(private api: ApiComponent) {}

  ngOnInit(): void {
    this.api.fetchAllProducts().subscribe(data => {this.products = data})
  }
}
