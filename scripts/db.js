// callbacks in mongo are of the form function (error, result) {if (error) handler(); else do some other shit}
var mongoose = require("mongoose");

mongoose.connect("./data/db", { config: { autoIndex: false}});

var Database = module.exports = function(connection) {
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

    this.tagsSchema = new mongoose.Schema({
            name: {type: String, trim: true};
        }, {collection: "tags"});
    this.tagsSchema.index({ name: 1});

    this.blog = connection.model("blog", this.blogSchema);
    this.projects = connection.model("projects", this.projectsSchema);
    this.tags = connection.model("tags", this.tagsSchema);
};

Database.prototype.getAllBlogPosts = function (callback) {
    this.blog.find(callback);
}

Database.prototype.findAllWithTag = function (tag, callback) {
    this.blog.find({tags: {$in: [tag]}}, callback);
};

Database.prototype.removeBlogPostWithTitle = function(title, callback) {
    this.blog.remove({"title": title}, callback);
};
