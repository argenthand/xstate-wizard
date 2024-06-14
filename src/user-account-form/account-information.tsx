import {SubmitHandler, useForm} from "react-hook-form";
import {AccountInformationInputs} from "./types";
import {yupResolver} from "@hookform/resolvers/yup";
import {accountSchema} from "./schemas/account.ts";

function AccountInformation({saveAccountInfo, resetForm, defaultValues}: {
  saveAccountInfo: (data: AccountInformationInputs) => void;
  resetForm: () => void;
  defaultValues: AccountInformationInputs;
}) {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm<AccountInformationInputs>({
    resolver: yupResolver(accountSchema),
    defaultValues
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
        <input type="submit" disabled={!!errors.email || !!errors.username} />
        <input type="button" value="Cancel" onClick={() => {
          resetForm();
        }} />
      </div>
    </form>
  );
}

export default AccountInformation;
