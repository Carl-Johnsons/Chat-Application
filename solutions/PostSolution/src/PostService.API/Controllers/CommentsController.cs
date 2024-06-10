using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PostService.Application.Comments.Commands;
using PostService.Application.Comments.Queries;
using PostService.Domain.DTOs;

namespace PostService.API.Controllers;

[Route("/api/post/comment")]
[ApiController]
[Authorize]
public class CommentsController : BaseApiController
{
    public CommentsController(ISender sender, IHttpContextAccessor httpContextAccessor) : base(sender, httpContextAccessor)
    {
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCommentDTO createCommentDTO)
    {
        var comment = await _sender.Send(new CreateCommentCommand
        {
            Content = createCommentDTO.Content,
            UserId = createCommentDTO.UserId,
        });

        await _sender.Send(new CreatePostCommentCommand
        {
            PostId = createCommentDTO.PostId,
            CommentId = comment.Id
        });

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> GetByPostId([FromQuery]Guid postId)
    {
        var comments = await _sender.Send(new GetCommentByPostIdQuery
        {
            PostId = postId
        });

        return Ok(comments);
    }

    [HttpPut]
    public async Task<IActionResult> Update([FromBody] UpdateCommentDTO updateCommentDTO)
    {
        await _sender.Send(new UpdateCommetCommand
        {
            Id = updateCommentDTO.Id,
            Content = updateCommentDTO.Content
        });

        return Ok();
    }

}
