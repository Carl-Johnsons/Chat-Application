using System;
using System.Collections.Generic;
using System.Drawing;
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
        public string MessageContent { get; set; }
        public string Time { get; set; }
        public Panel MessagePanel { get; set; }

        public Panel MessageRowPanel { get; set; }

        public Label MessageLabel { get; set; }

        public Label TimeLabel { get; set; }


        public PictureBox ReceiverdMessageSenderAvatar { get; set; }

        public messageItem(bool isSend, string content, bool isHaveAvatar, int messageRowSize)
        {


            SendOrReceive = isSend;
            Time = "10:24";
            MessageContent = content;


            MessageLabel = new Label();
            MessageLabel.AutoEllipsis = true;
            MessageLabel.AutoSize = true;
            MessageLabel.Dock = DockStyle.Fill;
            MessageLabel.Font = new Font("Arial Narrow", 12F, FontStyle.Regular, GraphicsUnit.Point);
            MessageLabel.Location = new Point(20, 10);
            MessageLabel.MaximumSize = new Size(800, 100000);
            MessageLabel.Name = "message_label";
            MessageLabel.Size = new Size(52, 24);
            MessageLabel.TabIndex = 1;
            MessageLabel.Text = content;

            TimeLabel = new Label();
            TimeLabel.AutoSize = true;
            TimeLabel.Font = new Font("Arial Narrow", 9F, FontStyle.Regular, GraphicsUnit.Point);
            TimeLabel.ForeColor = SystemColors.ControlDarkDark;
            TimeLabel.Name = "time_label";
            TimeLabel.Size = new Size(43, 20);
            TimeLabel.Text = "10:24";

            MessagePanel = new Panel();
            MessagePanel.AutoSize = true;
            MessagePanel.AutoSizeMode = AutoSizeMode.GrowAndShrink;
            MessagePanel.Controls.Add(MessageLabel);
            MessagePanel.Controls.Add(TimeLabel);
            //MessagePanel.MaximumSize = new Size(650, 100000);
            MessagePanel.Name = "panel_message_container";
            MessagePanel.Padding = new Padding(20, 10, 20, 10);
            //MessagePanel.Size = new Size(131, 74);
            TimeLabel.Location = new Point(20, MessagePanel.Height - TimeLabel.Height + 10);
            if (isSend)
            {
                MessagePanel.BackColor = Color.FromArgb(229, 239, 255);
                MessagePanel.Dock = DockStyle.Right;
            }
            if (!isSend) {
                MessagePanel.BackColor = Color.FromArgb(255, 255, 255);
                MessagePanel.Dock = DockStyle.Left;

            }

            MessageRowPanel = new Panel();
            MessageRowPanel.Padding = new Padding(75, 5, 20, 5);
            MessageRowPanel.Controls.Add(MessagePanel);
            MessageRowPanel.Size = new Size(0, MessagePanel.Height+80);
            MessageRowPanel.Dock = DockStyle.Bottom;



          

            //panel3.VerticalScroll.Value += childPanel.Height;


        }

    }
}
