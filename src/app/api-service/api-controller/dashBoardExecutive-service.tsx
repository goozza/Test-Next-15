import apiService from "../api-service";
const service: any = process.env.NEXT_PUBLIC_DASHBOARD_EXECUTIVE;

const dashBoardExecutiveService = {
  POST_TABLE_BACKUP: (body: any) => {
    return apiService.post(`/api/v1/table_backup`, body, service, "", true);
  },
};

export default dashBoardExecutiveService;
