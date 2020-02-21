import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentProduct = {name: "No product select", description: "", imagePath: ""}
  title = 'frontend';

  constructor() { }

  ngOnInit(): void {
  }

  onProductSelected(product) {
    this.currentProduct = product
  }
}