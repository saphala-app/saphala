export class ApiResponse<T = object> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;

  constructor(data: T, message = 'Success', statusCode: number = 200) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
