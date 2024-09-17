import { Box, Heading, Text } from "@chakra-ui/react";
const UniversityInfo = ({ university }) => {
  return (
    <Box
      className="p-4 bg-white rounded-md shadow-md"
      borderWidth="1px"
      borderColor="gray.200"
    >
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
        Address: {university.address}
      </Text>
      <Text className="text-sm text-gray-600">Phone: {university.phone}</Text>
      <Text className="text-sm text-gray-600">Fax: {university.fax}</Text>
      <Text className="text-sm text-gray-600">Email: {university.email}</Text>
      <Text className="text-sm text-gray-600">
        Website: {university.website}
      </Text>
      <Text className="text-sm text-gray-600">Logo: {university.logo}</Text>
    </Box>
  );
};

export default UniversityInfo;
