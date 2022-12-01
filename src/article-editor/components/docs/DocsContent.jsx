/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "react-use";
import cn from "classnames";

// import Button from "@/components/button";
// import Modal from "@/components/modal";
// import WaveLoader from "@/components/wave-loader";
// import { getGetParams } from "@/rest";

import TitleWrapper from "../title-wrapper";

import s from "./DocsContent.module.scss";

const DocsContent = ({ onDataChange, data }) => {
  const [docsList, setDocsList] = useState(null);
  const [allList, setAlllist] = useState(data);
  const [chosenDoc, setChosenDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    onDataChange(allList);
  }, [allList]);

  const modalRef = useRef(null);

  const getDocs = async (inputVal = "", params = {}) => {
    const paramsStr = getGetParams({
      page: 1,
      iblockId: 10,
      limit: 100,
      withPressCenterDocuments: true,
      filterName: inputVal,
      ...params,
    });

    try {
      setIsLoading(true);
      const response = await fetch(
        `/rest/admin/common/search-i-block-unit${paramsStr}`
      );

      const result = await response.json();
      setDocsList(result);
    } catch {
      setDocsList([]);
    } finally {
      setIsLoading(false);
    }
  };

  useDebounce(
    () => {
      getDocs(inputValue);
    },
    400,
    [inputValue]
  );

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <TitleWrapper title="Документы">
      {/* {allList.map((item) => {
        return (
          <>
            {item.documents ? (
              item.documents.map((item) => (
                <div className={s.root__item}>{item.name}</div>
              ))
            ) : (
              <div className={s.root__item}>{item.name}</div>
            )}
          </>
        );
      })}
      <Modal
        classes={{ content: s.root__modal }}
        closeOnRequest={false}
        mode="full-screen"
        ref={modalRef}
      >
        <div className={s.root__wrapper}>
          <div className={s.root__search_wrapper}>
            <input
              placeholder="Поиск"
              type="text"
              value={inputValue}
              onChange={handleChange}
            />
          </div>
          <div className={s.root}>
            <div className={s.root__row}>
              <div className={cn(s.root__td, s.root__heading)}>ID</div>
              <div className={cn(s.root__td, s.root__heading)}>Название</div>
            </div>
            {isLoading ? (
              <div className={s.root__loader}>
                <WaveLoader />
              </div>
            ) : (
              <>
                {docsList?.data ? (
                  docsList.data.map((doc) => (
                    <div
                      key={doc.id}
                      onClick={() => setChosenDoc(doc)}
                      className={cn(s.root__row, {
                        [s.active]: doc.id === chosenDoc?.id,
                      })}
                    >
                      <div className={s.root__td}>{doc.id}</div>
                      <div className={s.root__td}>{doc.name}</div>
                    </div>
                  ))
                ) : (
                  <div className={s.root__not_found}>Ничего не найдено</div>
                )}
              </>
            )}
          </div>
        </div>
        <div className={s.root__controls}>
          <Button
            onClick={() => {
              setAlllist((prev) => [
                ...prev,
                {
                  ...chosenDoc,
                  type: chosenDoc.documents ? "section" : "element",
                },
              ]);
              setChosenDoc(null);
              modalRef.current.hide();
            }}
            disabled={!chosenDoc}
            size="sm"
          >
            Сохранить
          </Button>
        </div>
      </Modal>
      <button
        className="cdx-button"
        onClick={() => {
          getDocs("", { searchBySection: 0 });
          modalRef.current.show();
        }}
      >
        Добавить документ
      </button>
      <button
        className="cdx-button"
        onClick={() => {
          getDocs("", { searchBySection: 1 });
          modalRef.current.show();
        }}
      >
        Добавить документы по разделу
      </button> */}
    </TitleWrapper>
  );
};

export default DocsContent;
