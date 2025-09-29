import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { EventPersistenceService } from './event-persistence.service';
import { EventData, EventFilter, EventStatus } from '../models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private persistenceService = inject(EventPersistenceService);

  private eventsSignal = signal<EventData[]>([]);
  public readonly events = this.eventsSignal.asReadonly();

  private filtersSignal = signal<EventFilter>({});
  public readonly filters = this.filtersSignal.asReadonly();

  public readonly filteredEvents = computed(() => {
    const events = this.eventsSignal();
    const filters = this.filtersSignal();

    return events.filter((event: EventData) => {
      if (filters.status && event.status !== filters.status) {
        return false;
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        return (
          event.title.toLowerCase().includes(searchLower) ||
          event.location.toLowerCase().includes(searchLower)
        );
      }

      return true;
    });
  });

  constructor() {
    this.loadPersistedData();
  }

  private loadPersistedData(): void {
    const persistedEvents = this.persistenceService.loadEvents();
    const persistedFilters = this.persistenceService.loadFilterState();

    if (persistedEvents.length > 0) {
      this.eventsSignal.set(persistedEvents);
    } else {
      // Mock-Daten laden wenn keine persistierten Daten vorhanden
      this.eventsSignal.set(this.getMockEvents());
    }

    this.filtersSignal.set(persistedFilters);
  }

  private getMockEvents(): EventData[] {
    return [
      {
        id: '1',
        title: 'Tech Conference 2025',
        date: new Date('2025-11-15'),
        location: 'Berlin, Deutschland',
        status: EventStatus.PLANNED,
        description: 'Eine große Technologiekonferenz mit internationalen Speakern.',
        maxParticipants: 500,
      },
      {
        id: '2',
        title: 'Sommerfest',
        date: new Date('2025-07-20'),
        location: 'München, Deutschland',
        status: EventStatus.PLANNED,
        description: 'Jährliches Sommerfest mit Live-Musik und Catering.',
        maxParticipants: 200,
      },
      {
        id: '3',
        title: 'Workshop: Angular Advanced',
        date: new Date('2024-12-10'),
        location: 'Hamburg, Deutschland',
        status: EventStatus.COMPLETED,
        description: 'Fortgeschrittener Angular Workshop für Entwickler.',
        maxParticipants: 30,
      },
      {
        id: '4',
        title: 'Weihnachtsfeier 2024',
        date: new Date('2024-12-20'),
        location: 'Köln, Deutschland',
        status: EventStatus.CANCELLED,
        description: 'Weihnachtsfeier wurde wegen Corona abgesagt.',
        maxParticipants: 100,
      },
    ];
  }

  getEventById(id: string): Signal<EventData | undefined> {
    return computed((): EventData | undefined =>
      this.eventsSignal().find((event: EventData) => event.id === id)
    );
  }

  addEvent(eventData: Omit<EventData, 'id'>): void {
    const newEvent: EventData = {
      ...eventData,
      id: this.generateId(),
    };

    this.eventsSignal.update((events: EventData[]) => [...events, newEvent]);
    this.persistenceService.saveEvents(this.eventsSignal());
  }

  setFilters(filters: EventFilter): void {
    this.filtersSignal.set(filters);
    this.persistenceService.saveFilterState(filters);
  }

  clearAllData(): void {
    this.persistenceService.clearStorage();
    this.eventsSignal.set([]);
    this.filtersSignal.set({});
  }

  private generateId(): string {
    return crypto.randomUUID();
  }
}
