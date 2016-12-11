import Express from "express";

import path from "path";

const app = Express();


// serve all static content in public/ directory
app.use(Express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8080;
app.listen(PORT,
    () => console.log(`Express Production Server running at localhost:${PORT}`)
);

