var express = require('express');
var router = express.Router();
var mongoose =require('mongoose');
var appSchema = require('../app/models/appSchema.js');
var nodemailer = require('nodemailer');
let _ = require('lodash');

//passport for authentication
var passport = require('passport')
LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField: "identity",
    passwordField: "password"
  },
  function(username, password, done) {

    appSchema.user.findOne({$or:[{userName:username}, {email:username}]}, function(err, userData) {
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
    appSchema.user.findById(id, function(err, user) {
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

function addDocument(key, postData, result){
    // console.log(key);
    appSchema[key].create(postData, function(errOther, posts){
        // console.log(errOther, posts)
        if(errOther){
            result(errOther, null)
        }
        else{result(null, posts, key)}
    })
}

function updateDocument(id, update, document, result){
    appSchema[document].findByIdAndUpdate(id,
        update,
        { upsert:true, new : true},
        function(err, updates){
           if(err) result(err, null);
           else { result(null, updates)}
        }
    )
}
function pushDocument(id, update, document, result){
    appSchema[document].findByIdAndUpdate(id,
        {$push: update},
        {new : true},
        function(err, updates){
           if(err) result(err, null);
           else { result(null, updates)}
        }
    )
}

function addFilters(req, res, next){
    req.skip=parseInt(req.query.skip) || 0;
    req.limit=parseInt(req.query.limit) || 10;

    let conditions= req.query.filters  || {};

    if(typeof conditions!=="object")  conditions=JSON.parse(conditions)
    req.filters={status:'Active'};
    for(condition in conditions){
        req.filters[condition]=conditions[condition];
    }
    next();
}
function addOrQuery(req, res, next){
    let queryKeys= {} || req.query.queryKeys.split(',')
    req.queryKeys={$or:[]};
    for(key in queryKeys){
        req.queryKeys.$or.push({_id: queryKeys[key]});
    }
    next();
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
router.get('/inventory', addFilters, addOrQuery, function(req, res, next) {
    let toPopulate = req.query.populate || 'productManager inventorySettings'
    appSchema.inventory.find(req.filters)
    .skip(req.skip).limit(req.limit)
    .populate(toPopulate)
    // .populate(
    //     {
    //         path:'inventorySettings'
    //         match:{
    //             startTimeStamp:{$lte:Date.now()},
    //             closeTimeStamp:{$gte:Date.now()}
    //         }
    //     }
    // )
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
    appSchema.category.find()
    .populate('subCategories')
    .exec(function(err, category)
    {
        if(err) return next(err);
        res.json(category)
    })
});
router.get('/subcategory', function(req, res, next) {
    appSchema.subcategory.find()
    .populate('category')
    .exec(function(err, subcategory){
        if(err) return next(err);
        res.json(subcategory)
    })
});

//get a particular post
router.get('/inventory/:id', function(req, res, next){
    let toPopulate = req.query.populate || 'productManager inventorySettings';
    appSchema.inventory.findById(req.params.id)
    .populate(toPopulate)
    .exec(function(err, inventory){
        if(err)return next(err)
        res.json(inventory);
    })

});
router.get('/category/:id', function(req, res, next) {
    appSchema.category.findById(req.params.id, function(err, category){
        if(err) return next(err);
        res.json(category)
    })
});
router.get('/subcategory/:id', function(req, res, next) {
    appSchema.subcategory.find({category:req.params.id})
    .populate('category')
    .exec (function(err, subcategory){
        if(err) return next(err);
        res.json(subcategory)
    })
});
router.get('/userProfile/:id', function(req, res, next) {
    appSchema.user.findById(req.params.id)
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
router.post('/inventory',  function(req, res, next){
    appSchema.inventory.create( req.body, function(err, inventory){
        if(err) res.send(err);
        //if the inventory is added with extra features
        else if(req.body.others){
            inventoryExtra=req.body.others
            //take out the first feature enrty in the array
            features=inventoryExtra.shift()
            nextFeatures(features)
            function nextFeatures(Features){

                // extract the features from the object value
                var FeaturesValue=Features.value;
                var totalFeatures=Features.value.length;

                saveAll();
                function saveAll() {
                    var update={};
                    //extract the first feature from the features
                    currentFeatures = FeaturesValue.shift();
                    //assign the inventory's Id so that it can be easily referenced later
                    currentFeatures.inventoryId=inventory._id;

                    //send the features off to be added to the datbase
                    addDocument(Features.title, currentFeatures, function(err, result, dkey){
                        if(err) res.send(err)
                        else{
                            //set the returned id with the update object for the inventory's update task
                            update[dkey]=result._id
                            //update the inventory
                            pushDocument(inventory._id, update, 'inventory', function(err, updatedInventory){
                                if(err) res.send(err)
                                else{
                                    //check if there are still features remaining to add
                                    if (--totalFeatures){
                                        saveAll(); //then make a recursive call
                                    }
                                    else{
                                        // get a new extra feature
                                        newFeature = inventoryExtra.shift()

                                        //if there exists an extra feature then make a recursive call
                                        if(newFeature)   nextFeatures(newFeature)
                                        else{
                                            //else we are done, so send back the updated inventory
                                            res.json({message:"Inventory successfully Added!", updatedInventory});
                                        }
                                    }
                                }
                            });
                        }
                    });
                }
            }
        }
        else{
            res.json({message:"Inventory successfully Added!", inventory});
        }
    })
});
router.post('/category', function(req, res, next){
    appSchema.category.create(req.body, function(err, post){
        if(err) return next(err);
        res.json(post);
    })
});

router.post('/subcategory', function(req, res, next){
    appSchema.subcategory.create(req.body, function(err, post){
        if(err) return next(err)
        res.json(post);
    })

});
router.post('/user', function(req, res, next){
    appSchema.user.find({$or:[{userName:req.body.userName}, {email:req.body.email}]})
    .exec(function(err, user){
        if(err) return next(err);
        if(user.length==0){
                var newuser= new appSchema.user(req.body);
                newuser.save(function(err){
                    if (err) throw err;
                    // fetch user and test password verification
                    appSchema.user.findOne({$or:[{userName:req.body.userName}, {email:req.body.email}]}, function(err, userData) {
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
    emailbody+='Thank you for contacting us. Our representative will contact you shortly.';
    emailbody+='<br><br><b>Pronita Team</b>';
    var fromE="Pronita <info@pronita.com>";
    var subject="Thanks for contacting Pronita ";
    console.log(prepareEmail(fromE, params.email, subject, emailbody))

    subject = "An Online User contacted you.";
    emailbody= 'Dear Admin,<br> <br>';
    emailbody+= 'Find below User details:';
    emailbody+= '<br><b>User Email:</b> '+params.email;
    emailbody+= '<br><b>User Name:</b>'+params.name;
    emailbody+= '<br><b>User Phone Number:</b>'+params.phone;
    emailbody+= '<br><b>User Message:<b> '+params.message;
    fromE="Pronita Webmaster<info@pronita.com>";
    bcc='sholadedokun@yahoo.com';
    to='info@pronita.com';
    res.json(prepareEmail(fromE, to, subject, emailbody,bcc));
});
router.post('/addSubscriber', function(req, res, next){
    console.log(req.body.emailAddress)
    appSchema.emailSubscriber.find({emailAddress:req.body.emailAddress})
    .exec(function(err, emailSubscriber){
        if(err) return next(err);
        console.log(emailSubscriber.length);
        var subject;
        var emailbody;

        if(emailSubscriber.length==0){
            appSchema.emailSubscriber.create(req.body, function(err, emailSubscriber){
                if(err) return next(err)
                //res.json(emailSubscriber);
                // setup e-mail data with unicode symbols
                emailbody='<b>Dear Subscriber, </b> <br>';
                emailbody+='Thank you for subscribing to our Newsletter. We are glad to have you on board.';
                emailbody+='<br><br><b>Pronita Team</b>';
                subject='Thanks for subscribing to our Newsletter.';
            })
            res.json(prepareEmail('Pronita <info@pronita.com>', req.body.emailAddress, subject, emailbody));
        }
        else{   res.json({error:'You have already subscribed, thanks for trying again', data:emailSubscriber});   }
    })
});
router.post('/userLogin', passport.authenticate('local'), function(req, res, next) {
    res.json(req.user);
});
router.post('/likes',  function(req, res, next) {
    appSchema.likes.create(req.body, function(err, post){
        if(err) res.send(err)
        pushDocument(post.inventoryId, { likes:post._id }, 'inventory', function(err, updatedInventory){
            res.json({message:'Post was successfully liked', post, updatedInventory});
        })
    })
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
