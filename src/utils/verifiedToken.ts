import jwt from "jsonwebtoken";
export const verifyToken =(token: string, secret: string): any => {
    try{const verifiedToken = jwt.verify(token, secret);
    return {
        success:true,
        data:verifiedToken
    }}
     catch (error:any) {
        // console.error('An error occurred while verifying the token:', error);
        // throw new Error("Invalid token");

        return {
            success:false,
            error: error.message
        }
    }
}
