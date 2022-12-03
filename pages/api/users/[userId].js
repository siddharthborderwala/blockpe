import { getUserById } from "~/server/firebaseUtils";


async function getUserDetails(res, userId) {
  try {
    const user = await getUserById(userId);
    const response = {
      isSuccess: true,
      data: user,
    };
    res.json(response);
  } catch (err) {
    res.status(500).json({ err });
  }
}

export default function handler(req, res) {
  const userId = req.query.userId;
  switch(req.method) {
    case "GET": {
      getUserDetails(res, userId);
      break;
    }
    default : {
      res.status(400).json({ msg: "Method Not Allowed" });
    }
  } 
}
