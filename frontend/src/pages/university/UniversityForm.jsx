import { useForm } from "react-hook-form";
import { Flex, Button, Input, FormLabel, FormControl } from "@chakra-ui/react";
import { tw } from "twind";
import CustomFormControl from "../../components/CustomFormControl";

const UniversityForm = ({ onSubmit, onCancel, defaultValue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm({
    defaultValues: defaultValue,
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={tw`space-y-2 shadow-lg bg-white p-8 max-h-screen overflow-auto`}
    >
      <FormControl
        className={tw`space-y-2`}
        isDisabled={defaultValue ? true : false}
      >
        <FormLabel className={tw`text-sm font-medium text-gray-700`}>
          ID
        </FormLabel>
        <Input
          className={tw`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
          {...register("id", { required: true })}
          placeholder="University id"
        />
        {errors.id && (
          <div className={tw`text-xs text-red-600`}>ID is required</div>
        )}
      </FormControl>
      <CustomFormControl
        label={"Name"}
        register={register}
        registerName={"name"}
        placeholder={"Name"}
        errors={errors}
      />

      <CustomFormControl
        label={"Address"}
        register={register}
        registerName={"address"}
        placeholder={"Address"}
        errors={errors}
      />

      <CustomFormControl
        label={"Email"}
        register={register}
        registerName={"email"}
        placeholder={"Email"}
        errors={errors}
      />

      <CustomFormControl
        label={"Website"}
        register={register}
        registerName={"website"}
        placeholder={"Website"}
        errors={errors}
      />

      <CustomFormControl
        label={"phone"}
        register={register}
        registerName={"phone"}
        placeholder={"phone"}
        errors={errors}
      />

      <CustomFormControl
        label={"Fax"}
        register={register}
        registerName={"fax"}
        placeholder={"Fax"}
        errors={errors}
      />

      <CustomFormControl
        label={"Logo"}
        register={register}
        registerName={"logo"}
        placeholder={"Logo"}
        errors={errors}
      />

      <Flex className={tw`justify-end`}>
        <Button
          type="button"
          onClick={onCancel}
          className={tw`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className={tw`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300`}
        >
          Save
        </Button>
      </Flex>
    </form>
  );
};

export default UniversityForm;
