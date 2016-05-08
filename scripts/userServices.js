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

// CSRNG
var salt = crypto.randomBytes(length, function (err, result) {
    if (err)
        // throw error
    else
        result.toString("hex");

});
var sha256Hash = crypto.createHash("sha256");

module.exports = 
