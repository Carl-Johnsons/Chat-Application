using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace WebChatApplication.Filter
{
    public class Filter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext context)
        {

            var cookie = context.HttpContext.Request.Cookies["user"];
            if (cookie == null)
            {
                context.Result = new RedirectResult("/Log");
            }
            base.OnActionExecuting(context);
        }
    }
}
