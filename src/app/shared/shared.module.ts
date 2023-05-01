import { NgModule } from '@angular/core';
import { AlertModalComponent } from './alert-modal/alert-modal.component';
import { ConfirmBoxComponent } from './confirm-box/confirm-box.component';
import { DropDownDirective } from './directives/dropdown.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    AlertModalComponent,
    DropDownDirective,
    PlaceholderDirective,
    ConfirmBoxComponent,
  ],
  imports: [CommonModule],
  exports: [
    LoadingSpinnerComponent,
    AlertModalComponent,
    DropDownDirective,
    PlaceholderDirective,
    ConfirmBoxComponent,
    CommonModule,
  ],
})
export class SharedModule {}
