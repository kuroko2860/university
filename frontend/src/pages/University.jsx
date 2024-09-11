import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Popup } from "reactjs-popup";
const UniversityForm = ({ onSubmit, onCancel, defaultValue }) => {
  const {
    register,
    handleSubmit,
    formState: { errors = {} },
  } = useForm({
    defaultValues: defaultValue,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          {...register("name", { required: true })}
        />
        {errors.name && <div className="text-danger">Name is required</div>}
      </div>

      <div className="form-group">
        <label htmlFor="address">Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          {...register("address", { required: true })}
        />
        {errors.address && (
          <div className="text-danger">Address is required</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          {...register("phone", { required: true })}
        />
        {errors.phone && <div className="text-danger">Phone is required</div>}
      </div>

      <div className="form-group">
        <label htmlFor="fax">Fax</label>
        <input
          type="text"
          className="form-control"
          id="fax"
          {...register("fax", { required: true })}
        />
        {errors.fax && <div className="text-danger">Fax is required</div>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          className="form-control"
          id="email"
          {...register("email", { required: true })}
        />
        {errors.email && <div className="text-danger">Email is required</div>}
      </div>

      <div className="form-group">
        <label htmlFor="website">Website</label>
        <input
          type="text"
          className="form-control"
          id="website"
          {...register("website", { required: true })}
        />
        {errors.website && (
          <div className="text-danger">Website is required</div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="logo">Logo</label>
        <input
          type="text"
          className="form-control"
          id="logo"
          {...register("logo", { required: true })}
        />
        {errors.logo && <div className="text-danger">Logo is required</div>}
      </div>

      <div className="text-right">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </div>
    </form>
  );
};

const UniversityTable = ({ universities, onEdit, onDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Address</th>
          <th>Phone</th>
          <th>Fax</th>
          <th>Email</th>
          <th>Website</th>
          <th>Logo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {universities.map((university) => (
          <tr key={university.id}>
            <td>{university.name}</td>
            <td>{university.address}</td>
            <td>{university.phone}</td>
            <td>{university.fax}</td>
            <td>{university.email}</td>
            <td>{university.website}</td>
            <td>{university.logo}</td>
            <td>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => onEdit(university)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => onDelete(university.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
const University = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingUniversity, setEditingUniversity] = useState(null);
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await axios.get("/universities");
        setUniversities(response.data);
      } catch (error) {
        toast.error("Error fetching universities: " + error.message);
      }
    };
    fetchUniversities();
  }, []);

  const handleAddClick = () => {
    setEditingUniversity(null);
    setShowForm(true);
  };

  const handleEditClick = (university) => {
    setEditingUniversity(university);
    setShowForm(true);
  };

  const handleSubmit = async (university) => {
    try {
      if (editingUniversity) {
        await axios.put(`/universities/${editingUniversity.id}`, university);
      } else {
        await axios.post("/universities", university);
      }
      setShowForm(false);
      setUniversities(
        universities.map((u) =>
          u.id === (editingUniversity?.id || university.id) ? university : u
        )
      );
    } catch (error) {
      toast.error("Error submitting university: " + error.message);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`/universities/${id}`);
      setUniversities(universities.filter((u) => u.id !== id));
    } catch (error) {
      toast.error("Error deleting university: " + error.message);
    }
  };

  return (
    <div>
      <h1>Universities</h1>
      <button onClick={handleAddClick}>Add University</button>
      <Popup open={showForm} onClose={() => setShowForm(false)} modal nested>
        <UniversityForm
          defaultValue={editingUniversity}
          onSubmit={handleSubmit}
        />
      </Popup>
      <UniversityTable
        universities={universities}
        onEditClick={handleEditClick}
        onDeleteClick={handleDeleteClick}
      />
    </div>
  );
};

export default University;
