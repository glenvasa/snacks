import dbConnect from "../../../util/mongo.js";
import Product from "../../../models/Product.js";

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req;

  dbConnect();

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json(error.message || "Something went wrong");
    }
  }

//   if (method === "PUT") {
//     try {
//       const product = await Product.create(req.body);
//       res.status(201).json({ message: "Product created!", product });
//     } catch (error) {
//       res.status(500).json(error.message || "Something went wrong");
//     }
//   }

//   if (method === "DELETE") {
//     try {
//       const product = await Product.create(req.body);
//       res.status(201).json({ message: "Product created!", product });
//     } catch (error) {
//       res.status(500).json(error.message || "Something went wrong");
//     }
//   }
}
