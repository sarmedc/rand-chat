export const api = async (
  url: string | URL | Request,
  body: RequestInit | undefined,
  errorMsg: string | undefined
) => {
  try {
    const res = await fetch(url, body);

    if (!res.ok) {
      throw new Error(errorMsg);
    }

    return res.json();
  } catch (error) {
    console.error("Error: ", error);
  }
};
