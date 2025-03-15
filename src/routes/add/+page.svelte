<script>
    import { writable } from 'svelte/store';
    import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '$lib/components/ui/accordion';
    import { Button } from '$lib/components/ui/button';
    import { Input } from '$lib/components/ui/input';
    import { Textarea } from '$lib/components/ui/textarea';
    import { Label } from '$lib/components/ui/label';
    import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
    import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '$lib/components/ui/select';
    import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
    
  } from '$lib/components/ui/dropdown-menu';

  import { get } from 'svelte/store';

  let brands = writable({
    name: '',
    description: '',
    fromName: '',
    fromEmail: '',
    toEmail: '',
    smtpProvider: '',
    smtpRegion: '',
    smtpAccessKey: '',
    smtpSecretKey: '',
    smtpHost: '',
    smtpPort: '',
    smtpSSL: '',
    smtpUsername: '',
    smtpPassword: '',
    smtpType: '',
    smtpLimitHourly: '',
    smtpLimitDaily: '',
    smtpLimitMonthly: '',
    trackOpening: '',  
    trackClicks: '',
    maxBounce: '',
    gdpr: 'no',
    trackLinkClicks: '',        
});


  async function handleSubmit() {
    console.log('Submit button clicked');
    const data = get(brands);

    const response = await fetch('/api/brands', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      alert('Brand saved successfully!');
    } else {
      alert('Failed to save brand');
    }
  }

  

    const providers = ['SES', 'SMTP'];
    const sslOptions = ['SSL', 'TLS', 'None'];
  
  </script>
  
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-semibold mb-4">Add Brand</h2>
  
    <Accordion type="single" collapsible>
        <!-- Main Section -->
        <AccordionItem value="main">
            <AccordionTrigger>Main</AccordionTrigger>
            <AccordionContent>
                <div class="space-y-4">
                    <div>
                        <Label for="brand-name">Brand Name</Label>
                        <Input id="brand-name" bind:value={$brands.name} />
                    </div>
  
                    <div>
                        <Label for="brand-description">Brand Description</Label>
                        <Textarea id="brand-description" bind:value={$brands.description} rows="3" />
                    </div>
  
                    <div>
                        <Label for="from-name">From Name</Label>
                        <Input id="from-name" bind:value={$brands.fromName} />
                    </div>
  
                    <div>
                        <Label for="from-email">From Email</Label>
                        <Input id="from-email" type="email" bind:value={$brands.fromEmail} />
                    </div>
  
                    <div>
                        <Label for="to-email">To Email</Label>
                        <Input id="to-email" type="email" bind:value={$brands.toEmail} />
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
  
        <!-- SMTP Section -->
        <Accordion type="single" collapsible>
            <AccordionItem value="smtp">
              <AccordionTrigger>SMTP Settings</AccordionTrigger>
              <AccordionContent class="space-y-6">
                
                <Label>SMTP Provider</Label>
                <select id="provider" bind:value={$brands.smtpProvider} class="w-full p-2 border rounded-md">
                    <option value="" disabled>Select Provider</option>
                    {#each providers as provider}
                        <option value={provider}>{provider}</option>
                    {/each}
                </select>
            
                {#if $brands.smtpProvider === 'SES'}
                    <!-- SES Fields -->
                    <div class="mt-4 space-y-4">
                        <Label for="region">AWS Region</Label>
                        <Input id="region" class="w-full" placeholder="e.g. us-east-1" />
            
                        <Label for="accessKey">AWS Access Key</Label>
                        <Input id="accessKey" class="w-full" />
            
                        <Label for="secretKey">AWS Secret Key</Label>
                        <Input id="secretKey" type="password" class="w-full" />
                    </div>
                {:else if $brands.smtpProvider === 'SMTP'}
                    <!-- SMTP Fields -->
                    <div class="mt-4 space-y-4">
                        <Label for="host">Host</Label>
                        <Input id="host" class="w-full" />
            
                        <Label for="port">Port</Label>
                        <Input id="port" type="number" class="w-full" />
            
                        <Label for="sslType">SSL / TLS</Label>
                        <select id="sslType" bind:value={$brands.sslType} class="w-full p-2 border rounded-md">
                            <option value="" disabled>Select SSL/TLS Type</option>
                            {#each sslOptions as option}
                                <option value={option}>{option}</option>
                            {/each}
                        </select>
            
                        <Label for="username">Username</Label>
                        <Input id="username" class="w-full" />
            
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" class="w-full" />
                    </div>
                {/if}      
                <Label>SMTP Type</Label>
                <select bind:value={$brands.smtpType} class="w-full p-2 border rounded-md">
                  <option value="onetime">Onetime</option>
                  <option value="recurring">Recurring (Monthly)</option>
                </select>
          
                <Label>Hourly Limit</Label>
                <Input type="number" bind:value={$brands.smtpLimitHourly} />
                <Label>Daily Limit</Label>
                <Input type="number" bind:value={$brands.smtpLimitDaily} />
                <Label>Monthly Limit</Label>
                <Input type="number" bind:value={$brands.smtpLimitMonthly} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
  
        <!-- Tracking Section -->
        <AccordionItem value="tracking">
            <AccordionTrigger>Tracking Settings</AccordionTrigger>
            <AccordionContent>
                <Label>Track Opening</Label>
                <Select >
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent class="bg-white z-50">
                        <SelectItem value="no">No</SelectItem>
                        <SelectItem value="user">Yes (by user)</SelectItem>
                        <SelectItem value="anonymous">Yes (anonymous)</SelectItem>
                    </SelectContent>
                </Select>
                
  
                <Label>Track Link Clicks</Label>
                <Select >
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent class="bg-white z-50">
                      <SelectItem value="no">No</SelectItem>
                      <SelectItem value="user">Yes (by user)</SelectItem>
                      <SelectItem value="anonymous">Yes (anonymous)</SelectItem>
                    </SelectContent>
                </Select>
                
            </AccordionContent>
        </AccordionItem>
  
        <!-- Bounce Section -->
        <AccordionItem value="bounce">
            <AccordionTrigger>Bounce</AccordionTrigger>
            <AccordionContent>
                <Label>Max Bounces Per Email</Label>
                <Select >
                    <SelectTrigger>
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent class="bg-white z-50">
                      <SelectItem value="1">1</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="3">3</SelectItem>
                    </SelectContent>
                </Select>
            </AccordionContent>
        </AccordionItem>
  
        <!-- Advanced Section -->
        <AccordionItem value="advanced">
            <AccordionTrigger>Advanced Settings</AccordionTrigger>
            <AccordionContent>
                <Label>GDPR Compliance</Label>
                <RadioGroup bind:value={$brands.gdpr} class="flex gap-4">
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="gdpr-yes" value="yes" />
                        <Label for="gdpr-yes">Yes</Label>
                    </div>
                    <div class="flex items-center space-x-2">
                        <RadioGroupItem id="gdpr-no" value="no" />
                        <Label for="gdpr-no">No</Label>
                    </div>
                </RadioGroup>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  
    <button class="w-full bg-black border-gray-300 rounded-md p text-white hover:bg-primary/90"
    on:click|preventDefault={handleSubmit}>
    Save Brand
    </button>

  </div>