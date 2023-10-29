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
using static System.Windows.Forms.VisualStyles.VisualStyleElement;

namespace WFChatApplication
{
    public partial class frmMain : Form
    {
        public frmMain()
        {
            InitializeComponent();
            LoadMessageScreen();
            LoadChatTextBox();

        }
        private bool isMaximized = false;
        private int normalWidth;
        private int normalHeight;
        private bool draggPanelMouseDown = false;
        private System.Drawing.Point normalLocation;
        int TotalHeightPanelMessageScreen = 0;
        private string lastMessageId = "send";

        private Panel panel_message_screen;
        private Panel panel_chat_textbox_container;


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
            LoadImageFromUrl("https://scontent.fsgn2-9.fna.fbcdn.net/v/t1.6435-9/205708395_1504353913236212_3220869659595925862_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=be3454&_nc_ohc=Q-DDIeUYLXkAX8pWfa7&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDQTl-W4ZwGI5B9ZEAUEuTEiCHBT35mmaX8fze4ECsWuA&oe=65597CBA", ptbUserAvatar);
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, ptbUserAvatar.Width, ptbUserAvatar.Height);
            Region rg = new Region(gp);
            ptbUserAvatar.Region = rg;
        }

        private void ptb_chatbox_info_avatar_Paint(object sender, PaintEventArgs e)
        {
            LoadImageFromUrl("https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/313404649_1449466208899373_2300191788456403089_n.jpg?stp=dst-jpg_p320x320&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=3OVnbdQ-HBgAX93faQQ&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfB5-xxlQBR8sEAo4nDAq-tIqKDjCLmuG83wsDSy0jwrJA&oe=653608AF", ptb_chatbox_info_avatar);
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
            for (int i = 0; i < 20; i++)
            {
                panelItem pnlItem = new panelItem(i);
                panel_list.Controls.Add(pnlItem);
            }
            panel_list.ResumeLayout(false);
            panel_list.PerformLayout();

        }

        private void LoadChatTextBox()
        {


            panel_chat_textbox_container = new Panel();
            panel_chat_textbox_container.SuspendLayout();
            panel_chat_textbox_container.BackColor = Color.White;
            panel_chat_textbox_container.Controls.Add(panel_line);
            panel_chat_textbox_container.Controls.Add(textBox_chat);
            panel_chat_textbox_container.Controls.Add(panel5);
            panel_chat_textbox_container.Controls.Add(panel4);
            panel_chat_textbox_container.Dock = DockStyle.Bottom;
            panel_chat_textbox_container.Location = new Point(0, 616);
            panel_chat_textbox_container.Name = "panel_chat_textbox_container";
            panel_chat_textbox_container.Size = new Size(1130, 140);
            panel_chat_textbox_container.ResumeLayout(false);
            panel_chat_textbox_container.PerformLayout();
            panel_chat_textbox_container.Visible = true;
            panel_chat_textbox_container.Enabled = true;
            panel_message_screen.Controls.Add(panel_chat_textbox_container);
        }

        private void LoadMessageScreen()
        {


            panel_message_screen = new Panel();
            panel_message_screen.AutoScroll = true;
            panel_message_screen.AutoSize = true;
            panel_message_screen.BackColor = Color.Silver;
            panel_message_screen.Dock = DockStyle.Fill;
            panel_message_screen.Name = "panel_message_screen";
            panel_message_screen.Enabled = true;
            panel_message_screen.Visible = true;
            panel_big_screen.Controls.Add(panel_message_screen);


        }

        //For textBox_chat--------------------------------------------------------------------------------

        private void textBox_chat_GetFocus(object sender, EventArgs e)
        {
            panel_line.BackColor = Color.Red;

        }


        private void textBox_chat_Leave(object sender, EventArgs e)
        {
            panel_line.BackColor = Color.Silver;

        }
        //**For textBox_chat--------------------------------------------------------------------------------



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
            panel_chat_textbox_container.Visible = true;
            panel_chat_textbox_container.Enabled = true;
            panel_message_screen.Visible = true;
            panel_message_screen.Enabled = true;
            this.Focus();
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

        private void label1_Click(object sender, EventArgs e)
        {

        }

        private void panel_chat_box_container_Paint(object sender, PaintEventArgs e)
        {

        }

        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void label2_Click_1(object sender, EventArgs e)
        {

        }



        public void ShowSendedMessage(string messageContent, int messageRowSize)
        {
            messageItem messageItem = new messageItem(true, messageContent, false);

            panel_message_screen.Controls.Add(messageItem.MessageRowPanel);

            panel_message_screen.AutoScrollMinSize = new Size(0, messageItem.MessageRowPanel.Height);
            panel_message_screen.AutoScrollPosition = new Point(0, panel_message_screen.VerticalScroll.Maximum);



            lastMessageId = "send";

            //panel3.VerticalScroll.Value += childPanel.Height;



        }

        public void ShowReceivedMessage(string messageContent, int messageRowSize)
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
            panel_message_screen.Controls.Add(messageItem.MessageRowPanel);


            panel_message_screen.AutoScrollMinSize = new Size(0, messageItem.MessageRowPanel.Height);
            panel_message_screen.AutoScrollPosition = new Point(0, panel_message_screen.VerticalScroll.Maximum+100);


            lastMessageId = "received";




        }

        private void button1_Click(object sender, EventArgs e)
        {

            ShowSendedMessage(textBox_chat.Text, panel_message_screen.Width);

        }

        private void button2_Click(object sender, EventArgs e)
        {
            ShowReceivedMessage(textBox_chat.Text, panel_message_screen.Width);
        }

        private void panel1_Paint(object sender, PaintEventArgs e)
        {
        }

        private void panel_chat_btn_Paint(object sender, PaintEventArgs e)
        {

        }


        //**For menu strip bar button-------------------------------------------------------------------------

    }
}
