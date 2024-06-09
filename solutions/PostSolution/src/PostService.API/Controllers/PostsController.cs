using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostService.Application.Interactions.Commands;
using PostService.Application.Interactions.Queries;
using PostService.Application.Posts.Commands;
using PostService.Application.Posts.Queries;
using PostService.Application.Tags.Commands;
using PostService.Domain.DTOs;
using System.IdentityModel.Tokens.Jwt;

namespace PostService.API.Controllers;

[Route("api/post")]
[ApiController]
[Authorize]
public class PostsController : BaseApiController
{
    public PostsController(ISender sender, IHttpContextAccessor httpContextAccessor) : base(sender, httpContextAccessor)
    {
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePostDTO createPostDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var post = await _sender.Send(new CreatePostCommand
        {
            Content = createPostDTO.Content,
            UserId = Guid.Parse(subjectId!)
        });

        foreach (var t in createPostDTO.TagIds)
        {
            await _sender.Send(new CreatePostTagCommand
            {
                PostId = post.Id,
                TagId = t
            });
        }

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetById([FromQuery] Guid id)
    {
        var result = await _sender.Send(new GetPostByIdQuery
        {
            Id = id
        });
        result.ThrowIfFailure();
        return Ok(result.Value);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAll()
    {
        var posts = await _sender.Send(new GetAllPostsQuery());

        return Ok(posts);
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetByUserId([FromQuery] Guid userId)
    {
        var post = await _sender.Send(new GetPostsByUserIdQuery
        {
            UserId = userId
        });

        return Ok(post);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdatePostDTO updatePostDTO)
    {
        await _sender.Send(new UpdatePostCommand
        {
            PostId = updatePostDTO.Id,
            Content = updatePostDTO.Content
        });

        await Console.Out.WriteLineAsync(updatePostDTO.TagIds.ToString());

        await _sender.Send(new DeletePostTagCommand
        {
            PostId = updatePostDTO.Id
        });

        foreach (var t in updatePostDTO.TagIds)
        {
            await _sender.Send(new CreatePostTagCommand
            {
                PostId = updatePostDTO.Id,
                TagId = t
            });
        }

        return Ok();
    }

    [HttpPost]
    [Route("post-interaction")]
    public async Task<IActionResult> CreateInteraction([FromBody] CreatePostInteractionDTO createPostInteractionDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        await _sender.Send(new CreatePostInteractionCommand
        {
            PostId = createPostInteractionDTO.PostId,
            InteractionId = createPostInteractionDTO.InteractionId,
            UserId = Guid.Parse(subjectId!)
        });

        return Ok();
    }

    [HttpGet("post-interaction")]
    public async Task<IActionResult> GetInteraction([FromQuery] Guid id)
    {
        var interactions = await _sender.Send(new GetInteractionByPostIdQuery
        {
            PostId = id
        });

        return Ok(interactions);
    }
}
