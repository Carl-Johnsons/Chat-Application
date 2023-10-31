namespace WFChatApplication
{
    partial class frmLogin
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
            lbPhone = new Label();
            lbPassword = new Label();
            mtbPhone = new MaskedTextBox();
            tbPassword = new TextBox();
            lbLoginFail = new Label();
            btnLogin = new Button();
            panel_tab.SuspendLayout();
            panel_exit.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)pictureBox4).BeginInit();
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
            panel_exit.Click += panel_exit_MouseEnter;
            panel_exit.Click += panel_exit_Click;
            panel_exit.Paint += panel_exit_MouseLeave;
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
            // lbPhone
            // 
            lbPhone.AutoSize = true;
            lbPhone.Font = new Font("Arial", 13.8F, FontStyle.Regular, GraphicsUnit.Point);
            lbPhone.Location = new Point(34, 153);
            lbPhone.Name = "lbPhone";
            lbPhone.Size = new Size(163, 26);
            lbPhone.TabIndex = 1;
            lbPhone.Text = "Phone Number";
            // 
            // lbPassword
            // 
            lbPassword.AutoSize = true;
            lbPassword.Font = new Font("Arial", 13.8F, FontStyle.Regular, GraphicsUnit.Point);
            lbPassword.Location = new Point(85, 210);
            lbPassword.Name = "lbPassword";
            lbPassword.Size = new Size(112, 26);
            lbPassword.TabIndex = 2;
            lbPassword.Text = "Password";
            // 
            // mtbPhone
            // 
            mtbPhone.Font = new Font("Arial", 13.8F, FontStyle.Regular, GraphicsUnit.Point);
            mtbPhone.Location = new Point(209, 150);
            mtbPhone.Mask = "0000000000";
            mtbPhone.Name = "mtbPhone";
            mtbPhone.Size = new Size(190, 34);
            mtbPhone.TabIndex = 3;
            // 
            // tbPassword
            // 
            tbPassword.Font = new Font("Arial", 13.8F, FontStyle.Regular, GraphicsUnit.Point);
            tbPassword.Location = new Point(209, 210);
            tbPassword.Name = "tbPassword";
            tbPassword.PasswordChar = '*';
            tbPassword.Size = new Size(190, 34);
            tbPassword.TabIndex = 4;
            // 
            // lbLoginFail
            // 
            lbLoginFail.AutoSize = true;
            lbLoginFail.Font = new Font("Arial", 13.8F, FontStyle.Regular, GraphicsUnit.Point);
            lbLoginFail.ForeColor = Color.Red;
            lbLoginFail.Location = new Point(173, 314);
            lbLoginFail.Name = "lbLoginFail";
            lbLoginFail.Size = new Size(110, 26);
            lbLoginFail.TabIndex = 5;
            lbLoginFail.Text = "Login fail!";
            lbLoginFail.Visible = false;
            // 
            // btnLogin
            // 
            btnLogin.BackColor = SystemColors.ActiveCaption;
            btnLogin.Font = new Font("Arial", 13.8F, FontStyle.Regular, GraphicsUnit.Point);
            btnLogin.ForeColor = Color.White;
            btnLogin.Location = new Point(145, 460);
            btnLogin.Name = "btnLogin";
            btnLogin.Size = new Size(179, 65);
            btnLogin.TabIndex = 6;
            btnLogin.Text = "Login";
            btnLogin.UseVisualStyleBackColor = false;
            btnLogin.Click += btnLogin_Click;
            // 
            // frmLogin
            // 
            AutoScaleDimensions = new SizeF(8F, 20F);
            AutoScaleMode = AutoScaleMode.Font;
            BackColor = Color.White;
            ClientSize = new Size(450, 600);
            ControlBox = false;
            Controls.Add(btnLogin);
            Controls.Add(lbLoginFail);
            Controls.Add(tbPassword);
            Controls.Add(mtbPhone);
            Controls.Add(lbPassword);
            Controls.Add(lbPhone);
            Controls.Add(panel_tab);
            FormBorderStyle = FormBorderStyle.None;
            MaximizeBox = false;
            MinimizeBox = false;
            Name = "frmLogin";
            StartPosition = FormStartPosition.CenterScreen;
            Text = "frmProfile";
            panel_tab.ResumeLayout(false);
            panel_exit.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)pictureBox4).EndInit();
            ResumeLayout(false);
            PerformLayout();
        }

        #endregion

        private Panel panel_tab;
        private Panel panel_exit;
        private PictureBox pictureBox4;
        private Label lbPhone;
        private Label lbPassword;
        private MaskedTextBox mtbPhone;
        private TextBox tbPassword;
        private Label lbLoginFail;
        private Button btnLogin;
    }
}