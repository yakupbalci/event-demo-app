import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { EventFilter, EventStatus } from '../../shared/models/Event';
import { EventService } from '../../shared/services/event.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { EventFormComponent } from './event-form/event-form';
import { EventStatusClassPipe } from '../../shared/pipes/event-status-class.pipe';
import { EventPersistenceService } from '../../shared/services/event-persistence.service';

@Component({
  selector: 'app-event-overview',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatChipsModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    EventStatusClassPipe,
  ],
  templateUrl: './event-overview.html',
  styleUrl: './event-overview.scss',
})
export class EventOverviewComponent {
  private eventService = inject(EventService);
  private eventPersistenceService = inject(EventPersistenceService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  filteredEvents = this.eventService.filteredEvents;
  currentFilters = signal<EventFilter>({});

  EventStatus = EventStatus;

  constructor() {
    this.currentFilters.set(this.eventService.filters());
  }

  openEventFormModal(): void {
    const dialogRef = this.dialog.open(EventFormComponent, {
      width: '37.5rem',
      maxWidth: '90vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.eventService.addEvent(result);
      }
    });
  }

  updateSearchTerm(searchTerm: string): void {
    this.currentFilters.update((filters) => ({
      ...filters,
      searchTerm,
    }));
    this.eventService.setFilters(this.currentFilters());
  }

  updateStatusFilter(status: EventStatus | undefined): void {
    this.currentFilters.update((filters) => ({
      ...filters,
      status,
    }));
    this.eventService.setFilters(this.currentFilters());
  }

  navigateToEventDetail(eventId: string): void {
    this.router.navigate(['/event', eventId]);
  }

  resetEvents(): void {
    this.eventPersistenceService.clearStorage();
    window.location.reload();
  }
}
