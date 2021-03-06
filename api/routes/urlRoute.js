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

/**
 * @swagger
 * /shorten:
 *   post:
 *     description: Generate a new shortened URL
 *     parameters:
 *      - name: longUrl
 *        description: Original URL to be shortened
 *        in: body
 *        required: true
 *        type: string
 *     responses:
 *      201: 
 *       description: Created new short URL successfully!
 *      200:
 *       description: URL already exists in database!
 *      400:
 *       description: Invalid URL syntax!
 */

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
        res.status(201).json({
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

/**
 * @swagger
 * /{slug}:
 *   get: 
 *    description: Redirects to the expanded original URL
 *    parameters:
 *     - in: path
 *       name: slug
 *       required: true
 *       description: The shortened URL slug for your original URL
 *    responses:
 *     '200':
 *      description: A successful URL redirect!
 *     '404':
 *      description: URL not found!
 */

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