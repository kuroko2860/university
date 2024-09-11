const UniversityDetail = ({
  university,
  campuses,
  trainingMajors,
  leaders,
}) => {
  return (
    <div className="space-y-4">
      <UniversityInfo university={university} />
      <CampusList campuses={campuses} />
      <TrainingMajorList trainingMajors={trainingMajors} />
      <LeaderList leaders={leaders} />
    </div>
  );
};

const UniversityInfo = ({ university }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold">{university.name}</h2>
      <p>{university.address}</p>
      <p>{university.phone}</p>
      <p>{university.email}</p>
    </div>
  );
};

const CampusList = ({ campuses }) => {
  return (
    <div className="space-y-4">
      {campuses.map((item) => (
        <div key={item.id} className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p>{item.address}</p>
        </div>
      ))}
    </div>
  );
};

const TrainingMajorList = ({ trainingMajors }) => {
  return (
    <div className="space-y-4">
      {trainingMajors.map((item) => (
        <div key={item.id} className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p>{item.group}</p>
        </div>
      ))}
    </div>
  );
};

const LeaderList = ({ leaders }) => {
  return (
    <div className="space-y-4">
      {leaders.map((item) => (
        <div key={item.id} className="p-4 bg-white shadow-md rounded-md">
          <h2 className="text-xl font-semibold">{item.name}</h2>
          <p>{item.position}</p>
        </div>
      ))}
    </div>
  );
};

export default UniversityDetail;
