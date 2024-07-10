export class ParametersValidationError extends Error {
  constructor(missingFields) {
    super(`Missing required fields: ${missingFields.join(', ')}`);
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

export class PasswordMismatchError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}

export class DuplicatedUsernameError extends Error {
  constructor() {
    super('Duplicated username');
    this.name = this.constructor.name;
  }
}

export class DuplicatedNicknameError extends Error {
  constructor() {
    super('Duplicated username');
    this.name = this.constructor.name;
  }
}
