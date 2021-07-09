import React, { useRef, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-markdown';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/theme-monokai';

import copy from 'copy-to-clipboard';
import ReactMarkdown from 'react-markdown';
import { text, readme } from './data/filler';

import CodeBlock from './CodeBlock';

import './App.css';
import { Button, Nav, Container, Row, Col, Navbar } from 'react-bootstrap';
import ModalComponent from './components/Modal';
import ToastComponent from './components/Toast';
import { postAPI } from './api';

const App = () => {
  const [input, setInput] = useState(text);
  const [bgColor, setBgColor] = useState('white');
  const [toast, setToast] = useState({
    message: '',
    errors: false,
    show: false,
  });
  const [showModal, setShowModal] = useState(false);

  const outputScroll = useRef(null);
  const editorScroll = useRef(null);

  // Returns the max scroll height of the Editor
  // Used in calculating the ratio for sync scroll
  const getMaxEditorHeight = () => {
    let editor = editorScroll.current.editor;
    return (
      editor.renderer.layerConfig.maxHeight -
      editor.renderer.$size.scrollerHeight +
      editor.renderer.scrollMargin.bottom
    );
  };

  // Returns the max scroll height of the OUTPUT
  // Used in calculating the ratio for sync scroll
  const getMaxOutputHeight = () => {
    return (
      outputScroll.current.scrollHeight - outputScroll.current.clientHeight
    );
  };

  // Function fired when Editor is scrolled
  // Calculates the ratio of the Editor's Scroll Position
  // and sets the scroll position of the output respectively
  const handleEditorScroll = (e) => {
    let outputScrollToSet =
      (editorScroll.current.editor.getSession().getScrollTop() /
        getMaxEditorHeight()) *
      getMaxOutputHeight();

    // Algorithm - (Editor Scroll Position / Editor Max Height = Output Scroll Position / Output Max Height)
    outputScroll.current.scrollTop = outputScrollToSet;
  };

  // Function fired when Output is scrolled
  // Calculates the ratio of the Output's Scroll Position
  // and sets the scroll position of the editor respectively
  const handleOutputScroll = (e) => {
    let editorScrollToSet =
      (outputScroll.current.scrollTop / getMaxOutputHeight()) *
      getMaxEditorHeight();

    // Algorithm - (Editor Scroll Position / Editor Max Height = Output Scroll Position / Output Max Height)
    editorScroll.current.editor.getSession().setScrollTop(editorScrollToSet);
  };

  const isDark = () => {
    return bgColor === '#272822';
  };

  const copyToClipboard = () => {
    copy(input);
    setToast({ show: true, message: 'Copied to Clipboard', errors: false });
  };

  const openModal = () => {
    setShowModal(true);
  };

  const showToast = (message, errors) => {
    setToast({ show: true, message, errors });
  };

  const handleFormSubmit = (values) => {
    postAPI(values)
      .then((res) => {
        if (res.data.data) {
          showToast(`ReadMe Fetched`, false);
          setInput(res.data.data);
        } else {
          showToast(`Couldn't fetch data`, true);
        }
      })
      .catch((err) => {
        if (err) {
          showToast(`Couldn't fetch data`, true);
        }
      });
  };

  return (
    <Container fluid style={{ maxHeight: '100%', backgroundColor: bgColor }}>
      <Row>
        <Col xs={12} style={{ padding: '0' }}>
          <Navbar
            expand="lg"
            variant="dark"
            bg={isDark() ? 'secondary' : 'primary'}
            className={'shadow'}
          >
            <Navbar.Brand href="#">
              <strong>ReadMe Editor 🗒️</strong>
            </Navbar.Brand>
            <Nav
              className="ml-auto"
              style={{
                display: 'flex !important',
                flexDirection: 'row',
              }}
              variant="dark"
            >
              <Button
                onClick={() => setInput(readme)}
                variant={isDark() ? 'secondary' : 'primary'}
              >
                Generate Template
              </Button>
              <Button
                onClick={openModal}
                variant={isDark() ? 'secondary' : 'primary'}
              >
                Get from GitHub
              </Button>
              <Button
                onClick={copyToClipboard}
                style={{ marginRight: '1rem' }}
                variant={isDark() ? 'secondary' : 'primary'}
              >
                Copy To Clipboard
              </Button>
              <Button
                onClick={() => {
                  isDark() ? setBgColor('white') : setBgColor('#272822');
                }}
                variant={isDark() ? 'secondary' : 'primary'}
              >
                {isDark() ? '☀' : '🌙'}
              </Button>
            </Nav>
          </Navbar>
        </Col>
      </Row>
      <Row style={{ margin: '56px 5rem 0rem 5rem' }}>
        <React.Fragment>
          <Col
            xs={6}
            style={{
              backgroundColor: 'red',
              padding: '0',
              minHeight: 'calc(100vh - 112px)',
            }}
          >
            <AceEditor
              placeholder="Start with your notes"
              mode="markdown"
              theme={isDark() ? 'monokai' : 'github'}
              name="blah2"
              onChange={(e) => setInput(e)}
              fontSize={16}
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
          </Col>
          <Col
            xs={6}
            style={{
              backgroundColor: bgColor,
              borderLeft: '1px solid rgb(206, 206, 206)',
              maxHeight: 'calc(100vh - 112px)',
              overflow: 'auto',
              color: isDark() ? 'white' : 'black',
            }}
            ref={outputScroll}
            onScroll={handleOutputScroll}
          >
            <ReactMarkdown source={input} renderers={{ code: CodeBlock }} />
          </Col>
        </React.Fragment>
      </Row>
      <ToastComponent
        show={toast.show}
        handleClose={() => setToast({ ...toast, show: false })}
        bg={
          toast.errors ? 'bg-danger' : isDark() ? 'bg-secondary' : 'bg-primary'
        }
        message={toast.message}
      />
      <ModalComponent
        show={showModal}
        handleClose={() => setShowModal(false)}
        onFormSubmit={handleFormSubmit}
      />
    </Container>
  );
};
export default App;
