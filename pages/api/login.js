import cookie from 'cookie'

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {username, password } = req.body
        if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
            res.setHeader('Set-Cookie', cookie.serialize('token', process.env.TOKEN, {
                maxAge: 60 * 60,
                sameSite: 'strict',
                path: '/',
            })
            )
            res.status(200).json('Successful admin login')
        } else {
            res.status(400).json('Wrong admin credentails entered')
        }
    }
}

export default handler
