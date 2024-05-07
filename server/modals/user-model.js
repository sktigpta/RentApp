const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: Number,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    profilePicture: {
        type: String,
        require: true,
    },
    birthday: {
        type: Date,
    },
    isMember: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isUser: {
        type: Boolean,
        default: true,
    },
})


userSchema.pre('save', async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        return next();
    }

    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
        return next();
    } catch (error) {
        return next(error);
    }
});


//jwt webtoken Authentication or Authorisation
userSchema.methods.genetateToken = async function () {
    try {
        return jwt.sign({

            userID: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,

        },

            process.env.JWT_SIGNATURE_SECRET_KEY,
            {
                expiresIn: "20d",
            }
        )
    } catch (error) {
        console.log(error);
    }
};


//Mongo DB user Modal or Collection
const User = new mongoose.model("User", userSchema);

module.exports = User;