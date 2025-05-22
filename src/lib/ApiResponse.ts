export class ApiResponse {
  success: boolean
  statusCode: number
  message: string
  data: any

  constructor(data: any, message = "Success", statusCode: number = 200) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}
