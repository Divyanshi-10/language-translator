const express = require("express");
const cors = require("cors");
const { translate } = require("@vitalets/google-translate-api");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.post("/translate", async function (req, res) {

    try {

        const { text, source, target } = req.body;

        const result = await translate(text, {
            from: source,
            to: target
        });

        res.json({
            translatedText: result.text
        });

    } catch (error) {

        console.error("FULL ERROR:", error);

        res.status(500).json({
            error: error.message
        });

    }

});

app.listen(PORT, function () {

    console.log(`Server started on port ${PORT}`);

});