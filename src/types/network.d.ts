interface ApiResponseType<T> {
  statusCode: number;
  message: string;
  data?: T;
}
