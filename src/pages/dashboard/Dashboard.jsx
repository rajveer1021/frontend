import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  useTheme,
  useMediaQuery,
  Divider,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  LocalMall as EarningIcon,
  MonetizationOn as MoneyIcon,
  AccountBalanceWallet as AccountIcon,
  StorefrontTwoTone as MarketIcon,
  MoreHoriz as MoreHorizIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  TrendingUp as TrendingUpIcon,
  Description as DescriptionIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';

// Berry Color Palette
const berryTheme = {
  primary: {
    light: '#e3f2fd',
    main: '#2196f3',
    dark: '#0d47a1',
  },
  secondary: {
    light: '#f3e5f5',
    main: '#9c27b0',
    dark: '#4a148c',
  },
  success: {
    light: '#e8f5e8',
    main: '#4caf50',
    dark: '#1b5e20',
  },
  error: {
    light: '#ffebee',
    main: '#f44336',
    dark: '#b71c1c',
  },
  warning: {
    light: '#fff8e1',
    main: '#ff9800',
    dark: '#e65100',
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
};

// Earning Card Component (Berry Style)
const EarningCard = () => {
  return (
    <Card
      sx={{
        bgcolor: berryTheme.primary.main,
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: `linear-gradient(210.04deg, ${berryTheme.primary.dark} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
          borderRadius: '50%',
          top: -30,
          right: -180,
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          width: 210,
          height: 210,
          background: `linear-gradient(140.9deg, ${berryTheme.primary.dark} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
          borderRadius: '50%',
          top: -160,
          right: -130,
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h3" sx={{ fontWeight: 500, mt: 1 }}>
              $500.00
            </Typography>
            <Typography variant="subtitle2" sx={{ opacity: 0.7, mt: 0.5 }}>
              Total Earning
            </Typography>
          </Box>
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: berryTheme.primary.dark,
              mt: 1,
              width: 44,
              height: 44,
            }}
          >
            <EarningIcon fontSize="inherit" />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

// Total Order Line Chart Card
const TotalOrderLineChartCard = () => {
  return (
    <Card>
      <CardContent sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 500 }}>
            $1800
          </Typography>
          <Chip
            variant="outlined"
            size="small"
            icon={<TrendingUpIcon />}
            label="+16%"
            sx={{
              color: berryTheme.success.main,
              borderColor: berryTheme.success.main,
              bgcolor: berryTheme.success.light,
            }}
          />
        </Box>
        <Typography variant="subtitle2" color="textSecondary">
          Total Order
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <LinearProgress 
            variant="determinate" 
            value={70} 
            sx={{ 
              flexGrow: 1, 
              height: 6, 
              borderRadius: 5,
              bgcolor: berryTheme.grey[200],
              '& .MuiLinearProgress-bar': {
                bgcolor: berryTheme.primary.main,
                borderRadius: 5,
              }
            }} 
          />
          <Typography variant="body2" color="textSecondary" sx={{ ml: 1 }}>
            70%
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

// Total Growth Bar Chart
const TotalGrowthBarChart = () => {
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: berryTheme.success.main }}>
            <TrendingUpIcon />
          </Avatar>
        }
        action={
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        }
        title={
          <Typography variant="h6" component="div">
            Total Growth
          </Typography>
        }
        subheader="Company Finance Growth"
      />
      <CardContent>
        <Typography variant="h3" sx={{ fontWeight: 500, mb: 1 }}>
          $2,324.00
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ArrowUpwardIcon sx={{ color: berryTheme.success.main, fontSize: 16, mr: 0.5 }} />
          <Typography variant="body2" sx={{ color: berryTheme.success.main, mr: 1 }}>
            +5.25%
          </Typography>
          <Typography variant="body2" color="textSecondary">
            than last week
          </Typography>
        </Box>
        <LinearProgress 
          variant="determinate" 
          value={85} 
          sx={{ 
            height: 8, 
            borderRadius: 5,
            bgcolor: berryTheme.success.light,
            '& .MuiLinearProgress-bar': {
              bgcolor: berryTheme.success.main,
              borderRadius: 5,
            }
          }} 
        />
      </CardContent>
    </Card>
  );
};

// Popular Card
const PopularCard = () => {
  const popularStocks = [
    { name: 'Bajaj Finsery', category: 'BAJAJFINSV.NS', price: 1541.15, change: +39.00, isUp: true },
    { name: 'TTML', category: 'TATAPOWER.NS', price: 11.61, change: -0.58, isUp: false },
    { name: 'Reliance', category: 'RELIANCE.NS', price: 2032.95, change: +44.44, isUp: true },
    { name: 'TTML', category: 'TTML.NS', price: 307.65, change: -3.82, isUp: false },
    { name: 'Stolon', category: 'STOLON.NS', price: 18.20, change: +10.00, isUp: true },
  ];

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Popular Stocks
          </Typography>
        }
        action={
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <List sx={{ p: 0 }}>
          {popularStocks.map((stock, index) => (
            <React.Fragment key={index}>
              <ListItem sx={{ px: 2, py: 1 }}>
                <ListItemAvatar>
                  <Avatar
                    sx={{
                      bgcolor: stock.isUp ? berryTheme.success.light : berryTheme.error.light,
                      color: stock.isUp ? berryTheme.success.main : berryTheme.error.main,
                      width: 32,
                      height: 32,
                    }}
                  >
                    {stock.isUp ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {stock.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="textSecondary">
                      {stock.category}
                    </Typography>
                  }
                />
                <ListItemSecondaryAction>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      ${stock.price}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{
                        color: stock.isUp ? berryTheme.success.main : berryTheme.error.main,
                        fontWeight: 500,
                      }}
                    >
                      {stock.isUp ? '+' : ''}{stock.change}%
                    </Typography>
                  </Box>
                </ListItemSecondaryAction>
              </ListItem>
              {index < popularStocks.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

// Total Revenue Card
const TotalRevenueCard = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
              Total Revenue
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500, mb: 1 }}>
              $42,562
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                size="small"
                icon={<ArrowUpwardIcon />}
                label="$1,12,900 (40.5%)"
                sx={{
                  color: berryTheme.success.main,
                  bgcolor: berryTheme.success.light,
                  border: 'none',
                  '& .MuiChip-icon': {
                    color: berryTheme.success.main,
                  },
                }}
              />
            </Box>
          </Box>
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: berryTheme.warning.light,
              color: berryTheme.warning.main,
              width: 44,
              height: 44,
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

// Account Balance Card
const AccountBalanceCard = () => {
  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
              Account Balance
            </Typography>
            <Typography variant="h3" sx={{ fontWeight: 500, mb: 1 }}>
              $23,045
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                size="small"
                icon={<ArrowDownwardIcon />}
                label="$1,456 (30.5%)"
                sx={{
                  color: berryTheme.error.main,
                  bgcolor: berryTheme.error.light,
                  border: 'none',
                  '& .MuiChip-icon': {
                    color: berryTheme.error.main,
                  },
                }}
              />
            </Box>
          </Box>
          <Avatar
            variant="rounded"
            sx={{
              bgcolor: berryTheme.secondary.light,
              color: berryTheme.secondary.main,
              width: 44,
              height: 44,
            }}
          >
            <AccountIcon />
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

// Sales Report Card
const SalesReportCard = () => {
  const salesData = [
    { period: 'This Week', amount: '$1,235', change: '+2.5%', isUp: true },
    { period: 'Last Week', amount: '$1,005', change: '-1.5%', isUp: false },
    { period: 'This Month', amount: '$5,657', change: '+5.2%', isUp: true },
    { period: 'Last Month', amount: '$4,998', change: '+1.8%', isUp: true },
  ];

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Sales Report
          </Typography>
        }
        subheader="Current month vs previous month"
        action={
          <IconButton size="small">
            <MoreHorizIcon />
          </IconButton>
        }
      />
      <CardContent>
        <Grid container spacing={2}>
          {salesData.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  bgcolor: berryTheme.grey[50],
                  border: `1px solid ${berryTheme.grey[200]}`,
                }}
              >
                <Typography variant="body2" color="textSecondary" sx={{ mb: 0.5 }}>
                  {item.period}
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>
                  {item.amount}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: item.isUp ? berryTheme.success.main : berryTheme.error.main,
                    fontWeight: 500,
                  }}
                >
                  {item.change}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

// Latest Customers Card
const LatestCustomersCard = () => {
  const customers = [
    { name: 'John Doe', email: 'john@example.com', amount: '$1,200', status: 'Paid', avatar: 'J' },
    { name: 'Jane Smith', email: 'jane@example.com', amount: '$850', status: 'Pending', avatar: 'J' },
    { name: 'Mike Johnson', email: 'mike@example.com', amount: '$2,100', status: 'Paid', avatar: 'M' },
    { name: 'Sarah Wilson', email: 'sarah@example.com', amount: '$750', status: 'Cancelled', avatar: 'S' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return berryTheme.success.main;
      case 'Pending': return berryTheme.warning.main;
      case 'Cancelled': return berryTheme.error.main;
      default: return berryTheme.grey[500];
    }
  };

  return (
    <Card>
      <CardHeader
        title={
          <Typography variant="h6" component="div">
            Latest Customers
          </Typography>
        }
        action={
          <Button size="small" color="primary">
            View All
          </Button>
        }
      />
      <CardContent sx={{ p: 0 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: berryTheme.primary.main,
                          width: 32,
                          height: 32,
                          fontSize: '0.875rem',
                          mr: 2,
                        }}
                      >
                        {customer.avatar}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                          {customer.name}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {customer.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                      {customer.amount}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={customer.status}
                      size="small"
                      sx={{
                        bgcolor: `${getStatusColor(customer.status)}20`,
                        color: getStatusColor(customer.status),
                        fontWeight: 500,
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

// Main Dashboard Component (Berry Exact Replica)
const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading Berry Dashboard...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
      {/* First Row - Main Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <EarningCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TotalOrderLineChartCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <TotalRevenueCard />
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <AccountBalanceCard />
        </Grid>
      </Grid>

      {/* Second Row - Growth and Popular */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} lg={4}>
          <TotalGrowthBarChart />
        </Grid>
        <Grid item xs={12} lg={8}>
          <PopularCard />
        </Grid>
      </Grid>

      {/* Third Row - Sales Report and Latest Customers */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <LatestCustomersCard />
        </Grid>
        <Grid item xs={12} lg={4}>
          <SalesReportCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;