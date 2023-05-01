import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.css'],
})
export class ConfirmBoxComponent {
  @Input() message: string;
  @Output() response = new EventEmitter<boolean>();

  onConfirm() {
    this.response.emit(true);
  }

  onCancel() {
    this.response.emit(false);
  }
}
