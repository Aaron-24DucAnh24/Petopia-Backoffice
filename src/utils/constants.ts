export enum USER_ROLE {
  STANDARD_USER = 0,
  SYSTEM_ADMIN = 1,
  ORGANIZATION = 2,
}

export const COOKIES_NAME = {
  ADMIN_ACCESS_TOKEN_SERVER: 'adminAccessTokenServer',
  ADMIN_REFRESH_TOKEN_SERVER: 'adminRefreshTokenServer',
  ADMIN_REDIRECT: 'adminRedirect',
  ACCESS_TOKEN_SERVER: 'accessTokenServer',
  REFRESH_TOKEN_SERVER: 'refreshTokenServer',
  REDIRECT: 'redirect',
};

export const STATIC_URLS = {
  BG1: '/image/bg1.png',
  BG2: '/image/bg2.png',
  NO_AVATAR: '/image/no-avatar.png',
};

export const DOMAIN_ERROR_MESSAGES = {
  '10001': 'Thông tin đăng nhập không chính xác.',
};

export const QUERY_KEYS = {
  GET_CURRENT_USER_CORE: 'GET_CURRENT_USER_CORE',
  GET_DASHBOARD: 'GET_DASHBOARD',
  GET_USERS: 'GET_USERS',
  GET_PETS: 'GET_PETS',
  GET_UPGRADE_REQUESTS: 'GET_UPGRADE_REQUESTS',
};

export const MANAGEMENT_TAB = {
  USER: 1,
  ORGANIZATION: 2,
  ADMIN: 3,
  PET: 4,
  BLOG: 5,
  UPGRADE_REQUEST: 6,
  REPORT: 7,
};

export enum ORGANIZATION_TYPE {
  RESCUE,
  BUSINESS,
  VET,
  OTHER,
}

export const PAGE_SIZE = 10;

export enum PET_SPECIES {
  DOG = 0,
  CAT = 1,
  OTHER = 2,
}

export enum BLOG_CATEGORIES {
  HEALTH,
  TRAINING,
  PRODUCT,
  ART,
}

export enum REPORT_ENTITY {
  User,
  Pet,
  Blog,
}