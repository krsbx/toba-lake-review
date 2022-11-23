import _ from 'lodash';
import React, { createRef, useRef, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import {
  Button,
  Flex,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import axios from './utils/axios';
import ReviewFields from './components/ReviewFields';
import ReviewResult from './components/ReviewResult';
import { chakraColor } from './utils/theme';

function App() {
  const reviewsRef = useRef<React.RefObject<HTMLInputElement>[]>([createRef()]);
  const [results, setResults] = useState<TLR.PredictionResponse>({});
  const [reviews, setReviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { colorMode, toggleColorMode } = useColorMode();
  const colorToggleColor = useColorModeValue('gray.500', 'gray.300');
  const labelColor = useColorModeValue(
    chakraColor('gray', '200'),
    chakraColor('gray', '700')
  );

  const onSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    setResults({});

    e.preventDefault();

    const reviews = _.compact(
      _.map(reviewsRef.current, (review) => {
        review = review as React.MutableRefObject<HTMLInputElement>;

        if (!review.current) return;

        return review.current.value;
      })
    );

    try {
      const { data: results } = await axios.post<TLR.PredictionResponse>(
        '/predicts',
        {
          reviews,
        }
      );
      setReviews(reviews);
      setResults(results);
    } catch {
      setResults({});
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack width={'100vw'} height={'100vh'}>
      <Flex
        justifyContent={'center'}
        alignItems={'center'}
        position={'relative'}
        p={5}
      >
        <Text
          fontSize={25}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          transition={'all ease-in-out 0.3s'}
          _hover={{
            textShadow: `0px 0px 20px ${labelColor}`,
          }}
          cursor={'pointer'}
        >
          Toba Lake Review Prediction
        </Text>
        <Button
          onClick={toggleColorMode}
          variant={'ghost'}
          color={colorToggleColor}
          position={'absolute'}
          right={5}
        >
          <Flex gap={2} alignItems={'center'}>
            {colorMode === 'dark' ? <FaSun /> : <FaMoon />}
            <Text>{colorMode === 'dark' ? 'Dark' : 'Light'}</Text>
          </Flex>
        </Button>
      </Flex>
      <Stack
        width={'100%'}
        height={'100%'}
        px={5}
        pb={5}
        overflow={'auto'}
        spacing={4}
        direction={'row'}
      >
        <ReviewFields
          isLoading={isLoading}
          onSubmit={onSubmit}
          results={results}
          reviewsRef={reviewsRef}
        />
        {_.size(results) && (
          <ReviewResult
            setResults={setResults}
            reviews={reviews}
            results={results}
          />
        )}
      </Stack>
    </Stack>
  );
}

export default App;
