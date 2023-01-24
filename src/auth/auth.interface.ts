export default interface LoginResponse {
  statusCode: number;
  data: {
    token: string;
  };
}
