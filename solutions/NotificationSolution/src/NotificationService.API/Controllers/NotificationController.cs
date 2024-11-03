using Microsoft.AspNetCore.Authorization;
using NotificationService.Application.Notifications.Queries;
using System.IdentityModel.Tokens.Jwt;

namespace NotificationService.API.Controllers;

[Route("api/notification")]
[ApiController]
[Authorize]
public partial class NotificationController : BaseApiController
{
    public NotificationController(
            ISender sender,
            IHttpContextAccessor httpContextAccessor
        ) : base(sender, httpContextAccessor)
    {
    }

    [HttpGet("all")]
    [AllowAnonymous]
    public async Task<IActionResult> GetAll()
    {
        var result = await _sender.Send(new GetAllNotificationQuery());
        result.ThrowIfFailure();
        return Ok(result.Value);
    }


    //[HttpGet("user")]
    //public async Task<IActionResult> GetConversationListByUserId()
    //{
    //    var claims = _httpContextAccessor.HttpContext?.User.Claims;
    //    var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

    //    var query = new GetConversationListByUserIdQuery
    //    {
    //        UserId = Guid.Parse(subjectId!)
    //    };
    //    var result = await _sender.Send(query);
    //    result.ThrowIfFailure();

    //    return Ok(result.Value);
    //}

}
