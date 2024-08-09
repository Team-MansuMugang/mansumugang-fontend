export class ParametersValidationError extends Error {
  constructor(missingFields) {
    super(`필수 입력란 누락: ${missingFields.join(', ')}`);
    this.name = this.constructor.name;
    this.missingFields = missingFields;
  }
}

export class HttpResponseError extends Error {
  constructor(status, message) {
    super(`HTTP Error ${status}: ${message}`);
    this.name = this.constructor.name;
    this.status = status;
  }
}

export class NotValidRequestError extends Error {
  constructor(errorDescriptions) {
    super('유효하지 않은 요청.');
    this.name = this.constructor.name;
    this.errorDescriptions = errorDescriptions;
  }
}

export class PasswordMismatchError extends Error {
  constructor() {
    super('비밀번호와 비밀번호 확인 값이 일치하지 않음.');
    this.name = this.constructor.name;
  }
}

export class DuplicatedUsernameError extends Error {
  constructor() {
    super('사용자 ID가 중복됨.');
    this.name = this.constructor.name;
  }
}

export class DuplicatedNicknameError extends Error {
  constructor() {
    super('사용자 닉네임이 중복됨.');
    this.name = this.constructor.name;
  }
}

export class UserNotFoundError extends Error {
  constructor() {
    super('유저 정보를 찾을 수 없음.');
    this.name = this.constructor.name;
  }
}

export class PatientLoginNotAllowedError extends Error {
  constructor() {
    super('환자는 로그인할 수 없습니다.');
    this.name = this.constructor.name;
  }
}

export class NotValidAccessTokenError extends Error {
  constructor() {
    super('유효하지 않은 엑세스 토큰.');
    this.name = this.constructor.name;
  }
}

export class ExpiredAccessTokenError extends Error {
  constructor() {
    super('만료된 엑세스 토큰.');
    this.name = this.constructor.name;
  }
}

export class AccessDeniedError extends Error {
  constructor() {
    super('접근 권한 없음.');
    this.name = this.constructor.name;
  }
}

export class UserLocationInfoNotFoundError extends Error {
  constructor() {
    super('해당 유저에 대한 위치 정보가 없음.');
    this.name = this.constructor.name;
  }
}
