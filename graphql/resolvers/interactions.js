const { UserInputError, ForbiddenError } = require('apollo-server-errors')
const Post = require('../../mongo/models/Post')
const { validateToken } = require('../utils/auth-validators')

module.exports = {
    Mutation: {
        createComment: async(parent, args, context, info)=>{
            let {body, postId} = args
            let commentingUser = validateToken(context)
            // make sure body isn't empty
            if(body.trim() == "") throw new UserInputError("Cannot post an empty comment")
            // find post to leave comment on
            const postToCommentOn = await Post.findById(postId)
            if(!postToCommentOn) throw new Error("Post not found")
            // create new comment and add it to the post's comments array
            const comment = {
                body, 
                username: commentingUser.username, 
                createdAt: new Date().toISOString(),
                user: commentingUser.id,
            }
            try{
                postToCommentOn.comments.unshift(comment)
                let postWithNewComment = await postToCommentOn.save()
                postWithNewComment = await postWithNewComment.populate('user').populate({path: 'likes', populate: {path: 'user', model: 'User'}}).populate({path: 'comments', populate: {path: 'user', model: 'User'}}).execPopulate()
            }catch(err){
                throw new Error(err)
            }
        },
        deleteComment: async(parent, args, context, info)=>{
            const {postId, commentId} = args
            const user = validateToken(context)
            
            const postWithComment = await Post.findById(postId)
            if(!postWithComment) throw new UserInputError(`Couldn't find a post with the ID ${postId}.`)
            
            const indexOfComment = postWithComment.comments.findIndex(cmt=> cmt.id == commentId)
            if(!postWithComment.comments[indexOfComment]) throw new UserInputError(`Couldn't find a comment with the ID ${commentId} on post ${postId}. Double check your IDs.`)

            if(postWithComment.comments[indexOfComment].username != user.username) throw new ForbiddenError("You are not authorized to delete this comment.")
            postWithComment.comments.splice(indexOfComment, 1)

            let postWithCommentRemoved = await postWithComment.save()
            postWithCommentRemoved = await postWithCommentRemoved.populate('user').populate({path: 'likes', populate: {path: 'user', model: 'User'}}).populate({path: 'comments', populate: {path: 'user', model: 'User'}}).execPopulate()
            return postWithCommentRemoved
        },
        likePost: async(parent, args, context, info)=>{
            const {postId} = args
            const user = validateToken(context)

            const post = await Post.findById(postId)
            if(!post) throw new UserInputError(`Couldn't find a post with the ID ${postId}.`)

            let isAlreadyLiked = await post.likes.find(like => like.username == user.username)
            if(isAlreadyLiked) post.likes = post.likes.filter(like=> like.username !== user.username)
            else post.likes.push({ username: user.username, createdAt: new Date().toISOString(), user: user.id })

            let postWithUpdatedLikes = await post.save()
            postWithUpdatedLikes = await postWithUpdatedLikes.populate('user').populate({path: 'likes', populate: {path: 'user', model: 'User'}}).populate({path: 'comments', populate: {path: 'user', model: 'User'}}).execPopulate()

            return postWithUpdatedLikes
        }
    }
}

// createComment(postId: ID!, body: String!): Post
// deleteComment(postId: ID!, commentId: ID!): Post
// likePost(postId: ID!): Post