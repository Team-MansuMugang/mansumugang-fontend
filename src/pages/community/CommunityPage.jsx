import React, { useEffect, useState } from 'react';
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

const CommunityPage = () => {
  const navigate = useNavigate();
  const [postSummary, setPostSummary] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState();
  const [totalPage, setTotalPage] = useState();

  useEffect(() => {
    if (postSummary.length === 0) loadFirstPostSummary();
  }, []);

  useEffect(() => {
    loadFirstPostSummary(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadMorePosts();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage, selectedCategory]);

  const loadFirstPostSummary = async (selectedCategory = '') => {
    const fetchedPostSummary = await fetchPostSummary({ category: selectedCategory, page: 1 });
    console.log(fetchedPostSummary);
    setPostSummary(fetchedPostSummary.posts);
    setCurrentPage(1);
    setTotalPage(fetchedPostSummary.totalPage);
  };

  const loadMorePosts = async () => {
    if (currentPage >= totalPage) return;

    const fetchedPostSummary = await fetchPostSummary({
      category: selectedCategory,
      page: currentPage + 1,
    });
    console.log(fetchedPostSummary);
    setPostSummary((prevPosts) => [...prevPosts, ...fetchedPostSummary.posts]);
    setCurrentPage(currentPage + 1);
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
      </div>
      <NavBar activeTab="커뮤니티" />
    </div>
  );
};

export default CommunityPage;
