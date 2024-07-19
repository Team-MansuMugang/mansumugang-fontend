import { ParametersValidationError } from './errors.js';

export const validateParameters = (params, requiredFields = []) => {
  const missingFields = requiredFields.filter((field) => !(field in params));

  if (missingFields.length > 0) throw new ParametersValidationError(missingFields);
};

// export const validateParameters = (params, requiredFields = []) => {
//   const missingFields = requiredFields.filter((field) => !params[field]);

//   if (missingFields.length > 0) throw new ParametersValidationError(missingFields);
// };
