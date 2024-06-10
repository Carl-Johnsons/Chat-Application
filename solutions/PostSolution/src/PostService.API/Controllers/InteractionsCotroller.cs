﻿using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostService.Application.Interactions.Commands;
using PostService.Application.Interactions.Queries;
using PostService.Domain.DTOs;

namespace PostService.API.Controllers;

[Route("api/post/interaction")]
[ApiController]
[Authorize]
public class InteractionsCotroller : BaseApiController
{
    public InteractionsCotroller(ISender sender, IHttpContextAccessor httpContextAccessor) : base(sender, httpContextAccessor)
    {
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateInteractionDTO createInteractionDTO)
    {
        await _sender.Send(new CreateInteractionCommand
        {
            Value = createInteractionDTO.Value
        });

        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete([FromBody] DeleteInteractionDTO deleteInteractionDTO)
    {
        await _sender.Send(new DeleteInteractionCommand
        {
            Id = deleteInteractionDTO.Id
        });

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var post = await _sender.Send(new GetAllInteractionsQuery());

        return Ok(post);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateInteractionDTO updateInteractionDTO)
    {
        await _sender.Send(new UpdateInteractionCommand
        {
            Id = updateInteractionDTO.Id,
            Value = updateInteractionDTO.Value
        });

        return Ok();
    }
}
