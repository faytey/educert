import { Spinner, Center } from '@chakra-ui/react';

function LoadingOverlay() {
  return (
    <Center
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      backgroundColor="rgba(0, 0, 0, 0.5)" // Overlay background color
      zIndex="9999" // Adjust the z-index as needed
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Center>
  );
}

export default LoadingOverlay;