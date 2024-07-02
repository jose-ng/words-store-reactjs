import { UserData } from '@models/user.model';
import { isExpired, decodeToken } from 'react-jwt';
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, selectToken } from '@utils/redux/slices/token.slice';
import { setIsLoggedIn } from '@utils/redux/slices/user.slice';

function useAuth() {
  const dispatch = useDispatch();
  const { code: authToken } = useSelector(selectToken);

  const authTokenIsValid = () => {
    if (authToken) {
      const isMyTokenExpired = isExpired(authToken);
      if (!isMyTokenExpired) {
        return true; // token has no expired
      } else {
        return false;
      }
    } else {
      return false;
    }
  };

  const signOut = (cb: () => void) => {
    dispatch(removeToken());
    dispatch(setIsLoggedIn(false));
    setTimeout(cb);
  };

  const getUserData = (token?: string) => {
    token = token || authToken;
    return decodeToken(token as string) as UserData;
  };

  return {
    authTokenIsValid,
    signOut,
    getUserData,
  };
}

export { useAuth };
