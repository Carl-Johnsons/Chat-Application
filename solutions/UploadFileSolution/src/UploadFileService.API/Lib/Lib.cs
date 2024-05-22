namespace UploadFileService.API.Lib
{
    public class Lib
    {
        List<string> imageExtensions = new List<string>
        {
            ".jpg", ".jpeg", ".png", ".gif", ".bmp", ".tiff", ".tif", ".webp",
            ".svg", ".ico", ".heic", ".heif", ".raw", ".cr2", ".nef", ".orf",
            ".sr2", ".arw", ".dng", ".raf", ".3fr", ".kdc", ".mos", ".mef",
            ".nrw", ".rw2", ".pef"
        };

        List<string> videoExtensions = new List<string>
        {
            ".mp4", ".avi", ".mkv", ".mov", ".wmv", ".flv", ".webm", ".mpeg",
            ".mpg", ".m4v", ".3gp", ".3g2", ".vob", ".ogv", ".m2ts", ".mts",
            ".ts", ".mxf", ".f4v", ".rm", ".rmvb", ".divx", ".xvid", ".dv",
            ".asf", ".swf", ".m2v",".mp3", ".wav", ".aac", ".flac", ".ogg", ".wma", ".m4a",
            ".aiff", ".alac", ".opus", ".amr"
        };

        public string getFileType(string fileName) {

            if(fileName == null || fileName.Length == 0)
            {
                return null;
            }

            string extension = Path.GetExtension(fileName);
            if(imageExtensions.Contains(extension)) {
                return "Image";
            }

            else if (videoExtensions.Contains(extension))
            {
                return "Video";
            }

            else 
            {
                return "Raw";
            }

        }
    }
}
