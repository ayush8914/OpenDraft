import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, jwt, sign, verify } from 'hono/jwt'


const app = new Hono()

app.use('/api/v1/blog/*', async (c, next) => {
  const token = c.req.header('Authorization')

  if(!token || !token.startsWith('Bearer ')){
    c.status(403)
    return c.json({error: 'Unauthorized'})
  }

  //@ts-ignore
  const response = await verify(token.split('Bearer ')[1],c.env.JWT_SECRET,'HS256')

  if(!response){
    c.status(401)
    return c.json({error: 'Unauthorized'})
  }

  c.set('jwtPayload',{userId : response.id})
  return next()
})

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
      email: body.email,
      password: body.password
    }
  })

  if(!user){
    c.status(403)
    return c.json({
      error: 'User not found.'
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

app.post('/api/v1/blog',async (c)=>{
  
     const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.ACC_PRISMA_URL,
  }).$extends(withAccelerate())

  const body =await c.req.json();
  //@ts-ignore
  const userId = c.get('jwtPayload').userId;
  console.log(userId);
  const createBlog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      published: body.published,
      authorId: userId
    },
    select : {
      id: true
    }
  })

  if(!createBlog){
    c.status(403)
    return c.json({
      error: 'Blog not created'
    })
  }

  c.status(200)
  return c.json({
    msg : "Blog created successfully",
    blog : createBlog
  })

})


app.put('/api/v1/blog',async (c)=>{

  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.ACC_PRISMA_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  //@ts-ignore
  const userID = c.get('jwtPayload').userId;
  const updateBlog = await prisma.post.update({
    where : {
      id : body.id,
      authorId : userID
    },
    data : {
      title : body.title,
      content : body.content,
      published : body.published
    }
  })

  if(!updateBlog){
    c.status(403)
    return c.json({
      error: 'Blog not updated'
    })
  }

  c.status(200)
  return c.json({
    msg : "Blog updated successfully",
    blog : updateBlog
  })
})

app.get('/api/v1/blog/:id',async (c)=>{

  const prisma = new PrismaClient({
    //@ts-ignore
    datasourceUrl: c.env.ACC_PRISMA_URL,
  }).$extends(withAccelerate())

  const blog = await prisma.post.findUnique({
    where : {
      id : Number(c.req.param('id'))
    }
  })

  if(!blog){
    c.status(403)
    return c.json({
      error: 'Blog not found'
    })
  }

  c.status(200)
  return c.json({
    msg : "Blog found successfully",
    blog
  })
})


export default app