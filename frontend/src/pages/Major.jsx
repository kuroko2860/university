import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popup } from "reactjs-popup";

const MajorsList = ({ majors, onAdd, onEdit, onDelete }) => {
  const onDeleteClick = (id) => {
    onDelete(id);
  };

  return (
    <div className="border p-4 rounded-md bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">Majors</h2>
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Add major
          </button>
        }
        modal
      >
        {(close) => <AddMajorForm onClose={close} onAdd={onAdd} />}
      </Popup>

      {majors && majors.length === 0 && <p>No majors</p>}
      <ul className="list-disc pl-5">
        {majors &&
          majors.map((item) => (
            <li key={item.major_id} className="mb-2">
              {item.major_name} - {item.major_group}
              <Popup
                trigger={
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                }
                modal
              >
                {(close) => (
                  <EditMajorForm item={item} onClose={close} onEdit={onEdit} />
                )}
              </Popup>
              <button
                onClick={() => onDeleteClick(item.major_id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </li>
          ))}
      </ul>
      <ToastContainer />
    </div>
  );
};

const AddMajorForm = ({ onClose, onAdd }) => {
  const { register, handleSubmit, errors = {} } = useForm();

  const onSubmit = (data) => {
    onAdd(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Major name</label>
        <input
          type="text"
          {...register("major_name", { required: true })}
          className="border p-2 w-full"
        />
        {errors.major_name && (
          <p className="text-red-500">Major name is required</p>
        )}
      </div>
      <div className="mt-4">
        <label>Major group</label>
        <input
          type="text"
          {...register("major_group", { required: true })}
          className="border p-2 w-full"
        />
        {errors.major_group && (
          <p className="text-red-500">Major group is required</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add
      </button>
      <button
        onClick={onClose}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

const EditMajorForm = ({ onClose, onEdit, item }) => {
  const {
    register,
    handleSubmit,
    errors = {},
  } = useForm({
    defaultValues: item,
  });

  const onSubmit = (data) => {
    onEdit(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Major name</label>
        <input
          type="text"
          {...register("major_name", { required: true })}
          defaultValue={item.major_name}
          className="border p-2 w-full"
        />
        {errors.major_name && (
          <p className="text-red-500">Major name is required</p>
        )}
      </div>
      <div className="mt-4">
        <label>Major group</label>
        <input
          type="text"
          {...register("major_group", { required: true })}
          defaultValue={item.major_group}
          className="border p-2 w-full"
        />
        {errors.major_group && (
          <p className="text-red-500">Major group is required</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Save
      </button>
      <button
        onClick={onClose}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Cancel
      </button>
    </form>
  );
};

export default MajorsList;
