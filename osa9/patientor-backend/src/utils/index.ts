import { NewPatientEntry, NewEntry } from "../types";
import { Gender, HealthCheckRating } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param); // eslint-disable-line @typescript-eslint/no-unsafe-argument
};
const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param); // eslint-disable-line @typescript-eslint/no-unsafe-argument
};
const parseRating = (rating: unknown): HealthCheckRating => {
  if (!String(rating) || !isRating(Number(rating))) {
    throw new Error('Incorrect or missing rating: ' + rating);
  }
  return Number(rating);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toNewPatientEntry = (object: any): NewPatientEntry => {
  const newEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseName(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseName(object.occupation)
  };
  return newEntry;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntryEntry = (object: any): NewEntry => {
  switch (object.type) {
    case 'Hospital': {
      const newEntry: NewEntry = {
        description: parseName(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        type: 'Hospital',
        discharge: {
          date: parseDate(object.discharge.date),
          criteria: parseName(object.discharge.criteria)
        }
      };
      if (object.diagnoseCodes) {
        newEntry.diagnosisCodes = object.diagnoseCodes //eslint-disable-line
      }
      return newEntry;
    }
    case 'OccupationalHealthcare': {
      const newEntry: NewEntry = {
        description: parseName(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        type: 'OccupationalHealthcare',
        employerName: parseName(object.employerName),
        sickLeave: {
          startDate: parseDate(object.sickLeave.startDate),
          endDate: parseDate(object.sickLeave.endDate)
        }
      };
      if (object.diagnoseCodes) {
        newEntry.diagnosisCodes = object.diagnoseCodes //eslint-disable-line
      }
      return newEntry;
    }
    case 'HealthCheck': {
      const newEntry: NewEntry = {
        description: parseName(object.description),
        date: parseDate(object.date),
        specialist: parseName(object.specialist),
        type: 'HealthCheck',
        healthCheckRating: parseRating(object.healthCheckRating)
      };
      if (object.diagnoseCodes) {
        newEntry.diagnosisCodes = object.diagnoseCodes //eslint-disable-line
      }
      return newEntry;
    }
    default:
      throw new Error('Wrong type!');
  }
};

export default toNewPatientEntry;