import {useForm, SubmitHandler} from "react-hook-form";
import {UserInformationInputs} from "./types";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  dateOfBirth: yup.date().default(() => new Date()).required(),
});

function UserInformation({saveUserInfo}: {saveUserInfo: (data: UserInformationInputs) => void}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<UserInformationInputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<UserInformationInputs> = (data) => saveUserInfo(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="John" {...register("firstName")} />
        {errors.firstName && <span>{errors.firstName?.message}</span>}
      </div>

      <div>
        <input placeholder="Doe" {...register("lastName")} />
        {errors.lastName && <span>{errors.lastName?.message}</span>}
      </div>

      <div>
        <input placeholder="11/16/1993" {...register("dateOfBirth")} />
        {errors.dateOfBirth && <span>{errors.dateOfBirth?.message}</span>}
      </div>

      <div>
        <input type="submit" />
        <input type="reset" />
      </div>
    </form>
  );
}

export default UserInformation;
