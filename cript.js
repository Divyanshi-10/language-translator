[1mdiff --git a/server.js b/server.js[m
[1mindex 4b33d28..6f9296e 100644[m
[1m--- a/server.js[m
[1m+++ b/server.js[m
[36m@@ -1,13 +1,13 @@[m
 const express = require("express");[m
 const cors = require("cors");[m
[31m-const { translate } = require("@vitalets/google-translate-api");;[m
[32m+[m[32mconst { translate } = require("@vitalets/google-translate-api");[m
 [m
 const app = express();[m
[32m+[m
 app.use(cors());[m
 app.use(express.json());[m
 [m
[31m-[m
[31m-const PORT = 3000;[m
[32m+[m[32mconst PORT = process.env.PORT || 3000;[m
 [m
 app.post("/translate", async function (req, res) {[m
 [m
[36m@@ -16,9 +16,9 @@[m [mapp.post("/translate", async function (req, res) {[m
         const { text, source, target } = req.body;[m
 [m
         const result = await translate(text, {[m
[31m-    from: source,[m
[31m-    to: target[m
[31m-});[m
[32m+[m[32m            from: source,[m
[32m+[m[32m            to: target[m
[32m+[m[32m        });[m
 [m
         res.json({[m
             translatedText: result.text[m
[36m@@ -26,28 +26,18 @@[m [mapp.post("/translate", async function (req, res) {[m
 [m
     } catch (error) {[m
 [m
[31m-    console.error("FULL ERROR:", error);[m
[31m-    console.error("MESSAGE:", error.message);[m
[31m-    console.error("STACK:", error.stack);[m
[32m+[m[32m        console.error("FULL ERROR:", error);[m
 [m
[31m-    res.status(500).json({[m
[31m-        error: error.message[m
[31m-    });[m
[32m+[m[32m        res.status(500).json({[m
[32m+[m[32m            error: error.message[m
[32m+[m[32m        });[m
 [m
[31m-}[m
[32m+[m[32m    }[m
 [m
 });[m
 [m
[31m-const express = require("express");[m
[31m-const cors = require("cors");[m
[31m-[m
[31m-const app = express();[m
[31m-[m
[31m-app.use(cors());[m
[31m-app.use(express.json());[m
[31m-[m
[31m-const PORT = process.env.PORT || 3000;[m
[31m-[m
 app.listen(PORT, function () {[m
[32m+[m
     console.log(`Server started on port ${PORT}`);[m
[32m+[m
 });[m
\ No newline at end of file[m
