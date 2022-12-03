import { MerchantDashboard } from './merchant-dashboard';

export const layoutNames = {
  MERCHANT_DASHBOARD: 'merchant-dashboard',
};

export const layouts = {
  default: ({ children }) => <>{children}</>,
  [layoutNames.MERCHANT_DASHBOARD]: MerchantDashboard,
};
