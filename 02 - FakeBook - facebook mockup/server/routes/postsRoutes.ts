import express from 'express';
const router = express.Router();

import {getPostsList, createNewPost, searchPosts, getOthersPostsList,deletePost} from '../controller/postCont'


router
.get('/get-posts-list', getPostsList)
.post('/get-others-posts-list', getOthersPostsList)
.post('/create-new-post', createNewPost)
.post('/delete-post', deletePost)
.post('/search-posts', searchPosts)

export default router;