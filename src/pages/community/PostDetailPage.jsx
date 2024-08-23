import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import MainHeader from '../../components/MainHeader';
import { useEffect, useState } from 'react';
import { ExpiredAccessTokenError, NotValidAccessTokenError } from '../../apis/utility/errors';
import fetchPostDetail from '../../apis/api/fetchPostDetail';
import PostDetailImage from '../../components/PostDetailImage';
import PostDetailHeader from '../../components/PostDetailHeader';
import PostDetailTitle from '../../components/PostDetailTitle';
import PostDetailTag from '../../components/PostDetailTag';
import PostDetailContent from '../../components/PostDetailContent';
import PostDetailComment from '../../components/PostDetailComment';
import { CommentProvider } from '../../provider/CommentProvider';

const PostDetailPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const handlePostDetailFetch = async () => {
      try {
        const newPost = await fetchPostDetail(params.postId);
        setPost(newPost);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            handlePostDetailFetch();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }
    };

    handlePostDetailFetch();
  }, []);

  return (
    <>
      {post === null ? (
        <></>
      ) : (
        <CommentProvider>
          <NavBar activeTab={'커뮤니티'} />
          <MainHeader title={'게시글'} onClickLeft={() => navigate(-1)} />
          <PostDetailTitle title={post.title} />
          <PostDetailTag title={post.categoryCode} />
          <PostDetailHeader nickname={post.nickname} date={post.updatedAt} />
          <PostDetailContent content={post.content} />
          <PostDetailImage
            postImageApiUrlPrefix={post.image[0].postImageApiUrlPrefix}
            images={post.image[0].images}
          />
          <PostDetailComment
            postId={post.id}
            commentCount={post.commentCount}
            likeCount={post.likeCount}
          />
        </CommentProvider>
      )}
    </>
  );
};

export default PostDetailPage;
