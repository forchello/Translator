import { translate } from "free-translate";

const translateText = async ( FromText, FromLang, ToLang ) => {
    const ToText = await translate(FromText, {from: FromLang, to: ToLang});
    return ToText;
}

export { translateText };