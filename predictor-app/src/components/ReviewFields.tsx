import _ from 'lodash';
import React, { createRef, useState } from 'react';
import {
  Button,
  Input,
  FormControl,
  InputGroup,
  InputRightElement,
  FormLabel,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaTimes } from 'react-icons/fa';
import Form from './Form';
import { chakraColor } from '../utils/theme';

const ReviewFields = ({ results, onSubmit, isLoading, reviewsRef }: Props) => {
  const [, setRefresher] = useState<boolean>(false);
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

  return (
    <Stack
      rowGap={2}
      width={_.size(results) ? '50%' : '100%'}
      transition={'all 0.3s ease-in-out'}
      border={`1px solid ${borderColor}`}
      borderRadius={10}
      h={'100%'}
      p={5}
    >
      <Form
        flexDirection={'column'}
        onSubmit={onSubmit}
        h={'100%'}
        display={'flex'}
      >
        <Stack rowGap={2} flex={1} mb={4} maxH={'90%'} overflow={'auto'}>
          {_.map(reviewsRef.current, (review, index) => (
            <FormControl isRequired key={`Review-${index}`}>
              <FormLabel color={labelColor}>Review</FormLabel>
              <InputGroup>
                <Input
                  placeholder={`Review ${+index + 1}`}
                  ref={review}
                  title={`Review ${+index + 1}`}
                  color={textInputColor}
                  required
                />
                <InputRightElement>
                  <Button
                    onClick={() => {
                      if (reviewsRef.current.length <= 1) return;

                      reviewsRef.current.splice(index, 1);
                      setRefresher((curr) => !curr);
                    }}
                  >
                    <FaTimes />
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          ))}
        </Stack>
        <Stack rowGap={2}>
          <Button onClick={onSubmit} isLoading={isLoading} type={'submit'}>
            Predict!
          </Button>
          <Button
            onClick={() => {
              reviewsRef.current.push(createRef<HTMLInputElement>());
              setRefresher((curr) => !curr);
            }}
            disabled={isLoading}
          >
            Add new reviews to predict
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
};

type Props = {
  results: TLR.PredictionResponse;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  isLoading: boolean;
  reviewsRef: React.MutableRefObject<React.RefObject<HTMLInputElement>[]>;
};

export default ReviewFields;
