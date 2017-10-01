export const signup = formData => $.ajax({
  method: 'post',
  url: 'api/users',
  contentType: false,
  processData: false,
  data: formData,
});

export const updateUser = formData => $.ajax({
  method: 'patch',
  url: `api/users/${formData.get('user[id]')}`,
  contentType: false,
  processData: false,
  data: formData,
});

export const login = user => $.ajax({
  method: 'post',
  url: 'api/session',
  data: { user },
});

export const logout = () => $.ajax({
  method: 'delete',
  url: 'api/session',
});

export const getUser = id => $.ajax({
  method: 'get',
  url: `api/users/${id}`,
});

export const deleteSubscription = channel_id => $.ajax({
  method: 'delete',
  url: 'api/subscriptions/',
  data: { channel_id },
});
