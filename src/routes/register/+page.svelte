<script>
    import { Button } from '$lib/components/ui/button';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Input } from '$lib/components/ui/input';
    import { Label } from '$lib/components/ui/label';
    import { Checkbox } from '$lib/components/ui/checkbox';
    import { goto } from '$app/navigation';
  
    let email = '';
    let password = '';
    let confirmPassword = '';
    let agreeToTerms = false;
    let errorMessage = '';
  
    function handleRegister() {
        if (password !== confirmPassword) {
            errorMessage = "Passwords do not match!";
            return;
        }
        if (!agreeToTerms) {
            errorMessage = "You must agree to the terms.";
            return;
        }
        console.log('Registering with:', { email, password });
        goto('/');
    }
  </script>
  
  <div class="flex min-h-screen flex-col items-center justify-center bg-background p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col space-y-6">
        <Card class="shadow-lg border border-border bg-card text-foreground">
            <CardHeader class="text-center">
                <CardTitle class="text-lg font-semibold">Create an Account</CardTitle>
                <CardDescription>Sign up to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <div class="space-y-4">
                    <div class="space-y-1">
                        <Label for="email">Email</Label>
                        <Input id="email" type="email" bind:value={email} placeholder="m@example.com" required />
                    </div>
                    <div class="space-y-1">
                        <Label for="password">Password</Label>
                        <Input id="password" type="password" bind:value={password} required />
                    </div>
                    <div class="space-y-1">
                        <Label for="confirmPassword">Re-enter Password</Label>
                        <Input id="confirmPassword" type="password" bind:value={confirmPassword} required />
                    </div>
                    <div class="flex items-center space-x-2">
                        <Checkbox id="agree" bind:checked={agreeToTerms} />
                        <Label for="agree">
                            I agree to the <a href="/" class="text-primary underline">Terms of Service</a> and 
                            <a href="/" class="text-primary underline">Privacy Policy</a>
                        </Label>
                    </div>
                    {#if errorMessage}
                        <p class="text-sm text-destructive">{errorMessage}</p>
                    {/if}
                    <Button class="w-full bg-black text-white hover:bg-primary/90" on:click={handleRegister}>
                        Register
                    </Button>
                    <div class="text-center text-sm">
                        Already have an account?
                        <a href="/login" class="text-primary underline">Login</a>
                    </div>
                </div>
            </CardContent>
        </Card>
        <p class="text-xs text-muted-foreground text-center">
            By clicking Register, you agree to our 
            <a href="/" class="text-primary underline">Terms of Service</a> and 
            <a href="/" class="text-primary underline">Privacy Policy</a>.
        </p>
    </div>
  </div>
  