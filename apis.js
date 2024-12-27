
const url = "https://learn.codeit.kr/api/color-surveys";

export const fetchWithMethod = async (url, method, params = {}) => {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: method === "GET" ? null : JSON.stringify(params), // GET 요청 시 body 제외
    });

  
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("에러 발생: ", error);
    return null;
  }
};

// POST 요청 함수
export const postColorSurveys = async ({ mbti, colorCode, password = "0000" }) => {
  const params = { mbti, colorCode, password }; 
  return fetchWithMethod(url, "POST", params);
};

// // GET 
// export const getColorSurveys = async (params) => { 
//   for (const key in params) {
//     url.searchParams.append(key, params.key);
//   }
//   return fetchWithMethod(url + "GET");
// };

// GET 요청 함수
export const getColorSurveys = async (params = {}) => {
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));
  return fetchWithMethod(url, "GET");
};

