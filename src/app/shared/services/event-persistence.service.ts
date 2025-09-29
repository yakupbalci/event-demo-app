import { Injectable } from '@angular/core';
import { EventData, EventFilter } from '../models/Event';

@Injectable({
  providedIn: 'root',
})
export class EventPersistenceService {
  private readonly EVENTS_KEY = 'event-management-events';
  private readonly FILTERS_KEY = 'event-management-filters';

  saveEvents(events: EventData[]): void {
    try {
      // Dates zu Strings konvertieren für JSON
      const eventsToSave = events.map((event) => ({
        ...event,
        date: event.date.toISOString(),
      }));
      localStorage.setItem(this.EVENTS_KEY, JSON.stringify(eventsToSave));
    } catch (error) {
      console.error('Fehler beim Speichern der Events:', error);
    }
  }

  loadEvents(): EventData[] {
    try {
      const stored = localStorage.getItem(this.EVENTS_KEY);
      if (!stored) return [];

      const parsedEvents = JSON.parse(stored);
      // Strings zurück zu Dates konvertieren
      return parsedEvents.map((event: EventData) => ({
        ...event,
        date: new Date(event.date),
      }));
    } catch (error) {
      console.error('Fehler beim Laden der Events:', error);
      return [];
    }
  }

  saveFilterState(filters: EventFilter): void {
    try {
      localStorage.setItem(this.FILTERS_KEY, JSON.stringify(filters));
    } catch (error) {
      console.error('Fehler beim Speichern der Filter:', error);
    }
  }

  loadFilterState(): EventFilter {
    try {
      const stored = localStorage.getItem(this.FILTERS_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.error('Fehler beim Laden der Filter:', error);
      return {};
    }
  }

  clearStorage(): void {
    localStorage.removeItem(this.EVENTS_KEY);
    localStorage.removeItem(this.FILTERS_KEY);
  }
}
