using Newtonsoft.Json;
using PostService.Domain.Entities;

namespace PostService.Domain.DTOs;

/* ===================== Metadata  ===================== */

public class PostListMetadata
{
}

public class EmptyMetadata
{
}

/* ===================== DTO  ===================== */

public class PaginatedPostListDTO : BasePaginatedDTO
{
}

public class PaginatedCommentListDTO : BasePaginatedDTO
{
    [JsonProperty("postId")]
    public Guid PostId { get; set; }
}

/* ===================== Response  ===================== */

public class PaginatedPostListResponseDTO : BasePaginatedResponse<PostDTO, PostListMetadata>;
public class PaginatedCommentListResponseDTO : BasePaginatedResponse<Comment, EmptyMetadata>;


