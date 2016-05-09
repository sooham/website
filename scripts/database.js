/* Blog's database object */

var mongoose = require("mongoose");

var Database = module.exports = function() {
   this.connection = mongoose.connect(
        "mongodb://localhost:27017/data/db",
        { config: { autoIndex: false}}
    );

    this.blogSchema = new mongoose.Schema({
        title: {type: String, trim: true},
        tags: [String],
        date: {type: Date, default: Date.now()},
        body: String,
    }, {minimize: "false"});
    this.blogSchema.index({ date: 1});

    this.projectsSchema = new mongoose.Schema({
        title: {type: String, trim: true},
        startDate: Date,
        technologies: [String],
        daysOfWork: {type: Number, min: 0},
        description: String
    }, {collection: "projects"});
    this.projectsSchema.index({ title: 1});

    this.tagsSchema = new mongoose.Schema(
        {name: {type: String, trim: true}},
        {collection: "tags"}
    );
    this.tagsSchema.index({ name: 1});

    this.userSchema = new mongoose.Schema({
        usermail: String,
        password: String,
        salt: String,
        loginSession: String
    });

    this.blog = this.connection.model("blog", this.blogSchema);
    this.projects = this.connection.model("projects", this.projectsSchema);
    this.tags = this.connection.model("tags", this.tagsSchema);
    this.user = this.connection.model("user", this.userSchema);
};

Database.prototype.findPostWithTitle = function(name, callback) {
    this.blog.find({title: name}, callback);
};

Database.prototype.findAllPosts = function (callback) {
    this.blog.find(callback);
};

Database.prototype.findAllProjects = function (callback) {
    this.projects.find(callback);
};

Database.prototype.findAllPostsWithTag = function (tag, callback) {
    this.blog.find({tags: tag}, callback);
};

Database.prototype.removePostWithTitle = function(name, callback) {
    this.blog.remove({title: name}, callback);
};

// make sure blog post does not prexist before calling
Database.prototype.savePost = function(post, callback) {
    var newPost = new this.blog(post);
    newPost.save(callback);
};

Database.prototype.getSoohamLoginCredentials = function (callback) {
    this.user.find(callback);
};

// TODO: Add methods to update post
