import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createReactEditorJS } from "react-editor-js";
import PropTypes from "prop-types";

import Button from "@/components/button";
import Modal from "@/components/modal";

import editorLocale from "./editorLocale";
import getEditorTools from "./editorTools";
import s from "./Editor.module.scss";

const Editor = createReactEditorJS();

const ReactEditor = ({ button }) => {
  const [initData, setInitData] = useState(null);

  const instanceRef = useRef(null);
  const modalRef = useRef(null);

  const config = useMemo(() => {
    const configAttr = button
      .querySelector("input[type='hidden']")
      .getAttribute("data-init-data");

    return configAttr ? JSON.parse(configAttr)?.components : null;
  }, []);

  const handleSave = async () => {
    const savedData = await instanceRef.current.save();
    const input = button.querySelector("input[type='hidden']");

    input.setAttribute("value", JSON.stringify(savedData.blocks));
    setInitData(savedData);

    modalRef.current.hide();
  };

  const handleInitialize = useCallback((instance) => {
    instanceRef.current = instance;
  }, []);

  useEffect(() => {
    const root = document.getElementsByTagName("html")[0];
    root.setAttribute("class", "no-touchevents");

    button.addEventListener("click", () => {
      const rawInputData = button
        .querySelector("input[type='hidden']")
        .getAttribute("value");
      const parsedInputData = rawInputData ? JSON.parse(rawInputData) : null;

      if (rawInputData && Array.isArray(parsedInputData)) {
        setInitData({ blocks: parsedInputData });
      }

      modalRef.current.show();
    });
  }, []);

  return (
    <Modal
      closeOnRequest={false}
      classes={{ content: s.root__modal }}
      mode="full-screen"
      ref={modalRef}
    >
      <h2 style={{ textAlign: "center", fontSize: "28px", padding: "20px 0" }}>
        Редактировать новость
      </h2>
      <div
        className={s.root__wrapper}
        style={{
          background: "rgb(244 246 250)",
          padding: "20px 0 0",
          maxWidth: "800px",
          margin: "0 auto",
          width: "100%",
          borderRadius: "8px",
        }}
      >
        <Editor
          onInitialize={handleInitialize}
          i18n={editorLocale}
          tools={getEditorTools(instanceRef, config)}
          tunes={["anchorTune"]}
          data={initData}
        />
        <div className={s.root__controls}>
          <div style={{ marginLeft: "50px" }}>
            <Button
              size="sm"
              style={{ margin: "15px 5px" }}
              onClick={handleSave}
            >
              Сохранить
            </Button>
            <Button
              size="sm"
              variant="tertiary-dark"
              style={{ margin: "15px 5px" }}
              // onClick={handleSave}
            >
              Предпросмотр
            </Button>
          </div>
          <Button
            style={{ margin: "15px 50px" }}
            variant="tertiary-dark"
            size="sm"
            onClick={() => modalRef.current.hide()}
          >
            Закрыть окно
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ReactEditor.propTypes = {
  button: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default ReactEditor;
