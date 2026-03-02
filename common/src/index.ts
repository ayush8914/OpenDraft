import z, { email } from 'zod'

export const signupInput = z.object({
    email : z.string().email(),
    name : z.string().optional(),
    password : z.string().min(6).max(32)
})

export type SignupInput = z.infer<typeof signupInput>

export const signinInput = z.object({
    email : z.string().email(),
    password : z.string().min(6).max(32)
})

export type SigninInput = z.infer<typeof signinInput>

export const blogInput = z.object({
    title : z.string(),
    content : z.string(),
    published : z.boolean().default(false)
})

export type BlogInput = z.infer<typeof blogInput>

export const blogUpdateInput = z.object({
    id : z.number(),
    title : z.string().optional(),
    content : z.string().optional(),
    published : z.boolean().optional()
})

export type BlogUpdateInput = z.infer<typeof blogUpdateInput>

export const blogIdInput = z.object({
    id : z.number()
})

export type BlogIdInput = z.infer<typeof blogIdInput>

