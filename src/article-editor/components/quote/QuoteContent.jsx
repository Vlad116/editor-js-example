/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";

import TitleWrapper from "../title-wrapper";

import s from "./QuoteContent.module.scss";

const PersonalQuoteContent = ({ onDataChange, data }) => {
  const [quote, setQuote] = useState(data);

  const contentRef = useRef(null);

  useEffect(() => {
    onDataChange(quote);
  }, [quote]);

  useEffect(() => {
    if (!data) return;

    contentRef.current.innerHTML = data;
  }, []);

  return (
    <TitleWrapper title="Цитата">
      <div className={s.root}>
        <div
          ref={contentRef}
          placeholder="Введите цитату"
          className={s.root__editable}
          contentEditable="true"
          suppressContentEditableWarning
          onInput={(e) => {
            setQuote(e.target.innerHTML);
          }}
        />
      </div>
    </TitleWrapper>
  );
};

export default PersonalQuoteContent;
