import React, { useState } from 'react';
import { Navigate, useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Link,
  CircularProgress,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { isValidEmail, validatePassword } from '../../utils/common';

const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { signup, loginWithGoogle, isAuthenticated, user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    role: 'vendor',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupError, setSignupError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    if (user?.role === 'vendor' && user?.vendorProfile?.profileCompletion < 100) {
      return <Navigate to="/profile-completion" />;
    }
    return <Navigate to="/dashboard" />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    setSignupError(null);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else {
      const passwordValidation = validatePassword(formData.password);
      if (!passwordValidation.isValid) {
        newErrors.password = passwordValidation.errors.join(', ');
      }
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setSignupError(null);

    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };

      const result = await signup(userData);
      if (result.success) {
        if (formData.role === 'vendor') {
          navigate('/profile-completion');
        } else {
          navigate('/dashboard');
        }
      } else {
        setSignupError(result.error || 'Signup failed. Please try again.');
      }
    } catch (error) {
      setSignupError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setSignupError(null);
    try {
      console.log('Google sign-in clicked');
    } catch (error) {
      setSignupError('Google sign-in failed. Please try again.');
    } finally {
      setGoogleLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        bgcolor: theme.palette.background.auth,
      }}
    >
      {/* Left Panel - Branding */}
      {!isMobile && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: 6,
            py: 8,
            bgcolor: theme.palette.background.auth,
          }}
        >
          <Box sx={{ maxWidth: 400 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: '#1F2937',
                mb: 2,
                fontSize: '2rem',
              }}
            >
              Multi-Vendor Marketplace
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#6B7280',
                mb: 4,
                fontSize: '1rem',
                lineHeight: 1.5,
              }}
            >
              Connect with verified vendors and buyers in our trusted B2B platform
            </Typography>

            {/* Features List */}
            <Box sx={{ space: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.features?.verified || '#10B981',
                    mt: 0.75,
                    mr: 2,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1F2937',
                      mb: 0.5,
                      fontSize: '1rem',
                    }}
                  >
                    Verified Vendors
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      fontSize: '0.875rem',
                    }}
                  >
                    All vendors go through our strict verification process
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.features?.secure || '#3B82F6',
                    mt: 0.75,
                    mr: 2,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1F2937',
                      mb: 0.5,
                      fontSize: '1rem',
                    }}
                  >
                    Secure Transactions
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      fontSize: '0.875rem',
                    }}
                  >
                    Protected communication and secure payment processing
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: theme.palette.features?.global || '#8B5CF6',
                    mt: 0.75,
                    mr: 2,
                    flexShrink: 0,
                  }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      color: '#1F2937',
                      mb: 0.5,
                      fontSize: '1rem',
                    }}
                  >
                    Global Reach
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6B7280',
                      fontSize: '0.875rem',
                    }}
                  >
                    Connect with suppliers and buyers worldwide
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Right Panel - Signup Form */}
      <Box
        sx={{
          flex: isMobile ? 1 : '0 0 55%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          px: isMobile ? 3 : { lg: 6, xl: 8 },
          py: 4,
          bgcolor: 'white',
        }}
      >
        <Box sx={{ maxWidth: 420, width: '100%', mx: 'auto' }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1F2937',
              mb: 1,
              textAlign: 'center',
              fontSize: { xs: '1.5rem', lg: '1.75rem' },
            }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#6B7280',
              mb: 2,
              textAlign: 'center',
              fontSize: '0.875rem',
            }}
          >
            Join our marketplace platform
          </Typography>

          {/* Error Alert */}
          {signupError && (
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
              {signupError}
            </Alert>
          )}

          {/* Signup Form */}
          <Box component="form" onSubmit={handleSubmit}>
            <Typography
              variant="body2"
              sx={{
                color: '#374151',
                mb: 1,
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              Full Name
            </Typography>
            <TextField
              fullWidth
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              error={!!errors.fullName}
              helperText={errors.fullName}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  height: 44,
                },
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: '#374151',
                mb: 1,
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              Email
            </Typography>
            <TextField
              fullWidth
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  height: 44,
                },
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: '#374151',
                mb: 1,
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              Account Type
            </Typography>
            <FormControl sx={{ mb: 2 }}>
              <RadioGroup
                name="role"
                value={formData.role}
                onChange={handleChange}
                row
                sx={{ gap: 2 }}
              >
                <FormControlLabel
                  value="vendor"
                  control={<Radio size="small" />}
                  label={
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      Vendor (Sell products)
                    </Typography>
                  }
                />
                <FormControlLabel
                  value="buyer"
                  control={<Radio size="small" />}
                  label={
                    <Typography sx={{ fontSize: '0.875rem' }}>
                      Buyer (Purchase products)
                    </Typography>
                  }
                />
              </RadioGroup>
            </FormControl>

            <Typography
              variant="body2"
              sx={{
                color: '#374151',
                mb: 1,
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              Password
            </Typography>
            <TextField
              fullWidth
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  height: 44,
                },
              }}
            />

            <Typography
              variant="body2"
              sx={{
                color: '#374151',
                mb: 1,
                fontWeight: 500,
                fontSize: '0.875rem',
              }}
            >
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      edge="end"
                      size="small"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  height: 44,
                },
              }}
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading || googleLoading}
              sx={{
                py: 1.5,
                mb: 2,
                fontSize: '0.875rem',
                fontWeight: 600,
                bgcolor: '#1F2937',
                '&:hover': {
                  bgcolor: '#111827',
                },
              }}
            >
              {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Create Account'}
            </Button>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Divider sx={{ flex: 1 }} />
              <Typography
                variant="caption"
                sx={{
                  px: 2,
                  color: '#9CA3AF',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                OR CONTINUE WITH
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Box>

            <Button
              fullWidth
              variant="outlined"
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
              disabled={googleLoading || isLoading}
              sx={{
                mb: 2,
                fontSize: '0.875rem',
                fontWeight: 500,
                borderColor: '#E5E7EB',
                color: '#374151',
                '&:hover': {
                  borderColor: '#D1D5DB',
                  bgcolor: '#F9FAFB',
                },
              }}
            >
              {googleLoading ? 'Signing up...' : 'Continue with Google'}
            </Button>

            <Typography
              variant="body2"
              sx={{
                textAlign: 'center',
                color: '#6B7280',
                fontSize: '0.875rem',
              }}
            >
              Already have an account?{' '}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: '#1F2937',
                  textDecoration: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Signup;