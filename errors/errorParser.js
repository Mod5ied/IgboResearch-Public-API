export class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
  static badRequest(errMessage) {
    return new ApiError(400, errMessage);
  }
  static unauthorizedRequest(errMessage) {
    return new ApiError(401, errMessage);
  }
  static accessDeniedRequest(errMessage) {
    return new ApiError(403, errMessage);
  }
  static notFoundRequest(errMessage) {
    return new ApiError(404, errMessage);
  }
  static notAvailableRequest(errMessage) {
    return new ApiError(410, errMessage);
  }
  static internalError(errMessage) {
    return new ApiError(500, errMessage);
  }
  static methodNotImplemented(errMessage) {
    return new ApiError(501, errMessage);
  }
}
