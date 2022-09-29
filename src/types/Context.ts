import { number, object } from 'zod'

export class PaginatedInputType {
  skip?: number

  take?: number

  query?: string
}

export const paginatedInputSchema = object({
  params: object({
    skip: number(),
    take: number(),
  }),
})

export class SuccessResponse {
  data: any
  count?: number
}
