import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popup } from "reactjs-popup";

const CampusList = ({ campuses, onAdd, onEdit, onDelete }) => {
  const onDeleteClick = (id) => {
    onDelete(id);
  };

  return (
    <div className="border p-4 rounded-md bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">Campuses</h2>
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Add campus
          </button>
        }
        modal
      >
        {(close) => <AddCampusForm onClose={close} onAdd={onAdd} />}
      </Popup>

      {campuses && campuses.length === 0 && <p>No campuses</p>}
      <ul className="list-disc pl-5">
        {campuses &&
          campuses.map((campus) => (
            <li key={campus.campus_id} className="mb-2">
              {campus.campus_name} - {campus.campus_address}
              <Popup
                trigger={
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                }
                modal
              >
                {(close) => (
                  <EditCampusForm
                    campus={campus}
                    onClose={close}
                    onEdit={onEdit}
                  />
                )}
              </Popup>
              <button
                onClick={() => onDeleteClick(campus.campus_id)}
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

const AddCampusForm = ({ onClose, onAdd }) => {
  const { register, handleSubmit, errors = {} } = useForm();

  const onSubmit = (data) => {
    onAdd(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Campus name</label>
        <input
          type="text"
          {...register("campus_name", { required: true })}
          className="border p-2 w-full"
        />
        {errors.campus_name && (
          <p className="text-red-500">Campus name is required</p>
        )}
      </div>
      <div className="mt-4">
        <label>Address</label>
        <input
          type="text"
          {...register("campus_address", { required: true })}
          className="border p-2 w-full"
        />
        {errors.campus_address && (
          <p className="text-red-500">Address is required</p>
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

const EditCampusForm = ({ onClose, onEdit, campus }) => {
  const {
    register,
    handleSubmit,
    errors = {},
  } = useForm({
    defaultValues: campus,
  });

  const onSubmit = (data) => {
    onEdit(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Campus name</label>
        <input
          type="text"
          {...register("campus_name", { required: true })}
          defaultValue={campus.campus_name}
          className="border p-2 w-full"
        />
        {errors.campus_name && (
          <p className="text-red-500">Campus name is required</p>
        )}
      </div>
      <div className="mt-4">
        <label>Address</label>
        <input
          type="text"
          {...register("campus_address", { required: true })}
          defaultValue={campus.campus_address}
          className="border p-2 w-full"
        />
        {errors.campus_address && (
          <p className="text-red-500">Address is required</p>
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Edit
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

export default CampusList;
