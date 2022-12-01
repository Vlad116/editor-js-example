/* eslint-disable */

import React, { useEffect, useState } from "react";
import cn from "classnames";
// import WaveLoader from "@/components/wave-loader";
import { CircularProgress } from "@material-ui/core";

import useUpload from "../../hooks/useUpload";
import TitleWrapper from "../title-wrapper";

import s from "../video/VideoContent.module.scss";

const ImageContent = ({ onDataChange, data, api, config }) => {
  // const [image, handlerClick, isLoading] = useUpload(
  //   api,
  //   data,
  //   { width: 1297, height: 864 }
  //   // config.imageSize
  // );

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageURL] = useState(null);

  useEffect(() => {
    if (!image) return;
    setIsLoading(true);
    const newImageUrl = URL.createObjectURL(image);
    setImageURL(newImageUrl);
    setIsLoading(false);
  }, [image]);

  const onImageChange = (e) => {
    console.log(e);
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  useEffect(() => {
    onDataChange(image);
  }, [image]);

  return (
    <TitleWrapper title="Одиночное изображение" description={config.imageSize}>
      <div className={s.root}>
        <label className={cn(s.root__label, "cdx-button")}>
          <input type="file" accept="image/*" onChange={onImageChange} />

          {isLoading ? (
            <CircularProgress />
          ) : // <WaveLoader />
          imageUrl ? (
            <img width={3} src={imageUrl} />
          ) : (
            "Загрузить изображение"
          )}
        </label>
      </div>
    </TitleWrapper>
  );
};

export default ImageContent;
