const vscode = require('vscode');
const translate = require('./keymap'); // Убедитесь, что путь правильный

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.translateRussian', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const text = editor.document.getText(editor.selection);
            if (!text) {
                vscode.window.showInformationMessage('Пожалуйста, выделите текст для перевода.');
                return;
            }
            const translatedText = translate(text);
            editor.edit(editBuilder => {
                editBuilder.replace(editor.selection, translatedText);
            });
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
