﻿using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WFChatApplication
{
    public partial class frmProfile : Form
    {
        public frmProfile()
        {
            InitializeComponent();
        }




        private void frmProfile_Load(object sender, EventArgs e)
        {
            lb_name.Location = new Point(Width / 2 - lb_name.Width / 2, 255);
            GraphicsPath gp = new GraphicsPath();
            gp.AddEllipse(0, 0, ptb_avatar.Width, ptb_avatar.Height);
            Region rg = new Region(gp);
            ptb_avatar.Region = rg;

            GraphicsPath gp1 = new GraphicsPath();
            gp1.AddEllipse(0, 0, ptb_camera.Width, ptb_camera.Height);
            Region rg1 = new Region(gp1);
            ptb_camera.Region = rg1;
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
            panel_editProfile.BackColor = Color.FromArgb(223, 226, 231, 255);
            pictureBox3.BackColor = Color.FromArgb(223, 226, 231, 255);
        }

        private void panel_editProfile_MouseLeave(object sender, EventArgs e)
        {
            panel_editProfile.BackColor = Color.FromArgb(234, 237, 240, 255);
            pictureBox3.BackColor = Color.FromArgb(234, 237, 240, 255);
        }

        private void panel_editProfile_Click(object sender, EventArgs e)
        {

        }
    }
}