var express = require('express');
var router = express.Router();
var mongoose=require('mongoose');
var adminSchema=require('../app/models/appSchema.js');
var nodemailer = require('nodemailer');
//passport for authentication
var passport = require('passport')
LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField: "identity",
    passwordField: "password"
  },
  function(username, password, done) {

    adminSchema.user.findOne({$or:[{userName:username}, {email:username}]}, function(err, userData) {
        if (err) return done(err);
        if (!userData){
            return done(null, false, {message: "Wrong Username"} )
        }
        // test a matching password
        userData.comparePassword(password, function(err, isMatch) {
            if (err) return done(err);
            if(isMatch){
                return done(null, userData);
            //    res.json(userData);
            }
            else{
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    })

  }
));
passport.serializeUser(function (user, done) {
        done(null,user._id);
//    done(user.Id); // the user id that you have in the session
});

passport.deserializeUser(function (id, done) {
    adminSchema.user.findById(id, function(err, user) {
    done(err, user);
  });

//    done({id: Id}); // generally this is done against user database as validation
});
//email configurations
var smtpConfig = {
    host: 'box875.bluehost.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'info@pronita.com',
        pass: 'Pronita1@'
    }
};
var transporter = nodemailer.createTransport(smtpConfig)
// verify connection configuration
// transporter.verify(function(error, success) {
//    if (error) {
//         console.log(error);
//    } else {
//         console.log('Server is ready to take our messages');
//    }
// });
function prepareEmail(from, to, subject, message, bcc){
    var mailOptions = {
        'from': from, // sender address
        'to': to, // list of receivers
        'bcc':bcc,
        'subject': subject, // Subject line
        //text: 'Dear Subscriber,', // plaintext body
        html: message // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        return 'Message sent: ' + info.response;
    });
}

function addDocument(key, postData){
    // console.log(postData[key])
    console.log(adminSchema.keyFeatures)
    adminSchema[key].create(postData[key], function(errOther, posts){
        if(errOther){
            console.log('errOther'); return (errOther);
        }
        console.log(posts)
        return posts;
    })
}

function updateDocument(id, update, document){
    adminSchema[document].findByIdAndUpdate(id,
        {$push:update},
        {safe: true, new : true},
        function(err, updates){
           if(err)return next(err)
        }
    )
}
/* GET users listing. */

router.get('/serverDate', function(req, res, next) {
    res.json({date:Date.now()});
})
router.get('/checkLoggedin', function(req, res, next) {
    res.json(req.session.passport);
})
router.get('/logOut', function(req, res, next) {
    req.logout();
    res.send(200);
})
router.get('/inventory', function(req, res, next) {
    adminSchema.inventory.find({status:'active'})
    .populate(
        {
            path:'productManager',
            populate:{path: 'userId'}
        })
    .populate(
        {
            path:'inventorySettings',
            match:{
                startTimeStamp:{$lte:Date.now()},
                closeTimeStamp:{$gte:Date.now()}
            }
        }
    )
    //  .where('inventorySettings.startTimeStamp').$lte(Date.now())
    //  .where('inventorySettings.closeTimeStamp').$gte(Date.now())
    .sort({dateCreated:-1})
    .exec (function(err, inventory)
    {
        if(err) return next(err);
        inventory = inventory.filter(function(invent){
            if(invent.inventorySettings) return true;
           })
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
    adminSchema.inventory.findById(req.params.id, function(err, inventory){
        if(err)return next(err)
        res.json(post);
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
        path:'userTests',
        populate:{path: 'inventorySettings productManager'}
    })
    .exec(function(err, user){
        if(err) return next(err);
        res.json(user)
    })
});

// send a post

router.post('/inventory', function(req, res, next){
    adminSchema.inventory.create( req.body, function(err, inventory){
        if(err) res.send(err);
        else if(req.body.others){
            inventoryExtra=req.body.others
            var update={};
            a=0;
            for(var  key in inventoryExtra){
                updateD=key;

                inventoryExtra[key].inventoryId=inventory._id;
                // add each to the database
                addDocument(key, inventoryExtra[key], function(err, result, dkey){
                    if(err) res.send(err)
                    else{
                        update[dkey]=result._id
                        updateDocument(inventory._id, update, 'inventory', function(err, updates){
                            if(err) res.send(err)
                            else{
                                inventory=updates;
                                if(a==Object.keys(inventoryExtra).length-1){
                                    res.json({message:"Inventory successfully Added!", inventory});
                                }
                                a++
                            }
                        });
                    }
                });

            }
        }
        else{
            res.json({message:"Inventory successfully Added!", inventory});
        }
    })
});

router.post('/category', function(req, res, next){
    adminSchema.category.create(req.body, function(err, post){
        if(err) return next(err);
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
    adminSchema.productManager.create(req.body, function(err, post){
        if(err) return next(err)
        adminSchema.inventory.findByIdAndUpdate(
            req.body.inventoryId,
            {$push:{productManager:post}},
            {safe: true, upsert: true, new : true},
            function(err, inventory){
                if(err)return next(err)
                adminSchema.user.findByIdAndUpdate(
                    req.body.userId,
                    {$push:{userTests:inventory}},
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
        if(user.length==0){
                var newuser= new adminSchema.user(req.body);
                newuser.save(function(err){
                    if (err) throw err;
                    // fetch user and test password verification
                    adminSchema.user.findOne({$or:[{userName:req.body.userName}, {email:req.body.email}]}, function(err, userData) {
                        if (err) throw err;

                        // test a matching password
                        userData.comparePassword(req.body.password, function(err, isMatch) {
                            if (err) throw err;
                            if(isMatch){
                                res.json(userData);
                            };
                        });
                    })
                })
        }
        else{   res.json({error:'User Already Exist', data:user});   }
    })
});

router.post('/contact', function(req, res, next){
    var params=req.body;
    console.log(params)
    var emailbody='<b>Dear '+params.name+', </b> <br>';
    emailbody+='Thank you for contacting our Auction House. Our representative will contact you shortly.';
    emailbody+='<br><br><b>3A Auction House Team</b>';
    var fromE="3A Auction House<info@3aauctions.com>";
    var subject="Thanks for contacting 3A Auction House";
    console.log(prepareEmail(fromE, params.email, subject, emailbody))

    subject = "An Online User contacted you.";
    emailbody= 'Dear Admin,<br> <br>';
    emailbody+= 'Find below User details:';
    emailbody+= '<br><b>User Email:</b> '+params.email;
    emailbody+= '<br><b>User Name:</b>'+params.name;
    emailbody+= '<br><b>User Phone Number:</b>'+params.phone;
    emailbody+= '<br><b>User Message:<b> '+params.message;
    fromE="3A Auction House Webmaster<info@3aauctions.com>";
    bcc='sholadedokun@yahoo.com';
    to='info@3aauctions.com';
    res.json(prepareEmail(fromE, to, subject, emailbody,bcc));
});
router.post('/addSubscriber', function(req, res, next){
    console.log(req.body.emailAddress)
    adminSchema.emailSubscriber.find({emailAddress:req.body.emailAddress})
    .exec(function(err, emailSubscriber){
        if(err) return next(err);
        console.log(emailSubscriber.length);
        var subject;
        var emailbody;

        if(emailSubscriber.length==0){
            adminSchema.emailSubscriber.create(req.body, function(err, emailSubscriber){
                if(err) return next(err)
                //res.json(emailSubscriber);
                // setup e-mail data with unicode symbols
                emailbody='<b>Dear Subscriber, </b> <br>';
                emailbody+='Thank you for subscribing to our Newsletter. We are glad to have you on board.';
                emailbody+='<br><br><b>3A Auction House Team</b>';
                subject='Thanks for subscribing to our Newsletter.';
            })
            res.json(prepareEmail('3A Auction House<info@3aauctions.com>', req.body.emailAddress, subject, emailbody));
        }
        else{   res.json({error:'You have already subscribed, thanks for trying again', data:emailSubscriber});   }
    })
});
router.post('/userLogin', passport.authenticate('local'), function(req, res, next) {
    res.json(req.user);
});
router.put('/:id', function(req, res, next){
    Inventory.findByIdAndUpdate(req.params.id, req.body, function(err, post){
        if(err)return next(err)
        res.json(post)
    })
});
router.delete('/:id', function(req, res, next){
    Inventory.findByIdAndRemove(req.params.id, re.body, function(err, post){
        if(err)return next(err);
        res.json(post);
    })
})


module.exports = router;
