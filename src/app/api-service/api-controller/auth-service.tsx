import apiService from "../api-service";

const path: string | undefined = process.env.NEXT_PUBLIC_BASE_IAM_API;

const authService = {
  POST_LOGIN: (body: any) => {
    return apiService.post("/auth/login", body, null, path, true);
  },
  GET_PROJECT_BY_USER: (
    userid: string,
    search?: string,
    projectname?: string,
    provincename?: string,
    provinceid?: string,
    signal?: AbortSignal
  ) => {
    return apiService.get(
      `/user_project/${userid}${{
        search,
        projectname,
        provincename,
        provinceid,
      }}`,

      {},
      null,
      path,
      true,
      signal
    );
  },
  GET_PROJECT_BY_PROJECT_ID: (projectid: number) => {
    return apiService.get(
      `/user/profile${{ projectid }}`,
      // `/moph/user/profile?projectid=${projectid}`,
      {},
      null,
      path,
      true
    );
  },

  GET_LOGOUT: function () {
    try {
      return apiService.get(`/auth/logout`, {}, null, path, true);
    } catch (error) {
      throw error;
    }
  },
  GET_LOGGER: function (search: string) {
    try {
      return apiService.get(
        `/logger/moph?search=${search}`,
        {},
        null,
        path,
        true
      );
    } catch (error) {
      throw error;
    }
  },
};
export default authService;
