import Editor from '@monaco-editor/react';
import { editor } from 'monaco-editor';
import React, { useRef } from 'react';
import { MonacoBinding } from 'y-monaco';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';
// Setup Monaco Editor
// Attach YJS Text to Monaco Editor

function App() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

  // Editor value -> YJS Text value (A text value shared by multiple people)
  // One person deletes text -> Deletes from the overall shared text value
  // Handled by YJS

  // Initialize YJS, tell it to listen to our Monaco instance for changes.

  const handleEditorDidMount = (currentEditor: editor.IStandaloneCodeEditor) => {
    editorRef.current = currentEditor;
    // Initialize YJS
    const doc = new Y.Doc(); // a collection of shared objects -> Text
    // Connect to peers (or start connection) with WebRTC
    const provider = new WebrtcProvider('test-room', doc); // room1, room2
    const type = doc.getText('monaco'); // doc { "monaco": "what our IDE is showing" }
    // Bind YJS to Monaco
    const model = editorRef.current?.getModel();
    if (model) {
      const binding = new MonacoBinding(
        type,
        model,
        new Set([editorRef.current]),

        provider.awareness
      );
      console.log(binding);
    }
    console.log(provider.awareness);
  };

  return (
    <Editor
      height="100vh"
      width="100vw"
      theme="vs-dark"
      defaultLanguage="JavaScript"
      onMount={handleEditorDidMount}
    />
  );
}

export default App;
