import { Pipe, PipeTransform } from '@angular/core';
import { EventStatus } from '../models/Event';

@Pipe({
  name: 'eventStatusClass',
  standalone: true,
})
export class EventStatusClassPipe implements PipeTransform {
  transform(status: EventStatus): string {
    switch (status) {
      case EventStatus.PLANNED:
        return 'planned';
      case EventStatus.CANCELLED:
        return 'cancelled';
      case EventStatus.COMPLETED:
        return 'completed';
      default:
        return 'planned';
    }
  }
}
