import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentProduct = {name: "No product select", description: "", imagePath: ""}
  title = 'frontend';

  onProductSelected(event) {
    console.log(event)
    this.currentProduct = event

    // Update the details component
  }
}
