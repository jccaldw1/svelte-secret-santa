<script lang="ts">
  import type { PageData } from './$types';

  let presentToAdd: string;

  export let data: PageData;
</script>

<h1>if you can see this, you are authenticated!!!</h1>
<form method="POST">
  {#each data.presents as present}
    <div>
      <!-- TODO: Add button to remove gifts, and add input box to add new ones. -->
      <p>{present}</p><button name={present} formaction="?/remove_item">-</button>
    </div>
  {/each}
</form>
<form method="POST">
  Add present:
  <input bind:value={presentToAdd} type="text"/><button name={presentToAdd} formaction="?/add_item">+</button>
</form>
