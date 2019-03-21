import axios from 'axios'

const url = 'http://localhost:3000/api/exercises/';

class ExerciseService {
  static getExercises() {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await axios.get(url);
        const data = res.data
        resolve(
          data.map(exercise => ({
            ...exercise
          }))
        );
      } catch(err) {
        reject(err.message);
      }
    });
  }

  static insertExercise(name, category, notes) {
    return axios.post(url, {
      name,
      category,
      notes
    });
  }

  static updateExercise(id, params) {
    return axios.put(`${url}${id}`, params);
  }

  static deleteExercise(id) {
    return axios.delete(`${url}${id}`);
  }
}

export default ExerciseService;