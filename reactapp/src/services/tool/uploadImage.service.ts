import { ImgurImage } from "@/models";

/**
 * Upload an img using fetch API
 * @param {string | Blob} file
 * @returns
 */
export const uploadImage = async (
  file: Blob
): Promise<[ImgurImage | null, unknown]> => {
  try {
    const url =
      process.env.NEXT_PUBLIC_BASE_API_URL + "/api/Tools/UploadImageImgur";
    const formData = new FormData();
    formData.append("ImageFile", file);
    // This function is still error because axios always set content-type
    // to application/json for no reason

    // const response = await axiosInstance.post(url, formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    // Using the old fashion is good for the mean time
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });
    const imgurImage: ImgurImage = await response.json();
    return [imgurImage, null];
  } catch (error) {
    return [null, error];
  }
};
