import {useMemo, useEffect, useState } from "react";
import { Pagination, PostCard, Search } from "./components";
import { useServerRequest } from "../../hooks/use-server-request";
import { PAGINATION_LIMIT} from "../../bff/constants/pagination-limit";
import { debounce, getLastPageFromLinks } from "./utils";
import styled from "styled-components"; 

const MainContainer = ({className}) => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [searchPhrase, setSearchPhrase] = useState('');
    const [shouldSearch, setShouldSearch] = useState(false); // Placeholder for search functionality
    const requestServer = useServerRequest();

   useEffect(() => {
    requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
        ({res:{posts,links}}) => {
            setPosts(posts);
            setLastPage(getLastPageFromLinks(links));
        },
    );

   }, [requestServer, page, shouldSearch, searchPhrase]);

   const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

   const onSearch = ({target}) => {
    setSearchPhrase(target.value); 
    startDelayedSearch(!shouldSearch);
   };

    return (
        <div className={className}>
            <div className="posts-and-search">
                <Search searchPhrase={searchPhrase} onChange={onSearch} />
                {posts.length > 0 ? (
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
                ) : (
                    <div className="no-posts-found">No posts found</div>
                )}
            </div>
            {lastPage > 1 && posts.length > 0 && (
                <Pagination page={page} lastPage={lastPage} setPage={setPage}/>
            )}
        </div>
    );
};


export const Main = styled(MainContainer)`

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .post-list {
        display: flex;
        flex-wrap: wrap;
        padding: 20px 20px 80px;
    }
    & .no-posts-found {
        text-align: center;
        margin-top: 40px;
        font-size: 18px;
        color: #666;
    }
  
`;
