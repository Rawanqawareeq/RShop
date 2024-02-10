import * as yup from 'yup';
export const validationSchema = yup.object({
    userName:yup.string().required("UserName is reqired").min(3,"must be at least 3 char").max(30,"must be at most 30 char"),
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(3,"must be at least 3 char").max(15,"must be at most 15 char"),
  })
  export const loginSchema = yup.object({
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(3,"must be at least 3 char").max(15,"must be at most 15 char"),
  })
  export const sendcodeSchema = yup.object({
    email:yup.string().required("Email is reqired"),
  })
  export const forgetpasswordSchema = yup.object({
    code:yup.string().required("code is reqired").length(4,'char must be 4 char '),
    email:yup.string().required("Email is reqired"),
    password:yup.string().required("Password is required").min(3,"must be at least 3 char").max(15,"must be at most 15 char"),
  })