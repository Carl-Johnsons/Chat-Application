import axiosInstance from "../../utils/Api/axios";

/**
 * Upload an img using fetch API
 * @param {string | Blob} file
 * @returns
 */
export const uploadImage = async (
  file: string | Blob
): Promise<[string | null, unknown]> => {
  try {
    const url = "/api/Tools/UploadImageImgur/";
    const formData = new FormData();
    formData.append("ImageFile", file);
    const response = await axiosInstance.post(url, formData);
    return [response.data, null];
  } catch (error) {
    return [null, error];
  }
};
