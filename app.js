const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const Blog = require('./models/blog')

// express app
const app = express()

// connect to mongodb
const dbURI = 'mongodb://127.0.0.1:27017/nodetuts'
mongoose.connect(dbURI)
    .then((result)=>console.log('connected to db'))
    .catch((err)=>console.log(err))

// register view engine
app.set('view engine', 'ejs')

// listem for requests
app.listen(3000)

// middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'))

// mongoose and mongo sandbox routes
app.get('/add-blog',(req, res)=>{
    const blog = new Blog(
        {
            title:'New Blog',
            snippet: 'about my new blog',
            body: 'more about my new blog'
        })
        blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{console.log(err)})
})

// routes
app.get('/',(req,res)=>{
    // res.send('<p>HOME PAGE</p>')
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'}
    ]
    res.render('index',{title: 'Home', blogs});
})

app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'})
})

// automaticaly looks into views folder
app.get ('/blog/create',(req,res)=>{
    res.render('create',{title: 'Create a New Blog'})
})

// 404
app.use((req,res)=>{
    res.status(404).render('404',{title: '404'})
})