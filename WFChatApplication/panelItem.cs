using BussinessObject.Models;
using System;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WFChatApplication.ApiServices;

namespace WFChatApplication
{
    public class panelItem : Panel
    {
        public PictureBox itemPictureBox {  get; set; }

        public Label itemName { get; set; }

        public Label itemContent { get; set; }

        public frmMain MainForm { get; set; }

        public User User { get; set; }


        public panelItem(int index, User UserInfo, frmMain main)
        {
            MainForm = main;
            User = UserInfo;
            main.Receiver = User;
            itemPictureBox = new PictureBox();
            itemContent = new Label();
            itemName = new Label();
            //hitbox = new Panel();
            
            this.itemPictureBox.Location = new Point(10, 10);
            this.itemPictureBox.Size = new Size(60,60);
            this.itemPictureBox.ImageLocation = UserInfo.AvatarUrl;
            this.itemPictureBox.SizeMode = PictureBoxSizeMode.Zoom;
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, itemPictureBox.Width, itemPictureBox.Height);
            Region rg = new Region(gp);
            itemPictureBox.Region = rg;
            this.itemPictureBox.Enabled = false;
          


            this.itemName.AutoSize = true;
            this.itemName.Text = UserInfo.Name;
            this.itemName.Font = new Font("Arial Narrow", 12F, FontStyle.Bold, GraphicsUnit.Point);
            this.itemName.Location = new Point(80, 10);
            this.itemName.Size = new Size(60, 24);
            this.itemName.Enabled = false;

            this.itemContent.AutoSize = true;
            this.itemContent.Font = new Font("Arial Narrow", 10.2F, FontStyle.Regular, GraphicsUnit.Point);
            this.itemContent.Location = new Point(80, 46);
            this.itemContent.Size = new Size(161, 22);
            this.itemContent.Text = "item conteit 1 is too longgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg";
            this.itemContent.Enabled = false;


            this.BackColor = Color.White;
            this.Click += panel_item_Click;
            this.MouseEnter += panel_item_MouseEnter;
            this.MouseLeave += panel_item_MouseLeave;
            this.Size = new Size(340, 80);
            this.Location = new Point(0, index * this.Height);
            //this.Controls.Add(this.hitbox);
            this.Controls.Add(this.itemContent);
            this.Controls.Add(this.itemName);
            this.Controls.Add(this.itemPictureBox);
           

            this.ResumeLayout(false);
            this.PerformLayout();
        }

        private void panel_item_MouseEnter(object sender, EventArgs e)
        {
            this.BackColor = Color.Red;
        }

        private void panel_item_MouseLeave(object sender, EventArgs e)
        {
            this.BackColor = Color.White;
        }

        private async void panel_item_Click(object sender, EventArgs e)
        {
            MainForm.panel_message.Controls.Clear();
            var IndividualMessages = await ApiService.GetIndividualMessageAsync(MainForm.CurrentUser.UserId, User.UserId);
            foreach ( var im in IndividualMessages)
            {
                if(im.Message.SenderId == MainForm.CurrentUser.UserId)
                {
                    MainForm.ShowSendedMessage(im);
                }
                else
                {
                    MainForm.ShowReceivedMessage(im);
                }
            }
            MainForm.Receiver = User;

        }
       




    }
}
