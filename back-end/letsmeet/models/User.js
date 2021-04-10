const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const uniqueValidator = require("mongoose-unique-validator");

const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	passwordHash: {type: String, required: true},
	name: {type: String, required: true},
    city: {type: String, required: false},
    state: {type: String, required: false},
	avatar: {type: String, required: false},
    friends: [
        {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    ]
});

// RAHUL: remove if don't need
// // apply uniqueValidator to UserSchema
// UserSchema.plugin(uniqueValidator);
// // hash & salt password in UserSchema: https://gist.github.com/thebopshoobop/f5ecc254c2ac92611e792d169a78ff3f
// UserSchema.methods.validPassword = function(password) {
// 	return bcrypt.compareSync(password, this.passwordHash);
// };
// UserSchema.virtual("password").set(function(value) {
// 	this.passwordHash = bcrypt.hashSync(value, saltRounds);
// });

module.exports = mongoose.model("User", UserSchema);