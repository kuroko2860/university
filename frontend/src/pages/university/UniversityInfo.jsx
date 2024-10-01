import { Box, Heading, Text } from "@chakra-ui/react";
const UniversityInfo = ({ university }) => {
  return (
    <Box
      className="p-4 bg-white rounded-md shadow-md"
      borderWidth="1px"
      borderColor="gray.200"
    >
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
      <Heading
        as="h2"
        size="lg"
        fontWeight="semibold"
        className="font-medium leading-tight"
      >
        {university.name}
      </Heading>
      <Text className="text-sm text-gray-600">Id: {university.id}</Text>
      <Text className="text-sm text-gray-600">
        Địa chỉ: {university.address}
      </Text>
      <Text className="text-sm text-gray-600">SĐT: {university.phone}</Text>
      <Text className="text-sm text-gray-600">Fax: {university.fax}</Text>
      <Text className="text-sm text-gray-600">Email: {university.email}</Text>
      <Text className="text-sm text-gray-600">
        Website: {university.website}
      </Text>
    </Box>
  );
};

export default UniversityInfo;
