import data from "./CustomerData";
// Data Fetch Customer Hook Function with Error Handling
export const usefetch = async () => {
  try {
    const response = await new Promise((resolve, reject) => {
          resolve(data);
    });

    return response;
  } catch (error) {
    return { error: error.message }; 
  }
};
