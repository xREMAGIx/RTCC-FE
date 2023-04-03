import Editor from '@monaco-editor/react';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MonacoBinding } from 'y-monaco';
import { WebsocketProvider } from 'y-websocket';
import * as Y from 'yjs';

import { MonacoStandaloneCodeEditor } from './types';

import Button from 'components/atoms/Button';
import Heading from 'components/atoms/Heading';
import Text from 'components/atoms/Text';
import Container from 'components/organisms/Container';
import { ROUTES } from 'utils/constants';
import { stringToColour } from 'utils/functions';

const Room: React.FC = () => {
  //* Hooks
  const navigation = useNavigate();
  const { code: roomId } = useParams();

  //* States
  const [ydoc, setYdoc] = useState<Y.Doc | null>(null);
  const [editor, setEditor] = useState<MonacoStandaloneCodeEditor>();

  //* Refs
  const editorRef = useRef<MonacoStandaloneCodeEditor | null>(null);
  const clientIdsRef = useRef<number[]>([]);

  //* Functions
  const handleLeaveRoom = () => {
    navigation(`/${ROUTES.HOME}`);
  };

  const handleEditorDidMount = (currentEditor: MonacoStandaloneCodeEditor) => {
    editorRef.current = currentEditor;
    setEditor(currentEditor);
  };

  const handleCursors = ({ added, updated, removed }:
    { added: number[], updated: number[], removed: number[] }) => {
    let list = [...clientIdsRef.current];
    added.forEach((ele) => {
      if (!list.includes(ele)) {
        list.push(ele);
      }
    });
    updated.forEach((ele) => {
      if (!list.includes(ele)) {
        list.push(ele);
      }
    });
    removed.forEach((ele) => {
      if (!list.includes(ele)) {
        list = list.filter((item) => item !== ele);
      }
    });

    list.forEach((ele) => {
      const remoteCursor = document.querySelector<HTMLDivElement>(`.yRemoteSelectionHead-${ele}`);
      if (remoteCursor) {
        const color = stringToColour(ele.toString());
        remoteCursor.style.borderColor = color;
      }
    });
    clientIdsRef.current = list;
  };

  //* Effects
  useEffect(() => {
    if (!ydoc) {
      const doc = new Y.Doc();
      setYdoc(doc);
    }
  }, [ydoc]);

  useEffect(() => {
    if (roomId && ydoc) {
      const websocket = new WebSocket(`ws://localhost:8080/${roomId}`);
      const wsProvider = new WebsocketProvider('ws://localhost:1234', roomId, ydoc);

      const yText = ydoc?.getText('monaco');

      // Set up event listeners for updates
      // yText?.observe(() => {
      //   // Update the state of your component with the new data
      //   console.log('New text:', yText.toString());
      // });

      const model = editor?.getModel();

      if (model && editor) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const binding = new MonacoBinding(
          yText,
          model,
          new Set([editor]),

          wsProvider.awareness
        );
      }

      wsProvider.awareness.on('update', handleCursors);

      return () => {
        wsProvider.disconnect();
        websocket.close();
      };
    }

    return () => { };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, ydoc, editor]);

  return (
    <div className="p-room">
      <Container>
        <div className="p-room_header">
          <Heading
            modifiers={['20x30', 'eerieBlack', '700']}
            content={`Room: ${roomId}`}
          />
          <div className="p-home_create_room_btn">
            <Button
              modifiers={['primary', 'lg']}
              type="button"
              onClick={handleLeaveRoom}
            >
              <Text modifiers={['16x24', '600', 'white', 'center']} content="Leave room" />
            </Button>
          </div>
        </div>
      </Container>
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
