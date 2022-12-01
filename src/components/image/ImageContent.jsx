/* eslint-disable */

import React, { useEffect } from "react";
import cn from "classnames";
import WaveLoader from "@/components/wave-loader";

import useUpload from "../../hooks/useUpload";
import TitleWrapper from "../title-wrapper";

import s from "../video/VideoContent.module.scss";

const ImageContent = ({ onDataChange, data, api, config }) => {
  const [image, handlerClick, isLoading] = useUpload(
    api,
    data,
    config.imageSize
  );

  useEffect(() => {
    onDataChange(image);
  }, [image]);

  return (
    <TitleWrapper title="Одиночное изображение" description={config.imageSize}>
      <div className={s.root}>
        <label className={cn(s.root__label, "cdx-button")}>
          <input type="file" accept="image/*" onChange={handlerClick} />

          {isLoading ? (
            <WaveLoader />
          ) : image ? (
            <img src={image?.x1} />
          ) : (
            "Загрузить изображение"
          )}
        </label>
      </div>
    </TitleWrapper>
  );
};

export default ImageContent;
