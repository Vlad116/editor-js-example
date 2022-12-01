/* eslint-disable */

import React from "react";
import ReactDOM from "react-dom";

import PersonalQuoteContent from "./PersonalQuoteContent";

export default class PersonalQuote {
  static get toolbox() {
    return {
      icon: `<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 15v4H5v-4h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1v-6c0-.55-.45-1-1-1zM7 18.5c-.82 0-1.5-.67-1.5-1.5s.68-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM19 5v4H5V5h14m1-2H4c-.55 0-1 .45-1 1v6c0 .55.45 1 1 1h16c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1zM7 8.5c-.82 0-1.5-.67-1.5-1.5S6.18 5.5 7 5.5s1.5.68 1.5 1.5S7.83 8.5 7 8.5z"/></svg>`,
      title: "Персональная цитата",
    };
  }

  static get enableLineBreaks() {
    return true;
  }

  static get isReadOnlySupported() {
    return true;
  }

  constructor({ data, api, readOnly, config }) {
    this.api = api;
    this.readOnly = readOnly;
    this.data = {
      personInfo: data.personInfo || "",
      img: data.img || "",
      content: data.content || "",
      limits: {
        content: data?.limits?.content || 0,
        personInfo: data?.limits?.personInfo || 0,
      },
    };

    this.config = {
      imageSize: config?.imageSize || null,
    };

    this.CSS = {
      wrapper: "personal-quote",
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
      this.data = {
        ...newData,
      };
    };

    ReactDOM.render(
      // eslint-disable-next-line react/jsx-filename-extension
      <PersonalQuoteContent
        onDataChange={onDataChange}
        readOnly={this.readOnly}
        data={this.data}
        api={this.api}
        config={this.config}
      />,
      rootNode
    );

    return this.nodes.holder;
  }

  save() {
    return this.data;
  }
}
