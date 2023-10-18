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

        }
        private bool isMaximized = false;
        private int normalWidth;
        private int normalHeight;
        private bool draggPanelMouseDown = false;
        private System.Drawing.Point normalLocation;
        int TotalHeightPanelMessageScreen = 0;


        //For paint circle avatar--------------------------------------------------------------------------------
        private void ptbUserAvatar_Paint(object sender, PaintEventArgs e)
        {
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, ptbUserAvatar.Width, ptbUserAvatar.Height);
            Region rg = new Region(gp);
            ptbUserAvatar.Region = rg;
        }

        private void ptb_chatbox_info_avatar_Paint(object sender, PaintEventArgs e)
        {
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
            messageItem messageItem = new messageItem(true, messageContent, true, messageRowSize);
            messageItem.MessageLabel.Text += panel_message_screen.Height;
            panel_message_screen.Controls.Add(messageItem.MessageRowPanel);

            panel_message_screen.AutoScrollMinSize = new Size(0, messageItem.MessageRowPanel.Height);
            panel_message_screen.AutoScrollPosition = new Point(0, panel_message_screen.VerticalScroll.Maximum);

            panel_message_screen.ResumeLayout(false);
            panel_message_screen.PerformLayout();



            //panel3.VerticalScroll.Value += childPanel.Height;



        }

        public void ShowReceivedMessage(string messageContent, int messageRowSize)
        {
            messageItem messageItem = new messageItem(false, messageContent, true, messageRowSize);
            panel_message_screen.Controls.Add(messageItem.MessageRowPanel);


            panel_message_screen.AutoScrollMinSize = new Size(0, messageItem.MessageRowPanel.Height);
            panel_message_screen.AutoScrollPosition = new Point(0, panel_message_screen.VerticalScroll.Maximum);

            panel_message_screen.ResumeLayout(false);
            panel_message_screen.PerformLayout();




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


        //**For menu strip bar button-------------------------------------------------------------------------

    }
}
