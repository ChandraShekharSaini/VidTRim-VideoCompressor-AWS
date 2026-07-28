const userAuth = () => {
  const GoogleAuthButton = () => {
    window.location.href =
      "https://vidtrim-backend-vercel.vercel.app/auth/google";
      "http://localhost:3600/auth/google";
  };

  const GithubAuthButton = () => {
    window.location.href =
      "https://vidtrim-backend-vercel.vercel.app/auth/github";
  };

  const InstagramAuthButton = () => {
    window.location.href =
      "https://vidtrim-backend-vercel.vercel.app/auth/instagram";
  };

  return { GoogleAuthButton, GithubAuthButton, InstagramAuthButton };
};

export default userAuth;
