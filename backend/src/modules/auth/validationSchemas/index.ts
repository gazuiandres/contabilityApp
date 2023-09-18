import { z } from 'zod';

export const credentialsSchema = z.object({
    body: z.object({
        email: z.string().nonempty(),
        password: z.string().nonempty(),
    })
})

