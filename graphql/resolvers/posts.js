const { AuthenticationError, UserInputError } = require('apollo-server-errors')
const Post = require('../../mongo/models/Post')
const { validateToken } = require('../utils/auth-validators')

module.exports = {
    Post:{
        commentCount: (parent, args, context, info)=> parent.comments.length,
        likeCount: (parent, args, context, info)=> parent.likes.length,
    },
    Query: {
        getPosts: async (parent, args, context, info)=> {
            try{
                const posts = await Post.find().sort({createdAt: -1})
                let populatedPosts = []
                for(let post of posts){
                    let populatedPost = await post.populate('user').populate({path: 'likes', populate: {path: 'user', model: 'User'}}).populate({path: 'comments', populate: {path: 'user', model: 'User'}}).execPopulate()
                    populatedPosts.push(populatedPost)
                } 
                return populatedPosts
            }catch(err){
                throw new Error(err)
            }
        },
        getPost: async(parent, args, context, info)=> {
            let {postId} = args
            try {
                const post = await Post.findById(postId)
                if(post) return await post.populate('user').populate({path: 'likes', populate: {path: 'user', model: 'User'}}).populate({path: 'comments', populate: {path: 'user', model: 'User'}}).execPopulate()
                else throw new Error(`Post ${postId} NOT FOUND`)
            } catch (error) {
                throw new Error(error)
            }
        }
    },
    Mutation: {
        createPost: async(parent, args, context, info)=> {
            let {body} = args
            if(!body || body.trim() == '') throw new UserInputError("Cannot submit an empty post.")

            const user = validateToken(context)
            const postToCreate = new Post({
              body,
              user: user.id,
              username: user.username,
              createdAt: new Date().toISOString(),
            }) 
            let newPost = await postToCreate.save()
            newPost = await newPost.populate('user').populate({path: 'likes', populate: {path: 'user', model: 'User'}}).populate({path: 'comments', populate: {path: 'user', model: 'User'}}).execPopulate()
            context.pubsub.publish('NEW_POST', {getNewPost: newPost})
            return newPost
        },
        deletePost: async(parent, args, context, info)=> {
            const user = validateToken(context)
            const post = await Post.findById(args.postId)

            if(!post) throw new UserInputError(`Could not find a post with the ID of ${args.postId}`)
            if(user.username != post.username) throw new AuthenticationError(`You are not authorized to delete post ${args.postId}`)
            await post.delete()
            return `Post ${args.postId} has been successfully deleted.`
        }
    },
    Subscription: {
        getNewPost: {
            subscribe: async (parent, args, context, info)=> context.pubsub.asyncIterator('NEW_POST')
        }
    }
}