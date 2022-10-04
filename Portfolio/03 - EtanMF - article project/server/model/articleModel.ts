import mongoose from 'mongoose';
const ArticleSchema = new mongoose.Schema({
    ownerId: String,
    firstName: String,
    lastName: String,
    position: String,
    workSpace: String,
    title: String,
    content: String,
});

const Article = mongoose.model(
    'articles',
    ArticleSchema
);
export default Article;
