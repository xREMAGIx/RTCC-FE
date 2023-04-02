import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import { MonacoBinding } from 'y-monaco';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import { MonacoStandaloneCodeEditor } from './types';

import { stringToColour } from 'utils/functions';

const doc = new Y.Doc();
const wsProvider = new WebsocketProvider('ws://localhost:1234', 'my-roomname', doc);
const yText = doc.getText('monaco'); // doc { "monaco": "what our IDE is showing" }

const Room: React.FC = () => {
  //* States
  const [clientIds, setClientIds] = useState<number[]>([]);

  //* Refs
  const editorRef = useRef<MonacoStandaloneCodeEditor | null>(null);

  const handleEditorDidMount = (currentEditor: MonacoStandaloneCodeEditor) => {
    editorRef.current = currentEditor;
    const model = editorRef.current?.getModel();
    if (model) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const binding = new MonacoBinding(
        yText,
        model,
        new Set([editorRef.current]),

        wsProvider.awareness
      );
    }
  };

  wsProvider.awareness.on('update', ({ added, updated, removed }: { added: number[], updated: number[], removed: number[] }) => {
    let list = [...clientIds];
    added.forEach((ele) => {
      if (!clientIds.includes(ele)) {
        list.push(ele);
      }
    });
    updated.forEach((ele) => {
      if (!clientIds.includes(ele)) {
        list.push(ele);
      }
    });
    removed.forEach((ele) => {
      if (!clientIds.includes(ele)) {
        list = list.filter((item) => item !== ele);
      }
    });
    setClientIds(list);
  });

  wsProvider.on('status', (event: any) => {
    console.log(event.status); // logs "connected" or "disconnected"
  });

  useEffect(() => {
    clientIds.forEach((ele) => {
      const remoteCursor = document.querySelector<HTMLDivElement>(`.yRemoteSelectionHead-${ele}`);
      if (remoteCursor) {
        const color = stringToColour(ele.toString());
        remoteCursor.style.setProperty('--cursor-color', color);
      }
    });
  }, [clientIds]);

  return (
    <div className="p-room">
      <div
        className="p-room_editor"
      >
        <Editor
          height="100vh"
          width="100vw"
          theme="vs-dark"
          defaultLanguage="javascript"
          onMount={handleEditorDidMount}
        />
      </div>
    </div>
  );
};

export default Room;
