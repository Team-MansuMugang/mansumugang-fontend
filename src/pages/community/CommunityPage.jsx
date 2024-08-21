import MainHeader from '../../components/MainHeader';
import NavBar from '../../components/NavBar';
import MarginContainer from '../../components/MarginContainer';
import RowScrollContainer from '../../components/RowScrollContainer';
import TagButton from '../../components/TagButton';
import { MarginPostion, MarginSize } from '../../const/MarginType';
import CommunityLargeItem from '../../components/CommunityLargeItem';
import { useEffect, useState } from 'react';
import fetchPostList from '../../apis/api/fetchPostList';
import { useInView } from 'react-intersection-observer';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../../apis/utility/errors';
import { useNavigate } from 'react-router-dom';
import renewRefreshToken from '../../apis/api/renewRefreshToken';

const CommunityPage = () => {
  const navigate = useNavigate();

  const tagListContainerMargin = [
    { marginPostion: MarginPostion.TOP, marginSize: MarginSize.S10 },
    { marginPostion: MarginPostion.BOTTOM, marginSize: MarginSize.S10 },
    { marginPostion: MarginPostion.LEFT, marginSize: MarginSize.S10 },
    { marginPostion: MarginPostion.RIGHT, marginSize: MarginSize.S10 },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(2);
  const [posts, setPosts] = useState([]);
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [inView]);

  useEffect(() => {
    const fetchCommunitPage = async () => {
      if (totalPage < currentPage || totalPage === currentPage) {
        return;
      }

      try {
        const newPost = await fetchPostList(currentPage);

        setCurrentPage(newPost.metaData.currentPage);
        setTotalPage(newPost.metaData.totalPage);
        setPosts((prev) => [...prev, ...newPost.posts]);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            fetchCommunitPage();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }
    };

    fetchCommunitPage();
  }, [currentPage]);

  return (
    <>
      <NavBar activeTab={'커뮤니티'} />
      <MainHeader title={'커뮤니티'} isLeftButtonEnable={false} />
      <MarginContainer marginSet={tagListContainerMargin}>
        <RowScrollContainer>
          <TagButton disabled={false}>전체</TagButton>
          <TagButton disabled={true}>인기글</TagButton>
        </RowScrollContainer>
      </MarginContainer>
      {posts.map((post, index) => (
        <CommunityLargeItem
          key={index}
          title={post.title}
          content={post.content}
          time={post.updatedAt}
          categoryCode={post.categoryCode}
          onClick={() => navigate(`/community/post/${post.id}`)}
        ></CommunityLargeItem>
      ))}
      <div ref={ref} className="live_loading_indicator" />
    </>
  );
};

export default CommunityPage;
