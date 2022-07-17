import { translateText } from "../services/translateText.js";

const postTranslate = async ( req, res ) => {
    const { FromText, FromLang, ToLang } = req.body;

    const text = await translateText( FromText, FromLang, ToLang );
    res.status(200).json({translatedText : text})
};

export {postTranslate};