const router=require('express').Router()
const validUrl = require('valid-url')
const shortid = require('shortid')

const urlModel=require('../models/Url')
const { base } = require('../models/Url')

const baseUrl='http://localhost:3000'
const errormsg = (err) => {
    res.status(500).json({
        message: 'Internal server error!',
        error: err
    })
}


router.post('/shorten', async (req, res)=>{
    const {longUrl}=req.body

    if(!validUrl.isUri(baseUrl)){
        return res.status(400).json({
            error: 'Invalid base URL set!!'
        })
    }
    if(!validUrl.isUri(longUrl)){
        return res.status(400).json({
            error: 'Invalid long URL entered!!'
        })
    }
    const slug=shortid.generate()    
    try{
        let url=await urlModel.findOne({longUrl})
        if(url){
            return res.status(200).json({
                message: 'URL already exists!!',
                url:{
                    shortUrl: url.shortUrl,
                    longUrl: url.longUrl
                }
            })
        }
        const shortUrl=baseUrl+'/'+slug
        const newUrl=new urlModel({
            slug,
            longUrl,
            shortUrl
        })
        await newUrl.save()
        res.status(200).json({
            message: 'URL shortened successfully!!',
            newUrl:{
                shortUrl,
                longUrl
            }
        })
    }
    catch(err){
        errormsg(err)
    }
})

router.get('/:slug', async (req, res)=>{
    try{
        let url=await urlModel.findOne({slug: req.params.slug})
        if(url) return res.redirect(url.longUrl)
        return res.status(404).json({
            message: 'No URL found!!'
        })
    }
    catch(err){
        errormsg(err)
    }
})

module.exports=router