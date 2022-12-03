import { Box, GradientFullBgLayout } from '~/components/GradientFullBgLayout';

const PaymentLink = () => {
  return (
    <GradientFullBgLayout>
      <Box
        padding="16"
        background="white"
        rounded="lg"
        shadow="lg"
        width="75vw"
        height="75vh"
        experimental_spaceY="4"
      ></Box>
    </GradientFullBgLayout>
  );
};

export default PaymentLink;
