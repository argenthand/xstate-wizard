import * as yup from 'yup';

export const userSchema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.date()
    .max(new Date(new Date().setFullYear(new Date().getFullYear() - 18)),
      'You must be at least 18 years old.').required(),
});
