class ApiResponse {
  constructor(status, data, message) {
    this.success = status < 400;
    this.data = data;
    this.message = message;
  }
}

export { ApiResponse };
