import { Box } from "@chakra-ui/react";
const UniversityInfo = ({ university }) => {
  return (
    <Box
      className="p-4 m-4 bg-white rounded-md shadow-md"
      borderWidth="1px"
      borderColor="gray.200"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">
        Thông tin chi tiết
      </h2>
      <div className="flex justify-start items-center gap-6">
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
    </Box>
  );
};

export default UniversityInfo;
