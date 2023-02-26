import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Tooltip,
  VStack,
} from '@chakra-ui/react';
import React, { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { MainSkills, MultiSelectOptions, SubSkills } from '../../../constants';
import ReactSelect from 'react-select';
import makeAnimated from 'react-select/animated';

interface Props {
  setSteps: Dispatch<SetStateAction<number>>;
  setSkills: Dispatch<SetStateAction<MultiSelectOptions[]>>;
  setSubSkills: Dispatch<SetStateAction<MultiSelectOptions[]>>;
  subSkills: MultiSelectOptions[];
  skills: MultiSelectOptions[];
}
export const CreateGrantsBasic = ({
  setSkills,
  setSteps,
  setSubSkills,
  skills,
  subSkills,
}: Props) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm();
  const animatedComponents = makeAnimated();
  return (
    <>
      <VStack pb={10} color={'gray.500'} pt={7} align={'start'} w={'2xl'}>
        <form
          onSubmit={handleSubmit((e) => {
            setSteps(3);
          })}
          style={{ width: '100%' }}
        >
          <FormControl mb={5} w="full" isRequired>
            <Flex>
              <FormLabel
                color={'gray.400'}
                fontWeight={600}
                fontSize={'15px'}
                htmlFor={'title'}
              >
                Opportunity Title
              </FormLabel>
              <Tooltip
                placement="right-end"
                fontSize="0.9rem"
                padding="0.7rem"
                bg="#6562FF"
                color="white"
                fontWeight={600}
                borderRadius="0.5rem"
                hasArrow
                w="max"
                label={`Who will respond to questions about the opportunity from your team?`}
              >
                <Image
                  mt={-2}
                  src={'/assets/icons/info-icon.svg'}
                  alt={'Info Icon'}
                />
              </Tooltip>
            </Flex>

            <Input
              id="title"
              placeholder="Develop a new landing page"
              {...register('title')}
            />
            <FormErrorMessage>
              {errors.title ? <>{errors.title.message}</> : <></>}
            </FormErrorMessage>
          </FormControl>

          <FormControl w="full" isRequired>
            <Flex align={'center'} justify={'start'}>
              <FormLabel
                color={'gray.400'}
                fontWeight={600}
                fontSize={'15px'}
                htmlFor={'title'}
              >
                Point of Contact
              </FormLabel>
              <Tooltip
                placement="right-end"
                fontSize="0.9rem"
                padding="0.7rem"
                bg="#6562FF"
                color="white"
                fontWeight={600}
                borderRadius="0.5rem"
                hasArrow
                w="max"
                label={`Who will respond to questions about the opportunity from your team?`}
              >
                <Image
                  mt={-2}
                  src={'/assets/icons/info-icon.svg'}
                  alt={'Info Icon'}
                />
              </Tooltip>
            </Flex>
            <Input
              id="handle"
              placeholder="@telegram handle"
              {...register('handle')}
            />
            <FormErrorMessage>
              {errors.handle ? <>{errors.handle.message}</> : <></>}
            </FormErrorMessage>
          </FormControl>
          <FormControl my={6}>
            <Flex align={'center'} justify={'start'}>
              <FormLabel
                color={'gray.400'}
                fontWeight={600}
                fontSize={'15px'}
                htmlFor={'skills'}
              >
                Skills Needed
              </FormLabel>
              <Tooltip
                placement="right-end"
                fontSize="0.9rem"
                padding="0.7rem"
                bg="#6562FF"
                color="white"
                fontWeight={600}
                borderRadius="0.5rem"
                hasArrow
                w="max"
                label={`Select all that apply`}
              >
                <Image
                  mt={-2}
                  src={'/assets/icons/info-icon.svg'}
                  alt={'Info Icon'}
                />
              </Tooltip>
            </Flex>
            <ReactSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={MainSkills}
              onChange={(e) => {
                setSkills(e as any);
              }}
            />
          </FormControl>
          <FormControl my={6}>
            <Flex align={'center'} justify={'start'}>
              <FormLabel
                color={'gray.400'}
                fontWeight={600}
                fontSize={'15px'}
                htmlFor={'skills'}
              >
                Sub Skills Needed
              </FormLabel>
              <Tooltip
                placement="right-end"
                fontSize="0.9rem"
                padding="0.7rem"
                bg="#6562FF"
                color="white"
                fontWeight={600}
                borderRadius="0.5rem"
                hasArrow
                w="max"
                label={`Select all that apply`}
              >
                <Image
                  mt={-2}
                  src={'/assets/icons/info-icon.svg'}
                  alt={'Info Icon'}
                />
              </Tooltip>
            </Flex>
            <ReactSelect
              closeMenuOnSelect={false}
              components={animatedComponents}
              isMulti
              options={SubSkills}
              onChange={(e) => {
                setSubSkills(e as any);
              }}
            />
          </FormControl>
          <VStack gap={6} mt={10}>
            <Button
              w="100%"
              bg={'#6562FF'}
              color={'white'}
              fontSize="1rem"
              fontWeight={600}
              type={'submit'}
            >
              Continue
            </Button>
            <Button
              w="100%"
              fontSize="1rem"
              fontWeight={600}
              color="gray.500"
              border="1px solid"
              borderColor="gray.200"
              bg="transparent"
            >
              Save as Drafts
            </Button>
          </VStack>
        </form>
      </VStack>
    </>
  );
};
