<template>
  <div>
    <div>
      <label for="create-exercise"></label>
      <input type="text" id="create-exercise" v-model="name" placeholder="Name">
      <input type="text" id="create-exercise" v-model="category" placeholder="Category">
      <input type="text" id="create-exercise" v-model="notes" placeholder="Notes">


      <button v-on:click="createExercise">Create Exercise</button>
    </div>
    <p class="error" v-if="error">{{ error }}</p>
    <div 
      v-for="exercise in exercises"
      v-bind:key="exercise._id"
      v-on:dblclick="deleteExercise(exercise._id)"

    >
      <p>{{exercise.name}}</p>
      <p>{{exercise.category}}</p>
      <p>{{exercise.notes}}</p>
      <p>{{exercise.edit}}</p>
      <button v-on:click="toggle()">Edit the exercise</button>

    </div>
    <div v-for="exercise in exercises" v-bind:key="exercise._id">
        <div v-if="edit">
          <input type="text" v-model="name" placeholder="Name">
          <input type="text" v-model="category" placeholder="Category">
          <input type="text" v-model="notes" placeholder="Notes">
          <button v-on:click="submit(exercise._id)">Edit</button>
      </div>
    </div>
  </div>
</template>



<script>
import ExerciseService from '../ExerciseService'
export default {
  name: 'ExerciseComponent',
  data() {
    return {
      exercises: [],
      error: '',
      name: '',
      category: '',
      notes: '',
      edit: false
    }
  },
  async created() {
    try {
      this.exercises = await ExerciseService.getExercises();
    } catch(err) {
      this.error = err.message;
    }
  },
  methods: {
    async createExercise() {
      await ExerciseService.insertExercise(this.name, this.category, this.notes);
      this.exercises = await ExerciseService.getExercises(); 
    },
    async deleteExercise(id) {
      await ExerciseService.deleteExercise(id);
      this.exercises = await ExerciseService.getExercises(); 
    },
    async updateExercise(id, params) {
      await ExerciseService.updateExercise(id, params);
      this.exercises = await ExerciseService.getExercises();
    },
    submit: function(id) {
      let params = {
        name: this.name,
        category: this.category,
        notes: this.notes
      }
      console.log(params);
      this.updateExercise(id, params);
    },
    toggle: function() {
      this.edit = !this.edit;
      console.log(this.exercises);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
