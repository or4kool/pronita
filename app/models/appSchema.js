var mongoose=require('mongoose');
var Schema = mongoose.Schema
var bcrypt= require('bcrypt-nodejs');
var SALT_WORK_FACTOR=10;
var inventorySchema= new Schema({
    category: {type:Schema.Types.ObjectId, ref:'category'},
    subCategory:{type:Schema.Types.ObjectId, ref:'subcategory'},
    productManager:{type:Schema.Types.ObjectId, ref:'user'},
    type:String,
    name:String,
    description:String,
    address:String,
    lg:String,
    state:String,
    country:String,
    profilePic:String,
    allPic:String,
    status:String,
    rate:Number,
    keyFeatures:[{type:Schema.Types.ObjectId, ref:'keyFeatures'}],
    inventorySettings:{type:Schema.Types.ObjectId, ref:'inventorySettings'},
    specification:[{type:Schema.Types.ObjectId, ref:'specification'}],
    offerDetails:[{type:Schema.Types.ObjectId, ref:'offerDetails'}],
    offerConditions:[{type:Schema.Types.ObjectId, ref:'offerConditions'}],
    likes:[{type:Schema.Types.ObjectId, ref:'likes'}],
    comments:[{type:Schema.Types.ObjectId, ref:'comments'}],
    dateCreated:{ type: Date, default: Date.now },
    lastUpdated:{ type: Date, default: Date.now }
});
var keyFeaturesSchema= new Schema({
    title: String,
    description: String,
    propertyId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var specificationSchema= new Schema({
    title: String,
    description: String,
    propertyId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var offerDetailsSchema= new Schema({
    title: String,
    description: String,
    propertyId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var offerConditionsSchema= new Schema({
    title: String,
    description: String,
    propertyId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var likesSchema= new Schema({
    user: {type:Schema.Types.ObjectId, ref:'user'},
    propertyId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var commentsSchema= new Schema({
    user: {type:Schema.Types.ObjectId, ref:'user'},
    propertyId:{type:Schema.Types.ObjectId, ref:'inventory'},
    comment:String,
    dateCreated:{type: Date, default: Date.now}
});
var inventorySettingsSchema= new Schema({
    price: Number,
    discount: Number,
    expiryDate:String,
    propertyId:{type:Schema.Types.ObjectId, ref:'inventory'},
    dateCreated:{type: Date, default: Date.now}
});
var categorySchema= new Schema({
    name: String,
    description: String,
    avartar:String,
    subCategories:[{type:Schema.Types.ObjectId, ref:'subcategory'}],
    dateCreated:{type: Date, default: Date.now}
})
var subCategorySchema= new Schema({
    category:{type:Schema.Types.ObjectId, ref:'category'},
    SubCategoryname: String,
    description: String,
    avartar:String,
    dateCreated:{type: Date, default: Date.now}
})
var userSchema= new Schema({
    firstName:String,
    lastName:String,
    userName:{type:String, required:true, index:{unique:true, dropDups: true}},
    location:String,
    email:{type:String, required:true, index:{unique:true, dropDups: true}},
    password:{type:String, required:true},
    phone:String,
    userTests:[{type:Schema.Types.ObjectId, ref:'inventory'}],
    userProducts:[{type:Schema.Types.ObjectId, ref:'inventory'}],
    dateCreated:{ type: Date, default: Date.now },
    lastLogin:{ type: Date, default: Date.now }
})

userSchema.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
var tagSchema= new Schema({
    propertyId:{type:Schema.Types.ObjectId, ref:'inventory'},
    tags:String,
    dateCreated:{ type: Date, default: Date.now },
    lastUpdated:{ type: Date, default: Date.now }
})

var emailSubscriberSchema= new Schema({
    emailAddress:String,
    source:String,
    dateCreated:{ type: Date, default: Date.now }
})
module.exports.inventory = mongoose.model('inventory', inventorySchema);
module.exports.category= mongoose.model('category', categorySchema);
module.exports.subcategory= mongoose.model('subcategory', subCategorySchema);
module.exports.inventorySettings = mongoose.model('inventorySettings', inventorySettingsSchema);
module.exports.user = mongoose.model('user', userSchema);
module.exports.tags = mongoose.model('tags', tagSchema);
module.exports.emailSubscriber = mongoose.model('emailSubscriber', emailSubscriberSchema);
module.exports.keyFeatures = mongoose.model('keyFeatures', keyFeaturesSchema);
module.exports.specification= mongoose.model('specification', specificationSchema);
module.exports.offerDetails = mongoose.model('offerDetails', offerDetailsSchema);
module.exports.offerConditions = mongoose.model('offerConditions', offerConditionsSchema);
module.exports.likes = mongoose.model('likes', likesSchema);
module.exports.comments = mongoose.model('comments', commentsSchema);
