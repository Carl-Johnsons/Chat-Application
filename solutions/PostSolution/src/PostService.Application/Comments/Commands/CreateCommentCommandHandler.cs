﻿using MediatR;
using PostService.Domain.Common;
using PostService.Domain.Errors;

namespace PostService.Application.Comments.Commands;

public class CreateCommentCommand : IRequest<Result>
{
    public string Content { get; init; } = null!;
    public Guid UserId { get; init; }

    public Guid PostId { get; init; }
}

public class CreateCommentCommandHandler : IRequestHandler<CreateCommentCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;

    public CreateCommentCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork)
    {
        _context = context;
        _unitOfWork = unitOfWork;
    }

    public async Task<Result> Handle(CreateCommentCommand request, CancellationToken cancellationToken)
    {

        var post = _context.Posts
                    .Where(p => p.Id == request.PostId)
                    .SingleOrDefault();

        if (post == null)
        {
            return Result.Failure(PostError.NotFound);
        }

        Comment comment = new Comment
        {
            Content = request.Content,
            UserId = request.UserId
        };

        _context.Comments.Add(comment);


        PostComment postCommment = new PostComment
        {
            PostId = request.PostId,
            CommentId = comment.Id
        };

        _context.PostComments.Add(postCommment);

        await _unitOfWork.SaveChangeAsync();

        return Result.Success();
    }
}
