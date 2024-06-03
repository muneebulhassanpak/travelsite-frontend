const baseUrl = `http://localhost:8080/api`;

export const registerUrl = `${baseUrl}/auth/register`;
export const loginUrl = `${baseUrl}/auth/login`;

export const getToursUrl = `${baseUrl}/post/get-all-tours`;

export const getOneTour = (id) => `${baseUrl}/post/get-one-post/${id}`;

export const getHomeToursUrl = `${baseUrl}/post/get-homepage-tours`;

export const getExisitingUserDataUrl = `${baseUrl}/auth/gather-data`;

export const createRequestUrl = `${baseUrl}/user/create-new-request`;

export const createPostUrl = `${baseUrl}/admin/create-new-post`;

export const editPostUrl = (postid) => `${baseUrl}/admin/edit-post/${postid}`;

export const getResolvedRequests = `${baseUrl}/admin/view-resolved-requests`;

export const getUnResolvedRequests = `${baseUrl}/admin/view-unresolved-requests`;

export const getTourList = `${baseUrl}/admin/getAllToursController`;

export const getAllTrips = `${baseUrl}/admin/getAllTrips`;

export const deleteOnePost = (postid) =>
  `${baseUrl}/admin/delete-post/${postid}`;

export const approveRequest = (requestid) =>
  `${baseUrl}/admin/resolve-one-request/${requestid}`;

export const getSingleRequestData = (requestid) =>
  `${baseUrl}/admin/get-one-request/${requestid}`;

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};
