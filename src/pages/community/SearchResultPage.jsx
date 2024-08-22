import './SearchResultPage.css';
import MainHeader from '../../components/MainHeader';
import TagButton from '../../components/TagButton';
import NavBar from '../../components/NavBar';
import CommunityLargeItem from '../../components/CommunityLargeItem';
import SearchButton from '../../components/SearchButton';

const SearchResultPage = () => {
  return (
    <>
      <MainHeader title="'치매 예방법' 검색 결과" isLeftButtonEnable={true}></MainHeader>
      <NavBar activeTab="커뮤니티"></NavBar>
      <div className="search-result">
        <div className="search-result-tag-button">
          <SearchButton></SearchButton>
          <TagButton disabled={true}>전체</TagButton>
          <TagButton>인기글</TagButton>
          <TagButton>자유</TagButton>
          <TagButton>당뇨</TagButton>
          <TagButton>고혈압</TagButton>
          <TagButton>저혈압</TagButton>
          <TagButton>치매</TagButton>
          <TagButton>암</TagButton>
          <TagButton>기타 질병</TagButton>
          <TagButton>홍보</TagButton>
        </div>
      </div>
      <div className="search-result-item">
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          children={'기타 질병'}
          count={'7'}
        ></CommunityLargeItem>
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          children={'기타 질병'}
          count={'7'}
        ></CommunityLargeItem>
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          children={'기타 질병'}
          count={'7'}
        ></CommunityLargeItem>
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          children={'기타 질병'}
          count={'7'}
        ></CommunityLargeItem>
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          children={'기타 질병'}
          count={'7'}
        ></CommunityLargeItem>
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          children={'기타 질병'}
          count={'7'}
        ></CommunityLargeItem>
      </div>
    </>
  );
};

export default SearchResultPage;
