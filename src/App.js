import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactMarkdown from 'react-markdown';
import FillerText from './data/filler';
import { ScrollSync, ScrollSyncPane } from 'react-scroll-sync';

import CodeBlock from './CodeBlock';

import './App.css';

const App = () => {
  const [input, setInput] = useState(FillerText);
  const outputScroll = useRef(null);
  const editorScroll = useRef(null);

  const getMaxEditorHeight = () => {
    let editor = editorScroll.current.editor;
    return (
      editor.renderer.layerConfig.maxHeight -
      editor.renderer.$size.scrollerHeight +
      editor.renderer.scrollMargin.bottom
    );
  };

  const getMaxOutputHeight = () => {
    return (
      outputScroll.current.scrollHeight - outputScroll.current.clientHeight
    );
  };

  const handleEditorScroll = (e) => {
    let outputScrollToSet =
      (editorScroll.current.editor.getSession().getScrollTop() /
        getMaxEditorHeight()) *
      getMaxOutputHeight();
    outputScroll.current.scrollTop = outputScrollToSet;
  };

  const handleOutputScroll = (e) => {
    let editorScrollToSet =
      (outputScroll.current.scrollTop / getMaxOutputHeight()) *
      getMaxEditorHeight();
    editorScroll.current.editor.getSession().setScrollTop(editorScrollToSet);
  };

  return (
    <Container fluid style={{ maxHeight: '100vh' }}>
      <Row>
        <Col xs={12} style={{ padding: '0' }}>
          <Navbar expand="lg" variant="dark" bg="primary">
            <Navbar.Brand href="#">Joplin WEB</Navbar.Brand>
          </Navbar>
        </Col>
      </Row>
      <Row style={{ margin: '2rem 5rem' }}>
        <ScrollSync>
          <React.Fragment>
            <Col
              xs={6}
              style={{
                backgroundColor: 'red',
                padding: '0',
                minHeight: '500px',
              }}
            >
              <ScrollSyncPane>
                <AceEditor
                  placeholder="Placeholder Text"
                  mode="markdown"
                  theme="github"
                  name="blah2"
                  onChange={(e) => setInput(e)}
                  fontSize={14}
                  showPrintMargin={true}
                  showGutter={true}
                  highlightActiveLine={true}
                  value={input}
                  wrapEnabled={true}
                  height={'100%'}
                  width={'100%'}
                  onScroll={handleEditorScroll}
                  ref={editorScroll}
                />
              </ScrollSyncPane>
            </Col>
            <ScrollSyncPane>
              <Col
                xs={6}
                style={{
                  backgroundColor: 'white',
                  borderLeft: '1px solid rgb(206, 206, 206)',
                  maxHeight: 'calc(100vh - 56px)',
                  overflow: 'auto',
                }}
                ref={outputScroll}
                onScroll={handleOutputScroll}
              >
                <ReactMarkdown source={input} renderers={{ code: CodeBlock }} />
              </Col>
            </ScrollSyncPane>
          </React.Fragment>
        </ScrollSync>
      </Row>
    </Container>
  );
};
export default App;