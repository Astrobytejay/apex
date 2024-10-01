// Chakra Imports
import { Box, Flex, Heading, Image, Link, Text, useColorModeValue, useColorMode, IconButton } from '@chakra-ui/react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { AiOutlineMenuUnfold, AiOutlineMenuFold, AiTwotoneHome } from "react-icons/ai"; // Added home icon for breadcrumbs
import { MoonIcon, SunIcon } from '@chakra-ui/icons'; // For dark mode toggle
import logo from '../../assets/img/eagleeye.png'; // Adjust the path as needed

export default function AdminNavbar(props) {
	const [scrolled, setScrolled] = useState(false);
	const { colorMode, toggleColorMode } = useColorMode(); // Dark mode toggle logic

	useEffect(() => {
		window.addEventListener('scroll', changeNavbar);

		return () => {
			window.removeEventListener('scroll', changeNavbar);
		};
	}, []);

	const changeNavbar = () => {
		if (window.scrollY > 1) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	const { secondary, message, brandText, under, setOpenSidebar, openSidebar, largeLogo, routes } = props;

	// Using the custom colors from theme.js
	let mainText = useColorModeValue('brand.textLight', 'brand.textDark');   // Light mode uses dark text, dark mode uses light text
	let secondaryText = useColorModeValue('gray.700', 'gray.300');           // Adjust for lighter text accents
	let navbarBg = useColorModeValue('brand.50', 'brand.900');               // Background in light/dark modes

	return (
		<Box
			position="fixed"
			boxShadow="0px 4px 12px rgba(0, 0, 0, 0.1)"
			bg={navbarBg}   // Dark mode uses brand.900 (#010412)
			borderColor="transparent"
			filter="none"
			backdropFilter="blur(20px)"
			backgroundPosition="center"
			backgroundSize="cover"
			borderWidth="1.5px"
			borderStyle="solid"
			zIndex={1}
			transition="all 0.25s linear"
			display="flex"
			alignItems={{ xl: 'center' }}
			minH="75px"
			justifyContent={{ xl: 'center' }}
			lineHeight="25.6px"
			mx="auto"
			mt="-9px"
			pb="6px"
			right="0px"
			px={{ sm: '15px', md: '10px' }}
			ps={{ xl: '12px' }}
			pt="8px"
			top="0px"
			w="100vw"
		>
			<Flex
				w="100%"
				flexDirection={{ sm: 'column', md: 'row' }}
				alignItems={{ xl: 'center' }}
				mb="0px"
			>
				<Box display="flex" alignItems="center">
					{/* Logo */}
					<Flex me={openSidebar ? "" : "5"} mx={openSidebar ? "14" : "1"} display={{ sm: "none", xl: "flex" }}>
						<Image
							style={{ width: openSidebar ? "165px" : "60px", height: '52px', objectFit: "contain" }}
							src={logo}
							alt="Logo"
							cursor="pointer"
							onClick={() => !props.from && setOpenSidebar(!openSidebar)}
							userSelect="none"
							my={2}
						/>
					</Flex>

					{/* Sidebar Toggle */}
					<Box display={{ sm: "none", xl: "flex" }} ms={openSidebar ? "" : "3"} onClick={() => setOpenSidebar(!openSidebar)} style={{ fontSize: "25px" }}>
						{openSidebar ? <AiOutlineMenuFold /> : <AiOutlineMenuUnfold />}
					</Box>
				</Box>

				{/* Breadcrumbs */}
				<Flex
					alignItems="center"
					justifyContent="flex-start"
					fontSize="sm"
					color={secondaryText}
					display={{ sm: "none", xl: "flex" }}
					ml={4}
				>
					<Text as="span" mr={2}><AiTwotoneHome /></Text>
					<Text> {brandText} </Text>
				</Flex>

				{/* Navbar Links */}
				<Box ms='auto' w={{ sm: '100%', md: 'unset' }}>
					<AdminNavbarLinks
						setOpenSidebar={setOpenSidebar}
						openSidebar={openSidebar}
						onOpen={props.onOpen}
						logoText={props.logoText}
						secondary={props.secondary}
						fixed={props.fixed}
						scrolled={scrolled}
						routes={routes}
					/>
				</Box>

				{/* Dark Mode Toggle aligned with Notification Bell */}
				<Flex alignItems="center">
					<IconButton
						aria-label="Toggle dark mode"
						icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
						onClick={toggleColorMode}
						variant="ghost"
						mx="2"
					/>
				</Flex>
			</Flex>

			{/* Secondary Message */}
			{secondary ? <Text color='white'>{message}</Text> : null}
		</Box>
	);
}

AdminNavbar.propTypes = {
	brandText: PropTypes.string,
	variant: PropTypes.string,
	secondary: PropTypes.bool,
	fixed: PropTypes.bool,
	onOpen: PropTypes.func,
	setOpenSidebar: PropTypes.func,
	openSidebar: PropTypes.bool,
	largeLogo: PropTypes.array,
};
