import './SearchPage.css';
import ChevronLeft from '../../assets/svg/chevron-left.svg?react';
import Input from '../../components/Input';
import TagButton from '../../components/TagButton';
import AddedSearchItem from '../../components/AddedSearchItem';
import NavBar from '../../components/NavBar';

const SearchPage = () => {
  return (
    <>
      <NavBar></NavBar>
      <div className="search-page">
        <div className="search-header">
          <button>
            <ChevronLeft />
          </button>
          <Input placeholder="검색" />
        </div>

        <div className="section-recommendation">
          <h2>추천 검색어</h2>
          <div className="tag-buttons">
            <TagButton disabled={true}>전체</TagButton>
            <TagButton disabled={false}>치매</TagButton>
            <TagButton disabled={false}>고혈압</TagButton>
          </div>
        </div>

        <div className="section-recent">
          <h2>최근 검색어</h2>
          <AddedSearchItem search="치매" />
          <AddedSearchItem search="당뇨" />
          <AddedSearchItem search="고혈압" />
        </div>
      </div>
    </>
  );
};

export default SearchPage;
