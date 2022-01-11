import dbConnect from '../../../util/mongo.js'
import Product from '../../../models/Product.js'

export default async function handler (req, res) {
    const { method, cookies} = req

    const token = cookies.token

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
        if(!token || token !== process.env.TOKEN){
            return res.status(401).json('Not authorized to POST new product')
        }
        try {
            const product = await Product.create(req.body)
            res.status(201).json({message: 'Product created!', product})
        } catch (error) {
            res.status(500).json(error.message || "Something went wrong")
        }
    }
}