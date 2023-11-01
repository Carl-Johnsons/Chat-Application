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
using Message = BussinessObject.Models.Message;
using static System.Windows.Forms.VisualStyles.VisualStyleElement.ToolBar;

namespace WFChatApplication
{
    public partial class frmMain : Form
    {
        public User CurrentUser { get; set; }
        public PictureBox ptb_chatbox_info_avatar { get; set; }
        public Panel panel_message { get; set; }
        public Label lb_chat_user_name { get; set; }

        public frmMain()
        {
            panel_message = new Panel();
            lb_chat_user_name = new Label();
            ptb_chatbox_info_avatar = new PictureBox();
            //panel_message.Dock = DockStyle.Fill;
            //panel_message.Location = new Point(0, 0);
            //panel_message.Name = "panel_message";
            //panel_message.Size = new Size(1130, 631);
            //panel_message.TabIndex = 1;
            InitializeComponent();
            ((System.ComponentModel.ISupportInitialize)ptb_chatbox_info_avatar).BeginInit();
            panel_chat_box_info.Controls.Add(lb_chat_user_name);
            panel_chat_box_info.Controls.Add(ptb_chatbox_info_avatar);
            lb_chat_user_name.AutoSize = true;
            lb_chat_user_name.Font = new Font("Arial", 13.8F, FontStyle.Regular, GraphicsUnit.Point);
            lb_chat_user_name.Location = new Point(436, 34);
            lb_chat_user_name.Name = "lb_chat_user_name";
            lb_chat_user_name.Size = new Size(71, 26);
            lb_chat_user_name.TabIndex = 1;
            lb_chat_user_name.Text = "label1";
            ptb_chatbox_info_avatar.Location = new Point(359, 15);
            ptb_chatbox_info_avatar.Name = "ptb_chatbox_info_avatar";
            ptb_chatbox_info_avatar.Size = new Size(60, 60);
            ptb_chatbox_info_avatar.SizeMode = PictureBoxSizeMode.StretchImage;
            ptb_chatbox_info_avatar.TabIndex = 0;
            ptb_chatbox_info_avatar.TabStop = false;
            ((System.ComponentModel.ISupportInitialize)ptb_chatbox_info_avatar).EndInit();


        }

        private bool isMaximized = false;
        private int normalWidth;
        private int normalHeight;
        private bool draggPanelMouseDown = false;
        private System.Drawing.Point normalLocation;
        int TotalHeightPanelMessageScreen = 0;
        public string lastMessageId = "send";
        public User Receiver { get; set; }

        //========================= TOOLS ==================================================
        public void LoadImageFromUrl(string url, PictureBox pictureBox)
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

        //============================ LOAD  ==================================================

        private void frmMain_Load(object sender, EventArgs e)
        {
            //avatar
            Console.WriteLine("ptbUserAvatar_Paint");
            LoadImageFromUrl(CurrentUser.AvatarUrl, ptbUserAvatar);
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, ptbUserAvatar.Width, ptbUserAvatar.Height);
            Region rg = new Region(gp);
            ptbUserAvatar.Region = rg;


            //chat avatar
            Console.WriteLine("ptb_chatbox_info_avatar_Paint2");
            //ptb_chatbox_info_avatar.ImageLocation = CurrentUser.AvatarUrl;
            LoadImageFromUrl("https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg", ptb_chatbox_info_avatar);
            GraphicsPath gp1 = new GraphicsPath();
            gp1.AddEllipse(0, 0, ptb_chatbox_info_avatar.Width, ptb_chatbox_info_avatar.Height);
            Region rg2 = new Region(gp1);
            ptb_chatbox_info_avatar.Region = rg2;


            normalWidth = this.Width;
            normalHeight = this.Height;
            normalLocation = this.Location;


        }


        private async void LoadChatList()
        {
            var FriendList = await ApiService.GetFriendAsync(CurrentUser.UserId);
            int i = 0;
            foreach (var friend in FriendList)
            {
                panelItem panelItem = new panelItem(i, friend.FriendNavigation, this);
                panel_list.Controls.Add(panelItem);
                i++;
            }
            panel_list.ResumeLayout(false);
            panel_list.PerformLayout();
        }



        //========================= MESSAGE ===================================================
        public void ShowSendedMessage(IndividualMessage IndividualMessage)
        {
            messageItem messageItem = new messageItem(true, IndividualMessage, false, this);
            panel_message.Controls.Add(messageItem.MessageRowPanel);
            panel_message.AutoScrollMinSize = new Size(0, messageItem.MessageRowPanel.Height);
            panel_message.AutoScrollPosition = new Point(0, panel_message.VerticalScroll.Maximum);
            lastMessageId = "send";
        }

        public void ShowReceivedMessage(IndividualMessage individualMessage)
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
            messageItem messageItem = new messageItem(false, individualMessage, isHaveAvatar, this);
            panel_message.Controls.Add(messageItem.MessageRowPanel);
            panel_message.AutoScrollMinSize = new Size(0, messageItem.MessageRowPanel.Height);
            panel_message.AutoScrollPosition = new Point(0, panel_message_screen.VerticalScroll.Maximum + 100);
            lastMessageId = "received";
        }

        //============================== EVENT ======================================================================
        //============================== MOUSE ======================================================================

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
        private void Panel_logout_btn_MouseEnter(object sender, EventArgs e)
        {
            panel_logout_btn.BackColor = Color.FromArgb(0, 110, 220);
        }

        private void Panel_logout_btn_MouseLeave(object sender, EventArgs e)
        {
            panel_logout_btn.BackColor = Color.FromArgb(0, 145, 255);

        }

        private void panel_logout_btn_Click(object sender, EventArgs e)
        {
            DialogResult dialogResult = MessageBox.Show("Do you want to logout?", "Confirmation", MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            if (dialogResult == DialogResult.Yes)
            {
                frmLogin frmLogin = new frmLogin();
                Program.setMainForm(frmLogin);
                Program.showMainForm();
                this.Dispose();
            }
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
        //**For menu strip bar button-------------------------------------------------------------------------

        //For message ----------------------------------------------------------------------------------------
        //Send Message Button

        private async void btn_send_Click(object sender, EventArgs e)
        {
            string Content = chat_textbox.Text;
            if (Content != null && Content != "") {
                IndividualMessage message = new IndividualMessage
                {
                    UserReceiverId = Receiver.UserId,
                    Status = "string",
                    Message = new Message
                    {
                        SenderId = CurrentUser.UserId,
                        Content = Content,
                        Time = DateTime.Now,
                        MessageType = "Individual",
                        MessageFormat = "Text",
                        Active = true
                    }
                };

                chat_textbox.Text = "";
                await ApiService.SendIndividualMessageAsync(message);
                ShowSendedMessage(message);
            }
        }
        //==================================================================

        //For click user avatar=============================================
        private void ptbUserAvatar_Click(object sender, EventArgs e)
        {
            frmProfile frmProfile = new frmProfile();
            frmProfile.UserInfo = CurrentUser;
            frmProfile.FormClosed += frmProfile_Closed;
            frmProfile.ShowDialog();
        }

        //Update form main after update user information
        private void frmProfile_Closed(object sender, FormClosedEventArgs e)
        {
            LoadImageFromUrl(CurrentUser.AvatarUrl, ptbUserAvatar);
        }

        //=========================================================================

        //================================= KEY EVENT ================================
        private void txtSearchBar_Enter(object sender, EventArgs e)
        {
            GraphicsPath gp = new GraphicsPath();
            gp.AddRectangle(new Rectangle(txtSearchBar.Location.X, txtSearchBar.Location.Y, txtSearchBar.Width, txtSearchBar.Height));
            Region rg = new Region(gp);
            ptbUserAvatar.Region = rg;
        }

        private void chat_textbox_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Enter)
            {
                btn_send.PerformClick();
                e.Handled = true;
            }
        }

       
    }
}
