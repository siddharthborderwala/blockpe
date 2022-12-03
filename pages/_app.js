import {
  ChakraProvider,
  extendTheme,
  Spinner,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import '@biconomy/web3-auth/dist/src/style.css';
import { layouts } from '~/layouts';

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'twitter',
  })
);

const WithLayout = ({ Component, childProps }) => {
  const LayoutComponent = layouts[Component.layout] ?? layouts.default;
  return (
    <LayoutComponent>
      <Component {...childProps} />
    </LayoutComponent>
  );
};

const Web3AuthProvider = dynamic(
  () => import('~/contexts/auth').then((m) => m.Web3AuthProvider),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Web3AuthProvider>
        <WithLayout Component={Component} childProps={pageProps} />
      </Web3AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
