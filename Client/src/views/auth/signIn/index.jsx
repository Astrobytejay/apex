import React, { useState } from 'react';
import { useFormik } from 'formik';
// Chakra imports
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useColorModeValue,
  Spinner,
  Link as ChakraLink,
} from '@chakra-ui/react';
// Icons
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
// Custom imports
import { loginSchema } from '../../../schema'; // Adjust the path if necessary
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/slices/localSlice'; // Adjust the path if necessary
import { postApi } from '../../../services/api'; // Adjust the path if necessary
// Import the background image
import backgroundImage from '../../../assets/background.jpeg'; // Adjust the path if necessary
// Import Link from react-router-dom
import { Link } from 'react-router-dom';

function SignIn() {
  // Chakra color mode
  const textColor = useColorModeValue('navy.700', 'white');
  const textColorSecondary = useColorModeValue('gray.400', 'gray.500');
  const brandStars = useColorModeValue('brand.500', 'brand.400');
  const [isLoading, setIsLoading] = useState(false);
  const [checkBox, setCheckBox] = useState(true);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);
  const showPass = () => setShow(!show);

  const initialValues = {
    username: '',
    password: '',
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
    validationSchema: loginSchema,
    onSubmit: () => {
      login();
    },
  });

  const login = async () => {
    try {
      setIsLoading(true);
      let response = await postApi('api/user/login', values, checkBox);
      if (response && response.status === 200) {
        toast.success('Login Successfully!');
        dispatch(setUser(response?.data?.user));
        // Redirect based on user role
        if (response.data.user.role === 'user') {
          window.location.href = '/user'; // Adjust the path if necessary
        } else if (response.data.user.role === 'superAdmin') {
          window.location.href = '/admin'; // Adjust the path if necessary
        }
      } else {
        toast.error(response.response.data?.error);
      }
    } catch (e) {
      console.log(e);
      toast.error('An error occurred during login.');
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
        <Flex me="auto" w="100%" justifyContent="center">
          <Heading color="white" textAlign="center" fontSize="36px" mb="10px">
            Sign In
          </Heading>
        </Flex>
        <Text
          mb="36px"
          ms="4px"
          color={textColorSecondary}
          fontWeight="400"
          fontSize="md"
          textAlign="center"
        >
          Enter your email and password to sign in!
        </Text>
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
            <FormControl isInvalid={errors.username && touched.username}>
              <FormLabel
                display="flex"
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
                value={values.username}
                name="username"
                type="email"
                placeholder="mail@example.com"
                mb={errors.username && touched.username ? undefined : '24px'}
                fontWeight="500"
                size="lg"
                borderColor={
                  errors.username && touched.username ? 'red.300' : null
                }
              />
              {errors.username && touched.username && (
                <FormErrorMessage mb="24px">{errors.username}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl
              isInvalid={errors.password && touched.password}
              mb="24px"
            >
              <FormLabel
                ms="4px"
                fontSize="sm"
                fontWeight="500"
                color={textColor}
                display="flex"
              >
                Password<Text color={brandStars}>*</Text>
              </FormLabel>
              <InputGroup size="md">
                <Input
                  fontSize="sm"
                  placeholder="Enter Your Password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  size="lg"
                  type={show ? 'text' : 'password'}
                  borderColor={
                    errors.password && touched.password ? 'red.300' : null
                  }
                />
                <InputRightElement display="flex" alignItems="center" mt="4px">
                  <Icon
                    color={textColorSecondary}
                    _hover={{ cursor: 'pointer' }}
                    as={show ? RiEyeCloseLine : MdOutlineRemoveRedEye}
                    onClick={showPass}
                  />
                </InputRightElement>
              </InputGroup>
              {errors.password && touched.password && (
                <FormErrorMessage mb="24px">
                  {errors.password}
                </FormErrorMessage>
              )}
            </FormControl>

            <Flex justifyContent="space-between" align="center" mb="24px">
              <FormControl display="flex" alignItems="center">
                <Checkbox
                  onChange={(e) => setCheckBox(e.target.checked)}
                  id="remember-login"
                  isChecked={checkBox}
                  colorScheme="brandScheme"
                  me="10px"
                />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  color={textColor}
                  fontSize="sm"
                >
                  Keep me logged in
                </FormLabel>
              </FormControl>
            </Flex>

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
              {isLoading ? <Spinner /> : 'Sign In'}
            </Button>

            {/* Add Sign Up Link */}
            <Flex justifyContent="center" alignItems="center">
              <Text color={textColorSecondary} fontSize="sm" mr="2">
                Don't have an account?
              </Text>
              <ChakraLink as={Link} to="/signup" color="blue.500" fontSize="sm" fontWeight="500">
                Sign Up
              </ChakraLink>
            </Flex>

          </form>
        </Flex>
      </Flex>
    </>
  );
}

export default SignIn;
