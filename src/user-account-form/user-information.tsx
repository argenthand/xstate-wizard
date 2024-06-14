import {SubmitHandler, useForm} from "react-hook-form";
import {UserInformationInputs} from "./types";
import {yupResolver} from "@hookform/resolvers/yup";
import {userSchema} from "./schemas/user.ts";

function UserInformation({saveUserInfo, goToAccountInfo, defaultValues}: {
  saveUserInfo: (data: UserInformationInputs) => void;
  goToAccountInfo: () => void;
  defaultValues: UserInformationInputs;
}) {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<UserInformationInputs>({
    resolver: yupResolver(userSchema),
    defaultValues
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
        <input placeholder="11/16/1993" type="date" {...register("dateOfBirth")} />
        {errors.dateOfBirth && <span>{errors.dateOfBirth?.message}</span>}
      </div>

      <div>
        <input type="submit" disabled={!!errors.firstName || !!errors.lastName || !!errors.dateOfBirth} />
        <input type="button" value="Back" onClick={goToAccountInfo} />
      </div>
    </form>
  );
}

export default UserInformation;
