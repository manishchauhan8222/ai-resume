// src/service/localStorageService.js
const STORAGE_KEY = "resumes";

export const getAllResumes = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getResumeById = (id) => {
  const resumes = getAllResumes();
  return resumes.find((resume) => resume.id === id);
};

export const updateResume = (id, newData) => {
  let resumes = getAllResumes();
  resumes = resumes.map((resume) =>
    resume.id === id ? { ...resume, ...newData } : resume
  );
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  return getResumeById(id);
};

export const createResume = (resume) => {
  const resumes = getAllResumes();
  const newResume = { id: Date.now().toString(), ...resume };
  resumes.push(newResume);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
  return newResume;
};

export const deleteResume = (id) => {
  const resumes = getAllResumes().filter((resume) => resume.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};
