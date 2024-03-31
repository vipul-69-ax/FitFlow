export const fetchExercises = async (name: string) => {
  const url = `https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises?name=${name}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "6b2fd92be9mshb4e719066d8047fp1f8107jsncb132788fc12",
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
};
