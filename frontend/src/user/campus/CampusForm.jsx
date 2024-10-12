import { useForm } from "react-hook-form";
import { Flex, Button } from "@chakra-ui/react";
import { tw } from "twind";
import CustomFormControl from "../../components/CustomFormControl";
function CampusForm({ onSubmit, onCancel, defaultValue }) {
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
        label={"Tên"}
        register={register}
        registerName={"campus_name"}
        placeholder={"Tên"}
        errors={errors}
      />

      <CustomFormControl
        label={"Địa chỉ"}
        register={register}
        registerName={"campus_address"}
        placeholder={"Địa chỉ"}
        errors={errors}
      />
      <Flex className={tw`justify-end`}>
        <Button
          type="button"
          onClick={onCancel}
          className={tw`px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
        >
          Hủy
        </Button>
        <Button
          type="submit"
          className={tw`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300`}
        >
          Lưu
        </Button>
      </Flex>
    </form>
  );
}

export default CampusForm;
