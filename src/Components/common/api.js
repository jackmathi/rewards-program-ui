import data from "./CustomerData";

// Data Fetch  Custome hook Function
export const usefetch = async () => {
    return new Promise((res) => {
      setTimeout(() => {
        res(data);
      }, 600);
    });
  }
  