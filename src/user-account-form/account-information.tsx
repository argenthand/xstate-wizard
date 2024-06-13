import {SubmitHandler, useForm} from "react-hook-form";
import {AccountInformationInputs} from "./types";
import * as yup from 'yup';
import {yupResolver} from "@hookform/resolvers/yup";

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
});

function AccountInformation({saveAccountInfo}: {saveAccountInfo: (data: AccountInformationInputs) => void}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AccountInformationInputs>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "thesilverhand",
      email: "feedback@thesilverhand.blog",
    }
  });

  const onSubmit: SubmitHandler<AccountInformationInputs> = (data) => saveAccountInfo(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <input placeholder="johndoe" {...register("username")} />
        {errors.username && <span>{errors.username?.message}</span>}
      </div>

      <div>
        <input placeholder="john.doe@example.com" type="email" {...register("email")} />
        {errors.email && <span>{errors.email?.message}</span>}
      </div>

      <div>
        <input type="submit" />
        <input type="reset" />
      </div>
    </form>
  );
}

export default AccountInformation;
