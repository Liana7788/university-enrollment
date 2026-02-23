export type CreateSubjectBody = {
  name: string;
  code: string;
};

export type UpdateSubjectBody = {
  name?: string;
  code?: string;
};

export type SubjectParams = { id: string };