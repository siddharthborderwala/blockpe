import {
  ChakraProvider,
  extendTheme,
  Spinner,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import '@biconomy/web3-auth/dist/src/style.css';

const theme = extendTheme(
  withDefaultColorScheme({
    colorScheme: 'twitter',
  })
);

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
        <Component {...pageProps} />
      </Web3AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
