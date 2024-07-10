import { BLOG_CATEGORIES, ORGANIZATION_TYPE, PET_SPECIES, REPORT_ENTITY, USER_ROLE } from '@/utils/constants';

export interface IApiResponse<T> {
  data: T;
  pageSize?: number;
  totalNumber?: number;
  pageIndex?: number;
  pageNumber?: number;
}

export interface IApiErrorResponse {
  errorCode: number;
  errorMessage: string;
}

export interface IPaginationRequest<T> {
  pageIndex: number;
  pageSize?: number;
  orderBy?: string;
  filter?: T;
}

export interface IPaginationModel {
  pageIndex: number;
  pageNumber: number;
}

export interface IDashboardRequest {
  month: number,
  year: number,
}

export interface IDashboardResponse extends IChartSection, IParameterSection { }

export interface IParameterSection {
  income: number,
  petNumber: number,
  individualNumber: number,
  organizationNumber: number,
  blogNumber: number,
  activeRate: number,
}

export interface IChartSection {
  petData: number[],
  adoptionData: number[],
  blogData: number[],
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiredDate: string;
  refreshTokenExpiredDate: string;
}


export interface ICurrentUserCoreResponse {
  id: string;
  email: string;
  image: string;
  role: USER_ROLE;
  name: string;
}

export interface IGetUsersResponseModel {
  id: string,
  image: string,
  name: string,
  organizationName: string,
  email: string,
  phone: string,
  address: string,
  isCreatedAt: string,
  isDeactivated: boolean,
  organizationType: ORGANIZATION_TYPE,
}

export interface IActivateRequestModel {
  type: string,
  id: string,
}

export interface IGetPetsResponseModel {
  id: string,
  image: string,
  name: string,
  species: PET_SPECIES,
  breed: string,
  isAvailable: boolean,
  view: number,
  isCreatedAt: string,
  isUpdatedAt: string,
  isDeleted: boolean,
  ownerId: string,
  ownerImage: string
}

export interface IGetBlogResponseModel {
  id: string,
  image: string,
  userId: string,
  userImage: string,
  category: BLOG_CATEGORIES,
  title: string,
  view: number,
  isHidden: boolean,
  advertisingDate: string,
  isCreatedAt: string,
  isUpdatedAt: string,
}

export interface IGetUpgradeRequestResponseModel {
  id: string,
  userId: string,
  userImage: string,
  phone: string,
  address: string,
  organizationName: string,
  entityName: string,
  email: string,
  website: string,
  taxCode: string,
  type: ORGANIZATION_TYPE,
  description: string,
  isCreatedAt: string
}

export interface IActUpgradeRequestModel {
  id: string,
  accepted: boolean,
}

export interface IGetReportResponseModel {
  id: string,
  spam: number,
  scam: number,
  inappropriateContent: number,
  other: number
};

export interface IGetReportFilter {
  reportEntity: REPORT_ENTITY
}