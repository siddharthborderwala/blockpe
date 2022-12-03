import {
  ChakraProvider,
  extendTheme,
  Spinner,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
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

const BetterAuth = dynamic(
  () => import('../contexts/better-auth').then((res) => res.BetterAuthProvider),
  {
    ssr: false,
  }
);
function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <BetterAuth>
        <WithLayout Component={Component} childProps={pageProps} />
      </BetterAuth>
    </ChakraProvider>
  );
}

export default MyApp;
