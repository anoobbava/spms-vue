<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Login</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form"
              v-model="valid"
              lazy-validation>
              <v-text-field
                prepend-icon="person"
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required>
              </v-text-field>

              <v-text-field
                prepend-icon="lock"
                v-model="password"
                :rules="passwordRules"
                label="Password"
                required
                :append-icon="passwordShow ? 'visibility' : 'visibility_off'"
                :type="passwordShow ? 'text' : 'password'"
                @click:append="passwordShow = !passwordShow">
              </v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn
              :disabled="!valid"
              color="primary"
              @click="validate">
              Login
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              color="error"
              @click="reset">
              Reset Form
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {

  data: () => ({

    passwordShow: false,
    valid: true,
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: '',
    passwordRules: [
      v => !!v || 'Password is Required'
    ]
  }),

  methods: {
    ...mapActions({ loginUser: 'loginAction' }),
    validate () {
      if (this.$refs.form.validate()) {
        this.snackbar = true
        this.login()
      }
    },

    reset () {
      this.$refs.form.reset()
    },

    login () {
      const userObject = {
        email: this.email,
        password: this.password
      }
      this.loginUser(userObject)
        .then(() => {
          this.$router.push('/')
        })
        .catch(() => {
          this.redirectToLogin()
        })
    },

    redirectToLogin () {
      this.$router.push('/login')
      this.reset()
    }
  }
}
</script>
