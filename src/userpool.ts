import AmazonCognitoIdentity from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-2_aPmbOCg9M",
  ClientId: "1ivhamkq395tt7s33iidgl83oa",
  Region: "us-east-2",
};
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

const getCurrentUserId = () => {
  const currentAuthenticatedUser = userPool.getCurrentUser();
  if (currentAuthenticatedUser) {
    return currentAuthenticatedUser.getUsername();
  }
  return null; // Or handle the case where user is not authenticated
};

export default getCurrentUserId;
