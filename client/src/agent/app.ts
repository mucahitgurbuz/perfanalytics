import { ApiRequestBundle } from "./index";
const encode = encodeURIComponent;

const App = (requests: ApiRequestBundle) => ({
  single: (appCode: string) => requests.get(`/app/single/${appCode}`),
  analytics: (appCode: string, start: string, end: string) =>
    requests.get(
      `/analytic?appCode=${encode(appCode)}&start=${encode(start)}&end=${encode(
        end
      )}`
    ),
});

export default App;
