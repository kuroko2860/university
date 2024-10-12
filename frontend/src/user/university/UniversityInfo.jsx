const UniversityInfo = ({ university }) => {
  return (
    <div className="flex justify-start items-center p-4 bg-white rounded-md shadow-md border border-gray-300">
      <div className="mr-8">
        {university.logo ? (
          <img
            src={university.logo}
            alt="University Logo"
            style={{
              width: "200px",
              height: "200px",
              objectFit: "contain",
            }}
          />
        ) : (
          <p>Logo không khả dụng</p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-bold text-2xl text-gray-700 leading-tight">
          {university.name}
        </p>
        {/* <p className="text-sm text-gray-600">Id: {university.id}</p> */}
        <p className="text-sm text-gray-600">Địa chỉ: {university.address}</p>
        <p className="text-sm text-gray-600">
          Số điện thoại: {university.phone}
        </p>
        <p className="text-sm text-gray-600">Email: {university.email}</p>
        <p className="text-sm text-gray-600">Website: {university.website}</p>
        <p className="text-sm text-gray-600">Fax: {university.fax}</p>
      </div>
    </div>
  );
};

export default UniversityInfo;
