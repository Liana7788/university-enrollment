export type CreateGroupInput = {
  subjectId: string;
  title: string;
  dayOfWeek: number;  // 1..7
  startTime: string;  // "HH:MM"
  endTime: string;    // "HH:MM"
  capacity: number;   // > 0
};

export type UpdateGroupInput = Partial<Omit<CreateGroupInput, "subjectId">> & {
  subjectId?: string;
};

export type GroupParams = { id: string };