import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchPage.css';
import ChevronLeftIcon from '../../assets/svg/chevron-left.svg?react';
import Input from '../../components/Input';
import CheckButton from '../../components/CheckButton';
import TagButton from '../../components/TagButton';
import SearchedItem from '../../components/SearchedItem';
import NavBar from '../../components/NavBar';
import fetchWhoAmI from '../../apis/api/fetchWhoAmI';

const SearchPage = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    // 유저 정보 가져오기
    const fetchUserInfo = async () => {
      try {
        const result = await fetchWhoAmI();
        const { nickname } = result;
        setUsername(nickname);

        // 페이지 로드 시 유저네임에 맞는 최근 검색어 불러오기
        const storedSearches = localStorage.getItem(`recentSearches_${nickname}`);
        if (storedSearches) {
          setRecentSearches(JSON.parse(storedSearches));
        }
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSearch = () => {
    if (input.trim() === '' || !username) return;

    const updatedSearches = [input, ...recentSearches.filter((search) => search !== input)];

    // 최근 검색어 10개로 제한
    if (updatedSearches.length > 10) {
      updatedSearches.pop();
    }

    setRecentSearches(updatedSearches);
    localStorage.setItem(`recentSearches_${username}`, JSON.stringify(updatedSearches));
    navigate(`/community/search-results/${input}`);
  };

  const handleDeleteSearch = (searchToDelete) => {
    const updatedSearches = recentSearches.filter((search) => search !== searchToDelete);
    setRecentSearches(updatedSearches);
    localStorage.setItem(`recentSearches_${username}`, JSON.stringify(updatedSearches));
  };

  const recommendedTags = ['당뇨', '고혈압', '저혈압', '치매', '암'];

  return (
    <div className="search-page">
      <div className="search-header">
        <button className="back-button" onClick={() => navigate(-1)}>
          <ChevronLeftIcon />
        </button>
        <Input placeholder="검색" value={input} onInput={(event) => setInput(event.target.value)} />
        <CheckButton onClick={handleSearch}>검색</CheckButton>
      </div>

      <h2>추천 검색어</h2>
      <div className="recommendations">
        {recommendedTags.map((tag) => (
          <TagButton key={tag} onClick={() => setInput(tag)}>
            {tag}
          </TagButton>
        ))}
      </div>

      <h2>최근 검색어</h2>
      <div className="history">
        {recentSearches.map((search, index) => (
          <SearchedItem
            key={index}
            onClick={() => setInput(search)}
            onDeleteClick={() => handleDeleteSearch(search)}
          >
            {search}
          </SearchedItem>
        ))}
      </div>

      <NavBar />
    </div>
  );
};

export default SearchPage;
