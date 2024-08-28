import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CommunityPage.css';
import '../../index.css';
import MainHeader from '../../components/MainHeader';
import TagButton from '../../components/TagButton';
import NavBar from '../../components/NavBar';
import CommunityLargeItem from '../../components/CommunityLargeItem';
import SearchButton from '../../components/SearchButton';
import postCategory from '../../const/postCategory';
import fetchPostSummary from '../../apis/api/fetchPostSummary';
import { timeAgoByStr } from '../../utility/dates';
import renewRefreshToken from '../../apis/api/renewRefreshToken';
import { NotValidAccessTokenError, ExpiredAccessTokenError } from '../../apis/utility/errors';

const CommunityPage = () => {
  const navigate = useNavigate();
  const [postSummary, setPostSummary] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const observerRef = useRef(null);

  useEffect(() => {
    if (postSummary.length === 0) loadFirstPostSummary();
  }, []);

  useEffect(() => {
    loadFirstPostSummary(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePosts();
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
  }, [postSummary, selectedCategory]);

  const loadFirstPostSummary = async (selectedCategory = '') => {
    try {
      const fetchedPostSummary = await fetchPostSummary({ category: selectedCategory, page: 1 });
      setPostSummary(fetchedPostSummary.posts);
      setCurrentPage(1);
      setTotalPage(fetchedPostSummary.metaData.totalPage);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          loadFirstPostSummary(selectedCategory);
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
    }
  };

  const loadMorePosts = async () => {
    if (currentPage >= totalPage) return;

    try {
      const fetchedPostSummary = await fetchPostSummary({
        category: selectedCategory,
        page: currentPage + 1,
      });
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
    }
  };

  return (
    <div className="community-page">
      <MainHeader
        title="커뮤니티"
        isLeftButtonEnable={false}
        rightText="작성"
        onClickRight={() => {
          navigate('/community/new-post');
        }}
      />
      <div className="sub-header">
        <div className="community-tags">
          <TagButton selected={!selectedCategory} onClick={() => setSelectedCategory('')}>
            전체
          </TagButton>
          {Object.entries(postCategory).map(([key, value]) => (
            <TagButton
              key={key}
              selected={key === selectedCategory}
              onClick={() => setSelectedCategory(key)}
            >
              {value}
            </TagButton>
          ))}
        </div>
        <div className="gradation" />
        <SearchButton
          onClick={() => {
            navigate('/community/search');
          }}
        />
      </div>
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
  );
};

export default CommunityPage;
