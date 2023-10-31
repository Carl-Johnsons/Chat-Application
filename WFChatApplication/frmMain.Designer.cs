using System.Windows.Forms;
using WFChatApplication.Properties;

namespace WFChatApplication
{
    partial class frmMain
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            panel_tab = new Panel();
            panel_menu_strip_container = new Panel();
            btn_minimize = new Button();
            btn_form_size = new Button();
            btn_close = new Button();
            panel_vertical_tab = new Panel();
            ptbUserAvatar = new PictureBox();
            panel_contact_btn = new Panel();
            ptbContact = new PictureBox();
            panel_chat_btn = new Panel();
            ptbMessage = new PictureBox();
            panel_search = new Panel();
            button5 = new Button();
            button4 = new Button();
            txtSearchBar = new TextBox();
            panel_list = new Panel();
            panel_layout_screen = new Panel();
            panel_sub_layout_screen = new Panel();
            panel_big_screen = new Panel();
            panel_message_screen = new Panel();
            panel_message = new Panel();
            panel_chat_textbox_container = new Panel();
            chat_textbox = new TextBox();
            panel_chattextbox_margin1 = new Panel();
            btn_receive = new Button();
            btn_send = new Button();
            panel_chatextbox_margin = new Panel();
            panel_layout_sublist = new Panel();
            panel_chat_box_info = new Panel();
            ptb_chatbox_info_avatar = new PictureBox();
            panel_contain_list = new Panel();
            panel_tab.SuspendLayout();
            panel_menu_strip_container.SuspendLayout();
            panel_vertical_tab.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)ptbUserAvatar).BeginInit();
            panel_contact_btn.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)ptbContact).BeginInit();
            panel_chat_btn.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)ptbMessage).BeginInit();
            panel_search.SuspendLayout();
            panel_layout_screen.SuspendLayout();
            panel_sub_layout_screen.SuspendLayout();
            panel_big_screen.SuspendLayout();
            panel_message_screen.SuspendLayout();
            panel_chat_textbox_container.SuspendLayout();
            panel_chattextbox_margin1.SuspendLayout();
            panel_chat_box_info.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)ptb_chatbox_info_avatar).BeginInit();
            panel_contain_list.SuspendLayout();
            SuspendLayout();
            // 
            // panel_tab
            // 
            panel_tab.BackColor = Color.FromArgb(234, 237, 240);
            panel_tab.Controls.Add(panel_menu_strip_container);
            panel_tab.Dock = DockStyle.Top;
            panel_tab.Location = new Point(0, 0);
            panel_tab.Name = "panel_tab";
            panel_tab.Size = new Size(1550, 32);
            panel_tab.TabIndex = 0;
            panel_tab.MouseDown += panel_tab_MouseDown;
            panel_tab.MouseMove += panel_tab_MouseMove;
            panel_tab.MouseUp += panel_tab_MouseUp;
            // 
            // panel_menu_strip_container
            // 
            panel_menu_strip_container.Controls.Add(btn_minimize);
            panel_menu_strip_container.Controls.Add(btn_form_size);
            panel_menu_strip_container.Controls.Add(btn_close);
            panel_menu_strip_container.Dock = DockStyle.Right;
            panel_menu_strip_container.Location = new Point(1454, 0);
            panel_menu_strip_container.Name = "panel_menu_strip_container";
            panel_menu_strip_container.Size = new Size(96, 32);
            panel_menu_strip_container.TabIndex = 6;
            // 
            // btn_minimize
            // 
            btn_minimize.BackColor = Color.FromArgb(234, 237, 240);
            btn_minimize.BackgroundImage = Resources.minus;
            btn_minimize.BackgroundImageLayout = ImageLayout.Zoom;
            btn_minimize.Dock = DockStyle.Right;
            btn_minimize.FlatAppearance.BorderSize = 0;
            btn_minimize.FlatAppearance.MouseDownBackColor = Color.Firebrick;
            btn_minimize.FlatAppearance.MouseOverBackColor = Color.Firebrick;
            btn_minimize.FlatStyle = FlatStyle.Flat;
            btn_minimize.Location = new Point(0, 0);
            btn_minimize.Name = "btn_minimize";
            btn_minimize.Size = new Size(32, 32);
            btn_minimize.TabIndex = 8;
            btn_minimize.UseVisualStyleBackColor = false;
            btn_minimize.Click += btn_minimize_Click;
            // 
            // btn_form_size
            // 
            btn_form_size.BackColor = Color.FromArgb(234, 237, 240);
            btn_form_size.BackgroundImage = Resources.maximize;
            btn_form_size.BackgroundImageLayout = ImageLayout.Zoom;
            btn_form_size.Dock = DockStyle.Right;
            btn_form_size.FlatAppearance.BorderSize = 0;
            btn_form_size.FlatAppearance.MouseDownBackColor = Color.Firebrick;
            btn_form_size.FlatAppearance.MouseOverBackColor = Color.Firebrick;
            btn_form_size.FlatStyle = FlatStyle.Flat;
            btn_form_size.Location = new Point(32, 0);
            btn_form_size.Name = "btn_form_size";
            btn_form_size.Size = new Size(32, 32);
            btn_form_size.TabIndex = 7;
            btn_form_size.UseVisualStyleBackColor = false;
            btn_form_size.Click += btn_form_size_Click;
            // 
            // btn_close
            // 
            btn_close.BackColor = Color.FromArgb(234, 237, 240);
            btn_close.BackgroundImage = Resources.reject;
            btn_close.BackgroundImageLayout = ImageLayout.Zoom;
            btn_close.Dock = DockStyle.Right;
            btn_close.FlatAppearance.BorderSize = 0;
            btn_close.FlatAppearance.MouseDownBackColor = Color.Firebrick;
            btn_close.FlatAppearance.MouseOverBackColor = Color.Firebrick;
            btn_close.FlatStyle = FlatStyle.Flat;
            btn_close.Location = new Point(64, 0);
            btn_close.Name = "btn_close";
            btn_close.Size = new Size(32, 32);
            btn_close.TabIndex = 6;
            btn_close.UseVisualStyleBackColor = false;
            btn_close.Click += btn_close_Click;
            // 
            // panel_vertical_tab
            // 
            panel_vertical_tab.BackColor = Color.FromArgb(0, 145, 255);
            panel_vertical_tab.Controls.Add(ptbUserAvatar);
            panel_vertical_tab.Controls.Add(panel_contact_btn);
            panel_vertical_tab.Controls.Add(panel_chat_btn);
            panel_vertical_tab.Dock = DockStyle.Left;
            panel_vertical_tab.Location = new Point(0, 32);
            panel_vertical_tab.Name = "panel_vertical_tab";
            panel_vertical_tab.Size = new Size(75, 848);
            panel_vertical_tab.TabIndex = 1;
            // 
            // ptbUserAvatar
            // 
            ptbUserAvatar.BorderStyle = BorderStyle.FixedSingle;
            ptbUserAvatar.Location = new Point(7, 16);
            ptbUserAvatar.Margin = new Padding(3, 4, 3, 4);
            ptbUserAvatar.Name = "ptbUserAvatar";
            ptbUserAvatar.Size = new Size(60, 60);
            ptbUserAvatar.SizeMode = PictureBoxSizeMode.StretchImage;
            ptbUserAvatar.TabIndex = 13;
            ptbUserAvatar.TabStop = false;
            ptbUserAvatar.Click += ptbUserAvatar_Click;
            ptbUserAvatar.Paint += ptbUserAvatar_Paint;
            // 
            // panel_contact_btn
            // 
            panel_contact_btn.BackColor = Color.FromArgb(0, 145, 255);
            panel_contact_btn.Controls.Add(ptbContact);
            panel_contact_btn.Location = new Point(0, 235);
            panel_contact_btn.Name = "panel_contact_btn";
            panel_contact_btn.Padding = new Padding(20);
            panel_contact_btn.Size = new Size(75, 75);
            panel_contact_btn.TabIndex = 12;
            panel_contact_btn.MouseEnter += Panel_contact_btn_MouseEnter;
            panel_contact_btn.MouseLeave += Panel_contact_btn_MouseLeave;
            // 
            // ptbContact
            // 
            ptbContact.Dock = DockStyle.Fill;
            ptbContact.Enabled = false;
            ptbContact.Image = Resources.notebook_of_contacts;
            ptbContact.Location = new Point(20, 20);
            ptbContact.Name = "ptbContact";
            ptbContact.Size = new Size(35, 35);
            ptbContact.SizeMode = PictureBoxSizeMode.Zoom;
            ptbContact.TabIndex = 12;
            ptbContact.TabStop = false;
            // 
            // panel_chat_btn
            // 
            panel_chat_btn.BackColor = Color.FromArgb(0, 145, 255);
            panel_chat_btn.Controls.Add(ptbMessage);
            panel_chat_btn.Location = new Point(0, 160);
            panel_chat_btn.Name = "panel_chat_btn";
            panel_chat_btn.Padding = new Padding(20);
            panel_chat_btn.Size = new Size(75, 75);
            panel_chat_btn.TabIndex = 11;
            panel_chat_btn.Click += panel_chat_btn_Click;
            panel_chat_btn.Paint += panel_chat_btn_Paint;
            panel_chat_btn.MouseEnter += Panel_chat_btn_MouseEnter;
            panel_chat_btn.MouseLeave += Panel_chat_btn_MouseLeave;
            // 
            // ptbMessage
            // 
            ptbMessage.Dock = DockStyle.Fill;
            ptbMessage.Enabled = false;
            ptbMessage.Image = Resources.chat;
            ptbMessage.Location = new Point(20, 20);
            ptbMessage.Name = "ptbMessage";
            ptbMessage.Size = new Size(35, 35);
            ptbMessage.SizeMode = PictureBoxSizeMode.Zoom;
            ptbMessage.TabIndex = 12;
            ptbMessage.TabStop = false;
            // 
            // panel_search
            // 
            panel_search.BackColor = Color.White;
            panel_search.BorderStyle = BorderStyle.FixedSingle;
            panel_search.Controls.Add(button5);
            panel_search.Controls.Add(button4);
            panel_search.Controls.Add(txtSearchBar);
            panel_search.Dock = DockStyle.Top;
            panel_search.Location = new Point(0, 0);
            panel_search.Name = "panel_search";
            panel_search.Size = new Size(343, 120);
            panel_search.TabIndex = 3;
            // 
            // button5
            // 
            button5.BackColor = Color.White;
            button5.BackgroundImage = Resources.join;
            button5.BackgroundImageLayout = ImageLayout.Stretch;
            button5.FlatAppearance.BorderSize = 0;
            button5.FlatAppearance.MouseDownBackColor = Color.FromArgb(224, 224, 224);
            button5.FlatAppearance.MouseOverBackColor = Color.FromArgb(224, 224, 224);
            button5.FlatStyle = FlatStyle.Flat;
            button5.Location = new Point(290, 34);
            button5.Name = "button5";
            button5.Size = new Size(35, 35);
            button5.TabIndex = 7;
            button5.UseVisualStyleBackColor = false;
            // 
            // button4
            // 
            button4.BackColor = Color.White;
            button4.BackgroundImage = Resources.add_user;
            button4.BackgroundImageLayout = ImageLayout.Zoom;
            button4.FlatAppearance.BorderSize = 0;
            button4.FlatAppearance.MouseDownBackColor = Color.FromArgb(224, 224, 224);
            button4.FlatAppearance.MouseOverBackColor = Color.FromArgb(224, 224, 224);
            button4.FlatStyle = FlatStyle.Flat;
            button4.Location = new Point(250, 35);
            button4.Name = "button4";
            button4.Size = new Size(30, 30);
            button4.TabIndex = 6;
            button4.UseVisualStyleBackColor = false;
            // 
            // txtSearchBar
            // 
            txtSearchBar.BackColor = Color.FromArgb(234, 237, 240);
            txtSearchBar.BorderStyle = BorderStyle.None;
            txtSearchBar.Font = new Font("Arial Narrow", 15F, FontStyle.Regular, GraphicsUnit.Point);
            txtSearchBar.ForeColor = Color.Black;
            txtSearchBar.Location = new Point(25, 35);
            txtSearchBar.Name = "txtSearchBar";
            txtSearchBar.Size = new Size(208, 29);
            txtSearchBar.TabIndex = 0;
            // 
            // panel_list
            // 
            panel_list.AutoScroll = true;
            panel_list.BackColor = Color.White;
            panel_list.BorderStyle = BorderStyle.FixedSingle;
            panel_list.Dock = DockStyle.Bottom;
            panel_list.Location = new Point(0, 120);
            panel_list.Name = "panel_list";
            panel_list.Size = new Size(343, 728);
            panel_list.TabIndex = 8;
            // 
            // panel_layout_screen
            // 
            panel_layout_screen.BackColor = Color.WhiteSmoke;
            panel_layout_screen.Controls.Add(panel_sub_layout_screen);
            panel_layout_screen.Controls.Add(panel_chat_box_info);
            panel_layout_screen.Dock = DockStyle.Fill;
            panel_layout_screen.Location = new Point(75, 32);
            panel_layout_screen.Name = "panel_layout_screen";
            panel_layout_screen.Size = new Size(1475, 848);
            panel_layout_screen.TabIndex = 9;
            // 
            // panel_sub_layout_screen
            // 
            panel_sub_layout_screen.BackColor = Color.White;
            panel_sub_layout_screen.Controls.Add(panel_big_screen);
            panel_sub_layout_screen.Controls.Add(panel_layout_sublist);
            panel_sub_layout_screen.Dock = DockStyle.Fill;
            panel_sub_layout_screen.Location = new Point(0, 90);
            panel_sub_layout_screen.Name = "panel_sub_layout_screen";
            panel_sub_layout_screen.Size = new Size(1475, 758);
            panel_sub_layout_screen.TabIndex = 1;
            // 
            // panel_big_screen
            // 
            panel_big_screen.BackColor = Color.White;
            panel_big_screen.BorderStyle = BorderStyle.FixedSingle;
            panel_big_screen.Controls.Add(panel_message_screen);
            panel_big_screen.Dock = DockStyle.Fill;
            panel_big_screen.Location = new Point(343, 0);
            panel_big_screen.Name = "panel_big_screen";
            panel_big_screen.Size = new Size(1132, 758);
            panel_big_screen.TabIndex = 3;
            // 
            // panel_message_screen
            // 
            panel_message_screen.BackColor = Color.WhiteSmoke;
            panel_message_screen.Controls.Add(panel_message);
            panel_message_screen.Controls.Add(panel_chat_textbox_container);
            panel_message_screen.Dock = DockStyle.Fill;
            panel_message_screen.Location = new Point(0, 0);
            panel_message_screen.Name = "panel_message_screen";
            panel_message_screen.Size = new Size(1130, 756);
            panel_message_screen.TabIndex = 0;
            // 
            // panel_message
            // 
            panel_message.Dock = DockStyle.Fill;
            panel_message.Location = new Point(0, 0);
            panel_message.Name = "panel_message";
            panel_message.Size = new Size(1130, 631);
            panel_message.TabIndex = 1;
            // 
            // panel_chat_textbox_container
            // 
            panel_chat_textbox_container.BackColor = Color.White;
            panel_chat_textbox_container.BorderStyle = BorderStyle.FixedSingle;
            panel_chat_textbox_container.Controls.Add(chat_textbox);
            panel_chat_textbox_container.Controls.Add(panel_chattextbox_margin1);
            panel_chat_textbox_container.Controls.Add(panel_chatextbox_margin);
            panel_chat_textbox_container.Dock = DockStyle.Bottom;
            panel_chat_textbox_container.Location = new Point(0, 631);
            panel_chat_textbox_container.Name = "panel_chat_textbox_container";
            panel_chat_textbox_container.Size = new Size(1130, 125);
            panel_chat_textbox_container.TabIndex = 0;
            // 
            // chat_textbox
            // 
            chat_textbox.Dock = DockStyle.Bottom;
            chat_textbox.Location = new Point(58, 24);
            chat_textbox.Multiline = true;
            chat_textbox.Name = "chat_textbox";
            chat_textbox.Size = new Size(879, 99);
            chat_textbox.TabIndex = 3;
            // 
            // panel_chattextbox_margin1
            // 
            panel_chattextbox_margin1.Controls.Add(btn_receive);
            panel_chattextbox_margin1.Controls.Add(btn_send);
            panel_chattextbox_margin1.Dock = DockStyle.Right;
            panel_chattextbox_margin1.Location = new Point(937, 0);
            panel_chattextbox_margin1.Name = "panel_chattextbox_margin1";
            panel_chattextbox_margin1.Size = new Size(191, 123);
            panel_chattextbox_margin1.TabIndex = 2;
            // 
            // btn_receive
            // 
            btn_receive.Location = new Point(35, 84);
            btn_receive.Name = "btn_receive";
            btn_receive.Size = new Size(94, 29);
            btn_receive.TabIndex = 1;
            btn_receive.Text = "receive";
            btn_receive.UseVisualStyleBackColor = true;
            btn_receive.Click += btn_receive_Click;
            // 
            // btn_send
            // 
            btn_send.Location = new Point(35, 23);
            btn_send.Name = "btn_send";
            btn_send.Size = new Size(94, 29);
            btn_send.TabIndex = 0;
            btn_send.Text = "send";
            btn_send.UseVisualStyleBackColor = true;
            btn_send.Click += btn_send_Click;
            // 
            // panel_chatextbox_margin
            // 
            panel_chatextbox_margin.Dock = DockStyle.Left;
            panel_chatextbox_margin.Location = new Point(0, 0);
            panel_chatextbox_margin.Name = "panel_chatextbox_margin";
            panel_chatextbox_margin.Size = new Size(58, 123);
            panel_chatextbox_margin.TabIndex = 0;
            // 
            // panel_layout_sublist
            // 
            panel_layout_sublist.BackColor = Color.White;
            panel_layout_sublist.Dock = DockStyle.Left;
            panel_layout_sublist.Location = new Point(0, 0);
            panel_layout_sublist.Name = "panel_layout_sublist";
            panel_layout_sublist.Size = new Size(343, 758);
            panel_layout_sublist.TabIndex = 2;
            // 
            // panel_chat_box_info
            // 
            panel_chat_box_info.BackColor = Color.White;
            panel_chat_box_info.BorderStyle = BorderStyle.FixedSingle;
            panel_chat_box_info.Controls.Add(ptb_chatbox_info_avatar);
            panel_chat_box_info.Dock = DockStyle.Top;
            panel_chat_box_info.Location = new Point(0, 0);
            panel_chat_box_info.Name = "panel_chat_box_info";
            panel_chat_box_info.Size = new Size(1475, 90);
            panel_chat_box_info.TabIndex = 0;
            // 
            // ptb_chatbox_info_avatar
            // 
            ptb_chatbox_info_avatar.BorderStyle = BorderStyle.FixedSingle;
            ptb_chatbox_info_avatar.Location = new Point(370, 15);
            ptb_chatbox_info_avatar.Margin = new Padding(3, 4, 3, 4);
            ptb_chatbox_info_avatar.Name = "ptb_chatbox_info_avatar";
            ptb_chatbox_info_avatar.Size = new Size(60, 60);
            ptb_chatbox_info_avatar.SizeMode = PictureBoxSizeMode.StretchImage;
            ptb_chatbox_info_avatar.TabIndex = 7;
            ptb_chatbox_info_avatar.TabStop = false;
            ptb_chatbox_info_avatar.Paint += ptb_chatbox_info_avatar_Paint;
            // 
            // panel_contain_list
            // 
            panel_contain_list.BackColor = Color.White;
            panel_contain_list.Controls.Add(panel_list);
            panel_contain_list.Controls.Add(panel_search);
            panel_contain_list.Dock = DockStyle.Left;
            panel_contain_list.Location = new Point(75, 32);
            panel_contain_list.Name = "panel_contain_list";
            panel_contain_list.Size = new Size(343, 848);
            panel_contain_list.TabIndex = 11;
            // 
            // frmMain
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            ClientSize = new Size(1550, 880);
            ControlBox = false;
            Controls.Add(panel_contain_list);
            Controls.Add(panel_layout_screen);
            Controls.Add(panel_vertical_tab);
            Controls.Add(panel_tab);
            FormBorderStyle = FormBorderStyle.None;
            Name = "frmMain";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "Chat Application";
            Load += frmMain_Load;
            panel_tab.ResumeLayout(false);
            panel_menu_strip_container.ResumeLayout(false);
            panel_vertical_tab.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)ptbUserAvatar).EndInit();
            panel_contact_btn.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)ptbContact).EndInit();
            panel_chat_btn.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)ptbMessage).EndInit();
            panel_search.ResumeLayout(false);
            panel_search.PerformLayout();
            panel_layout_screen.ResumeLayout(false);
            panel_sub_layout_screen.ResumeLayout(false);
            panel_big_screen.ResumeLayout(false);
            panel_message_screen.ResumeLayout(false);
            panel_chat_textbox_container.ResumeLayout(false);
            panel_chat_textbox_container.PerformLayout();
            panel_chattextbox_margin1.ResumeLayout(false);
            panel_chat_box_info.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)ptb_chatbox_info_avatar).EndInit();
            panel_contain_list.ResumeLayout(false);
            ResumeLayout(false);
        }

        #endregion

        private Panel panel_tab;
        private Panel panel_vertical_tab;
        private Panel panel_search;
        private Panel panel_menu_strip_container;
        private Button btn_minimize;
        private Button btn_form_size;
        private Button btn_close;
        private TextBox txtSearchBar;
        private Button button5;
        private Button button4;
        private Panel panel_list;
        private Panel panel_layout_screen;
        private Panel panel_chat_btn;
        private PictureBox ptbMessage;
        private Panel panel_contact_btn;
        private PictureBox ptbContact;
        private Panel panel_contain_list;
        private Panel panel_chat_box_info;
        private PictureBox ptb_chatbox_info_avatar;
        private Panel panel_sub_layout_screen;
        private Panel panel_big_screen;
        private Panel panel_layout_sublist;
        private PictureBox ptbUserAvatar;
        private Panel panel_message_screen;
        private Panel panel_chat_textbox_container;
        private TextBox chat_textbox;
        private Panel panel_chattextbox_margin1;
        private Panel panel_chatextbox_margin;
        private Button btn_receive;
        private Button btn_send;
        private Panel panel_message;
    }
}