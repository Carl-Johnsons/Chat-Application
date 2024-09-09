﻿using Contract.Event.NotificationEvent;
using MediatR;
using PostService.Domain.Common;
using PostService.Domain.Errors;
using PostService.Domain.Interfaces;

namespace PostService.Application.Interactions.Commands;

public class CreatePostInteractionCommand : IRequest<Result>
{
    public Guid PostId { get; init; }
    public Guid InteractionId { get; init; }
    public Guid UserId { get; init; }
}

public class CreatePostInteractionCommandHandler : IRequestHandler<CreatePostInteractionCommand, Result>
{
    private readonly IApplicationDbContext _context;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IServiceBus _serviceBus;

    public CreatePostInteractionCommandHandler(IApplicationDbContext context, IUnitOfWork unitOfWork, IServiceBus serviceBus)
    {
        _context = context;
        _unitOfWork = unitOfWork;
        _serviceBus = serviceBus;
    }

    public async Task<Result> Handle(CreatePostInteractionCommand request, CancellationToken cancellationToken)
    {

        var post = _context.Posts
                    .Where(p => p.Id == request.PostId)
                    .FirstOrDefault();

        if (post == null)
        {
            return Result.Failure(PostError.NotFound);
        }

        var interact = _context.Interactions
                        .Where(i => i.Id == request.InteractionId)
                        .FirstOrDefault();

        if (interact == null)
        {
            return Result.Failure(InteractionError.NotFound);
        }

       var postInteraction = _context.PostInteracts
                            .Where(pi => pi.PostId == request.PostId && pi.UserId == request.UserId)
                            .FirstOrDefault();

        if (postInteraction != null)
        {
            return Result.Failure(PostError.AlreadyInteractedPost);
        }

        PostInteract postInteract = new PostInteract
        {
            PostId = request.PostId,
            InteractionId = request.InteractionId,
            UserId = request.UserId
        };

        _context.PostInteracts.Add(postInteract);
        await _unitOfWork.SaveChangeAsync();

        await _serviceBus.Publish<CreateNotificationEvent>(new CreateNotificationEvent
        {
            ActionCode = "POST_INTERACTION",
            ActorIds = [request.UserId],
            CategoryCode = "POST",
            Url = ""
        });

        return Result.Success();
    }
}
