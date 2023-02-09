require('dotenv').config();


const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const configuration = new Configuration({
    organization: "org-c2ismK4CBZUHx7BkFlcMAZtm",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// const response = await openai.listEngines();


const app = express()
app.use(bodyParser.json())
app.use(cors())
const port = 8000

app.post('/',async (req,res) => {
    const {message,currentModel} = req.body
    console.log(message)
    try{
    const response = await openai.createCompletion({
        model: `${currentModel}`,
        prompt: `${message}`,
        max_tokens: 300,
        temperature: 0.5,
      });
      res.json({
        message:response.data.choices[0].text
      })
    }catch(e){
        res.json({
            message:'I am Very Sorry I CouldNot Response Now '
          })
    }
})

app.get('/models',async (req,res) => {
    const response = await openai.listEngines();
    res.json({
        models : response.data.data
    })
})


app.listen(port,() => {
    console.log('app is running')
})