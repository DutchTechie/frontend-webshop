import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  updatedImagePath = new Subject<string>();

  constructor() { }
}
