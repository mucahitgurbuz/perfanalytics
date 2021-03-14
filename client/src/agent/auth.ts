import sha256 from "crypto-js/sha256";
import { ApiRequestBundle } from "./index";
const encode = encodeURIComponent;

const Auth = (requests: ApiRequestBundle) => ({
  current: () => requests.get("/app/self"),
  login: (appCode: string, password: string) =>
    requests.get(
      `/login?appCode=${encode(appCode)}&password=${encode(
        sha256(password).toString()
      )}`
    ),
  register: (appName: string, appCode: string, password: string) => {
    const hashedPassword = sha256(password).toString();
    return requests.post("/app", {
      appName,
      appCode,
      password: hashedPassword,
    });
  },
});

export default Auth;
