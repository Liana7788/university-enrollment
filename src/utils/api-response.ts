export type ApiResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T; // optional
};

export function success<T>(message: string, data?: T): ApiResponse<T> {
  return {
    success: true,
    message,
    ...(data !== undefined ? { data } : {}),
  };
}

export function fail(message: string, code?: string, details?: any) {
  return {
    success: false,
    message,
    ...(code ? { error: code } : {}),
    ...(details !== undefined ? { details } : {}),
  };
}