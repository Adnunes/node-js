const express = require('express')
const morgan = require('morgan')
const dbURI = 'mongodb://localhost:27017/'

// express app
const app = express()

// register view engine
app.set('view engine', 'ejs')

// listem for requests
app.listen(3000)

// middleware and static files
app.use(express.static('public'))
app.use(morgan('dev'))

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