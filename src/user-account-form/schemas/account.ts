import * as yup from 'yup';

export const accountSchema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
});
