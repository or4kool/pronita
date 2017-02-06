var express = require('express');
var router = express.Router();

var mongoose=require('mongoose');
var adminSchema=require('../app/models/appSchema.js');
// var multer=require('multer');

/* GET users listing. */

router.get('/serverDate', function(req, res, next) {
    res.json({date:Date.now()});
})
router.get('/inventory', function(req, res, next) {
    adminSchema.inventory.find()
    .populate('biddingSettings')
    .sort({dateCreated:-1})
    .exec (function(err, inventory)
    {
        if(err) return next(err);
        res.json(inventory)
    })

});
router.get('/category', function(req, res, next){


    adminSchema.category.find()
    .populate('subCategories')
    .exec(function(err, category)
    {
        if(err) return next(err);
        res.json(category)
    })
});
router.get('/subcategory', function(req, res, next) {
    adminSchema.subcategory.find()
    .populate('category')
    .exec(function(err, subcategory){
        if(err) return next(err);
        res.json(subcategory)
    })
});

//get a particular post
router.get('/:id', function(req, res, next){
    adminSchema.inventory.findById(req.params.id)
    .populate(
        {
            path:'biddingHistory',
            populate:{path: 'userId'}
        })
    .populate(
        {
            path:'subCategory',
            populate:{path: 'category'}
        })
    .populate('biddingSettings inventoryTags')
    .exec(function(err, inventory){
        if(err)return next(err)
        res.json(inventory);
    })
});
router.get('/category/:id', function(req, res, next) {
    adminSchema.category.findById(req.params.id, function(err, category){
        if(err) return next(err);
        res.json(category)
    })
});
router.get('/subcategory/:id', function(req, res, next) {
    adminSchema.subcategory.find({category:req.params.id})
    .populate('category')
    .exec (function(err, subcategory){
        if(err) return next(err);
        res.json(subcategory)
    })
});
router.get('/userProfile/:id', function(req, res, next) {
    adminSchema.user.findById(req.params.id)
    .populate({
        path:'userBids',
        populate:{path: 'biddingSettings biddingHistory'}
    })
    .exec(function(err, user){
        if(err) return next(err);
        res.json(user)
    })
});
router.get('/userLogin/:id', function(req, res, next) {
    console.log(req.query)
    adminSchema.user.find({password:req.query.password, $or:[{email:req.query.identity}, {userName:req.query.identity}]})
    //.populate('userBids')
    .exec (function(err, user){
        if(err) return next(err);
        res.json(user)
    })
});

//send a post
// router.post('/multer', upload.single('file'));
router.post('/inventory', function(req, res, next){
    adminSchema.inventory.create(req.body, function(err, post){
        if(err) return next(err)
        req.body.propertyId=post._id;
        adminSchema.inventorySettings.create(req.body, function(err, newPost){
            var updates={biddingSettings:newPost._id}
            var posttag={tags:req.body.tag, propertyId:post._id }
            adminSchema.tags.create(posttag, function(err, tag){
                updates.inventoryTags=tag._id;
                adminSchema.inventory.findByIdAndUpdate(post._id, updates, function(err, update){
                    if(err)return next(err)
                    res.json(update)
                })
            })
        })
    })
});
router.post('/category', function(req, res, next){
    adminSchema.category.create(req.body, function(err, post){
        if(err) return next(err)
        res.json(post);
    })
});
router.post('/subcategory', function(req, res, next){
    adminSchema.subcategory.create(req.body, function(err, post){
        if(err) return next(err)
        res.json(post);
    })

});
router.post('/biddings', function(req, res, next){
    adminSchema.biddingHistory.create(req.body, function(err, post){
        if(err) return next(err)
        adminSchema.inventory.findByIdAndUpdate(
            req.body.inventory,
            {$push:{biddingHistory:post}},
            {safe: true, upsert: true, new : true},
            function(err, inventory){
                if(err)return next(err)
                adminSchema.user.findByIdAndUpdate(
                    req.body.userId,
                    {$push:{userBids:inventory}},
                    function(err, user){
                    if(err)return next(err)
                        res.json(inventory);
                    }
                )
            }
        )
    })

});
router.post('/user', function(req, res, next){
    adminSchema.user.find({$or:[{userName:req.body.userName}, {email:req.body.email}]})
    .exec(function(err, user){
        if(err) return next(err);
        console.log(user)
        if(user.length==0){
            adminSchema.user.create(req.body, function(err, user){
                if(err) return next(err)
                res.json(user);
            })
        }
        else{   res.json({error:'User Already Exist', data:user});   }
    })
});
router.put('/:id', function(req, res, next){
    console.log(req.body);
    console.log(req.body.biddingSettings);
    adminSchema.inventorySettings.findByIdAndUpdate(req.body.biddingSettings._id, req.body.biddingSettings, function(err, newPost){
        if(err)//return next(err)
        return console.log('error occured '+ err) ;
        adminSchema.inventory.findByIdAndUpdate(req.params.id, req.body, function(err, post){
             if(err)//return next(err)
             return console.log('error occured '+ err) ;
             adminSchema.tags.findByIdAndUpdate(req.body.inventoryTags._id, req.body.inventoryTags, function(err, tag){
                 if(err)//return next(err)
                 return console.log('error occured '+ err) ;
             })
             res.json('Update Successful')
        })
    })
    console.log('bef'+req.body.biddingSettings);



});
router.delete('/:id', function(req, res, next){
    Inventory.findByIdAndRemove(req.params.id, re.body, function(err, post){
        if(err)return next(err);
        res.json(post);
    })
})


module.exports = router;
