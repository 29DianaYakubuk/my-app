import { useEffect, useState } from "react";
import { Pagination, PostCard } from "./components";
import { useServerRequest } from "../../hooks/use-server-request";
import { PAGINATION_LIMIT} from "../../bff/constants/pagination-limit";
import { getLastPageFromLinks } from "./utils/get-last-page-from-links";
import styled from "styled-components"; 

const MainContainer = ({className}) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const requestServer = useServerRequest();

   useEffect(() => {
       const fetchData = async () => {
           try {
               const response = await requestServer(
                   'fetchPosts',
                   page,
                   PAGINATION_LIMIT,
               );

               const posts = response?.res?.posts || [];
               const links = response?.res?.links || '';

               console.log('Загруженные посты:', posts);
               console.log('Сырые links:', links);

               setPosts(posts);
               setLastPage(getLastPageFromLinks(links));
           } catch (error) {
               console.error('Ошибка при загрузке постов:', error);
               setPosts([]);
               setLastPage(1);
           }
       };

       fetchData();
   }, [requestServer, page]);

    return (
        <div className={className}>
            <div className="post-list">
                {Array.isArray(posts) &&
                    posts.map(
                        ({
                            id,
                            title,
                            imageUrl,
                            publishedAt,
                            commentsCount,
                        }) => (
                            <PostCard
                                key={id}
                                id={id}
                                title={title}
                                imageUrl={imageUrl}
                                publishedAt={publishedAt}
                                commentsCount={commentsCount}
                            />
                        ),
                    )}
            </div>
            <Pagination page={page} lastPage={lastPage} setPage={setPage} />
        </div>
    );
};

export const Main = styled(MainContainer)`
    & .post-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px;
    }
  
`;
