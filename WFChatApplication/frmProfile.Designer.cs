namespace WFChatApplication
{
    partial class frmProfile
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
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
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            panel_tab = new Panel();
            panel_exit = new Panel();
            pictureBox4 = new PictureBox();
            ptb_background = new PictureBox();
            ptb_avatar = new PictureBox();
            lb_name = new Label();
            label2 = new Label();
            label4 = new Label();
            label3 = new Label();
            label5 = new Label();
            panel_editProfile = new Panel();
            label9 = new Label();
            pictureBox3 = new PictureBox();
            ptb_camera = new PictureBox();
            lb_phoneNumber = new Label();
            lb_Gender = new Label();
            lb_birthday = new Label();
            panel_tab.SuspendLayout();
            panel_exit.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox4).BeginInit();
            ((System.ComponentModel.ISupportInitialize)ptb_background).BeginInit();
            ((System.ComponentModel.ISupportInitialize)ptb_avatar).BeginInit();
            panel_editProfile.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox3).BeginInit();
            ((System.ComponentModel.ISupportInitialize)ptb_camera).BeginInit();
            SuspendLayout();
            // 
            // panel_tab
            // 
            panel_tab.BackColor = Color.White;
            panel_tab.Controls.Add(panel_exit);
            panel_tab.Dock = DockStyle.Top;
            panel_tab.Location = new Point(0, 0);
            panel_tab.Name = "panel_tab";
            panel_tab.Size = new Size(450, 50);
            panel_tab.TabIndex = 0;
            // 
            // panel_exit
            // 
            panel_exit.Controls.Add(pictureBox4);
            panel_exit.Dock = DockStyle.Right;
            panel_exit.Location = new Point(400, 0);
            panel_exit.Name = "panel_exit";
            panel_exit.Padding = new Padding(20);
            panel_exit.Size = new Size(50, 50);
            panel_exit.TabIndex = 13;
            panel_exit.Click += panel_exit_Click;
            panel_exit.MouseEnter += panel_exit_MouseEnter;
            panel_exit.MouseLeave += panel_exit_MouseLeave;
            // 
            // pictureBox4
            // 
            pictureBox4.BackColor = Color.White;
            pictureBox4.Enabled = false;
            pictureBox4.Image = Properties.Resources.reject;
            pictureBox4.Location = new Point(11, 10);
            pictureBox4.Name = "pictureBox4";
            pictureBox4.Size = new Size(30, 30);
            pictureBox4.TabIndex = 13;
            pictureBox4.TabStop = false;
            // 
            // ptb_background
            // 
            ptb_background.Dock = DockStyle.Top;
            ptb_background.ImageLocation = "https://png.pngtree.com/background/20210712/original/pngtree-modern-double-color-futuristic-neon-background-picture-image_1181573.jpg";
            ptb_background.Location = new Point(0, 50);
            ptb_background.Name = "ptb_background";
            ptb_background.Size = new Size(450, 150);
            ptb_background.SizeMode = PictureBoxSizeMode.StretchImage;
            ptb_background.TabIndex = 1;
            ptb_background.TabStop = false;
            // 
            // ptb_avatar
            // 
            ptb_avatar.ImageLocation = "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg";
            ptb_avatar.Location = new Point(180, 154);
            ptb_avatar.Name = "ptb_avatar";
            ptb_avatar.Size = new Size(90, 90);
            ptb_avatar.SizeMode = PictureBoxSizeMode.Zoom;
            ptb_avatar.TabIndex = 2;
            ptb_avatar.TabStop = false;
            // 
            // lb_name
            // 
            lb_name.AutoSize = true;
            lb_name.Font = new Font("Arial", 12F, FontStyle.Bold, GraphicsUnit.Point);
            lb_name.Location = new Point(185, 255);
            lb_name.Name = "lb_name";
            lb_name.Size = new Size(186, 24);
            lb_name.TabIndex = 3;
            lb_name.Text = "ABCDEFFFFFFFFF";
            lb_name.TextAlign = ContentAlignment.MiddleCenter;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Arial", 10.8F, FontStyle.Bold, GraphicsUnit.Point);
            label2.ForeColor = SystemColors.ControlDarkDark;
            label2.Location = new Point(12, 285);
            label2.Name = "label2";
            label2.Size = new Size(149, 21);
            label2.TabIndex = 4;
            label2.Text = "Personal Profile";
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Font = new Font("Arial", 9F, FontStyle.Bold, GraphicsUnit.Point);
            label4.ForeColor = SystemColors.ButtonShadow;
            label4.Location = new Point(12, 336);
            label4.Name = "label4";
            label4.Size = new Size(116, 18);
            label4.TabIndex = 6;
            label4.Text = "Phone number ";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Arial", 9F, FontStyle.Bold, GraphicsUnit.Point);
            label3.ForeColor = SystemColors.ButtonShadow;
            label3.Location = new Point(12, 372);
            label3.Name = "label3";
            label3.Size = new Size(66, 18);
            label3.TabIndex = 7;
            label3.Text = "Gender ";
            // 
            // label5
            // 
            label5.AutoSize = true;
            label5.Font = new Font("Arial", 9F, FontStyle.Bold, GraphicsUnit.Point);
            label5.ForeColor = SystemColors.ButtonShadow;
            label5.Location = new Point(12, 409);
            label5.Name = "label5";
            label5.Size = new Size(67, 18);
            label5.TabIndex = 8;
            label5.Text = "Birthday";
            // 
            // panel_editProfile
            // 
            panel_editProfile.BackColor = Color.FromArgb(234, 237, 240);
            panel_editProfile.Controls.Add(label9);
            panel_editProfile.Controls.Add(pictureBox3);
            panel_editProfile.Location = new Point(50, 530);
            panel_editProfile.Name = "panel_editProfile";
            panel_editProfile.Size = new Size(343, 48);
            panel_editProfile.TabIndex = 12;
            panel_editProfile.Click += panel_editProfile_Click;
            panel_editProfile.MouseEnter += panel_editProfile_MouseEnter;
            panel_editProfile.MouseLeave += panel_editProfile_MouseLeave;
            // 
            // label9
            // 
            label9.AutoSize = true;
            label9.Enabled = false;
            label9.Font = new Font("Arial", 13.8F, FontStyle.Bold, GraphicsUnit.Point);
            label9.ForeColor = SystemColors.WindowFrame;
            label9.Location = new Point(114, 11);
            label9.Name = "label9";
            label9.Size = new Size(134, 27);
            label9.TabIndex = 14;
            label9.Text = "Edit profile";
            // 
            // pictureBox3
            // 
            pictureBox3.BackColor = Color.FromArgb(234, 237, 240);
            pictureBox3.Enabled = false;
            pictureBox3.ImageLocation = "https://cdn-icons-png.flaticon.com/128/10573/10573603.png";
            pictureBox3.Location = new Point(71, 7);
            pictureBox3.Name = "pictureBox3";
            pictureBox3.Size = new Size(35, 35);
            pictureBox3.SizeMode = PictureBoxSizeMode.Zoom;
            pictureBox3.TabIndex = 13;
            pictureBox3.TabStop = false;
            // 
            // ptb_camera
            // 
            ptb_camera.BackColor = SystemColors.ControlLight;
            ptb_camera.ImageLocation = "https://cdn-icons-png.flaticon.com/512/2956/2956744.png";
            ptb_camera.Location = new Point(249, 223);
            ptb_camera.Name = "ptb_camera";
            ptb_camera.Size = new Size(30, 30);
            ptb_camera.SizeMode = PictureBoxSizeMode.Zoom;
            ptb_camera.TabIndex = 13;
            ptb_camera.TabStop = false;
            // 
            // lb_phoneNumber
            // 
            lb_phoneNumber.AutoSize = true;
            lb_phoneNumber.Font = new Font("Arial", 10.2F, FontStyle.Bold, GraphicsUnit.Point);
            lb_phoneNumber.ForeColor = Color.FromArgb(64, 64, 64);
            lb_phoneNumber.Location = new Point(215, 336);
            lb_phoneNumber.Name = "lb_phoneNumber";
            lb_phoneNumber.Size = new Size(99, 19);
            lb_phoneNumber.TabIndex = 9;
            lb_phoneNumber.Text = "0123456789";
            // 
            // lb_Gender
            // 
            lb_Gender.AutoSize = true;
            lb_Gender.Font = new Font("Arial", 10.2F, FontStyle.Bold, GraphicsUnit.Point);
            lb_Gender.ForeColor = Color.FromArgb(64, 64, 64);
            lb_Gender.Location = new Point(215, 372);
            lb_Gender.Name = "lb_Gender";
            lb_Gender.Size = new Size(44, 19);
            lb_Gender.TabIndex = 10;
            lb_Gender.Text = "Male";
            // 
            // lb_birthday
            // 
            lb_birthday.AutoSize = true;
            lb_birthday.Font = new Font("Arial", 10.2F, FontStyle.Bold, GraphicsUnit.Point);
            lb_birthday.ForeColor = Color.FromArgb(64, 64, 64);
            lb_birthday.Location = new Point(215, 409);
            lb_birthday.Name = "lb_birthday";
            lb_birthday.Size = new Size(91, 19);
            lb_birthday.TabIndex = 11;
            lb_birthday.Text = "12/12/2012";
            // 
            // frmProfile
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.White;
            ClientSize = new Size(450, 600);
            ControlBox = false;
            Controls.Add(ptb_camera);
            Controls.Add(panel_editProfile);
            Controls.Add(lb_birthday);
            Controls.Add(lb_Gender);
            Controls.Add(lb_phoneNumber);
            Controls.Add(label5);
            Controls.Add(label3);
            Controls.Add(label4);
            Controls.Add(label2);
            Controls.Add(lb_name);
            Controls.Add(ptb_avatar);
            Controls.Add(ptb_background);
            Controls.Add(panel_tab);
            FormBorderStyle = FormBorderStyle.None;
            MaximizeBox = false;
            MinimizeBox = false;
            Name = "frmProfile";
            StartPosition = FormStartPosition.CenterParent;
            Text = "frmProfile";
            Load += frmProfile_Load;
            panel_tab.ResumeLayout(false);
            panel_exit.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)pictureBox4).EndInit();
            ((System.ComponentModel.ISupportInitialize)ptb_background).EndInit();
            ((System.ComponentModel.ISupportInitialize)ptb_avatar).EndInit();
            panel_editProfile.ResumeLayout(false);
            panel_editProfile.PerformLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox3).EndInit();
            ((System.ComponentModel.ISupportInitialize)ptb_camera).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Panel panel_tab;
        private PictureBox ptb_background;
        private PictureBox ptb_avatar;
        private Label lb_name;
        private Label label2;
        private Label label4;
        private Label label3;
        private Label label5;
        private Panel panel_editProfile;
        private PictureBox pictureBox3;
        private Label label9;
        private Panel panel_exit;
        private PictureBox pictureBox4;
        private PictureBox ptb_camera;
        private Label lb_phoneNumber;
        private Label lb_Gender;
        private Label lb_birthday;
    }
}