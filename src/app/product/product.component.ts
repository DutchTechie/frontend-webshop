import { Component, OnInit } from '@angular/core';
import { NgForm, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  isUpdateMode = true

  constructor() {}

  onSwitchMode() {
      this.isUpdateMode = !this.isUpdateMode
  }

  onSubmit(form: NgForm) {
      if (!form.valid) {
          return
      }
      console.log("Hello world!")
  }
}
