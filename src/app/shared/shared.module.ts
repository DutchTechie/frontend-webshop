import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
// import { BrowserModule } from '@angular/platform-browser';

/*

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective
  ],
  imports: [CommonModule],
  exports: [
    AlertComponent,
    LoadingSpinnerComponent,
    PlaceholderDirective,
    DropdownDirective,
    CommonModule
  ],
  entryComponents: [AlertComponent]
})
export class SharedModule {}

*/

@NgModule({
  declarations: [
    LoadingSpinnerComponent
  ],
  imports: [ CommonModule ],
  exports: [
    LoadingSpinnerComponent,
    CommonModule
  ]
})
export class SharedModule { }
