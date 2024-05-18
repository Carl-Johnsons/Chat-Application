﻿using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace ConversationService.API.Controllers;

public class ApiControllerBase : ControllerBase
{
    protected readonly ISender _sender;
    protected readonly IHttpContextAccessor _httpContextAccessor;

    public ApiControllerBase(ISender sender, IHttpContextAccessor httpContextAccessor)
    {
        _sender = sender;
        _httpContextAccessor = httpContextAccessor;
    }
}
