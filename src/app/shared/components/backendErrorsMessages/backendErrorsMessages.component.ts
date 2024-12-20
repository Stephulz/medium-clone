import {Component, Input} from '@angular/core';
import {BackendErrorsInterface} from '../../types/backendErrors.interface';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'mc-backend-errors-messages',
  templateUrl: 'backendErrorsMessages.component.html',
  standalone: true,
  imports: [CommonModule],
})
export class BackendErrorsMessages {
  @Input() backendErrors: BackendErrorsInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name].join(' ');
      return `${name}: ${messages}`;
    });
  }
}
