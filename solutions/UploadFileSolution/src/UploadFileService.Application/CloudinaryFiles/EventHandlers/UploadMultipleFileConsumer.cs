using Contract.DTOs;
using Contract.Event.UploadEvent;
using MassTransit;
using MediatR;
using Microsoft.EntityFrameworkCore;
using UploadFileService.Application.CloudinaryFiles.Commands;
using UploadFileService.Domain.Entities;
using UploadFileService.Domain.Interfaces;

namespace UploadFileService.Application.CloudinaryFiles.EventHandlers;

public sealed class UploadMultipleFileConsumer : IConsumer<UploadMultipleFileEvent>
{
    private readonly ISender _sender;
    private readonly IApplicationDbContext _context;

    public UploadMultipleFileConsumer(ISender sender, IApplicationDbContext context)
    {
        _sender = sender;
        _context = context;
    }

    public async Task Consume(ConsumeContext<UploadMultipleFileEvent> context)
    {
        await Console.Out.WriteLineAsync("======================================");
        await Console.Out.WriteLineAsync("UploadFile-service consume the message-queue");
        var fileStreamEvent = context.Message.FileStreamEvents.ToList();
        var responseFiles = new List<CloudinaryFile>(fileStreamEvent.Count());
        var extensionCodes = new List<string>(fileStreamEvent.Count());

        await Console.Out.WriteLineAsync(fileStreamEvent.Count + "list" + fileStreamEvent.Count());
        for (int i = 0; i < fileStreamEvent.Count(); i++)
        {
            await Console.Out.WriteLineAsync(fileStreamEvent[i].FileName);
            await Console.Out.WriteLineAsync(fileStreamEvent[i].ContentType);
            await Console.Out.WriteLineAsync(fileStreamEvent[i].Stream.Length+"");
            await Console.Out.WriteLineAsync("**********************************************************");
            responseFiles.Add(new CloudinaryFile());
            extensionCodes.Add("");
        }
        await Console.Out.WriteLineAsync(responseFiles.Count + " list "+responseFiles.Count());

        //var tasks = new List<Task>();
        
        for (int i = 0; i < fileStreamEvent.Count(); i++)
        {
            //var task = Task.Run(async () =>
            //{
            //    var response = await _sender.Send(new CreateCloudinaryImageFileInByteCommand
            //    {
            //        FileName = fileStreamEvent[i].FileName,
            //        ContentType = fileStreamEvent[i].ContentType,
            //        Stream = fileStreamEvent[i].Stream,
            //    });
            //    responseFiles[i] = response!;
            //    extensionCodes[i] = _context.ExtensionTypes.Where(e => e.Id == response!.ExtensionTypeId).SingleOrDefault()!.Code;
            //    await Console.Out.WriteLineAsync(i+"");
            //});
            //tasks.Add(task);
           
                var response = await _sender.Send(new CreateCloudinaryImageFileInByteCommand
                {
                    FileName = fileStreamEvent[i].FileName,
                    ContentType = fileStreamEvent[i].ContentType,
                    Stream = fileStreamEvent[i].Stream,
                });
                responseFiles[i] = response!;
                extensionCodes[i] = (await _context.ExtensionTypes.Where(e => e.Id == response!.ExtensionTypeId).SingleOrDefaultAsync())!.Code;
          

        }
        //await Task.WhenAll(tasks);

        var result = new UploadMultipleFileEventResponseDTO();


        for (int i = 0; i < responseFiles.Count; i++)
        {
            var fileDTO = new UploadFileEventResponseDTO
            {
                Id = responseFiles[i].Id,
                Name = responseFiles[i].Name,
                Size = responseFiles[i].Size,
                Url = responseFiles[i].Url,
                ExtensionTypeCode = extensionCodes[i]
            };
            result.Files.ToList().Add(fileDTO);
        }



        for (int i = 0; i < responseFiles.Count; i++)
        {
            await Console.Out.WriteLineAsync("Result:"+i);
            await Console.Out.WriteLineAsync("id: "+ responseFiles[i].Id);
            await Console.Out.WriteLineAsync("name: " + responseFiles[i].Name);
            await Console.Out.WriteLineAsync("size: " + responseFiles[i].Size);
            await Console.Out.WriteLineAsync("url: " + responseFiles[i].Url);
            await Console.Out.WriteLineAsync("etCode: " + extensionCodes[i]);
           
        }

        await Console.Out.WriteLineAsync("UploadFile-service done the request");
        await Console.Out.WriteLineAsync("======================================");
        await context.RespondAsync(result);
    }
}