import {useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import {ArticleInfoParams} from '../../AnimatedRoutes';

interface ArticleProps {
    article?: ArticleInfoParams;
}

function Article(props: ArticleProps) {
    const {article} = props;
    const params = useParams();
    const {articleId} = params;

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 2}}>
            <p>{article?.content}</p>
            Article {articleId}
        </motion.div>
    );
}

export default Article;
