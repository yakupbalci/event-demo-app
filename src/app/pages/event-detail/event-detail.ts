import { Component, inject, signal, Signal } from '@angular/core';
import { EventData } from '../../shared/models/Event';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../shared/services/event.service';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { EventStatusClassPipe } from '../../shared/pipes/event-status-class.pipe';

@Component({
  selector: 'app-event-detail',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    EventStatusClassPipe,
  ],
  templateUrl: './event-detail.html',
  styleUrl: './event-detail.scss',
})
export class EventDetailComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);

  event: Signal<EventData | undefined> = signal(undefined);

  constructor() {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.event = this.eventService.getEventById(eventId);
    }
  }

  goBack(): void {
    this.router.navigate(['/event-overview']);
  }
}
