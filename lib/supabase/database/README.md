# Supabase Datenbank Setup

Dieses Verzeichnis enthält alle SQL-Skripte, die für die Einrichtung der Supabase-Datenbank benötigt werden.

## 📁 Dateistruktur

- `00_schema.sql`: Grundlegende Tabellendefinitionen
- `01_policies.sql`: Row Level Security (RLS) Policies
- `02_functions.sql`: Datenbank-Funktionen (RPCs)

## 🚀 Installation

1. Öffne den SQL Editor in deinem Supabase Dashboard
2. Führe die Skripte in der nummerierten Reihenfolge aus

## 📋 Enthaltene Features

### Tabellen

- `profile`: Flexible Benutzerprofiltabelle mit JSONB-Feldern für Erweiterbarkeit

### Sicherheit

- Row Level Security (RLS) für alle Tabellen
- Sichere Policies für CRUD-Operationen
- `SECURITY DEFINER` Funktionen für sichere Datenbankoperationen

### Automatisierung

- Automatische Profilerstellung für neue Benutzer
- Automatische `updated_at` Aktualisierung
- Soft Delete Unterstützung

### Funktionen

- `get_user_profile`: Profil mit Auth-Daten abrufen
- `update_user_profile`: Profil aktualisieren/erstellen
- `soft_delete_user_profile`: Profil "soft" löschen
- `restore_user_profile`: Gelöschtes Profil wiederherstellen

## 🔄 Erweiterung

### Neue Tabelle hinzufügen

1. Füge die Tabellendefinition in `00_schema.sql` hinzu
2. Erstelle entsprechende Policies in `01_policies.sql`
3. Füge benötigte Funktionen in `02_functions.sql` hinzu

### Neue Funktion hinzufügen

1. Füge die Funktion in `02_functions.sql` hinzu
2. Vergiss nicht `GRANT EXECUTE` für die entsprechenden Rollen

## 🔒 Sicherheitshinweise

- Verwende immer RLS Policies
- Nutze `SECURITY DEFINER` für sensitive Operationen
- Überprüfe Benutzerberechtigungen in Funktionen
- Verwende parametrisierte Queries (kein String Concatenation)

## 📚 Nützliche Befehle

```sql
-- Alle Tabellen anzeigen
SELECT * FROM pg_catalog.pg_tables
WHERE schemaname = 'public';

-- Alle Policies anzeigen
SELECT * FROM pg_policies
WHERE schemaname = 'public';

-- Alle Funktionen anzeigen
SELECT * FROM pg_catalog.pg_proc
WHERE pronamespace::regnamespace::text = 'public';
```
