export const createMessage = message => $.ajax({
  method: 'post',
  url: 'api/messages',
  data: { message },
});

export const deleteMessage = id => $.ajax({
  method: 'delete',
  url: `api/messages/${id}`,
});

export const updateMessage = message => $.ajax({
  method: 'patch',
  url: `api/messages/${message.id}`,
  data: { message },
});
