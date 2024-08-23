import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CommunityTag from '../../components/CommunityTag';
import MainHeader from '../../components/MainHeader';
import InteractionBar from '../../components/InteractionBar';
import CommentTextarea from '../../components/CommentTextarea';
import PostImage from '../../components/PostImage';
import PostLargeItem from '../../components/PostLargeItem';
import './PostPage.css';
import PostCommentItem from '../../components/PostCommentItem';
import PostReCommentItem from '../../components/PostReCommentItem';
import '../../index.css';
import fetchPostDetails from '../../apis/api/fetchPostDetails';
import { timeAgoByStr } from '../../utility/dates';
import postCategory from '../../const/postCategory';
import togglePostLike from '../../apis/api/togglePostLike';

const PostPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [postContents, setPostContents] = useState({});
  const [isHearted, setIsHearted] = useState(false);

  useEffect(() => {
    fetchPostDetails(params.id).then((data) => {
      console.log(data);
      setPostContents(data);
    });
  }, [params.id, isHearted]);

  return (
    <>
      <MainHeader title="게시글" onClickLeft={() => navigate(-1)} />
      <div className="post-page">
        <h2>{postContents.title}</h2>
        <div className="post-tag">
          <CommunityTag>{postCategory[postContents.categoryCode]}</CommunityTag>
        </div>
        <PostLargeItem
          profileImage={'https://picsum.photos/200/300'}
          name={postContents.nickname}
          date={timeAgoByStr(postContents.updatedAt)}
        />
        <pre>{postContents.content}</pre>
        <div className="post-images">
          {postContents.image &&
            postContents.image.length > 0 &&
            postContents.image[0].images.map((image, index) => (
              <PostImage
                key={index}
                src={`${postContents.image[0].postImageApiUrlPrefix}${image.postImageName}`}
              />
            ))}
        </div>
        <InteractionBar
          commentCount={postContents.commentCount}
          heartCount={postContents.likeCount}
          onHeartToggle={(isHearted) => {
            console.log(isHearted);
            setIsHearted(isHearted);
            togglePostLike(params.id);
            //TODO: 좋아요 API 호출
          }}
        />
        <div className="post-comment-items">
          <div className="comment-thread">
            <PostCommentItem
              profileImage={'https://picsum.photos/200/300'}
              name={'김정숙'}
              data={'안녕하세요!! '}
            />
          </div>
          <div className="comment-thread">
            <PostCommentItem
              profileImage={'https://picsum.photos/200/300'}
              name={'김정숙'}
              data={
                '안녕하세요!! 저는 이러한 저러한 병이 있습니다 이런한 저런한 병을 고치기 위해 많은 약을 먹었습니다 하지만 제 이러한 저러한 병은 났지 않았습니다. 여러분이 이러한 것들을 알려주세요!!'
              }
            />
            <PostReCommentItem
              profileImage={'https://picsum.photos/200/300'}
              name={'김정숙'}
              data={
                '안녕하세요!! 저는 이러한 저러한 병이 있습니다 이런한 저런한 병을 고치기 위해 많은 약을 먹었습니다 하지만 제 이러한 저러한 병은 났지 않았습니다. 여러분이 이러한 것들을 알려주세요!!'
              }
            />
            <PostReCommentItem
              profileImage={'https://picsum.photos/200/300'}
              name={'김정숙'}
              data={
                '안녕하세요!! 저는 이러한 저러한 병이 있습니다 이런한 저런한 병을 고치기 위해 많은 약을 먹었습니다 하지만 제 이러한 저러한 병은 났지 않았습니다. 여러분이 이러한 것들을 알려주세요!!'
              }
            />
          </div>
          <div className="comment-thread">
            <PostCommentItem
              profileImage={'https://picsum.photos/200/300'}
              name={'김정숙'}
              data={'안녕하세요!! '}
            />
          </div>
          <CommentTextarea />
        </div>
      </div>
    </>
  );
};

export default PostPage;
