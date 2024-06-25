using Newtonsoft.Json;

namespace DuendeIdentityServer.DTOs;

/* ===================== Metadata  ===================== */

public class EmptyMetadata { }

/* ===================== DTO  ===================== */

public class PaginatedUserListDTO : BasePaginatedDTO { }


/* ===================== Response  ===================== */

public class PaginatedUserListResponseDTO : BasePaginatedResponse<ApplicationUserResponseDTO, EmptyMetadata> { }