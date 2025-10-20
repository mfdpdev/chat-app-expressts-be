export interface SignInRequest {
  email?: string,
  password?: string,
}

export interface SignUpRequest {
  name: string,
  email: string,
  password: string,
}

export interface SignUpResponse {
  _id: string,
  name: string,
  email: string,
  createdAt: string,
}

export interface SignInResponse {
  _id: string,
  name: string,
  email: string,
  accessToken: string,
  refreshToken: string,
}

export interface RefreshTokenResponse {
  accessToken: string,
}

export interface SignInResponse {
}
