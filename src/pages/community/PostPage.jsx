import { useEffect, useState, useRef } from 'react';
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
import fetchWhoAmI from '../../apis/api/fetchWhoAmI';
import renewRefreshToken from '../../apis/api/renewRefreshToken';
import submitComment from '../../apis/api/submitComment';
import fetchCommentList from '../../apis/api/fetchCommentList';
import deleteComment from '../../apis/api/deleteComment';
import updateComment from '../../apis/api/updateComment';
import submitReply from '../../apis/api/submitReply';
import fetchReplyList from '../../apis/api/fetchReplyList';
import { NotValidAccessTokenError, ExpiredAccessTokenError } from '../../apis/utility/errors';

const PostPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [whoAmI, setWhoAmI] = useState({});
  const [postContents, setPostContents] = useState({});
  const [isHearted, setIsHearted] = useState(false);
  const [commentList, setCommentList] = useState({});
  const [lastCommentId, setLastCommentId] = useState(undefined);
  const [commentTextareaStatus, setCommentTextareaStatus] = useState({ mode: 'comment' });
  const [commentInput, setCommentInput] = useState('');
  const bottomElementRef = useRef(null); // 스크롤 감지를 위한 ref

  // 페이지 하단 감지
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMoreCommentList(lastCommentId);
    });

    if (bottomElementRef.current) {
      observer.observe(bottomElementRef.current);
    }

    return () => {
      if (bottomElementRef.current) observer.unobserve(bottomElementRef.current);
      observer.disconnect();
    };
  }, [lastCommentId]);

  useEffect(() => {
    const loadWhoAmI = async () => {
      try {
        const fetchedWhoAmI = await fetchWhoAmI();
        setWhoAmI(fetchedWhoAmI);
      } catch (error) {
        if (error instanceof ExpiredAccessTokenError) {
          try {
            await renewRefreshToken();
            loadWhoAmI();
          } catch (error) {
            navigate('/');
          }
        } else if (error instanceof NotValidAccessTokenError) navigate('/');
        else console.error(error);
      }
    };

    loadWhoAmI();
  }, []);

  useEffect(() => {
    loadPostDetails();
    loadCommentList();
  }, [params.id]);

  const loadPostDetails = async () => {
    try {
      const fetchedPostDetails = await fetchPostDetails(params.id);
      console.log(fetchedPostDetails);
      setPostContents(fetchedPostDetails);
      setIsHearted(fetchedPostDetails.liked);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          loadPostDetails();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  const loadCommentList = async () => {
    try {
      const fetchedCommentList = await fetchCommentList(params.id);
      console.log(fetchedCommentList);
      setCommentList(fetchedCommentList);
      setLastCommentId(fetchedCommentList.comments.at(-1).comment.commentId);
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          loadCommentList();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  const loadMoreCommentList = async (cursor) => {
    if (!cursor) return;

    try {
      const fetchedCommentList = await fetchCommentList(params.id, cursor);
      if (fetchedCommentList.comments.length <= 0) return;
      setLastCommentId(fetchedCommentList.comments.at(-1).comment.commentId);
      setCommentList((previousCommentList) => ({
        ...previousCommentList,
        comments: [...previousCommentList.comments, ...fetchedCommentList.comments],
      }));
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          loadCommentList();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  const loadMoreReplyList = async (commentId, cursor) => {
    if (!cursor) return;

    try {
      const fetchedReplyList = await fetchReplyList(commentId, cursor);
      console.log(commentId, cursor);
      console.log(fetchedReplyList);
      setCommentList((previousCommentList) => {
        return {
          ...previousCommentList,
          comments: previousCommentList.comments.map((comment) => {
            if (comment.comment.commentId === commentId) {
              return {
                ...comment,
                reply: {
                  replies: [...comment.reply.replies, ...fetchedReplyList.replies],
                },
              };
            }
            return comment;
          }),
        };
      });
    } catch (error) {
      if (error instanceof ExpiredAccessTokenError) {
        try {
          await renewRefreshToken();
          loadMoreReplyList();
        } catch (error) {
          navigate('/');
        }
      } else if (error instanceof NotValidAccessTokenError) navigate('/');
      else console.error(error);
    }
  };

  const toggleHeart = async () => {
    try {
      // Optimistic UI 업데이트: 즉시 변경을 반영
      setPostContents((prevPostContents) => ({
        ...prevPostContents,
        likeCount: isHearted ? prevPostContents.likeCount - 1 : prevPostContents.likeCount + 1,
      }));
      setIsHearted(!isHearted);

      // 실제 서버 요청 처리
      const togglePostLikeResult = await togglePostLike(params.id);

      // 서버 요청 결과에 따라 UI 수정 (필요 시)
      if (togglePostLikeResult !== !isHearted) {
        setIsHearted(togglePostLikeResult);
        setPostContents((prevPostContents) => ({
          ...prevPostContents,
          likeCount: togglePostLikeResult
            ? prevPostContents.likeCount + 1
            : prevPostContents.likeCount - 1,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const submitCommentHandler = async (content) => {
    try {
      await submitComment({ postId: params.id, content });
      loadCommentList();
    } catch (error) {
      console.error(error);
    }
  };

  const updateCommentHandler = async (commentId, value) => {
    try {
      console.log(commentId, value);
      await updateComment({ commentId, content: value });
      loadCommentList();
      setCommentTextareaStatus({ mode: 'comment' });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCommentHandler = async (commentId) => {
    try {
      await deleteComment({ commentId });
      loadCommentList();
    } catch (error) {
      console.error(error);
    }
  };

  const submitReplyHandler = async (commentId, content) => {
    try {
      await submitReply({ commentId, content });
      loadCommentList();
      setCommentTextareaStatus({ mode: 'comment' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MainHeader
        title="게시글"
        rightText={whoAmI.nickname === postContents.nickname ? '수정' : ''}
        onClickLeft={() => navigate(-1)}
        onClickRight={() => {
          if (whoAmI.nickname === postContents) console.log('수정하긔');
        }}
      />
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
          onHeartToggle={toggleHeart}
          heartCount={postContents.likeCount}
          isHearted={isHearted}
        />
        <div className="post-comment-items">
          {commentList.comments?.length > 0 &&
            commentList.comments.map((item) => (
              <div key={item.comment.commentId} className="comment-thread">
                <PostCommentItem
                  profileImage="https://picsum.photos/200/300"
                  name={item.comment.creator}
                  data={item.comment.content}
                  isOwner={item.comment.creator === whoAmI.nickname}
                  isDeleted={item.comment.content === '삭제된 댓글입니다.'}
                  onReplyClick={() => {
                    setCommentTextareaStatus({ mode: 'reply', commentId: item.comment.commentId });
                  }}
                  onEditClick={() => {
                    setCommentInput(item.comment.content);
                    setCommentTextareaStatus({
                      mode: 'commentEdit',
                      commentId: item.comment.commentId,
                    });
                  }}
                  cnDeleteClick={() => deleteCommentHandler(item.comment.commentId)}
                />
                {item.reply.replies?.length > 0 &&
                  item.reply.replies.map((reply) => (
                    <PostReCommentItem
                      key={reply.replyId}
                      profileImage="https://picsum.photos/200/300"
                      name={reply.creator}
                      data={reply.content}
                    />
                  ))}
                {item.reply.replies?.length > 0 && (
                  <button
                    onClick={() =>
                      loadMoreReplyList(item.comment.commentId, item.reply.replies.at(-1).replyId)
                    }
                  >
                    답글 더보기
                  </button>
                )}
              </div>
            ))}
          <CommentTextarea
            onSubmit={(content) => {
              if (commentTextareaStatus.mode === 'comment') submitCommentHandler(content);
              if (commentTextareaStatus.mode === 'commentEdit')
                updateCommentHandler(commentTextareaStatus.commentId, content);
              if (commentTextareaStatus.mode === 'reply')
                submitReplyHandler(commentTextareaStatus.commentId, content);
              if (commentTextareaStatus.mode === 'replyEdit') console.log('답글 수정');
            }}
            initComment={commentInput}
          />
        </div>
        <dir
          className={`overlay ${commentTextareaStatus.mode === 'comment' ? '' : 'active'}`}
          onClick={() => {
            setCommentTextareaStatus({ mode: 'comment' });
            setCommentInput('');
          }}
        />
        <div ref={bottomElementRef} style={{ height: '1px' }} /> {/* 페이지 하단 감지용 요소 */}
      </div>
    </>
  );
};

export default PostPage;
