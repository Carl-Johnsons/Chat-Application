﻿using MassTransit;

namespace UploadFileService.Domain.Interfaces;
public interface IServiceBus
{
    Task Publish<T>(T eventMessage) where T : class;
    IRequestClient<TRequest> CreateRequestClient<TRequest>() where TRequest : class;
}
