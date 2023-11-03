using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using BussinessObject;
using BussinessObject.Models;
using WFChatApplication.ApiServices;

namespace WFChatApplication
{
    public partial class frmEditProfile : Form
    {
        public User UserInfo { get; set; }
        public frmEditProfile()
        {
            InitializeComponent();
        }
        private void frmProfile_Load(object sender, EventArgs e)
        {
            //lb_name.Location = new Point(Width / 2 - lb_name.Width / 2, 255);
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, ptb_avatar.Width, ptb_avatar.Height);
            Region rg = new Region(gp);
            ptb_avatar.Region = rg;



            tbName.Text = UserInfo.Name;

            ptb_avatar.ImageLocation = UserInfo.AvatarUrl;
            ptb_background.ImageLocation = UserInfo.BackgroundUrl;

            rdo_male.Checked = (UserInfo.Gender == "Nam");
            rdo_femail.Checked = (UserInfo.Gender == "Nữ");

            dtpDoB.Value = UserInfo.Dob;
        }

        private void panel_exit_MouseEnter(object sender, EventArgs e)
        {
            panel_exit.BackColor = Color.FromArgb(234, 237, 240);
            pictureBox4.BackColor = Color.FromArgb(234, 237, 240);
        }

        private void panel_exit_MouseLeave(object sender, EventArgs e)
        {
            panel_exit.BackColor = Color.White;
            pictureBox4.BackColor = Color.White;

        }

        private void panel_exit_Click(object sender, EventArgs e)
        {
            this.Close();
        }

        private void panel_editProfile_MouseEnter(object sender, EventArgs e)
        {
            panel_update.BackColor = Color.FromArgb(223, 226, 231, 255);
            //pictureBox3.BackColor = Color.FromArgb(223, 226, 231, 255);
        }

        private void panel_editProfile_MouseLeave(object sender, EventArgs e)
        {
            panel_update.BackColor = Color.FromArgb(234, 237, 240, 255);
            //pictureBox3.BackColor = Color.FromArgb(234, 237, 240, 255);
        }

        private async void panel_update_Click(object sender, EventArgs e)
        {
            User UserUpdate = GetUpdateInfo();
            await ApiService.UpdateUserAsync(UserUpdate.UserId, UserUpdate);
            this.Close();
        }

        private User GetUpdateInfo()
        {
            User user = UserInfo;
            user.Name = tbName.Text;
            user.Dob = dtpDoB.Value;
            user.Gender = (rdo_male.Checked ? "Nam" : "Nữ");
            return user;
        }

        private async void ptb_avatar_Click(object sender, EventArgs e)
        {
            OpenFileDialog openSelectImage = new OpenFileDialog();

            openSelectImage.InitialDirectory = "c:\\";
            openSelectImage.Filter = "Image Files|*.jpg;*.jpeg;*.png;*.gif;*.bmp";
            openSelectImage.FilterIndex = 1;
            openSelectImage.RestoreDirectory = true;

            if (openSelectImage.ShowDialog() == DialogResult.OK)
            {
                string filePath = openSelectImage.FileName;
                string NewAvtUrl = await ApiService.UploadImageToImgur(filePath);
                UserInfo.AvatarUrl = NewAvtUrl;
                ptb_avatar.ImageLocation = UserInfo.AvatarUrl;
            }
        }

        private async void ptb_background_Click(object sender, EventArgs e)
        {
            OpenFileDialog openSelectImage = new OpenFileDialog();

            openSelectImage.InitialDirectory = "c:\\";
            openSelectImage.Filter = "Image Files|*.jpg;*.jpeg;*.png;*.gif;*.bmp";
            openSelectImage.FilterIndex = 1;
            openSelectImage.RestoreDirectory = true;

            if (openSelectImage.ShowDialog() == DialogResult.OK)
            {
                string filePath = openSelectImage.FileName;
                string NewBackUrl = await ApiService.UploadImageToImgur(filePath);
                UserInfo.BackgroundUrl = NewBackUrl;
                ptb_background.ImageLocation = UserInfo.BackgroundUrl;
            }
        }

        private void panel1_Click(object sender, EventArgs e)
        {
            this.Close();
        }
    }

}

