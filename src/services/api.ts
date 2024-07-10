import { IActUpgradeRequestModel, IActivateRequestModel, IDashboardRequest, IGetReportFilter, ILoginRequest, IPaginationRequest } from '@/interfaces';
import { http } from './http';
import { USER_ROLE } from '@/utils/constants';

export const login = async (data: ILoginRequest) =>
  await http.post('/Authentication/AdminLogin', data);

export const logout = async () =>
  await http.get('/Authentication/Logout');

export const getCurrentUserCore = async () =>
  await http.get('/User/CurrentUserCore');

export const getDashboard = async (data: IDashboardRequest) =>
  await http.post('/Admin/Dashboard', data);

export const getUsers = async (data: IPaginationRequest<{ role: USER_ROLE }>) =>
  await http.post('/Admin/User/Get', data);

export const activateUser = async (data: IActivateRequestModel) =>
  await http.put('/Admin/Activate', data);

export const createAdmin = async (data: string) =>
  await http.post('/Admin/' + data);

export const getPets = async (data: IPaginationRequest<undefined>) =>
  await http.post('/Admin/Pet/Get', data);

export const getBlogs = async (data: IPaginationRequest<undefined>) =>
  await http.post('/Admin/Blog/Get', data);

export const getRequests = async (data: IPaginationRequest<undefined>) =>
  await http.post('/Admin/UpgradeRequest/Get', data);

export const actUpgradeRequest = async (data: IActUpgradeRequestModel) => {
  await http.put(
    `/Admin/UpgradeRequest/${data.accepted ? 'Confirm' : 'Reject'}/${data.id}`,
  );
};

export const getReports = async (data: IPaginationRequest<IGetReportFilter>) =>
  await http.post('/Admin/Report/Get', data);