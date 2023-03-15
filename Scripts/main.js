const willSave = require('willSave.js');

nova.workspace.onDidAddTextEditor(textEditor => {
    if (textEditor.document.syntax != "elixir") {
        console.warn("Exiting early; document syntax not Elixir.");
        return;
    }

    willSave.listen(textEditor);
});
