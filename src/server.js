const app = require('./app')

app.listen(process.env.PORT ||3000, ()=>{
    console.log(`App executando na porta 3000`)
})