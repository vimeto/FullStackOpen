import patientEntries from '../../data/patients';
import { PatientEntry, PublicPatientEntry, NewPatientEntry, NewEntry, Entry } from '../types';
import uuid = require('uuid');

const getEntries = (): PatientEntry[] => {
  return patientEntries;
};

const getPublicEntries = (): PublicPatientEntry[] => {
  return patientEntries.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

const addEntry = () => {
  return null;
};

const findById = (id: string): PatientEntry | undefined => {
  const entry = patientEntries.find(p => p.id === id);
  return entry;
};

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
      id: uuid.v1(),
      entries: [],
      ...entry
    };
    patientEntries.push(newPatientEntry);
    return newPatientEntry;
  };

const addEntryToId = ( entry: NewEntry, id: PatientEntry['id'] ): Entry | undefined => {
  const newEntry = {
      id: uuid.v1(),
      ...entry
    };
    try {
      const index = patientEntries.map(p => p.id).indexOf(id);
      patientEntries[index].entries.push(newEntry);
      return newEntry;
    } catch (e: unknown) {
      return undefined;
    }
  };

export default {
  getEntries,
  getPublicEntries,
  addEntry,
  findById,
  addPatient,
  addEntryToId
};