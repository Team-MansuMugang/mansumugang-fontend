import './CommunityPage.css';
import '../../index.css';
import MainHeader from '../../components/MainHeader';
import TagButton from '../../components/TagButton';
import NavBar from '../../components/NavBar';
import CommunityLargeItem from '../../components/CommunityLargeItem';
import SearchButton from '../../components/SearchButton';

const CommunityPage = () => {
  return (
    <div className="community-page">
      <MainHeader title="커뮤니티" isLeftButtonEnable={false} rightText="작성" />
      <div className="sub-header">
        <div className="community-tags">
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
        <div className="gradation" />
        <SearchButton />
      </div>
      <div className="community-items">
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          category={'기타 질병'}
          count={'7'}
        />
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          category={'기타 질병'}
          count={'7'}
        />
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          category={'기타 질병'}
          count={'7'}
        />
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={
            '다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!'
          }
          time={'25분'}
          category={'기타 질병'}
          count={'7'}
        />
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          category={'기타 질병'}
          count={'7234'}
        />
        <CommunityLargeItem
          title={'치매 어떻게 케어하시나요?'}
          summary={'다들 치매 어떻게 관리하시는지 정보좀 부탁드려요!!'}
          time={'25분'}
          category={'기타 질병'}
          count={'7'}
        />
      </div>
      <NavBar activeTab="커뮤니티" />
    </div>
  );
};

export default CommunityPage;
