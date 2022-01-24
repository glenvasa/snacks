import dbConnect from "../../util/mongo";
import Order from "../../models/Order";

const handler = async (req, res) => {
  const { firstName, lastName, zipCode } = req.body;
  const name = `${firstName} ${lastName}`;

  await dbConnect();

  if (req.method === "POST") {
    try {
      const order = await Order.findOne({
        customer: name,
      });

      if (order.address[3] === zipCode) {
        res.status(200).json(order);
      } else {
        throw new Error("error with zipcode");
      }
    } catch (err) {
      res.status(500).json(err.message || "We have a problem");
    }
  }
};

export default handler;
