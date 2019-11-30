export const CONNECTION_SET_STATUS = 'CONNECTION_SET_STATUS';

export const setStatus = status => ({
  type: CONNECTION_SET_STATUS,
  payload: status,
});
