type patientType = "cat" | "dog" | "bird";

export interface Appointment {
  patientId: string;
  startTime: Date;
  endTime: Date;
  description: String;
}

export interface AppointmentSchema extends Appointment {
  id: string;
}

export interface AppointmentTable {
  TableName: string;
  Item: AppointmentSchema;
}
