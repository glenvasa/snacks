import dbConnect from '../../../util/mongo.js'
import Product from '../../../models/Product.js'

export default async function handler (req, res) {
    const { method} = req

    dbConnect()

    if (method === 'GET') {
        try {
            const products = await Product.find()
            res.status(200).json({message: "All Products", products})
        } catch (error) {
            res.status(500).json(error.message || "Something went wrong")
        }
    }

    if (method === 'POST') {
        try {
            const product = await Product.create(req.body)
            res.status(201).json({message: 'Product created!', product})
        } catch (error) {
            res.status(500).json(error.message || "Something went wrong")
        }
    }
}