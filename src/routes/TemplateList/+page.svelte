<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { Pencil, Trash2, Search, Plus } from 'lucide-svelte';
    import { goto } from '$app/navigation';
    
    const brands = writable([
      { id: 1, name: 'Coffee Night', provider: 'AWS', limit: 'unlimited', used: '-' },
      { id: 2, name: 'JP Standley', provider: 'SMTP', limit: '10000/day', used: '10%' }
    ]);
    let searchQuery = writable('');
    
    function editBrand(id) {
        console.log('Editing brand with id:', id);
    }

    function deleteBrand(id) {
        console.log('Deleting brand with id:', id);
        brands.update(items => items.filter(item => item.id !== id));
    }
</script>

<div class="p-6 max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-semibold">Brand Management</h1>

        <div class="flex gap-2">
            <!-- Search input -->
            <div class="relative">
                <input 
                    type="text" 
                    placeholder="Search Brand" 
                    bind:value={$searchQuery}
                    class="pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                />
                <button class="absolute right-1 top-1/2 -translate-y-1/2 p-1 bg-gray-100 rounded-md">
                    <Search size={18} class="text-gray-600" />
                </button>
            </div>

            <!-- Add brand button -->
            <button class="w-full bg-black  border-gray-300 rounded-md p text-white hover:bg-primary/90"
                on:click={() => goto('/add')}>
                <Plus size={18} />
                <span>Add Brand</span>
            </button>
        </div>
    </div>

    <!-- Brands table -->
    <div class="border rounded-md overflow-hidden">
        <table class="w-full">
            <thead>
                <tr class="bg-muted">
                    <th class="py-3 px-4 text-left font-medium text-muted-foreground">S No</th>
                    <th class="py-3 px-4 text-left font-medium text-muted-foreground">Brands</th>
                    <th class="py-3 px-4 text-left font-medium text-muted-foreground">Email Provider</th>
                    <th class="py-3 px-4 text-left font-medium text-muted-foreground">Sending Limit</th>
                    <th class="py-3 px-4 text-left font-medium text-muted-foreground">Used</th>
                    <th class="py-3 px-4 text-left font-medium text-muted-foreground">Edit</th>
                    <th class="py-3 px-4 text-left font-medium text-muted-foreground">Delete</th>
                </tr>
            </thead>
            <tbody>
                {#each $brands as brand, index}
                    {#if brand.name.toLowerCase().includes($searchQuery.toLowerCase()) || $searchQuery === ""}
                        <tr class="border-t border-gray-200 hover:bg-muted/50">
                            <td class="py-3 px-4">{index + 1}</td>
                            <td class="py-3 px-4 font-medium">{brand.name}</td>
                            <td class="py-3 px-4">{brand.provider}</td>
                            <td class="py-3 px-4">{brand.limit}</td>
                            <td class="py-3 px-4">{brand.used}</td>
                            <td class="py-3 px-4">
                                <button 
                                    on:click={() => editBrand(brand.id)}
                                    class="p-2 text-gray-600 hover:text-primary rounded-md hover:bg-muted transition-colors"
                                    aria-label="Edit brand"
                                >
                                    <Pencil size={18} />
                                </button>
                            </td>
                            <td class="py-3 px-4">
                                <button 
                                    on:click={() => deleteBrand(brand.id)}
                                    class="p-2 text-gray-600 hover:text-destructive rounded-md hover:bg-muted transition-colors"
                                    aria-label="Delete brand"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </td>
                        </tr>
                    {/if}
                {/each}
            </tbody>
        </table>
    </div>
</div>
