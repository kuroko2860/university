import { Input, FormLabel, FormControl } from "@chakra-ui/react";
import { tw } from "twind";

function CustomFormControl({
  label,
  register,
  registerName,
  placeholder,
  errors,
}) {
  return (
    <FormControl className={tw`space-y-2`}>
      <FormLabel className={tw`text-sm font-medium text-gray-700`}>
        {label}
      </FormLabel>
      <Input
        className={tw`block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300`}
        {...register(registerName, { required: true })}
        placeholder={placeholder}
      />
      {errors[registerName] && (
        <div className={tw`text-xs text-red-600`}>{label} là bắt buộc</div>
      )}
    </FormControl>
  );
}

export default CustomFormControl;
