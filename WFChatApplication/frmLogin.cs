using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using BussinessObject.Models;
using Microsoft.VisualBasic.ApplicationServices;
using WFChatApplication.ApiServices;
using User = BussinessObject.Models.User;

namespace WFChatApplication
{
    public partial class frmLogin : Form
    {
        public User CurrentUser { get; set; }

        public frmLogin()
        {
            InitializeComponent();
        }

        private void btnLogin_Click(object sender, EventArgs e)
        {
            string? Phone = mtbPhone.Text;
            string? Password = tbPassword.Text;
            if (Phone == null || Password == null)
            {
                lbLoginFail.Visible = true;
            }

            CurrentUser = Task.Run(async () => await ApiService.LoginAsync(Phone, Password)).Result;

            if (CurrentUser != null)
            {
                frmMain frmMain = new frmMain
                {
                    CurrentUser = CurrentUser
                };
                Program.setMainForm(frmMain);
                Program.showMainForm();
                this.Dispose();
            }
            else
            {
                lbLoginFail.Visible = true;

            }


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
    }
}
