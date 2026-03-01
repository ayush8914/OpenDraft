import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from 'hono/jwt'


const app = new Hono()


app.get("/",(c) => { 
  
  return c.text('hello')
});

app.post('/api/v1/signup',async (c)=>{

  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.ACC_PRISMA_URL,
  }).$extends(withAccelerate())

  const body =await c.req.json();

  const user = await prisma.user.findUnique({
    where : {
      email: body.email
    }
  })

  if(user){
    c.status(403)
    return c.json({error: 'User already exists with this email'})
  }
 const createUser = await prisma.user.create({
    data: {
      email: body.email,
      name: body.name,
      password: body.password
    },
    select : {
      id: true
    }
  })

  //@ts-ignore
  const token = await sign({id:createUser.id},c.env.JWT_SECRET)

  c.status(200)
  return c.json({
    msg : "Signup successful",
    token
  })
})

app.post('/api/v1/signin',async (c)=>{

  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.ACC_PRISMA_URL,
  }).$extends(withAccelerate())

  const body =await c.req.json();

  const user = await prisma.user.findUnique({
    where : {
      email: body.email
    }
  })

  if(!user){
    c.status(403)
    return c.json({
      error: 'User not found'
    })
  }

  if(user.password !== body.password){
    c.status(403)
    return c.json({
      error: 'Invalid password'
    })
  }

  //@ts-ignore
  const token = await sign({id:user.id},c.env.JWT_SECRET)

  c.status(200)
  return c.json({
    msg : "Signin successful",
    token
  })

})

app.post('/api/v1/blog', (c)=>{
  return c.text('blog')
})

app.put('/api/v1/blog', (c)=>{
  return c.text('blog')
})

app.get('/api/v1/blog/:id', (c)=>{
  return c.text('blog')
})


export default app