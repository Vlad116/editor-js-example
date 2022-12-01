/* eslint-disable */

import React, { useEffect, useMemo, useState } from "react";
import cn from "classnames";

import useUpload from "../../hooks/useUpload";
import TitleWrapper from "../title-wrapper";

import s from "./VideoContent.module.scss";

const VideoContent = ({ onDataChange, data, api, config }) => {
  const [currentData, setCurrentData] = useState(data);
  const [link, setLink] = useState(data.link || "");
  // const [image, handlerClick] = useUpload(api, data?.image, config?.imageSize);

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
    onDataChange(imageUrl);
  }, [imageUrl]);

  const videoID = useMemo(() => {
    function getVideoID(url) {
      const regExp =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      const match = url.match(regExp);

      if (match && match[7].length === 11) {
        return match[7];
      }

      return "";
    }

    return getVideoID(link);
  }, [link]);

  useEffect(() => {
    setCurrentData((prev) => ({
      ...prev,
      link: videoID ? `https://www.youtube.com/embed/${videoID}` : "",
    }));
  }, [videoID]);

  useEffect(() => {
    setCurrentData((prev) => ({ ...prev, image: imageUrl }));
  }, [imageUrl]);

  useEffect(() => {
    onDataChange(currentData);
  }, [currentData]);

  return (
    <TitleWrapper title="Видео" description={config?.imageSize}>
      <div className={s.root}>
        <input
          className={cn(s.root__input, {
            [s.root__success]: videoID,
            [s.root__error]: link && !videoID,
          })}
          placeholder="Ссылка на youtube видео"
          type="text"
          value={link}
          onChange={
            (e) => setLink(e.target.value)
            // setCurrentData({ ...currentData, link: e.target.value })
          }
        />
        <label className={cn(s.root__label, "cdx-button")}>
          <input type="file" accept="image/*" onChange={onImageChange} />
          {imageUrl ? <img src={imageUrl} /> : "Загрузить превью видео"}
        </label>
      </div>
    </TitleWrapper>
  );
};

export default VideoContent;
