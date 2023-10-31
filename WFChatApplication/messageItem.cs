using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WFChatApplication
{
    public class messageItem
    {
        public static readonly object LockObj = new object();

        public int ReceivedMessageSenderID { get; set; }
        public bool SendOrReceive { get; set; }
        public IndividualMessage IndividualMessage { get; set; }
        public string Time { get; set; }
        public Panel MessagePanel { get; set; }

        public Panel MessageRowPanel { get; set; }

        public Label MessageLabel { get; set; }

        public Label TimeLabel { get; set; }


        public PictureBox ReceiverdMessageSenderAvatar { get; set; }

        public messageItem(bool isSend, IndividualMessage _IndividualMessage, bool isHaveAvatar, frmMain frmMain)
        {


            SendOrReceive = isSend;
         
    
           
            MessageLabel = new Label();
            MessageLabel.AutoEllipsis = true;
            MessageLabel.AutoSize = true;
            MessageLabel.Dock = DockStyle.Left;
            MessageLabel.Font = new Font("Arial Narrow", 12F, FontStyle.Regular, GraphicsUnit.Point);
            MessageLabel.MaximumSize = new Size(800, 100000);
            MessageLabel.Name = "message_label";
            //MessageLabel.Size = new Size(52, 24);
            MessageLabel.TabIndex = 1;
            MessageLabel.Text = _IndividualMessage.Message.Content;

            TimeLabel = new Label();
            TimeLabel.AutoSize = true;
            TimeLabel.Font = new Font("Arial Narrow", 9F, FontStyle.Regular, GraphicsUnit.Point);
            TimeLabel.ForeColor = SystemColors.ControlDarkDark;
            TimeLabel.Name = "time_label";
            //TimeLabel.Size = new Size(43, 20);
            TimeLabel.Text = _IndividualMessage.Message.Time.ToString("dd/MM/yyyy");

            MessagePanel = new Panel();
            MessagePanel.AutoSize = true;
            MessagePanel.AutoSizeMode = AutoSizeMode.GrowAndShrink;
            MessagePanel.Controls.Add(MessageLabel);
            MessagePanel.Controls.Add(TimeLabel);
            TimeLabel.Location = new Point(0, MessageLabel.Height);
            //MessagePanel.MaximumSize = new Size(650, 100000);
            MessagePanel.Name = "panel_message_container";
            MessagePanel.Padding = new Padding(20, 10, 20, 10);
            //MessagePanel.Size = new Size(131, 74);
            if (isSend)
            {
                MessagePanel.BackColor = Color.FromArgb(229, 239, 255);
                MessagePanel.Dock = DockStyle.Right;
            }
            else {
                MessagePanel.BackColor = Color.FromArgb(255, 255, 255);
                MessagePanel.Dock = DockStyle.Left;

            }

            MessageRowPanel = new Panel();
            MessageRowPanel.Padding = new Padding(65, 5, 20, 5);
            MessageRowPanel.Controls.Add(MessagePanel);
            MessageRowPanel.AutoSizeMode = AutoSizeMode.GrowOnly;
            if (isHaveAvatar)
            {
                Panel panelAvatarContainer = new Panel();
                panelAvatarContainer.Size = new Size (60, 60);
                panelAvatarContainer.Padding = new Padding(0, 0, 20, 0);
                panelAvatarContainer.Dock = DockStyle.Left;
                MessageRowPanel.Controls.Add(panelAvatarContainer);
                ReceiverdMessageSenderAvatar = new PictureBox();
                ReceiverdMessageSenderAvatar.BackColor = Color.Transparent;
                ReceiverdMessageSenderAvatar.BackgroundImageLayout = ImageLayout.None;
                ReceiverdMessageSenderAvatar.BorderStyle = BorderStyle.FixedSingle;
                ReceiverdMessageSenderAvatar.Name = "ptbSenderAvatar";
                ReceiverdMessageSenderAvatar.Size = new Size(40, 40);
                ReceiverdMessageSenderAvatar.SizeMode = PictureBoxSizeMode.StretchImage;
           
                LoadImageFromUrl(frmMain.Receiver.AvatarUrl, ReceiverdMessageSenderAvatar);
                
                GraphicsPath gp = new GraphicsPath();
                gp.AddEllipse(0, 0, ReceiverdMessageSenderAvatar.Width, ReceiverdMessageSenderAvatar.Height);
                Region rg = new Region(gp);
                ReceiverdMessageSenderAvatar.Region = rg;

                ReceiverdMessageSenderAvatar.Dock = DockStyle.Top;
                panelAvatarContainer.Controls.Add(ReceiverdMessageSenderAvatar);
                MessageRowPanel.Padding = new Padding(5, 5, 20, 5);

            }

            int height = MessageLabel.GetPreferredSize(new Size(0, 0)).Height;
            Console.WriteLine(height);
            MessageRowPanel.Size = new Size(0, height+50);
            MessageRowPanel.Dock = DockStyle.Bottom;

        }

        private void LoadImageFromUrl(string url, PictureBox pictureBox)
        {
            try
            {
                var request = System.Net.WebRequest.Create(url);
                using (var response = request.GetResponse())
                using (var stream = response.GetResponseStream())
                {
                    pictureBox.Image = Bitmap.FromStream(stream);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error: " + ex.Message);
            }
        }

    }
}
