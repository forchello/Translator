export const checkSourceText = text => {
  if (text !== '') {
    const regex = new RegExp('.+(?!\\n\\t\\s\\r)');
    const result = text.match(regex);
    console.log(`1 result --> ${result}`);
    if (result !== null) {
      console.log(`result !== null --> ${result}`);
      return result;
    } else {
      console.log(`result === null --> ${result}`);
      //return result.slice(0, result.length - 1);
    }
  } else {
    console.log(`SourceText !== '' --> ${text}`);
    return text;
  }
};
