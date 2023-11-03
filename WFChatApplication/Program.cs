using BussinessObject.Models;
using WFChatApplication.ApiServices;

namespace WFChatApplication
{
    internal static class Program
    {
        static ApplicationContext mainContext = new ApplicationContext();

        /// <summary>
        ///  The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            // To customize application configuration such as set high DPI settings or default font,
            // see https://aka.ms/applicationconfiguration.
            Application.SetHighDpiMode(HighDpiMode.SystemAware);
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            mainContext.MainForm = new frmLogin();
            Application.Run(mainContext);
        }
        public static void setMainForm(Form mainform) => mainContext.MainForm = mainform;
        public static void showMainForm() => mainContext.MainForm.Show();

    }
}