const { AuthenticationError } = require('apollo-server-errors')
const Post = require('../../mongo/models/Post')
const { validateToken } = require('../utils/auth-validators')

module.exports = {
    Query: {
        getPosts: async (parent, args, context, info)=> {
            try{
                const posts = await Post.find().sort({createdAt: -1})
                return posts
            }catch(err){
                throw new Error(err)
            }
        },
        getPost: async(parent, args, context, info)=> {
            let {postId} = args
            try {
                const post = await Post.findById(postId)
                if(post) return post
                else throw new Error(`Post ${postId} NOT FOUND`)
            } catch (error) {
                throw new Error(error)
            }
 
        }
    },
    Mutation: {
        createPost: async(parent, args, context, info)=> {
            let {body} = args
            const user = validateToken(context)
            const postToCreate = new Post({
              body,
              user: user.id,
              username: user.username,
              createdAt: new Date().toISOString(),
            }) 
            let newPost = await postToCreate.save()
            newPost = await newPost.populate('user').execPopulate()
            return newPost
        },
        deletePost: async(parent, args, context, info)=> {
            const user = validateToken(context)
            try{
                const post = await Post.findById(args.postId)

                if(!user.username === post.user.username) throw new AuthenticationError('Unauthorized')
    
                await post.delete()
            
                return `Post ${args.postId} has been successfully deleted.`
            }catch(err){
                throw new Error(err)
            }
            
        }
    }
}