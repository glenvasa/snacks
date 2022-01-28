import dbConnect from "../../../util/mongo";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  const {
    method,
    query: { id },
  } = req;

  await dbConnect();

  if (method === "GET") {
    try {
      const order = await Order.findById(id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  if (method === "PUT") {
    try {
      const order = await Order.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
  if (method === "DELETE") {
    try {
      const order = await Order.findByIdAndDelete(id)
      res.status(200).json('Order successfully delete')
    } catch (err) {
      res.status(500).json(err.message)
    }
  }
};

export default handler;