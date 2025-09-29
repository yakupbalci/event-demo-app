# Event Demo App

Event-Verwaltungssystem mit Angular 20 und Angular Material.

## Überblick

### Features

- Eventliste
- Filter nach Status
- Neues Event hinzufügen
- Event Detailübersicht
- Simulierter Service mit Mock-Daten

### Bonus

- Datenpersistenz
- (Suche nach Titel oder Ort)

## Setup

### Voraussetzungen

- Node.js v20.19.0+
- npm v10.8.2+

### Installation und Start

```bash
npm install
ng serve
```

## Bekannte Einschränkungen

### LocalStorage

- Speicher begrenzt auf 5-10 MB
- Daten nur lokal, keine Sync zwischen Geräten
- Private/Incognito Modus löscht Daten nach Session

### Performance

- Keine Virtualisierung oder Pagination
- Bei >1000 Events kann Performance leiden
