import {
  getPaymentLinkById,
  updatePaymentLinkById,
} from '../../../server/firebaseUtils';

async function getLink(res, paymentId) {
  try {
    const paymentDetails = await getPaymentLinkById(paymentId);
    const response = {
      isSuccess: true,
      data: paymentDetails,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ err });
  }
}

async function updateLinkStatus(res, paymentId, status) {
  try {
    await updatePaymentLinkById(paymentId, status);
    const response = {
      isSuccess: true,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ err });
  }
}

export default async function handler(req, res) {
  const paymentId = req.query.linkId;
  const { status } = req.body?.status || {};
  switch (req.method) {
    case 'GET': {
      await getLink(res, paymentId);
      break;
    }
    case 'PUT': {
      await updateLinkStatus(res, paymentId, status);
      break;
    }
    default: {
      res.status(400).json({ msg: 'Method Not Allowed' });
    }
  }
}
