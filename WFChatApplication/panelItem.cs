using System;
using System.Collections.Generic;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WFChatApplication
{
    public class panelItem : Panel
    {
        public PictureBox itemPictureBox {  get; set; }

        public Label itemName { get; set; }

        public Label itemContent { get; set; }

        //public Panel hitbox { get; set; }

        public panelItem(int index)
        {
            itemPictureBox = new PictureBox();
            itemContent = new Label();
            itemName = new Label();
            //hitbox = new Panel();
            
            this.itemPictureBox.Location = new Point(10, 10);
            this.itemPictureBox.Size = new Size(60,60);
            this.itemPictureBox.BackgroundImage = Properties.Resources.avatar;
            this.itemPictureBox.BackgroundImageLayout = ImageLayout.Zoom;
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, itemPictureBox.Width, itemPictureBox.Height);
            Region rg = new Region(gp);
            itemPictureBox.Region = rg;
            this.itemPictureBox.Enabled = false;


            this.itemName.AutoSize = true;
            this.itemName.Font = new Font("Arial Narrow", 12F, FontStyle.Bold, GraphicsUnit.Point);
            this.itemName.Location = new Point(80, 10);
            this.itemName.Size = new Size(60, 24);
            this.itemName.Text = "User 1";
            this.itemName.Enabled = false;

            this.itemContent.AutoSize = true;
            this.itemContent.Font = new Font("Arial Narrow", 10.2F, FontStyle.Regular, GraphicsUnit.Point);
            this.itemContent.Location = new Point(80, 46);
            this.itemContent.Size = new Size(161, 22);
            this.itemContent.Text = "item conteit 1 is too longgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg";
            this.itemContent.Enabled = false;

            //this.hitbox.Size = new Size(340, 80);
            //this.hitbox.Location = new Point(0, 0);
            //this.hitbox.MouseEnter += panel_item_hitbox_MouseEnter;
            //this.hitbox.MouseLeave += panel_item_hitbox_MouseLeave;

            this.BackColor = Color.White;
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

        


    }
}
