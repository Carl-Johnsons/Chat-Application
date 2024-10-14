import { CLIENT_BASE_URL } from "@/constants/url.constant";

const useWindow = () => {
  const openCallWindow = (uri: string, activeConversationId: string) => {
    const CallUrl = `${CLIENT_BASE_URL}/${uri}?activeConversationId=${encodeURIComponent(
      activeConversationId
    )}`;
    const width = (window.screen.width * 2) / 3;
    const height = (window.screen.height * 2) / 3;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    const windowFeatures = `width=${width},height=${height},left=${left},top=${top},toolbar=yes,location=no,menubar=yes`;
    window.open(CallUrl, "_blank", windowFeatures);
  };
  return { openCallWindow };
};
export { useWindow };
