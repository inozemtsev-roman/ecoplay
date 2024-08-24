import { z } from 'zod'

export const usernameSchema = z.object({
	username: z.string().min(5).max(32).regex(/^[a-zA-Z][0-9a-zA-Z_]+$/)
})