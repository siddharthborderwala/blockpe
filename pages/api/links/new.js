import { addUser, createLink, getUser } from "../../../server/firebaseUtils";
export default function handler(req, res) {
  if (req.method === "POST") {
    const file = req.files?.file;
    const {
      name,
      description,
      amount,
      expiry,
      preferred_token_address,
      wallet_address,
    } = req.body;
    const userExists = getUser({ wallet_address });
    let userId;
    if (!userExists) {
      userId = addUser({ name, description, wallet_address });
    } else {
      userId = userExists.id;
    }
    const paymentId = createLink(userId, { amount, expiry, preferred_token_address });

    try {
      const response = {
        isSuccess: true,
        payment_id: paymentId,
      };
      res.json(response);
    } catch (err) {
      res.status(500).json({ err });
    }
  } else {
    res.status(400).json({ msg: "Method Not Allowed" });
  }
}
