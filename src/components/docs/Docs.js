/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";

import DocsContent from "./DocsContent";

export default class Docs {
  static get toolbox() {
    return {
      icon: '<svg width="15" height="14" viewBox="0 0 15 14" xmlns="http://www.w3.org/2000/svg"><path d="M13.53 6.185l.027.025a1.109 1.109 0 0 1 0 1.568l-5.644 5.644a1.109 1.109 0 1 1-1.569-1.568l4.838-4.837L6.396 2.23A1.125 1.125 0 1 1 7.986.64l5.52 5.518.025.027zm-5.815 0l.026.025a1.109 1.109 0 0 1 0 1.568l-5.644 5.644a1.109 1.109 0 1 1-1.568-1.568l4.837-4.837L.58 2.23A1.125 1.125 0 0 1 2.171.64L7.69 6.158l.025.027z" /></svg>',
      title: "Документы",
    };
  }

  // static get isReadOnlySupported() {
  //   return true;
  // }
  //
  // static get enableLineBreaks() {
  //   return true;
  // }

  constructor({ data, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = Array.isArray(data) ? data : [];

    this.CSS = {
      wrapper: "docs",
    };

    this.nodes = {
      holder: null,
    };
  }

  render() {
    const rootNode = document.createElement("div");
    rootNode.setAttribute("class", this.CSS.wrapper);
    this.nodes.holder = rootNode;

    const onDataChange = (newData) => {
      this.data = [...newData];
    };

    ReactDOM.render(
      <DocsContent onDataChange={onDataChange} data={this.data} />,
      rootNode
    );

    return this.nodes.holder;
  }

  save() {
    return this.data;
  }
}
