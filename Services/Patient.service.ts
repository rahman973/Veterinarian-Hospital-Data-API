import { DynamoDB } from "aws-sdk";

import { patientTable, PatientSchema } from "../models/Patient";
import { randomBytes } from "crypto";

let options = {};

if (process.env.IS_OFFLINE) {
  options = {
    region: "us-east-1",
    endpoint: "http://localhost:9000",
  };
}

const documentClient = new DynamoDB.DocumentClient(options);
const tableName = "patients";

export const create = async (event) => {
  try {
    const UUID = randomBytes(16).toString("hex");
    const item: PatientSchema = { id: UUID, ...event, remainingBill: 0 };
    const dynamoTableItem = {
      TableName: tableName,
      Item: item,
    };
    await documentClient.put(dynamoTableItem).promise();
    return item;
  } catch (e) {
    console.log(e);
    throw new Error(e);
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

export const getPatient = async (patientId) => {
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
    const Item: PatientSchema = { id: patientId, ...patientData };
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
