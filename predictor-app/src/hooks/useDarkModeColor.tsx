import { useColorModeValue } from '@chakra-ui/react';
import { chakraColor } from '../utils/theme';

const useDarkModeColor = () => {
  const colorToggleColor = useColorModeValue('gray.500', 'gray.300');
  const borderColor = useColorModeValue(
    chakraColor('gray', '200'),
    chakraColor('gray', '700')
  );
  const labelColor = useColorModeValue(
    chakraColor('gray', '600'),
    chakraColor('gray', '300')
  );
  const textInputColor = useColorModeValue(
    chakraColor('gray', '700'),
    chakraColor('gray', '300')
  );

  return {
    labelColor,
    colorToggleColor,
    borderColor,
    textInputColor,
  };
};

export default useDarkModeColor;
