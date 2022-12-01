import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";

import Anchor from "../anchor";
import Carousel from "../carousel-block";
// import PhoneSlider from "../carousel-block/PhoneSlider";
// import Docs from "../docs";
import Image from "../image";
import PersonalQuote from "../personal-quote";
import Quote from "../quote";
import Video from "../video";

const getPluginSettings = (config, pluginName) => {
  if (!config) return null;
  return config.find((item) => item.name === pluginName).settings;
};

export default (editor, config) => {
  return {
    header: Header,
    table: Table,
    list: {
      class: List,
      inlineToolbar: true,
      config: {
        defaultStyle: "unordered",
      },
    },
    quote: {
      class: Quote,
      inlineToolbar: true,
    },
    // docs: {
    //   class: Docs,
    // },
    carousel: {
      class: Carousel,
      inlineToolbar: true,
      config: {
        type: "carousel",
        name: "Карусель изображений",
        ...getPluginSettings(config, "carousel"),
      },
    },
    // phoneCarousel: {
    //   class: PhoneSlider,
    //   inlineToolbar: true,
    //   config: {
    //     type: "phoneSlider",
    //     name: "Слайдер телефонов",
    //     ...getPluginSettings(config, "phoneCarousel"),
    //   },
    // },
    image: {
      class: Image,
      config: {
        ...getPluginSettings(config, "image"),
      },
    },

    personalQuote: {
      class: PersonalQuote,
      inlineToolbar: true,
      config: {
        ...getPluginSettings(config, "personalQuote"),
      },
    },
    video: {
      class: Video,
      config: {
        ...getPluginSettings(config, "video"),
      },
    },
    anchorTune: Anchor,
  };
};
