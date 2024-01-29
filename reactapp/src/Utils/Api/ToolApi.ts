import { BASE_ADDRESS, handleAPIRequest } from "./APIUtils";

/**
 * Upload an img using fetch API
 * @param {string | Blob} file
 * @returns
 */
export const uploadImage = async (
  file: string | Blob
): Promise<[string | null, unknown]> => {
  const url = BASE_ADDRESS + "/api/Tools/UploadImageImgur/";

  const formData = new FormData();
  formData.append("ImageFile", file);
  const [string, error] = await handleAPIRequest<string>({
    url,
    method: "POST",
    data: formData,
  });
  return [string, error];
};
