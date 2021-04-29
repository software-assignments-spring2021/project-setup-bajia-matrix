const mongoose = require("mongoose");
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	passwordHash: {type: String, required: true, select: false}, // to retrieve the passwordHash do User.findOne({_id: <id>}).select("+passwordHash")
	name: {type: String, required: true},
    city: {type: String, required: false},
    state: {type: String, required: false},
	avatar: {type: String, required: false},
    friends: [
        {
            _id: false,
            id: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true},
            name: {type: String, required: true},
            email: {type: String, required: true}
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
