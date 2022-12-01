/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-ui/core";
import React, { useRef } from "react";

import { createReactEditorJS } from "react-editor-js";

import { EDITOR_JS_TOOLS } from "./tools";

// import EditorJS from '@editorjs/editorjs';
// import Header from '@editorjs/header';

// const DEFAULT_INITIAL_DATA = () => {
//   return {
//     "time": new Date().getTime(),
//     "blocks": [
//       {
//         "type": "header",
//         "data": {
//           "text": "This is my awesome editor!",
//           "level": 1
//         }
//       },
//     ]
//   }
// }

const EditorJS = createReactEditorJS();

const INITIAL_DATA = {
  time: 1556098174501,
  blocks: [
    {
      type: "header",
      data: {
        text: "Editor.js",
        level: 2,
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Hey. Meet the new Editor. On this page you can see it in action — try to edit this text.",
      },
    },
    {
      type: "header",
      data: {
        text: "Key features",
        level: 3,
      },
    },
    {
      type: "list",
      data: {
        style: "unordered",
        items: [
          "It is a block-styled editor",
          "It returns clean data output in JSON",
          "Designed to be extendable and pluggable with a simple API",
        ],
      },
    },
    {
      type: "header",
      data: {
        text: "What does it mean «block-styled editor»",
        level: 3,
      },
    },
    {
      type: "paragraph",
      data: {
        text: 'Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
      },
    },
    {
      type: "paragraph",
      data: {
        text: 'There are dozens of <a href="https://github.com/editor-js">ready-to-use Blocks</a> and the <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons and even games.',
      },
    },
    {
      type: "header",
      data: {
        text: "What does it mean clean data output",
        level: 3,
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Classic WYSIWYG-editors produce raw HTML-markup with both content data and content appearance. On the contrary, Editor.js outputs JSON object with data of each Block. You can see an example below",
      },
    },
    {
      type: "paragraph",
      data: {
        text: 'Given data can be used as you want: render with HTML for <code class="inline-code">Web clients</code>, render natively for <code class="inline-code">mobile apps</code>, create markup for <code class="inline-code">Facebook Instant Articles</code> or <code class="inline-code">Google AMP</code>, generate an <code class="inline-code">audio version</code> and so on.',
      },
    },
    {
      type: "paragraph",
      data: {
        text: "Clean data is useful to sanitize, validate and process on the backend.",
      },
    },
    {
      type: "delimiter",
      data: {},
    },
    {
      type: "paragraph",
      data: {
        text: "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
      },
    },
    {
      type: "image",
      data: {
        file: {
          url: "https://static.ngs.ru/news/99/preview/6fb111fe445ce3fec474e9c9c33b53f203427d03_1280.jpg",
        },
        caption: "",
        withBorder: true,
        stretched: false,
        withBackground: false,
      },
    },
  ],
  version: "2.12.4",
};

const EDITTOR_HOLDER_ID = "editorjs";

const Editor = (props) => {
  // const ejInstance = useRef();
  // const [editorData, setEditorData] = React.useState(DEFAULT_INITIAL_DATA);

  // This will run only once
  // useEffect(() => {
  //   if (!ejInstance.current) {
  //     initEditor();
  //   }
  //   return () => {
  //     ejInstance.current.destroy();
  //     ejInstance.current = null;
  //   }
  // }, []);

  // const initEditor = () => {
  //   const editor = new EditorJS({
  //     holder: EDITTOR_HOLDER_ID,
  //     logLevel: "ERROR",
  //     data: editorData,
  //     onReady: () => {
  //       ejInstance.current = editor;
  //     },
  //     onChange: async () => {
  //       let content = await this.editorjs.saver.save();
  //       // Put your logic here to save this data to your DB
  //       setEditorData(content);
  //     },
  //     autofocus: true,
  //     tools: {
  //       header: Header,
  //     },
  //   });
  // };
  const editorCore = React.useRef(null);

  const handleInitialize = React.useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = React.useCallback(async () => {
    const savedData = await editorCore.current.save();
    console.log(savedData);
  }, []);

  return (
    <React.Fragment>
      <div id={EDITTOR_HOLDER_ID}>
        <EditorJS
          onInitialize={handleInitialize}
          tools={EDITOR_JS_TOOLS}
          data={INITIAL_DATA}
        />
        <Button onClick={handleSave}>Сохранить</Button>
      </div>
    </React.Fragment>
  );
};

export default Editor;
