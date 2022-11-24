import _ from 'lodash';
import React from 'react';
import {
  Button,
  Flex,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { RESULT } from '../utils/constant';
import useDarkModeColor from '../hooks/useDarkModeColor';

const ReviewResult = ({
  results,
  setResults,
  setIsInField,
  reviews,
}: Props) => {
  const isInMd = useBreakpointValue({
    base: false,
    md: true,
  });
  const { borderColor, labelColor } = useDarkModeColor();

  return (
    <Stack
      rowGap={2}
      width={_.size(results) ? (isInMd ? '50%' : '100%') : '100%'}
      transition={'all 0.3s ease-in-out'}
      border={`1px solid ${borderColor}`}
      borderRadius={10}
      h={'100%'}
      p={5}
    >
      <Flex h={'100%'} display={'flex'} flexDirection={'column'}>
        <Stack rowGap={2} flex={1} mb={4} maxH={'90%'} overflow={'auto'}>
          {_.map(reviews, (review, index) => (
            <Stack
              key={`Result-${index}`}
              gap={1}
              border={`1px solid ${borderColor}`}
              p={3}
              borderRadius={10}
            >
              <Text fontWeight={'bold'} color={labelColor}>
                {review}
              </Text>
              <Text color={labelColor}>
                {RESULT[results[`result${+index + 1}`]] ?? ''}
              </Text>
            </Stack>
          ))}
        </Stack>
        <Stack rowGap={2}>
          <Button
            onClick={() => {
              setResults({});
              setIsInField(true);
            }}
          >
            Clean Results
          </Button>
        </Stack>
      </Flex>
    </Stack>
  );
};

type Props = {
  setResults: React.Dispatch<React.SetStateAction<TLR.PredictionResponse>>;
  setIsInField: React.Dispatch<React.SetStateAction<boolean>>;
  results: TLR.PredictionResponse;
  reviews: string[];
};

export default ReviewResult;
