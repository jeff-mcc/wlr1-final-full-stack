const bcrypt = require('bcryptjs')

module.exports = {
    register: async (req,res)=>{
        const db = req.app.get('db')
        const {email,password} = req.body
        const [result] = await db.auth.check_email(email)
        if(result){
            return res.status(409).send('Email taken.')
        }
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password,salt)
        const [user] = await db.auth.register_user(email,hash)
        const [cart] = await db.cart.create_cart(user.user_id)
        delete user.password
        req.session.user = user
        req.session.user.cart_id = cart.cart_id
        return res.status(200).send(req.session.user)
    },
    login: async (req,res)=>{
        const db = req.app.get('db')
        const {email,password} = req.body
        const [user] = await db.auth.check_email(email)
        // console.log(user)
        if(!user){
            return res.status(401).send("User Not Found")
        }
        const isAuthenticated = bcrypt.compareSync(password,user.password)
        if(!isAuthenticated){
            return res.status(401).send("Password Incorrect")
        }
        const [cart] = await db.cart.get_cart(user.user_id)
        // console.log(cart)
        delete user.password
        req.session.user = user
        req.session.user.cart_id = cart.cart_id
        return res.status(200).send(req.session.user)
    },
    logout: (req,res)=>{
        req.session.destroy()
        res.sendStatus(200)
    },
    // getUser: (req,res)=>{
    //     const db = req.app.get('db')
    //     const {user} = req.session
    //     if(!user){
    //         return res.status(511).send("User not logged in")
    //     }else{
    //         db.cart.get_cart_items(user.cart_id).then((cartProducts)=>{
    //             res.status(200).send({user,cartProducts})
    //         })
    //         // res.status(200).send(req.session.user)
    //     }
    // }
}