import { useNavigate, useParams } from 'react-router-dom';
import NavBar from '../../components/NavBar';
import MainHeader from '../../components/MainHeader';

const PostDetailPage = () => {
  const params = useParams();
  console.log('postId: ' + params.postId);
  const navigate = useNavigate();

  return (
    <>
      <NavBar activeTab={'커뮤니티'} />
      <MainHeader title={'커뮤니티'} onClickLeft={() => navigate(-1)} />
      <div></div>
    </>
  );
};

export default PostDetailPage;
