const format = require('format.js');

exports.listen = (textEditor) => {
  textEditor.onWillSave(runFormat);
}

const runFormat = (textEditor) => {
  const document = textEditor.document;
  const contentLength = document.length;
  const range = new Range(0, contentLength);
  const unformattedContent = document.getTextInRange(range);

  return format.run(unformattedContent)
  .then((formattedContent) => {
    return textEditor.edit((textEditorEdit) => {
      textEditorEdit.replace(range, formattedContent);
    })
  })
  .catch((error) =>{console.log(error);});
}
