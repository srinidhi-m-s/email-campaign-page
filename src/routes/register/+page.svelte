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
      goto('/dashboard'); 
    }
  </script>
  
  <div class="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 p-6 md:p-10">
    <div class="flex w-full max-w-sm flex-col gap-6">
      <Card>
        <CardHeader class="text-center">
          <CardTitle class="text-xl">Create an Account</CardTitle>
          <CardDescription>Sign up to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <div class="grid gap-6">
            <div class="grid gap-2">
              <Label for="email">Email</Label>
              <Input id="email" type="email" bind:value={email} placeholder="m@example.com" required />
            </div>
            <div class="grid gap-2">
              <Label for="password">Password</Label>
              <Input id="password" type="password" bind:value={password} required />
            </div>
            <div class="grid gap-2">
              <Label for="confirmPassword">Re-enter Password</Label>
              <Input id="confirmPassword" type="password" bind:value={confirmPassword} required />
            </div>
            <div class="flex items-center gap-2">
              <Checkbox id="agree" bind:checked={agreeToTerms} />
              <Label for="agree">I agree to the <a href="/" class="underline">Terms of Service</a> and <a href="/" class="underline">Privacy Policy</a></Label>
            </div>
            {#if errorMessage}
              <p class="text-sm text-red-500">{errorMessage}</p>
            {/if}
            <Button class="w-full" on:click={handleRegister}>Register</Button>
            <div class="text-center text-sm">
              Already have an account?
              <a href="/login" class="underline">Login</a>
            </div>
          </div>
        </CardContent>
      </Card>
      <p class="text-xs text-gray-500 text-center">
        By clicking Register, you agree to our <a href="/" class="underline">Terms of Service</a> and
        <a href="/" class="underline">Privacy Policy</a>.
      </p>
    </div>
  </div>
  