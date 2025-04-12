<script>
    import { onMount } from 'svelte';
    import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '$lib/components/ui/accordion';
    import { Input } from '$lib/components/ui/input';
    import { Textarea } from '$lib/components/ui/textarea';
    import { Label } from '$lib/components/ui/label';
    import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '$lib/components/ui/select';
    import { goto } from '$app/navigation';
    import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';


    let brands = {
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
        smtpPort: '0',
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
        trackLinkClicks: ''
    };

    let isEditing = false;
    let id;

    onMount(async () => {
        const urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('id');

        if (id) {
            isEditing = true;
            try {
                const response = await fetch(`/api/brands/${id}`);
                if (response.ok) {
                    let data = await response.json();
                    brands=data[0];
                    
                } else {
                    alert('Failed to load brand details');
                }
                
            } catch (error) {
                console.error('Error loading brand:', error);
            }
        }
        console.log(brands);
    });
    

    async function handleSubmit() {      
        const validSmtpPorts = [0,25, 465, 587, 2525];
        const smtpPort = parseInt(brands.smtpPort);
        if (!validSmtpPorts.includes(smtpPort)) {
            alert("enter valid SMTP Port");
            return ;
        }  
        if (brands.smtpLimitHourly < 1 || brands.smtpLimitHourly > 1000) {
            alert("SMTP Limit Hourly must be between 1 and 1000.");
        return;
        }
        if (brands.smtpLimitDaily < 1 || brands.smtpLimitDaily > 10000) {
            alert("SMTP Limit Daily must be between 1 and 10,000.");
            return;
        }
        if (brands.smtpLimitMonthly < 1 || brands.smtpLimitMonthly > 300000) {
            alert("SMTP Limit Monthly must be between 1 and 300,000.");
            return;
        }
        if (!brands.maxBounce) {
            alert("Max Bounce is required.");
            console.log(brands);
            return;
        }
        
        const method = isEditing ? 'PUT' : 'POST';
        const url = isEditing ? `/api/brands/${id}` : '/api/brands';

        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(brands)
            });

            if (response.ok) {               

                if (isEditing) {
                    brands = await response.json();
                }
                    alert(isEditing ? 'Brand updated successfully!' : 'Brand added successfully!');
                    goto('/');
                } else {
                    alert('Failed to save brand');
                }
            } catch (error) {
                console.error('Error saving brand:', error);
                alert('An error occurred while saving.');
            }
    }
    const providers = ['SES', 'SMTP'];
    const awsRegions = [
    "us-east-2", "us-east-1", "us-west-1", "us-west-2",
    "af-south-1", "ap-southeast-3", "ap-south-1", "ap-northeast-3",
    "ap-northeast-2", "ap-southeast-1", "ap-southeast-2", "ap-northeast-1",
    "ca-central-1", "eu-central-1", "eu-west-1", "eu-west-2",
    "eu-south-1", "eu-west-3", "eu-north-1", "il-central-1",
    "me-south-1", "sa-east-1", "us-gov-east-1", "us-gov-west-1"
  ];

  
    //function for shadcn Select to work
    function selectProps(brandKey) {
    return {
      selected: {
        value: brands[brandKey],
        label: brands[brandKey] ? brands[brandKey].toString() : "Select"
      },
      onSelectedChange: (value) => {
        brands[brandKey] = value.value;    
        
      }
    };
  }  
</script>
  
  <div class="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
    <h2 class="text-2xl font-semibold mb-4">{isEditing ? 'Edit' : 'Add'} Brand</h2>
  
    <Accordion type="single" collapsible>
        <!-- Main Section -->
        <AccordionItem value="main">
            <AccordionTrigger>Main</AccordionTrigger>
            <AccordionContent>
                <div class="space-y-4">
                    <div>
                        <Label for="brand-name">Brand Name</Label>
                        <Input id="brand-name" bind:value={brands.name} maxlength="50"/>
                        
                    </div>
  
                    <div>
                        <Label for="brand-description">Brand Description</Label>
                        <Textarea id="brand-description" bind:value={brands.description} maxlength="200" rows="3" />
                    </div>
  
                    <div>
                        <Label for="from-name">From Name</Label>
                        <Input id="from-name" bind:value={brands.fromName} maxlength="30"/>
                    </div>
  
                    <div>
                        <Label for="from-email">From Email</Label>
                        <Input id="from-email" type="email" bind:value={brands.fromEmail} maxlength="200" />
                    </div>
  
                    <div>
                        <Label for="to-email">To Email</Label>
                        <Input id="to-email" type="email" bind:value={brands.toEmail} maxlength="200"/>
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
                <select id="provider" bind:value={brands.smtpProvider} class="w-full p-2 border rounded-md">
                    <option value="" disabled>Select Provider</option>
                    {#each providers as provider}
                        <option value={provider}>{provider}</option>
                    {/each}
                </select>
            
                {#if brands.smtpProvider === 'SES'}
                    <!-- SES Fields -->
                    <div class="mt-4 space-y-4">
                        <Label for="region">AWS Region</Label>
                        <Select {...selectProps("smtpRegion")} class="w-full p-2 border rounded-md">
                            <SelectTrigger class="text-sm py-1 px-2">
                              <SelectValue placeholder="Select AWS Region" />
                            </SelectTrigger>
                            <SelectContent class="max-h-40 overflow-y-auto text-sm bg-white z-50">
                              {#each awsRegions as region}
                                <SelectItem value={region}>{region}</SelectItem>
                              {/each}
                            </SelectContent>
                        </Select>
            
                        <Label for="accessKey">AWS Access Key</Label>
                        <Input id="accessKey" class="w-full" bind:value={brands.smtpAccessKey} maxlenght="100" />
            
                        <Label for="secretKey">AWS Secret Key</Label>
                        <Input id="secretKey" type="password" class="w-full" bind:value={brands.smtpSecretKey} maxlenght="100"/>
                    </div>
                {:else if brands.smtpProvider === 'SMTP'}
                    <!-- SMTP Fields -->
                    <div class="mt-4 space-y-4">
                        <Label for="host">Host</Label>
                        <Input id="host" class="w-full" bind:value={brands.smtpHost} maxlenght="50" />
            
                        <Label for="port">Port</Label>
                        <Input id="port" type="number" class="w-full" bind:value={brands.smtpPort} min="1"/>
            
                        <Label for="sslType">SSL / TLS</Label>
                        <Select {...selectProps("smtpSSL")}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select SSL/TLS Type" />
                            </SelectTrigger>
                            <SelectContent class="bg-white z-50">
                              <SelectItem value="SSL">SSL</SelectItem>
                              <SelectItem value="TLS">TLS</SelectItem>
                              <SelectItem value="None">None</SelectItem>
                            </SelectContent>
                          </Select>
            
                        <Label for="username">Username</Label>
                        <Input id="username" class="w-full" bind:value={brands.smtpUsername} maxlenght="50"  />
            
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" class="w-full" bind:value={brands.smtpPassword} maxlenght="50" />
                    </div>
                {/if}      
                <Label>SMTP Type</Label>
                <Select
                {...selectProps("smtpType")}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent class="bg-white z-50">
                    <SelectItem value="onetime">Onetime</SelectItem>
                    <SelectItem value="recurring">Recurring (Monthly)</SelectItem>
                </SelectContent>
                </Select>

          
                <Label>Hourly Limit</Label>
                <Input type="number" min="1" bind:value={brands.smtpLimitHourly} />
                <Label>Daily Limit</Label>
                <Input type="number" min="1" bind:value={brands.smtpLimitDaily} />
                <Label>Monthly Limit</Label>
                <Input type="number" min="1" bind:value={brands.smtpLimitMonthly} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
  
        <!-- Tracking Section -->
        <AccordionItem value="tracking">
            <AccordionTrigger>Tracking Settings</AccordionTrigger>
            <AccordionContent>
                <Label>Track Opening</Label>
                <Select {...selectProps("trackOpening")}>
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
                <Select {...selectProps("trackClicks")}>
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
                <Select {...selectProps("maxBounce")}>
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
                <RadioGroup bind:value={brands.gdpr} class="flex gap-4">
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
    {isEditing ? 'Update Brand' : 'Save Brand'}
    </button>

  </div>