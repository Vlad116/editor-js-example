/* eslint-disable */

import React, { useEffect, useState } from "react";
import { nanoid } from "nanoid";

import Button from "@/components/button";
import Svg from "@/components/svg";

import TitleWrapper from "../title-wrapper";

import CarouselContentItem from "./CarouselContentItem";
import s from "./CarouselContent.module.scss";

const CarouselContent = ({ onDataChange, data, api, config }) => {
  const [currentData, setCurrentData] = useState(data);

  useEffect(() => {
    onDataChange(currentData);
  }, [currentData]);

  return (
    <TitleWrapper title={config.name} description={config?.imageSize}>
      {currentData.length
        ? currentData.map((item, index) => (
            <CarouselContentItem
              api={api}
              data={data}
              item={item}
              index={index}
              imageSize={config?.imageSize}
              setCurrentData={setCurrentData}
              key={item.id}
            />
          ))
        : null}

      <div
        className={s.root__add_slide}
        onClick={() =>
          setCurrentData((prev) => [
            ...prev,
            { title: "", description: "", id: nanoid() },
          ])
        }
      >
        <Button
          circle
          rightAddons={<Svg icon={{ code: "plus" }} />}
          size="sm"
        />
        <span className={s.root__button_text}>Добавить слайд</span>
      </div>
    </TitleWrapper>
  );
};

export default CarouselContent;
