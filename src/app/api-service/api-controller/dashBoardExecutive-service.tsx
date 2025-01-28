import apiService from "../api-service";
const service: string | undefined = process.env.NEXT_PUBLIC_DASHBOARD_EXECUTIVE;

const dashBoardExecutiveService = {
  POST_ฺTREND_BANNER_HOSPITAL: (body: string, signal?: AbortSignal) => {
    return apiService.post(
      `/api/v1/report_ticket_trend`,
      body,
      null,
      service,
      true,
      signal
    );
  },
  POST_TABLE_BACKUP: (body: any) => {
    return apiService.post(`/api/v1/table_backup`, body, null, service, true);
  },
};

export default dashBoardExecutiveService;
