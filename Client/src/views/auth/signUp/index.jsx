import React, { useState } from 'react';
import { useFormik } from 'formik';
// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Spinner,
  Link as ChakraLink,
  Icon,
} from '@chakra-ui/react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { signupSchema } from '../../../schema'; 
import { toast } from 'react-toastify';
import { postApi } from '../../../services/api';
import backgroundImage from '../../../assets/background.jpeg'; 
import { Link, useNavigate } from 'react-router-dom';

function SignUp() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = useColorModeValue('white', 'gray.500'); // Changed to white
  const blackTextColor = useColorModeValue('black', 'gray.500'); // Changed to black for "Already have an account"
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showPass = () => setShowPassword(!showPassword);
  const showConfirmPass = () => setShowConfirmPassword(!showConfirmPassword);

  const navigate = useNavigate();

  const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const {
    errors,
    values,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: signupSchema,
    onSubmit: () => {
      signUp();
    },
  });

  const signUp = async () => {
    try {
      setIsLoading(true);
      const payload = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      let response = await postApi('api/user/register', payload);
      if (response && response.status === 201) {
        toast.success('Registration Successful!');
        navigate('/');
      } else {
        toast.error(response.response.data?.error || 'Registration failed');
      }
    } catch (e) {
      console.log(e);
      toast.error('An error occurred during registration.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Background Image */}
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100%"
        height="100%"
        backgroundImage={`url(${backgroundImage})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        zIndex="-1"
      />
      <Flex
        minH="100vh"
        alignItems="center"
        justifyContent="center"
        w="100%"
        flexDirection="column"
        backgroundColor="transparent"
      >
        {/* Centering the header and text */}
        <Box textAlign="center">
  <Heading color="white" fontSize="36px" mb="10px">
    Sign Up
  </Heading>
          <Text
            mb="36px"
            color={textColorSecondary} // White color
            fontWeight="400"
            fontSize="md"
          >
            Create an account to get started!
          </Text>
        </Box>
        <Flex
          zIndex="1"
          direction="column"
          w={{ base: '100%', md: '420px' }}
          maxW="100%"
          background="rgba(255, 255, 255, 0.8)"
          borderRadius="15px"
          mx="auto"
          p="24px"
        >
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <FormControl isInvalid={errors.username && touched.username} mb="24px">
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Username<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                fontSize="sm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.username}
                name="username"
                type="text"
                placeholder="Your username"
                size="lg"
                borderColor={
                  errors.username && touched.username ? 'red.300' : null
                }
              />
              {errors.username && touched.username && (
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              )}
            </FormControl>

            {/* Email */}
            <FormControl isInvalid={errors.email && touched.email} mb="24px">
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Email<Text color={brandStars}>*</Text>
              </FormLabel>
              <Input
                fontSize="sm"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                name="email"
                type="email"
                placeholder="mail@example.com"
                size="lg"
                borderColor={
                  errors.email && touched.email ? 'red.300' : null
                }
              />
              {errors.email && touched.email && (
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              )}
            </FormControl>

            {/* Password */}
            <FormControl
              isInvalid={errors.password && touched.password}
              mb="24px"
            >
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  fontSize="sm"
                  placeholder="Enter your password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="lg"
                  type={showPassword ? 'text' : 'password'}
                  borderColor={
                    errors.password && touched.password ? 'red.300' : null
                  }
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={showPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={showPass}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && touched.password && (
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              )}
            </FormControl>

            {/* Confirm Password */}
            <FormControl
              isInvalid={errors.confirmPassword && touched.confirmPassword}
              mb="24px"
            >
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                mb="8px"
              >
                Confirm Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  fontSize="sm"
                  placeholder="Confirm your password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="lg"
                  type={showConfirmPassword ? 'text' : 'password'}
                  borderColor={
                    errors.confirmPassword && touched.confirmPassword ? 'red.300' : null
                  }
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={showConfirmPassword ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={showConfirmPass}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && touched.confirmPassword && (
                <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>
              )}
            </FormControl>

            {/* Sign Up Button */}
            <Button
              fontSize="sm"
              variant="solid"
              colorScheme="blue"
              fontWeight="500"
              w="100%"
              h="50"
              type="submit"
              mb="24px"
              isDisabled={isLoading}
            >
              {isLoading ? <Spinner /> : 'Sign Up'}
            </Button>

            {/* Link to Sign In */}
            <Flex justifyContent="center" alignItems="center">
              <Text color={blackTextColor} fontSize="sm" mr="2">
                Already have an account?
              </Text>
              <ChakraLink as={Link} to="/" color="blue.500" fontSize="sm" fontWeight="500">
                Sign In
              </ChakraLink>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
}

export default SignUp;
