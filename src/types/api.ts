// Manejar estados de la conexion de una api
export interface ApiErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}