/* eslint-disable */

import React, { useEffect, useRef } from "react";
import cn from "classnames";

import Svg from "@/components/svg";
import WaveLoader from "@/components/wave-loader";

import useUpload from "../../hooks/useUpload";

import s from "./CarouselContent.module.scss";

const CarouselContentItem = ({
  data,
  api,
  item,
  index,
  imageSize,
  setCurrentData,
}) => {
  const [image, handlerClick, isLoading] = useUpload(
    api,
    item.image,
    imageSize
  );

  const contentRef = useRef(null);

  useEffect(() => {
    setCurrentData((prev) =>
      prev.map((cur, i) => (i === index ? { ...cur, image } : cur))
    );
  }, [image]);

  useEffect(() => {
    contentRef.current.innerHTML = item.description;
  }, []);

  return (
    <div className={s.root__wrap} key={item.id}>
      <label className={cn(s.root__label, "cdx-button")}>
        <input type="file" accept="image/*" onChange={handlerClick} />
        {image && <img src={image?.x1} />}
        {!image && !isLoading && "Загрузить изображение"}
        {isLoading && <WaveLoader />}
      </label>

      <div className={s.root__description}>
        <input
          onChange={(e) =>
            setCurrentData((prev) =>
              prev.map((cur, i) =>
                i === index ? { ...cur, title: e.target.value } : cur
              )
            )
          }
          type="text"
          value={item.title}
          placeholder="Заголовок"
        />
        <div
          ref={contentRef}
          className={s.root__editable}
          placeholder="Описание"
          contentEditable="true"
          onInput={(e) =>
            setCurrentData((prev) =>
              prev.map((cur, i) =>
                i === index ? { ...cur, description: e.target.innerHTML } : cur
              )
            )
          }
        />
      </div>

      <div className={s.root__controls}>
        <div
          onClick={() => {
            setCurrentData((prev) => {
              const curData = [...prev];
              const prevIndex = curData[index - 1]
                ? index - 1
                : curData.length - 1;
              const prevItemData = curData[prevIndex];

              curData[prevIndex] = curData[index];
              curData[index] = prevItemData;

              return curData;
            });
          }}
        >
          <Svg icon={{ code: "long-arrow-up" }} />
        </div>
        <div
          onClick={() => {
            setCurrentData((prev) => {
              const curData = [...prev];
              const nextIndex = curData[index + 1] ? index + 1 : 0;
              const nextItemData = curData[nextIndex];

              curData[nextIndex] = curData[index];
              curData[index] = nextItemData;

              return curData;
            });
          }}
        >
          <Svg icon={{ code: "long-arrow-down" }} />
        </div>
        <div
          onClick={() =>
            setCurrentData((prev) => prev.filter((el) => el.id !== item.id))
          }
        >
          <Svg icon={{ code: "close" }} />
        </div>
      </div>
    </div>
  );
};

export default CarouselContentItem;
