export interface EnrollStudent {
    studentId: string;
    groupId: string;
}

export interface ListEnrollmentsFilters {
    groupId?: string;
    studentId?: string;
    subjectId?: string;
}