<template>
  <div class="userProfile">
    <div class="text-h3 profile-title">My Profile</div>

    <div class="text-h5 profile-subtitle">
      Current Date: <span> {{ finalDate }}</span>
      <br />
      <br />
      <div class="changePhoto">
        <img
          src="https://user-images.githubusercontent.com/30195/34457818-8f7d8c76-ed82-11e7-8474-3825118a776d.png"
        />
        <q-uploader
          style="max-width: 300px"
          max-file-size="2048000"
          label="Update your profile picture"
          multiple
          url="http://localhost:4000/upload"
          color="black"
          square
          max-files="1"
          @rejected="onRejected"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()
    // get current date as a string year/month/day
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const checkDate = yyyy + '/' + mm + '/' + dd;
    const finalDate = checkDate.toString();

    function onRejected (rejectedEntries: any) {
      $q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file needs to be less than 2 MB`
      })
    }

    return {
      today,
      mm,
      dd,
      yyyy,
      checkDate,
      finalDate,
      onRejected
    };
  },
};
</script>
