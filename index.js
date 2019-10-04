import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/idea.css';
// This addon is required to be installed by the caller
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/addon/hint/show-hint';

import 'lsp-editor-adapter/lib/codemirror-lsp.css';
import { LspWsConnection, CodeMirrorAdapter } from 'lsp-editor-adapter';

let sample =
	`Type a dot to have "demo" completion`;

let editor = CodeMirror(document.querySelector('.editor'), {
	theme: 'idea',
	lineNumbers: true,
	value: sample,
	gutters: ['CodeMirror-lsp'],
});

let connection = new LspWsConnection({
	serverUri: 'ws://localhost:8025/my-language-server',
	languageId: "Demo",
	rootUri: 'file:///usr/src/app/sources',
	documentUri: 'file:///usr/src/app/sources/test.demo',
	documentText: () => editor.getValue(),
}).connect(new WebSocket('ws://localhost:8025/my-language-server'));

new CodeMirrorAdapter(connection, {
	quickSuggestionsDelay: 10,
}, editor);
