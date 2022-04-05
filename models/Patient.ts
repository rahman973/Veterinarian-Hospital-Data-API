type patientType = "cat" | "dog" | "bird";

export interface Patient {
  petName: String;
  type: patientType;
  owner: {
    name: String;
    address: String;
    phone: number;
  };
  remainingBill: number;
}

export interface PatientSchema extends Patient {
  id: String;
}

export interface patientTable {
  TableName: String;
  Item: PatientSchema;
}
