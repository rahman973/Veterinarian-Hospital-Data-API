import { DynamoDB } from "aws-sdk";

import { Patient, PatientSchema } from "../models/Patient";
import {
  create,
  deleteById,
  getAll,
  getPatient,
  updateById,
} from "../Services/Patient.service";

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "us-east-1",
    endpoint: "http://localhost:9000",
  };
}

export const createPatient = async (event) => {
  try {
    const patientData: Patient = JSON.parse(event.body);
    const item: PatientSchema = await create(patientData);
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
      body: JSON.stringify(e),
    };
  }
};

export const getAllPatient = async () => {
  try {
    const patients = await getAll();
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        patients,
      }),
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

export const getPatientById = async (event) => {
  try {
    const patientId = event.pathParameters.patientId;
    const patients = await getPatient(patientId);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        patients,
      }),
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

export const updatePatientById = async (event) => {
  try {
    const patientId = event.pathParameters.patientId;
    const patientData: Patient = JSON.parse(event.body);
    const patients = await updateById(patientId, patientData);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        patients,
      }),
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};

export const deletePatientById = async (event) => {
  try {
    const patientId = event.pathParameters.patientId;
    const patients = await deleteById(patientId);
    const response = {
      statusCode: 200,
      body: JSON.stringify({
        patients,
      }),
    };
    return response;
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
