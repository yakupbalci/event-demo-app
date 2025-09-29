export interface EventData {
  id: string;
  title: string;
  date: Date;
  location: string;
  status: EventStatus;
  description?: string;
  maxParticipants?: number;
}

export enum EventStatus {
  PLANNED = 'geplant',
  CANCELLED = 'abgesagt',
  COMPLETED = 'erledigt',
}

export interface EventFilter {
  status?: EventStatus;
  searchTerm?: string;
}
