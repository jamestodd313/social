const Post = require('../mongo/models/Post')

const resolvers = {
    Query: {
        getPosts: async ()=> {
            try{
                const posts = await Post.find()
                return posts
            }catch(err){
                throw new Error(err)
            }
        }
    } 
}

module.exports = resolvers