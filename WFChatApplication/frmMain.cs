using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using WFChatApplication.ApiServices;
using static System.Windows.Forms.VisualStyles.VisualStyleElement;
using BussinessObject;
using BussinessObject.Models;

namespace WFChatApplication
{
    public partial class frmMain : Form
    {
        public User CurrentUser { get; set; }

        public frmMain()
        {
            InitializeComponent();

        }






        private bool isMaximized = false;
        private int normalWidth;
        private int normalHeight;
        private bool draggPanelMouseDown = false;
        private System.Drawing.Point normalLocation;
        int TotalHeightPanelMessageScreen = 0;
        private string lastMessageId = "send";


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


        //For paint circle avatar--------------------------------------------------------------------------------
        private void ptbUserAvatar_Paint(object sender, PaintEventArgs e)
        {
            LoadImageFromUrl(CurrentUser.AvatarUrl, ptbUserAvatar);
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, ptbUserAvatar.Width, ptbUserAvatar.Height);
            Region rg = new Region(gp);
            ptbUserAvatar.Region = rg;
        }

        private void ptb_chatbox_info_avatar_Paint(object sender, PaintEventArgs e)
        {
            LoadImageFromUrl("https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg", ptb_chatbox_info_avatar);
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, ptb_chatbox_info_avatar.Width, ptb_chatbox_info_avatar.Height);
            Region rg = new Region(gp);
            ptb_chatbox_info_avatar.Region = rg;
        }

        //**For paint circle avatar--------------------------------------------------------------------------------





        private void txtSearchBar_Enter(object sender, EventArgs e)
        {
            GraphicsPath gp = new GraphicsPath();
            gp.AddRectangle(new Rectangle(txtSearchBar.Location.X, txtSearchBar.Location.Y, txtSearchBar.Width, txtSearchBar.Height));
            Region rg = new Region(gp);
            ptbUserAvatar.Region = rg;
        }


        private void LoadChatList()
        {
            var FriendList = Task.Run(async () => await ApiService.GetFriendAsync(CurrentUser.UserId)).Result;
            int i = 0;
            foreach (var friend in FriendList)
            {
                panelItem panelItem = new panelItem(i, friend.FriendNavigation);
                i++;
            }




            panel_list.ResumeLayout(false);
            panel_list.PerformLayout();

        }





        // For panel tab bar--------------------------------------------------------------------------------

        private void panel_tab_MouseDown(object sender, MouseEventArgs e)
        {
            draggPanelMouseDown = true;
        }

        private void panel_tab_MouseMove(object sender, MouseEventArgs e)
        {
            if (draggPanelMouseDown)
            {
                int mouseX = MousePosition.X - 400;

                int mouseY = MousePosition.Y - 20;

                this.SetDesktopLocation(mouseX, mouseY);
            }
        }

        private void panel_tab_MouseUp(object sender, MouseEventArgs e)
        {
            draggPanelMouseDown = false;
        }

        //** For panel tab bar--------------------------------------------------------------------------------



        //for 2 button chat and contact-------------------------------------------------------------------
        private void Panel_contact_btn_MouseEnter(object sender, EventArgs e)
        {
            panel_contact_btn.BackColor = Color.FromArgb(0, 110, 220);
        }

        private void Panel_contact_btn_MouseLeave(object sender, EventArgs e)
        {
            panel_contact_btn.BackColor = Color.FromArgb(0, 145, 255);

        }

        private void Panel_chat_btn_MouseEnter(object sender, EventArgs e)
        {
            panel_chat_btn.BackColor = Color.FromArgb(0, 110, 220);
        }

        private void Panel_chat_btn_MouseLeave(object sender, EventArgs e)
        {
            panel_chat_btn.BackColor = Color.FromArgb(0, 145, 255);
        }

        private void panel_chat_btn_Click(object sender, EventArgs e)
        {
            LoadChatList();

        }


        //**for 2 button chat and contact-------------------------------------------------------------------


        //For menu strip bar button-------------------------------------------------------------------------

        private void btn_close_Click(object sender, EventArgs e)
        {
            this.Close();

        }

        private void btn_minimize_Click(object sender, EventArgs e)
        {
            this.WindowState = FormWindowState.Minimized;
        }

        private void frmMain_Load(object sender, EventArgs e)
        {
            normalWidth = this.Width;
            normalHeight = this.Height;
            normalLocation = this.Location;


        }

        private void btn_form_size_Click(object sender, EventArgs e)
        {
            if (isMaximized)
            {
                this.WindowState = FormWindowState.Normal;
                this.Width = normalWidth;
                this.Height = normalHeight;
                this.Location = normalLocation;
                isMaximized = false;
                btn_form_size.BackgroundImage = Properties.Resources.maximize;
                panel_list.Height = this.Height - panel_tab.Height - panel_search.Height;
                //panel_line.Width = textBox_chat.Width;

            }
            else
            {
                normalWidth = this.Width;
                normalHeight = this.Height;
                normalLocation = this.Location;
                this.WindowState = FormWindowState.Maximized;
                isMaximized = true;
                btn_form_size.BackgroundImage = Properties.Resources.minimize;
                panel_list.Height = this.Height - panel_tab.Height - panel_search.Height;
                //panel_line.Width = textBox_chat.Width;

            }
        }

        public void ShowSendedMessage(string messageContent)
        {
            messageItem messageItem = new messageItem(true, messageContent, false);

            panel_message.Controls.Add(messageItem.MessageRowPanel);
            panel_message.AutoScrollMinSize = new Size(0, messageItem.MessageRowPanel.Height);
            panel_message.AutoScrollPosition = new Point(0, panel_message.VerticalScroll.Maximum);
            lastMessageId = "send";
        }

        public void ShowReceivedMessage(string messageContent)
        {
            bool isHaveAvatar = false;
            if (lastMessageId == "received")
            {
                isHaveAvatar = false;
            }
            if (lastMessageId == "send")
            {
                isHaveAvatar = true;
            }
            messageItem messageItem = new messageItem(false, messageContent, isHaveAvatar);
            panel_message.Controls.Add(messageItem.MessageRowPanel);
            panel_message.AutoScrollMinSize = new Size(0, messageItem.MessageRowPanel.Height);
            panel_message.AutoScrollPosition = new Point(0, panel_message_screen.VerticalScroll.Maximum + 100);
            lastMessageId = "received";
        }


        private void panel_chat_btn_Paint(object sender, PaintEventArgs e)
        {

        }

        private void btn_send_Click(object sender, EventArgs e)
        {


            ShowSendedMessage(chat_textbox.Text);
        }

        private void btn_receive_Click(object sender, EventArgs e)
        {
            ShowReceivedMessage(chat_textbox.Text);
        }

        private void ptbUserAvatar_Click(object sender, EventArgs e)
        {
            frmProfile frmProfile = new frmProfile();
            frmProfile.UserInfo = CurrentUser;
            frmProfile.ShowDialog();
        }


        //**For menu strip bar button-------------------------------------------------------------------------

    }
}
