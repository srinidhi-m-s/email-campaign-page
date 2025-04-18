<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { get } from 'svelte/store';
  import { Input } from '$lib/components/ui/input';
  import { Textarea } from '$lib/components/ui/textarea';
  import { Label } from '$lib/components/ui/label';
  import { goto } from '$app/navigation';
  import { ChevronDown, ChevronUp } from 'lucide-svelte';

  let brandId;
  let campaignId;
  let isEditing = false;
  let brandName = '';

  let campaign = {
    name: '',
    fromName: '',
    fromEmail: '',
    replyToEmail: '',
    mailContent: '',
    totalRecipients: 0,
    totalSent: 0,
    totalOpened: 0,
    totalClicked: 0
  };

  let showTrackingFields = false;
  onMount(async () => {
    const current = get(page);
    brandId = current.params.brandId;
    campaignId = new URLSearchParams(window.location.search).get('id');
    try {
      const brandRes = await fetch(`/api/brands/${brandId}`);
      if (brandRes.ok) {
        const { name } = (await res.json())[0] || {};
        brandName = name ?? '';
        
      }
    } catch (e) {
      console.error('Error fetching brand name:', e);
    }
    if (campaignId) {
      isEditing = true;
      try {
        const res = await fetch(`/api/campaigns/${campaignId}`);
        if (res.ok) {
          const data = await res.json();
          campaign = data;
        } else {
          alert('Failed to load campaign data.');
        }
      } catch (err) {
        console.error('Error loading campaign:', err);
      }
    }
  });
  function validateForm() {
    if (!campaign.name || !campaign.fromName || !campaign.fromEmail || !campaign.replyToEmail || !campaign.mailContent) {
      alert('All fields are required');
      return false;      
    }
    else return true;
  }

  async function handleSubmit() {
    if (!validateForm()) {
      return; 
    }    
    const method = isEditing ? 'PUT' : 'POST';
    const url = isEditing ? `/api/campaigns/${campaignId}` : '/api/campaigns';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...campaign, brandId: parseInt(brandId) })
    });

    if (response.ok) {
      alert(isEditing ? 'Campaign updated successfully' : 'Campaign created successfully');
      goto(`/BrandsList/${brandId}/campaigns`);
    } else {
      alert('Failed to save campaign');
    }
  }
</script>
<div class="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6">
  <!-- Header -->
  <div class="w-full max-w-3xl flex justify-between items-center mb-6">
    <h2 class="text-2xl font-semibold">{isEditing ? 'Edit Campaign' : 'Create Campaign'}</h2>
    <span class="text-md border px-3 py-1 rounded">{brandName}</span>
  </div>

  <!-- Form Box -->
  <div class="w-full max-w-3xl bg-white p-6 rounded-md shadow space-y-4">
    <div>
      <Label for="name">Campaign Name</Label>
      <Input  id="name" bind:value={campaign.name} placeholder="Enter campaign name" />
    </div>

    <div>
      <Label for="fromName">From Name</Label>
      <Input id="fromName" bind:value={campaign.fromName} placeholder="e.g. John Doe" />
    </div>

    <div>
      <Label for="fromEmail">From Email</Label>
      <Input id="fromEmail" type="email" bind:value={campaign.fromEmail} placeholder="example@mail.com" />
    </div>

    <div>
      <Label for="replyToEmail">Reply-To Email</Label>
      <Input id="replyToEmail" type="email" bind:value={campaign.replyToEmail} placeholder="reply@example.com" />
    </div>

    <div>
      <Label for="mailContent">Mail Content</Label>
      <Textarea id="mailContent" bind:value={campaign.mailContent} rows={8} placeholder="Enter mail content" />
    </div>
    <div>
      <button
        class="bg-white border border-gray-300 rounded-md p-2 text-black hover:bg-gray-100 flex items-center gap-1"
        on:click={() => (showTrackingFields = !showTrackingFields)}
      >
        Tracking
        {#if showTrackingFields}
          <ChevronUp size={16} />
        {:else}
          <ChevronDown size={16} />
        {/if}
      </button>
    </div>

    {#if showTrackingFields}
      <div class="grid grid-cols-2 gap-4">
        <div>
          <Label for="recipients">Total Recipients</Label>
          <Input id="recipients" type="number" bind:value={campaign.totalRecipients} />
        </div>
        <div>
          <Label for="sent">Total Sent</Label>
          <Input id="sent" type="number" bind:value={campaign.totalSent} />
        </div>
        <div>
          <Label for="opened">Total Opened</Label>
          <Input id="opened" type="number" bind:value={campaign.totalOpened} />
        </div>
        <div>
          <Label for="clicked">Total Clicked</Label>
          <Input id="clicked" type="number" bind:value={campaign.totalClicked} />
        </div>
      </div>
    {/if}

    <button
      class="w-full mt-4 bg-black text-white p-2 rounded-md hover:bg-primary/90"
      on:click|preventDefault={handleSubmit}
    >
      {isEditing ? 'Update Campaign' : 'Create Campaign'}
    </button>
  </div>
</div>
