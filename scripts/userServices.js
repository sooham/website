// CSRNG (Crypto secure hash function)
// openssl random pseudo bytes to generate salt
//
// Store
// store salt alongside hash in data base
//
// prepend salt infront of password
// PBKDF
//
// always hash on the server (hash with bcrypt or something)

var crypto = require("crypto");

module.exports = new(function() {
    this.validate = function(formData, userData, callback) {
        // prepend salt to the form data password and hash
        // hash username
        // compare them to stored data and password
        var formPassword = this.hash(userData.salt + formData.password);
        var formEmail = this.hash(formData.usermail);

        callback(formEmail === userData.usermail &&
            formPassword === userData.password);

    };

    this.generateRandomBytes = function(passLength, callback) {
        // A Crytographically Safe Random Number Generator
        // generate a random salt
        crypto.randomBytes(passLength, callback);
    };

    this.hash = function(input) {
        var h = crypto.createHash("sha256");
        return h.update(input).digest("hex");
    };
})();
