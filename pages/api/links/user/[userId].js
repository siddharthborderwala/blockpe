import { getPaymentLinksByUserId } from '../../../../server/firebaseUtils';

async function getLinks(res, userId) {
  try {
    const links = await getPaymentLinksByUserId(userId);
    const response = {
      isSuccess: true,
      data: links,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ err });
  }
}

export default function handler(req, res) {
  const userId = req.query.userId;
  switch (req.method) {
    case 'GET': {
      getLinks(res, userId);
      break;
    }
    default: {
      res.status(400).json({ msg: 'Method Not Allowed' });
    }
  }
}
