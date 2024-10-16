const vscode = require('vscode'); // Импортирует модуль vscode, который предоставляет API для работы с редактором vscode.
const translate = require('./keymap'); // импорт модуля keymap

function activate(context) {
    let disposable = vscode.commands.registerCommand('extension.translateRussian', () => { // создаем команду extension.translateRussian
        const editor = vscode.window.activeTextEditor; // создает редактор выделенного текста
        if (editor) {
            const text = editor.document.getText(editor.selection); // распаковывает редактор в текст
            if (!text) {
                vscode.window.showInformationMessage('Пожалуйста, выделите текст для перевода.'); // проверка выделен ли текст
                return;
            }
            const translatedText = translate(text); // вызывает функцию перевода текста
            editor.edit(editBuilder => { // задает редактирование редактора
                editBuilder.replace(editor.selection, translatedText); // земняет текст на переведенный
            });
        }
    });
}


module.exports = { // экспорт функций, для их поддержки
    activate
};
