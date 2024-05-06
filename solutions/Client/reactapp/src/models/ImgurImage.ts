export type ImgurImage = {
  status: number;
  success: boolean;
  data: {
    id: string;
    deletehash: string;
    type: string;
    width: number;
    height: number;
    size: number;
    link: string;
    datetime: number;
  };
};
