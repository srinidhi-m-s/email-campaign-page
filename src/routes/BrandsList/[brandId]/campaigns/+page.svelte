<script>
  import { onMount } from 'svelte';
  import { get } from 'svelte/store';
  import { page } from '$app/stores';
  import { Button } from '$lib/components/ui/button';
  import { Input } from '$lib/components/ui/input';
  import { Table, TableRow, TableCell, TableHead, TableHeader, TableBody } from '$lib/components/ui/table';
  import { Pencil, Trash2, Search, Plus } from 'lucide-svelte';
  import { goto } from '$app/navigation';

  let brandId;
  let brandName = '';
  let campaigns = [];
  let searchQuery = '';

  onMount(async () => {
    brandId = get(page).params.brandId;

    if (brandId) {
      try {
        // Fetch campaigns
        const campaignRes = await fetch(`/api/campaigns?brandId=${brandId}`);
        if (campaignRes.ok) {
          campaigns = await campaignRes.json();
        }

        // Fetch brand name
        const brandRes = await fetch(`/api/brands/${brandId}`);
        if (brandRes.ok) {
          const brandData = await brandRes.json();
          brandName = brandData[0]?.name ?? '';
        }

      } catch (error) {
        console.error('Error loading data:', error);
      }
    }
  });

  function handleAddCampaign() {
    goto(`/BrandsList/${brandId}/campaigns/add`);
  }
</script>

<div class="flex items-center justify-center min-h-screen p-6">
  <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold">Campaign</h2>
      <span class="text-md border px-3 py-1 rounded">
        {brandName}
      </span>  
    </div>

    <div class="flex items-center justify-between mb-4">
      <div class="flex items-center gap-2">
        <Input placeholder="Search Campaign" bind:value={searchQuery} />
      </div>
      <button on:click={handleAddCampaign} class="bg-black border-gray-300 rounded-md p-2 text-white hover:bg-primary/90">
        Add Campaign
      </button>
    </div>

    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>S No</TableHead>
          <TableHead>Campaign Name</TableHead>
          <TableHead>Recipients</TableHead>
          <TableHead>Sent</TableHead>
          <TableHead>Email Open</TableHead>
          <TableHead>Email Clicks</TableHead>
          <TableHead>Edit</TableHead>
          <TableHead>Archive</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {#each campaigns as campaign, i}
          {#if campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) || searchQuery === ""}
            <TableRow>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{campaign.name}</TableCell>
              <TableCell>{campaign.recipients}</TableCell>
              <TableCell>{campaign.sent}</TableCell>
              <TableCell>{campaign.open || '-'}</TableCell>
              <TableCell>{campaign.clicks || '-'}</TableCell>
              <TableCell>
                <button 
                  on:click={() => goto(`/BrandsList/${brandId}/campaigns/add?id=${campaign.id}`)}
                  class="p-2 text-gray-600 hover:text-primary rounded-md hover:bg-muted transition-colors"
                  aria-label="Edit brand"
                >
                  <Pencil size={18} />
                </button>
              </TableCell>
              <TableCell><Trash2 class="cursor-pointer" /></TableCell>
            </TableRow>
          {/if}
        {/each}
      </TableBody>
    </Table>
  </div>
</div>
