using Contract.Event.UploadEvent.EventModel;
using MassTransit;

namespace Contract.Event.UploadEvent;

[EntityName("upload-multiple-file-event")]
public record UploadMultipleFileEvent
{
    public IEnumerable<FileStreamEvent> FileStreamEvents { get; set; } = null!;
}
