import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider,
  Avatar,
  Menu,
  MenuItem,
  Container,
  Collapse,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Inventory as ProductsIcon,
  Settings as SettingsIcon,
  AccountCircle as ProfileIcon,
  Logout as LogoutIcon,
  ChevronLeft as ChevronLeftIcon,
  ExpandLess,
  ExpandMore,
} from '@mui/icons-material';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/common';

const DRAWER_WIDTH = 260;
const MINI_DRAWER_WIDTH = 60;
const HEADER_HEIGHT = 70;

const MainLayout = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();

  // Layout state
  const [mobileOpen, setMobileOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(!isMobile);
  const [anchorEl, setAnchorEl] = useState(null);
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  // Menu items with better organization
  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: DashboardIcon,
      url: '/dashboard'
    },
    {
      id: 'products',
      title: 'Products',
      type: 'collapse',
      icon: ProductsIcon,
      children: [
        {
          id: 'product-list',
          title: 'All Products',
          type: 'item',
          url: '/products'
        },
        {
          id: 'add-product',
          title: 'Add Product',
          type: 'item',
          url: '/products/new'
        }
      ]
    },
    {
      id: 'profile',
      title: 'Profile',
      type: 'item',
      icon: ProfileIcon,
      url: '/profile'
    },
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      icon: SettingsIcon,
      url: '/settings'
    }
  ];

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setDrawerOpen(!drawerOpen);
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    handleProfileMenuClose();
  };

  const isActive = (url) => {
    return location.pathname === url || location.pathname.startsWith(url + '/');
  };

  // Render menu item
  const renderMenuItem = (item) => {
    if (item.type === 'collapse') {
      return (
        <React.Fragment key={item.id}>
          <ListItemButton
            onClick={() => {
              if (item.id === 'products') {
                setProductMenuOpen(!productMenuOpen);
              }
            }}
            sx={{
              minHeight: 48,
              px: 2.5,
              py: 1,
              borderRadius: 1,
              mx: 1,
              mb: 0.5,
              '&:hover': {
                bgcolor: 'rgba(94, 72, 232, 0.08)',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: drawerOpen ? 2 : 'auto',
                justifyContent: 'center',
                color: 'text.secondary',
              }}
            >
              <item.icon fontSize="small" />
            </ListItemIcon>
            {drawerOpen && (
              <>
                <ListItemText
                  primary={item.title}
                  sx={{
                    '& .MuiListItemText-primary': {
                      fontSize: '0.875rem',
                      fontWeight: 500,
                    },
                  }}
                />
                {item.id === 'products' ? (
                  productMenuOpen ? <ExpandLess /> : <ExpandMore />
                ) : null}
              </>
            )}
          </ListItemButton>
          
          {drawerOpen && (
            <Collapse in={productMenuOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.children?.map((child) => (
                  <ListItemButton
                    key={child.id}
                    component={Link}
                    to={child.url}
                    selected={isActive(child.url)}
                    onClick={isMobile ? handleDrawerToggle : undefined}
                    sx={{
                      minHeight: 40,
                      px: 2.5,
                      py: 0.5,
                      pl: 5,
                      borderRadius: 1,
                      mx: 1,
                      mb: 0.5,
                      '&:hover': {
                        bgcolor: 'rgba(94, 72, 232, 0.08)',
                      },
                      '&.Mui-selected': {
                        bgcolor: 'rgba(94, 72, 232, 0.15)',
                        '&:hover': {
                          bgcolor: 'rgba(94, 72, 232, 0.2)',
                        },
                      },
                    }}
                  >
                    <ListItemText
                      primary={child.title}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.8rem',
                          fontWeight: isActive(child.url) ? 600 : 400,
                        },
                      }}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          )}
        </React.Fragment>
      );
    }

    return (
      <ListItemButton
        key={item.id}
        component={Link}
        to={item.url}
        selected={isActive(item.url)}
        onClick={isMobile ? handleDrawerToggle : undefined}
        sx={{
          minHeight: 48,
          px: 2.5,
          py: 1,
          borderRadius: 1,
          mx: 1,
          mb: 0.5,
          '&:hover': {
            bgcolor: 'rgba(94, 72, 232, 0.08)',
          },
          '&.Mui-selected': {
            bgcolor: 'rgba(94, 72, 232, 0.15)',
            borderLeft: '3px solid',
            borderLeftColor: 'primary.main',
            '&:hover': {
              bgcolor: 'rgba(94, 72, 232, 0.2)',
            },
          },
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: drawerOpen ? 2 : 'auto',
            justifyContent: 'center',
            color: isActive(item.url) ? 'primary.main' : 'text.secondary',
          }}
        >
          <item.icon fontSize="small" />
        </ListItemIcon>
        {drawerOpen && (
          <ListItemText
            primary={item.title}
            sx={{
              '& .MuiListItemText-primary': {
                fontSize: '0.875rem',
                fontWeight: isActive(item.url) ? 600 : 500,
                color: isActive(item.url) ? 'primary.main' : 'text.primary',
              },
            }}
          />
        )}
      </ListItemButton>
    );
  };

  // Drawer content
  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo Section */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: drawerOpen ? 'flex-start' : 'center',
          px: drawerOpen ? 2 : 1,
          py: 2,
          minHeight: HEADER_HEIGHT,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        {drawerOpen ? (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              fontSize: '1.25rem',
            }}
          >
            Marketplace
          </Typography>
        ) : (
          <Box
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'primary.main',
              borderRadius: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 700,
              fontSize: '1.2rem',
            }}
          >
            M
          </Box>
        )}
      </Box>

      {/* Navigation Menu */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', py: 1 }}>
        <List disablePadding>
          {menuItems.map(renderMenuItem)}
        </List>
      </Box>

      {/* User Profile Section */}
      <Box
        sx={{
          borderTop: '1px solid',
          borderColor: 'divider',
          p: 1.5,
        }}
      >
        {drawerOpen ? (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 1,
              borderRadius: 1,
              bgcolor: 'grey.50',
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 32,
                height: 32,
                fontSize: '0.875rem',
              }}
            >
              {getInitials(user?.name || 'User')}
            </Avatar>
            <Box sx={{ ml: 1.5, flexGrow: 1, minWidth: 0 }}>
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  lineHeight: 1.2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {user?.name || 'User Name'}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ fontSize: '0.75rem' }}
              >
                {user?.role || 'User'}
              </Typography>
            </Box>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 32,
                height: 32,
                fontSize: '0.875rem',
              }}
            >
              {getInitials(user?.name || 'User')}
            </Avatar>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Header */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          zIndex: theme.zIndex.drawer + 1,
          height: HEADER_HEIGHT,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Toolbar
          sx={{
            minHeight: `${HEADER_HEIGHT}px !important`,
            px: { xs: 1, sm: 2 },
          }}
        >
          {/* Menu Toggle */}
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              color: 'text.primary',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            {drawerOpen && !isMobile ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>

          {/* Page Title - will be dynamic */}
          <Typography
            variant="h6"
            noWrap
            sx={{
              flexGrow: 1,
              fontWeight: 600,
              color: 'text.primary',
              fontSize: '1.125rem',
            }}
          >
            {/* This will be set by each page */}
          </Typography>

          {/* User Menu */}
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          >
            <Avatar
              sx={{
                bgcolor: 'primary.main',
                width: 36,
                height: 36,
                fontSize: '0.875rem',
              }}
            >
              {getInitials(user?.name || 'User')}
            </Avatar>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              elevation: 8,
              sx: {
                mt: 1,
                minWidth: 180,
                borderRadius: 2,
                border: '1px solid',
                borderColor: 'divider',
              },
            }}
          >
            <MenuItem
              onClick={() => {
                navigate('/profile');
                handleProfileMenuClose();
              }}
              sx={{ py: 1.5, px: 2 }}
            >
              <ProfileIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Profile
            </MenuItem>
            <Divider />
            <MenuItem
              onClick={handleLogout}
              sx={{ py: 1.5, px: 2, color: 'error.main' }}
            >
              <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{
          width: { lg: drawerOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH },
          flexShrink: { lg: 0 },
        }}
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', lg: 'none' },
            '& .MuiDrawer-paper': {
              width: DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', lg: 'block' },
            '& .MuiDrawer-paper': {
              width: drawerOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH,
              boxSizing: 'border-box',
              borderRight: '1px solid',
              borderColor: 'divider',
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            },
          }}
          open={drawerOpen}
        >
          {drawerContent}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: {
            lg: `calc(100% - ${drawerOpen ? DRAWER_WIDTH : MINI_DRAWER_WIDTH}px)`
          },
          minHeight: '100vh',
          bgcolor: 'grey.50',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        }}
      >
        {/* Content Wrapper with proper spacing */}
        <Box
          sx={{
            pt: `${HEADER_HEIGHT + 16}px`, // Header height + padding
            pb: 2,
            minHeight: '100vh',
          }}
        >
          {/* Page Container - This is key for proper dashboard card layout */}
          <Container
            maxWidth={false}
            sx={{
              px: { xs: 2, sm: 3, lg: 4 },
              maxWidth: 'none',
              '& .MuiContainer-root': {
                px: 0,
              },
            }}
          >
            {children}
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;