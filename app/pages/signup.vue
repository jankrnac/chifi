<template>

    <div class="flex w-full flex-1 flex-col justify-center">
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">Create your account</h2>
        </div>
      
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <UAlert
                    v-if="emailSent"
                    icon="i-ph-envelope"
                    color="green"
                    variant="solid"
                    title="Activation email sent"
                    description="Activation link sent. Check your email address."
                />


                <UAlert
                    v-if="error"
                    icon="i-heroicons-x-mark"
                    color="red"
                    variant="solid"
                    title="Signup error"
                    description="Some error occured. Please try again."
                    class="w-full"
                />

            <UForm :schema="schema" :state="state" class="space-y-6" @submit.prvent="signup">
                <ClientOnly>
    			    <NuxtTurnstile v-model="state.token" />
                </ClientOnly>   
                <UFormGroup label="Email" name="email">
                    <UInput v-model="state.email" size="xl"/>
                </UFormGroup>
                
                <UFormGroup label="Password" name="password">
                    <UInput v-model="state.password" size="xl" type="password" />
                </UFormGroup>
			
                  <div>
                    <UButton
                        block
                        size="xl"
                        :disabled="typeof state.token != 'string'" 
                        type="submit" 
                    >
                        Sign up
                    </UButton>
                  </div>
    
                <div class="text-center">
                    <nuxt-link to="/login" class="text-sm">Already a member? <b class="font-semibold">Sign in</b></nuxt-link>
                </div>

                
			<div class="relative">
				<div class="absolute inset-0 flex items-center" aria-hidden="true">
				<div class="w-full border-t border-gray-300 dark:border-gray-600" />
				</div>
				<div class="relative flex justify-center">
				<span class="bg-white dark:bg-gray-950 px-2 text-sm text-gray-500 dark:text-gray-300">Or</span>
				</div>
			</div>

			<button type="button" @click="handleSignInWithGoogle" class="w-full border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55 mr-2 mb-2">
				<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 24 24" width="20"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
				<div>Sign in with Google</div><div></div>
			</button>
            </UForm>    

        </div>
    </div>
    
</template>
      
<script setup lang="ts">
import { z } from 'zod'

const schema = z.object({
	email: z.string().email('Invalid email'),
  	password: z.string().min(5, 'Must be at least 5 characters')
})

const state = reactive({
  	email: undefined,
  	password: undefined,
    token: undefined
})

const emailSent = ref(false)
const loading = ref(false)
const error = ref()

const sendEmail = async (activationToken) => {

    const link = useRequestURL().protocol+'//'+useRequestURL().host+'/activate?code='+activationToken.value

    await $fetch('/mail/send', {
        method: "POST",
        body: {
            from: 'Rechifi<rechifi@rechifi.com>',
            to: state.email,
            subject: 'Activate your account',
            html: `<p>Activate your accout using this link:<br/><a href="${link}">${link}<a/></p>`
        }
    })
}

const signup = async (data) => {

    loading.value = true

    const turnstile = await $fetch('/api/validateTurnstile', {
        method: "POST",
        body: {
            token: data.data.token
        }
    })
    
    if (turnstile.success)
    {
        const result = await $fetch('/api/auth/signup',{
            method: 'POST',
            body: { 
                email: state.email,
                password: state.password
            }
        }).catch((value) => {
            error.value = value
        })

        if (result) {
            sendEmail(result.token)
            emailSent.value = true
        }

    }
}
    
</script>