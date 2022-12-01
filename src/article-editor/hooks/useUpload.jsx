import { useState } from "react";

const useUpload = (api, imgInit = null, imageSize = null) => {
  const [image, setImage] = useState(imgInit);
  const [isLoading, setIsLoading] = useState(false);

  async function handleChange(e) {
    if (!imageSize) {
      api.notifier.show({
        message: "Не выставлено разрешение изображения",
        style: "error",
      });

      return;
    }

    const formData = new FormData();
    console.log(e.target.files[0]);
    formData.append("file", e.target.files[0]);
    formData.append("resize", true.toString());
    formData.append("resolution[width]", imageSize?.width);
    formData.append("resolution[height]", imageSize?.height);
    console.log(formData);
    try {
      setIsLoading(true);
      const rawResponse = await fetch("/rest/admin/common/file", {
        method: "POST",
        body: formData,
      });

      const content = await rawResponse.json();

      if (content.src && content.image) {
        setImage(content.image);

        api.notifier.show({
          message: "Изображение загружено",
          style: "success",
        });
      } else {
        setImage(null);

        const errors = Object.values(content.errors).reduce(
          (acc, cur) => `${cur}. ${acc}`,
          ""
        );

        api.notifier.show({
          message: errors,
          style: "error",
        });
      }
    } catch {
      setImage(null);

      api.notifier.show({
        message: "Ошибка загрузки изображения",
        style: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return [image, handleChange, isLoading];
};

export default useUpload;
