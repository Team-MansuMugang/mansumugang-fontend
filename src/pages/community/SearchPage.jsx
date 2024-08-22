import './SearchPage.css';
import ChevronLeftIcon from '../../assets/svg/chevron-left.svg?react';
import Input from '../../components/Input';
import CheckButton from '../../components/CheckButton';
import TagButton from '../../components/TagButton';
import SearchedItem from '../../components/SearchedItem';
import NavBar from '../../components/NavBar';

const SearchPage = () => {
  return (
    <div className="search-page">
      <div className="search-header">
        <button className="back-button">
          <ChevronLeftIcon />
        </button>
        <Input placeholder="검색" />
        <CheckButton>검색</CheckButton>
      </div>

      <h2>추천 검색어</h2>
      <div className="recommendations">
        <TagButton>당뇨</TagButton>
        <TagButton>고혈압</TagButton>
        <TagButton>저혈압</TagButton>
        <TagButton>치매</TagButton>
        <TagButton>암</TagButton>
      </div>

      <h2>최근 검색어</h2>
      <div className="history">
        <SearchedItem>치매</SearchedItem>
        <SearchedItem>당뇨</SearchedItem>
        <SearchedItem>고혈압</SearchedItem>
      </div>

      <NavBar></NavBar>
    </div>
  );
};

export default SearchPage;
