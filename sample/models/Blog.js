var mongoose = require ("mongoose");
var schema = mongoose.Schema;

// database schema
// var blogSchema = new schema({
// 	title: { type: String, required: true },
// 	likes: { type: Number, default: 0 },
// 	description: String,
// 	author: String,
// 	created: Date,
// 	tags: [String  /*array of strings*/ ],
// })

var blogSchema = new schema({
	title: String,
	likes: Number,
	description: String,
	author: String,
	created: Date,
	tags: [String  /*array of strings*/ ]
});

var Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;