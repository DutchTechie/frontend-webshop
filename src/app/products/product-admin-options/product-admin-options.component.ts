import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-product-admin-options',
  templateUrl: './product-admin-options.component.html',
  styleUrls: ['./product-admin-options.component.css']
})
export class ProductAdminOptionsComponent implements OnInit {
  @Input() product: {name: string, description:string, imagePath : string}

  constructor() { }

  ngOnInit(): void {}

}
