import { convexQuery } from "@convex-dev/react-query"
import { api } from "@convex/_generated/api"
import { queryOptions } from "@tanstack/react-query"

export const getContents = async (contentIds: string[]) => {
  return queryOptions({
    ...convexQuery(api.features.content.queries.getContentsByIds, { ids: contentIds }),
  })
}
