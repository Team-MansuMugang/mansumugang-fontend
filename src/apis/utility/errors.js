/* eslint-disable no-unused-vars */

class ParametersValidationError extends Error {
  constructor(missingFields) {
    super(`Missing required fields: ${missingFields.join(', ')}`);
    this.name = this.constructor.name;
    this.missingFields = missingFields;
  }
}

class HttpResponseError extends Error {
  constructor(status, message) {
    super(`HTTP Error ${status}: ${message}`);
    this.name = this.constructor.name;
    this.status = status;
  }
}

class PasswordMismatchError extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
  }
}

class DuplicatedUsernameError extends Error {
  constructor() {
    super('Duplicated username');
    this.name = this.constructor.name;
  }
}

class DuplicatedNicknameError extends Error {
  constructor() {
    super('Duplicated username');
    this.name = this.constructor.name;
  }
}
