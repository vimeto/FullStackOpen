"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patients_1 = __importDefault(require("../../data/patients"));
const uuid = require("uuid");
const getEntries = () => {
    return patients_1.default;
};
const getPublicEntries = () => {
    return patients_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
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
const findById = (id) => {
    const entry = patients_1.default.find(p => p.id === id);
    return entry;
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ id: uuid.v1(), entries: [] }, entry);
    patients_1.default.push(newPatientEntry);
    return newPatientEntry;
};
const addEntryToId = (entry, id) => {
    const newEntry = Object.assign({ id: uuid.v1() }, entry);
    try {
        const index = patients_1.default.map(p => p.id).indexOf(id);
        patients_1.default[index].entries.push(newEntry);
        return newEntry;
    }
    catch (e) {
        return undefined;
    }
};
exports.default = {
    getEntries,
    getPublicEntries,
    addEntry,
    findById,
    addPatient,
    addEntryToId
};
