export interface CreateStudent {
  studentNo: string;
  fullName: string;
  email?: string | null;
}

export interface UpdateStudent extends Partial<CreateStudent> {}

export type StudentParams = { id: string };