import { DynamoDB } from "aws-sdk";

import { Appointment, AppointmentSchema } from "../models/Appointment";
import {
  create,
  // deleteById,
  // getAll,
  // getById,
  // updateById,
} from "../Services/Appointment";

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "us-east-1",
    endpoint: "http://localhost:9000",
  };
}

export const createAppointment = async (event) => {
  try {
    const patientData: Appointment = JSON.parse(event.body);
    const item: AppointmentSchema = await create(patientData);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: "success inserted !",
        patient: item,
      }),
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: e.message,
      }),
    };
  }
};

// export const getAllPatient = async () => {
//   try {
//     const patients = await getAll();
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify({
//         patients,
//       }),
//     };
//     return response;
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify(e),
//     };
//   }
// };

// export const getPatientById = async (event) => {
//   try {
//     const patientId = event.pathParameters.patientId;
//     const patients = await getById(patientId);
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify({
//         patients,
//       }),
//     };
//     return response;
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify(e),
//     };
//   }
// };

// export const updatePatientById = async (event) => {
//   try {
//     const patientId = event.pathParameters.patientId;
//     const patientData: Appointment = JSON.parse(event.body);
//     const patients = await updateById(patientId, patientData);
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify({
//         patients,
//       }),
//     };
//     return response;
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify(e),
//     };
//   }
// };

// export const deletePatientById = async (event) => {
//   try {
//     const patientId = event.pathParameters.patientId;
//     const patients = await deleteById(patientId);
//     const response = {
//       statusCode: 200,
//       body: JSON.stringify({
//         patients,
//       }),
//     };
//     return response;
//   } catch (e) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify(e),
//     };
//   }
// };
