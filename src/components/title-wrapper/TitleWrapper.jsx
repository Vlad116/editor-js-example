/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";

import s from "./TitleWrapper.module.scss";

function TitleWrapper({ children, title, description }) {
  return (
    <div className={s.root}>
      <div className={s.root__text_block}>
        <h4 className={s.root__title}>Компонент: {title}</h4>
        {description && (
          <div className={s.root__description}>
            {description
              ? `Разрешение изображения: ${description?.width} на ${description?.height} пикселей`
              : ""}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

TitleWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.shape({
    width: PropTypes.number,
    height: PropTypes.number,
  }),
};

TitleWrapper.defaultProps = {
  description: null,
};

export default TitleWrapper;
