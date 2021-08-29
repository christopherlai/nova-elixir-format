const willSave = require('willSave.js');

nova.workspace.onDidAddTextEditor((textEditor) => {willSave.listen(textEditor);});
