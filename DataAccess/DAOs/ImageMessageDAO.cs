using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DAOs
{
    public class ImageMessageDAO
    {
        private static ImageMessageDAO instance = null;
        private static readonly object instanceLock = new object();
        public static ImageMessageDAO Instance
        {
            get
            {
                lock (instanceLock)
                {
                    if (instance == null)
                    {
                        instance = new ImageMessageDAO();
                    }
                    return instance;
                }

            }
        }
        public IEnumerable<ImageMessage> GetImagesMessageList()
        {
            using var context = new ChatApplicationContext();
            var imageMessages = context.ImageMessages.ToList();
            return imageMessages;
        }
        public ImageMessage GetImageMessageByID(int MessageId)
        {
            ImageMessage imageMessage = null;
            try
            {
                using var context = new ChatApplicationContext();
                imageMessage = context.ImageMessages.SingleOrDefault(img => img.MessageId == MessageId);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return imageMessage;

        }
        public void AddImageMessage(ImageMessage imageMessage)
        {

            try
            {
                ImageMessage _imageMessage = GetImageMessageByID(imageMessage.MessageId);
                if (_imageMessage == null)
                {
                    using var context = new ChatApplicationContext();
                    context.ImageMessages.Add(imageMessage);
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("The image message is already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        
        public void DeleteImageMessage(int messageId)
        {

            try
            {
                ImageMessage _imageMessage = GetImageMessageByID(messageId);
                if (_imageMessage != null)
                {
                    using var context = new ChatApplicationContext();
                    context.ImageMessages.Remove(_imageMessage);
                    context.SaveChanges();
                }
                else
                {
                    throw new Exception("The image message does not already exist.");
                }

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
    }
}
