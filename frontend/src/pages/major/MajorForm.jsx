import { useForm } from "react-hook-form";
import { Flex, Button } from "@chakra-ui/react";
import { tw } from "twind";
import CustomFormControl from "../../components/CustomFormControl";
function MajorForm({ onSubmit, onCancel, defaultValue, majorGroups }) {
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
      <CustomFormControl
        label={"Name"}
        register={register}
        registerName={"major_name"}
        placeholder={"Name"}
        errors={errors}
      />

      <label className="block">
        Group:
        <select
          {...register("group_id", { required: true })}
          className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Select group</option>
          {majorGroups &&
            Object.entries(majorGroups).map(([group_id, group_name]) => (
              <option
                key={group_id}
                value={group_id}
                defaultValue={group_id === defaultValue.group_id}
              >
                {group_name}
              </option>
            ))}
        </select>
      </label>
      <CustomFormControl
        label={"Quota"}
        register={register}
        registerName={"major_quota"}
        placeholder={"Quota"}
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
}

export default MajorForm;
