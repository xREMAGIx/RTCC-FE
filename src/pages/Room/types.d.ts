import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

// default themes
type Theme =
  | 'vs-dark'
  | 'light';

// monaco
export type Monaco = typeof monaco;
export type MonacoStandaloneCodeEditor = monaco.editor.IStandaloneCodeEditor;
