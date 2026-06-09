import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
import { Patient } from "./services/patientService.types";

const dataFile = "db.json";

// Read data from JSON file
async function readData(): Promise<Patient[]> {
  try {
    const data = await fs.readFile(dataFile, { encoding: "utf-8" });
    return JSON.parse(data);
  } catch (err: unknown) {
    console.error(
      "Failed to read data:",
      err instanceof Error ? err.message : "Unknown error",
    );
    throw new Error("Error reading data file.");
  }
}

// Write data to JSON file
async function writeData(data: Patient[]): Promise<string> {
  try {
    await fs.writeFile(dataFile, JSON.stringify(data, null, 2));
    return "File written successfully!";
  } catch (error: unknown) {
    console.error(
      "Failed to write data:",
      error instanceof Error ? error.message : "Unknown error",
    );
    throw new Error("Error writing data file.");
  }
}

async function generateUniqueId() {
  return uuidv4();
}

export { readData, writeData, generateUniqueId };
