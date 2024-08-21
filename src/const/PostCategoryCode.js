const postCategory = {
  FREE: '자유',
  HYPERTENSION: '고혈압',
  HYPOTENSION: '저혈압',
  DIABETES: '당뇨',
  DEMENTIA: '치매',
  CANCER: '암',
  ETC: '기타 질병',
  PROMOTION: '홍보',
};

export const getPostCategory = (postCategoryCode) => {
  const foundPostCategory = postCategory[postCategoryCode];

  if (foundPostCategory == null) {
    return postCategory.ETC;
  }

  return foundPostCategory;
};
