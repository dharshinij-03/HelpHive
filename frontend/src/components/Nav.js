import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { AuthContext } from '../context/AuthContext';
import image from '../images/profileavatar.jpg';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Categories', path: '/categories' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    logout();
    handleCloseUserMenu();
    navigate('/login');
  };

  // Generate role-based links
  const roleLinks = () => {
    if (!user) return [];
    if (user.role === 'helper') {
      return [
        { name: 'Post a Service', path: '/create-service' },
        { name: 'My Services', path: '/my-services' }
      ];
    } else if (user.role === 'customer') {
      return [
        { name: 'My Bookings', path: '/my-bookings' }
      ];
    }
    return [];
  };

  // Function to render menu buttons (desktop)
  const renderButtons = (linkArray) =>
    linkArray.map((link) => (
      <Button
        key={link.name}
        component={Link}
        to={link.path}
        sx={{
          my: 2,
          mx: 1,
          color: location.pathname.startsWith(link.path) ? "#D97706" : "#111827",
          fontWeight: location.pathname.startsWith(link.path) ? "bold" : "normal",
          "&:hover": { backgroundColor: "#D97706", color: "white" }
        }}
      >
        {link.name}
      </Button>
    ));

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fbbf24", color: "#111827" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Desktop Logo */}
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: "#111827",
              textDecoration: 'none',
            }}
          >
            HelpHive
          </Typography>

          {/* Mobile Hamburger */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} sx={{ color: "#111827" }}>
              <MenuIcon />
            </IconButton>
            <Menu
              id="nav-menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={page.path}
                    sx={{
                      textAlign: 'center',
                      color: location.pathname.startsWith(page.path) ? "#D97706" : "#111827",
                      fontWeight: location.pathname.startsWith(page.path) ? "bold" : "normal",
                      textDecoration: 'none'
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
              {roleLinks().map((link) => (
                <MenuItem key={link.name} onClick={handleCloseNavMenu}>
                  <Typography
                    component={Link}
                    to={link.path}
                    sx={{ textAlign: 'center', textDecoration: 'none', color: "#111827" }}
                  >
                    {link.name}
                  </Typography>
                </MenuItem>
              ))}
              {!user && (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to="/login"
                      sx={{
                        textAlign: 'center',
                        color: location.pathname === "/login" ? "#D97706" : "#111827",
                        fontWeight: location.pathname === "/login" ? "bold" : "normal",
                        textDecoration: 'none'
                      }}
                    >
                      Login
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography
                      component={Link}
                      to="/register"
                      sx={{ textAlign: 'center', textDecoration: 'none', color: "#111827" }}
                    >
                      Register
                    </Typography>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Mobile Logo */}
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: "#111827",
              textDecoration: 'none',
            }}
          >
            HelpHive
          </Typography>

          {/* Desktop Pages */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
            {renderButtons(pages)}
            {renderButtons(roleLinks())}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {user ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body1" sx={{ mr: 1, display: { xs: 'none', md: 'block' } }}>
                  Welcome, {user.username}!
                </Typography>
                <Tooltip title="Account settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.username} src={user.profileImage || image} sx={{ border: "2px solid black" }} />
                  </IconButton>
                </Tooltip>
                <Menu
                  id="user-menu-appbar"
                  sx={{ mt: '45px' }}
                  anchorEl={anchorElUser}
                  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                  keepMounted
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography component={Link} to="/profile" sx={{ textAlign: 'center', color: "#111827", textDecoration: 'none' }}>
                      Profile
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography component={Link} to="/account" sx={{ textAlign: 'center', color: "#111827", textDecoration: 'none' }}>
                      Account
                    </Typography>
                  </MenuItem>
                  {roleLinks().map((link) => (
                    <MenuItem key={link.name} onClick={handleCloseUserMenu}>
                      <Typography component={Link} to={link.path} sx={{ textAlign: 'center', color: "#111827", textDecoration: 'none' }}>
                        {link.name}
                      </Typography>
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center', color: "#111827" }}>
                      Logout
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <Button component={Link} to="/login" sx={{
                  my: 2, mx: 1,
                  color: location.pathname === "/login" ? "#D97706" : "#111827",
                  "&:hover": { backgroundColor: "#D97706", color: "white" }
                }}>Login</Button>
                <Button component={Link} to="/register" variant="contained" sx={{
                  my: 2, mx: 1,
                  backgroundColor: "#111827",
                  color: "#fbbf24",
                  "&:hover": { backgroundColor: "#D97706" }
                }}>Register</Button>
              </Box>
            )}
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
