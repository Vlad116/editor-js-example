/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

import Svg from "@/components/svg";

import useUpload from "../../hooks/useUpload";
import TitleWrapper from "../title-wrapper";

import s from "./PersonalQuoteContent.module.scss";

const ContentEditable = ({ value, onChange, className, limit = 150 }) => {
  const defaultValue = useRef(value);
  const ref = useRef(null);

  const handleInput = (event) => {
    if (onChange) {
      onChange(event.target);
    }
  };

  useEffect(() => {
    ref.current.addEventListener("keydown", (e) => {
      let allowedKeys = false;

      if (e.type === "keydown") {
        allowedKeys =
          e.which === 8 /* BACKSPACE */ ||
          e.which === 35 /* END */ ||
          e.which === 36 /* HOME */ ||
          e.which === 37 /* LEFT */ ||
          e.which === 38 /* UP */ ||
          e.which === 39 /* RIGHT */ ||
          e.which === 40 /* DOWN */ ||
          e.which === 46 /* DEL */;
      }

      if (!allowedKeys && e.target.textContent.length >= limit) {
        e.preventDefault();
      }
    });

    return () => ref.current.removeEventListener("change");
  }, []);

  return (
    <div
      ref={ref}
      suppressContentEditableWarning
      contentEditable
      onInput={handleInput}
      className={className}
      dangerouslySetInnerHTML={{ __html: defaultValue.current }}
    />
  );
};

const PERSON_INFO_LIMIT = 150;
const CONTENT_LIMIT = 500;

const PersonalQuoteContent = ({ onDataChange, data, api, config }) => {
  const [currentData, setCurrentData] = useState(data);

  const [img, handleChange] = useUpload(api, data.img, config?.imageSize);

  useEffect(() => {
    onDataChange(currentData);
  }, [currentData]);

  useEffect(() => {
    setCurrentData({ ...currentData, img });
  }, [img]);

  return (
    <TitleWrapper title="Персональная цитата" description={config.imageSize}>
      <div className={s.root}>
        <div className={s.root__image_wrapper}>
          <label className={s.root__label}>
            <input type="file" accept="image/*" onChange={handleChange} />
            {currentData.img ? (
              <img
                alt="Редактор новостей"
                className={s.root__img}
                src={currentData?.img?.x1}
              />
            ) : (
              <Svg icon={{ code: "plus" }} />
            )}
          </label>
        </div>
        <div className={s.root__wrapper}>
          <div>
            <div className={s.root__limits}>
              <strong>Цитата:</strong>{" "}
              <span>{`${currentData?.limits?.content}/${CONTENT_LIMIT}`}</span>
            </div>

            <ContentEditable
              className={s.root__input}
              value={currentData.content}
              onChange={(target) => {
                setCurrentData({
                  ...currentData,
                  content: target.innerHTML,
                  limits: {
                    ...currentData.limits,
                    content: target.textContent.length,
                  },
                });
              }}
              limit={CONTENT_LIMIT}
            />
          </div>
          <div>
            <div className={s.root__limits}>
              <strong>ФИО:</strong>{" "}
              <span>{`${currentData?.limits.personInfo}/${PERSON_INFO_LIMIT}`}</span>
            </div>

            <ContentEditable
              className={s.root__input}
              value={currentData.personInfo}
              onChange={(target) => {
                setCurrentData({
                  ...currentData,
                  personInfo: target.innerHTML,
                  limits: {
                    ...currentData.limits,
                    personInfo: target.textContent.length,
                  },
                });
              }}
              limit={PERSON_INFO_LIMIT}
            />
          </div>
        </div>
      </div>
    </TitleWrapper>
  );
};

PersonalQuoteContent.propTypes = {
  onDataChange: PropTypes.func.isRequired,
  data: PropTypes.shape({
    img: PropTypes.shape({}),
    personInfo: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
  api: PropTypes.shape({}).isRequired,
  config: PropTypes.shape({
    imageSize: PropTypes.shape({
      width: PropTypes.number,
      height: PropTypes.number,
    }),
  }).isRequired,
};

export default PersonalQuoteContent;
