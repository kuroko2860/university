import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Popup } from "reactjs-popup";

const AdministrativeBoardsList = ({
  administrativeBoards,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const onDeleteClick = (id) => {
    onDelete(id);
  };

  return (
    <div className="border p-4 rounded-md bg-white shadow-md">
      <h2 className="text-xl font-semibold mb-2">Administrative Boards</h2>
      <Popup
        trigger={
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4">
            Add Administrative Board
          </button>
        }
        modal
      >
        {(close) => (
          <AddAdministrativeBoardForm onClose={close} onAdd={onAdd} />
        )}
      </Popup>

      {administrativeBoards && administrativeBoards.length === 0 && (
        <p>No administrative boards</p>
      )}
      <ul className="list-disc pl-5">
        {administrativeBoards &&
          administrativeBoards.map((item) => (
            <li key={item.board_id} className="mb-2">
              {item.board_name} - {item.board_position}
              <Popup
                trigger={
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                }
                modal
              >
                {(close) => (
                  <EditAdministrativeBoardForm
                    item={item}
                    onClose={close}
                    onEdit={onEdit}
                  />
                )}
              </Popup>
              <button
                onClick={() => onDeleteClick(item.board_id)}
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

const AddAdministrativeBoardForm = ({ onClose, onAdd }) => {
  const { register, handleSubmit, errors = {} } = useForm();

  const onSubmit = (data) => {
    onAdd(data);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Board Name</label>
        <input
          type="text"
          {...register("board_name", { required: true })}
          className="border p-2 w-full"
        />
        {errors.board_name && (
          <p className="text-red-500">Board name is required</p>
        )}
      </div>
      <div className="mt-4">
        <label>Board Position</label>
        <input
          type="text"
          {...register("board_position", { required: true })}
          className="border p-2 w-full"
        />
        {errors.board_position && (
          <p className="text-red-500">Board position is required</p>
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

const EditAdministrativeBoardForm = ({ onClose, onEdit, item }) => {
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
        <label>Board Name</label>
        <input
          type="text"
          {...register("board_name", { required: true })}
          defaultValue={item.board_name}
          className="border p-2 w-full"
        />
        {errors.board_name && (
          <p className="text-red-500">Board name is required</p>
        )}
      </div>
      <div className="mt-4">
        <label>Board Position</label>
        <input
          type="text"
          {...register("board_position", { required: true })}
          defaultValue={item.board_position}
          className="border p-2 w-full"
        />
        {errors.board_position && (
          <p className="text-red-500">Board position is required</p>
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

export default AdministrativeBoardsList;
