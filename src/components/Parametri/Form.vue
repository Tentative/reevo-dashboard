<template>
  <div>
    <div class="alert-wrapper">
      <div class="md-title">Impostazione Parametri</div>
    </div>
    
    <form novalidate class="md-layout" @submit.prevent="validateUser">
        <md-card-content>
          <div class="alert-wrapper">
            <div class="md-subheading">Parametri PriceGraph</div>
        </div>
          <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('ArticoliTOP')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.ArticoliTOP).toString()"
                  name="articoli-top"
                  id="articoli-top"
                  type="number"
                  v-model="form.ArticoliTOP"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.ArticoliTOP.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.ArticoliTOP.between"
                  >Inserire un valore valido (1 - 99)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Numero di articoli Alto Vendenti da includere nel grafico Prezzi come Articoli Top</div>
            </div>

            <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('Prezzo1')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.Prezzo1).toString()"
                  name="prezzo-1"
                  id="prezzo-1"
                  type="number"
                  v-model="form.Prezzo1"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.Prezzo1.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.Prezzo1.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Limite inferiore sotto il quale vengono considerati articoli a Prezzo Basso</div>
            </div>

            <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('Prezzo2')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.Prezzo2).toString()"
                  name="prezzo-2"
                  id="prezzo-2"
                  type="number"
                  v-model="form.Prezzo2"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.Prezzo2.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.Prezzo2.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Limite superiore sopra il quale vengono considerati articoli a Prezzo Alto</div>
            </div>

          <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('SR1')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.SR1).toString()"
                  name="sr-1"
                  id="sr-1"
                  type="number"
                  v-model="form.SR1"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.SR1.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.SR1.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Percentuale inferiore per considerare articoli a Bassa Rotazione</div>
            </div>

           <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('SR2')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.SR2).toString()"
                  name="sr-2"
                  id="sr-2"
                  type="number"
                  v-model="form.SR2"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.SR2.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.SR2.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Percentuale Superiore per considerare articoli Alto Vendenti</div>
            </div>

            <div class="alert-wrapper">
              <div class="md-subheading">Parametri Alerts</div>
            </div>

            <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('ListPriceUP')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.ListPriceUP).toString()"
                  name="list-price-up"
                  id="list-price-up"
                  type="number"
                  v-model="form.ListPriceUP"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.ListPriceUP.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.ListPriceUP.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Percentuale sopra il Prezzo di Listino per attivare un Alert Prezzo</div>
            </div>

            <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('ListPriceDOWN')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.ListPriceDOWN).toString()"
                  name="list-price-down"
                  id="list-price-down"
                  type="number"
                  v-model="form.ListPriceDOWN"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.ListPriceDOWN.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.ListPriceDOWN.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Percentuale sotto il Prezzo di Listino per attivare un Alert Prezzo</div>
            </div>

           <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('PriceVariation')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.PriceVariation).toString()"
                  name="price-variation"
                  id="price-variation"
                  type="number"
                  v-model="form.PriceVariation"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.PriceVariation.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.PriceVariation.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Variazione percentuale di prezzo per attivare un Alert Prezzo</div>
            </div>

           

            <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('TopAlertItems')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.ListPriceDOWN).toString()"
                  name="top-alert-items"
                  id="top-alert-items"
                  type="number"
                  v-model="form.TopAlertItems"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.TopAlertItems.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.TopAlertItems.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Percentuale sotto il Prezzo di Listino per attivare un Alert Prezzo</div>
            </div>

            <div id="labels" class="md-layout">
              <md-field class="md-layout-item md-size-20" :class="getValidationClass('TopInStockItems')">
                <label></label>
                <md-input
                  :placeholder="parseInt(params.TopInStockItems).toString()"
                  name="top-instock-items"
                  id="top-instock-items"
                  type="number"
                  v-model="form.TopInStockItems"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.TopInStockItems.required"
                  >Campo obbligatorio</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.TopInStockItems.minValue"
                  >Inserire un valore valido (valore minimo: 1)</span
                >
                
                
              </md-field>
              <div class="md-body-1">Numero di articoli Alto Vendenti su cui inviare Alert InStock</div>
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
  minValue,
  numeric,
  minLength,
  maxLength,
  maxValue,
  between,
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
        numeric,
        between: between(1,99),
        minLength: minLength(1),
        minValue: minValue(1),
        maxLength: maxLength(2),
        maxValue: maxValue(99)
      },
      Prezzo1: {
        required,
        numeric,
        minValue: minValue(1)
      },
      Prezzo2: {
        required,
        minValue: minValue(1),
        minLength: minLength(1),
      },
      SR1: {
        required,
        minLength: minValue(1),
      },
      SR2: {
        required,
        minLength: minValue(1),
      },
      ListPriceUP: {
        required,
        minValue: minValue(1),
      },
      ListPriceDOWN: {
        required,
        minValue: minValue(1),
      },
      PriceVariation: {
        required,
        minValue: minValue(1),
      },
      TopAlertItems: {
        required,
        minValue: minValue(1),
      },
      TopInStockItems: {
        required,
        minValue: minValue(1),
      },
      gender: {
        required,
      },
      email: {
        required,
        
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
      }, 2000);
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
@import "src/assets/style/parametri.scss";
.md-progress-bar {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
}
</style>
