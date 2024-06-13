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

        var result = await _sender.Send(new CreatePostTagCommand());

        foreach (var t in createPostDTO.TagIds)
        {
            result = await _sender.Send(new CreatePostTagCommand
            {
                PostId = post.Value.Id,
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

        posts.ThrowIfFailure();
        return Ok(posts.Value);
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetByUserId([FromQuery] Guid userId)
    {
        var posts = await _sender.Send(new GetPostsByUserIdQuery
        {
            UserId = userId
        });

        posts.ThrowIfFailure();
        return Ok(posts.Value);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdatePostDTO updatePostDTO)
    {
        var result = await _sender.Send(new UpdatePostCommand
        {
            PostId = updatePostDTO.Id,
            Content = updatePostDTO.Content,
            Active = updatePostDTO.Active
        });

        result.ThrowIfFailure();

        if (result.IsSuccess)
        {
            await _sender.Send(new DeletePostTagCommand
            {
                PostId = updatePostDTO.Id
            });

            foreach (var t in updatePostDTO.TagIds)
            {
                var postTag = await _sender.Send(new CreatePostTagCommand
                {
                    PostId = updatePostDTO.Id,
                    TagId = t
                });

                postTag.ThrowIfFailure();
            }
        }

        return Ok();
    }

    [HttpPost]
    [Route("post-interaction")]
    public async Task<IActionResult> CreateInteraction([FromBody] CreatePostInteractionDTO createPostInteractionDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var result = await _sender.Send(new CreatePostInteractionCommand
        {
            PostId = createPostInteractionDTO.PostId,
            InteractionId = createPostInteractionDTO.InteractionId,
            UserId = Guid.Parse(subjectId!)
        });

        result.ThrowIfFailure();

        return Ok();
    }

    [HttpGet("post-interaction")]
    public async Task<IActionResult> GetInteraction([FromQuery] Guid id)
    {
        var interactions = await _sender.Send(new GetInteractionByPostIdQuery
        {
            PostId = id
        });

        interactions.ThrowIfFailure();
        return Ok(interactions.Value);
    }

    [HttpPost("report-post")]
    public async Task<IActionResult> CreateReportPost([FromBody]CreatePostReport createPostReport)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var post = await _sender.Send(new CreatePostReportCommand
        {
            PostId = createPostReport.PostId,
            UserId = Guid.Parse(subjectId!),
            Reason = createPostReport.Reason
        });

        post.ThrowIfFailure();
        return Ok();
    }

    [HttpGet("all-post-report")]
    public async Task<IActionResult> GetAllReportPost()
    {
        var posts = await _sender.Send(new GetListReportPostQuery { });

        return Ok(posts.Value);
    }

    [HttpGet("post-report")]
    public async Task<IActionResult> GetReportPost([FromQuery] Guid id)
    {
        var post = await _sender.Send(new GetPostReportByPostIdCommand
        {
            PostId = id
        });

        return Ok(post.Value);
    }

    [HttpDelete("uninteraction")]
    public async Task<IActionResult> UninteractionPost([FromBody] UninteractionPostDTO uninteractionPostDTO)
    {
        var claims = _httpContextAccessor.HttpContext?.User.Claims;
        var subjectId = claims?.FirstOrDefault(claim => claim.Type == JwtRegisteredClaimNames.Sub)?.Value;

        var result = await _sender.Send(new UninteractionPostCommand
        {
            PostId = uninteractionPostDTO.PostId,
            UserId = Guid.Parse(subjectId!)
        });

        result.ThrowIfFailure();

        return Ok();
    }
}
