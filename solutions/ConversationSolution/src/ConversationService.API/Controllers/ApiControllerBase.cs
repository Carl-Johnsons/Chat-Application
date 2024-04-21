using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ConversationService.API.Controllers;

public class ApiControllerBase : ControllerBase
{
    protected readonly ISender _sender;

    public ApiControllerBase(ISender sender)
    {
        _sender = sender;
    }
}
