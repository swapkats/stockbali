export const createEmoticon = emoticon => $.ajax({
  method: 'post',
  url: 'api/emoticons',
  data: { emoticon },
});

export const deleteEmoticon = id => $.ajax({
  method: 'delete',
  url: `api/emoticons/${id}`,
});

export const updateEmoticon = emoticon => $.ajax({
  method: 'patch',
  url: `api/emoticons/${emoticon.id}`,
  data: { emoticon },
});
