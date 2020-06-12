<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="saveUser">
      <md-card class="md-layout-item md-size-50 md-small-size-100">
        <md-card-header>
          <div class="md-title">Parametri</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-20">
              <md-field :class="getValidationClass('ArticoliTOP')">
                <label for="articoli-top">Articoli TOP</label>
                <md-input
                  name="articoli-top"
                  id="articoli-top"
                  type="number"
                  autocomplete="given-name"
                  v-model="form.ArticoliTOP"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.ArticoliTOP.required"
                  >The first name is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.ArticoliTOP.minlength"
                  >Invalid first name</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-size-20">
              <md-field :class="getValidationClass('Prezzo1')">
                <label for="prezzo-1">Prezzo 1</label>
                <md-input
                  name="prezzo-1"
                  id="prezzo-1"
                  type="number"
                  autocomplete="family-name"
                  v-model="form.Prezzo1"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.Prezzo1.required"
                  >The last name is required</span
                >
                <span class="md-error" v-else-if="!$v.form.Prezzo1.minlength"
                  >Invalid last name</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-size-20">
              <md-field :class="getValidationClass('Prezzo1')">
                <label for="prezzo-2">Prezzo 2</label>
                <md-input
                  name="prezzo-2"
                  id="prezzo-2"
                  type="number"
                  autocomplete="family-name"
                  v-model="form.Prezzo2"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.Prezzo2.required"
                  >The last name is required</span
                >
                <span class="md-error" v-else-if="!$v.form.Prezzo2.minlength"
                  >Invalid last name</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-20">
              <md-field :class="getValidationClass('SR1')">
                <label for="sales-rank-1">Sales Rank 1</label>
                <md-input
                  name="sales-rank-1"
                  id="sales-rank-1"
                  v-model="form.SR1"
                  md-dense
                  :disabled="sending"
                >
                </md-input>
                <span class="md-error">The gender is required</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-20">
              <md-field :class="getValidationClass('SR2')">
                <label for="sales-rank-2">Sales Rank 2</label>
                <md-input
                  type="number"
                  id="sales-rank-2"
                  name="sales-rank-2"
                  autocomplete="age"
                  v-model="form.SR2"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.SR2.required"
                  >The age is required</span
                >
                <span class="md-error" v-else-if="!$v.form.SR2.maxlength"
                  >Invalid age</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-20">
              <md-field :class="getValidationClass('ListPriceUP')">
                <label for="list-price-up">List Price UP</label>
                <md-input
                  type="number"
                  name="list-price-up"
                  id="list-price-up"
                  autocomplete="email"
                  v-model="form.ListPriceUP"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.ListPriceUP.required"
                  >The email is required</span
                >
                <span class="md-error" v-else-if="!$v.form.ListPriceUP.email"
                  >Invalid email</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-20">
              <md-field :class="getValidationClass('ListPriceDOWN')">
                <label for="list-price-up">List Price DOWN</label>
                <md-input
                  type="number"
                  name="list-price-down"
                  id="list-price-down"
                  autocomplete="email"
                  v-model="form.ListPriceDOWN"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.ListPriceDOWN.required"
                  >The email is required</span
                >
                <span class="md-error" v-else-if="!$v.form.ListPriceDOWN.email"
                  >Invalid email</span
                >
              </md-field>
            </div>
          </div>

          <div class="md-layout md-gutter">
            <div class="md-layout-item md-size-20">
              <md-field :class="getValidationClass('PriceVariation')">
                <label for="price-variation">Price Variation</label>
                <md-input
                  type="number"
                  name="price-variation"
                  id="price-variation"
                  autocomplete="email"
                  v-model="form.PriceVariation"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.PriceVariation.required"
                  >The email is required</span
                >
                <span class="md-error" v-else-if="!$v.form.PriceVariation.email"
                  >Invalid email</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-size-20">
              <md-field :class="getValidationClass('TopAlertItems')">
                <label for="top-alert-items">TOP Alert Items</label>
                <md-input
                  type="number"
                  name="top-alert-items"
                  id="top-alert-items"
                  autocomplete="email"
                  v-model="form.TopAlertItems"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.TopAlertItems.required"
                  >The email is required</span
                >
                <span class="md-error" v-else-if="!$v.form.TopAlertItems.email"
                  >Invalid email</span
                >
              </md-field>
            </div>

            <div class="md-layout-item md-size-20">
              <md-field :class="getValidationClass('TopInStockItems')">
                <label for="top-instock-items">TOP Alert Items</label>
                <md-input
                  type="number"
                  name="top-instock-items"
                  id="top-instock-items"
                  autocomplete="email"
                  v-model="form.TopInStockItems"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.TopInStockItems.required"
                  >The email is required</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.TopInStockItems.email"
                  >Invalid email</span
                >
              </md-field>
            </div>
          </div>
        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary" :disabled="sending"
            >Salva parametri</md-button
          >
        </md-card-actions>
      </md-card>

      <md-snackbar :md-active.sync="userSaved"
        >The user {{ lastUser }} was saved with success!</md-snackbar
      >
    </form>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength,
} from "vuelidate/lib/validators";
import { mapGetters } from "vuex";

export default {
  name: "FormValidation",
  mixins: [validationMixin],
  data: () => ({
    form: {
      ArticoliTOP: null,
      Prezzo1: null,
      Prezzo2: null,
      SR1: null,
      SR2: null,
      ListPriceUP: null,
      ListPriceDOWN: null,
      PriceVariation: null,
      TopAlertItems: null,
      TopInStockItems: null,
    },
    userSaved: false,
    sending: false,
    lastUser: null,
  }),
  computed: {
    ...mapGetters({
      params: "params",
      save: "save",
    }),
  },
  validations: {
    form: {
      ArticoliTOP: {
        required,
        minLength: minLength(1),
      },
      Prezzo1: {
        required,
        minLength: minLength(1),
      },
      Prezzo2: {
        required,
        minLength: minLength(1),
      },
      SR1: {
        required,
        minLength: minLength(1),
      },
      SR2: {
        required,
        minLength: minLength(1),
      },
      ListPriceUP: {
        required,
        maxLength: maxLength(1),
      },
      ListPriceDOWN: {
        required,
        maxLength: maxLength(3),
      },
      PriceVariation: {
        required,
        maxLength: maxLength(3),
      },
      TopAlertItems: {
        required,
        maxLength: maxLength(3),
      },
      TopInStockItems: {
        required,
        maxLength: maxLength(3),
      },
      gender: {
        required,
      },
      email: {
        required,
        email,
      },
    },
  },
  methods: {
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty,
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.ArticoliTOP = null;
      this.form.Prezzo1 = null;
      this.form.Prezzo2 = null;
      this.form.SR1 = null;
      this.form.SR2 = null;
      this.form.ListPriceUP = null;
      this.form.ListPriceDOWN = null;
      this.form.PriceVariation = null;
      this.form.TopAlertItems = null;
      this.form.TopInStockItems = null;
    },
    saveUser() {
      this.sending = true;

      window.setTimeout(() => {
        let form = this.form;
        this.lastUser = `${this.form.firstName} ${this.form.lastName}`;
        this.$store.dispatch("parametri_save_call", form);
        this.userSaved = true;
        this.sending = false;
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
