using MediatR;
using Microsoft.AspNetCore.Mvc;
using PostService.Application.Interactions.Commands;
using PostService.Application.Interactions.Queries;
using PostService.Application.Posts.Commands;
using PostService.Application.Posts.Queries;
using PostService.Domain.DTOs;

namespace PostService.API.Controllers;

[Route("api/post")]
[ApiController]
public class PostsController : BaseApiController
{
    public PostsController(ISender sender, IHttpContextAccessor httpContextAccessor) : base(sender, httpContextAccessor)
    {
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreatePostDTO createPostDTO)
    {
        await _sender.Send(new CreatePostCommand
        {
            Content = createPostDTO.content,
            UserId = createPostDTO.userId
        });

        return Ok();
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id) 
    {
        var post = await _sender.Send(new GetPostByIdQuery
        {
            Id = id
        });

        return Ok(post);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var posts = await _sender.Send(new GetAllPostsQuery());

        return Ok(posts);
    }

    [HttpGet("user")]
    public async Task<IActionResult> GetByUserId([FromQuery]Guid userId)
    {
        var post = await _sender.Send(new GetPostsByUserIdQuery
        {
            UserId = userId
        });

        return Ok(post);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody]UpdatePostDTO updatePostDTO)
    {
        await _sender.Send(new UpdatePostCommand
        {
            PostId = updatePostDTO.Id,
            Content = updatePostDTO.Content
        });

        return Ok();
    }

    [HttpPost]
    [Route("post-interaction")]
    public async Task<IActionResult> CreateInteraction([FromBody] CreatePostInteractionDTO createPostInteractionDTO)
    {
        await _sender.Send(new CreatePostInteractionCommand
        {
            PostId = createPostInteractionDTO.PostId,
            InteractionId = createPostInteractionDTO.InteractionId,
            UserId = createPostInteractionDTO.UserId
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
