import UniversityInfo from "./UniversityInfo";
import Campus from "../campus/Campus";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../config/axios";
import { toast } from "react-toastify";
import Major from "../major/Major";
import AdministrativeBoard from "../admin_board/AdministrativeBoard";

const UserUniversityDetail = () => {
  const { id: universityId } = useParams();
  const [university, setUniversity] = useState(null);

  const fetchUniversityData = async () => {
    try {
      const responses = await axios.get(`/university/${universityId}`);
      setUniversity(responses.data);
    } catch (error) {
      toast.error("Error fetching university data: " + error.message);
    }
  };
  useEffect(() => {
    fetchUniversityData();
  }, [universityId]);

  if (!university) return null;

  return (
    <div className="container mx-auto">
      <UniversityInfo university={university} />
      <Major />
      <AdministrativeBoard />
      <Campus />
    </div>
  );
};

export default UserUniversityDetail;
