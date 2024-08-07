import { useState } from 'react';
import './MemoInput.css'; // 스타일 파일 이름 변경
import '../index.css';

const MemoInput = () => {
  const [memo, setMemo] = useState(''); // 두 번째 입력값 초기화

  const handleMemoChange = (event) => setMemo(event.target.value);

  return (
    <div className="memo-input-container">
      <div className="memo-header">메모</div>
      <textarea
        value={memo}
        onChange={handleMemoChange}
        placeholder="메모를 작성하세요"
        className="memo-textarea"
      />
    </div>
  );
};

export default MemoInput;
