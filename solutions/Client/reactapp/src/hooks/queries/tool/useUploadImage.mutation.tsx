import { ImgurImage } from "@/models";
import { useMutation } from "@tanstack/react-query";

/**
 * Upload an img using fetch API
 * @param {string | Blob} file
 * @returns
 */
const uploadImage = async (file: Blob): Promise<ImgurImage | null> => {
  const url =
    process.env.NEXT_PUBLIC_API_GATE_WAY_PORT_URL + "/api/Tools/UploadImageImgur";
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
  return imgurImage;
};

const useUploadImage = () => {
  return useMutation<ImgurImage | null, Error, { file: Blob }, unknown>({
    mutationFn: ({ file }) => uploadImage(file),
  });
};

export { useUploadImage };
