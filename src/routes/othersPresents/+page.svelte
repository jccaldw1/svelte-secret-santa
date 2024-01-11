<script lang="ts">
  import type { PageData } from './$types';

  export let data: PageData;
</script>

<form method="POST">
  {#each data.distinctRecipients as recipient}
    <h1>{recipient}</h1>
    {#each data.presents.filter(gift => gift.recipient == recipient) as present}
      <div>
        <!-- TODO: Add button to remove gifts, and add input box to add new ones. -->
        <p>{present.gift}</p><input type="checkbox" checked={present.gotten}/>
      </div>
    {/each}
  {/each}
</form>
  <!-- TODO: check -->
<form method="POST">
  Add present:
  <input type="checkbox"/><button formaction="?/add_item">+</button>
</form>

