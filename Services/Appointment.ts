import { DynamoDB } from "aws-sdk";

import { Appointment, AppointmentSchema } from "../models/Appointment";
import { randomBytes } from "crypto";
import { getPatient } from "./Patient.service";

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "us-east-1",
    endpoint: "http://localhost:9000",
  };
}

const documentClient = new DynamoDB.DocumentClient(options);
const tableName = "appointments";

export const create = async (event) => {
  try {
    const patientId = event.patientId;
    let patient = await getPatient(patientId);
    if (!Object?.keys(patient)?.length) {
      throw new Error("patient not found");
    }
    const UUID = randomBytes(16).toString("hex");
    const item: AppointmentSchema = { id: UUID, ...event };
    const dynamoTableItem = {
      TableName: tableName,
      Item: item,
    };
    await documentClient.put(dynamoTableItem).promise();
    return item;
  } catch (e) {
    console.log(e);
    throw new Error(e.message);
  }
};

export const getAll = async () => {
  try {
    const params = {
      TableName: tableName,
    };
    const data = await documentClient.scan(params).promise();
    return data.Items || [];
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const getById = async (patientId) => {
  try {
    const params = {
      TableName: tableName,
      Key: {
        id: patientId,
      },
    };
    const data = await documentClient.get(params).promise();
    return data;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const updateById = async (patientId, patientData) => {
  try {
    const Item: AppointmentSchema = { id: patientId, ...patientData };
    const dynamoTableItem = {
      TableName: tableName,
      Item: Item,
    };
    await documentClient.put(dynamoTableItem).promise();
    return Item;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
export const deleteById = async (patientId) => {
  try {
    const dynamoTableItem = {
      TableName: tableName,
      Key: {
        id: patientId,
      },
    };
    await documentClient.delete(dynamoTableItem).promise();
    return true;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
