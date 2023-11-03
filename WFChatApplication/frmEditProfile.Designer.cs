namespace WFChatApplication
{
    partial class frmEditProfile
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
            label2 = new Label();
            label3 = new Label();
            label5 = new Label();
            panel_update = new Panel();
            label_update = new Label();
            label1 = new Label();
            tbName = new TextBox();
            rdo_male = new RadioButton();
            rdo_femail = new RadioButton();
            dtpDoB = new DateTimePicker();
            panel1 = new Panel();
            label4 = new Label();
            gbGender = new GroupBox();
            panel_tab.SuspendLayout();
            panel_exit.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox4).BeginInit();
            ((System.ComponentModel.ISupportInitialize)ptb_background).BeginInit();
            ((System.ComponentModel.ISupportInitialize)ptb_avatar).BeginInit();
            panel_update.SuspendLayout();
            panel1.SuspendLayout();
            gbGender.SuspendLayout();
            SuspendLayout();
            // 
            // panel_tab
            // 
            panel_tab.BackColor = Color.White;
            panel_tab.Controls.Add(panel_exit);
            panel_tab.Dock = DockStyle.Top;
            panel_tab.Location = new Point(0, 0);
            panel_tab.Name = "panel_tab";
            panel_tab.Size = new Size(500, 50);
            panel_tab.TabIndex = 0;
            // 
            // panel_exit
            // 
            panel_exit.Controls.Add(pictureBox4);
            panel_exit.Dock = DockStyle.Right;
            panel_exit.Location = new Point(450, 0);
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
            ptb_background.Size = new Size(500, 150);
            ptb_background.SizeMode = PictureBoxSizeMode.StretchImage;
            ptb_background.TabIndex = 1;
            ptb_background.TabStop = false;
            ptb_background.Click += ptb_background_Click;
            // 
            // ptb_avatar
            // 
            ptb_avatar.ImageLocation = "https://i.pinimg.com/564x/01/48/0f/01480f29ce376005edcbec0b30cf367d.jpg";
            ptb_avatar.Location = new Point(205, 155);
            ptb_avatar.Name = "ptb_avatar";
            ptb_avatar.Size = new Size(90, 90);
            ptb_avatar.SizeMode = PictureBoxSizeMode.StretchImage;
            ptb_avatar.TabIndex = 2;
            ptb_avatar.TabStop = false;
            ptb_avatar.Click += ptb_avatar_Click;
            // 
            // label2
            // 
            label2.AutoSize = true;
            label2.Font = new Font("Arial", 10.8F, FontStyle.Bold, GraphicsUnit.Point);
            label2.ForeColor = SystemColors.ControlDarkDark;
            label2.Location = new Point(12, 366);
            label2.Name = "label2";
            label2.Size = new Size(149, 21);
            label2.TabIndex = 4;
            label2.Text = "Personal Profile";
            // 
            // label3
            // 
            label3.AutoSize = true;
            label3.Font = new Font("Arial", 9F, FontStyle.Bold, GraphicsUnit.Point);
            label3.ForeColor = SystemColors.ButtonShadow;
            label3.Location = new Point(16, 413);
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
            label5.Location = new Point(16, 508);
            label5.Name = "label5";
            label5.Size = new Size(67, 18);
            label5.TabIndex = 8;
            label5.Text = "Birthday";
            // 
            // panel_update
            // 
            panel_update.BackColor = Color.FromArgb(171, 205, 255);
            panel_update.Controls.Add(label_update);
            panel_update.Location = new Point(364, 586);
            panel_update.Name = "panel_update";
            panel_update.Size = new Size(113, 48);
            panel_update.TabIndex = 12;
            panel_update.Click += panel_update_Click;
            panel_update.MouseEnter += panel_editProfile_MouseEnter;
            panel_update.MouseLeave += panel_editProfile_MouseLeave;
            // 
            // label_update
            // 
            label_update.AutoSize = true;
            label_update.Enabled = false;
            label_update.Font = new Font("Arial", 13.8F, FontStyle.Bold, GraphicsUnit.Point);
            label_update.ForeColor = SystemColors.InactiveBorder;
            label_update.Location = new Point(12, 11);
            label_update.Name = "label_update";
            label_update.Size = new Size(91, 27);
            label_update.TabIndex = 14;
            label_update.Text = "Update";
            // 
            // label1
            // 
            label1.AutoSize = true;
            label1.Font = new Font("Arial", 10.8F, FontStyle.Regular, GraphicsUnit.Point);
            label1.ForeColor = SystemColors.ControlDarkDark;
            label1.Location = new Point(12, 254);
            label1.Name = "label1";
            label1.Size = new Size(118, 21);
            label1.TabIndex = 14;
            label1.Text = "Display name";
            // 
            // tbName
            // 
            tbName.Font = new Font("Arial", 13.8F, FontStyle.Regular, GraphicsUnit.Point);
            tbName.Location = new Point(12, 295);
            tbName.Name = "tbName";
            tbName.Size = new Size(465, 34);
            tbName.TabIndex = 15;
            // 
            // rdo_male
            // 
            rdo_male.AutoSize = true;
            rdo_male.Checked = true;
            rdo_male.Font = new Font("Arial", 10.8F, FontStyle.Bold, GraphicsUnit.Point);
            rdo_male.ForeColor = SystemColors.ControlDarkDark;
            rdo_male.Location = new Point(6, 26);
            rdo_male.Name = "rdo_male";
            rdo_male.Size = new Size(71, 25);
            rdo_male.TabIndex = 16;
            rdo_male.TabStop = true;
            rdo_male.Text = "Nam";
            rdo_male.UseVisualStyleBackColor = true;
            // 
            // rdo_femail
            // 
            rdo_femail.AutoSize = true;
            rdo_femail.Font = new Font("Arial", 10.8F, FontStyle.Bold, GraphicsUnit.Point);
            rdo_femail.ForeColor = SystemColors.ControlDarkDark;
            rdo_femail.Location = new Point(114, 26);
            rdo_femail.Name = "rdo_femail";
            rdo_femail.Size = new Size(57, 25);
            rdo_femail.TabIndex = 17;
            rdo_femail.TabStop = true;
            rdo_femail.Text = "Nữ";
            rdo_femail.UseVisualStyleBackColor = true;
            // 
            // dtpDoB
            // 
            dtpDoB.CalendarForeColor = SystemColors.ControlDarkDark;
            dtpDoB.Font = new Font("Arial", 10.8F, FontStyle.Regular, GraphicsUnit.Point);
            dtpDoB.Location = new Point(16, 537);
            dtpDoB.Name = "dtpDoB";
            dtpDoB.Size = new Size(260, 28);
            dtpDoB.TabIndex = 18;
            // 
            // panel1
            // 
            panel1.BackColor = Color.FromArgb(224, 224, 224);
            panel1.Controls.Add(label4);
            panel1.Location = new Point(229, 586);
            panel1.Name = "panel1";
            panel1.Size = new Size(113, 48);
            panel1.TabIndex = 19;
            panel1.Click += panel1_Click;
            // 
            // label4
            // 
            label4.AutoSize = true;
            label4.Enabled = false;
            label4.Font = new Font("Arial", 13.8F, FontStyle.Bold, GraphicsUnit.Point);
            label4.ForeColor = SystemColors.ControlDark;
            label4.Location = new Point(12, 11);
            label4.Name = "label4";
            label4.Size = new Size(90, 27);
            label4.TabIndex = 14;
            label4.Text = "Cancel";
            // 
            // gbGender
            // 
            gbGender.Controls.Add(rdo_male);
            gbGender.Controls.Add(rdo_femail);
            gbGender.Location = new Point(16, 429);
            gbGender.Name = "gbGender";
            gbGender.Size = new Size(247, 60);
            gbGender.TabIndex = 20;
            gbGender.TabStop = false;
            // 
            // frmEditProfile
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.White;
            ClientSize = new Size(500, 657);
            ControlBox = false;
            Controls.Add(gbGender);
            Controls.Add(panel1);
            Controls.Add(dtpDoB);
            Controls.Add(tbName);
            Controls.Add(label1);
            Controls.Add(panel_update);
            Controls.Add(label5);
            Controls.Add(label3);
            Controls.Add(label2);
            Controls.Add(ptb_avatar);
            Controls.Add(ptb_background);
            Controls.Add(panel_tab);
            FormBorderStyle = FormBorderStyle.None;
            MaximizeBox = false;
            MinimizeBox = false;
            Name = "frmEditProfile";
            StartPosition = FormStartPosition.CenterParent;
            Text = "frmProfile";
            Load += frmProfile_Load;
            panel_tab.ResumeLayout(false);
            panel_exit.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)pictureBox4).EndInit();
            ((System.ComponentModel.ISupportInitialize)ptb_background).EndInit();
            ((System.ComponentModel.ISupportInitialize)ptb_avatar).EndInit();
            panel_update.ResumeLayout(false);
            panel_update.PerformLayout();
            panel1.ResumeLayout(false);
            panel1.PerformLayout();
            gbGender.ResumeLayout(false);
            gbGender.PerformLayout();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Panel panel_tab;
        private PictureBox ptb_background;
        private PictureBox ptb_avatar;
        private Label label2;
        private Label label3;
        private Label label5;
        private Panel panel_update;
        private Label label_update;
        private Panel panel_exit;
        private PictureBox pictureBox4;
        private Label label1;
        private TextBox tbName;
        private RadioButton rdo_male;
        private RadioButton rdo_femail;
        private DateTimePicker dtpDoB;
        private Panel panel1;
        private Label label4;
        private GroupBox gbGender;
    }
}