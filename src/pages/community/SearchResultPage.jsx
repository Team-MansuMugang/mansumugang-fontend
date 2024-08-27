import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './SearchResultPage.css';
import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import CommunityLargeItem from '../../components/CommunityLargeItem';
import fetchSearchedPostList from '../../apis/api/fetchSearchedPostList';
import { timeAgoByStr } from '../../utility/dates';
import postCategory from '../../const/postCategory';

const SearchResultPage = () => {
  const navigate = useNavigate();
  const { search } = useParams();
  const [postSummary, setPostSummary] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const observerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          console.log('Load more posts');
        }
      },
      { threshold: 1.0 }, // 모든 요소가 뷰포트에 들어왔을 때 감지
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (postSummary.length === 0) loadFirstPostSummary();
    console.log(search);
  }, []);

  const loadFirstPostSummary = async () => {
    try {
      const fetchedPostSummary = await fetchSearchedPostList(search, 1);
      console.log(fetchedPostSummary);
      setPostSummary(fetchedPostSummary.posts);
      setCurrentPage(1);
      setTotalPage(fetchedPostSummary.metaData.totalPage);
      console.log(fetchedPostSummary.metaData.totalPage);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          loadFirstPostSummary();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  const loadMorePosts = async () => {
    if (currentPage >= totalPage) return;

    try {
      const fetchedPostSummary = await fetchSearchedPostList(search, currentPage + 1);
      console.log(fetchedPostSummary);
      setPostSummary((prevPosts) => [...prevPosts, ...fetchedPostSummary.posts]);
      setCurrentPage(currentPage + 1);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          loadMorePosts();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  return (
    <>
      <div className="search-result-page">
        <MainHeader
          title={`${search} 검색 결과`}
          onClickLeft={() => {
            navigate('/home/community');
          }}
          isLeftButtonEnable={true}
        />
        <div className="community-items">
          {postSummary.map((post) => (
            <CommunityLargeItem
              key={post.id}
              title={post.title}
              summary={post.content}
              category={postCategory[post.categoryCode]}
              author={post.nickname}
              time={`${timeAgoByStr(post.createdAt)}`}
              onClick={() => {
                navigate(`/community/post/${post.id}`);
              }}
            />
          ))}
          <div ref={observerRef} style={{ height: '1px' }}></div>
        </div>
        <NavBar activeTab="커뮤니티" />
      </div>
    </>
  );
};

export default SearchResultPage;
