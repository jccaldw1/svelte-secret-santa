<script lang="ts">
  import type { PageData } from './$types';

  async function handleCheckClick(event, present: string, recipient: string) {
    const fetchResponse = await fetch(`/api/get-christmas-present?present=${present}&recipient=${recipient}&gotten=${event.target.checked}`);
  }

  export let data: PageData;
</script>

{#each data.distinctRecipients as recipient}
  <h1>{recipient}</h1>
  {#each data.presents.filter(present => present.recipient == recipient) as present}
      <div>
        <!-- TODO: Add button to remove gifts, and add input box to add new ones. -->
        <p>{present.gift}</p><input type="checkbox" name={present.gift} checked={present.gotten} on:click={async (e) => await handleCheckClick(e, present.gift, present.recipient)}/>
      </div>
  {/each}
{/each}
