import { Response } from "express";
import { createJWTToken, createResponse, createUserToken, permissionsProcess } from "@Utils/function";
import { constants } from "@Utils/constant";
import Permissions from "@Models/permissionsSchema";

// Define the sendToken function
const sendToken = async (user: any, statusCode: number, res: Response, message: string, restaurant?: any): Promise<void> => {

  const userTokenData: any = {
    id: user._id,
    email: user?.email || "",
    user_type: user?.user_type,
    first_name: user?.first_name,
    last_name: user?.last_name,
    role: user?.role,
    restaurant_id: restaurant?._id
  }
  const accessToken = createUserToken(userTokenData);
  const refreshToken = createJWTToken(user._id);

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + Number(constants.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  const userResData: any = {
    _id: user?._id || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    is_email_verified: user?.is_email_verified || "",
    role: user?.role || "",
    createdAt: user?.createdAt || "",
    updatedAt: user?.updatedAt || "",
    user_type: user?.user_type,
  }

  res.status(statusCode).cookie("token", accessToken, options).json(createResponse({
    statusCode: statusCode,
    success: true,
    message: message,
    data: {
      user: userResData,
      accessToken,
      refreshToken,
      restaurant: restaurant,
      permissions: await permissionsProcess(user?.permissions)
    },
  }));
};


export const sendCustomerToken = (user: any, statusCode: number, res: Response, message: string): void => {

  const userTokenData: any = {
    id: user._id,
    email: user?.email || "",
    first_name: user?.first_name,
    last_name: user?.last_name,
  }

  const accessToken = createUserToken(userTokenData);
  const refreshToken = createJWTToken(user._id);

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + Number(constants.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  const userResData: any = {
    _id: user?._id || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    email: user?.email || "",
    is_email_verified: user?.is_email_verified || "",
    role: user?.role || "",
    createdAt: user?.createdAt || "",
    updatedAt: user?.updatedAt || "",
    user_type: user?.user_type
  }

  res.status(statusCode).cookie("token", accessToken, options).json(createResponse({
    statusCode: statusCode,
    success: true,
    message: message,
    data: {
      user: userResData,
      accessToken,
      refreshToken,
    },
  }));
};


export default sendToken;