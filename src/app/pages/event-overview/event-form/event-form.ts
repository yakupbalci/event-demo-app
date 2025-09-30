import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { EventStatus } from '../../../shared/models/Event';
import { EventService } from '../../../shared/services/event.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-event-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './event-form.html',
  styleUrl: './event-form.scss',
})
export class EventFormComponent {
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private dialogRef = inject(MatDialogRef<EventFormComponent>);

  eventForm: FormGroup;
  eventStatusEnum = EventStatus;

  constructor() {
    this.eventForm = this.createForm();
  }

  onSubmit(): void {
    if (this.eventForm.valid) {
      const formValue = this.eventForm.value;
      const eventData = {
        title: formValue.title,
        date: new Date(formValue.date),
        location: formValue.location,
        status: formValue.status,
        description: formValue.description || undefined,
        maxParticipants: formValue.maxParticipants || undefined,
      };

      this.eventService.addEvent(eventData);
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    this.eventForm.reset();
    this.dialogRef.close();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', [Validators.required, this.futureDateValidator]],
      location: ['', [Validators.required]],
      status: [EventStatus.PLANNED, [Validators.required]],
      description: [''],
      maxParticipants: ['', [Validators.min(1)]],
    });
  }

  private futureDateValidator(control: FormControl): ValidationErrors | null {
    if (!control.value) return null;

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate > today ? null : { futureDate: true };
  }
}
