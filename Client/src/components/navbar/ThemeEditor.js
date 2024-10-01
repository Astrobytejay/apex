import React from 'react'
import {
  Button,
  Icon,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Box,
  Text
} from '@chakra-ui/react'
import { CgColorPicker } from 'react-icons/cg'
import { ImFontSize } from 'react-icons/im'
import { MdPalette } from 'react-icons/md'

export function ThemeEditor(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <ThemeEditorButton onClick={onOpen} navbarIcon={props.navbarIcon} />
      <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Theme Editor</DrawerHeader>
          <DrawerBody>
            {/* Color Editor Section */}
            <Box mb={4}>
              <Button
                leftIcon={<Icon as={CgColorPicker} />}
                variant="outline"
                width="100%"
                justifyContent="flex-start"
                mb={2}
              >
                Edit Colors
              </Button>
              {/* Place your color editing components here */}
              <Text fontSize="sm" color="gray.500">
                Color editing functionality goes here.
              </Text>
            </Box>

            {/* Font Size Editor Section */}
            <Box>
              <Button
                leftIcon={<Icon as={ImFontSize} />}
                variant="outline"
                width="100%"
                justifyContent="flex-start"
                mb={2}
              >
                Edit Font Sizes
              </Button>
              {/* Place your font size editing components here */}
              <Text fontSize="sm" color="gray.500">
                Font size editing functionality goes here.
              </Text>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

function ThemeEditorButton({ onClick, navbarIcon, ...rest }) {
  return (
    <Button
      variant="ghost"
      bg="transparent"
      p="0px"
      minW="unset"
      minH="unset"
      h="18px"
      w="max-content"
      _focus={{ boxShadow: 'none' }}
      onClick={onClick}
      {...rest}
    >
      <Icon
        me="10px"
        h="18px"
        w="18px"
        color={navbarIcon}
        as={MdPalette}
      />
    </Button>
  )
}
