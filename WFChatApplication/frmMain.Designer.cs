using System.Windows.Forms;

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
            pictureBox2 = new PictureBox();
            panel_chat_btn = new Panel();
            pictureBox1 = new PictureBox();
            panel_search = new Panel();
            button5 = new Button();
            button4 = new Button();
            txtSearchBar = new TextBox();
            panel_list = new Panel();
            pictureBox3 = new PictureBox();
            panel_message_container = new Panel();
            label1 = new Label();
            label2 = new Label();
            panel_layout_screen = new Panel();
            panel_sub_layout_screen = new Panel();
            panel_big_screen = new Panel();
            panel_message_screen = new Panel();
            panel_chat_textbox_container = new Panel();
            panel_line = new Panel();
            textBox_chat = new TextBox();
            panel5 = new Panel();
            button2 = new Button();
            button1 = new Button();
            panel4 = new Panel();
            panel_layout_sublist = new Panel();
            panel_chat_box_info = new Panel();
            ptb_chatbox_info_avatar = new PictureBox();
            panel_contain_list = new Panel();
            panel_tab.SuspendLayout();
            panel_menu_strip_container.SuspendLayout();
            panel_vertical_tab.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)ptbUserAvatar).BeginInit();
            panel_contact_btn.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox2).BeginInit();
            panel_chat_btn.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox1).BeginInit();
            panel_search.SuspendLayout();
            panel_list.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox3).BeginInit();
            panel_message_container.SuspendLayout();
            panel_layout_screen.SuspendLayout();
            panel_sub_layout_screen.SuspendLayout();
            panel_big_screen.SuspendLayout();
            panel_chat_textbox_container.SuspendLayout();
            panel5.SuspendLayout();
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
            btn_minimize.BackgroundImage = Properties.Resources.minus;
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
            btn_form_size.BackgroundImage = Properties.Resources.maximize;
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
            btn_close.BackgroundImage = Properties.Resources.reject;
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
            ptbUserAvatar.BackColor = Color.Transparent;
            ptbUserAvatar.BackgroundImageLayout = ImageLayout.None;
            ptbUserAvatar.BorderStyle = BorderStyle.FixedSingle;
            ptbUserAvatar.Image = Properties.Resources.avatar;
            ptbUserAvatar.Location = new Point(7, 16);
            ptbUserAvatar.Margin = new Padding(3, 4, 3, 4);
            ptbUserAvatar.Name = "ptbUserAvatar";
            ptbUserAvatar.Size = new Size(60, 60);
            ptbUserAvatar.SizeMode = PictureBoxSizeMode.StretchImage;
            ptbUserAvatar.TabIndex = 13;
            ptbUserAvatar.TabStop = false;
            ptbUserAvatar.Paint += ptbUserAvatar_Paint;
            // 
            // panel_contact_btn
            // 
            panel_contact_btn.BackColor = Color.FromArgb(0, 145, 255);
            panel_contact_btn.Controls.Add(pictureBox2);
            panel_contact_btn.Location = new Point(0, 235);
            panel_contact_btn.Name = "panel_contact_btn";
            panel_contact_btn.Padding = new Padding(20);
            panel_contact_btn.Size = new Size(75, 75);
            panel_contact_btn.TabIndex = 12;
            panel_contact_btn.MouseEnter += Panel_contact_btn_MouseEnter;
            panel_contact_btn.MouseLeave += Panel_contact_btn_MouseLeave;
            // 
            // pictureBox2
            // 
            pictureBox2.Dock = DockStyle.Fill;
            pictureBox2.Enabled = false;
            pictureBox2.Image = Properties.Resources.notebook_of_contacts;
            pictureBox2.Location = new Point(20, 20);
            pictureBox2.Name = "pictureBox2";
            pictureBox2.Size = new Size(35, 35);
            pictureBox2.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox2.TabIndex = 12;
            pictureBox2.TabStop = false;
            // 
            // panel_chat_btn
            // 
            panel_chat_btn.BackColor = Color.FromArgb(0, 145, 255);
            panel_chat_btn.Controls.Add(pictureBox1);
            panel_chat_btn.Location = new Point(0, 160);
            panel_chat_btn.Name = "panel_chat_btn";
            panel_chat_btn.Padding = new Padding(20);
            panel_chat_btn.Size = new Size(75, 75);
            panel_chat_btn.TabIndex = 11;
            panel_chat_btn.Click += panel_chat_btn_Click;
            panel_chat_btn.MouseEnter += Panel_chat_btn_MouseEnter;
            panel_chat_btn.MouseLeave += Panel_chat_btn_MouseLeave;
            // 
            // pictureBox1
            // 
            pictureBox1.Dock = DockStyle.Fill;
            pictureBox1.Enabled = false;
            pictureBox1.Image = Properties.Resources.chat;
            pictureBox1.Location = new Point(20, 20);
            pictureBox1.Name = "pictureBox1";
            pictureBox1.Size = new Size(35, 35);
            pictureBox1.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox1.TabIndex = 12;
            pictureBox1.TabStop = false;
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
            button5.BackgroundImage = Properties.Resources.join;
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
            button4.BackgroundImage = Properties.Resources.add_user;
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
            panel_list.Controls.Add(pictureBox3);
            panel_list.Controls.Add(panel_message_container);
            panel_list.Dock = DockStyle.Bottom;
            panel_list.Location = new Point(0, 120);
            panel_list.Name = "panel_list";
            panel_list.Size = new Size(343, 728);
            panel_list.TabIndex = 8;
            // 
            // pictureBox3
            // 
            pictureBox3.BackColor = Color.FromArgb(192, 192, 0);
            pictureBox3.Location = new Point(173, 119);
            pictureBox3.Name = "pictureBox3";
            pictureBox3.Size = new Size(50, 50);
            pictureBox3.TabIndex = 11;
            pictureBox3.TabStop = false;
            // 
            // panel_message_container
            // 
            panel_message_container.AutoSize = true;
            panel_message_container.AutoSizeMode = AutoSizeMode.GrowAndShrink;
            panel_message_container.BackColor = Color.FromArgb(229, 239, 255);
            panel_message_container.Controls.Add(label1);
            panel_message_container.Controls.Add(label2);
            panel_message_container.Location = new Point(151, 197);
            panel_message_container.MaximumSize = new Size(650, 100000);
            panel_message_container.Name = "panel_message_container";
            panel_message_container.Padding = new Padding(20, 10, 20, 10);
            panel_message_container.Size = new Size(92, 74);
            panel_message_container.TabIndex = 1;
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Arial Narrow", 9F, FontStyle.Regular, GraphicsUnit.Point);
            label1.ForeColor = SystemColors.ControlDarkDark;
            label1.Location = new Point(23, 44);
            label1.Name = "label1";
            label1.Size = new Size(43, 20);
            label1.TabIndex = 11;
            label1.Text = "label1";
            // 
            // label2
            // 
            label2.AutoEllipsis = true;
            label2.AutoSize = true;
            label2.Dock = DockStyle.Fill;
            label2.Font = new Font("Arial Narrow", 12F, FontStyle.Regular, GraphicsUnit.Point);
            label2.Location = new Point(20, 10);
            label2.MaximumSize = new Size(600, 100000);
            label2.Name = "label2";
            label2.Size = new Size(52, 24);
            label2.TabIndex = 1;
            label2.Text = "label1";
            label2.Click += label2_Click_1;
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
            panel_big_screen.Controls.Add(panel_chat_textbox_container);
            panel_big_screen.Dock = DockStyle.Fill;
            panel_big_screen.Location = new Point(343, 0);
            panel_big_screen.Name = "panel_big_screen";
            panel_big_screen.Size = new Size(1132, 758);
            panel_big_screen.TabIndex = 3;
            // 
            // panel_message_screen
            // 
            panel_message_screen.AutoScroll = true;
            panel_message_screen.AutoSize = true;
            panel_message_screen.BackColor = Color.Silver;
            panel_message_screen.Dock = DockStyle.Fill;
            panel_message_screen.Location = new Point(0, 0);
            panel_message_screen.Name = "panel_message_screen";
            panel_message_screen.Size = new Size(1130, 616);
            panel_message_screen.TabIndex = 11;
            // 
            // panel_chat_textbox_container
            // 
            panel_chat_textbox_container.BackColor = Color.White;
            panel_chat_textbox_container.Controls.Add(panel_line);
            panel_chat_textbox_container.Controls.Add(textBox_chat);
            panel_chat_textbox_container.Controls.Add(panel5);
            panel_chat_textbox_container.Controls.Add(panel4);
            panel_chat_textbox_container.Dock = DockStyle.Bottom;
            panel_chat_textbox_container.Location = new Point(0, 616);
            panel_chat_textbox_container.Name = "panel_chat_textbox_container";
            panel_chat_textbox_container.Size = new Size(1130, 140);
            panel_chat_textbox_container.TabIndex = 10;
            // 
            // panel_line
            // 
            panel_line.Dock = DockStyle.Bottom;
            panel_line.Location = new Point(25, 58);
            panel_line.Name = "panel_line";
            panel_line.Size = new Size(927, 2);
            panel_line.TabIndex = 11;
            // 
            // textBox_chat
            // 
            textBox_chat.BorderStyle = BorderStyle.FixedSingle;
            textBox_chat.Dock = DockStyle.Bottom;
            textBox_chat.Font = new Font("Arial Narrow", 12F, FontStyle.Regular, GraphicsUnit.Point);
            textBox_chat.Location = new Point(25, 60);
            textBox_chat.Margin = new Padding(15, 30, 15, 30);
            textBox_chat.Multiline = true;
            textBox_chat.Name = "textBox_chat";
            textBox_chat.ScrollBars = ScrollBars.Vertical;
            textBox_chat.Size = new Size(927, 80);
            textBox_chat.TabIndex = 11;
            textBox_chat.GotFocus += textBox_chat_GetFocus;
            textBox_chat.Leave += textBox_chat_Leave;
            // 
            // panel5
            // 
            panel5.Controls.Add(button2);
            panel5.Controls.Add(button1);
            panel5.Dock = DockStyle.Right;
            panel5.Location = new Point(952, 0);
            panel5.Name = "panel5";
            panel5.Size = new Size(178, 140);
            panel5.TabIndex = 12;
            // 
            // button2
            // 
            button2.Location = new Point(28, 31);
            button2.Name = "button2";
            button2.Size = new Size(94, 29);
            button2.TabIndex = 1;
            button2.Text = "button2";
            button2.UseVisualStyleBackColor = true;
            button2.Click += button2_Click;
            // 
            // button1
            // 
            button1.Location = new Point(28, 67);
            button1.Name = "button1";
            button1.Size = new Size(94, 29);
            button1.TabIndex = 0;
            button1.Text = "button1";
            button1.UseVisualStyleBackColor = true;
            button1.Click += button1_Click;
            // 
            // panel4
            // 
            panel4.Dock = DockStyle.Left;
            panel4.Location = new Point(0, 0);
            panel4.Name = "panel4";
            panel4.Size = new Size(25, 140);
            panel4.TabIndex = 13;
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
            ptb_chatbox_info_avatar.BackColor = Color.Transparent;
            ptb_chatbox_info_avatar.BackgroundImageLayout = ImageLayout.None;
            ptb_chatbox_info_avatar.BorderStyle = BorderStyle.FixedSingle;
            ptb_chatbox_info_avatar.Image = Properties.Resources.avatar;
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
            ((System.ComponentModel.ISupportInitialize)pictureBox2).EndInit();
            panel_chat_btn.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)pictureBox1).EndInit();
            panel_search.ResumeLayout(false);
            panel_search.PerformLayout();
            panel_list.ResumeLayout(false);
            panel_list.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox3).EndInit();
            panel_message_container.ResumeLayout(false);
            panel_message_container.PerformLayout();
            panel_layout_screen.ResumeLayout(false);
            panel_sub_layout_screen.ResumeLayout(false);
            panel_big_screen.ResumeLayout(false);
            panel_big_screen.PerformLayout();
            panel_chat_textbox_container.ResumeLayout(false);
            panel_chat_textbox_container.PerformLayout();
            panel5.ResumeLayout(false);
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
        private Panel panel_chat_textbox_container;
        private TextBox textBox_chat;
        private Panel panel5;
        private Panel panel4;
        private Panel panel_line;
        private Panel panel_chat_btn;
        private PictureBox pictureBox1;
        private Panel panel_contact_btn;
        private PictureBox pictureBox2;
        private Panel panel_contain_list;
        private Panel panel_chat_box_info;
        private PictureBox ptb_chatbox_info_avatar;
        private Panel panel_message_container;
        private Label label2;
        private Panel panel_sub_layout_screen;
        private Panel panel_big_screen;
        private Panel panel_layout_sublist;
        private Label label1;
        private PictureBox pictureBox3;
        private PictureBox ptbUserAvatar;
        private Button button1;
        private Button button2;
        private Panel panel_message_screen;
    }
}