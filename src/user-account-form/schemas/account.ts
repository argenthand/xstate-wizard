import * as yup from 'yup';

export const accountSchema = yup.object({
  username: yup.string().required().notOneOf(['bhargav', 'aastha'], 'Username is already taken.'),
  email: yup.string().email().required(),
});
