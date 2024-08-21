import CommunityTag from '../../components/CommunityTag';
import MainHeader from '../../components/MainHeader';
import PostItemContainer from '../../components/PostItemContainer';
import PostImage from '../../components/PostImage';
import PostLargeItem from '../../components/PostLargeItem';
import './PostPage.css';
import PostCommentItem from '../../components/PostCommentItem';
import PostReCommentItem from '../../components/PostReCommentItem';
import '../../index.css';

const PostPage = ({ data }) => {
  return (
    <>
      <MainHeader title="게시글" isLeftButtonEnable></MainHeader>
      <div className="post-page">
        <h3>나 자신을 돌보는 것이 중요합니다</h3>
        <div className="post-tag">
          <CommunityTag children={'인기글'} disabled></CommunityTag>
          <CommunityTag children={'치매'}></CommunityTag>
        </div>
        <PostLargeItem
          profileImage={'https://picsum.photos/200/300'}
          name={'김정숙'}
          date={'2024. 04. 27 '}
          views={'100'}
        ></PostLargeItem>
        <p>
          안녕하세요, 사랑하는 가족을 돌보는 보호자 여러분. 저는 (닉네임)라고 합니다. 저 역시 2년째
          어머니를 돌보고 있는 보호자입니다. 보호자의 역할을 하면서 많은 어려움과 도전을 마주했지만,
          그 속에서 소중한 배움과 깨달음을 얻기도 했습니다. 먼저, 우리 모두가 가장 중요한 점은
          자신을 돌보는 일이라는 것을 말씀드리고 싶어요. 사랑하는 사람을 돌보는 일은 많은 에너지와
          시간을 필요로 하지만, 그만큼 나 자신을 돌보는 것도 중요합니다. 충분한 휴식과 자기 관리는
          우리의 건강을 유지하고, 더 나은 돌봄을 제공할 수 있게 해줍니다.
        </p>
        <div className="post-images">
          <PostImage postImage={'https://picsum.photos/200/300'}></PostImage>
          <PostImage postImage={'https://picsum.photos/200/300'}></PostImage>
          <PostImage postImage={'https://picsum.photos/200/300'}></PostImage>
          <PostImage postImage={'https://picsum.photos/200/300'}></PostImage>
          <PostImage postImage={'https://picsum.photos/200/300'}></PostImage>
        </div>
        <div className="post-comment-items">
          <PostItemContainer commentCount={'3'} heartCount={'3'}></PostItemContainer>
          <PostCommentItem
            profileImage={'https://picsum.photos/200/300'}
            name={'김정숙'}
            data={'안녕하세요!! '}
          ></PostCommentItem>
          <PostCommentItem
            profileImage={'https://picsum.photos/200/300'}
            name={'김정숙'}
            data={
              '안녕하세요!! 저는 이러한 저러한 병이 있습니다 이런한 저런한 병을 고치기 위해 많은 약을 먹었습니다 하지만 제 이러한 저러한 병은 났지 않았습니다. 여러분이 이러한 것들을 알려주세요!!'
            }
          ></PostCommentItem>
          <PostReCommentItem
            profileImage={'https://picsum.photos/200/300'}
            name={'김정숙'}
            data={
              '안녕하세요!! 저는 이러한 저러한 병이 있습니다 이런한 저런한 병을 고치기 위해 많은 약을 먹었습니다 하지만 제 이러한 저러한 병은 났지 않았습니다. 여러분이 이러한 것들을 알려주세요!!'
            }
          ></PostReCommentItem>
        </div>
      </div>
    </>
  );
};

export default PostPage;
