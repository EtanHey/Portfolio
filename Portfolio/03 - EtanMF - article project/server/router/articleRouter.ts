import express from 'express';
const router = express.Router();
import {
    createArticle,
    getArticles,
    updateArticle,
    deleteArticle
} from '../controller/articleCont';
router
    .post('/create', createArticle)
    .post('/get-articles', getArticles)
    .patch('/update-article', updateArticle)
    .delete('/delete-article', deleteArticle);
export default router;
